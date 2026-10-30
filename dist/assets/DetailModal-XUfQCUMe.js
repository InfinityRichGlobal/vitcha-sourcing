import{c as Xs,r as K,j as e,G as Ke,a1 as en,ae as tn,a5 as de,a4 as sn,u as nn,af as Ee,a6 as rn,w as is,X as Se,P as ls,T as ds,_ as an,V as on,l as ln,Y as Ae,H as dn,a0 as ze,ag as cs,i as cn,O as un,Z as us,a7 as hn,R as pn,h as fn,ah as mn,K as xn,k as gn,ai as hs,a8 as bn,aj as vn,W as Oe,p as wn,f as yn,Q as jn,d as Nn,a2 as kn}from"./index-CGPCd5iu.js";import{F as $n,V as Cn}from"./VideoPlayer-C14hqTxy.js";import{g as En,f as Sn,o as An}from"./AttachedFilesSection-CmywYIUq.js";import{P as Tn}from"./printer-tk0REh3w.js";/**
 * @license lucide-react v1.62.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Os={name:"file-down",size:24,node:[["path",{d:"M6 22a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h8a2.4 2.4 0 0 1 1.704.706l3.588 3.588A2.4 2.4 0 0 1 20 8v12a2 2 0 0 1-2 2z",key:"1oefj6"}],["path",{d:"M14 2v5a1 1 0 0 0 1 1h5",key:"wfsgrz"}],["path",{d:"M12 18v-6",key:"17g6i2"}],["path",{d:"m9 15 3 3 3-3",key:"1npd3o"}]]};Os.node;const Rn=Xs(Os),Re=[["awaiting","รอรับช่วงต่อ"],["rfq_sent","ขอสเปก / ส่ง RFQ"],["sample_test","ทดสอบตัวอย่าง Lab/R&D"],["negotiate","ต่อรองราคา & MOQ"],["approved","ตัวเต็งอนุมัติ"],["ordered","สั่งซื้อสำเร็จ"]],ce=t=>{const i=Re.findIndex(([c])=>c===t);return i<0?"ยังไม่ระบุ":`พาร์ท ${i+1}: ${Re[i][1]}`},Ge={handoffStage:"พาร์ท",status:"สถานะรายการ",assignedTo:"ผู้รับผิดชอบ",targetFollowUpDate:"กำหนดติดตาม",handoffNotes:"หมายเหตุส่งต่อ",name:"ชื่อ",storeName:"ชื่อร้าน",chineseName:"ชื่อภาษาจีน",foreignName:"ชื่อต่างประเทศ",marketOrCity:"ตลาด / เมือง",city:"เมือง",category:"หมวดหมู่",storeCategory:"หมวดร้าน",rating:"คะแนน",ratings:"คะแนนประเมิน",quickTags:"ป้ายกำกับ",isFactory:"โรงงาน",phone:"โทรศัพท์",wechatId:"WeChat",lineId:"LINE",address:"ที่อยู่",location:"พิกัด",lat:"ละติจูด",lng:"ลองจิจูด",addressText:"ที่อยู่",photos:"รูปภาพ",storefrontAndAtmosphere:"หน้าร้าน / บรรยากาศ",contactCards:"นามบัตร",menuBoard:"ป้ายเมนู",drinkCups:"เครื่องดื่ม",floorPlanAndSpecs:"ผังพื้นที่",surroundingNeighbors:"บริเวณโดยรอบ",videos:"วิดีโอ",attachedFiles:"ไฟล์แนบ",voiceNotes:"เสียงบันทึก",voiceNoteUrl:"เสียงบันทึก",voiceDurationSec:"ความยาวเสียง (วินาที)",durationSec:"ความยาวเสียง (วินาที)",label:"ชื่อบันทึก",url:"ไฟล์",catalogItems:"สินค้า",drinkItems:"เมนูที่ทดลอง",photo:"รูปภาพ",priceRmb:"ราคา (หยวน)",priceThb:"ราคา (บาท)",dimensions:"ขนาด",weightKg:"น้ำหนัก",memo:"รายละเอียด",tastingNotes:"บันทึกการชิม",brandConcept:"แนวคิดแบรนด์",country:"ประเทศ",locationType:"ประเภททำเล",zoneOrFloor:"โซน / ชั้น",unitNumber:"เลขที่พื้นที่",spaceSpecs:"ข้อมูลพื้นที่",leaseTerms:"เงื่อนไขเช่า",size:"ขนาดไฟล์ (ไบต์)",uploadedAt:"วันที่แนบ",createdAt:"วันที่บันทึก",mimeType:"ประเภทไฟล์",isMockup:"ข้อมูลตัวอย่าง",taste:"รสชาติ",aesthetics:"ความสวยงาม",value:"ความคุ้มค่า",speed:"ความเร็ว",footTraffic:"คนสัญจร",visibility:"การมองเห็น",accessibility:"การเข้าถึง",valueRoi:"ความคุ้มค่าการลงทุน"};function Qs(t){var c;const i=(c=t.history)!=null&&c.length?[...t.history]:[{action:"ข้อมูลเริ่มต้นจากผู้บันทึกรายการ",user:t.creator.alias,userAvatar:t.creator.avatar,timestamp:t.creator.timestamp}];for(const n of t.reviewerNotes||[])for(const[s,r]of[["comment",n],...(n.replies||[]).map(o=>["reply",o])]){const o=r;i.some(h=>{var l;return h.id===o.id||((l=h.content)==null?void 0:l.id)===o.id})||i.push({id:`legacy-content-${o.id}`,kind:s,action:"ความคิดเห็นที่ยังเก็บในรายการ",user:o.author,userId:o.authorId,userAvatar:o.authorAvatar,timestamp:o.timestamp,content:o})}return i}const ps=t=>Number.isNaN(Date.parse(t))?t:new Date(t).toLocaleString("th-TH",{dateStyle:"medium",timeStyle:"short"}),fs=/photos|photo|storefrontAndAtmosphere|contactCards|menuBoard|drinkCups|floorPlanAndSpecs|surroundingNeighbors/,In=t=>/^(https?:\/\/|\.\/|\/(?!\/)|data:(image|audio|video)\/)/i.test(t);function Bn({media:t,close:i}){const c=K.useRef(null);return K.useEffect(()=>{var n;(n=c.current)==null||n.showModal()},[]),en.createPortal(e.jsxs("dialog",{ref:c,onCancel:i,onClose:i,onClick:n=>{n.target===n.currentTarget&&i()},className:"fixed inset-0 m-auto max-w-[94vw] w-[900px] max-h-[90dvh] rounded-2xl p-4 backdrop:bg-black/70","aria-label":"สื่อจากประวัติ",children:[e.jsx("div",{className:"flex justify-end mb-3",children:e.jsx("button",{type:"button",autoFocus:!0,onClick:i,className:"rounded-lg px-4 py-2 bg-slate-100 font-bold",children:"ปิดสื่อ"})}),t.kind==="image"?e.jsx("img",{src:t.url,alt:"ภาพจากประวัติ",className:"max-h-[72dvh] max-w-full mx-auto object-contain"}):t.kind==="audio"?e.jsx("audio",{controls:!0,src:t.url,className:"w-full"}):e.jsx("video",{controls:!0,src:t.url,className:"max-h-[72dvh] w-full"})]}),document.body)}function ke({value:t,field:i,users:c,preview:n}){var r;if(t==null||t===""||Array.isArray(t)&&!t.length)return e.jsx("span",{className:"text-slate-400",children:"ยังไม่ระบุ / ไม่มีข้อมูล"});if(Array.isArray(t))return e.jsx("div",{className:"space-y-2",children:t.map((o,h)=>e.jsx("div",{children:e.jsx(ke,{value:o,field:i,users:c,preview:n})},h))});if(typeof t=="object")return e.jsx("dl",{className:"space-y-1",children:Object.entries(t).filter(([o])=>!["id","driveFileId"].includes(o)).map(([o,h])=>e.jsxs("div",{children:[e.jsx("dt",{className:"text-slate-500 text-[11px]",children:Ge[o]||o}),e.jsx("dd",{children:e.jsx(ke,{value:h,field:`${i}.${o}`,users:c,preview:n})})]},o))});if(typeof t=="boolean")return t?"ใช่":"ไม่ใช่";const s=String(t);if(i==="handoffStage")return ce(s);if(i==="assignedTo")return((r=c.find(o=>o.id===s||o.alias===s||o.name===s))==null?void 0:r.alias)||s;if(i==="status")return{scouted:"สำรวจแล้ว",reviewing:"เทียบสเปก",rfq_sent:"ส่ง RFQ",shortlisted:"ตัวเต็ง",ordered:"สั่งซื้อแล้ว"}[s]||s;if(In(s)&&(/url$/i.test(i)||fs.test(i)||/videos|voice|audio/i.test(i))){const o=/voice|audio/i.test(i)?"audio":/video/i.test(i)?"video":fs.test(i)||/\.(png|jpe?g|webp|gif)(\?|$)/i.test(s)?"image":null;return o?e.jsx("button",{type:"button",onClick:()=>n({url:s,kind:o}),className:"text-emerald-700 underline text-left",children:o==="image"?e.jsx("img",{loading:"lazy",src:s,alt:"เปิดภาพจากประวัติ",className:"max-w-full w-32 max-h-28 rounded-lg object-cover"}):o==="audio"?"เปิดฟังเสียง":"เปิดดูวิดีโอ"}):e.jsx("a",{href:s,target:"_blank",rel:"noopener noreferrer",className:"text-blue-700 underline break-all",children:"เปิดไฟล์แนบ"})}return e.jsx("span",{className:"whitespace-pre-wrap break-words [overflow-wrap:anywhere]",children:s})}function Pn({item:t,users:i}){const[c,n]=K.useState("all"),[s,r]=K.useState("all"),[o,h]=K.useState(!1),[l,b]=K.useState(20),[N,A]=K.useState(null);K.useEffect(()=>{n("all"),r("all"),b(20),A(null)},[t.id]),K.useEffect(()=>{b(20)},[c,s,o]);const T=Qs(t),y=t.handoffStage||"awaiting",P=f=>T.filter(w=>w.version===2&&(w.stageAfter===f||w.stageBefore===f)),D=f=>{var w,S,k,U;return!!((w=f.content)!=null&&w.photoUrl||(S=f.content)!=null&&S.voiceUrl||(k=f.content)!=null&&k.audioUrl||(U=f.changes)!=null&&U.some(v=>/photos|videos|voice|attachedFiles|catalogItems|drinkItems/.test(v.field)))},q=T.filter(f=>(c==="all"||f.version===2&&(f.stageAfter===c||f.stageBefore===c))&&(s==="all"||s==="files"&&D(f)||s==="comments"&&["comment","reply"].includes(f.kind||"")||s==="data"&&["create","update","delete","restore"].includes(f.kind||"")||s==="handoff"&&f.kind==="handoff")).map((f,w)=>({e:f,index:w})).sort((f,w)=>(o?1:-1)*(Date.parse(f.e.timestamp)-Date.parse(w.e.timestamp)||f.index-w.index));return e.jsxs("section",{"data-testid":"activity-timeline",className:"p-3.5 bg-slate-50 rounded-xl border border-slate-200 space-y-4 text-xs min-w-0",children:[e.jsx("h3",{className:"font-bold text-sm text-slate-900",children:"ประวัติการดำเนินงาน & ส่งต่องาน (Activity Log)"}),e.jsx("p",{className:"text-slate-600",children:"ประวัติทั้งหมดของรายการนี้ รวมทุกพาร์ทที่เคยบันทึก · กดพาร์ทเพื่อกรองดูเฉพาะส่วนได้"}),e.jsxs("div",{className:"bg-white p-3 rounded-xl border border-emerald-200 space-y-2",children:[e.jsxs("p",{className:"font-bold text-emerald-800",children:["ปัจจุบัน: ",ce(y)]}),e.jsxs("p",{children:["ผู้รับช่วงต่อ: ",e.jsx(ke,{field:"assignedTo",value:t.assignedTo,users:i,preview:A})]}),e.jsxs("p",{children:["กำหนดติดตาม: ",t.targetFollowUpDate||"ยังไม่ระบุ"]}),e.jsxs("p",{className:"whitespace-pre-wrap break-words [overflow-wrap:anywhere]",children:["หมายเหตุล่าสุด: ",t.handoffNotes||"ยังไม่ระบุ"]})]}),e.jsx("div",{className:"grid grid-cols-2 sm:grid-cols-3 gap-2","aria-label":"เส้นทางทั้ง 6 พาร์ท",children:Re.map(([f,w],S)=>{const k=P(f),U=k.filter(v=>v.stageAfter===f&&v.stageBefore!==f);return e.jsxs("button",{type:"button","aria-pressed":c===f,onClick:()=>{n(c===f?"all":f),r("all")},className:`text-left p-3 rounded-xl border space-y-1 ${c===f?"ring-2 ring-emerald-600":""} ${y===f?"bg-emerald-50 border-emerald-400":"bg-white border-slate-200"}`,children:[e.jsxs("span",{className:"block font-bold",children:["พาร์ท ",S+1,": ",w]}),e.jsx("span",{className:"block text-[11px] text-slate-600",children:y===f?"อยู่ขั้นตอนนี้":k.length?"เคยอยู่ขั้นตอนนี้":"ยังไม่มีบันทึก"}),!!U.length&&e.jsxs("span",{className:"block text-[10px] text-slate-500",children:["บันทึกเข้า ",U.length," ครั้ง · ",ps(U[U.length-1].timestamp)]})]},f)})}),T.some(f=>f.version!==2)&&e.jsx("p",{className:"text-amber-800 bg-amber-50 p-2 rounded-lg",children:"ประวัติเก่าอาจเป็นข้อความย่อ ไม่มีค่าเดิมหรือพาร์ทก่อนหน้า ระบบแสดงเท่าที่เคยบันทึก ไม่เติมขั้นตอนย้อนหลัง"}),e.jsxs("div",{className:"flex flex-wrap gap-2 items-center",children:[e.jsx("button",{type:"button",onClick:()=>{n("all"),r("all")},className:"text-emerald-700 underline",children:"ดูทุกพาร์ท"}),e.jsxs("select",{"aria-label":"ประเภทประวัติ",value:s,onChange:f=>r(f.target.value),className:"max-w-full rounded-lg border p-2 bg-white",children:[e.jsx("option",{value:"all",children:"ทั้งหมด"}),e.jsx("option",{value:"handoff",children:"ส่งต่องาน"}),e.jsx("option",{value:"data",children:"ข้อมูล"}),e.jsx("option",{value:"comments",children:"ความคิดเห็น"}),e.jsx("option",{value:"files",children:"ไฟล์และสื่อ"})]}),e.jsx("button",{type:"button",onClick:()=>h(!o),className:"border rounded-lg p-2 bg-white",children:o?"เรียงเก่าก่อน":"เรียงใหม่ก่อน"})]}),e.jsxs("p",{className:"font-bold",children:[c==="all"?"ประวัติทุกพาร์ท":ce(c)," · ",q.length," เหตุการณ์"]}),e.jsx("div",{className:"space-y-3",children:q.slice(0,l).map(({e:f,index:w})=>{var U;const S=i.find(v=>v.id===f.userId||v.alias===f.user||v.name===f.user),k=f.version===2&&f.stageBefore&&f.stageBefore!==f.stageAfter;return e.jsxs("article",{className:"bg-white rounded-xl border p-3 min-w-0 space-y-2","data-testid":"activity-event",children:[e.jsxs("div",{className:"flex gap-2 items-start",children:[e.jsx(Ke,{src:f.userAvatar||(S==null?void 0:S.avatar)||"./logo.jpg",alt:"",className:"w-7 h-7 shrink-0 rounded-full"}),e.jsxs("div",{className:"min-w-0",children:[e.jsx("strong",{className:"break-words",children:(S==null?void 0:S.alias)||f.user}),e.jsx("time",{className:"block text-[10px] text-slate-500",children:ps(f.timestamp)})]})]}),e.jsx("p",{className:"font-semibold whitespace-pre-wrap break-words [overflow-wrap:anywhere]",children:f.kind==="comment"?"แสดงความคิดเห็น":f.kind==="reply"?"ตอบกลับความคิดเห็น":f.kind==="handoff"?"อัปเดตการส่งต่องาน":f.action}),k&&e.jsxs("p",{className:"text-emerald-800 font-bold",children:[ce(f.stageBefore)," → ",ce(f.stageAfter)]}),f.version===2&&!k&&e.jsxs("p",{className:"text-[10px] text-slate-500",children:["ณ ",ce(f.stageAfter)]}),f.content&&f.version!==2&&e.jsx("p",{className:"text-[10px] text-amber-800",children:"ข้อความที่ยังเก็บในรายการ · ไม่ทราบพาร์ท ณ เวลานั้น"}),f.content&&e.jsxs("div",{className:"space-y-2",children:[f.content.replyToAuthor&&e.jsxs("p",{children:["ตอบกลับ ",f.content.replyToAuthor]}),e.jsx("p",{className:"whitespace-pre-wrap break-words [overflow-wrap:anywhere]",children:f.content.text}),f.content.photoUrl&&e.jsx(ke,{value:f.content.photoUrl,field:"photo",users:i,preview:A}),(f.content.voiceUrl||f.content.audioUrl)&&e.jsx(ke,{value:f.content.voiceUrl||f.content.audioUrl,field:"voice",users:i,preview:A})]}),!!((U=f.changes)!=null&&U.length)&&e.jsxs("details",{open:f.kind!=="create",children:[e.jsxs("summary",{className:"cursor-pointer text-emerald-700 font-bold py-1",children:["รายละเอียดที่บันทึก (",f.changes.length,")"]}),e.jsx("div",{className:"space-y-3 mt-2",children:f.changes.map(v=>e.jsxs("div",{className:"border-t pt-2",children:[e.jsx("h4",{className:"font-bold mb-2",children:Ge[v.field]||v.field}),e.jsxs("div",{className:"grid sm:grid-cols-2 gap-2",children:[e.jsxs("div",{className:"min-w-0 rounded-lg bg-slate-50 p-2",children:[e.jsx("p",{className:"text-[10px] text-slate-500 mb-1",children:"ก่อนเปลี่ยน"}),e.jsx(ke,{value:v.before,field:v.field,users:i,preview:A})]}),e.jsxs("div",{className:"min-w-0 rounded-lg bg-emerald-50 p-2",children:[e.jsx("p",{className:"text-[10px] text-emerald-700 mb-1",children:"หลังเปลี่ยน"}),e.jsx(ke,{value:v.after,field:v.field,users:i,preview:A})]})]})]},v.field))})]})]},f.id||`${f.timestamp}-${w}`)})}),!q.length&&e.jsx("p",{className:"text-slate-500",children:"ยังไม่มีประวัติที่บันทึกสำหรับตัวกรองนี้"}),q.length>l&&e.jsxs("button",{type:"button",className:"w-full border rounded-lg p-3 text-emerald-700",onClick:()=>b(l+20),children:["แสดงประวัติเพิ่ม (",q.length-l," เหตุการณ์)"]}),N&&e.jsx(Bn,{media:N,close:()=>A(null)})]})}var Te={},We,ms;function Ln(){return ms||(ms=1,We=function(){return typeof Promise=="function"&&Promise.prototype&&Promise.prototype.then}),We}var Ze={},we={},xs;function $e(){if(xs)return we;xs=1;let t;const i=[0,26,44,70,100,134,172,196,242,292,346,404,466,532,581,655,733,815,901,991,1085,1156,1258,1364,1474,1588,1706,1828,1921,2051,2185,2323,2465,2611,2761,2876,3034,3196,3362,3532,3706];return we.getSymbolSize=function(n){if(!n)throw new Error('"version" cannot be null or undefined');if(n<1||n>40)throw new Error('"version" should be in range from 1 to 40');return n*4+17},we.getSymbolTotalCodewords=function(n){return i[n]},we.getBCHDigit=function(c){let n=0;for(;c!==0;)n++,c>>>=1;return n},we.setToSJISFunction=function(n){if(typeof n!="function")throw new Error('"toSJISFunc" is not a valid function.');t=n},we.isKanjiModeEnabled=function(){return typeof t<"u"},we.toSJIS=function(n){return t(n)},we}var Xe={},gs;function wt(){return gs||(gs=1,(function(t){t.L={bit:1},t.M={bit:0},t.Q={bit:3},t.H={bit:2};function i(c){if(typeof c!="string")throw new Error("Param is not a string");switch(c.toLowerCase()){case"l":case"low":return t.L;case"m":case"medium":return t.M;case"q":case"quartile":return t.Q;case"h":case"high":return t.H;default:throw new Error("Unknown EC Level: "+c)}}t.isValid=function(n){return n&&typeof n.bit<"u"&&n.bit>=0&&n.bit<4},t.from=function(n,s){if(t.isValid(n))return n;try{return i(n)}catch{return s}}})(Xe)),Xe}var et,bs;function Dn(){if(bs)return et;bs=1;function t(){this.buffer=[],this.length=0}return t.prototype={get:function(i){const c=Math.floor(i/8);return(this.buffer[c]>>>7-i%8&1)===1},put:function(i,c){for(let n=0;n<c;n++)this.putBit((i>>>c-n-1&1)===1)},getLengthInBits:function(){return this.length},putBit:function(i){const c=Math.floor(this.length/8);this.buffer.length<=c&&this.buffer.push(0),i&&(this.buffer[c]|=128>>>this.length%8),this.length++}},et=t,et}var tt,vs;function Un(){if(vs)return tt;vs=1;function t(i){if(!i||i<1)throw new Error("BitMatrix size must be defined and greater than 0");this.size=i,this.data=new Uint8Array(i*i),this.reservedBit=new Uint8Array(i*i)}return t.prototype.set=function(i,c,n,s){const r=i*this.size+c;this.data[r]=n,s&&(this.reservedBit[r]=!0)},t.prototype.get=function(i,c){return this.data[i*this.size+c]},t.prototype.xor=function(i,c,n){this.data[i*this.size+c]^=n},t.prototype.isReserved=function(i,c){return this.reservedBit[i*this.size+c]},tt=t,tt}var st={},ws;function Mn(){return ws||(ws=1,(function(t){const i=$e().getSymbolSize;t.getRowColCoords=function(n){if(n===1)return[];const s=Math.floor(n/7)+2,r=i(n),o=r===145?26:Math.ceil((r-13)/(2*s-2))*2,h=[r-7];for(let l=1;l<s-1;l++)h[l]=h[l-1]-o;return h.push(6),h.reverse()},t.getPositions=function(n){const s=[],r=t.getRowColCoords(n),o=r.length;for(let h=0;h<o;h++)for(let l=0;l<o;l++)h===0&&l===0||h===0&&l===o-1||h===o-1&&l===0||s.push([r[h],r[l]]);return s}})(st)),st}var nt={},ys;function zn(){if(ys)return nt;ys=1;const t=$e().getSymbolSize,i=7;return nt.getPositions=function(n){const s=t(n);return[[0,0],[s-i,0],[0,s-i]]},nt}var rt={},js;function Fn(){return js||(js=1,(function(t){t.Patterns={PATTERN000:0,PATTERN001:1,PATTERN010:2,PATTERN011:3,PATTERN100:4,PATTERN101:5,PATTERN110:6,PATTERN111:7};const i={N1:3,N2:3,N3:40,N4:10};t.isValid=function(s){return s!=null&&s!==""&&!isNaN(s)&&s>=0&&s<=7},t.from=function(s){return t.isValid(s)?parseInt(s,10):void 0},t.getPenaltyN1=function(s){const r=s.size;let o=0,h=0,l=0,b=null,N=null;for(let A=0;A<r;A++){h=l=0,b=N=null;for(let T=0;T<r;T++){let y=s.get(A,T);y===b?h++:(h>=5&&(o+=i.N1+(h-5)),b=y,h=1),y=s.get(T,A),y===N?l++:(l>=5&&(o+=i.N1+(l-5)),N=y,l=1)}h>=5&&(o+=i.N1+(h-5)),l>=5&&(o+=i.N1+(l-5))}return o},t.getPenaltyN2=function(s){const r=s.size;let o=0;for(let h=0;h<r-1;h++)for(let l=0;l<r-1;l++){const b=s.get(h,l)+s.get(h,l+1)+s.get(h+1,l)+s.get(h+1,l+1);(b===4||b===0)&&o++}return o*i.N2},t.getPenaltyN3=function(s){const r=s.size;let o=0,h=0,l=0;for(let b=0;b<r;b++){h=l=0;for(let N=0;N<r;N++)h=h<<1&2047|s.get(b,N),N>=10&&(h===1488||h===93)&&o++,l=l<<1&2047|s.get(N,b),N>=10&&(l===1488||l===93)&&o++}return o*i.N3},t.getPenaltyN4=function(s){let r=0;const o=s.data.length;for(let l=0;l<o;l++)r+=s.data[l];return Math.abs(Math.ceil(r*100/o/5)-10)*i.N4};function c(n,s,r){switch(n){case t.Patterns.PATTERN000:return(s+r)%2===0;case t.Patterns.PATTERN001:return s%2===0;case t.Patterns.PATTERN010:return r%3===0;case t.Patterns.PATTERN011:return(s+r)%3===0;case t.Patterns.PATTERN100:return(Math.floor(s/2)+Math.floor(r/3))%2===0;case t.Patterns.PATTERN101:return s*r%2+s*r%3===0;case t.Patterns.PATTERN110:return(s*r%2+s*r%3)%2===0;case t.Patterns.PATTERN111:return(s*r%3+(s+r)%2)%2===0;default:throw new Error("bad maskPattern:"+n)}}t.applyMask=function(s,r){const o=r.size;for(let h=0;h<o;h++)for(let l=0;l<o;l++)r.isReserved(l,h)||r.xor(l,h,c(s,l,h))},t.getBestMask=function(s,r){const o=Object.keys(t.Patterns).length;let h=0,l=1/0;for(let b=0;b<o;b++){r(b),t.applyMask(b,s);const N=t.getPenaltyN1(s)+t.getPenaltyN2(s)+t.getPenaltyN3(s)+t.getPenaltyN4(s);t.applyMask(b,s),N<l&&(l=N,h=b)}return h}})(rt)),rt}var Qe={},Ns;function Ks(){if(Ns)return Qe;Ns=1;const t=wt(),i=[1,1,1,1,1,1,1,1,1,1,2,2,1,2,2,4,1,2,4,4,2,4,4,4,2,4,6,5,2,4,6,6,2,5,8,8,4,5,8,8,4,5,8,11,4,8,10,11,4,9,12,16,4,9,16,16,6,10,12,18,6,10,17,16,6,11,16,19,6,13,18,21,7,14,21,25,8,16,20,25,8,17,23,25,9,17,23,34,9,18,25,30,10,20,27,32,12,21,29,35,12,23,34,37,12,25,34,40,13,26,35,42,14,28,38,45,15,29,40,48,16,31,43,51,17,33,45,54,18,35,48,57,19,37,51,60,19,38,53,63,20,40,56,66,21,43,59,70,22,45,62,74,24,47,65,77,25,49,68,81],c=[7,10,13,17,10,16,22,28,15,26,36,44,20,36,52,64,26,48,72,88,36,64,96,112,40,72,108,130,48,88,132,156,60,110,160,192,72,130,192,224,80,150,224,264,96,176,260,308,104,198,288,352,120,216,320,384,132,240,360,432,144,280,408,480,168,308,448,532,180,338,504,588,196,364,546,650,224,416,600,700,224,442,644,750,252,476,690,816,270,504,750,900,300,560,810,960,312,588,870,1050,336,644,952,1110,360,700,1020,1200,390,728,1050,1260,420,784,1140,1350,450,812,1200,1440,480,868,1290,1530,510,924,1350,1620,540,980,1440,1710,570,1036,1530,1800,570,1064,1590,1890,600,1120,1680,1980,630,1204,1770,2100,660,1260,1860,2220,720,1316,1950,2310,750,1372,2040,2430];return Qe.getBlocksCount=function(s,r){switch(r){case t.L:return i[(s-1)*4+0];case t.M:return i[(s-1)*4+1];case t.Q:return i[(s-1)*4+2];case t.H:return i[(s-1)*4+3];default:return}},Qe.getTotalCodewordsCount=function(s,r){switch(r){case t.L:return c[(s-1)*4+0];case t.M:return c[(s-1)*4+1];case t.Q:return c[(s-1)*4+2];case t.H:return c[(s-1)*4+3];default:return}},Qe}var at={},Fe={},ks;function qn(){if(ks)return Fe;ks=1;const t=new Uint8Array(512),i=new Uint8Array(256);return(function(){let n=1;for(let s=0;s<255;s++)t[s]=n,i[n]=s,n<<=1,n&256&&(n^=285);for(let s=255;s<512;s++)t[s]=t[s-255]})(),Fe.log=function(n){if(n<1)throw new Error("log("+n+")");return i[n]},Fe.exp=function(n){return t[n]},Fe.mul=function(n,s){return n===0||s===0?0:t[i[n]+i[s]]},Fe}var $s;function _n(){return $s||($s=1,(function(t){const i=qn();t.mul=function(n,s){const r=new Uint8Array(n.length+s.length-1);for(let o=0;o<n.length;o++)for(let h=0;h<s.length;h++)r[o+h]^=i.mul(n[o],s[h]);return r},t.mod=function(n,s){let r=new Uint8Array(n);for(;r.length-s.length>=0;){const o=r[0];for(let l=0;l<s.length;l++)r[l]^=i.mul(s[l],o);let h=0;for(;h<r.length&&r[h]===0;)h++;r=r.slice(h)}return r},t.generateECPolynomial=function(n){let s=new Uint8Array([1]);for(let r=0;r<n;r++)s=t.mul(s,new Uint8Array([1,i.exp(r)]));return s}})(at)),at}var ot,Cs;function Vn(){if(Cs)return ot;Cs=1;const t=_n();function i(c){this.genPoly=void 0,this.degree=c,this.degree&&this.initialize(this.degree)}return i.prototype.initialize=function(n){this.degree=n,this.genPoly=t.generateECPolynomial(this.degree)},i.prototype.encode=function(n){if(!this.genPoly)throw new Error("Encoder not initialized");const s=new Uint8Array(n.length+this.degree);s.set(n);const r=t.mod(s,this.genPoly),o=this.degree-r.length;if(o>0){const h=new Uint8Array(this.degree);return h.set(r,o),h}return r},ot=i,ot}var it={},lt={},dt={},Es;function Gs(){return Es||(Es=1,dt.isValid=function(i){return!isNaN(i)&&i>=1&&i<=40}),dt}var pe={},Ss;function Js(){if(Ss)return pe;Ss=1;const t="[0-9]+",i="[A-Z $%*+\\-./:]+";let c="(?:[u3000-u303F]|[u3040-u309F]|[u30A0-u30FF]|[uFF00-uFFEF]|[u4E00-u9FAF]|[u2605-u2606]|[u2190-u2195]|u203B|[u2010u2015u2018u2019u2025u2026u201Cu201Du2225u2260]|[u0391-u0451]|[u00A7u00A8u00B1u00B4u00D7u00F7])+";c=c.replace(/u/g,"\\u");const n="(?:(?![A-Z0-9 $%*+\\-./:]|"+c+`)(?:.|[\r
]))+`;pe.KANJI=new RegExp(c,"g"),pe.BYTE_KANJI=new RegExp("[^A-Z0-9 $%*+\\-./:]+","g"),pe.BYTE=new RegExp(n,"g"),pe.NUMERIC=new RegExp(t,"g"),pe.ALPHANUMERIC=new RegExp(i,"g");const s=new RegExp("^"+c+"$"),r=new RegExp("^"+t+"$"),o=new RegExp("^[A-Z0-9 $%*+\\-./:]+$");return pe.testKanji=function(l){return s.test(l)},pe.testNumeric=function(l){return r.test(l)},pe.testAlphanumeric=function(l){return o.test(l)},pe}var As;function Ce(){return As||(As=1,(function(t){const i=Gs(),c=Js();t.NUMERIC={id:"Numeric",bit:1,ccBits:[10,12,14]},t.ALPHANUMERIC={id:"Alphanumeric",bit:2,ccBits:[9,11,13]},t.BYTE={id:"Byte",bit:4,ccBits:[8,16,16]},t.KANJI={id:"Kanji",bit:8,ccBits:[8,10,12]},t.MIXED={bit:-1},t.getCharCountIndicator=function(r,o){if(!r.ccBits)throw new Error("Invalid mode: "+r);if(!i.isValid(o))throw new Error("Invalid version: "+o);return o>=1&&o<10?r.ccBits[0]:o<27?r.ccBits[1]:r.ccBits[2]},t.getBestModeForData=function(r){return c.testNumeric(r)?t.NUMERIC:c.testAlphanumeric(r)?t.ALPHANUMERIC:c.testKanji(r)?t.KANJI:t.BYTE},t.toString=function(r){if(r&&r.id)return r.id;throw new Error("Invalid mode")},t.isValid=function(r){return r&&r.bit&&r.ccBits};function n(s){if(typeof s!="string")throw new Error("Param is not a string");switch(s.toLowerCase()){case"numeric":return t.NUMERIC;case"alphanumeric":return t.ALPHANUMERIC;case"kanji":return t.KANJI;case"byte":return t.BYTE;default:throw new Error("Unknown mode: "+s)}}t.from=function(r,o){if(t.isValid(r))return r;try{return n(r)}catch{return o}}})(lt)),lt}var Ts;function Hn(){return Ts||(Ts=1,(function(t){const i=$e(),c=Ks(),n=wt(),s=Ce(),r=Gs(),o=7973,h=i.getBCHDigit(o);function l(T,y,P){for(let D=1;D<=40;D++)if(y<=t.getCapacity(D,P,T))return D}function b(T,y){return s.getCharCountIndicator(T,y)+4}function N(T,y){let P=0;return T.forEach(function(D){const q=b(D.mode,y);P+=q+D.getBitsLength()}),P}function A(T,y){for(let P=1;P<=40;P++)if(N(T,P)<=t.getCapacity(P,y,s.MIXED))return P}t.from=function(y,P){return r.isValid(y)?parseInt(y,10):P},t.getCapacity=function(y,P,D){if(!r.isValid(y))throw new Error("Invalid QR Code version");typeof D>"u"&&(D=s.BYTE);const q=i.getSymbolTotalCodewords(y),f=c.getTotalCodewordsCount(y,P),w=(q-f)*8;if(D===s.MIXED)return w;const S=w-b(D,y);switch(D){case s.NUMERIC:return Math.floor(S/10*3);case s.ALPHANUMERIC:return Math.floor(S/11*2);case s.KANJI:return Math.floor(S/13);case s.BYTE:default:return Math.floor(S/8)}},t.getBestVersionForData=function(y,P){let D;const q=n.from(P,n.M);if(Array.isArray(y)){if(y.length>1)return A(y,q);if(y.length===0)return 1;D=y[0]}else D=y;return l(D.mode,D.getLength(),q)},t.getEncodedBits=function(y){if(!r.isValid(y)||y<7)throw new Error("Invalid QR Code version");let P=y<<12;for(;i.getBCHDigit(P)-h>=0;)P^=o<<i.getBCHDigit(P)-h;return y<<12|P}})(it)),it}var ct={},Rs;function On(){if(Rs)return ct;Rs=1;const t=$e(),i=1335,c=21522,n=t.getBCHDigit(i);return ct.getEncodedBits=function(r,o){const h=r.bit<<3|o;let l=h<<10;for(;t.getBCHDigit(l)-n>=0;)l^=i<<t.getBCHDigit(l)-n;return(h<<10|l)^c},ct}var ut={},ht,Is;function Qn(){if(Is)return ht;Is=1;const t=Ce();function i(c){this.mode=t.NUMERIC,this.data=c.toString()}return i.getBitsLength=function(n){return 10*Math.floor(n/3)+(n%3?n%3*3+1:0)},i.prototype.getLength=function(){return this.data.length},i.prototype.getBitsLength=function(){return i.getBitsLength(this.data.length)},i.prototype.write=function(n){let s,r,o;for(s=0;s+3<=this.data.length;s+=3)r=this.data.substr(s,3),o=parseInt(r,10),n.put(o,10);const h=this.data.length-s;h>0&&(r=this.data.substr(s),o=parseInt(r,10),n.put(o,h*3+1))},ht=i,ht}var pt,Bs;function Kn(){if(Bs)return pt;Bs=1;const t=Ce(),i=["0","1","2","3","4","5","6","7","8","9","A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z"," ","$","%","*","+","-",".","/",":"];function c(n){this.mode=t.ALPHANUMERIC,this.data=n}return c.getBitsLength=function(s){return 11*Math.floor(s/2)+6*(s%2)},c.prototype.getLength=function(){return this.data.length},c.prototype.getBitsLength=function(){return c.getBitsLength(this.data.length)},c.prototype.write=function(s){let r;for(r=0;r+2<=this.data.length;r+=2){let o=i.indexOf(this.data[r])*45;o+=i.indexOf(this.data[r+1]),s.put(o,11)}this.data.length%2&&s.put(i.indexOf(this.data[r]),6)},pt=c,pt}var ft,Ps;function Gn(){if(Ps)return ft;Ps=1;const t=Ce();function i(c){this.mode=t.BYTE,typeof c=="string"?this.data=new TextEncoder().encode(c):this.data=new Uint8Array(c)}return i.getBitsLength=function(n){return n*8},i.prototype.getLength=function(){return this.data.length},i.prototype.getBitsLength=function(){return i.getBitsLength(this.data.length)},i.prototype.write=function(c){for(let n=0,s=this.data.length;n<s;n++)c.put(this.data[n],8)},ft=i,ft}var mt,Ls;function Jn(){if(Ls)return mt;Ls=1;const t=Ce(),i=$e();function c(n){this.mode=t.KANJI,this.data=n}return c.getBitsLength=function(s){return s*13},c.prototype.getLength=function(){return this.data.length},c.prototype.getBitsLength=function(){return c.getBitsLength(this.data.length)},c.prototype.write=function(n){let s;for(s=0;s<this.data.length;s++){let r=i.toSJIS(this.data[s]);if(r>=33088&&r<=40956)r-=33088;else if(r>=57408&&r<=60351)r-=49472;else throw new Error("Invalid SJIS character: "+this.data[s]+`
Make sure your charset is UTF-8`);r=(r>>>8&255)*192+(r&255),n.put(r,13)}},mt=c,mt}var xt={exports:{}},Ds;function Yn(){return Ds||(Ds=1,(function(t){var i={single_source_shortest_paths:function(c,n,s){var r={},o={};o[n]=0;var h=i.PriorityQueue.make();h.push(n,0);for(var l,b,N,A,T,y,P,D,q;!h.empty();){l=h.pop(),b=l.value,A=l.cost,T=c[b]||{};for(N in T)T.hasOwnProperty(N)&&(y=T[N],P=A+y,D=o[N],q=typeof o[N]>"u",(q||D>P)&&(o[N]=P,h.push(N,P),r[N]=b))}if(typeof s<"u"&&typeof o[s]>"u"){var f=["Could not find a path from ",n," to ",s,"."].join("");throw new Error(f)}return r},extract_shortest_path_from_predecessor_list:function(c,n){for(var s=[],r=n;r;)s.push(r),c[r],r=c[r];return s.reverse(),s},find_path:function(c,n,s){var r=i.single_source_shortest_paths(c,n,s);return i.extract_shortest_path_from_predecessor_list(r,s)},PriorityQueue:{make:function(c){var n=i.PriorityQueue,s={},r;c=c||{};for(r in n)n.hasOwnProperty(r)&&(s[r]=n[r]);return s.queue=[],s.sorter=c.sorter||n.default_sorter,s},default_sorter:function(c,n){return c.cost-n.cost},push:function(c,n){var s={value:c,cost:n};this.queue.push(s),this.queue.sort(this.sorter)},pop:function(){return this.queue.shift()},empty:function(){return this.queue.length===0}}};t.exports=i})(xt)),xt.exports}var Us;function Wn(){return Us||(Us=1,(function(t){const i=Ce(),c=Qn(),n=Kn(),s=Gn(),r=Jn(),o=Js(),h=$e(),l=Yn();function b(f){return unescape(encodeURIComponent(f)).length}function N(f,w,S){const k=[];let U;for(;(U=f.exec(S))!==null;)k.push({data:U[0],index:U.index,mode:w,length:U[0].length});return k}function A(f){const w=N(o.NUMERIC,i.NUMERIC,f),S=N(o.ALPHANUMERIC,i.ALPHANUMERIC,f);let k,U;return h.isKanjiModeEnabled()?(k=N(o.BYTE,i.BYTE,f),U=N(o.KANJI,i.KANJI,f)):(k=N(o.BYTE_KANJI,i.BYTE,f),U=[]),w.concat(S,k,U).sort(function(R,B){return R.index-B.index}).map(function(R){return{data:R.data,mode:R.mode,length:R.length}})}function T(f,w){switch(w){case i.NUMERIC:return c.getBitsLength(f);case i.ALPHANUMERIC:return n.getBitsLength(f);case i.KANJI:return r.getBitsLength(f);case i.BYTE:return s.getBitsLength(f)}}function y(f){return f.reduce(function(w,S){const k=w.length-1>=0?w[w.length-1]:null;return k&&k.mode===S.mode?(w[w.length-1].data+=S.data,w):(w.push(S),w)},[])}function P(f){const w=[];for(let S=0;S<f.length;S++){const k=f[S];switch(k.mode){case i.NUMERIC:w.push([k,{data:k.data,mode:i.ALPHANUMERIC,length:k.length},{data:k.data,mode:i.BYTE,length:k.length}]);break;case i.ALPHANUMERIC:w.push([k,{data:k.data,mode:i.BYTE,length:k.length}]);break;case i.KANJI:w.push([k,{data:k.data,mode:i.BYTE,length:b(k.data)}]);break;case i.BYTE:w.push([{data:k.data,mode:i.BYTE,length:b(k.data)}])}}return w}function D(f,w){const S={},k={start:{}};let U=["start"];for(let v=0;v<f.length;v++){const R=f[v],B=[];for(let E=0;E<R.length;E++){const p=R[E],j=""+v+E;B.push(j),S[j]={node:p,lastCount:0},k[j]={};for(let $=0;$<U.length;$++){const I=U[$];S[I]&&S[I].node.mode===p.mode?(k[I][j]=T(S[I].lastCount+p.length,p.mode)-T(S[I].lastCount,p.mode),S[I].lastCount+=p.length):(S[I]&&(S[I].lastCount=p.length),k[I][j]=T(p.length,p.mode)+4+i.getCharCountIndicator(p.mode,w))}}U=B}for(let v=0;v<U.length;v++)k[U[v]].end=0;return{map:k,table:S}}function q(f,w){let S;const k=i.getBestModeForData(f);if(S=i.from(w,k),S!==i.BYTE&&S.bit<k.bit)throw new Error('"'+f+'" cannot be encoded with mode '+i.toString(S)+`.
 Suggested mode is: `+i.toString(k));switch(S===i.KANJI&&!h.isKanjiModeEnabled()&&(S=i.BYTE),S){case i.NUMERIC:return new c(f);case i.ALPHANUMERIC:return new n(f);case i.KANJI:return new r(f);case i.BYTE:return new s(f)}}t.fromArray=function(w){return w.reduce(function(S,k){return typeof k=="string"?S.push(q(k,null)):k.data&&S.push(q(k.data,k.mode)),S},[])},t.fromString=function(w,S){const k=A(w,h.isKanjiModeEnabled()),U=P(k),v=D(U,S),R=l.find_path(v.map,"start","end"),B=[];for(let E=1;E<R.length-1;E++)B.push(v.table[R[E]].node);return t.fromArray(y(B))},t.rawSplit=function(w){return t.fromArray(A(w,h.isKanjiModeEnabled()))}})(ut)),ut}var Ms;function Zn(){if(Ms)return Ze;Ms=1;const t=$e(),i=wt(),c=Dn(),n=Un(),s=Mn(),r=zn(),o=Fn(),h=Ks(),l=Vn(),b=Hn(),N=On(),A=Ce(),T=Wn();function y(v,R){const B=v.size,E=r.getPositions(R);for(let p=0;p<E.length;p++){const j=E[p][0],$=E[p][1];for(let I=-1;I<=7;I++)if(!(j+I<=-1||B<=j+I))for(let L=-1;L<=7;L++)$+L<=-1||B<=$+L||(I>=0&&I<=6&&(L===0||L===6)||L>=0&&L<=6&&(I===0||I===6)||I>=2&&I<=4&&L>=2&&L<=4?v.set(j+I,$+L,!0,!0):v.set(j+I,$+L,!1,!0))}}function P(v){const R=v.size;for(let B=8;B<R-8;B++){const E=B%2===0;v.set(B,6,E,!0),v.set(6,B,E,!0)}}function D(v,R){const B=s.getPositions(R);for(let E=0;E<B.length;E++){const p=B[E][0],j=B[E][1];for(let $=-2;$<=2;$++)for(let I=-2;I<=2;I++)$===-2||$===2||I===-2||I===2||$===0&&I===0?v.set(p+$,j+I,!0,!0):v.set(p+$,j+I,!1,!0)}}function q(v,R){const B=v.size,E=b.getEncodedBits(R);let p,j,$;for(let I=0;I<18;I++)p=Math.floor(I/3),j=I%3+B-8-3,$=(E>>I&1)===1,v.set(p,j,$,!0),v.set(j,p,$,!0)}function f(v,R,B){const E=v.size,p=N.getEncodedBits(R,B);let j,$;for(j=0;j<15;j++)$=(p>>j&1)===1,j<6?v.set(j,8,$,!0):j<8?v.set(j+1,8,$,!0):v.set(E-15+j,8,$,!0),j<8?v.set(8,E-j-1,$,!0):j<9?v.set(8,15-j-1+1,$,!0):v.set(8,15-j-1,$,!0);v.set(E-8,8,1,!0)}function w(v,R){const B=v.size;let E=-1,p=B-1,j=7,$=0;for(let I=B-1;I>0;I-=2)for(I===6&&I--;;){for(let L=0;L<2;L++)if(!v.isReserved(p,I-L)){let G=!1;$<R.length&&(G=(R[$]>>>j&1)===1),v.set(p,I-L,G),j--,j===-1&&($++,j=7)}if(p+=E,p<0||B<=p){p-=E,E=-E;break}}}function S(v,R,B){const E=new c;B.forEach(function(L){E.put(L.mode.bit,4),E.put(L.getLength(),A.getCharCountIndicator(L.mode,v)),L.write(E)});const p=t.getSymbolTotalCodewords(v),j=h.getTotalCodewordsCount(v,R),$=(p-j)*8;for(E.getLengthInBits()+4<=$&&E.put(0,4);E.getLengthInBits()%8!==0;)E.putBit(0);const I=($-E.getLengthInBits())/8;for(let L=0;L<I;L++)E.put(L%2?17:236,8);return k(E,v,R)}function k(v,R,B){const E=t.getSymbolTotalCodewords(R),p=h.getTotalCodewordsCount(R,B),j=E-p,$=h.getBlocksCount(R,B),I=E%$,L=$-I,G=Math.floor(E/$),ae=Math.floor(j/$),ue=ae+1,fe=G-ae,Ie=new l(fe);let ye=0;const X=new Array($),me=new Array($);let ie=0;const je=new Uint8Array(v.buffer);for(let le=0;le<$;le++){const te=le<L?ae:ue;X[le]=je.slice(ye,ye+te),me[le]=Ie.encode(X[le]),ye+=te,ie=Math.max(ie,te)}const oe=new Uint8Array(E);let be=0,Y,ee;for(Y=0;Y<ie;Y++)for(ee=0;ee<$;ee++)Y<X[ee].length&&(oe[be++]=X[ee][Y]);for(Y=0;Y<fe;Y++)for(ee=0;ee<$;ee++)oe[be++]=me[ee][Y];return oe}function U(v,R,B,E){let p;if(Array.isArray(v))p=T.fromArray(v);else if(typeof v=="string"){let G=R;if(!G){const ae=T.rawSplit(v);G=b.getBestVersionForData(ae,B)}p=T.fromString(v,G||40)}else throw new Error("Invalid data");const j=b.getBestVersionForData(p,B);if(!j)throw new Error("The amount of data is too big to be stored in a QR Code");if(!R)R=j;else if(R<j)throw new Error(`
The chosen QR Code version cannot contain this amount of data.
Minimum version required to store current data is: `+j+`.
`);const $=S(R,B,p),I=t.getSymbolSize(R),L=new n(I);return y(L,R),P(L),D(L,R),f(L,B,0),R>=7&&q(L,R),w(L,$),isNaN(E)&&(E=o.getBestMask(L,f.bind(null,L,B))),o.applyMask(E,L),f(L,B,E),{modules:L,version:R,errorCorrectionLevel:B,maskPattern:E,segments:p}}return Ze.create=function(R,B){if(typeof R>"u"||R==="")throw new Error("No input text");let E=i.M,p,j;return typeof B<"u"&&(E=i.from(B.errorCorrectionLevel,i.M),p=b.from(B.version),j=o.from(B.maskPattern),B.toSJISFunc&&t.setToSJISFunction(B.toSJISFunc)),U(R,p,E,j)},Ze}var gt={},bt={},zs;function Ys(){return zs||(zs=1,(function(t){function i(c){if(typeof c=="number"&&(c=c.toString()),typeof c!="string")throw new Error("Color should be defined as hex string");let n=c.slice().replace("#","").split("");if(n.length<3||n.length===5||n.length>8)throw new Error("Invalid hex color: "+c);(n.length===3||n.length===4)&&(n=Array.prototype.concat.apply([],n.map(function(r){return[r,r]}))),n.length===6&&n.push("F","F");const s=parseInt(n.join(""),16);return{r:s>>24&255,g:s>>16&255,b:s>>8&255,a:s&255,hex:"#"+n.slice(0,6).join("")}}t.getOptions=function(n){n||(n={}),n.color||(n.color={});const s=typeof n.margin>"u"||n.margin===null||n.margin<0?4:n.margin,r=n.width&&n.width>=21?n.width:void 0,o=n.scale||4;return{width:r,scale:r?4:o,margin:s,color:{dark:i(n.color.dark||"#000000ff"),light:i(n.color.light||"#ffffffff")},type:n.type,rendererOpts:n.rendererOpts||{}}},t.getScale=function(n,s){return s.width&&s.width>=n+s.margin*2?s.width/(n+s.margin*2):s.scale},t.getImageWidth=function(n,s){const r=t.getScale(n,s);return Math.floor((n+s.margin*2)*r)},t.qrToImageData=function(n,s,r){const o=s.modules.size,h=s.modules.data,l=t.getScale(o,r),b=Math.floor((o+r.margin*2)*l),N=r.margin*l,A=[r.color.light,r.color.dark];for(let T=0;T<b;T++)for(let y=0;y<b;y++){let P=(T*b+y)*4,D=r.color.light;if(T>=N&&y>=N&&T<b-N&&y<b-N){const q=Math.floor((T-N)/l),f=Math.floor((y-N)/l);D=A[h[q*o+f]?1:0]}n[P++]=D.r,n[P++]=D.g,n[P++]=D.b,n[P]=D.a}}})(bt)),bt}var Fs;function Xn(){return Fs||(Fs=1,(function(t){const i=Ys();function c(s,r,o){s.clearRect(0,0,r.width,r.height),r.style||(r.style={}),r.height=o,r.width=o,r.style.height=o+"px",r.style.width=o+"px"}function n(){try{return document.createElement("canvas")}catch{throw new Error("You need to specify a canvas element")}}t.render=function(r,o,h){let l=h,b=o;typeof l>"u"&&(!o||!o.getContext)&&(l=o,o=void 0),o||(b=n()),l=i.getOptions(l);const N=i.getImageWidth(r.modules.size,l),A=b.getContext("2d"),T=A.createImageData(N,N);return i.qrToImageData(T.data,r,l),c(A,b,N),A.putImageData(T,0,0),b},t.renderToDataURL=function(r,o,h){let l=h;typeof l>"u"&&(!o||!o.getContext)&&(l=o,o=void 0),l||(l={});const b=t.render(r,o,l),N=l.type||"image/png",A=l.rendererOpts||{};return b.toDataURL(N,A.quality)}})(gt)),gt}var vt={},qs;function er(){if(qs)return vt;qs=1;const t=Ys();function i(s,r){const o=s.a/255,h=r+'="'+s.hex+'"';return o<1?h+" "+r+'-opacity="'+o.toFixed(2).slice(1)+'"':h}function c(s,r,o){let h=s+r;return typeof o<"u"&&(h+=" "+o),h}function n(s,r,o){let h="",l=0,b=!1,N=0;for(let A=0;A<s.length;A++){const T=Math.floor(A%r),y=Math.floor(A/r);!T&&!b&&(b=!0),s[A]?(N++,A>0&&T>0&&s[A-1]||(h+=b?c("M",T+o,.5+y+o):c("m",l,0),l=0,b=!1),T+1<r&&s[A+1]||(h+=c("h",N),N=0)):l++}return h}return vt.render=function(r,o,h){const l=t.getOptions(o),b=r.modules.size,N=r.modules.data,A=b+l.margin*2,T=l.color.light.a?"<path "+i(l.color.light,"fill")+' d="M0 0h'+A+"v"+A+'H0z"/>':"",y="<path "+i(l.color.dark,"stroke")+' d="'+n(N,b,l.margin)+'"/>',P='viewBox="0 0 '+A+" "+A+'"',q='<svg xmlns="http://www.w3.org/2000/svg" '+(l.width?'width="'+l.width+'" height="'+l.width+'" ':"")+P+' shape-rendering="crispEdges">'+T+y+`</svg>
`;return typeof h=="function"&&h(null,q),q},vt}var _s;function tr(){if(_s)return Te;_s=1;const t=Ln(),i=Zn(),c=Xn(),n=er();function s(r,o,h,l,b){const N=[].slice.call(arguments,1),A=N.length,T=typeof N[A-1]=="function";if(!T&&!t())throw new Error("Callback required as last argument");if(T){if(A<2)throw new Error("Too few arguments provided");A===2?(b=h,h=o,o=l=void 0):A===3&&(o.getContext&&typeof b>"u"?(b=l,l=void 0):(b=l,l=h,h=o,o=void 0))}else{if(A<1)throw new Error("Too few arguments provided");return A===1?(h=o,o=l=void 0):A===2&&!o.getContext&&(l=h,h=o,o=void 0),new Promise(function(y,P){try{const D=i.create(h,l);y(r(D,o,l))}catch(D){P(D)}})}try{const y=i.create(h,l);b(null,r(y,o,l))}catch(y){b(y)}}return Te.create=i.create,Te.toCanvas=s.bind(null,c.render),Te.toDataURL=s.bind(null,c.renderToDataURL),Te.toString=s.bind(null,function(r,o,h){return n.render(r,h)}),Te}var sr=tr();const nr=tn(sr);function Q(t){return t==null?"":String(t).replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;")}function x(t){if(t==null||t==="")return"";const c=String(t).split(/\r?\n/),n=s=>{if(!s)return"";try{const r=Intl;if(typeof Intl<"u"&&r.Segmenter){const o=new r.Segmenter("th",{granularity:"word"}),h=[];for(const l of o.segment(s)){const b=l.segment;/^\s+$/.test(b)?h.push(" "):h.push(`<span class="w-seg">${Q(b)}</span>`)}return h.join("")}}catch{}return Q(s)};return c.map(n).join("<br/>")}function Vs(t){try{const i=nr.create(t,{errorCorrectionLevel:"M"}),c=i.modules.size,n=2,s=c+n*2;let r="";for(let h=0;h<c;h++)for(let l=0;l<c;l++)i.modules.get(h,l)&&(r+=`<rect x="${l+n}" y="${h+n}" width="1" height="1" fill="#0f172a"/>`);const o=`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${s} ${s}" width="200" height="200" shape-rendering="crispEdges"><rect width="100%" height="100%" fill="#ffffff"/>${r}</svg>`;return`data:image/svg+xml;utf8,${encodeURIComponent(o)}`}catch{return""}}function rr(t,i,c,n=[]){var te,ve,Be,Pe,xe,ge,ne,Le,De,z,_,Ue,W;const s=t.type==="supplier",r=t.type==="location",o=s?t:null,h=r?t:null,l=t.type==="drink_store"?t:null,b=s?o.name:r?h.name:l.storeName,N=s?o.chineseName:r?h.foreignName:l.chineseName,A=s?o.category:r?h.locationType==="mall"?"ห้างสรรพสินค้า":h.locationType:l.storeCategory||"เรฟร้านน้ำ",T=s?o.marketOrCity:r?h.location.addressText||h.zoneOrFloor:l.city,y=t.country==="TH"?"ประเทศไทย (TH)":"ประเทศจีน (CN)",P=typeof window<"u"&&window.location.origin&&!window.location.hostname.includes("localhost")&&!window.location.hostname.includes("127.0.0.1")?`${window.location.origin}${window.location.pathname}`:"https://vitcha-sourcing-fxjw.onrender.com/",D=P.endsWith("/")?P:`${P}/`,q=`${D}?view=${encodeURIComponent(t.id)}&type=${encodeURIComponent(t.type)}`,f=Vs(q),w=[];o?((te=o.photos.storefrontAndAtmosphere)==null||te.forEach((a,u)=>w.push({url:a,label:`ป้ายหน้าร้าน / บรรยากาศ #${u+1}`})),(ve=o.photos.contactCards)==null||ve.forEach((a,u)=>w.push({url:a,label:`นามบัตร / WeChat #${u+1}`})),(Be=o.catalogItems)==null||Be.forEach((a,u)=>{a.photo&&w.push({url:a.photo,label:a.name?`สินค้า: ${a.name}`:`รายการสินค้า #${u+1}`})})):h?((Pe=h.photos.storefrontAndAtmosphere)==null||Pe.forEach((a,u)=>w.push({url:a,label:`หน้าร้าน / ทางเดิน #${u+1}`})),(xe=h.photos.floorPlanAndSpecs)==null||xe.forEach((a,u)=>w.push({url:a,label:`ผังห้อง / งานระบบ #${u+1}`})),(ge=h.photos.surroundingNeighbors)==null||ge.forEach((a,u)=>w.push({url:a,label:`ร้านข้างเคียง #${u+1}`})),(ne=h.photos.contactCards)==null||ne.forEach((a,u)=>w.push({url:a,label:`นามบัตร / เอกสารสัญญา #${u+1}`}))):l&&((Le=l.photos.storefrontAndAtmosphere)==null||Le.forEach((a,u)=>w.push({url:a,label:`หน้าร้าน / บรรยากาศ #${u+1}`})),(De=l.photos.menuBoard)==null||De.forEach((a,u)=>w.push({url:a,label:`ป้ายเมนู / ราคา #${u+1}`})),(z=l.photos.drinkCups)==null||z.forEach((a,u)=>w.push({url:a,label:`แก้วเครื่องดื่ม #${u+1}`})),(_=l.drinkItems)==null||_.forEach((a,u)=>{a.photo&&w.push({url:a.photo,label:a.name?`เมนูชิม: ${a.name}`:`แก้วชิม #${u+1}`})}));const S=de(t),k=[];S.forEach((a,u)=>{k.push({label:a.label||`คลิปเสียงหน้างาน #${u+1}`,durationSec:a.durationSec||4,source:"บันทึกเสียงหลักหน้างานจริง"})}),o?(o.catalogItems||[]).forEach((a,u)=>{de(a).forEach((m,F)=>{k.push({label:m.label||`คลิปเสียงสินค้า #${F+1}`,durationSec:m.durationSec||4,source:`สินค้า: ${a.name||`รายการที่ #${u+1}`}`})})}):l&&(l.drinkItems||[]).forEach((a,u)=>{de(a).forEach((m,F)=>{k.push({label:m.label||`คลิปเสียงเมนู #${F+1}`,durationSec:m.durationSec||4,source:`เมนู: ${a.name||`แก้วที่ #${u+1}`}`})})});const U=Array.isArray(t.videos)?t.videos.filter(Boolean):[],v=((Ue=w[0])==null?void 0:Ue.url)||"./logo.jpg",R=Array.isArray(t.viewedBy)?t.viewedBy:[],B=Array.isArray(t.likes)?t.likes:[],E=Array.isArray(t.reviewerNotes)?t.reviewerNotes:[],p=Qs(t).sort((a,u)=>(Date.parse(a.timestamp)||0)-(Date.parse(u.timestamp)||0)),j=a=>{var u;return((u=n.find(m=>m.id===a||m.alias===a||m.name===a))==null?void 0:u.alias)||a},$=`ฉันจะเป็นหัวแถว-${b.replace(/[^a-zA-Z0-9ก-๙_-]/g,"_")}.pdf`,L={awaiting:"พาร์ท 1: รอรับช่วงต่อ",rfq_sent:"พาร์ท 2: ขอสเปก / ส่ง RFQ",sample_test:"พาร์ท 3: ทดสอบตัวอย่าง Lab / R&D",negotiate:"พาร์ท 4: ต่อรองราคา & MOQ",approved:"พาร์ท 5: ตัวเต็งอนุมัติ",ordered:"พาร์ท 6: สั่งซื้อสำเร็จ"}[t.handoffStage||"awaiting"]||"พาร์ท 1: รอรับช่วงต่อ",G=k.length>0?`<div class="media-grid">
          ${k.map((a,u)=>`
              <div class="voice-card">
                <div class="voice-icon">▶</div>
                <div class="voice-meta">
                  <div class="voice-title">${x(`${u+1}. ${a.label}`)}</div>
                  <div class="voice-sub">${x(`${a.source} · ความยาว ${a.durationSec} วินาที`)}</div>
                  <div class="voice-wave">${x("ılıll|ılıl||ılıll|ılı · สแกน QR เพื่อกดฟังเสียงจริง")}</div>
                </div>
              </div>`).join("")}
        </div>`:`<div class="empty-note">${x("ไม่มีไฟล์เสียงบันทึกในรายการนี้")}</div>`,ae=U.length>0?`<div class="video-grid">
          ${U.map((a,u)=>{const m=a.includes("gtv-videos-bucket")?$n:a;return`
              <div class="video-card">
                <div class="video-thumb-wrap">
                  <img
                    id="video-thumb-img-${u}"
                    class="video-thumb-img"
                    src="${Q(v)}"
                    crossorigin="anonymous"
                    data-video-src="${Q(m)}"
                  />
                  <div class="video-overlay-top">
                    <span class="video-chip">VIDEO CLIP #${u+1}</span>
                    <span class="video-chip-right">HD PREVIEW</span>
                  </div>
                  <div class="video-play-circle">▶</div>
                  <div class="video-overlay-bottom">
                    <span>${x(`คลิปวิดีโอที่ ${u+1} · สแกน QR Code ด้านบนเพื่อเปิดเล่นวิดีโอ`)}</span>
                  </div>
                </div>
                <div class="video-caption">
                  <div class="video-caption-title">${x(`คลิปวิดีโอหน้างาน #${u+1} (จากทั้งหมด ${U.length} คลิป)`)}</div>
                  <div class="video-caption-sub">${x("เอกสารกระดาษแสดงภาพ Thumbnail ตัวอย่าง — สแกน QR Code เพื่อรับชมวิดีโอเคลื่อนไหวพร้อมเสียง")}</div>
                </div>
              </div>`}).join("")}
        </div>`:`<div class="empty-note">${x("ไม่มีคลิปวิดีโอในรายการนี้")}</div>`;let ue="";if(s&&o){const a=(o.catalogItems||[]).map((u,m)=>{const F=de(u);return`
        <tr>
          <td style="text-align:center;font-weight:700;">${m+1}</td>
          <td>
            ${u.photo?`<img src="${Q(u.photo)}" crossorigin="anonymous" class="table-thumb" />`:'<div class="table-thumb-empty">ไม่มีรูป</div>'}
          </td>
          <td>
            <div class="cell-title">${x(u.name||`รายการที่ #${m+1}`)}</div>
            ${u.memo?`<div class="cell-sub">${x(u.memo)}</div>`:""}
            ${F.length>0?`<div class="cell-voice-badge">แนบเสียงบันทึก ${F.length} คลิป</div>`:""}
          </td>
          <td>
            <div class="cell-text">${x(u.dimensions||"-")}</div>
            <div class="cell-sub">${x(u.weightKg?`น้ำหนัก: ${u.weightKg}`:"")}</div>
          </td>
          <td>
            <div class="cell-price-green">
              ${u.priceRmb?`¥${u.priceRmb.toLocaleString()}`:u.priceThb?`฿${u.priceThb.toLocaleString()}`:"-"}
            </div>
            ${u.priceRmb?`<div class="cell-sub">(≈ ฿${i(u.priceRmb).toLocaleString()})</div>`:""}
          </td>
        </tr>`}).join("");ue=`
      <div class="section-box">
        <div class="section-title">${x(`กลุ่มที่ 3: รายการสินค้า / อุปกรณ์ / วัตถุดิบ (${(o.catalogItems||[]).length} รายการ)`)}</div>
        ${a?`<table class="data-table">
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
                    <th>${x("รูปภาพ")}</th>
                    <th>${x("ชื่อรายการ & รายละเอียดสเปก")}</th>
                    <th>${x("ขนาด / น้ำหนัก")}</th>
                    <th>${x("ราคาประเมิน")}</th>
                  </tr>
                </thead>
                <tbody>${a}</tbody>
              </table>`:`<div class="empty-note">${x("ไม่มีรายการย่อย")}</div>`}
      </div>
    `}else if(l){const a=(l.drinkItems||[]).map((u,m)=>{const F=de(u);return`
        <tr>
          <td style="text-align:center;font-weight:700;">${m+1}</td>
          <td>
            ${u.photo?`<img src="${Q(u.photo)}" crossorigin="anonymous" class="table-thumb" />`:'<div class="table-thumb-empty">ไม่มีรูป</div>'}
          </td>
          <td>
            <div class="cell-title">${x(u.name||`แก้วที่ #${m+1}`)}</div>
            ${u.gimmickNotes?`<div class="cell-sub">${x(`กิมมิก: ${u.gimmickNotes}`)}</div>`:""}
            ${F.length>0?`<div class="cell-voice-badge">แนบเสียงบันทึก ${F.length} คลิป</div>`:""}
          </td>
          <td>
            <div class="cell-text">${x(u.cupSize||"-")}</div>
          </td>
          <td>
            <div class="cell-text">${x(u.fitMenuTarget||"-")}</div>
          </td>
          <td>
            <div class="cell-price-amber">
              ${u.priceRmb?`¥${u.priceRmb.toLocaleString()}`:u.priceThb?`฿${u.priceThb.toLocaleString()}`:"-"}
            </div>
            ${u.priceRmb?`<div class="cell-sub">(≈ ฿${i(u.priceRmb).toLocaleString()})</div>`:""}
          </td>
        </tr>`}).join("");ue=`
      <div class="section-box">
        <div class="section-title">${x(`กลุ่มที่ 3: เมนูที่ชิม & การถอดรหัสสูตร (${(l.drinkItems||[]).length} เมนู)`)}</div>
        ${a?`<table class="data-table">
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
                    <th>${x("รูปแก้ว")}</th>
                    <th>${x("ชื่อเมนู & กิมมิก")}</th>
                    <th>${x("ขนาดแก้ว")}</th>
                    <th>${x("ต่อยอดเมนูของเรา")}</th>
                    <th>${x("ราคาขาย")}</th>
                  </tr>
                </thead>
                <tbody>${a}</tbody>
              </table>`:`<div class="empty-note">${x("ไม่มีเมนูย่อย")}</div>`}
      </div>
    `}const fe=t.attachedFiles||[],Ie=fe.length>0?`<div class="section-box">
          <div class="section-title">${x(`เอกสารและไฟล์แนบเพิ่มเติม (Attached Documents) — (${fe.length} ไฟล์)`)}</div>
          <div class="media-subhead">${x("สแกน QR Code หรือคลิกลิงก์ด้านล่างเพื่อเปิดไฟล์บน Google Drive / เบราว์เซอร์:")}</div>
          ${fe.map((a,u)=>{const m=a.url?Vs(a.url):"",F=(a.name.split(".").pop()||"FILE").toUpperCase(),O=a.size?a.size<1024*1024?`${(a.size/1024).toFixed(1)} KB`:`${(a.size/(1024*1024)).toFixed(1)} MB`:"";return`
              <div class="file-attachment-card">
                <div class="file-attachment-info">
                  <div class="file-attachment-name">#${u+1} [${Q(F)}] ${Q(a.name)}</div>
                  <div class="file-attachment-meta">
                    ${O?`ขนาด: ${O}`:""}
                    ${a.uploadedAt?` · บันทึกเมื่อ: ${new Date(a.uploadedAt).toLocaleDateString("th-TH")}`:""}
                  </div>
                  <div class="file-attachment-link">
                    <a href="${Q(a.url)}" target="_blank" rel="noopener noreferrer">${Q(a.url)}</a>
                  </div>
                </div>
                ${m?`<div class="file-attachment-qr">
                        <img src="${m}" alt="QR" />
                        <div style="font-size:7px;text-align:center;color:#059669;font-weight:700;margin-top:2px;">Scan Open</div>
                      </div>`:""}
              </div>`}).join("")}
        </div>`:"",ye=w.length>0?`<div class="photo-grid">
          ${w.map((a,u)=>`
              <div class="photo-card">
                <img src="${Q(a.url)}" crossorigin="anonymous" />
                <div class="photo-caption">${x(`รูปที่ ${u+1}: ${a.label}`)}</div>
              </div>`).join("")}
        </div>`:`<div class="empty-note">${x("ไม่มีรูปภาพในรายการนี้")}</div>`,X=(a,u)=>{if(a==null||a===""||Array.isArray(a)&&!a.length)return'<span class="audit-empty">ยังไม่ระบุ / ไม่มีข้อมูล</span>';if(Array.isArray(a))return a.map((O,se)=>`<div class="audit-value-item"><b>${se+1}.</b> ${X(O,u)}</div>`).join("");if(typeof a=="object")return Object.entries(a).filter(([O])=>!["id","driveFileId"].includes(O)).map(([O,se])=>`<div class="audit-value-item"><strong>${x(Ge[O]||O)}:</strong> ${X(se,`${u}.${O}`)}</div>`).join("");if(typeof a=="boolean")return a?"ใช่":"ไม่ใช่";const m=String(a);if(u==="handoffStage")return x(ce(m));if(u==="assignedTo")return x(j(m));if(u==="status")return x({scouted:"สำรวจแล้ว",reviewing:"เทียบสเปก",rfq_sent:"ส่ง RFQ",shortlisted:"ตัวเต็ง",ordered:"สั่งซื้อแล้ว"}[m]||m);if(/url$|photos|photo|videos|voice|audio|storefrontAndAtmosphere|contactCards|menuBoard|drinkCups|floorPlanAndSpecs|surroundingNeighbors/i.test(u)&&/^(https?:\/\/|\.\/|\/(?!\/)|data:(image|audio|video)\/)/i.test(m)){let O;try{O=new URL(m,/^\/(uploads|media)\//.test(m)?sn():D).href}catch{return x(m)}const se=/voice|audio/i.test(u),Z=/video/i.test(u),H=!se&&!Z&&(/photos|photo|storefrontAndAtmosphere|contactCards|menuBoard|drinkCups|floorPlanAndSpecs|surroundingNeighbors/i.test(u)||/\.(png|jpe?g|webp|gif)(\?|$)/i.test(m)),qe=m.startsWith("data:")?q:O;return`<div class="audit-media">${H?`<img src="${Q(O)}" crossorigin="anonymous" alt="ภาพที่บันทึกในประวัติ" />`:""}<a href="${Q(qe)}" target="_blank" rel="noopener noreferrer">${x(se?"เปิดไฟล์เสียง":Z?"เปิดวิดีโอ":H?"เปิดภาพ":"เปิดไฟล์แนบ")}</a>${se||Z?`<span class="audit-empty"> · ${x("เปิดผ่านลิงก์หรือ QR ของรายการเพื่อฟังและดูต่อ")}</span>`:""}</div>`}return x(m)},me=t.handoffStage||"awaiting",ie=p.filter(a=>a.version===2).flatMap(a=>[a.stageBefore,a.stageAfter]),je=Math.max(0,...[me,...ie].map(a=>Re.findIndex(([u])=>u===a))),oe=()=>`<div class="audit-stages">${Re.slice(0,je+1).map(([a],u)=>{const m=p.filter(Z=>Z.version===2&&(Z.stageBefore===a||Z.stageAfter===a)),F=m.filter(Z=>Z.stageAfter===a&&Z.stageBefore!==a),O=me===a;if(!m.length)return`<div class="audit-stage audit-stage-missing">${x(`พาร์ท ${u+1}: ไม่พบการบันทึกในพาร์ทนี้${O?" (สถานะปัจจุบัน)":""}`)}</div>`;const se=p.map((Z,H)=>Z.version===2&&Z.stageAfter===a?be[H]:"").join("");return`<section class="audit-part"><div class="audit-stage ${O?"audit-current":""}"><strong>${x(ce(a))}${O?" · ปัจจุบัน":""}</strong>${F.length>1?`<span>${x(`บันทึกเข้า ${F.length} ครั้ง`)}</span>`:""}</div>${se||`<p class="audit-empty">${x("พบพาร์ทนี้ในประวัติการส่งต่อไปขั้นตอนอื่น")}</p>`}</section>`}).join("")}</div>`,be=p.map((a,u)=>{const m=a.kind==="handoff"||a.action==="handoff"?"ส่งต่องาน":a.kind==="comment"||a.action==="comment"?"ความคิดเห็น":a.kind==="reply"||a.action==="reply"?"ตอบกลับ":a.action,F=n.find(H=>H.id===a.userId||H.alias===a.user||H.name===a.user),O=a.userAvatar||(F==null?void 0:F.avatar),se=O&&/^(https?:\/\/|\.\/|\/(?!\/)|data:image\/)/i.test(O)?O:"",Z=a.version===2&&a.stageBefore&&a.stageBefore!==a.stageAfter;return`<article class="audit-event" data-activity-id="${Q(a.id||u)}">
        <div class="audit-event-heading">${se?`<img class="audit-avatar" src="${Q(se)}" crossorigin="anonymous" alt="${Q((F==null?void 0:F.alias)||a.user)}" />`:`<span class="audit-avatar audit-avatar-fallback">${Q(((F==null?void 0:F.alias)||a.user||"?").slice(0,1))}</span>`}<strong>${x((F==null?void 0:F.alias)||a.user)}</strong><span>${x(Number.isNaN(Date.parse(a.timestamp))?a.timestamp:new Date(a.timestamp).toLocaleString("th-TH"))}</span></div>
        <div class="audit-action">${x(m)}</div>
        ${a.version===2?`<div class="audit-transition">${x(Z?`${ce(a.stageBefore)} → ${ce(a.stageAfter)}`:`ณ ${ce(a.stageAfter)}`)}</div>`:""}
        ${a.content?`<div class="audit-content">${a.version!==2?`<div class="audit-empty">${x("ข้อความที่ยังเก็บในรายการ · ไม่ทราบพาร์ท ณ เวลานั้น")}</div>`:""}${a.content.replyToAuthor?`<strong>${x(`ตอบกลับ ${a.content.replyToAuthor}`)}</strong>`:""}<p>${x(a.content.text)}</p>${a.content.photoUrl?X(a.content.photoUrl,"photo"):""}${a.content.voiceUrl||a.content.audioUrl?X(a.content.voiceUrl||a.content.audioUrl,"voice"):""}</div>`:""}
        ${(a.kind==="create"?[]:a.changes||[]).filter(H=>H.field!=="handoffStage").map(H=>`<div class="audit-change"><h4>${x(Ge[H.field]||H.field)}</h4>${H.before!=null&&H.before!==""&&(!Array.isArray(H.before)||H.before.length)?`<div class="audit-before"><b>ก่อนเปลี่ยน</b><div>${X(H.before,H.field)}</div></div>`:""}<div class="audit-after">${H.before!=null&&H.before!==""?"<b>หลังเปลี่ยน</b>":""}<div>${X(H.after,H.field)}</div></div></div>`).join("")}
      </article>`}),Y=p.map((a,u)=>a.version===2&&Re.some(([m])=>m===a.stageAfter)?"":be[u]).join(""),ee=R.length>0?`<table class="data-table" style="margin-top:10px;">
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
              <th>${x("ผู้เปิดอ่าน (นามแฝง)")}</th>
              <th>${x("ระดับสิทธิ์")}</th>
              <th>${x("เปิดอ่านล่าสุดเมื่อ")}</th>
              <th style="text-align:center;">${x("จำนวนครั้ง")}</th>
            </tr>
          </thead>
          <tbody>
            ${R.map((a,u)=>`
              <tr>
                <td style="text-align:center;">${u+1}</td>
                <td><div class="cell-title">${x(`${a.alias} (${a.name})`)}</div></td>
                <td><div class="cell-text">${Q(a.role.toUpperCase())}</div></td>
                <td><div class="cell-sub">${Q(new Date(a.lastViewedAt).toLocaleString("th-TH"))}</div></td>
                <td style="text-align:center;font-weight:700;">${x(`${a.viewCount||1} ครั้ง`)}</td>
              </tr>`).join("")}
          </tbody>
        </table>`:`<div class="empty-note" style="margin-top:8px;">${x("ยังไม่มีประวัติผู้เปิดอ่านเพิ่มเติม")}</div>`,le=s?`คะแนนประเมิน ${(o==null?void 0:o.rating)||5}/5 ดาว (${o!=null&&o.isFactory?"โรงงานผลิต":"หน้าร้าน/โชว์รูม"})`:`รสชาติ ${l==null?void 0:l.ratings.taste}/5 · ดีไซน์ ${l==null?void 0:l.ratings.aesthetics}/5 · คุ้มค่า ${l==null?void 0:l.ratings.value}/5 · ความไว ${l==null?void 0:l.ratings.speed}/5`;return`<!DOCTYPE html>
<html lang="th">
<head>
  <meta charset="UTF-8" />
  <base href="${Q(D)}" />
  <meta name="viewport" content="width=840, initial-scale=0.45, minimum-scale=0.3, maximum-scale=2.0, user-scalable=yes" />
  <title>ฉันจะเป็นหัวแถว - ${Q(b)}</title>
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
      <strong style="font-size:14px;">รายงานสรุปฉบับสมบูรณ์: ${Q(b)}</strong>
      <span id="status-indicator" style="font-size:12px;color:#94a3b8;margin-left:10px;">
        ${c==="pdf"?"กำลังจัดหน้าและสร้างไฟล์ PDF...":"พร้อมพิมพ์รายงาน"}
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
          <div class="badge">${x(`${s?"รายงานซัพพลายเออร์ & โรงงาน":"รายงานเรฟร้านน้ำ & R&D"} · ${y}`)}</div>
          <h1 class="brand-title">${x(b)}</h1>
          <div class="brand-sub">${x(`${N?`${N} · `:""}หมวดหมู่: ${A}`)}</div>

          <!-- At-a-glance Multimedia & Detail Counter Pills -->
          <div class="summary-pills">
            <span class="summary-pill">${x(`รูปภาพ ${w.length} รูป`)}</span>
            <span class="summary-pill">${x(`วอยซ์เสียง ${k.length} คลิป`)}</span>
            <span class="summary-pill">${x(`วิดีโอ ${U.length} คลิป`)}</span>
            <span class="summary-pill">${x(s?`สินค้า ${((o==null?void 0:o.catalogItems)||[]).length} รายการ`:`เมนูชิม ${((l==null?void 0:l.drinkItems)||[]).length} เมนู`)}</span>
            <span class="summary-pill">${x(`คอมเมนต์ ${E.length} หัวข้อ`)}</span>
            <span class="summary-pill">${x(`ประวัติ Log ${p.length} รายการ`)}</span>
          </div>

          <div class="direct-link-bar">
            <div class="info-label" style="color:#0f172a;margin-bottom:2px;">Direct Link (Scan QR / LINE Share):</div>
            <div style="color:#059669;font-family:monospace;font-size:10px;word-break:break-all;">${Q(q)}</div>
          </div>
        </div>

        <div class="header-right">
          <div class="meta-box">
            <div class="meta-platform">${x("ฉันจะเป็นหัวแถว")}</div>
            <div>LEAD THE FRONT · R&amp;D</div>
            <div style="margin-top:4px;">${x(`รหัส: ${t.id.slice(0,18)}`)}</div>
            <div>${x(`สถานะ: ${L}`)}</div>
            <div>${x(`ออกรายงาน: ${new Date().toLocaleString("th-TH")}`)}</div>
          </div>

          ${f?`<div class="qr-card">
                  <img id="report-qr-img" src="${f}" alt="QR Code" />
                  <div class="qr-label">${x("สแกนเปิดในแอป")}</div>
                  <div class="qr-sub">${x("ฟังเสียง · ดูคลิปจริง")}</div>
                </div>`:""}
        </div>
      </div>

      <!-- Group 1: Overview, Contacts, Location & Handoff -->
      <div class="section-box">
        <div class="section-title">${x("กลุ่มที่ 1: ข้อมูลหลัก พิกัดสถานที่ ช่องทางติดต่อ และการรับช่วงต่อ")}</div>
        <div class="info-grid">
          <div class="info-item">
            <span class="info-label">${x("ชื่อรายการ / ร้านค้า")}</span>
            <span class="info-value">${x(`${b}${N?` (${N})`:""}`)}</span>
          </div>
          <div class="info-item">
            <span class="info-label">${x("หมวดหมู่ & คะแนนประเมิน")}</span>
            <span class="info-value">${x(`${A} · ${le}`)}</span>
          </div>
          <div class="info-item">
            <span class="info-label">${x("สถานที่ / ตลาด / เมือง")}</span>
            <span class="info-value">${x(T||((W=t.location)==null?void 0:W.addressText)||"-")}</span>
          </div>
          <div class="info-item">
            <span class="info-label">${x("พิกัด GPS & แผนที่")}</span>
            <span class="info-value">${t.location?`${t.location.lat.toFixed(5)}, ${t.location.lng.toFixed(5)} (${Q(t.location.addressText||"พิกัดหน้างาน")})`:"-"}</span>
          </div>
          <div class="info-item">
            <span class="info-label">${x("ช่องทางติดต่อ (WeChat / LINE / โทรศัพท์)")}</span>
            <span class="info-value">${x(`WeChat: ${(s?o==null?void 0:o.wechatId:l==null?void 0:l.wechatId)||"-"} | LINE: ${(s?o==null?void 0:o.lineId:l==null?void 0:l.lineId)||"-"} | โทร: ${(s?o==null?void 0:o.phone:l==null?void 0:l.phone)||"-"}`)}</span>
          </div>
          <div class="info-item">
            <span class="info-label">${x("ผู้ลงพื้นที่สำรวจ & เวลาที่บันทึก")}</span>
            <span class="info-value">${x(`${t.creator.alias}${t.creator.name&&t.creator.name!==t.creator.alias?` (${t.creator.name})`:""} · ${new Date(t.creator.timestamp).toLocaleString("th-TH")}`)}</span>
          </div>
          <div class="info-item">
            <span class="info-label">${x("ผู้รับผิดชอบรับช่วงต่อ & กำหนดติดตาม")}</span>
            <span class="info-value">${x(`${t.assignedTo?j(t.assignedTo):"ยังไม่ระบุผู้รับผิดชอบ"} · กำหนดติดตาม: ${t.targetFollowUpDate||"-"}`)}</span>
          </div>
          <div class="info-item">
            <span class="info-label">${x("การมีส่วนร่วมของทีม (Likes & Views)")}</span>
            <span class="info-value">${x(`กดถูกใจ ${B.length} คน · เปิดอ่านแล้ว ${R.length} คน`)}</span>
          </div>
        </div>

        ${(s?o!=null&&o.memo:l!=null&&l.tastingNotes)?`<div class="note-banner">
                <div class="note-banner-title">${x(s?"บันทึกภาพรวมหน้างาน / รายละเอียดสเปกหลัก:":"บันทึกรีวิวรสชาติ & ไอเดียเรฟหน้างาน:")}</div>
                <div class="note-banner-body">${x(s?o==null?void 0:o.memo:l==null?void 0:l.tastingNotes)}</div>
              </div>`:""}

        ${t.handoffNotes?`<div class="handoff-banner">
                <div class="handoff-banner-title">${x("โน้ตการส่งมอบงาน / ผลเจรจาทีมไทย:")}</div>
                <div class="note-banner-body">${x(t.handoffNotes)}</div>
              </div>`:""}
      </div>

      <!-- Group 2: Voice Recordings & Video Clips with Thumbnail Previews -->
      <div class="section-box">
        <div class="section-title">${x(`กลุ่มที่ 2: สื่อมัลติมีเดียหน้างาน — วอยซ์เสียงบันทึก (${k.length} คลิป) & วิดีโอ (${U.length} คลิป)`)}</div>
        <div class="media-subhead">${x(`ไฟล์เสียงบันทึกหน้างานจริง (${k.length} คลิป):`)}</div>
        ${G}
        <div class="media-subhead" style="margin-top:10px;">${x(`คลิปวิดีโอหน้างานพร้อมภาพ Thumbnail พรีวิว (${U.length} คลิป):`)}</div>
        ${ae}
      </div>

      <!-- Group 3: Catalog / Drink Items -->
      ${ue}

      <!-- Attached Documents & Files -->
      ${Ie}

      <!-- Group 4: All Photos of This Item -->
      <div class="section-box">
        <div class="section-title">${x(`กลุ่มที่ 4: แกลเลอรีภาพถ่ายทั้งหมดของรายการนี้ (${w.length} รูป)`)}</div>
        ${ye}
      </div>

      <!-- Group 6: Activity & Handoff Log + Viewer Log -->
      <div class="section-box activity-report" id="activity-history">
        <div class="section-title">${x(`กลุ่มที่ 5: ประวัติการดำเนินงานและความคิดเห็น (${p.length} เหตุการณ์)`)}</div>
        <p class="audit-intro">${x("จัดตามพาร์ทที่เกี่ยวข้อง แต่ละพาร์ทเรียงเหตุการณ์จากเก่าไปใหม่")}</p>
        <div class="audit-current-summary"><strong>${x(`ปัจจุบัน: ${L}`)}</strong><div>${x(`ผู้รับช่วงต่อ: ${t.assignedTo?j(t.assignedTo):"ยังไม่ระบุ"} · กำหนดติดตาม: ${t.targetFollowUpDate||"ยังไม่ระบุ"}`)}</div></div>
        ${oe()}
        ${p.some(a=>a.version!==2)?`<p class="audit-legacy">${x("ประวัติเก่าแสดงตามที่บันทึกไว้ ไม่เติมขั้นตอนย้อนหลัง")}</p>`:""}
        ${Y?`<h3 class="audit-viewers">ประวัติที่ไม่ได้ระบุพาร์ท</h3>${Y}`:""}
        ${R.length?`<h3 class="audit-viewers">${x("ผู้เปิดอ่านรายการ")}</h3>${ee}`:""}
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
      var mode = ${JSON.stringify(c)};
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
</html>`}function Hs(t,i,c,n=[]){const s=rr(t,i,c,n),r=new Blob([s],{type:"text/html;charset=utf-8"}),o=URL.createObjectURL(r);if(!window.open(o,"_blank")){const l=document.createElement("a");l.href=o,l.target="_blank",l.click()}setTimeout(()=>URL.revokeObjectURL(o),6e4)}const dr=({item:t,isOpen:i,onClose:c,onShareToLine:n})=>{var Ct,Et,St,At,Tt,Rt,It,Bt,Pt,Lt,Dt,Ut,Mt,zt,Ft,qt,_t,Vt,Ht,Ot,Qt,Kt,Gt,Jt,Yt,Wt,Zt,Xt,es,ts,ss,ns,rs,as,os;const{currentUser:s,convertCnyToThb:r,addReviewerNote:o,addReviewReply:h,updatePipelineStatus:l,toggleLikeItem:b,suppliers:N,drinkStores:A,locations:T,users:y,quickMessages:P,recordItemView:D,canEditItems:q,canDeleteItems:f,deleteSupplier:w,deleteStoreInspo:S,deleteLocation:k,canComment:U,openEditItem:v}=nn(),R=t&&t.type==="supplier"?N.find(d=>d.id===t.id):null,B=t&&t.type==="drink_store"?A.find(d=>d.id===t.id):null,E=t&&t.type==="location"?T.find(d=>d.id===t.id):null,p=R||B||E||t,[j,$]=K.useState(null),[I,L]=K.useState(""),[G,ae]=K.useState(null),[ue,fe]=K.useState({}),[Ie,ye]=K.useState({}),[X,me]=K.useState(null),[ie,je]=K.useState(null),[oe,be]=K.useState(!1),[Y,ee]=K.useState({}),le=Ee.useRef(null),[te,ve]=K.useState(null),[Be,Pe]=K.useState(0),xe=Ee.useRef(null),ge=Ee.useRef(null),ne=Ee.useRef(null),Le=Ee.useRef(0),De=Ee.useCallback(()=>{var d;if(ne.current&&(clearInterval(ne.current),ne.current=null),xe.current&&xe.current.state==="recording"){xe.current.stop();return}(d=ge.current)==null||d.getTracks().forEach(g=>g.stop()),ge.current=null,ve(null)},[]);K.useEffect(()=>(i&&(t!=null&&t.id)&&D(t.id,t.type),$(null),()=>{var d,g;ne.current&&clearInterval(ne.current),((d=xe.current)==null?void 0:d.state)==="recording"&&xe.current.stop(),(g=ge.current)==null||g.getTracks().forEach(C=>C.stop())}),[i,t==null?void 0:t.id]);const z=[];if(p){if(p.type==="supplier"){const d=p;(Ct=d.photos.storefrontAndAtmosphere)==null||Ct.forEach((g,C)=>z.push({url:g,label:`ป้ายหน้าร้าน/บรรยากาศ #${C+1}`})),(Et=d.photos.contactCards)==null||Et.forEach((g,C)=>z.push({url:g,label:`นามบัตร/WeChat #${C+1}`})),(St=d.catalogItems)==null||St.forEach((g,C)=>{g.photo&&z.push({url:g.photo,label:g.name?`สินค้า: ${g.name}`:`รายการสินค้า #${C+1}`})})}else if(p.type==="drink_store"){const d=p;(At=d.photos.storefrontAndAtmosphere)==null||At.forEach((g,C)=>z.push({url:g,label:`หน้าร้าน/บรรยากาศ #${C+1}`})),(Tt=d.photos.menuBoard)==null||Tt.forEach((g,C)=>z.push({url:g,label:`เมนูบอร์ด #${C+1}`})),(Rt=d.photos.drinkCups)==null||Rt.forEach((g,C)=>z.push({url:g,label:`แก้วเครื่องดื่ม #${C+1}`})),(It=d.drinkItems)==null||It.forEach((g,C)=>{g.photo&&z.push({url:g.photo,label:g.name?`เมนู: ${g.name}`:`เมนูชิม #${C+1}`})})}else if(p.type==="location"){const d=p;(Bt=d.photos.storefrontAndAtmosphere)==null||Bt.forEach((g,C)=>z.push({url:g,label:`หน้าร้าน/ทางเดิน #${C+1}`})),(Pt=d.photos.floorPlanAndSpecs)==null||Pt.forEach((g,C)=>z.push({url:g,label:`ผังห้อง/งานระบบ #${C+1}`})),(Lt=d.photos.surroundingNeighbors)==null||Lt.forEach((g,C)=>z.push({url:g,label:`ร้านข้างเคียง #${C+1}`})),(Dt=d.photos.contactCards)==null||Dt.forEach((g,C)=>z.push({url:g,label:`นามบัตร/เอกสาร #${C+1}`}))}}if(K.useEffect(()=>{if(j===null||z.length===0)return;const d=g=>{g.key==="ArrowRight"?$(C=>C!==null?(C+1)%z.length:null):g.key==="ArrowLeft"?$(C=>C!==null?(C-1+z.length)%z.length:null):g.key==="Escape"&&$(null)};return window.addEventListener("keydown",d),()=>window.removeEventListener("keydown",d)},[j,z.length]),!i||!p)return null;const _=p.type==="supplier",Ue=p.type==="drink_store",W=p.type==="location",a=_?p:null,u=Ue?p:null,m=W?p:null,F=Array.isArray(p.likes)?p.likes:[],O=F.some(d=>d.userId===s.id),se=p.attachedFiles||[],Z=p.videos||[],H=de(p),qe=_?(a==null?void 0:a.catalogItems)||[]:[],yt=Ue?(u==null?void 0:u.drinkItems)||[]:[],jt=d=>{const g=z.findIndex(C=>C.url===d);$(g>=0?g:0)},Nt=async()=>{if(!p)return;const d=_?a==null?void 0:a.name:W?m==null?void 0:m.name:u==null?void 0:u.storeName;if(window.confirm(`ยืนยันการลบรายการ "${d||"รายการนี้"}" หรือไม่?`))try{p.type==="supplier"?await w(p.id):p.type==="drink_store"?await S(p.id):p.type==="location"&&await k(p.id),c()}catch{alert("เกิดข้อผิดพลาดในการลบรายการ")}},Je=async(d,g,C)=>{try{be(!0);const V=await kn(d,{recordId:p.id,recordType:p.type,recordTitle:_?a==null?void 0:a.name:W?m==null?void 0:m.name:u==null?void 0:u.storeName});C?ee(J=>({...J,[C]:{...J[C],...g==="photo"?{photoUrl:V}:{voiceUrl:V}}})):g==="photo"?me(V):je(V)}catch(V){alert(V.message||"อัปโหลดไฟล์แนบไม่สำเร็จ")}finally{be(!1)}},kt=async d=>{var g,C;if(te===d){De();return}te&&De();try{if(!((g=navigator.mediaDevices)!=null&&g.getUserMedia)||typeof MediaRecorder>"u"){alert("เบราว์เซอร์นี้ไม่รองรับการอัดเสียงสด กรุณาเปิดผ่าน HTTPS หรืออนุญาตไมโครโฟน");return}const V=await navigator.mediaDevices.getUserMedia({audio:!0});ge.current=V;const J=["audio/mp4","audio/webm;codecs=opus","audio/webm","audio/ogg"].find(re=>MediaRecorder.isTypeSupported(re)),he=new MediaRecorder(V,J?{mimeType:J}:void 0);xe.current=he;const Ne=[];he.ondataavailable=re=>{re.data.size>0&&Ne.push(re.data)},he.onstop=()=>{var Me;ne.current&&(clearInterval(ne.current),ne.current=null),V.getTracks().forEach(He=>He.stop()),ge.current=null,ve(null);const re=((Me=he.mimeType)==null?void 0:Me.split(";")[0])||"audio/webm",M=new Blob(Ne,{type:re});if(!M.size)return;const Ye=re.includes("mp4")?"m4a":re.includes("ogg")?"ogg":"webm",Ve=new File([M],`เสียงคอมเมนต์-${Date.now()}.${Ye}`,{type:re});Je(Ve,"audio",d==="main"?void 0:d)},he.onerror=()=>{ne.current&&clearInterval(ne.current),V.getTracks().forEach(re=>re.stop()),ve(null),alert("อัดเสียงไม่สำเร็จ กรุณาลองใหม่")},Le.current=Date.now(),Pe(0),ve(d),he.start(250),ne.current=setInterval(()=>{Pe(Math.round((Date.now()-Le.current)/1e3))},1e3)}catch{(C=ge.current)==null||C.getTracks().forEach(V=>V.stop()),ve(null),alert("ไม่ได้รับสิทธิ์ใช้ไมโครโฟน กรุณากดอนุญาตไมโครโฟนเพื่ออัดเสียงสด")}},Ws=async d=>{d.preventDefault();const g=I.trim();!g&&!X&&!ie||!await o(p.id,p.type,g,{photoUrl:X||void 0,voiceUrl:ie||void 0})||(L(""),me(null),je(null))},$t=async(d,g,C)=>{const V=(ue[d]||"").trim(),J=Y[d];!V&&!(J!=null&&J.photoUrl)&&!(J!=null&&J.voiceUrl)||!await h(p.id,p.type,d,V,g,{photoUrl:J==null?void 0:J.photoUrl,voiceUrl:J==null?void 0:J.voiceUrl,replyToId:C})||(fe({...ue,[d]:""}),ee(Ne=>({...Ne,[d]:{}})),ae(null))},Zs=d=>{a&&l(a.id,d)},_e=de(p);return(Ut=_e[0])!=null&&Ut.url||(_?a==null||a.voiceNoteUrl:u==null||u.voiceNoteUrl),e.jsxs("div",{className:"fixed inset-0 z-[90] bg-black/45 backdrop-blur-sm flex items-center justify-center p-2 sm:p-4 overflow-y-auto",children:[e.jsxs("div",{className:"bg-white border border-slate-200/90 w-full max-w-3xl rounded-2xl shadow-2xl overflow-hidden my-auto animate-in zoom-in-95 max-h-[94vh] flex flex-col text-slate-900",children:[e.jsxs("div",{className:"p-3.5 sm:p-4 border-b border-slate-100 space-y-2.5 bg-white sticky top-0 z-10",children:[e.jsxs("div",{className:"flex items-start justify-between gap-2.5",children:[e.jsxs("div",{className:"flex items-start gap-2.5 min-w-0 flex-1",children:[e.jsx("span",{className:`p-2 rounded-xl shrink-0 mt-0.5 ${_?"bg-emerald-50 text-emerald-700":W?"bg-sky-50 text-sky-700":"bg-amber-50 text-amber-700"}`,children:_?e.jsx(rn,{className:"w-4 h-4 sm:w-5 sm:h-5 text-emerald-600"}):W?e.jsx("i",{"aria-hidden":"true",className:"fa-solid fa-map-location-dot text-base text-sky-600"}):e.jsx(is,{className:"w-4 h-4 sm:w-5 sm:h-5 text-amber-600"})}),e.jsxs("div",{className:"min-w-0 flex-1",children:[e.jsx("h2",{className:"font-extrabold text-slate-900 text-sm sm:text-base leading-snug break-words",children:_?a==null?void 0:a.name:W?m==null?void 0:m.name:u==null?void 0:u.storeName}),e.jsx("p",{className:"text-xs text-slate-400 truncate mt-0.5",children:_?(a==null?void 0:a.chineseName)||(a==null?void 0:a.marketOrCity):W?(m==null?void 0:m.zoneOrFloor)||(m==null?void 0:m.foreignName):(u==null?void 0:u.chineseName)||(u==null?void 0:u.storeCategory)||(u==null?void 0:u.brandConcept)})]})]}),e.jsx("button",{type:"button",onClick:c,className:"w-7 h-7 sm:w-8 sm:h-8 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-600 transition-all active:scale-95 flex items-center justify-center shrink-0",title:"ปิดหน้าต่าง",children:e.jsx(Se,{className:"w-4 h-4"})})]}),e.jsxs("div",{className:"flex items-center gap-1.5 overflow-x-auto no-scrollbar pt-2 border-t border-slate-100 select-none",children:[q&&e.jsxs("button",{type:"button",onClick:()=>v(p),className:"h-7 sm:h-8 px-2.5 rounded-xl bg-amber-50 hover:bg-amber-100 text-amber-800 border border-amber-200/90 text-xs font-bold active:scale-95 transition-all inline-flex items-center gap-1 whitespace-nowrap shrink-0",title:"แก้ไขข้อมูลรายการนี้ (Admin / Editor)",children:[e.jsx(ls,{className:"w-3 h-3 text-amber-600 shrink-0"}),e.jsx("span",{children:"แก้ไข"})]}),f&&e.jsxs("button",{type:"button",onClick:Nt,className:"h-7 sm:h-8 px-2.5 rounded-xl bg-rose-50 hover:bg-rose-100 text-rose-700 border border-rose-200 text-xs font-bold active:scale-95 transition-all inline-flex items-center gap-1 whitespace-nowrap shrink-0",title:"ลบรายการ",children:[e.jsx(ds,{className:"w-3 h-3 text-rose-600 shrink-0"}),e.jsx("span",{children:"ลบรายการ"})]}),e.jsxs("button",{type:"button",onClick:()=>b(p.id,p.type),className:`h-7 sm:h-8 px-2.5 rounded-xl border transition-all active:scale-95 inline-flex items-center gap-1 text-xs font-bold whitespace-nowrap shrink-0 ${O?"bg-blue-50 text-blue-700 border-blue-200":"bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100"}`,title:`ถูกใจ (${F.length})`,children:[e.jsx(an,{className:`w-3 h-3 shrink-0 ${O?"fill-blue-600 text-blue-600":""}`}),e.jsxs("span",{children:["ถูกใจ",F.length>0?` (${F.length})`:""]})]}),e.jsxs("button",{type:"button",onClick:()=>n(p),className:"h-7 sm:h-8 px-2.5 rounded-xl bg-[#06C755] hover:bg-[#05b34c] text-white text-xs font-bold transition-all active:scale-95 inline-flex items-center gap-1 whitespace-nowrap shrink-0 shadow-2xs",title:"แชร์ลิงก์เข้า LINE",children:[e.jsx(on,{className:"w-3 h-3 shrink-0"}),e.jsx("span",{children:"แชร์ LINE"})]}),e.jsxs("button",{type:"button",onClick:()=>Hs(p,r,"pdf",y),className:"h-7 sm:h-8 px-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold transition-all active:scale-95 inline-flex items-center gap-1 whitespace-nowrap shrink-0",title:"ดาวน์โหลดรายงานเป็นไฟล์ PDF",children:[e.jsx(Rn,{className:"w-3 h-3 text-emerald-400 shrink-0"}),e.jsx("span",{children:"ดาวน์โหลด PDF"})]}),e.jsxs("button",{type:"button",onClick:()=>Hs(p,r,"print",y),className:"h-7 sm:h-8 px-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold transition-all border border-slate-200/80 active:scale-95 inline-flex items-center gap-1 whitespace-nowrap shrink-0",title:"พิมพ์รายงานฉบับจัดหน้าสวยงาม (Print)",children:[e.jsx(Tn,{className:"w-3 h-3 text-slate-600 shrink-0"}),e.jsx("span",{children:"พิมพ์"})]})]})]}),e.jsxs("div",{className:"p-4 sm:p-6 space-y-4 overflow-y-auto flex-1",children:[e.jsxs("div",{className:"flex flex-wrap items-center justify-between gap-2 p-3 bg-slate-50 rounded-xl border border-slate-100 text-xs",children:[e.jsxs("div",{className:"flex items-center gap-2.5",children:[e.jsx(Ke,{src:p.creator.avatar,alt:p.creator.alias,className:"w-8 h-8 rounded-full object-cover ring-2 ring-emerald-500/20 shadow-xs"}),e.jsxs("div",{children:[e.jsx("div",{className:"text-slate-800 font-bold flex items-center gap-1.5",children:e.jsxs("span",{children:["ผู้ลงพื้นที่สำรวจ: ",p.creator.alias,p.creator.name&&p.creator.name!==p.creator.alias?` (${p.creator.name})`:""]})}),e.jsxs("div",{className:"text-[11px] text-slate-400 font-mono",children:["บันทึกเมื่อ: ",new Date(p.creator.timestamp).toLocaleString("th-TH")]})]})]}),e.jsxs("div",{className:"flex items-center gap-2 flex-wrap",children:[e.jsx(ln,{viewedBy:p.viewedBy,size:"md"}),_&&a&&e.jsxs("div",{className:"flex items-center gap-1.5",children:[e.jsx("span",{className:"text-[11px] text-slate-500",children:"สถานะ:"}),e.jsxs("select",{value:a.status,onChange:d=>Zs(d.target.value),className:"bg-white border border-slate-200 text-slate-800 text-xs font-bold rounded-lg px-2.5 py-1 focus:outline-none focus:border-emerald-500",children:[e.jsx("option",{value:"scouted",children:"1. สำรวจแล้ว"}),e.jsx("option",{value:"reviewing",children:"2. เทียบสเปก"}),e.jsx("option",{value:"rfq_sent",children:"3. ส่ง RFQ"}),e.jsx("option",{value:"shortlisted",children:"4. ตัวเต็ง (Shortlist)"}),e.jsx("option",{value:"ordered",children:"5. สั่งซื้อแล้ว (Ordered)"})]})]})]})]}),_e.length>0&&e.jsxs("div",{className:"p-3 bg-emerald-50/70 border border-emerald-200/80 rounded-xl space-y-2",children:[e.jsxs("div",{className:"text-xs font-bold text-emerald-950 flex items-center justify-between",children:[e.jsxs("span",{className:"flex items-center gap-1.5",children:[e.jsx(Ae,{className:"w-3.5 h-3.5 text-emerald-600"}),e.jsxs("span",{children:["วอยซ์เสียงบันทึกหน้างานจริง (",_e.length," คลิป)"]})]}),e.jsx("span",{className:"text-[10px] font-mono text-emerald-700",children:"แตะ ▶ เพื่อฟังเสียงบันทึก"})]}),e.jsx("div",{className:"grid grid-cols-1 sm:grid-cols-2 gap-2",children:_e.map((d,g)=>e.jsxs("div",{className:"p-2.5 bg-white border border-emerald-200 rounded-xl flex flex-col justify-between gap-1.5 shadow-2xs",children:[e.jsxs("div",{className:"flex items-center justify-between gap-2 min-w-0",children:[e.jsxs("div",{className:"text-xs font-bold text-slate-900 truncate flex items-center gap-1.5",children:[e.jsx(Ae,{className:"w-3.5 h-3.5 text-emerald-600 shrink-0"}),e.jsx("span",{className:"truncate",children:d.label||`คลิปเสียง #${g+1}`})]}),e.jsx("span",{className:"text-[10px] text-emerald-700 font-mono shrink-0",children:d.durationSec?`${d.durationSec} วินาที`:"เสียงบันทึก"})]}),d.url&&e.jsx("audio",{controls:!0,preload:"metadata",playsInline:!0,src:d.url,className:"h-8 w-full rounded-lg"})]},d.id||g))})]}),e.jsxs("div",{className:"p-3 bg-slate-50 rounded-xl border border-slate-100 space-y-2 text-xs",children:[e.jsxs("div",{className:"flex flex-wrap items-center gap-1.5",children:[_&&a?e.jsxs(e.Fragment,{children:[e.jsxs("span",{className:"px-2.5 py-1 rounded-lg bg-emerald-600 text-white text-[11px] font-bold inline-flex items-center gap-1",children:[e.jsx("i",{className:"fa-solid fa-industry text-[10px]"}),e.jsx("span",{children:a.category})]}),e.jsx("span",{className:"px-2 py-1 rounded-lg bg-white border border-slate-200 text-slate-700 text-[11px] font-bold",children:a.isFactory?"โรงงานผลิต":"หน้าร้าน / โชว์รูม"}),e.jsxs("span",{className:"px-2 py-1 rounded-lg bg-amber-50 border border-amber-200 text-amber-700 text-[11px] font-mono font-bold inline-flex items-center gap-1",children:[e.jsx("i",{className:"fa-solid fa-star text-[10px] text-amber-500"}),e.jsxs("span",{children:[a.rating||5,"/5"]})]}),(a.quickTags||[]).map((d,g)=>e.jsxs("span",{className:"px-2 py-1 rounded-lg bg-white border border-slate-200 text-slate-700 text-[11px] font-semibold",children:["#",d]},g))]}):u?e.jsxs(e.Fragment,{children:[e.jsxs("span",{className:"px-2.5 py-1 rounded-lg bg-amber-600 text-white text-[11px] font-bold inline-flex items-center gap-1",children:[e.jsx("i",{className:"fa-solid fa-mug-hot text-[10px]"}),e.jsx("span",{children:u.storeCategory||"เรฟร้านน้ำ"})]}),u.ratings&&e.jsxs("span",{className:"px-2 py-1 rounded-lg bg-amber-50 border border-amber-200 text-amber-800 text-[11px] font-mono font-bold inline-flex items-center gap-1",children:[e.jsx("i",{className:"fa-solid fa-star text-[10px] text-amber-500"}),e.jsx("span",{children:((u.ratings.taste+u.ratings.aesthetics+u.ratings.value+u.ratings.speed)/4).toFixed(1)})]})]}):W&&m?e.jsxs(e.Fragment,{children:[e.jsxs("span",{className:"px-2.5 py-1 rounded-lg bg-sky-600 text-white text-[11px] font-bold inline-flex items-center gap-1",children:[e.jsx("i",{className:"fa-solid fa-map-location-dot text-[10px]"}),e.jsx("span",{children:m.locationType==="mall"?"ห้างสรรพสินค้า":m.locationType})]}),e.jsxs("span",{className:"px-2 py-1 rounded-lg bg-white border border-slate-200 text-slate-700 text-[11px] font-bold",children:["ผัง ",((Mt=m.spaceSpecs)==null?void 0:Mt.layoutFormat)||"Inline"]}),m.ratings&&e.jsxs("span",{className:"px-2 py-1 rounded-lg bg-amber-50 border border-amber-200 text-amber-800 text-[11px] font-mono font-bold inline-flex items-center gap-1",children:[e.jsx("i",{className:"fa-solid fa-star text-[10px] text-amber-500"}),e.jsx("span",{children:((m.ratings.footTraffic+m.ratings.visibility+m.ratings.accessibility+m.ratings.valueRoi)/4).toFixed(1)})]}),(m.quickTags||[]).map((d,g)=>e.jsxs("span",{className:"px-2 py-1 rounded-lg bg-white border border-slate-200 text-slate-700 text-[11px] font-semibold",children:["#",d]},g))]}):null,qe.length>0&&e.jsxs("span",{className:"px-2.5 py-1 rounded-lg bg-amber-50 border border-amber-200 text-amber-800 text-[11px] font-bold inline-flex items-center gap-1 shadow-2xs",children:[e.jsx(dn,{className:"w-3 h-3 text-amber-600"}),e.jsxs("span",{children:[qe.length," สินค้า"]})]}),yt.length>0&&e.jsxs("span",{className:"px-2.5 py-1 rounded-lg bg-amber-50 border border-amber-200 text-amber-800 text-[11px] font-bold inline-flex items-center gap-1 shadow-2xs",children:[e.jsx(is,{className:"w-3 h-3 text-amber-600"}),e.jsxs("span",{children:[yt.length," เมนู"]})]}),Z.length>0&&e.jsxs("span",{className:"px-2.5 py-1 rounded-lg bg-purple-50 border border-purple-200 text-purple-700 text-[11px] font-bold inline-flex items-center gap-1 shadow-2xs",children:[e.jsx("i",{className:"fa-solid fa-video text-[9px] text-purple-600"}),e.jsxs("span",{children:[Z.length," คลิป"]})]}),H.length>0&&e.jsxs("span",{className:"px-2.5 py-1 rounded-lg bg-rose-50 border border-rose-200 text-rose-700 text-[11px] font-bold inline-flex items-center gap-1 shadow-2xs",children:[e.jsx(ze,{className:"w-3 h-3 text-rose-600"}),e.jsxs("span",{children:[H.length," คลิปเสียง"]})]}),se.length>0&&e.jsxs("a",{href:"#detail-attached-files-section",onClick:d=>{var g;d.preventDefault(),(g=document.getElementById("detail-attached-files-section"))==null||g.scrollIntoView({behavior:"smooth"})},className:"px-2.5 py-1 rounded-lg bg-sky-50 border border-sky-200 text-sky-700 text-[11px] font-bold inline-flex items-center gap-1 hover:bg-sky-100 transition-colors cursor-pointer shadow-2xs",title:"คลิกเพื่อเลื่อนดูไฟล์แนบ",children:[e.jsx(cs,{className:"w-3 h-3 text-sky-600"}),e.jsxs("span",{children:[se.length," ไฟล์แนบ"]})]})]}),e.jsxs("div",{className:"flex flex-wrap items-center justify-between gap-2 pt-1.5 border-t border-slate-200/60 text-[11px] text-slate-600",children:[e.jsxs("div",{className:"flex flex-wrap items-center gap-2",children:[e.jsxs("span",{className:"inline-flex items-center gap-1 font-semibold text-slate-800",children:[e.jsx(cn,{className:"w-3.5 h-3.5 text-sky-600 shrink-0"}),e.jsx("span",{children:_?(a==null?void 0:a.marketOrCity)||(a==null?void 0:a.address)||((zt=a==null?void 0:a.location)==null?void 0:zt.addressText):W?((Ft=m==null?void 0:m.location)==null?void 0:Ft.addressText)||(m==null?void 0:m.zoneOrFloor):((qt=u==null?void 0:u.location)==null?void 0:qt.addressText)||(u==null?void 0:u.city)})]}),(_?a==null?void 0:a.wechatId:W?(_t=m==null?void 0:m.leaseTerms)==null?void 0:_t.contactLineWechat:u==null?void 0:u.wechatId)&&e.jsxs("span",{className:"px-2 py-0.5 rounded bg-white border border-slate-200 font-mono",children:["LINE/WeChat: ",_?a==null?void 0:a.wechatId:W?(Vt=m==null?void 0:m.leaseTerms)==null?void 0:Vt.contactLineWechat:u==null?void 0:u.wechatId]}),(_?a==null?void 0:a.phone:W?(Ht=m==null?void 0:m.leaseTerms)==null?void 0:Ht.contactPhone:u==null?void 0:u.phone)&&e.jsxs("span",{className:"px-2 py-0.5 rounded bg-white border border-slate-200 font-mono",children:["โทร: ",_?a==null?void 0:a.phone:W?(Ot=m==null?void 0:m.leaseTerms)==null?void 0:Ot.contactPhone:u==null?void 0:u.phone]}),W&&((Qt=m==null?void 0:m.leaseTerms)==null?void 0:Qt.contactPerson)&&e.jsxs("span",{className:"px-2 py-0.5 rounded bg-white border border-slate-200",children:["ผู้ติดต่อ: ",m.leaseTerms.contactPerson]})]}),(Kt=p.location)!=null&&Kt.lat&&((Gt=p.location)!=null&&Gt.lng)&&(p.location.lat!==0||p.location.lng!==0)?e.jsx("a",{href:`https://www.google.com/maps?q=${p.location.lat},${p.location.lng}`,target:"_blank",rel:"noreferrer",className:"text-[11px] font-bold text-sky-700 hover:underline shrink-0",children:"เปิด Google Maps ↗"}):e.jsx("span",{className:"text-[10px] text-slate-400 font-medium shrink-0",children:"📍 ยังไม่ได้ระบุพิกัด GPS"})]})]}),W&&m&&e.jsxs("div",{className:"p-3.5 rounded-xl border border-sky-200 bg-sky-50/50 space-y-3",children:[e.jsxs("div",{className:"text-[11px] font-bold text-sky-900 flex items-center justify-between",children:[e.jsxs("span",{className:"flex items-center gap-1.5",children:[e.jsx(un,{className:"w-3.5 h-3.5 text-sky-600"}),e.jsx("span",{children:"สเปกพื้นที่ & เงื่อนไขสัญญาเช่า (Location Scouting Specs)"})]}),e.jsxs("span",{className:"text-[10px] px-2 py-0.5 rounded-full bg-white text-sky-800 font-mono font-bold border border-sky-200",children:[m.zoneOrFloor," ",m.unitNumber?`(${m.unitNumber})`:""]})]}),e.jsxs("div",{className:"grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs",children:[e.jsxs("div",{className:"bg-white p-2 rounded-lg border border-slate-200 text-center",children:[e.jsx("div",{className:"text-[10px] text-slate-500 font-bold",children:"ขนาดพื้นที่"}),e.jsxs("div",{className:"font-extrabold text-sm text-slate-900 font-mono mt-0.5",children:[((Jt=m.spaceSpecs)==null?void 0:Jt.usableAreaSqm)||"-"," ",e.jsx("span",{className:"text-[10px] font-normal text-slate-500",children:"ตร.ม."})]})]}),e.jsxs("div",{className:"bg-white p-2 rounded-lg border border-slate-200 text-center",children:[e.jsx("div",{className:"text-[10px] text-slate-500 font-bold",children:"หน้ากว้าง / เพดาน"}),e.jsxs("div",{className:"font-extrabold text-sm text-slate-900 font-mono mt-0.5",children:[((Yt=m.spaceSpecs)==null?void 0:Yt.frontageWidthM)||"-","ม. / ",((Wt=m.spaceSpecs)==null?void 0:Wt.ceilingHeightM)||"-","ม."]})]}),e.jsxs("div",{className:"bg-white p-2 rounded-lg border border-slate-200 text-center",children:[e.jsx("div",{className:"text-[10px] text-slate-500 font-bold",children:"ค่าเช่ารายเดือน"}),e.jsx("div",{className:"font-extrabold text-sm text-amber-950 font-mono mt-0.5 truncate",children:(Zt=m.leaseTerms)!=null&&Zt.monthlyRentThb?e.jsxs(e.Fragment,{children:["฿",m.leaseTerms.monthlyRentThb.toLocaleString()]}):(Xt=m.leaseTerms)!=null&&Xt.monthlyRentRmb?e.jsxs(e.Fragment,{children:["¥",m.leaseTerms.monthlyRentRmb.toLocaleString()]}):e.jsx("span",{className:"text-slate-400",children:"สอบถาม"})})]}),e.jsxs("div",{className:"bg-white p-2 rounded-lg border border-slate-200 text-center",children:[e.jsx("div",{className:"text-[10px] text-slate-500 font-bold",children:"เงื่อนไขสัญญา"}),e.jsxs("div",{className:"font-extrabold text-xs text-slate-900 font-mono mt-0.5 truncate",children:["สัญญา ",((es=m.leaseTerms)==null?void 0:es.leasePeriodYears)||3," ปี · ประกัน ",((ts=m.leaseTerms)==null?void 0:ts.depositMonths)||3," ด."]})]})]}),e.jsxs("div",{className:"flex flex-wrap items-center gap-1.5 pt-1 text-xs",children:[e.jsxs("span",{className:"px-2 py-0.5 rounded-md bg-white border border-slate-200 text-slate-700 font-semibold flex items-center gap-1",children:[e.jsx(us,{className:"w-3 h-3 text-amber-500"}),e.jsxs("span",{children:["สเปกไฟ: ",((ss=m.spaceSpecs)==null?void 0:ss.electricalPower)||"3 เฟส 45 kVA"]})]}),e.jsxs("span",{className:"px-2 py-0.5 rounded-md bg-white border border-slate-200 text-slate-700 font-semibold flex items-center gap-1",children:[e.jsx(hn,{className:"w-3 h-3 text-blue-500"}),e.jsxs("span",{children:["ท่อน้ำดี: ",(ns=m.spaceSpecs)!=null&&ns.hasWaterInflow?"✓ มีในห้อง":"✗ ไม่มี"]})]}),e.jsxs("span",{className:"px-2 py-0.5 rounded-md bg-white border border-slate-200 text-slate-700 font-semibold flex items-center gap-1",children:[e.jsx(pn,{className:"w-3 h-3 text-teal-500"}),e.jsxs("span",{children:["ท่อน้ำทิ้ง: ",(rs=m.spaceSpecs)!=null&&rs.hasDrainage?"✓ มีในห้อง":"✗ ไม่มี"]})]}),e.jsxs("span",{className:"px-2 py-0.5 rounded-md bg-white border border-slate-200 text-slate-700 font-semibold flex items-center gap-1",children:[e.jsx(fn,{className:"w-3 h-3 text-purple-500"}),e.jsxs("span",{children:["ดักไขมัน: ",(as=m.spaceSpecs)!=null&&as.hasGreaseTrap?"✓ มีรองรับ":"✗ ต้องติดตั้งเอง"]})]}),((os=m.spaceSpecs)==null?void 0:os.riderAccessNotes)&&e.jsxs("span",{className:"px-2 py-0.5 rounded-md bg-white border border-slate-200 text-slate-700 font-semibold flex items-center gap-1",children:[e.jsx(mn,{className:"w-3 h-3 text-emerald-600"}),e.jsxs("span",{children:["ไรเดอร์: ",m.spaceSpecs.riderAccessNotes]})]})]}),m.handoffNotes&&e.jsxs("div",{className:"pt-2 border-t border-sky-200/80 text-xs",children:[e.jsx("span",{className:"font-bold text-sky-900 block mb-0.5",children:"ประเด็นเจรจา / ส่งมอบงาน:"}),e.jsx("p",{className:"text-slate-800 whitespace-pre-wrap",children:m.handoffNotes})]})]}),(_&&(a==null?void 0:a.memo)||!_&&(u==null?void 0:u.tastingNotes))&&e.jsxs("div",{className:`p-3.5 rounded-xl border space-y-1 ${_?"bg-emerald-50/50 border-emerald-200/80":"bg-amber-50/50 border-amber-200/80"}`,children:[e.jsxs("div",{className:"text-[11px] font-bold text-slate-600 flex items-center gap-1.5",children:[e.jsx("i",{className:`fa-solid ${_?"fa-clipboard-check text-emerald-600":"fa-quote-left text-amber-600"} text-[10px]`}),e.jsx("span",{children:_?"บันทึกหน้างาน / รายละเอียดหลัก:":"บันทึกรีวิวรสชาติ & ไอเดียเรฟ:"})]}),e.jsx("p",{className:"text-xs sm:text-[13px] text-slate-900 leading-relaxed whitespace-pre-wrap font-medium",children:_?a==null?void 0:a.memo:u==null?void 0:u.tastingNotes})]}),_&&a&&(a.catalogItems||[]).length>0&&e.jsxs("div",{className:"space-y-2",children:[e.jsx("div",{className:"flex items-center justify-between",children:e.jsxs("span",{className:"text-xs font-bold text-slate-800",children:["รายการอุปกรณ์ & สินค้า (",(a.catalogItems||[]).length," รายการ):"]})}),e.jsx("div",{className:"grid grid-cols-1 sm:grid-cols-2 gap-3",children:(a.catalogItems||[]).map((d,g)=>e.jsxs("div",{className:"p-3 rounded-xl border border-slate-200 bg-white flex gap-3 shadow-xs",children:[d.photo?e.jsx("img",{src:d.photo,alt:"",onClick:()=>jt(d.photo),className:"w-16 h-16 rounded-lg object-cover cursor-pointer border border-slate-100 hover:opacity-90"}):e.jsx("div",{className:"w-16 h-16 rounded-lg bg-slate-100 border border-slate-200 flex items-center justify-center text-slate-400 text-xs",children:"ไม่มีรูป"}),e.jsxs("div",{className:"min-w-0 flex-1 space-y-1",children:[e.jsx("div",{className:"font-bold text-xs text-slate-900 truncate",children:d.name||`รายการที่ ${g+1}`}),d.priceRmb&&e.jsxs("div",{className:"text-xs font-mono font-bold text-emerald-700",children:["¥",d.priceRmb," ",e.jsxs("span",{className:"text-[11px] font-normal text-slate-500",children:["(≈",r(d.priceRmb).toLocaleString(),"฿)"]})]}),d.priceThb&&!d.priceRmb&&e.jsxs("div",{className:"text-xs font-mono font-bold text-emerald-700",children:["฿",d.priceThb.toLocaleString()]}),d.weightKg&&e.jsxs("div",{className:"text-[11px] text-slate-500",children:["น้ำหนัก: ",e.jsx("span",{className:"font-mono",children:d.weightKg})]}),d.memo&&e.jsx("p",{className:"text-[11px] text-slate-600 whitespace-pre-wrap leading-relaxed",children:d.memo}),de(d).length>0&&e.jsx("div",{className:"space-y-1 pt-1",children:de(d).map((C,V)=>e.jsxs("div",{className:"flex flex-col sm:flex-row sm:items-center gap-1 bg-emerald-50/90 p-1.5 rounded-lg border border-emerald-200/80",children:[e.jsxs("span",{className:"text-[10px] font-bold text-emerald-900 truncate min-w-0 flex items-center gap-1",children:[e.jsx(Ae,{className:"w-3 h-3 text-emerald-600 shrink-0"}),e.jsx("span",{className:"truncate",children:C.label||`เสียง #${V+1}`}),C.durationSec?`(${C.durationSec}s)`:""]}),C.url&&e.jsx("audio",{controls:!0,preload:"metadata",playsInline:!0,src:C.url,className:"h-6 w-full sm:w-44 shrink-0"})]},V))})]})]},d.id||g))})]}),!_&&u&&(u.drinkItems||[]).length>0&&e.jsxs("div",{className:"space-y-2",children:[e.jsx("div",{className:"flex items-center justify-between",children:e.jsxs("span",{className:"text-xs font-bold text-slate-800",children:["เมนูที่ชิม & ถอดรหัสสูตร (",(u.drinkItems||[]).length," เมนู):"]})}),e.jsx("div",{className:"grid grid-cols-1 sm:grid-cols-2 gap-3",children:(u.drinkItems||[]).map((d,g)=>e.jsxs("div",{className:"p-3 rounded-xl border border-amber-200/80 bg-amber-50/20 flex gap-3 shadow-xs",children:[d.photo&&e.jsx("img",{src:d.photo,alt:"",onClick:()=>jt(d.photo),className:"w-16 h-16 rounded-lg object-cover cursor-pointer border border-amber-200"}),e.jsxs("div",{className:"min-w-0 flex-1 space-y-1",children:[e.jsx("div",{className:"font-bold text-xs text-slate-900 truncate",children:d.name||`แก้วที่ #${g+1}`}),d.priceRmb&&e.jsxs("div",{className:"text-xs font-mono font-bold text-amber-700",children:["¥",d.priceRmb," ",e.jsxs("span",{className:"text-[11px] font-normal text-slate-500",children:["(≈",r(d.priceRmb),"฿)"]})]}),d.fitMenuTarget&&e.jsxs("div",{className:"text-[11px] font-semibold text-emerald-700",children:["ต่อยอด: ",d.fitMenuTarget]}),d.gimmickNotes&&e.jsx("p",{className:"text-[11px] text-slate-600",children:d.gimmickNotes}),de(d).length>0&&e.jsx("div",{className:"space-y-1 pt-1",children:de(d).map((C,V)=>e.jsxs("div",{className:"flex flex-col sm:flex-row sm:items-center gap-1 bg-amber-50/90 p-1.5 rounded-lg border border-amber-200/80",children:[e.jsxs("span",{className:"text-[10px] font-bold text-amber-900 truncate min-w-0 flex items-center gap-1",children:[e.jsx(Ae,{className:"w-3 h-3 text-amber-600 shrink-0"}),e.jsx("span",{className:"truncate",children:C.label||`เสียง #${V+1}`}),C.durationSec?`(${C.durationSec}s)`:""]}),C.url&&e.jsx("audio",{controls:!0,preload:"metadata",playsInline:!0,src:C.url,className:"h-6 w-full sm:w-44 shrink-0"})]},V))})]})]},d.id||g))})]}),e.jsxs("div",{className:"space-y-2",children:[e.jsxs("span",{className:"text-xs font-bold text-slate-800 block",children:["แกลเลอรีรูปภาพทั้งหมด (",z.length," รูป",z.length>0?" — แตะเพื่อขยายและเลื่อนซ้าย-ขวา":"","):"]}),z.length>0?e.jsx("div",{className:"grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2",children:z.map((d,g)=>e.jsxs("div",{onClick:()=>$(g),className:"group relative h-44 sm:h-48 rounded-xl overflow-hidden border border-slate-200 cursor-pointer bg-slate-900/5 shadow-xs flex items-center justify-center p-1",children:[e.jsx("img",{src:d.url,alt:d.label||"",className:"w-full h-full object-contain group-hover:scale-105 transition-transform duration-200"}),e.jsxs("div",{className:"absolute bottom-1 right-1 bg-black/60 text-white text-[9px] font-mono px-1.5 py-0.5 rounded",children:[g+1,"/",z.length]}),e.jsx("div",{className:"absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center text-[10px] text-white p-1 text-center font-medium",children:d.label})]},g))}):e.jsx("div",{className:"p-4 rounded-xl bg-slate-50 border border-dashed border-slate-200 text-center text-xs text-slate-400",children:"ยังไม่มีรูปภาพที่แนบไว้ในรายการนี้"})]}),p.videos&&p.videos.length>0&&e.jsxs("div",{className:"space-y-2 pt-1",children:[e.jsxs("span",{className:"text-xs font-bold text-slate-800 flex items-center gap-1.5",children:[e.jsx("i",{className:"fa-solid fa-video text-purple-600"}),e.jsxs("span",{children:["คลิปวิดีโอของรายการนี้ (",p.videos.length," คลิป):"]})]}),e.jsx("div",{className:"grid grid-cols-1 sm:grid-cols-2 gap-3",children:p.videos.map((d,g)=>e.jsx(Cn,{src:d,className:"rounded-2xl border border-slate-200 shadow-sm h-48 sm:h-56",videoClassName:"object-contain",badgeLabel:`คลิปที่ ${g+1}`},g))})]}),p.attachedFiles&&p.attachedFiles.length>0&&e.jsxs("div",{id:"detail-attached-files-section",className:"space-y-2 pt-1 scroll-mt-6",children:[e.jsxs("div",{className:"flex items-center justify-between",children:[e.jsxs("span",{className:"text-xs font-bold text-slate-800 flex items-center gap-1.5",children:[e.jsx(cs,{className:"w-3.5 h-3.5 text-sky-600"}),e.jsxs("span",{children:["เอกสารและไฟล์แนบ (",p.attachedFiles.length," รายการ):"]})]}),e.jsx("span",{className:"text-[10px] text-slate-400",children:"แตะเพื่อเปิดดูบน Google Drive / เบราว์เซอร์"})]}),e.jsx("div",{className:"grid grid-cols-1 sm:grid-cols-2 gap-2",children:p.attachedFiles.map(d=>{const g=En(d.name,d.mimeType),C=g.icon;return e.jsxs("a",{href:d.url,target:"_blank",rel:"noopener noreferrer",onClick:V=>{d.url.startsWith("data:")&&(V.preventDefault(),An(d.url,d.name))},className:"bg-white rounded-xl border border-slate-200/90 hover:border-sky-300 hover:shadow-xs p-3 flex items-center justify-between gap-3 transition-all group cursor-pointer",children:[e.jsxs("div",{className:"flex items-center gap-2.5 min-w-0 flex-1",children:[e.jsxs("div",{className:`w-9 h-9 rounded-xl border flex flex-col items-center justify-center shrink-0 shadow-2xs ${g.colorClasses}`,children:[e.jsx(C,{className:"w-4 h-4"}),e.jsx("span",{className:"text-[8px] font-extrabold uppercase leading-none mt-0.5",children:g.label})]}),e.jsxs("div",{className:"min-w-0 flex-1",children:[e.jsx("p",{className:"font-bold text-xs text-slate-800 truncate group-hover:text-sky-700 transition-colors",children:d.name}),e.jsxs("div",{className:"flex items-center gap-1.5 text-[10px] text-slate-500 mt-0.5",children:[e.jsx("span",{className:"font-medium",children:Sn(d.size)}),d.uploadedAt&&e.jsxs(e.Fragment,{children:[e.jsx("span",{children:"•"}),e.jsx("span",{children:new Date(d.uploadedAt).toLocaleDateString("th-TH")})]})]})]})]}),e.jsxs("span",{className:"px-2.5 py-1 rounded-lg bg-sky-50 text-sky-700 group-hover:bg-sky-600 group-hover:text-white text-[11px] font-bold transition-all flex items-center gap-1 shrink-0",children:[e.jsx("span",{children:"เปิดไฟล์"}),e.jsx(xn,{className:"w-3 h-3"})]})]},d.id)})})]}),e.jsxs("div",{id:"detail-comments-section",className:"p-4 bg-slate-50 rounded-xl border border-slate-200/80 space-y-3",children:[e.jsxs("div",{className:"flex items-center justify-between",children:[e.jsxs("span",{className:"text-xs font-bold text-slate-800 flex items-center gap-1.5",children:[e.jsx(gn,{className:"w-3.5 h-3.5 text-blue-600"}),e.jsx("span",{children:"ช่องความเห็นทีมงาน & ตอบกลับต่อเนื่อง (Threaded Comments)"})]}),e.jsxs("span",{className:"text-[11px] text-slate-400 font-mono",children:[p.reviewerNotes.length," หัวข้อสนทนา"]})]}),e.jsx("div",{className:"space-y-2.5",children:p.reviewerNotes.length===0?e.jsx("p",{className:"text-xs text-slate-400 py-3 text-center",children:"ยังไม่มีความเห็น สามารถพิมพ์บันทึกหรือตรวจสอบสเปกได้ด้านล่าง"}):p.reviewerNotes.map(d=>{var V,J,he,Ne,re;const g=d.replies||[],C=Ie[d.id];return e.jsxs("div",{className:"p-3 bg-white rounded-xl border border-slate-200/70 shadow-xs space-y-2",children:[e.jsxs("div",{className:"flex items-start gap-2.5",children:[e.jsx(Ke,{src:d.authorAvatar,className:"w-7 h-7 rounded-full object-cover shrink-0 mt-0.5 ring-1 ring-slate-200"}),e.jsxs("div",{className:"min-w-0 flex-1",children:[e.jsxs("div",{className:"flex items-center justify-between text-[11px] mb-0.5",children:[e.jsx("span",{className:"font-bold text-slate-900",children:d.author}),e.jsx("span",{className:"text-slate-400 font-mono text-[10px]",children:new Date(d.timestamp).toLocaleTimeString("th-TH",{hour:"2-digit",minute:"2-digit"})})]}),e.jsx("p",{className:"text-xs text-slate-700 leading-relaxed",children:d.text}),d.photoUrl&&e.jsx("div",{className:"mt-1.5",children:e.jsx("img",{src:d.photoUrl,alt:"ภาพแนบ",className:"max-h-48 max-w-xs rounded-xl border border-slate-200 object-cover cursor-pointer hover:opacity-95 shadow-2xs",onClick:()=>window.open(d.photoUrl,"_blank")})}),(d.voiceUrl||d.audioUrl)&&e.jsxs("div",{className:"mt-1.5 flex items-center gap-2 bg-slate-50 p-2 rounded-xl border border-slate-200/80 max-w-sm",children:[e.jsx(Ae,{className:"w-4 h-4 text-emerald-600 shrink-0"}),e.jsx("audio",{controls:!0,src:d.voiceUrl||d.audioUrl,className:"h-7 w-full"})]}),e.jsxs("div",{className:"flex items-center gap-3 mt-1.5 text-[11px] font-bold",children:[U&&e.jsxs("button",{type:"button",onClick:()=>ae((G==null?void 0:G.noteId)===d.id&&G.author===d.author?null:{noteId:d.id,author:d.author}),className:"text-blue-600 hover:text-blue-800 flex items-center gap-1",children:[e.jsx(hs,{className:"w-3 h-3"}),e.jsx("span",{children:"ตอบกลับ"})]}),g.length>0&&e.jsx("button",{type:"button",onClick:()=>ye(M=>({...M,[d.id]:!M[d.id]})),className:"text-slate-500 hover:text-slate-800 flex items-center gap-1",children:C?e.jsxs(e.Fragment,{children:[e.jsx(bn,{className:"w-3 h-3"}),e.jsxs("span",{children:["ดูการตอบกลับ (",g.length,")"]})]}):e.jsxs(e.Fragment,{children:[e.jsx(vn,{className:"w-3 h-3"}),e.jsxs("span",{children:["ย่อการตอบกลับ (",g.length,")"]})]})})]})]})]}),g.length>0&&!C&&e.jsx("div",{className:"ml-6 pl-3 border-l-2 border-blue-200 space-y-2 pt-1",children:g.map(M=>e.jsxs("div",{className:"p-2.5 bg-slate-50 rounded-xl border border-slate-200/60 text-xs space-y-1",children:[e.jsxs("div",{className:"flex items-center justify-between text-[10px]",children:[e.jsxs("div",{className:"flex items-center gap-1.5 font-bold text-slate-800",children:[e.jsx(Ke,{src:M.authorAvatar,className:"w-4 h-4 rounded-full object-cover"}),e.jsx("span",{children:M.author}),M.replyToAuthor&&e.jsxs("span",{className:"text-blue-600 font-normal",children:["▸ ตอบกลับ @",M.replyToAuthor]})]}),e.jsx("span",{className:"text-slate-400 font-mono",children:new Date(M.timestamp).toLocaleTimeString("th-TH",{hour:"2-digit",minute:"2-digit"})})]}),e.jsx("p",{className:"text-slate-700 leading-snug",children:M.text}),M.photoUrl&&e.jsx("div",{className:"mt-1",children:e.jsx("img",{src:M.photoUrl,alt:"ภาพแนบ",className:"max-h-36 max-w-[200px] rounded-lg border border-slate-200 object-cover cursor-pointer hover:opacity-95 shadow-2xs",onClick:()=>window.open(M.photoUrl,"_blank")})}),(M.voiceUrl||M.audioUrl)&&e.jsxs("div",{className:"mt-1 flex items-center gap-1.5 bg-white p-1.5 rounded-lg border border-slate-200 max-w-[240px]",children:[e.jsx(Ae,{className:"w-3.5 h-3.5 text-blue-600 shrink-0"}),e.jsx("audio",{controls:!0,src:M.voiceUrl||M.audioUrl,className:"h-6 w-full"})]}),e.jsx("div",{children:U&&e.jsxs("button",{type:"button",onClick:()=>ae({noteId:d.id,author:M.author}),className:"text-[10px] font-bold text-blue-600 hover:underline inline-flex items-center gap-0.5",children:[e.jsx(hs,{className:"w-2.5 h-2.5"}),e.jsxs("span",{children:["ตอบกลับ @",M.author," ต่อ"]})]})})]},M.id))}),U&&(G==null?void 0:G.noteId)===d.id&&e.jsxs("div",{className:"mt-2 pt-2 border-t border-slate-100 space-y-1.5 animate-in fade-in",children:[(((V=Y[d.id])==null?void 0:V.photoUrl)||((J=Y[d.id])==null?void 0:J.voiceUrl))&&e.jsxs("div",{className:"flex flex-wrap items-center gap-1.5 text-[10px]",children:[((he=Y[d.id])==null?void 0:he.photoUrl)&&e.jsxs("span",{className:"inline-flex items-center gap-1 px-1.5 py-0.5 rounded bg-emerald-50 text-emerald-800 border border-emerald-200",children:[e.jsx(Oe,{className:"w-3 h-3"})," ภาพพร้อมแนบ",e.jsx("button",{type:"button",onClick:()=>ee(M=>({...M,[d.id]:{...M[d.id],photoUrl:void 0}})),children:e.jsx(Se,{className:"w-2.5 h-2.5"})})]}),((Ne=Y[d.id])==null?void 0:Ne.voiceUrl)&&e.jsxs("span",{className:"inline-flex items-center gap-1.5 px-2 py-0.5 rounded bg-blue-50 text-blue-800 border border-blue-200",children:[e.jsx(ze,{className:"w-3 h-3"})," เสียงอัดสดพร้อมส่ง",e.jsx("audio",{controls:!0,src:(re=Y[d.id])==null?void 0:re.voiceUrl,className:"h-6 w-32"}),e.jsx("button",{type:"button",onClick:()=>ee(M=>({...M,[d.id]:{...M[d.id],voiceUrl:void 0}})),children:e.jsx(Se,{className:"w-2.5 h-2.5"})})]})]}),e.jsxs("div",{className:"flex gap-1.5 items-center flex-wrap sm:flex-nowrap",children:[e.jsx("input",{type:"text",placeholder:`ตอบกลับ @${G.author} ในฐานะ ${s.alias}...`,value:ue[d.id]||"",onChange:M=>fe({...ue,[d.id]:M.target.value}),className:"flex-1 min-w-[140px] bg-slate-50 border border-blue-300 rounded-lg px-2.5 py-1.5 text-xs text-slate-900 focus:outline-none focus:border-blue-500",autoFocus:!0,onKeyDown:M=>{M.key==="Enter"&&(M.preventDefault(),$t(d.id,G.author))}}),e.jsx("button",{type:"button",title:"แนบรูปภาพในคำตอบกลับ",onClick:()=>{const M=document.createElement("input");M.type="file",M.accept="image/*",M.onchange=Ye=>{var Me,He;const Ve=(He=(Me=Ye.target)==null?void 0:Me.files)==null?void 0:He[0];Ve&&Je(Ve,"photo",d.id)},M.click()},className:"p-1.5 rounded-lg border border-slate-200 hover:bg-slate-100 text-slate-500",children:e.jsx(Oe,{className:"w-3.5 h-3.5"})}),e.jsxs("button",{type:"button",title:te===d.id?"กดเพื่อหยุดอัดเสียงสด":"กดเพื่ออัดเสียงสดในคำตอบกลับ",disabled:oe,onClick:()=>void kt(d.id),className:`px-2 py-1.5 rounded-lg border text-[11px] font-bold inline-flex items-center gap-1 transition-all ${te===d.id?"bg-rose-600 text-white border-rose-600 animate-pulse":"bg-white border-slate-200 hover:border-blue-500 hover:bg-blue-50 text-slate-600 hover:text-blue-700"}`,children:[e.jsx(ze,{className:"w-3.5 h-3.5"}),e.jsx("span",{children:te===d.id?`หยุดอัด (${Be}s)`:"อัดเสียงสด"})]}),e.jsx("button",{type:"button",onClick:()=>$t(d.id,G.author),className:"px-3 py-1.5 rounded-lg bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold",children:"ส่ง"}),U&&e.jsx("button",{type:"button",onClick:()=>ae(null),className:"px-2 py-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-600 text-xs",children:"ยกเลิก"})]})]})]},d.id)})}),e.jsxs("div",{className:"pt-2 border-t border-slate-200/60 space-y-1.5",children:[e.jsx("div",{className:"flex items-center justify-between text-[11px] text-slate-500",children:e.jsxs("span",{className:"font-semibold flex items-center gap-1",children:[e.jsx(us,{className:"w-3 h-3 text-amber-500"})," ข้อความด่วน (แตะเพื่อพิมพ์ทันที):"]})}),e.jsx("div",{className:"flex items-center gap-1.5 overflow-x-auto no-scrollbar py-0.5",children:P.map(d=>e.jsxs("button",{type:"button",onClick:()=>L(d.text),className:"px-2.5 py-1 rounded-lg bg-white border border-slate-200 hover:border-blue-400 text-[11px] text-slate-700 whitespace-nowrap active:scale-95 transition-all shadow-xs",title:d.text,children:[e.jsx("i",{className:"fa-solid fa-bolt text-amber-500 mr-1 text-[10px]"}),e.jsx("span",{children:d.title})]},d.id))})]}),s.role==="viewer"?null:e.jsxs("form",{onSubmit:Ws,className:"space-y-2 pt-1",children:[(X||ie||oe)&&e.jsxs("div",{className:"flex flex-wrap items-center gap-2 px-1",children:[X&&e.jsxs("div",{className:"flex items-center gap-1.5 px-2 py-1 bg-emerald-50 border border-emerald-200 rounded-lg text-xs text-emerald-800",children:[e.jsx(Oe,{className:"w-3.5 h-3.5 text-emerald-600"}),e.jsx("span",{className:"truncate max-w-[120px]",children:"รูปภาพพร้อมแนบ"}),e.jsx("button",{type:"button",onClick:()=>me(null),className:"text-slate-400 hover:text-rose-600",children:e.jsx(Se,{className:"w-3 h-3"})})]}),ie&&e.jsxs("div",{className:"flex items-center gap-1.5 px-2 py-1 bg-blue-50 border border-blue-200 rounded-lg text-xs text-blue-800",children:[e.jsx(ze,{className:"w-3.5 h-3.5 text-blue-600"}),e.jsx("span",{children:"เสียงอัดสด:"}),e.jsx("audio",{controls:!0,src:ie,className:"h-6 w-36"}),e.jsx("button",{type:"button",onClick:()=>je(null),className:"text-slate-400 hover:text-rose-600",children:e.jsx(Se,{className:"w-3 h-3"})})]}),oe&&e.jsxs("div",{className:"flex items-center gap-1.5 text-xs text-blue-600 font-medium",children:[e.jsx(wn,{className:"w-3.5 h-3.5 animate-spin"}),e.jsx("span",{children:"กำลังอัปโหลดไฟล์สื่อ..."})]})]}),e.jsxs("div",{className:"flex gap-1.5 items-center flex-wrap sm:flex-nowrap",children:[e.jsx("input",{ref:le,type:"file",accept:"image/*",className:"hidden",onChange:d=>{var C;const g=(C=d.target.files)==null?void 0:C[0];g&&Je(g,"photo"),d.target.value=""}}),e.jsx("input",{type:"text",placeholder:`พิมพ์ข้อคิดเห็นใหม่ในฐานะ ${s.alias}...`,value:I,onChange:d=>L(d.target.value),className:"flex-1 min-w-[140px] h-8 bg-white border border-slate-200 rounded-lg px-2.5 text-xs text-slate-900 focus:outline-none focus:border-blue-500 shadow-2xs"}),e.jsxs("button",{type:"button",title:"แนบรูปภาพ",disabled:oe,onClick:()=>{var d;return(d=le.current)==null?void 0:d.click()},className:"h-8 px-2.5 rounded-lg border border-slate-200 bg-white hover:border-emerald-500 hover:bg-emerald-50 text-slate-600 hover:text-emerald-700 text-[11px] font-bold inline-flex items-center justify-center gap-1 transition-colors shrink-0",children:[e.jsx(Oe,{className:"w-3.5 h-3.5"}),e.jsx("span",{className:"hidden sm:inline",children:"รูปภาพ"})]}),e.jsxs("button",{type:"button",title:te==="main"?"กดเพื่อหยุดอัดเสียงสด":"กดเพื่ออัดเสียงสดในคอมเมนต์",disabled:oe,onClick:()=>void kt("main"),className:`h-8 px-2.5 rounded-lg border text-[11px] font-bold inline-flex items-center justify-center gap-1 transition-all shrink-0 ${te==="main"?"bg-rose-600 text-white border-rose-600 animate-pulse shadow-xs":"bg-white border-slate-200 hover:border-blue-500 hover:bg-blue-50 text-slate-700 hover:text-blue-700"}`,children:[e.jsx(ze,{className:"w-3.5 h-3.5"}),e.jsx("span",{children:te==="main"?`หยุดอัด (${Be}s)`:"อัดเสียงสด"})]}),e.jsxs("button",{type:"submit",disabled:oe||te==="main",className:"h-8 px-3 rounded-lg bg-blue-600 hover:bg-blue-700 text-white text-[11px] font-bold shadow-2xs active:scale-95 transition-all inline-flex items-center justify-center gap-1 shrink-0 disabled:opacity-50",children:[e.jsx(yn,{className:"w-3 h-3"}),e.jsx("span",{children:"โพสต์"})]})]})]})]}),e.jsx(Pn,{item:p,users:y},p.id)]}),e.jsxs("div",{className:"p-3 sm:p-3.5 border-t border-slate-100 bg-white flex items-center justify-between gap-2 select-none",children:[e.jsxs("div",{className:"text-[11px] text-slate-400 font-mono truncate hidden sm:block",children:["ID: ",p.id," · ปรับปรุง:"," ",new Date(p.updatedAt).toLocaleTimeString("th-TH")]}),e.jsxs("div",{className:"flex items-center justify-end gap-1.5 sm:gap-2 w-full sm:w-auto",children:[f&&e.jsxs("button",{type:"button",onClick:Nt,className:"px-2.5 sm:px-3 py-1.5 text-xs font-bold rounded-xl bg-rose-50 hover:bg-rose-100 text-rose-700 border border-rose-200 flex items-center justify-center gap-1.5 transition-colors whitespace-nowrap active:scale-95 shrink-0",title:"ลบรายการ",children:[e.jsx(ds,{className:"w-3.5 h-3.5 text-rose-600 shrink-0"}),e.jsx("span",{children:"ลบรายการ"})]}),q&&e.jsxs("button",{type:"button",onClick:()=>v(p),className:"px-2.5 sm:px-3.5 py-1.5 text-xs font-bold rounded-xl bg-amber-50 hover:bg-amber-100 text-amber-800 border border-amber-300 flex items-center justify-center gap-1.5 transition-colors whitespace-nowrap active:scale-95 shrink-0",children:[e.jsx(ls,{className:"w-3.5 h-3.5 text-amber-600 shrink-0"}),e.jsx("span",{children:"แก้ไขข้อมูล"})]}),e.jsx("button",{onClick:c,className:"px-3.5 sm:px-4 py-1.5 text-xs font-bold rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 transition-colors whitespace-nowrap active:scale-95 shrink-0",children:"ปิด"})]})]})]}),j!==null&&z[j]&&e.jsxs("div",{className:"fixed inset-0 z-[140] bg-black/92 backdrop-blur-md flex flex-col items-center justify-between p-3 sm:p-6 select-none",onClick:()=>$(null),children:[e.jsxs("div",{className:"w-full max-w-4xl flex items-center justify-between text-white z-10",onClick:d=>d.stopPropagation(),children:[e.jsxs("div",{className:"flex items-center gap-2",children:[e.jsxs("span",{className:"px-2.5 py-1 rounded-full bg-white/15 font-mono text-xs font-bold",children:["รูปที่ ",j+1," / ",z.length]}),e.jsx("span",{className:"text-xs sm:text-sm font-semibold text-white/90 truncate max-w-[240px] sm:max-w-md",children:z[j].label})]}),e.jsx("button",{type:"button",onClick:()=>$(null),className:"w-9 h-9 rounded-full bg-white/15 hover:bg-white/25 text-white flex items-center justify-center transition-colors",children:e.jsx(Se,{className:"w-5 h-5"})})]}),e.jsxs("div",{className:"relative flex-1 w-full max-w-5xl flex items-center justify-center my-2",onClick:d=>d.stopPropagation(),children:[z.length>1&&e.jsx("button",{type:"button",onClick:()=>$((j-1+z.length)%z.length),className:"absolute left-1 sm:left-3 z-20 w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-black/60 hover:bg-black/80 border border-white/25 text-white flex items-center justify-center shadow-lg active:scale-95 transition-all",title:"รูปก่อนหน้า (◀)",children:e.jsx(jn,{className:"w-6 h-6"})}),e.jsx("img",{src:z[j].url,alt:z[j].label,className:"max-w-full max-h-[72vh] object-contain rounded-xl shadow-2xl"}),z.length>1&&e.jsx("button",{type:"button",onClick:()=>$((j+1)%z.length),className:"absolute right-1 sm:right-3 z-20 w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-black/60 hover:bg-black/80 border border-white/25 text-white flex items-center justify-center shadow-lg active:scale-95 transition-all",title:"รูปถัดไป (▶)",children:e.jsx(Nn,{className:"w-6 h-6"})})]}),z.length>1&&e.jsx("div",{className:"w-full max-w-3xl flex items-center justify-center gap-2 overflow-x-auto py-1 z-10",onClick:d=>d.stopPropagation(),children:z.map((d,g)=>e.jsx("button",{type:"button",onClick:()=>$(g),className:`relative w-12 h-12 sm:w-14 sm:h-14 rounded-lg overflow-hidden shrink-0 border-2 transition-all ${g===j?"border-emerald-400 scale-105 shadow-md":"border-white/20 opacity-60 hover:opacity-100"}`,children:e.jsx("img",{src:d.url,className:"w-full h-full object-cover"})},g))})]})]})};export{dr as DetailModal};
