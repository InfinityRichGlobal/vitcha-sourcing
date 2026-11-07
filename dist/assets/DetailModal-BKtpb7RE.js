import{c as nn,ai as Ve,r as Q,j as e,aj as rn,a8 as oe,W as He,ak as wt,Y as _s,u as an,al as Ne,a9 as on,x as rs,X as Ge,P as as,T as is,a1 as ln,_ as dn,H as Qe,m as cn,a0 as Re,I as un,a2 as Fe,am as os,k as hn,Q as mn,Z as ls,aa as pn,R as fn,h as gn,an as xn,i as qe,l as bn,ao as ds,ap as cs,ab as vn,aq as wn,ar as us,q as yn,f as jn,V as Nn,d as $n,a5 as kn}from"./index-C0nUDDau.js";import{g as Cn,f as En,a as Sn}from"./AttachedFilesSection-C56pMbFo.js";import{V as Rn}from"./VideoPlayer-DdY1LCi0.js";import{P as Tn}from"./printer-b79lYcvR.js";import"./arrow-left-BYh386qz.js";/**
 * @license lucide-react v1.62.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Hs={name:"file-down",size:24,node:[["path",{d:"M6 22a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h8a2.4 2.4 0 0 1 1.704.706l3.588 3.588A2.4 2.4 0 0 1 20 8v12a2 2 0 0 1-2 2z",key:"1oefj6"}],["path",{d:"M14 2v5a1 1 0 0 0 1 1h5",key:"wfsgrz"}],["path",{d:"M12 18v-6",key:"17g6i2"}],["path",{d:"m9 15 3 3 3-3",key:"1npd3o"}]]};Hs.node;const An=nn(Hs);function In(t){var a,s,n,o,r,i,g;if(!t)return[];const l=[],d=(m,j,E=[])=>l.push({id:m,label:j,photos:E.filter(Boolean).map((b,B)=>({url:Ve(b),label:`${j} #${B+1}`}))});return d("storefront","หน้าร้าน / บรรยากาศ",(a=t.photos)==null?void 0:a.storefrontAndAtmosphere),t.type==="supplier"?(d("contacts","นามบัตร / WeChat QR",(s=t.photos)==null?void 0:s.contactCards),l.push({id:"catalog",label:"รายการสินค้า",photos:(t.catalogItems||[]).filter(m=>m.photo).map((m,j)=>({url:Ve(m.photo),label:m.name||`สินค้า #${j+1}`}))})):t.type==="drink_store"?(d("menu","ป้ายเมนู",(n=t.photos)==null?void 0:n.menuBoard),d("cups","แก้วเครื่องดื่ม",(o=t.photos)==null?void 0:o.drinkCups),l.push({id:"drinks",label:"เมนูชิม",photos:(t.drinkItems||[]).filter(m=>m.photo).map((m,j)=>({url:Ve(m.photo),label:m.name||`เมนู #${j+1}`}))})):(d("plans","ผังห้อง / งานระบบ",(r=t.photos)==null?void 0:r.floorPlanAndSpecs),d("neighbors","ร้านข้างเคียง",(i=t.photos)==null?void 0:i.surroundingNeighbors),d("contacts","นามบัตร / เอกสาร",(g=t.photos)==null?void 0:g.contactCards)),l}const We={images:["รูปภาพ","รูป"],videos:["วิดีโอ","ไฟล์"],audio:["เสียง","ไฟล์"],files:["ไฟล์แนบ","ไฟล์"]},Vs={create:"สร้างรายการ",update:"แก้ไขข้อมูลรายการ",comment:"แสดงความคิดเห็น",reply:"ตอบกลับความคิดเห็น",handoff:"อัปเดตการส่งต่องาน",delete:"ลบรายการเข้าถังขยะ",restore:"กู้คืนรายการจากถังขยะ"},$e=t=>Array.isArray(t)?t:[];function hs(t={}){var s,n,o;const l=Object.fromEntries(Object.keys(We).map(r=>[r,new Set])),d=(r,i)=>{if(typeof i!="string"||!i.trim())return;const g=i.match(/(?:drive\.google\.com\/file\/d\/|lh3\.googleusercontent\.com\/d\/)([^/?=]+)/);l[r].add(g?`drive:${g[1]}`:i)},a=t.photos||{};for(const r of Array.isArray(a)?[a]:Object.values(a))if(Array.isArray(r))for(const i of r)d("images",i);for(const r of[...$e(t.catalogItems),...$e(t.drinkItems)]){d("images",r==null?void 0:r.photo),d("audio",r==null?void 0:r.voiceNoteUrl);for(const i of $e(r==null?void 0:r.voiceNotes))d("audio",i==null?void 0:i.url)}for(const r of $e(t.videos))d("videos",r);for(const r of $e(t.voiceNotes))d("audio",r==null?void 0:r.url);d("audio",t.voiceNoteUrl),d("audio",t.voiceUrl||t.audioUrl),d("images",t.photoUrl||t.imageUrl);for(const r of $e(t.media))r&&d(r.type==="video"?"videos":"images",r.url);for(const r of $e(t.attachedFiles)){if(!r)continue;const i=(s=r.mimeType)!=null&&s.startsWith("image/")?"images":(n=r.mimeType)!=null&&n.startsWith("video/")?"videos":(o=r.mimeType)!=null&&o.startsWith("audio/")?"audio":"files";d(i,r.url)}return l}function Pn(t={},l={}){const d=hs(t),a=hs(l);return Object.fromEntries(Object.keys(We).flatMap(s=>{const n=[...a[s]].filter(r=>!d[s].has(r)).length,o=[...d[s]].filter(r=>!a[s].has(r)).length;return n||o?[[s,{added:n,removed:o}]]:[]}))}function Os(t){if(t.kind)return t.kind;const l=t.action||"";return Object.hasOwn(Vs,l)?l:/ตอบกลับ|^reply$/.test(l)?"reply":/ความคิดเห็น|คอมเม|^comment$/.test(l)?"comment":/กู้คืน/.test(l)?"restore":/ลบรายการ|ถังขยะ/.test(l)?"delete":/สร้าง|เพิ่มรายการ/.test(l)?"create":/ส่งต่อ|รับช่วง|ย้ายเข้าสู่|สถานะ|^handoff$/.test(l)?"handoff":"update"}function Bn(t){const l=Os(t);let d=t.mediaCounts;if(!d){const n={},o={};for(const r of t.changes||[])n[r.field]=r.before,o[r.field]=r.after;d=Pn(n,["comment","reply"].includes(l)?t.content||{}:o)}const a=Object.fromEntries(Object.keys(We).flatMap(n=>{var i,g;const o=Math.max(0,Math.floor(Number((i=d[n])==null?void 0:i.added)||0)),r=Math.max(0,Math.floor(Number((g=d[n])==null?void 0:g.removed)||0));return o||r?[[n,{added:o,removed:r}]]:[]})),s=[Vs[l]||"บันทึกกิจกรรม"];for(const[n,[o,r]]of Object.entries(We)){const i=a[n];i!=null&&i.added&&s.push(`${["comment","reply"].includes(l)?"แนบ":"เพิ่ม"}${o} ${i.added} ${r}`),i!=null&&i.removed&&s.push(`ลบ${o} ${i.removed} ${r}`)}return{...t.id?{id:t.id}:{},version:3,kind:l,action:s.join(" · "),user:t.user,...t.userId?{userId:t.userId}:{},timestamp:t.timestamp,...Object.keys(a).length?{mediaCounts:a}:{}}}function Gs(t){var d;const l=(d=t.history)!=null&&d.length?t.history.map(a=>({...a})):[{kind:"create",action:"สร้างรายการ",user:t.creator.alias,timestamp:t.creator.timestamp}];for(const a of t.reviewerNotes||[])for(const[s,n]of[["comment",a],...(a.replies||[]).map(o=>["reply",o])]){const o=n,r=l.find(i=>{var g;return i.id===o.id||((g=i.content)==null?void 0:g.id)===o.id||Os(i)===s&&i.timestamp===o.timestamp&&(i.userId===o.authorId&&!!i.userId||i.user===o.author)});r?!r.content&&!r.mediaCounts&&r.version!==3&&(r.content=o):l.push({id:o.id,kind:s,action:"",user:o.author,userId:o.authorId,timestamp:o.timestamp,content:o})}return l.map(Bn)}const Ln=t=>Number.isNaN(Date.parse(t))?t:new Date(t).toLocaleString("th-TH",{dateStyle:"medium",timeStyle:"short"});function Mn({item:t,users:l}){const[d,a]=Q.useState("all"),[s,n]=Q.useState(!1),[o,r]=Q.useState(20);Q.useEffect(()=>{a("all"),r(20)},[t.id]),Q.useEffect(()=>{r(20)},[d,s]);const g=Gs(t).filter(m=>d==="all"||d==="files"&&!!Object.keys(m.mediaCounts||{}).length||d==="comments"&&["comment","reply"].includes(m.kind||"")||d==="data"&&["create","update","delete","restore"].includes(m.kind||"")||d==="handoff"&&m.kind==="handoff").map((m,j)=>({e:m,index:j})).sort((m,j)=>(s?1:-1)*((Date.parse(m.e.timestamp)||0)-(Date.parse(j.e.timestamp)||0)||m.index-j.index));return e.jsxs("section",{"data-testid":"activity-timeline",className:"p-3.5 bg-slate-50 rounded-xl border border-slate-200 space-y-3 text-xs leading-snug min-w-0",children:[e.jsx("h3",{className:"font-bold text-sm text-slate-900",children:"ประวัติการดำเนินงาน"}),e.jsx("p",{className:"text-slate-500",children:"วันเวลา · ผู้ดำเนินการ · กิจกรรม"}),e.jsxs("div",{className:"flex flex-wrap gap-2 items-center",children:[e.jsxs("select",{"aria-label":"ประเภทประวัติ",value:d,onChange:m=>a(m.target.value),className:"max-w-full rounded-lg border p-2 bg-white",children:[e.jsx("option",{value:"all",children:"ทั้งหมด"}),e.jsx("option",{value:"handoff",children:"ส่งต่องาน"}),e.jsx("option",{value:"data",children:"ข้อมูล"}),e.jsx("option",{value:"comments",children:"ความคิดเห็น"}),e.jsx("option",{value:"files",children:"ไฟล์และสื่อ"})]}),e.jsx("button",{type:"button",onClick:()=>n(!s),className:"border rounded-lg p-2 bg-white",children:s?"เรียงเก่าก่อน":"เรียงใหม่ก่อน"}),e.jsxs("span",{className:"text-slate-500",children:[g.length," เหตุการณ์"]})]}),e.jsx("div",{className:"divide-y divide-slate-200",children:g.slice(0,o).map(({e:m,index:j})=>{const E=l.find(b=>b.id===m.userId||b.alias===m.user||b.name===m.user);return e.jsxs("article",{className:"py-1.5 min-w-0","data-testid":"activity-event",children:[e.jsx("time",{className:"text-[11px] text-slate-500",children:Ln(m.timestamp)}),e.jsxs("p",{className:"break-words [overflow-wrap:anywhere]",children:[e.jsx("strong",{children:(E==null?void 0:E.alias)||m.user})," · ",m.action]})]},m.id||`${m.timestamp}-${j}`)})}),!g.length&&e.jsx("p",{className:"text-slate-500",children:"ยังไม่มีประวัติที่บันทึกสำหรับตัวกรองนี้"}),g.length>o&&e.jsxs("button",{type:"button",className:"w-full border rounded-lg p-3 text-emerald-700",onClick:()=>r(o+20),children:["แสดงประวัติเพิ่ม (",g.length-o," เหตุการณ์)"]})]})}var Te={},Je,ms;function Dn(){return ms||(ms=1,Je=function(){return typeof Promise=="function"&&Promise.prototype&&Promise.prototype.then}),Je}var Ye={},we={},ps;function ke(){if(ps)return we;ps=1;let t;const l=[0,26,44,70,100,134,172,196,242,292,346,404,466,532,581,655,733,815,901,991,1085,1156,1258,1364,1474,1588,1706,1828,1921,2051,2185,2323,2465,2611,2761,2876,3034,3196,3362,3532,3706];return we.getSymbolSize=function(a){if(!a)throw new Error('"version" cannot be null or undefined');if(a<1||a>40)throw new Error('"version" should be in range from 1 to 40');return a*4+17},we.getSymbolTotalCodewords=function(a){return l[a]},we.getBCHDigit=function(d){let a=0;for(;d!==0;)a++,d>>>=1;return a},we.setToSJISFunction=function(a){if(typeof a!="function")throw new Error('"toSJISFunc" is not a valid function.');t=a},we.isKanjiModeEnabled=function(){return typeof t<"u"},we.toSJIS=function(a){return t(a)},we}var Ze={},fs;function yt(){return fs||(fs=1,(function(t){t.L={bit:1},t.M={bit:0},t.Q={bit:3},t.H={bit:2};function l(d){if(typeof d!="string")throw new Error("Param is not a string");switch(d.toLowerCase()){case"l":case"low":return t.L;case"m":case"medium":return t.M;case"q":case"quartile":return t.Q;case"h":case"high":return t.H;default:throw new Error("Unknown EC Level: "+d)}}t.isValid=function(a){return a&&typeof a.bit<"u"&&a.bit>=0&&a.bit<4},t.from=function(a,s){if(t.isValid(a))return a;try{return l(a)}catch{return s}}})(Ze)),Ze}var Xe,gs;function zn(){if(gs)return Xe;gs=1;function t(){this.buffer=[],this.length=0}return t.prototype={get:function(l){const d=Math.floor(l/8);return(this.buffer[d]>>>7-l%8&1)===1},put:function(l,d){for(let a=0;a<d;a++)this.putBit((l>>>d-a-1&1)===1)},getLengthInBits:function(){return this.length},putBit:function(l){const d=Math.floor(this.length/8);this.buffer.length<=d&&this.buffer.push(0),l&&(this.buffer[d]|=128>>>this.length%8),this.length++}},Xe=t,Xe}var et,xs;function Un(){if(xs)return et;xs=1;function t(l){if(!l||l<1)throw new Error("BitMatrix size must be defined and greater than 0");this.size=l,this.data=new Uint8Array(l*l),this.reservedBit=new Uint8Array(l*l)}return t.prototype.set=function(l,d,a,s){const n=l*this.size+d;this.data[n]=a,s&&(this.reservedBit[n]=!0)},t.prototype.get=function(l,d){return this.data[l*this.size+d]},t.prototype.xor=function(l,d,a){this.data[l*this.size+d]^=a},t.prototype.isReserved=function(l,d){return this.reservedBit[l*this.size+d]},et=t,et}var tt={},bs;function Fn(){return bs||(bs=1,(function(t){const l=ke().getSymbolSize;t.getRowColCoords=function(a){if(a===1)return[];const s=Math.floor(a/7)+2,n=l(a),o=n===145?26:Math.ceil((n-13)/(2*s-2))*2,r=[n-7];for(let i=1;i<s-1;i++)r[i]=r[i-1]-o;return r.push(6),r.reverse()},t.getPositions=function(a){const s=[],n=t.getRowColCoords(a),o=n.length;for(let r=0;r<o;r++)for(let i=0;i<o;i++)r===0&&i===0||r===0&&i===o-1||r===o-1&&i===0||s.push([n[r],n[i]]);return s}})(tt)),tt}var st={},vs;function qn(){if(vs)return st;vs=1;const t=ke().getSymbolSize,l=7;return st.getPositions=function(a){const s=t(a);return[[0,0],[s-l,0],[0,s-l]]},st}var nt={},ws;function _n(){return ws||(ws=1,(function(t){t.Patterns={PATTERN000:0,PATTERN001:1,PATTERN010:2,PATTERN011:3,PATTERN100:4,PATTERN101:5,PATTERN110:6,PATTERN111:7};const l={N1:3,N2:3,N3:40,N4:10};t.isValid=function(s){return s!=null&&s!==""&&!isNaN(s)&&s>=0&&s<=7},t.from=function(s){return t.isValid(s)?parseInt(s,10):void 0},t.getPenaltyN1=function(s){const n=s.size;let o=0,r=0,i=0,g=null,m=null;for(let j=0;j<n;j++){r=i=0,g=m=null;for(let E=0;E<n;E++){let b=s.get(j,E);b===g?r++:(r>=5&&(o+=l.N1+(r-5)),g=b,r=1),b=s.get(E,j),b===m?i++:(i>=5&&(o+=l.N1+(i-5)),m=b,i=1)}r>=5&&(o+=l.N1+(r-5)),i>=5&&(o+=l.N1+(i-5))}return o},t.getPenaltyN2=function(s){const n=s.size;let o=0;for(let r=0;r<n-1;r++)for(let i=0;i<n-1;i++){const g=s.get(r,i)+s.get(r,i+1)+s.get(r+1,i)+s.get(r+1,i+1);(g===4||g===0)&&o++}return o*l.N2},t.getPenaltyN3=function(s){const n=s.size;let o=0,r=0,i=0;for(let g=0;g<n;g++){r=i=0;for(let m=0;m<n;m++)r=r<<1&2047|s.get(g,m),m>=10&&(r===1488||r===93)&&o++,i=i<<1&2047|s.get(m,g),m>=10&&(i===1488||i===93)&&o++}return o*l.N3},t.getPenaltyN4=function(s){let n=0;const o=s.data.length;for(let i=0;i<o;i++)n+=s.data[i];return Math.abs(Math.ceil(n*100/o/5)-10)*l.N4};function d(a,s,n){switch(a){case t.Patterns.PATTERN000:return(s+n)%2===0;case t.Patterns.PATTERN001:return s%2===0;case t.Patterns.PATTERN010:return n%3===0;case t.Patterns.PATTERN011:return(s+n)%3===0;case t.Patterns.PATTERN100:return(Math.floor(s/2)+Math.floor(n/3))%2===0;case t.Patterns.PATTERN101:return s*n%2+s*n%3===0;case t.Patterns.PATTERN110:return(s*n%2+s*n%3)%2===0;case t.Patterns.PATTERN111:return(s*n%3+(s+n)%2)%2===0;default:throw new Error("bad maskPattern:"+a)}}t.applyMask=function(s,n){const o=n.size;for(let r=0;r<o;r++)for(let i=0;i<o;i++)n.isReserved(i,r)||n.xor(i,r,d(s,i,r))},t.getBestMask=function(s,n){const o=Object.keys(t.Patterns).length;let r=0,i=1/0;for(let g=0;g<o;g++){n(g),t.applyMask(g,s);const m=t.getPenaltyN1(s)+t.getPenaltyN2(s)+t.getPenaltyN3(s)+t.getPenaltyN4(s);t.applyMask(g,s),m<i&&(i=m,r=g)}return r}})(nt)),nt}var Ke={},ys;function Ks(){if(ys)return Ke;ys=1;const t=yt(),l=[1,1,1,1,1,1,1,1,1,1,2,2,1,2,2,4,1,2,4,4,2,4,4,4,2,4,6,5,2,4,6,6,2,5,8,8,4,5,8,8,4,5,8,11,4,8,10,11,4,9,12,16,4,9,16,16,6,10,12,18,6,10,17,16,6,11,16,19,6,13,18,21,7,14,21,25,8,16,20,25,8,17,23,25,9,17,23,34,9,18,25,30,10,20,27,32,12,21,29,35,12,23,34,37,12,25,34,40,13,26,35,42,14,28,38,45,15,29,40,48,16,31,43,51,17,33,45,54,18,35,48,57,19,37,51,60,19,38,53,63,20,40,56,66,21,43,59,70,22,45,62,74,24,47,65,77,25,49,68,81],d=[7,10,13,17,10,16,22,28,15,26,36,44,20,36,52,64,26,48,72,88,36,64,96,112,40,72,108,130,48,88,132,156,60,110,160,192,72,130,192,224,80,150,224,264,96,176,260,308,104,198,288,352,120,216,320,384,132,240,360,432,144,280,408,480,168,308,448,532,180,338,504,588,196,364,546,650,224,416,600,700,224,442,644,750,252,476,690,816,270,504,750,900,300,560,810,960,312,588,870,1050,336,644,952,1110,360,700,1020,1200,390,728,1050,1260,420,784,1140,1350,450,812,1200,1440,480,868,1290,1530,510,924,1350,1620,540,980,1440,1710,570,1036,1530,1800,570,1064,1590,1890,600,1120,1680,1980,630,1204,1770,2100,660,1260,1860,2220,720,1316,1950,2310,750,1372,2040,2430];return Ke.getBlocksCount=function(s,n){switch(n){case t.L:return l[(s-1)*4+0];case t.M:return l[(s-1)*4+1];case t.Q:return l[(s-1)*4+2];case t.H:return l[(s-1)*4+3];default:return}},Ke.getTotalCodewordsCount=function(s,n){switch(n){case t.L:return d[(s-1)*4+0];case t.M:return d[(s-1)*4+1];case t.Q:return d[(s-1)*4+2];case t.H:return d[(s-1)*4+3];default:return}},Ke}var rt={},_e={},js;function Hn(){if(js)return _e;js=1;const t=new Uint8Array(512),l=new Uint8Array(256);return(function(){let a=1;for(let s=0;s<255;s++)t[s]=a,l[a]=s,a<<=1,a&256&&(a^=285);for(let s=255;s<512;s++)t[s]=t[s-255]})(),_e.log=function(a){if(a<1)throw new Error("log("+a+")");return l[a]},_e.exp=function(a){return t[a]},_e.mul=function(a,s){return a===0||s===0?0:t[l[a]+l[s]]},_e}var Ns;function Vn(){return Ns||(Ns=1,(function(t){const l=Hn();t.mul=function(a,s){const n=new Uint8Array(a.length+s.length-1);for(let o=0;o<a.length;o++)for(let r=0;r<s.length;r++)n[o+r]^=l.mul(a[o],s[r]);return n},t.mod=function(a,s){let n=new Uint8Array(a);for(;n.length-s.length>=0;){const o=n[0];for(let i=0;i<s.length;i++)n[i]^=l.mul(s[i],o);let r=0;for(;r<n.length&&n[r]===0;)r++;n=n.slice(r)}return n},t.generateECPolynomial=function(a){let s=new Uint8Array([1]);for(let n=0;n<a;n++)s=t.mul(s,new Uint8Array([1,l.exp(n)]));return s}})(rt)),rt}var at,$s;function On(){if($s)return at;$s=1;const t=Vn();function l(d){this.genPoly=void 0,this.degree=d,this.degree&&this.initialize(this.degree)}return l.prototype.initialize=function(a){this.degree=a,this.genPoly=t.generateECPolynomial(this.degree)},l.prototype.encode=function(a){if(!this.genPoly)throw new Error("Encoder not initialized");const s=new Uint8Array(a.length+this.degree);s.set(a);const n=t.mod(s,this.genPoly),o=this.degree-n.length;if(o>0){const r=new Uint8Array(this.degree);return r.set(n,o),r}return n},at=l,at}var it={},ot={},lt={},ks;function Ws(){return ks||(ks=1,lt.isValid=function(l){return!isNaN(l)&&l>=1&&l<=40}),lt}var ue={},Cs;function Qs(){if(Cs)return ue;Cs=1;const t="[0-9]+",l="[A-Z $%*+\\-./:]+";let d="(?:[u3000-u303F]|[u3040-u309F]|[u30A0-u30FF]|[uFF00-uFFEF]|[u4E00-u9FAF]|[u2605-u2606]|[u2190-u2195]|u203B|[u2010u2015u2018u2019u2025u2026u201Cu201Du2225u2260]|[u0391-u0451]|[u00A7u00A8u00B1u00B4u00D7u00F7])+";d=d.replace(/u/g,"\\u");const a="(?:(?![A-Z0-9 $%*+\\-./:]|"+d+`)(?:.|[\r
]))+`;ue.KANJI=new RegExp(d,"g"),ue.BYTE_KANJI=new RegExp("[^A-Z0-9 $%*+\\-./:]+","g"),ue.BYTE=new RegExp(a,"g"),ue.NUMERIC=new RegExp(t,"g"),ue.ALPHANUMERIC=new RegExp(l,"g");const s=new RegExp("^"+d+"$"),n=new RegExp("^"+t+"$"),o=new RegExp("^[A-Z0-9 $%*+\\-./:]+$");return ue.testKanji=function(i){return s.test(i)},ue.testNumeric=function(i){return n.test(i)},ue.testAlphanumeric=function(i){return o.test(i)},ue}var Es;function Ce(){return Es||(Es=1,(function(t){const l=Ws(),d=Qs();t.NUMERIC={id:"Numeric",bit:1,ccBits:[10,12,14]},t.ALPHANUMERIC={id:"Alphanumeric",bit:2,ccBits:[9,11,13]},t.BYTE={id:"Byte",bit:4,ccBits:[8,16,16]},t.KANJI={id:"Kanji",bit:8,ccBits:[8,10,12]},t.MIXED={bit:-1},t.getCharCountIndicator=function(n,o){if(!n.ccBits)throw new Error("Invalid mode: "+n);if(!l.isValid(o))throw new Error("Invalid version: "+o);return o>=1&&o<10?n.ccBits[0]:o<27?n.ccBits[1]:n.ccBits[2]},t.getBestModeForData=function(n){return d.testNumeric(n)?t.NUMERIC:d.testAlphanumeric(n)?t.ALPHANUMERIC:d.testKanji(n)?t.KANJI:t.BYTE},t.toString=function(n){if(n&&n.id)return n.id;throw new Error("Invalid mode")},t.isValid=function(n){return n&&n.bit&&n.ccBits};function a(s){if(typeof s!="string")throw new Error("Param is not a string");switch(s.toLowerCase()){case"numeric":return t.NUMERIC;case"alphanumeric":return t.ALPHANUMERIC;case"kanji":return t.KANJI;case"byte":return t.BYTE;default:throw new Error("Unknown mode: "+s)}}t.from=function(n,o){if(t.isValid(n))return n;try{return a(n)}catch{return o}}})(ot)),ot}var Ss;function Gn(){return Ss||(Ss=1,(function(t){const l=ke(),d=Ks(),a=yt(),s=Ce(),n=Ws(),o=7973,r=l.getBCHDigit(o);function i(E,b,B){for(let U=1;U<=40;U++)if(b<=t.getCapacity(U,B,E))return U}function g(E,b){return s.getCharCountIndicator(E,b)+4}function m(E,b){let B=0;return E.forEach(function(U){const O=g(U.mode,b);B+=O+U.getBitsLength()}),B}function j(E,b){for(let B=1;B<=40;B++)if(m(E,B)<=t.getCapacity(B,b,s.MIXED))return B}t.from=function(b,B){return n.isValid(b)?parseInt(b,10):B},t.getCapacity=function(b,B,U){if(!n.isValid(b))throw new Error("Invalid QR Code version");typeof U>"u"&&(U=s.BYTE);const O=l.getSymbolTotalCodewords(b),P=d.getTotalCodewordsCount(b,B),A=(O-P)*8;if(U===s.MIXED)return A;const D=A-g(U,b);switch(U){case s.NUMERIC:return Math.floor(D/10*3);case s.ALPHANUMERIC:return Math.floor(D/11*2);case s.KANJI:return Math.floor(D/13);case s.BYTE:default:return Math.floor(D/8)}},t.getBestVersionForData=function(b,B){let U;const O=a.from(B,a.M);if(Array.isArray(b)){if(b.length>1)return j(b,O);if(b.length===0)return 1;U=b[0]}else U=b;return i(U.mode,U.getLength(),O)},t.getEncodedBits=function(b){if(!n.isValid(b)||b<7)throw new Error("Invalid QR Code version");let B=b<<12;for(;l.getBCHDigit(B)-r>=0;)B^=o<<l.getBCHDigit(B)-r;return b<<12|B}})(it)),it}var dt={},Rs;function Kn(){if(Rs)return dt;Rs=1;const t=ke(),l=1335,d=21522,a=t.getBCHDigit(l);return dt.getEncodedBits=function(n,o){const r=n.bit<<3|o;let i=r<<10;for(;t.getBCHDigit(i)-a>=0;)i^=l<<t.getBCHDigit(i)-a;return(r<<10|i)^d},dt}var ct={},ut,Ts;function Wn(){if(Ts)return ut;Ts=1;const t=Ce();function l(d){this.mode=t.NUMERIC,this.data=d.toString()}return l.getBitsLength=function(a){return 10*Math.floor(a/3)+(a%3?a%3*3+1:0)},l.prototype.getLength=function(){return this.data.length},l.prototype.getBitsLength=function(){return l.getBitsLength(this.data.length)},l.prototype.write=function(a){let s,n,o;for(s=0;s+3<=this.data.length;s+=3)n=this.data.substr(s,3),o=parseInt(n,10),a.put(o,10);const r=this.data.length-s;r>0&&(n=this.data.substr(s),o=parseInt(n,10),a.put(o,r*3+1))},ut=l,ut}var ht,As;function Qn(){if(As)return ht;As=1;const t=Ce(),l=["0","1","2","3","4","5","6","7","8","9","A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z"," ","$","%","*","+","-",".","/",":"];function d(a){this.mode=t.ALPHANUMERIC,this.data=a}return d.getBitsLength=function(s){return 11*Math.floor(s/2)+6*(s%2)},d.prototype.getLength=function(){return this.data.length},d.prototype.getBitsLength=function(){return d.getBitsLength(this.data.length)},d.prototype.write=function(s){let n;for(n=0;n+2<=this.data.length;n+=2){let o=l.indexOf(this.data[n])*45;o+=l.indexOf(this.data[n+1]),s.put(o,11)}this.data.length%2&&s.put(l.indexOf(this.data[n]),6)},ht=d,ht}var mt,Is;function Jn(){if(Is)return mt;Is=1;const t=Ce();function l(d){this.mode=t.BYTE,typeof d=="string"?this.data=new TextEncoder().encode(d):this.data=new Uint8Array(d)}return l.getBitsLength=function(a){return a*8},l.prototype.getLength=function(){return this.data.length},l.prototype.getBitsLength=function(){return l.getBitsLength(this.data.length)},l.prototype.write=function(d){for(let a=0,s=this.data.length;a<s;a++)d.put(this.data[a],8)},mt=l,mt}var pt,Ps;function Yn(){if(Ps)return pt;Ps=1;const t=Ce(),l=ke();function d(a){this.mode=t.KANJI,this.data=a}return d.getBitsLength=function(s){return s*13},d.prototype.getLength=function(){return this.data.length},d.prototype.getBitsLength=function(){return d.getBitsLength(this.data.length)},d.prototype.write=function(a){let s;for(s=0;s<this.data.length;s++){let n=l.toSJIS(this.data[s]);if(n>=33088&&n<=40956)n-=33088;else if(n>=57408&&n<=60351)n-=49472;else throw new Error("Invalid SJIS character: "+this.data[s]+`
Make sure your charset is UTF-8`);n=(n>>>8&255)*192+(n&255),a.put(n,13)}},pt=d,pt}var ft={exports:{}},Bs;function Zn(){return Bs||(Bs=1,(function(t){var l={single_source_shortest_paths:function(d,a,s){var n={},o={};o[a]=0;var r=l.PriorityQueue.make();r.push(a,0);for(var i,g,m,j,E,b,B,U,O;!r.empty();){i=r.pop(),g=i.value,j=i.cost,E=d[g]||{};for(m in E)E.hasOwnProperty(m)&&(b=E[m],B=j+b,U=o[m],O=typeof o[m]>"u",(O||U>B)&&(o[m]=B,r.push(m,B),n[m]=g))}if(typeof s<"u"&&typeof o[s]>"u"){var P=["Could not find a path from ",a," to ",s,"."].join("");throw new Error(P)}return n},extract_shortest_path_from_predecessor_list:function(d,a){for(var s=[],n=a;n;)s.push(n),d[n],n=d[n];return s.reverse(),s},find_path:function(d,a,s){var n=l.single_source_shortest_paths(d,a,s);return l.extract_shortest_path_from_predecessor_list(n,s)},PriorityQueue:{make:function(d){var a=l.PriorityQueue,s={},n;d=d||{};for(n in a)a.hasOwnProperty(n)&&(s[n]=a[n]);return s.queue=[],s.sorter=d.sorter||a.default_sorter,s},default_sorter:function(d,a){return d.cost-a.cost},push:function(d,a){var s={value:d,cost:a};this.queue.push(s),this.queue.sort(this.sorter)},pop:function(){return this.queue.shift()},empty:function(){return this.queue.length===0}}};t.exports=l})(ft)),ft.exports}var Ls;function Xn(){return Ls||(Ls=1,(function(t){const l=Ce(),d=Wn(),a=Qn(),s=Jn(),n=Yn(),o=Qs(),r=ke(),i=Zn();function g(P){return unescape(encodeURIComponent(P)).length}function m(P,A,D){const S=[];let H;for(;(H=P.exec(D))!==null;)S.push({data:H[0],index:H.index,mode:A,length:H[0].length});return S}function j(P){const A=m(o.NUMERIC,l.NUMERIC,P),D=m(o.ALPHANUMERIC,l.ALPHANUMERIC,P);let S,H;return r.isKanjiModeEnabled()?(S=m(o.BYTE,l.BYTE,P),H=m(o.KANJI,l.KANJI,P)):(S=m(o.BYTE_KANJI,l.BYTE,P),H=[]),A.concat(D,S,H).sort(function(I,R){return I.index-R.index}).map(function(I){return{data:I.data,mode:I.mode,length:I.length}})}function E(P,A){switch(A){case l.NUMERIC:return d.getBitsLength(P);case l.ALPHANUMERIC:return a.getBitsLength(P);case l.KANJI:return n.getBitsLength(P);case l.BYTE:return s.getBitsLength(P)}}function b(P){return P.reduce(function(A,D){const S=A.length-1>=0?A[A.length-1]:null;return S&&S.mode===D.mode?(A[A.length-1].data+=D.data,A):(A.push(D),A)},[])}function B(P){const A=[];for(let D=0;D<P.length;D++){const S=P[D];switch(S.mode){case l.NUMERIC:A.push([S,{data:S.data,mode:l.ALPHANUMERIC,length:S.length},{data:S.data,mode:l.BYTE,length:S.length}]);break;case l.ALPHANUMERIC:A.push([S,{data:S.data,mode:l.BYTE,length:S.length}]);break;case l.KANJI:A.push([S,{data:S.data,mode:l.BYTE,length:g(S.data)}]);break;case l.BYTE:A.push([{data:S.data,mode:l.BYTE,length:g(S.data)}])}}return A}function U(P,A){const D={},S={start:{}};let H=["start"];for(let N=0;N<P.length;N++){const I=P[N],R=[];for(let $=0;$<I.length;$++){const h=I[$],w=""+N+$;R.push(w),D[w]={node:h,lastCount:0},S[w]={};for(let C=0;C<H.length;C++){const T=H[C];D[T]&&D[T].node.mode===h.mode?(S[T][w]=E(D[T].lastCount+h.length,h.mode)-E(D[T].lastCount,h.mode),D[T].lastCount+=h.length):(D[T]&&(D[T].lastCount=h.length),S[T][w]=E(h.length,h.mode)+4+l.getCharCountIndicator(h.mode,A))}}H=R}for(let N=0;N<H.length;N++)S[H[N]].end=0;return{map:S,table:D}}function O(P,A){let D;const S=l.getBestModeForData(P);if(D=l.from(A,S),D!==l.BYTE&&D.bit<S.bit)throw new Error('"'+P+'" cannot be encoded with mode '+l.toString(D)+`.
 Suggested mode is: `+l.toString(S));switch(D===l.KANJI&&!r.isKanjiModeEnabled()&&(D=l.BYTE),D){case l.NUMERIC:return new d(P);case l.ALPHANUMERIC:return new a(P);case l.KANJI:return new n(P);case l.BYTE:return new s(P)}}t.fromArray=function(A){return A.reduce(function(D,S){return typeof S=="string"?D.push(O(S,null)):S.data&&D.push(O(S.data,S.mode)),D},[])},t.fromString=function(A,D){const S=j(A,r.isKanjiModeEnabled()),H=B(S),N=U(H,D),I=i.find_path(N.map,"start","end"),R=[];for(let $=1;$<I.length-1;$++)R.push(N.table[I[$]].node);return t.fromArray(b(R))},t.rawSplit=function(A){return t.fromArray(j(A,r.isKanjiModeEnabled()))}})(ct)),ct}var Ms;function er(){if(Ms)return Ye;Ms=1;const t=ke(),l=yt(),d=zn(),a=Un(),s=Fn(),n=qn(),o=_n(),r=Ks(),i=On(),g=Gn(),m=Kn(),j=Ce(),E=Xn();function b(N,I){const R=N.size,$=n.getPositions(I);for(let h=0;h<$.length;h++){const w=$[h][0],C=$[h][1];for(let T=-1;T<=7;T++)if(!(w+T<=-1||R<=w+T))for(let L=-1;L<=7;L++)C+L<=-1||R<=C+L||(T>=0&&T<=6&&(L===0||L===6)||L>=0&&L<=6&&(T===0||T===6)||T>=2&&T<=4&&L>=2&&L<=4?N.set(w+T,C+L,!0,!0):N.set(w+T,C+L,!1,!0))}}function B(N){const I=N.size;for(let R=8;R<I-8;R++){const $=R%2===0;N.set(R,6,$,!0),N.set(6,R,$,!0)}}function U(N,I){const R=s.getPositions(I);for(let $=0;$<R.length;$++){const h=R[$][0],w=R[$][1];for(let C=-2;C<=2;C++)for(let T=-2;T<=2;T++)C===-2||C===2||T===-2||T===2||C===0&&T===0?N.set(h+C,w+T,!0,!0):N.set(h+C,w+T,!1,!0)}}function O(N,I){const R=N.size,$=g.getEncodedBits(I);let h,w,C;for(let T=0;T<18;T++)h=Math.floor(T/3),w=T%3+R-8-3,C=($>>T&1)===1,N.set(h,w,C,!0),N.set(w,h,C,!0)}function P(N,I,R){const $=N.size,h=m.getEncodedBits(I,R);let w,C;for(w=0;w<15;w++)C=(h>>w&1)===1,w<6?N.set(w,8,C,!0):w<8?N.set(w+1,8,C,!0):N.set($-15+w,8,C,!0),w<8?N.set(8,$-w-1,C,!0):w<9?N.set(8,15-w-1+1,C,!0):N.set(8,15-w-1,C,!0);N.set($-8,8,1,!0)}function A(N,I){const R=N.size;let $=-1,h=R-1,w=7,C=0;for(let T=R-1;T>0;T-=2)for(T===6&&T--;;){for(let L=0;L<2;L++)if(!N.isReserved(h,T-L)){let V=!1;C<I.length&&(V=(I[C]>>>w&1)===1),N.set(h,T-L,V),w--,w===-1&&(C++,w=7)}if(h+=$,h<0||R<=h){h-=$,$=-$;break}}}function D(N,I,R){const $=new d;R.forEach(function(L){$.put(L.mode.bit,4),$.put(L.getLength(),j.getCharCountIndicator(L.mode,N)),L.write($)});const h=t.getSymbolTotalCodewords(N),w=r.getTotalCodewordsCount(N,I),C=(h-w)*8;for($.getLengthInBits()+4<=C&&$.put(0,4);$.getLengthInBits()%8!==0;)$.putBit(0);const T=(C-$.getLengthInBits())/8;for(let L=0;L<T;L++)$.put(L%2?17:236,8);return S($,N,I)}function S(N,I,R){const $=t.getSymbolTotalCodewords(I),h=r.getTotalCodewordsCount(I,R),w=$-h,C=r.getBlocksCount(I,R),T=$%C,L=C-T,V=Math.floor($/C),ne=Math.floor(w/C),fe=ne+1,ye=V-ne,Ae=new i(ye);let ge=0;const le=new Array(C),de=new Array(C);let ce=0;const Ie=new Uint8Array(N.buffer);for(let re=0;re<C;re++){const ae=re<L?ne:fe;le[re]=Ie.slice(ge,ge+ae),de[re]=Ae.encode(le[re]),ge+=ae,ce=Math.max(ce,ae)}const he=new Uint8Array($);let te=0,Z,J;for(Z=0;Z<ce;Z++)for(J=0;J<C;J++)Z<le[J].length&&(he[te++]=le[J][Z]);for(Z=0;Z<ye;Z++)for(J=0;J<C;J++)he[te++]=de[J][Z];return he}function H(N,I,R,$){let h;if(Array.isArray(N))h=E.fromArray(N);else if(typeof N=="string"){let V=I;if(!V){const ne=E.rawSplit(N);V=g.getBestVersionForData(ne,R)}h=E.fromString(N,V||40)}else throw new Error("Invalid data");const w=g.getBestVersionForData(h,R);if(!w)throw new Error("The amount of data is too big to be stored in a QR Code");if(!I)I=w;else if(I<w)throw new Error(`
The chosen QR Code version cannot contain this amount of data.
Minimum version required to store current data is: `+w+`.
`);const C=D(I,R,h),T=t.getSymbolSize(I),L=new a(T);return b(L,I),B(L),U(L,I),P(L,R,0),I>=7&&O(L,I),A(L,C),isNaN($)&&($=o.getBestMask(L,P.bind(null,L,R))),o.applyMask($,L),P(L,R,$),{modules:L,version:I,errorCorrectionLevel:R,maskPattern:$,segments:h}}return Ye.create=function(I,R){if(typeof I>"u"||I==="")throw new Error("No input text");let $=l.M,h,w;return typeof R<"u"&&($=l.from(R.errorCorrectionLevel,l.M),h=g.from(R.version),w=o.from(R.maskPattern),R.toSJISFunc&&t.setToSJISFunction(R.toSJISFunc)),H(I,h,$,w)},Ye}var gt={},xt={},Ds;function Js(){return Ds||(Ds=1,(function(t){function l(d){if(typeof d=="number"&&(d=d.toString()),typeof d!="string")throw new Error("Color should be defined as hex string");let a=d.slice().replace("#","").split("");if(a.length<3||a.length===5||a.length>8)throw new Error("Invalid hex color: "+d);(a.length===3||a.length===4)&&(a=Array.prototype.concat.apply([],a.map(function(n){return[n,n]}))),a.length===6&&a.push("F","F");const s=parseInt(a.join(""),16);return{r:s>>24&255,g:s>>16&255,b:s>>8&255,a:s&255,hex:"#"+a.slice(0,6).join("")}}t.getOptions=function(a){a||(a={}),a.color||(a.color={});const s=typeof a.margin>"u"||a.margin===null||a.margin<0?4:a.margin,n=a.width&&a.width>=21?a.width:void 0,o=a.scale||4;return{width:n,scale:n?4:o,margin:s,color:{dark:l(a.color.dark||"#000000ff"),light:l(a.color.light||"#ffffffff")},type:a.type,rendererOpts:a.rendererOpts||{}}},t.getScale=function(a,s){return s.width&&s.width>=a+s.margin*2?s.width/(a+s.margin*2):s.scale},t.getImageWidth=function(a,s){const n=t.getScale(a,s);return Math.floor((a+s.margin*2)*n)},t.qrToImageData=function(a,s,n){const o=s.modules.size,r=s.modules.data,i=t.getScale(o,n),g=Math.floor((o+n.margin*2)*i),m=n.margin*i,j=[n.color.light,n.color.dark];for(let E=0;E<g;E++)for(let b=0;b<g;b++){let B=(E*g+b)*4,U=n.color.light;if(E>=m&&b>=m&&E<g-m&&b<g-m){const O=Math.floor((E-m)/i),P=Math.floor((b-m)/i);U=j[r[O*o+P]?1:0]}a[B++]=U.r,a[B++]=U.g,a[B++]=U.b,a[B]=U.a}}})(xt)),xt}var zs;function tr(){return zs||(zs=1,(function(t){const l=Js();function d(s,n,o){s.clearRect(0,0,n.width,n.height),n.style||(n.style={}),n.height=o,n.width=o,n.style.height=o+"px",n.style.width=o+"px"}function a(){try{return document.createElement("canvas")}catch{throw new Error("You need to specify a canvas element")}}t.render=function(n,o,r){let i=r,g=o;typeof i>"u"&&(!o||!o.getContext)&&(i=o,o=void 0),o||(g=a()),i=l.getOptions(i);const m=l.getImageWidth(n.modules.size,i),j=g.getContext("2d"),E=j.createImageData(m,m);return l.qrToImageData(E.data,n,i),d(j,g,m),j.putImageData(E,0,0),g},t.renderToDataURL=function(n,o,r){let i=r;typeof i>"u"&&(!o||!o.getContext)&&(i=o,o=void 0),i||(i={});const g=t.render(n,o,i),m=i.type||"image/png",j=i.rendererOpts||{};return g.toDataURL(m,j.quality)}})(gt)),gt}var bt={},Us;function sr(){if(Us)return bt;Us=1;const t=Js();function l(s,n){const o=s.a/255,r=n+'="'+s.hex+'"';return o<1?r+" "+n+'-opacity="'+o.toFixed(2).slice(1)+'"':r}function d(s,n,o){let r=s+n;return typeof o<"u"&&(r+=" "+o),r}function a(s,n,o){let r="",i=0,g=!1,m=0;for(let j=0;j<s.length;j++){const E=Math.floor(j%n),b=Math.floor(j/n);!E&&!g&&(g=!0),s[j]?(m++,j>0&&E>0&&s[j-1]||(r+=g?d("M",E+o,.5+b+o):d("m",i,0),i=0,g=!1),E+1<n&&s[j+1]||(r+=d("h",m),m=0)):i++}return r}return bt.render=function(n,o,r){const i=t.getOptions(o),g=n.modules.size,m=n.modules.data,j=g+i.margin*2,E=i.color.light.a?"<path "+l(i.color.light,"fill")+' d="M0 0h'+j+"v"+j+'H0z"/>':"",b="<path "+l(i.color.dark,"stroke")+' d="'+a(m,g,i.margin)+'"/>',B='viewBox="0 0 '+j+" "+j+'"',O='<svg xmlns="http://www.w3.org/2000/svg" '+(i.width?'width="'+i.width+'" height="'+i.width+'" ':"")+B+' shape-rendering="crispEdges">'+E+b+`</svg>
`;return typeof r=="function"&&r(null,O),O},bt}var Fs;function nr(){if(Fs)return Te;Fs=1;const t=Dn(),l=er(),d=tr(),a=sr();function s(n,o,r,i,g){const m=[].slice.call(arguments,1),j=m.length,E=typeof m[j-1]=="function";if(!E&&!t())throw new Error("Callback required as last argument");if(E){if(j<2)throw new Error("Too few arguments provided");j===2?(g=r,r=o,o=i=void 0):j===3&&(o.getContext&&typeof g>"u"?(g=i,i=void 0):(g=i,i=r,r=o,o=void 0))}else{if(j<1)throw new Error("Too few arguments provided");return j===1?(r=o,o=i=void 0):j===2&&!o.getContext&&(i=r,r=o,o=void 0),new Promise(function(b,B){try{const U=l.create(r,i);b(n(U,o,i))}catch(U){B(U)}})}try{const b=l.create(r,i);g(null,n(b,o,i))}catch(b){g(b)}}return Te.create=l.create,Te.toCanvas=s.bind(null,d.render),Te.toDataURL=s.bind(null,d.renderToDataURL),Te.toString=s.bind(null,function(n,o,r){return a.render(n,r)}),Te}var rr=nr();const ar=rn(rr);function K(t){return t==null?"":String(t).replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;")}function f(t){if(t==null||t==="")return"";const d=String(t).split(/\r?\n/),a=s=>{if(!s)return"";try{const n=Intl;if(typeof Intl<"u"&&n.Segmenter){const o=new n.Segmenter("th",{granularity:"word"}),r=[];for(const i of o.segment(s)){const g=i.segment;/^\s+$/.test(g)?r.push(" "):r.push(`<span class="w-seg">${K(g)}</span>`)}return r.join("")}}catch{}return K(s)};return d.map(a).join("<br/>")}function vt(t){try{const l=ar.create(t,{errorCorrectionLevel:"M"}),d=l.modules.size,a=2,s=d+a*2;let n="";for(let r=0;r<d;r++)for(let i=0;i<d;i++)l.modules.get(r,i)&&(n+=`<rect x="${i+a}" y="${r+a}" width="1" height="1" fill="#0f172a"/>`);const o=`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${s} ${s}" width="200" height="200" shape-rendering="crispEdges"><rect width="100%" height="100%" fill="#ffffff"/>${n}</svg>`;return`data:image/svg+xml;utf8,${encodeURIComponent(o)}`}catch{return""}}function ir(t,l,d,a=[]){var re,ae,Ee,ie,Pe,xe,je,ee,be,Be,Le,me,pe,se,Me,De;const s=t.type==="supplier",n=t.type==="location",o=s?t:null,r=n?t:null,i=t.type==="drink_store"?t:null,g=s?o.name:n?r.name:i.storeName,m=s?o.chineseName:n?r.foreignName:i.chineseName,j=s?o.category:n?r.locationType==="mall"?"ห้างสรรพสินค้า":r.locationType:i.storeCategory||"เรฟร้านน้ำ",E=s?o.marketOrCity:n?r.location.addressText||r.zoneOrFloor:i.city,b=t.country==="TH"?"ประเทศไทย (TH)":"ประเทศจีน (CN)",B=typeof window<"u"&&window.location.origin&&!window.location.hostname.includes("localhost")&&!window.location.hostname.includes("127.0.0.1")?`${window.location.origin}${window.location.pathname}`:"https://vitcha-sourcing-fxjw.onrender.com/",U=B.endsWith("/")?B:`${B}/`,O=`${U}?view=${encodeURIComponent(t.id)}&type=${encodeURIComponent(t.type)}`,P=vt(O),A=[];o?((re=o.photos.storefrontAndAtmosphere)==null||re.forEach((u,p)=>A.push({url:u,label:`ป้ายหน้าร้าน / บรรยากาศ #${p+1}`})),(ae=o.photos.contactCards)==null||ae.forEach((u,p)=>A.push({url:u,label:`นามบัตร / WeChat #${p+1}`})),(Ee=o.catalogItems)==null||Ee.forEach((u,p)=>{u.photo&&A.push({url:u.photo,label:u.name?`สินค้า: ${u.name}`:`รายการสินค้า #${p+1}`})})):r?((ie=r.photos.storefrontAndAtmosphere)==null||ie.forEach((u,p)=>A.push({url:u,label:`หน้าร้าน / ทางเดิน #${p+1}`})),(Pe=r.photos.floorPlanAndSpecs)==null||Pe.forEach((u,p)=>A.push({url:u,label:`ผังห้อง / งานระบบ #${p+1}`})),(xe=r.photos.surroundingNeighbors)==null||xe.forEach((u,p)=>A.push({url:u,label:`ร้านข้างเคียง #${p+1}`})),(je=r.photos.contactCards)==null||je.forEach((u,p)=>A.push({url:u,label:`นามบัตร / เอกสารสัญญา #${p+1}`}))):i&&((ee=i.photos.storefrontAndAtmosphere)==null||ee.forEach((u,p)=>A.push({url:u,label:`หน้าร้าน / บรรยากาศ #${p+1}`})),(be=i.photos.menuBoard)==null||be.forEach((u,p)=>A.push({url:u,label:`ป้ายเมนู / ราคา #${p+1}`})),(Be=i.photos.drinkCups)==null||Be.forEach((u,p)=>A.push({url:u,label:`แก้วเครื่องดื่ม #${p+1}`})),(Le=i.drinkItems)==null||Le.forEach((u,p)=>{u.photo&&A.push({url:u.photo,label:u.name?`เมนูชิม: ${u.name}`:`แก้วชิม #${p+1}`})}));const D=oe(t),S=[];D.forEach((u,p)=>{S.push({label:u.label||`คลิปเสียงหน้างาน #${p+1}`,durationSec:u.durationSec||0,url:u.url,source:"บันทึกเสียงหลักหน้างานจริง"})}),o?(o.catalogItems||[]).forEach((u,p)=>{oe(u).forEach((F,M)=>{S.push({label:F.label||`คลิปเสียงสินค้า #${M+1}`,durationSec:F.durationSec||0,url:F.url,source:`สินค้า: ${u.name||`รายการที่ #${p+1}`}`})})}):i&&(i.drinkItems||[]).forEach((u,p)=>{oe(u).forEach((F,M)=>{S.push({label:F.label||`คลิปเสียงเมนู #${M+1}`,durationSec:F.durationSec||0,url:F.url,source:`เมนู: ${u.name||`แก้วที่ #${p+1}`}`})})});const H=Array.isArray(t.videos)?t.videos.filter(Boolean):[],N=Array.isArray(t.viewedBy)?t.viewedBy:[],I=Array.isArray(t.likes)?t.likes:[],R=Array.isArray(t.reviewerNotes)?t.reviewerNotes:[],$=Gs(t).sort((u,p)=>(Date.parse(u.timestamp)||0)-(Date.parse(p.timestamp)||0)),h=u=>{var p;return((p=a.find(F=>F.id===u||F.alias===u||F.name===u))==null?void 0:p.alias)||u},w=`ฉันจะเป็นหัวแถว-${g.replace(/[^a-zA-Z0-9ก-๙_-]/g,"_")}.pdf`,T={awaiting:"พาร์ท 1: รอรับช่วงต่อ",rfq_sent:"พาร์ท 2: ขอสเปก / ส่ง RFQ",sample_test:"พาร์ท 3: ทดสอบตัวอย่าง Lab / R&D",negotiate:"พาร์ท 4: ต่อรองราคา & MOQ",approved:"พาร์ท 5: ตัวเต็งอนุมัติ",ordered:"พาร์ท 6: สั่งซื้อสำเร็จ"}[t.handoffStage||"awaiting"]||"พาร์ท 1: รอรับช่วงต่อ",L=u=>{const p=Ve(u);try{const F=new URL(p,U);return["http:","https:"].includes(F.protocol)?F.href:""}catch{return""}},V=(u,p)=>{const F=L(u);return F?`<div class="media-access"><a href="${K(F)}" target="_blank" rel="noopener noreferrer">${f(p)}</a><img class="media-qr" width="56" height="56" src="${vt(F)}" alt="QR เปิดไฟล์" /></div>`:""},ne=S.length>0?`<div class="media-grid">
          ${S.map((u,p)=>`
              <div class="voice-card">
                <div class="voice-icon">▶</div>
                <div class="voice-meta">
                  <div class="voice-title">${f(`${p+1}. ${u.label}`)}</div>
                  <div class="voice-sub">${f(`${u.source} · ${u.durationSec?`ความยาว ${u.durationSec} วินาที`:"ไม่ระบุความยาวเสียง"}`)}</div>
                  ${V(u.url,"เปิดฟังเสียงบันทึก")}
                </div>
              </div>`).join("")}
        </div>`:`<div class="empty-note">${f("ไม่มีไฟล์เสียงบันทึกในรายการนี้")}</div>`,fe=(u,p)=>`<figure class="video-card">
    <div class="video-thumb-wrap"><img class="video-thumb-img" alt="${K(p)}" crossorigin="anonymous" data-video-src="${K(L(u))}" hidden /><p class="video-thumb-status">กำลังเตรียมภาพจากคลิปนี้…</p></div>
    <figcaption class="video-caption"><div class="video-caption-title">${f(p)}</div>${V(u,"เปิดคลิปพร้อมเสียง")}</figcaption>
  </figure>`,ye=H.length?`<div class="video-grid media-masonry">${H.map((u,p)=>fe(u,`คลิปวิดีโอหน้างาน #${p+1}`)).join("")}</div>`:`<div class="empty-note">${f("ไม่มีคลิปวิดีโอในรายการนี้")}</div>`,Ae=u=>u&&!Number.isNaN(Date.parse(u))?new Date(u).toLocaleString("th-TH"):u||"ไม่ระบุเวลา",ge=(u,p,F=!1)=>{var y;const M=((y=a.find(v=>v.id===u.authorId))==null?void 0:y.alias)||u.author,_=`${F?"ตอบกลับ":"ความคิดเห็น"} #${p}`,ze=wt(u),Y=u.voiceUrl||u.audioUrl;return`<article class="comment-box${F?" reply-item":""}" data-comment-id="${K(u.id)}">
      <div class="comment-header"><strong class="comment-author">${f(`${_} · ${M}`)}</strong><time class="comment-time">${f(Ae(u.timestamp))}</time></div>
      ${"replyToAuthor"in u&&u.replyToAuthor?`<p class="comment-target">${f(`ตอบกลับ ${u.replyToAuthor}`)}</p>`:""}
      ${u.text?`<div class="comment-body">${f(u.text)}</div>`:""}
      ${ze.length?`<div class="comment-media media-masonry">${ze.map((v,x)=>{const ve=`${v.type==="video"?"วิดีโอ":"ภาพ"}แนบ ${x+1} · ${_}${v.name?` · ${v.name}`:""}`;return v.type==="video"?fe(v.url,ve):`<figure class="photo-card"><img src="${K(He(v.url,2e3))}" crossorigin="anonymous" alt="${K(ve)}" /><figcaption class="photo-caption">${f(ve)}${V(_s(v.url),"เปิดภาพต้นฉบับ")}</figcaption></figure>`}).join("")}</div>`:""}
      ${Y?`<div class="comment-audio"><strong>${f(`เสียงแนบ · ${_}${u.duration?` · ${u.duration} วินาที`:""}`)}</strong>${V(Y,"เปิดฟังเสียง")}</div>`:""}
    </article>`},le=R.map((u,p)=>`<section class="comment-thread">${ge(u,String(p+1))}${(u.replies||[]).map((F,M)=>ge(F,`${p+1}.${M+1}`,!0)).join("")}</section>`).join("");let de="";if(s&&o){const u=(o.catalogItems||[]).map((p,F)=>{const M=oe(p);return`
        <tr>
          <td style="text-align:center;font-weight:700;">${F+1}</td>
          <td>
            ${p.photo?`<img src="${K(He(p.photo,2e3))}" crossorigin="anonymous" class="table-thumb" />`:'<div class="table-thumb-empty">ไม่มีรูป</div>'}
          </td>
          <td>
            <div class="cell-title">${f(p.name||`รายการที่ #${F+1}`)}</div>
            ${p.memo?`<div class="cell-sub">${f(p.memo)}</div>`:""}
            ${M.length>0?`<div class="cell-voice-badge">แนบเสียงบันทึก ${M.length} คลิป</div>`:""}
          </td>
          <td>
            <div class="cell-text">${f(p.dimensions||"-")}</div>
            <div class="cell-sub">${f(p.weightKg?`น้ำหนัก: ${p.weightKg}`:"")}</div>
          </td>
          <td>
            <div class="cell-price-green">
              ${p.priceRmb?`¥${p.priceRmb.toLocaleString()}`:p.priceThb?`฿${p.priceThb.toLocaleString()}`:"-"}
            </div>
            ${p.priceRmb?`<div class="cell-sub">(≈ ฿${l(p.priceRmb).toLocaleString()})</div>`:""}
          </td>
        </tr>`}).join("");de=`
      <div class="section-box">
        <div class="section-title">${f(`กลุ่มที่ 3: รายการสินค้า / อุปกรณ์ / วัตถุดิบ (${(o.catalogItems||[]).length} รายการ)`)}</div>
        ${u?`<table class="data-table">
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
                <tbody>${u}</tbody>
              </table>`:`<div class="empty-note">${f("ไม่มีรายการย่อย")}</div>`}
      </div>
    `}else if(i){const u=(i.drinkItems||[]).map((p,F)=>{const M=oe(p);return`
        <tr>
          <td style="text-align:center;font-weight:700;">${F+1}</td>
          <td>
            ${p.photo?`<img src="${K(He(p.photo,2e3))}" crossorigin="anonymous" class="table-thumb" />`:'<div class="table-thumb-empty">ไม่มีรูป</div>'}
          </td>
          <td>
            <div class="cell-title">${f(p.name||`แก้วที่ #${F+1}`)}</div>
            ${p.gimmickNotes?`<div class="cell-sub">${f(`กิมมิก: ${p.gimmickNotes}`)}</div>`:""}
            ${M.length>0?`<div class="cell-voice-badge">แนบเสียงบันทึก ${M.length} คลิป</div>`:""}
          </td>
          <td>
            <div class="cell-text">${f(p.cupSize||"-")}</div>
          </td>
          <td>
            <div class="cell-text">${f(p.fitMenuTarget||"-")}</div>
          </td>
          <td>
            <div class="cell-price-amber">
              ${p.priceRmb?`¥${p.priceRmb.toLocaleString()}`:p.priceThb?`฿${p.priceThb.toLocaleString()}`:"-"}
            </div>
            ${p.priceRmb?`<div class="cell-sub">(≈ ฿${l(p.priceRmb).toLocaleString()})</div>`:""}
          </td>
        </tr>`}).join("");de=`
      <div class="section-box">
        <div class="section-title">${f(`กลุ่มที่ 3: เมนูที่ชิม & การถอดรหัสสูตร (${(i.drinkItems||[]).length} เมนู)`)}</div>
        ${u?`<table class="data-table">
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
                <tbody>${u}</tbody>
              </table>`:`<div class="empty-note">${f("ไม่มีเมนูย่อย")}</div>`}
      </div>
    `}if(r){const u={usableAreaSqm:"พื้นที่ใช้สอย (ตร.ม.)",frontageWidthM:"หน้ากว้าง (เมตร)",ceilingHeightM:"เพดานสูง (เมตร)",layoutFormat:"รูปแบบพื้นที่",electricalPower:"ระบบไฟฟ้า",hasWaterInflow:"ท่อน้ำดี",hasDrainage:"ท่อน้ำทิ้ง",hasGreaseTrap:"ถังดักไขมัน",riderAccessNotes:"การเข้าถึงของไรเดอร์",rentModel:"รูปแบบค่าเช่า",monthlyRentThb:"ค่าเช่า (บาท/เดือน)",monthlyRentRmb:"ค่าเช่า (หยวน/เดือน)",gpPercent:"ส่วนแบ่ง GP (%)",serviceFeePerSqm:"ค่าส่วนกลาง/ตร.ม.",depositMonths:"เงินประกัน (เดือน)",leasePeriodYears:"ระยะสัญญา (ปี)",fitOutPeriodDays:"ระยะตกแต่งปลอดค่าเช่า (วัน)",contactPerson:"ผู้ติดต่อ",contactPhone:"โทรศัพท์",contactLineWechat:"LINE / WeChat"},p={inline:"ห้องแถว",corner:"ห้องมุม",island:"พื้นที่เกาะกลาง",kiosk:"คีออสก์",fixed:"ค่าเช่าคงที่",gp:"ส่วนแบ่งยอดขาย",hybrid:"ค่าเช่าคงที่และส่วนแบ่ง"},F={...r.spaceSpecs,...r.leaseTerms,...r.unitNumber?{unitNumber:r.unitNumber}:{}};de=`<div class="section-box location-details"><div class="section-title">กลุ่มที่ 3: ข้อมูลพื้นที่และเงื่อนไขเช่า</div><div class="info-grid">${Object.entries(F).filter(([,M])=>M!=null&&M!=="").map(([M,_])=>`<div class="info-item"><span class="info-label">${f(M==="unitNumber"?"เลขที่ห้อง":u[M]||M)}</span><span class="info-value">${f(typeof _=="boolean"?_?"มี":"ไม่มี":p[String(_)]||String(_))}</span></div>`).join("")}</div></div>`}const ce=t.attachedFiles||[],Ie=ce.length>0?`<div class="section-box">
          <div class="section-title">${f(`เอกสารและไฟล์แนบเพิ่มเติม (Attached Documents) — (${ce.length} ไฟล์)`)}</div>
          <div class="media-subhead">${f("สแกน QR Code หรือคลิกลิงก์ด้านล่างเพื่อเปิดไฟล์บน Google Drive / เบราว์เซอร์:")}</div>
          ${ce.map((u,p)=>{const F=u.url?vt(u.url):"",M=(u.name.split(".").pop()||"FILE").toUpperCase(),_=u.size?u.size<1024*1024?`${(u.size/1024).toFixed(1)} KB`:`${(u.size/(1024*1024)).toFixed(1)} MB`:"";return`
              <div class="file-attachment-card">
                <div class="file-attachment-info">
                  <div class="file-attachment-name">#${p+1} [${K(M)}] ${K(u.name)}</div>
                  <div class="file-attachment-meta">
                    ${_?`ขนาด: ${_}`:""}
                    ${u.uploadedAt?` · บันทึกเมื่อ: ${new Date(u.uploadedAt).toLocaleDateString("th-TH")}`:""}
                  </div>
                  <div class="file-attachment-link">
                    <a href="${K(u.url)}" target="_blank" rel="noopener noreferrer">${K(u.url)}</a>
                  </div>
                </div>
                ${F?`<div class="file-attachment-qr">
                        <img src="${F}" alt="QR" />
                        <div style="font-size:7px;text-align:center;color:#059669;font-weight:700;margin-top:2px;">Scan Open</div>
                      </div>`:""}
              </div>`}).join("")}
        </div>`:"",he=A.length>0?`<div class="photo-grid media-masonry">
          ${A.map((u,p)=>`
              <div class="photo-card">
                <img src="${K(He(u.url,2e3))}" crossorigin="anonymous" alt="${K(u.label)}" />
                <div class="photo-caption">${f(`รูปที่ ${p+1}: ${u.label}`)}</div>
              </div>`).join("")}
        </div>`:`<div class="empty-note">${f("ไม่มีรูปภาพในรายการนี้")}</div>`,te=$.map((u,p)=>{const F=a.find(M=>M.id===u.userId||M.alias===u.user||M.name===u.user);return`<article class="audit-event" data-activity-id="${K(u.id||p)}"><div class="audit-event-heading"><strong>${f((F==null?void 0:F.alias)||u.user)}</strong><span>${f(Number.isNaN(Date.parse(u.timestamp))?u.timestamp:new Date(u.timestamp).toLocaleString("th-TH"))}</span></div><div class="audit-action">${f(u.action)}</div></article>`}).join(""),Z=N.length>0?`<table class="data-table" style="margin-top:10px;">
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
            ${N.map((u,p)=>`
              <tr>
                <td style="text-align:center;">${p+1}</td>
                <td><div class="cell-title">${f(`${u.alias} (${u.name})`)}</div></td>
                <td><div class="cell-text">${K(u.role.toUpperCase())}</div></td>
                <td><div class="cell-sub">${K(new Date(u.lastViewedAt).toLocaleString("th-TH"))}</div></td>
                <td style="text-align:center;font-weight:700;">${f(`${u.viewCount||1} ครั้ง`)}</td>
              </tr>`).join("")}
          </tbody>
        </table>`:`<div class="empty-note" style="margin-top:8px;">${f("ยังไม่มีประวัติผู้เปิดอ่านเพิ่มเติม")}</div>`,J=s?`คะแนนประเมิน ${(o==null?void 0:o.rating)??"-"}/5 ดาว (${o!=null&&o.isFactory?"โรงงานผลิต":"หน้าร้าน/โชว์รูม"})`:n?`คนสัญจร ${(r==null?void 0:r.ratings.footTraffic)??"-"}/5 · การมองเห็น ${(r==null?void 0:r.ratings.visibility)??"-"}/5 · การเข้าถึง ${(r==null?void 0:r.ratings.accessibility)??"-"}/5 · ความคุ้มค่า ${(r==null?void 0:r.ratings.valueRoi)??"-"}/5`:`รสชาติ ${i==null?void 0:i.ratings.taste}/5 · ดีไซน์ ${i==null?void 0:i.ratings.aesthetics}/5 · คุ้มค่า ${i==null?void 0:i.ratings.value}/5 · ความไว ${i==null?void 0:i.ratings.speed}/5`;return`<!DOCTYPE html>
<html lang="th">
<head>
  <meta charset="UTF-8" />
  <base href="${K(U)}" />
  <meta name="viewport" content="width=840, initial-scale=0.45, minimum-scale=0.3, maximum-scale=2.0, user-scalable=yes" />
  <title>ฉันจะเป็นหัวแถว - ${K(g)}</title>
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
      line-height: 1.35;
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
      min-width: 0;
      width: 100vw;
      box-sizing: border-box;
      left: 0;
      flex-wrap: wrap;
    }
    .toolbar-btn:disabled { opacity: 0.5; cursor: wait; }
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
      text-decoration: none;
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
      line-height: 1.35;
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
      break-after: avoid;
      page-break-after: avoid;
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
      line-height: 1.35;
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
      line-height: 1.35;
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

    .media-masonry { column-count: 2; column-gap: 12px; }
    .video-card, .photo-card { display: inline-block; vertical-align: top; width: 100%; margin: 0 0 12px; break-inside: avoid; page-break-inside: avoid; }
    .video-card { border: 1px solid #cbd5e1; border-radius: 8px; overflow: hidden; background: #fff; }
    .video-thumb-wrap { position: relative; width: 100%; }
    .video-thumb-img { display: block; width: 100%; height: auto; }
    .video-thumb-img[hidden] { display: none; }
    .video-thumb-status { padding: 14px; color: #64748b; font-size: 11px; }
    .video-caption { padding: 8px 10px; border-top: 1px solid #cbd5e1; }
    .video-caption-title { font-size: 11.5px; font-weight: 800; color: #0f172a; }
    .media-access { position: relative; min-height: 56px; padding-right: 64px; margin-top: 6px; font-size: 10px; }
    .media-access a { color: #047857; text-decoration: underline; overflow-wrap: anywhere; }
    .media-access img.media-qr { position: absolute; display: block; right: 0; top: 0; width: 56px; height: 56px; }
    .pdf-media-grid { column-count: auto; display: block; }
    .pdf-media-row { display: flex; gap: 12px; align-items: flex-start; margin-bottom: 12px; break-inside: avoid; page-break-inside: avoid; }
    .pdf-media-row > figure, .pdf-media-row > .photo-card { margin: 0; min-width: 0; }
    .comment-media { margin-top: 10px; }
    .comment-audio { border-top: 1px solid #cbd5e1; padding-top: 8px; break-inside: avoid; }
    .comment-target { color: #64748b; font-size: 10px; }

    /* Complete activity history: normal document flow, with no fixed-height cells. */
    .activity-report { overflow: visible; }
    .activity-report .w-seg { max-width: 100%; white-space: normal; overflow-wrap: anywhere; }
    .audit-intro { margin: 3px 0; break-after: avoid; page-break-after: avoid; }
    .audit-intro, .audit-legacy { font-size: 11px; line-height: 1.35; }
    .audit-legacy { color: #92400e; background: #fffbeb; padding: 8px; }
    .audit-current-summary { border-left: 3px solid #059669; padding: 8px 12px; font-size: 11.5px; margin-bottom: 12px; }
    .audit-stages { margin-bottom: 12px; }
    .audit-stage { border-bottom: 1px solid #cbd5e1; padding: 6px 0; font-size: 10px; break-inside: avoid; break-after: avoid; }
    .audit-stage strong { display: block; font-size: 11px; }
    .audit-stage-missing { grid-column: 1 / -1; border: 0; padding: 2px 0; color: #64748b; }
    .audit-current { background: #ecfdf5; border-color: #10b981; }
    .audit-event { border-bottom: 1px solid #e2e8f0; padding: 4px 0; margin: 0; font-size: 11.5px; overflow-wrap: anywhere; break-inside: avoid; }
    .audit-event-heading { display: flex; align-items: center; gap: 7px; font-size: 11px; break-after: avoid; }
    .audit-event-heading > span:last-child { color: #64748b; margin-left: auto; font-size: 10px; }
    .audit-avatar { width: 27px; height: 27px; border-radius: 50%; object-fit: cover; flex-shrink: 0; }
    .audit-avatar-fallback { background: #e2e8f0; color: #475569; text-align: center; line-height: 27px; }
    .audit-action { font-weight: 700; margin-top: 2px; }
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
      height: auto;
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
      line-height: 1.35;
      margin-bottom: 2px;
    }
    .cell-text {
      color: #1e293b;
      font-size: 11.5px;
      line-height: 1.35;
    }
    .cell-sub {
      font-size: 10.5px;
      color: #475569;
      line-height: 1.35;
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
    .photo-grid { column-count: 3; }
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
      height: auto;
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
      padding: 6px 8px;
      margin-bottom: 6px;
      background: #f8fafc;
      font-size: 11.5px;
      page-break-inside: auto;
      break-inside: auto;
    }
    .comment-header {
      break-after: avoid;
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
      overflow-wrap: anywhere;
      orphans: 3; widows: 3;
      color: #1e293b;
      font-weight: 500;
      line-height: 1.35;
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

    @page { size: A4; margin: 8mm; }
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
      <strong style="font-size:14px;">รายงานสรุปฉบับสมบูรณ์: ${K(g)}</strong>
      <span id="status-indicator" style="font-size:12px;color:#94a3b8;margin-left:10px;">
        ${d==="pdf"?"กำลังจัดหน้าและสร้างไฟล์ PDF...":"พร้อมพิมพ์รายงาน"}
      </span>
    </div>
    <div style="display:flex;gap:8px;flex-wrap:wrap;">
      <a class="toolbar-btn btn-close" href="${K(O)}">กลับหน้ารายละเอียด</a>
      <button class="toolbar-btn btn-pdf" data-report-export disabled onclick="triggerDownloadPdf()">ดาวน์โหลด PDF</button>
      <button class="toolbar-btn btn-print" data-report-export disabled onclick="window.print()">สั่งพิมพ์ (Print)</button>
      <button class="toolbar-btn btn-close" onclick="window.close()">ปิดหน้านี้</button>
    </div>
  </div>

  <div class="sheet-outer">
    <div id="report-content" class="page-sheet">
      <!-- Report Header with QR Code -->
      <div class="report-header">
        <div class="header-left">
          <div class="badge">${f(`${s?"รายงานซัพพลายเออร์ & โรงงาน":n?"รายงานสำรวจทำเล":"รายงานเรฟร้านน้ำ & R&D"} · ${b}`)}</div>
          <h1 class="brand-title">${f(g)}</h1>
          <div class="brand-sub">${f(`${m?`${m} · `:""}หมวดหมู่: ${j}`)}</div>

          <!-- At-a-glance Multimedia & Detail Counter Pills -->
          <div class="summary-pills">
            <span class="summary-pill">${f(`รูปภาพ ${A.length} รูป`)}</span>
            <span class="summary-pill">${f(`วอยซ์เสียง ${S.length} คลิป`)}</span>
            <span class="summary-pill">${f(`วิดีโอ ${H.length} คลิป`)}</span>
            <span class="summary-pill">${f(s?`สินค้า ${((o==null?void 0:o.catalogItems)||[]).length} รายการ`:n?`พื้นที่ ${((me=r==null?void 0:r.spaceSpecs)==null?void 0:me.usableAreaSqm)??"-"} ตร.ม.`:`เมนูชิม ${((i==null?void 0:i.drinkItems)||[]).length} เมนู`)}</span>
            <span class="summary-pill">${f(`คอมเมนต์ ${R.length} หัวข้อ`)}</span>
            <span class="summary-pill">${f(`ประวัติ Log ${$.length} รายการ`)}</span>
          </div>

          <div class="direct-link-bar">
            <div class="info-label" style="color:#0f172a;margin-bottom:2px;">Direct Link (Scan QR / LINE Share):</div>
            <div style="color:#059669;font-family:monospace;font-size:10px;word-break:break-all;">${K(O)}</div>
          </div>
        </div>

        <div class="header-right">
          <div class="meta-box">
            <div class="meta-platform">${f("ฉันจะเป็นหัวแถว")}</div>
            <div>LEAD THE FRONT · R&amp;D</div>
            <div style="margin-top:4px;">${f(`รหัส: ${t.id.slice(0,18)}`)}</div>
            <div>${f(`สถานะ: ${T}`)}</div>
            <div>${f(`ออกรายงาน: ${new Date().toLocaleString("th-TH")}`)}</div>
          </div>

          ${P?`<div class="qr-card">
                  <img id="report-qr-img" src="${P}" alt="QR Code" />
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
            <span class="info-value">${f(`${g}${m?` (${m})`:""}`)}</span>
          </div>
          <div class="info-item">
            <span class="info-label">${f("หมวดหมู่ & คะแนนประเมิน")}</span>
            <span class="info-value">${f(`${j} · ${J}`)}</span>
          </div>
          <div class="info-item">
            <span class="info-label">${f("สถานที่ / ตลาด / เมือง")}</span>
            <span class="info-value">${f(E||((pe=t.location)==null?void 0:pe.addressText)||"-")}</span>
          </div>
          <div class="info-item">
            <span class="info-label">${f("พิกัด GPS & แผนที่")}</span>
            <span class="info-value">${t.location?`${t.location.lat.toFixed(5)}, ${t.location.lng.toFixed(5)} (${K(t.location.addressText||"พิกัดหน้างาน")})`:"-"}</span>
          </div>
          <div class="info-item">
            <span class="info-label">${f("ช่องทางติดต่อ (WeChat / LINE / โทรศัพท์)")}</span>
            <span class="info-value">${f(n?`ผู้ติดต่อ: ${((se=r==null?void 0:r.leaseTerms)==null?void 0:se.contactPerson)||"-"} · โทร: ${((Me=r==null?void 0:r.leaseTerms)==null?void 0:Me.contactPhone)||"-"} · LINE / WeChat: ${((De=r==null?void 0:r.leaseTerms)==null?void 0:De.contactLineWechat)||"-"}`:`WeChat: ${(s?o==null?void 0:o.wechatId:i==null?void 0:i.wechatId)||"-"} | LINE: ${(s?o==null?void 0:o.lineId:i==null?void 0:i.lineId)||"-"} | โทร: ${(s?o==null?void 0:o.phone:i==null?void 0:i.phone)||"-"}`)}</span>
          </div>
          <div class="info-item">
            <span class="info-label">${f("ผู้ลงพื้นที่สำรวจ & เวลาที่บันทึก")}</span>
            <span class="info-value">${f(`${t.creator.alias}${t.creator.name&&t.creator.name!==t.creator.alias?` (${t.creator.name})`:""} · ${new Date(t.creator.timestamp).toLocaleString("th-TH")}`)}</span>
          </div>
          <div class="info-item">
            <span class="info-label">${f("ผู้รับผิดชอบรับช่วงต่อ & กำหนดติดตาม")}</span>
            <span class="info-value">${f(`${t.assignedTo?h(t.assignedTo):"ยังไม่ระบุผู้รับผิดชอบ"} · กำหนดติดตาม: ${t.targetFollowUpDate||"-"}`)}</span>
          </div>
          <div class="info-item">
            <span class="info-label">${f("การมีส่วนร่วมของทีม (Likes & Views)")}</span>
            <span class="info-value">${f(`กดถูกใจ ${I.length} คน · เปิดอ่านแล้ว ${N.length} คน`)}</span>
          </div>
        </div>

        ${(s?o!=null&&o.memo:i!=null&&i.tastingNotes)?`<div class="note-banner">
                <div class="note-banner-title">${f(s?"บันทึกภาพรวมหน้างาน / รายละเอียดสเปกหลัก:":"บันทึกรีวิวรสชาติ & ไอเดียเรฟหน้างาน:")}</div>
                <div class="note-banner-body">${f(s?o==null?void 0:o.memo:i==null?void 0:i.tastingNotes)}</div>
              </div>`:""}

        ${t.handoffNotes?`<div class="handoff-banner">
                <div class="handoff-banner-title">${f("โน้ตการส่งมอบงาน / ผลเจรจาทีมไทย:")}</div>
                <div class="note-banner-body">${f(t.handoffNotes)}</div>
              </div>`:""}
      </div>

      <!-- Group 2: Voice Recordings & Video Clips with Thumbnail Previews -->
      <div class="section-box">
        <div class="section-title">${f(`กลุ่มที่ 2: สื่อมัลติมีเดียหน้างาน — วอยซ์เสียงบันทึก (${S.length} คลิป) & วิดีโอ (${H.length} คลิป)`)}</div>
        <div class="media-subhead">${f(`ไฟล์เสียงบันทึกหน้างานจริง (${S.length} คลิป):`)}</div>
        ${ne}
        <div class="media-subhead" style="margin-top:10px;">${f(`คลิปวิดีโอหน้างานพร้อมภาพ Thumbnail พรีวิว (${H.length} คลิป):`)}</div>
        ${ye}
      </div>

      <!-- Group 3: Catalog / Drink Items -->
      ${de}

      <!-- Attached Documents & Files -->
      ${Ie}

      <!-- Group 4: All Photos of This Item -->
      <div class="section-box">
        <div class="section-title">${f(`กลุ่มที่ 4: แกลเลอรีภาพถ่ายทั้งหมดของรายการนี้ (${A.length} รูป)`)}</div>
        ${he}
      </div>

      <div class="section-box comments-report" id="record-comments">
        <div class="section-title">${f(`กลุ่มที่ 5: ความคิดเห็นและการตอบกลับ (${R.length} ความคิดเห็น)`)}</div>
        ${le||'<div class="empty-note">ยังไม่มีความคิดเห็น</div>'}
      </div>

      <!-- Group 6: Activity & Handoff Log + Viewer Log -->
      <div class="section-box activity-report" id="activity-history">
        <div class="section-title">${f(`กลุ่มที่ 6: ประวัติการดำเนินงาน (${$.length} เหตุการณ์)`)}</div>
        <p class="audit-intro">${f("วันเวลา · ผู้ดำเนินการ · กิจกรรม เรียงจากเก่าไปใหม่")}</p>
        ${te}
        ${N.length?`<h3 class="audit-viewers">${f("ผู้เปิดอ่านรายการ")}</h3>${Z}`:""}
      </div>
    </div>
  </div>

  <script>
    // Never substitute another photo for a clip. Decode the actual file, preserving
    // its dimensions; at most two transfers run together and repeated URLs share a frame.
    function prepareVideoThumbnails() {
      var imgs = Array.from(document.querySelectorAll('img[data-video-src]'));
      var completed = 0;
      var groups = new Map();
      imgs.forEach(function(img) {
        var src = img.getAttribute('data-video-src');
        if (!groups.has(src)) groups.set(src, []);
        groups.get(src).push(img);
      });
      var queue = Array.from(groups.entries());
      function frame(src, targets) {
        return new Promise(function(resolve) {
          var video = document.createElement('video');
          var done = false;
          var finish = function(data) {
            if (done) return;
            done = true; clearTimeout(timer);
            completed += targets.length;
            var progress = document.getElementById('status-indicator');
            if (progress) progress.textContent = 'เตรียมภาพจากคลิป ' + completed + ' / ' + imgs.length;
            targets.forEach(function(img) {
              var status = img.parentElement.querySelector('.video-thumb-status');
              if (data) { img.src = data; img.hidden = false; img.dataset.thumbnailStatus = 'ready'; status.hidden = true; }
              else { img.dataset.thumbnailStatus = 'unavailable'; status.textContent = 'ไม่สามารถสร้างภาพจากคลิปนี้ได้ · เปิดคลิปจากลิงก์ด้านล่าง'; }
            });
            video.pause(); video.removeAttribute('src'); video.load();
            Promise.all(targets.map(function(img) { return data ? img.decode().catch(function(){}) : Promise.resolve(); })).then(resolve);
          };
          var timer = setTimeout(function() { finish(); }, 30000);
          var capture = function() {
            if (done || !video.videoWidth || !video.videoHeight) return;
            try {
              var scale = Math.min(1, 1200 / Math.max(video.videoWidth, video.videoHeight));
              var canvas = document.createElement('canvas');
              canvas.width = Math.round(video.videoWidth * scale); canvas.height = Math.round(video.videoHeight * scale);
              canvas.getContext('2d').drawImage(video, 0, 0, canvas.width, canvas.height);
              finish(canvas.toDataURL('image/jpeg', 0.9));
            } catch(e) { finish(); }
          };
          video.crossOrigin = 'anonymous'; video.muted = true; video.playsInline = true; video.preload = 'auto';
          video.addEventListener('loadeddata', function() {
            var time = Number.isFinite(video.duration) ? Math.min(0.5, video.duration / 4) : 0;
            if (time > 0) { try { video.currentTime = time; } catch(e) { capture(); } }
            else capture();
          }, {once: true});
          video.addEventListener('seeked', capture, {once: true});
          video.addEventListener('error', function() { finish(); }, {once: true});
          if (src) video.src = src; else finish();
        });
      }
      async function worker() { while (queue.length) { var entry = queue.shift(); await frame(entry[0], entry[1]); } }
      return Promise.all([worker(), worker()]);
    }

    // Rasterize all SVG QR images onto PNG Data URLs so html2canvas renders them crisply on all browsers
    function rasterizeQrImage() {
      var qrImgs = Array.prototype.slice.call(document.querySelectorAll('#report-qr-img, .file-attachment-qr img, .media-qr'));
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

    function pdfLayout(element) {
      var clone = element.cloneNode(true);
      // html2pdf cannot paginate CSS columns reliably. Keep natural image heights
      // in complete rows for the downloadable PDF; the preview stays masonry.
      clone.querySelectorAll('.media-masonry').forEach(function(grid) {
        var cards = Array.from(grid.children);
        var portraitClips = grid.classList.contains('video-grid') && cards.every(function(card) {
          var image = card.querySelector('.video-thumb-img');
          return image && !image.hidden && image.naturalHeight > image.naturalWidth;
        });
        var columns = grid.classList.contains('photo-grid') || portraitClips ? 3 : 2;
        grid.replaceChildren(); grid.classList.remove('media-masonry'); grid.classList.add('pdf-media-grid');
        grid.style.columnCount = 'auto';
        for (var i = 0; i < cards.length; i += columns) {
          var row = document.createElement('div'); row.className = 'pdf-media-row';
          cards.slice(i, i + columns).forEach(function(card) {
            var width = 'calc((100% - ' + ((columns - 1) * 12) + 'px) / ' + columns + ')';
            card.style.width = width; card.style.flex = '0 0 ' + width; row.appendChild(card);
          });
          grid.appendChild(row);
        }
      });
      return clone;
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
          filename: ${JSON.stringify(w)},
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
            avoid: ['.location-details', '.pdf-media-row', 'tr', '.info-item', '.voice-card', '.video-card', '.photo-card', '.comment-header', '.comment-audio', '.note-banner', '.handoff-banner', '.report-header', '.file-attachment-card', '.audit-stage', '.audit-event', '.audit-change', '.audit-event-heading', '.audit-media']
          }
        };
        var worker = window.html2pdf().set(opt).from(pdfLayout(element));
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
      var mode = ${JSON.stringify(d)};
      var fontsReady = (document.fonts && document.fonts.ready) ? document.fonts.ready : Promise.resolve();
      window.reportReady = Promise.all([fontsReady, rasterizeQrImage(), prepareVideoThumbnails()]);
      window.reportReady.then(function() {
        document.documentElement.dataset.reportReady = 'true';
        document.querySelectorAll('[data-report-export]').forEach(function(button) { button.disabled = false; });
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
</html>`}function qs(t,l,d,a=[]){const s=ir(t,l,d,a),n=new Blob([s],{type:"text/html;charset=utf-8"}),o=URL.createObjectURL(n);if(!window.open(o,"_blank")){const i=document.createElement("a");i.href=o,i.target="_blank",i.click()}setTimeout(()=>URL.revokeObjectURL(o),6e4)}const hr=({item:t,isOpen:l,onClose:d,onShareToLine:a})=>{var It,Pt,Bt,Lt,Mt,Dt,zt,Ut,Ft,qt,_t,Ht,Vt,Ot,Gt,Kt,Wt,Qt,Jt,Yt,Zt,Xt,es,ts,ss;const{currentUser:s,convertCnyToThb:n,addReviewerNote:o,addReviewReply:r,updatePipelineStatus:i,toggleLikeItem:g,suppliers:m,drinkStores:j,locations:E,users:b,quickMessages:B,recordItemView:U,canEditItems:O,canDeleteItems:P,deleteSupplier:A,deleteStoreInspo:D,deleteLocation:S,canComment:H,openEditItem:N}=an(),I=t&&t.type==="supplier"?m.find(c=>c.id===t.id):null,R=t&&t.type==="drink_store"?j.find(c=>c.id===t.id):null,$=t&&t.type==="location"?E.find(c=>c.id===t.id):null,h=I||R||$||t,[w,C]=Q.useState(null),[T,L]=Q.useState(""),[V,ne]=Q.useState(null),[fe,ye]=Q.useState({}),[Ae,ge]=Q.useState({}),[le,de]=Q.useState([]),[ce,Ie]=Q.useState({}),he=Ne.useRef({}),[te,Z]=Q.useState(!1),J=Ne.useRef(!1),re=(c,k)=>{he.current[c]=k,Ie(q=>({...q,[c]:k}))},[ae,Ee]=Q.useState(null),[ie,Pe]=Q.useState(!1),[xe,je]=Q.useState({}),[ee,be]=Q.useState(null),[Be,Le]=Q.useState(0),me=Ne.useRef(null),pe=Ne.useRef(null),se=Ne.useRef(null),Me=Ne.useRef(0),De=Ne.useCallback(()=>{var c;if(se.current&&(clearInterval(se.current),se.current=null),me.current&&me.current.state==="recording"){me.current.stop();return}(c=pe.current)==null||c.getTracks().forEach(k=>k.stop()),pe.current=null,be(null)},[]);Q.useEffect(()=>(l&&(t!=null&&t.id)&&U(t.id,t.type),C(null),()=>{var c,k;se.current&&clearInterval(se.current),((c=me.current)==null?void 0:c.state)==="recording"&&me.current.stop(),(k=pe.current)==null||k.getTracks().forEach(q=>q.stop())}),[l,t==null?void 0:t.id]);const[u,p]=Q.useState("storefront"),F=In(h),M=((It=F.find(c=>c.id===u))==null?void 0:It.photos)||[];if(Q.useEffect(()=>{if(w===null||M.length===0)return;const c=k=>{k.key==="ArrowRight"?C(q=>q!==null?(q+1)%M.length:null):k.key==="ArrowLeft"?C(q=>q!==null?(q-1+M.length)%M.length:null):k.key==="Escape"&&C(null)};return window.addEventListener("keydown",c),()=>window.removeEventListener("keydown",c)},[w,M.length]),!l||!h)return null;const _=h.type==="supplier",ze=h.type==="drink_store",Y=h.type==="location",y=_?h:null,v=ze?h:null,x=Y?h:null,ve=Array.isArray(h.likes)?h.likes:[],jt=ve.some(c=>c.userId===s.id),Nt=h.attachedFiles||[],$t=h.videos||[],kt=oe(h),Ct=_?(y==null?void 0:y.catalogItems)||[]:[],Et=ze?(v==null?void 0:v.drinkItems)||[]:[],St=(c,k)=>{var W;const G=(((W=F.find(X=>X.id===k))==null?void 0:W.photos)||[]).findIndex(X=>X.url===Ve(c));G<0||(p(k),C(G))},Rt=async()=>{if(!h)return;const c=_?y==null?void 0:y.name:Y?x==null?void 0:x.name:v==null?void 0:v.storeName;if(window.confirm(`ยืนยันการลบรายการ "${c||"รายการนี้"}" หรือไม่?`))try{h.type==="supplier"?await A(h.id):h.type==="drink_store"?await D(h.id):h.type==="location"&&await S(h.id),d()}catch{alert("เกิดข้อผิดพลาดในการลบรายการ")}},Ys=async(c,k,q)=>{try{Pe(!0);const G=await kn(c,{recordId:h.id,recordType:h.type,recordTitle:_?y==null?void 0:y.name:Y?x==null?void 0:x.name:v==null?void 0:v.storeName});q?je(W=>({...W,[q]:{...W[q],voiceUrl:G}})):Ee(G)}catch(G){alert(G.message||"อัปโหลดไฟล์แนบไม่สำเร็จ")}finally{Pe(!1)}},Tt=async c=>{var k,q;if(ee===c){De();return}ee&&De();try{if(!((k=navigator.mediaDevices)!=null&&k.getUserMedia)||typeof MediaRecorder>"u"){alert("เบราว์เซอร์นี้ไม่รองรับการอัดเสียงสด กรุณาเปิดผ่าน HTTPS หรืออนุญาตไมโครโฟน");return}const G=await navigator.mediaDevices.getUserMedia({audio:!0});pe.current=G;const W=["audio/mp4","audio/webm;codecs=opus","audio/webm","audio/ogg"].find(z=>MediaRecorder.isTypeSupported(z)),X=new MediaRecorder(G,W?{mimeType:W}:void 0);me.current=X;const Se=[];X.ondataavailable=z=>{z.data.size>0&&Se.push(z.data)},X.onstop=()=>{var ns;se.current&&(clearInterval(se.current),se.current=null),G.getTracks().forEach(sn=>sn.stop()),pe.current=null,be(null);const z=((ns=X.mimeType)==null?void 0:ns.split(";")[0])||"audio/webm",Ue=new Blob(Se,{type:z});if(!Ue.size)return;const en=z.includes("mp4")?"m4a":z.includes("ogg")?"ogg":"webm",tn=new File([Ue],`เสียงคอมเมนต์-${Date.now()}.${en}`,{type:z});Ys(tn,"audio",c==="main"?void 0:c)},X.onerror=()=>{se.current&&clearInterval(se.current),G.getTracks().forEach(z=>z.stop()),be(null),alert("อัดเสียงไม่สำเร็จ กรุณาลองใหม่")},Me.current=Date.now(),Le(0),be(c),X.start(250),se.current=setInterval(()=>{Le(Math.round((Date.now()-Me.current)/1e3))},1e3)}catch{(q=pe.current)==null||q.getTracks().forEach(G=>G.stop()),be(null),alert("ไม่ได้รับสิทธิ์ใช้ไมโครโฟน กรุณากดอนุญาตไมโครโฟนเพื่ออัดเสียงสด")}},Zs=async c=>{if(c.preventDefault(),J.current||he.current.main||ie||ee)return;const k=T.trim();if(!(!k&&!le.length&&!ae)){J.current=!0,Z(!0);try{if(!await o(h.id,h.type,k,{media:le,voiceUrl:ae||void 0}))return;L(""),de([]),Ee(null)}finally{J.current=!1,Z(!1)}}},At=async(c,k,q)=>{var X;if(J.current||he.current[c]||ie||ee)return;const G=(fe[c]||"").trim(),W=xe[c];if(!(!G&&!((X=W==null?void 0:W.media)!=null&&X.length)&&!(W!=null&&W.voiceUrl))){J.current=!0,Z(!0);try{if(!await r(h.id,h.type,c,G,k,{media:W==null?void 0:W.media,voiceUrl:W==null?void 0:W.voiceUrl,replyToId:q}))return;ye(z=>({...z,[c]:""})),je(z=>({...z,[c]:{}})),ne(null)}finally{J.current=!1,Z(!1)}}},Xs=c=>{y&&i(y.id,c)},Oe=oe(h);return(Pt=Oe[0])!=null&&Pt.url||(_?y==null||y.voiceNoteUrl:v==null||v.voiceNoteUrl),e.jsxs("div",{className:"fixed inset-0 z-[90] bg-black/45 backdrop-blur-sm flex items-center justify-center p-2 sm:p-4 overflow-y-auto",children:[e.jsxs("div",{className:"bg-white border border-slate-200/90 w-full max-w-3xl rounded-2xl shadow-2xl overflow-hidden my-auto animate-in zoom-in-95 max-h-[94vh] flex flex-col text-slate-900",children:[e.jsxs("div",{className:"p-3.5 sm:p-4 border-b border-slate-100 space-y-2.5 bg-white sticky top-0 z-10",children:[e.jsxs("div",{className:"flex items-start justify-between gap-2.5",children:[e.jsxs("div",{className:"flex items-start gap-2.5 min-w-0 flex-1",children:[e.jsx("span",{className:`p-2 rounded-xl shrink-0 mt-0.5 ${_?"bg-emerald-50 text-emerald-700":Y?"bg-sky-50 text-sky-700":"bg-amber-50 text-amber-700"}`,children:_?e.jsx(on,{className:"w-4 h-4 sm:w-5 sm:h-5 text-emerald-600"}):Y?e.jsx("i",{"aria-hidden":"true",className:"fa-solid fa-map-location-dot text-base text-sky-600"}):e.jsx(rs,{className:"w-4 h-4 sm:w-5 sm:h-5 text-amber-600"})}),e.jsxs("div",{className:"min-w-0 flex-1",children:[e.jsx("h2",{className:"font-extrabold text-slate-900 text-sm sm:text-base leading-snug break-words",children:_?y==null?void 0:y.name:Y?x==null?void 0:x.name:v==null?void 0:v.storeName}),e.jsx("p",{className:"text-xs text-slate-400 truncate mt-0.5",children:_?(y==null?void 0:y.chineseName)||(y==null?void 0:y.marketOrCity):Y?(x==null?void 0:x.zoneOrFloor)||(x==null?void 0:x.foreignName):(v==null?void 0:v.chineseName)||(v==null?void 0:v.storeCategory)||(v==null?void 0:v.brandConcept)})]})]}),e.jsx("button",{type:"button",onClick:d,className:"w-7 h-7 sm:w-8 sm:h-8 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-600 transition-all active:scale-95 flex items-center justify-center shrink-0",title:"ปิดหน้าต่าง",children:e.jsx(Ge,{className:"w-4 h-4"})})]}),e.jsxs("div",{className:"flex items-center gap-1.5 overflow-x-auto no-scrollbar pt-2 border-t border-slate-100 select-none",children:[O&&e.jsxs("button",{type:"button",onClick:()=>N(h),className:"h-7 sm:h-8 px-2.5 rounded-xl bg-amber-50 hover:bg-amber-100 text-amber-800 border border-amber-200/90 text-xs font-bold active:scale-95 transition-all inline-flex items-center gap-1 whitespace-nowrap shrink-0",title:"แก้ไขข้อมูลรายการนี้ (Admin / Editor)",children:[e.jsx(as,{className:"w-3 h-3 text-amber-600 shrink-0"}),e.jsx("span",{children:"แก้ไข"})]}),P&&e.jsxs("button",{type:"button",onClick:Rt,className:"h-7 sm:h-8 px-2.5 rounded-xl bg-rose-50 hover:bg-rose-100 text-rose-700 border border-rose-200 text-xs font-bold active:scale-95 transition-all inline-flex items-center gap-1 whitespace-nowrap shrink-0",title:"ลบรายการ",children:[e.jsx(is,{className:"w-3 h-3 text-rose-600 shrink-0"}),e.jsx("span",{children:"ลบรายการ"})]}),e.jsxs("button",{type:"button",onClick:()=>g(h.id,h.type),className:`h-7 sm:h-8 px-2.5 rounded-xl border transition-all active:scale-95 inline-flex items-center gap-1 text-xs font-bold whitespace-nowrap shrink-0 ${jt?"bg-blue-50 text-blue-700 border-blue-200":"bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100"}`,title:`ถูกใจ (${ve.length})`,children:[e.jsx(ln,{className:`w-3 h-3 shrink-0 ${jt?"fill-blue-600 text-blue-600":""}`}),e.jsxs("span",{children:["ถูกใจ",ve.length>0?` (${ve.length})`:""]})]}),e.jsxs("button",{type:"button",onClick:()=>a(h),className:"h-7 sm:h-8 px-2.5 rounded-xl bg-[#06C755] hover:bg-[#05b34c] text-white text-xs font-bold transition-all active:scale-95 inline-flex items-center gap-1 whitespace-nowrap shrink-0 shadow-2xs",title:"แชร์ลิงก์เข้า LINE",children:[e.jsx(dn,{className:"w-3 h-3 shrink-0"}),e.jsx("span",{children:"แชร์ LINE"})]}),e.jsxs("button",{type:"button",onClick:()=>qs(h,n,"pdf",b),className:"h-7 sm:h-8 px-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold transition-all active:scale-95 inline-flex items-center gap-1 whitespace-nowrap shrink-0",title:"ดาวน์โหลดรายงานเป็นไฟล์ PDF",children:[e.jsx(An,{className:"w-3 h-3 text-emerald-400 shrink-0"}),e.jsx("span",{children:"ดาวน์โหลด PDF"})]}),e.jsxs("button",{type:"button",onClick:()=>qs(h,n,"print",b),className:"h-7 sm:h-8 px-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold transition-all border border-slate-200/80 active:scale-95 inline-flex items-center gap-1 whitespace-nowrap shrink-0",title:"พิมพ์รายงานฉบับจัดหน้าสวยงาม (Print)",children:[e.jsx(Tn,{className:"w-3 h-3 text-slate-600 shrink-0"}),e.jsx("span",{children:"พิมพ์"})]})]})]}),e.jsxs("div",{className:"p-4 sm:p-6 space-y-4 overflow-y-auto flex-1",children:[e.jsxs("div",{className:"flex flex-wrap items-center justify-between gap-2 p-3 bg-slate-50 rounded-xl border border-slate-100 text-xs",children:[e.jsxs("div",{className:"flex items-center gap-2.5",children:[e.jsx(Qe,{src:h.creator.avatar,alt:h.creator.alias,className:"w-8 h-8 rounded-full object-cover ring-2 ring-emerald-500/20 shadow-xs"}),e.jsxs("div",{children:[e.jsx("div",{className:"text-slate-800 font-bold flex items-center gap-1.5",children:e.jsxs("span",{children:["ผู้ลงพื้นที่สำรวจ: ",h.creator.alias,h.creator.name&&h.creator.name!==h.creator.alias?` (${h.creator.name})`:""]})}),e.jsxs("div",{className:"text-[11px] text-slate-400 font-mono",children:["บันทึกเมื่อ: ",new Date(h.creator.timestamp).toLocaleString("th-TH")]})]})]}),e.jsxs("div",{className:"flex items-center gap-2 flex-wrap",children:[e.jsx(cn,{viewedBy:h.viewedBy,size:"md"}),_&&y&&e.jsxs("div",{className:"flex items-center gap-1.5",children:[e.jsx("span",{className:"text-[11px] text-slate-500",children:"สถานะ:"}),e.jsxs("select",{value:y.status,onChange:c=>Xs(c.target.value),className:"bg-white border border-slate-200 text-slate-800 text-xs font-bold rounded-lg px-2.5 py-1 focus:outline-none focus:border-emerald-500",children:[e.jsx("option",{value:"scouted",children:"1. สำรวจแล้ว"}),e.jsx("option",{value:"reviewing",children:"2. เทียบสเปก"}),e.jsx("option",{value:"rfq_sent",children:"3. ส่ง RFQ"}),e.jsx("option",{value:"shortlisted",children:"4. ตัวเต็ง (Shortlist)"}),e.jsx("option",{value:"ordered",children:"5. สั่งซื้อแล้ว (Ordered)"})]})]})]})]}),Oe.length>0&&e.jsxs("div",{className:"p-3 bg-emerald-50/70 border border-emerald-200/80 rounded-xl space-y-2",children:[e.jsxs("div",{className:"text-xs font-bold text-emerald-950 flex items-center justify-between",children:[e.jsxs("span",{className:"flex items-center gap-1.5",children:[e.jsx(Re,{className:"w-3.5 h-3.5 text-emerald-600"}),e.jsxs("span",{children:["วอยซ์เสียงบันทึกหน้างานจริง (",Oe.length," คลิป)"]})]}),e.jsx("span",{className:"text-[10px] font-mono text-emerald-700",children:"แตะ ▶ เพื่อฟังเสียงบันทึก"})]}),e.jsx("div",{className:"grid grid-cols-1 sm:grid-cols-2 gap-2",children:Oe.map((c,k)=>e.jsxs("div",{className:"p-2.5 bg-white border border-emerald-200 rounded-xl flex flex-col justify-between gap-1.5 shadow-2xs",children:[e.jsxs("div",{className:"flex items-center justify-between gap-2 min-w-0",children:[e.jsxs("div",{className:"text-xs font-bold text-slate-900 truncate flex items-center gap-1.5",children:[e.jsx(Re,{className:"w-3.5 h-3.5 text-emerald-600 shrink-0"}),e.jsx("span",{className:"truncate",children:c.label||`คลิปเสียง #${k+1}`})]}),e.jsx("span",{className:"text-[10px] text-emerald-700 font-mono shrink-0",children:c.durationSec?`${c.durationSec} วินาที`:"เสียงบันทึก"})]}),c.url&&e.jsx("audio",{controls:!0,preload:"metadata",playsInline:!0,src:c.url,className:"h-8 w-full rounded-lg"})]},c.id||k))})]}),e.jsxs("div",{className:"p-3 bg-slate-50 rounded-xl border border-slate-100 space-y-2 text-xs",children:[e.jsxs("div",{className:"flex flex-wrap items-center gap-1.5",children:[_&&y?e.jsxs(e.Fragment,{children:[e.jsxs("span",{className:"px-2.5 py-1 rounded-lg bg-emerald-600 text-white text-[11px] font-bold inline-flex items-center gap-1",children:[e.jsx("i",{className:"fa-solid fa-industry text-[10px]"}),e.jsx("span",{children:y.category})]}),e.jsx("span",{className:"px-2 py-1 rounded-lg bg-white border border-slate-200 text-slate-700 text-[11px] font-bold",children:y.isFactory?"โรงงานผลิต":"หน้าร้าน / โชว์รูม"}),e.jsxs("span",{className:"px-2 py-1 rounded-lg bg-amber-50 border border-amber-200 text-amber-700 text-[11px] font-mono font-bold inline-flex items-center gap-1",children:[e.jsx("i",{className:"fa-solid fa-star text-[10px] text-amber-500"}),e.jsxs("span",{children:[y.rating||5,"/5"]})]}),(y.quickTags||[]).map((c,k)=>e.jsxs("span",{className:"px-2 py-1 rounded-lg bg-white border border-slate-200 text-slate-700 text-[11px] font-semibold",children:["#",c]},k))]}):v?e.jsxs(e.Fragment,{children:[e.jsxs("span",{className:"px-2.5 py-1 rounded-lg bg-amber-600 text-white text-[11px] font-bold inline-flex items-center gap-1",children:[e.jsx("i",{className:"fa-solid fa-mug-hot text-[10px]"}),e.jsx("span",{children:v.storeCategory||"เรฟร้านน้ำ"})]}),v.ratings&&e.jsxs("span",{className:"px-2 py-1 rounded-lg bg-amber-50 border border-amber-200 text-amber-800 text-[11px] font-mono font-bold inline-flex items-center gap-1",children:[e.jsx("i",{className:"fa-solid fa-star text-[10px] text-amber-500"}),e.jsx("span",{children:((v.ratings.taste+v.ratings.aesthetics+v.ratings.value+v.ratings.speed)/4).toFixed(1)})]})]}):Y&&x?e.jsxs(e.Fragment,{children:[e.jsxs("span",{className:"px-2.5 py-1 rounded-lg bg-sky-600 text-white text-[11px] font-bold inline-flex items-center gap-1",children:[e.jsx("i",{className:"fa-solid fa-map-location-dot text-[10px]"}),e.jsx("span",{children:x.locationType==="mall"?"ห้างสรรพสินค้า":x.locationType})]}),e.jsxs("span",{className:"px-2 py-1 rounded-lg bg-white border border-slate-200 text-slate-700 text-[11px] font-bold",children:["ผัง ",((Bt=x.spaceSpecs)==null?void 0:Bt.layoutFormat)||"Inline"]}),x.ratings&&e.jsxs("span",{className:"px-2 py-1 rounded-lg bg-amber-50 border border-amber-200 text-amber-800 text-[11px] font-mono font-bold inline-flex items-center gap-1",children:[e.jsx("i",{className:"fa-solid fa-star text-[10px] text-amber-500"}),e.jsx("span",{children:((x.ratings.footTraffic+x.ratings.visibility+x.ratings.accessibility+x.ratings.valueRoi)/4).toFixed(1)})]}),(x.quickTags||[]).map((c,k)=>e.jsxs("span",{className:"px-2 py-1 rounded-lg bg-white border border-slate-200 text-slate-700 text-[11px] font-semibold",children:["#",c]},k))]}):null,Ct.length>0&&e.jsxs("span",{className:"px-2.5 py-1 rounded-lg bg-amber-50 border border-amber-200 text-amber-800 text-[11px] font-bold inline-flex items-center gap-1 shadow-2xs",children:[e.jsx(un,{className:"w-3 h-3 text-amber-600"}),e.jsxs("span",{children:[Ct.length," สินค้า"]})]}),Et.length>0&&e.jsxs("span",{className:"px-2.5 py-1 rounded-lg bg-amber-50 border border-amber-200 text-amber-800 text-[11px] font-bold inline-flex items-center gap-1 shadow-2xs",children:[e.jsx(rs,{className:"w-3 h-3 text-amber-600"}),e.jsxs("span",{children:[Et.length," เมนู"]})]}),$t.length>0&&e.jsxs("span",{className:"px-2.5 py-1 rounded-lg bg-purple-50 border border-purple-200 text-purple-700 text-[11px] font-bold inline-flex items-center gap-1 shadow-2xs",children:[e.jsx("i",{className:"fa-solid fa-video text-[9px] text-purple-600"}),e.jsxs("span",{children:[$t.length," คลิป"]})]}),kt.length>0&&e.jsxs("span",{className:"px-2.5 py-1 rounded-lg bg-rose-50 border border-rose-200 text-rose-700 text-[11px] font-bold inline-flex items-center gap-1 shadow-2xs",children:[e.jsx(Fe,{className:"w-3 h-3 text-rose-600"}),e.jsxs("span",{children:[kt.length," คลิปเสียง"]})]}),Nt.length>0&&e.jsxs("a",{href:"#detail-attached-files-section",onClick:c=>{var k;c.preventDefault(),(k=document.getElementById("detail-attached-files-section"))==null||k.scrollIntoView({behavior:"smooth"})},className:"px-2.5 py-1 rounded-lg bg-sky-50 border border-sky-200 text-sky-700 text-[11px] font-bold inline-flex items-center gap-1 hover:bg-sky-100 transition-colors cursor-pointer shadow-2xs",title:"คลิกเพื่อเลื่อนดูไฟล์แนบ",children:[e.jsx(os,{className:"w-3 h-3 text-sky-600"}),e.jsxs("span",{children:[Nt.length," ไฟล์แนบ"]})]})]}),e.jsxs("div",{className:"flex flex-wrap items-center justify-between gap-2 pt-1.5 border-t border-slate-200/60 text-[11px] text-slate-600",children:[e.jsxs("div",{className:"flex flex-wrap items-center gap-2",children:[e.jsxs("span",{className:"inline-flex items-center gap-1 font-semibold text-slate-800",children:[e.jsx(hn,{className:"w-3.5 h-3.5 text-sky-600 shrink-0"}),e.jsx("span",{children:_?(y==null?void 0:y.marketOrCity)||(y==null?void 0:y.address)||((Lt=y==null?void 0:y.location)==null?void 0:Lt.addressText):Y?((Mt=x==null?void 0:x.location)==null?void 0:Mt.addressText)||(x==null?void 0:x.zoneOrFloor):((Dt=v==null?void 0:v.location)==null?void 0:Dt.addressText)||(v==null?void 0:v.city)})]}),(_?y==null?void 0:y.wechatId:Y?(zt=x==null?void 0:x.leaseTerms)==null?void 0:zt.contactLineWechat:v==null?void 0:v.wechatId)&&e.jsxs("span",{className:"px-2 py-0.5 rounded bg-white border border-slate-200 font-mono",children:["LINE/WeChat: ",_?y==null?void 0:y.wechatId:Y?(Ut=x==null?void 0:x.leaseTerms)==null?void 0:Ut.contactLineWechat:v==null?void 0:v.wechatId]}),(_?y==null?void 0:y.phone:Y?(Ft=x==null?void 0:x.leaseTerms)==null?void 0:Ft.contactPhone:v==null?void 0:v.phone)&&e.jsxs("span",{className:"px-2 py-0.5 rounded bg-white border border-slate-200 font-mono",children:["โทร: ",_?y==null?void 0:y.phone:Y?(qt=x==null?void 0:x.leaseTerms)==null?void 0:qt.contactPhone:v==null?void 0:v.phone]}),Y&&((_t=x==null?void 0:x.leaseTerms)==null?void 0:_t.contactPerson)&&e.jsxs("span",{className:"px-2 py-0.5 rounded bg-white border border-slate-200",children:["ผู้ติดต่อ: ",x.leaseTerms.contactPerson]})]}),(Ht=h.location)!=null&&Ht.lat&&((Vt=h.location)!=null&&Vt.lng)&&(h.location.lat!==0||h.location.lng!==0)?e.jsx("a",{href:`https://www.google.com/maps?q=${h.location.lat},${h.location.lng}`,target:"_blank",rel:"noreferrer",className:"text-[11px] font-bold text-sky-700 hover:underline shrink-0",children:"เปิด Google Maps ↗"}):e.jsx("span",{className:"text-[10px] text-slate-400 font-medium shrink-0",children:"📍 ยังไม่ได้ระบุพิกัด GPS"})]})]}),Y&&x&&e.jsxs("div",{className:"p-3.5 rounded-xl border border-sky-200 bg-sky-50/50 space-y-3",children:[e.jsxs("div",{className:"text-[11px] font-bold text-sky-900 flex items-center justify-between",children:[e.jsxs("span",{className:"flex items-center gap-1.5",children:[e.jsx(mn,{className:"w-3.5 h-3.5 text-sky-600"}),e.jsx("span",{children:"สเปกพื้นที่ & เงื่อนไขสัญญาเช่า (Location Scouting Specs)"})]}),e.jsxs("span",{className:"text-[10px] px-2 py-0.5 rounded-full bg-white text-sky-800 font-mono font-bold border border-sky-200",children:[x.zoneOrFloor," ",x.unitNumber?`(${x.unitNumber})`:""]})]}),e.jsxs("div",{className:"grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs",children:[e.jsxs("div",{className:"bg-white p-2 rounded-lg border border-slate-200 text-center",children:[e.jsx("div",{className:"text-[10px] text-slate-500 font-bold",children:"ขนาดพื้นที่"}),e.jsxs("div",{className:"font-extrabold text-sm text-slate-900 font-mono mt-0.5",children:[((Ot=x.spaceSpecs)==null?void 0:Ot.usableAreaSqm)||"-"," ",e.jsx("span",{className:"text-[10px] font-normal text-slate-500",children:"ตร.ม."})]})]}),e.jsxs("div",{className:"bg-white p-2 rounded-lg border border-slate-200 text-center",children:[e.jsx("div",{className:"text-[10px] text-slate-500 font-bold",children:"หน้ากว้าง / เพดาน"}),e.jsxs("div",{className:"font-extrabold text-sm text-slate-900 font-mono mt-0.5",children:[((Gt=x.spaceSpecs)==null?void 0:Gt.frontageWidthM)||"-","ม. / ",((Kt=x.spaceSpecs)==null?void 0:Kt.ceilingHeightM)||"-","ม."]})]}),e.jsxs("div",{className:"bg-white p-2 rounded-lg border border-slate-200 text-center",children:[e.jsx("div",{className:"text-[10px] text-slate-500 font-bold",children:"ค่าเช่ารายเดือน"}),e.jsx("div",{className:"font-extrabold text-sm text-amber-950 font-mono mt-0.5 truncate",children:(Wt=x.leaseTerms)!=null&&Wt.monthlyRentThb?e.jsxs(e.Fragment,{children:["฿",x.leaseTerms.monthlyRentThb.toLocaleString()]}):(Qt=x.leaseTerms)!=null&&Qt.monthlyRentRmb?e.jsxs(e.Fragment,{children:["¥",x.leaseTerms.monthlyRentRmb.toLocaleString()]}):e.jsx("span",{className:"text-slate-400",children:"สอบถาม"})})]}),e.jsxs("div",{className:"bg-white p-2 rounded-lg border border-slate-200 text-center",children:[e.jsx("div",{className:"text-[10px] text-slate-500 font-bold",children:"เงื่อนไขสัญญา"}),e.jsxs("div",{className:"font-extrabold text-xs text-slate-900 font-mono mt-0.5 truncate",children:["สัญญา ",((Jt=x.leaseTerms)==null?void 0:Jt.leasePeriodYears)||3," ปี · ประกัน ",((Yt=x.leaseTerms)==null?void 0:Yt.depositMonths)||3," ด."]})]})]}),e.jsxs("div",{className:"flex flex-wrap items-center gap-1.5 pt-1 text-xs",children:[e.jsxs("span",{className:"px-2 py-0.5 rounded-md bg-white border border-slate-200 text-slate-700 font-semibold flex items-center gap-1",children:[e.jsx(ls,{className:"w-3 h-3 text-amber-500"}),e.jsxs("span",{children:["สเปกไฟ: ",((Zt=x.spaceSpecs)==null?void 0:Zt.electricalPower)||"3 เฟส 45 kVA"]})]}),e.jsxs("span",{className:"px-2 py-0.5 rounded-md bg-white border border-slate-200 text-slate-700 font-semibold flex items-center gap-1",children:[e.jsx(pn,{className:"w-3 h-3 text-blue-500"}),e.jsxs("span",{children:["ท่อน้ำดี: ",(Xt=x.spaceSpecs)!=null&&Xt.hasWaterInflow?"✓ มีในห้อง":"✗ ไม่มี"]})]}),e.jsxs("span",{className:"px-2 py-0.5 rounded-md bg-white border border-slate-200 text-slate-700 font-semibold flex items-center gap-1",children:[e.jsx(fn,{className:"w-3 h-3 text-teal-500"}),e.jsxs("span",{children:["ท่อน้ำทิ้ง: ",(es=x.spaceSpecs)!=null&&es.hasDrainage?"✓ มีในห้อง":"✗ ไม่มี"]})]}),e.jsxs("span",{className:"px-2 py-0.5 rounded-md bg-white border border-slate-200 text-slate-700 font-semibold flex items-center gap-1",children:[e.jsx(gn,{className:"w-3 h-3 text-purple-500"}),e.jsxs("span",{children:["ดักไขมัน: ",(ts=x.spaceSpecs)!=null&&ts.hasGreaseTrap?"✓ มีรองรับ":"✗ ต้องติดตั้งเอง"]})]}),((ss=x.spaceSpecs)==null?void 0:ss.riderAccessNotes)&&e.jsxs("span",{className:"px-2 py-0.5 rounded-md bg-white border border-slate-200 text-slate-700 font-semibold flex items-center gap-1",children:[e.jsx(xn,{className:"w-3 h-3 text-emerald-600"}),e.jsxs("span",{children:["ไรเดอร์: ",x.spaceSpecs.riderAccessNotes]})]})]}),x.handoffNotes&&e.jsxs("div",{className:"pt-2 border-t border-sky-200/80 text-xs",children:[e.jsx("span",{className:"font-bold text-sky-900 block mb-0.5",children:"ประเด็นเจรจา / ส่งมอบงาน:"}),e.jsx("p",{className:"text-slate-800 whitespace-pre-wrap",children:x.handoffNotes})]})]}),(_&&(y==null?void 0:y.memo)||!_&&(v==null?void 0:v.tastingNotes))&&e.jsxs("div",{className:`p-3.5 rounded-xl border space-y-1 ${_?"bg-emerald-50/50 border-emerald-200/80":"bg-amber-50/50 border-amber-200/80"}`,children:[e.jsxs("div",{className:"text-[11px] font-bold text-slate-600 flex items-center gap-1.5",children:[e.jsx("i",{className:`fa-solid ${_?"fa-clipboard-check text-emerald-600":"fa-quote-left text-amber-600"} text-[10px]`}),e.jsx("span",{children:_?"บันทึกหน้างาน / รายละเอียดหลัก:":"บันทึกรีวิวรสชาติ & ไอเดียเรฟ:"})]}),e.jsx("p",{className:"text-xs sm:text-[13px] text-slate-900 leading-relaxed whitespace-pre-wrap font-medium",children:_?y==null?void 0:y.memo:v==null?void 0:v.tastingNotes})]}),_&&y&&(y.catalogItems||[]).length>0&&e.jsxs("div",{className:"space-y-2",children:[e.jsx("div",{className:"flex items-center justify-between",children:e.jsxs("span",{className:"text-xs font-bold text-slate-800",children:["รายการอุปกรณ์ & สินค้า (",(y.catalogItems||[]).length," รายการ):"]})}),e.jsx("div",{className:"grid grid-cols-1 sm:grid-cols-2 gap-3",children:(y.catalogItems||[]).map((c,k)=>e.jsxs("div",{className:"p-3 rounded-xl border border-slate-200 bg-white flex gap-3 shadow-xs",children:[c.photo?e.jsx(qe,{src:c.photo,alt:"",onClick:()=>St(c.photo,"catalog"),className:"w-16 h-16 rounded-lg object-cover cursor-pointer border border-slate-100 hover:opacity-90"}):e.jsx("div",{className:"w-16 h-16 rounded-lg bg-slate-100 border border-slate-200 flex items-center justify-center text-slate-400 text-xs",children:"ไม่มีรูป"}),e.jsxs("div",{className:"min-w-0 flex-1 space-y-1",children:[e.jsx("div",{className:"font-bold text-xs text-slate-900 truncate",children:c.name||`รายการที่ ${k+1}`}),c.priceRmb&&e.jsxs("div",{className:"text-xs font-mono font-bold text-emerald-700",children:["¥",c.priceRmb," ",e.jsxs("span",{className:"text-[11px] font-normal text-slate-500",children:["(≈",n(c.priceRmb).toLocaleString(),"฿)"]})]}),c.priceThb&&!c.priceRmb&&e.jsxs("div",{className:"text-xs font-mono font-bold text-emerald-700",children:["฿",c.priceThb.toLocaleString()]}),c.weightKg&&e.jsxs("div",{className:"text-[11px] text-slate-500",children:["น้ำหนัก: ",e.jsx("span",{className:"font-mono",children:c.weightKg})]}),c.memo&&e.jsx("p",{className:"text-[11px] text-slate-600 whitespace-pre-wrap leading-relaxed",children:c.memo}),oe(c).length>0&&e.jsx("div",{className:"space-y-1 pt-1",children:oe(c).map((q,G)=>e.jsxs("div",{className:"flex flex-col sm:flex-row sm:items-center gap-1 bg-emerald-50/90 p-1.5 rounded-lg border border-emerald-200/80",children:[e.jsxs("span",{className:"text-[10px] font-bold text-emerald-900 truncate min-w-0 flex items-center gap-1",children:[e.jsx(Re,{className:"w-3 h-3 text-emerald-600 shrink-0"}),e.jsx("span",{className:"truncate",children:q.label||`เสียง #${G+1}`}),q.durationSec?`(${q.durationSec}s)`:""]}),q.url&&e.jsx("audio",{controls:!0,preload:"metadata",playsInline:!0,src:q.url,className:"h-6 w-full sm:w-44 shrink-0"})]},G))})]})]},c.id||k))})]}),!_&&v&&(v.drinkItems||[]).length>0&&e.jsxs("div",{className:"space-y-2",children:[e.jsx("div",{className:"flex items-center justify-between",children:e.jsxs("span",{className:"text-xs font-bold text-slate-800",children:["เมนูที่ชิม & ถอดรหัสสูตร (",(v.drinkItems||[]).length," เมนู):"]})}),e.jsx("div",{className:"grid grid-cols-1 sm:grid-cols-2 gap-3",children:(v.drinkItems||[]).map((c,k)=>e.jsxs("div",{className:"p-3 rounded-xl border border-amber-200/80 bg-amber-50/20 flex gap-3 shadow-xs",children:[c.photo&&e.jsx(qe,{src:c.photo,alt:"",onClick:()=>St(c.photo,"drinks"),className:"w-16 h-16 rounded-lg object-cover cursor-pointer border border-amber-200"}),e.jsxs("div",{className:"min-w-0 flex-1 space-y-1",children:[e.jsx("div",{className:"font-bold text-xs text-slate-900 truncate",children:c.name||`แก้วที่ #${k+1}`}),c.priceRmb&&e.jsxs("div",{className:"text-xs font-mono font-bold text-amber-700",children:["¥",c.priceRmb," ",e.jsxs("span",{className:"text-[11px] font-normal text-slate-500",children:["(≈",n(c.priceRmb),"฿)"]})]}),c.fitMenuTarget&&e.jsxs("div",{className:"text-[11px] font-semibold text-emerald-700",children:["ต่อยอด: ",c.fitMenuTarget]}),c.gimmickNotes&&e.jsx("p",{className:"text-[11px] text-slate-600",children:c.gimmickNotes}),oe(c).length>0&&e.jsx("div",{className:"space-y-1 pt-1",children:oe(c).map((q,G)=>e.jsxs("div",{className:"flex flex-col sm:flex-row sm:items-center gap-1 bg-amber-50/90 p-1.5 rounded-lg border border-amber-200/80",children:[e.jsxs("span",{className:"text-[10px] font-bold text-amber-900 truncate min-w-0 flex items-center gap-1",children:[e.jsx(Re,{className:"w-3 h-3 text-amber-600 shrink-0"}),e.jsx("span",{className:"truncate",children:q.label||`เสียง #${G+1}`}),q.durationSec?`(${q.durationSec}s)`:""]}),q.url&&e.jsx("audio",{controls:!0,preload:"metadata",playsInline:!0,src:q.url,className:"h-6 w-full sm:w-44 shrink-0"})]},G))})]})]},c.id||k))})]}),F.filter(c=>!["catalog","drinks"].includes(c.id)).map(c=>e.jsxs("section",{"aria-label":c.label,className:"space-y-2",children:[e.jsxs("h3",{className:"text-xs font-bold text-slate-800",children:[c.label," (",c.photos.length," รูป)"]}),e.jsx("div",{className:"grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2",children:c.photos.map((k,q)=>e.jsxs("button",{type:"button",onClick:()=>{p(c.id),C(q)},className:"relative h-44 rounded-xl overflow-hidden border border-slate-200 bg-slate-50 p-1",children:[e.jsx(qe,{src:k.url,alt:k.label,className:"w-full h-full object-contain"}),e.jsxs("span",{className:"absolute bottom-1 right-1 bg-black/60 text-white text-[10px] px-2 rounded",children:[q+1,"/",c.photos.length]})]},`${k.url}-${q}`))}),!c.photos.length&&e.jsx("p",{className:"text-xs text-slate-400",children:"ยังไม่มีรูปในหมวดนี้"})]},c.id)),h.videos&&h.videos.length>0&&e.jsxs("div",{className:"space-y-2 pt-1",children:[e.jsxs("span",{className:"text-xs font-bold text-slate-800 flex items-center gap-1.5",children:[e.jsx("i",{className:"fa-solid fa-video text-purple-600"}),e.jsxs("span",{children:["คลิปวิดีโอของรายการนี้ (",h.videos.length," คลิป):"]})]}),e.jsx("div",{className:"grid grid-cols-1 sm:grid-cols-2 gap-3",children:h.videos.map((c,k)=>e.jsx(Rn,{src:c,className:"rounded-2xl border border-slate-200 shadow-sm h-48 sm:h-56",videoClassName:"object-contain",badgeLabel:`คลิปที่ ${k+1}`},k))})]}),h.attachedFiles&&h.attachedFiles.length>0&&e.jsxs("div",{id:"detail-attached-files-section",className:"space-y-2 pt-1 scroll-mt-6",children:[e.jsxs("div",{className:"flex items-center justify-between",children:[e.jsxs("span",{className:"text-xs font-bold text-slate-800 flex items-center gap-1.5",children:[e.jsx(os,{className:"w-3.5 h-3.5 text-sky-600"}),e.jsxs("span",{children:["เอกสารและไฟล์แนบ (",h.attachedFiles.length," รายการ):"]})]}),e.jsx("span",{className:"text-[10px] text-slate-400",children:"เปิด PDF ในแอป หรือดาวน์โหลดไฟล์ต้นฉบับ"})]}),e.jsx("div",{className:"grid grid-cols-1 sm:grid-cols-2 gap-2",children:h.attachedFiles.map(c=>{const k=Cn(c.name,c.mimeType),q=k.icon;return e.jsxs("div",{className:"bg-white rounded-xl border border-slate-200/90 hover:border-sky-300 hover:shadow-xs p-3 flex flex-col items-stretch sm:flex-row sm:items-center justify-between gap-3 transition-all group",children:[e.jsxs("div",{className:"flex items-center gap-2.5 min-w-0 flex-1",children:[e.jsxs("div",{className:`w-9 h-9 rounded-xl border flex flex-col items-center justify-center shrink-0 shadow-2xs ${k.colorClasses}`,children:[e.jsx(q,{className:"w-4 h-4"}),e.jsx("span",{className:"text-[8px] font-extrabold uppercase leading-none mt-0.5",children:k.label})]}),e.jsxs("div",{className:"min-w-0 flex-1",children:[e.jsx("p",{className:"font-bold text-xs text-slate-800 truncate group-hover:text-sky-700 transition-colors",children:c.name}),e.jsxs("div",{className:"flex items-center gap-1.5 text-[10px] text-slate-500 mt-0.5",children:[e.jsx("span",{className:"font-medium",children:En(c.size)}),c.uploadedAt&&e.jsxs(e.Fragment,{children:[e.jsx("span",{children:"•"}),e.jsx("span",{children:new Date(c.uploadedAt).toLocaleDateString("th-TH")})]})]})]})]}),e.jsx(Sn,{file:c})]},c.id)})})]}),e.jsxs("div",{id:"detail-comments-section",className:"p-4 bg-slate-50 rounded-xl border border-slate-200/80 space-y-3",children:[e.jsxs("div",{className:"flex items-center justify-between",children:[e.jsxs("span",{className:"text-xs font-bold text-slate-800 flex items-center gap-1.5",children:[e.jsx(bn,{className:"w-3.5 h-3.5 text-blue-600"}),e.jsx("span",{children:"ช่องความเห็นทีมงาน & ตอบกลับต่อเนื่อง (Threaded Comments)"})]}),e.jsxs("span",{className:"text-[11px] text-slate-400 font-mono",children:[h.reviewerNotes.length," หัวข้อสนทนา"]})]}),e.jsx("div",{className:"space-y-2.5",children:h.reviewerNotes.length===0?e.jsx("p",{className:"text-xs text-slate-400 py-3 text-center",children:"ยังไม่มีความเห็น สามารถพิมพ์บันทึกหรือตรวจสอบสเปกได้ด้านล่าง"}):h.reviewerNotes.map(c=>{var G,W,X,Se;const k=c.replies||[],q=Ae[c.id];return e.jsxs("div",{className:"p-3 bg-white rounded-xl border border-slate-200/70 shadow-xs space-y-2",children:[e.jsxs("div",{className:"flex items-start gap-2.5",children:[e.jsx(Qe,{src:c.authorAvatar,className:"w-7 h-7 rounded-full object-cover shrink-0 mt-0.5 ring-1 ring-slate-200"}),e.jsxs("div",{className:"min-w-0 flex-1",children:[e.jsxs("div",{className:"flex items-center justify-between text-[11px] mb-0.5",children:[e.jsx("span",{className:"font-bold text-slate-900",children:c.author}),e.jsx("span",{className:"text-slate-400 font-mono text-[10px]",children:new Date(c.timestamp).toLocaleTimeString("th-TH",{hour:"2-digit",minute:"2-digit"})})]}),e.jsx("p",{className:"text-xs text-slate-700 leading-relaxed",children:c.text}),e.jsx(ds,{media:wt(c)}),(c.voiceUrl||c.audioUrl)&&e.jsxs("div",{className:"mt-1.5 flex items-center gap-2 bg-slate-50 p-2 rounded-xl border border-slate-200/80 max-w-sm",children:[e.jsx(Re,{className:"w-4 h-4 text-emerald-600 shrink-0"}),e.jsx("audio",{controls:!0,src:c.voiceUrl||c.audioUrl,className:"h-7 w-full"})]}),e.jsxs("div",{className:"flex items-center gap-3 mt-1.5 text-[11px] font-bold",children:[H&&e.jsxs("button",{type:"button",onClick:()=>ne((V==null?void 0:V.noteId)===c.id&&V.author===c.author?null:{noteId:c.id,author:c.author}),className:"text-blue-600 hover:text-blue-800 flex items-center gap-1",children:[e.jsx(cs,{className:"w-3 h-3"}),e.jsx("span",{children:"ตอบกลับ"})]}),k.length>0&&e.jsx("button",{type:"button",onClick:()=>ge(z=>({...z,[c.id]:!z[c.id]})),className:"text-slate-500 hover:text-slate-800 flex items-center gap-1",children:q?e.jsxs(e.Fragment,{children:[e.jsx(vn,{className:"w-3 h-3"}),e.jsxs("span",{children:["ดูการตอบกลับ (",k.length,")"]})]}):e.jsxs(e.Fragment,{children:[e.jsx(wn,{className:"w-3 h-3"}),e.jsxs("span",{children:["ย่อการตอบกลับ (",k.length,")"]})]})})]})]})]}),k.length>0&&!q&&e.jsx("div",{className:"ml-6 pl-3 border-l-2 border-blue-200 space-y-2 pt-1",children:k.map(z=>e.jsxs("div",{className:"p-2.5 bg-slate-50 rounded-xl border border-slate-200/60 text-xs space-y-1",children:[e.jsxs("div",{className:"flex items-center justify-between text-[10px]",children:[e.jsxs("div",{className:"flex items-center gap-1.5 font-bold text-slate-800",children:[e.jsx(Qe,{src:z.authorAvatar,className:"w-4 h-4 rounded-full object-cover"}),e.jsx("span",{children:z.author}),z.replyToAuthor&&e.jsxs("span",{className:"text-blue-600 font-normal",children:["▸ ตอบกลับ @",z.replyToAuthor]})]}),e.jsx("span",{className:"text-slate-400 font-mono",children:new Date(z.timestamp).toLocaleTimeString("th-TH",{hour:"2-digit",minute:"2-digit"})})]}),e.jsx("p",{className:"text-slate-700 leading-snug",children:z.text}),e.jsx(ds,{media:wt(z)}),(z.voiceUrl||z.audioUrl)&&e.jsxs("div",{className:"mt-1 flex items-center gap-1.5 bg-white p-1.5 rounded-lg border border-slate-200 max-w-[240px]",children:[e.jsx(Re,{className:"w-3.5 h-3.5 text-blue-600 shrink-0"}),e.jsx("audio",{controls:!0,src:z.voiceUrl||z.audioUrl,className:"h-6 w-full"})]}),e.jsx("div",{children:H&&e.jsxs("button",{type:"button",onClick:()=>ne({noteId:c.id,author:z.author}),className:"text-[10px] font-bold text-blue-600 hover:underline inline-flex items-center gap-0.5",children:[e.jsx(cs,{className:"w-2.5 h-2.5"}),e.jsxs("span",{children:["ตอบกลับ @",z.author," ต่อ"]})]})})]},z.id))}),H&&e.jsx("div",{className:(V==null?void 0:V.noteId)===c.id?"mt-2":"hidden",children:e.jsx(us,{value:((G=xe[c.id])==null?void 0:G.media)||[],onChange:z=>je(Ue=>({...Ue,[c.id]:{...Ue[c.id],media:z}})),onBusyChange:z=>re(c.id,z),disabled:te,recordId:h.id,recordType:h.type,recordTitle:h.id})}),H&&(V==null?void 0:V.noteId)===c.id&&e.jsxs("div",{className:"mt-2 pt-2 border-t border-slate-100 space-y-1.5 animate-in fade-in",children:[((W=xe[c.id])==null?void 0:W.voiceUrl)&&e.jsx("div",{className:"flex flex-wrap items-center gap-1.5 text-[10px]",children:((X=xe[c.id])==null?void 0:X.voiceUrl)&&e.jsxs("span",{className:"inline-flex items-center gap-1.5 px-2 py-0.5 rounded bg-blue-50 text-blue-800 border border-blue-200",children:[e.jsx(Fe,{className:"w-3 h-3"})," เสียงอัดสดพร้อมส่ง",e.jsx("audio",{controls:!0,src:(Se=xe[c.id])==null?void 0:Se.voiceUrl,className:"h-6 w-32"}),e.jsx("button",{type:"button",onClick:()=>je(z=>({...z,[c.id]:{...z[c.id],voiceUrl:void 0}})),children:e.jsx(Ge,{className:"w-2.5 h-2.5"})})]})}),e.jsxs("div",{className:"flex gap-1.5 items-center flex-wrap sm:flex-nowrap",children:[e.jsx("input",{type:"text",placeholder:`ตอบกลับ @${V.author} ในฐานะ ${s.alias}...`,disabled:te,value:fe[c.id]||"",onChange:z=>ye({...fe,[c.id]:z.target.value}),className:"flex-1 min-w-[140px] bg-slate-50 border border-blue-300 rounded-lg px-2.5 py-1.5 text-xs text-slate-900 focus:outline-none focus:border-blue-500",autoFocus:!0,onKeyDown:z=>{z.key==="Enter"&&(z.preventDefault(),At(c.id,V.author))}}),e.jsxs("button",{type:"button",title:ee===c.id?"กดเพื่อหยุดอัดเสียงสด":"กดเพื่ออัดเสียงสดในคำตอบกลับ",disabled:te||ie,onClick:()=>void Tt(c.id),className:`px-2 py-1.5 rounded-lg border text-[11px] font-bold inline-flex items-center gap-1 transition-all ${ee===c.id?"bg-rose-600 text-white border-rose-600 animate-pulse":"bg-white border-slate-200 hover:border-blue-500 hover:bg-blue-50 text-slate-600 hover:text-blue-700"}`,children:[e.jsx(Fe,{className:"w-3.5 h-3.5"}),e.jsx("span",{children:ee===c.id?`หยุดอัด (${Be}s)`:"อัดเสียงสด"})]}),e.jsx("button",{type:"button",disabled:te||ce[c.id]||ie||!!ee,onClick:()=>At(c.id,V.author),className:"px-3 py-1.5 rounded-lg bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold",children:"ส่ง"}),H&&e.jsx("button",{type:"button",onClick:()=>ne(null),className:"px-2 py-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-600 text-xs",children:"ยกเลิก"})]})]})]},c.id)})}),e.jsxs("div",{className:"pt-2 border-t border-slate-200/60 space-y-1.5",children:[e.jsx("div",{className:"flex items-center justify-between text-[11px] text-slate-500",children:e.jsxs("span",{className:"font-semibold flex items-center gap-1",children:[e.jsx(ls,{className:"w-3 h-3 text-amber-500"})," ข้อความด่วน (แตะเพื่อพิมพ์ทันที):"]})}),e.jsx("div",{className:"flex items-center gap-1.5 overflow-x-auto no-scrollbar py-0.5",children:B.map(c=>e.jsxs("button",{type:"button",onClick:()=>L(c.text),className:"px-2.5 py-1 rounded-lg bg-white border border-slate-200 hover:border-blue-400 text-[11px] text-slate-700 whitespace-nowrap active:scale-95 transition-all shadow-xs",title:c.text,children:[e.jsx("i",{className:"fa-solid fa-bolt text-amber-500 mr-1 text-[10px]"}),e.jsx("span",{children:c.title})]},c.id))})]}),s.role==="viewer"?null:e.jsxs("form",{onSubmit:Zs,className:"space-y-2 pt-1","aria-label":"เขียนความคิดเห็น",children:[e.jsx(us,{value:le,onChange:de,onBusyChange:c=>re("main",c),disabled:te,recordId:h.id,recordType:h.type,recordTitle:h.id}),(ae||ie)&&e.jsxs("div",{className:"flex flex-wrap items-center gap-2 px-1",children:[ae&&e.jsxs("div",{className:"flex items-center gap-1.5 px-2 py-1 bg-blue-50 border border-blue-200 rounded-lg text-xs text-blue-800",children:[e.jsx(Fe,{className:"w-3.5 h-3.5 text-blue-600"}),e.jsx("span",{children:"เสียงอัดสด:"}),e.jsx("audio",{controls:!0,src:ae,className:"h-6 w-36"}),e.jsx("button",{type:"button",onClick:()=>Ee(null),className:"text-slate-400 hover:text-rose-600",children:e.jsx(Ge,{className:"w-3 h-3"})})]}),ie&&e.jsxs("div",{className:"flex items-center gap-1.5 text-xs text-blue-600 font-medium",children:[e.jsx(yn,{className:"w-3.5 h-3.5 animate-spin"}),e.jsx("span",{children:"กำลังอัปโหลดไฟล์สื่อ..."})]})]}),e.jsxs("div",{className:"flex gap-1.5 items-center flex-wrap sm:flex-nowrap",children:[e.jsx("input",{type:"text",placeholder:`พิมพ์ข้อคิดเห็นใหม่ในฐานะ ${s.alias}...`,disabled:te,value:T,onChange:c=>L(c.target.value),className:"flex-1 min-w-[140px] h-8 bg-white border border-slate-200 rounded-lg px-2.5 text-xs text-slate-900 focus:outline-none focus:border-blue-500 shadow-2xs"}),e.jsxs("button",{type:"button",title:ee==="main"?"กดเพื่อหยุดอัดเสียงสด":"กดเพื่ออัดเสียงสดในคอมเมนต์",disabled:te||ie,onClick:()=>void Tt("main"),className:`h-8 px-2.5 rounded-lg border text-[11px] font-bold inline-flex items-center justify-center gap-1 transition-all shrink-0 ${ee==="main"?"bg-rose-600 text-white border-rose-600 animate-pulse shadow-xs":"bg-white border-slate-200 hover:border-blue-500 hover:bg-blue-50 text-slate-700 hover:text-blue-700"}`,children:[e.jsx(Fe,{className:"w-3.5 h-3.5"}),e.jsx("span",{children:ee==="main"?`หยุดอัด (${Be}s)`:"อัดเสียงสด"})]}),e.jsxs("button",{type:"submit",disabled:te||ce.main||ie||!!ee,className:"h-8 px-3 rounded-lg bg-blue-600 hover:bg-blue-700 text-white text-[11px] font-bold shadow-2xs active:scale-95 transition-all inline-flex items-center justify-center gap-1 shrink-0 disabled:opacity-50",children:[e.jsx(jn,{className:"w-3 h-3"}),e.jsx("span",{children:te?"กำลังส่ง…":"โพสต์"})]})]})]})]}),e.jsx(Mn,{item:h,users:b},h.id)]}),e.jsxs("div",{className:"p-3 sm:p-3.5 border-t border-slate-100 bg-white flex items-center justify-between gap-2 select-none",children:[e.jsxs("div",{className:"text-[11px] text-slate-400 font-mono truncate hidden sm:block",children:["ID: ",h.id," · ปรับปรุง:"," ",new Date(h.updatedAt).toLocaleTimeString("th-TH")]}),e.jsxs("div",{className:"flex items-center justify-end gap-1.5 sm:gap-2 w-full sm:w-auto",children:[P&&e.jsxs("button",{type:"button",onClick:Rt,className:"px-2.5 sm:px-3 py-1.5 text-xs font-bold rounded-xl bg-rose-50 hover:bg-rose-100 text-rose-700 border border-rose-200 flex items-center justify-center gap-1.5 transition-colors whitespace-nowrap active:scale-95 shrink-0",title:"ลบรายการ",children:[e.jsx(is,{className:"w-3.5 h-3.5 text-rose-600 shrink-0"}),e.jsx("span",{children:"ลบรายการ"})]}),O&&e.jsxs("button",{type:"button",onClick:()=>N(h),className:"px-2.5 sm:px-3.5 py-1.5 text-xs font-bold rounded-xl bg-amber-50 hover:bg-amber-100 text-amber-800 border border-amber-300 flex items-center justify-center gap-1.5 transition-colors whitespace-nowrap active:scale-95 shrink-0",children:[e.jsx(as,{className:"w-3.5 h-3.5 text-amber-600 shrink-0"}),e.jsx("span",{children:"แก้ไขข้อมูล"})]}),e.jsx("button",{onClick:d,className:"px-3.5 sm:px-4 py-1.5 text-xs font-bold rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 transition-colors whitespace-nowrap active:scale-95 shrink-0",children:"ปิด"})]})]})]}),w!==null&&M[w]&&e.jsxs("div",{className:"fixed inset-0 z-[140] bg-black/92 backdrop-blur-md flex flex-col items-center justify-between p-3 sm:p-6 select-none",onClick:()=>C(null),children:[e.jsxs("div",{className:"w-full max-w-4xl flex items-center justify-between text-white z-10",onClick:c=>c.stopPropagation(),children:[e.jsxs("div",{className:"flex items-center gap-2",children:[e.jsxs("span",{className:"px-2.5 py-1 rounded-full bg-white/15 font-mono text-xs font-bold",children:["รูปที่ ",w+1," / ",M.length]}),e.jsx("span",{className:"text-xs sm:text-sm font-semibold text-white/90 truncate max-w-[240px] sm:max-w-md",children:M[w].label})]}),e.jsx("button",{type:"button",onClick:()=>C(null),className:"w-9 h-9 rounded-full bg-white/15 hover:bg-white/25 text-white flex items-center justify-center transition-colors",children:e.jsx(Ge,{className:"w-5 h-5"})})]}),e.jsxs("div",{className:"relative flex-1 w-full max-w-5xl flex items-center justify-center my-2",onClick:c=>c.stopPropagation(),children:[M.length>1&&e.jsx("button",{type:"button",onClick:()=>C((w-1+M.length)%M.length),className:"absolute left-1 sm:left-3 z-20 w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-black/60 hover:bg-black/80 border border-white/25 text-white flex items-center justify-center shadow-lg active:scale-95 transition-all",title:"รูปก่อนหน้า (◀)",children:e.jsx(Nn,{className:"w-6 h-6"})}),e.jsx(qe,{imageSize:2e3,src:M[w].url,alt:M[w].label,className:"max-w-full max-h-[72vh] object-contain rounded-xl shadow-2xl"}),M.length>1&&e.jsx("button",{type:"button",onClick:()=>C((w+1)%M.length),className:"absolute right-1 sm:right-3 z-20 w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-black/60 hover:bg-black/80 border border-white/25 text-white flex items-center justify-center shadow-lg active:scale-95 transition-all",title:"รูปถัดไป (▶)",children:e.jsx($n,{className:"w-6 h-6"})})]}),e.jsxs("div",{className:"flex gap-4 py-2 text-sm text-white underline",onClick:c=>c.stopPropagation(),children:[e.jsx("a",{href:He(M[w].url,0),target:"_blank",rel:"noreferrer",children:"ดูเต็มความละเอียด"}),e.jsx("a",{href:_s(M[w].url),target:"_blank",rel:"noreferrer",children:"เปิดไฟล์ต้นฉบับ"})]}),M.length>1&&e.jsx("div",{className:"w-full max-w-3xl flex items-center justify-center gap-2 overflow-x-auto py-1 z-10",onClick:c=>c.stopPropagation(),children:M.map((c,k)=>e.jsx("button",{type:"button",onClick:()=>C(k),className:`relative w-12 h-12 sm:w-14 sm:h-14 rounded-lg overflow-hidden shrink-0 border-2 transition-all ${k===w?"border-emerald-400 scale-105 shadow-md":"border-white/20 opacity-60 hover:opacity-100"}`,children:e.jsx(qe,{src:c.url,className:"w-full h-full object-cover"})},k))})]})]})};export{hr as DetailModal};
