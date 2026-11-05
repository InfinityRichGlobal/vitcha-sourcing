import{c as nn,ai as Je,r as J,j as e,H as Ye,aj as jt,ak as We,i as Ee,a3 as an,al as rn,a8 as ue,am as on,W as Se,a7 as ln,u as dn,an as Ce,a9 as cn,x as is,X as Ge,P as os,T as ls,a1 as un,_ as hn,m as pn,a0 as Be,I as fn,a2 as Ve,ao as ds,k as mn,Q as gn,Z as cs,aa as xn,R as bn,h as vn,ap as wn,N as yn,l as jn,aq as us,ab as Nn,ar as kn,as as hs,q as $n,f as Cn,V as Sn,d as En,Y as An,a5 as Tn}from"./index-DeEtacx6.js";import{V as Rn}from"./VideoPlayer-CHtyM8BR.js";import{g as In,f as Bn,o as Pn}from"./AttachedFilesSection-9xfk--Bm.js";import{P as Ln}from"./printer-B9XWxdhm.js";/**
 * @license lucide-react v1.62.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Os={name:"file-down",size:24,node:[["path",{d:"M6 22a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h8a2.4 2.4 0 0 1 1.704.706l3.588 3.588A2.4 2.4 0 0 1 20 8v12a2 2 0 0 1-2 2z",key:"1oefj6"}],["path",{d:"M14 2v5a1 1 0 0 0 1 1h5",key:"wfsgrz"}],["path",{d:"M12 18v-6",key:"17g6i2"}],["path",{d:"m9 15 3 3 3-3",key:"1npd3o"}]]};Os.node;const Mn=nn(Os);function Dn(t){var n,s,a,r,u,o,g;if(!t)return[];const i=[],l=(b,k,A=[])=>i.push({id:b,label:k,photos:A.filter(Boolean).map((w,L)=>({url:Je(w),label:`${k} #${L+1}`}))});return l("storefront","หน้าร้าน / บรรยากาศ",(n=t.photos)==null?void 0:n.storefrontAndAtmosphere),t.type==="supplier"?(l("contacts","นามบัตร / WeChat QR",(s=t.photos)==null?void 0:s.contactCards),i.push({id:"catalog",label:"รายการสินค้า",photos:(t.catalogItems||[]).filter(b=>b.photo).map((b,k)=>({url:Je(b.photo),label:b.name||`สินค้า #${k+1}`}))})):t.type==="drink_store"?(l("menu","ป้ายเมนู",(a=t.photos)==null?void 0:a.menuBoard),l("cups","แก้วเครื่องดื่ม",(r=t.photos)==null?void 0:r.drinkCups),i.push({id:"drinks",label:"เมนูชิม",photos:(t.drinkItems||[]).filter(b=>b.photo).map((b,k)=>({url:Je(b.photo),label:b.name||`เมนู #${k+1}`}))})):(l("plans","ผังห้อง / งานระบบ",(u=t.photos)==null?void 0:u.floorPlanAndSpecs),l("neighbors","ร้านข้างเคียง",(o=t.photos)==null?void 0:o.surroundingNeighbors),l("contacts","นามบัตร / เอกสาร",(g=t.photos)==null?void 0:g.contactCards)),i}const Me=[["awaiting","รอรับช่วงต่อ"],["rfq_sent","ขอสเปก / ส่ง RFQ"],["sample_test","ทดสอบตัวอย่าง Lab/R&D"],["negotiate","ต่อรองราคา & MOQ"],["approved","ตัวเต็งอนุมัติ"],["ordered","สั่งซื้อสำเร็จ"]],he=t=>{const i=Me.findIndex(([l])=>l===t);return i<0?"ยังไม่ระบุ":`พาร์ท ${i+1}: ${Me[i][1]}`},Ze={handoffStage:"พาร์ท",status:"สถานะรายการ",assignedTo:"ผู้รับผิดชอบ",targetFollowUpDate:"กำหนดติดตาม",handoffNotes:"หมายเหตุส่งต่อ",name:"ชื่อ",storeName:"ชื่อร้าน",chineseName:"ชื่อภาษาจีน",foreignName:"ชื่อต่างประเทศ",marketOrCity:"ตลาด / เมือง",city:"เมือง",category:"หมวดหมู่",storeCategory:"หมวดร้าน",rating:"คะแนน",ratings:"คะแนนประเมิน",quickTags:"ป้ายกำกับ",isFactory:"โรงงาน",phone:"โทรศัพท์",wechatId:"WeChat",lineId:"LINE",address:"ที่อยู่",location:"พิกัด",lat:"ละติจูด",lng:"ลองจิจูด",addressText:"ที่อยู่",photos:"รูปภาพ",storefrontAndAtmosphere:"หน้าร้าน / บรรยากาศ",contactCards:"นามบัตร",menuBoard:"ป้ายเมนู",drinkCups:"เครื่องดื่ม",floorPlanAndSpecs:"ผังพื้นที่",surroundingNeighbors:"บริเวณโดยรอบ",videos:"วิดีโอ",attachedFiles:"ไฟล์แนบ",voiceNotes:"เสียงบันทึก",voiceNoteUrl:"เสียงบันทึก",voiceDurationSec:"ความยาวเสียง (วินาที)",durationSec:"ความยาวเสียง (วินาที)",label:"ชื่อบันทึก",url:"ไฟล์",catalogItems:"สินค้า",drinkItems:"เมนูที่ทดลอง",photo:"รูปภาพ",priceRmb:"ราคา (หยวน)",priceThb:"ราคา (บาท)",dimensions:"ขนาด",weightKg:"น้ำหนัก",memo:"รายละเอียด",tastingNotes:"บันทึกการชิม",brandConcept:"แนวคิดแบรนด์",country:"ประเทศ",locationType:"ประเภททำเล",zoneOrFloor:"โซน / ชั้น",unitNumber:"เลขที่พื้นที่",spaceSpecs:"ข้อมูลพื้นที่",leaseTerms:"เงื่อนไขเช่า",size:"ขนาดไฟล์ (ไบต์)",uploadedAt:"วันที่แนบ",createdAt:"วันที่บันทึก",mimeType:"ประเภทไฟล์",isMockup:"ข้อมูลตัวอย่าง",taste:"รสชาติ",aesthetics:"ความสวยงาม",value:"ความคุ้มค่า",speed:"ความเร็ว",footTraffic:"คนสัญจร",visibility:"การมองเห็น",accessibility:"การเข้าถึง",valueRoi:"ความคุ้มค่าการลงทุน"};function Qs(t){var l;const i=(l=t.history)!=null&&l.length?[...t.history]:[{action:"ข้อมูลเริ่มต้นจากผู้บันทึกรายการ",user:t.creator.alias,userAvatar:t.creator.avatar,timestamp:t.creator.timestamp}];for(const n of t.reviewerNotes||[])for(const[s,a]of[["comment",n],...(n.replies||[]).map(r=>["reply",r])]){const r=a;i.some(u=>{var o;return u.id===r.id||((o=u.content)==null?void 0:o.id)===r.id})||i.push({id:`legacy-content-${r.id}`,kind:s,action:"ความคิดเห็นที่ยังเก็บในรายการ",user:r.author,userId:r.authorId,userAvatar:r.authorAvatar,timestamp:r.timestamp,content:r})}return i}const ps=t=>Number.isNaN(Date.parse(t))?t:new Date(t).toLocaleString("th-TH",{dateStyle:"medium",timeStyle:"short"}),fs=/photos|photo|storefrontAndAtmosphere|contactCards|menuBoard|drinkCups|floorPlanAndSpecs|surroundingNeighbors/,zn=t=>/^(https?:\/\/|\.\/|\/(?!\/)|data:(image|audio|video)\/)/i.test(t);function Fn({media:t,close:i}){const l=J.useRef(null);return J.useEffect(()=>{var n;(n=l.current)==null||n.showModal()},[]),an.createPortal(e.jsxs("dialog",{ref:l,onCancel:i,onClose:i,onClick:n=>{n.target===n.currentTarget&&i()},className:"fixed inset-0 m-auto max-w-[94vw] w-[900px] max-h-[90dvh] rounded-2xl p-4 backdrop:bg-black/70","aria-label":"สื่อจากประวัติ",children:[e.jsx("div",{className:"flex justify-end mb-3",children:e.jsx("button",{type:"button",autoFocus:!0,onClick:i,className:"rounded-lg px-4 py-2 bg-slate-100 font-bold",children:"ปิดสื่อ"})}),t.kind==="image"?e.jsx(Ee,{src:t.url,alt:"ภาพจากประวัติ",className:"max-h-[72dvh] max-w-full mx-auto object-contain"}):t.kind==="audio"?e.jsx("audio",{controls:!0,src:t.url,className:"w-full"}):e.jsx("video",{controls:!0,src:t.url,className:"max-h-[72dvh] w-full"})]}),document.body)}function Le({value:t,field:i,users:l,preview:n}){var a;if(t==null||t===""||Array.isArray(t)&&!t.length)return e.jsx("span",{className:"text-slate-400",children:"ยังไม่ระบุ / ไม่มีข้อมูล"});if(Array.isArray(t))return e.jsx("div",{className:"space-y-2",children:t.map((r,u)=>e.jsx("div",{children:e.jsx(Le,{value:r,field:i,users:l,preview:n})},u))});if(typeof t=="object")return e.jsx("dl",{className:"space-y-1",children:Object.entries(t).filter(([r])=>!["id","driveFileId"].includes(r)).map(([r,u])=>e.jsxs("div",{children:[e.jsx("dt",{className:"text-slate-500 text-[11px]",children:Ze[r]||r}),e.jsx("dd",{children:e.jsx(Le,{value:u,field:`${i}.${r}`,users:l,preview:n})})]},r))});if(typeof t=="boolean")return t?"ใช่":"ไม่ใช่";const s=String(t);if(i==="handoffStage")return he(s);if(i==="assignedTo")return((a=l.find(r=>r.id===s||r.alias===s||r.name===s))==null?void 0:a.alias)||s;if(i==="status")return{scouted:"สำรวจแล้ว",reviewing:"เทียบสเปก",rfq_sent:"ส่ง RFQ",shortlisted:"ตัวเต็ง",ordered:"สั่งซื้อแล้ว"}[s]||s;if(zn(s)&&(/url$/i.test(i)||fs.test(i)||/videos|voice|audio/i.test(i))){const r=/voice|audio/i.test(i)?"audio":/video/i.test(i)?"video":fs.test(i)||/\.(png|jpe?g|webp|gif)(\?|$)/i.test(s)?"image":null;return r?e.jsx("button",{type:"button",onClick:()=>n({url:s,kind:r}),className:"text-emerald-700 underline text-left",children:r==="image"?e.jsx(Ee,{loading:"lazy",src:s,alt:"เปิดภาพจากประวัติ",className:"max-w-full w-32 max-h-28 rounded-lg object-cover"}):r==="audio"?"เปิดฟังเสียง":"เปิดดูวิดีโอ"}):e.jsx("a",{href:s,target:"_blank",rel:"noopener noreferrer",className:"text-blue-700 underline break-all",children:"เปิดไฟล์แนบ"})}return e.jsx("span",{className:"whitespace-pre-wrap break-words [overflow-wrap:anywhere]",children:s})}function Un({item:t,users:i}){const[l,n]=J.useState("all"),[s,a]=J.useState("all"),[r,u]=J.useState(!1),[o,g]=J.useState(20),[b,k]=J.useState(null);J.useEffect(()=>{n("all"),a("all"),g(20),k(null)},[t.id]),J.useEffect(()=>{g(20)},[l,s,r]);const A=Qs(t),w=t.handoffStage||"awaiting",L=p=>A.filter(v=>v.version===2&&(v.stageAfter===p||v.stageBefore===p)),D=p=>{var v,R,N,F,x,I;return!!((R=(v=p.content)==null?void 0:v.media)!=null&&R.length||(N=p.content)!=null&&N.photoUrl||(F=p.content)!=null&&F.voiceUrl||(x=p.content)!=null&&x.audioUrl||(I=p.changes)!=null&&I.some(B=>/photos|videos|voice|attachedFiles|catalogItems|drinkItems/.test(B.field)))},V=A.filter(p=>(l==="all"||p.version===2&&(p.stageAfter===l||p.stageBefore===l))&&(s==="all"||s==="files"&&D(p)||s==="comments"&&["comment","reply"].includes(p.kind||"")||s==="data"&&["create","update","delete","restore"].includes(p.kind||"")||s==="handoff"&&p.kind==="handoff")).map((p,v)=>({e:p,index:v})).sort((p,v)=>(r?1:-1)*(Date.parse(p.e.timestamp)-Date.parse(v.e.timestamp)||p.index-v.index));return e.jsxs("section",{"data-testid":"activity-timeline",className:"p-3.5 bg-slate-50 rounded-xl border border-slate-200 space-y-4 text-xs min-w-0",children:[e.jsx("h3",{className:"font-bold text-sm text-slate-900",children:"ประวัติการดำเนินงาน & ส่งต่องาน (Activity Log)"}),e.jsx("p",{className:"text-slate-600",children:"ประวัติทั้งหมดของรายการนี้ รวมทุกพาร์ทที่เคยบันทึก · กดพาร์ทเพื่อกรองดูเฉพาะส่วนได้"}),e.jsxs("div",{className:"bg-white p-3 rounded-xl border border-emerald-200 space-y-2",children:[e.jsxs("p",{className:"font-bold text-emerald-800",children:["ปัจจุบัน: ",he(w)]}),e.jsxs("p",{children:["ผู้รับช่วงต่อ: ",e.jsx(Le,{field:"assignedTo",value:t.assignedTo,users:i,preview:k})]}),e.jsxs("p",{children:["กำหนดติดตาม: ",t.targetFollowUpDate||"ยังไม่ระบุ"]}),e.jsxs("p",{className:"whitespace-pre-wrap break-words [overflow-wrap:anywhere]",children:["หมายเหตุล่าสุด: ",t.handoffNotes||"ยังไม่ระบุ"]})]}),e.jsx("div",{className:"grid grid-cols-2 sm:grid-cols-3 gap-2","aria-label":"เส้นทางทั้ง 6 พาร์ท",children:Me.map(([p,v],R)=>{const N=L(p),F=N.filter(x=>x.stageAfter===p&&x.stageBefore!==p);return e.jsxs("button",{type:"button","aria-pressed":l===p,onClick:()=>{n(l===p?"all":p),a("all")},className:`text-left p-3 rounded-xl border space-y-1 ${l===p?"ring-2 ring-emerald-600":""} ${w===p?"bg-emerald-50 border-emerald-400":"bg-white border-slate-200"}`,children:[e.jsxs("span",{className:"block font-bold",children:["พาร์ท ",R+1,": ",v]}),e.jsx("span",{className:"block text-[11px] text-slate-600",children:w===p?"อยู่ขั้นตอนนี้":N.length?"เคยอยู่ขั้นตอนนี้":"ยังไม่มีบันทึก"}),!!F.length&&e.jsxs("span",{className:"block text-[10px] text-slate-500",children:["บันทึกเข้า ",F.length," ครั้ง · ",ps(F[F.length-1].timestamp)]})]},p)})}),A.some(p=>p.version!==2)&&e.jsx("p",{className:"text-amber-800 bg-amber-50 p-2 rounded-lg",children:"ประวัติเก่าอาจเป็นข้อความย่อ ไม่มีค่าเดิมหรือพาร์ทก่อนหน้า ระบบแสดงเท่าที่เคยบันทึก ไม่เติมขั้นตอนย้อนหลัง"}),e.jsxs("div",{className:"flex flex-wrap gap-2 items-center",children:[e.jsx("button",{type:"button",onClick:()=>{n("all"),a("all")},className:"text-emerald-700 underline",children:"ดูทุกพาร์ท"}),e.jsxs("select",{"aria-label":"ประเภทประวัติ",value:s,onChange:p=>a(p.target.value),className:"max-w-full rounded-lg border p-2 bg-white",children:[e.jsx("option",{value:"all",children:"ทั้งหมด"}),e.jsx("option",{value:"handoff",children:"ส่งต่องาน"}),e.jsx("option",{value:"data",children:"ข้อมูล"}),e.jsx("option",{value:"comments",children:"ความคิดเห็น"}),e.jsx("option",{value:"files",children:"ไฟล์และสื่อ"})]}),e.jsx("button",{type:"button",onClick:()=>u(!r),className:"border rounded-lg p-2 bg-white",children:r?"เรียงเก่าก่อน":"เรียงใหม่ก่อน"})]}),e.jsxs("p",{className:"font-bold",children:[l==="all"?"ประวัติทุกพาร์ท":he(l)," · ",V.length," เหตุการณ์"]}),e.jsx("div",{className:"space-y-3",children:V.slice(0,o).map(({e:p,index:v})=>{var F;const R=i.find(x=>x.id===p.userId||x.alias===p.user||x.name===p.user),N=p.version===2&&p.stageBefore&&p.stageBefore!==p.stageAfter;return e.jsxs("article",{className:"bg-white rounded-xl border p-3 min-w-0 space-y-2","data-testid":"activity-event",children:[e.jsxs("div",{className:"flex gap-2 items-start",children:[e.jsx(Ye,{src:p.userAvatar||(R==null?void 0:R.avatar)||"./logo.jpg",alt:"",className:"w-7 h-7 shrink-0 rounded-full"}),e.jsxs("div",{className:"min-w-0",children:[e.jsx("strong",{className:"break-words",children:(R==null?void 0:R.alias)||p.user}),e.jsx("time",{className:"block text-[10px] text-slate-500",children:ps(p.timestamp)})]})]}),e.jsx("p",{className:"font-semibold whitespace-pre-wrap break-words [overflow-wrap:anywhere]",children:p.kind==="comment"?"แสดงความคิดเห็น":p.kind==="reply"?"ตอบกลับความคิดเห็น":p.kind==="handoff"?"อัปเดตการส่งต่องาน":p.action}),N&&e.jsxs("p",{className:"text-emerald-800 font-bold",children:[he(p.stageBefore)," → ",he(p.stageAfter)]}),p.version===2&&!N&&e.jsxs("p",{className:"text-[10px] text-slate-500",children:["ณ ",he(p.stageAfter)]}),p.content&&p.version!==2&&e.jsx("p",{className:"text-[10px] text-amber-800",children:"ข้อความที่ยังเก็บในรายการ · ไม่ทราบพาร์ท ณ เวลานั้น"}),p.content&&e.jsxs("div",{className:"space-y-2",children:[p.content.replyToAuthor&&e.jsxs("p",{children:["ตอบกลับ ",p.content.replyToAuthor]}),e.jsx("p",{className:"whitespace-pre-wrap break-words [overflow-wrap:anywhere]",children:p.content.text}),e.jsx(jt,{media:We(p.content)}),(p.content.voiceUrl||p.content.audioUrl)&&e.jsx(Le,{value:p.content.voiceUrl||p.content.audioUrl,field:"voice",users:i,preview:k})]}),!!((F=p.changes)!=null&&F.length)&&e.jsxs("details",{open:p.kind!=="create",children:[e.jsxs("summary",{className:"cursor-pointer text-emerald-700 font-bold py-1",children:["รายละเอียดที่บันทึก (",p.changes.length,")"]}),e.jsx("div",{className:"space-y-3 mt-2",children:p.changes.map(x=>e.jsxs("div",{className:"border-t pt-2",children:[e.jsx("h4",{className:"font-bold mb-2",children:Ze[x.field]||x.field}),e.jsxs("div",{className:"grid sm:grid-cols-2 gap-2",children:[e.jsxs("div",{className:"min-w-0 rounded-lg bg-slate-50 p-2",children:[e.jsx("p",{className:"text-[10px] text-slate-500 mb-1",children:"ก่อนเปลี่ยน"}),e.jsx(Le,{value:x.before,field:x.field,users:i,preview:k})]}),e.jsxs("div",{className:"min-w-0 rounded-lg bg-emerald-50 p-2",children:[e.jsx("p",{className:"text-[10px] text-emerald-700 mb-1",children:"หลังเปลี่ยน"}),e.jsx(Le,{value:x.after,field:x.field,users:i,preview:k})]})]})]},x.field))})]})]},p.id||`${p.timestamp}-${v}`)})}),!V.length&&e.jsx("p",{className:"text-slate-500",children:"ยังไม่มีประวัติที่บันทึกสำหรับตัวกรองนี้"}),V.length>o&&e.jsxs("button",{type:"button",className:"w-full border rounded-lg p-3 text-emerald-700",onClick:()=>g(o+20),children:["แสดงประวัติเพิ่ม (",V.length-o," เหตุการณ์)"]}),b&&e.jsx(Fn,{media:b,close:()=>k(null)})]})}var Pe={},Xe,ms;function qn(){return ms||(ms=1,Xe=function(){return typeof Promise=="function"&&Promise.prototype&&Promise.prototype.then}),Xe}var et={},Ne={},gs;function Ae(){if(gs)return Ne;gs=1;let t;const i=[0,26,44,70,100,134,172,196,242,292,346,404,466,532,581,655,733,815,901,991,1085,1156,1258,1364,1474,1588,1706,1828,1921,2051,2185,2323,2465,2611,2761,2876,3034,3196,3362,3532,3706];return Ne.getSymbolSize=function(n){if(!n)throw new Error('"version" cannot be null or undefined');if(n<1||n>40)throw new Error('"version" should be in range from 1 to 40');return n*4+17},Ne.getSymbolTotalCodewords=function(n){return i[n]},Ne.getBCHDigit=function(l){let n=0;for(;l!==0;)n++,l>>>=1;return n},Ne.setToSJISFunction=function(n){if(typeof n!="function")throw new Error('"toSJISFunc" is not a valid function.');t=n},Ne.isKanjiModeEnabled=function(){return typeof t<"u"},Ne.toSJIS=function(n){return t(n)},Ne}var tt={},xs;function Nt(){return xs||(xs=1,(function(t){t.L={bit:1},t.M={bit:0},t.Q={bit:3},t.H={bit:2};function i(l){if(typeof l!="string")throw new Error("Param is not a string");switch(l.toLowerCase()){case"l":case"low":return t.L;case"m":case"medium":return t.M;case"q":case"quartile":return t.Q;case"h":case"high":return t.H;default:throw new Error("Unknown EC Level: "+l)}}t.isValid=function(n){return n&&typeof n.bit<"u"&&n.bit>=0&&n.bit<4},t.from=function(n,s){if(t.isValid(n))return n;try{return i(n)}catch{return s}}})(tt)),tt}var st,bs;function _n(){if(bs)return st;bs=1;function t(){this.buffer=[],this.length=0}return t.prototype={get:function(i){const l=Math.floor(i/8);return(this.buffer[l]>>>7-i%8&1)===1},put:function(i,l){for(let n=0;n<l;n++)this.putBit((i>>>l-n-1&1)===1)},getLengthInBits:function(){return this.length},putBit:function(i){const l=Math.floor(this.length/8);this.buffer.length<=l&&this.buffer.push(0),i&&(this.buffer[l]|=128>>>this.length%8),this.length++}},st=t,st}var nt,vs;function Vn(){if(vs)return nt;vs=1;function t(i){if(!i||i<1)throw new Error("BitMatrix size must be defined and greater than 0");this.size=i,this.data=new Uint8Array(i*i),this.reservedBit=new Uint8Array(i*i)}return t.prototype.set=function(i,l,n,s){const a=i*this.size+l;this.data[a]=n,s&&(this.reservedBit[a]=!0)},t.prototype.get=function(i,l){return this.data[i*this.size+l]},t.prototype.xor=function(i,l,n){this.data[i*this.size+l]^=n},t.prototype.isReserved=function(i,l){return this.reservedBit[i*this.size+l]},nt=t,nt}var at={},ws;function Hn(){return ws||(ws=1,(function(t){const i=Ae().getSymbolSize;t.getRowColCoords=function(n){if(n===1)return[];const s=Math.floor(n/7)+2,a=i(n),r=a===145?26:Math.ceil((a-13)/(2*s-2))*2,u=[a-7];for(let o=1;o<s-1;o++)u[o]=u[o-1]-r;return u.push(6),u.reverse()},t.getPositions=function(n){const s=[],a=t.getRowColCoords(n),r=a.length;for(let u=0;u<r;u++)for(let o=0;o<r;o++)u===0&&o===0||u===0&&o===r-1||u===r-1&&o===0||s.push([a[u],a[o]]);return s}})(at)),at}var rt={},ys;function On(){if(ys)return rt;ys=1;const t=Ae().getSymbolSize,i=7;return rt.getPositions=function(n){const s=t(n);return[[0,0],[s-i,0],[0,s-i]]},rt}var it={},js;function Qn(){return js||(js=1,(function(t){t.Patterns={PATTERN000:0,PATTERN001:1,PATTERN010:2,PATTERN011:3,PATTERN100:4,PATTERN101:5,PATTERN110:6,PATTERN111:7};const i={N1:3,N2:3,N3:40,N4:10};t.isValid=function(s){return s!=null&&s!==""&&!isNaN(s)&&s>=0&&s<=7},t.from=function(s){return t.isValid(s)?parseInt(s,10):void 0},t.getPenaltyN1=function(s){const a=s.size;let r=0,u=0,o=0,g=null,b=null;for(let k=0;k<a;k++){u=o=0,g=b=null;for(let A=0;A<a;A++){let w=s.get(k,A);w===g?u++:(u>=5&&(r+=i.N1+(u-5)),g=w,u=1),w=s.get(A,k),w===b?o++:(o>=5&&(r+=i.N1+(o-5)),b=w,o=1)}u>=5&&(r+=i.N1+(u-5)),o>=5&&(r+=i.N1+(o-5))}return r},t.getPenaltyN2=function(s){const a=s.size;let r=0;for(let u=0;u<a-1;u++)for(let o=0;o<a-1;o++){const g=s.get(u,o)+s.get(u,o+1)+s.get(u+1,o)+s.get(u+1,o+1);(g===4||g===0)&&r++}return r*i.N2},t.getPenaltyN3=function(s){const a=s.size;let r=0,u=0,o=0;for(let g=0;g<a;g++){u=o=0;for(let b=0;b<a;b++)u=u<<1&2047|s.get(g,b),b>=10&&(u===1488||u===93)&&r++,o=o<<1&2047|s.get(b,g),b>=10&&(o===1488||o===93)&&r++}return r*i.N3},t.getPenaltyN4=function(s){let a=0;const r=s.data.length;for(let o=0;o<r;o++)a+=s.data[o];return Math.abs(Math.ceil(a*100/r/5)-10)*i.N4};function l(n,s,a){switch(n){case t.Patterns.PATTERN000:return(s+a)%2===0;case t.Patterns.PATTERN001:return s%2===0;case t.Patterns.PATTERN010:return a%3===0;case t.Patterns.PATTERN011:return(s+a)%3===0;case t.Patterns.PATTERN100:return(Math.floor(s/2)+Math.floor(a/3))%2===0;case t.Patterns.PATTERN101:return s*a%2+s*a%3===0;case t.Patterns.PATTERN110:return(s*a%2+s*a%3)%2===0;case t.Patterns.PATTERN111:return(s*a%3+(s+a)%2)%2===0;default:throw new Error("bad maskPattern:"+n)}}t.applyMask=function(s,a){const r=a.size;for(let u=0;u<r;u++)for(let o=0;o<r;o++)a.isReserved(o,u)||a.xor(o,u,l(s,o,u))},t.getBestMask=function(s,a){const r=Object.keys(t.Patterns).length;let u=0,o=1/0;for(let g=0;g<r;g++){a(g),t.applyMask(g,s);const b=t.getPenaltyN1(s)+t.getPenaltyN2(s)+t.getPenaltyN3(s)+t.getPenaltyN4(s);t.applyMask(g,s),b<o&&(o=b,u=g)}return u}})(it)),it}var Ke={},Ns;function Gs(){if(Ns)return Ke;Ns=1;const t=Nt(),i=[1,1,1,1,1,1,1,1,1,1,2,2,1,2,2,4,1,2,4,4,2,4,4,4,2,4,6,5,2,4,6,6,2,5,8,8,4,5,8,8,4,5,8,11,4,8,10,11,4,9,12,16,4,9,16,16,6,10,12,18,6,10,17,16,6,11,16,19,6,13,18,21,7,14,21,25,8,16,20,25,8,17,23,25,9,17,23,34,9,18,25,30,10,20,27,32,12,21,29,35,12,23,34,37,12,25,34,40,13,26,35,42,14,28,38,45,15,29,40,48,16,31,43,51,17,33,45,54,18,35,48,57,19,37,51,60,19,38,53,63,20,40,56,66,21,43,59,70,22,45,62,74,24,47,65,77,25,49,68,81],l=[7,10,13,17,10,16,22,28,15,26,36,44,20,36,52,64,26,48,72,88,36,64,96,112,40,72,108,130,48,88,132,156,60,110,160,192,72,130,192,224,80,150,224,264,96,176,260,308,104,198,288,352,120,216,320,384,132,240,360,432,144,280,408,480,168,308,448,532,180,338,504,588,196,364,546,650,224,416,600,700,224,442,644,750,252,476,690,816,270,504,750,900,300,560,810,960,312,588,870,1050,336,644,952,1110,360,700,1020,1200,390,728,1050,1260,420,784,1140,1350,450,812,1200,1440,480,868,1290,1530,510,924,1350,1620,540,980,1440,1710,570,1036,1530,1800,570,1064,1590,1890,600,1120,1680,1980,630,1204,1770,2100,660,1260,1860,2220,720,1316,1950,2310,750,1372,2040,2430];return Ke.getBlocksCount=function(s,a){switch(a){case t.L:return i[(s-1)*4+0];case t.M:return i[(s-1)*4+1];case t.Q:return i[(s-1)*4+2];case t.H:return i[(s-1)*4+3];default:return}},Ke.getTotalCodewordsCount=function(s,a){switch(a){case t.L:return l[(s-1)*4+0];case t.M:return l[(s-1)*4+1];case t.Q:return l[(s-1)*4+2];case t.H:return l[(s-1)*4+3];default:return}},Ke}var ot={},He={},ks;function Gn(){if(ks)return He;ks=1;const t=new Uint8Array(512),i=new Uint8Array(256);return(function(){let n=1;for(let s=0;s<255;s++)t[s]=n,i[n]=s,n<<=1,n&256&&(n^=285);for(let s=255;s<512;s++)t[s]=t[s-255]})(),He.log=function(n){if(n<1)throw new Error("log("+n+")");return i[n]},He.exp=function(n){return t[n]},He.mul=function(n,s){return n===0||s===0?0:t[i[n]+i[s]]},He}var $s;function Kn(){return $s||($s=1,(function(t){const i=Gn();t.mul=function(n,s){const a=new Uint8Array(n.length+s.length-1);for(let r=0;r<n.length;r++)for(let u=0;u<s.length;u++)a[r+u]^=i.mul(n[r],s[u]);return a},t.mod=function(n,s){let a=new Uint8Array(n);for(;a.length-s.length>=0;){const r=a[0];for(let o=0;o<s.length;o++)a[o]^=i.mul(s[o],r);let u=0;for(;u<a.length&&a[u]===0;)u++;a=a.slice(u)}return a},t.generateECPolynomial=function(n){let s=new Uint8Array([1]);for(let a=0;a<n;a++)s=t.mul(s,new Uint8Array([1,i.exp(a)]));return s}})(ot)),ot}var lt,Cs;function Jn(){if(Cs)return lt;Cs=1;const t=Kn();function i(l){this.genPoly=void 0,this.degree=l,this.degree&&this.initialize(this.degree)}return i.prototype.initialize=function(n){this.degree=n,this.genPoly=t.generateECPolynomial(this.degree)},i.prototype.encode=function(n){if(!this.genPoly)throw new Error("Encoder not initialized");const s=new Uint8Array(n.length+this.degree);s.set(n);const a=t.mod(s,this.genPoly),r=this.degree-a.length;if(r>0){const u=new Uint8Array(this.degree);return u.set(a,r),u}return a},lt=i,lt}var dt={},ct={},ut={},Ss;function Ks(){return Ss||(Ss=1,ut.isValid=function(i){return!isNaN(i)&&i>=1&&i<=40}),ut}var pe={},Es;function Js(){if(Es)return pe;Es=1;const t="[0-9]+",i="[A-Z $%*+\\-./:]+";let l="(?:[u3000-u303F]|[u3040-u309F]|[u30A0-u30FF]|[uFF00-uFFEF]|[u4E00-u9FAF]|[u2605-u2606]|[u2190-u2195]|u203B|[u2010u2015u2018u2019u2025u2026u201Cu201Du2225u2260]|[u0391-u0451]|[u00A7u00A8u00B1u00B4u00D7u00F7])+";l=l.replace(/u/g,"\\u");const n="(?:(?![A-Z0-9 $%*+\\-./:]|"+l+`)(?:.|[\r
]))+`;pe.KANJI=new RegExp(l,"g"),pe.BYTE_KANJI=new RegExp("[^A-Z0-9 $%*+\\-./:]+","g"),pe.BYTE=new RegExp(n,"g"),pe.NUMERIC=new RegExp(t,"g"),pe.ALPHANUMERIC=new RegExp(i,"g");const s=new RegExp("^"+l+"$"),a=new RegExp("^"+t+"$"),r=new RegExp("^[A-Z0-9 $%*+\\-./:]+$");return pe.testKanji=function(o){return s.test(o)},pe.testNumeric=function(o){return a.test(o)},pe.testAlphanumeric=function(o){return r.test(o)},pe}var As;function Te(){return As||(As=1,(function(t){const i=Ks(),l=Js();t.NUMERIC={id:"Numeric",bit:1,ccBits:[10,12,14]},t.ALPHANUMERIC={id:"Alphanumeric",bit:2,ccBits:[9,11,13]},t.BYTE={id:"Byte",bit:4,ccBits:[8,16,16]},t.KANJI={id:"Kanji",bit:8,ccBits:[8,10,12]},t.MIXED={bit:-1},t.getCharCountIndicator=function(a,r){if(!a.ccBits)throw new Error("Invalid mode: "+a);if(!i.isValid(r))throw new Error("Invalid version: "+r);return r>=1&&r<10?a.ccBits[0]:r<27?a.ccBits[1]:a.ccBits[2]},t.getBestModeForData=function(a){return l.testNumeric(a)?t.NUMERIC:l.testAlphanumeric(a)?t.ALPHANUMERIC:l.testKanji(a)?t.KANJI:t.BYTE},t.toString=function(a){if(a&&a.id)return a.id;throw new Error("Invalid mode")},t.isValid=function(a){return a&&a.bit&&a.ccBits};function n(s){if(typeof s!="string")throw new Error("Param is not a string");switch(s.toLowerCase()){case"numeric":return t.NUMERIC;case"alphanumeric":return t.ALPHANUMERIC;case"kanji":return t.KANJI;case"byte":return t.BYTE;default:throw new Error("Unknown mode: "+s)}}t.from=function(a,r){if(t.isValid(a))return a;try{return n(a)}catch{return r}}})(ct)),ct}var Ts;function Yn(){return Ts||(Ts=1,(function(t){const i=Ae(),l=Gs(),n=Nt(),s=Te(),a=Ks(),r=7973,u=i.getBCHDigit(r);function o(A,w,L){for(let D=1;D<=40;D++)if(w<=t.getCapacity(D,L,A))return D}function g(A,w){return s.getCharCountIndicator(A,w)+4}function b(A,w){let L=0;return A.forEach(function(D){const V=g(D.mode,w);L+=V+D.getBitsLength()}),L}function k(A,w){for(let L=1;L<=40;L++)if(b(A,L)<=t.getCapacity(L,w,s.MIXED))return L}t.from=function(w,L){return a.isValid(w)?parseInt(w,10):L},t.getCapacity=function(w,L,D){if(!a.isValid(w))throw new Error("Invalid QR Code version");typeof D>"u"&&(D=s.BYTE);const V=i.getSymbolTotalCodewords(w),p=l.getTotalCodewordsCount(w,L),v=(V-p)*8;if(D===s.MIXED)return v;const R=v-g(D,w);switch(D){case s.NUMERIC:return Math.floor(R/10*3);case s.ALPHANUMERIC:return Math.floor(R/11*2);case s.KANJI:return Math.floor(R/13);case s.BYTE:default:return Math.floor(R/8)}},t.getBestVersionForData=function(w,L){let D;const V=n.from(L,n.M);if(Array.isArray(w)){if(w.length>1)return k(w,V);if(w.length===0)return 1;D=w[0]}else D=w;return o(D.mode,D.getLength(),V)},t.getEncodedBits=function(w){if(!a.isValid(w)||w<7)throw new Error("Invalid QR Code version");let L=w<<12;for(;i.getBCHDigit(L)-u>=0;)L^=r<<i.getBCHDigit(L)-u;return w<<12|L}})(dt)),dt}var ht={},Rs;function Wn(){if(Rs)return ht;Rs=1;const t=Ae(),i=1335,l=21522,n=t.getBCHDigit(i);return ht.getEncodedBits=function(a,r){const u=a.bit<<3|r;let o=u<<10;for(;t.getBCHDigit(o)-n>=0;)o^=i<<t.getBCHDigit(o)-n;return(u<<10|o)^l},ht}var pt={},ft,Is;function Zn(){if(Is)return ft;Is=1;const t=Te();function i(l){this.mode=t.NUMERIC,this.data=l.toString()}return i.getBitsLength=function(n){return 10*Math.floor(n/3)+(n%3?n%3*3+1:0)},i.prototype.getLength=function(){return this.data.length},i.prototype.getBitsLength=function(){return i.getBitsLength(this.data.length)},i.prototype.write=function(n){let s,a,r;for(s=0;s+3<=this.data.length;s+=3)a=this.data.substr(s,3),r=parseInt(a,10),n.put(r,10);const u=this.data.length-s;u>0&&(a=this.data.substr(s),r=parseInt(a,10),n.put(r,u*3+1))},ft=i,ft}var mt,Bs;function Xn(){if(Bs)return mt;Bs=1;const t=Te(),i=["0","1","2","3","4","5","6","7","8","9","A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z"," ","$","%","*","+","-",".","/",":"];function l(n){this.mode=t.ALPHANUMERIC,this.data=n}return l.getBitsLength=function(s){return 11*Math.floor(s/2)+6*(s%2)},l.prototype.getLength=function(){return this.data.length},l.prototype.getBitsLength=function(){return l.getBitsLength(this.data.length)},l.prototype.write=function(s){let a;for(a=0;a+2<=this.data.length;a+=2){let r=i.indexOf(this.data[a])*45;r+=i.indexOf(this.data[a+1]),s.put(r,11)}this.data.length%2&&s.put(i.indexOf(this.data[a]),6)},mt=l,mt}var gt,Ps;function ea(){if(Ps)return gt;Ps=1;const t=Te();function i(l){this.mode=t.BYTE,typeof l=="string"?this.data=new TextEncoder().encode(l):this.data=new Uint8Array(l)}return i.getBitsLength=function(n){return n*8},i.prototype.getLength=function(){return this.data.length},i.prototype.getBitsLength=function(){return i.getBitsLength(this.data.length)},i.prototype.write=function(l){for(let n=0,s=this.data.length;n<s;n++)l.put(this.data[n],8)},gt=i,gt}var xt,Ls;function ta(){if(Ls)return xt;Ls=1;const t=Te(),i=Ae();function l(n){this.mode=t.KANJI,this.data=n}return l.getBitsLength=function(s){return s*13},l.prototype.getLength=function(){return this.data.length},l.prototype.getBitsLength=function(){return l.getBitsLength(this.data.length)},l.prototype.write=function(n){let s;for(s=0;s<this.data.length;s++){let a=i.toSJIS(this.data[s]);if(a>=33088&&a<=40956)a-=33088;else if(a>=57408&&a<=60351)a-=49472;else throw new Error("Invalid SJIS character: "+this.data[s]+`
Make sure your charset is UTF-8`);a=(a>>>8&255)*192+(a&255),n.put(a,13)}},xt=l,xt}var bt={exports:{}},Ms;function sa(){return Ms||(Ms=1,(function(t){var i={single_source_shortest_paths:function(l,n,s){var a={},r={};r[n]=0;var u=i.PriorityQueue.make();u.push(n,0);for(var o,g,b,k,A,w,L,D,V;!u.empty();){o=u.pop(),g=o.value,k=o.cost,A=l[g]||{};for(b in A)A.hasOwnProperty(b)&&(w=A[b],L=k+w,D=r[b],V=typeof r[b]>"u",(V||D>L)&&(r[b]=L,u.push(b,L),a[b]=g))}if(typeof s<"u"&&typeof r[s]>"u"){var p=["Could not find a path from ",n," to ",s,"."].join("");throw new Error(p)}return a},extract_shortest_path_from_predecessor_list:function(l,n){for(var s=[],a=n;a;)s.push(a),l[a],a=l[a];return s.reverse(),s},find_path:function(l,n,s){var a=i.single_source_shortest_paths(l,n,s);return i.extract_shortest_path_from_predecessor_list(a,s)},PriorityQueue:{make:function(l){var n=i.PriorityQueue,s={},a;l=l||{};for(a in n)n.hasOwnProperty(a)&&(s[a]=n[a]);return s.queue=[],s.sorter=l.sorter||n.default_sorter,s},default_sorter:function(l,n){return l.cost-n.cost},push:function(l,n){var s={value:l,cost:n};this.queue.push(s),this.queue.sort(this.sorter)},pop:function(){return this.queue.shift()},empty:function(){return this.queue.length===0}}};t.exports=i})(bt)),bt.exports}var Ds;function na(){return Ds||(Ds=1,(function(t){const i=Te(),l=Zn(),n=Xn(),s=ea(),a=ta(),r=Js(),u=Ae(),o=sa();function g(p){return unescape(encodeURIComponent(p)).length}function b(p,v,R){const N=[];let F;for(;(F=p.exec(R))!==null;)N.push({data:F[0],index:F.index,mode:v,length:F[0].length});return N}function k(p){const v=b(r.NUMERIC,i.NUMERIC,p),R=b(r.ALPHANUMERIC,i.ALPHANUMERIC,p);let N,F;return u.isKanjiModeEnabled()?(N=b(r.BYTE,i.BYTE,p),F=b(r.KANJI,i.KANJI,p)):(N=b(r.BYTE_KANJI,i.BYTE,p),F=[]),v.concat(R,N,F).sort(function(I,B){return I.index-B.index}).map(function(I){return{data:I.data,mode:I.mode,length:I.length}})}function A(p,v){switch(v){case i.NUMERIC:return l.getBitsLength(p);case i.ALPHANUMERIC:return n.getBitsLength(p);case i.KANJI:return a.getBitsLength(p);case i.BYTE:return s.getBitsLength(p)}}function w(p){return p.reduce(function(v,R){const N=v.length-1>=0?v[v.length-1]:null;return N&&N.mode===R.mode?(v[v.length-1].data+=R.data,v):(v.push(R),v)},[])}function L(p){const v=[];for(let R=0;R<p.length;R++){const N=p[R];switch(N.mode){case i.NUMERIC:v.push([N,{data:N.data,mode:i.ALPHANUMERIC,length:N.length},{data:N.data,mode:i.BYTE,length:N.length}]);break;case i.ALPHANUMERIC:v.push([N,{data:N.data,mode:i.BYTE,length:N.length}]);break;case i.KANJI:v.push([N,{data:N.data,mode:i.BYTE,length:g(N.data)}]);break;case i.BYTE:v.push([{data:N.data,mode:i.BYTE,length:g(N.data)}])}}return v}function D(p,v){const R={},N={start:{}};let F=["start"];for(let x=0;x<p.length;x++){const I=p[x],B=[];for(let E=0;E<I.length;E++){const h=I[E],j=""+x+E;B.push(j),R[j]={node:h,lastCount:0},N[j]={};for(let $=0;$<F.length;$++){const P=F[$];R[P]&&R[P].node.mode===h.mode?(N[P][j]=A(R[P].lastCount+h.length,h.mode)-A(R[P].lastCount,h.mode),R[P].lastCount+=h.length):(R[P]&&(R[P].lastCount=h.length),N[P][j]=A(h.length,h.mode)+4+i.getCharCountIndicator(h.mode,v))}}F=B}for(let x=0;x<F.length;x++)N[F[x]].end=0;return{map:N,table:R}}function V(p,v){let R;const N=i.getBestModeForData(p);if(R=i.from(v,N),R!==i.BYTE&&R.bit<N.bit)throw new Error('"'+p+'" cannot be encoded with mode '+i.toString(R)+`.
 Suggested mode is: `+i.toString(N));switch(R===i.KANJI&&!u.isKanjiModeEnabled()&&(R=i.BYTE),R){case i.NUMERIC:return new l(p);case i.ALPHANUMERIC:return new n(p);case i.KANJI:return new a(p);case i.BYTE:return new s(p)}}t.fromArray=function(v){return v.reduce(function(R,N){return typeof N=="string"?R.push(V(N,null)):N.data&&R.push(V(N.data,N.mode)),R},[])},t.fromString=function(v,R){const N=k(v,u.isKanjiModeEnabled()),F=L(N),x=D(F,R),I=o.find_path(x.map,"start","end"),B=[];for(let E=1;E<I.length-1;E++)B.push(x.table[I[E]].node);return t.fromArray(w(B))},t.rawSplit=function(v){return t.fromArray(k(v,u.isKanjiModeEnabled()))}})(pt)),pt}var zs;function aa(){if(zs)return et;zs=1;const t=Ae(),i=Nt(),l=_n(),n=Vn(),s=Hn(),a=On(),r=Qn(),u=Gs(),o=Jn(),g=Yn(),b=Wn(),k=Te(),A=na();function w(x,I){const B=x.size,E=a.getPositions(I);for(let h=0;h<E.length;h++){const j=E[h][0],$=E[h][1];for(let P=-1;P<=7;P++)if(!(j+P<=-1||B<=j+P))for(let M=-1;M<=7;M++)$+M<=-1||B<=$+M||(P>=0&&P<=6&&(M===0||M===6)||M>=0&&M<=6&&(P===0||P===6)||P>=2&&P<=4&&M>=2&&M<=4?x.set(j+P,$+M,!0,!0):x.set(j+P,$+M,!1,!0))}}function L(x){const I=x.size;for(let B=8;B<I-8;B++){const E=B%2===0;x.set(B,6,E,!0),x.set(6,B,E,!0)}}function D(x,I){const B=s.getPositions(I);for(let E=0;E<B.length;E++){const h=B[E][0],j=B[E][1];for(let $=-2;$<=2;$++)for(let P=-2;P<=2;P++)$===-2||$===2||P===-2||P===2||$===0&&P===0?x.set(h+$,j+P,!0,!0):x.set(h+$,j+P,!1,!0)}}function V(x,I){const B=x.size,E=g.getEncodedBits(I);let h,j,$;for(let P=0;P<18;P++)h=Math.floor(P/3),j=P%3+B-8-3,$=(E>>P&1)===1,x.set(h,j,$,!0),x.set(j,h,$,!0)}function p(x,I,B){const E=x.size,h=b.getEncodedBits(I,B);let j,$;for(j=0;j<15;j++)$=(h>>j&1)===1,j<6?x.set(j,8,$,!0):j<8?x.set(j+1,8,$,!0):x.set(E-15+j,8,$,!0),j<8?x.set(8,E-j-1,$,!0):j<9?x.set(8,15-j-1+1,$,!0):x.set(8,15-j-1,$,!0);x.set(E-8,8,1,!0)}function v(x,I){const B=x.size;let E=-1,h=B-1,j=7,$=0;for(let P=B-1;P>0;P-=2)for(P===6&&P--;;){for(let M=0;M<2;M++)if(!x.isReserved(h,P-M)){let Y=!1;$<I.length&&(Y=(I[$]>>>j&1)===1),x.set(h,P-M,Y),j--,j===-1&&($++,j=7)}if(h+=E,h<0||B<=h){h-=E,E=-E;break}}}function R(x,I,B){const E=new l;B.forEach(function(M){E.put(M.mode.bit,4),E.put(M.getLength(),k.getCharCountIndicator(M.mode,x)),M.write(E)});const h=t.getSymbolTotalCodewords(x),j=u.getTotalCodewordsCount(x,I),$=(h-j)*8;for(E.getLengthInBits()+4<=$&&E.put(0,4);E.getLengthInBits()%8!==0;)E.putBit(0);const P=($-E.getLengthInBits())/8;for(let M=0;M<P;M++)E.put(M%2?17:236,8);return N(E,x,I)}function N(x,I,B){const E=t.getSymbolTotalCodewords(I),h=u.getTotalCodewordsCount(I,B),j=E-h,$=u.getBlocksCount(I,B),P=E%$,M=$-P,Y=Math.floor(E/$),oe=Math.floor(j/$),fe=oe+1,me=Y-oe,De=new o(me);let ke=0;const ne=new Array($),ve=new Array($);let we=0;const ze=new Uint8Array(x.buffer);for(let de=0;de<$;de++){const le=de<M?oe:fe;ne[de]=ze.slice(ke,ke+le),ve[de]=De.encode(ne[de]),ke+=le,we=Math.max(we,le)}const ge=new Uint8Array(E);let ae=0,ee,X;for(ee=0;ee<we;ee++)for(X=0;X<$;X++)ee<ne[X].length&&(ge[ae++]=ne[X][ee]);for(ee=0;ee<me;ee++)for(X=0;X<$;X++)ge[ae++]=ve[X][ee];return ge}function F(x,I,B,E){let h;if(Array.isArray(x))h=A.fromArray(x);else if(typeof x=="string"){let Y=I;if(!Y){const oe=A.rawSplit(x);Y=g.getBestVersionForData(oe,B)}h=A.fromString(x,Y||40)}else throw new Error("Invalid data");const j=g.getBestVersionForData(h,B);if(!j)throw new Error("The amount of data is too big to be stored in a QR Code");if(!I)I=j;else if(I<j)throw new Error(`
The chosen QR Code version cannot contain this amount of data.
Minimum version required to store current data is: `+j+`.
`);const $=R(I,B,h),P=t.getSymbolSize(I),M=new n(P);return w(M,I),L(M),D(M,I),p(M,B,0),I>=7&&V(M,I),v(M,$),isNaN(E)&&(E=r.getBestMask(M,p.bind(null,M,B))),r.applyMask(E,M),p(M,B,E),{modules:M,version:I,errorCorrectionLevel:B,maskPattern:E,segments:h}}return et.create=function(I,B){if(typeof I>"u"||I==="")throw new Error("No input text");let E=i.M,h,j;return typeof B<"u"&&(E=i.from(B.errorCorrectionLevel,i.M),h=g.from(B.version),j=r.from(B.maskPattern),B.toSJISFunc&&t.setToSJISFunction(B.toSJISFunc)),F(I,h,E,j)},et}var vt={},wt={},Fs;function Ys(){return Fs||(Fs=1,(function(t){function i(l){if(typeof l=="number"&&(l=l.toString()),typeof l!="string")throw new Error("Color should be defined as hex string");let n=l.slice().replace("#","").split("");if(n.length<3||n.length===5||n.length>8)throw new Error("Invalid hex color: "+l);(n.length===3||n.length===4)&&(n=Array.prototype.concat.apply([],n.map(function(a){return[a,a]}))),n.length===6&&n.push("F","F");const s=parseInt(n.join(""),16);return{r:s>>24&255,g:s>>16&255,b:s>>8&255,a:s&255,hex:"#"+n.slice(0,6).join("")}}t.getOptions=function(n){n||(n={}),n.color||(n.color={});const s=typeof n.margin>"u"||n.margin===null||n.margin<0?4:n.margin,a=n.width&&n.width>=21?n.width:void 0,r=n.scale||4;return{width:a,scale:a?4:r,margin:s,color:{dark:i(n.color.dark||"#000000ff"),light:i(n.color.light||"#ffffffff")},type:n.type,rendererOpts:n.rendererOpts||{}}},t.getScale=function(n,s){return s.width&&s.width>=n+s.margin*2?s.width/(n+s.margin*2):s.scale},t.getImageWidth=function(n,s){const a=t.getScale(n,s);return Math.floor((n+s.margin*2)*a)},t.qrToImageData=function(n,s,a){const r=s.modules.size,u=s.modules.data,o=t.getScale(r,a),g=Math.floor((r+a.margin*2)*o),b=a.margin*o,k=[a.color.light,a.color.dark];for(let A=0;A<g;A++)for(let w=0;w<g;w++){let L=(A*g+w)*4,D=a.color.light;if(A>=b&&w>=b&&A<g-b&&w<g-b){const V=Math.floor((A-b)/o),p=Math.floor((w-b)/o);D=k[u[V*r+p]?1:0]}n[L++]=D.r,n[L++]=D.g,n[L++]=D.b,n[L]=D.a}}})(wt)),wt}var Us;function ra(){return Us||(Us=1,(function(t){const i=Ys();function l(s,a,r){s.clearRect(0,0,a.width,a.height),a.style||(a.style={}),a.height=r,a.width=r,a.style.height=r+"px",a.style.width=r+"px"}function n(){try{return document.createElement("canvas")}catch{throw new Error("You need to specify a canvas element")}}t.render=function(a,r,u){let o=u,g=r;typeof o>"u"&&(!r||!r.getContext)&&(o=r,r=void 0),r||(g=n()),o=i.getOptions(o);const b=i.getImageWidth(a.modules.size,o),k=g.getContext("2d"),A=k.createImageData(b,b);return i.qrToImageData(A.data,a,o),l(k,g,b),k.putImageData(A,0,0),g},t.renderToDataURL=function(a,r,u){let o=u;typeof o>"u"&&(!r||!r.getContext)&&(o=r,r=void 0),o||(o={});const g=t.render(a,r,o),b=o.type||"image/png",k=o.rendererOpts||{};return g.toDataURL(b,k.quality)}})(vt)),vt}var yt={},qs;function ia(){if(qs)return yt;qs=1;const t=Ys();function i(s,a){const r=s.a/255,u=a+'="'+s.hex+'"';return r<1?u+" "+a+'-opacity="'+r.toFixed(2).slice(1)+'"':u}function l(s,a,r){let u=s+a;return typeof r<"u"&&(u+=" "+r),u}function n(s,a,r){let u="",o=0,g=!1,b=0;for(let k=0;k<s.length;k++){const A=Math.floor(k%a),w=Math.floor(k/a);!A&&!g&&(g=!0),s[k]?(b++,k>0&&A>0&&s[k-1]||(u+=g?l("M",A+r,.5+w+r):l("m",o,0),o=0,g=!1),A+1<a&&s[k+1]||(u+=l("h",b),b=0)):o++}return u}return yt.render=function(a,r,u){const o=t.getOptions(r),g=a.modules.size,b=a.modules.data,k=g+o.margin*2,A=o.color.light.a?"<path "+i(o.color.light,"fill")+' d="M0 0h'+k+"v"+k+'H0z"/>':"",w="<path "+i(o.color.dark,"stroke")+' d="'+n(b,g,o.margin)+'"/>',L='viewBox="0 0 '+k+" "+k+'"',V='<svg xmlns="http://www.w3.org/2000/svg" '+(o.width?'width="'+o.width+'" height="'+o.width+'" ':"")+L+' shape-rendering="crispEdges">'+A+w+`</svg>
`;return typeof u=="function"&&u(null,V),V},yt}var _s;function oa(){if(_s)return Pe;_s=1;const t=qn(),i=aa(),l=ra(),n=ia();function s(a,r,u,o,g){const b=[].slice.call(arguments,1),k=b.length,A=typeof b[k-1]=="function";if(!A&&!t())throw new Error("Callback required as last argument");if(A){if(k<2)throw new Error("Too few arguments provided");k===2?(g=u,u=r,r=o=void 0):k===3&&(r.getContext&&typeof g>"u"?(g=o,o=void 0):(g=o,o=u,u=r,r=void 0))}else{if(k<1)throw new Error("Too few arguments provided");return k===1?(u=r,r=o=void 0):k===2&&!r.getContext&&(o=u,u=r,r=void 0),new Promise(function(w,L){try{const D=i.create(u,o);w(a(D,r,o))}catch(D){L(D)}})}try{const w=i.create(u,o);g(null,a(w,r,o))}catch(w){g(w)}}return Pe.create=i.create,Pe.toCanvas=s.bind(null,l.render),Pe.toDataURL=s.bind(null,l.renderToDataURL),Pe.toString=s.bind(null,function(a,r,u){return n.render(a,u)}),Pe}var la=oa();const da=rn(la);function Z(t){return t==null?"":String(t).replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;")}function f(t){if(t==null||t==="")return"";const l=String(t).split(/\r?\n/),n=s=>{if(!s)return"";try{const a=Intl;if(typeof Intl<"u"&&a.Segmenter){const r=new a.Segmenter("th",{granularity:"word"}),u=[];for(const o of r.segment(s)){const g=o.segment;/^\s+$/.test(g)?u.push(" "):u.push(`<span class="w-seg">${Z(g)}</span>`)}return u.join("")}}catch{}return Z(s)};return l.map(n).join("<br/>")}function Vs(t){try{const i=da.create(t,{errorCorrectionLevel:"M"}),l=i.modules.size,n=2,s=l+n*2;let a="";for(let u=0;u<l;u++)for(let o=0;o<l;o++)i.modules.get(u,o)&&(a+=`<rect x="${o+n}" y="${u+n}" width="1" height="1" fill="#0f172a"/>`);const r=`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${s} ${s}" width="200" height="200" shape-rendering="crispEdges"><rect width="100%" height="100%" fill="#ffffff"/>${a}</svg>`;return`data:image/svg+xml;utf8,${encodeURIComponent(r)}`}catch{return""}}function ca(t,i,l,n=[]){var le,Re,ce,Fe,ye,$e,re,je,Ue,qe,xe,be,ie;const s=t.type==="supplier",a=t.type==="location",r=s?t:null,u=a?t:null,o=t.type==="drink_store"?t:null,g=s?r.name:a?u.name:o.storeName,b=s?r.chineseName:a?u.foreignName:o.chineseName,k=s?r.category:a?u.locationType==="mall"?"ห้างสรรพสินค้า":u.locationType:o.storeCategory||"เรฟร้านน้ำ",A=s?r.marketOrCity:a?u.location.addressText||u.zoneOrFloor:o.city,w=t.country==="TH"?"ประเทศไทย (TH)":"ประเทศจีน (CN)",L=typeof window<"u"&&window.location.origin&&!window.location.hostname.includes("localhost")&&!window.location.hostname.includes("127.0.0.1")?`${window.location.origin}${window.location.pathname}`:"https://vitcha-sourcing-fxjw.onrender.com/",D=L.endsWith("/")?L:`${L}/`,V=`${D}?view=${encodeURIComponent(t.id)}&type=${encodeURIComponent(t.type)}`,p=Vs(V),v=[];r?((le=r.photos.storefrontAndAtmosphere)==null||le.forEach((c,m)=>v.push({url:c,label:`ป้ายหน้าร้าน / บรรยากาศ #${m+1}`})),(Re=r.photos.contactCards)==null||Re.forEach((c,m)=>v.push({url:c,label:`นามบัตร / WeChat #${m+1}`})),(ce=r.catalogItems)==null||ce.forEach((c,m)=>{c.photo&&v.push({url:c.photo,label:c.name?`สินค้า: ${c.name}`:`รายการสินค้า #${m+1}`})})):u?((Fe=u.photos.storefrontAndAtmosphere)==null||Fe.forEach((c,m)=>v.push({url:c,label:`หน้าร้าน / ทางเดิน #${m+1}`})),(ye=u.photos.floorPlanAndSpecs)==null||ye.forEach((c,m)=>v.push({url:c,label:`ผังห้อง / งานระบบ #${m+1}`})),($e=u.photos.surroundingNeighbors)==null||$e.forEach((c,m)=>v.push({url:c,label:`ร้านข้างเคียง #${m+1}`})),(re=u.photos.contactCards)==null||re.forEach((c,m)=>v.push({url:c,label:`นามบัตร / เอกสารสัญญา #${m+1}`}))):o&&((je=o.photos.storefrontAndAtmosphere)==null||je.forEach((c,m)=>v.push({url:c,label:`หน้าร้าน / บรรยากาศ #${m+1}`})),(Ue=o.photos.menuBoard)==null||Ue.forEach((c,m)=>v.push({url:c,label:`ป้ายเมนู / ราคา #${m+1}`})),(qe=o.photos.drinkCups)==null||qe.forEach((c,m)=>v.push({url:c,label:`แก้วเครื่องดื่ม #${m+1}`})),(xe=o.drinkItems)==null||xe.forEach((c,m)=>{c.photo&&v.push({url:c.photo,label:c.name?`เมนูชิม: ${c.name}`:`แก้วชิม #${m+1}`})}));const R=ue(t),N=[];R.forEach((c,m)=>{N.push({label:c.label||`คลิปเสียงหน้างาน #${m+1}`,durationSec:c.durationSec||4,source:"บันทึกเสียงหลักหน้างานจริง"})}),r?(r.catalogItems||[]).forEach((c,m)=>{ue(c).forEach((U,O)=>{N.push({label:U.label||`คลิปเสียงสินค้า #${O+1}`,durationSec:U.durationSec||4,source:`สินค้า: ${c.name||`รายการที่ #${m+1}`}`})})}):o&&(o.drinkItems||[]).forEach((c,m)=>{ue(c).forEach((U,O)=>{N.push({label:U.label||`คลิปเสียงเมนู #${O+1}`,durationSec:U.durationSec||4,source:`เมนู: ${c.name||`แก้วที่ #${m+1}`}`})})});const F=Array.isArray(t.videos)?t.videos.filter(Boolean):[],x=((be=v[0])==null?void 0:be.url)||"./logo.jpg",I=Array.isArray(t.viewedBy)?t.viewedBy:[],B=Array.isArray(t.likes)?t.likes:[],E=Array.isArray(t.reviewerNotes)?t.reviewerNotes:[],h=Qs(t).sort((c,m)=>(Date.parse(c.timestamp)||0)-(Date.parse(m.timestamp)||0)),j=c=>{var m;return((m=n.find(U=>U.id===c||U.alias===c||U.name===c))==null?void 0:m.alias)||c},$=`ฉันจะเป็นหัวแถว-${g.replace(/[^a-zA-Z0-9ก-๙_-]/g,"_")}.pdf`,M={awaiting:"พาร์ท 1: รอรับช่วงต่อ",rfq_sent:"พาร์ท 2: ขอสเปก / ส่ง RFQ",sample_test:"พาร์ท 3: ทดสอบตัวอย่าง Lab / R&D",negotiate:"พาร์ท 4: ต่อรองราคา & MOQ",approved:"พาร์ท 5: ตัวเต็งอนุมัติ",ordered:"พาร์ท 6: สั่งซื้อสำเร็จ"}[t.handoffStage||"awaiting"]||"พาร์ท 1: รอรับช่วงต่อ",Y=N.length>0?`<div class="media-grid">
          ${N.map((c,m)=>`
              <div class="voice-card">
                <div class="voice-icon">▶</div>
                <div class="voice-meta">
                  <div class="voice-title">${f(`${m+1}. ${c.label}`)}</div>
                  <div class="voice-sub">${f(`${c.source} · ความยาว ${c.durationSec} วินาที`)}</div>
                  <div class="voice-wave">${f("ılıll|ılıl||ılıll|ılı · สแกน QR เพื่อกดฟังเสียงจริง")}</div>
                </div>
              </div>`).join("")}
        </div>`:`<div class="empty-note">${f("ไม่มีไฟล์เสียงบันทึกในรายการนี้")}</div>`,oe=F.length>0?`<div class="video-grid">
          ${F.map((c,m)=>{const U=c.includes("gtv-videos-bucket")?on:c;return`
              <div class="video-card">
                <div class="video-thumb-wrap">
                  <img
                    id="video-thumb-img-${m}"
                    class="video-thumb-img"
                    src="${Z(Se(x,2e3))}"
                    crossorigin="anonymous"
                    data-video-src="${Z(U)}"
                  />
                  <div class="video-overlay-top">
                    <span class="video-chip">VIDEO CLIP #${m+1}</span>
                    <span class="video-chip-right">HD PREVIEW</span>
                  </div>
                  <div class="video-play-circle">▶</div>
                  <div class="video-overlay-bottom">
                    <span>${f(`คลิปวิดีโอที่ ${m+1} · สแกน QR Code ด้านบนเพื่อเปิดเล่นวิดีโอ`)}</span>
                  </div>
                </div>
                <div class="video-caption">
                  <div class="video-caption-title">${f(`คลิปวิดีโอหน้างาน #${m+1} (จากทั้งหมด ${F.length} คลิป)`)}</div>
                  <div class="video-caption-sub">${f("เอกสารกระดาษแสดงภาพ Thumbnail ตัวอย่าง — สแกน QR Code เพื่อรับชมวิดีโอเคลื่อนไหวพร้อมเสียง")}</div>
                </div>
              </div>`}).join("")}
        </div>`:`<div class="empty-note">${f("ไม่มีคลิปวิดีโอในรายการนี้")}</div>`;let fe="";if(s&&r){const c=(r.catalogItems||[]).map((m,U)=>{const O=ue(m);return`
        <tr>
          <td style="text-align:center;font-weight:700;">${U+1}</td>
          <td>
            ${m.photo?`<img src="${Z(Se(m.photo,2e3))}" crossorigin="anonymous" class="table-thumb" />`:'<div class="table-thumb-empty">ไม่มีรูป</div>'}
          </td>
          <td>
            <div class="cell-title">${f(m.name||`รายการที่ #${U+1}`)}</div>
            ${m.memo?`<div class="cell-sub">${f(m.memo)}</div>`:""}
            ${O.length>0?`<div class="cell-voice-badge">แนบเสียงบันทึก ${O.length} คลิป</div>`:""}
          </td>
          <td>
            <div class="cell-text">${f(m.dimensions||"-")}</div>
            <div class="cell-sub">${f(m.weightKg?`น้ำหนัก: ${m.weightKg}`:"")}</div>
          </td>
          <td>
            <div class="cell-price-green">
              ${m.priceRmb?`¥${m.priceRmb.toLocaleString()}`:m.priceThb?`฿${m.priceThb.toLocaleString()}`:"-"}
            </div>
            ${m.priceRmb?`<div class="cell-sub">(≈ ฿${i(m.priceRmb).toLocaleString()})</div>`:""}
          </td>
        </tr>`}).join("");fe=`
      <div class="section-box">
        <div class="section-title">${f(`กลุ่มที่ 3: รายการสินค้า / อุปกรณ์ / วัตถุดิบ (${(r.catalogItems||[]).length} รายการ)`)}</div>
        ${c?`<table class="data-table">
                <colgroup>
                  <col style="width:6%;" />
                  <col style="width:13%;" />
                  <col style="width:43%;" />
                  <col style="width:20%;" />
                  <col style="width:18%;" />
                </colgroup>
                <thead>
                  <tr>
                    <th style="text-align:center;">#</th>
                    <th>${f("รูปภาพ")}</th>
                    <th>${f("ชื่อรายการ & รายละเอียดสเปก")}</th>
                    <th>${f("ขนาด / น้ำหนัก")}</th>
                    <th>${f("ราคาประเมิน")}</th>
                  </tr>
                </thead>
                <tbody>${c}</tbody>
              </table>`:`<div class="empty-note">${f("ไม่มีรายการย่อย")}</div>`}
      </div>
    `}else if(o){const c=(o.drinkItems||[]).map((m,U)=>{const O=ue(m);return`
        <tr>
          <td style="text-align:center;font-weight:700;">${U+1}</td>
          <td>
            ${m.photo?`<img src="${Z(Se(m.photo,2e3))}" crossorigin="anonymous" class="table-thumb" />`:'<div class="table-thumb-empty">ไม่มีรูป</div>'}
          </td>
          <td>
            <div class="cell-title">${f(m.name||`แก้วที่ #${U+1}`)}</div>
            ${m.gimmickNotes?`<div class="cell-sub">${f(`กิมมิก: ${m.gimmickNotes}`)}</div>`:""}
            ${O.length>0?`<div class="cell-voice-badge">แนบเสียงบันทึก ${O.length} คลิป</div>`:""}
          </td>
          <td>
            <div class="cell-text">${f(m.cupSize||"-")}</div>
          </td>
          <td>
            <div class="cell-text">${f(m.fitMenuTarget||"-")}</div>
          </td>
          <td>
            <div class="cell-price-amber">
              ${m.priceRmb?`¥${m.priceRmb.toLocaleString()}`:m.priceThb?`฿${m.priceThb.toLocaleString()}`:"-"}
            </div>
            ${m.priceRmb?`<div class="cell-sub">(≈ ฿${i(m.priceRmb).toLocaleString()})</div>`:""}
          </td>
        </tr>`}).join("");fe=`
      <div class="section-box">
        <div class="section-title">${f(`กลุ่มที่ 3: เมนูที่ชิม & การถอดรหัสสูตร (${(o.drinkItems||[]).length} เมนู)`)}</div>
        ${c?`<table class="data-table">
                <colgroup>
                  <col style="width:6%;" />
                  <col style="width:13%;" />
                  <col style="width:33%;" />
                  <col style="width:11%;" />
                  <col style="width:23%;" />
                  <col style="width:14%;" />
                </colgroup>
                <thead>
                  <tr>
                    <th style="text-align:center;">#</th>
                    <th>${f("รูปแก้ว")}</th>
                    <th>${f("ชื่อเมนู & กิมมิก")}</th>
                    <th>${f("ขนาดแก้ว")}</th>
                    <th>${f("ต่อยอดเมนูของเรา")}</th>
                    <th>${f("ราคาขาย")}</th>
                  </tr>
                </thead>
                <tbody>${c}</tbody>
              </table>`:`<div class="empty-note">${f("ไม่มีเมนูย่อย")}</div>`}
      </div>
    `}const me=t.attachedFiles||[],De=me.length>0?`<div class="section-box">
          <div class="section-title">${f(`เอกสารและไฟล์แนบเพิ่มเติม (Attached Documents) — (${me.length} ไฟล์)`)}</div>
          <div class="media-subhead">${f("สแกน QR Code หรือคลิกลิงก์ด้านล่างเพื่อเปิดไฟล์บน Google Drive / เบราว์เซอร์:")}</div>
          ${me.map((c,m)=>{const U=c.url?Vs(c.url):"",O=(c.name.split(".").pop()||"FILE").toUpperCase(),K=c.size?c.size<1024*1024?`${(c.size/1024).toFixed(1)} KB`:`${(c.size/(1024*1024)).toFixed(1)} MB`:"";return`
              <div class="file-attachment-card">
                <div class="file-attachment-info">
                  <div class="file-attachment-name">#${m+1} [${Z(O)}] ${Z(c.name)}</div>
                  <div class="file-attachment-meta">
                    ${K?`ขนาด: ${K}`:""}
                    ${c.uploadedAt?` · บันทึกเมื่อ: ${new Date(c.uploadedAt).toLocaleDateString("th-TH")}`:""}
                  </div>
                  <div class="file-attachment-link">
                    <a href="${Z(c.url)}" target="_blank" rel="noopener noreferrer">${Z(c.url)}</a>
                  </div>
                </div>
                ${U?`<div class="file-attachment-qr">
                        <img src="${U}" alt="QR" />
                        <div style="font-size:7px;text-align:center;color:#059669;font-weight:700;margin-top:2px;">Scan Open</div>
                      </div>`:""}
              </div>`}).join("")}
        </div>`:"",ke=v.length>0?`<div class="photo-grid">
          ${v.map((c,m)=>`
              <div class="photo-card">
                <img src="${Z(Se(c.url,2e3))}" crossorigin="anonymous" />
                <div class="photo-caption">${f(`รูปที่ ${m+1}: ${c.label}`)}</div>
              </div>`).join("")}
        </div>`:`<div class="empty-note">${f("ไม่มีรูปภาพในรายการนี้")}</div>`,ne=(c,m)=>{if(c==null||c===""||Array.isArray(c)&&!c.length)return'<span class="audit-empty">ยังไม่ระบุ / ไม่มีข้อมูล</span>';if(Array.isArray(c))return c.map((K,H)=>`<div class="audit-value-item"><b>${H+1}.</b> ${ne(K,m)}</div>`).join("");if(typeof c=="object")return Object.entries(c).filter(([K])=>!["id","driveFileId"].includes(K)).map(([K,H])=>`<div class="audit-value-item"><strong>${f(Ze[K]||K)}:</strong> ${ne(H,`${m}.${K}`)}</div>`).join("");if(typeof c=="boolean")return c?"ใช่":"ไม่ใช่";const U=String(c);if(m==="handoffStage")return f(he(U));if(m==="assignedTo")return f(j(U));if(m==="status")return f({scouted:"สำรวจแล้ว",reviewing:"เทียบสเปก",rfq_sent:"ส่ง RFQ",shortlisted:"ตัวเต็ง",ordered:"สั่งซื้อแล้ว"}[U]||U);if(/url$|photos|photo|videos|voice|audio|storefrontAndAtmosphere|contactCards|menuBoard|drinkCups|floorPlanAndSpecs|surroundingNeighbors/i.test(m)&&/^(https?:\/\/|\.\/|\/(?!\/)|data:(image|audio|video)\/)/i.test(U)){let K;try{K=new URL(U,/^\/(uploads|media)\//.test(U)?ln():D).href}catch{return f(U)}const H=/voice|audio/i.test(m),_=/video/i.test(m),Q=!H&&!_&&(/photos|photo|storefrontAndAtmosphere|contactCards|menuBoard|drinkCups|floorPlanAndSpecs|surroundingNeighbors/i.test(m)||/\.(png|jpe?g|webp|gif)(\?|$)/i.test(U)),te=U.startsWith("data:")?V:K;return`<div class="audit-media">${Q?`<img src="${Z(Se(K,2e3))}" crossorigin="anonymous" alt="ภาพที่บันทึกในประวัติ" />`:""}<a href="${Z(te)}" target="_blank" rel="noopener noreferrer">${f(H?"เปิดไฟล์เสียง":_?"เปิดวิดีโอ":Q?"เปิดภาพ":"เปิดไฟล์แนบ")}</a>${H||_?`<span class="audit-empty"> · ${f("เปิดผ่านลิงก์หรือ QR ของรายการเพื่อฟังและดูต่อ")}</span>`:""}</div>`}return f(U)},ve=t.handoffStage||"awaiting",we=h.filter(c=>c.version===2).flatMap(c=>[c.stageBefore,c.stageAfter]),ze=Math.max(0,...[ve,...we].map(c=>Me.findIndex(([m])=>m===c))),ge=()=>`<div class="audit-stages">${Me.slice(0,ze+1).map(([c],m)=>{const U=h.filter(_=>_.version===2&&(_.stageBefore===c||_.stageAfter===c)),O=U.filter(_=>_.stageAfter===c&&_.stageBefore!==c),K=ve===c;if(!U.length)return`<div class="audit-stage audit-stage-missing">${f(`พาร์ท ${m+1}: ไม่พบการบันทึกในพาร์ทนี้${K?" (สถานะปัจจุบัน)":""}`)}</div>`;const H=h.map((_,Q)=>_.version===2&&_.stageAfter===c?ae[Q]:"").join("");return`<section class="audit-part"><div class="audit-stage ${K?"audit-current":""}"><strong>${f(he(c))}${K?" · ปัจจุบัน":""}</strong>${O.length>1?`<span>${f(`บันทึกเข้า ${O.length} ครั้ง`)}</span>`:""}</div>${H||`<p class="audit-empty">${f("พบพาร์ทนี้ในประวัติการส่งต่อไปขั้นตอนอื่น")}</p>`}</section>`}).join("")}</div>`,ae=h.map((c,m)=>{const U=c.kind==="handoff"||c.action==="handoff"?"ส่งต่องาน":c.kind==="comment"||c.action==="comment"?"ความคิดเห็น":c.kind==="reply"||c.action==="reply"?"ตอบกลับ":c.action,O=n.find(Q=>Q.id===c.userId||Q.alias===c.user||Q.name===c.user),K=c.userAvatar||(O==null?void 0:O.avatar),H=K&&/^(https?:\/\/|\.\/|\/(?!\/)|data:image\/)/i.test(K)?K:"",_=c.version===2&&c.stageBefore&&c.stageBefore!==c.stageAfter;return`<article class="audit-event" data-activity-id="${Z(c.id||m)}">
        <div class="audit-event-heading">${H?`<img class="audit-avatar" src="${Z(Se(H,2e3))}" crossorigin="anonymous" alt="${Z((O==null?void 0:O.alias)||c.user)}" />`:`<span class="audit-avatar audit-avatar-fallback">${Z(((O==null?void 0:O.alias)||c.user||"?").slice(0,1))}</span>`}<strong>${f((O==null?void 0:O.alias)||c.user)}</strong><span>${f(Number.isNaN(Date.parse(c.timestamp))?c.timestamp:new Date(c.timestamp).toLocaleString("th-TH"))}</span></div>
        <div class="audit-action">${f(U)}</div>
        ${c.version===2?`<div class="audit-transition">${f(_?`${he(c.stageBefore)} → ${he(c.stageAfter)}`:`ณ ${he(c.stageAfter)}`)}</div>`:""}
        ${c.content?`<div class="audit-content">${c.version!==2?`<div class="audit-empty">${f("ข้อความที่ยังเก็บในรายการ · ไม่ทราบพาร์ท ณ เวลานั้น")}</div>`:""}${c.content.replyToAuthor?`<strong>${f(`ตอบกลับ ${c.content.replyToAuthor}`)}</strong>`:""}<p>${f(c.content.text)}</p>${We(c.content).map(Q=>ne(Q.url,Q.type==="video"?"videos":"photo")).join("")}${c.content.voiceUrl||c.content.audioUrl?ne(c.content.voiceUrl||c.content.audioUrl,"voice"):""}</div>`:""}
        ${(c.kind==="create"?[]:c.changes||[]).filter(Q=>Q.field!=="handoffStage").map(Q=>`<div class="audit-change"><h4>${f(Ze[Q.field]||Q.field)}</h4>${Q.before!=null&&Q.before!==""&&(!Array.isArray(Q.before)||Q.before.length)?`<div class="audit-before"><b>ก่อนเปลี่ยน</b><div>${ne(Q.before,Q.field)}</div></div>`:""}<div class="audit-after">${Q.before!=null&&Q.before!==""?"<b>หลังเปลี่ยน</b>":""}<div>${ne(Q.after,Q.field)}</div></div></div>`).join("")}
      </article>`}),ee=h.map((c,m)=>c.version===2&&Me.some(([U])=>U===c.stageAfter)?"":ae[m]).join(""),X=I.length>0?`<table class="data-table" style="margin-top:10px;">
          <colgroup>
            <col style="width:8%;" />
            <col style="width:36%;" />
            <col style="width:18%;" />
            <col style="width:24%;" />
            <col style="width:14%;" />
          </colgroup>
          <thead>
            <tr>
              <th style="text-align:center;">#</th>
              <th>${f("ผู้เปิดอ่าน (นามแฝง)")}</th>
              <th>${f("ระดับสิทธิ์")}</th>
              <th>${f("เปิดอ่านล่าสุดเมื่อ")}</th>
              <th style="text-align:center;">${f("จำนวนครั้ง")}</th>
            </tr>
          </thead>
          <tbody>
            ${I.map((c,m)=>`
              <tr>
                <td style="text-align:center;">${m+1}</td>
                <td><div class="cell-title">${f(`${c.alias} (${c.name})`)}</div></td>
                <td><div class="cell-text">${Z(c.role.toUpperCase())}</div></td>
                <td><div class="cell-sub">${Z(new Date(c.lastViewedAt).toLocaleString("th-TH"))}</div></td>
                <td style="text-align:center;font-weight:700;">${f(`${c.viewCount||1} ครั้ง`)}</td>
              </tr>`).join("")}
          </tbody>
        </table>`:`<div class="empty-note" style="margin-top:8px;">${f("ยังไม่มีประวัติผู้เปิดอ่านเพิ่มเติม")}</div>`,de=s?`คะแนนประเมิน ${(r==null?void 0:r.rating)||5}/5 ดาว (${r!=null&&r.isFactory?"โรงงานผลิต":"หน้าร้าน/โชว์รูม"})`:`รสชาติ ${o==null?void 0:o.ratings.taste}/5 · ดีไซน์ ${o==null?void 0:o.ratings.aesthetics}/5 · คุ้มค่า ${o==null?void 0:o.ratings.value}/5 · ความไว ${o==null?void 0:o.ratings.speed}/5`;return`<!DOCTYPE html>
<html lang="th">
<head>
  <meta charset="UTF-8" />
  <base href="${Z(D)}" />
  <meta name="viewport" content="width=840, initial-scale=0.45, minimum-scale=0.3, maximum-scale=2.0, user-scalable=yes" />
  <title>ฉันจะเป็นหัวแถว - ${Z(g)}</title>
  <link rel="preconnect" href="https://fonts.googleapis.com" />
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
  <link href="https://fonts.googleapis.com/css2?family=Sarabun:wght@400;500;600;700;800&display=swap" rel="stylesheet" />
  <script src="https://cdnjs.cloudflare.com/ajax/libs/html2pdf.js/0.10.1/html2pdf.bundle.min.js"><\/script>
  <style>
    html, body, * {
      box-sizing: border-box;
      letter-spacing: 0px !important;
      font-kerning: none !important;
      font-variant-ligatures: none !important;
      -webkit-text-size-adjust: 100% !important;
      -moz-text-size-adjust: 100% !important;
      text-size-adjust: 100% !important;
    }
    body {
      font-family: "Sarabun", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
      background: #e2e8f0;
      color: #0f172a;
      margin: 0;
      padding: 0;
      line-height: 1.55;
      -webkit-font-smoothing: antialiased;
    }
    .w-seg {
      display: inline-block;
      white-space: nowrap;
    }
    .toolbar {
      position: sticky;
      top: 0;
      z-index: 100;
      background: #0f172a;
      color: #ffffff;
      padding: 12px 20px;
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 12px;
      box-shadow: 0 4px 12px rgba(0,0,0,0.18);
      min-width: 780px;
    }
    .toolbar-btn {
      padding: 8px 16px;
      border-radius: 10px;
      font-weight: 700;
      font-size: 13px;
      border: none;
      cursor: pointer;
      display: inline-flex;
      align-items: center;
      gap: 6px;
      font-family: inherit;
    }
    .btn-pdf { background: #059669; color: #ffffff; }
    .btn-print { background: #2563eb; color: #ffffff; }
    .btn-close { background: #334155; color: #ffffff; }

    /* Fixed A4 width sheet so mobile screens never crush table columns during html2canvas capture */
    .html2pdf__overlay {
      position: absolute !important;
      overflow: visible !important;
      left: 0 !important;
      top: 0 !important;
      right: auto !important;
      bottom: auto !important;
      width: 732px !important;
    }
    .html2pdf__container {
      position: relative !important;
      margin: 0 !important;
      left: 0 !important;
      right: auto !important;
      top: 0 !important;
      width: 732px !important;
    }
    .sheet-outer {
      width: 100%;
      overflow-x: auto;
      padding: 12px 0 32px 0;
    }
    .page-sheet {
      width: 732px;
      min-width: 732px;
      max-width: 732px;
      margin: 0;
      background: #ffffff;
      padding: 18px 26px;
      border-radius: 0;
    }

    /* Header with QR Code */
    .report-header {
      display: flex;
      align-items: flex-start;
      justify-content: space-between;
      border-bottom: 2px solid #0f172a;
      padding-bottom: 10px;
      margin-bottom: 10px;
      gap: 14px;
    }
    .header-left {
      flex: 1;
      min-width: 0;
    }
    .badge {
      display: inline-block;
      padding: 4px 10px;
      border-radius: 6px;
      font-size: 11px;
      font-weight: 700;
      background: #ecfdf5;
      color: #065f46;
      border: 1px solid #a7f3d0;
      margin-bottom: 6px;
    }
    .brand-title {
      font-size: 20px;
      font-weight: 800;
      color: #0f172a;
      margin: 0 0 4px 0;
      line-height: 1.35;
      word-break: break-word;
    }
    .brand-sub {
      font-size: 12px;
      color: #475569;
      margin: 0 0 8px 0;
    }
    .summary-pills {
      display: flex;
      flex-wrap: wrap;
      gap: 6px;
      margin-top: 6px;
    }
    .summary-pill {
      display: inline-block;
      padding: 3px 8px;
      border-radius: 6px;
      background: #f1f5f9;
      border: 1px solid #cbd5e1;
      font-size: 10.5px;
      font-weight: 700;
      color: #1e293b;
    }
    .header-right {
      display: flex;
      align-items: flex-start;
      gap: 12px;
      flex-shrink: 0;
    }
    .meta-box {
      text-align: right;
      font-size: 11px;
      color: #475569;
      line-height: 1.5;
      max-width: 210px;
    }
    .meta-platform {
      font-weight: 800;
      color: #0f172a;
      font-size: 13px;
      margin-bottom: 2px;
    }
    .qr-card {
      border: 1.5px solid #0f172a;
      border-radius: 10px;
      padding: 6px;
      background: #ffffff;
      text-align: center;
      width: 106px;
      flex-shrink: 0;
    }
    .qr-card img {
      width: 88px;
      height: 88px;
      display: block;
      margin: 0 auto 4px auto;
    }
    .qr-label {
      font-size: 9.5px;
      font-weight: 800;
      color: #0f172a;
      line-height: 1.25;
    }
    .qr-sub {
      font-size: 8.5px;
      color: #059669;
      font-weight: 700;
      margin-top: 1px;
    }

    /* Attached Files in Report */
    .file-attachment-card {
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 10px;
      padding: 8px 10px;
      border: 1px solid #e2e8f0;
      border-radius: 8px;
      background: #f8fafc;
      margin-bottom: 6px;
    }
    .file-attachment-info {
      flex: 1;
      min-width: 0;
    }
    .file-attachment-name {
      font-size: 11.5px;
      font-weight: 800;
      color: #0f172a;
      word-break: break-all;
    }
    .file-attachment-meta {
      font-size: 10px;
      color: #64748b;
      margin-top: 2px;
    }
    .file-attachment-link {
      font-size: 9.5px;
      color: #0284c7;
      word-break: break-all;
      margin-top: 3px;
    }
    .file-attachment-link a {
      color: #0284c7;
      text-decoration: underline;
    }
    .file-attachment-qr {
      width: 70px;
      flex-shrink: 0;
      border: 1px solid #cbd5e1;
      border-radius: 6px;
      background: #ffffff;
      padding: 4px;
      text-align: center;
    }
    .file-attachment-qr img {
      width: 58px;
      height: 58px;
      display: block;
      margin: 0 auto;
    }

    /* Sections */
    .section-box {
      margin-bottom: 10px;
      border: 1px solid #cbd5e1;
      border-radius: 10px;
      padding: 10px 12px;
      background: #ffffff;
    }
    .section-title {
      font-size: 13px;
      font-weight: 800;
      color: #0f172a;
      border-bottom: 1px solid #e2e8f0;
      padding-bottom: 5px;
      margin-bottom: 8px;
    }
    .info-grid {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 6px 10px;
    }
    .info-item {
      background: #f8fafc;
      border: 1px solid #e2e8f0;
      border-radius: 7px;
      padding: 5px 8px;
    }
    .info-label {
      display: block;
      font-size: 10.5px;
      color: #64748b;
      font-weight: 700;
      margin-bottom: 2px;
    }
    .info-value {
      display: block;
      font-size: 12px;
      color: #0f172a;
      font-weight: 700;
      line-height: 1.45;
      word-break: break-word;
    }
    .note-banner {
      margin-top: 10px;
      padding: 10px 12px;
      background: #fffbeb;
      border-radius: 8px;
      border: 1px solid #fde68a;
    }
    .note-banner-title {
      font-size: 11px;
      font-weight: 800;
      color: #92400e;
      margin-bottom: 4px;
    }
    .note-banner-body {
      font-size: 12px;
      color: #0f172a;
      font-weight: 500;
      line-height: 1.6;
      word-break: break-word;
    }
    .handoff-banner {
      margin-top: 8px;
      padding: 10px 12px;
      background: #ecfdf5;
      border-radius: 8px;
      border: 1px solid #a7f3d0;
    }
    .handoff-banner-title {
      font-size: 11px;
      font-weight: 800;
      color: #065f46;
      margin-bottom: 4px;
    }

    /* Multimedia Cards (Voice + Video Thumbnails) */
    .media-subhead {
      font-size: 11.5px;
      font-weight: 800;
      color: #334155;
      margin: 6px 0 6px 0;
    }
    .media-grid {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 8px;
      margin-bottom: 10px;
    }
    .voice-card {
      display: flex;
      align-items: center;
      gap: 10px;
      padding: 8px 10px;
      border-radius: 8px;
      background: #ecfdf5;
      border: 1px solid #a7f3d0;
    }
    .voice-icon {
      width: 32px;
      height: 32px;
      border-radius: 50%;
      background: #059669;
      color: #ffffff;
      font-size: 13px;
      font-weight: 800;
      display: flex;
      align-items: center;
      justify-content: center;
      flex-shrink: 0;
    }
    .voice-meta {
      min-width: 0;
      flex: 1;
    }
    .voice-title {
      font-size: 11.5px;
      font-weight: 800;
      color: #064e3b;
    }
    .voice-sub {
      font-size: 10.5px;
      color: #047857;
    }
    .voice-wave {
      font-size: 10px;
      font-family: monospace;
      color: #059669;
      font-weight: 700;
      margin-top: 2px;
    }

    .video-grid {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 10px;
    }
    .video-card {
      border: 1px solid #cbd5e1;
      border-radius: 8px;
      overflow: hidden;
      background: #0f172a;
      page-break-inside: avoid;
    }
    .video-thumb-wrap {
      position: relative;
      width: 100%;
      height: 124px;
      background: #0f172a;
      overflow: hidden;
    }
    .video-thumb-img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      display: block;
      opacity: 0.85;
    }
    .video-overlay-top {
      position: absolute;
      top: 8px;
      left: 8px;
      right: 8px;
      display: flex;
      justify-content: space-between;
      align-items: center;
    }
    .video-chip {
      background: #7c3aed;
      color: #ffffff;
      font-size: 9.5px;
      font-weight: 800;
      padding: 2px 7px;
      border-radius: 4px;
    }
    .video-chip-right {
      background: rgba(15, 23, 42, 0.8);
      color: #e2e8f0;
      font-size: 9px;
      font-weight: 700;
      padding: 2px 6px;
      border-radius: 4px;
    }
    .video-play-circle {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      width: 44px;
      height: 44px;
      border-radius: 50%;
      background: rgba(15, 23, 42, 0.82);
      border: 2px solid #ffffff;
      color: #ffffff;
      font-size: 18px;
      display: flex;
      align-items: center;
      justify-content: center;
      padding-left: 3px;
    }
    .video-overlay-bottom {
      position: absolute;
      bottom: 0;
      left: 0;
      right: 0;
      background: rgba(15, 23, 42, 0.84);
      color: #ffffff;
      font-size: 10px;
      font-weight: 700;
      padding: 4px 8px;
      text-align: center;
    }
    .video-caption {
      background: #ffffff;
      padding: 7px 10px;
      border-top: 1px solid #cbd5e1;
    }
    .video-caption-title {
      font-size: 11.5px;
      font-weight: 800;
      color: #0f172a;
    }
    .video-caption-sub {
      font-size: 10px;
      color: #475569;
      margin-top: 2px;
    }

    /* Complete activity history: normal document flow, with no fixed-height cells. */
    .activity-report { overflow: visible; }
    .activity-report .w-seg { max-width: 100%; white-space: normal; overflow-wrap: anywhere; }
    .audit-intro, .audit-legacy { font-size: 11px; line-height: 1.6; }
    .audit-legacy { color: #92400e; background: #fffbeb; padding: 8px; }
    .audit-current-summary { border-left: 3px solid #059669; padding: 8px 12px; font-size: 11.5px; margin-bottom: 12px; }
    .audit-stages { margin-bottom: 12px; }
    .audit-stage { border-bottom: 1px solid #cbd5e1; padding: 6px 0; font-size: 10px; break-inside: avoid; break-after: avoid; }
    .audit-stage strong { display: block; font-size: 11px; }
    .audit-stage-missing { grid-column: 1 / -1; border: 0; padding: 2px 0; color: #64748b; }
    .audit-current { background: #ecfdf5; border-color: #10b981; }
    .audit-event { border-bottom: 1px solid #e2e8f0; padding: 8px 0; margin: 0; font-size: 11.5px; overflow-wrap: anywhere; break-inside: avoid; }
    .audit-event-heading { display: flex; align-items: center; gap: 7px; font-size: 11px; break-after: avoid; }
    .audit-event-heading > span:last-child { color: #64748b; margin-left: auto; font-size: 10px; }
    .audit-avatar { width: 27px; height: 27px; border-radius: 50%; object-fit: cover; flex-shrink: 0; }
    .audit-avatar-fallback { background: #e2e8f0; color: #475569; text-align: center; line-height: 27px; }
    .audit-action { font-weight: 700; margin-top: 6px; }
    .audit-transition { color: #047857; font-weight: 700; margin: 6px 0; }
    .audit-change { margin: 6px 0; break-inside: avoid; }
    .audit-change h4 { margin: 0 0 2px; color: #334155; font-size: 11px; break-after: avoid; }
    .audit-before, .audit-after { padding: 2px 8px; border-left: 2px solid #cbd5e1; }
    .audit-after { border-color: #10b981; }
    .audit-before > b, .audit-after > b { display: block; font-size: 10px; color: #64748b; break-after: avoid; }
    .audit-after > b { color: #047857; }
    .audit-empty { color: #64748b; font-size: 10px; }
    .audit-value-item { margin: 4px 0; }
    .audit-media { margin: 5px 0; break-inside: avoid; }
    .audit-media img { display: block; width: 160px; max-height: 160px; object-fit: contain; margin: 4px 0; }
    .audit-media a { color: #047857; text-decoration: underline; }
    .audit-content p { margin: 6px 0; orphans: 3; widows: 3; }
    .audit-viewers { font-size: 13px; margin: 16px 0 5px; break-after: avoid; }

    /* Tables */
    .data-table {
      width: 100%;
      table-layout: fixed;
      border-collapse: collapse;
      font-size: 11.5px;
    }
    .data-table th, .data-table td {
      border: 1px solid #cbd5e1;
      padding: 7px 8px;
      text-align: left;
      vertical-align: top;
      word-break: break-word;
      overflow-wrap: anywhere;
      overflow: hidden;
    }
    .data-table th {
      background: #f8fafc;
      font-weight: 800;
      color: #1e293b;
      font-size: 11px;
    }
    .table-thumb {
      width: 62px;
      height: 62px;
      object-fit: cover;
      border-radius: 6px;
      border: 1px solid #cbd5e1;
      display: block;
    }
    .table-thumb-empty {
      width: 62px;
      height: 62px;
      border-radius: 6px;
      background: #f1f5f9;
      border: 1px solid #cbd5e1;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 10px;
      color: #94a3b8;
    }
    .cell-title {
      font-weight: 800;
      color: #0f172a;
      font-size: 12px;
      line-height: 1.4;
      margin-bottom: 2px;
    }
    .cell-text {
      color: #1e293b;
      font-size: 11.5px;
      line-height: 1.45;
    }
    .cell-sub {
      font-size: 10.5px;
      color: #475569;
      line-height: 1.4;
      margin-top: 2px;
    }
    .cell-price-green {
      font-weight: 800;
      color: #047857;
      font-size: 12.5px;
    }
    .cell-price-amber {
      font-weight: 800;
      color: #b45309;
      font-size: 12.5px;
    }
    .cell-voice-badge {
      display: inline-block;
      margin-top: 4px;
      padding: 2px 6px;
      border-radius: 4px;
      background: #ecfdf5;
      border: 1px solid #a7f3d0;
      color: #047857;
      font-size: 9.5px;
      font-weight: 700;
    }

    /* Photos Grid */
    .photo-grid {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      gap: 10px;
    }
    .photo-card {
      border: 1px solid #cbd5e1;
      border-radius: 8px;
      overflow: hidden;
      background: #f8fafc;
      page-break-inside: avoid;
      break-inside: avoid;
    }
    .photo-card img {
      width: 100%;
      height: 185px;
      object-fit: contain;
      background: #f8fafc;
      display: block;
    }
    .photo-caption {
      padding: 6px 8px;
      font-size: 10.5px;
      font-weight: 700;
      color: #334155;
      background: #ffffff;
      border-top: 1px solid #e2e8f0;
      line-height: 1.35;
    }

    /* Comments */
    .comment-box {
      border: 1px solid #cbd5e1;
      border-radius: 8px;
      padding: 8px 10px;
      margin-bottom: 8px;
      background: #f8fafc;
      font-size: 11.5px;
      page-break-inside: avoid;
    }
    .comment-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      gap: 8px;
      margin-bottom: 4px;
    }
    .comment-author {
      font-weight: 800;
      font-size: 11px;
      color: #0f172a;
    }
    .comment-time {
      font-size: 10px;
      color: #64748b;
    }
    .comment-body {
      color: #1e293b;
      font-weight: 500;
      line-height: 1.5;
    }
    .reply-list {
      margin-top: 6px;
      padding-left: 12px;
      border-left: 3px solid #3b82f6;
    }
    .reply-item {
      background: #ffffff;
      border: 1px solid #e2e8f0;
      border-radius: 6px;
      padding: 6px 8px;
      margin-top: 5px;
    }
    .empty-note {
      font-size: 11.5px;
      color: #64748b;
      text-align: center;
      padding: 10px;
      background: #f8fafc;
      border-radius: 6px;
      border: 1px dashed #cbd5e1;
    }
    .direct-link-bar {
      margin-top: 6px;
      padding: 6px 10px;
      background: #f8fafc;
      border: 1px solid #cbd5e1;
      border-radius: 6px;
      font-size: 10px;
      color: #334155;
    }

    @media print {
      body { background: #ffffff; }
      .toolbar { display: none !important; }
      .sheet-outer { padding: 0; overflow: visible; }
      .page-sheet {
        width: 100%;
        min-width: 0;
        max-width: 100%;
        margin: 0;
        padding: 0;
        box-shadow: none;
      }
    }
  </style>
</head>
<body>
  <div class="toolbar">
    <div>
      <strong style="font-size:14px;">รายงานสรุปฉบับสมบูรณ์: ${Z(g)}</strong>
      <span id="status-indicator" style="font-size:12px;color:#94a3b8;margin-left:10px;">
        ${l==="pdf"?"กำลังจัดหน้าและสร้างไฟล์ PDF...":"พร้อมพิมพ์รายงาน"}
      </span>
    </div>
    <div style="display:flex;gap:8px;">
      <button class="toolbar-btn btn-pdf" onclick="triggerDownloadPdf()">ดาวน์โหลด PDF</button>
      <button class="toolbar-btn btn-print" onclick="window.print()">สั่งพิมพ์ (Print)</button>
      <button class="toolbar-btn btn-close" onclick="window.close()">ปิดหน้านี้</button>
    </div>
  </div>

  <div class="sheet-outer">
    <div id="report-content" class="page-sheet">
      <!-- Report Header with QR Code -->
      <div class="report-header">
        <div class="header-left">
          <div class="badge">${f(`${s?"รายงานซัพพลายเออร์ & โรงงาน":"รายงานเรฟร้านน้ำ & R&D"} · ${w}`)}</div>
          <h1 class="brand-title">${f(g)}</h1>
          <div class="brand-sub">${f(`${b?`${b} · `:""}หมวดหมู่: ${k}`)}</div>

          <!-- At-a-glance Multimedia & Detail Counter Pills -->
          <div class="summary-pills">
            <span class="summary-pill">${f(`รูปภาพ ${v.length} รูป`)}</span>
            <span class="summary-pill">${f(`วอยซ์เสียง ${N.length} คลิป`)}</span>
            <span class="summary-pill">${f(`วิดีโอ ${F.length} คลิป`)}</span>
            <span class="summary-pill">${f(s?`สินค้า ${((r==null?void 0:r.catalogItems)||[]).length} รายการ`:`เมนูชิม ${((o==null?void 0:o.drinkItems)||[]).length} เมนู`)}</span>
            <span class="summary-pill">${f(`คอมเมนต์ ${E.length} หัวข้อ`)}</span>
            <span class="summary-pill">${f(`ประวัติ Log ${h.length} รายการ`)}</span>
          </div>

          <div class="direct-link-bar">
            <div class="info-label" style="color:#0f172a;margin-bottom:2px;">Direct Link (Scan QR / LINE Share):</div>
            <div style="color:#059669;font-family:monospace;font-size:10px;word-break:break-all;">${Z(V)}</div>
          </div>
        </div>

        <div class="header-right">
          <div class="meta-box">
            <div class="meta-platform">${f("ฉันจะเป็นหัวแถว")}</div>
            <div>LEAD THE FRONT · R&amp;D</div>
            <div style="margin-top:4px;">${f(`รหัส: ${t.id.slice(0,18)}`)}</div>
            <div>${f(`สถานะ: ${M}`)}</div>
            <div>${f(`ออกรายงาน: ${new Date().toLocaleString("th-TH")}`)}</div>
          </div>

          ${p?`<div class="qr-card">
                  <img id="report-qr-img" src="${p}" alt="QR Code" />
                  <div class="qr-label">${f("สแกนเปิดในแอป")}</div>
                  <div class="qr-sub">${f("ฟังเสียง · ดูคลิปจริง")}</div>
                </div>`:""}
        </div>
      </div>

      <!-- Group 1: Overview, Contacts, Location & Handoff -->
      <div class="section-box">
        <div class="section-title">${f("กลุ่มที่ 1: ข้อมูลหลัก พิกัดสถานที่ ช่องทางติดต่อ และการรับช่วงต่อ")}</div>
        <div class="info-grid">
          <div class="info-item">
            <span class="info-label">${f("ชื่อรายการ / ร้านค้า")}</span>
            <span class="info-value">${f(`${g}${b?` (${b})`:""}`)}</span>
          </div>
          <div class="info-item">
            <span class="info-label">${f("หมวดหมู่ & คะแนนประเมิน")}</span>
            <span class="info-value">${f(`${k} · ${de}`)}</span>
          </div>
          <div class="info-item">
            <span class="info-label">${f("สถานที่ / ตลาด / เมือง")}</span>
            <span class="info-value">${f(A||((ie=t.location)==null?void 0:ie.addressText)||"-")}</span>
          </div>
          <div class="info-item">
            <span class="info-label">${f("พิกัด GPS & แผนที่")}</span>
            <span class="info-value">${t.location?`${t.location.lat.toFixed(5)}, ${t.location.lng.toFixed(5)} (${Z(t.location.addressText||"พิกัดหน้างาน")})`:"-"}</span>
          </div>
          <div class="info-item">
            <span class="info-label">${f("ช่องทางติดต่อ (WeChat / LINE / โทรศัพท์)")}</span>
            <span class="info-value">${f(`WeChat: ${(s?r==null?void 0:r.wechatId:o==null?void 0:o.wechatId)||"-"} | LINE: ${(s?r==null?void 0:r.lineId:o==null?void 0:o.lineId)||"-"} | โทร: ${(s?r==null?void 0:r.phone:o==null?void 0:o.phone)||"-"}`)}</span>
          </div>
          <div class="info-item">
            <span class="info-label">${f("ผู้ลงพื้นที่สำรวจ & เวลาที่บันทึก")}</span>
            <span class="info-value">${f(`${t.creator.alias}${t.creator.name&&t.creator.name!==t.creator.alias?` (${t.creator.name})`:""} · ${new Date(t.creator.timestamp).toLocaleString("th-TH")}`)}</span>
          </div>
          <div class="info-item">
            <span class="info-label">${f("ผู้รับผิดชอบรับช่วงต่อ & กำหนดติดตาม")}</span>
            <span class="info-value">${f(`${t.assignedTo?j(t.assignedTo):"ยังไม่ระบุผู้รับผิดชอบ"} · กำหนดติดตาม: ${t.targetFollowUpDate||"-"}`)}</span>
          </div>
          <div class="info-item">
            <span class="info-label">${f("การมีส่วนร่วมของทีม (Likes & Views)")}</span>
            <span class="info-value">${f(`กดถูกใจ ${B.length} คน · เปิดอ่านแล้ว ${I.length} คน`)}</span>
          </div>
        </div>

        ${(s?r!=null&&r.memo:o!=null&&o.tastingNotes)?`<div class="note-banner">
                <div class="note-banner-title">${f(s?"บันทึกภาพรวมหน้างาน / รายละเอียดสเปกหลัก:":"บันทึกรีวิวรสชาติ & ไอเดียเรฟหน้างาน:")}</div>
                <div class="note-banner-body">${f(s?r==null?void 0:r.memo:o==null?void 0:o.tastingNotes)}</div>
              </div>`:""}

        ${t.handoffNotes?`<div class="handoff-banner">
                <div class="handoff-banner-title">${f("โน้ตการส่งมอบงาน / ผลเจรจาทีมไทย:")}</div>
                <div class="note-banner-body">${f(t.handoffNotes)}</div>
              </div>`:""}
      </div>

      <!-- Group 2: Voice Recordings & Video Clips with Thumbnail Previews -->
      <div class="section-box">
        <div class="section-title">${f(`กลุ่มที่ 2: สื่อมัลติมีเดียหน้างาน — วอยซ์เสียงบันทึก (${N.length} คลิป) & วิดีโอ (${F.length} คลิป)`)}</div>
        <div class="media-subhead">${f(`ไฟล์เสียงบันทึกหน้างานจริง (${N.length} คลิป):`)}</div>
        ${Y}
        <div class="media-subhead" style="margin-top:10px;">${f(`คลิปวิดีโอหน้างานพร้อมภาพ Thumbnail พรีวิว (${F.length} คลิป):`)}</div>
        ${oe}
      </div>

      <!-- Group 3: Catalog / Drink Items -->
      ${fe}

      <!-- Attached Documents & Files -->
      ${De}

      <!-- Group 4: All Photos of This Item -->
      <div class="section-box">
        <div class="section-title">${f(`กลุ่มที่ 4: แกลเลอรีภาพถ่ายทั้งหมดของรายการนี้ (${v.length} รูป)`)}</div>
        ${ke}
      </div>

      <!-- Group 6: Activity & Handoff Log + Viewer Log -->
      <div class="section-box activity-report" id="activity-history">
        <div class="section-title">${f(`กลุ่มที่ 5: ประวัติการดำเนินงานและความคิดเห็น (${h.length} เหตุการณ์)`)}</div>
        <p class="audit-intro">${f("จัดตามพาร์ทที่เกี่ยวข้อง แต่ละพาร์ทเรียงเหตุการณ์จากเก่าไปใหม่")}</p>
        <div class="audit-current-summary"><strong>${f(`ปัจจุบัน: ${M}`)}</strong><div>${f(`ผู้รับช่วงต่อ: ${t.assignedTo?j(t.assignedTo):"ยังไม่ระบุ"} · กำหนดติดตาม: ${t.targetFollowUpDate||"ยังไม่ระบุ"}`)}</div></div>
        ${ge()}
        ${h.some(c=>c.version!==2)?`<p class="audit-legacy">${f("ประวัติเก่าแสดงตามที่บันทึกไว้ ไม่เติมขั้นตอนย้อนหลัง")}</p>`:""}
        ${ee?`<h3 class="audit-viewers">ประวัติที่ไม่ได้ระบุพาร์ท</h3>${ee}`:""}
        ${I.length?`<h3 class="audit-viewers">${f("ผู้เปิดอ่านรายการ")}</h3>${X}`:""}
      </div>
    </div>
  </div>

  <script>
    // Extract real video frame thumbnail into <img data-video-src> when possible
    function prepareVideoThumbnails() {
      var imgs = Array.prototype.slice.call(document.querySelectorAll('img[data-video-src]'));
      return Promise.all(imgs.map(function(img) {
        return new Promise(function(resolve) {
          var src = img.getAttribute('data-video-src');
          if (!src) return resolve();
          var done = false;
          var finish = function() {
            if (!done) {
              done = true;
              resolve();
            }
          };
          var timer = setTimeout(finish, 1800);
          try {
            var video = document.createElement('video');
            video.crossOrigin = 'anonymous';
            video.muted = true;
            video.playsInline = true;
            video.preload = 'auto';
            video.addEventListener('loadeddata', function() {
              try {
                video.currentTime = Math.min(0.5, (video.duration || 1) * 0.25);
              } catch (e) {
                clearTimeout(timer);
                finish();
              }
            });
            video.addEventListener('seeked', function() {
              try {
                var canvas = document.createElement('canvas');
                canvas.width = video.videoWidth || 480;
                canvas.height = video.videoHeight || 270;
                var ctx = canvas.getContext('2d');
                if (ctx) {
                  ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
                  img.src = canvas.toDataURL('image/jpeg', 0.85);
                }
              } catch (e) {}
              clearTimeout(timer);
              finish();
            });
            video.addEventListener('error', function() {
              clearTimeout(timer);
              finish();
            });
            video.src = src;
          } catch (e) {
            clearTimeout(timer);
            finish();
          }
        });
      }));
    }

    // Rasterize all SVG QR images onto PNG Data URLs so html2canvas renders them crisply on all browsers
    function rasterizeQrImage() {
      var qrImgs = Array.prototype.slice.call(document.querySelectorAll('#report-qr-img, .file-attachment-qr img'));
      if (!qrImgs.length) return Promise.resolve();
      return Promise.all(qrImgs.map(function(img) {
        return new Promise(function(resolve) {
          if (!img || !img.src) return resolve();
          var finish = function() { resolve(); };
          var temp = new Image();
          temp.onload = function() {
            try {
              var canvas = document.createElement('canvas');
              canvas.width = 240;
              canvas.height = 240;
              var ctx = canvas.getContext('2d');
              if (ctx) {
                ctx.fillStyle = '#ffffff';
                ctx.fillRect(0, 0, 240, 240);
                ctx.drawImage(temp, 0, 0, 240, 240);
                img.src = canvas.toDataURL('image/png');
              }
            } catch (e) {}
            finish();
          };
          temp.onerror = finish;
          temp.src = img.src;
        });
      }));
    }

    function triggerDownloadPdf() {
      var statusEl = document.getElementById('status-indicator');
      if (statusEl) statusEl.textContent = 'กำลังสร้างไฟล์ PDF...';
      var element = document.getElementById('report-content');
      // Avoid blank/truncated canvas exports for very long histories. Native print
      // paginates the full document without imposing one enormous image canvas.
      if (element && element.scrollHeight > 14000) {
        if (statusEl) statusEl.textContent = 'รายงานมีหลายหน้า กรุณาเลือกบันทึกเป็น PDF ในหน้าพิมพ์เพื่อเก็บข้อมูลครบ';
        window.print();
        return;
      }
      if (window.html2pdf && element) {
        window.scrollTo(0, 0);
        var opt = {
          margin: [8, 8, 8, 8],
          filename: ${JSON.stringify($)},
          image: { type: 'jpeg', quality: 0.96 },
          html2canvas: {
            scale: 2,
            useCORS: true,
            allowTaint: false,
            x: 0,
            y: 0,
            scrollX: 0,
            scrollY: 0,
            windowWidth: 732,
            width: 732
          },
          jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' },
          pagebreak: {
            mode: ['css', 'legacy'],
            avoid: ['tr', '.info-item', '.voice-card', '.video-card', '.photo-card', '.comment-box', '.note-banner', '.handoff-banner', '.report-header', '.file-attachment-card', '.audit-stage', '.audit-event', '.audit-change', '.audit-event-heading', '.audit-media']
          }
        };
        var worker = window.html2pdf().set(opt).from(element);
        worker.toContainer().then(function() {
          if (this.prop && this.prop.overlay) {
            this.prop.overlay.style.position = 'absolute';
            this.prop.overlay.style.overflow = 'visible';
            this.prop.overlay.style.left = '0px';
            this.prop.overlay.style.top = '0px';
            this.prop.overlay.style.right = 'auto';
            this.prop.overlay.style.bottom = 'auto';
            this.prop.overlay.style.width = '732px';
          }
          if (this.prop && this.prop.container) {
            this.prop.container.style.position = 'relative';
            this.prop.container.style.margin = '0px';
            this.prop.container.style.left = '0px';
            this.prop.container.style.right = 'auto';
            this.prop.container.style.top = '0px';
            this.prop.container.style.width = '732px';
          }
        }).toCanvas().toPdf().save().then(function() {
          if (statusEl) statusEl.textContent = 'ดาวน์โหลดไฟล์ PDF สำเร็จแล้ว';
        }).catch(function() {
          window.print();
        });
      } else {
        window.print();
      }
    }

    window.addEventListener('load', function() {
      var mode = ${JSON.stringify(l)};
      var fontsReady = (document.fonts && document.fonts.ready) ? document.fonts.ready : Promise.resolve();
      Promise.all([fontsReady, rasterizeQrImage(), prepareVideoThumbnails()]).then(function() {
        setTimeout(function() {
          if (mode === 'pdf') {
            triggerDownloadPdf();
          } else {
            window.print();
          }
        }, 350);
      });
    });
  <\/script>
</body>
</html>`}function Hs(t,i,l,n=[]){const s=ca(t,i,l,n),a=new Blob([s],{type:"text/html;charset=utf-8"}),r=URL.createObjectURL(a);if(!window.open(r,"_blank")){const o=document.createElement("a");o.href=r,o.target="_blank",o.click()}setTimeout(()=>URL.revokeObjectURL(r),6e4)}const ma=({item:t,isOpen:i,onClose:l,onShareToLine:n})=>{var Pt,Lt,Mt,Dt,zt,Ft,Ut,qt,_t,Vt,Ht,Ot,Qt,Gt,Kt,Jt,Yt,Wt,Zt,Xt,es,ts,ss,ns,as;const{currentUser:s,convertCnyToThb:a,addReviewerNote:r,addReviewReply:u,updatePipelineStatus:o,toggleLikeItem:g,suppliers:b,drinkStores:k,locations:A,users:w,quickMessages:L,recordItemView:D,canEditItems:V,canDeleteItems:p,deleteSupplier:v,deleteStoreInspo:R,deleteLocation:N,canComment:F,openEditItem:x}=dn(),I=t&&t.type==="supplier"?b.find(d=>d.id===t.id):null,B=t&&t.type==="drink_store"?k.find(d=>d.id===t.id):null,E=t&&t.type==="location"?A.find(d=>d.id===t.id):null,h=I||B||E||t,[j,$]=J.useState(null),[P,M]=J.useState(""),[Y,oe]=J.useState(null),[fe,me]=J.useState({}),[De,ke]=J.useState({}),[ne,ve]=J.useState([]),[we,ze]=J.useState({}),ge=Ce.useRef({}),[ae,ee]=J.useState(!1),X=Ce.useRef(!1),de=(d,S)=>{ge.current[d]=S,ze(q=>({...q,[d]:S}))},[le,Re]=J.useState(null),[ce,Fe]=J.useState(!1),[ye,$e]=J.useState({}),[re,je]=J.useState(null),[Ue,qe]=J.useState(0),xe=Ce.useRef(null),be=Ce.useRef(null),ie=Ce.useRef(null),c=Ce.useRef(0),m=Ce.useCallback(()=>{var d;if(ie.current&&(clearInterval(ie.current),ie.current=null),xe.current&&xe.current.state==="recording"){xe.current.stop();return}(d=be.current)==null||d.getTracks().forEach(S=>S.stop()),be.current=null,je(null)},[]);J.useEffect(()=>(i&&(t!=null&&t.id)&&D(t.id,t.type),$(null),()=>{var d,S;ie.current&&clearInterval(ie.current),((d=xe.current)==null?void 0:d.state)==="recording"&&xe.current.stop(),(S=be.current)==null||S.getTracks().forEach(q=>q.stop())}),[i,t==null?void 0:t.id]);const[U,O]=J.useState("storefront"),K=Dn(h),H=((Pt=K.find(d=>d.id===U))==null?void 0:Pt.photos)||[];if(J.useEffect(()=>{if(j===null||H.length===0)return;const d=S=>{S.key==="ArrowRight"?$(q=>q!==null?(q+1)%H.length:null):S.key==="ArrowLeft"?$(q=>q!==null?(q-1+H.length)%H.length:null):S.key==="Escape"&&$(null)};return window.addEventListener("keydown",d),()=>window.removeEventListener("keydown",d)},[j,H.length]),!i||!h)return null;const _=h.type==="supplier",Q=h.type==="drink_store",te=h.type==="location",C=_?h:null,T=Q?h:null,y=te?h:null,Oe=Array.isArray(h.likes)?h.likes:[],kt=Oe.some(d=>d.userId===s.id),$t=h.attachedFiles||[],Ct=h.videos||[],St=ue(h),Et=_?(C==null?void 0:C.catalogItems)||[]:[],At=Q?(T==null?void 0:T.drinkItems)||[]:[],Tt=(d,S)=>{var W;const G=(((W=K.find(se=>se.id===S))==null?void 0:W.photos)||[]).findIndex(se=>se.url===Je(d));G<0||(O(S),$(G))},Rt=async()=>{if(!h)return;const d=_?C==null?void 0:C.name:te?y==null?void 0:y.name:T==null?void 0:T.storeName;if(window.confirm(`ยืนยันการลบรายการ "${d||"รายการนี้"}" หรือไม่?`))try{h.type==="supplier"?await v(h.id):h.type==="drink_store"?await R(h.id):h.type==="location"&&await N(h.id),l()}catch{alert("เกิดข้อผิดพลาดในการลบรายการ")}},Ws=async(d,S,q)=>{try{Fe(!0);const G=await Tn(d,{recordId:h.id,recordType:h.type,recordTitle:_?C==null?void 0:C.name:te?y==null?void 0:y.name:T==null?void 0:T.storeName});q?$e(W=>({...W,[q]:{...W[q],voiceUrl:G}})):Re(G)}catch(G){alert(G.message||"อัปโหลดไฟล์แนบไม่สำเร็จ")}finally{Fe(!1)}},It=async d=>{var S,q;if(re===d){m();return}re&&m();try{if(!((S=navigator.mediaDevices)!=null&&S.getUserMedia)||typeof MediaRecorder>"u"){alert("เบราว์เซอร์นี้ไม่รองรับการอัดเสียงสด กรุณาเปิดผ่าน HTTPS หรืออนุญาตไมโครโฟน");return}const G=await navigator.mediaDevices.getUserMedia({audio:!0});be.current=G;const W=["audio/mp4","audio/webm;codecs=opus","audio/webm","audio/ogg"].find(z=>MediaRecorder.isTypeSupported(z)),se=new MediaRecorder(G,W?{mimeType:W}:void 0);xe.current=se;const Ie=[];se.ondataavailable=z=>{z.data.size>0&&Ie.push(z.data)},se.onstop=()=>{var rs;ie.current&&(clearInterval(ie.current),ie.current=null),G.getTracks().forEach(sn=>sn.stop()),be.current=null,je(null);const z=((rs=se.mimeType)==null?void 0:rs.split(";")[0])||"audio/webm",_e=new Blob(Ie,{type:z});if(!_e.size)return;const en=z.includes("mp4")?"m4a":z.includes("ogg")?"ogg":"webm",tn=new File([_e],`เสียงคอมเมนต์-${Date.now()}.${en}`,{type:z});Ws(tn,"audio",d==="main"?void 0:d)},se.onerror=()=>{ie.current&&clearInterval(ie.current),G.getTracks().forEach(z=>z.stop()),je(null),alert("อัดเสียงไม่สำเร็จ กรุณาลองใหม่")},c.current=Date.now(),qe(0),je(d),se.start(250),ie.current=setInterval(()=>{qe(Math.round((Date.now()-c.current)/1e3))},1e3)}catch{(q=be.current)==null||q.getTracks().forEach(G=>G.stop()),je(null),alert("ไม่ได้รับสิทธิ์ใช้ไมโครโฟน กรุณากดอนุญาตไมโครโฟนเพื่ออัดเสียงสด")}},Zs=async d=>{if(d.preventDefault(),X.current||ge.current.main||ce||re)return;const S=P.trim();if(!(!S&&!ne.length&&!le)){X.current=!0,ee(!0);try{if(!await r(h.id,h.type,S,{media:ne,voiceUrl:le||void 0}))return;M(""),ve([]),Re(null)}finally{X.current=!1,ee(!1)}}},Bt=async(d,S,q)=>{var se;if(X.current||ge.current[d]||ce||re)return;const G=(fe[d]||"").trim(),W=ye[d];if(!(!G&&!((se=W==null?void 0:W.media)!=null&&se.length)&&!(W!=null&&W.voiceUrl))){X.current=!0,ee(!0);try{if(!await u(h.id,h.type,d,G,S,{media:W==null?void 0:W.media,voiceUrl:W==null?void 0:W.voiceUrl,replyToId:q}))return;me(z=>({...z,[d]:""})),$e(z=>({...z,[d]:{}})),oe(null)}finally{X.current=!1,ee(!1)}}},Xs=d=>{C&&o(C.id,d)},Qe=ue(h);return(Lt=Qe[0])!=null&&Lt.url||(_?C==null||C.voiceNoteUrl:T==null||T.voiceNoteUrl),e.jsxs("div",{className:"fixed inset-0 z-[90] bg-black/45 backdrop-blur-sm flex items-center justify-center p-2 sm:p-4 overflow-y-auto",children:[e.jsxs("div",{className:"bg-white border border-slate-200/90 w-full max-w-3xl rounded-2xl shadow-2xl overflow-hidden my-auto animate-in zoom-in-95 max-h-[94vh] flex flex-col text-slate-900",children:[e.jsxs("div",{className:"p-3.5 sm:p-4 border-b border-slate-100 space-y-2.5 bg-white sticky top-0 z-10",children:[e.jsxs("div",{className:"flex items-start justify-between gap-2.5",children:[e.jsxs("div",{className:"flex items-start gap-2.5 min-w-0 flex-1",children:[e.jsx("span",{className:`p-2 rounded-xl shrink-0 mt-0.5 ${_?"bg-emerald-50 text-emerald-700":te?"bg-sky-50 text-sky-700":"bg-amber-50 text-amber-700"}`,children:_?e.jsx(cn,{className:"w-4 h-4 sm:w-5 sm:h-5 text-emerald-600"}):te?e.jsx("i",{"aria-hidden":"true",className:"fa-solid fa-map-location-dot text-base text-sky-600"}):e.jsx(is,{className:"w-4 h-4 sm:w-5 sm:h-5 text-amber-600"})}),e.jsxs("div",{className:"min-w-0 flex-1",children:[e.jsx("h2",{className:"font-extrabold text-slate-900 text-sm sm:text-base leading-snug break-words",children:_?C==null?void 0:C.name:te?y==null?void 0:y.name:T==null?void 0:T.storeName}),e.jsx("p",{className:"text-xs text-slate-400 truncate mt-0.5",children:_?(C==null?void 0:C.chineseName)||(C==null?void 0:C.marketOrCity):te?(y==null?void 0:y.zoneOrFloor)||(y==null?void 0:y.foreignName):(T==null?void 0:T.chineseName)||(T==null?void 0:T.storeCategory)||(T==null?void 0:T.brandConcept)})]})]}),e.jsx("button",{type:"button",onClick:l,className:"w-7 h-7 sm:w-8 sm:h-8 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-600 transition-all active:scale-95 flex items-center justify-center shrink-0",title:"ปิดหน้าต่าง",children:e.jsx(Ge,{className:"w-4 h-4"})})]}),e.jsxs("div",{className:"flex items-center gap-1.5 overflow-x-auto no-scrollbar pt-2 border-t border-slate-100 select-none",children:[V&&e.jsxs("button",{type:"button",onClick:()=>x(h),className:"h-7 sm:h-8 px-2.5 rounded-xl bg-amber-50 hover:bg-amber-100 text-amber-800 border border-amber-200/90 text-xs font-bold active:scale-95 transition-all inline-flex items-center gap-1 whitespace-nowrap shrink-0",title:"แก้ไขข้อมูลรายการนี้ (Admin / Editor)",children:[e.jsx(os,{className:"w-3 h-3 text-amber-600 shrink-0"}),e.jsx("span",{children:"แก้ไข"})]}),p&&e.jsxs("button",{type:"button",onClick:Rt,className:"h-7 sm:h-8 px-2.5 rounded-xl bg-rose-50 hover:bg-rose-100 text-rose-700 border border-rose-200 text-xs font-bold active:scale-95 transition-all inline-flex items-center gap-1 whitespace-nowrap shrink-0",title:"ลบรายการ",children:[e.jsx(ls,{className:"w-3 h-3 text-rose-600 shrink-0"}),e.jsx("span",{children:"ลบรายการ"})]}),e.jsxs("button",{type:"button",onClick:()=>g(h.id,h.type),className:`h-7 sm:h-8 px-2.5 rounded-xl border transition-all active:scale-95 inline-flex items-center gap-1 text-xs font-bold whitespace-nowrap shrink-0 ${kt?"bg-blue-50 text-blue-700 border-blue-200":"bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100"}`,title:`ถูกใจ (${Oe.length})`,children:[e.jsx(un,{className:`w-3 h-3 shrink-0 ${kt?"fill-blue-600 text-blue-600":""}`}),e.jsxs("span",{children:["ถูกใจ",Oe.length>0?` (${Oe.length})`:""]})]}),e.jsxs("button",{type:"button",onClick:()=>n(h),className:"h-7 sm:h-8 px-2.5 rounded-xl bg-[#06C755] hover:bg-[#05b34c] text-white text-xs font-bold transition-all active:scale-95 inline-flex items-center gap-1 whitespace-nowrap shrink-0 shadow-2xs",title:"แชร์ลิงก์เข้า LINE",children:[e.jsx(hn,{className:"w-3 h-3 shrink-0"}),e.jsx("span",{children:"แชร์ LINE"})]}),e.jsxs("button",{type:"button",onClick:()=>Hs(h,a,"pdf",w),className:"h-7 sm:h-8 px-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold transition-all active:scale-95 inline-flex items-center gap-1 whitespace-nowrap shrink-0",title:"ดาวน์โหลดรายงานเป็นไฟล์ PDF",children:[e.jsx(Mn,{className:"w-3 h-3 text-emerald-400 shrink-0"}),e.jsx("span",{children:"ดาวน์โหลด PDF"})]}),e.jsxs("button",{type:"button",onClick:()=>Hs(h,a,"print",w),className:"h-7 sm:h-8 px-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold transition-all border border-slate-200/80 active:scale-95 inline-flex items-center gap-1 whitespace-nowrap shrink-0",title:"พิมพ์รายงานฉบับจัดหน้าสวยงาม (Print)",children:[e.jsx(Ln,{className:"w-3 h-3 text-slate-600 shrink-0"}),e.jsx("span",{children:"พิมพ์"})]})]})]}),e.jsxs("div",{className:"p-4 sm:p-6 space-y-4 overflow-y-auto flex-1",children:[e.jsxs("div",{className:"flex flex-wrap items-center justify-between gap-2 p-3 bg-slate-50 rounded-xl border border-slate-100 text-xs",children:[e.jsxs("div",{className:"flex items-center gap-2.5",children:[e.jsx(Ye,{src:h.creator.avatar,alt:h.creator.alias,className:"w-8 h-8 rounded-full object-cover ring-2 ring-emerald-500/20 shadow-xs"}),e.jsxs("div",{children:[e.jsx("div",{className:"text-slate-800 font-bold flex items-center gap-1.5",children:e.jsxs("span",{children:["ผู้ลงพื้นที่สำรวจ: ",h.creator.alias,h.creator.name&&h.creator.name!==h.creator.alias?` (${h.creator.name})`:""]})}),e.jsxs("div",{className:"text-[11px] text-slate-400 font-mono",children:["บันทึกเมื่อ: ",new Date(h.creator.timestamp).toLocaleString("th-TH")]})]})]}),e.jsxs("div",{className:"flex items-center gap-2 flex-wrap",children:[e.jsx(pn,{viewedBy:h.viewedBy,size:"md"}),_&&C&&e.jsxs("div",{className:"flex items-center gap-1.5",children:[e.jsx("span",{className:"text-[11px] text-slate-500",children:"สถานะ:"}),e.jsxs("select",{value:C.status,onChange:d=>Xs(d.target.value),className:"bg-white border border-slate-200 text-slate-800 text-xs font-bold rounded-lg px-2.5 py-1 focus:outline-none focus:border-emerald-500",children:[e.jsx("option",{value:"scouted",children:"1. สำรวจแล้ว"}),e.jsx("option",{value:"reviewing",children:"2. เทียบสเปก"}),e.jsx("option",{value:"rfq_sent",children:"3. ส่ง RFQ"}),e.jsx("option",{value:"shortlisted",children:"4. ตัวเต็ง (Shortlist)"}),e.jsx("option",{value:"ordered",children:"5. สั่งซื้อแล้ว (Ordered)"})]})]})]})]}),Qe.length>0&&e.jsxs("div",{className:"p-3 bg-emerald-50/70 border border-emerald-200/80 rounded-xl space-y-2",children:[e.jsxs("div",{className:"text-xs font-bold text-emerald-950 flex items-center justify-between",children:[e.jsxs("span",{className:"flex items-center gap-1.5",children:[e.jsx(Be,{className:"w-3.5 h-3.5 text-emerald-600"}),e.jsxs("span",{children:["วอยซ์เสียงบันทึกหน้างานจริง (",Qe.length," คลิป)"]})]}),e.jsx("span",{className:"text-[10px] font-mono text-emerald-700",children:"แตะ ▶ เพื่อฟังเสียงบันทึก"})]}),e.jsx("div",{className:"grid grid-cols-1 sm:grid-cols-2 gap-2",children:Qe.map((d,S)=>e.jsxs("div",{className:"p-2.5 bg-white border border-emerald-200 rounded-xl flex flex-col justify-between gap-1.5 shadow-2xs",children:[e.jsxs("div",{className:"flex items-center justify-between gap-2 min-w-0",children:[e.jsxs("div",{className:"text-xs font-bold text-slate-900 truncate flex items-center gap-1.5",children:[e.jsx(Be,{className:"w-3.5 h-3.5 text-emerald-600 shrink-0"}),e.jsx("span",{className:"truncate",children:d.label||`คลิปเสียง #${S+1}`})]}),e.jsx("span",{className:"text-[10px] text-emerald-700 font-mono shrink-0",children:d.durationSec?`${d.durationSec} วินาที`:"เสียงบันทึก"})]}),d.url&&e.jsx("audio",{controls:!0,preload:"metadata",playsInline:!0,src:d.url,className:"h-8 w-full rounded-lg"})]},d.id||S))})]}),e.jsxs("div",{className:"p-3 bg-slate-50 rounded-xl border border-slate-100 space-y-2 text-xs",children:[e.jsxs("div",{className:"flex flex-wrap items-center gap-1.5",children:[_&&C?e.jsxs(e.Fragment,{children:[e.jsxs("span",{className:"px-2.5 py-1 rounded-lg bg-emerald-600 text-white text-[11px] font-bold inline-flex items-center gap-1",children:[e.jsx("i",{className:"fa-solid fa-industry text-[10px]"}),e.jsx("span",{children:C.category})]}),e.jsx("span",{className:"px-2 py-1 rounded-lg bg-white border border-slate-200 text-slate-700 text-[11px] font-bold",children:C.isFactory?"โรงงานผลิต":"หน้าร้าน / โชว์รูม"}),e.jsxs("span",{className:"px-2 py-1 rounded-lg bg-amber-50 border border-amber-200 text-amber-700 text-[11px] font-mono font-bold inline-flex items-center gap-1",children:[e.jsx("i",{className:"fa-solid fa-star text-[10px] text-amber-500"}),e.jsxs("span",{children:[C.rating||5,"/5"]})]}),(C.quickTags||[]).map((d,S)=>e.jsxs("span",{className:"px-2 py-1 rounded-lg bg-white border border-slate-200 text-slate-700 text-[11px] font-semibold",children:["#",d]},S))]}):T?e.jsxs(e.Fragment,{children:[e.jsxs("span",{className:"px-2.5 py-1 rounded-lg bg-amber-600 text-white text-[11px] font-bold inline-flex items-center gap-1",children:[e.jsx("i",{className:"fa-solid fa-mug-hot text-[10px]"}),e.jsx("span",{children:T.storeCategory||"เรฟร้านน้ำ"})]}),T.ratings&&e.jsxs("span",{className:"px-2 py-1 rounded-lg bg-amber-50 border border-amber-200 text-amber-800 text-[11px] font-mono font-bold inline-flex items-center gap-1",children:[e.jsx("i",{className:"fa-solid fa-star text-[10px] text-amber-500"}),e.jsx("span",{children:((T.ratings.taste+T.ratings.aesthetics+T.ratings.value+T.ratings.speed)/4).toFixed(1)})]})]}):te&&y?e.jsxs(e.Fragment,{children:[e.jsxs("span",{className:"px-2.5 py-1 rounded-lg bg-sky-600 text-white text-[11px] font-bold inline-flex items-center gap-1",children:[e.jsx("i",{className:"fa-solid fa-map-location-dot text-[10px]"}),e.jsx("span",{children:y.locationType==="mall"?"ห้างสรรพสินค้า":y.locationType})]}),e.jsxs("span",{className:"px-2 py-1 rounded-lg bg-white border border-slate-200 text-slate-700 text-[11px] font-bold",children:["ผัง ",((Mt=y.spaceSpecs)==null?void 0:Mt.layoutFormat)||"Inline"]}),y.ratings&&e.jsxs("span",{className:"px-2 py-1 rounded-lg bg-amber-50 border border-amber-200 text-amber-800 text-[11px] font-mono font-bold inline-flex items-center gap-1",children:[e.jsx("i",{className:"fa-solid fa-star text-[10px] text-amber-500"}),e.jsx("span",{children:((y.ratings.footTraffic+y.ratings.visibility+y.ratings.accessibility+y.ratings.valueRoi)/4).toFixed(1)})]}),(y.quickTags||[]).map((d,S)=>e.jsxs("span",{className:"px-2 py-1 rounded-lg bg-white border border-slate-200 text-slate-700 text-[11px] font-semibold",children:["#",d]},S))]}):null,Et.length>0&&e.jsxs("span",{className:"px-2.5 py-1 rounded-lg bg-amber-50 border border-amber-200 text-amber-800 text-[11px] font-bold inline-flex items-center gap-1 shadow-2xs",children:[e.jsx(fn,{className:"w-3 h-3 text-amber-600"}),e.jsxs("span",{children:[Et.length," สินค้า"]})]}),At.length>0&&e.jsxs("span",{className:"px-2.5 py-1 rounded-lg bg-amber-50 border border-amber-200 text-amber-800 text-[11px] font-bold inline-flex items-center gap-1 shadow-2xs",children:[e.jsx(is,{className:"w-3 h-3 text-amber-600"}),e.jsxs("span",{children:[At.length," เมนู"]})]}),Ct.length>0&&e.jsxs("span",{className:"px-2.5 py-1 rounded-lg bg-purple-50 border border-purple-200 text-purple-700 text-[11px] font-bold inline-flex items-center gap-1 shadow-2xs",children:[e.jsx("i",{className:"fa-solid fa-video text-[9px] text-purple-600"}),e.jsxs("span",{children:[Ct.length," คลิป"]})]}),St.length>0&&e.jsxs("span",{className:"px-2.5 py-1 rounded-lg bg-rose-50 border border-rose-200 text-rose-700 text-[11px] font-bold inline-flex items-center gap-1 shadow-2xs",children:[e.jsx(Ve,{className:"w-3 h-3 text-rose-600"}),e.jsxs("span",{children:[St.length," คลิปเสียง"]})]}),$t.length>0&&e.jsxs("a",{href:"#detail-attached-files-section",onClick:d=>{var S;d.preventDefault(),(S=document.getElementById("detail-attached-files-section"))==null||S.scrollIntoView({behavior:"smooth"})},className:"px-2.5 py-1 rounded-lg bg-sky-50 border border-sky-200 text-sky-700 text-[11px] font-bold inline-flex items-center gap-1 hover:bg-sky-100 transition-colors cursor-pointer shadow-2xs",title:"คลิกเพื่อเลื่อนดูไฟล์แนบ",children:[e.jsx(ds,{className:"w-3 h-3 text-sky-600"}),e.jsxs("span",{children:[$t.length," ไฟล์แนบ"]})]})]}),e.jsxs("div",{className:"flex flex-wrap items-center justify-between gap-2 pt-1.5 border-t border-slate-200/60 text-[11px] text-slate-600",children:[e.jsxs("div",{className:"flex flex-wrap items-center gap-2",children:[e.jsxs("span",{className:"inline-flex items-center gap-1 font-semibold text-slate-800",children:[e.jsx(mn,{className:"w-3.5 h-3.5 text-sky-600 shrink-0"}),e.jsx("span",{children:_?(C==null?void 0:C.marketOrCity)||(C==null?void 0:C.address)||((Dt=C==null?void 0:C.location)==null?void 0:Dt.addressText):te?((zt=y==null?void 0:y.location)==null?void 0:zt.addressText)||(y==null?void 0:y.zoneOrFloor):((Ft=T==null?void 0:T.location)==null?void 0:Ft.addressText)||(T==null?void 0:T.city)})]}),(_?C==null?void 0:C.wechatId:te?(Ut=y==null?void 0:y.leaseTerms)==null?void 0:Ut.contactLineWechat:T==null?void 0:T.wechatId)&&e.jsxs("span",{className:"px-2 py-0.5 rounded bg-white border border-slate-200 font-mono",children:["LINE/WeChat: ",_?C==null?void 0:C.wechatId:te?(qt=y==null?void 0:y.leaseTerms)==null?void 0:qt.contactLineWechat:T==null?void 0:T.wechatId]}),(_?C==null?void 0:C.phone:te?(_t=y==null?void 0:y.leaseTerms)==null?void 0:_t.contactPhone:T==null?void 0:T.phone)&&e.jsxs("span",{className:"px-2 py-0.5 rounded bg-white border border-slate-200 font-mono",children:["โทร: ",_?C==null?void 0:C.phone:te?(Vt=y==null?void 0:y.leaseTerms)==null?void 0:Vt.contactPhone:T==null?void 0:T.phone]}),te&&((Ht=y==null?void 0:y.leaseTerms)==null?void 0:Ht.contactPerson)&&e.jsxs("span",{className:"px-2 py-0.5 rounded bg-white border border-slate-200",children:["ผู้ติดต่อ: ",y.leaseTerms.contactPerson]})]}),(Ot=h.location)!=null&&Ot.lat&&((Qt=h.location)!=null&&Qt.lng)&&(h.location.lat!==0||h.location.lng!==0)?e.jsx("a",{href:`https://www.google.com/maps?q=${h.location.lat},${h.location.lng}`,target:"_blank",rel:"noreferrer",className:"text-[11px] font-bold text-sky-700 hover:underline shrink-0",children:"เปิด Google Maps ↗"}):e.jsx("span",{className:"text-[10px] text-slate-400 font-medium shrink-0",children:"📍 ยังไม่ได้ระบุพิกัด GPS"})]})]}),te&&y&&e.jsxs("div",{className:"p-3.5 rounded-xl border border-sky-200 bg-sky-50/50 space-y-3",children:[e.jsxs("div",{className:"text-[11px] font-bold text-sky-900 flex items-center justify-between",children:[e.jsxs("span",{className:"flex items-center gap-1.5",children:[e.jsx(gn,{className:"w-3.5 h-3.5 text-sky-600"}),e.jsx("span",{children:"สเปกพื้นที่ & เงื่อนไขสัญญาเช่า (Location Scouting Specs)"})]}),e.jsxs("span",{className:"text-[10px] px-2 py-0.5 rounded-full bg-white text-sky-800 font-mono font-bold border border-sky-200",children:[y.zoneOrFloor," ",y.unitNumber?`(${y.unitNumber})`:""]})]}),e.jsxs("div",{className:"grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs",children:[e.jsxs("div",{className:"bg-white p-2 rounded-lg border border-slate-200 text-center",children:[e.jsx("div",{className:"text-[10px] text-slate-500 font-bold",children:"ขนาดพื้นที่"}),e.jsxs("div",{className:"font-extrabold text-sm text-slate-900 font-mono mt-0.5",children:[((Gt=y.spaceSpecs)==null?void 0:Gt.usableAreaSqm)||"-"," ",e.jsx("span",{className:"text-[10px] font-normal text-slate-500",children:"ตร.ม."})]})]}),e.jsxs("div",{className:"bg-white p-2 rounded-lg border border-slate-200 text-center",children:[e.jsx("div",{className:"text-[10px] text-slate-500 font-bold",children:"หน้ากว้าง / เพดาน"}),e.jsxs("div",{className:"font-extrabold text-sm text-slate-900 font-mono mt-0.5",children:[((Kt=y.spaceSpecs)==null?void 0:Kt.frontageWidthM)||"-","ม. / ",((Jt=y.spaceSpecs)==null?void 0:Jt.ceilingHeightM)||"-","ม."]})]}),e.jsxs("div",{className:"bg-white p-2 rounded-lg border border-slate-200 text-center",children:[e.jsx("div",{className:"text-[10px] text-slate-500 font-bold",children:"ค่าเช่ารายเดือน"}),e.jsx("div",{className:"font-extrabold text-sm text-amber-950 font-mono mt-0.5 truncate",children:(Yt=y.leaseTerms)!=null&&Yt.monthlyRentThb?e.jsxs(e.Fragment,{children:["฿",y.leaseTerms.monthlyRentThb.toLocaleString()]}):(Wt=y.leaseTerms)!=null&&Wt.monthlyRentRmb?e.jsxs(e.Fragment,{children:["¥",y.leaseTerms.monthlyRentRmb.toLocaleString()]}):e.jsx("span",{className:"text-slate-400",children:"สอบถาม"})})]}),e.jsxs("div",{className:"bg-white p-2 rounded-lg border border-slate-200 text-center",children:[e.jsx("div",{className:"text-[10px] text-slate-500 font-bold",children:"เงื่อนไขสัญญา"}),e.jsxs("div",{className:"font-extrabold text-xs text-slate-900 font-mono mt-0.5 truncate",children:["สัญญา ",((Zt=y.leaseTerms)==null?void 0:Zt.leasePeriodYears)||3," ปี · ประกัน ",((Xt=y.leaseTerms)==null?void 0:Xt.depositMonths)||3," ด."]})]})]}),e.jsxs("div",{className:"flex flex-wrap items-center gap-1.5 pt-1 text-xs",children:[e.jsxs("span",{className:"px-2 py-0.5 rounded-md bg-white border border-slate-200 text-slate-700 font-semibold flex items-center gap-1",children:[e.jsx(cs,{className:"w-3 h-3 text-amber-500"}),e.jsxs("span",{children:["สเปกไฟ: ",((es=y.spaceSpecs)==null?void 0:es.electricalPower)||"3 เฟส 45 kVA"]})]}),e.jsxs("span",{className:"px-2 py-0.5 rounded-md bg-white border border-slate-200 text-slate-700 font-semibold flex items-center gap-1",children:[e.jsx(xn,{className:"w-3 h-3 text-blue-500"}),e.jsxs("span",{children:["ท่อน้ำดี: ",(ts=y.spaceSpecs)!=null&&ts.hasWaterInflow?"✓ มีในห้อง":"✗ ไม่มี"]})]}),e.jsxs("span",{className:"px-2 py-0.5 rounded-md bg-white border border-slate-200 text-slate-700 font-semibold flex items-center gap-1",children:[e.jsx(bn,{className:"w-3 h-3 text-teal-500"}),e.jsxs("span",{children:["ท่อน้ำทิ้ง: ",(ss=y.spaceSpecs)!=null&&ss.hasDrainage?"✓ มีในห้อง":"✗ ไม่มี"]})]}),e.jsxs("span",{className:"px-2 py-0.5 rounded-md bg-white border border-slate-200 text-slate-700 font-semibold flex items-center gap-1",children:[e.jsx(vn,{className:"w-3 h-3 text-purple-500"}),e.jsxs("span",{children:["ดักไขมัน: ",(ns=y.spaceSpecs)!=null&&ns.hasGreaseTrap?"✓ มีรองรับ":"✗ ต้องติดตั้งเอง"]})]}),((as=y.spaceSpecs)==null?void 0:as.riderAccessNotes)&&e.jsxs("span",{className:"px-2 py-0.5 rounded-md bg-white border border-slate-200 text-slate-700 font-semibold flex items-center gap-1",children:[e.jsx(wn,{className:"w-3 h-3 text-emerald-600"}),e.jsxs("span",{children:["ไรเดอร์: ",y.spaceSpecs.riderAccessNotes]})]})]}),y.handoffNotes&&e.jsxs("div",{className:"pt-2 border-t border-sky-200/80 text-xs",children:[e.jsx("span",{className:"font-bold text-sky-900 block mb-0.5",children:"ประเด็นเจรจา / ส่งมอบงาน:"}),e.jsx("p",{className:"text-slate-800 whitespace-pre-wrap",children:y.handoffNotes})]})]}),(_&&(C==null?void 0:C.memo)||!_&&(T==null?void 0:T.tastingNotes))&&e.jsxs("div",{className:`p-3.5 rounded-xl border space-y-1 ${_?"bg-emerald-50/50 border-emerald-200/80":"bg-amber-50/50 border-amber-200/80"}`,children:[e.jsxs("div",{className:"text-[11px] font-bold text-slate-600 flex items-center gap-1.5",children:[e.jsx("i",{className:`fa-solid ${_?"fa-clipboard-check text-emerald-600":"fa-quote-left text-amber-600"} text-[10px]`}),e.jsx("span",{children:_?"บันทึกหน้างาน / รายละเอียดหลัก:":"บันทึกรีวิวรสชาติ & ไอเดียเรฟ:"})]}),e.jsx("p",{className:"text-xs sm:text-[13px] text-slate-900 leading-relaxed whitespace-pre-wrap font-medium",children:_?C==null?void 0:C.memo:T==null?void 0:T.tastingNotes})]}),_&&C&&(C.catalogItems||[]).length>0&&e.jsxs("div",{className:"space-y-2",children:[e.jsx("div",{className:"flex items-center justify-between",children:e.jsxs("span",{className:"text-xs font-bold text-slate-800",children:["รายการอุปกรณ์ & สินค้า (",(C.catalogItems||[]).length," รายการ):"]})}),e.jsx("div",{className:"grid grid-cols-1 sm:grid-cols-2 gap-3",children:(C.catalogItems||[]).map((d,S)=>e.jsxs("div",{className:"p-3 rounded-xl border border-slate-200 bg-white flex gap-3 shadow-xs",children:[d.photo?e.jsx(Ee,{src:d.photo,alt:"",onClick:()=>Tt(d.photo,"catalog"),className:"w-16 h-16 rounded-lg object-cover cursor-pointer border border-slate-100 hover:opacity-90"}):e.jsx("div",{className:"w-16 h-16 rounded-lg bg-slate-100 border border-slate-200 flex items-center justify-center text-slate-400 text-xs",children:"ไม่มีรูป"}),e.jsxs("div",{className:"min-w-0 flex-1 space-y-1",children:[e.jsx("div",{className:"font-bold text-xs text-slate-900 truncate",children:d.name||`รายการที่ ${S+1}`}),d.priceRmb&&e.jsxs("div",{className:"text-xs font-mono font-bold text-emerald-700",children:["¥",d.priceRmb," ",e.jsxs("span",{className:"text-[11px] font-normal text-slate-500",children:["(≈",a(d.priceRmb).toLocaleString(),"฿)"]})]}),d.priceThb&&!d.priceRmb&&e.jsxs("div",{className:"text-xs font-mono font-bold text-emerald-700",children:["฿",d.priceThb.toLocaleString()]}),d.weightKg&&e.jsxs("div",{className:"text-[11px] text-slate-500",children:["น้ำหนัก: ",e.jsx("span",{className:"font-mono",children:d.weightKg})]}),d.memo&&e.jsx("p",{className:"text-[11px] text-slate-600 whitespace-pre-wrap leading-relaxed",children:d.memo}),ue(d).length>0&&e.jsx("div",{className:"space-y-1 pt-1",children:ue(d).map((q,G)=>e.jsxs("div",{className:"flex flex-col sm:flex-row sm:items-center gap-1 bg-emerald-50/90 p-1.5 rounded-lg border border-emerald-200/80",children:[e.jsxs("span",{className:"text-[10px] font-bold text-emerald-900 truncate min-w-0 flex items-center gap-1",children:[e.jsx(Be,{className:"w-3 h-3 text-emerald-600 shrink-0"}),e.jsx("span",{className:"truncate",children:q.label||`เสียง #${G+1}`}),q.durationSec?`(${q.durationSec}s)`:""]}),q.url&&e.jsx("audio",{controls:!0,preload:"metadata",playsInline:!0,src:q.url,className:"h-6 w-full sm:w-44 shrink-0"})]},G))})]})]},d.id||S))})]}),!_&&T&&(T.drinkItems||[]).length>0&&e.jsxs("div",{className:"space-y-2",children:[e.jsx("div",{className:"flex items-center justify-between",children:e.jsxs("span",{className:"text-xs font-bold text-slate-800",children:["เมนูที่ชิม & ถอดรหัสสูตร (",(T.drinkItems||[]).length," เมนู):"]})}),e.jsx("div",{className:"grid grid-cols-1 sm:grid-cols-2 gap-3",children:(T.drinkItems||[]).map((d,S)=>e.jsxs("div",{className:"p-3 rounded-xl border border-amber-200/80 bg-amber-50/20 flex gap-3 shadow-xs",children:[d.photo&&e.jsx(Ee,{src:d.photo,alt:"",onClick:()=>Tt(d.photo,"drinks"),className:"w-16 h-16 rounded-lg object-cover cursor-pointer border border-amber-200"}),e.jsxs("div",{className:"min-w-0 flex-1 space-y-1",children:[e.jsx("div",{className:"font-bold text-xs text-slate-900 truncate",children:d.name||`แก้วที่ #${S+1}`}),d.priceRmb&&e.jsxs("div",{className:"text-xs font-mono font-bold text-amber-700",children:["¥",d.priceRmb," ",e.jsxs("span",{className:"text-[11px] font-normal text-slate-500",children:["(≈",a(d.priceRmb),"฿)"]})]}),d.fitMenuTarget&&e.jsxs("div",{className:"text-[11px] font-semibold text-emerald-700",children:["ต่อยอด: ",d.fitMenuTarget]}),d.gimmickNotes&&e.jsx("p",{className:"text-[11px] text-slate-600",children:d.gimmickNotes}),ue(d).length>0&&e.jsx("div",{className:"space-y-1 pt-1",children:ue(d).map((q,G)=>e.jsxs("div",{className:"flex flex-col sm:flex-row sm:items-center gap-1 bg-amber-50/90 p-1.5 rounded-lg border border-amber-200/80",children:[e.jsxs("span",{className:"text-[10px] font-bold text-amber-900 truncate min-w-0 flex items-center gap-1",children:[e.jsx(Be,{className:"w-3 h-3 text-amber-600 shrink-0"}),e.jsx("span",{className:"truncate",children:q.label||`เสียง #${G+1}`}),q.durationSec?`(${q.durationSec}s)`:""]}),q.url&&e.jsx("audio",{controls:!0,preload:"metadata",playsInline:!0,src:q.url,className:"h-6 w-full sm:w-44 shrink-0"})]},G))})]})]},d.id||S))})]}),K.filter(d=>!["catalog","drinks"].includes(d.id)).map(d=>e.jsxs("section",{"aria-label":d.label,className:"space-y-2",children:[e.jsxs("h3",{className:"text-xs font-bold text-slate-800",children:[d.label," (",d.photos.length," รูป)"]}),e.jsx("div",{className:"grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2",children:d.photos.map((S,q)=>e.jsxs("button",{type:"button",onClick:()=>{O(d.id),$(q)},className:"relative h-44 rounded-xl overflow-hidden border border-slate-200 bg-slate-50 p-1",children:[e.jsx(Ee,{src:S.url,alt:S.label,className:"w-full h-full object-contain"}),e.jsxs("span",{className:"absolute bottom-1 right-1 bg-black/60 text-white text-[10px] px-2 rounded",children:[q+1,"/",d.photos.length]})]},`${S.url}-${q}`))}),!d.photos.length&&e.jsx("p",{className:"text-xs text-slate-400",children:"ยังไม่มีรูปในหมวดนี้"})]},d.id)),h.videos&&h.videos.length>0&&e.jsxs("div",{className:"space-y-2 pt-1",children:[e.jsxs("span",{className:"text-xs font-bold text-slate-800 flex items-center gap-1.5",children:[e.jsx("i",{className:"fa-solid fa-video text-purple-600"}),e.jsxs("span",{children:["คลิปวิดีโอของรายการนี้ (",h.videos.length," คลิป):"]})]}),e.jsx("div",{className:"grid grid-cols-1 sm:grid-cols-2 gap-3",children:h.videos.map((d,S)=>e.jsx(Rn,{src:d,className:"rounded-2xl border border-slate-200 shadow-sm h-48 sm:h-56",videoClassName:"object-contain",badgeLabel:`คลิปที่ ${S+1}`},S))})]}),h.attachedFiles&&h.attachedFiles.length>0&&e.jsxs("div",{id:"detail-attached-files-section",className:"space-y-2 pt-1 scroll-mt-6",children:[e.jsxs("div",{className:"flex items-center justify-between",children:[e.jsxs("span",{className:"text-xs font-bold text-slate-800 flex items-center gap-1.5",children:[e.jsx(ds,{className:"w-3.5 h-3.5 text-sky-600"}),e.jsxs("span",{children:["เอกสารและไฟล์แนบ (",h.attachedFiles.length," รายการ):"]})]}),e.jsx("span",{className:"text-[10px] text-slate-400",children:"แตะเพื่อเปิดดูบน Google Drive / เบราว์เซอร์"})]}),e.jsx("div",{className:"grid grid-cols-1 sm:grid-cols-2 gap-2",children:h.attachedFiles.map(d=>{const S=In(d.name,d.mimeType),q=S.icon;return e.jsxs("a",{href:d.url,target:"_blank",rel:"noopener noreferrer",onClick:G=>{d.url.startsWith("data:")&&(G.preventDefault(),Pn(d.url,d.name))},className:"bg-white rounded-xl border border-slate-200/90 hover:border-sky-300 hover:shadow-xs p-3 flex items-center justify-between gap-3 transition-all group cursor-pointer",children:[e.jsxs("div",{className:"flex items-center gap-2.5 min-w-0 flex-1",children:[e.jsxs("div",{className:`w-9 h-9 rounded-xl border flex flex-col items-center justify-center shrink-0 shadow-2xs ${S.colorClasses}`,children:[e.jsx(q,{className:"w-4 h-4"}),e.jsx("span",{className:"text-[8px] font-extrabold uppercase leading-none mt-0.5",children:S.label})]}),e.jsxs("div",{className:"min-w-0 flex-1",children:[e.jsx("p",{className:"font-bold text-xs text-slate-800 truncate group-hover:text-sky-700 transition-colors",children:d.name}),e.jsxs("div",{className:"flex items-center gap-1.5 text-[10px] text-slate-500 mt-0.5",children:[e.jsx("span",{className:"font-medium",children:Bn(d.size)}),d.uploadedAt&&e.jsxs(e.Fragment,{children:[e.jsx("span",{children:"•"}),e.jsx("span",{children:new Date(d.uploadedAt).toLocaleDateString("th-TH")})]})]})]})]}),e.jsxs("span",{className:"px-2.5 py-1 rounded-lg bg-sky-50 text-sky-700 group-hover:bg-sky-600 group-hover:text-white text-[11px] font-bold transition-all flex items-center gap-1 shrink-0",children:[e.jsx("span",{children:"เปิดไฟล์"}),e.jsx(yn,{className:"w-3 h-3"})]})]},d.id)})})]}),e.jsxs("div",{id:"detail-comments-section",className:"p-4 bg-slate-50 rounded-xl border border-slate-200/80 space-y-3",children:[e.jsxs("div",{className:"flex items-center justify-between",children:[e.jsxs("span",{className:"text-xs font-bold text-slate-800 flex items-center gap-1.5",children:[e.jsx(jn,{className:"w-3.5 h-3.5 text-blue-600"}),e.jsx("span",{children:"ช่องความเห็นทีมงาน & ตอบกลับต่อเนื่อง (Threaded Comments)"})]}),e.jsxs("span",{className:"text-[11px] text-slate-400 font-mono",children:[h.reviewerNotes.length," หัวข้อสนทนา"]})]}),e.jsx("div",{className:"space-y-2.5",children:h.reviewerNotes.length===0?e.jsx("p",{className:"text-xs text-slate-400 py-3 text-center",children:"ยังไม่มีความเห็น สามารถพิมพ์บันทึกหรือตรวจสอบสเปกได้ด้านล่าง"}):h.reviewerNotes.map(d=>{var G,W,se,Ie;const S=d.replies||[],q=De[d.id];return e.jsxs("div",{className:"p-3 bg-white rounded-xl border border-slate-200/70 shadow-xs space-y-2",children:[e.jsxs("div",{className:"flex items-start gap-2.5",children:[e.jsx(Ye,{src:d.authorAvatar,className:"w-7 h-7 rounded-full object-cover shrink-0 mt-0.5 ring-1 ring-slate-200"}),e.jsxs("div",{className:"min-w-0 flex-1",children:[e.jsxs("div",{className:"flex items-center justify-between text-[11px] mb-0.5",children:[e.jsx("span",{className:"font-bold text-slate-900",children:d.author}),e.jsx("span",{className:"text-slate-400 font-mono text-[10px]",children:new Date(d.timestamp).toLocaleTimeString("th-TH",{hour:"2-digit",minute:"2-digit"})})]}),e.jsx("p",{className:"text-xs text-slate-700 leading-relaxed",children:d.text}),e.jsx(jt,{media:We(d)}),(d.voiceUrl||d.audioUrl)&&e.jsxs("div",{className:"mt-1.5 flex items-center gap-2 bg-slate-50 p-2 rounded-xl border border-slate-200/80 max-w-sm",children:[e.jsx(Be,{className:"w-4 h-4 text-emerald-600 shrink-0"}),e.jsx("audio",{controls:!0,src:d.voiceUrl||d.audioUrl,className:"h-7 w-full"})]}),e.jsxs("div",{className:"flex items-center gap-3 mt-1.5 text-[11px] font-bold",children:[F&&e.jsxs("button",{type:"button",onClick:()=>oe((Y==null?void 0:Y.noteId)===d.id&&Y.author===d.author?null:{noteId:d.id,author:d.author}),className:"text-blue-600 hover:text-blue-800 flex items-center gap-1",children:[e.jsx(us,{className:"w-3 h-3"}),e.jsx("span",{children:"ตอบกลับ"})]}),S.length>0&&e.jsx("button",{type:"button",onClick:()=>ke(z=>({...z,[d.id]:!z[d.id]})),className:"text-slate-500 hover:text-slate-800 flex items-center gap-1",children:q?e.jsxs(e.Fragment,{children:[e.jsx(Nn,{className:"w-3 h-3"}),e.jsxs("span",{children:["ดูการตอบกลับ (",S.length,")"]})]}):e.jsxs(e.Fragment,{children:[e.jsx(kn,{className:"w-3 h-3"}),e.jsxs("span",{children:["ย่อการตอบกลับ (",S.length,")"]})]})})]})]})]}),S.length>0&&!q&&e.jsx("div",{className:"ml-6 pl-3 border-l-2 border-blue-200 space-y-2 pt-1",children:S.map(z=>e.jsxs("div",{className:"p-2.5 bg-slate-50 rounded-xl border border-slate-200/60 text-xs space-y-1",children:[e.jsxs("div",{className:"flex items-center justify-between text-[10px]",children:[e.jsxs("div",{className:"flex items-center gap-1.5 font-bold text-slate-800",children:[e.jsx(Ye,{src:z.authorAvatar,className:"w-4 h-4 rounded-full object-cover"}),e.jsx("span",{children:z.author}),z.replyToAuthor&&e.jsxs("span",{className:"text-blue-600 font-normal",children:["▸ ตอบกลับ @",z.replyToAuthor]})]}),e.jsx("span",{className:"text-slate-400 font-mono",children:new Date(z.timestamp).toLocaleTimeString("th-TH",{hour:"2-digit",minute:"2-digit"})})]}),e.jsx("p",{className:"text-slate-700 leading-snug",children:z.text}),e.jsx(jt,{media:We(z)}),(z.voiceUrl||z.audioUrl)&&e.jsxs("div",{className:"mt-1 flex items-center gap-1.5 bg-white p-1.5 rounded-lg border border-slate-200 max-w-[240px]",children:[e.jsx(Be,{className:"w-3.5 h-3.5 text-blue-600 shrink-0"}),e.jsx("audio",{controls:!0,src:z.voiceUrl||z.audioUrl,className:"h-6 w-full"})]}),e.jsx("div",{children:F&&e.jsxs("button",{type:"button",onClick:()=>oe({noteId:d.id,author:z.author}),className:"text-[10px] font-bold text-blue-600 hover:underline inline-flex items-center gap-0.5",children:[e.jsx(us,{className:"w-2.5 h-2.5"}),e.jsxs("span",{children:["ตอบกลับ @",z.author," ต่อ"]})]})})]},z.id))}),F&&e.jsx("div",{className:(Y==null?void 0:Y.noteId)===d.id?"mt-2":"hidden",children:e.jsx(hs,{value:((G=ye[d.id])==null?void 0:G.media)||[],onChange:z=>$e(_e=>({..._e,[d.id]:{..._e[d.id],media:z}})),onBusyChange:z=>de(d.id,z),disabled:ae,recordId:h.id,recordType:h.type,recordTitle:h.id})}),F&&(Y==null?void 0:Y.noteId)===d.id&&e.jsxs("div",{className:"mt-2 pt-2 border-t border-slate-100 space-y-1.5 animate-in fade-in",children:[((W=ye[d.id])==null?void 0:W.voiceUrl)&&e.jsx("div",{className:"flex flex-wrap items-center gap-1.5 text-[10px]",children:((se=ye[d.id])==null?void 0:se.voiceUrl)&&e.jsxs("span",{className:"inline-flex items-center gap-1.5 px-2 py-0.5 rounded bg-blue-50 text-blue-800 border border-blue-200",children:[e.jsx(Ve,{className:"w-3 h-3"})," เสียงอัดสดพร้อมส่ง",e.jsx("audio",{controls:!0,src:(Ie=ye[d.id])==null?void 0:Ie.voiceUrl,className:"h-6 w-32"}),e.jsx("button",{type:"button",onClick:()=>$e(z=>({...z,[d.id]:{...z[d.id],voiceUrl:void 0}})),children:e.jsx(Ge,{className:"w-2.5 h-2.5"})})]})}),e.jsxs("div",{className:"flex gap-1.5 items-center flex-wrap sm:flex-nowrap",children:[e.jsx("input",{type:"text",placeholder:`ตอบกลับ @${Y.author} ในฐานะ ${s.alias}...`,disabled:ae,value:fe[d.id]||"",onChange:z=>me({...fe,[d.id]:z.target.value}),className:"flex-1 min-w-[140px] bg-slate-50 border border-blue-300 rounded-lg px-2.5 py-1.5 text-xs text-slate-900 focus:outline-none focus:border-blue-500",autoFocus:!0,onKeyDown:z=>{z.key==="Enter"&&(z.preventDefault(),Bt(d.id,Y.author))}}),e.jsxs("button",{type:"button",title:re===d.id?"กดเพื่อหยุดอัดเสียงสด":"กดเพื่ออัดเสียงสดในคำตอบกลับ",disabled:ae||ce,onClick:()=>void It(d.id),className:`px-2 py-1.5 rounded-lg border text-[11px] font-bold inline-flex items-center gap-1 transition-all ${re===d.id?"bg-rose-600 text-white border-rose-600 animate-pulse":"bg-white border-slate-200 hover:border-blue-500 hover:bg-blue-50 text-slate-600 hover:text-blue-700"}`,children:[e.jsx(Ve,{className:"w-3.5 h-3.5"}),e.jsx("span",{children:re===d.id?`หยุดอัด (${Ue}s)`:"อัดเสียงสด"})]}),e.jsx("button",{type:"button",disabled:ae||we[d.id]||ce||!!re,onClick:()=>Bt(d.id,Y.author),className:"px-3 py-1.5 rounded-lg bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold",children:"ส่ง"}),F&&e.jsx("button",{type:"button",onClick:()=>oe(null),className:"px-2 py-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-600 text-xs",children:"ยกเลิก"})]})]})]},d.id)})}),e.jsxs("div",{className:"pt-2 border-t border-slate-200/60 space-y-1.5",children:[e.jsx("div",{className:"flex items-center justify-between text-[11px] text-slate-500",children:e.jsxs("span",{className:"font-semibold flex items-center gap-1",children:[e.jsx(cs,{className:"w-3 h-3 text-amber-500"})," ข้อความด่วน (แตะเพื่อพิมพ์ทันที):"]})}),e.jsx("div",{className:"flex items-center gap-1.5 overflow-x-auto no-scrollbar py-0.5",children:L.map(d=>e.jsxs("button",{type:"button",onClick:()=>M(d.text),className:"px-2.5 py-1 rounded-lg bg-white border border-slate-200 hover:border-blue-400 text-[11px] text-slate-700 whitespace-nowrap active:scale-95 transition-all shadow-xs",title:d.text,children:[e.jsx("i",{className:"fa-solid fa-bolt text-amber-500 mr-1 text-[10px]"}),e.jsx("span",{children:d.title})]},d.id))})]}),s.role==="viewer"?null:e.jsxs("form",{onSubmit:Zs,className:"space-y-2 pt-1","aria-label":"เขียนความคิดเห็น",children:[e.jsx(hs,{value:ne,onChange:ve,onBusyChange:d=>de("main",d),disabled:ae,recordId:h.id,recordType:h.type,recordTitle:h.id}),(le||ce)&&e.jsxs("div",{className:"flex flex-wrap items-center gap-2 px-1",children:[le&&e.jsxs("div",{className:"flex items-center gap-1.5 px-2 py-1 bg-blue-50 border border-blue-200 rounded-lg text-xs text-blue-800",children:[e.jsx(Ve,{className:"w-3.5 h-3.5 text-blue-600"}),e.jsx("span",{children:"เสียงอัดสด:"}),e.jsx("audio",{controls:!0,src:le,className:"h-6 w-36"}),e.jsx("button",{type:"button",onClick:()=>Re(null),className:"text-slate-400 hover:text-rose-600",children:e.jsx(Ge,{className:"w-3 h-3"})})]}),ce&&e.jsxs("div",{className:"flex items-center gap-1.5 text-xs text-blue-600 font-medium",children:[e.jsx($n,{className:"w-3.5 h-3.5 animate-spin"}),e.jsx("span",{children:"กำลังอัปโหลดไฟล์สื่อ..."})]})]}),e.jsxs("div",{className:"flex gap-1.5 items-center flex-wrap sm:flex-nowrap",children:[e.jsx("input",{type:"text",placeholder:`พิมพ์ข้อคิดเห็นใหม่ในฐานะ ${s.alias}...`,disabled:ae,value:P,onChange:d=>M(d.target.value),className:"flex-1 min-w-[140px] h-8 bg-white border border-slate-200 rounded-lg px-2.5 text-xs text-slate-900 focus:outline-none focus:border-blue-500 shadow-2xs"}),e.jsxs("button",{type:"button",title:re==="main"?"กดเพื่อหยุดอัดเสียงสด":"กดเพื่ออัดเสียงสดในคอมเมนต์",disabled:ae||ce,onClick:()=>void It("main"),className:`h-8 px-2.5 rounded-lg border text-[11px] font-bold inline-flex items-center justify-center gap-1 transition-all shrink-0 ${re==="main"?"bg-rose-600 text-white border-rose-600 animate-pulse shadow-xs":"bg-white border-slate-200 hover:border-blue-500 hover:bg-blue-50 text-slate-700 hover:text-blue-700"}`,children:[e.jsx(Ve,{className:"w-3.5 h-3.5"}),e.jsx("span",{children:re==="main"?`หยุดอัด (${Ue}s)`:"อัดเสียงสด"})]}),e.jsxs("button",{type:"submit",disabled:ae||we.main||ce||!!re,className:"h-8 px-3 rounded-lg bg-blue-600 hover:bg-blue-700 text-white text-[11px] font-bold shadow-2xs active:scale-95 transition-all inline-flex items-center justify-center gap-1 shrink-0 disabled:opacity-50",children:[e.jsx(Cn,{className:"w-3 h-3"}),e.jsx("span",{children:ae?"กำลังส่ง…":"โพสต์"})]})]})]})]}),e.jsx(Un,{item:h,users:w},h.id)]}),e.jsxs("div",{className:"p-3 sm:p-3.5 border-t border-slate-100 bg-white flex items-center justify-between gap-2 select-none",children:[e.jsxs("div",{className:"text-[11px] text-slate-400 font-mono truncate hidden sm:block",children:["ID: ",h.id," · ปรับปรุง:"," ",new Date(h.updatedAt).toLocaleTimeString("th-TH")]}),e.jsxs("div",{className:"flex items-center justify-end gap-1.5 sm:gap-2 w-full sm:w-auto",children:[p&&e.jsxs("button",{type:"button",onClick:Rt,className:"px-2.5 sm:px-3 py-1.5 text-xs font-bold rounded-xl bg-rose-50 hover:bg-rose-100 text-rose-700 border border-rose-200 flex items-center justify-center gap-1.5 transition-colors whitespace-nowrap active:scale-95 shrink-0",title:"ลบรายการ",children:[e.jsx(ls,{className:"w-3.5 h-3.5 text-rose-600 shrink-0"}),e.jsx("span",{children:"ลบรายการ"})]}),V&&e.jsxs("button",{type:"button",onClick:()=>x(h),className:"px-2.5 sm:px-3.5 py-1.5 text-xs font-bold rounded-xl bg-amber-50 hover:bg-amber-100 text-amber-800 border border-amber-300 flex items-center justify-center gap-1.5 transition-colors whitespace-nowrap active:scale-95 shrink-0",children:[e.jsx(os,{className:"w-3.5 h-3.5 text-amber-600 shrink-0"}),e.jsx("span",{children:"แก้ไขข้อมูล"})]}),e.jsx("button",{onClick:l,className:"px-3.5 sm:px-4 py-1.5 text-xs font-bold rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 transition-colors whitespace-nowrap active:scale-95 shrink-0",children:"ปิด"})]})]})]}),j!==null&&H[j]&&e.jsxs("div",{className:"fixed inset-0 z-[140] bg-black/92 backdrop-blur-md flex flex-col items-center justify-between p-3 sm:p-6 select-none",onClick:()=>$(null),children:[e.jsxs("div",{className:"w-full max-w-4xl flex items-center justify-between text-white z-10",onClick:d=>d.stopPropagation(),children:[e.jsxs("div",{className:"flex items-center gap-2",children:[e.jsxs("span",{className:"px-2.5 py-1 rounded-full bg-white/15 font-mono text-xs font-bold",children:["รูปที่ ",j+1," / ",H.length]}),e.jsx("span",{className:"text-xs sm:text-sm font-semibold text-white/90 truncate max-w-[240px] sm:max-w-md",children:H[j].label})]}),e.jsx("button",{type:"button",onClick:()=>$(null),className:"w-9 h-9 rounded-full bg-white/15 hover:bg-white/25 text-white flex items-center justify-center transition-colors",children:e.jsx(Ge,{className:"w-5 h-5"})})]}),e.jsxs("div",{className:"relative flex-1 w-full max-w-5xl flex items-center justify-center my-2",onClick:d=>d.stopPropagation(),children:[H.length>1&&e.jsx("button",{type:"button",onClick:()=>$((j-1+H.length)%H.length),className:"absolute left-1 sm:left-3 z-20 w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-black/60 hover:bg-black/80 border border-white/25 text-white flex items-center justify-center shadow-lg active:scale-95 transition-all",title:"รูปก่อนหน้า (◀)",children:e.jsx(Sn,{className:"w-6 h-6"})}),e.jsx(Ee,{imageSize:2e3,src:H[j].url,alt:H[j].label,className:"max-w-full max-h-[72vh] object-contain rounded-xl shadow-2xl"}),H.length>1&&e.jsx("button",{type:"button",onClick:()=>$((j+1)%H.length),className:"absolute right-1 sm:right-3 z-20 w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-black/60 hover:bg-black/80 border border-white/25 text-white flex items-center justify-center shadow-lg active:scale-95 transition-all",title:"รูปถัดไป (▶)",children:e.jsx(En,{className:"w-6 h-6"})})]}),e.jsxs("div",{className:"flex gap-4 py-2 text-sm text-white underline",onClick:d=>d.stopPropagation(),children:[e.jsx("a",{href:Se(H[j].url,0),target:"_blank",rel:"noreferrer",children:"ดูเต็มความละเอียด"}),e.jsx("a",{href:An(H[j].url),target:"_blank",rel:"noreferrer",children:"เปิดไฟล์ต้นฉบับ"})]}),H.length>1&&e.jsx("div",{className:"w-full max-w-3xl flex items-center justify-center gap-2 overflow-x-auto py-1 z-10",onClick:d=>d.stopPropagation(),children:H.map((d,S)=>e.jsx("button",{type:"button",onClick:()=>$(S),className:`relative w-12 h-12 sm:w-14 sm:h-14 rounded-lg overflow-hidden shrink-0 border-2 transition-all ${S===j?"border-emerald-400 scale-105 shadow-md":"border-white/20 opacity-60 hover:opacity-100"}`,children:e.jsx(Ee,{src:d.url,className:"w-full h-full object-cover"})},S))})]})]})};export{ma as DetailModal};
