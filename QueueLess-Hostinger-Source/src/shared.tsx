import {createContext,useContext} from 'react';
import {type Lang,type Words,say,services} from './catalogue';
export type Row=Record<string,any>;
export type Snapshot={user:Row|null;offices:Row[];services:Row[];counters:Row[];visits:Row[];summaries:Row;desk:Row[];metrics:Row;audit:Row[];members:Row[];notifications:Row[];chats:Row[];updated:number;csrf:string;otpAvailable:boolean;smsAvailable:boolean;health?:Row|null};
export type Ctx={lang:Lang;t:(gu:string,hi:string,en:string)=>string;data:Snapshot;busy:boolean;post:(action:string,values?:Row)=>Promise<Row|null>;go:(view:string)=>void;login:()=>void;book:(service:Row,visit?:Row,earlier?:boolean)=>void;toast:(message:string)=>void;confirm:(title:string,body:string,run:()=>Promise<unknown>)=>void;refresh:()=>Promise<void>;haptics:boolean;setHaptics:(v:boolean)=>void};
export const Context=createContext<Ctx>(null!);
export const useApp=()=>useContext(Context);
export const parse=(v:any,fallback:any=[])=>{if(typeof v!=='string')return v??fallback;try{return JSON.parse(v);}catch{return fallback;}};
export const local=(v:any,lang:Lang)=>{const a=parse(v,[v,v,v]);return Array.isArray(a)?say(a as Words,lang):String(v??'');};
export const serviceName=(kind:string,lang:Lang)=>say(services.find(s=>s.id===kind)?.name??[kind,kind,kind],lang);
export const active=(v:Row)=>['booked','checked-in','called','serving'].includes(v.status);
export function time(ms:number,lang:Lang){return new Date(Number(ms)).toLocaleTimeString(lang==='gu'?'gu-IN':lang==='hi'?'hi-IN':'en-IN',{timeZone:'Asia/Kolkata',hour:'numeric',minute:'2-digit'});}
export function date(ms:number|string,lang:Lang){return new Date(typeof ms==='string'&&ms.length===10?ms+'T12:00:00+05:30':Number(ms)).toLocaleDateString(lang==='gu'?'gu-IN':lang==='hi'?'hi-IN':'en-IN',{timeZone:'Asia/Kolkata',weekday:'short',day:'numeric',month:'short'});}
export const indiaDay=(ms=Date.now())=>new Date(ms+330*60000).toISOString().slice(0,10);
export const days=()=>Array.from({length:8},(_,i)=>indiaDay(Date.now()+i*86400000));
export const statusWords:Record<string,Words>={booked:['બુક થયેલ','बुक किया गया','Reserved'],'checked-in':['ચેક-ઇન થયેલ','चेक-इन हुआ','Checked in'],called:['કાઉન્ટર પર આવો','काउंटर पर आएँ','Called to counter'],serving:['સેવા ચાલુ','सेवा जारी','Being served'],completed:['પૂર્ણ','पूर्ण','Completed'],missed:['ચૂકી ગયેલ','छूट गया','Missed'],cancelled:['રદ','रद्द','Cancelled']};
export function Status({value}:{value:string}){const {lang}=useApp();return <span className={'badge status-'+value}>{say(statusWords[value]??[value,value,value],lang)}</span>;}
export function Field({label,children}:{label:string;children:React.ReactNode}){return <label className="field"><span>{label}</span>{children}</label>;}
export function Empty({title,children}:{title:string;children?:React.ReactNode}){return <div className="empty"><h3>{title}</h3>{children}</div>;}
export const errors:Record<string,Words>={
 unavailable:['જોડાણ થઈ શક્યું નથી. ફરી પ્રયાસ કરો.','कनेक्शन नहीं हुआ। फिर कोशिश करें।','Could not connect. Please retry.'],
 setupRequired:['પહેલા વેબસાઇટનું સેટઅપ પૂર્ણ કરો.','पहले वेबसाइट सेटअप पूरा करें।','Complete the website setup first.'],
 httpsRequired:['સુરક્ષિત HTTPS સરનામું વાપરો.','सुरक्षित HTTPS पता खोलें।','Use the secure HTTPS address.'],
 signin:['પહેલા સાઇન ઇન કરો.','पहले साइन इन करें।','Please sign in first.'],
 credentials:['વિગતો અથવા કોડ ખોટો છે.','विवरण या कोड गलत है।','The sign-in details or code are incorrect.'],
 passwordLength:['પાસવર્ડ 12–128 અક્ષરનો રાખો.','पासवर्ड 12–128 अक्षरों का रखें।','Use a password of 12–128 characters.'],
 accountExists:['આ વિગતો સાથે ખાતું પહેલેથી છે. સાઇન ઇન કરો.','इन विवरणों से खाता मौजूद है। साइन इन करें।','An account already uses these details. Please sign in.'],
 csrf:['સત્ર બદલાયું. પેજ રિફ્રેશ કરીને ફરી પ્રયાસ કરો.','सत्र बदला। पेज रीफ्रेश करके फिर कोशिश करें।','Your session changed. Refresh and try again.'],
 forbidden:['આ ક્રિયા માટે પરવાનગી નથી.','इस कार्य की अनुमति नहीं है।','You do not have permission for this action.'],
 slot:['આ સમય ભરાઈ ગયો. બીજો સમય પસંદ કરો.','यह समय भर गया। दूसरा समय चुनें।','That slot is no longer available. Choose another.'],
 duplicate:['આ સેવા માટે સક્રિય ટોકન પહેલેથી છે.','इस सेवा का सक्रिय टोकन पहले से है।','You already have an active token for this service.'],
 cutoff:['આગમનના 60 મિનિટ પહેલાં જ સમય બદલી શકાય.','आगमन से 60 मिनट पहले ही समय बदल सकते हैं।','Rescheduling closes 60 minutes before arrival.'],
 checkinWindow:['ચેક-ઇન આગમનના 15 મિનિટ પહેલાંથી 25 મિનિટ પછી સુધી છે.','चेक-इन आगमन से 15 मिनट पहले से 25 मिनट बाद तक है।','Check in from 15 minutes before to 25 minutes after arrival. Office extensions apply.'],
 closed:['હાલ બુકિંગ બંધ છે. બીજી કચેરી અથવા સમય જુઓ.','अभी बुकिंग बंद है। दूसरा कार्यालय या समय देखें।','Bookings are paused. Try another office or check later.'],
 notDue:['આ ટોકનનો સુરક્ષિત સમય હજી આવ્યો નથી.','इस टोकन का सुरक्षित समय अभी नहीं आया।','This token’s reserved arrival time has not started.'],
 inactive:['ટોકનની સ્થિતિ બદલાઈ ગઈ. ફરી તપાસો.','टोकन की स्थिति बदल गई। फिर देखें।','This token’s status has changed. Check the latest update.'],
 counter:['કાઉન્ટર ઉપલબ્ધ નથી અથવા વ્યસ્ત છે.','काउंटर उपलब्ध नहीं है या व्यस्त है।','The counter is paused, busy or serves a different service.'],
 queueOrder:['પહેલા કતારના આગળના ટોકનને બોલાવો.','पहले कतार का अगला टोकन बुलाएँ।','Call the next eligible token in queue order.'],
 grace:['બોલાવ્યા પછી 10 મિનિટ રાહ જુઓ.','बुलाने के बाद 10 मिनट प्रतीक्षा करें।','Allow 10 minutes after calling before marking a missed turn.'],
 priorityPolicy:['કચેરીની પ્રાથમિકતા નીતિ જરૂરી છે.','कार्यालय की प्राथमिकता नीति आवश्यक है।','A published office priority policy is required.'],
 sourceRequired:['ચકાસેલી માહિતી માટે સત્તાવાર સ્રોત અને વિગતો ઉમેરો.','सत्यापित जानकारी के लिए आधिकारिक स्रोत और विवरण जोड़ें।','Add the source and required details before marking verified.'],
 rateLimit:['ઘણા પ્રયાસ થયા. થોડી વાર પછી પ્રયત્ન કરો.','बहुत प्रयास हुए। कुछ देर बाद कोशिश करें।','Too many attempts. Please wait before trying again.'],
 phone:['+91 સાથે માન્ય મોબાઇલ નંબર આપો.','+91 के साथ मान्य मोबाइल नंबर दें।','Enter an Indian mobile number including +91.'],
 otpExpired:['કોડનો સમય પૂરો થયો. નવો કોડ માગો.','कोड समाप्त हुआ। नया कोड माँगें।','The code request expired. Request a new code.'],
 providerNotConnected:['SMS સેવા હજી જોડાયેલી નથી.','SMS सेवा अभी जुड़ी नहीं है।','The SMS provider is not connected.'],
 providerFailed:['SMS સેવા જવાબ આપી શકી નથી. પછી પ્રયાસ કરો.','SMS सेवा से जवाब नहीं मिला। बाद में कोशिश करें।','The SMS provider could not complete this request. Try later.'],
 missing:['આ માહિતી મળી નથી.','यह जानकारी नहीं मिली।','This record was not found.'],
 invalid:['ભરેલી વિગતો તપાસો.','भरे विवरण जाँचें।','Check the entered details.'],
 conflict:['વિનંતીની વિગતો બદલાઈ. ફરી શરૂ કરો.','अनुरोध के विवरण बदले। फिर शुरू करें।','The request details changed. Please start again.'],
 chatLimit:['નવી વાતચીત શરૂ કરો.','नई बातचीत शुरू करें।','Please start a new conversation.'],
};
