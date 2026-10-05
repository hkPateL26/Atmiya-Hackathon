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
