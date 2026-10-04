import {env} from 'cloudflare:workers';
import {getChatGPTUser} from '../../chatgpt-auth';
import {services,dayOptions,slotOptions,getOffices,guide,type Lang} from '../../data';
export const dynamic='force-dynamic';
const json=(data:unknown,status=200)=>Response.json(data,{status,headers:{'Cache-Control':'no-store'}});
const database=()=>{if(!env.DB)throw Error('Database unavailable');return env.DB;};
async function expire(userId:string){await database().prepare("UPDATE bookings SET status='missed',updated=? WHERE user_id=? AND status='booked' AND julianday(arrival)<julianday(?,'-25 minutes')").bind(Date.now(),userId,new Date().toISOString()).run();}
export async function GET(req:Request){try{
 const user=await getChatGPTUser();const url=new URL(req.url);const office=url.searchParams.get('office');
 if(office){const results=await database().prepare("SELECT arrival FROM bookings WHERE office=? AND service=? AND status IN ('booked','checked-in')").bind(office,url.searchParams.get('service')??'certificate').all();return json({occupied:results.results.map((r:any)=>r.arrival)});}
 if(!user)return json({user:null,bookings:[],chats:[],queues:[]});
 await expire(user.userId);
 const db=database();const [bookings,chats,queues]=await Promise.all([
 db.prepare('SELECT * FROM bookings WHERE user_id=? ORDER BY created DESC LIMIT 100').bind(user.userId).all(),
 db.prepare('SELECT * FROM chats WHERE user_id=? ORDER BY updated DESC LIMIT 50').bind(user.userId).all(),
 db.prepare('SELECT * FROM queues WHERE user_id=?').bind(user.userId).all()]);
 return json({user:{name:user.displayName,email:user.email},bookings:bookings.results,chats:chats.results.map((c:any)=>({...c,messages:JSON.parse(c.messages)})),queues:queues.results});
 }catch(e){console.error('Queue load failed',e);return json({error:'unavailable'},503);}}
