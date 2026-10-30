import{c as Zs,r as K,j as e,G as qe,Q as Xs,ad as en,a4 as oe,u as tn,ae as Ne,a5 as sn,w as os,X as ke,P as is,T as ls,$ as nn,V as rn,l as an,_ as $e,H as on,Y as Be,af as cs,i as ln,O as cn,Z as ds,a6 as dn,R as hn,h as un,ag as pn,K as mn,k as fn,ah as hs,a7 as xn,ai as gn,W as ze,p as bn,f as vn,a3 as wn,d as yn,a1 as jn}from"./index-DKjQ5Jww.js";import{F as Nn,V as kn}from"./VideoPlayer-D4umoKq6.js";import{g as $n,f as Cn,o as En}from"./AttachedFilesSection-nCWDQAO4.js";import{P as Sn}from"./printer-D7IrkEcq.js";/**
 * @license lucide-react v1.62.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Hs={name:"file-down",size:24,node:[["path",{d:"M6 22a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h8a2.4 2.4 0 0 1 1.704.706l3.588 3.588A2.4 2.4 0 0 1 20 8v12a2 2 0 0 1-2 2z",key:"1oefj6"}],["path",{d:"M14 2v5a1 1 0 0 0 1 1h5",key:"wfsgrz"}],["path",{d:"M12 18v-6",key:"17g6i2"}],["path",{d:"m9 15 3 3 3-3",key:"1npd3o"}]]};Hs.node;const Tn=Zs(Hs),pt=[["awaiting","รอรับช่วงต่อ"],["rfq_sent","ขอสเปก / ส่ง RFQ"],["sample_test","ทดสอบตัวอย่าง Lab/R&D"],["negotiate","ต่อรองราคา & MOQ"],["approved","ตัวเต็งอนุมัติ"],["ordered","สั่งซื้อสำเร็จ"]],Ee=t=>{const a=pt.findIndex(([c])=>c===t);return a<0?"ยังไม่ระบุ":`พาร์ท ${a+1}: ${pt[a][1]}`},Os={handoffStage:"พาร์ท",status:"สถานะรายการ",assignedTo:"ผู้รับผิดชอบ",targetFollowUpDate:"กำหนดติดตาม",handoffNotes:"หมายเหตุส่งต่อ",name:"ชื่อ",storeName:"ชื่อร้าน",chineseName:"ชื่อภาษาจีน",foreignName:"ชื่อต่างประเทศ",marketOrCity:"ตลาด / เมือง",city:"เมือง",category:"หมวดหมู่",storeCategory:"หมวดร้าน",rating:"คะแนน",ratings:"คะแนนประเมิน",quickTags:"ป้ายกำกับ",isFactory:"โรงงาน",phone:"โทรศัพท์",wechatId:"WeChat",lineId:"LINE",address:"ที่อยู่",location:"พิกัด",lat:"ละติจูด",lng:"ลองจิจูด",addressText:"ที่อยู่",photos:"รูปภาพ",storefrontAndAtmosphere:"หน้าร้าน / บรรยากาศ",contactCards:"นามบัตร",menuBoard:"ป้ายเมนู",drinkCups:"เครื่องดื่ม",floorPlanAndSpecs:"ผังพื้นที่",surroundingNeighbors:"บริเวณโดยรอบ",videos:"วิดีโอ",attachedFiles:"ไฟล์แนบ",voiceNotes:"เสียงบันทึก",voiceNoteUrl:"เสียงบันทึก",voiceDurationSec:"ความยาวเสียง (วินาที)",durationSec:"ความยาวเสียง (วินาที)",label:"ชื่อบันทึก",url:"ไฟล์",catalogItems:"สินค้า",drinkItems:"เมนูที่ทดลอง",photo:"รูปภาพ",priceRmb:"ราคา (หยวน)",priceThb:"ราคา (บาท)",dimensions:"ขนาด",weightKg:"น้ำหนัก",memo:"รายละเอียด",tastingNotes:"บันทึกการชิม",brandConcept:"แนวคิดแบรนด์",country:"ประเทศ",locationType:"ประเภททำเล",zoneOrFloor:"โซน / ชั้น",unitNumber:"เลขที่พื้นที่",spaceSpecs:"ข้อมูลพื้นที่",leaseTerms:"เงื่อนไขเช่า",size:"ขนาดไฟล์ (ไบต์)",uploadedAt:"วันที่แนบ",createdAt:"วันที่บันทึก",mimeType:"ประเภทไฟล์",isMockup:"ข้อมูลตัวอย่าง",taste:"รสชาติ",aesthetics:"ความสวยงาม",value:"ความคุ้มค่า",speed:"ความเร็ว",footTraffic:"คนสัญจร",visibility:"การมองเห็น",accessibility:"การเข้าถึง",valueRoi:"ความคุ้มค่าการลงทุน"},us=t=>Number.isNaN(Date.parse(t))?t:new Date(t).toLocaleString("th-TH",{dateStyle:"medium",timeStyle:"short"}),ps=/photos|photo|storefrontAndAtmosphere|contactCards|menuBoard|drinkCups|floorPlanAndSpecs|surroundingNeighbors/,Rn=t=>/^(https?:\/\/|\.\/|\/(?!\/)|data:(image|audio|video)\/)/i.test(t);function An({media:t,close:a}){const c=K.useRef(null);return K.useEffect(()=>{var r;(r=c.current)==null||r.showModal()},[]),Xs.createPortal(e.jsxs("dialog",{ref:c,onCancel:a,onClose:a,onClick:r=>{r.target===r.currentTarget&&a()},className:"fixed inset-0 m-auto max-w-[94vw] w-[900px] max-h-[90dvh] rounded-2xl p-4 backdrop:bg-black/70","aria-label":"สื่อจากประวัติ",children:[e.jsx("div",{className:"flex justify-end mb-3",children:e.jsx("button",{type:"button",autoFocus:!0,onClick:a,className:"rounded-lg px-4 py-2 bg-slate-100 font-bold",children:"ปิดสื่อ"})}),t.kind==="image"?e.jsx("img",{src:t.url,alt:"ภาพจากประวัติ",className:"max-h-[72dvh] max-w-full mx-auto object-contain"}):t.kind==="audio"?e.jsx("audio",{controls:!0,src:t.url,className:"w-full"}):e.jsx("video",{controls:!0,src:t.url,className:"max-h-[72dvh] w-full"})]}),document.body)}function we({value:t,field:a,users:c,preview:r}){var n;if(t==null||t===""||Array.isArray(t)&&!t.length)return e.jsx("span",{className:"text-slate-400",children:"ยังไม่ระบุ / ไม่มีข้อมูล"});if(Array.isArray(t))return e.jsx("div",{className:"space-y-2",children:t.map((l,o)=>e.jsx("div",{children:e.jsx(we,{value:l,field:a,users:c,preview:r})},o))});if(typeof t=="object")return e.jsx("dl",{className:"space-y-1",children:Object.entries(t).filter(([l])=>!["id","driveFileId"].includes(l)).map(([l,o])=>e.jsxs("div",{children:[e.jsx("dt",{className:"text-slate-500 text-[11px]",children:Os[l]||l}),e.jsx("dd",{children:e.jsx(we,{value:o,field:`${a}.${l}`,users:c,preview:r})})]},l))});if(typeof t=="boolean")return t?"ใช่":"ไม่ใช่";const s=String(t);if(a==="handoffStage")return Ee(s);if(a==="assignedTo")return((n=c.find(l=>l.id===s||l.alias===s||l.name===s))==null?void 0:n.alias)||s;if(a==="status")return{scouted:"สำรวจแล้ว",reviewing:"เทียบสเปก",rfq_sent:"ส่ง RFQ",shortlisted:"ตัวเต็ง",ordered:"สั่งซื้อแล้ว"}[s]||s;if(Rn(s)&&(/url$/i.test(a)||ps.test(a)||/videos|voice|audio/i.test(a))){const l=/voice|audio/i.test(a)?"audio":/video/i.test(a)?"video":ps.test(a)||/\.(png|jpe?g|webp|gif)(\?|$)/i.test(s)?"image":null;return l?e.jsx("button",{type:"button",onClick:()=>r({url:s,kind:l}),className:"text-emerald-700 underline text-left",children:l==="image"?e.jsx("img",{loading:"lazy",src:s,alt:"เปิดภาพจากประวัติ",className:"max-w-full w-32 max-h-28 rounded-lg object-cover"}):l==="audio"?"เปิดฟังเสียง":"เปิดดูวิดีโอ"}):e.jsx("a",{href:s,target:"_blank",rel:"noopener noreferrer",className:"text-blue-700 underline break-all",children:"เปิดไฟล์แนบ"})}return e.jsx("span",{className:"whitespace-pre-wrap break-words [overflow-wrap:anywhere]",children:s})}function In({item:t,users:a}){var k;const[c,r]=K.useState("all"),[s,n]=K.useState("all"),[l,o]=K.useState(!1),[d,b]=K.useState(20),[C,P]=K.useState(null);K.useEffect(()=>{r("all"),n("all"),b(20),P(null)},[t.id]),K.useEffect(()=>{b(20)},[c,s,l]);const I=(k=t.history)!=null&&k.length?[...t.history]:[{action:"ข้อมูลเริ่มต้นจากผู้บันทึกรายการ",user:t.creator.alias,userAvatar:t.creator.avatar,timestamp:t.creator.timestamp}];for(const u of t.reviewerNotes||[])for(const[v,N]of[["comment",u],...(u.replies||[]).map(M=>["reply",M])]){const M=N;I.some(g=>{var w;return g.id===M.id||((w=g.content)==null?void 0:w.id)===M.id})||I.push({id:`legacy-content-${M.id}`,kind:v,action:"ความคิดเห็นที่ยังเก็บในรายการ",user:M.author,userId:M.authorId,userAvatar:M.authorAvatar,timestamp:M.timestamp,content:M})}const j=t.handoffStage||"awaiting",z=u=>I.filter(v=>v.version===2&&(v.stageAfter===u||v.stageBefore===u)),F=u=>{var v,N,M,g;return!!((v=u.content)!=null&&v.photoUrl||(N=u.content)!=null&&N.voiceUrl||(M=u.content)!=null&&M.audioUrl||(g=u.changes)!=null&&g.some(w=>/photos|videos|voice|attachedFiles|catalogItems|drinkItems/.test(w.field)))},V=I.filter(u=>(c==="all"||u.version===2&&(u.stageAfter===c||u.stageBefore===c))&&(s==="all"||s==="files"&&F(u)||s==="comments"&&["comment","reply"].includes(u.kind||"")||s==="data"&&["create","update","delete","restore"].includes(u.kind||"")||s==="handoff"&&u.kind==="handoff")).map((u,v)=>({e:u,index:v})).sort((u,v)=>(l?1:-1)*(Date.parse(u.e.timestamp)-Date.parse(v.e.timestamp)||u.index-v.index));return e.jsxs("section",{"data-testid":"activity-timeline",className:"p-3.5 bg-slate-50 rounded-xl border border-slate-200 space-y-4 text-xs min-w-0",children:[e.jsx("h3",{className:"font-bold text-sm text-slate-900",children:"ประวัติการดำเนินงาน & ส่งต่องาน (Activity Log)"}),e.jsx("p",{className:"text-slate-600",children:"ประวัติทั้งหมดของรายการนี้ รวมทุกพาร์ทที่เคยบันทึก · กดพาร์ทเพื่อกรองดูเฉพาะส่วนได้"}),e.jsxs("div",{className:"bg-white p-3 rounded-xl border border-emerald-200 space-y-2",children:[e.jsxs("p",{className:"font-bold text-emerald-800",children:["ปัจจุบัน: ",Ee(j)]}),e.jsxs("p",{children:["ผู้รับช่วงต่อ: ",e.jsx(we,{field:"assignedTo",value:t.assignedTo,users:a,preview:P})]}),e.jsxs("p",{children:["กำหนดติดตาม: ",t.targetFollowUpDate||"ยังไม่ระบุ"]}),e.jsxs("p",{className:"whitespace-pre-wrap break-words [overflow-wrap:anywhere]",children:["หมายเหตุล่าสุด: ",t.handoffNotes||"ยังไม่ระบุ"]})]}),e.jsx("div",{className:"grid grid-cols-2 sm:grid-cols-3 gap-2","aria-label":"เส้นทางทั้ง 6 พาร์ท",children:pt.map(([u,v],N)=>{const M=z(u),g=M.filter(w=>w.stageAfter===u&&w.stageBefore!==u);return e.jsxs("button",{type:"button","aria-pressed":c===u,onClick:()=>{r(c===u?"all":u),n("all")},className:`text-left p-3 rounded-xl border space-y-1 ${c===u?"ring-2 ring-emerald-600":""} ${j===u?"bg-emerald-50 border-emerald-400":"bg-white border-slate-200"}`,children:[e.jsxs("span",{className:"block font-bold",children:["พาร์ท ",N+1,": ",v]}),e.jsx("span",{className:"block text-[11px] text-slate-600",children:j===u?"อยู่ขั้นตอนนี้":M.length?"เคยอยู่ขั้นตอนนี้":"ยังไม่มีบันทึก"}),!!g.length&&e.jsxs("span",{className:"block text-[10px] text-slate-500",children:["บันทึกเข้า ",g.length," ครั้ง · ",us(g[g.length-1].timestamp)]})]},u)})}),I.some(u=>u.version!==2)&&e.jsx("p",{className:"text-amber-800 bg-amber-50 p-2 rounded-lg",children:"ประวัติเก่าอาจเป็นข้อความย่อ ไม่มีค่าเดิมหรือพาร์ทก่อนหน้า ระบบแสดงเท่าที่เคยบันทึก ไม่เติมขั้นตอนย้อนหลัง"}),e.jsxs("div",{className:"flex flex-wrap gap-2 items-center",children:[e.jsx("button",{type:"button",onClick:()=>{r("all"),n("all")},className:"text-emerald-700 underline",children:"ดูทุกพาร์ท"}),e.jsxs("select",{"aria-label":"ประเภทประวัติ",value:s,onChange:u=>n(u.target.value),className:"max-w-full rounded-lg border p-2 bg-white",children:[e.jsx("option",{value:"all",children:"ทั้งหมด"}),e.jsx("option",{value:"handoff",children:"ส่งต่องาน"}),e.jsx("option",{value:"data",children:"ข้อมูล"}),e.jsx("option",{value:"comments",children:"ความคิดเห็น"}),e.jsx("option",{value:"files",children:"ไฟล์และสื่อ"})]}),e.jsx("button",{type:"button",onClick:()=>o(!l),className:"border rounded-lg p-2 bg-white",children:l?"เรียงเก่าก่อน":"เรียงใหม่ก่อน"})]}),e.jsxs("p",{className:"font-bold",children:[c==="all"?"ประวัติทุกพาร์ท":Ee(c)," · ",V.length," เหตุการณ์"]}),e.jsx("div",{className:"space-y-3",children:V.slice(0,d).map(({e:u,index:v})=>{var g;const N=a.find(w=>w.id===u.userId||w.alias===u.user||w.name===u.user),M=u.version===2&&u.stageBefore&&u.stageBefore!==u.stageAfter;return e.jsxs("article",{className:"bg-white rounded-xl border p-3 min-w-0 space-y-2","data-testid":"activity-event",children:[e.jsxs("div",{className:"flex gap-2 items-start",children:[e.jsx(qe,{src:u.userAvatar||(N==null?void 0:N.avatar)||"./logo.jpg",alt:"",className:"w-7 h-7 shrink-0 rounded-full"}),e.jsxs("div",{className:"min-w-0",children:[e.jsx("strong",{className:"break-words",children:(N==null?void 0:N.alias)||u.user}),e.jsx("time",{className:"block text-[10px] text-slate-500",children:us(u.timestamp)})]})]}),e.jsx("p",{className:"font-semibold whitespace-pre-wrap break-words [overflow-wrap:anywhere]",children:u.kind==="comment"?"แสดงความคิดเห็น":u.kind==="reply"?"ตอบกลับความคิดเห็น":u.kind==="handoff"?"อัปเดตการส่งต่องาน":u.action}),M&&e.jsxs("p",{className:"text-emerald-800 font-bold",children:[Ee(u.stageBefore)," → ",Ee(u.stageAfter)]}),u.version===2&&!M&&e.jsxs("p",{className:"text-[10px] text-slate-500",children:["ณ ",Ee(u.stageAfter)]}),u.content&&u.version!==2&&e.jsx("p",{className:"text-[10px] text-amber-800",children:"ข้อความที่ยังเก็บในรายการ · ไม่ทราบพาร์ท ณ เวลานั้น"}),u.content&&e.jsxs("div",{className:"space-y-2",children:[u.content.replyToAuthor&&e.jsxs("p",{children:["ตอบกลับ ",u.content.replyToAuthor]}),e.jsx("p",{className:"whitespace-pre-wrap break-words [overflow-wrap:anywhere]",children:u.content.text}),u.content.photoUrl&&e.jsx(we,{value:u.content.photoUrl,field:"photo",users:a,preview:P}),(u.content.voiceUrl||u.content.audioUrl)&&e.jsx(we,{value:u.content.voiceUrl||u.content.audioUrl,field:"voice",users:a,preview:P})]}),!!((g=u.changes)!=null&&g.length)&&e.jsxs("details",{open:u.kind!=="create",children:[e.jsxs("summary",{className:"cursor-pointer text-emerald-700 font-bold py-1",children:["รายละเอียดที่บันทึก (",u.changes.length,")"]}),e.jsx("div",{className:"space-y-3 mt-2",children:u.changes.map(w=>e.jsxs("div",{className:"border-t pt-2",children:[e.jsx("h4",{className:"font-bold mb-2",children:Os[w.field]||w.field}),e.jsxs("div",{className:"grid sm:grid-cols-2 gap-2",children:[e.jsxs("div",{className:"min-w-0 rounded-lg bg-slate-50 p-2",children:[e.jsx("p",{className:"text-[10px] text-slate-500 mb-1",children:"ก่อนเปลี่ยน"}),e.jsx(we,{value:w.before,field:w.field,users:a,preview:P})]}),e.jsxs("div",{className:"min-w-0 rounded-lg bg-emerald-50 p-2",children:[e.jsx("p",{className:"text-[10px] text-emerald-700 mb-1",children:"หลังเปลี่ยน"}),e.jsx(we,{value:w.after,field:w.field,users:a,preview:P})]})]})]},w.field))})]})]},u.id||`${u.timestamp}-${v}`)})}),!V.length&&e.jsx("p",{className:"text-slate-500",children:"ยังไม่มีประวัติที่บันทึกสำหรับตัวกรองนี้"}),V.length>d&&e.jsxs("button",{type:"button",className:"w-full border rounded-lg p-3 text-emerald-700",onClick:()=>b(d+20),children:["แสดงประวัติเพิ่ม (",V.length-d," เหตุการณ์)"]}),C&&e.jsx(An,{media:C,close:()=>P(null)})]})}var Ce={},He,ms;function Bn(){return ms||(ms=1,He=function(){return typeof Promise=="function"&&Promise.prototype&&Promise.prototype.then}),He}var Oe={},xe={},fs;function ye(){if(fs)return xe;fs=1;let t;const a=[0,26,44,70,100,134,172,196,242,292,346,404,466,532,581,655,733,815,901,991,1085,1156,1258,1364,1474,1588,1706,1828,1921,2051,2185,2323,2465,2611,2761,2876,3034,3196,3362,3532,3706];return xe.getSymbolSize=function(r){if(!r)throw new Error('"version" cannot be null or undefined');if(r<1||r>40)throw new Error('"version" should be in range from 1 to 40');return r*4+17},xe.getSymbolTotalCodewords=function(r){return a[r]},xe.getBCHDigit=function(c){let r=0;for(;c!==0;)r++,c>>>=1;return r},xe.setToSJISFunction=function(r){if(typeof r!="function")throw new Error('"toSJISFunc" is not a valid function.');t=r},xe.isKanjiModeEnabled=function(){return typeof t<"u"},xe.toSJIS=function(r){return t(r)},xe}var Ke={},xs;function mt(){return xs||(xs=1,(function(t){t.L={bit:1},t.M={bit:0},t.Q={bit:3},t.H={bit:2};function a(c){if(typeof c!="string")throw new Error("Param is not a string");switch(c.toLowerCase()){case"l":case"low":return t.L;case"m":case"medium":return t.M;case"q":case"quartile":return t.Q;case"h":case"high":return t.H;default:throw new Error("Unknown EC Level: "+c)}}t.isValid=function(r){return r&&typeof r.bit<"u"&&r.bit>=0&&r.bit<4},t.from=function(r,s){if(t.isValid(r))return r;try{return a(r)}catch{return s}}})(Ke)),Ke}var Qe,gs;function Pn(){if(gs)return Qe;gs=1;function t(){this.buffer=[],this.length=0}return t.prototype={get:function(a){const c=Math.floor(a/8);return(this.buffer[c]>>>7-a%8&1)===1},put:function(a,c){for(let r=0;r<c;r++)this.putBit((a>>>c-r-1&1)===1)},getLengthInBits:function(){return this.length},putBit:function(a){const c=Math.floor(this.length/8);this.buffer.length<=c&&this.buffer.push(0),a&&(this.buffer[c]|=128>>>this.length%8),this.length++}},Qe=t,Qe}var Ge,bs;function Ln(){if(bs)return Ge;bs=1;function t(a){if(!a||a<1)throw new Error("BitMatrix size must be defined and greater than 0");this.size=a,this.data=new Uint8Array(a*a),this.reservedBit=new Uint8Array(a*a)}return t.prototype.set=function(a,c,r,s){const n=a*this.size+c;this.data[n]=r,s&&(this.reservedBit[n]=!0)},t.prototype.get=function(a,c){return this.data[a*this.size+c]},t.prototype.xor=function(a,c,r){this.data[a*this.size+c]^=r},t.prototype.isReserved=function(a,c){return this.reservedBit[a*this.size+c]},Ge=t,Ge}var Je={},vs;function Dn(){return vs||(vs=1,(function(t){const a=ye().getSymbolSize;t.getRowColCoords=function(r){if(r===1)return[];const s=Math.floor(r/7)+2,n=a(r),l=n===145?26:Math.ceil((n-13)/(2*s-2))*2,o=[n-7];for(let d=1;d<s-1;d++)o[d]=o[d-1]-l;return o.push(6),o.reverse()},t.getPositions=function(r){const s=[],n=t.getRowColCoords(r),l=n.length;for(let o=0;o<l;o++)for(let d=0;d<l;d++)o===0&&d===0||o===0&&d===l-1||o===l-1&&d===0||s.push([n[o],n[d]]);return s}})(Je)),Je}var Ye={},ws;function Un(){if(ws)return Ye;ws=1;const t=ye().getSymbolSize,a=7;return Ye.getPositions=function(r){const s=t(r);return[[0,0],[s-a,0],[0,s-a]]},Ye}var We={},ys;function Mn(){return ys||(ys=1,(function(t){t.Patterns={PATTERN000:0,PATTERN001:1,PATTERN010:2,PATTERN011:3,PATTERN100:4,PATTERN101:5,PATTERN110:6,PATTERN111:7};const a={N1:3,N2:3,N3:40,N4:10};t.isValid=function(s){return s!=null&&s!==""&&!isNaN(s)&&s>=0&&s<=7},t.from=function(s){return t.isValid(s)?parseInt(s,10):void 0},t.getPenaltyN1=function(s){const n=s.size;let l=0,o=0,d=0,b=null,C=null;for(let P=0;P<n;P++){o=d=0,b=C=null;for(let I=0;I<n;I++){let j=s.get(P,I);j===b?o++:(o>=5&&(l+=a.N1+(o-5)),b=j,o=1),j=s.get(I,P),j===C?d++:(d>=5&&(l+=a.N1+(d-5)),C=j,d=1)}o>=5&&(l+=a.N1+(o-5)),d>=5&&(l+=a.N1+(d-5))}return l},t.getPenaltyN2=function(s){const n=s.size;let l=0;for(let o=0;o<n-1;o++)for(let d=0;d<n-1;d++){const b=s.get(o,d)+s.get(o,d+1)+s.get(o+1,d)+s.get(o+1,d+1);(b===4||b===0)&&l++}return l*a.N2},t.getPenaltyN3=function(s){const n=s.size;let l=0,o=0,d=0;for(let b=0;b<n;b++){o=d=0;for(let C=0;C<n;C++)o=o<<1&2047|s.get(b,C),C>=10&&(o===1488||o===93)&&l++,d=d<<1&2047|s.get(C,b),C>=10&&(d===1488||d===93)&&l++}return l*a.N3},t.getPenaltyN4=function(s){let n=0;const l=s.data.length;for(let d=0;d<l;d++)n+=s.data[d];return Math.abs(Math.ceil(n*100/l/5)-10)*a.N4};function c(r,s,n){switch(r){case t.Patterns.PATTERN000:return(s+n)%2===0;case t.Patterns.PATTERN001:return s%2===0;case t.Patterns.PATTERN010:return n%3===0;case t.Patterns.PATTERN011:return(s+n)%3===0;case t.Patterns.PATTERN100:return(Math.floor(s/2)+Math.floor(n/3))%2===0;case t.Patterns.PATTERN101:return s*n%2+s*n%3===0;case t.Patterns.PATTERN110:return(s*n%2+s*n%3)%2===0;case t.Patterns.PATTERN111:return(s*n%3+(s+n)%2)%2===0;default:throw new Error("bad maskPattern:"+r)}}t.applyMask=function(s,n){const l=n.size;for(let o=0;o<l;o++)for(let d=0;d<l;d++)n.isReserved(d,o)||n.xor(d,o,c(s,d,o))},t.getBestMask=function(s,n){const l=Object.keys(t.Patterns).length;let o=0,d=1/0;for(let b=0;b<l;b++){n(b),t.applyMask(b,s);const C=t.getPenaltyN1(s)+t.getPenaltyN2(s)+t.getPenaltyN3(s)+t.getPenaltyN4(s);t.applyMask(b,s),C<d&&(d=C,o=b)}return o}})(We)),We}var Fe={},js;function Ks(){if(js)return Fe;js=1;const t=mt(),a=[1,1,1,1,1,1,1,1,1,1,2,2,1,2,2,4,1,2,4,4,2,4,4,4,2,4,6,5,2,4,6,6,2,5,8,8,4,5,8,8,4,5,8,11,4,8,10,11,4,9,12,16,4,9,16,16,6,10,12,18,6,10,17,16,6,11,16,19,6,13,18,21,7,14,21,25,8,16,20,25,8,17,23,25,9,17,23,34,9,18,25,30,10,20,27,32,12,21,29,35,12,23,34,37,12,25,34,40,13,26,35,42,14,28,38,45,15,29,40,48,16,31,43,51,17,33,45,54,18,35,48,57,19,37,51,60,19,38,53,63,20,40,56,66,21,43,59,70,22,45,62,74,24,47,65,77,25,49,68,81],c=[7,10,13,17,10,16,22,28,15,26,36,44,20,36,52,64,26,48,72,88,36,64,96,112,40,72,108,130,48,88,132,156,60,110,160,192,72,130,192,224,80,150,224,264,96,176,260,308,104,198,288,352,120,216,320,384,132,240,360,432,144,280,408,480,168,308,448,532,180,338,504,588,196,364,546,650,224,416,600,700,224,442,644,750,252,476,690,816,270,504,750,900,300,560,810,960,312,588,870,1050,336,644,952,1110,360,700,1020,1200,390,728,1050,1260,420,784,1140,1350,450,812,1200,1440,480,868,1290,1530,510,924,1350,1620,540,980,1440,1710,570,1036,1530,1800,570,1064,1590,1890,600,1120,1680,1980,630,1204,1770,2100,660,1260,1860,2220,720,1316,1950,2310,750,1372,2040,2430];return Fe.getBlocksCount=function(s,n){switch(n){case t.L:return a[(s-1)*4+0];case t.M:return a[(s-1)*4+1];case t.Q:return a[(s-1)*4+2];case t.H:return a[(s-1)*4+3];default:return}},Fe.getTotalCodewordsCount=function(s,n){switch(n){case t.L:return c[(s-1)*4+0];case t.M:return c[(s-1)*4+1];case t.Q:return c[(s-1)*4+2];case t.H:return c[(s-1)*4+3];default:return}},Fe}var Ze={},Pe={},Ns;function zn(){if(Ns)return Pe;Ns=1;const t=new Uint8Array(512),a=new Uint8Array(256);return(function(){let r=1;for(let s=0;s<255;s++)t[s]=r,a[r]=s,r<<=1,r&256&&(r^=285);for(let s=255;s<512;s++)t[s]=t[s-255]})(),Pe.log=function(r){if(r<1)throw new Error("log("+r+")");return a[r]},Pe.exp=function(r){return t[r]},Pe.mul=function(r,s){return r===0||s===0?0:t[a[r]+a[s]]},Pe}var ks;function Fn(){return ks||(ks=1,(function(t){const a=zn();t.mul=function(r,s){const n=new Uint8Array(r.length+s.length-1);for(let l=0;l<r.length;l++)for(let o=0;o<s.length;o++)n[l+o]^=a.mul(r[l],s[o]);return n},t.mod=function(r,s){let n=new Uint8Array(r);for(;n.length-s.length>=0;){const l=n[0];for(let d=0;d<s.length;d++)n[d]^=a.mul(s[d],l);let o=0;for(;o<n.length&&n[o]===0;)o++;n=n.slice(o)}return n},t.generateECPolynomial=function(r){let s=new Uint8Array([1]);for(let n=0;n<r;n++)s=t.mul(s,new Uint8Array([1,a.exp(n)]));return s}})(Ze)),Ze}var Xe,$s;function qn(){if($s)return Xe;$s=1;const t=Fn();function a(c){this.genPoly=void 0,this.degree=c,this.degree&&this.initialize(this.degree)}return a.prototype.initialize=function(r){this.degree=r,this.genPoly=t.generateECPolynomial(this.degree)},a.prototype.encode=function(r){if(!this.genPoly)throw new Error("Encoder not initialized");const s=new Uint8Array(r.length+this.degree);s.set(r);const n=t.mod(s,this.genPoly),l=this.degree-n.length;if(l>0){const o=new Uint8Array(this.degree);return o.set(n,l),o}return n},Xe=a,Xe}var et={},tt={},st={},Cs;function Qs(){return Cs||(Cs=1,st.isValid=function(a){return!isNaN(a)&&a>=1&&a<=40}),st}var ce={},Es;function Gs(){if(Es)return ce;Es=1;const t="[0-9]+",a="[A-Z $%*+\\-./:]+";let c="(?:[u3000-u303F]|[u3040-u309F]|[u30A0-u30FF]|[uFF00-uFFEF]|[u4E00-u9FAF]|[u2605-u2606]|[u2190-u2195]|u203B|[u2010u2015u2018u2019u2025u2026u201Cu201Du2225u2260]|[u0391-u0451]|[u00A7u00A8u00B1u00B4u00D7u00F7])+";c=c.replace(/u/g,"\\u");const r="(?:(?![A-Z0-9 $%*+\\-./:]|"+c+`)(?:.|[\r
]))+`;ce.KANJI=new RegExp(c,"g"),ce.BYTE_KANJI=new RegExp("[^A-Z0-9 $%*+\\-./:]+","g"),ce.BYTE=new RegExp(r,"g"),ce.NUMERIC=new RegExp(t,"g"),ce.ALPHANUMERIC=new RegExp(a,"g");const s=new RegExp("^"+c+"$"),n=new RegExp("^"+t+"$"),l=new RegExp("^[A-Z0-9 $%*+\\-./:]+$");return ce.testKanji=function(d){return s.test(d)},ce.testNumeric=function(d){return n.test(d)},ce.testAlphanumeric=function(d){return l.test(d)},ce}var Ss;function je(){return Ss||(Ss=1,(function(t){const a=Qs(),c=Gs();t.NUMERIC={id:"Numeric",bit:1,ccBits:[10,12,14]},t.ALPHANUMERIC={id:"Alphanumeric",bit:2,ccBits:[9,11,13]},t.BYTE={id:"Byte",bit:4,ccBits:[8,16,16]},t.KANJI={id:"Kanji",bit:8,ccBits:[8,10,12]},t.MIXED={bit:-1},t.getCharCountIndicator=function(n,l){if(!n.ccBits)throw new Error("Invalid mode: "+n);if(!a.isValid(l))throw new Error("Invalid version: "+l);return l>=1&&l<10?n.ccBits[0]:l<27?n.ccBits[1]:n.ccBits[2]},t.getBestModeForData=function(n){return c.testNumeric(n)?t.NUMERIC:c.testAlphanumeric(n)?t.ALPHANUMERIC:c.testKanji(n)?t.KANJI:t.BYTE},t.toString=function(n){if(n&&n.id)return n.id;throw new Error("Invalid mode")},t.isValid=function(n){return n&&n.bit&&n.ccBits};function r(s){if(typeof s!="string")throw new Error("Param is not a string");switch(s.toLowerCase()){case"numeric":return t.NUMERIC;case"alphanumeric":return t.ALPHANUMERIC;case"kanji":return t.KANJI;case"byte":return t.BYTE;default:throw new Error("Unknown mode: "+s)}}t.from=function(n,l){if(t.isValid(n))return n;try{return r(n)}catch{return l}}})(tt)),tt}var Ts;function _n(){return Ts||(Ts=1,(function(t){const a=ye(),c=Ks(),r=mt(),s=je(),n=Qs(),l=7973,o=a.getBCHDigit(l);function d(I,j,z){for(let F=1;F<=40;F++)if(j<=t.getCapacity(F,z,I))return F}function b(I,j){return s.getCharCountIndicator(I,j)+4}function C(I,j){let z=0;return I.forEach(function(F){const V=b(F.mode,j);z+=V+F.getBitsLength()}),z}function P(I,j){for(let z=1;z<=40;z++)if(C(I,z)<=t.getCapacity(z,j,s.MIXED))return z}t.from=function(j,z){return n.isValid(j)?parseInt(j,10):z},t.getCapacity=function(j,z,F){if(!n.isValid(j))throw new Error("Invalid QR Code version");typeof F>"u"&&(F=s.BYTE);const V=a.getSymbolTotalCodewords(j),k=c.getTotalCodewordsCount(j,z),u=(V-k)*8;if(F===s.MIXED)return u;const v=u-b(F,j);switch(F){case s.NUMERIC:return Math.floor(v/10*3);case s.ALPHANUMERIC:return Math.floor(v/11*2);case s.KANJI:return Math.floor(v/13);case s.BYTE:default:return Math.floor(v/8)}},t.getBestVersionForData=function(j,z){let F;const V=r.from(z,r.M);if(Array.isArray(j)){if(j.length>1)return P(j,V);if(j.length===0)return 1;F=j[0]}else F=j;return d(F.mode,F.getLength(),V)},t.getEncodedBits=function(j){if(!n.isValid(j)||j<7)throw new Error("Invalid QR Code version");let z=j<<12;for(;a.getBCHDigit(z)-o>=0;)z^=l<<a.getBCHDigit(z)-o;return j<<12|z}})(et)),et}var nt={},Rs;function Vn(){if(Rs)return nt;Rs=1;const t=ye(),a=1335,c=21522,r=t.getBCHDigit(a);return nt.getEncodedBits=function(n,l){const o=n.bit<<3|l;let d=o<<10;for(;t.getBCHDigit(d)-r>=0;)d^=a<<t.getBCHDigit(d)-r;return(o<<10|d)^c},nt}var rt={},at,As;function Hn(){if(As)return at;As=1;const t=je();function a(c){this.mode=t.NUMERIC,this.data=c.toString()}return a.getBitsLength=function(r){return 10*Math.floor(r/3)+(r%3?r%3*3+1:0)},a.prototype.getLength=function(){return this.data.length},a.prototype.getBitsLength=function(){return a.getBitsLength(this.data.length)},a.prototype.write=function(r){let s,n,l;for(s=0;s+3<=this.data.length;s+=3)n=this.data.substr(s,3),l=parseInt(n,10),r.put(l,10);const o=this.data.length-s;o>0&&(n=this.data.substr(s),l=parseInt(n,10),r.put(l,o*3+1))},at=a,at}var ot,Is;function On(){if(Is)return ot;Is=1;const t=je(),a=["0","1","2","3","4","5","6","7","8","9","A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z"," ","$","%","*","+","-",".","/",":"];function c(r){this.mode=t.ALPHANUMERIC,this.data=r}return c.getBitsLength=function(s){return 11*Math.floor(s/2)+6*(s%2)},c.prototype.getLength=function(){return this.data.length},c.prototype.getBitsLength=function(){return c.getBitsLength(this.data.length)},c.prototype.write=function(s){let n;for(n=0;n+2<=this.data.length;n+=2){let l=a.indexOf(this.data[n])*45;l+=a.indexOf(this.data[n+1]),s.put(l,11)}this.data.length%2&&s.put(a.indexOf(this.data[n]),6)},ot=c,ot}var it,Bs;function Kn(){if(Bs)return it;Bs=1;const t=je();function a(c){this.mode=t.BYTE,typeof c=="string"?this.data=new TextEncoder().encode(c):this.data=new Uint8Array(c)}return a.getBitsLength=function(r){return r*8},a.prototype.getLength=function(){return this.data.length},a.prototype.getBitsLength=function(){return a.getBitsLength(this.data.length)},a.prototype.write=function(c){for(let r=0,s=this.data.length;r<s;r++)c.put(this.data[r],8)},it=a,it}var lt,Ps;function Qn(){if(Ps)return lt;Ps=1;const t=je(),a=ye();function c(r){this.mode=t.KANJI,this.data=r}return c.getBitsLength=function(s){return s*13},c.prototype.getLength=function(){return this.data.length},c.prototype.getBitsLength=function(){return c.getBitsLength(this.data.length)},c.prototype.write=function(r){let s;for(s=0;s<this.data.length;s++){let n=a.toSJIS(this.data[s]);if(n>=33088&&n<=40956)n-=33088;else if(n>=57408&&n<=60351)n-=49472;else throw new Error("Invalid SJIS character: "+this.data[s]+`
Make sure your charset is UTF-8`);n=(n>>>8&255)*192+(n&255),r.put(n,13)}},lt=c,lt}var ct={exports:{}},Ls;function Gn(){return Ls||(Ls=1,(function(t){var a={single_source_shortest_paths:function(c,r,s){var n={},l={};l[r]=0;var o=a.PriorityQueue.make();o.push(r,0);for(var d,b,C,P,I,j,z,F,V;!o.empty();){d=o.pop(),b=d.value,P=d.cost,I=c[b]||{};for(C in I)I.hasOwnProperty(C)&&(j=I[C],z=P+j,F=l[C],V=typeof l[C]>"u",(V||F>z)&&(l[C]=z,o.push(C,z),n[C]=b))}if(typeof s<"u"&&typeof l[s]>"u"){var k=["Could not find a path from ",r," to ",s,"."].join("");throw new Error(k)}return n},extract_shortest_path_from_predecessor_list:function(c,r){for(var s=[],n=r;n;)s.push(n),c[n],n=c[n];return s.reverse(),s},find_path:function(c,r,s){var n=a.single_source_shortest_paths(c,r,s);return a.extract_shortest_path_from_predecessor_list(n,s)},PriorityQueue:{make:function(c){var r=a.PriorityQueue,s={},n;c=c||{};for(n in r)r.hasOwnProperty(n)&&(s[n]=r[n]);return s.queue=[],s.sorter=c.sorter||r.default_sorter,s},default_sorter:function(c,r){return c.cost-r.cost},push:function(c,r){var s={value:c,cost:r};this.queue.push(s),this.queue.sort(this.sorter)},pop:function(){return this.queue.shift()},empty:function(){return this.queue.length===0}}};t.exports=a})(ct)),ct.exports}var Ds;function Jn(){return Ds||(Ds=1,(function(t){const a=je(),c=Hn(),r=On(),s=Kn(),n=Qn(),l=Gs(),o=ye(),d=Gn();function b(k){return unescape(encodeURIComponent(k)).length}function C(k,u,v){const N=[];let M;for(;(M=k.exec(v))!==null;)N.push({data:M[0],index:M.index,mode:u,length:M[0].length});return N}function P(k){const u=C(l.NUMERIC,a.NUMERIC,k),v=C(l.ALPHANUMERIC,a.ALPHANUMERIC,k);let N,M;return o.isKanjiModeEnabled()?(N=C(l.BYTE,a.BYTE,k),M=C(l.KANJI,a.KANJI,k)):(N=C(l.BYTE_KANJI,a.BYTE,k),M=[]),u.concat(v,N,M).sort(function(w,L){return w.index-L.index}).map(function(w){return{data:w.data,mode:w.mode,length:w.length}})}function I(k,u){switch(u){case a.NUMERIC:return c.getBitsLength(k);case a.ALPHANUMERIC:return r.getBitsLength(k);case a.KANJI:return n.getBitsLength(k);case a.BYTE:return s.getBitsLength(k)}}function j(k){return k.reduce(function(u,v){const N=u.length-1>=0?u[u.length-1]:null;return N&&N.mode===v.mode?(u[u.length-1].data+=v.data,u):(u.push(v),u)},[])}function z(k){const u=[];for(let v=0;v<k.length;v++){const N=k[v];switch(N.mode){case a.NUMERIC:u.push([N,{data:N.data,mode:a.ALPHANUMERIC,length:N.length},{data:N.data,mode:a.BYTE,length:N.length}]);break;case a.ALPHANUMERIC:u.push([N,{data:N.data,mode:a.BYTE,length:N.length}]);break;case a.KANJI:u.push([N,{data:N.data,mode:a.BYTE,length:b(N.data)}]);break;case a.BYTE:u.push([{data:N.data,mode:a.BYTE,length:b(N.data)}])}}return u}function F(k,u){const v={},N={start:{}};let M=["start"];for(let g=0;g<k.length;g++){const w=k[g],L=[];for(let S=0;S<w.length;S++){const h=w[S],$=""+g+S;L.push($),v[$]={node:h,lastCount:0},N[$]={};for(let A=0;A<M.length;A++){const D=M[A];v[D]&&v[D].node.mode===h.mode?(N[D][$]=I(v[D].lastCount+h.length,h.mode)-I(v[D].lastCount,h.mode),v[D].lastCount+=h.length):(v[D]&&(v[D].lastCount=h.length),N[D][$]=I(h.length,h.mode)+4+a.getCharCountIndicator(h.mode,u))}}M=L}for(let g=0;g<M.length;g++)N[M[g]].end=0;return{map:N,table:v}}function V(k,u){let v;const N=a.getBestModeForData(k);if(v=a.from(u,N),v!==a.BYTE&&v.bit<N.bit)throw new Error('"'+k+'" cannot be encoded with mode '+a.toString(v)+`.
 Suggested mode is: `+a.toString(N));switch(v===a.KANJI&&!o.isKanjiModeEnabled()&&(v=a.BYTE),v){case a.NUMERIC:return new c(k);case a.ALPHANUMERIC:return new r(k);case a.KANJI:return new n(k);case a.BYTE:return new s(k)}}t.fromArray=function(u){return u.reduce(function(v,N){return typeof N=="string"?v.push(V(N,null)):N.data&&v.push(V(N.data,N.mode)),v},[])},t.fromString=function(u,v){const N=P(u,o.isKanjiModeEnabled()),M=z(N),g=F(M,v),w=d.find_path(g.map,"start","end"),L=[];for(let S=1;S<w.length-1;S++)L.push(g.table[w[S]].node);return t.fromArray(j(L))},t.rawSplit=function(u){return t.fromArray(P(u,o.isKanjiModeEnabled()))}})(rt)),rt}var Us;function Yn(){if(Us)return Oe;Us=1;const t=ye(),a=mt(),c=Pn(),r=Ln(),s=Dn(),n=Un(),l=Mn(),o=Ks(),d=qn(),b=_n(),C=Vn(),P=je(),I=Jn();function j(g,w){const L=g.size,S=n.getPositions(w);for(let h=0;h<S.length;h++){const $=S[h][0],A=S[h][1];for(let D=-1;D<=7;D++)if(!($+D<=-1||L<=$+D))for(let U=-1;U<=7;U++)A+U<=-1||L<=A+U||(D>=0&&D<=6&&(U===0||U===6)||U>=0&&U<=6&&(D===0||D===6)||D>=2&&D<=4&&U>=2&&U<=4?g.set($+D,A+U,!0,!0):g.set($+D,A+U,!1,!0))}}function z(g){const w=g.size;for(let L=8;L<w-8;L++){const S=L%2===0;g.set(L,6,S,!0),g.set(6,L,S,!0)}}function F(g,w){const L=s.getPositions(w);for(let S=0;S<L.length;S++){const h=L[S][0],$=L[S][1];for(let A=-2;A<=2;A++)for(let D=-2;D<=2;D++)A===-2||A===2||D===-2||D===2||A===0&&D===0?g.set(h+A,$+D,!0,!0):g.set(h+A,$+D,!1,!0)}}function V(g,w){const L=g.size,S=b.getEncodedBits(w);let h,$,A;for(let D=0;D<18;D++)h=Math.floor(D/3),$=D%3+L-8-3,A=(S>>D&1)===1,g.set(h,$,A,!0),g.set($,h,A,!0)}function k(g,w,L){const S=g.size,h=C.getEncodedBits(w,L);let $,A;for($=0;$<15;$++)A=(h>>$&1)===1,$<6?g.set($,8,A,!0):$<8?g.set($+1,8,A,!0):g.set(S-15+$,8,A,!0),$<8?g.set(8,S-$-1,A,!0):$<9?g.set(8,15-$-1+1,A,!0):g.set(8,15-$-1,A,!0);g.set(S-8,8,1,!0)}function u(g,w){const L=g.size;let S=-1,h=L-1,$=7,A=0;for(let D=L-1;D>0;D-=2)for(D===6&&D--;;){for(let U=0;U<2;U++)if(!g.isReserved(h,D-U)){let Q=!1;A<w.length&&(Q=(w[A]>>>$&1)===1),g.set(h,D-U,Q),$--,$===-1&&(A++,$=7)}if(h+=S,h<0||L<=h){h-=S,S=-S;break}}}function v(g,w,L){const S=new c;L.forEach(function(U){S.put(U.mode.bit,4),S.put(U.getLength(),P.getCharCountIndicator(U.mode,g)),U.write(S)});const h=t.getSymbolTotalCodewords(g),$=o.getTotalCodewordsCount(g,w),A=(h-$)*8;for(S.getLengthInBits()+4<=A&&S.put(0,4);S.getLengthInBits()%8!==0;)S.putBit(0);const D=(A-S.getLengthInBits())/8;for(let U=0;U<D;U++)S.put(U%2?17:236,8);return N(S,g,w)}function N(g,w,L){const S=t.getSymbolTotalCodewords(w),h=o.getTotalCodewordsCount(w,L),$=S-h,A=o.getBlocksCount(w,L),D=S%A,U=A-D,Q=Math.floor(S/A),X=Math.floor($/A),ie=X+1,ge=Q-X,Se=new d(ge);let be=0;const re=new Array(A),ue=new Array(A);let ae=0;const pe=new Uint8Array(g.buffer);for(let ne=0;ne<A;ne++){const W=ne<U?X:ie;re[ne]=pe.slice(be,be+W),ue[ne]=Se.encode(re[ne]),be+=W,ae=Math.max(ae,W)}const se=new Uint8Array(S);let me=0,J,Y;for(J=0;J<ae;J++)for(Y=0;Y<A;Y++)J<re[Y].length&&(se[me++]=re[Y][J]);for(J=0;J<ge;J++)for(Y=0;Y<A;Y++)se[me++]=ue[Y][J];return se}function M(g,w,L,S){let h;if(Array.isArray(g))h=I.fromArray(g);else if(typeof g=="string"){let Q=w;if(!Q){const X=I.rawSplit(g);Q=b.getBestVersionForData(X,L)}h=I.fromString(g,Q||40)}else throw new Error("Invalid data");const $=b.getBestVersionForData(h,L);if(!$)throw new Error("The amount of data is too big to be stored in a QR Code");if(!w)w=$;else if(w<$)throw new Error(`
The chosen QR Code version cannot contain this amount of data.
Minimum version required to store current data is: `+$+`.
`);const A=v(w,L,h),D=t.getSymbolSize(w),U=new r(D);return j(U,w),z(U),F(U,w),k(U,L,0),w>=7&&V(U,w),u(U,A),isNaN(S)&&(S=l.getBestMask(U,k.bind(null,U,L))),l.applyMask(S,U),k(U,L,S),{modules:U,version:w,errorCorrectionLevel:L,maskPattern:S,segments:h}}return Oe.create=function(w,L){if(typeof w>"u"||w==="")throw new Error("No input text");let S=a.M,h,$;return typeof L<"u"&&(S=a.from(L.errorCorrectionLevel,a.M),h=b.from(L.version),$=l.from(L.maskPattern),L.toSJISFunc&&t.setToSJISFunction(L.toSJISFunc)),M(w,h,S,$)},Oe}var dt={},ht={},Ms;function Js(){return Ms||(Ms=1,(function(t){function a(c){if(typeof c=="number"&&(c=c.toString()),typeof c!="string")throw new Error("Color should be defined as hex string");let r=c.slice().replace("#","").split("");if(r.length<3||r.length===5||r.length>8)throw new Error("Invalid hex color: "+c);(r.length===3||r.length===4)&&(r=Array.prototype.concat.apply([],r.map(function(n){return[n,n]}))),r.length===6&&r.push("F","F");const s=parseInt(r.join(""),16);return{r:s>>24&255,g:s>>16&255,b:s>>8&255,a:s&255,hex:"#"+r.slice(0,6).join("")}}t.getOptions=function(r){r||(r={}),r.color||(r.color={});const s=typeof r.margin>"u"||r.margin===null||r.margin<0?4:r.margin,n=r.width&&r.width>=21?r.width:void 0,l=r.scale||4;return{width:n,scale:n?4:l,margin:s,color:{dark:a(r.color.dark||"#000000ff"),light:a(r.color.light||"#ffffffff")},type:r.type,rendererOpts:r.rendererOpts||{}}},t.getScale=function(r,s){return s.width&&s.width>=r+s.margin*2?s.width/(r+s.margin*2):s.scale},t.getImageWidth=function(r,s){const n=t.getScale(r,s);return Math.floor((r+s.margin*2)*n)},t.qrToImageData=function(r,s,n){const l=s.modules.size,o=s.modules.data,d=t.getScale(l,n),b=Math.floor((l+n.margin*2)*d),C=n.margin*d,P=[n.color.light,n.color.dark];for(let I=0;I<b;I++)for(let j=0;j<b;j++){let z=(I*b+j)*4,F=n.color.light;if(I>=C&&j>=C&&I<b-C&&j<b-C){const V=Math.floor((I-C)/d),k=Math.floor((j-C)/d);F=P[o[V*l+k]?1:0]}r[z++]=F.r,r[z++]=F.g,r[z++]=F.b,r[z]=F.a}}})(ht)),ht}var zs;function Wn(){return zs||(zs=1,(function(t){const a=Js();function c(s,n,l){s.clearRect(0,0,n.width,n.height),n.style||(n.style={}),n.height=l,n.width=l,n.style.height=l+"px",n.style.width=l+"px"}function r(){try{return document.createElement("canvas")}catch{throw new Error("You need to specify a canvas element")}}t.render=function(n,l,o){let d=o,b=l;typeof d>"u"&&(!l||!l.getContext)&&(d=l,l=void 0),l||(b=r()),d=a.getOptions(d);const C=a.getImageWidth(n.modules.size,d),P=b.getContext("2d"),I=P.createImageData(C,C);return a.qrToImageData(I.data,n,d),c(P,b,C),P.putImageData(I,0,0),b},t.renderToDataURL=function(n,l,o){let d=o;typeof d>"u"&&(!l||!l.getContext)&&(d=l,l=void 0),d||(d={});const b=t.render(n,l,d),C=d.type||"image/png",P=d.rendererOpts||{};return b.toDataURL(C,P.quality)}})(dt)),dt}var ut={},Fs;function Zn(){if(Fs)return ut;Fs=1;const t=Js();function a(s,n){const l=s.a/255,o=n+'="'+s.hex+'"';return l<1?o+" "+n+'-opacity="'+l.toFixed(2).slice(1)+'"':o}function c(s,n,l){let o=s+n;return typeof l<"u"&&(o+=" "+l),o}function r(s,n,l){let o="",d=0,b=!1,C=0;for(let P=0;P<s.length;P++){const I=Math.floor(P%n),j=Math.floor(P/n);!I&&!b&&(b=!0),s[P]?(C++,P>0&&I>0&&s[P-1]||(o+=b?c("M",I+l,.5+j+l):c("m",d,0),d=0,b=!1),I+1<n&&s[P+1]||(o+=c("h",C),C=0)):d++}return o}return ut.render=function(n,l,o){const d=t.getOptions(l),b=n.modules.size,C=n.modules.data,P=b+d.margin*2,I=d.color.light.a?"<path "+a(d.color.light,"fill")+' d="M0 0h'+P+"v"+P+'H0z"/>':"",j="<path "+a(d.color.dark,"stroke")+' d="'+r(C,b,d.margin)+'"/>',z='viewBox="0 0 '+P+" "+P+'"',V='<svg xmlns="http://www.w3.org/2000/svg" '+(d.width?'width="'+d.width+'" height="'+d.width+'" ':"")+z+' shape-rendering="crispEdges">'+I+j+`</svg>
`;return typeof o=="function"&&o(null,V),V},ut}var qs;function Xn(){if(qs)return Ce;qs=1;const t=Bn(),a=Yn(),c=Wn(),r=Zn();function s(n,l,o,d,b){const C=[].slice.call(arguments,1),P=C.length,I=typeof C[P-1]=="function";if(!I&&!t())throw new Error("Callback required as last argument");if(I){if(P<2)throw new Error("Too few arguments provided");P===2?(b=o,o=l,l=d=void 0):P===3&&(l.getContext&&typeof b>"u"?(b=d,d=void 0):(b=d,d=o,o=l,l=void 0))}else{if(P<1)throw new Error("Too few arguments provided");return P===1?(o=l,l=d=void 0):P===2&&!l.getContext&&(d=o,o=l,l=void 0),new Promise(function(j,z){try{const F=a.create(o,d);j(n(F,l,d))}catch(F){z(F)}})}try{const j=a.create(o,d);b(null,n(j,l,d))}catch(j){b(j)}}return Ce.create=a.create,Ce.toCanvas=s.bind(null,c.render),Ce.toDataURL=s.bind(null,c.renderToDataURL),Ce.toString=s.bind(null,function(n,l,o){return r.render(n,o)}),Ce}var er=Xn();const tr=en(er);function O(t){return t==null?"":String(t).replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;")}function p(t){if(t==null||t==="")return"";const c=String(t).split(/\r?\n/),r=s=>{if(!s)return"";try{const n=Intl;if(typeof Intl<"u"&&n.Segmenter){const l=new n.Segmenter("th",{granularity:"word"}),o=[];for(const d of l.segment(s)){const b=d.segment;/^\s+$/.test(b)?o.push(" "):o.push(`<span class="w-seg">${O(b)}</span>`)}return o.join("")}}catch{}return O(s)};return c.map(r).join("<br/>")}function _s(t){try{const a=tr.create(t,{errorCorrectionLevel:"M"}),c=a.modules.size,r=2,s=c+r*2;let n="";for(let o=0;o<c;o++)for(let d=0;d<c;d++)a.modules.get(o,d)&&(n+=`<rect x="${d+r}" y="${o+r}" width="1" height="1" fill="#0f172a"/>`);const l=`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${s} ${s}" width="200" height="200" shape-rendering="crispEdges"><rect width="100%" height="100%" fill="#ffffff"/>${n}</svg>`;return`data:image/svg+xml;utf8,${encodeURIComponent(l)}`}catch{return""}}function sr(t,a,c){var pe,se,me,J,Y,ne,W,fe,Te,Re,de,he,ee;const r=t.type==="supplier",s=t.type==="location",n=r?t:null,l=s?t:null,o=t.type==="drink_store"?t:null,d=r?n.name:s?l.name:o.storeName,b=r?n.chineseName:s?l.foreignName:o.chineseName,C=r?n.category:s?l.locationType==="mall"?"ห้างสรรพสินค้า":l.locationType:o.storeCategory||"เรฟร้านน้ำ",P=r?n.marketOrCity:s?l.location.addressText||l.zoneOrFloor:o.city,I=t.country==="TH"?"ประเทศไทย (TH)":"ประเทศจีน (CN)",j=typeof window<"u"&&window.location.origin&&!window.location.hostname.includes("localhost")&&!window.location.hostname.includes("127.0.0.1")?`${window.location.origin}${window.location.pathname}`:"https://vitcha-sourcing-fxjw.onrender.com/",F=`${j.endsWith("/")?j:`${j}/`}?view=${encodeURIComponent(t.id)}&type=${encodeURIComponent(t.type)}`,V=_s(F),k=[];n?((pe=n.photos.storefrontAndAtmosphere)==null||pe.forEach((m,x)=>k.push({url:m,label:`ป้ายหน้าร้าน / บรรยากาศ #${x+1}`})),(se=n.photos.contactCards)==null||se.forEach((m,x)=>k.push({url:m,label:`นามบัตร / WeChat #${x+1}`})),(me=n.catalogItems)==null||me.forEach((m,x)=>{m.photo&&k.push({url:m.photo,label:m.name?`สินค้า: ${m.name}`:`รายการสินค้า #${x+1}`})})):l?((J=l.photos.storefrontAndAtmosphere)==null||J.forEach((m,x)=>k.push({url:m,label:`หน้าร้าน / ทางเดิน #${x+1}`})),(Y=l.photos.floorPlanAndSpecs)==null||Y.forEach((m,x)=>k.push({url:m,label:`ผังห้อง / งานระบบ #${x+1}`})),(ne=l.photos.surroundingNeighbors)==null||ne.forEach((m,x)=>k.push({url:m,label:`ร้านข้างเคียง #${x+1}`})),(W=l.photos.contactCards)==null||W.forEach((m,x)=>k.push({url:m,label:`นามบัตร / เอกสารสัญญา #${x+1}`}))):o&&((fe=o.photos.storefrontAndAtmosphere)==null||fe.forEach((m,x)=>k.push({url:m,label:`หน้าร้าน / บรรยากาศ #${x+1}`})),(Te=o.photos.menuBoard)==null||Te.forEach((m,x)=>k.push({url:m,label:`ป้ายเมนู / ราคา #${x+1}`})),(Re=o.photos.drinkCups)==null||Re.forEach((m,x)=>k.push({url:m,label:`แก้วเครื่องดื่ม #${x+1}`})),(de=o.drinkItems)==null||de.forEach((m,x)=>{m.photo&&k.push({url:m.photo,label:m.name?`เมนูชิม: ${m.name}`:`แก้วชิม #${x+1}`})}));const u=oe(t),v=[];u.forEach((m,x)=>{v.push({label:m.label||`คลิปเสียงหน้างาน #${x+1}`,durationSec:m.durationSec||4,source:"บันทึกเสียงหลักหน้างานจริง"})}),n?(n.catalogItems||[]).forEach((m,x)=>{oe(m).forEach((E,_)=>{v.push({label:E.label||`คลิปเสียงสินค้า #${_+1}`,durationSec:E.durationSec||4,source:`สินค้า: ${m.name||`รายการที่ #${x+1}`}`})})}):o&&(o.drinkItems||[]).forEach((m,x)=>{oe(m).forEach((E,_)=>{v.push({label:E.label||`คลิปเสียงเมนู #${_+1}`,durationSec:E.durationSec||4,source:`เมนู: ${m.name||`แก้วที่ #${x+1}`}`})})});const N=Array.isArray(t.videos)?t.videos.filter(Boolean):[],M=((he=k[0])==null?void 0:he.url)||"./logo.jpg",g=Array.isArray(t.viewedBy)?t.viewedBy:[],w=Array.isArray(t.likes)?t.likes:[],L=Array.isArray(t.reviewerNotes)?t.reviewerNotes:[],S=Array.isArray(t.history)?t.history:[],h=S.length>0?S:[{action:"สร้างบันทึกรายการสำรวจ",user:t.creator.alias,userAvatar:t.creator.avatar,timestamp:t.creator.timestamp}],$=`ฉันจะเป็นหัวแถว-${d.replace(/[^a-zA-Z0-9ก-๙_-]/g,"_")}.pdf`,D={awaiting:"พาร์ท 1: รอรับช่วงต่อ",rfq_sent:"พาร์ท 2: ขอสเปก / ส่ง RFQ",sample_test:"พาร์ท 3: ทดสอบตัวอย่าง Lab / R&D",negotiate:"พาร์ท 4: ต่อรองราคา & MOQ",approved:"พาร์ท 5: ตัวเต็งอนุมัติ",ordered:"พาร์ท 6: สั่งซื้อสำเร็จ"}[t.handoffStage||"awaiting"]||"พาร์ท 1: รอรับช่วงต่อ",U=v.length>0?`<div class="media-grid">
          ${v.map((m,x)=>`
              <div class="voice-card">
                <div class="voice-icon">▶</div>
                <div class="voice-meta">
                  <div class="voice-title">${p(`${x+1}. ${m.label}`)}</div>
                  <div class="voice-sub">${p(`${m.source} · ความยาว ${m.durationSec} วินาที`)}</div>
                  <div class="voice-wave">${p("ılıll|ılıl||ılıll|ılı · สแกน QR เพื่อกดฟังเสียงจริง")}</div>
                </div>
              </div>`).join("")}
        </div>`:`<div class="empty-note">${p("ไม่มีไฟล์เสียงบันทึกในรายการนี้")}</div>`,Q=N.length>0?`<div class="video-grid">
          ${N.map((m,x)=>{const E=m.includes("gtv-videos-bucket")?Nn:m;return`
              <div class="video-card">
                <div class="video-thumb-wrap">
                  <img
                    id="video-thumb-img-${x}"
                    class="video-thumb-img"
                    src="${O(M)}"
                    crossorigin="anonymous"
                    data-video-src="${O(E)}"
                  />
                  <div class="video-overlay-top">
                    <span class="video-chip">VIDEO CLIP #${x+1}</span>
                    <span class="video-chip-right">HD PREVIEW</span>
                  </div>
                  <div class="video-play-circle">▶</div>
                  <div class="video-overlay-bottom">
                    <span>${p(`คลิปวิดีโอที่ ${x+1} · สแกน QR Code ด้านบนเพื่อเปิดเล่นวิดีโอ`)}</span>
                  </div>
                </div>
                <div class="video-caption">
                  <div class="video-caption-title">${p(`คลิปวิดีโอหน้างาน #${x+1} (จากทั้งหมด ${N.length} คลิป)`)}</div>
                  <div class="video-caption-sub">${p("เอกสารกระดาษแสดงภาพ Thumbnail ตัวอย่าง — สแกน QR Code เพื่อรับชมวิดีโอเคลื่อนไหวพร้อมเสียง")}</div>
                </div>
              </div>`}).join("")}
        </div>`:`<div class="empty-note">${p("ไม่มีคลิปวิดีโอในรายการนี้")}</div>`;let X="";if(r&&n){const m=(n.catalogItems||[]).map((x,E)=>{const _=oe(x);return`
        <tr>
          <td style="text-align:center;font-weight:700;">${E+1}</td>
          <td>
            ${x.photo?`<img src="${O(x.photo)}" crossorigin="anonymous" class="table-thumb" />`:'<div class="table-thumb-empty">ไม่มีรูป</div>'}
          </td>
          <td>
            <div class="cell-title">${p(x.name||`รายการที่ #${E+1}`)}</div>
            ${x.memo?`<div class="cell-sub">${p(x.memo)}</div>`:""}
            ${_.length>0?`<div class="cell-voice-badge">แนบเสียงบันทึก ${_.length} คลิป</div>`:""}
          </td>
          <td>
            <div class="cell-text">${p(x.dimensions||"-")}</div>
            <div class="cell-sub">${p(x.weightKg?`น้ำหนัก: ${x.weightKg}`:"")}</div>
          </td>
          <td>
            <div class="cell-price-green">
              ${x.priceRmb?`¥${x.priceRmb.toLocaleString()}`:x.priceThb?`฿${x.priceThb.toLocaleString()}`:"-"}
            </div>
            ${x.priceRmb?`<div class="cell-sub">(≈ ฿${a(x.priceRmb).toLocaleString()})</div>`:""}
          </td>
        </tr>`}).join("");X=`
      <div class="section-box">
        <div class="section-title">${p(`กลุ่มที่ 3: รายการสินค้า / อุปกรณ์ / วัตถุดิบ (${(n.catalogItems||[]).length} รายการ)`)}</div>
        ${m?`<table class="data-table">
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
                    <th>${p("รูปภาพ")}</th>
                    <th>${p("ชื่อรายการ & รายละเอียดสเปก")}</th>
                    <th>${p("ขนาด / น้ำหนัก")}</th>
                    <th>${p("ราคาประเมิน")}</th>
                  </tr>
                </thead>
                <tbody>${m}</tbody>
              </table>`:`<div class="empty-note">${p("ไม่มีรายการย่อย")}</div>`}
      </div>
    `}else if(o){const m=(o.drinkItems||[]).map((x,E)=>{const _=oe(x);return`
        <tr>
          <td style="text-align:center;font-weight:700;">${E+1}</td>
          <td>
            ${x.photo?`<img src="${O(x.photo)}" crossorigin="anonymous" class="table-thumb" />`:'<div class="table-thumb-empty">ไม่มีรูป</div>'}
          </td>
          <td>
            <div class="cell-title">${p(x.name||`แก้วที่ #${E+1}`)}</div>
            ${x.gimmickNotes?`<div class="cell-sub">${p(`กิมมิก: ${x.gimmickNotes}`)}</div>`:""}
            ${_.length>0?`<div class="cell-voice-badge">แนบเสียงบันทึก ${_.length} คลิป</div>`:""}
          </td>
          <td>
            <div class="cell-text">${p(x.cupSize||"-")}</div>
          </td>
          <td>
            <div class="cell-text">${p(x.fitMenuTarget||"-")}</div>
          </td>
          <td>
            <div class="cell-price-amber">
              ${x.priceRmb?`¥${x.priceRmb.toLocaleString()}`:x.priceThb?`฿${x.priceThb.toLocaleString()}`:"-"}
            </div>
            ${x.priceRmb?`<div class="cell-sub">(≈ ฿${a(x.priceRmb).toLocaleString()})</div>`:""}
          </td>
        </tr>`}).join("");X=`
      <div class="section-box">
        <div class="section-title">${p(`กลุ่มที่ 3: เมนูที่ชิม & การถอดรหัสสูตร (${(o.drinkItems||[]).length} เมนู)`)}</div>
        ${m?`<table class="data-table">
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
                    <th>${p("รูปแก้ว")}</th>
                    <th>${p("ชื่อเมนู & กิมมิก")}</th>
                    <th>${p("ขนาดแก้ว")}</th>
                    <th>${p("ต่อยอดเมนูของเรา")}</th>
                    <th>${p("ราคาขาย")}</th>
                  </tr>
                </thead>
                <tbody>${m}</tbody>
              </table>`:`<div class="empty-note">${p("ไม่มีเมนูย่อย")}</div>`}
      </div>
    `}const ie=t.attachedFiles||[],ge=ie.length>0?`<div class="section-box">
          <div class="section-title">${p(`เอกสารและไฟล์แนบเพิ่มเติม (Attached Documents) — (${ie.length} ไฟล์)`)}</div>
          <div class="media-subhead">${p("สแกน QR Code หรือคลิกลิงก์ด้านล่างเพื่อเปิดไฟล์บน Google Drive / เบราว์เซอร์:")}</div>
          ${ie.map((m,x)=>{const E=m.url?_s(m.url):"",_=(m.name.split(".").pop()||"FILE").toUpperCase(),Ae=m.size?m.size<1024*1024?`${(m.size/1024).toFixed(1)} KB`:`${(m.size/(1024*1024)).toFixed(1)} MB`:"";return`
              <div class="file-attachment-card">
                <div class="file-attachment-info">
                  <div class="file-attachment-name">#${x+1} [${O(_)}] ${O(m.name)}</div>
                  <div class="file-attachment-meta">
                    ${Ae?`ขนาด: ${Ae}`:""}
                    ${m.uploadedAt?` · บันทึกเมื่อ: ${new Date(m.uploadedAt).toLocaleDateString("th-TH")}`:""}
                  </div>
                  <div class="file-attachment-link">
                    <a href="${O(m.url)}" target="_blank" rel="noopener noreferrer">${O(m.url)}</a>
                  </div>
                </div>
                ${E?`<div class="file-attachment-qr">
                        <img src="${E}" alt="QR" />
                        <div style="font-size:7px;text-align:center;color:#059669;font-weight:700;margin-top:2px;">Scan Open</div>
                      </div>`:""}
              </div>`}).join("")}
        </div>`:"",Se=k.length>0?`<div class="photo-grid">
          ${k.map((m,x)=>`
              <div class="photo-card">
                <img src="${O(m.url)}" crossorigin="anonymous" />
                <div class="photo-caption">${p(`รูปที่ ${x+1}: ${m.label}`)}</div>
              </div>`).join("")}
        </div>`:`<div class="empty-note">${p("ไม่มีรูปภาพในรายการนี้")}</div>`,be=L.length>0?L.map((m,x)=>`
          <div class="comment-box">
            <div class="comment-header">
              <span class="comment-author">${p(`ความคิดเห็นที่ #${x+1} โดย: ${m.author}`)}</span>
              <span class="comment-time">${O(new Date(m.timestamp).toLocaleString("th-TH"))}</span>
            </div>
            <div class="comment-body">${p(m.text)}</div>
            ${m.photoUrl?`<div style="margin-top:6px;"><img src="${O(m.photoUrl)}" crossorigin="anonymous" style="width:96px;height:96px;object-fit:cover;border-radius:6px;border:1px solid #cbd5e1;" /></div>`:""}
            ${m.voiceUrl?`<div class="cell-voice-badge" style="margin-top:4px;">${p("มีไฟล์เสียงแนบในความคิดเห็นนี้ (สแกน QR เพื่อฟัง)")}</div>`:""}
            ${m.replies&&m.replies.length>0?`<div class="reply-list">
                    ${m.replies.map(E=>`
                        <div class="reply-item">
                          <div class="comment-header">
                            <span class="comment-author">${p(`ตอบกลับโดย: ${E.author}${E.replyToAuthor?` (ถึง @${E.replyToAuthor})`:""}`)}</span>
                            <span class="comment-time">${O(new Date(E.timestamp).toLocaleString("th-TH"))}</span>
                          </div>
                          <div class="comment-body">${p(E.text)}</div>
                          ${E.photoUrl?`<div style="margin-top:6px;"><img src="${O(E.photoUrl)}" crossorigin="anonymous" style="width:80px;height:80px;object-fit:cover;border-radius:6px;border:1px solid #cbd5e1;" /></div>`:""}
                          ${E.voiceUrl?`<div class="cell-voice-badge" style="margin-top:4px;">${p("มีไฟล์เสียงแนบในคำตอบนี้")}</div>`:""}
                        </div>`).join("")}
                  </div>`:""}
          </div>`).join(""):`<div class="empty-note">${p("ยังไม่มีความคิดเห็นในรายการนี้")}</div>`,re=h.map((m,x)=>{const E=m.action==="handoff"?"อัปเดตสถานะการส่งต่องาน (Handoff)":m.action==="comment"?"เพิ่มความคิดเห็นในรายการ":m.action==="reply"?"ตอบกลับความคิดเห็น":m.action;return`
      <tr>
        <td style="text-align:center;font-weight:700;">${x+1}</td>
        <td><div class="cell-title">${p(m.user)}</div></td>
        <td><div class="cell-text">${p(E)}</div></td>
        <td><div class="cell-sub">${O(new Date(m.timestamp).toLocaleString("th-TH"))}</div></td>
      </tr>`}).join(""),ue=g.length>0?`<table class="data-table" style="margin-top:10px;">
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
              <th>${p("ผู้เปิดอ่าน (นามแฝง)")}</th>
              <th>${p("ระดับสิทธิ์")}</th>
              <th>${p("เปิดอ่านล่าสุดเมื่อ")}</th>
              <th style="text-align:center;">${p("จำนวนครั้ง")}</th>
            </tr>
          </thead>
          <tbody>
            ${g.map((m,x)=>`
              <tr>
                <td style="text-align:center;">${x+1}</td>
                <td><div class="cell-title">${p(`${m.alias} (${m.name})`)}</div></td>
                <td><div class="cell-text">${O(m.role.toUpperCase())}</div></td>
                <td><div class="cell-sub">${O(new Date(m.lastViewedAt).toLocaleString("th-TH"))}</div></td>
                <td style="text-align:center;font-weight:700;">${p(`${m.viewCount||1} ครั้ง`)}</td>
              </tr>`).join("")}
          </tbody>
        </table>`:`<div class="empty-note" style="margin-top:8px;">${p("ยังไม่มีประวัติผู้เปิดอ่านเพิ่มเติม")}</div>`,ae=r?`คะแนนประเมิน ${(n==null?void 0:n.rating)||5}/5 ดาว (${n!=null&&n.isFactory?"โรงงานผลิต":"หน้าร้าน/โชว์รูม"})`:`รสชาติ ${o==null?void 0:o.ratings.taste}/5 · ดีไซน์ ${o==null?void 0:o.ratings.aesthetics}/5 · คุ้มค่า ${o==null?void 0:o.ratings.value}/5 · ความไว ${o==null?void 0:o.ratings.speed}/5`;return`<!DOCTYPE html>
<html lang="th">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=840, initial-scale=0.45, minimum-scale=0.3, maximum-scale=2.0, user-scalable=yes" />
  <title>ฉันจะเป็นหัวแถว - ${O(d)}</title>
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
      <strong style="font-size:14px;">รายงานสรุปฉบับสมบูรณ์: ${O(d)}</strong>
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
          <div class="badge">${p(`${r?"รายงานซัพพลายเออร์ & โรงงาน":"รายงานเรฟร้านน้ำ & R&D"} · ${I}`)}</div>
          <h1 class="brand-title">${p(d)}</h1>
          <div class="brand-sub">${p(`${b?`${b} · `:""}หมวดหมู่: ${C}`)}</div>

          <!-- At-a-glance Multimedia & Detail Counter Pills -->
          <div class="summary-pills">
            <span class="summary-pill">${p(`รูปภาพ ${k.length} รูป`)}</span>
            <span class="summary-pill">${p(`วอยซ์เสียง ${v.length} คลิป`)}</span>
            <span class="summary-pill">${p(`วิดีโอ ${N.length} คลิป`)}</span>
            <span class="summary-pill">${p(r?`สินค้า ${((n==null?void 0:n.catalogItems)||[]).length} รายการ`:`เมนูชิม ${((o==null?void 0:o.drinkItems)||[]).length} เมนู`)}</span>
            <span class="summary-pill">${p(`คอมเมนต์ ${L.length} หัวข้อ`)}</span>
            <span class="summary-pill">${p(`ประวัติ Log ${h.length} รายการ`)}</span>
          </div>

          <div class="direct-link-bar">
            <div class="info-label" style="color:#0f172a;margin-bottom:2px;">Direct Link (Scan QR / LINE Share):</div>
            <div style="color:#059669;font-family:monospace;font-size:10px;word-break:break-all;">${O(F)}</div>
          </div>
        </div>

        <div class="header-right">
          <div class="meta-box">
            <div class="meta-platform">${p("ฉันจะเป็นหัวแถว")}</div>
            <div>LEAD THE FRONT · R&amp;D</div>
            <div style="margin-top:4px;">${p(`รหัส: ${t.id.slice(0,18)}`)}</div>
            <div>${p(`สถานะ: ${D}`)}</div>
            <div>${p(`ออกรายงาน: ${new Date().toLocaleString("th-TH")}`)}</div>
          </div>

          ${V?`<div class="qr-card">
                  <img id="report-qr-img" src="${V}" alt="QR Code" />
                  <div class="qr-label">${p("สแกนเปิดในแอป")}</div>
                  <div class="qr-sub">${p("ฟังเสียง · ดูคลิปจริง")}</div>
                </div>`:""}
        </div>
      </div>

      <!-- Group 1: Overview, Contacts, Location & Handoff -->
      <div class="section-box">
        <div class="section-title">${p("กลุ่มที่ 1: ข้อมูลหลัก พิกัดสถานที่ ช่องทางติดต่อ และการรับช่วงต่อ")}</div>
        <div class="info-grid">
          <div class="info-item">
            <span class="info-label">${p("ชื่อรายการ / ร้านค้า")}</span>
            <span class="info-value">${p(`${d}${b?` (${b})`:""}`)}</span>
          </div>
          <div class="info-item">
            <span class="info-label">${p("หมวดหมู่ & คะแนนประเมิน")}</span>
            <span class="info-value">${p(`${C} · ${ae}`)}</span>
          </div>
          <div class="info-item">
            <span class="info-label">${p("สถานที่ / ตลาด / เมือง")}</span>
            <span class="info-value">${p(P||((ee=t.location)==null?void 0:ee.addressText)||"-")}</span>
          </div>
          <div class="info-item">
            <span class="info-label">${p("พิกัด GPS & แผนที่")}</span>
            <span class="info-value">${t.location?`${t.location.lat.toFixed(5)}, ${t.location.lng.toFixed(5)} (${O(t.location.addressText||"พิกัดหน้างาน")})`:"-"}</span>
          </div>
          <div class="info-item">
            <span class="info-label">${p("ช่องทางติดต่อ (WeChat / LINE / โทรศัพท์)")}</span>
            <span class="info-value">${p(`WeChat: ${(r?n==null?void 0:n.wechatId:o==null?void 0:o.wechatId)||"-"} | LINE: ${(r?n==null?void 0:n.lineId:o==null?void 0:o.lineId)||"-"} | โทร: ${(r?n==null?void 0:n.phone:o==null?void 0:o.phone)||"-"}`)}</span>
          </div>
          <div class="info-item">
            <span class="info-label">${p("ผู้ลงพื้นที่สำรวจ & เวลาที่บันทึก")}</span>
            <span class="info-value">${p(`${t.creator.alias}${t.creator.name&&t.creator.name!==t.creator.alias?` (${t.creator.name})`:""} · ${new Date(t.creator.timestamp).toLocaleString("th-TH")}`)}</span>
          </div>
          <div class="info-item">
            <span class="info-label">${p("ผู้รับผิดชอบรับช่วงต่อ & กำหนดติดตาม")}</span>
            <span class="info-value">${p(`${t.assignedTo||"ยังไม่ระบุผู้รับผิดชอบ"} · กำหนดติดตาม: ${t.targetFollowUpDate||"-"}`)}</span>
          </div>
          <div class="info-item">
            <span class="info-label">${p("การมีส่วนร่วมของทีม (Likes & Views)")}</span>
            <span class="info-value">${p(`กดถูกใจ ${w.length} คน · เปิดอ่านแล้ว ${g.length} คน`)}</span>
          </div>
        </div>

        ${(r?n!=null&&n.memo:o!=null&&o.tastingNotes)?`<div class="note-banner">
                <div class="note-banner-title">${p(r?"บันทึกภาพรวมหน้างาน / รายละเอียดสเปกหลัก:":"บันทึกรีวิวรสชาติ & ไอเดียเรฟหน้างาน:")}</div>
                <div class="note-banner-body">${p(r?n==null?void 0:n.memo:o==null?void 0:o.tastingNotes)}</div>
              </div>`:""}

        ${t.handoffNotes?`<div class="handoff-banner">
                <div class="handoff-banner-title">${p("โน้ตการส่งมอบงาน / ผลเจรจาทีมไทย:")}</div>
                <div class="note-banner-body">${p(t.handoffNotes)}</div>
              </div>`:""}
      </div>

      <!-- Group 2: Voice Recordings & Video Clips with Thumbnail Previews -->
      <div class="section-box">
        <div class="section-title">${p(`กลุ่มที่ 2: สื่อมัลติมีเดียหน้างาน — วอยซ์เสียงบันทึก (${v.length} คลิป) & วิดีโอ (${N.length} คลิป)`)}</div>
        <div class="media-subhead">${p(`ไฟล์เสียงบันทึกหน้างานจริง (${v.length} คลิป):`)}</div>
        ${U}
        <div class="media-subhead" style="margin-top:10px;">${p(`คลิปวิดีโอหน้างานพร้อมภาพ Thumbnail พรีวิว (${N.length} คลิป):`)}</div>
        ${Q}
      </div>

      <!-- Group 3: Catalog / Drink Items -->
      ${X}

      <!-- Attached Documents & Files -->
      ${ge}

      <!-- Group 4: All Photos of This Item -->
      <div class="section-box">
        <div class="section-title">${p(`กลุ่มที่ 4: แกลเลอรีภาพถ่ายทั้งหมดของรายการนี้ (${k.length} รูป)`)}</div>
        ${Se}
      </div>

      <!-- Group 5: All Threaded Comments & Replies -->
      <div class="section-box">
        <div class="section-title">${p(`กลุ่มที่ 5: บันทึกความคิดเห็นและการตอบกลับทั้งหมด (${L.length} หัวข้อสนทนา)`)}</div>
        ${be}
      </div>

      <!-- Group 6: Activity & Handoff Log + Viewer Log -->
      <div class="section-box">
        <div class="section-title">${p(`กลุ่มที่ 6: ประวัติการดำเนินงาน (${h.length} รายการ) & ผู้เปิดอ่าน (${g.length} คน)`)}</div>
        <table class="data-table">
          <colgroup>
            <col style="width:8%;" />
            <col style="width:24%;" />
            <col style="width:44%;" />
            <col style="width:24%;" />
          </colgroup>
          <thead>
            <tr>
              <th style="text-align:center;">#</th>
              <th>${p("ผู้ปฏิบัติงาน")}</th>
              <th>${p("รายการที่ดำเนินการ / ส่งต่องาน")}</th>
              <th>${p("วันและเวลา")}</th>
            </tr>
          </thead>
          <tbody>${re}</tbody>
        </table>
        ${ue}
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
            avoid: ['tr', '.info-item', '.voice-card', '.video-card', '.photo-card', '.comment-box', '.note-banner', '.handoff-banner', '.report-header', '.file-attachment-card']
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
</html>`}function Vs(t,a,c){const r=sr(t,a,c),s=window.open("","_blank");if(s)s.document.open(),s.document.write(r),s.document.close();else{const n=new Blob([r],{type:"text/html;charset=utf-8"}),l=URL.createObjectURL(n),o=document.createElement("a");o.href=l,o.target="_blank",o.click()}}const ir=({item:t,isOpen:a,onClose:c,onShareToLine:r})=>{var $t,Ct,Et,St,Tt,Rt,At,It,Bt,Pt,Lt,Dt,Ut,Mt,zt,Ft,qt,_t,Vt,Ht,Ot,Kt,Qt,Gt,Jt,Yt,Wt,Zt,Xt,es,ts,ss,ns,rs,as;const{currentUser:s,convertCnyToThb:n,addReviewerNote:l,addReviewReply:o,updatePipelineStatus:d,toggleLikeItem:b,suppliers:C,drinkStores:P,locations:I,users:j,quickMessages:z,recordItemView:F,canEditItems:V,canDeleteItems:k,deleteSupplier:u,deleteStoreInspo:v,deleteLocation:N,canComment:M,openEditItem:g}=tn(),w=t&&t.type==="supplier"?C.find(i=>i.id===t.id):null,L=t&&t.type==="drink_store"?P.find(i=>i.id===t.id):null,S=t&&t.type==="location"?I.find(i=>i.id===t.id):null,h=w||L||S||t,[$,A]=K.useState(null),[D,U]=K.useState(""),[Q,X]=K.useState(null),[ie,ge]=K.useState({}),[Se,be]=K.useState({}),[re,ue]=K.useState(null),[ae,pe]=K.useState(null),[se,me]=K.useState(!1),[J,Y]=K.useState({}),ne=Ne.useRef(null),[W,fe]=K.useState(null),[Te,Re]=K.useState(0),de=Ne.useRef(null),he=Ne.useRef(null),ee=Ne.useRef(null),m=Ne.useRef(0),x=Ne.useCallback(()=>{var i;if(ee.current&&(clearInterval(ee.current),ee.current=null),de.current&&de.current.state==="recording"){de.current.stop();return}(i=he.current)==null||i.getTracks().forEach(f=>f.stop()),he.current=null,fe(null)},[]);K.useEffect(()=>(a&&(t!=null&&t.id)&&F(t.id,t.type),A(null),()=>{var i,f;ee.current&&clearInterval(ee.current),((i=de.current)==null?void 0:i.state)==="recording"&&de.current.stop(),(f=he.current)==null||f.getTracks().forEach(R=>R.stop())}),[a,t==null?void 0:t.id]);const E=[];if(h){if(h.type==="supplier"){const i=h;($t=i.photos.storefrontAndAtmosphere)==null||$t.forEach((f,R)=>E.push({url:f,label:`ป้ายหน้าร้าน/บรรยากาศ #${R+1}`})),(Ct=i.photos.contactCards)==null||Ct.forEach((f,R)=>E.push({url:f,label:`นามบัตร/WeChat #${R+1}`})),(Et=i.catalogItems)==null||Et.forEach((f,R)=>{f.photo&&E.push({url:f.photo,label:f.name?`สินค้า: ${f.name}`:`รายการสินค้า #${R+1}`})})}else if(h.type==="drink_store"){const i=h;(St=i.photos.storefrontAndAtmosphere)==null||St.forEach((f,R)=>E.push({url:f,label:`หน้าร้าน/บรรยากาศ #${R+1}`})),(Tt=i.photos.menuBoard)==null||Tt.forEach((f,R)=>E.push({url:f,label:`เมนูบอร์ด #${R+1}`})),(Rt=i.photos.drinkCups)==null||Rt.forEach((f,R)=>E.push({url:f,label:`แก้วเครื่องดื่ม #${R+1}`})),(At=i.drinkItems)==null||At.forEach((f,R)=>{f.photo&&E.push({url:f.photo,label:f.name?`เมนู: ${f.name}`:`เมนูชิม #${R+1}`})})}else if(h.type==="location"){const i=h;(It=i.photos.storefrontAndAtmosphere)==null||It.forEach((f,R)=>E.push({url:f,label:`หน้าร้าน/ทางเดิน #${R+1}`})),(Bt=i.photos.floorPlanAndSpecs)==null||Bt.forEach((f,R)=>E.push({url:f,label:`ผังห้อง/งานระบบ #${R+1}`})),(Pt=i.photos.surroundingNeighbors)==null||Pt.forEach((f,R)=>E.push({url:f,label:`ร้านข้างเคียง #${R+1}`})),(Lt=i.photos.contactCards)==null||Lt.forEach((f,R)=>E.push({url:f,label:`นามบัตร/เอกสาร #${R+1}`}))}}if(K.useEffect(()=>{if($===null||E.length===0)return;const i=f=>{f.key==="ArrowRight"?A(R=>R!==null?(R+1)%E.length:null):f.key==="ArrowLeft"?A(R=>R!==null?(R-1+E.length)%E.length:null):f.key==="Escape"&&A(null)};return window.addEventListener("keydown",i),()=>window.removeEventListener("keydown",i)},[$,E.length]),!a||!h)return null;const _=h.type==="supplier",Ae=h.type==="drink_store",Z=h.type==="location",T=_?h:null,B=Ae?h:null,y=Z?h:null,Le=Array.isArray(h.likes)?h.likes:[],ft=Le.some(i=>i.userId===s.id),xt=h.attachedFiles||[],gt=h.videos||[],bt=oe(h),vt=_?(T==null?void 0:T.catalogItems)||[]:[],wt=Ae?(B==null?void 0:B.drinkItems)||[]:[],yt=i=>{const f=E.findIndex(R=>R.url===i);A(f>=0?f:0)},jt=async()=>{if(!h)return;const i=_?T==null?void 0:T.name:Z?y==null?void 0:y.name:B==null?void 0:B.storeName;if(window.confirm(`ยืนยันการลบรายการ "${i||"รายการนี้"}" หรือไม่?`))try{h.type==="supplier"?await u(h.id):h.type==="drink_store"?await v(h.id):h.type==="location"&&await N(h.id),c()}catch{alert("เกิดข้อผิดพลาดในการลบรายการ")}},_e=async(i,f,R)=>{try{me(!0);const H=await jn(i,{recordId:h.id,recordType:h.type,recordTitle:_?T==null?void 0:T.name:Z?y==null?void 0:y.name:B==null?void 0:B.storeName});R?Y(G=>({...G,[R]:{...G[R],...f==="photo"?{photoUrl:H}:{voiceUrl:H}}})):f==="photo"?ue(H):pe(H)}catch(H){alert(H.message||"อัปโหลดไฟล์แนบไม่สำเร็จ")}finally{me(!1)}},Nt=async i=>{var f,R;if(W===i){x();return}W&&x();try{if(!((f=navigator.mediaDevices)!=null&&f.getUserMedia)||typeof MediaRecorder>"u"){alert("เบราว์เซอร์นี้ไม่รองรับการอัดเสียงสด กรุณาเปิดผ่าน HTTPS หรืออนุญาตไมโครโฟน");return}const H=await navigator.mediaDevices.getUserMedia({audio:!0});he.current=H;const G=["audio/mp4","audio/webm;codecs=opus","audio/webm","audio/ogg"].find(te=>MediaRecorder.isTypeSupported(te)),le=new MediaRecorder(H,G?{mimeType:G}:void 0);de.current=le;const ve=[];le.ondataavailable=te=>{te.data.size>0&&ve.push(te.data)},le.onstop=()=>{var Ie;ee.current&&(clearInterval(ee.current),ee.current=null),H.getTracks().forEach(Me=>Me.stop()),he.current=null,fe(null);const te=((Ie=le.mimeType)==null?void 0:Ie.split(";")[0])||"audio/webm",q=new Blob(ve,{type:te});if(!q.size)return;const Ve=te.includes("mp4")?"m4a":te.includes("ogg")?"ogg":"webm",Ue=new File([q],`เสียงคอมเมนต์-${Date.now()}.${Ve}`,{type:te});_e(Ue,"audio",i==="main"?void 0:i)},le.onerror=()=>{ee.current&&clearInterval(ee.current),H.getTracks().forEach(te=>te.stop()),fe(null),alert("อัดเสียงไม่สำเร็จ กรุณาลองใหม่")},m.current=Date.now(),Re(0),fe(i),le.start(250),ee.current=setInterval(()=>{Re(Math.round((Date.now()-m.current)/1e3))},1e3)}catch{(R=he.current)==null||R.getTracks().forEach(H=>H.stop()),fe(null),alert("ไม่ได้รับสิทธิ์ใช้ไมโครโฟน กรุณากดอนุญาตไมโครโฟนเพื่ออัดเสียงสด")}},Ys=async i=>{i.preventDefault();const f=D.trim();!f&&!re&&!ae||!await l(h.id,h.type,f,{photoUrl:re||void 0,voiceUrl:ae||void 0})||(U(""),ue(null),pe(null))},kt=async(i,f,R)=>{const H=(ie[i]||"").trim(),G=J[i];!H&&!(G!=null&&G.photoUrl)&&!(G!=null&&G.voiceUrl)||!await o(h.id,h.type,i,H,f,{photoUrl:G==null?void 0:G.photoUrl,voiceUrl:G==null?void 0:G.voiceUrl,replyToId:R})||(ge({...ie,[i]:""}),Y(ve=>({...ve,[i]:{}})),X(null))},Ws=i=>{T&&d(T.id,i)},De=oe(h);return(Dt=De[0])!=null&&Dt.url||(_?T==null||T.voiceNoteUrl:B==null||B.voiceNoteUrl),e.jsxs("div",{className:"fixed inset-0 z-[90] bg-black/45 backdrop-blur-sm flex items-center justify-center p-2 sm:p-4 overflow-y-auto",children:[e.jsxs("div",{className:"bg-white border border-slate-200/90 w-full max-w-3xl rounded-2xl shadow-2xl overflow-hidden my-auto animate-in zoom-in-95 max-h-[94vh] flex flex-col text-slate-900",children:[e.jsxs("div",{className:"p-3.5 sm:p-4 border-b border-slate-100 space-y-2.5 bg-white sticky top-0 z-10",children:[e.jsxs("div",{className:"flex items-start justify-between gap-2.5",children:[e.jsxs("div",{className:"flex items-start gap-2.5 min-w-0 flex-1",children:[e.jsx("span",{className:`p-2 rounded-xl shrink-0 mt-0.5 ${_?"bg-emerald-50 text-emerald-700":Z?"bg-sky-50 text-sky-700":"bg-amber-50 text-amber-700"}`,children:_?e.jsx(sn,{className:"w-4 h-4 sm:w-5 sm:h-5 text-emerald-600"}):Z?e.jsx("i",{"aria-hidden":"true",className:"fa-solid fa-map-location-dot text-base text-sky-600"}):e.jsx(os,{className:"w-4 h-4 sm:w-5 sm:h-5 text-amber-600"})}),e.jsxs("div",{className:"min-w-0 flex-1",children:[e.jsx("h2",{className:"font-extrabold text-slate-900 text-sm sm:text-base leading-snug break-words",children:_?T==null?void 0:T.name:Z?y==null?void 0:y.name:B==null?void 0:B.storeName}),e.jsx("p",{className:"text-xs text-slate-400 truncate mt-0.5",children:_?(T==null?void 0:T.chineseName)||(T==null?void 0:T.marketOrCity):Z?(y==null?void 0:y.zoneOrFloor)||(y==null?void 0:y.foreignName):(B==null?void 0:B.chineseName)||(B==null?void 0:B.storeCategory)||(B==null?void 0:B.brandConcept)})]})]}),e.jsx("button",{type:"button",onClick:c,className:"w-7 h-7 sm:w-8 sm:h-8 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-600 transition-all active:scale-95 flex items-center justify-center shrink-0",title:"ปิดหน้าต่าง",children:e.jsx(ke,{className:"w-4 h-4"})})]}),e.jsxs("div",{className:"flex items-center gap-1.5 overflow-x-auto no-scrollbar pt-2 border-t border-slate-100 select-none",children:[V&&e.jsxs("button",{type:"button",onClick:()=>g(h),className:"h-7 sm:h-8 px-2.5 rounded-xl bg-amber-50 hover:bg-amber-100 text-amber-800 border border-amber-200/90 text-xs font-bold active:scale-95 transition-all inline-flex items-center gap-1 whitespace-nowrap shrink-0",title:"แก้ไขข้อมูลรายการนี้ (Admin / Editor)",children:[e.jsx(is,{className:"w-3 h-3 text-amber-600 shrink-0"}),e.jsx("span",{children:"แก้ไข"})]}),k&&e.jsxs("button",{type:"button",onClick:jt,className:"h-7 sm:h-8 px-2.5 rounded-xl bg-rose-50 hover:bg-rose-100 text-rose-700 border border-rose-200 text-xs font-bold active:scale-95 transition-all inline-flex items-center gap-1 whitespace-nowrap shrink-0",title:"ลบรายการ",children:[e.jsx(ls,{className:"w-3 h-3 text-rose-600 shrink-0"}),e.jsx("span",{children:"ลบรายการ"})]}),e.jsxs("button",{type:"button",onClick:()=>b(h.id,h.type),className:`h-7 sm:h-8 px-2.5 rounded-xl border transition-all active:scale-95 inline-flex items-center gap-1 text-xs font-bold whitespace-nowrap shrink-0 ${ft?"bg-blue-50 text-blue-700 border-blue-200":"bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100"}`,title:`ถูกใจ (${Le.length})`,children:[e.jsx(nn,{className:`w-3 h-3 shrink-0 ${ft?"fill-blue-600 text-blue-600":""}`}),e.jsxs("span",{children:["ถูกใจ",Le.length>0?` (${Le.length})`:""]})]}),e.jsxs("button",{type:"button",onClick:()=>r(h),className:"h-7 sm:h-8 px-2.5 rounded-xl bg-[#06C755] hover:bg-[#05b34c] text-white text-xs font-bold transition-all active:scale-95 inline-flex items-center gap-1 whitespace-nowrap shrink-0 shadow-2xs",title:"แชร์ลิงก์เข้า LINE",children:[e.jsx(rn,{className:"w-3 h-3 shrink-0"}),e.jsx("span",{children:"แชร์ LINE"})]}),e.jsxs("button",{type:"button",onClick:()=>Vs(h,n,"pdf"),className:"h-7 sm:h-8 px-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold transition-all active:scale-95 inline-flex items-center gap-1 whitespace-nowrap shrink-0",title:"ดาวน์โหลดรายงานเป็นไฟล์ PDF",children:[e.jsx(Tn,{className:"w-3 h-3 text-emerald-400 shrink-0"}),e.jsx("span",{children:"ดาวน์โหลด PDF"})]}),e.jsxs("button",{type:"button",onClick:()=>Vs(h,n,"print"),className:"h-7 sm:h-8 px-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold transition-all border border-slate-200/80 active:scale-95 inline-flex items-center gap-1 whitespace-nowrap shrink-0",title:"พิมพ์รายงานฉบับจัดหน้าสวยงาม (Print)",children:[e.jsx(Sn,{className:"w-3 h-3 text-slate-600 shrink-0"}),e.jsx("span",{children:"พิมพ์"})]})]})]}),e.jsxs("div",{className:"p-4 sm:p-6 space-y-4 overflow-y-auto flex-1",children:[e.jsxs("div",{className:"flex flex-wrap items-center justify-between gap-2 p-3 bg-slate-50 rounded-xl border border-slate-100 text-xs",children:[e.jsxs("div",{className:"flex items-center gap-2.5",children:[e.jsx(qe,{src:h.creator.avatar,alt:h.creator.alias,className:"w-8 h-8 rounded-full object-cover ring-2 ring-emerald-500/20 shadow-xs"}),e.jsxs("div",{children:[e.jsx("div",{className:"text-slate-800 font-bold flex items-center gap-1.5",children:e.jsxs("span",{children:["ผู้ลงพื้นที่สำรวจ: ",h.creator.alias,h.creator.name&&h.creator.name!==h.creator.alias?` (${h.creator.name})`:""]})}),e.jsxs("div",{className:"text-[11px] text-slate-400 font-mono",children:["บันทึกเมื่อ: ",new Date(h.creator.timestamp).toLocaleString("th-TH")]})]})]}),e.jsxs("div",{className:"flex items-center gap-2 flex-wrap",children:[e.jsx(an,{viewedBy:h.viewedBy,size:"md"}),_&&T&&e.jsxs("div",{className:"flex items-center gap-1.5",children:[e.jsx("span",{className:"text-[11px] text-slate-500",children:"สถานะ:"}),e.jsxs("select",{value:T.status,onChange:i=>Ws(i.target.value),className:"bg-white border border-slate-200 text-slate-800 text-xs font-bold rounded-lg px-2.5 py-1 focus:outline-none focus:border-emerald-500",children:[e.jsx("option",{value:"scouted",children:"1. สำรวจแล้ว"}),e.jsx("option",{value:"reviewing",children:"2. เทียบสเปก"}),e.jsx("option",{value:"rfq_sent",children:"3. ส่ง RFQ"}),e.jsx("option",{value:"shortlisted",children:"4. ตัวเต็ง (Shortlist)"}),e.jsx("option",{value:"ordered",children:"5. สั่งซื้อแล้ว (Ordered)"})]})]})]})]}),De.length>0&&e.jsxs("div",{className:"p-3 bg-emerald-50/70 border border-emerald-200/80 rounded-xl space-y-2",children:[e.jsxs("div",{className:"text-xs font-bold text-emerald-950 flex items-center justify-between",children:[e.jsxs("span",{className:"flex items-center gap-1.5",children:[e.jsx($e,{className:"w-3.5 h-3.5 text-emerald-600"}),e.jsxs("span",{children:["วอยซ์เสียงบันทึกหน้างานจริง (",De.length," คลิป)"]})]}),e.jsx("span",{className:"text-[10px] font-mono text-emerald-700",children:"แตะ ▶ เพื่อฟังเสียงบันทึก"})]}),e.jsx("div",{className:"grid grid-cols-1 sm:grid-cols-2 gap-2",children:De.map((i,f)=>e.jsxs("div",{className:"p-2.5 bg-white border border-emerald-200 rounded-xl flex flex-col justify-between gap-1.5 shadow-2xs",children:[e.jsxs("div",{className:"flex items-center justify-between gap-2 min-w-0",children:[e.jsxs("div",{className:"text-xs font-bold text-slate-900 truncate flex items-center gap-1.5",children:[e.jsx($e,{className:"w-3.5 h-3.5 text-emerald-600 shrink-0"}),e.jsx("span",{className:"truncate",children:i.label||`คลิปเสียง #${f+1}`})]}),e.jsx("span",{className:"text-[10px] text-emerald-700 font-mono shrink-0",children:i.durationSec?`${i.durationSec} วินาที`:"เสียงบันทึก"})]}),i.url&&e.jsx("audio",{controls:!0,preload:"metadata",playsInline:!0,src:i.url,className:"h-8 w-full rounded-lg"})]},i.id||f))})]}),e.jsxs("div",{className:"p-3 bg-slate-50 rounded-xl border border-slate-100 space-y-2 text-xs",children:[e.jsxs("div",{className:"flex flex-wrap items-center gap-1.5",children:[_&&T?e.jsxs(e.Fragment,{children:[e.jsxs("span",{className:"px-2.5 py-1 rounded-lg bg-emerald-600 text-white text-[11px] font-bold inline-flex items-center gap-1",children:[e.jsx("i",{className:"fa-solid fa-industry text-[10px]"}),e.jsx("span",{children:T.category})]}),e.jsx("span",{className:"px-2 py-1 rounded-lg bg-white border border-slate-200 text-slate-700 text-[11px] font-bold",children:T.isFactory?"โรงงานผลิต":"หน้าร้าน / โชว์รูม"}),e.jsxs("span",{className:"px-2 py-1 rounded-lg bg-amber-50 border border-amber-200 text-amber-700 text-[11px] font-mono font-bold inline-flex items-center gap-1",children:[e.jsx("i",{className:"fa-solid fa-star text-[10px] text-amber-500"}),e.jsxs("span",{children:[T.rating||5,"/5"]})]}),(T.quickTags||[]).map((i,f)=>e.jsxs("span",{className:"px-2 py-1 rounded-lg bg-white border border-slate-200 text-slate-700 text-[11px] font-semibold",children:["#",i]},f))]}):B?e.jsxs(e.Fragment,{children:[e.jsxs("span",{className:"px-2.5 py-1 rounded-lg bg-amber-600 text-white text-[11px] font-bold inline-flex items-center gap-1",children:[e.jsx("i",{className:"fa-solid fa-mug-hot text-[10px]"}),e.jsx("span",{children:B.storeCategory||"เรฟร้านน้ำ"})]}),B.ratings&&e.jsxs("span",{className:"px-2 py-1 rounded-lg bg-amber-50 border border-amber-200 text-amber-800 text-[11px] font-mono font-bold inline-flex items-center gap-1",children:[e.jsx("i",{className:"fa-solid fa-star text-[10px] text-amber-500"}),e.jsx("span",{children:((B.ratings.taste+B.ratings.aesthetics+B.ratings.value+B.ratings.speed)/4).toFixed(1)})]})]}):Z&&y?e.jsxs(e.Fragment,{children:[e.jsxs("span",{className:"px-2.5 py-1 rounded-lg bg-sky-600 text-white text-[11px] font-bold inline-flex items-center gap-1",children:[e.jsx("i",{className:"fa-solid fa-map-location-dot text-[10px]"}),e.jsx("span",{children:y.locationType==="mall"?"ห้างสรรพสินค้า":y.locationType})]}),e.jsxs("span",{className:"px-2 py-1 rounded-lg bg-white border border-slate-200 text-slate-700 text-[11px] font-bold",children:["ผัง ",((Ut=y.spaceSpecs)==null?void 0:Ut.layoutFormat)||"Inline"]}),y.ratings&&e.jsxs("span",{className:"px-2 py-1 rounded-lg bg-amber-50 border border-amber-200 text-amber-800 text-[11px] font-mono font-bold inline-flex items-center gap-1",children:[e.jsx("i",{className:"fa-solid fa-star text-[10px] text-amber-500"}),e.jsx("span",{children:((y.ratings.footTraffic+y.ratings.visibility+y.ratings.accessibility+y.ratings.valueRoi)/4).toFixed(1)})]}),(y.quickTags||[]).map((i,f)=>e.jsxs("span",{className:"px-2 py-1 rounded-lg bg-white border border-slate-200 text-slate-700 text-[11px] font-semibold",children:["#",i]},f))]}):null,vt.length>0&&e.jsxs("span",{className:"px-2.5 py-1 rounded-lg bg-amber-50 border border-amber-200 text-amber-800 text-[11px] font-bold inline-flex items-center gap-1 shadow-2xs",children:[e.jsx(on,{className:"w-3 h-3 text-amber-600"}),e.jsxs("span",{children:[vt.length," สินค้า"]})]}),wt.length>0&&e.jsxs("span",{className:"px-2.5 py-1 rounded-lg bg-amber-50 border border-amber-200 text-amber-800 text-[11px] font-bold inline-flex items-center gap-1 shadow-2xs",children:[e.jsx(os,{className:"w-3 h-3 text-amber-600"}),e.jsxs("span",{children:[wt.length," เมนู"]})]}),gt.length>0&&e.jsxs("span",{className:"px-2.5 py-1 rounded-lg bg-purple-50 border border-purple-200 text-purple-700 text-[11px] font-bold inline-flex items-center gap-1 shadow-2xs",children:[e.jsx("i",{className:"fa-solid fa-video text-[9px] text-purple-600"}),e.jsxs("span",{children:[gt.length," คลิป"]})]}),bt.length>0&&e.jsxs("span",{className:"px-2.5 py-1 rounded-lg bg-rose-50 border border-rose-200 text-rose-700 text-[11px] font-bold inline-flex items-center gap-1 shadow-2xs",children:[e.jsx(Be,{className:"w-3 h-3 text-rose-600"}),e.jsxs("span",{children:[bt.length," คลิปเสียง"]})]}),xt.length>0&&e.jsxs("a",{href:"#detail-attached-files-section",onClick:i=>{var f;i.preventDefault(),(f=document.getElementById("detail-attached-files-section"))==null||f.scrollIntoView({behavior:"smooth"})},className:"px-2.5 py-1 rounded-lg bg-sky-50 border border-sky-200 text-sky-700 text-[11px] font-bold inline-flex items-center gap-1 hover:bg-sky-100 transition-colors cursor-pointer shadow-2xs",title:"คลิกเพื่อเลื่อนดูไฟล์แนบ",children:[e.jsx(cs,{className:"w-3 h-3 text-sky-600"}),e.jsxs("span",{children:[xt.length," ไฟล์แนบ"]})]})]}),e.jsxs("div",{className:"flex flex-wrap items-center justify-between gap-2 pt-1.5 border-t border-slate-200/60 text-[11px] text-slate-600",children:[e.jsxs("div",{className:"flex flex-wrap items-center gap-2",children:[e.jsxs("span",{className:"inline-flex items-center gap-1 font-semibold text-slate-800",children:[e.jsx(ln,{className:"w-3.5 h-3.5 text-sky-600 shrink-0"}),e.jsx("span",{children:_?(T==null?void 0:T.marketOrCity)||(T==null?void 0:T.address)||((Mt=T==null?void 0:T.location)==null?void 0:Mt.addressText):Z?((zt=y==null?void 0:y.location)==null?void 0:zt.addressText)||(y==null?void 0:y.zoneOrFloor):((Ft=B==null?void 0:B.location)==null?void 0:Ft.addressText)||(B==null?void 0:B.city)})]}),(_?T==null?void 0:T.wechatId:Z?(qt=y==null?void 0:y.leaseTerms)==null?void 0:qt.contactLineWechat:B==null?void 0:B.wechatId)&&e.jsxs("span",{className:"px-2 py-0.5 rounded bg-white border border-slate-200 font-mono",children:["LINE/WeChat: ",_?T==null?void 0:T.wechatId:Z?(_t=y==null?void 0:y.leaseTerms)==null?void 0:_t.contactLineWechat:B==null?void 0:B.wechatId]}),(_?T==null?void 0:T.phone:Z?(Vt=y==null?void 0:y.leaseTerms)==null?void 0:Vt.contactPhone:B==null?void 0:B.phone)&&e.jsxs("span",{className:"px-2 py-0.5 rounded bg-white border border-slate-200 font-mono",children:["โทร: ",_?T==null?void 0:T.phone:Z?(Ht=y==null?void 0:y.leaseTerms)==null?void 0:Ht.contactPhone:B==null?void 0:B.phone]}),Z&&((Ot=y==null?void 0:y.leaseTerms)==null?void 0:Ot.contactPerson)&&e.jsxs("span",{className:"px-2 py-0.5 rounded bg-white border border-slate-200",children:["ผู้ติดต่อ: ",y.leaseTerms.contactPerson]})]}),(Kt=h.location)!=null&&Kt.lat&&((Qt=h.location)!=null&&Qt.lng)&&(h.location.lat!==0||h.location.lng!==0)?e.jsx("a",{href:`https://www.google.com/maps?q=${h.location.lat},${h.location.lng}`,target:"_blank",rel:"noreferrer",className:"text-[11px] font-bold text-sky-700 hover:underline shrink-0",children:"เปิด Google Maps ↗"}):e.jsx("span",{className:"text-[10px] text-slate-400 font-medium shrink-0",children:"📍 ยังไม่ได้ระบุพิกัด GPS"})]})]}),Z&&y&&e.jsxs("div",{className:"p-3.5 rounded-xl border border-sky-200 bg-sky-50/50 space-y-3",children:[e.jsxs("div",{className:"text-[11px] font-bold text-sky-900 flex items-center justify-between",children:[e.jsxs("span",{className:"flex items-center gap-1.5",children:[e.jsx(cn,{className:"w-3.5 h-3.5 text-sky-600"}),e.jsx("span",{children:"สเปกพื้นที่ & เงื่อนไขสัญญาเช่า (Location Scouting Specs)"})]}),e.jsxs("span",{className:"text-[10px] px-2 py-0.5 rounded-full bg-white text-sky-800 font-mono font-bold border border-sky-200",children:[y.zoneOrFloor," ",y.unitNumber?`(${y.unitNumber})`:""]})]}),e.jsxs("div",{className:"grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs",children:[e.jsxs("div",{className:"bg-white p-2 rounded-lg border border-slate-200 text-center",children:[e.jsx("div",{className:"text-[10px] text-slate-500 font-bold",children:"ขนาดพื้นที่"}),e.jsxs("div",{className:"font-extrabold text-sm text-slate-900 font-mono mt-0.5",children:[((Gt=y.spaceSpecs)==null?void 0:Gt.usableAreaSqm)||"-"," ",e.jsx("span",{className:"text-[10px] font-normal text-slate-500",children:"ตร.ม."})]})]}),e.jsxs("div",{className:"bg-white p-2 rounded-lg border border-slate-200 text-center",children:[e.jsx("div",{className:"text-[10px] text-slate-500 font-bold",children:"หน้ากว้าง / เพดาน"}),e.jsxs("div",{className:"font-extrabold text-sm text-slate-900 font-mono mt-0.5",children:[((Jt=y.spaceSpecs)==null?void 0:Jt.frontageWidthM)||"-","ม. / ",((Yt=y.spaceSpecs)==null?void 0:Yt.ceilingHeightM)||"-","ม."]})]}),e.jsxs("div",{className:"bg-white p-2 rounded-lg border border-slate-200 text-center",children:[e.jsx("div",{className:"text-[10px] text-slate-500 font-bold",children:"ค่าเช่ารายเดือน"}),e.jsx("div",{className:"font-extrabold text-sm text-amber-950 font-mono mt-0.5 truncate",children:(Wt=y.leaseTerms)!=null&&Wt.monthlyRentThb?e.jsxs(e.Fragment,{children:["฿",y.leaseTerms.monthlyRentThb.toLocaleString()]}):(Zt=y.leaseTerms)!=null&&Zt.monthlyRentRmb?e.jsxs(e.Fragment,{children:["¥",y.leaseTerms.monthlyRentRmb.toLocaleString()]}):e.jsx("span",{className:"text-slate-400",children:"สอบถาม"})})]}),e.jsxs("div",{className:"bg-white p-2 rounded-lg border border-slate-200 text-center",children:[e.jsx("div",{className:"text-[10px] text-slate-500 font-bold",children:"เงื่อนไขสัญญา"}),e.jsxs("div",{className:"font-extrabold text-xs text-slate-900 font-mono mt-0.5 truncate",children:["สัญญา ",((Xt=y.leaseTerms)==null?void 0:Xt.leasePeriodYears)||3," ปี · ประกัน ",((es=y.leaseTerms)==null?void 0:es.depositMonths)||3," ด."]})]})]}),e.jsxs("div",{className:"flex flex-wrap items-center gap-1.5 pt-1 text-xs",children:[e.jsxs("span",{className:"px-2 py-0.5 rounded-md bg-white border border-slate-200 text-slate-700 font-semibold flex items-center gap-1",children:[e.jsx(ds,{className:"w-3 h-3 text-amber-500"}),e.jsxs("span",{children:["สเปกไฟ: ",((ts=y.spaceSpecs)==null?void 0:ts.electricalPower)||"3 เฟส 45 kVA"]})]}),e.jsxs("span",{className:"px-2 py-0.5 rounded-md bg-white border border-slate-200 text-slate-700 font-semibold flex items-center gap-1",children:[e.jsx(dn,{className:"w-3 h-3 text-blue-500"}),e.jsxs("span",{children:["ท่อน้ำดี: ",(ss=y.spaceSpecs)!=null&&ss.hasWaterInflow?"✓ มีในห้อง":"✗ ไม่มี"]})]}),e.jsxs("span",{className:"px-2 py-0.5 rounded-md bg-white border border-slate-200 text-slate-700 font-semibold flex items-center gap-1",children:[e.jsx(hn,{className:"w-3 h-3 text-teal-500"}),e.jsxs("span",{children:["ท่อน้ำทิ้ง: ",(ns=y.spaceSpecs)!=null&&ns.hasDrainage?"✓ มีในห้อง":"✗ ไม่มี"]})]}),e.jsxs("span",{className:"px-2 py-0.5 rounded-md bg-white border border-slate-200 text-slate-700 font-semibold flex items-center gap-1",children:[e.jsx(un,{className:"w-3 h-3 text-purple-500"}),e.jsxs("span",{children:["ดักไขมัน: ",(rs=y.spaceSpecs)!=null&&rs.hasGreaseTrap?"✓ มีรองรับ":"✗ ต้องติดตั้งเอง"]})]}),((as=y.spaceSpecs)==null?void 0:as.riderAccessNotes)&&e.jsxs("span",{className:"px-2 py-0.5 rounded-md bg-white border border-slate-200 text-slate-700 font-semibold flex items-center gap-1",children:[e.jsx(pn,{className:"w-3 h-3 text-emerald-600"}),e.jsxs("span",{children:["ไรเดอร์: ",y.spaceSpecs.riderAccessNotes]})]})]}),y.handoffNotes&&e.jsxs("div",{className:"pt-2 border-t border-sky-200/80 text-xs",children:[e.jsx("span",{className:"font-bold text-sky-900 block mb-0.5",children:"ประเด็นเจรจา / ส่งมอบงาน:"}),e.jsx("p",{className:"text-slate-800 whitespace-pre-wrap",children:y.handoffNotes})]})]}),(_&&(T==null?void 0:T.memo)||!_&&(B==null?void 0:B.tastingNotes))&&e.jsxs("div",{className:`p-3.5 rounded-xl border space-y-1 ${_?"bg-emerald-50/50 border-emerald-200/80":"bg-amber-50/50 border-amber-200/80"}`,children:[e.jsxs("div",{className:"text-[11px] font-bold text-slate-600 flex items-center gap-1.5",children:[e.jsx("i",{className:`fa-solid ${_?"fa-clipboard-check text-emerald-600":"fa-quote-left text-amber-600"} text-[10px]`}),e.jsx("span",{children:_?"บันทึกหน้างาน / รายละเอียดหลัก:":"บันทึกรีวิวรสชาติ & ไอเดียเรฟ:"})]}),e.jsx("p",{className:"text-xs sm:text-[13px] text-slate-900 leading-relaxed whitespace-pre-wrap font-medium",children:_?T==null?void 0:T.memo:B==null?void 0:B.tastingNotes})]}),_&&T&&(T.catalogItems||[]).length>0&&e.jsxs("div",{className:"space-y-2",children:[e.jsx("div",{className:"flex items-center justify-between",children:e.jsxs("span",{className:"text-xs font-bold text-slate-800",children:["รายการอุปกรณ์ & สินค้า (",(T.catalogItems||[]).length," รายการ):"]})}),e.jsx("div",{className:"grid grid-cols-1 sm:grid-cols-2 gap-3",children:(T.catalogItems||[]).map((i,f)=>e.jsxs("div",{className:"p-3 rounded-xl border border-slate-200 bg-white flex gap-3 shadow-xs",children:[i.photo?e.jsx("img",{src:i.photo,alt:"",onClick:()=>yt(i.photo),className:"w-16 h-16 rounded-lg object-cover cursor-pointer border border-slate-100 hover:opacity-90"}):e.jsx("div",{className:"w-16 h-16 rounded-lg bg-slate-100 border border-slate-200 flex items-center justify-center text-slate-400 text-xs",children:"ไม่มีรูป"}),e.jsxs("div",{className:"min-w-0 flex-1 space-y-1",children:[e.jsx("div",{className:"font-bold text-xs text-slate-900 truncate",children:i.name||`รายการที่ ${f+1}`}),i.priceRmb&&e.jsxs("div",{className:"text-xs font-mono font-bold text-emerald-700",children:["¥",i.priceRmb," ",e.jsxs("span",{className:"text-[11px] font-normal text-slate-500",children:["(≈",n(i.priceRmb).toLocaleString(),"฿)"]})]}),i.priceThb&&!i.priceRmb&&e.jsxs("div",{className:"text-xs font-mono font-bold text-emerald-700",children:["฿",i.priceThb.toLocaleString()]}),i.weightKg&&e.jsxs("div",{className:"text-[11px] text-slate-500",children:["น้ำหนัก: ",e.jsx("span",{className:"font-mono",children:i.weightKg})]}),i.memo&&e.jsx("p",{className:"text-[11px] text-slate-600 whitespace-pre-wrap leading-relaxed",children:i.memo}),oe(i).length>0&&e.jsx("div",{className:"space-y-1 pt-1",children:oe(i).map((R,H)=>e.jsxs("div",{className:"flex flex-col sm:flex-row sm:items-center gap-1 bg-emerald-50/90 p-1.5 rounded-lg border border-emerald-200/80",children:[e.jsxs("span",{className:"text-[10px] font-bold text-emerald-900 truncate min-w-0 flex items-center gap-1",children:[e.jsx($e,{className:"w-3 h-3 text-emerald-600 shrink-0"}),e.jsx("span",{className:"truncate",children:R.label||`เสียง #${H+1}`}),R.durationSec?`(${R.durationSec}s)`:""]}),R.url&&e.jsx("audio",{controls:!0,preload:"metadata",playsInline:!0,src:R.url,className:"h-6 w-full sm:w-44 shrink-0"})]},H))})]})]},i.id||f))})]}),!_&&B&&(B.drinkItems||[]).length>0&&e.jsxs("div",{className:"space-y-2",children:[e.jsx("div",{className:"flex items-center justify-between",children:e.jsxs("span",{className:"text-xs font-bold text-slate-800",children:["เมนูที่ชิม & ถอดรหัสสูตร (",(B.drinkItems||[]).length," เมนู):"]})}),e.jsx("div",{className:"grid grid-cols-1 sm:grid-cols-2 gap-3",children:(B.drinkItems||[]).map((i,f)=>e.jsxs("div",{className:"p-3 rounded-xl border border-amber-200/80 bg-amber-50/20 flex gap-3 shadow-xs",children:[i.photo&&e.jsx("img",{src:i.photo,alt:"",onClick:()=>yt(i.photo),className:"w-16 h-16 rounded-lg object-cover cursor-pointer border border-amber-200"}),e.jsxs("div",{className:"min-w-0 flex-1 space-y-1",children:[e.jsx("div",{className:"font-bold text-xs text-slate-900 truncate",children:i.name||`แก้วที่ #${f+1}`}),i.priceRmb&&e.jsxs("div",{className:"text-xs font-mono font-bold text-amber-700",children:["¥",i.priceRmb," ",e.jsxs("span",{className:"text-[11px] font-normal text-slate-500",children:["(≈",n(i.priceRmb),"฿)"]})]}),i.fitMenuTarget&&e.jsxs("div",{className:"text-[11px] font-semibold text-emerald-700",children:["ต่อยอด: ",i.fitMenuTarget]}),i.gimmickNotes&&e.jsx("p",{className:"text-[11px] text-slate-600",children:i.gimmickNotes}),oe(i).length>0&&e.jsx("div",{className:"space-y-1 pt-1",children:oe(i).map((R,H)=>e.jsxs("div",{className:"flex flex-col sm:flex-row sm:items-center gap-1 bg-amber-50/90 p-1.5 rounded-lg border border-amber-200/80",children:[e.jsxs("span",{className:"text-[10px] font-bold text-amber-900 truncate min-w-0 flex items-center gap-1",children:[e.jsx($e,{className:"w-3 h-3 text-amber-600 shrink-0"}),e.jsx("span",{className:"truncate",children:R.label||`เสียง #${H+1}`}),R.durationSec?`(${R.durationSec}s)`:""]}),R.url&&e.jsx("audio",{controls:!0,preload:"metadata",playsInline:!0,src:R.url,className:"h-6 w-full sm:w-44 shrink-0"})]},H))})]})]},i.id||f))})]}),e.jsxs("div",{className:"space-y-2",children:[e.jsxs("span",{className:"text-xs font-bold text-slate-800 block",children:["แกลเลอรีรูปภาพทั้งหมด (",E.length," รูป",E.length>0?" — แตะเพื่อขยายและเลื่อนซ้าย-ขวา":"","):"]}),E.length>0?e.jsx("div",{className:"grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2",children:E.map((i,f)=>e.jsxs("div",{onClick:()=>A(f),className:"group relative h-44 sm:h-48 rounded-xl overflow-hidden border border-slate-200 cursor-pointer bg-slate-900/5 shadow-xs flex items-center justify-center p-1",children:[e.jsx("img",{src:i.url,alt:i.label||"",className:"w-full h-full object-contain group-hover:scale-105 transition-transform duration-200"}),e.jsxs("div",{className:"absolute bottom-1 right-1 bg-black/60 text-white text-[9px] font-mono px-1.5 py-0.5 rounded",children:[f+1,"/",E.length]}),e.jsx("div",{className:"absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center text-[10px] text-white p-1 text-center font-medium",children:i.label})]},f))}):e.jsx("div",{className:"p-4 rounded-xl bg-slate-50 border border-dashed border-slate-200 text-center text-xs text-slate-400",children:"ยังไม่มีรูปภาพที่แนบไว้ในรายการนี้"})]}),h.videos&&h.videos.length>0&&e.jsxs("div",{className:"space-y-2 pt-1",children:[e.jsxs("span",{className:"text-xs font-bold text-slate-800 flex items-center gap-1.5",children:[e.jsx("i",{className:"fa-solid fa-video text-purple-600"}),e.jsxs("span",{children:["คลิปวิดีโอของรายการนี้ (",h.videos.length," คลิป):"]})]}),e.jsx("div",{className:"grid grid-cols-1 sm:grid-cols-2 gap-3",children:h.videos.map((i,f)=>e.jsx(kn,{src:i,className:"rounded-2xl border border-slate-200 shadow-sm h-48 sm:h-56",videoClassName:"object-contain",badgeLabel:`คลิปที่ ${f+1}`},f))})]}),h.attachedFiles&&h.attachedFiles.length>0&&e.jsxs("div",{id:"detail-attached-files-section",className:"space-y-2 pt-1 scroll-mt-6",children:[e.jsxs("div",{className:"flex items-center justify-between",children:[e.jsxs("span",{className:"text-xs font-bold text-slate-800 flex items-center gap-1.5",children:[e.jsx(cs,{className:"w-3.5 h-3.5 text-sky-600"}),e.jsxs("span",{children:["เอกสารและไฟล์แนบ (",h.attachedFiles.length," รายการ):"]})]}),e.jsx("span",{className:"text-[10px] text-slate-400",children:"แตะเพื่อเปิดดูบน Google Drive / เบราว์เซอร์"})]}),e.jsx("div",{className:"grid grid-cols-1 sm:grid-cols-2 gap-2",children:h.attachedFiles.map(i=>{const f=$n(i.name,i.mimeType),R=f.icon;return e.jsxs("a",{href:i.url,target:"_blank",rel:"noopener noreferrer",onClick:H=>{i.url.startsWith("data:")&&(H.preventDefault(),En(i.url,i.name))},className:"bg-white rounded-xl border border-slate-200/90 hover:border-sky-300 hover:shadow-xs p-3 flex items-center justify-between gap-3 transition-all group cursor-pointer",children:[e.jsxs("div",{className:"flex items-center gap-2.5 min-w-0 flex-1",children:[e.jsxs("div",{className:`w-9 h-9 rounded-xl border flex flex-col items-center justify-center shrink-0 shadow-2xs ${f.colorClasses}`,children:[e.jsx(R,{className:"w-4 h-4"}),e.jsx("span",{className:"text-[8px] font-extrabold uppercase leading-none mt-0.5",children:f.label})]}),e.jsxs("div",{className:"min-w-0 flex-1",children:[e.jsx("p",{className:"font-bold text-xs text-slate-800 truncate group-hover:text-sky-700 transition-colors",children:i.name}),e.jsxs("div",{className:"flex items-center gap-1.5 text-[10px] text-slate-500 mt-0.5",children:[e.jsx("span",{className:"font-medium",children:Cn(i.size)}),i.uploadedAt&&e.jsxs(e.Fragment,{children:[e.jsx("span",{children:"•"}),e.jsx("span",{children:new Date(i.uploadedAt).toLocaleDateString("th-TH")})]})]})]})]}),e.jsxs("span",{className:"px-2.5 py-1 rounded-lg bg-sky-50 text-sky-700 group-hover:bg-sky-600 group-hover:text-white text-[11px] font-bold transition-all flex items-center gap-1 shrink-0",children:[e.jsx("span",{children:"เปิดไฟล์"}),e.jsx(mn,{className:"w-3 h-3"})]})]},i.id)})})]}),e.jsxs("div",{id:"detail-comments-section",className:"p-4 bg-slate-50 rounded-xl border border-slate-200/80 space-y-3",children:[e.jsxs("div",{className:"flex items-center justify-between",children:[e.jsxs("span",{className:"text-xs font-bold text-slate-800 flex items-center gap-1.5",children:[e.jsx(fn,{className:"w-3.5 h-3.5 text-blue-600"}),e.jsx("span",{children:"ช่องความเห็นทีมงาน & ตอบกลับต่อเนื่อง (Threaded Comments)"})]}),e.jsxs("span",{className:"text-[11px] text-slate-400 font-mono",children:[h.reviewerNotes.length," หัวข้อสนทนา"]})]}),e.jsx("div",{className:"space-y-2.5",children:h.reviewerNotes.length===0?e.jsx("p",{className:"text-xs text-slate-400 py-3 text-center",children:"ยังไม่มีความเห็น สามารถพิมพ์บันทึกหรือตรวจสอบสเปกได้ด้านล่าง"}):h.reviewerNotes.map(i=>{var H,G,le,ve,te;const f=i.replies||[],R=Se[i.id];return e.jsxs("div",{className:"p-3 bg-white rounded-xl border border-slate-200/70 shadow-xs space-y-2",children:[e.jsxs("div",{className:"flex items-start gap-2.5",children:[e.jsx(qe,{src:i.authorAvatar,className:"w-7 h-7 rounded-full object-cover shrink-0 mt-0.5 ring-1 ring-slate-200"}),e.jsxs("div",{className:"min-w-0 flex-1",children:[e.jsxs("div",{className:"flex items-center justify-between text-[11px] mb-0.5",children:[e.jsx("span",{className:"font-bold text-slate-900",children:i.author}),e.jsx("span",{className:"text-slate-400 font-mono text-[10px]",children:new Date(i.timestamp).toLocaleTimeString("th-TH",{hour:"2-digit",minute:"2-digit"})})]}),e.jsx("p",{className:"text-xs text-slate-700 leading-relaxed",children:i.text}),i.photoUrl&&e.jsx("div",{className:"mt-1.5",children:e.jsx("img",{src:i.photoUrl,alt:"ภาพแนบ",className:"max-h-48 max-w-xs rounded-xl border border-slate-200 object-cover cursor-pointer hover:opacity-95 shadow-2xs",onClick:()=>window.open(i.photoUrl,"_blank")})}),(i.voiceUrl||i.audioUrl)&&e.jsxs("div",{className:"mt-1.5 flex items-center gap-2 bg-slate-50 p-2 rounded-xl border border-slate-200/80 max-w-sm",children:[e.jsx($e,{className:"w-4 h-4 text-emerald-600 shrink-0"}),e.jsx("audio",{controls:!0,src:i.voiceUrl||i.audioUrl,className:"h-7 w-full"})]}),e.jsxs("div",{className:"flex items-center gap-3 mt-1.5 text-[11px] font-bold",children:[M&&e.jsxs("button",{type:"button",onClick:()=>X((Q==null?void 0:Q.noteId)===i.id&&Q.author===i.author?null:{noteId:i.id,author:i.author}),className:"text-blue-600 hover:text-blue-800 flex items-center gap-1",children:[e.jsx(hs,{className:"w-3 h-3"}),e.jsx("span",{children:"ตอบกลับ"})]}),f.length>0&&e.jsx("button",{type:"button",onClick:()=>be(q=>({...q,[i.id]:!q[i.id]})),className:"text-slate-500 hover:text-slate-800 flex items-center gap-1",children:R?e.jsxs(e.Fragment,{children:[e.jsx(xn,{className:"w-3 h-3"}),e.jsxs("span",{children:["ดูการตอบกลับ (",f.length,")"]})]}):e.jsxs(e.Fragment,{children:[e.jsx(gn,{className:"w-3 h-3"}),e.jsxs("span",{children:["ย่อการตอบกลับ (",f.length,")"]})]})})]})]})]}),f.length>0&&!R&&e.jsx("div",{className:"ml-6 pl-3 border-l-2 border-blue-200 space-y-2 pt-1",children:f.map(q=>e.jsxs("div",{className:"p-2.5 bg-slate-50 rounded-xl border border-slate-200/60 text-xs space-y-1",children:[e.jsxs("div",{className:"flex items-center justify-between text-[10px]",children:[e.jsxs("div",{className:"flex items-center gap-1.5 font-bold text-slate-800",children:[e.jsx(qe,{src:q.authorAvatar,className:"w-4 h-4 rounded-full object-cover"}),e.jsx("span",{children:q.author}),q.replyToAuthor&&e.jsxs("span",{className:"text-blue-600 font-normal",children:["▸ ตอบกลับ @",q.replyToAuthor]})]}),e.jsx("span",{className:"text-slate-400 font-mono",children:new Date(q.timestamp).toLocaleTimeString("th-TH",{hour:"2-digit",minute:"2-digit"})})]}),e.jsx("p",{className:"text-slate-700 leading-snug",children:q.text}),q.photoUrl&&e.jsx("div",{className:"mt-1",children:e.jsx("img",{src:q.photoUrl,alt:"ภาพแนบ",className:"max-h-36 max-w-[200px] rounded-lg border border-slate-200 object-cover cursor-pointer hover:opacity-95 shadow-2xs",onClick:()=>window.open(q.photoUrl,"_blank")})}),(q.voiceUrl||q.audioUrl)&&e.jsxs("div",{className:"mt-1 flex items-center gap-1.5 bg-white p-1.5 rounded-lg border border-slate-200 max-w-[240px]",children:[e.jsx($e,{className:"w-3.5 h-3.5 text-blue-600 shrink-0"}),e.jsx("audio",{controls:!0,src:q.voiceUrl||q.audioUrl,className:"h-6 w-full"})]}),e.jsx("div",{children:M&&e.jsxs("button",{type:"button",onClick:()=>X({noteId:i.id,author:q.author}),className:"text-[10px] font-bold text-blue-600 hover:underline inline-flex items-center gap-0.5",children:[e.jsx(hs,{className:"w-2.5 h-2.5"}),e.jsxs("span",{children:["ตอบกลับ @",q.author," ต่อ"]})]})})]},q.id))}),M&&(Q==null?void 0:Q.noteId)===i.id&&e.jsxs("div",{className:"mt-2 pt-2 border-t border-slate-100 space-y-1.5 animate-in fade-in",children:[(((H=J[i.id])==null?void 0:H.photoUrl)||((G=J[i.id])==null?void 0:G.voiceUrl))&&e.jsxs("div",{className:"flex flex-wrap items-center gap-1.5 text-[10px]",children:[((le=J[i.id])==null?void 0:le.photoUrl)&&e.jsxs("span",{className:"inline-flex items-center gap-1 px-1.5 py-0.5 rounded bg-emerald-50 text-emerald-800 border border-emerald-200",children:[e.jsx(ze,{className:"w-3 h-3"})," ภาพพร้อมแนบ",e.jsx("button",{type:"button",onClick:()=>Y(q=>({...q,[i.id]:{...q[i.id],photoUrl:void 0}})),children:e.jsx(ke,{className:"w-2.5 h-2.5"})})]}),((ve=J[i.id])==null?void 0:ve.voiceUrl)&&e.jsxs("span",{className:"inline-flex items-center gap-1.5 px-2 py-0.5 rounded bg-blue-50 text-blue-800 border border-blue-200",children:[e.jsx(Be,{className:"w-3 h-3"})," เสียงอัดสดพร้อมส่ง",e.jsx("audio",{controls:!0,src:(te=J[i.id])==null?void 0:te.voiceUrl,className:"h-6 w-32"}),e.jsx("button",{type:"button",onClick:()=>Y(q=>({...q,[i.id]:{...q[i.id],voiceUrl:void 0}})),children:e.jsx(ke,{className:"w-2.5 h-2.5"})})]})]}),e.jsxs("div",{className:"flex gap-1.5 items-center flex-wrap sm:flex-nowrap",children:[e.jsx("input",{type:"text",placeholder:`ตอบกลับ @${Q.author} ในฐานะ ${s.alias}...`,value:ie[i.id]||"",onChange:q=>ge({...ie,[i.id]:q.target.value}),className:"flex-1 min-w-[140px] bg-slate-50 border border-blue-300 rounded-lg px-2.5 py-1.5 text-xs text-slate-900 focus:outline-none focus:border-blue-500",autoFocus:!0,onKeyDown:q=>{q.key==="Enter"&&(q.preventDefault(),kt(i.id,Q.author))}}),e.jsx("button",{type:"button",title:"แนบรูปภาพในคำตอบกลับ",onClick:()=>{const q=document.createElement("input");q.type="file",q.accept="image/*",q.onchange=Ve=>{var Ie,Me;const Ue=(Me=(Ie=Ve.target)==null?void 0:Ie.files)==null?void 0:Me[0];Ue&&_e(Ue,"photo",i.id)},q.click()},className:"p-1.5 rounded-lg border border-slate-200 hover:bg-slate-100 text-slate-500",children:e.jsx(ze,{className:"w-3.5 h-3.5"})}),e.jsxs("button",{type:"button",title:W===i.id?"กดเพื่อหยุดอัดเสียงสด":"กดเพื่ออัดเสียงสดในคำตอบกลับ",disabled:se,onClick:()=>void Nt(i.id),className:`px-2 py-1.5 rounded-lg border text-[11px] font-bold inline-flex items-center gap-1 transition-all ${W===i.id?"bg-rose-600 text-white border-rose-600 animate-pulse":"bg-white border-slate-200 hover:border-blue-500 hover:bg-blue-50 text-slate-600 hover:text-blue-700"}`,children:[e.jsx(Be,{className:"w-3.5 h-3.5"}),e.jsx("span",{children:W===i.id?`หยุดอัด (${Te}s)`:"อัดเสียงสด"})]}),e.jsx("button",{type:"button",onClick:()=>kt(i.id,Q.author),className:"px-3 py-1.5 rounded-lg bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold",children:"ส่ง"}),M&&e.jsx("button",{type:"button",onClick:()=>X(null),className:"px-2 py-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-600 text-xs",children:"ยกเลิก"})]})]})]},i.id)})}),e.jsxs("div",{className:"pt-2 border-t border-slate-200/60 space-y-1.5",children:[e.jsx("div",{className:"flex items-center justify-between text-[11px] text-slate-500",children:e.jsxs("span",{className:"font-semibold flex items-center gap-1",children:[e.jsx(ds,{className:"w-3 h-3 text-amber-500"})," ข้อความด่วน (แตะเพื่อพิมพ์ทันที):"]})}),e.jsx("div",{className:"flex items-center gap-1.5 overflow-x-auto no-scrollbar py-0.5",children:z.map(i=>e.jsxs("button",{type:"button",onClick:()=>U(i.text),className:"px-2.5 py-1 rounded-lg bg-white border border-slate-200 hover:border-blue-400 text-[11px] text-slate-700 whitespace-nowrap active:scale-95 transition-all shadow-xs",title:i.text,children:[e.jsx("i",{className:"fa-solid fa-bolt text-amber-500 mr-1 text-[10px]"}),e.jsx("span",{children:i.title})]},i.id))})]}),s.role==="viewer"?null:e.jsxs("form",{onSubmit:Ys,className:"space-y-2 pt-1",children:[(re||ae||se)&&e.jsxs("div",{className:"flex flex-wrap items-center gap-2 px-1",children:[re&&e.jsxs("div",{className:"flex items-center gap-1.5 px-2 py-1 bg-emerald-50 border border-emerald-200 rounded-lg text-xs text-emerald-800",children:[e.jsx(ze,{className:"w-3.5 h-3.5 text-emerald-600"}),e.jsx("span",{className:"truncate max-w-[120px]",children:"รูปภาพพร้อมแนบ"}),e.jsx("button",{type:"button",onClick:()=>ue(null),className:"text-slate-400 hover:text-rose-600",children:e.jsx(ke,{className:"w-3 h-3"})})]}),ae&&e.jsxs("div",{className:"flex items-center gap-1.5 px-2 py-1 bg-blue-50 border border-blue-200 rounded-lg text-xs text-blue-800",children:[e.jsx(Be,{className:"w-3.5 h-3.5 text-blue-600"}),e.jsx("span",{children:"เสียงอัดสด:"}),e.jsx("audio",{controls:!0,src:ae,className:"h-6 w-36"}),e.jsx("button",{type:"button",onClick:()=>pe(null),className:"text-slate-400 hover:text-rose-600",children:e.jsx(ke,{className:"w-3 h-3"})})]}),se&&e.jsxs("div",{className:"flex items-center gap-1.5 text-xs text-blue-600 font-medium",children:[e.jsx(bn,{className:"w-3.5 h-3.5 animate-spin"}),e.jsx("span",{children:"กำลังอัปโหลดไฟล์สื่อ..."})]})]}),e.jsxs("div",{className:"flex gap-1.5 items-center flex-wrap sm:flex-nowrap",children:[e.jsx("input",{ref:ne,type:"file",accept:"image/*",className:"hidden",onChange:i=>{var R;const f=(R=i.target.files)==null?void 0:R[0];f&&_e(f,"photo"),i.target.value=""}}),e.jsx("input",{type:"text",placeholder:`พิมพ์ข้อคิดเห็นใหม่ในฐานะ ${s.alias}...`,value:D,onChange:i=>U(i.target.value),className:"flex-1 min-w-[140px] h-8 bg-white border border-slate-200 rounded-lg px-2.5 text-xs text-slate-900 focus:outline-none focus:border-blue-500 shadow-2xs"}),e.jsxs("button",{type:"button",title:"แนบรูปภาพ",disabled:se,onClick:()=>{var i;return(i=ne.current)==null?void 0:i.click()},className:"h-8 px-2.5 rounded-lg border border-slate-200 bg-white hover:border-emerald-500 hover:bg-emerald-50 text-slate-600 hover:text-emerald-700 text-[11px] font-bold inline-flex items-center justify-center gap-1 transition-colors shrink-0",children:[e.jsx(ze,{className:"w-3.5 h-3.5"}),e.jsx("span",{className:"hidden sm:inline",children:"รูปภาพ"})]}),e.jsxs("button",{type:"button",title:W==="main"?"กดเพื่อหยุดอัดเสียงสด":"กดเพื่ออัดเสียงสดในคอมเมนต์",disabled:se,onClick:()=>void Nt("main"),className:`h-8 px-2.5 rounded-lg border text-[11px] font-bold inline-flex items-center justify-center gap-1 transition-all shrink-0 ${W==="main"?"bg-rose-600 text-white border-rose-600 animate-pulse shadow-xs":"bg-white border-slate-200 hover:border-blue-500 hover:bg-blue-50 text-slate-700 hover:text-blue-700"}`,children:[e.jsx(Be,{className:"w-3.5 h-3.5"}),e.jsx("span",{children:W==="main"?`หยุดอัด (${Te}s)`:"อัดเสียงสด"})]}),e.jsxs("button",{type:"submit",disabled:se||W==="main",className:"h-8 px-3 rounded-lg bg-blue-600 hover:bg-blue-700 text-white text-[11px] font-bold shadow-2xs active:scale-95 transition-all inline-flex items-center justify-center gap-1 shrink-0 disabled:opacity-50",children:[e.jsx(vn,{className:"w-3 h-3"}),e.jsx("span",{children:"โพสต์"})]})]})]})]}),e.jsx(In,{item:h,users:j},h.id)]}),e.jsxs("div",{className:"p-3 sm:p-3.5 border-t border-slate-100 bg-white flex items-center justify-between gap-2 select-none",children:[e.jsxs("div",{className:"text-[11px] text-slate-400 font-mono truncate hidden sm:block",children:["ID: ",h.id," · ปรับปรุง:"," ",new Date(h.updatedAt).toLocaleTimeString("th-TH")]}),e.jsxs("div",{className:"flex items-center justify-end gap-1.5 sm:gap-2 w-full sm:w-auto",children:[k&&e.jsxs("button",{type:"button",onClick:jt,className:"px-2.5 sm:px-3 py-1.5 text-xs font-bold rounded-xl bg-rose-50 hover:bg-rose-100 text-rose-700 border border-rose-200 flex items-center justify-center gap-1.5 transition-colors whitespace-nowrap active:scale-95 shrink-0",title:"ลบรายการ",children:[e.jsx(ls,{className:"w-3.5 h-3.5 text-rose-600 shrink-0"}),e.jsx("span",{children:"ลบรายการ"})]}),V&&e.jsxs("button",{type:"button",onClick:()=>g(h),className:"px-2.5 sm:px-3.5 py-1.5 text-xs font-bold rounded-xl bg-amber-50 hover:bg-amber-100 text-amber-800 border border-amber-300 flex items-center justify-center gap-1.5 transition-colors whitespace-nowrap active:scale-95 shrink-0",children:[e.jsx(is,{className:"w-3.5 h-3.5 text-amber-600 shrink-0"}),e.jsx("span",{children:"แก้ไขข้อมูล"})]}),e.jsx("button",{onClick:c,className:"px-3.5 sm:px-4 py-1.5 text-xs font-bold rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 transition-colors whitespace-nowrap active:scale-95 shrink-0",children:"ปิด"})]})]})]}),$!==null&&E[$]&&e.jsxs("div",{className:"fixed inset-0 z-[140] bg-black/92 backdrop-blur-md flex flex-col items-center justify-between p-3 sm:p-6 select-none",onClick:()=>A(null),children:[e.jsxs("div",{className:"w-full max-w-4xl flex items-center justify-between text-white z-10",onClick:i=>i.stopPropagation(),children:[e.jsxs("div",{className:"flex items-center gap-2",children:[e.jsxs("span",{className:"px-2.5 py-1 rounded-full bg-white/15 font-mono text-xs font-bold",children:["รูปที่ ",$+1," / ",E.length]}),e.jsx("span",{className:"text-xs sm:text-sm font-semibold text-white/90 truncate max-w-[240px] sm:max-w-md",children:E[$].label})]}),e.jsx("button",{type:"button",onClick:()=>A(null),className:"w-9 h-9 rounded-full bg-white/15 hover:bg-white/25 text-white flex items-center justify-center transition-colors",children:e.jsx(ke,{className:"w-5 h-5"})})]}),e.jsxs("div",{className:"relative flex-1 w-full max-w-5xl flex items-center justify-center my-2",onClick:i=>i.stopPropagation(),children:[E.length>1&&e.jsx("button",{type:"button",onClick:()=>A(($-1+E.length)%E.length),className:"absolute left-1 sm:left-3 z-20 w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-black/60 hover:bg-black/80 border border-white/25 text-white flex items-center justify-center shadow-lg active:scale-95 transition-all",title:"รูปก่อนหน้า (◀)",children:e.jsx(wn,{className:"w-6 h-6"})}),e.jsx("img",{src:E[$].url,alt:E[$].label,className:"max-w-full max-h-[72vh] object-contain rounded-xl shadow-2xl"}),E.length>1&&e.jsx("button",{type:"button",onClick:()=>A(($+1)%E.length),className:"absolute right-1 sm:right-3 z-20 w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-black/60 hover:bg-black/80 border border-white/25 text-white flex items-center justify-center shadow-lg active:scale-95 transition-all",title:"รูปถัดไป (▶)",children:e.jsx(yn,{className:"w-6 h-6"})})]}),E.length>1&&e.jsx("div",{className:"w-full max-w-3xl flex items-center justify-center gap-2 overflow-x-auto py-1 z-10",onClick:i=>i.stopPropagation(),children:E.map((i,f)=>e.jsx("button",{type:"button",onClick:()=>A(f),className:`relative w-12 h-12 sm:w-14 sm:h-14 rounded-lg overflow-hidden shrink-0 border-2 transition-all ${f===$?"border-emerald-400 scale-105 shadow-md":"border-white/20 opacity-60 hover:opacity-100"}`,children:e.jsx("img",{src:i.url,className:"w-full h-full object-cover"})},f))})]})]})};export{ir as DetailModal};
