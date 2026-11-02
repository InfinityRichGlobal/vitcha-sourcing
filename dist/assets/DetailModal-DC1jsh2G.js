import{c as Gs,af as Ge,r as K,j as e,G as Je,a1 as Js,ag as Ys,a5 as le,a4 as Ws,u as Zs,ah as Se,a6 as Xs,w as ss,X as Ee,P as ns,T as rs,_ as en,V as tn,l as sn,Y as Ae,H as nn,a0 as ze,ai as as,i as rn,O as an,Z as os,a8 as on,R as ln,h as dn,aj as cn,a7 as je,K as un,k as hn,ak as is,a9 as pn,al as fn,W as Qe,p as mn,f as xn,Q as gn,d as bn,a2 as vn}from"./index-UHyAFPM7.js";import{F as wn,V as yn}from"./VideoPlayer-Dz1tgf65.js";import{g as jn,f as Nn,o as kn}from"./AttachedFilesSection-mDSUc6jn.js";import{P as $n}from"./printer-CP5eUZFT.js";/**
 * @license lucide-react v1.62.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Fs={name:"file-down",size:24,node:[["path",{d:"M6 22a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h8a2.4 2.4 0 0 1 1.704.706l3.588 3.588A2.4 2.4 0 0 1 20 8v12a2 2 0 0 1-2 2z",key:"1oefj6"}],["path",{d:"M14 2v5a1 1 0 0 0 1 1h5",key:"wfsgrz"}],["path",{d:"M12 18v-6",key:"17g6i2"}],["path",{d:"m9 15 3 3 3-3",key:"1npd3o"}]]};Fs.node;const Cn=Gs(Fs);function Sn(t){var n,s,r,a,u,i,v;if(!t)return[];const o=[],l=(w,$,T=[])=>o.push({id:w,label:$,photos:T.filter(Boolean).map((N,U)=>({url:Ge(N),label:`${$} #${U+1}`}))});return l("storefront","หน้าร้าน / บรรยากาศ",(n=t.photos)==null?void 0:n.storefrontAndAtmosphere),t.type==="supplier"?(l("contacts","นามบัตร / WeChat QR",(s=t.photos)==null?void 0:s.contactCards),o.push({id:"catalog",label:"รายการสินค้า",photos:(t.catalogItems||[]).filter(w=>w.photo).map((w,$)=>({url:Ge(w.photo),label:w.name||`สินค้า #${$+1}`}))})):t.type==="drink_store"?(l("menu","ป้ายเมนู",(r=t.photos)==null?void 0:r.menuBoard),l("cups","แก้วเครื่องดื่ม",(a=t.photos)==null?void 0:a.drinkCups),o.push({id:"drinks",label:"เมนูชิม",photos:(t.drinkItems||[]).filter(w=>w.photo).map((w,$)=>({url:Ge(w.photo),label:w.name||`เมนู #${$+1}`}))})):(l("plans","ผังห้อง / งานระบบ",(u=t.photos)==null?void 0:u.floorPlanAndSpecs),l("neighbors","ร้านข้างเคียง",(i=t.photos)==null?void 0:i.surroundingNeighbors),l("contacts","นามบัตร / เอกสาร",(v=t.photos)==null?void 0:v.contactCards)),o}const Re=[["awaiting","รอรับช่วงต่อ"],["rfq_sent","ขอสเปก / ส่ง RFQ"],["sample_test","ทดสอบตัวอย่าง Lab/R&D"],["negotiate","ต่อรองราคา & MOQ"],["approved","ตัวเต็งอนุมัติ"],["ordered","สั่งซื้อสำเร็จ"]],de=t=>{const o=Re.findIndex(([l])=>l===t);return o<0?"ยังไม่ระบุ":`พาร์ท ${o+1}: ${Re[o][1]}`},Ye={handoffStage:"พาร์ท",status:"สถานะรายการ",assignedTo:"ผู้รับผิดชอบ",targetFollowUpDate:"กำหนดติดตาม",handoffNotes:"หมายเหตุส่งต่อ",name:"ชื่อ",storeName:"ชื่อร้าน",chineseName:"ชื่อภาษาจีน",foreignName:"ชื่อต่างประเทศ",marketOrCity:"ตลาด / เมือง",city:"เมือง",category:"หมวดหมู่",storeCategory:"หมวดร้าน",rating:"คะแนน",ratings:"คะแนนประเมิน",quickTags:"ป้ายกำกับ",isFactory:"โรงงาน",phone:"โทรศัพท์",wechatId:"WeChat",lineId:"LINE",address:"ที่อยู่",location:"พิกัด",lat:"ละติจูด",lng:"ลองจิจูด",addressText:"ที่อยู่",photos:"รูปภาพ",storefrontAndAtmosphere:"หน้าร้าน / บรรยากาศ",contactCards:"นามบัตร",menuBoard:"ป้ายเมนู",drinkCups:"เครื่องดื่ม",floorPlanAndSpecs:"ผังพื้นที่",surroundingNeighbors:"บริเวณโดยรอบ",videos:"วิดีโอ",attachedFiles:"ไฟล์แนบ",voiceNotes:"เสียงบันทึก",voiceNoteUrl:"เสียงบันทึก",voiceDurationSec:"ความยาวเสียง (วินาที)",durationSec:"ความยาวเสียง (วินาที)",label:"ชื่อบันทึก",url:"ไฟล์",catalogItems:"สินค้า",drinkItems:"เมนูที่ทดลอง",photo:"รูปภาพ",priceRmb:"ราคา (หยวน)",priceThb:"ราคา (บาท)",dimensions:"ขนาด",weightKg:"น้ำหนัก",memo:"รายละเอียด",tastingNotes:"บันทึกการชิม",brandConcept:"แนวคิดแบรนด์",country:"ประเทศ",locationType:"ประเภททำเล",zoneOrFloor:"โซน / ชั้น",unitNumber:"เลขที่พื้นที่",spaceSpecs:"ข้อมูลพื้นที่",leaseTerms:"เงื่อนไขเช่า",size:"ขนาดไฟล์ (ไบต์)",uploadedAt:"วันที่แนบ",createdAt:"วันที่บันทึก",mimeType:"ประเภทไฟล์",isMockup:"ข้อมูลตัวอย่าง",taste:"รสชาติ",aesthetics:"ความสวยงาม",value:"ความคุ้มค่า",speed:"ความเร็ว",footTraffic:"คนสัญจร",visibility:"การมองเห็น",accessibility:"การเข้าถึง",valueRoi:"ความคุ้มค่าการลงทุน"};function qs(t){var l;const o=(l=t.history)!=null&&l.length?[...t.history]:[{action:"ข้อมูลเริ่มต้นจากผู้บันทึกรายการ",user:t.creator.alias,userAvatar:t.creator.avatar,timestamp:t.creator.timestamp}];for(const n of t.reviewerNotes||[])for(const[s,r]of[["comment",n],...(n.replies||[]).map(a=>["reply",a])]){const a=r;o.some(u=>{var i;return u.id===a.id||((i=u.content)==null?void 0:i.id)===a.id})||o.push({id:`legacy-content-${a.id}`,kind:s,action:"ความคิดเห็นที่ยังเก็บในรายการ",user:a.author,userId:a.authorId,userAvatar:a.authorAvatar,timestamp:a.timestamp,content:a})}return o}const ls=t=>Number.isNaN(Date.parse(t))?t:new Date(t).toLocaleString("th-TH",{dateStyle:"medium",timeStyle:"short"}),ds=/photos|photo|storefrontAndAtmosphere|contactCards|menuBoard|drinkCups|floorPlanAndSpecs|surroundingNeighbors/,En=t=>/^(https?:\/\/|\.\/|\/(?!\/)|data:(image|audio|video)\/)/i.test(t);function An({media:t,close:o}){const l=K.useRef(null);return K.useEffect(()=>{var n;(n=l.current)==null||n.showModal()},[]),Js.createPortal(e.jsxs("dialog",{ref:l,onCancel:o,onClose:o,onClick:n=>{n.target===n.currentTarget&&o()},className:"fixed inset-0 m-auto max-w-[94vw] w-[900px] max-h-[90dvh] rounded-2xl p-4 backdrop:bg-black/70","aria-label":"สื่อจากประวัติ",children:[e.jsx("div",{className:"flex justify-end mb-3",children:e.jsx("button",{type:"button",autoFocus:!0,onClick:o,className:"rounded-lg px-4 py-2 bg-slate-100 font-bold",children:"ปิดสื่อ"})}),t.kind==="image"?e.jsx("img",{src:t.url,alt:"ภาพจากประวัติ",className:"max-h-[72dvh] max-w-full mx-auto object-contain"}):t.kind==="audio"?e.jsx("audio",{controls:!0,src:t.url,className:"w-full"}):e.jsx("video",{controls:!0,src:t.url,className:"max-h-[72dvh] w-full"})]}),document.body)}function Ne({value:t,field:o,users:l,preview:n}){var r;if(t==null||t===""||Array.isArray(t)&&!t.length)return e.jsx("span",{className:"text-slate-400",children:"ยังไม่ระบุ / ไม่มีข้อมูล"});if(Array.isArray(t))return e.jsx("div",{className:"space-y-2",children:t.map((a,u)=>e.jsx("div",{children:e.jsx(Ne,{value:a,field:o,users:l,preview:n})},u))});if(typeof t=="object")return e.jsx("dl",{className:"space-y-1",children:Object.entries(t).filter(([a])=>!["id","driveFileId"].includes(a)).map(([a,u])=>e.jsxs("div",{children:[e.jsx("dt",{className:"text-slate-500 text-[11px]",children:Ye[a]||a}),e.jsx("dd",{children:e.jsx(Ne,{value:u,field:`${o}.${a}`,users:l,preview:n})})]},a))});if(typeof t=="boolean")return t?"ใช่":"ไม่ใช่";const s=String(t);if(o==="handoffStage")return de(s);if(o==="assignedTo")return((r=l.find(a=>a.id===s||a.alias===s||a.name===s))==null?void 0:r.alias)||s;if(o==="status")return{scouted:"สำรวจแล้ว",reviewing:"เทียบสเปก",rfq_sent:"ส่ง RFQ",shortlisted:"ตัวเต็ง",ordered:"สั่งซื้อแล้ว"}[s]||s;if(En(s)&&(/url$/i.test(o)||ds.test(o)||/videos|voice|audio/i.test(o))){const a=/voice|audio/i.test(o)?"audio":/video/i.test(o)?"video":ds.test(o)||/\.(png|jpe?g|webp|gif)(\?|$)/i.test(s)?"image":null;return a?e.jsx("button",{type:"button",onClick:()=>n({url:s,kind:a}),className:"text-emerald-700 underline text-left",children:a==="image"?e.jsx("img",{loading:"lazy",src:s,alt:"เปิดภาพจากประวัติ",className:"max-w-full w-32 max-h-28 rounded-lg object-cover"}):a==="audio"?"เปิดฟังเสียง":"เปิดดูวิดีโอ"}):e.jsx("a",{href:s,target:"_blank",rel:"noopener noreferrer",className:"text-blue-700 underline break-all",children:"เปิดไฟล์แนบ"})}return e.jsx("span",{className:"whitespace-pre-wrap break-words [overflow-wrap:anywhere]",children:s})}function Tn({item:t,users:o}){const[l,n]=K.useState("all"),[s,r]=K.useState("all"),[a,u]=K.useState(!1),[i,v]=K.useState(20),[w,$]=K.useState(null);K.useEffect(()=>{n("all"),r("all"),v(20),$(null)},[t.id]),K.useEffect(()=>{v(20)},[l,s,a]);const T=qs(t),N=t.handoffStage||"awaiting",U=h=>T.filter(j=>j.version===2&&(j.stageAfter===h||j.stageBefore===h)),M=h=>{var j,R,C,F;return!!((j=h.content)!=null&&j.photoUrl||(R=h.content)!=null&&R.voiceUrl||(C=h.content)!=null&&C.audioUrl||(F=h.changes)!=null&&F.some(y=>/photos|videos|voice|attachedFiles|catalogItems|drinkItems/.test(y.field)))},_=T.filter(h=>(l==="all"||h.version===2&&(h.stageAfter===l||h.stageBefore===l))&&(s==="all"||s==="files"&&M(h)||s==="comments"&&["comment","reply"].includes(h.kind||"")||s==="data"&&["create","update","delete","restore"].includes(h.kind||"")||s==="handoff"&&h.kind==="handoff")).map((h,j)=>({e:h,index:j})).sort((h,j)=>(a?1:-1)*(Date.parse(h.e.timestamp)-Date.parse(j.e.timestamp)||h.index-j.index));return e.jsxs("section",{"data-testid":"activity-timeline",className:"p-3.5 bg-slate-50 rounded-xl border border-slate-200 space-y-4 text-xs min-w-0",children:[e.jsx("h3",{className:"font-bold text-sm text-slate-900",children:"ประวัติการดำเนินงาน & ส่งต่องาน (Activity Log)"}),e.jsx("p",{className:"text-slate-600",children:"ประวัติทั้งหมดของรายการนี้ รวมทุกพาร์ทที่เคยบันทึก · กดพาร์ทเพื่อกรองดูเฉพาะส่วนได้"}),e.jsxs("div",{className:"bg-white p-3 rounded-xl border border-emerald-200 space-y-2",children:[e.jsxs("p",{className:"font-bold text-emerald-800",children:["ปัจจุบัน: ",de(N)]}),e.jsxs("p",{children:["ผู้รับช่วงต่อ: ",e.jsx(Ne,{field:"assignedTo",value:t.assignedTo,users:o,preview:$})]}),e.jsxs("p",{children:["กำหนดติดตาม: ",t.targetFollowUpDate||"ยังไม่ระบุ"]}),e.jsxs("p",{className:"whitespace-pre-wrap break-words [overflow-wrap:anywhere]",children:["หมายเหตุล่าสุด: ",t.handoffNotes||"ยังไม่ระบุ"]})]}),e.jsx("div",{className:"grid grid-cols-2 sm:grid-cols-3 gap-2","aria-label":"เส้นทางทั้ง 6 พาร์ท",children:Re.map(([h,j],R)=>{const C=U(h),F=C.filter(y=>y.stageAfter===h&&y.stageBefore!==h);return e.jsxs("button",{type:"button","aria-pressed":l===h,onClick:()=>{n(l===h?"all":h),r("all")},className:`text-left p-3 rounded-xl border space-y-1 ${l===h?"ring-2 ring-emerald-600":""} ${N===h?"bg-emerald-50 border-emerald-400":"bg-white border-slate-200"}`,children:[e.jsxs("span",{className:"block font-bold",children:["พาร์ท ",R+1,": ",j]}),e.jsx("span",{className:"block text-[11px] text-slate-600",children:N===h?"อยู่ขั้นตอนนี้":C.length?"เคยอยู่ขั้นตอนนี้":"ยังไม่มีบันทึก"}),!!F.length&&e.jsxs("span",{className:"block text-[10px] text-slate-500",children:["บันทึกเข้า ",F.length," ครั้ง · ",ls(F[F.length-1].timestamp)]})]},h)})}),T.some(h=>h.version!==2)&&e.jsx("p",{className:"text-amber-800 bg-amber-50 p-2 rounded-lg",children:"ประวัติเก่าอาจเป็นข้อความย่อ ไม่มีค่าเดิมหรือพาร์ทก่อนหน้า ระบบแสดงเท่าที่เคยบันทึก ไม่เติมขั้นตอนย้อนหลัง"}),e.jsxs("div",{className:"flex flex-wrap gap-2 items-center",children:[e.jsx("button",{type:"button",onClick:()=>{n("all"),r("all")},className:"text-emerald-700 underline",children:"ดูทุกพาร์ท"}),e.jsxs("select",{"aria-label":"ประเภทประวัติ",value:s,onChange:h=>r(h.target.value),className:"max-w-full rounded-lg border p-2 bg-white",children:[e.jsx("option",{value:"all",children:"ทั้งหมด"}),e.jsx("option",{value:"handoff",children:"ส่งต่องาน"}),e.jsx("option",{value:"data",children:"ข้อมูล"}),e.jsx("option",{value:"comments",children:"ความคิดเห็น"}),e.jsx("option",{value:"files",children:"ไฟล์และสื่อ"})]}),e.jsx("button",{type:"button",onClick:()=>u(!a),className:"border rounded-lg p-2 bg-white",children:a?"เรียงเก่าก่อน":"เรียงใหม่ก่อน"})]}),e.jsxs("p",{className:"font-bold",children:[l==="all"?"ประวัติทุกพาร์ท":de(l)," · ",_.length," เหตุการณ์"]}),e.jsx("div",{className:"space-y-3",children:_.slice(0,i).map(({e:h,index:j})=>{var F;const R=o.find(y=>y.id===h.userId||y.alias===h.user||y.name===h.user),C=h.version===2&&h.stageBefore&&h.stageBefore!==h.stageAfter;return e.jsxs("article",{className:"bg-white rounded-xl border p-3 min-w-0 space-y-2","data-testid":"activity-event",children:[e.jsxs("div",{className:"flex gap-2 items-start",children:[e.jsx(Je,{src:h.userAvatar||(R==null?void 0:R.avatar)||"./logo.jpg",alt:"",className:"w-7 h-7 shrink-0 rounded-full"}),e.jsxs("div",{className:"min-w-0",children:[e.jsx("strong",{className:"break-words",children:(R==null?void 0:R.alias)||h.user}),e.jsx("time",{className:"block text-[10px] text-slate-500",children:ls(h.timestamp)})]})]}),e.jsx("p",{className:"font-semibold whitespace-pre-wrap break-words [overflow-wrap:anywhere]",children:h.kind==="comment"?"แสดงความคิดเห็น":h.kind==="reply"?"ตอบกลับความคิดเห็น":h.kind==="handoff"?"อัปเดตการส่งต่องาน":h.action}),C&&e.jsxs("p",{className:"text-emerald-800 font-bold",children:[de(h.stageBefore)," → ",de(h.stageAfter)]}),h.version===2&&!C&&e.jsxs("p",{className:"text-[10px] text-slate-500",children:["ณ ",de(h.stageAfter)]}),h.content&&h.version!==2&&e.jsx("p",{className:"text-[10px] text-amber-800",children:"ข้อความที่ยังเก็บในรายการ · ไม่ทราบพาร์ท ณ เวลานั้น"}),h.content&&e.jsxs("div",{className:"space-y-2",children:[h.content.replyToAuthor&&e.jsxs("p",{children:["ตอบกลับ ",h.content.replyToAuthor]}),e.jsx("p",{className:"whitespace-pre-wrap break-words [overflow-wrap:anywhere]",children:h.content.text}),h.content.photoUrl&&e.jsx(Ne,{value:h.content.photoUrl,field:"photo",users:o,preview:$}),(h.content.voiceUrl||h.content.audioUrl)&&e.jsx(Ne,{value:h.content.voiceUrl||h.content.audioUrl,field:"voice",users:o,preview:$})]}),!!((F=h.changes)!=null&&F.length)&&e.jsxs("details",{open:h.kind!=="create",children:[e.jsxs("summary",{className:"cursor-pointer text-emerald-700 font-bold py-1",children:["รายละเอียดที่บันทึก (",h.changes.length,")"]}),e.jsx("div",{className:"space-y-3 mt-2",children:h.changes.map(y=>e.jsxs("div",{className:"border-t pt-2",children:[e.jsx("h4",{className:"font-bold mb-2",children:Ye[y.field]||y.field}),e.jsxs("div",{className:"grid sm:grid-cols-2 gap-2",children:[e.jsxs("div",{className:"min-w-0 rounded-lg bg-slate-50 p-2",children:[e.jsx("p",{className:"text-[10px] text-slate-500 mb-1",children:"ก่อนเปลี่ยน"}),e.jsx(Ne,{value:y.before,field:y.field,users:o,preview:$})]}),e.jsxs("div",{className:"min-w-0 rounded-lg bg-emerald-50 p-2",children:[e.jsx("p",{className:"text-[10px] text-emerald-700 mb-1",children:"หลังเปลี่ยน"}),e.jsx(Ne,{value:y.after,field:y.field,users:o,preview:$})]})]})]},y.field))})]})]},h.id||`${h.timestamp}-${j}`)})}),!_.length&&e.jsx("p",{className:"text-slate-500",children:"ยังไม่มีประวัติที่บันทึกสำหรับตัวกรองนี้"}),_.length>i&&e.jsxs("button",{type:"button",className:"w-full border rounded-lg p-3 text-emerald-700",onClick:()=>v(i+20),children:["แสดงประวัติเพิ่ม (",_.length-i," เหตุการณ์)"]}),w&&e.jsx(An,{media:w,close:()=>$(null)})]})}var Te={},Xe,cs;function Rn(){return cs||(cs=1,Xe=function(){return typeof Promise=="function"&&Promise.prototype&&Promise.prototype.then}),Xe}var et={},be={},us;function ke(){if(us)return be;us=1;let t;const o=[0,26,44,70,100,134,172,196,242,292,346,404,466,532,581,655,733,815,901,991,1085,1156,1258,1364,1474,1588,1706,1828,1921,2051,2185,2323,2465,2611,2761,2876,3034,3196,3362,3532,3706];return be.getSymbolSize=function(n){if(!n)throw new Error('"version" cannot be null or undefined');if(n<1||n>40)throw new Error('"version" should be in range from 1 to 40');return n*4+17},be.getSymbolTotalCodewords=function(n){return o[n]},be.getBCHDigit=function(l){let n=0;for(;l!==0;)n++,l>>>=1;return n},be.setToSJISFunction=function(n){if(typeof n!="function")throw new Error('"toSJISFunc" is not a valid function.');t=n},be.isKanjiModeEnabled=function(){return typeof t<"u"},be.toSJIS=function(n){return t(n)},be}var tt={},hs;function jt(){return hs||(hs=1,(function(t){t.L={bit:1},t.M={bit:0},t.Q={bit:3},t.H={bit:2};function o(l){if(typeof l!="string")throw new Error("Param is not a string");switch(l.toLowerCase()){case"l":case"low":return t.L;case"m":case"medium":return t.M;case"q":case"quartile":return t.Q;case"h":case"high":return t.H;default:throw new Error("Unknown EC Level: "+l)}}t.isValid=function(n){return n&&typeof n.bit<"u"&&n.bit>=0&&n.bit<4},t.from=function(n,s){if(t.isValid(n))return n;try{return o(n)}catch{return s}}})(tt)),tt}var st,ps;function In(){if(ps)return st;ps=1;function t(){this.buffer=[],this.length=0}return t.prototype={get:function(o){const l=Math.floor(o/8);return(this.buffer[l]>>>7-o%8&1)===1},put:function(o,l){for(let n=0;n<l;n++)this.putBit((o>>>l-n-1&1)===1)},getLengthInBits:function(){return this.length},putBit:function(o){const l=Math.floor(this.length/8);this.buffer.length<=l&&this.buffer.push(0),o&&(this.buffer[l]|=128>>>this.length%8),this.length++}},st=t,st}var nt,fs;function Bn(){if(fs)return nt;fs=1;function t(o){if(!o||o<1)throw new Error("BitMatrix size must be defined and greater than 0");this.size=o,this.data=new Uint8Array(o*o),this.reservedBit=new Uint8Array(o*o)}return t.prototype.set=function(o,l,n,s){const r=o*this.size+l;this.data[r]=n,s&&(this.reservedBit[r]=!0)},t.prototype.get=function(o,l){return this.data[o*this.size+l]},t.prototype.xor=function(o,l,n){this.data[o*this.size+l]^=n},t.prototype.isReserved=function(o,l){return this.reservedBit[o*this.size+l]},nt=t,nt}var rt={},ms;function Pn(){return ms||(ms=1,(function(t){const o=ke().getSymbolSize;t.getRowColCoords=function(n){if(n===1)return[];const s=Math.floor(n/7)+2,r=o(n),a=r===145?26:Math.ceil((r-13)/(2*s-2))*2,u=[r-7];for(let i=1;i<s-1;i++)u[i]=u[i-1]-a;return u.push(6),u.reverse()},t.getPositions=function(n){const s=[],r=t.getRowColCoords(n),a=r.length;for(let u=0;u<a;u++)for(let i=0;i<a;i++)u===0&&i===0||u===0&&i===a-1||u===a-1&&i===0||s.push([r[u],r[i]]);return s}})(rt)),rt}var at={},xs;function Ln(){if(xs)return at;xs=1;const t=ke().getSymbolSize,o=7;return at.getPositions=function(n){const s=t(n);return[[0,0],[s-o,0],[0,s-o]]},at}var ot={},gs;function Un(){return gs||(gs=1,(function(t){t.Patterns={PATTERN000:0,PATTERN001:1,PATTERN010:2,PATTERN011:3,PATTERN100:4,PATTERN101:5,PATTERN110:6,PATTERN111:7};const o={N1:3,N2:3,N3:40,N4:10};t.isValid=function(s){return s!=null&&s!==""&&!isNaN(s)&&s>=0&&s<=7},t.from=function(s){return t.isValid(s)?parseInt(s,10):void 0},t.getPenaltyN1=function(s){const r=s.size;let a=0,u=0,i=0,v=null,w=null;for(let $=0;$<r;$++){u=i=0,v=w=null;for(let T=0;T<r;T++){let N=s.get($,T);N===v?u++:(u>=5&&(a+=o.N1+(u-5)),v=N,u=1),N=s.get(T,$),N===w?i++:(i>=5&&(a+=o.N1+(i-5)),w=N,i=1)}u>=5&&(a+=o.N1+(u-5)),i>=5&&(a+=o.N1+(i-5))}return a},t.getPenaltyN2=function(s){const r=s.size;let a=0;for(let u=0;u<r-1;u++)for(let i=0;i<r-1;i++){const v=s.get(u,i)+s.get(u,i+1)+s.get(u+1,i)+s.get(u+1,i+1);(v===4||v===0)&&a++}return a*o.N2},t.getPenaltyN3=function(s){const r=s.size;let a=0,u=0,i=0;for(let v=0;v<r;v++){u=i=0;for(let w=0;w<r;w++)u=u<<1&2047|s.get(v,w),w>=10&&(u===1488||u===93)&&a++,i=i<<1&2047|s.get(w,v),w>=10&&(i===1488||i===93)&&a++}return a*o.N3},t.getPenaltyN4=function(s){let r=0;const a=s.data.length;for(let i=0;i<a;i++)r+=s.data[i];return Math.abs(Math.ceil(r*100/a/5)-10)*o.N4};function l(n,s,r){switch(n){case t.Patterns.PATTERN000:return(s+r)%2===0;case t.Patterns.PATTERN001:return s%2===0;case t.Patterns.PATTERN010:return r%3===0;case t.Patterns.PATTERN011:return(s+r)%3===0;case t.Patterns.PATTERN100:return(Math.floor(s/2)+Math.floor(r/3))%2===0;case t.Patterns.PATTERN101:return s*r%2+s*r%3===0;case t.Patterns.PATTERN110:return(s*r%2+s*r%3)%2===0;case t.Patterns.PATTERN111:return(s*r%3+(s+r)%2)%2===0;default:throw new Error("bad maskPattern:"+n)}}t.applyMask=function(s,r){const a=r.size;for(let u=0;u<a;u++)for(let i=0;i<a;i++)r.isReserved(i,u)||r.xor(i,u,l(s,i,u))},t.getBestMask=function(s,r){const a=Object.keys(t.Patterns).length;let u=0,i=1/0;for(let v=0;v<a;v++){r(v),t.applyMask(v,s);const w=t.getPenaltyN1(s)+t.getPenaltyN2(s)+t.getPenaltyN3(s)+t.getPenaltyN4(s);t.applyMask(v,s),w<i&&(i=w,u=v)}return u}})(ot)),ot}var Ke={},bs;function _s(){if(bs)return Ke;bs=1;const t=jt(),o=[1,1,1,1,1,1,1,1,1,1,2,2,1,2,2,4,1,2,4,4,2,4,4,4,2,4,6,5,2,4,6,6,2,5,8,8,4,5,8,8,4,5,8,11,4,8,10,11,4,9,12,16,4,9,16,16,6,10,12,18,6,10,17,16,6,11,16,19,6,13,18,21,7,14,21,25,8,16,20,25,8,17,23,25,9,17,23,34,9,18,25,30,10,20,27,32,12,21,29,35,12,23,34,37,12,25,34,40,13,26,35,42,14,28,38,45,15,29,40,48,16,31,43,51,17,33,45,54,18,35,48,57,19,37,51,60,19,38,53,63,20,40,56,66,21,43,59,70,22,45,62,74,24,47,65,77,25,49,68,81],l=[7,10,13,17,10,16,22,28,15,26,36,44,20,36,52,64,26,48,72,88,36,64,96,112,40,72,108,130,48,88,132,156,60,110,160,192,72,130,192,224,80,150,224,264,96,176,260,308,104,198,288,352,120,216,320,384,132,240,360,432,144,280,408,480,168,308,448,532,180,338,504,588,196,364,546,650,224,416,600,700,224,442,644,750,252,476,690,816,270,504,750,900,300,560,810,960,312,588,870,1050,336,644,952,1110,360,700,1020,1200,390,728,1050,1260,420,784,1140,1350,450,812,1200,1440,480,868,1290,1530,510,924,1350,1620,540,980,1440,1710,570,1036,1530,1800,570,1064,1590,1890,600,1120,1680,1980,630,1204,1770,2100,660,1260,1860,2220,720,1316,1950,2310,750,1372,2040,2430];return Ke.getBlocksCount=function(s,r){switch(r){case t.L:return o[(s-1)*4+0];case t.M:return o[(s-1)*4+1];case t.Q:return o[(s-1)*4+2];case t.H:return o[(s-1)*4+3];default:return}},Ke.getTotalCodewordsCount=function(s,r){switch(r){case t.L:return l[(s-1)*4+0];case t.M:return l[(s-1)*4+1];case t.Q:return l[(s-1)*4+2];case t.H:return l[(s-1)*4+3];default:return}},Ke}var it={},Fe={},vs;function Dn(){if(vs)return Fe;vs=1;const t=new Uint8Array(512),o=new Uint8Array(256);return(function(){let n=1;for(let s=0;s<255;s++)t[s]=n,o[n]=s,n<<=1,n&256&&(n^=285);for(let s=255;s<512;s++)t[s]=t[s-255]})(),Fe.log=function(n){if(n<1)throw new Error("log("+n+")");return o[n]},Fe.exp=function(n){return t[n]},Fe.mul=function(n,s){return n===0||s===0?0:t[o[n]+o[s]]},Fe}var ws;function Mn(){return ws||(ws=1,(function(t){const o=Dn();t.mul=function(n,s){const r=new Uint8Array(n.length+s.length-1);for(let a=0;a<n.length;a++)for(let u=0;u<s.length;u++)r[a+u]^=o.mul(n[a],s[u]);return r},t.mod=function(n,s){let r=new Uint8Array(n);for(;r.length-s.length>=0;){const a=r[0];for(let i=0;i<s.length;i++)r[i]^=o.mul(s[i],a);let u=0;for(;u<r.length&&r[u]===0;)u++;r=r.slice(u)}return r},t.generateECPolynomial=function(n){let s=new Uint8Array([1]);for(let r=0;r<n;r++)s=t.mul(s,new Uint8Array([1,o.exp(r)]));return s}})(it)),it}var lt,ys;function zn(){if(ys)return lt;ys=1;const t=Mn();function o(l){this.genPoly=void 0,this.degree=l,this.degree&&this.initialize(this.degree)}return o.prototype.initialize=function(n){this.degree=n,this.genPoly=t.generateECPolynomial(this.degree)},o.prototype.encode=function(n){if(!this.genPoly)throw new Error("Encoder not initialized");const s=new Uint8Array(n.length+this.degree);s.set(n);const r=t.mod(s,this.genPoly),a=this.degree-r.length;if(a>0){const u=new Uint8Array(this.degree);return u.set(r,a),u}return r},lt=o,lt}var dt={},ct={},ut={},js;function Vs(){return js||(js=1,ut.isValid=function(o){return!isNaN(o)&&o>=1&&o<=40}),ut}var ue={},Ns;function Hs(){if(Ns)return ue;Ns=1;const t="[0-9]+",o="[A-Z $%*+\\-./:]+";let l="(?:[u3000-u303F]|[u3040-u309F]|[u30A0-u30FF]|[uFF00-uFFEF]|[u4E00-u9FAF]|[u2605-u2606]|[u2190-u2195]|u203B|[u2010u2015u2018u2019u2025u2026u201Cu201Du2225u2260]|[u0391-u0451]|[u00A7u00A8u00B1u00B4u00D7u00F7])+";l=l.replace(/u/g,"\\u");const n="(?:(?![A-Z0-9 $%*+\\-./:]|"+l+`)(?:.|[\r
]))+`;ue.KANJI=new RegExp(l,"g"),ue.BYTE_KANJI=new RegExp("[^A-Z0-9 $%*+\\-./:]+","g"),ue.BYTE=new RegExp(n,"g"),ue.NUMERIC=new RegExp(t,"g"),ue.ALPHANUMERIC=new RegExp(o,"g");const s=new RegExp("^"+l+"$"),r=new RegExp("^"+t+"$"),a=new RegExp("^[A-Z0-9 $%*+\\-./:]+$");return ue.testKanji=function(i){return s.test(i)},ue.testNumeric=function(i){return r.test(i)},ue.testAlphanumeric=function(i){return a.test(i)},ue}var ks;function $e(){return ks||(ks=1,(function(t){const o=Vs(),l=Hs();t.NUMERIC={id:"Numeric",bit:1,ccBits:[10,12,14]},t.ALPHANUMERIC={id:"Alphanumeric",bit:2,ccBits:[9,11,13]},t.BYTE={id:"Byte",bit:4,ccBits:[8,16,16]},t.KANJI={id:"Kanji",bit:8,ccBits:[8,10,12]},t.MIXED={bit:-1},t.getCharCountIndicator=function(r,a){if(!r.ccBits)throw new Error("Invalid mode: "+r);if(!o.isValid(a))throw new Error("Invalid version: "+a);return a>=1&&a<10?r.ccBits[0]:a<27?r.ccBits[1]:r.ccBits[2]},t.getBestModeForData=function(r){return l.testNumeric(r)?t.NUMERIC:l.testAlphanumeric(r)?t.ALPHANUMERIC:l.testKanji(r)?t.KANJI:t.BYTE},t.toString=function(r){if(r&&r.id)return r.id;throw new Error("Invalid mode")},t.isValid=function(r){return r&&r.bit&&r.ccBits};function n(s){if(typeof s!="string")throw new Error("Param is not a string");switch(s.toLowerCase()){case"numeric":return t.NUMERIC;case"alphanumeric":return t.ALPHANUMERIC;case"kanji":return t.KANJI;case"byte":return t.BYTE;default:throw new Error("Unknown mode: "+s)}}t.from=function(r,a){if(t.isValid(r))return r;try{return n(r)}catch{return a}}})(ct)),ct}var $s;function Fn(){return $s||($s=1,(function(t){const o=ke(),l=_s(),n=jt(),s=$e(),r=Vs(),a=7973,u=o.getBCHDigit(a);function i(T,N,U){for(let M=1;M<=40;M++)if(N<=t.getCapacity(M,U,T))return M}function v(T,N){return s.getCharCountIndicator(T,N)+4}function w(T,N){let U=0;return T.forEach(function(M){const _=v(M.mode,N);U+=_+M.getBitsLength()}),U}function $(T,N){for(let U=1;U<=40;U++)if(w(T,U)<=t.getCapacity(U,N,s.MIXED))return U}t.from=function(N,U){return r.isValid(N)?parseInt(N,10):U},t.getCapacity=function(N,U,M){if(!r.isValid(N))throw new Error("Invalid QR Code version");typeof M>"u"&&(M=s.BYTE);const _=o.getSymbolTotalCodewords(N),h=l.getTotalCodewordsCount(N,U),j=(_-h)*8;if(M===s.MIXED)return j;const R=j-v(M,N);switch(M){case s.NUMERIC:return Math.floor(R/10*3);case s.ALPHANUMERIC:return Math.floor(R/11*2);case s.KANJI:return Math.floor(R/13);case s.BYTE:default:return Math.floor(R/8)}},t.getBestVersionForData=function(N,U){let M;const _=n.from(U,n.M);if(Array.isArray(N)){if(N.length>1)return $(N,_);if(N.length===0)return 1;M=N[0]}else M=N;return i(M.mode,M.getLength(),_)},t.getEncodedBits=function(N){if(!r.isValid(N)||N<7)throw new Error("Invalid QR Code version");let U=N<<12;for(;o.getBCHDigit(U)-u>=0;)U^=a<<o.getBCHDigit(U)-u;return N<<12|U}})(dt)),dt}var ht={},Cs;function qn(){if(Cs)return ht;Cs=1;const t=ke(),o=1335,l=21522,n=t.getBCHDigit(o);return ht.getEncodedBits=function(r,a){const u=r.bit<<3|a;let i=u<<10;for(;t.getBCHDigit(i)-n>=0;)i^=o<<t.getBCHDigit(i)-n;return(u<<10|i)^l},ht}var pt={},ft,Ss;function _n(){if(Ss)return ft;Ss=1;const t=$e();function o(l){this.mode=t.NUMERIC,this.data=l.toString()}return o.getBitsLength=function(n){return 10*Math.floor(n/3)+(n%3?n%3*3+1:0)},o.prototype.getLength=function(){return this.data.length},o.prototype.getBitsLength=function(){return o.getBitsLength(this.data.length)},o.prototype.write=function(n){let s,r,a;for(s=0;s+3<=this.data.length;s+=3)r=this.data.substr(s,3),a=parseInt(r,10),n.put(a,10);const u=this.data.length-s;u>0&&(r=this.data.substr(s),a=parseInt(r,10),n.put(a,u*3+1))},ft=o,ft}var mt,Es;function Vn(){if(Es)return mt;Es=1;const t=$e(),o=["0","1","2","3","4","5","6","7","8","9","A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z"," ","$","%","*","+","-",".","/",":"];function l(n){this.mode=t.ALPHANUMERIC,this.data=n}return l.getBitsLength=function(s){return 11*Math.floor(s/2)+6*(s%2)},l.prototype.getLength=function(){return this.data.length},l.prototype.getBitsLength=function(){return l.getBitsLength(this.data.length)},l.prototype.write=function(s){let r;for(r=0;r+2<=this.data.length;r+=2){let a=o.indexOf(this.data[r])*45;a+=o.indexOf(this.data[r+1]),s.put(a,11)}this.data.length%2&&s.put(o.indexOf(this.data[r]),6)},mt=l,mt}var xt,As;function Hn(){if(As)return xt;As=1;const t=$e();function o(l){this.mode=t.BYTE,typeof l=="string"?this.data=new TextEncoder().encode(l):this.data=new Uint8Array(l)}return o.getBitsLength=function(n){return n*8},o.prototype.getLength=function(){return this.data.length},o.prototype.getBitsLength=function(){return o.getBitsLength(this.data.length)},o.prototype.write=function(l){for(let n=0,s=this.data.length;n<s;n++)l.put(this.data[n],8)},xt=o,xt}var gt,Ts;function On(){if(Ts)return gt;Ts=1;const t=$e(),o=ke();function l(n){this.mode=t.KANJI,this.data=n}return l.getBitsLength=function(s){return s*13},l.prototype.getLength=function(){return this.data.length},l.prototype.getBitsLength=function(){return l.getBitsLength(this.data.length)},l.prototype.write=function(n){let s;for(s=0;s<this.data.length;s++){let r=o.toSJIS(this.data[s]);if(r>=33088&&r<=40956)r-=33088;else if(r>=57408&&r<=60351)r-=49472;else throw new Error("Invalid SJIS character: "+this.data[s]+`
Make sure your charset is UTF-8`);r=(r>>>8&255)*192+(r&255),n.put(r,13)}},gt=l,gt}var bt={exports:{}},Rs;function Qn(){return Rs||(Rs=1,(function(t){var o={single_source_shortest_paths:function(l,n,s){var r={},a={};a[n]=0;var u=o.PriorityQueue.make();u.push(n,0);for(var i,v,w,$,T,N,U,M,_;!u.empty();){i=u.pop(),v=i.value,$=i.cost,T=l[v]||{};for(w in T)T.hasOwnProperty(w)&&(N=T[w],U=$+N,M=a[w],_=typeof a[w]>"u",(_||M>U)&&(a[w]=U,u.push(w,U),r[w]=v))}if(typeof s<"u"&&typeof a[s]>"u"){var h=["Could not find a path from ",n," to ",s,"."].join("");throw new Error(h)}return r},extract_shortest_path_from_predecessor_list:function(l,n){for(var s=[],r=n;r;)s.push(r),l[r],r=l[r];return s.reverse(),s},find_path:function(l,n,s){var r=o.single_source_shortest_paths(l,n,s);return o.extract_shortest_path_from_predecessor_list(r,s)},PriorityQueue:{make:function(l){var n=o.PriorityQueue,s={},r;l=l||{};for(r in n)n.hasOwnProperty(r)&&(s[r]=n[r]);return s.queue=[],s.sorter=l.sorter||n.default_sorter,s},default_sorter:function(l,n){return l.cost-n.cost},push:function(l,n){var s={value:l,cost:n};this.queue.push(s),this.queue.sort(this.sorter)},pop:function(){return this.queue.shift()},empty:function(){return this.queue.length===0}}};t.exports=o})(bt)),bt.exports}var Is;function Kn(){return Is||(Is=1,(function(t){const o=$e(),l=_n(),n=Vn(),s=Hn(),r=On(),a=Hs(),u=ke(),i=Qn();function v(h){return unescape(encodeURIComponent(h)).length}function w(h,j,R){const C=[];let F;for(;(F=h.exec(R))!==null;)C.push({data:F[0],index:F.index,mode:j,length:F[0].length});return C}function $(h){const j=w(a.NUMERIC,o.NUMERIC,h),R=w(a.ALPHANUMERIC,o.ALPHANUMERIC,h);let C,F;return u.isKanjiModeEnabled()?(C=w(a.BYTE,o.BYTE,h),F=w(a.KANJI,o.KANJI,h)):(C=w(a.BYTE_KANJI,o.BYTE,h),F=[]),j.concat(R,C,F).sort(function(B,L){return B.index-L.index}).map(function(B){return{data:B.data,mode:B.mode,length:B.length}})}function T(h,j){switch(j){case o.NUMERIC:return l.getBitsLength(h);case o.ALPHANUMERIC:return n.getBitsLength(h);case o.KANJI:return r.getBitsLength(h);case o.BYTE:return s.getBitsLength(h)}}function N(h){return h.reduce(function(j,R){const C=j.length-1>=0?j[j.length-1]:null;return C&&C.mode===R.mode?(j[j.length-1].data+=R.data,j):(j.push(R),j)},[])}function U(h){const j=[];for(let R=0;R<h.length;R++){const C=h[R];switch(C.mode){case o.NUMERIC:j.push([C,{data:C.data,mode:o.ALPHANUMERIC,length:C.length},{data:C.data,mode:o.BYTE,length:C.length}]);break;case o.ALPHANUMERIC:j.push([C,{data:C.data,mode:o.BYTE,length:C.length}]);break;case o.KANJI:j.push([C,{data:C.data,mode:o.BYTE,length:v(C.data)}]);break;case o.BYTE:j.push([{data:C.data,mode:o.BYTE,length:v(C.data)}])}}return j}function M(h,j){const R={},C={start:{}};let F=["start"];for(let y=0;y<h.length;y++){const B=h[y],L=[];for(let A=0;A<B.length;A++){const p=B[A],k=""+y+A;L.push(k),R[k]={node:p,lastCount:0},C[k]={};for(let E=0;E<F.length;E++){const P=F[E];R[P]&&R[P].node.mode===p.mode?(C[P][k]=T(R[P].lastCount+p.length,p.mode)-T(R[P].lastCount,p.mode),R[P].lastCount+=p.length):(R[P]&&(R[P].lastCount=p.length),C[P][k]=T(p.length,p.mode)+4+o.getCharCountIndicator(p.mode,j))}}F=L}for(let y=0;y<F.length;y++)C[F[y]].end=0;return{map:C,table:R}}function _(h,j){let R;const C=o.getBestModeForData(h);if(R=o.from(j,C),R!==o.BYTE&&R.bit<C.bit)throw new Error('"'+h+'" cannot be encoded with mode '+o.toString(R)+`.
 Suggested mode is: `+o.toString(C));switch(R===o.KANJI&&!u.isKanjiModeEnabled()&&(R=o.BYTE),R){case o.NUMERIC:return new l(h);case o.ALPHANUMERIC:return new n(h);case o.KANJI:return new r(h);case o.BYTE:return new s(h)}}t.fromArray=function(j){return j.reduce(function(R,C){return typeof C=="string"?R.push(_(C,null)):C.data&&R.push(_(C.data,C.mode)),R},[])},t.fromString=function(j,R){const C=$(j,u.isKanjiModeEnabled()),F=U(C),y=M(F,R),B=i.find_path(y.map,"start","end"),L=[];for(let A=1;A<B.length-1;A++)L.push(y.table[B[A]].node);return t.fromArray(N(L))},t.rawSplit=function(j){return t.fromArray($(j,u.isKanjiModeEnabled()))}})(pt)),pt}var Bs;function Gn(){if(Bs)return et;Bs=1;const t=ke(),o=jt(),l=In(),n=Bn(),s=Pn(),r=Ln(),a=Un(),u=_s(),i=zn(),v=Fn(),w=qn(),$=$e(),T=Kn();function N(y,B){const L=y.size,A=r.getPositions(B);for(let p=0;p<A.length;p++){const k=A[p][0],E=A[p][1];for(let P=-1;P<=7;P++)if(!(k+P<=-1||L<=k+P))for(let D=-1;D<=7;D++)E+D<=-1||L<=E+D||(P>=0&&P<=6&&(D===0||D===6)||D>=0&&D<=6&&(P===0||P===6)||P>=2&&P<=4&&D>=2&&D<=4?y.set(k+P,E+D,!0,!0):y.set(k+P,E+D,!1,!0))}}function U(y){const B=y.size;for(let L=8;L<B-8;L++){const A=L%2===0;y.set(L,6,A,!0),y.set(6,L,A,!0)}}function M(y,B){const L=s.getPositions(B);for(let A=0;A<L.length;A++){const p=L[A][0],k=L[A][1];for(let E=-2;E<=2;E++)for(let P=-2;P<=2;P++)E===-2||E===2||P===-2||P===2||E===0&&P===0?y.set(p+E,k+P,!0,!0):y.set(p+E,k+P,!1,!0)}}function _(y,B){const L=y.size,A=v.getEncodedBits(B);let p,k,E;for(let P=0;P<18;P++)p=Math.floor(P/3),k=P%3+L-8-3,E=(A>>P&1)===1,y.set(p,k,E,!0),y.set(k,p,E,!0)}function h(y,B,L){const A=y.size,p=w.getEncodedBits(B,L);let k,E;for(k=0;k<15;k++)E=(p>>k&1)===1,k<6?y.set(k,8,E,!0):k<8?y.set(k+1,8,E,!0):y.set(A-15+k,8,E,!0),k<8?y.set(8,A-k-1,E,!0):k<9?y.set(8,15-k-1+1,E,!0):y.set(8,15-k-1,E,!0);y.set(A-8,8,1,!0)}function j(y,B){const L=y.size;let A=-1,p=L-1,k=7,E=0;for(let P=L-1;P>0;P-=2)for(P===6&&P--;;){for(let D=0;D<2;D++)if(!y.isReserved(p,P-D)){let G=!1;E<B.length&&(G=(B[E]>>>k&1)===1),y.set(p,P-D,G),k--,k===-1&&(E++,k=7)}if(p+=A,p<0||L<=p){p-=A,A=-A;break}}}function R(y,B,L){const A=new l;L.forEach(function(D){A.put(D.mode.bit,4),A.put(D.getLength(),$.getCharCountIndicator(D.mode,y)),D.write(A)});const p=t.getSymbolTotalCodewords(y),k=u.getTotalCodewordsCount(y,B),E=(p-k)*8;for(A.getLengthInBits()+4<=E&&A.put(0,4);A.getLengthInBits()%8!==0;)A.putBit(0);const P=(E-A.getLengthInBits())/8;for(let D=0;D<P;D++)A.put(D%2?17:236,8);return C(A,y,B)}function C(y,B,L){const A=t.getSymbolTotalCodewords(B),p=u.getTotalCodewordsCount(B,L),k=A-p,E=u.getBlocksCount(B,L),P=A%E,D=E-P,G=Math.floor(A/E),re=Math.floor(k/E),ce=re+1,he=G-re,Ie=new i(he);let ve=0;const Z=new Array(E),pe=new Array(E);let oe=0;const we=new Uint8Array(y.buffer);for(let ie=0;ie<E;ie++){const ee=ie<D?re:ce;Z[ie]=we.slice(ve,ve+ee),pe[ie]=Ie.encode(Z[ie]),ve+=ee,oe=Math.max(oe,ee)}const ae=new Uint8Array(A);let xe=0,W,X;for(W=0;W<oe;W++)for(X=0;X<E;X++)W<Z[X].length&&(ae[xe++]=Z[X][W]);for(W=0;W<he;W++)for(X=0;X<E;X++)ae[xe++]=pe[X][W];return ae}function F(y,B,L,A){let p;if(Array.isArray(y))p=T.fromArray(y);else if(typeof y=="string"){let G=B;if(!G){const re=T.rawSplit(y);G=v.getBestVersionForData(re,L)}p=T.fromString(y,G||40)}else throw new Error("Invalid data");const k=v.getBestVersionForData(p,L);if(!k)throw new Error("The amount of data is too big to be stored in a QR Code");if(!B)B=k;else if(B<k)throw new Error(`
The chosen QR Code version cannot contain this amount of data.
Minimum version required to store current data is: `+k+`.
`);const E=R(B,L,p),P=t.getSymbolSize(B),D=new n(P);return N(D,B),U(D),M(D,B),h(D,L,0),B>=7&&_(D,B),j(D,E),isNaN(A)&&(A=a.getBestMask(D,h.bind(null,D,L))),a.applyMask(A,D),h(D,L,A),{modules:D,version:B,errorCorrectionLevel:L,maskPattern:A,segments:p}}return et.create=function(B,L){if(typeof B>"u"||B==="")throw new Error("No input text");let A=o.M,p,k;return typeof L<"u"&&(A=o.from(L.errorCorrectionLevel,o.M),p=v.from(L.version),k=a.from(L.maskPattern),L.toSJISFunc&&t.setToSJISFunction(L.toSJISFunc)),F(B,p,A,k)},et}var vt={},wt={},Ps;function Os(){return Ps||(Ps=1,(function(t){function o(l){if(typeof l=="number"&&(l=l.toString()),typeof l!="string")throw new Error("Color should be defined as hex string");let n=l.slice().replace("#","").split("");if(n.length<3||n.length===5||n.length>8)throw new Error("Invalid hex color: "+l);(n.length===3||n.length===4)&&(n=Array.prototype.concat.apply([],n.map(function(r){return[r,r]}))),n.length===6&&n.push("F","F");const s=parseInt(n.join(""),16);return{r:s>>24&255,g:s>>16&255,b:s>>8&255,a:s&255,hex:"#"+n.slice(0,6).join("")}}t.getOptions=function(n){n||(n={}),n.color||(n.color={});const s=typeof n.margin>"u"||n.margin===null||n.margin<0?4:n.margin,r=n.width&&n.width>=21?n.width:void 0,a=n.scale||4;return{width:r,scale:r?4:a,margin:s,color:{dark:o(n.color.dark||"#000000ff"),light:o(n.color.light||"#ffffffff")},type:n.type,rendererOpts:n.rendererOpts||{}}},t.getScale=function(n,s){return s.width&&s.width>=n+s.margin*2?s.width/(n+s.margin*2):s.scale},t.getImageWidth=function(n,s){const r=t.getScale(n,s);return Math.floor((n+s.margin*2)*r)},t.qrToImageData=function(n,s,r){const a=s.modules.size,u=s.modules.data,i=t.getScale(a,r),v=Math.floor((a+r.margin*2)*i),w=r.margin*i,$=[r.color.light,r.color.dark];for(let T=0;T<v;T++)for(let N=0;N<v;N++){let U=(T*v+N)*4,M=r.color.light;if(T>=w&&N>=w&&T<v-w&&N<v-w){const _=Math.floor((T-w)/i),h=Math.floor((N-w)/i);M=$[u[_*a+h]?1:0]}n[U++]=M.r,n[U++]=M.g,n[U++]=M.b,n[U]=M.a}}})(wt)),wt}var Ls;function Jn(){return Ls||(Ls=1,(function(t){const o=Os();function l(s,r,a){s.clearRect(0,0,r.width,r.height),r.style||(r.style={}),r.height=a,r.width=a,r.style.height=a+"px",r.style.width=a+"px"}function n(){try{return document.createElement("canvas")}catch{throw new Error("You need to specify a canvas element")}}t.render=function(r,a,u){let i=u,v=a;typeof i>"u"&&(!a||!a.getContext)&&(i=a,a=void 0),a||(v=n()),i=o.getOptions(i);const w=o.getImageWidth(r.modules.size,i),$=v.getContext("2d"),T=$.createImageData(w,w);return o.qrToImageData(T.data,r,i),l($,v,w),$.putImageData(T,0,0),v},t.renderToDataURL=function(r,a,u){let i=u;typeof i>"u"&&(!a||!a.getContext)&&(i=a,a=void 0),i||(i={});const v=t.render(r,a,i),w=i.type||"image/png",$=i.rendererOpts||{};return v.toDataURL(w,$.quality)}})(vt)),vt}var yt={},Us;function Yn(){if(Us)return yt;Us=1;const t=Os();function o(s,r){const a=s.a/255,u=r+'="'+s.hex+'"';return a<1?u+" "+r+'-opacity="'+a.toFixed(2).slice(1)+'"':u}function l(s,r,a){let u=s+r;return typeof a<"u"&&(u+=" "+a),u}function n(s,r,a){let u="",i=0,v=!1,w=0;for(let $=0;$<s.length;$++){const T=Math.floor($%r),N=Math.floor($/r);!T&&!v&&(v=!0),s[$]?(w++,$>0&&T>0&&s[$-1]||(u+=v?l("M",T+a,.5+N+a):l("m",i,0),i=0,v=!1),T+1<r&&s[$+1]||(u+=l("h",w),w=0)):i++}return u}return yt.render=function(r,a,u){const i=t.getOptions(a),v=r.modules.size,w=r.modules.data,$=v+i.margin*2,T=i.color.light.a?"<path "+o(i.color.light,"fill")+' d="M0 0h'+$+"v"+$+'H0z"/>':"",N="<path "+o(i.color.dark,"stroke")+' d="'+n(w,v,i.margin)+'"/>',U='viewBox="0 0 '+$+" "+$+'"',_='<svg xmlns="http://www.w3.org/2000/svg" '+(i.width?'width="'+i.width+'" height="'+i.width+'" ':"")+U+' shape-rendering="crispEdges">'+T+N+`</svg>
`;return typeof u=="function"&&u(null,_),_},yt}var Ds;function Wn(){if(Ds)return Te;Ds=1;const t=Rn(),o=Gn(),l=Jn(),n=Yn();function s(r,a,u,i,v){const w=[].slice.call(arguments,1),$=w.length,T=typeof w[$-1]=="function";if(!T&&!t())throw new Error("Callback required as last argument");if(T){if($<2)throw new Error("Too few arguments provided");$===2?(v=u,u=a,a=i=void 0):$===3&&(a.getContext&&typeof v>"u"?(v=i,i=void 0):(v=i,i=u,u=a,a=void 0))}else{if($<1)throw new Error("Too few arguments provided");return $===1?(u=a,a=i=void 0):$===2&&!a.getContext&&(i=u,u=a,a=void 0),new Promise(function(N,U){try{const M=o.create(u,i);N(r(M,a,i))}catch(M){U(M)}})}try{const N=o.create(u,i);v(null,r(N,a,i))}catch(N){v(N)}}return Te.create=o.create,Te.toCanvas=s.bind(null,l.render),Te.toDataURL=s.bind(null,l.renderToDataURL),Te.toString=s.bind(null,function(r,a,u){return n.render(r,u)}),Te}var Zn=Wn();const Xn=Ys(Zn);function Q(t){return t==null?"":String(t).replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;")}function f(t){if(t==null||t==="")return"";const l=String(t).split(/\r?\n/),n=s=>{if(!s)return"";try{const r=Intl;if(typeof Intl<"u"&&r.Segmenter){const a=new r.Segmenter("th",{granularity:"word"}),u=[];for(const i of a.segment(s)){const v=i.segment;/^\s+$/.test(v)?u.push(" "):u.push(`<span class="w-seg">${Q(v)}</span>`)}return u.join("")}}catch{}return Q(s)};return l.map(n).join("<br/>")}function Ms(t){try{const o=Xn.create(t,{errorCorrectionLevel:"M"}),l=o.modules.size,n=2,s=l+n*2;let r="";for(let u=0;u<l;u++)for(let i=0;i<l;i++)o.modules.get(u,i)&&(r+=`<rect x="${i+n}" y="${u+n}" width="1" height="1" fill="#0f172a"/>`);const a=`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${s} ${s}" width="200" height="200" shape-rendering="crispEdges"><rect width="100%" height="100%" fill="#ffffff"/>${r}</svg>`;return`data:image/svg+xml;utf8,${encodeURIComponent(a)}`}catch{return""}}function er(t,o,l,n=[]){var ee,ge,Be,Pe,fe,me,te,Le,Ue,qe,De,Ce,J;const s=t.type==="supplier",r=t.type==="location",a=s?t:null,u=r?t:null,i=t.type==="drink_store"?t:null,v=s?a.name:r?u.name:i.storeName,w=s?a.chineseName:r?u.foreignName:i.chineseName,$=s?a.category:r?u.locationType==="mall"?"ห้างสรรพสินค้า":u.locationType:i.storeCategory||"เรฟร้านน้ำ",T=s?a.marketOrCity:r?u.location.addressText||u.zoneOrFloor:i.city,N=t.country==="TH"?"ประเทศไทย (TH)":"ประเทศจีน (CN)",U=typeof window<"u"&&window.location.origin&&!window.location.hostname.includes("localhost")&&!window.location.hostname.includes("127.0.0.1")?`${window.location.origin}${window.location.pathname}`:"https://vitcha-sourcing-fxjw.onrender.com/",M=U.endsWith("/")?U:`${U}/`,_=`${M}?view=${encodeURIComponent(t.id)}&type=${encodeURIComponent(t.type)}`,h=Ms(_),j=[];a?((ee=a.photos.storefrontAndAtmosphere)==null||ee.forEach((d,m)=>j.push({url:d,label:`ป้ายหน้าร้าน / บรรยากาศ #${m+1}`})),(ge=a.photos.contactCards)==null||ge.forEach((d,m)=>j.push({url:d,label:`นามบัตร / WeChat #${m+1}`})),(Be=a.catalogItems)==null||Be.forEach((d,m)=>{d.photo&&j.push({url:d.photo,label:d.name?`สินค้า: ${d.name}`:`รายการสินค้า #${m+1}`})})):u?((Pe=u.photos.storefrontAndAtmosphere)==null||Pe.forEach((d,m)=>j.push({url:d,label:`หน้าร้าน / ทางเดิน #${m+1}`})),(fe=u.photos.floorPlanAndSpecs)==null||fe.forEach((d,m)=>j.push({url:d,label:`ผังห้อง / งานระบบ #${m+1}`})),(me=u.photos.surroundingNeighbors)==null||me.forEach((d,m)=>j.push({url:d,label:`ร้านข้างเคียง #${m+1}`})),(te=u.photos.contactCards)==null||te.forEach((d,m)=>j.push({url:d,label:`นามบัตร / เอกสารสัญญา #${m+1}`}))):i&&((Le=i.photos.storefrontAndAtmosphere)==null||Le.forEach((d,m)=>j.push({url:d,label:`หน้าร้าน / บรรยากาศ #${m+1}`})),(Ue=i.photos.menuBoard)==null||Ue.forEach((d,m)=>j.push({url:d,label:`ป้ายเมนู / ราคา #${m+1}`})),(qe=i.photos.drinkCups)==null||qe.forEach((d,m)=>j.push({url:d,label:`แก้วเครื่องดื่ม #${m+1}`})),(De=i.drinkItems)==null||De.forEach((d,m)=>{d.photo&&j.push({url:d.photo,label:d.name?`เมนูชิม: ${d.name}`:`แก้วชิม #${m+1}`})}));const R=le(t),C=[];R.forEach((d,m)=>{C.push({label:d.label||`คลิปเสียงหน้างาน #${m+1}`,durationSec:d.durationSec||4,source:"บันทึกเสียงหลักหน้างานจริง"})}),a?(a.catalogItems||[]).forEach((d,m)=>{le(d).forEach((I,x)=>{C.push({label:I.label||`คลิปเสียงสินค้า #${x+1}`,durationSec:I.durationSec||4,source:`สินค้า: ${d.name||`รายการที่ #${m+1}`}`})})}):i&&(i.drinkItems||[]).forEach((d,m)=>{le(d).forEach((I,x)=>{C.push({label:I.label||`คลิปเสียงเมนู #${x+1}`,durationSec:I.durationSec||4,source:`เมนู: ${d.name||`แก้วที่ #${m+1}`}`})})});const F=Array.isArray(t.videos)?t.videos.filter(Boolean):[],y=((Ce=j[0])==null?void 0:Ce.url)||"./logo.jpg",B=Array.isArray(t.viewedBy)?t.viewedBy:[],L=Array.isArray(t.likes)?t.likes:[],A=Array.isArray(t.reviewerNotes)?t.reviewerNotes:[],p=qs(t).sort((d,m)=>(Date.parse(d.timestamp)||0)-(Date.parse(m.timestamp)||0)),k=d=>{var m;return((m=n.find(I=>I.id===d||I.alias===d||I.name===d))==null?void 0:m.alias)||d},E=`ฉันจะเป็นหัวแถว-${v.replace(/[^a-zA-Z0-9ก-๙_-]/g,"_")}.pdf`,D={awaiting:"พาร์ท 1: รอรับช่วงต่อ",rfq_sent:"พาร์ท 2: ขอสเปก / ส่ง RFQ",sample_test:"พาร์ท 3: ทดสอบตัวอย่าง Lab / R&D",negotiate:"พาร์ท 4: ต่อรองราคา & MOQ",approved:"พาร์ท 5: ตัวเต็งอนุมัติ",ordered:"พาร์ท 6: สั่งซื้อสำเร็จ"}[t.handoffStage||"awaiting"]||"พาร์ท 1: รอรับช่วงต่อ",G=C.length>0?`<div class="media-grid">
          ${C.map((d,m)=>`
              <div class="voice-card">
                <div class="voice-icon">▶</div>
                <div class="voice-meta">
                  <div class="voice-title">${f(`${m+1}. ${d.label}`)}</div>
                  <div class="voice-sub">${f(`${d.source} · ความยาว ${d.durationSec} วินาที`)}</div>
                  <div class="voice-wave">${f("ılıll|ılıl||ılıll|ılı · สแกน QR เพื่อกดฟังเสียงจริง")}</div>
                </div>
              </div>`).join("")}
        </div>`:`<div class="empty-note">${f("ไม่มีไฟล์เสียงบันทึกในรายการนี้")}</div>`,re=F.length>0?`<div class="video-grid">
          ${F.map((d,m)=>{const I=d.includes("gtv-videos-bucket")?wn:d;return`
              <div class="video-card">
                <div class="video-thumb-wrap">
                  <img
                    id="video-thumb-img-${m}"
                    class="video-thumb-img"
                    src="${Q(y)}"
                    crossorigin="anonymous"
                    data-video-src="${Q(I)}"
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
        </div>`:`<div class="empty-note">${f("ไม่มีคลิปวิดีโอในรายการนี้")}</div>`;let ce="";if(s&&a){const d=(a.catalogItems||[]).map((m,I)=>{const x=le(m);return`
        <tr>
          <td style="text-align:center;font-weight:700;">${I+1}</td>
          <td>
            ${m.photo?`<img src="${Q(m.photo)}" crossorigin="anonymous" class="table-thumb" />`:'<div class="table-thumb-empty">ไม่มีรูป</div>'}
          </td>
          <td>
            <div class="cell-title">${f(m.name||`รายการที่ #${I+1}`)}</div>
            ${m.memo?`<div class="cell-sub">${f(m.memo)}</div>`:""}
            ${x.length>0?`<div class="cell-voice-badge">แนบเสียงบันทึก ${x.length} คลิป</div>`:""}
          </td>
          <td>
            <div class="cell-text">${f(m.dimensions||"-")}</div>
            <div class="cell-sub">${f(m.weightKg?`น้ำหนัก: ${m.weightKg}`:"")}</div>
          </td>
          <td>
            <div class="cell-price-green">
              ${m.priceRmb?`¥${m.priceRmb.toLocaleString()}`:m.priceThb?`฿${m.priceThb.toLocaleString()}`:"-"}
            </div>
            ${m.priceRmb?`<div class="cell-sub">(≈ ฿${o(m.priceRmb).toLocaleString()})</div>`:""}
          </td>
        </tr>`}).join("");ce=`
      <div class="section-box">
        <div class="section-title">${f(`กลุ่มที่ 3: รายการสินค้า / อุปกรณ์ / วัตถุดิบ (${(a.catalogItems||[]).length} รายการ)`)}</div>
        ${d?`<table class="data-table">
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
                <tbody>${d}</tbody>
              </table>`:`<div class="empty-note">${f("ไม่มีรายการย่อย")}</div>`}
      </div>
    `}else if(i){const d=(i.drinkItems||[]).map((m,I)=>{const x=le(m);return`
        <tr>
          <td style="text-align:center;font-weight:700;">${I+1}</td>
          <td>
            ${m.photo?`<img src="${Q(m.photo)}" crossorigin="anonymous" class="table-thumb" />`:'<div class="table-thumb-empty">ไม่มีรูป</div>'}
          </td>
          <td>
            <div class="cell-title">${f(m.name||`แก้วที่ #${I+1}`)}</div>
            ${m.gimmickNotes?`<div class="cell-sub">${f(`กิมมิก: ${m.gimmickNotes}`)}</div>`:""}
            ${x.length>0?`<div class="cell-voice-badge">แนบเสียงบันทึก ${x.length} คลิป</div>`:""}
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
            ${m.priceRmb?`<div class="cell-sub">(≈ ฿${o(m.priceRmb).toLocaleString()})</div>`:""}
          </td>
        </tr>`}).join("");ce=`
      <div class="section-box">
        <div class="section-title">${f(`กลุ่มที่ 3: เมนูที่ชิม & การถอดรหัสสูตร (${(i.drinkItems||[]).length} เมนู)`)}</div>
        ${d?`<table class="data-table">
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
                <tbody>${d}</tbody>
              </table>`:`<div class="empty-note">${f("ไม่มีเมนูย่อย")}</div>`}
      </div>
    `}const he=t.attachedFiles||[],Ie=he.length>0?`<div class="section-box">
          <div class="section-title">${f(`เอกสารและไฟล์แนบเพิ่มเติม (Attached Documents) — (${he.length} ไฟล์)`)}</div>
          <div class="media-subhead">${f("สแกน QR Code หรือคลิกลิงก์ด้านล่างเพื่อเปิดไฟล์บน Google Drive / เบราว์เซอร์:")}</div>
          ${he.map((d,m)=>{const I=d.url?Ms(d.url):"",x=(d.name.split(".").pop()||"FILE").toUpperCase(),g=d.size?d.size<1024*1024?`${(d.size/1024).toFixed(1)} KB`:`${(d.size/(1024*1024)).toFixed(1)} MB`:"";return`
              <div class="file-attachment-card">
                <div class="file-attachment-info">
                  <div class="file-attachment-name">#${m+1} [${Q(x)}] ${Q(d.name)}</div>
                  <div class="file-attachment-meta">
                    ${g?`ขนาด: ${g}`:""}
                    ${d.uploadedAt?` · บันทึกเมื่อ: ${new Date(d.uploadedAt).toLocaleDateString("th-TH")}`:""}
                  </div>
                  <div class="file-attachment-link">
                    <a href="${Q(d.url)}" target="_blank" rel="noopener noreferrer">${Q(d.url)}</a>
                  </div>
                </div>
                ${I?`<div class="file-attachment-qr">
                        <img src="${I}" alt="QR" />
                        <div style="font-size:7px;text-align:center;color:#059669;font-weight:700;margin-top:2px;">Scan Open</div>
                      </div>`:""}
              </div>`}).join("")}
        </div>`:"",ve=j.length>0?`<div class="photo-grid">
          ${j.map((d,m)=>`
              <div class="photo-card">
                <img src="${Q(d.url)}" crossorigin="anonymous" />
                <div class="photo-caption">${f(`รูปที่ ${m+1}: ${d.label}`)}</div>
              </div>`).join("")}
        </div>`:`<div class="empty-note">${f("ไม่มีรูปภาพในรายการนี้")}</div>`,Z=(d,m)=>{if(d==null||d===""||Array.isArray(d)&&!d.length)return'<span class="audit-empty">ยังไม่ระบุ / ไม่มีข้อมูล</span>';if(Array.isArray(d))return d.map((g,b)=>`<div class="audit-value-item"><b>${b+1}.</b> ${Z(g,m)}</div>`).join("");if(typeof d=="object")return Object.entries(d).filter(([g])=>!["id","driveFileId"].includes(g)).map(([g,b])=>`<div class="audit-value-item"><strong>${f(Ye[g]||g)}:</strong> ${Z(b,`${m}.${g}`)}</div>`).join("");if(typeof d=="boolean")return d?"ใช่":"ไม่ใช่";const I=String(d);if(m==="handoffStage")return f(de(I));if(m==="assignedTo")return f(k(I));if(m==="status")return f({scouted:"สำรวจแล้ว",reviewing:"เทียบสเปก",rfq_sent:"ส่ง RFQ",shortlisted:"ตัวเต็ง",ordered:"สั่งซื้อแล้ว"}[I]||I);if(/url$|photos|photo|videos|voice|audio|storefrontAndAtmosphere|contactCards|menuBoard|drinkCups|floorPlanAndSpecs|surroundingNeighbors/i.test(m)&&/^(https?:\/\/|\.\/|\/(?!\/)|data:(image|audio|video)\/)/i.test(I)){let g;try{g=new URL(I,/^\/(uploads|media)\//.test(I)?Ws():M).href}catch{return f(I)}const b=/voice|audio/i.test(m),Y=/video/i.test(m),H=!b&&!Y&&(/photos|photo|storefrontAndAtmosphere|contactCards|menuBoard|drinkCups|floorPlanAndSpecs|surroundingNeighbors/i.test(m)||/\.(png|jpe?g|webp|gif)(\?|$)/i.test(I)),_e=I.startsWith("data:")?_:g;return`<div class="audit-media">${H?`<img src="${Q(g)}" crossorigin="anonymous" alt="ภาพที่บันทึกในประวัติ" />`:""}<a href="${Q(_e)}" target="_blank" rel="noopener noreferrer">${f(b?"เปิดไฟล์เสียง":Y?"เปิดวิดีโอ":H?"เปิดภาพ":"เปิดไฟล์แนบ")}</a>${b||Y?`<span class="audit-empty"> · ${f("เปิดผ่านลิงก์หรือ QR ของรายการเพื่อฟังและดูต่อ")}</span>`:""}</div>`}return f(I)},pe=t.handoffStage||"awaiting",oe=p.filter(d=>d.version===2).flatMap(d=>[d.stageBefore,d.stageAfter]),we=Math.max(0,...[pe,...oe].map(d=>Re.findIndex(([m])=>m===d))),ae=()=>`<div class="audit-stages">${Re.slice(0,we+1).map(([d],m)=>{const I=p.filter(Y=>Y.version===2&&(Y.stageBefore===d||Y.stageAfter===d)),x=I.filter(Y=>Y.stageAfter===d&&Y.stageBefore!==d),g=pe===d;if(!I.length)return`<div class="audit-stage audit-stage-missing">${f(`พาร์ท ${m+1}: ไม่พบการบันทึกในพาร์ทนี้${g?" (สถานะปัจจุบัน)":""}`)}</div>`;const b=p.map((Y,H)=>Y.version===2&&Y.stageAfter===d?xe[H]:"").join("");return`<section class="audit-part"><div class="audit-stage ${g?"audit-current":""}"><strong>${f(de(d))}${g?" · ปัจจุบัน":""}</strong>${x.length>1?`<span>${f(`บันทึกเข้า ${x.length} ครั้ง`)}</span>`:""}</div>${b||`<p class="audit-empty">${f("พบพาร์ทนี้ในประวัติการส่งต่อไปขั้นตอนอื่น")}</p>`}</section>`}).join("")}</div>`,xe=p.map((d,m)=>{const I=d.kind==="handoff"||d.action==="handoff"?"ส่งต่องาน":d.kind==="comment"||d.action==="comment"?"ความคิดเห็น":d.kind==="reply"||d.action==="reply"?"ตอบกลับ":d.action,x=n.find(H=>H.id===d.userId||H.alias===d.user||H.name===d.user),g=d.userAvatar||(x==null?void 0:x.avatar),b=g&&/^(https?:\/\/|\.\/|\/(?!\/)|data:image\/)/i.test(g)?g:"",Y=d.version===2&&d.stageBefore&&d.stageBefore!==d.stageAfter;return`<article class="audit-event" data-activity-id="${Q(d.id||m)}">
        <div class="audit-event-heading">${b?`<img class="audit-avatar" src="${Q(b)}" crossorigin="anonymous" alt="${Q((x==null?void 0:x.alias)||d.user)}" />`:`<span class="audit-avatar audit-avatar-fallback">${Q(((x==null?void 0:x.alias)||d.user||"?").slice(0,1))}</span>`}<strong>${f((x==null?void 0:x.alias)||d.user)}</strong><span>${f(Number.isNaN(Date.parse(d.timestamp))?d.timestamp:new Date(d.timestamp).toLocaleString("th-TH"))}</span></div>
        <div class="audit-action">${f(I)}</div>
        ${d.version===2?`<div class="audit-transition">${f(Y?`${de(d.stageBefore)} → ${de(d.stageAfter)}`:`ณ ${de(d.stageAfter)}`)}</div>`:""}
        ${d.content?`<div class="audit-content">${d.version!==2?`<div class="audit-empty">${f("ข้อความที่ยังเก็บในรายการ · ไม่ทราบพาร์ท ณ เวลานั้น")}</div>`:""}${d.content.replyToAuthor?`<strong>${f(`ตอบกลับ ${d.content.replyToAuthor}`)}</strong>`:""}<p>${f(d.content.text)}</p>${d.content.photoUrl?Z(d.content.photoUrl,"photo"):""}${d.content.voiceUrl||d.content.audioUrl?Z(d.content.voiceUrl||d.content.audioUrl,"voice"):""}</div>`:""}
        ${(d.kind==="create"?[]:d.changes||[]).filter(H=>H.field!=="handoffStage").map(H=>`<div class="audit-change"><h4>${f(Ye[H.field]||H.field)}</h4>${H.before!=null&&H.before!==""&&(!Array.isArray(H.before)||H.before.length)?`<div class="audit-before"><b>ก่อนเปลี่ยน</b><div>${Z(H.before,H.field)}</div></div>`:""}<div class="audit-after">${H.before!=null&&H.before!==""?"<b>หลังเปลี่ยน</b>":""}<div>${Z(H.after,H.field)}</div></div></div>`).join("")}
      </article>`}),W=p.map((d,m)=>d.version===2&&Re.some(([I])=>I===d.stageAfter)?"":xe[m]).join(""),X=B.length>0?`<table class="data-table" style="margin-top:10px;">
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
            ${B.map((d,m)=>`
              <tr>
                <td style="text-align:center;">${m+1}</td>
                <td><div class="cell-title">${f(`${d.alias} (${d.name})`)}</div></td>
                <td><div class="cell-text">${Q(d.role.toUpperCase())}</div></td>
                <td><div class="cell-sub">${Q(new Date(d.lastViewedAt).toLocaleString("th-TH"))}</div></td>
                <td style="text-align:center;font-weight:700;">${f(`${d.viewCount||1} ครั้ง`)}</td>
              </tr>`).join("")}
          </tbody>
        </table>`:`<div class="empty-note" style="margin-top:8px;">${f("ยังไม่มีประวัติผู้เปิดอ่านเพิ่มเติม")}</div>`,ie=s?`คะแนนประเมิน ${(a==null?void 0:a.rating)||5}/5 ดาว (${a!=null&&a.isFactory?"โรงงานผลิต":"หน้าร้าน/โชว์รูม"})`:`รสชาติ ${i==null?void 0:i.ratings.taste}/5 · ดีไซน์ ${i==null?void 0:i.ratings.aesthetics}/5 · คุ้มค่า ${i==null?void 0:i.ratings.value}/5 · ความไว ${i==null?void 0:i.ratings.speed}/5`;return`<!DOCTYPE html>
<html lang="th">
<head>
  <meta charset="UTF-8" />
  <base href="${Q(M)}" />
  <meta name="viewport" content="width=840, initial-scale=0.45, minimum-scale=0.3, maximum-scale=2.0, user-scalable=yes" />
  <title>ฉันจะเป็นหัวแถว - ${Q(v)}</title>
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
      <strong style="font-size:14px;">รายงานสรุปฉบับสมบูรณ์: ${Q(v)}</strong>
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
          <div class="badge">${f(`${s?"รายงานซัพพลายเออร์ & โรงงาน":"รายงานเรฟร้านน้ำ & R&D"} · ${N}`)}</div>
          <h1 class="brand-title">${f(v)}</h1>
          <div class="brand-sub">${f(`${w?`${w} · `:""}หมวดหมู่: ${$}`)}</div>

          <!-- At-a-glance Multimedia & Detail Counter Pills -->
          <div class="summary-pills">
            <span class="summary-pill">${f(`รูปภาพ ${j.length} รูป`)}</span>
            <span class="summary-pill">${f(`วอยซ์เสียง ${C.length} คลิป`)}</span>
            <span class="summary-pill">${f(`วิดีโอ ${F.length} คลิป`)}</span>
            <span class="summary-pill">${f(s?`สินค้า ${((a==null?void 0:a.catalogItems)||[]).length} รายการ`:`เมนูชิม ${((i==null?void 0:i.drinkItems)||[]).length} เมนู`)}</span>
            <span class="summary-pill">${f(`คอมเมนต์ ${A.length} หัวข้อ`)}</span>
            <span class="summary-pill">${f(`ประวัติ Log ${p.length} รายการ`)}</span>
          </div>

          <div class="direct-link-bar">
            <div class="info-label" style="color:#0f172a;margin-bottom:2px;">Direct Link (Scan QR / LINE Share):</div>
            <div style="color:#059669;font-family:monospace;font-size:10px;word-break:break-all;">${Q(_)}</div>
          </div>
        </div>

        <div class="header-right">
          <div class="meta-box">
            <div class="meta-platform">${f("ฉันจะเป็นหัวแถว")}</div>
            <div>LEAD THE FRONT · R&amp;D</div>
            <div style="margin-top:4px;">${f(`รหัส: ${t.id.slice(0,18)}`)}</div>
            <div>${f(`สถานะ: ${D}`)}</div>
            <div>${f(`ออกรายงาน: ${new Date().toLocaleString("th-TH")}`)}</div>
          </div>

          ${h?`<div class="qr-card">
                  <img id="report-qr-img" src="${h}" alt="QR Code" />
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
            <span class="info-value">${f(`${v}${w?` (${w})`:""}`)}</span>
          </div>
          <div class="info-item">
            <span class="info-label">${f("หมวดหมู่ & คะแนนประเมิน")}</span>
            <span class="info-value">${f(`${$} · ${ie}`)}</span>
          </div>
          <div class="info-item">
            <span class="info-label">${f("สถานที่ / ตลาด / เมือง")}</span>
            <span class="info-value">${f(T||((J=t.location)==null?void 0:J.addressText)||"-")}</span>
          </div>
          <div class="info-item">
            <span class="info-label">${f("พิกัด GPS & แผนที่")}</span>
            <span class="info-value">${t.location?`${t.location.lat.toFixed(5)}, ${t.location.lng.toFixed(5)} (${Q(t.location.addressText||"พิกัดหน้างาน")})`:"-"}</span>
          </div>
          <div class="info-item">
            <span class="info-label">${f("ช่องทางติดต่อ (WeChat / LINE / โทรศัพท์)")}</span>
            <span class="info-value">${f(`WeChat: ${(s?a==null?void 0:a.wechatId:i==null?void 0:i.wechatId)||"-"} | LINE: ${(s?a==null?void 0:a.lineId:i==null?void 0:i.lineId)||"-"} | โทร: ${(s?a==null?void 0:a.phone:i==null?void 0:i.phone)||"-"}`)}</span>
          </div>
          <div class="info-item">
            <span class="info-label">${f("ผู้ลงพื้นที่สำรวจ & เวลาที่บันทึก")}</span>
            <span class="info-value">${f(`${t.creator.alias}${t.creator.name&&t.creator.name!==t.creator.alias?` (${t.creator.name})`:""} · ${new Date(t.creator.timestamp).toLocaleString("th-TH")}`)}</span>
          </div>
          <div class="info-item">
            <span class="info-label">${f("ผู้รับผิดชอบรับช่วงต่อ & กำหนดติดตาม")}</span>
            <span class="info-value">${f(`${t.assignedTo?k(t.assignedTo):"ยังไม่ระบุผู้รับผิดชอบ"} · กำหนดติดตาม: ${t.targetFollowUpDate||"-"}`)}</span>
          </div>
          <div class="info-item">
            <span class="info-label">${f("การมีส่วนร่วมของทีม (Likes & Views)")}</span>
            <span class="info-value">${f(`กดถูกใจ ${L.length} คน · เปิดอ่านแล้ว ${B.length} คน`)}</span>
          </div>
        </div>

        ${(s?a!=null&&a.memo:i!=null&&i.tastingNotes)?`<div class="note-banner">
                <div class="note-banner-title">${f(s?"บันทึกภาพรวมหน้างาน / รายละเอียดสเปกหลัก:":"บันทึกรีวิวรสชาติ & ไอเดียเรฟหน้างาน:")}</div>
                <div class="note-banner-body">${f(s?a==null?void 0:a.memo:i==null?void 0:i.tastingNotes)}</div>
              </div>`:""}

        ${t.handoffNotes?`<div class="handoff-banner">
                <div class="handoff-banner-title">${f("โน้ตการส่งมอบงาน / ผลเจรจาทีมไทย:")}</div>
                <div class="note-banner-body">${f(t.handoffNotes)}</div>
              </div>`:""}
      </div>

      <!-- Group 2: Voice Recordings & Video Clips with Thumbnail Previews -->
      <div class="section-box">
        <div class="section-title">${f(`กลุ่มที่ 2: สื่อมัลติมีเดียหน้างาน — วอยซ์เสียงบันทึก (${C.length} คลิป) & วิดีโอ (${F.length} คลิป)`)}</div>
        <div class="media-subhead">${f(`ไฟล์เสียงบันทึกหน้างานจริง (${C.length} คลิป):`)}</div>
        ${G}
        <div class="media-subhead" style="margin-top:10px;">${f(`คลิปวิดีโอหน้างานพร้อมภาพ Thumbnail พรีวิว (${F.length} คลิป):`)}</div>
        ${re}
      </div>

      <!-- Group 3: Catalog / Drink Items -->
      ${ce}

      <!-- Attached Documents & Files -->
      ${Ie}

      <!-- Group 4: All Photos of This Item -->
      <div class="section-box">
        <div class="section-title">${f(`กลุ่มที่ 4: แกลเลอรีภาพถ่ายทั้งหมดของรายการนี้ (${j.length} รูป)`)}</div>
        ${ve}
      </div>

      <!-- Group 6: Activity & Handoff Log + Viewer Log -->
      <div class="section-box activity-report" id="activity-history">
        <div class="section-title">${f(`กลุ่มที่ 5: ประวัติการดำเนินงานและความคิดเห็น (${p.length} เหตุการณ์)`)}</div>
        <p class="audit-intro">${f("จัดตามพาร์ทที่เกี่ยวข้อง แต่ละพาร์ทเรียงเหตุการณ์จากเก่าไปใหม่")}</p>
        <div class="audit-current-summary"><strong>${f(`ปัจจุบัน: ${D}`)}</strong><div>${f(`ผู้รับช่วงต่อ: ${t.assignedTo?k(t.assignedTo):"ยังไม่ระบุ"} · กำหนดติดตาม: ${t.targetFollowUpDate||"ยังไม่ระบุ"}`)}</div></div>
        ${ae()}
        ${p.some(d=>d.version!==2)?`<p class="audit-legacy">${f("ประวัติเก่าแสดงตามที่บันทึกไว้ ไม่เติมขั้นตอนย้อนหลัง")}</p>`:""}
        ${W?`<h3 class="audit-viewers">ประวัติที่ไม่ได้ระบุพาร์ท</h3>${W}`:""}
        ${B.length?`<h3 class="audit-viewers">${f("ผู้เปิดอ่านรายการ")}</h3>${X}`:""}
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
          filename: ${JSON.stringify(E)},
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
</html>`}function zs(t,o,l,n=[]){const s=er(t,o,l,n),r=new Blob([s],{type:"text/html;charset=utf-8"}),a=URL.createObjectURL(r);if(!window.open(a,"_blank")){const i=document.createElement("a");i.href=a,i.target="_blank",i.click()}setTimeout(()=>URL.revokeObjectURL(a),6e4)}const ar=({item:t,isOpen:o,onClose:l,onShareToLine:n})=>{var Rt,It,Bt,Pt,Lt,Ut,Dt,Mt,zt,Ft,qt,_t,Vt,Ht,Ot,Qt,Kt,Gt,Jt,Yt,Wt,Zt,Xt,es,ts;const{currentUser:s,convertCnyToThb:r,addReviewerNote:a,addReviewReply:u,updatePipelineStatus:i,toggleLikeItem:v,suppliers:w,drinkStores:$,locations:T,users:N,quickMessages:U,recordItemView:M,canEditItems:_,canDeleteItems:h,deleteSupplier:j,deleteStoreInspo:R,deleteLocation:C,canComment:F,openEditItem:y}=Zs(),B=t&&t.type==="supplier"?w.find(c=>c.id===t.id):null,L=t&&t.type==="drink_store"?$.find(c=>c.id===t.id):null,A=t&&t.type==="location"?T.find(c=>c.id===t.id):null,p=B||L||A||t,[k,E]=K.useState(null),[P,D]=K.useState(""),[G,re]=K.useState(null),[ce,he]=K.useState({}),[Ie,ve]=K.useState({}),[Z,pe]=K.useState(null),[oe,we]=K.useState(null),[ae,xe]=K.useState(!1),[W,X]=K.useState({}),ie=Se.useRef(null),[ee,ge]=K.useState(null),[Be,Pe]=K.useState(0),fe=Se.useRef(null),me=Se.useRef(null),te=Se.useRef(null),Le=Se.useRef(0),Ue=Se.useCallback(()=>{var c;if(te.current&&(clearInterval(te.current),te.current=null),fe.current&&fe.current.state==="recording"){fe.current.stop();return}(c=me.current)==null||c.getTracks().forEach(S=>S.stop()),me.current=null,ge(null)},[]);K.useEffect(()=>(o&&(t!=null&&t.id)&&M(t.id,t.type),E(null),()=>{var c,S;te.current&&clearInterval(te.current),((c=fe.current)==null?void 0:c.state)==="recording"&&fe.current.stop(),(S=me.current)==null||S.getTracks().forEach(z=>z.stop())}),[o,t==null?void 0:t.id]);const[qe,De]=K.useState("storefront"),Ce=Sn(p),J=((Rt=Ce.find(c=>c.id===qe))==null?void 0:Rt.photos)||[];if(K.useEffect(()=>{if(k===null||J.length===0)return;const c=S=>{S.key==="ArrowRight"?E(z=>z!==null?(z+1)%J.length:null):S.key==="ArrowLeft"?E(z=>z!==null?(z-1+J.length)%J.length:null):S.key==="Escape"&&E(null)};return window.addEventListener("keydown",c),()=>window.removeEventListener("keydown",c)},[k,J.length]),!o||!p)return null;const d=p.type==="supplier",m=p.type==="drink_store",I=p.type==="location",x=d?p:null,g=m?p:null,b=I?p:null,Y=Array.isArray(p.likes)?p.likes:[],H=Y.some(c=>c.userId===s.id),_e=p.attachedFiles||[],Nt=p.videos||[],kt=le(p),$t=d?(x==null?void 0:x.catalogItems)||[]:[],Ct=m?(g==null?void 0:g.drinkItems)||[]:[],St=(c,S)=>{var O;const V=(((O=Ce.find(se=>se.id===S))==null?void 0:O.photos)||[]).findIndex(se=>se.url===Ge(c));V<0||(De(S),E(V))},Et=async()=>{if(!p)return;const c=d?x==null?void 0:x.name:I?b==null?void 0:b.name:g==null?void 0:g.storeName;if(window.confirm(`ยืนยันการลบรายการ "${c||"รายการนี้"}" หรือไม่?`))try{p.type==="supplier"?await j(p.id):p.type==="drink_store"?await R(p.id):p.type==="location"&&await C(p.id),l()}catch{alert("เกิดข้อผิดพลาดในการลบรายการ")}},We=async(c,S,z)=>{try{xe(!0);const V=await vn(c,{recordId:p.id,recordType:p.type,recordTitle:d?x==null?void 0:x.name:I?b==null?void 0:b.name:g==null?void 0:g.storeName});z?X(O=>({...O,[z]:{...O[z],...S==="photo"?{photoUrl:V}:{voiceUrl:V}}})):S==="photo"?pe(V):we(V)}catch(V){alert(V.message||"อัปโหลดไฟล์แนบไม่สำเร็จ")}finally{xe(!1)}},At=async c=>{var S,z;if(ee===c){Ue();return}ee&&Ue();try{if(!((S=navigator.mediaDevices)!=null&&S.getUserMedia)||typeof MediaRecorder>"u"){alert("เบราว์เซอร์นี้ไม่รองรับการอัดเสียงสด กรุณาเปิดผ่าน HTTPS หรืออนุญาตไมโครโฟน");return}const V=await navigator.mediaDevices.getUserMedia({audio:!0});me.current=V;const O=["audio/mp4","audio/webm;codecs=opus","audio/webm","audio/ogg"].find(ne=>MediaRecorder.isTypeSupported(ne)),se=new MediaRecorder(V,O?{mimeType:O}:void 0);fe.current=se;const ye=[];se.ondataavailable=ne=>{ne.data.size>0&&ye.push(ne.data)},se.onstop=()=>{var Me;te.current&&(clearInterval(te.current),te.current=null),V.getTracks().forEach(Oe=>Oe.stop()),me.current=null,ge(null);const ne=((Me=se.mimeType)==null?void 0:Me.split(";")[0])||"audio/webm",q=new Blob(ye,{type:ne});if(!q.size)return;const Ze=ne.includes("mp4")?"m4a":ne.includes("ogg")?"ogg":"webm",He=new File([q],`เสียงคอมเมนต์-${Date.now()}.${Ze}`,{type:ne});We(He,"audio",c==="main"?void 0:c)},se.onerror=()=>{te.current&&clearInterval(te.current),V.getTracks().forEach(ne=>ne.stop()),ge(null),alert("อัดเสียงไม่สำเร็จ กรุณาลองใหม่")},Le.current=Date.now(),Pe(0),ge(c),se.start(250),te.current=setInterval(()=>{Pe(Math.round((Date.now()-Le.current)/1e3))},1e3)}catch{(z=me.current)==null||z.getTracks().forEach(V=>V.stop()),ge(null),alert("ไม่ได้รับสิทธิ์ใช้ไมโครโฟน กรุณากดอนุญาตไมโครโฟนเพื่ออัดเสียงสด")}},Qs=async c=>{c.preventDefault();const S=P.trim();!S&&!Z&&!oe||!await a(p.id,p.type,S,{photoUrl:Z||void 0,voiceUrl:oe||void 0})||(D(""),pe(null),we(null))},Tt=async(c,S,z)=>{const V=(ce[c]||"").trim(),O=W[c];!V&&!(O!=null&&O.photoUrl)&&!(O!=null&&O.voiceUrl)||!await u(p.id,p.type,c,V,S,{photoUrl:O==null?void 0:O.photoUrl,voiceUrl:O==null?void 0:O.voiceUrl,replyToId:z})||(he({...ce,[c]:""}),X(ye=>({...ye,[c]:{}})),re(null))},Ks=c=>{x&&i(x.id,c)},Ve=le(p);return(It=Ve[0])!=null&&It.url||(d?x==null||x.voiceNoteUrl:g==null||g.voiceNoteUrl),e.jsxs("div",{className:"fixed inset-0 z-[90] bg-black/45 backdrop-blur-sm flex items-center justify-center p-2 sm:p-4 overflow-y-auto",children:[e.jsxs("div",{className:"bg-white border border-slate-200/90 w-full max-w-3xl rounded-2xl shadow-2xl overflow-hidden my-auto animate-in zoom-in-95 max-h-[94vh] flex flex-col text-slate-900",children:[e.jsxs("div",{className:"p-3.5 sm:p-4 border-b border-slate-100 space-y-2.5 bg-white sticky top-0 z-10",children:[e.jsxs("div",{className:"flex items-start justify-between gap-2.5",children:[e.jsxs("div",{className:"flex items-start gap-2.5 min-w-0 flex-1",children:[e.jsx("span",{className:`p-2 rounded-xl shrink-0 mt-0.5 ${d?"bg-emerald-50 text-emerald-700":I?"bg-sky-50 text-sky-700":"bg-amber-50 text-amber-700"}`,children:d?e.jsx(Xs,{className:"w-4 h-4 sm:w-5 sm:h-5 text-emerald-600"}):I?e.jsx("i",{"aria-hidden":"true",className:"fa-solid fa-map-location-dot text-base text-sky-600"}):e.jsx(ss,{className:"w-4 h-4 sm:w-5 sm:h-5 text-amber-600"})}),e.jsxs("div",{className:"min-w-0 flex-1",children:[e.jsx("h2",{className:"font-extrabold text-slate-900 text-sm sm:text-base leading-snug break-words",children:d?x==null?void 0:x.name:I?b==null?void 0:b.name:g==null?void 0:g.storeName}),e.jsx("p",{className:"text-xs text-slate-400 truncate mt-0.5",children:d?(x==null?void 0:x.chineseName)||(x==null?void 0:x.marketOrCity):I?(b==null?void 0:b.zoneOrFloor)||(b==null?void 0:b.foreignName):(g==null?void 0:g.chineseName)||(g==null?void 0:g.storeCategory)||(g==null?void 0:g.brandConcept)})]})]}),e.jsx("button",{type:"button",onClick:l,className:"w-7 h-7 sm:w-8 sm:h-8 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-600 transition-all active:scale-95 flex items-center justify-center shrink-0",title:"ปิดหน้าต่าง",children:e.jsx(Ee,{className:"w-4 h-4"})})]}),e.jsxs("div",{className:"flex items-center gap-1.5 overflow-x-auto no-scrollbar pt-2 border-t border-slate-100 select-none",children:[_&&e.jsxs("button",{type:"button",onClick:()=>y(p),className:"h-7 sm:h-8 px-2.5 rounded-xl bg-amber-50 hover:bg-amber-100 text-amber-800 border border-amber-200/90 text-xs font-bold active:scale-95 transition-all inline-flex items-center gap-1 whitespace-nowrap shrink-0",title:"แก้ไขข้อมูลรายการนี้ (Admin / Editor)",children:[e.jsx(ns,{className:"w-3 h-3 text-amber-600 shrink-0"}),e.jsx("span",{children:"แก้ไข"})]}),h&&e.jsxs("button",{type:"button",onClick:Et,className:"h-7 sm:h-8 px-2.5 rounded-xl bg-rose-50 hover:bg-rose-100 text-rose-700 border border-rose-200 text-xs font-bold active:scale-95 transition-all inline-flex items-center gap-1 whitespace-nowrap shrink-0",title:"ลบรายการ",children:[e.jsx(rs,{className:"w-3 h-3 text-rose-600 shrink-0"}),e.jsx("span",{children:"ลบรายการ"})]}),e.jsxs("button",{type:"button",onClick:()=>v(p.id,p.type),className:`h-7 sm:h-8 px-2.5 rounded-xl border transition-all active:scale-95 inline-flex items-center gap-1 text-xs font-bold whitespace-nowrap shrink-0 ${H?"bg-blue-50 text-blue-700 border-blue-200":"bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100"}`,title:`ถูกใจ (${Y.length})`,children:[e.jsx(en,{className:`w-3 h-3 shrink-0 ${H?"fill-blue-600 text-blue-600":""}`}),e.jsxs("span",{children:["ถูกใจ",Y.length>0?` (${Y.length})`:""]})]}),e.jsxs("button",{type:"button",onClick:()=>n(p),className:"h-7 sm:h-8 px-2.5 rounded-xl bg-[#06C755] hover:bg-[#05b34c] text-white text-xs font-bold transition-all active:scale-95 inline-flex items-center gap-1 whitespace-nowrap shrink-0 shadow-2xs",title:"แชร์ลิงก์เข้า LINE",children:[e.jsx(tn,{className:"w-3 h-3 shrink-0"}),e.jsx("span",{children:"แชร์ LINE"})]}),e.jsxs("button",{type:"button",onClick:()=>zs(p,r,"pdf",N),className:"h-7 sm:h-8 px-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold transition-all active:scale-95 inline-flex items-center gap-1 whitespace-nowrap shrink-0",title:"ดาวน์โหลดรายงานเป็นไฟล์ PDF",children:[e.jsx(Cn,{className:"w-3 h-3 text-emerald-400 shrink-0"}),e.jsx("span",{children:"ดาวน์โหลด PDF"})]}),e.jsxs("button",{type:"button",onClick:()=>zs(p,r,"print",N),className:"h-7 sm:h-8 px-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold transition-all border border-slate-200/80 active:scale-95 inline-flex items-center gap-1 whitespace-nowrap shrink-0",title:"พิมพ์รายงานฉบับจัดหน้าสวยงาม (Print)",children:[e.jsx($n,{className:"w-3 h-3 text-slate-600 shrink-0"}),e.jsx("span",{children:"พิมพ์"})]})]})]}),e.jsxs("div",{className:"p-4 sm:p-6 space-y-4 overflow-y-auto flex-1",children:[e.jsxs("div",{className:"flex flex-wrap items-center justify-between gap-2 p-3 bg-slate-50 rounded-xl border border-slate-100 text-xs",children:[e.jsxs("div",{className:"flex items-center gap-2.5",children:[e.jsx(Je,{src:p.creator.avatar,alt:p.creator.alias,className:"w-8 h-8 rounded-full object-cover ring-2 ring-emerald-500/20 shadow-xs"}),e.jsxs("div",{children:[e.jsx("div",{className:"text-slate-800 font-bold flex items-center gap-1.5",children:e.jsxs("span",{children:["ผู้ลงพื้นที่สำรวจ: ",p.creator.alias,p.creator.name&&p.creator.name!==p.creator.alias?` (${p.creator.name})`:""]})}),e.jsxs("div",{className:"text-[11px] text-slate-400 font-mono",children:["บันทึกเมื่อ: ",new Date(p.creator.timestamp).toLocaleString("th-TH")]})]})]}),e.jsxs("div",{className:"flex items-center gap-2 flex-wrap",children:[e.jsx(sn,{viewedBy:p.viewedBy,size:"md"}),d&&x&&e.jsxs("div",{className:"flex items-center gap-1.5",children:[e.jsx("span",{className:"text-[11px] text-slate-500",children:"สถานะ:"}),e.jsxs("select",{value:x.status,onChange:c=>Ks(c.target.value),className:"bg-white border border-slate-200 text-slate-800 text-xs font-bold rounded-lg px-2.5 py-1 focus:outline-none focus:border-emerald-500",children:[e.jsx("option",{value:"scouted",children:"1. สำรวจแล้ว"}),e.jsx("option",{value:"reviewing",children:"2. เทียบสเปก"}),e.jsx("option",{value:"rfq_sent",children:"3. ส่ง RFQ"}),e.jsx("option",{value:"shortlisted",children:"4. ตัวเต็ง (Shortlist)"}),e.jsx("option",{value:"ordered",children:"5. สั่งซื้อแล้ว (Ordered)"})]})]})]})]}),Ve.length>0&&e.jsxs("div",{className:"p-3 bg-emerald-50/70 border border-emerald-200/80 rounded-xl space-y-2",children:[e.jsxs("div",{className:"text-xs font-bold text-emerald-950 flex items-center justify-between",children:[e.jsxs("span",{className:"flex items-center gap-1.5",children:[e.jsx(Ae,{className:"w-3.5 h-3.5 text-emerald-600"}),e.jsxs("span",{children:["วอยซ์เสียงบันทึกหน้างานจริง (",Ve.length," คลิป)"]})]}),e.jsx("span",{className:"text-[10px] font-mono text-emerald-700",children:"แตะ ▶ เพื่อฟังเสียงบันทึก"})]}),e.jsx("div",{className:"grid grid-cols-1 sm:grid-cols-2 gap-2",children:Ve.map((c,S)=>e.jsxs("div",{className:"p-2.5 bg-white border border-emerald-200 rounded-xl flex flex-col justify-between gap-1.5 shadow-2xs",children:[e.jsxs("div",{className:"flex items-center justify-between gap-2 min-w-0",children:[e.jsxs("div",{className:"text-xs font-bold text-slate-900 truncate flex items-center gap-1.5",children:[e.jsx(Ae,{className:"w-3.5 h-3.5 text-emerald-600 shrink-0"}),e.jsx("span",{className:"truncate",children:c.label||`คลิปเสียง #${S+1}`})]}),e.jsx("span",{className:"text-[10px] text-emerald-700 font-mono shrink-0",children:c.durationSec?`${c.durationSec} วินาที`:"เสียงบันทึก"})]}),c.url&&e.jsx("audio",{controls:!0,preload:"metadata",playsInline:!0,src:c.url,className:"h-8 w-full rounded-lg"})]},c.id||S))})]}),e.jsxs("div",{className:"p-3 bg-slate-50 rounded-xl border border-slate-100 space-y-2 text-xs",children:[e.jsxs("div",{className:"flex flex-wrap items-center gap-1.5",children:[d&&x?e.jsxs(e.Fragment,{children:[e.jsxs("span",{className:"px-2.5 py-1 rounded-lg bg-emerald-600 text-white text-[11px] font-bold inline-flex items-center gap-1",children:[e.jsx("i",{className:"fa-solid fa-industry text-[10px]"}),e.jsx("span",{children:x.category})]}),e.jsx("span",{className:"px-2 py-1 rounded-lg bg-white border border-slate-200 text-slate-700 text-[11px] font-bold",children:x.isFactory?"โรงงานผลิต":"หน้าร้าน / โชว์รูม"}),e.jsxs("span",{className:"px-2 py-1 rounded-lg bg-amber-50 border border-amber-200 text-amber-700 text-[11px] font-mono font-bold inline-flex items-center gap-1",children:[e.jsx("i",{className:"fa-solid fa-star text-[10px] text-amber-500"}),e.jsxs("span",{children:[x.rating||5,"/5"]})]}),(x.quickTags||[]).map((c,S)=>e.jsxs("span",{className:"px-2 py-1 rounded-lg bg-white border border-slate-200 text-slate-700 text-[11px] font-semibold",children:["#",c]},S))]}):g?e.jsxs(e.Fragment,{children:[e.jsxs("span",{className:"px-2.5 py-1 rounded-lg bg-amber-600 text-white text-[11px] font-bold inline-flex items-center gap-1",children:[e.jsx("i",{className:"fa-solid fa-mug-hot text-[10px]"}),e.jsx("span",{children:g.storeCategory||"เรฟร้านน้ำ"})]}),g.ratings&&e.jsxs("span",{className:"px-2 py-1 rounded-lg bg-amber-50 border border-amber-200 text-amber-800 text-[11px] font-mono font-bold inline-flex items-center gap-1",children:[e.jsx("i",{className:"fa-solid fa-star text-[10px] text-amber-500"}),e.jsx("span",{children:((g.ratings.taste+g.ratings.aesthetics+g.ratings.value+g.ratings.speed)/4).toFixed(1)})]})]}):I&&b?e.jsxs(e.Fragment,{children:[e.jsxs("span",{className:"px-2.5 py-1 rounded-lg bg-sky-600 text-white text-[11px] font-bold inline-flex items-center gap-1",children:[e.jsx("i",{className:"fa-solid fa-map-location-dot text-[10px]"}),e.jsx("span",{children:b.locationType==="mall"?"ห้างสรรพสินค้า":b.locationType})]}),e.jsxs("span",{className:"px-2 py-1 rounded-lg bg-white border border-slate-200 text-slate-700 text-[11px] font-bold",children:["ผัง ",((Bt=b.spaceSpecs)==null?void 0:Bt.layoutFormat)||"Inline"]}),b.ratings&&e.jsxs("span",{className:"px-2 py-1 rounded-lg bg-amber-50 border border-amber-200 text-amber-800 text-[11px] font-mono font-bold inline-flex items-center gap-1",children:[e.jsx("i",{className:"fa-solid fa-star text-[10px] text-amber-500"}),e.jsx("span",{children:((b.ratings.footTraffic+b.ratings.visibility+b.ratings.accessibility+b.ratings.valueRoi)/4).toFixed(1)})]}),(b.quickTags||[]).map((c,S)=>e.jsxs("span",{className:"px-2 py-1 rounded-lg bg-white border border-slate-200 text-slate-700 text-[11px] font-semibold",children:["#",c]},S))]}):null,$t.length>0&&e.jsxs("span",{className:"px-2.5 py-1 rounded-lg bg-amber-50 border border-amber-200 text-amber-800 text-[11px] font-bold inline-flex items-center gap-1 shadow-2xs",children:[e.jsx(nn,{className:"w-3 h-3 text-amber-600"}),e.jsxs("span",{children:[$t.length," สินค้า"]})]}),Ct.length>0&&e.jsxs("span",{className:"px-2.5 py-1 rounded-lg bg-amber-50 border border-amber-200 text-amber-800 text-[11px] font-bold inline-flex items-center gap-1 shadow-2xs",children:[e.jsx(ss,{className:"w-3 h-3 text-amber-600"}),e.jsxs("span",{children:[Ct.length," เมนู"]})]}),Nt.length>0&&e.jsxs("span",{className:"px-2.5 py-1 rounded-lg bg-purple-50 border border-purple-200 text-purple-700 text-[11px] font-bold inline-flex items-center gap-1 shadow-2xs",children:[e.jsx("i",{className:"fa-solid fa-video text-[9px] text-purple-600"}),e.jsxs("span",{children:[Nt.length," คลิป"]})]}),kt.length>0&&e.jsxs("span",{className:"px-2.5 py-1 rounded-lg bg-rose-50 border border-rose-200 text-rose-700 text-[11px] font-bold inline-flex items-center gap-1 shadow-2xs",children:[e.jsx(ze,{className:"w-3 h-3 text-rose-600"}),e.jsxs("span",{children:[kt.length," คลิปเสียง"]})]}),_e.length>0&&e.jsxs("a",{href:"#detail-attached-files-section",onClick:c=>{var S;c.preventDefault(),(S=document.getElementById("detail-attached-files-section"))==null||S.scrollIntoView({behavior:"smooth"})},className:"px-2.5 py-1 rounded-lg bg-sky-50 border border-sky-200 text-sky-700 text-[11px] font-bold inline-flex items-center gap-1 hover:bg-sky-100 transition-colors cursor-pointer shadow-2xs",title:"คลิกเพื่อเลื่อนดูไฟล์แนบ",children:[e.jsx(as,{className:"w-3 h-3 text-sky-600"}),e.jsxs("span",{children:[_e.length," ไฟล์แนบ"]})]})]}),e.jsxs("div",{className:"flex flex-wrap items-center justify-between gap-2 pt-1.5 border-t border-slate-200/60 text-[11px] text-slate-600",children:[e.jsxs("div",{className:"flex flex-wrap items-center gap-2",children:[e.jsxs("span",{className:"inline-flex items-center gap-1 font-semibold text-slate-800",children:[e.jsx(rn,{className:"w-3.5 h-3.5 text-sky-600 shrink-0"}),e.jsx("span",{children:d?(x==null?void 0:x.marketOrCity)||(x==null?void 0:x.address)||((Pt=x==null?void 0:x.location)==null?void 0:Pt.addressText):I?((Lt=b==null?void 0:b.location)==null?void 0:Lt.addressText)||(b==null?void 0:b.zoneOrFloor):((Ut=g==null?void 0:g.location)==null?void 0:Ut.addressText)||(g==null?void 0:g.city)})]}),(d?x==null?void 0:x.wechatId:I?(Dt=b==null?void 0:b.leaseTerms)==null?void 0:Dt.contactLineWechat:g==null?void 0:g.wechatId)&&e.jsxs("span",{className:"px-2 py-0.5 rounded bg-white border border-slate-200 font-mono",children:["LINE/WeChat: ",d?x==null?void 0:x.wechatId:I?(Mt=b==null?void 0:b.leaseTerms)==null?void 0:Mt.contactLineWechat:g==null?void 0:g.wechatId]}),(d?x==null?void 0:x.phone:I?(zt=b==null?void 0:b.leaseTerms)==null?void 0:zt.contactPhone:g==null?void 0:g.phone)&&e.jsxs("span",{className:"px-2 py-0.5 rounded bg-white border border-slate-200 font-mono",children:["โทร: ",d?x==null?void 0:x.phone:I?(Ft=b==null?void 0:b.leaseTerms)==null?void 0:Ft.contactPhone:g==null?void 0:g.phone]}),I&&((qt=b==null?void 0:b.leaseTerms)==null?void 0:qt.contactPerson)&&e.jsxs("span",{className:"px-2 py-0.5 rounded bg-white border border-slate-200",children:["ผู้ติดต่อ: ",b.leaseTerms.contactPerson]})]}),(_t=p.location)!=null&&_t.lat&&((Vt=p.location)!=null&&Vt.lng)&&(p.location.lat!==0||p.location.lng!==0)?e.jsx("a",{href:`https://www.google.com/maps?q=${p.location.lat},${p.location.lng}`,target:"_blank",rel:"noreferrer",className:"text-[11px] font-bold text-sky-700 hover:underline shrink-0",children:"เปิด Google Maps ↗"}):e.jsx("span",{className:"text-[10px] text-slate-400 font-medium shrink-0",children:"📍 ยังไม่ได้ระบุพิกัด GPS"})]})]}),I&&b&&e.jsxs("div",{className:"p-3.5 rounded-xl border border-sky-200 bg-sky-50/50 space-y-3",children:[e.jsxs("div",{className:"text-[11px] font-bold text-sky-900 flex items-center justify-between",children:[e.jsxs("span",{className:"flex items-center gap-1.5",children:[e.jsx(an,{className:"w-3.5 h-3.5 text-sky-600"}),e.jsx("span",{children:"สเปกพื้นที่ & เงื่อนไขสัญญาเช่า (Location Scouting Specs)"})]}),e.jsxs("span",{className:"text-[10px] px-2 py-0.5 rounded-full bg-white text-sky-800 font-mono font-bold border border-sky-200",children:[b.zoneOrFloor," ",b.unitNumber?`(${b.unitNumber})`:""]})]}),e.jsxs("div",{className:"grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs",children:[e.jsxs("div",{className:"bg-white p-2 rounded-lg border border-slate-200 text-center",children:[e.jsx("div",{className:"text-[10px] text-slate-500 font-bold",children:"ขนาดพื้นที่"}),e.jsxs("div",{className:"font-extrabold text-sm text-slate-900 font-mono mt-0.5",children:[((Ht=b.spaceSpecs)==null?void 0:Ht.usableAreaSqm)||"-"," ",e.jsx("span",{className:"text-[10px] font-normal text-slate-500",children:"ตร.ม."})]})]}),e.jsxs("div",{className:"bg-white p-2 rounded-lg border border-slate-200 text-center",children:[e.jsx("div",{className:"text-[10px] text-slate-500 font-bold",children:"หน้ากว้าง / เพดาน"}),e.jsxs("div",{className:"font-extrabold text-sm text-slate-900 font-mono mt-0.5",children:[((Ot=b.spaceSpecs)==null?void 0:Ot.frontageWidthM)||"-","ม. / ",((Qt=b.spaceSpecs)==null?void 0:Qt.ceilingHeightM)||"-","ม."]})]}),e.jsxs("div",{className:"bg-white p-2 rounded-lg border border-slate-200 text-center",children:[e.jsx("div",{className:"text-[10px] text-slate-500 font-bold",children:"ค่าเช่ารายเดือน"}),e.jsx("div",{className:"font-extrabold text-sm text-amber-950 font-mono mt-0.5 truncate",children:(Kt=b.leaseTerms)!=null&&Kt.monthlyRentThb?e.jsxs(e.Fragment,{children:["฿",b.leaseTerms.monthlyRentThb.toLocaleString()]}):(Gt=b.leaseTerms)!=null&&Gt.monthlyRentRmb?e.jsxs(e.Fragment,{children:["¥",b.leaseTerms.monthlyRentRmb.toLocaleString()]}):e.jsx("span",{className:"text-slate-400",children:"สอบถาม"})})]}),e.jsxs("div",{className:"bg-white p-2 rounded-lg border border-slate-200 text-center",children:[e.jsx("div",{className:"text-[10px] text-slate-500 font-bold",children:"เงื่อนไขสัญญา"}),e.jsxs("div",{className:"font-extrabold text-xs text-slate-900 font-mono mt-0.5 truncate",children:["สัญญา ",((Jt=b.leaseTerms)==null?void 0:Jt.leasePeriodYears)||3," ปี · ประกัน ",((Yt=b.leaseTerms)==null?void 0:Yt.depositMonths)||3," ด."]})]})]}),e.jsxs("div",{className:"flex flex-wrap items-center gap-1.5 pt-1 text-xs",children:[e.jsxs("span",{className:"px-2 py-0.5 rounded-md bg-white border border-slate-200 text-slate-700 font-semibold flex items-center gap-1",children:[e.jsx(os,{className:"w-3 h-3 text-amber-500"}),e.jsxs("span",{children:["สเปกไฟ: ",((Wt=b.spaceSpecs)==null?void 0:Wt.electricalPower)||"3 เฟส 45 kVA"]})]}),e.jsxs("span",{className:"px-2 py-0.5 rounded-md bg-white border border-slate-200 text-slate-700 font-semibold flex items-center gap-1",children:[e.jsx(on,{className:"w-3 h-3 text-blue-500"}),e.jsxs("span",{children:["ท่อน้ำดี: ",(Zt=b.spaceSpecs)!=null&&Zt.hasWaterInflow?"✓ มีในห้อง":"✗ ไม่มี"]})]}),e.jsxs("span",{className:"px-2 py-0.5 rounded-md bg-white border border-slate-200 text-slate-700 font-semibold flex items-center gap-1",children:[e.jsx(ln,{className:"w-3 h-3 text-teal-500"}),e.jsxs("span",{children:["ท่อน้ำทิ้ง: ",(Xt=b.spaceSpecs)!=null&&Xt.hasDrainage?"✓ มีในห้อง":"✗ ไม่มี"]})]}),e.jsxs("span",{className:"px-2 py-0.5 rounded-md bg-white border border-slate-200 text-slate-700 font-semibold flex items-center gap-1",children:[e.jsx(dn,{className:"w-3 h-3 text-purple-500"}),e.jsxs("span",{children:["ดักไขมัน: ",(es=b.spaceSpecs)!=null&&es.hasGreaseTrap?"✓ มีรองรับ":"✗ ต้องติดตั้งเอง"]})]}),((ts=b.spaceSpecs)==null?void 0:ts.riderAccessNotes)&&e.jsxs("span",{className:"px-2 py-0.5 rounded-md bg-white border border-slate-200 text-slate-700 font-semibold flex items-center gap-1",children:[e.jsx(cn,{className:"w-3 h-3 text-emerald-600"}),e.jsxs("span",{children:["ไรเดอร์: ",b.spaceSpecs.riderAccessNotes]})]})]}),b.handoffNotes&&e.jsxs("div",{className:"pt-2 border-t border-sky-200/80 text-xs",children:[e.jsx("span",{className:"font-bold text-sky-900 block mb-0.5",children:"ประเด็นเจรจา / ส่งมอบงาน:"}),e.jsx("p",{className:"text-slate-800 whitespace-pre-wrap",children:b.handoffNotes})]})]}),(d&&(x==null?void 0:x.memo)||!d&&(g==null?void 0:g.tastingNotes))&&e.jsxs("div",{className:`p-3.5 rounded-xl border space-y-1 ${d?"bg-emerald-50/50 border-emerald-200/80":"bg-amber-50/50 border-amber-200/80"}`,children:[e.jsxs("div",{className:"text-[11px] font-bold text-slate-600 flex items-center gap-1.5",children:[e.jsx("i",{className:`fa-solid ${d?"fa-clipboard-check text-emerald-600":"fa-quote-left text-amber-600"} text-[10px]`}),e.jsx("span",{children:d?"บันทึกหน้างาน / รายละเอียดหลัก:":"บันทึกรีวิวรสชาติ & ไอเดียเรฟ:"})]}),e.jsx("p",{className:"text-xs sm:text-[13px] text-slate-900 leading-relaxed whitespace-pre-wrap font-medium",children:d?x==null?void 0:x.memo:g==null?void 0:g.tastingNotes})]}),d&&x&&(x.catalogItems||[]).length>0&&e.jsxs("div",{className:"space-y-2",children:[e.jsx("div",{className:"flex items-center justify-between",children:e.jsxs("span",{className:"text-xs font-bold text-slate-800",children:["รายการอุปกรณ์ & สินค้า (",(x.catalogItems||[]).length," รายการ):"]})}),e.jsx("div",{className:"grid grid-cols-1 sm:grid-cols-2 gap-3",children:(x.catalogItems||[]).map((c,S)=>e.jsxs("div",{className:"p-3 rounded-xl border border-slate-200 bg-white flex gap-3 shadow-xs",children:[c.photo?e.jsx(je,{src:c.photo,alt:"",onClick:()=>St(c.photo,"catalog"),className:"w-16 h-16 rounded-lg object-cover cursor-pointer border border-slate-100 hover:opacity-90"}):e.jsx("div",{className:"w-16 h-16 rounded-lg bg-slate-100 border border-slate-200 flex items-center justify-center text-slate-400 text-xs",children:"ไม่มีรูป"}),e.jsxs("div",{className:"min-w-0 flex-1 space-y-1",children:[e.jsx("div",{className:"font-bold text-xs text-slate-900 truncate",children:c.name||`รายการที่ ${S+1}`}),c.priceRmb&&e.jsxs("div",{className:"text-xs font-mono font-bold text-emerald-700",children:["¥",c.priceRmb," ",e.jsxs("span",{className:"text-[11px] font-normal text-slate-500",children:["(≈",r(c.priceRmb).toLocaleString(),"฿)"]})]}),c.priceThb&&!c.priceRmb&&e.jsxs("div",{className:"text-xs font-mono font-bold text-emerald-700",children:["฿",c.priceThb.toLocaleString()]}),c.weightKg&&e.jsxs("div",{className:"text-[11px] text-slate-500",children:["น้ำหนัก: ",e.jsx("span",{className:"font-mono",children:c.weightKg})]}),c.memo&&e.jsx("p",{className:"text-[11px] text-slate-600 whitespace-pre-wrap leading-relaxed",children:c.memo}),le(c).length>0&&e.jsx("div",{className:"space-y-1 pt-1",children:le(c).map((z,V)=>e.jsxs("div",{className:"flex flex-col sm:flex-row sm:items-center gap-1 bg-emerald-50/90 p-1.5 rounded-lg border border-emerald-200/80",children:[e.jsxs("span",{className:"text-[10px] font-bold text-emerald-900 truncate min-w-0 flex items-center gap-1",children:[e.jsx(Ae,{className:"w-3 h-3 text-emerald-600 shrink-0"}),e.jsx("span",{className:"truncate",children:z.label||`เสียง #${V+1}`}),z.durationSec?`(${z.durationSec}s)`:""]}),z.url&&e.jsx("audio",{controls:!0,preload:"metadata",playsInline:!0,src:z.url,className:"h-6 w-full sm:w-44 shrink-0"})]},V))})]})]},c.id||S))})]}),!d&&g&&(g.drinkItems||[]).length>0&&e.jsxs("div",{className:"space-y-2",children:[e.jsx("div",{className:"flex items-center justify-between",children:e.jsxs("span",{className:"text-xs font-bold text-slate-800",children:["เมนูที่ชิม & ถอดรหัสสูตร (",(g.drinkItems||[]).length," เมนู):"]})}),e.jsx("div",{className:"grid grid-cols-1 sm:grid-cols-2 gap-3",children:(g.drinkItems||[]).map((c,S)=>e.jsxs("div",{className:"p-3 rounded-xl border border-amber-200/80 bg-amber-50/20 flex gap-3 shadow-xs",children:[c.photo&&e.jsx(je,{src:c.photo,alt:"",onClick:()=>St(c.photo,"drinks"),className:"w-16 h-16 rounded-lg object-cover cursor-pointer border border-amber-200"}),e.jsxs("div",{className:"min-w-0 flex-1 space-y-1",children:[e.jsx("div",{className:"font-bold text-xs text-slate-900 truncate",children:c.name||`แก้วที่ #${S+1}`}),c.priceRmb&&e.jsxs("div",{className:"text-xs font-mono font-bold text-amber-700",children:["¥",c.priceRmb," ",e.jsxs("span",{className:"text-[11px] font-normal text-slate-500",children:["(≈",r(c.priceRmb),"฿)"]})]}),c.fitMenuTarget&&e.jsxs("div",{className:"text-[11px] font-semibold text-emerald-700",children:["ต่อยอด: ",c.fitMenuTarget]}),c.gimmickNotes&&e.jsx("p",{className:"text-[11px] text-slate-600",children:c.gimmickNotes}),le(c).length>0&&e.jsx("div",{className:"space-y-1 pt-1",children:le(c).map((z,V)=>e.jsxs("div",{className:"flex flex-col sm:flex-row sm:items-center gap-1 bg-amber-50/90 p-1.5 rounded-lg border border-amber-200/80",children:[e.jsxs("span",{className:"text-[10px] font-bold text-amber-900 truncate min-w-0 flex items-center gap-1",children:[e.jsx(Ae,{className:"w-3 h-3 text-amber-600 shrink-0"}),e.jsx("span",{className:"truncate",children:z.label||`เสียง #${V+1}`}),z.durationSec?`(${z.durationSec}s)`:""]}),z.url&&e.jsx("audio",{controls:!0,preload:"metadata",playsInline:!0,src:z.url,className:"h-6 w-full sm:w-44 shrink-0"})]},V))})]})]},c.id||S))})]}),Ce.filter(c=>!["catalog","drinks"].includes(c.id)).map(c=>e.jsxs("section",{"aria-label":c.label,className:"space-y-2",children:[e.jsxs("h3",{className:"text-xs font-bold text-slate-800",children:[c.label," (",c.photos.length," รูป)"]}),e.jsx("div",{className:"grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2",children:c.photos.map((S,z)=>e.jsxs("button",{type:"button",onClick:()=>{De(c.id),E(z)},className:"relative h-44 rounded-xl overflow-hidden border border-slate-200 bg-slate-50 p-1",children:[e.jsx(je,{src:S.url,alt:S.label,className:"w-full h-full object-contain"}),e.jsxs("span",{className:"absolute bottom-1 right-1 bg-black/60 text-white text-[10px] px-2 rounded",children:[z+1,"/",c.photos.length]})]},`${S.url}-${z}`))}),!c.photos.length&&e.jsx("p",{className:"text-xs text-slate-400",children:"ยังไม่มีรูปในหมวดนี้"})]},c.id)),p.videos&&p.videos.length>0&&e.jsxs("div",{className:"space-y-2 pt-1",children:[e.jsxs("span",{className:"text-xs font-bold text-slate-800 flex items-center gap-1.5",children:[e.jsx("i",{className:"fa-solid fa-video text-purple-600"}),e.jsxs("span",{children:["คลิปวิดีโอของรายการนี้ (",p.videos.length," คลิป):"]})]}),e.jsx("div",{className:"grid grid-cols-1 sm:grid-cols-2 gap-3",children:p.videos.map((c,S)=>e.jsx(yn,{src:c,className:"rounded-2xl border border-slate-200 shadow-sm h-48 sm:h-56",videoClassName:"object-contain",badgeLabel:`คลิปที่ ${S+1}`},S))})]}),p.attachedFiles&&p.attachedFiles.length>0&&e.jsxs("div",{id:"detail-attached-files-section",className:"space-y-2 pt-1 scroll-mt-6",children:[e.jsxs("div",{className:"flex items-center justify-between",children:[e.jsxs("span",{className:"text-xs font-bold text-slate-800 flex items-center gap-1.5",children:[e.jsx(as,{className:"w-3.5 h-3.5 text-sky-600"}),e.jsxs("span",{children:["เอกสารและไฟล์แนบ (",p.attachedFiles.length," รายการ):"]})]}),e.jsx("span",{className:"text-[10px] text-slate-400",children:"แตะเพื่อเปิดดูบน Google Drive / เบราว์เซอร์"})]}),e.jsx("div",{className:"grid grid-cols-1 sm:grid-cols-2 gap-2",children:p.attachedFiles.map(c=>{const S=jn(c.name,c.mimeType),z=S.icon;return e.jsxs("a",{href:c.url,target:"_blank",rel:"noopener noreferrer",onClick:V=>{c.url.startsWith("data:")&&(V.preventDefault(),kn(c.url,c.name))},className:"bg-white rounded-xl border border-slate-200/90 hover:border-sky-300 hover:shadow-xs p-3 flex items-center justify-between gap-3 transition-all group cursor-pointer",children:[e.jsxs("div",{className:"flex items-center gap-2.5 min-w-0 flex-1",children:[e.jsxs("div",{className:`w-9 h-9 rounded-xl border flex flex-col items-center justify-center shrink-0 shadow-2xs ${S.colorClasses}`,children:[e.jsx(z,{className:"w-4 h-4"}),e.jsx("span",{className:"text-[8px] font-extrabold uppercase leading-none mt-0.5",children:S.label})]}),e.jsxs("div",{className:"min-w-0 flex-1",children:[e.jsx("p",{className:"font-bold text-xs text-slate-800 truncate group-hover:text-sky-700 transition-colors",children:c.name}),e.jsxs("div",{className:"flex items-center gap-1.5 text-[10px] text-slate-500 mt-0.5",children:[e.jsx("span",{className:"font-medium",children:Nn(c.size)}),c.uploadedAt&&e.jsxs(e.Fragment,{children:[e.jsx("span",{children:"•"}),e.jsx("span",{children:new Date(c.uploadedAt).toLocaleDateString("th-TH")})]})]})]})]}),e.jsxs("span",{className:"px-2.5 py-1 rounded-lg bg-sky-50 text-sky-700 group-hover:bg-sky-600 group-hover:text-white text-[11px] font-bold transition-all flex items-center gap-1 shrink-0",children:[e.jsx("span",{children:"เปิดไฟล์"}),e.jsx(un,{className:"w-3 h-3"})]})]},c.id)})})]}),e.jsxs("div",{id:"detail-comments-section",className:"p-4 bg-slate-50 rounded-xl border border-slate-200/80 space-y-3",children:[e.jsxs("div",{className:"flex items-center justify-between",children:[e.jsxs("span",{className:"text-xs font-bold text-slate-800 flex items-center gap-1.5",children:[e.jsx(hn,{className:"w-3.5 h-3.5 text-blue-600"}),e.jsx("span",{children:"ช่องความเห็นทีมงาน & ตอบกลับต่อเนื่อง (Threaded Comments)"})]}),e.jsxs("span",{className:"text-[11px] text-slate-400 font-mono",children:[p.reviewerNotes.length," หัวข้อสนทนา"]})]}),e.jsx("div",{className:"space-y-2.5",children:p.reviewerNotes.length===0?e.jsx("p",{className:"text-xs text-slate-400 py-3 text-center",children:"ยังไม่มีความเห็น สามารถพิมพ์บันทึกหรือตรวจสอบสเปกได้ด้านล่าง"}):p.reviewerNotes.map(c=>{var V,O,se,ye,ne;const S=c.replies||[],z=Ie[c.id];return e.jsxs("div",{className:"p-3 bg-white rounded-xl border border-slate-200/70 shadow-xs space-y-2",children:[e.jsxs("div",{className:"flex items-start gap-2.5",children:[e.jsx(Je,{src:c.authorAvatar,className:"w-7 h-7 rounded-full object-cover shrink-0 mt-0.5 ring-1 ring-slate-200"}),e.jsxs("div",{className:"min-w-0 flex-1",children:[e.jsxs("div",{className:"flex items-center justify-between text-[11px] mb-0.5",children:[e.jsx("span",{className:"font-bold text-slate-900",children:c.author}),e.jsx("span",{className:"text-slate-400 font-mono text-[10px]",children:new Date(c.timestamp).toLocaleTimeString("th-TH",{hour:"2-digit",minute:"2-digit"})})]}),e.jsx("p",{className:"text-xs text-slate-700 leading-relaxed",children:c.text}),c.photoUrl&&e.jsx("div",{className:"mt-1.5",children:e.jsx(je,{src:c.photoUrl,alt:"ภาพแนบ",className:"max-h-48 max-w-xs rounded-xl border border-slate-200 object-cover cursor-pointer hover:opacity-95 shadow-2xs",onClick:()=>window.open(c.photoUrl,"_blank")})}),(c.voiceUrl||c.audioUrl)&&e.jsxs("div",{className:"mt-1.5 flex items-center gap-2 bg-slate-50 p-2 rounded-xl border border-slate-200/80 max-w-sm",children:[e.jsx(Ae,{className:"w-4 h-4 text-emerald-600 shrink-0"}),e.jsx("audio",{controls:!0,src:c.voiceUrl||c.audioUrl,className:"h-7 w-full"})]}),e.jsxs("div",{className:"flex items-center gap-3 mt-1.5 text-[11px] font-bold",children:[F&&e.jsxs("button",{type:"button",onClick:()=>re((G==null?void 0:G.noteId)===c.id&&G.author===c.author?null:{noteId:c.id,author:c.author}),className:"text-blue-600 hover:text-blue-800 flex items-center gap-1",children:[e.jsx(is,{className:"w-3 h-3"}),e.jsx("span",{children:"ตอบกลับ"})]}),S.length>0&&e.jsx("button",{type:"button",onClick:()=>ve(q=>({...q,[c.id]:!q[c.id]})),className:"text-slate-500 hover:text-slate-800 flex items-center gap-1",children:z?e.jsxs(e.Fragment,{children:[e.jsx(pn,{className:"w-3 h-3"}),e.jsxs("span",{children:["ดูการตอบกลับ (",S.length,")"]})]}):e.jsxs(e.Fragment,{children:[e.jsx(fn,{className:"w-3 h-3"}),e.jsxs("span",{children:["ย่อการตอบกลับ (",S.length,")"]})]})})]})]})]}),S.length>0&&!z&&e.jsx("div",{className:"ml-6 pl-3 border-l-2 border-blue-200 space-y-2 pt-1",children:S.map(q=>e.jsxs("div",{className:"p-2.5 bg-slate-50 rounded-xl border border-slate-200/60 text-xs space-y-1",children:[e.jsxs("div",{className:"flex items-center justify-between text-[10px]",children:[e.jsxs("div",{className:"flex items-center gap-1.5 font-bold text-slate-800",children:[e.jsx(Je,{src:q.authorAvatar,className:"w-4 h-4 rounded-full object-cover"}),e.jsx("span",{children:q.author}),q.replyToAuthor&&e.jsxs("span",{className:"text-blue-600 font-normal",children:["▸ ตอบกลับ @",q.replyToAuthor]})]}),e.jsx("span",{className:"text-slate-400 font-mono",children:new Date(q.timestamp).toLocaleTimeString("th-TH",{hour:"2-digit",minute:"2-digit"})})]}),e.jsx("p",{className:"text-slate-700 leading-snug",children:q.text}),q.photoUrl&&e.jsx("div",{className:"mt-1",children:e.jsx(je,{src:q.photoUrl,alt:"ภาพแนบ",className:"max-h-36 max-w-[200px] rounded-lg border border-slate-200 object-cover cursor-pointer hover:opacity-95 shadow-2xs",onClick:()=>window.open(q.photoUrl,"_blank")})}),(q.voiceUrl||q.audioUrl)&&e.jsxs("div",{className:"mt-1 flex items-center gap-1.5 bg-white p-1.5 rounded-lg border border-slate-200 max-w-[240px]",children:[e.jsx(Ae,{className:"w-3.5 h-3.5 text-blue-600 shrink-0"}),e.jsx("audio",{controls:!0,src:q.voiceUrl||q.audioUrl,className:"h-6 w-full"})]}),e.jsx("div",{children:F&&e.jsxs("button",{type:"button",onClick:()=>re({noteId:c.id,author:q.author}),className:"text-[10px] font-bold text-blue-600 hover:underline inline-flex items-center gap-0.5",children:[e.jsx(is,{className:"w-2.5 h-2.5"}),e.jsxs("span",{children:["ตอบกลับ @",q.author," ต่อ"]})]})})]},q.id))}),F&&(G==null?void 0:G.noteId)===c.id&&e.jsxs("div",{className:"mt-2 pt-2 border-t border-slate-100 space-y-1.5 animate-in fade-in",children:[(((V=W[c.id])==null?void 0:V.photoUrl)||((O=W[c.id])==null?void 0:O.voiceUrl))&&e.jsxs("div",{className:"flex flex-wrap items-center gap-1.5 text-[10px]",children:[((se=W[c.id])==null?void 0:se.photoUrl)&&e.jsxs("span",{className:"inline-flex items-center gap-1 px-1.5 py-0.5 rounded bg-emerald-50 text-emerald-800 border border-emerald-200",children:[e.jsx(Qe,{className:"w-3 h-3"})," ภาพพร้อมแนบ",e.jsx("button",{type:"button",onClick:()=>X(q=>({...q,[c.id]:{...q[c.id],photoUrl:void 0}})),children:e.jsx(Ee,{className:"w-2.5 h-2.5"})})]}),((ye=W[c.id])==null?void 0:ye.voiceUrl)&&e.jsxs("span",{className:"inline-flex items-center gap-1.5 px-2 py-0.5 rounded bg-blue-50 text-blue-800 border border-blue-200",children:[e.jsx(ze,{className:"w-3 h-3"})," เสียงอัดสดพร้อมส่ง",e.jsx("audio",{controls:!0,src:(ne=W[c.id])==null?void 0:ne.voiceUrl,className:"h-6 w-32"}),e.jsx("button",{type:"button",onClick:()=>X(q=>({...q,[c.id]:{...q[c.id],voiceUrl:void 0}})),children:e.jsx(Ee,{className:"w-2.5 h-2.5"})})]})]}),e.jsxs("div",{className:"flex gap-1.5 items-center flex-wrap sm:flex-nowrap",children:[e.jsx("input",{type:"text",placeholder:`ตอบกลับ @${G.author} ในฐานะ ${s.alias}...`,value:ce[c.id]||"",onChange:q=>he({...ce,[c.id]:q.target.value}),className:"flex-1 min-w-[140px] bg-slate-50 border border-blue-300 rounded-lg px-2.5 py-1.5 text-xs text-slate-900 focus:outline-none focus:border-blue-500",autoFocus:!0,onKeyDown:q=>{q.key==="Enter"&&(q.preventDefault(),Tt(c.id,G.author))}}),e.jsx("button",{type:"button",title:"แนบรูปภาพในคำตอบกลับ",onClick:()=>{const q=document.createElement("input");q.type="file",q.accept="image/*",q.onchange=Ze=>{var Me,Oe;const He=(Oe=(Me=Ze.target)==null?void 0:Me.files)==null?void 0:Oe[0];He&&We(He,"photo",c.id)},q.click()},className:"p-1.5 rounded-lg border border-slate-200 hover:bg-slate-100 text-slate-500",children:e.jsx(Qe,{className:"w-3.5 h-3.5"})}),e.jsxs("button",{type:"button",title:ee===c.id?"กดเพื่อหยุดอัดเสียงสด":"กดเพื่ออัดเสียงสดในคำตอบกลับ",disabled:ae,onClick:()=>void At(c.id),className:`px-2 py-1.5 rounded-lg border text-[11px] font-bold inline-flex items-center gap-1 transition-all ${ee===c.id?"bg-rose-600 text-white border-rose-600 animate-pulse":"bg-white border-slate-200 hover:border-blue-500 hover:bg-blue-50 text-slate-600 hover:text-blue-700"}`,children:[e.jsx(ze,{className:"w-3.5 h-3.5"}),e.jsx("span",{children:ee===c.id?`หยุดอัด (${Be}s)`:"อัดเสียงสด"})]}),e.jsx("button",{type:"button",onClick:()=>Tt(c.id,G.author),className:"px-3 py-1.5 rounded-lg bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold",children:"ส่ง"}),F&&e.jsx("button",{type:"button",onClick:()=>re(null),className:"px-2 py-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-600 text-xs",children:"ยกเลิก"})]})]})]},c.id)})}),e.jsxs("div",{className:"pt-2 border-t border-slate-200/60 space-y-1.5",children:[e.jsx("div",{className:"flex items-center justify-between text-[11px] text-slate-500",children:e.jsxs("span",{className:"font-semibold flex items-center gap-1",children:[e.jsx(os,{className:"w-3 h-3 text-amber-500"})," ข้อความด่วน (แตะเพื่อพิมพ์ทันที):"]})}),e.jsx("div",{className:"flex items-center gap-1.5 overflow-x-auto no-scrollbar py-0.5",children:U.map(c=>e.jsxs("button",{type:"button",onClick:()=>D(c.text),className:"px-2.5 py-1 rounded-lg bg-white border border-slate-200 hover:border-blue-400 text-[11px] text-slate-700 whitespace-nowrap active:scale-95 transition-all shadow-xs",title:c.text,children:[e.jsx("i",{className:"fa-solid fa-bolt text-amber-500 mr-1 text-[10px]"}),e.jsx("span",{children:c.title})]},c.id))})]}),s.role==="viewer"?null:e.jsxs("form",{onSubmit:Qs,className:"space-y-2 pt-1",children:[(Z||oe||ae)&&e.jsxs("div",{className:"flex flex-wrap items-center gap-2 px-1",children:[Z&&e.jsxs("div",{className:"flex items-center gap-1.5 px-2 py-1 bg-emerald-50 border border-emerald-200 rounded-lg text-xs text-emerald-800",children:[e.jsx(Qe,{className:"w-3.5 h-3.5 text-emerald-600"}),e.jsx("span",{className:"truncate max-w-[120px]",children:"รูปภาพพร้อมแนบ"}),e.jsx("button",{type:"button",onClick:()=>pe(null),className:"text-slate-400 hover:text-rose-600",children:e.jsx(Ee,{className:"w-3 h-3"})})]}),oe&&e.jsxs("div",{className:"flex items-center gap-1.5 px-2 py-1 bg-blue-50 border border-blue-200 rounded-lg text-xs text-blue-800",children:[e.jsx(ze,{className:"w-3.5 h-3.5 text-blue-600"}),e.jsx("span",{children:"เสียงอัดสด:"}),e.jsx("audio",{controls:!0,src:oe,className:"h-6 w-36"}),e.jsx("button",{type:"button",onClick:()=>we(null),className:"text-slate-400 hover:text-rose-600",children:e.jsx(Ee,{className:"w-3 h-3"})})]}),ae&&e.jsxs("div",{className:"flex items-center gap-1.5 text-xs text-blue-600 font-medium",children:[e.jsx(mn,{className:"w-3.5 h-3.5 animate-spin"}),e.jsx("span",{children:"กำลังอัปโหลดไฟล์สื่อ..."})]})]}),e.jsxs("div",{className:"flex gap-1.5 items-center flex-wrap sm:flex-nowrap",children:[e.jsx("input",{ref:ie,type:"file",accept:"image/*",className:"hidden",onChange:c=>{var z;const S=(z=c.target.files)==null?void 0:z[0];S&&We(S,"photo"),c.target.value=""}}),e.jsx("input",{type:"text",placeholder:`พิมพ์ข้อคิดเห็นใหม่ในฐานะ ${s.alias}...`,value:P,onChange:c=>D(c.target.value),className:"flex-1 min-w-[140px] h-8 bg-white border border-slate-200 rounded-lg px-2.5 text-xs text-slate-900 focus:outline-none focus:border-blue-500 shadow-2xs"}),e.jsxs("button",{type:"button",title:"แนบรูปภาพ",disabled:ae,onClick:()=>{var c;return(c=ie.current)==null?void 0:c.click()},className:"h-8 px-2.5 rounded-lg border border-slate-200 bg-white hover:border-emerald-500 hover:bg-emerald-50 text-slate-600 hover:text-emerald-700 text-[11px] font-bold inline-flex items-center justify-center gap-1 transition-colors shrink-0",children:[e.jsx(Qe,{className:"w-3.5 h-3.5"}),e.jsx("span",{className:"hidden sm:inline",children:"รูปภาพ"})]}),e.jsxs("button",{type:"button",title:ee==="main"?"กดเพื่อหยุดอัดเสียงสด":"กดเพื่ออัดเสียงสดในคอมเมนต์",disabled:ae,onClick:()=>void At("main"),className:`h-8 px-2.5 rounded-lg border text-[11px] font-bold inline-flex items-center justify-center gap-1 transition-all shrink-0 ${ee==="main"?"bg-rose-600 text-white border-rose-600 animate-pulse shadow-xs":"bg-white border-slate-200 hover:border-blue-500 hover:bg-blue-50 text-slate-700 hover:text-blue-700"}`,children:[e.jsx(ze,{className:"w-3.5 h-3.5"}),e.jsx("span",{children:ee==="main"?`หยุดอัด (${Be}s)`:"อัดเสียงสด"})]}),e.jsxs("button",{type:"submit",disabled:ae||ee==="main",className:"h-8 px-3 rounded-lg bg-blue-600 hover:bg-blue-700 text-white text-[11px] font-bold shadow-2xs active:scale-95 transition-all inline-flex items-center justify-center gap-1 shrink-0 disabled:opacity-50",children:[e.jsx(xn,{className:"w-3 h-3"}),e.jsx("span",{children:"โพสต์"})]})]})]})]}),e.jsx(Tn,{item:p,users:N},p.id)]}),e.jsxs("div",{className:"p-3 sm:p-3.5 border-t border-slate-100 bg-white flex items-center justify-between gap-2 select-none",children:[e.jsxs("div",{className:"text-[11px] text-slate-400 font-mono truncate hidden sm:block",children:["ID: ",p.id," · ปรับปรุง:"," ",new Date(p.updatedAt).toLocaleTimeString("th-TH")]}),e.jsxs("div",{className:"flex items-center justify-end gap-1.5 sm:gap-2 w-full sm:w-auto",children:[h&&e.jsxs("button",{type:"button",onClick:Et,className:"px-2.5 sm:px-3 py-1.5 text-xs font-bold rounded-xl bg-rose-50 hover:bg-rose-100 text-rose-700 border border-rose-200 flex items-center justify-center gap-1.5 transition-colors whitespace-nowrap active:scale-95 shrink-0",title:"ลบรายการ",children:[e.jsx(rs,{className:"w-3.5 h-3.5 text-rose-600 shrink-0"}),e.jsx("span",{children:"ลบรายการ"})]}),_&&e.jsxs("button",{type:"button",onClick:()=>y(p),className:"px-2.5 sm:px-3.5 py-1.5 text-xs font-bold rounded-xl bg-amber-50 hover:bg-amber-100 text-amber-800 border border-amber-300 flex items-center justify-center gap-1.5 transition-colors whitespace-nowrap active:scale-95 shrink-0",children:[e.jsx(ns,{className:"w-3.5 h-3.5 text-amber-600 shrink-0"}),e.jsx("span",{children:"แก้ไขข้อมูล"})]}),e.jsx("button",{onClick:l,className:"px-3.5 sm:px-4 py-1.5 text-xs font-bold rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 transition-colors whitespace-nowrap active:scale-95 shrink-0",children:"ปิด"})]})]})]}),k!==null&&J[k]&&e.jsxs("div",{className:"fixed inset-0 z-[140] bg-black/92 backdrop-blur-md flex flex-col items-center justify-between p-3 sm:p-6 select-none",onClick:()=>E(null),children:[e.jsxs("div",{className:"w-full max-w-4xl flex items-center justify-between text-white z-10",onClick:c=>c.stopPropagation(),children:[e.jsxs("div",{className:"flex items-center gap-2",children:[e.jsxs("span",{className:"px-2.5 py-1 rounded-full bg-white/15 font-mono text-xs font-bold",children:["รูปที่ ",k+1," / ",J.length]}),e.jsx("span",{className:"text-xs sm:text-sm font-semibold text-white/90 truncate max-w-[240px] sm:max-w-md",children:J[k].label})]}),e.jsx("button",{type:"button",onClick:()=>E(null),className:"w-9 h-9 rounded-full bg-white/15 hover:bg-white/25 text-white flex items-center justify-center transition-colors",children:e.jsx(Ee,{className:"w-5 h-5"})})]}),e.jsxs("div",{className:"relative flex-1 w-full max-w-5xl flex items-center justify-center my-2",onClick:c=>c.stopPropagation(),children:[J.length>1&&e.jsx("button",{type:"button",onClick:()=>E((k-1+J.length)%J.length),className:"absolute left-1 sm:left-3 z-20 w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-black/60 hover:bg-black/80 border border-white/25 text-white flex items-center justify-center shadow-lg active:scale-95 transition-all",title:"รูปก่อนหน้า (◀)",children:e.jsx(gn,{className:"w-6 h-6"})}),e.jsx(je,{src:J[k].url,alt:J[k].label,className:"max-w-full max-h-[72vh] object-contain rounded-xl shadow-2xl"}),J.length>1&&e.jsx("button",{type:"button",onClick:()=>E((k+1)%J.length),className:"absolute right-1 sm:right-3 z-20 w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-black/60 hover:bg-black/80 border border-white/25 text-white flex items-center justify-center shadow-lg active:scale-95 transition-all",title:"รูปถัดไป (▶)",children:e.jsx(bn,{className:"w-6 h-6"})})]}),J.length>1&&e.jsx("div",{className:"w-full max-w-3xl flex items-center justify-center gap-2 overflow-x-auto py-1 z-10",onClick:c=>c.stopPropagation(),children:J.map((c,S)=>e.jsx("button",{type:"button",onClick:()=>E(S),className:`relative w-12 h-12 sm:w-14 sm:h-14 rounded-lg overflow-hidden shrink-0 border-2 transition-all ${S===k?"border-emerald-400 scale-105 shadow-md":"border-white/20 opacity-60 hover:opacity-100"}`,children:e.jsx(je,{src:c.url,className:"w-full h-full object-cover"})},S))})]})]})};export{ar as DetailModal};