export async function POST(req:Request){try{
 const origin=req.headers.get('origin');if(origin&&origin!==new URL(req.url).origin)return json({error:'forbidden'},403);
 if(Number(req.headers.get('content-length')??0)>100000)return json({error:'invalid'},400);
 const user=await getChatGPTUser();if(!user)return json({error:'signin'},401);
 const db=database();const b:any=await req.json();const now=Date.now();await expire(user.userId);
 if(b.action==='book'||b.action==='reschedule'){
  if(!services.some(s=>s.id===b.service)||!/^([0-4])-([0-2])$/.test(b.office??'')||!['scheduled','flexible'].includes(b.mode))return json({error:'invalid'},400);
  const date=String(b.arrival).slice(0,10);if(!dayOptions().includes(date)||!slotOptions(date).includes(b.arrival))return json({error:'slot'},409);
  if(b.action==='book'){
   if(typeof b.id!=='string'||!/^[-a-zA-Z0-9]{10,80}$/.test(b.id))return json({error:'invalid'},400);
   const previous=await db.prepare('SELECT id FROM bookings WHERE id=? AND user_id=?').bind(b.id,user.userId).first();if(previous)return json({ok:true,id:b.id});
   await db.prepare("INSERT INTO bookings (id,user_id,office,service,arrival,token,status,mode,created,updated) VALUES (?,?,?,?,?,?,'booked',?,?,?)").bind(b.id,user.userId,b.office,b.service,b.arrival,'Q-'+b.id.slice(0,5).toUpperCase(),b.mode,now,now).run();
  }else{
   const old:any=await db.prepare('SELECT * FROM bookings WHERE id=? AND user_id=?').bind(b.id,user.userId).first();if(!old)return json({error:'missing'},404);
   if(old.service!==b.service)return json({error:'invalid'},400);
   if(old.status!=='booked'||new Date(old.arrival).getTime()-now<3600000)return json({error:'cutoff'},409);
   await db.prepare("UPDATE bookings SET office=?,arrival=?,updated=? WHERE id=? AND user_id=? AND status='booked'").bind(b.office,b.arrival,now,b.id,user.userId).run();
  }return json({ok:true,id:b.id});
 }
 if(['cancel','checkin','finish'].includes(b.action)){
  const old:any=await db.prepare('SELECT * FROM bookings WHERE id=? AND user_id=?').bind(b.id,user.userId).first();if(!old)return json({error:'missing'},404);
  if(!['booked','checked-in'].includes(old.status))return json({error:'inactive'},409);
  if(b.action==='checkin'&&(now<new Date(old.arrival).getTime()-15*60000||now>new Date(old.arrival).getTime()+25*60000))return json({error:'checkinWindow'},409);
  if(b.action==='finish'&&old.status!=='checked-in')return json({error:'checkinFirst'},409);
  await db.prepare('UPDATE bookings SET status=?,updated=? WHERE id=? AND user_id=?').bind(b.action==='cancel'?'cancelled':b.action==='finish'?'completed':'checked-in',now,b.id,user.userId).run();return json({ok:true});
 }
 if(b.action==='simulate'){
  if(!/^([0-4])-([0-2])$/.test(b.office??''))return json({error:'invalid'},400);
  const base=getOffices(Number(b.office[0]))[Number(b.office[2])];const q:any=await db.prepare('SELECT * FROM queues WHERE user_id=? AND office=?').bind(user.userId,b.office).first();
  let remaining=q?.remaining??base.remaining,paused=q?.paused??0,minutes=q?.minutes??6,counters=q?.counters??base.counters;
  if(b.event==='complete'&&!paused)remaining=Math.max(0,remaining-1);
  else if(b.event==='pause')paused=paused?0:1;
  else if(b.event==='delay')minutes=Math.min(20,minutes+2);
  else if(b.event==='reset'){remaining=base.remaining;paused=0;minutes=6;}
  await db.prepare('INSERT INTO queues (id,user_id,office,remaining,minutes,counters,paused,updated) VALUES (?,?,?,?,?,?,?,?) ON CONFLICT(user_id,office) DO UPDATE SET remaining=excluded.remaining,minutes=excluded.minutes,paused=excluded.paused,updated=excluded.updated').bind(crypto.randomUUID(),user.userId,b.office,remaining,minutes,counters,paused,now).run();return json({ok:true});
 }
 if(b.action==='chat'){
  if(typeof b.message!=='string'||!b.message.trim()||b.message.length>2000)return json({error:'invalid'},400);
  const lang:Lang=['gu','hi','en'].includes(b.lang)?b.lang:'gu';let messages:any[]=[];let old:any=null;
  if(b.id){old=await db.prepare('SELECT * FROM chats WHERE id=? AND user_id=?').bind(b.id,user.userId).first();if(!old)return json({error:'missing'},404);messages=JSON.parse(old.messages);}
  if(messages.length>100)return json({error:'chatLimit'},400);
  const reply=guide(b.message,lang);messages.push({role:'user',text:b.message},{role:'assistant',text:reply});const id=old?.id??crypto.randomUUID();
  if(!b.temporary){if(old)await db.prepare('UPDATE chats SET messages=?,updated=? WHERE id=? AND user_id=?').bind(JSON.stringify(messages),now,id,user.userId).run();else await db.prepare('INSERT INTO chats (id,user_id,title,messages,updated) VALUES (?,?,?,?,?)').bind(id,user.userId,b.message.slice(0,60),JSON.stringify(messages),now).run();}
  return json({ok:true,id:b.temporary?null:id,reply,messages});
 }
 if(b.action==='deleteChat'){await db.prepare('DELETE FROM chats WHERE id=? AND user_id=?').bind(b.id,user.userId).run();return json({ok:true});}
 if(b.action==='renameChat'){if(typeof b.title!=='string'||!b.title.trim())return json({error:'invalid'},400);await db.prepare('UPDATE chats SET title=?,updated=? WHERE id=? AND user_id=?').bind(b.title.slice(0,60),now,b.id,user.userId).run();return json({ok:true});}
 return json({error:'invalid'},400);
 }catch(e){const s=String(e);if(s.includes('UNIQUE'))return json({error:s.includes('user_id')?'duplicate':'slot'},409);console.error('Queue update failed',e);return json({error:'unavailable'},503);}}
