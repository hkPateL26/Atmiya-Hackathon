export type Lang='gu'|'hi'|'en';
export type Words=[string,string,string];
export const say=(v:Words,l:Lang)=>v[l==='gu'?0:l==='hi'?1:2];
export const services=[
 {id:'certificate',name:['આવકનો દાખલો','आय प्रमाण पत्र','Income certificate'] as Words,detail:['અરજી અને દસ્તાવેજ સહાય','आवेदन और दस्तावेज़ सहायता','Application & document assistance'] as Words,icon:'file'},
 {id:'ayushman',name:['આયુષ્માન કાર્ડ','आयुष्मान कार्ड','Ayushman card'] as Words,detail:['કાર્ડ સંબંધિત સહાય','कार्ड संबंधी सहायता','Card assistance'] as Words,icon:'heart'},
 {id:'scholarship',name:['શિષ્યવૃત્તિ સહાય','छात्रवृत्ति सहायता','Scholarship help'] as Words,detail:['શિક્ષણ યોજનાઓ માટે માર્ગદર્શન','शिक्षा योजनाओं का मार्गदर्शन','Guidance for education schemes'] as Words,icon:'book'},
 {id:'farmer',name:['ખેડૂત સહાય','किसान सहायता','Farmer assistance'] as Words,detail:['ખેતી યોજનાઓ માટે માર્ગદર્શન','कृषि योजनाओं का मार्गदर्शन','Guidance for farming schemes'] as Words,icon:'sprout'},
 {id:'housing',name:['આવાસ અને પરિવાર','आवास और परिवार','Housing & family'] as Words,detail:['યોજનાની અરજી માટે સહાય','योजना आवेदन सहायता','Scheme application assistance'] as Words,icon:'house'},
];
export const cities:Words[]=[['અમદાવાદ','अहमदाबाद','Ahmedabad'],['ગાંધીનગર','गांधीनगर','Gandhinagar'],['સુરત','सूरत','Surat'],['વડોદરા','वडोदरा','Vadodara'],['રાજકોટ','राजकोट','Rajkot']];
export const officeNames:Words[]=[['જન સેવા કેન્દ્ર · સેન્ટ્રલ','जन सेवा केंद्र · सेंट्रल','Jan Seva Kendra · Central'],['નાગરિક સુવિધા કેન્દ્ર · વેસ્ટ','नागरिक सुविधा केंद्र · वेस्ट','Citizen Centre · West'],['તાલુકા સેવા સદન · ઈસ્ટ','तालुका सेवा सदन · ईस्ट','Taluka Seva Sadan · East']];
export const getOffices=(city:number)=>officeNames.map((name,i)=>({id:`${city}-${i}`,name,travel:[12,20,16][i],remaining:[8,3,6][i],counters:[2,2,3][i],minutes:6,distance:[2.4,5.1,3.8][i]}));
export const categories:Words[]=[['આરોગ્ય અને સામાજિક સુરક્ષા','स्वास्थ्य और सामाजिक सुरक्षा','Healthcare & social security'],['શિક્ષણ અને શિષ્યવૃત્તિ','शिक्षा और छात्रवृत्ति','Education & scholarships'],['કૃષિ અને ખેડૂત સહાય','कृषि और किसान सहायता','Agriculture & farming'],['રોજગાર, આવાસ અને પરિવાર','रोज़गार, आवास और परिवार','Employment, housing & family']];
const raw:any[]=[
 [0,'PMJAY-MA (Ayushman Card)',['PMJAY-MA (આયુષ્માન કાર્ડ)','PMJAY-MA (आयुष्मान कार्ड)','PMJAY-MA (Ayushman Card)'],0,'ayushman'],
 [1,'Ganga Swarupa Financial Assistance Scheme',['ગંગા સ્વરૂપા આર્થિક સહાય યોજના','गंगा स्वरूपा आर्थिक सहायता योजना','Ganga Swarupa Financial Assistance Scheme'],0,'housing'],
 [2,'Pradhan Mantri Suraksha Bima Yojana',['પ્રધાનમંત્રી સુરક્ષા વીમા યોજના','प्रधानमंत्री सुरक्षा बीमा योजना','Pradhan Mantri Suraksha Bima Yojana'],0,'ayushman'],
 [3,'Mukhyamantri Matrushakti Yojana',['મુખ્યમંત્રી માતૃશક્તિ યોજના','मुख्यमंत्री मातृशक्ति योजना','Mukhyamantri Matrushakti Yojana'],0,'ayushman'],
 [4,'Namo Lakshmi Yojana',['નમો લક્ષ્મી યોજના','नमो लक्ष्मी योजना','Namo Lakshmi Yojana'],1,'scholarship'],
 [5,'Mukhyamantri Yuva Swavalamban Yojana (MYSY)',['મુખ્યમંત્રી યુવા સ્વાવલંબન યોજના (MYSY)','मुख्यमंत्री युवा स्वावलंबन योजना (MYSY)','Mukhyamantri Yuva Swavalamban Yojana (MYSY)'],1,'scholarship'],
 [6,'Namo Saraswati Vigyan Sadhana',['નમો સરસ્વતી વિજ્ઞાન સાધના','नमो सरस्वती विज्ञान साधना','Namo Saraswati Vigyan Sadhana'],1,'scholarship'],
 [7,'Digital Gujarat Scholarship (Pre-Matric & Post-Matric)',['ડિજિટલ ગુજરાત શિષ્યવૃત્તિ (પ્રી અને પોસ્ટ મેટ્રિક)','डिजिटल गुजरात छात्रवृत्ति (प्री और पोस्ट मैट्रिक)','Digital Gujarat Scholarship (Pre-Matric & Post-Matric)'],1,'scholarship'],
 [8,'Chief Minister Scholarship Scheme (CMSS)',['મુખ્યમંત્રી શિષ્યવૃત્તિ યોજના (CMSS)','मुख्यमंत्री छात्रवृत्ति योजना (CMSS)','Chief Minister Scholarship Scheme (CMSS)'],1,'scholarship'],
 [9,'iKhedut Subsidy Schemes',['iKhedut સહાય (ટ્રેક્ટર, સાધનો, સિંચાઈ)','iKhedut सहायता (ट्रैक्टर, उपकरण, सिंचाई)','iKhedut Subsidies (Tractors, Tools & Irrigation)'],2,'farmer'],
 [10,'PM-KISAN Samman Nidhi',['PM-KISAN સન્માન નિધિ','PM-KISAN सम्मान निधि','PM-KISAN Samman Nidhi'],2,'farmer'],
 [11,'Mukhyamantri Kisan Sahay Yojana',['મુખ્યમંત્રી કિસાન સહાય યોજના','मुख्यमंत्री किसान सहाय योजना','Mukhyamantri Kisan Sahay Yojana'],2,'farmer'],
 [12,'Deshi Gay Nibhav Kharch Sahay Yojana',['દેશી ગાય નિભાવ ખર્ચ સહાય યોજના','देशी गाय निर्वाह खर्च सहायता योजना','Deshi Gay Nibhav Kharch Sahay Yojana'],2,'farmer'],
 [13,'Smartphone Sahay Yojana for Farmers',['ખેડૂતો માટે સ્માર્ટફોન સહાય યોજના','किसानों के लिए स्मार्टफोन सहायता योजना','Smartphone Sahay Yojana for Farmers'],2,'farmer'],
 [14,'Manav Garima Yojana',['માનવ ગરિમા યોજના','मानव गरिमा योजना','Manav Garima Yojana'],3,'housing'],
 [15,'Vahli Dikri Yojana',['વ્હાલી દીકરી યોજના','व्हाली दीकरी योजना','Vahli Dikri Yojana'],3,'housing'],
 [16,'Pradhan Mantri Awas Yojana (PMAY)',['પ્રધાનમંત્રી આવાસ યોજના (PMAY)','प्रधानमंत्री आवास योजना (PMAY)','Pradhan Mantri Awas Yojana (PMAY)'],3,'housing'],
 [17,'Dr. Ambedkar Awas Yojana',['ડૉ. આંબેડકર આવાસ યોજના','डॉ. आंबेडकर आवास योजना','Dr. Ambedkar Awas Yojana'],3,'housing'],
 [18,'Kunwarbai Nu Mameru Yojana',['કુંવરબાઈનું મામેરું યોજના','कुंवरबाई नु मामेरु योजना','Kunwarbai Nu Mameru Yojana'],3,'housing'],
 [19,'Sathshri Seva Yojana',['Sathshri Seva Yojana · નામ ચકાસણી બાકી','Sathshri Seva Yojana · नाम की पुष्टि बाकी','Sathshri Seva Yojana · name unverified'],3,'housing'],
];
export const schemes=raw.map(r=>({id:r[0] as number,name:r[1] as string,local:r[2] as Words,cat:r[3] as number,service:r[4] as string}));
export const indiaDate=()=>new Intl.DateTimeFormat('en-CA',{timeZone:'Asia/Kolkata',year:'numeric',month:'2-digit',day:'2-digit'}).format(new Date());
export function dayOptions(){const start=indiaDate();return Array.from({length:8},(_,i)=>{const d=new Date(start+'T12:00:00+05:30');d.setUTCDate(d.getUTCDate()+i);return d.toISOString().slice(0,10);}).filter(d=>new Date(d+'T12:00:00+05:30').getUTCDay()!==0);}
export function slotOptions(date:string){return Array.from({length:28},(_,i)=>`${date}T${String(10+Math.floor(i/4)).padStart(2,'0')}:${String(i%4*15).padStart(2,'0')}:00+05:30`).filter(s=>new Date(s).getTime()>Date.now()+15*60000);}
export const fmtTime=(s:string,l:Lang)=>new Date(s).toLocaleTimeString(l==='en'?'en-IN':l==='gu'?'gu-IN':'hi-IN',{timeZone:'Asia/Kolkata',hour:'numeric',minute:'2-digit'});
export const fmtDate=(s:string,l:Lang)=>new Date(s.includes('T')?s:s+'T12:00:00+05:30').toLocaleDateString(l==='en'?'en-IN':l==='gu'?'gu-IN':'hi-IN',{timeZone:'Asia/Kolkata',weekday:'short',day:'numeric',month:'short'});
export function guide(message:string,lang:Lang){
 const q=message.toLowerCase();const match=schemes.find(s=>q.includes(s.name.toLowerCase())||q.includes(s.local[0])||q.includes(s.local[1]));
 if(match)return say([`${match.local[0]} માટે યોજનાની વિગત ખોલો. હાલની પાત્રતા, અરજીની તારીખ અને જરૂરી દસ્તાવેજોની સત્તાવાર પોર્ટલ પર ખાતરી કરો. અહીં આપેલી કચેરીઓ અને બુકિંગ ડેમો છે.`,`${match.local[1]} के लिए योजना का विवरण खोलें। वर्तमान पात्रता, आवेदन तिथि और दस्तावेज़ आधिकारिक पोर्टल पर जाँचें। यहाँ कार्यालय और बुकिंग डेमो हैं।`, `Open the scheme details for ${match.name}. Confirm current eligibility, application dates and documents with the official portal. Offices and bookings here are demonstrations.`],lang);
 if(/resched|early|earlier|vahel|velo|વહેલ|બદલ|समय|પહેલા/.test(q))return say(['તમારો નક્કી કરેલો સમય તમારી મંજૂરી વગર વહેલો નહીં થાય. વહેલા સમયની ઑફર સ્વીકારો તો જ સમય બદલાય. સામાન્ય રીશેડ્યૂલ માટે ઓછામાં ઓછા 60 મિનિટ બાકી હોવી જોઈએ. નવા સમયની ખાતરી પછી જ જૂનો સમય છૂટે છે.','आपका तय समय आपकी सहमति के बिना पहले नहीं होगा। जल्दी आने का प्रस्ताव स्वीकार करने पर ही समय बदलेगा। सामान्य रीशेड्यूल के लिए 60 मिनट बाकी होने चाहिए। नया स्लॉट मिलने पर ही पुराना छोड़ा जाता है।','Your arrival window never moves earlier without your acceptance. You can reschedule at least 60 minutes before the appointment. The old slot is released only when the new one is reserved. Declining an earlier offer keeps your original booking.'],lang);
 if(/token|ટોકન|टोकन|book|varo|kyare/.test(q))return say(['“મુલાકાત ગોઠવો” માં સેવા, કચેરી અને ઉપલબ્ધ સમય પસંદ કરો. સાઇન ઇન કર્યા પછી મફત ડેમો ટોકન મળે છે. “મારું ટોકન” માં સમય અને રદ/રીશેડ્યૂલ વિકલ્પો મળશે.','“मुलाकात तय करें” में सेवा, कार्यालय और उपलब्ध समय चुनें। साइन इन के बाद मुफ़्त डेमो टोकन मिलता है। “मेरा टोकन” में समय और रद्द/रीशेड्यूल विकल्प मिलेंगे।','Choose a service, office and available time in Plan my visit. Sign in to reserve a free demo token. My token shows your protected arrival window, estimated wait, and cancellation or rescheduling options.'],lang);
 if(/document|દસ્તાવેજ|दस्तावेज|paper/.test(q))return say(['દસ્તાવેજો સેવા પ્રમાણે અલગ છે. ઓળખનો પુરાવો, અરજી/સંદર્ભ નંબર અને આધાર દસ્તાવેજો તપાસો. આ સામાન્ય તૈયારી યાદી છે; ચોક્કસ યાદી સત્તાવાર કચેરી પાસેથી મેળવો. અહીં ખાનગી દસ્તાવેજ મોકલશો નહીં.','दस्तावेज़ सेवा के अनुसार अलग होते हैं। पहचान प्रमाण, आवेदन संख्या और सहायक दस्तावेज़ जाँचें। यह सामान्य सूची है; सही सूची कार्यालय से लें। यहाँ निजी दस्तावेज़ न भेजें।','Requirements vary by service. Check your identity proof, application/reference number and supporting records. This is a preparation checklist, not an official requirement. Confirm the exact list with the office. Do not send private documents here.'],lang);
 return say(['હું હાલ બિલ્ટ-ઇન માર્ગદર્શક છું; લાઇવ AI જોડાયેલ નથી. ટોકન, સમય બદલવા, દસ્તાવેજ તૈયારી અથવા યોજનાનું નામ પૂછો. હું પાત્રતા કે સરકારી મંજૂરી નક્કી કરતો નથી.','मैं अभी बिल्ट-इन गाइड हूँ; लाइव AI जुड़ा नहीं है। टोकन, रीशेड्यूल, दस्तावेज़ या किसी योजना के बारे में पूछें। मैं पात्रता या सरकारी मंज़ूरी तय नहीं करता।','I’m the built-in guide; live AI is not connected yet. Ask about tokens, rescheduling, document preparation, or a scheme in the catalogue. I do not determine eligibility or government approval.'],lang);
}
