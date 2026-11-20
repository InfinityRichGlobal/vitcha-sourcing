import{c as on,an as Ge,r as Q,j as e,N as Xe,ao as ln,ac as le,i as Vs,a0 as Oe,ap as Ct,a1 as Os,u as dn,aq as Ce,ae as cn,y as is,X as Je,P as os,T as ls,a5 as un,a2 as mn,n as pn,a4 as Be,O as hn,a6 as _e,ar as ds,l as fn,_ as gn,Z as cs,af as xn,R as bn,h as vn,as as wn,k as He,m as yn,at as us,au as ms,ag as jn,av as Nn,aw as ps,s as $n,f as kn,$ as Cn,d as Sn,a9 as En}from"./index-CuCHG6AT.js";import{g as Tn,f as Rn,a as An}from"./AttachedFilesSection-BjN8KTBM.js";import{r as In,b as Bn,a as Pn,P as Ln}from"./reportFooter-B-lHL9gi.js";import{V as Mn}from"./VideoPlayer-DG74fHEQ.js";import"./arrow-left-A1WFFWjI.js";/**
 * @license lucide-react v1.62.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Gs={name:"file-down",size:24,node:[["path",{d:"M6 22a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h8a2.4 2.4 0 0 1 1.704.706l3.588 3.588A2.4 2.4 0 0 1 20 8v12a2 2 0 0 1-2 2z",key:"1oefj6"}],["path",{d:"M14 2v5a1 1 0 0 0 1 1h5",key:"wfsgrz"}],["path",{d:"M12 18v-6",key:"17g6i2"}],["path",{d:"m9 15 3 3 3-3",key:"1npd3o"}]]};Gs.node;const zn=on(Gs);function Dn(t){var r,s,n,i,a,o,g;if(!t)return[];const d=[],l=(x,y,S=[])=>d.push({id:x,label:y,photos:S.filter(Boolean).map((w,L)=>({url:Ge(w),label:`${y} #${L+1}`}))});return l("storefront","หน้าร้าน / บรรยากาศ",(r=t.photos)==null?void 0:r.storefrontAndAtmosphere),t.type==="supplier"?(l("contacts","นามบัตร / WeChat QR",(s=t.photos)==null?void 0:s.contactCards),d.push({id:"catalog",label:"รายการสินค้า",photos:(t.catalogItems||[]).filter(x=>x.photo).map((x,y)=>({url:Ge(x.photo),label:x.name||`สินค้า #${y+1}`}))})):t.type==="drink_store"?(l("menu","ป้ายเมนู",(n=t.photos)==null?void 0:n.menuBoard),l("cups","แก้วเครื่องดื่ม",(i=t.photos)==null?void 0:i.drinkCups),d.push({id:"drinks",label:"เมนูชิม",photos:(t.drinkItems||[]).filter(x=>x.photo).map((x,y)=>({url:Ge(x.photo),label:x.name||`เมนู #${y+1}`}))})):(l("plans","ผังห้อง / งานระบบ",(a=t.photos)==null?void 0:a.floorPlanAndSpecs),l("neighbors","ร้านข้างเคียง",(o=t.photos)==null?void 0:o.surroundingNeighbors),l("contacts","นามบัตร / เอกสาร",(g=t.photos)==null?void 0:g.contactCards)),d}const et={images:["รูปภาพ","รูป"],videos:["วิดีโอ","ไฟล์"],audio:["เสียง","ไฟล์"],files:["ไฟล์แนบ","ไฟล์"]},Ks={create:"สร้างรายการ",update:"แก้ไขข้อมูลรายการ",comment:"แสดงความคิดเห็น",reply:"ตอบกลับความคิดเห็น",handoff:"อัปเดตการส่งต่องาน",delete:"ลบรายการเข้าถังขยะ",restore:"กู้คืนรายการจากถังขยะ"},Se=t=>Array.isArray(t)?t:[];function hs(t={}){var s,n,i;const d=Object.fromEntries(Object.keys(et).map(a=>[a,new Set])),l=(a,o)=>{if(typeof o!="string"||!o.trim())return;const g=o.match(/(?:drive\.google\.com\/file\/d\/|lh3\.googleusercontent\.com\/d\/)([^/?=]+)/);d[a].add(g?`drive:${g[1]}`:o)},r=t.photos||{};for(const a of Array.isArray(r)?[r]:Object.values(r))if(Array.isArray(a))for(const o of a)l("images",o);for(const a of[...Se(t.catalogItems),...Se(t.drinkItems)]){l("images",a==null?void 0:a.photo),l("audio",a==null?void 0:a.voiceNoteUrl);for(const o of Se(a==null?void 0:a.voiceNotes))l("audio",o==null?void 0:o.url)}for(const a of Se(t.videos))l("videos",a);for(const a of Se(t.voiceNotes))l("audio",a==null?void 0:a.url);l("audio",t.voiceNoteUrl),l("audio",t.voiceUrl||t.audioUrl),l("images",t.photoUrl||t.imageUrl);for(const a of Se(t.media))a&&l(a.type==="video"?"videos":"images",a.url);for(const a of Se(t.attachedFiles)){if(!a)continue;const o=(s=a.mimeType)!=null&&s.startsWith("image/")?"images":(n=a.mimeType)!=null&&n.startsWith("video/")?"videos":(i=a.mimeType)!=null&&i.startsWith("audio/")?"audio":"files";l(o,a.url)}return d}function Un(t={},d={}){const l=hs(t),r=hs(d);return Object.fromEntries(Object.keys(et).flatMap(s=>{const n=[...r[s]].filter(a=>!l[s].has(a)).length,i=[...l[s]].filter(a=>!r[s].has(a)).length;return n||i?[[s,{added:n,removed:i}]]:[]}))}function Qs(t){if(t.kind)return t.kind;const d=t.action||"";return Object.hasOwn(Ks,d)?d:/ตอบกลับ|^reply$/.test(d)?"reply":/ความคิดเห็น|คอมเม|^comment$/.test(d)?"comment":/กู้คืน/.test(d)?"restore":/ลบรายการ|ถังขยะ/.test(d)?"delete":/สร้าง|เพิ่มรายการ/.test(d)?"create":/ส่งต่อ|รับช่วง|ย้ายเข้าสู่|สถานะ|^handoff$/.test(d)?"handoff":"update"}function Fn(t){const d=Qs(t);let l=t.mediaCounts;if(!l){const n={},i={};for(const a of t.changes||[])n[a.field]=a.before,i[a.field]=a.after;l=Un(n,["comment","reply"].includes(d)?t.content||{}:i)}const r=Object.fromEntries(Object.keys(et).flatMap(n=>{var o,g;const i=Math.max(0,Math.floor(Number((o=l[n])==null?void 0:o.added)||0)),a=Math.max(0,Math.floor(Number((g=l[n])==null?void 0:g.removed)||0));return i||a?[[n,{added:i,removed:a}]]:[]})),s=[Ks[d]||"บันทึกกิจกรรม"];for(const[n,[i,a]]of Object.entries(et)){const o=r[n];o!=null&&o.added&&s.push(`${["comment","reply"].includes(d)?"แนบ":"เพิ่ม"}${i} ${o.added} ${a}`),o!=null&&o.removed&&s.push(`ลบ${i} ${o.removed} ${a}`)}return{...t.id?{id:t.id}:{},version:3,kind:d,action:s.join(" · "),user:t.user,...t.userId?{userId:t.userId}:{},timestamp:t.timestamp,...Object.keys(r).length?{mediaCounts:r}:{}}}function tt(t,d,l,r=""){const s=d?t.find(n=>n.id===d):t.find(n=>n.alias===l||n.name===l);return{name:(s==null?void 0:s.alias)||l,avatar:(s==null?void 0:s.avatar)||r}}function Ws(t,d,l){const r=(t.reviewerNotes||[]).flatMap(n=>[n,...n.replies||[]]).find(n=>n.id===l.id||n.timestamp===l.timestamp&&(l.userId?n.authorId===l.userId:n.author===l.user)),s=(r==null?void 0:r.authorAvatar)||(t.creator.alias===l.user?t.creator.avatar:"");return tt(d,l.userId||(r==null?void 0:r.authorId),l.user,s)}function Ys(t){var l;const d=(l=t.history)!=null&&l.length?t.history.map(r=>({...r})):[{kind:"create",action:"สร้างรายการ",user:t.creator.alias,timestamp:t.creator.timestamp}];for(const r of t.reviewerNotes||[])for(const[s,n]of[["comment",r],...(r.replies||[]).map(i=>["reply",i])]){const i=n,a=d.find(o=>{var g;return o.id===i.id||((g=o.content)==null?void 0:g.id)===i.id||Qs(o)===s&&o.timestamp===i.timestamp&&(o.userId===i.authorId&&!!o.userId||o.user===i.author)});a?!a.content&&!a.mediaCounts&&a.version!==3&&(a.content=i):d.push({id:i.id,kind:s,action:"",user:i.author,userId:i.authorId,timestamp:i.timestamp,content:i})}return d.map(Fn)}const qn=t=>Number.isNaN(Date.parse(t))?t:new Date(t).toLocaleString("th-TH",{dateStyle:"medium",timeStyle:"short"});function _n({item:t,users:d}){const[l,r]=Q.useState("all"),[s,n]=Q.useState(!1),[i,a]=Q.useState(20);Q.useEffect(()=>{r("all"),a(20)},[t.id]),Q.useEffect(()=>{a(20)},[l,s]);const g=Ys(t).filter(x=>l==="all"||l==="files"&&!!Object.keys(x.mediaCounts||{}).length||l==="comments"&&["comment","reply"].includes(x.kind||"")||l==="data"&&["create","update","delete","restore"].includes(x.kind||"")||l==="handoff"&&x.kind==="handoff").map((x,y)=>({e:x,index:y})).sort((x,y)=>(s?1:-1)*((Date.parse(x.e.timestamp)||0)-(Date.parse(y.e.timestamp)||0)||x.index-y.index));return e.jsxs("section",{"data-testid":"activity-timeline",className:"p-3.5 bg-slate-50 rounded-xl border border-slate-200 space-y-3 text-xs leading-snug min-w-0",children:[e.jsx("h3",{className:"font-bold text-sm text-slate-900",children:"ประวัติการดำเนินงาน"}),e.jsx("p",{className:"text-slate-500",children:"วันเวลา · ผู้ดำเนินการ · กิจกรรม"}),e.jsxs("div",{className:"flex flex-wrap gap-2 items-center",children:[e.jsxs("select",{"aria-label":"ประเภทประวัติ",value:l,onChange:x=>r(x.target.value),className:"max-w-full rounded-lg border p-2 bg-white",children:[e.jsx("option",{value:"all",children:"ทั้งหมด"}),e.jsx("option",{value:"handoff",children:"ส่งต่องาน"}),e.jsx("option",{value:"data",children:"ข้อมูล"}),e.jsx("option",{value:"comments",children:"ความคิดเห็น"}),e.jsx("option",{value:"files",children:"ไฟล์และสื่อ"})]}),e.jsx("button",{type:"button",onClick:()=>n(!s),className:"border rounded-lg p-2 bg-white",children:s?"เรียงเก่าก่อน":"เรียงใหม่ก่อน"}),e.jsxs("span",{className:"text-slate-500",children:[g.length," เหตุการณ์"]})]}),e.jsx("div",{className:"divide-y divide-slate-200",children:g.slice(0,i).map(({e:x,index:y})=>{const S=Ws(t,d,x);return e.jsxs("article",{className:"flex items-start gap-2 py-1.5 min-w-0","data-testid":"activity-event",children:[e.jsx(Xe,{src:S.avatar,alt:`โปรไฟล์ ${S.name}`,className:"w-7 h-7 rounded-full object-cover shrink-0 mt-0.5","data-testid":"activity-avatar"}),e.jsxs("div",{className:"min-w-0 flex-1",children:[e.jsx("time",{className:"text-[11px] text-slate-500",children:qn(x.timestamp)}),e.jsxs("p",{className:"break-words [overflow-wrap:anywhere]",children:[e.jsx("strong",{children:S.name})," · ",x.action]})]})]},x.id||`${x.timestamp}-${y}`)})}),!g.length&&e.jsx("p",{className:"text-slate-500",children:"ยังไม่มีประวัติที่บันทึกสำหรับตัวกรองนี้"}),g.length>i&&e.jsxs("button",{type:"button",className:"w-full border rounded-lg p-3 text-emerald-700",onClick:()=>a(i+20),children:["แสดงประวัติเพิ่ม (",g.length-i," เหตุการณ์)"]})]})}var Pe={},st,fs;function Hn(){return fs||(fs=1,st=function(){return typeof Promise=="function"&&Promise.prototype&&Promise.prototype.then}),st}var nt={},ye={},gs;function Ee(){if(gs)return ye;gs=1;let t;const d=[0,26,44,70,100,134,172,196,242,292,346,404,466,532,581,655,733,815,901,991,1085,1156,1258,1364,1474,1588,1706,1828,1921,2051,2185,2323,2465,2611,2761,2876,3034,3196,3362,3532,3706];return ye.getSymbolSize=function(r){if(!r)throw new Error('"version" cannot be null or undefined');if(r<1||r>40)throw new Error('"version" should be in range from 1 to 40');return r*4+17},ye.getSymbolTotalCodewords=function(r){return d[r]},ye.getBCHDigit=function(l){let r=0;for(;l!==0;)r++,l>>>=1;return r},ye.setToSJISFunction=function(r){if(typeof r!="function")throw new Error('"toSJISFunc" is not a valid function.');t=r},ye.isKanjiModeEnabled=function(){return typeof t<"u"},ye.toSJIS=function(r){return t(r)},ye}var rt={},xs;function St(){return xs||(xs=1,(function(t){t.L={bit:1},t.M={bit:0},t.Q={bit:3},t.H={bit:2};function d(l){if(typeof l!="string")throw new Error("Param is not a string");switch(l.toLowerCase()){case"l":case"low":return t.L;case"m":case"medium":return t.M;case"q":case"quartile":return t.Q;case"h":case"high":return t.H;default:throw new Error("Unknown EC Level: "+l)}}t.isValid=function(r){return r&&typeof r.bit<"u"&&r.bit>=0&&r.bit<4},t.from=function(r,s){if(t.isValid(r))return r;try{return d(r)}catch{return s}}})(rt)),rt}var at,bs;function Vn(){if(bs)return at;bs=1;function t(){this.buffer=[],this.length=0}return t.prototype={get:function(d){const l=Math.floor(d/8);return(this.buffer[l]>>>7-d%8&1)===1},put:function(d,l){for(let r=0;r<l;r++)this.putBit((d>>>l-r-1&1)===1)},getLengthInBits:function(){return this.length},putBit:function(d){const l=Math.floor(this.length/8);this.buffer.length<=l&&this.buffer.push(0),d&&(this.buffer[l]|=128>>>this.length%8),this.length++}},at=t,at}var it,vs;function On(){if(vs)return it;vs=1;function t(d){if(!d||d<1)throw new Error("BitMatrix size must be defined and greater than 0");this.size=d,this.data=new Uint8Array(d*d),this.reservedBit=new Uint8Array(d*d)}return t.prototype.set=function(d,l,r,s){const n=d*this.size+l;this.data[n]=r,s&&(this.reservedBit[n]=!0)},t.prototype.get=function(d,l){return this.data[d*this.size+l]},t.prototype.xor=function(d,l,r){this.data[d*this.size+l]^=r},t.prototype.isReserved=function(d,l){return this.reservedBit[d*this.size+l]},it=t,it}var ot={},ws;function Gn(){return ws||(ws=1,(function(t){const d=Ee().getSymbolSize;t.getRowColCoords=function(r){if(r===1)return[];const s=Math.floor(r/7)+2,n=d(r),i=n===145?26:Math.ceil((n-13)/(2*s-2))*2,a=[n-7];for(let o=1;o<s-1;o++)a[o]=a[o-1]-i;return a.push(6),a.reverse()},t.getPositions=function(r){const s=[],n=t.getRowColCoords(r),i=n.length;for(let a=0;a<i;a++)for(let o=0;o<i;o++)a===0&&o===0||a===0&&o===i-1||a===i-1&&o===0||s.push([n[a],n[o]]);return s}})(ot)),ot}var lt={},ys;function Kn(){if(ys)return lt;ys=1;const t=Ee().getSymbolSize,d=7;return lt.getPositions=function(r){const s=t(r);return[[0,0],[s-d,0],[0,s-d]]},lt}var dt={},js;function Qn(){return js||(js=1,(function(t){t.Patterns={PATTERN000:0,PATTERN001:1,PATTERN010:2,PATTERN011:3,PATTERN100:4,PATTERN101:5,PATTERN110:6,PATTERN111:7};const d={N1:3,N2:3,N3:40,N4:10};t.isValid=function(s){return s!=null&&s!==""&&!isNaN(s)&&s>=0&&s<=7},t.from=function(s){return t.isValid(s)?parseInt(s,10):void 0},t.getPenaltyN1=function(s){const n=s.size;let i=0,a=0,o=0,g=null,x=null;for(let y=0;y<n;y++){a=o=0,g=x=null;for(let S=0;S<n;S++){let w=s.get(y,S);w===g?a++:(a>=5&&(i+=d.N1+(a-5)),g=w,a=1),w=s.get(S,y),w===x?o++:(o>=5&&(i+=d.N1+(o-5)),x=w,o=1)}a>=5&&(i+=d.N1+(a-5)),o>=5&&(i+=d.N1+(o-5))}return i},t.getPenaltyN2=function(s){const n=s.size;let i=0;for(let a=0;a<n-1;a++)for(let o=0;o<n-1;o++){const g=s.get(a,o)+s.get(a,o+1)+s.get(a+1,o)+s.get(a+1,o+1);(g===4||g===0)&&i++}return i*d.N2},t.getPenaltyN3=function(s){const n=s.size;let i=0,a=0,o=0;for(let g=0;g<n;g++){a=o=0;for(let x=0;x<n;x++)a=a<<1&2047|s.get(g,x),x>=10&&(a===1488||a===93)&&i++,o=o<<1&2047|s.get(x,g),x>=10&&(o===1488||o===93)&&i++}return i*d.N3},t.getPenaltyN4=function(s){let n=0;const i=s.data.length;for(let o=0;o<i;o++)n+=s.data[o];return Math.abs(Math.ceil(n*100/i/5)-10)*d.N4};function l(r,s,n){switch(r){case t.Patterns.PATTERN000:return(s+n)%2===0;case t.Patterns.PATTERN001:return s%2===0;case t.Patterns.PATTERN010:return n%3===0;case t.Patterns.PATTERN011:return(s+n)%3===0;case t.Patterns.PATTERN100:return(Math.floor(s/2)+Math.floor(n/3))%2===0;case t.Patterns.PATTERN101:return s*n%2+s*n%3===0;case t.Patterns.PATTERN110:return(s*n%2+s*n%3)%2===0;case t.Patterns.PATTERN111:return(s*n%3+(s+n)%2)%2===0;default:throw new Error("bad maskPattern:"+r)}}t.applyMask=function(s,n){const i=n.size;for(let a=0;a<i;a++)for(let o=0;o<i;o++)n.isReserved(o,a)||n.xor(o,a,l(s,o,a))},t.getBestMask=function(s,n){const i=Object.keys(t.Patterns).length;let a=0,o=1/0;for(let g=0;g<i;g++){n(g),t.applyMask(g,s);const x=t.getPenaltyN1(s)+t.getPenaltyN2(s)+t.getPenaltyN3(s)+t.getPenaltyN4(s);t.applyMask(g,s),x<o&&(o=x,a=g)}return a}})(dt)),dt}var Ze={},Ns;function Js(){if(Ns)return Ze;Ns=1;const t=St(),d=[1,1,1,1,1,1,1,1,1,1,2,2,1,2,2,4,1,2,4,4,2,4,4,4,2,4,6,5,2,4,6,6,2,5,8,8,4,5,8,8,4,5,8,11,4,8,10,11,4,9,12,16,4,9,16,16,6,10,12,18,6,10,17,16,6,11,16,19,6,13,18,21,7,14,21,25,8,16,20,25,8,17,23,25,9,17,23,34,9,18,25,30,10,20,27,32,12,21,29,35,12,23,34,37,12,25,34,40,13,26,35,42,14,28,38,45,15,29,40,48,16,31,43,51,17,33,45,54,18,35,48,57,19,37,51,60,19,38,53,63,20,40,56,66,21,43,59,70,22,45,62,74,24,47,65,77,25,49,68,81],l=[7,10,13,17,10,16,22,28,15,26,36,44,20,36,52,64,26,48,72,88,36,64,96,112,40,72,108,130,48,88,132,156,60,110,160,192,72,130,192,224,80,150,224,264,96,176,260,308,104,198,288,352,120,216,320,384,132,240,360,432,144,280,408,480,168,308,448,532,180,338,504,588,196,364,546,650,224,416,600,700,224,442,644,750,252,476,690,816,270,504,750,900,300,560,810,960,312,588,870,1050,336,644,952,1110,360,700,1020,1200,390,728,1050,1260,420,784,1140,1350,450,812,1200,1440,480,868,1290,1530,510,924,1350,1620,540,980,1440,1710,570,1036,1530,1800,570,1064,1590,1890,600,1120,1680,1980,630,1204,1770,2100,660,1260,1860,2220,720,1316,1950,2310,750,1372,2040,2430];return Ze.getBlocksCount=function(s,n){switch(n){case t.L:return d[(s-1)*4+0];case t.M:return d[(s-1)*4+1];case t.Q:return d[(s-1)*4+2];case t.H:return d[(s-1)*4+3];default:return}},Ze.getTotalCodewordsCount=function(s,n){switch(n){case t.L:return l[(s-1)*4+0];case t.M:return l[(s-1)*4+1];case t.Q:return l[(s-1)*4+2];case t.H:return l[(s-1)*4+3];default:return}},Ze}var ct={},Ve={},$s;function Wn(){if($s)return Ve;$s=1;const t=new Uint8Array(512),d=new Uint8Array(256);return(function(){let r=1;for(let s=0;s<255;s++)t[s]=r,d[r]=s,r<<=1,r&256&&(r^=285);for(let s=255;s<512;s++)t[s]=t[s-255]})(),Ve.log=function(r){if(r<1)throw new Error("log("+r+")");return d[r]},Ve.exp=function(r){return t[r]},Ve.mul=function(r,s){return r===0||s===0?0:t[d[r]+d[s]]},Ve}var ks;function Yn(){return ks||(ks=1,(function(t){const d=Wn();t.mul=function(r,s){const n=new Uint8Array(r.length+s.length-1);for(let i=0;i<r.length;i++)for(let a=0;a<s.length;a++)n[i+a]^=d.mul(r[i],s[a]);return n},t.mod=function(r,s){let n=new Uint8Array(r);for(;n.length-s.length>=0;){const i=n[0];for(let o=0;o<s.length;o++)n[o]^=d.mul(s[o],i);let a=0;for(;a<n.length&&n[a]===0;)a++;n=n.slice(a)}return n},t.generateECPolynomial=function(r){let s=new Uint8Array([1]);for(let n=0;n<r;n++)s=t.mul(s,new Uint8Array([1,d.exp(n)]));return s}})(ct)),ct}var ut,Cs;function Jn(){if(Cs)return ut;Cs=1;const t=Yn();function d(l){this.genPoly=void 0,this.degree=l,this.degree&&this.initialize(this.degree)}return d.prototype.initialize=function(r){this.degree=r,this.genPoly=t.generateECPolynomial(this.degree)},d.prototype.encode=function(r){if(!this.genPoly)throw new Error("Encoder not initialized");const s=new Uint8Array(r.length+this.degree);s.set(r);const n=t.mod(s,this.genPoly),i=this.degree-n.length;if(i>0){const a=new Uint8Array(this.degree);return a.set(n,i),a}return n},ut=d,ut}var mt={},pt={},ht={},Ss;function Zs(){return Ss||(Ss=1,ht.isValid=function(d){return!isNaN(d)&&d>=1&&d<=40}),ht}var ue={},Es;function Xs(){if(Es)return ue;Es=1;const t="[0-9]+",d="[A-Z $%*+\\-./:]+";let l="(?:[u3000-u303F]|[u3040-u309F]|[u30A0-u30FF]|[uFF00-uFFEF]|[u4E00-u9FAF]|[u2605-u2606]|[u2190-u2195]|u203B|[u2010u2015u2018u2019u2025u2026u201Cu201Du2225u2260]|[u0391-u0451]|[u00A7u00A8u00B1u00B4u00D7u00F7])+";l=l.replace(/u/g,"\\u");const r="(?:(?![A-Z0-9 $%*+\\-./:]|"+l+`)(?:.|[\r
]))+`;ue.KANJI=new RegExp(l,"g"),ue.BYTE_KANJI=new RegExp("[^A-Z0-9 $%*+\\-./:]+","g"),ue.BYTE=new RegExp(r,"g"),ue.NUMERIC=new RegExp(t,"g"),ue.ALPHANUMERIC=new RegExp(d,"g");const s=new RegExp("^"+l+"$"),n=new RegExp("^"+t+"$"),i=new RegExp("^[A-Z0-9 $%*+\\-./:]+$");return ue.testKanji=function(o){return s.test(o)},ue.testNumeric=function(o){return n.test(o)},ue.testAlphanumeric=function(o){return i.test(o)},ue}var Ts;function Te(){return Ts||(Ts=1,(function(t){const d=Zs(),l=Xs();t.NUMERIC={id:"Numeric",bit:1,ccBits:[10,12,14]},t.ALPHANUMERIC={id:"Alphanumeric",bit:2,ccBits:[9,11,13]},t.BYTE={id:"Byte",bit:4,ccBits:[8,16,16]},t.KANJI={id:"Kanji",bit:8,ccBits:[8,10,12]},t.MIXED={bit:-1},t.getCharCountIndicator=function(n,i){if(!n.ccBits)throw new Error("Invalid mode: "+n);if(!d.isValid(i))throw new Error("Invalid version: "+i);return i>=1&&i<10?n.ccBits[0]:i<27?n.ccBits[1]:n.ccBits[2]},t.getBestModeForData=function(n){return l.testNumeric(n)?t.NUMERIC:l.testAlphanumeric(n)?t.ALPHANUMERIC:l.testKanji(n)?t.KANJI:t.BYTE},t.toString=function(n){if(n&&n.id)return n.id;throw new Error("Invalid mode")},t.isValid=function(n){return n&&n.bit&&n.ccBits};function r(s){if(typeof s!="string")throw new Error("Param is not a string");switch(s.toLowerCase()){case"numeric":return t.NUMERIC;case"alphanumeric":return t.ALPHANUMERIC;case"kanji":return t.KANJI;case"byte":return t.BYTE;default:throw new Error("Unknown mode: "+s)}}t.from=function(n,i){if(t.isValid(n))return n;try{return r(n)}catch{return i}}})(pt)),pt}var Rs;function Zn(){return Rs||(Rs=1,(function(t){const d=Ee(),l=Js(),r=St(),s=Te(),n=Zs(),i=7973,a=d.getBCHDigit(i);function o(S,w,L){for(let M=1;M<=40;M++)if(w<=t.getCapacity(M,L,S))return M}function g(S,w){return s.getCharCountIndicator(S,w)+4}function x(S,w){let L=0;return S.forEach(function(M){const V=g(M.mode,w);L+=V+M.getBitsLength()}),L}function y(S,w){for(let L=1;L<=40;L++)if(x(S,L)<=t.getCapacity(L,w,s.MIXED))return L}t.from=function(w,L){return n.isValid(w)?parseInt(w,10):L},t.getCapacity=function(w,L,M){if(!n.isValid(w))throw new Error("Invalid QR Code version");typeof M>"u"&&(M=s.BYTE);const V=d.getSymbolTotalCodewords(w),I=l.getTotalCodewordsCount(w,L),z=(V-I)*8;if(M===s.MIXED)return z;const E=z-g(M,w);switch(M){case s.NUMERIC:return Math.floor(E/10*3);case s.ALPHANUMERIC:return Math.floor(E/11*2);case s.KANJI:return Math.floor(E/13);case s.BYTE:default:return Math.floor(E/8)}},t.getBestVersionForData=function(w,L){let M;const V=r.from(L,r.M);if(Array.isArray(w)){if(w.length>1)return y(w,V);if(w.length===0)return 1;M=w[0]}else M=w;return o(M.mode,M.getLength(),V)},t.getEncodedBits=function(w){if(!n.isValid(w)||w<7)throw new Error("Invalid QR Code version");let L=w<<12;for(;d.getBCHDigit(L)-a>=0;)L^=i<<d.getBCHDigit(L)-a;return w<<12|L}})(mt)),mt}var ft={},As;function Xn(){if(As)return ft;As=1;const t=Ee(),d=1335,l=21522,r=t.getBCHDigit(d);return ft.getEncodedBits=function(n,i){const a=n.bit<<3|i;let o=a<<10;for(;t.getBCHDigit(o)-r>=0;)o^=d<<t.getBCHDigit(o)-r;return(a<<10|o)^l},ft}var gt={},xt,Is;function er(){if(Is)return xt;Is=1;const t=Te();function d(l){this.mode=t.NUMERIC,this.data=l.toString()}return d.getBitsLength=function(r){return 10*Math.floor(r/3)+(r%3?r%3*3+1:0)},d.prototype.getLength=function(){return this.data.length},d.prototype.getBitsLength=function(){return d.getBitsLength(this.data.length)},d.prototype.write=function(r){let s,n,i;for(s=0;s+3<=this.data.length;s+=3)n=this.data.substr(s,3),i=parseInt(n,10),r.put(i,10);const a=this.data.length-s;a>0&&(n=this.data.substr(s),i=parseInt(n,10),r.put(i,a*3+1))},xt=d,xt}var bt,Bs;function tr(){if(Bs)return bt;Bs=1;const t=Te(),d=["0","1","2","3","4","5","6","7","8","9","A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z"," ","$","%","*","+","-",".","/",":"];function l(r){this.mode=t.ALPHANUMERIC,this.data=r}return l.getBitsLength=function(s){return 11*Math.floor(s/2)+6*(s%2)},l.prototype.getLength=function(){return this.data.length},l.prototype.getBitsLength=function(){return l.getBitsLength(this.data.length)},l.prototype.write=function(s){let n;for(n=0;n+2<=this.data.length;n+=2){let i=d.indexOf(this.data[n])*45;i+=d.indexOf(this.data[n+1]),s.put(i,11)}this.data.length%2&&s.put(d.indexOf(this.data[n]),6)},bt=l,bt}var vt,Ps;function sr(){if(Ps)return vt;Ps=1;const t=Te();function d(l){this.mode=t.BYTE,typeof l=="string"?this.data=new TextEncoder().encode(l):this.data=new Uint8Array(l)}return d.getBitsLength=function(r){return r*8},d.prototype.getLength=function(){return this.data.length},d.prototype.getBitsLength=function(){return d.getBitsLength(this.data.length)},d.prototype.write=function(l){for(let r=0,s=this.data.length;r<s;r++)l.put(this.data[r],8)},vt=d,vt}var wt,Ls;function nr(){if(Ls)return wt;Ls=1;const t=Te(),d=Ee();function l(r){this.mode=t.KANJI,this.data=r}return l.getBitsLength=function(s){return s*13},l.prototype.getLength=function(){return this.data.length},l.prototype.getBitsLength=function(){return l.getBitsLength(this.data.length)},l.prototype.write=function(r){let s;for(s=0;s<this.data.length;s++){let n=d.toSJIS(this.data[s]);if(n>=33088&&n<=40956)n-=33088;else if(n>=57408&&n<=60351)n-=49472;else throw new Error("Invalid SJIS character: "+this.data[s]+`
Make sure your charset is UTF-8`);n=(n>>>8&255)*192+(n&255),r.put(n,13)}},wt=l,wt}var yt={exports:{}},Ms;function rr(){return Ms||(Ms=1,(function(t){var d={single_source_shortest_paths:function(l,r,s){var n={},i={};i[r]=0;var a=d.PriorityQueue.make();a.push(r,0);for(var o,g,x,y,S,w,L,M,V;!a.empty();){o=a.pop(),g=o.value,y=o.cost,S=l[g]||{};for(x in S)S.hasOwnProperty(x)&&(w=S[x],L=y+w,M=i[x],V=typeof i[x]>"u",(V||M>L)&&(i[x]=L,a.push(x,L),n[x]=g))}if(typeof s<"u"&&typeof i[s]>"u"){var I=["Could not find a path from ",r," to ",s,"."].join("");throw new Error(I)}return n},extract_shortest_path_from_predecessor_list:function(l,r){for(var s=[],n=r;n;)s.push(n),l[n],n=l[n];return s.reverse(),s},find_path:function(l,r,s){var n=d.single_source_shortest_paths(l,r,s);return d.extract_shortest_path_from_predecessor_list(n,s)},PriorityQueue:{make:function(l){var r=d.PriorityQueue,s={},n;l=l||{};for(n in r)r.hasOwnProperty(n)&&(s[n]=r[n]);return s.queue=[],s.sorter=l.sorter||r.default_sorter,s},default_sorter:function(l,r){return l.cost-r.cost},push:function(l,r){var s={value:l,cost:r};this.queue.push(s),this.queue.sort(this.sorter)},pop:function(){return this.queue.shift()},empty:function(){return this.queue.length===0}}};t.exports=d})(yt)),yt.exports}var zs;function ar(){return zs||(zs=1,(function(t){const d=Te(),l=er(),r=tr(),s=sr(),n=nr(),i=Xs(),a=Ee(),o=rr();function g(I){return unescape(encodeURIComponent(I)).length}function x(I,z,E){const B=[];let U;for(;(U=I.exec(E))!==null;)B.push({data:U[0],index:U.index,mode:z,length:U[0].length});return B}function y(I){const z=x(i.NUMERIC,d.NUMERIC,I),E=x(i.ALPHANUMERIC,d.ALPHANUMERIC,I);let B,U;return a.isKanjiModeEnabled()?(B=x(i.BYTE,d.BYTE,I),U=x(i.KANJI,d.KANJI,I)):(B=x(i.BYTE_KANJI,d.BYTE,I),U=[]),z.concat(E,B,U).sort(function(T,A){return T.index-A.index}).map(function(T){return{data:T.data,mode:T.mode,length:T.length}})}function S(I,z){switch(z){case d.NUMERIC:return l.getBitsLength(I);case d.ALPHANUMERIC:return r.getBitsLength(I);case d.KANJI:return n.getBitsLength(I);case d.BYTE:return s.getBitsLength(I)}}function w(I){return I.reduce(function(z,E){const B=z.length-1>=0?z[z.length-1]:null;return B&&B.mode===E.mode?(z[z.length-1].data+=E.data,z):(z.push(E),z)},[])}function L(I){const z=[];for(let E=0;E<I.length;E++){const B=I[E];switch(B.mode){case d.NUMERIC:z.push([B,{data:B.data,mode:d.ALPHANUMERIC,length:B.length},{data:B.data,mode:d.BYTE,length:B.length}]);break;case d.ALPHANUMERIC:z.push([B,{data:B.data,mode:d.BYTE,length:B.length}]);break;case d.KANJI:z.push([B,{data:B.data,mode:d.BYTE,length:g(B.data)}]);break;case d.BYTE:z.push([{data:B.data,mode:d.BYTE,length:g(B.data)}])}}return z}function M(I,z){const E={},B={start:{}};let U=["start"];for(let $=0;$<I.length;$++){const T=I[$],A=[];for(let k=0;k<T.length;k++){const m=T[k],j=""+$+k;A.push(j),E[j]={node:m,lastCount:0},B[j]={};for(let C=0;C<U.length;C++){const R=U[C];E[R]&&E[R].node.mode===m.mode?(B[R][j]=S(E[R].lastCount+m.length,m.mode)-S(E[R].lastCount,m.mode),E[R].lastCount+=m.length):(E[R]&&(E[R].lastCount=m.length),B[R][j]=S(m.length,m.mode)+4+d.getCharCountIndicator(m.mode,z))}}U=A}for(let $=0;$<U.length;$++)B[U[$]].end=0;return{map:B,table:E}}function V(I,z){let E;const B=d.getBestModeForData(I);if(E=d.from(z,B),E!==d.BYTE&&E.bit<B.bit)throw new Error('"'+I+'" cannot be encoded with mode '+d.toString(E)+`.
 Suggested mode is: `+d.toString(B));switch(E===d.KANJI&&!a.isKanjiModeEnabled()&&(E=d.BYTE),E){case d.NUMERIC:return new l(I);case d.ALPHANUMERIC:return new r(I);case d.KANJI:return new n(I);case d.BYTE:return new s(I)}}t.fromArray=function(z){return z.reduce(function(E,B){return typeof B=="string"?E.push(V(B,null)):B.data&&E.push(V(B.data,B.mode)),E},[])},t.fromString=function(z,E){const B=y(z,a.isKanjiModeEnabled()),U=L(B),$=M(U,E),T=o.find_path($.map,"start","end"),A=[];for(let k=1;k<T.length-1;k++)A.push($.table[T[k]].node);return t.fromArray(w(A))},t.rawSplit=function(z){return t.fromArray(y(z,a.isKanjiModeEnabled()))}})(gt)),gt}var Ds;function ir(){if(Ds)return nt;Ds=1;const t=Ee(),d=St(),l=Vn(),r=On(),s=Gn(),n=Kn(),i=Qn(),a=Js(),o=Jn(),g=Zn(),x=Xn(),y=Te(),S=ar();function w($,T){const A=$.size,k=n.getPositions(T);for(let m=0;m<k.length;m++){const j=k[m][0],C=k[m][1];for(let R=-1;R<=7;R++)if(!(j+R<=-1||A<=j+R))for(let P=-1;P<=7;P++)C+P<=-1||A<=C+P||(R>=0&&R<=6&&(P===0||P===6)||P>=0&&P<=6&&(R===0||R===6)||R>=2&&R<=4&&P>=2&&P<=4?$.set(j+R,C+P,!0,!0):$.set(j+R,C+P,!1,!0))}}function L($){const T=$.size;for(let A=8;A<T-8;A++){const k=A%2===0;$.set(A,6,k,!0),$.set(6,A,k,!0)}}function M($,T){const A=s.getPositions(T);for(let k=0;k<A.length;k++){const m=A[k][0],j=A[k][1];for(let C=-2;C<=2;C++)for(let R=-2;R<=2;R++)C===-2||C===2||R===-2||R===2||C===0&&R===0?$.set(m+C,j+R,!0,!0):$.set(m+C,j+R,!1,!0)}}function V($,T){const A=$.size,k=g.getEncodedBits(T);let m,j,C;for(let R=0;R<18;R++)m=Math.floor(R/3),j=R%3+A-8-3,C=(k>>R&1)===1,$.set(m,j,C,!0),$.set(j,m,C,!0)}function I($,T,A){const k=$.size,m=x.getEncodedBits(T,A);let j,C;for(j=0;j<15;j++)C=(m>>j&1)===1,j<6?$.set(j,8,C,!0):j<8?$.set(j+1,8,C,!0):$.set(k-15+j,8,C,!0),j<8?$.set(8,k-j-1,C,!0):j<9?$.set(8,15-j-1+1,C,!0):$.set(8,15-j-1,C,!0);$.set(k-8,8,1,!0)}function z($,T){const A=$.size;let k=-1,m=A-1,j=7,C=0;for(let R=A-1;R>0;R-=2)for(R===6&&R--;;){for(let P=0;P<2;P++)if(!$.isReserved(m,R-P)){let G=!1;C<T.length&&(G=(T[C]>>>j&1)===1),$.set(m,R-P,G),j--,j===-1&&(C++,j=7)}if(m+=k,m<0||A<=m){m-=k,k=-k;break}}}function E($,T,A){const k=new l;A.forEach(function(P){k.put(P.mode.bit,4),k.put(P.getLength(),y.getCharCountIndicator(P.mode,$)),P.write(k)});const m=t.getSymbolTotalCodewords($),j=a.getTotalCodewordsCount($,T),C=(m-j)*8;for(k.getLengthInBits()+4<=C&&k.put(0,4);k.getLengthInBits()%8!==0;)k.putBit(0);const R=(C-k.getLengthInBits())/8;for(let P=0;P<R;P++)k.put(P%2?17:236,8);return B(k,$,T)}function B($,T,A){const k=t.getSymbolTotalCodewords(T),m=a.getTotalCodewordsCount(T,A),j=k-m,C=a.getBlocksCount(T,A),R=k%C,P=C-R,G=Math.floor(k/C),te=Math.floor(j/C),je=te+1,fe=G-te,Le=new o(fe);let Ne=0;const ae=new Array(C),ge=new Array(C);let xe=0;const $e=new Uint8Array($.buffer);for(let ie=0;ie<C;ie++){const oe=ie<P?te:je;ae[ie]=$e.slice(Ne,Ne+oe),ge[ie]=Le.encode(ae[ie]),Ne+=oe,xe=Math.max(xe,oe)}const de=new Uint8Array(k);let Y=0,J,W;for(J=0;J<xe;J++)for(W=0;W<C;W++)J<ae[W].length&&(de[Y++]=ae[W][J]);for(J=0;J<fe;J++)for(W=0;W<C;W++)de[Y++]=ge[W][J];return de}function U($,T,A,k){let m;if(Array.isArray($))m=S.fromArray($);else if(typeof $=="string"){let G=T;if(!G){const te=S.rawSplit($);G=g.getBestVersionForData(te,A)}m=S.fromString($,G||40)}else throw new Error("Invalid data");const j=g.getBestVersionForData(m,A);if(!j)throw new Error("The amount of data is too big to be stored in a QR Code");if(!T)T=j;else if(T<j)throw new Error(`
The chosen QR Code version cannot contain this amount of data.
Minimum version required to store current data is: `+j+`.
`);const C=E(T,A,m),R=t.getSymbolSize(T),P=new r(R);return w(P,T),L(P),M(P,T),I(P,A,0),T>=7&&V(P,T),z(P,C),isNaN(k)&&(k=i.getBestMask(P,I.bind(null,P,A))),i.applyMask(k,P),I(P,A,k),{modules:P,version:T,errorCorrectionLevel:A,maskPattern:k,segments:m}}return nt.create=function(T,A){if(typeof T>"u"||T==="")throw new Error("No input text");let k=d.M,m,j;return typeof A<"u"&&(k=d.from(A.errorCorrectionLevel,d.M),m=g.from(A.version),j=i.from(A.maskPattern),A.toSJISFunc&&t.setToSJISFunction(A.toSJISFunc)),U(T,m,k,j)},nt}var jt={},Nt={},Us;function en(){return Us||(Us=1,(function(t){function d(l){if(typeof l=="number"&&(l=l.toString()),typeof l!="string")throw new Error("Color should be defined as hex string");let r=l.slice().replace("#","").split("");if(r.length<3||r.length===5||r.length>8)throw new Error("Invalid hex color: "+l);(r.length===3||r.length===4)&&(r=Array.prototype.concat.apply([],r.map(function(n){return[n,n]}))),r.length===6&&r.push("F","F");const s=parseInt(r.join(""),16);return{r:s>>24&255,g:s>>16&255,b:s>>8&255,a:s&255,hex:"#"+r.slice(0,6).join("")}}t.getOptions=function(r){r||(r={}),r.color||(r.color={});const s=typeof r.margin>"u"||r.margin===null||r.margin<0?4:r.margin,n=r.width&&r.width>=21?r.width:void 0,i=r.scale||4;return{width:n,scale:n?4:i,margin:s,color:{dark:d(r.color.dark||"#000000ff"),light:d(r.color.light||"#ffffffff")},type:r.type,rendererOpts:r.rendererOpts||{}}},t.getScale=function(r,s){return s.width&&s.width>=r+s.margin*2?s.width/(r+s.margin*2):s.scale},t.getImageWidth=function(r,s){const n=t.getScale(r,s);return Math.floor((r+s.margin*2)*n)},t.qrToImageData=function(r,s,n){const i=s.modules.size,a=s.modules.data,o=t.getScale(i,n),g=Math.floor((i+n.margin*2)*o),x=n.margin*o,y=[n.color.light,n.color.dark];for(let S=0;S<g;S++)for(let w=0;w<g;w++){let L=(S*g+w)*4,M=n.color.light;if(S>=x&&w>=x&&S<g-x&&w<g-x){const V=Math.floor((S-x)/o),I=Math.floor((w-x)/o);M=y[a[V*i+I]?1:0]}r[L++]=M.r,r[L++]=M.g,r[L++]=M.b,r[L]=M.a}}})(Nt)),Nt}var Fs;function or(){return Fs||(Fs=1,(function(t){const d=en();function l(s,n,i){s.clearRect(0,0,n.width,n.height),n.style||(n.style={}),n.height=i,n.width=i,n.style.height=i+"px",n.style.width=i+"px"}function r(){try{return document.createElement("canvas")}catch{throw new Error("You need to specify a canvas element")}}t.render=function(n,i,a){let o=a,g=i;typeof o>"u"&&(!i||!i.getContext)&&(o=i,i=void 0),i||(g=r()),o=d.getOptions(o);const x=d.getImageWidth(n.modules.size,o),y=g.getContext("2d"),S=y.createImageData(x,x);return d.qrToImageData(S.data,n,o),l(y,g,x),y.putImageData(S,0,0),g},t.renderToDataURL=function(n,i,a){let o=a;typeof o>"u"&&(!i||!i.getContext)&&(o=i,i=void 0),o||(o={});const g=t.render(n,i,o),x=o.type||"image/png",y=o.rendererOpts||{};return g.toDataURL(x,y.quality)}})(jt)),jt}var $t={},qs;function lr(){if(qs)return $t;qs=1;const t=en();function d(s,n){const i=s.a/255,a=n+'="'+s.hex+'"';return i<1?a+" "+n+'-opacity="'+i.toFixed(2).slice(1)+'"':a}function l(s,n,i){let a=s+n;return typeof i<"u"&&(a+=" "+i),a}function r(s,n,i){let a="",o=0,g=!1,x=0;for(let y=0;y<s.length;y++){const S=Math.floor(y%n),w=Math.floor(y/n);!S&&!g&&(g=!0),s[y]?(x++,y>0&&S>0&&s[y-1]||(a+=g?l("M",S+i,.5+w+i):l("m",o,0),o=0,g=!1),S+1<n&&s[y+1]||(a+=l("h",x),x=0)):o++}return a}return $t.render=function(n,i,a){const o=t.getOptions(i),g=n.modules.size,x=n.modules.data,y=g+o.margin*2,S=o.color.light.a?"<path "+d(o.color.light,"fill")+' d="M0 0h'+y+"v"+y+'H0z"/>':"",w="<path "+d(o.color.dark,"stroke")+' d="'+r(x,g,o.margin)+'"/>',L='viewBox="0 0 '+y+" "+y+'"',V='<svg xmlns="http://www.w3.org/2000/svg" '+(o.width?'width="'+o.width+'" height="'+o.width+'" ':"")+L+' shape-rendering="crispEdges">'+S+w+`</svg>
`;return typeof a=="function"&&a(null,V),V},$t}var _s;function dr(){if(_s)return Pe;_s=1;const t=Hn(),d=ir(),l=or(),r=lr();function s(n,i,a,o,g){const x=[].slice.call(arguments,1),y=x.length,S=typeof x[y-1]=="function";if(!S&&!t())throw new Error("Callback required as last argument");if(S){if(y<2)throw new Error("Too few arguments provided");y===2?(g=a,a=i,i=o=void 0):y===3&&(i.getContext&&typeof g>"u"?(g=o,o=void 0):(g=o,o=a,a=i,i=void 0))}else{if(y<1)throw new Error("Too few arguments provided");return y===1?(a=i,i=o=void 0):y===2&&!i.getContext&&(o=a,a=i,i=void 0),new Promise(function(w,L){try{const M=d.create(a,o);w(n(M,i,o))}catch(M){L(M)}})}try{const w=d.create(a,o);g(null,n(w,i,o))}catch(w){g(w)}}return Pe.create=d.create,Pe.toCanvas=s.bind(null,l.render),Pe.toDataURL=s.bind(null,l.renderToDataURL),Pe.toString=s.bind(null,function(n,i,a){return r.render(n,a)}),Pe}var cr=dr();const ur=ln(cr);function _(t){return t==null?"":String(t).replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;")}function f(t){if(t==null||t==="")return"";const l=String(t).split(/\r?\n/),r=s=>{if(!s)return"";try{const n=Intl;if(typeof Intl<"u"&&n.Segmenter){const i=new n.Segmenter("th",{granularity:"word"}),a=[];for(const o of i.segment(s)){const g=o.segment;/^\s+$/.test(g)?a.push(" "):a.push(`<span class="w-seg">${_(g)}</span>`)}return a.join("")}}catch{}return _(s)};return l.map(r).join("<br/>")}function kt(t){try{const d=ur.create(t,{errorCorrectionLevel:"M"}),l=d.modules.size,r=2,s=l+r*2;let n="";for(let a=0;a<l;a++)for(let o=0;o<l;o++)d.modules.get(a,o)&&(n+=`<rect x="${o+r}" y="${a+r}" width="1" height="1" fill="#0f172a"/>`);const i=`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${s} ${s}" width="200" height="200" shape-rendering="crispEdges"><rect width="100%" height="100%" fill="#ffffff"/>${n}</svg>`;return`data:image/svg+xml;utf8,${encodeURIComponent(i)}`}catch{return""}}function mr(t,d,l,r=[]){var be,ke,se,ve,ze,De,me,pe,ne,Ue,Fe,Qe,qe,Re,K,O;const s=t.type==="supplier",n=t.type==="location",i=s?t:null,a=n?t:null,o=t.type==="drink_store"?t:null,g=s?i.name:n?a.name:o.storeName,x=Pn(s?"ซัพพลายเออร์":n?"ทำเล":"ร้านน้ำ",g),y=s?i.chineseName:n?a.foreignName:o.chineseName,S=s?i.category:n?a.locationType==="mall"?"ห้างสรรพสินค้า":a.locationType:o.storeCategory||"เรฟร้านน้ำ",w=s?i.marketOrCity:n?a.location.addressText||a.zoneOrFloor:o.city,L=t.country==="TH"?"ประเทศไทย (TH)":"ประเทศจีน (CN)",M=typeof window<"u"&&window.location.origin&&!window.location.hostname.includes("localhost")&&!window.location.hostname.includes("127.0.0.1")?`${window.location.origin}${window.location.pathname}`:"https://vitcha-sourcing-fxjw.onrender.com/",V=M.endsWith("/")?M:`${M}/`,I=`${V}?view=${encodeURIComponent(t.id)}&type=${encodeURIComponent(t.type)}`,z=kt(I),E=[];i?((be=i.photos.storefrontAndAtmosphere)==null||be.forEach((u,h)=>E.push({url:u,label:`ป้ายหน้าร้าน / บรรยากาศ #${h+1}`})),(ke=i.photos.contactCards)==null||ke.forEach((u,h)=>E.push({url:u,label:`นามบัตร / WeChat #${h+1}`})),(se=i.catalogItems)==null||se.forEach((u,h)=>{u.photo&&E.push({url:u.photo,label:u.name?`สินค้า: ${u.name}`:`รายการสินค้า #${h+1}`})})):a?((ve=a.photos.storefrontAndAtmosphere)==null||ve.forEach((u,h)=>E.push({url:u,label:`หน้าร้าน / ทางเดิน #${h+1}`})),(ze=a.photos.floorPlanAndSpecs)==null||ze.forEach((u,h)=>E.push({url:u,label:`ผังห้อง / งานระบบ #${h+1}`})),(De=a.photos.surroundingNeighbors)==null||De.forEach((u,h)=>E.push({url:u,label:`ร้านข้างเคียง #${h+1}`})),(me=a.photos.contactCards)==null||me.forEach((u,h)=>E.push({url:u,label:`นามบัตร / เอกสารสัญญา #${h+1}`}))):o&&((pe=o.photos.storefrontAndAtmosphere)==null||pe.forEach((u,h)=>E.push({url:u,label:`หน้าร้าน / บรรยากาศ #${h+1}`})),(ne=o.photos.menuBoard)==null||ne.forEach((u,h)=>E.push({url:u,label:`ป้ายเมนู / ราคา #${h+1}`})),(Ue=o.photos.drinkCups)==null||Ue.forEach((u,h)=>E.push({url:u,label:`แก้วเครื่องดื่ม #${h+1}`})),(Fe=o.drinkItems)==null||Fe.forEach((u,h)=>{u.photo&&E.push({url:u.photo,label:u.name?`เมนูชิม: ${u.name}`:`แก้วชิม #${h+1}`})}));const B=le(t),U=[];B.forEach((u,h)=>{U.push({label:u.label||`คลิปเสียงหน้างาน #${h+1}`,durationSec:u.durationSec||0,url:u.url,source:"บันทึกเสียงหลักหน้างานจริง"})}),i?(i.catalogItems||[]).forEach((u,h)=>{le(u).forEach((p,v)=>{U.push({label:p.label||`คลิปเสียงสินค้า #${v+1}`,durationSec:p.durationSec||0,url:p.url,source:`สินค้า: ${u.name||`รายการที่ #${h+1}`}`})})}):o&&(o.drinkItems||[]).forEach((u,h)=>{le(u).forEach((p,v)=>{U.push({label:p.label||`คลิปเสียงเมนู #${v+1}`,durationSec:p.durationSec||0,url:p.url,source:`เมนู: ${u.name||`แก้วที่ #${h+1}`}`})})});const $=Array.isArray(t.videos)?t.videos.filter(Boolean):[],T=Array.isArray(t.viewedBy)?t.viewedBy:[],A=Array.isArray(t.likes)?t.likes:[],k=Array.isArray(t.reviewerNotes)?t.reviewerNotes:[],m=Ys(t).sort((u,h)=>(Date.parse(u.timestamp)||0)-(Date.parse(h.timestamp)||0)),j=u=>{var h;return((h=r.find(p=>p.id===u||p.alias===u||p.name===u))==null?void 0:h.alias)||u},C=`ฉันจะเป็นหัวแถว-${g.replace(/[^a-zA-Z0-9ก-๙_-]/g,"_")}.pdf`,P={awaiting:"พาร์ท 1: รอรับช่วงต่อ",rfq_sent:"พาร์ท 2: ขอสเปก / ส่ง RFQ",sample_test:"พาร์ท 3: ทดสอบตัวอย่าง Lab / R&D",negotiate:"พาร์ท 4: ต่อรองราคา & MOQ",approved:"พาร์ท 5: ตัวเต็งอนุมัติ",ordered:"พาร์ท 6: สั่งซื้อสำเร็จ"}[t.handoffStage||"awaiting"]||"พาร์ท 1: รอรับช่วงต่อ",G=u=>{const h=Ge(u);try{const p=new URL(h,V);return["http:","https:"].includes(p.protocol)?p.href:""}catch{return""}},te=(u,h)=>{const p=G(u);return p?`<div class="media-access"><a href="${_(p)}" target="_blank" rel="noopener noreferrer">${f(h)}</a><img class="media-qr" width="56" height="56" src="${kt(p)}" alt="QR เปิดไฟล์" /></div>`:""},je=U.length>0?`<div class="media-grid">
          ${U.map((u,h)=>`
              <div class="voice-card">
                <div class="voice-icon">▶</div>
                <div class="voice-meta">
                  <div class="voice-title">${f(`${h+1}. ${u.label}`)}</div>
                  <div class="voice-sub">${f(`${u.source} · ${u.durationSec?`ความยาว ${u.durationSec} วินาที`:"ไม่ระบุความยาวเสียง"}`)}</div>
                  ${te(u.url,"เปิดฟังเสียงบันทึก")}
                </div>
              </div>`).join("")}
        </div>`:`<div class="empty-note">${f("ไม่มีไฟล์เสียงบันทึกในรายการนี้")}</div>`,fe=(u,h)=>`<figure class="video-card">
    <div class="video-thumb-wrap"><img class="video-thumb-img" alt="${_(h)}" crossorigin="anonymous" data-video-src="${_(G(u))}" hidden /><p class="video-thumb-status">กำลังเตรียมภาพจากคลิปนี้…</p></div>
    <figcaption class="video-caption"><div class="video-caption-title">${f(h)}</div>${te(u,"เปิดคลิปพร้อมเสียง")}</figcaption>
  </figure>`,Le=$.length?`<div class="video-grid media-masonry">${$.map((u,h)=>fe(u,`คลิปวิดีโอหน้างาน #${h+1}`)).join("")}</div>`:`<div class="empty-note">${f("ไม่มีคลิปวิดีโอในรายการนี้")}</div>`,Ne=u=>u&&!Number.isNaN(Date.parse(u))?new Date(u).toLocaleString("th-TH"):u||"ไม่ระบุเวลา",ae=u=>{const h=new URL("logo.jpg",V).href;let p=h;try{p=new URL(Oe(u.avatar||h,96),V).href}catch{}return`<img class="person-avatar" width="27" height="27" src="${_(p)}" crossorigin="anonymous" alt="${_(`โปรไฟล์ ${u.name}`)}" onerror="${_(`this.onerror=null;this.src=${JSON.stringify(h)}`)}" />`},ge=(u,h,p=!1)=>{const v=tt(r,u.authorId,u.author,u.authorAvatar),b=`${p?"ตอบกลับ":"ความคิดเห็น"} #${h}`,X=Ct(u),he=u.voiceUrl||u.audioUrl;return`<article class="comment-box${p?" reply-item":""}" data-comment-id="${_(u.id)}">
      <div class="comment-header">${ae(v)}<strong class="comment-author">${f(`${b} · ${v.name}`)}</strong><time class="comment-time">${f(Ne(u.timestamp))}</time></div>
      ${"replyToAuthor"in u&&u.replyToAuthor?`<p class="comment-target">${f(`ตอบกลับ ${u.replyToAuthor}`)}</p>`:""}
      ${u.text?`<div class="comment-body">${f(u.text)}</div>`:""}
      ${X.length?`<div class="comment-media media-masonry">${X.map((re,We)=>{const Ae=`${re.type==="video"?"วิดีโอ":"ภาพ"}แนบ ${We+1} · ${b}${re.name?` · ${re.name}`:""}`;return re.type==="video"?fe(re.url,Ae):`<figure class="photo-card"><img src="${_(Oe(re.url,2e3))}" crossorigin="anonymous" alt="${_(Ae)}" /><figcaption class="photo-caption">${f(Ae)}${te(Os(re.url),"เปิดภาพต้นฉบับ")}</figcaption></figure>`}).join("")}</div>`:""}
      ${he?`<div class="comment-audio"><strong>${f(`เสียงแนบ · ${b}${u.duration?` · ${u.duration} วินาที`:""}`)}</strong>${te(he,"เปิดฟังเสียง")}</div>`:""}
    </article>`},xe=k.map((u,h)=>`<section class="comment-thread">${ge(u,String(h+1))}${(u.replies||[]).map((p,v)=>ge(p,`${h+1}.${v+1}`,!0)).join("")}</section>`).join(""),$e=(u,h)=>u.reduce((p,v,b)=>(b%2===0&&p.push([]),p[p.length-1].push(v),p),[]).map(p=>`<div class="${h}">${p.join("")}</div>`).join(""),de=(u,h)=>`<div class="item-report-photo${u?"":" item-report-photo-missing"}">${u?`<img src="${_(Oe(u,2e3))}" crossorigin="anonymous" alt="${_(h)}" />`:`<div class="item-report-photo-empty">${f("ยังไม่มีภาพรายการนี้")}</div>`}</div>`,Y=(u,h)=>`<div class="item-report-field"><dt>${f(u)}</dt><dd>${h}</dd></div>`;let J="";if(s&&i){const u=(i.catalogItems||[]).map((h,p)=>{const v=h.name||`รายการที่ #${p+1}`,b=le(h),X=Vs(h,i.country),he=`<span class="cell-price-green">${X?`${X.currency==="THB"?"฿":"¥"}${X.amount.toLocaleString()}`:"-"}</span>${(X==null?void 0:X.currency)==="CNY"?`<span class="item-report-conversion">${f(`(≈ ฿${d(X.amount).toLocaleString()})`)}</span>`:""}`;return`<article class="item-report-card" data-item-id="${_(h.id)}">
        ${de(h.photo,v)}
        <div class="item-report-content">
          <div class="item-report-number">${f(`รายการ ${p+1}`)}</div>
          <h3 class="item-report-title">${f(v)}</h3>
          <dl class="item-report-fields">
            ${Y("ขนาด / สเปก",f(h.dimensions||"-"))}
            ${Y("น้ำหนัก",f(h.weightKg||"-"))}
            ${Y(i.country==="TH"?"ราคาประเมิน (บาท / THB)":"ราคาประเมิน",he)}
          </dl>
          ${h.memo?`<div class="item-report-notes"><strong>${f("รายละเอียดเพิ่มเติม")}</strong><div>${f(h.memo)}</div></div>`:""}
          ${b.length?`<div class="cell-voice-badge">${f(`แนบเสียงบันทึก ${b.length} คลิป`)}</div>`:""}
        </div>
      </article>`});J=`<section class="section-box item-report-section" id="record-items">
      <div class="section-title">${f(`กลุ่มที่ 3: รายการสินค้า / อุปกรณ์ / วัตถุดิบ (${u.length} รายการ)`)}</div>
      ${u.length?`<div class="item-report-grid">${$e(u,"item-report-row")}</div>`:`<div class="empty-note">${f("ไม่มีรายการย่อย")}</div>`}
    </section>`}else if(o){const u=(o.drinkItems||[]).map((h,p)=>{const v=h.name||`แก้วที่ #${p+1}`,b=le(h),X=typeof h.priceRmb=="number",he=typeof h.priceThb=="number",re=`<span class="cell-price-amber">${X?`¥${h.priceRmb.toLocaleString()}`:he?`฿${h.priceThb.toLocaleString()}`:"-"}</span>${X?`<span class="item-report-conversion">${f(`(≈ ฿${d(h.priceRmb).toLocaleString()})`)}</span>`:""}`;return`<article class="item-report-card" data-item-id="${_(h.id)}">
        ${de(h.photo,v)}
        <div class="item-report-content">
          <div class="item-report-number">${f(`เมนู ${p+1}`)}</div>
          <h3 class="item-report-title">${f(v)}</h3>
          <dl class="item-report-fields">
            ${Y("ขนาดแก้ว",f(h.cupSize||"-"))}
            ${Y("ต่อยอดเมนูของเรา",f(h.fitMenuTarget||"-"))}
            ${Y("ราคาขาย",re)}
          </dl>
          ${h.gimmickNotes?`<div class="item-report-notes"><strong>${f("กิมมิก / รายละเอียด")}</strong><div>${f(h.gimmickNotes)}</div></div>`:""}
          ${b.length?`<div class="cell-voice-badge">${f(`แนบเสียงบันทึก ${b.length} คลิป`)}</div>`:""}
        </div>
      </article>`});J=`<section class="section-box item-report-section" id="record-items">
      <div class="section-title">${f(`กลุ่มที่ 3: เมนูที่ชิม & การถอดรหัสสูตร (${u.length} เมนู)`)}</div>
      ${u.length?`<div class="item-report-grid">${$e(u,"item-report-row")}</div>`:`<div class="empty-note">${f("ไม่มีเมนูย่อย")}</div>`}
    </section>`}if(a){const u={usableAreaSqm:"พื้นที่ใช้สอย (ตร.ม.)",frontageWidthM:"หน้ากว้าง (เมตร)",ceilingHeightM:"เพดานสูง (เมตร)",layoutFormat:"รูปแบบพื้นที่",electricalPower:"ระบบไฟฟ้า",hasWaterInflow:"ท่อน้ำดี",hasDrainage:"ท่อน้ำทิ้ง",hasGreaseTrap:"ถังดักไขมัน",riderAccessNotes:"การเข้าถึงของไรเดอร์",rentModel:"รูปแบบค่าเช่า",monthlyRentThb:"ค่าเช่า (บาท/เดือน)",monthlyRentRmb:"ค่าเช่า (หยวน/เดือน)",gpPercent:"ส่วนแบ่ง GP (%)",serviceFeePerSqm:"ค่าส่วนกลาง/ตร.ม.",depositMonths:"เงินประกัน (เดือน)",leasePeriodYears:"ระยะสัญญา (ปี)",fitOutPeriodDays:"ระยะตกแต่งปลอดค่าเช่า (วัน)",contactPerson:"ผู้ติดต่อ",contactPhone:"โทรศัพท์",contactLineWechat:"LINE / WeChat"},h={inline:"ห้องแถว",corner:"ห้องมุม",island:"พื้นที่เกาะกลาง",kiosk:"คีออสก์",fixed:"ค่าเช่าคงที่",gp:"ส่วนแบ่งยอดขาย",hybrid:"ค่าเช่าคงที่และส่วนแบ่ง"},p={...a.spaceSpecs,...a.leaseTerms,...a.unitNumber?{unitNumber:a.unitNumber}:{}};J=`<div class="section-box location-details"><div class="section-title">กลุ่มที่ 3: ข้อมูลพื้นที่และเงื่อนไขเช่า</div><div class="info-grid">${Object.entries(p).filter(([,v])=>v!=null&&v!=="").map(([v,b])=>`<div class="info-item"><span class="info-label">${f(v==="unitNumber"?"เลขที่ห้อง":u[v]||v)}</span><span class="info-value">${f(typeof b=="boolean"?b?"มี":"ไม่มี":h[String(b)]||String(b))}</span></div>`).join("")}</div></div>`}const W=t.attachedFiles||[],ie=W.length>0?`<div class="section-box">
          <div class="section-title">${f(`เอกสารและไฟล์แนบเพิ่มเติม (Attached Documents) — (${W.length} ไฟล์)`)}</div>
          <div class="media-subhead">${f("สแกน QR Code หรือคลิกลิงก์ด้านล่างเพื่อเปิดไฟล์บน Google Drive / เบราว์เซอร์:")}</div>
          ${W.map((u,h)=>{const p=u.url?kt(u.url):"",v=(u.name.split(".").pop()||"FILE").toUpperCase(),b=u.size?u.size<1024*1024?`${(u.size/1024).toFixed(1)} KB`:`${(u.size/(1024*1024)).toFixed(1)} MB`:"";return`
              <div class="file-attachment-card">
                <div class="file-attachment-info">
                  <div class="file-attachment-name">#${h+1} [${_(v)}] ${_(u.name)}</div>
                  <div class="file-attachment-meta">
                    ${b?`ขนาด: ${b}`:""}
                    ${u.uploadedAt?` · บันทึกเมื่อ: ${new Date(u.uploadedAt).toLocaleDateString("th-TH")}`:""}
                  </div>
                  <div class="file-attachment-link">
                    <a href="${_(u.url)}" target="_blank" rel="noopener noreferrer">${_(u.url)}</a>
                  </div>
                </div>
                ${p?`<div class="file-attachment-qr">
                        <img src="${p}" alt="QR" />
                        <div style="font-size:7px;text-align:center;color:#059669;font-weight:700;margin-top:2px;">Scan Open</div>
                      </div>`:""}
              </div>`}).join("")}
        </div>`:"",oe=E.length?`<div class="photo-grid">${$e(E.map((u,h)=>`<div class="photo-card">
        <img src="${_(Oe(u.url,2e3))}" crossorigin="anonymous" alt="${_(u.label)}" />
        <div class="photo-caption">${f(`รูปที่ ${h+1}: ${u.label}`)}</div>
      </div>`),"photo-report-row")}</div>`:`<div class="empty-note">${f("ไม่มีรูปภาพในรายการนี้")}</div>`,Me=m.map((u,h)=>{const p=Ws(t,r,u);return`<article class="audit-event" data-activity-id="${_(u.id||h)}">${ae(p)}<div class="audit-event-content"><div class="audit-event-heading"><strong>${f(p.name)}</strong><span>${f(Number.isNaN(Date.parse(u.timestamp))?u.timestamp:new Date(u.timestamp).toLocaleString("th-TH"))}</span></div><div class="audit-action">${f(u.action)}</div></div></article>`}).join(""),ce=T.length>0?`<table class="data-table" style="margin-top:10px;">
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
            ${T.map((u,h)=>`
              <tr>
                <td style="text-align:center;">${h+1}</td>
                <td><div class="cell-title">${f(`${u.alias} (${u.name})`)}</div></td>
                <td><div class="cell-text">${_(u.role.toUpperCase())}</div></td>
                <td><div class="cell-sub">${_(new Date(u.lastViewedAt).toLocaleString("th-TH"))}</div></td>
                <td style="text-align:center;font-weight:700;">${f(`${u.viewCount||1} ครั้ง`)}</td>
              </tr>`).join("")}
          </tbody>
        </table>`:`<div class="empty-note" style="margin-top:8px;">${f("ยังไม่มีประวัติผู้เปิดอ่านเพิ่มเติม")}</div>`,Ke=s?`คะแนนประเมิน ${(i==null?void 0:i.rating)??"-"}/5 ดาว (${i!=null&&i.isFactory?"โรงงานผลิต":"หน้าร้าน/โชว์รูม"})`:n?`คนสัญจร ${(a==null?void 0:a.ratings.footTraffic)??"-"}/5 · การมองเห็น ${(a==null?void 0:a.ratings.visibility)??"-"}/5 · การเข้าถึง ${(a==null?void 0:a.ratings.accessibility)??"-"}/5 · ความคุ้มค่า ${(a==null?void 0:a.ratings.valueRoi)??"-"}/5`:`รสชาติ ${o==null?void 0:o.ratings.taste}/5 · ดีไซน์ ${o==null?void 0:o.ratings.aesthetics}/5 · คุ้มค่า ${o==null?void 0:o.ratings.value}/5 · ความไว ${o==null?void 0:o.ratings.speed}/5`;return`<!DOCTYPE html>
<html lang="th">
<head>
  <meta charset="UTF-8" />
  <base href="${_(V)}" />
  <meta name="viewport" content="width=840, initial-scale=0.45, minimum-scale=0.3, maximum-scale=2.0, user-scalable=yes" />
  <title>ฉันจะเป็นหัวแถว - ${_(g)}</title>
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
    .audit-event { display: flex; align-items: flex-start; gap: 7px; border-bottom: 1px solid #e2e8f0; padding: 4px 0; margin: 0; font-size: 11.5px; overflow-wrap: anywhere; break-inside: avoid; }
    .audit-event-content { flex: 1; min-width: 0; }
    .audit-event-heading { display: flex; align-items: center; gap: 7px; font-size: 11px; break-after: avoid; }
    .audit-event-heading > span:last-child { color: #64748b; margin-left: auto; font-size: 10px; }
    img.person-avatar { display: block; width: 27px; height: 27px; border-radius: 50%; object-fit: cover; flex-shrink: 0; }
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
    .item-report-row {
      display: flex;
      align-items: stretch;
      gap: 14px;
      margin-bottom: 14px;
      break-inside: avoid;
      page-break-inside: avoid;
    }
    .item-report-card {
      width: calc((100% - 14px) / 2);
      flex: 0 0 calc((100% - 14px) / 2);
      min-width: 0;
      border: 1px solid #cbd5e1;
      border-radius: 8px;
      background: #ffffff;
      overflow-wrap: anywhere;
    }
    .item-report-photo {
      height: 240px;
      padding: 8px;
      display: flex;
      align-items: center;
      justify-content: center;
      background: #f8fafc;
      border-bottom: 1px solid #e2e8f0;
      border-radius: 8px 8px 0 0;
    }
    .item-report-photo img {
      display: block;
      width: auto;
      height: auto;
      max-width: 100%;
      max-height: 100%;
      object-fit: contain;
    }
    .item-report-photo-missing { height: 80px; }
    .item-report-photo-empty { color: #64748b; font-size: 12px; }
    .item-report-content { padding: 12px; }
    .item-report-number { font-size: 10px; color: #64748b; margin-bottom: 3px; }
    .item-report-title { margin: 0 0 10px; font-size: 15px; line-height: 1.45; color: #0f172a; }
    .item-report-fields { margin: 0; font-size: 12px; line-height: 1.5; }
    .item-report-field { padding: 6px 0; border-top: 1px solid #e2e8f0; }
    .item-report-field dt { color: #64748b; font-size: 10.5px; margin-bottom: 2px; }
    .item-report-field dd { margin: 0; color: #1e293b; }
    .item-report-conversion { display: block; font-size: 11px; color: #475569; }
    .item-report-notes { margin-top: 8px; padding-top: 8px; border-top: 1px solid #e2e8f0; font-size: 12px; line-height: 1.55; }
    .item-report-notes strong { display: block; margin-bottom: 3px; font-size: 10.5px; color: #64748b; }
    .item-report-card .w-seg { max-width: 100%; white-space: normal; overflow-wrap: anywhere; }
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
    .photo-report-row { display: flex; gap: 12px; align-items: flex-start; margin-bottom: 12px; break-inside: avoid; page-break-inside: avoid; }
    .photo-report-row > .photo-card { width: calc((100% - 12px) / 2); flex: 0 0 calc((100% - 12px) / 2); min-width: 0; margin: 0; }
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
      flex: 1;
      min-width: 0;
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
    ${In(x)}
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
      <strong style="font-size:14px;">รายงานสรุปฉบับสมบูรณ์: ${_(g)}</strong>
      <span id="status-indicator" style="font-size:12px;color:#94a3b8;margin-left:10px;">
        ${l==="pdf"?"กำลังจัดหน้าและสร้างไฟล์ PDF...":"พร้อมพิมพ์รายงาน"}
      </span>
    </div>
    <div style="display:flex;gap:8px;flex-wrap:wrap;">
      <a class="toolbar-btn btn-close" href="${_(I)}">กลับหน้ารายละเอียด</a>
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
          <div class="badge">${f(`${s?"รายงานซัพพลายเออร์ & โรงงาน":n?"รายงานสำรวจทำเล":"รายงานเรฟร้านน้ำ & R&D"} · ${L}`)}</div>
          <h1 class="brand-title">${f(g)}</h1>
          <div class="brand-sub">${f(`${y?`${y} · `:""}หมวดหมู่: ${S}`)}</div>

          <!-- At-a-glance Multimedia & Detail Counter Pills -->
          <div class="summary-pills">
            <span class="summary-pill">${f(`รูปภาพ ${E.length} รูป`)}</span>
            <span class="summary-pill">${f(`วอยซ์เสียง ${U.length} คลิป`)}</span>
            <span class="summary-pill">${f(`วิดีโอ ${$.length} คลิป`)}</span>
            <span class="summary-pill">${f(s?`สินค้า ${((i==null?void 0:i.catalogItems)||[]).length} รายการ`:n?`พื้นที่ ${((Qe=a==null?void 0:a.spaceSpecs)==null?void 0:Qe.usableAreaSqm)??"-"} ตร.ม.`:`เมนูชิม ${((o==null?void 0:o.drinkItems)||[]).length} เมนู`)}</span>
            <span class="summary-pill">${f(`คอมเมนต์ ${k.length} หัวข้อ`)}</span>
            <span class="summary-pill">${f(`ประวัติ Log ${m.length} รายการ`)}</span>
          </div>

          <div class="direct-link-bar">
            <div class="info-label" style="color:#0f172a;margin-bottom:2px;">Direct Link (Scan QR / LINE Share):</div>
            <div style="color:#059669;font-family:monospace;font-size:10px;word-break:break-all;">${_(I)}</div>
          </div>
        </div>

        <div class="header-right">
          <div class="meta-box">
            <div class="meta-platform">${f("ฉันจะเป็นหัวแถว")}</div>
            <div>LEAD THE FRONT · R&amp;D</div>
            <div style="margin-top:4px;">${f(`รหัส: ${t.id.slice(0,18)}`)}</div>
            <div>${f(`สถานะ: ${P}`)}</div>
            <div>${f(`ออกรายงาน: ${new Date().toLocaleString("th-TH")}`)}</div>
          </div>

          ${z?`<div class="qr-card">
                  <img id="report-qr-img" src="${z}" alt="QR Code" />
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
            <span class="info-value">${f(`${g}${y?` (${y})`:""}`)}</span>
          </div>
          <div class="info-item">
            <span class="info-label">${f("หมวดหมู่ & คะแนนประเมิน")}</span>
            <span class="info-value">${f(`${S} · ${Ke}`)}</span>
          </div>
          <div class="info-item">
            <span class="info-label">${f("สถานที่ / ตลาด / เมือง")}</span>
            <span class="info-value">${f(w||((qe=t.location)==null?void 0:qe.addressText)||"-")}</span>
          </div>
          <div class="info-item">
            <span class="info-label">${f("พิกัด GPS & แผนที่")}</span>
            <span class="info-value">${t.location?`${t.location.lat.toFixed(5)}, ${t.location.lng.toFixed(5)} (${_(t.location.addressText||"พิกัดหน้างาน")})`:"-"}</span>
          </div>
          <div class="info-item">
            <span class="info-label">${f("ช่องทางติดต่อ (WeChat / LINE / โทรศัพท์)")}</span>
            <span class="info-value">${f(n?`ผู้ติดต่อ: ${((Re=a==null?void 0:a.leaseTerms)==null?void 0:Re.contactPerson)||"-"} · โทร: ${((K=a==null?void 0:a.leaseTerms)==null?void 0:K.contactPhone)||"-"} · LINE / WeChat: ${((O=a==null?void 0:a.leaseTerms)==null?void 0:O.contactLineWechat)||"-"}`:`WeChat: ${(s?i==null?void 0:i.wechatId:o==null?void 0:o.wechatId)||"-"} | LINE: ${(s?i==null?void 0:i.lineId:o==null?void 0:o.lineId)||"-"} | โทร: ${(s?i==null?void 0:i.phone:o==null?void 0:o.phone)||"-"}`)}</span>
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
            <span class="info-value">${f(`กดถูกใจ ${A.length} คน · เปิดอ่านแล้ว ${T.length} คน`)}</span>
          </div>
        </div>

        ${(s?i!=null&&i.memo:o!=null&&o.tastingNotes)?`<div class="note-banner">
                <div class="note-banner-title">${f(s?"บันทึกภาพรวมหน้างาน / รายละเอียดสเปกหลัก:":"บันทึกรีวิวรสชาติ & ไอเดียเรฟหน้างาน:")}</div>
                <div class="note-banner-body">${f(s?i==null?void 0:i.memo:o==null?void 0:o.tastingNotes)}</div>
              </div>`:""}

        ${t.handoffNotes?`<div class="handoff-banner">
                <div class="handoff-banner-title">${f("โน้ตการส่งมอบงาน / ผลเจรจาทีมไทย:")}</div>
                <div class="note-banner-body">${f(t.handoffNotes)}</div>
              </div>`:""}
      </div>

      <!-- Group 2: Voice Recordings & Video Clips with Thumbnail Previews -->
      <div class="section-box">
        <div class="section-title">${f(`กลุ่มที่ 2: สื่อมัลติมีเดียหน้างาน — วอยซ์เสียงบันทึก (${U.length} คลิป) & วิดีโอ (${$.length} คลิป)`)}</div>
        <div class="media-subhead">${f(`ไฟล์เสียงบันทึกหน้างานจริง (${U.length} คลิป):`)}</div>
        ${je}
        <div class="media-subhead" style="margin-top:10px;">${f(`คลิปวิดีโอหน้างานพร้อมภาพ Thumbnail พรีวิว (${$.length} คลิป):`)}</div>
        ${Le}
      </div>

      <!-- Group 3: Catalog / Drink Items -->
      ${J}

      <!-- Attached Documents & Files -->
      ${ie}

      <!-- Group 4: All Photos of This Item -->
      <div class="section-box">
        <div class="section-title">${f(`กลุ่มที่ 4: แกลเลอรีภาพถ่ายทั้งหมดของรายการนี้ (${E.length} รูป)`)}</div>
        ${oe}
      </div>

      <div class="section-box comments-report" id="record-comments">
        <div class="section-title">${f(`กลุ่มที่ 5: ความคิดเห็นและการตอบกลับ (${k.length} ความคิดเห็น)`)}</div>
        ${xe||'<div class="empty-note">ยังไม่มีความคิดเห็น</div>'}
      </div>

      <!-- Group 6: Activity & Handoff Log + Viewer Log -->
      <div class="section-box activity-report" id="activity-history">
        <div class="section-title">${f(`กลุ่มที่ 6: ประวัติการดำเนินงาน (${m.length} เหตุการณ์)`)}</div>
        <p class="audit-intro">${f("วันเวลา · ผู้ดำเนินการ · กิจกรรม เรียงจากเก่าไปใหม่")}</p>
        ${Me}
        ${T.length?`<h3 class="audit-viewers">${f("ผู้เปิดอ่านรายการ")}</h3>${ce}`:""}
      </div>
    </div>
  </div>

  <script>
    ${Bn(x)}
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
        var columns = 2;
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
          margin: [8, 8, 16, 8],
          filename: ${JSON.stringify(C)},
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
            avoid: ['.location-details', '.item-report-row', '.photo-report-row', '.pdf-media-row', 'tr', '.info-item', '.voice-card', '.video-card', '.photo-card', '.comment-header', '.comment-audio', '.note-banner', '.handoff-banner', '.report-header', '.file-attachment-card', '.audit-stage', '.audit-event', '.audit-change', '.audit-event-heading', '.audit-media']
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
        }).toCanvas().toPdf().get('pdf').then(function(pdf) {
          addReportFooters(pdf);
        }).save().then(function() {
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
</html>`}function Hs(t,d,l,r=[]){const s=mr(t,d,l,r),n=new Blob([s],{type:"text/html;charset=utf-8"}),i=URL.createObjectURL(n);if(!window.open(i,"_blank")){const o=document.createElement("a");o.href=i,o.target="_blank",o.click()}setTimeout(()=>URL.revokeObjectURL(i),6e4)}const br=({item:t,isOpen:d,onClose:l,onShareToLine:r})=>{var Pt,Lt,Mt,zt,Dt,Ut,Ft,qt,_t,Ht,Vt,Ot,Gt,Kt,Qt,Wt,Yt,Jt,Zt,Xt,es,ts,ss,ns,rs;const{currentUser:s,convertCnyToThb:n,addReviewerNote:i,addReviewReply:a,updatePipelineStatus:o,toggleLikeItem:g,suppliers:x,drinkStores:y,locations:S,users:w,quickMessages:L,recordItemView:M,canEditItems:V,canDeleteItems:I,deleteSupplier:z,deleteStoreInspo:E,deleteLocation:B,canComment:U,openEditItem:$}=dn(),T=t&&t.type==="supplier"?x.find(c=>c.id===t.id):null,A=t&&t.type==="drink_store"?y.find(c=>c.id===t.id):null,k=t&&t.type==="location"?S.find(c=>c.id===t.id):null,m=T||A||k||t,[j,C]=Q.useState(null),[R,P]=Q.useState(""),[G,te]=Q.useState(null),[je,fe]=Q.useState({}),[Le,Ne]=Q.useState({}),[ae,ge]=Q.useState([]),[xe,$e]=Q.useState({}),de=Ce.useRef({}),[Y,J]=Q.useState(!1),W=Ce.useRef(!1),ie=(c,N)=>{de.current[c]=N,$e(D=>({...D,[c]:N}))},[oe,Me]=Q.useState(null),[ce,Ke]=Q.useState(!1),[be,ke]=Q.useState({}),[se,ve]=Q.useState(null),[ze,De]=Q.useState(0),me=Ce.useRef(null),pe=Ce.useRef(null),ne=Ce.useRef(null),Ue=Ce.useRef(0),Fe=Ce.useCallback(()=>{var c;if(ne.current&&(clearInterval(ne.current),ne.current=null),me.current&&me.current.state==="recording"){me.current.stop();return}(c=pe.current)==null||c.getTracks().forEach(N=>N.stop()),pe.current=null,ve(null)},[]);Q.useEffect(()=>(d&&(t!=null&&t.id)&&M(t.id,t.type),C(null),()=>{var c,N;ne.current&&clearInterval(ne.current),((c=me.current)==null?void 0:c.state)==="recording"&&me.current.stop(),(N=pe.current)==null||N.getTracks().forEach(D=>D.stop())}),[d,t==null?void 0:t.id]);const[Qe,qe]=Q.useState("storefront"),Re=Dn(m),K=((Pt=Re.find(c=>c.id===Qe))==null?void 0:Pt.photos)||[];if(Q.useEffect(()=>{if(j===null||K.length===0)return;const c=N=>{N.key==="ArrowRight"?C(D=>D!==null?(D+1)%K.length:null):N.key==="ArrowLeft"?C(D=>D!==null?(D-1+K.length)%K.length:null):N.key==="Escape"&&C(null)};return window.addEventListener("keydown",c),()=>window.removeEventListener("keydown",c)},[j,K.length]),!d||!m)return null;const O=m.type==="supplier",u=m.type==="drink_store",h=m.type==="location",p=O?m:null,v=u?m:null,b=h?m:null,X=Array.isArray(m.likes)?m.likes:[],he=X.some(c=>c.userId===s.id),re=m.attachedFiles||[],We=m.videos||[],Ae=le(m),Et=O?(p==null?void 0:p.catalogItems)||[]:[],Tt=u?(v==null?void 0:v.drinkItems)||[]:[],Rt=(c,N)=>{var F;const H=(((F=Re.find(Z=>Z.id===N))==null?void 0:F.photos)||[]).findIndex(Z=>Z.url===Ge(c));H<0||(qe(N),C(H))},At=async()=>{if(!m)return;const c=O?p==null?void 0:p.name:h?b==null?void 0:b.name:v==null?void 0:v.storeName;if(window.confirm(`ยืนยันการลบรายการ "${c||"รายการนี้"}" หรือไม่?`))try{m.type==="supplier"?await z(m.id):m.type==="drink_store"?await E(m.id):m.type==="location"&&await B(m.id),l()}catch{alert("เกิดข้อผิดพลาดในการลบรายการ")}},tn=async(c,N,D)=>{try{Ke(!0);const H=await En(c,{recordId:m.id,recordType:m.type,recordTitle:O?p==null?void 0:p.name:h?b==null?void 0:b.name:v==null?void 0:v.storeName});D?ke(F=>({...F,[D]:{...F[D],voiceUrl:H}})):Me(H)}catch(H){alert(H.message||"อัปโหลดไฟล์แนบไม่สำเร็จ")}finally{Ke(!1)}},It=async c=>{var N,D;if(se===c){Fe();return}se&&Fe();try{if(!((N=navigator.mediaDevices)!=null&&N.getUserMedia)||typeof MediaRecorder>"u"){alert("เบราว์เซอร์นี้ไม่รองรับการอัดเสียงสด กรุณาเปิดผ่าน HTTPS หรืออนุญาตไมโครโฟน");return}const H=await navigator.mediaDevices.getUserMedia({audio:!0});pe.current=H;const F=["audio/mp4","audio/webm;codecs=opus","audio/webm","audio/ogg"].find(ee=>MediaRecorder.isTypeSupported(ee)),Z=new MediaRecorder(H,F?{mimeType:F}:void 0);me.current=Z;const Ie=[];Z.ondataavailable=ee=>{ee.data.size>0&&Ie.push(ee.data)},Z.onstop=()=>{var as;ne.current&&(clearInterval(ne.current),ne.current=null),H.getTracks().forEach(an=>an.stop()),pe.current=null,ve(null);const ee=((as=Z.mimeType)==null?void 0:as.split(";")[0])||"audio/webm",q=new Blob(Ie,{type:ee});if(!q.size)return;const we=ee.includes("mp4")?"m4a":ee.includes("ogg")?"ogg":"webm",rn=new File([q],`เสียงคอมเมนต์-${Date.now()}.${we}`,{type:ee});tn(rn,"audio",c==="main"?void 0:c)},Z.onerror=()=>{ne.current&&clearInterval(ne.current),H.getTracks().forEach(ee=>ee.stop()),ve(null),alert("อัดเสียงไม่สำเร็จ กรุณาลองใหม่")},Ue.current=Date.now(),De(0),ve(c),Z.start(250),ne.current=setInterval(()=>{De(Math.round((Date.now()-Ue.current)/1e3))},1e3)}catch{(D=pe.current)==null||D.getTracks().forEach(H=>H.stop()),ve(null),alert("ไม่ได้รับสิทธิ์ใช้ไมโครโฟน กรุณากดอนุญาตไมโครโฟนเพื่ออัดเสียงสด")}},sn=async c=>{if(c.preventDefault(),W.current||de.current.main||ce||se)return;const N=R.trim();if(!(!N&&!ae.length&&!oe)){W.current=!0,J(!0);try{if(!await i(m.id,m.type,N,{media:ae,voiceUrl:oe||void 0}))return;P(""),ge([]),Me(null)}finally{W.current=!1,J(!1)}}},Bt=async(c,N,D)=>{var Z;if(W.current||de.current[c]||ce||se)return;const H=(je[c]||"").trim(),F=be[c];if(!(!H&&!((Z=F==null?void 0:F.media)!=null&&Z.length)&&!(F!=null&&F.voiceUrl))){W.current=!0,J(!0);try{if(!await a(m.id,m.type,c,H,N,{media:F==null?void 0:F.media,voiceUrl:F==null?void 0:F.voiceUrl,replyToId:D}))return;fe(ee=>({...ee,[c]:""})),ke(ee=>({...ee,[c]:{}})),te(null)}finally{W.current=!1,J(!1)}}},nn=c=>{p&&o(p.id,c)},Ye=le(m);return(Lt=Ye[0])!=null&&Lt.url||(O?p==null||p.voiceNoteUrl:v==null||v.voiceNoteUrl),e.jsxs("div",{className:"fixed inset-0 z-[90] bg-black/45 backdrop-blur-sm flex items-center justify-center p-2 sm:p-4 overflow-y-auto",children:[e.jsxs("div",{className:"bg-white border border-slate-200/90 w-full max-w-3xl rounded-2xl shadow-2xl overflow-hidden my-auto animate-in zoom-in-95 max-h-[94vh] flex flex-col text-slate-900",children:[e.jsxs("div",{className:"p-3.5 sm:p-4 border-b border-slate-100 space-y-2.5 bg-white sticky top-0 z-10",children:[e.jsxs("div",{className:"flex items-start justify-between gap-2.5",children:[e.jsxs("div",{className:"flex items-start gap-2.5 min-w-0 flex-1",children:[e.jsx("span",{className:`p-2 rounded-xl shrink-0 mt-0.5 ${O?"bg-emerald-50 text-emerald-700":h?"bg-sky-50 text-sky-700":"bg-amber-50 text-amber-700"}`,children:O?e.jsx(cn,{className:"w-4 h-4 sm:w-5 sm:h-5 text-emerald-600"}):h?e.jsx("i",{"aria-hidden":"true",className:"fa-solid fa-map-location-dot text-base text-sky-600"}):e.jsx(is,{className:"w-4 h-4 sm:w-5 sm:h-5 text-amber-600"})}),e.jsxs("div",{className:"min-w-0 flex-1",children:[e.jsx("h2",{className:"font-extrabold text-slate-900 text-sm sm:text-base leading-snug break-words",children:O?p==null?void 0:p.name:h?b==null?void 0:b.name:v==null?void 0:v.storeName}),e.jsx("p",{className:"text-xs text-slate-400 truncate mt-0.5",children:O?(p==null?void 0:p.chineseName)||(p==null?void 0:p.marketOrCity):h?(b==null?void 0:b.zoneOrFloor)||(b==null?void 0:b.foreignName):(v==null?void 0:v.chineseName)||(v==null?void 0:v.storeCategory)||(v==null?void 0:v.brandConcept)})]})]}),e.jsx("button",{type:"button",onClick:l,className:"w-7 h-7 sm:w-8 sm:h-8 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-600 transition-all active:scale-95 flex items-center justify-center shrink-0",title:"ปิดหน้าต่าง",children:e.jsx(Je,{className:"w-4 h-4"})})]}),e.jsxs("div",{className:"flex items-center gap-1.5 overflow-x-auto no-scrollbar pt-2 border-t border-slate-100 select-none",children:[V&&e.jsxs("button",{type:"button",onClick:()=>$(m),className:"h-7 sm:h-8 px-2.5 rounded-xl bg-amber-50 hover:bg-amber-100 text-amber-800 border border-amber-200/90 text-xs font-bold active:scale-95 transition-all inline-flex items-center gap-1 whitespace-nowrap shrink-0",title:"แก้ไขข้อมูลรายการนี้ (Admin / Editor)",children:[e.jsx(os,{className:"w-3 h-3 text-amber-600 shrink-0"}),e.jsx("span",{children:"แก้ไข"})]}),I&&e.jsxs("button",{type:"button",onClick:At,className:"h-7 sm:h-8 px-2.5 rounded-xl bg-rose-50 hover:bg-rose-100 text-rose-700 border border-rose-200 text-xs font-bold active:scale-95 transition-all inline-flex items-center gap-1 whitespace-nowrap shrink-0",title:"ลบรายการ",children:[e.jsx(ls,{className:"w-3 h-3 text-rose-600 shrink-0"}),e.jsx("span",{children:"ลบรายการ"})]}),e.jsxs("button",{type:"button",onClick:()=>g(m.id,m.type),className:`h-7 sm:h-8 px-2.5 rounded-xl border transition-all active:scale-95 inline-flex items-center gap-1 text-xs font-bold whitespace-nowrap shrink-0 ${he?"bg-blue-50 text-blue-700 border-blue-200":"bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100"}`,title:`ถูกใจ (${X.length})`,children:[e.jsx(un,{className:`w-3 h-3 shrink-0 ${he?"fill-blue-600 text-blue-600":""}`}),e.jsxs("span",{children:["ถูกใจ",X.length>0?` (${X.length})`:""]})]}),e.jsxs("button",{type:"button",onClick:()=>r(m),className:"h-7 sm:h-8 px-2.5 rounded-xl bg-[#06C755] hover:bg-[#05b34c] text-white text-xs font-bold transition-all active:scale-95 inline-flex items-center gap-1 whitespace-nowrap shrink-0 shadow-2xs",title:"แชร์ลิงก์เข้า LINE",children:[e.jsx(mn,{className:"w-3 h-3 shrink-0"}),e.jsx("span",{children:"แชร์ LINE"})]}),e.jsxs("button",{type:"button",onClick:()=>Hs(m,n,"pdf",w),className:"h-7 sm:h-8 px-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold transition-all active:scale-95 inline-flex items-center gap-1 whitespace-nowrap shrink-0",title:"ดาวน์โหลดรายงานเป็นไฟล์ PDF",children:[e.jsx(zn,{className:"w-3 h-3 text-emerald-400 shrink-0"}),e.jsx("span",{children:"ดาวน์โหลด PDF"})]}),e.jsxs("button",{type:"button",onClick:()=>Hs(m,n,"print",w),className:"h-7 sm:h-8 px-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold transition-all border border-slate-200/80 active:scale-95 inline-flex items-center gap-1 whitespace-nowrap shrink-0",title:"พิมพ์รายงานฉบับจัดหน้าสวยงาม (Print)",children:[e.jsx(Ln,{className:"w-3 h-3 text-slate-600 shrink-0"}),e.jsx("span",{children:"พิมพ์"})]})]})]}),e.jsxs("div",{className:"p-4 sm:p-6 space-y-4 overflow-y-auto flex-1",children:[e.jsxs("div",{className:"flex flex-wrap items-center justify-between gap-2 p-3 bg-slate-50 rounded-xl border border-slate-100 text-xs",children:[e.jsxs("div",{className:"flex items-center gap-2.5",children:[e.jsx(Xe,{src:m.creator.avatar,alt:m.creator.alias,className:"w-8 h-8 rounded-full object-cover ring-2 ring-emerald-500/20 shadow-xs"}),e.jsxs("div",{children:[e.jsx("div",{className:"text-slate-800 font-bold flex items-center gap-1.5",children:e.jsxs("span",{children:["ผู้ลงพื้นที่สำรวจ: ",m.creator.alias,m.creator.name&&m.creator.name!==m.creator.alias?` (${m.creator.name})`:""]})}),e.jsxs("div",{className:"text-[11px] text-slate-400 font-mono",children:["บันทึกเมื่อ: ",new Date(m.creator.timestamp).toLocaleString("th-TH")]})]})]}),e.jsxs("div",{className:"flex items-center gap-2 flex-wrap",children:[e.jsx(pn,{viewedBy:m.viewedBy,size:"md"}),O&&p&&e.jsxs("div",{className:"flex items-center gap-1.5",children:[e.jsx("span",{className:"text-[11px] text-slate-500",children:"สถานะ:"}),e.jsxs("select",{value:p.status,onChange:c=>nn(c.target.value),className:"bg-white border border-slate-200 text-slate-800 text-xs font-bold rounded-lg px-2.5 py-1 focus:outline-none focus:border-emerald-500",children:[e.jsx("option",{value:"scouted",children:"1. สำรวจแล้ว"}),e.jsx("option",{value:"reviewing",children:"2. เทียบสเปก"}),e.jsx("option",{value:"rfq_sent",children:"3. ส่ง RFQ"}),e.jsx("option",{value:"shortlisted",children:"4. ตัวเต็ง (Shortlist)"}),e.jsx("option",{value:"ordered",children:"5. สั่งซื้อแล้ว (Ordered)"})]})]})]})]}),Ye.length>0&&e.jsxs("div",{className:"p-3 bg-emerald-50/70 border border-emerald-200/80 rounded-xl space-y-2",children:[e.jsxs("div",{className:"text-xs font-bold text-emerald-950 flex items-center justify-between",children:[e.jsxs("span",{className:"flex items-center gap-1.5",children:[e.jsx(Be,{className:"w-3.5 h-3.5 text-emerald-600"}),e.jsxs("span",{children:["วอยซ์เสียงบันทึกหน้างานจริง (",Ye.length," คลิป)"]})]}),e.jsx("span",{className:"text-[10px] font-mono text-emerald-700",children:"แตะ ▶ เพื่อฟังเสียงบันทึก"})]}),e.jsx("div",{className:"grid grid-cols-1 sm:grid-cols-2 gap-2",children:Ye.map((c,N)=>e.jsxs("div",{className:"p-2.5 bg-white border border-emerald-200 rounded-xl flex flex-col justify-between gap-1.5 shadow-2xs",children:[e.jsxs("div",{className:"flex items-center justify-between gap-2 min-w-0",children:[e.jsxs("div",{className:"text-xs font-bold text-slate-900 truncate flex items-center gap-1.5",children:[e.jsx(Be,{className:"w-3.5 h-3.5 text-emerald-600 shrink-0"}),e.jsx("span",{className:"truncate",children:c.label||`คลิปเสียง #${N+1}`})]}),e.jsx("span",{className:"text-[10px] text-emerald-700 font-mono shrink-0",children:c.durationSec?`${c.durationSec} วินาที`:"เสียงบันทึก"})]}),c.url&&e.jsx("audio",{controls:!0,preload:"metadata",playsInline:!0,src:c.url,className:"h-8 w-full rounded-lg"})]},c.id||N))})]}),e.jsxs("div",{className:"p-3 bg-slate-50 rounded-xl border border-slate-100 space-y-2 text-xs",children:[e.jsxs("div",{className:"flex flex-wrap items-center gap-1.5",children:[O&&p?e.jsxs(e.Fragment,{children:[e.jsxs("span",{className:"px-2.5 py-1 rounded-lg bg-emerald-600 text-white text-[11px] font-bold inline-flex items-center gap-1",children:[e.jsx("i",{className:"fa-solid fa-industry text-[10px]"}),e.jsx("span",{children:p.category})]}),e.jsx("span",{className:"px-2 py-1 rounded-lg bg-white border border-slate-200 text-slate-700 text-[11px] font-bold",children:p.isFactory?"โรงงานผลิต":"หน้าร้าน / โชว์รูม"}),e.jsxs("span",{className:"px-2 py-1 rounded-lg bg-amber-50 border border-amber-200 text-amber-700 text-[11px] font-mono font-bold inline-flex items-center gap-1",children:[e.jsx("i",{className:"fa-solid fa-star text-[10px] text-amber-500"}),e.jsxs("span",{children:[p.rating||5,"/5"]})]}),(p.quickTags||[]).map((c,N)=>e.jsxs("span",{className:"px-2 py-1 rounded-lg bg-white border border-slate-200 text-slate-700 text-[11px] font-semibold",children:["#",c]},N))]}):v?e.jsxs(e.Fragment,{children:[e.jsxs("span",{className:"px-2.5 py-1 rounded-lg bg-amber-600 text-white text-[11px] font-bold inline-flex items-center gap-1",children:[e.jsx("i",{className:"fa-solid fa-mug-hot text-[10px]"}),e.jsx("span",{children:v.storeCategory||"เรฟร้านน้ำ"})]}),v.ratings&&e.jsxs("span",{className:"px-2 py-1 rounded-lg bg-amber-50 border border-amber-200 text-amber-800 text-[11px] font-mono font-bold inline-flex items-center gap-1",children:[e.jsx("i",{className:"fa-solid fa-star text-[10px] text-amber-500"}),e.jsx("span",{children:((v.ratings.taste+v.ratings.aesthetics+v.ratings.value+v.ratings.speed)/4).toFixed(1)})]})]}):h&&b?e.jsxs(e.Fragment,{children:[e.jsxs("span",{className:"px-2.5 py-1 rounded-lg bg-sky-600 text-white text-[11px] font-bold inline-flex items-center gap-1",children:[e.jsx("i",{className:"fa-solid fa-map-location-dot text-[10px]"}),e.jsx("span",{children:b.locationType==="mall"?"ห้างสรรพสินค้า":b.locationType})]}),e.jsxs("span",{className:"px-2 py-1 rounded-lg bg-white border border-slate-200 text-slate-700 text-[11px] font-bold",children:["ผัง ",((Mt=b.spaceSpecs)==null?void 0:Mt.layoutFormat)||"Inline"]}),b.ratings&&e.jsxs("span",{className:"px-2 py-1 rounded-lg bg-amber-50 border border-amber-200 text-amber-800 text-[11px] font-mono font-bold inline-flex items-center gap-1",children:[e.jsx("i",{className:"fa-solid fa-star text-[10px] text-amber-500"}),e.jsx("span",{children:((b.ratings.footTraffic+b.ratings.visibility+b.ratings.accessibility+b.ratings.valueRoi)/4).toFixed(1)})]}),(b.quickTags||[]).map((c,N)=>e.jsxs("span",{className:"px-2 py-1 rounded-lg bg-white border border-slate-200 text-slate-700 text-[11px] font-semibold",children:["#",c]},N))]}):null,Et.length>0&&e.jsxs("span",{className:"px-2.5 py-1 rounded-lg bg-amber-50 border border-amber-200 text-amber-800 text-[11px] font-bold inline-flex items-center gap-1 shadow-2xs",children:[e.jsx(hn,{className:"w-3 h-3 text-amber-600"}),e.jsxs("span",{children:[Et.length," สินค้า"]})]}),Tt.length>0&&e.jsxs("span",{className:"px-2.5 py-1 rounded-lg bg-amber-50 border border-amber-200 text-amber-800 text-[11px] font-bold inline-flex items-center gap-1 shadow-2xs",children:[e.jsx(is,{className:"w-3 h-3 text-amber-600"}),e.jsxs("span",{children:[Tt.length," เมนู"]})]}),We.length>0&&e.jsxs("span",{className:"px-2.5 py-1 rounded-lg bg-purple-50 border border-purple-200 text-purple-700 text-[11px] font-bold inline-flex items-center gap-1 shadow-2xs",children:[e.jsx("i",{className:"fa-solid fa-video text-[9px] text-purple-600"}),e.jsxs("span",{children:[We.length," คลิป"]})]}),Ae.length>0&&e.jsxs("span",{className:"px-2.5 py-1 rounded-lg bg-rose-50 border border-rose-200 text-rose-700 text-[11px] font-bold inline-flex items-center gap-1 shadow-2xs",children:[e.jsx(_e,{className:"w-3 h-3 text-rose-600"}),e.jsxs("span",{children:[Ae.length," คลิปเสียง"]})]}),re.length>0&&e.jsxs("a",{href:"#detail-attached-files-section",onClick:c=>{var N;c.preventDefault(),(N=document.getElementById("detail-attached-files-section"))==null||N.scrollIntoView({behavior:"smooth"})},className:"px-2.5 py-1 rounded-lg bg-sky-50 border border-sky-200 text-sky-700 text-[11px] font-bold inline-flex items-center gap-1 hover:bg-sky-100 transition-colors cursor-pointer shadow-2xs",title:"คลิกเพื่อเลื่อนดูไฟล์แนบ",children:[e.jsx(ds,{className:"w-3 h-3 text-sky-600"}),e.jsxs("span",{children:[re.length," ไฟล์แนบ"]})]})]}),e.jsxs("div",{className:"flex flex-wrap items-center justify-between gap-2 pt-1.5 border-t border-slate-200/60 text-[11px] text-slate-600",children:[e.jsxs("div",{className:"flex flex-wrap items-center gap-2",children:[e.jsxs("span",{className:"inline-flex items-center gap-1 font-semibold text-slate-800",children:[e.jsx(fn,{className:"w-3.5 h-3.5 text-sky-600 shrink-0"}),e.jsx("span",{children:O?(p==null?void 0:p.marketOrCity)||(p==null?void 0:p.address)||((zt=p==null?void 0:p.location)==null?void 0:zt.addressText):h?((Dt=b==null?void 0:b.location)==null?void 0:Dt.addressText)||(b==null?void 0:b.zoneOrFloor):((Ut=v==null?void 0:v.location)==null?void 0:Ut.addressText)||(v==null?void 0:v.city)})]}),(O?p==null?void 0:p.wechatId:h?(Ft=b==null?void 0:b.leaseTerms)==null?void 0:Ft.contactLineWechat:v==null?void 0:v.wechatId)&&e.jsxs("span",{className:"px-2 py-0.5 rounded bg-white border border-slate-200 font-mono",children:["LINE/WeChat: ",O?p==null?void 0:p.wechatId:h?(qt=b==null?void 0:b.leaseTerms)==null?void 0:qt.contactLineWechat:v==null?void 0:v.wechatId]}),(O?p==null?void 0:p.phone:h?(_t=b==null?void 0:b.leaseTerms)==null?void 0:_t.contactPhone:v==null?void 0:v.phone)&&e.jsxs("span",{className:"px-2 py-0.5 rounded bg-white border border-slate-200 font-mono",children:["โทร: ",O?p==null?void 0:p.phone:h?(Ht=b==null?void 0:b.leaseTerms)==null?void 0:Ht.contactPhone:v==null?void 0:v.phone]}),h&&((Vt=b==null?void 0:b.leaseTerms)==null?void 0:Vt.contactPerson)&&e.jsxs("span",{className:"px-2 py-0.5 rounded bg-white border border-slate-200",children:["ผู้ติดต่อ: ",b.leaseTerms.contactPerson]})]}),(Ot=m.location)!=null&&Ot.lat&&((Gt=m.location)!=null&&Gt.lng)&&(m.location.lat!==0||m.location.lng!==0)?e.jsx("a",{href:`https://www.google.com/maps?q=${m.location.lat},${m.location.lng}`,target:"_blank",rel:"noreferrer",className:"text-[11px] font-bold text-sky-700 hover:underline shrink-0",children:"เปิด Google Maps ↗"}):e.jsx("span",{className:"text-[10px] text-slate-400 font-medium shrink-0",children:"📍 ยังไม่ได้ระบุพิกัด GPS"})]})]}),h&&b&&e.jsxs("div",{className:"p-3.5 rounded-xl border border-sky-200 bg-sky-50/50 space-y-3",children:[e.jsxs("div",{className:"text-[11px] font-bold text-sky-900 flex items-center justify-between",children:[e.jsxs("span",{className:"flex items-center gap-1.5",children:[e.jsx(gn,{className:"w-3.5 h-3.5 text-sky-600"}),e.jsx("span",{children:"สเปกพื้นที่ & เงื่อนไขสัญญาเช่า (Location Scouting Specs)"})]}),e.jsxs("span",{className:"text-[10px] px-2 py-0.5 rounded-full bg-white text-sky-800 font-mono font-bold border border-sky-200",children:[b.zoneOrFloor," ",b.unitNumber?`(${b.unitNumber})`:""]})]}),e.jsxs("div",{className:"grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs",children:[e.jsxs("div",{className:"bg-white p-2 rounded-lg border border-slate-200 text-center",children:[e.jsx("div",{className:"text-[10px] text-slate-500 font-bold",children:"ขนาดพื้นที่"}),e.jsxs("div",{className:"font-extrabold text-sm text-slate-900 font-mono mt-0.5",children:[((Kt=b.spaceSpecs)==null?void 0:Kt.usableAreaSqm)||"-"," ",e.jsx("span",{className:"text-[10px] font-normal text-slate-500",children:"ตร.ม."})]})]}),e.jsxs("div",{className:"bg-white p-2 rounded-lg border border-slate-200 text-center",children:[e.jsx("div",{className:"text-[10px] text-slate-500 font-bold",children:"หน้ากว้าง / เพดาน"}),e.jsxs("div",{className:"font-extrabold text-sm text-slate-900 font-mono mt-0.5",children:[((Qt=b.spaceSpecs)==null?void 0:Qt.frontageWidthM)||"-","ม. / ",((Wt=b.spaceSpecs)==null?void 0:Wt.ceilingHeightM)||"-","ม."]})]}),e.jsxs("div",{className:"bg-white p-2 rounded-lg border border-slate-200 text-center",children:[e.jsx("div",{className:"text-[10px] text-slate-500 font-bold",children:"ค่าเช่ารายเดือน"}),e.jsx("div",{className:"font-extrabold text-sm text-amber-950 font-mono mt-0.5 truncate",children:(Yt=b.leaseTerms)!=null&&Yt.monthlyRentThb?e.jsxs(e.Fragment,{children:["฿",b.leaseTerms.monthlyRentThb.toLocaleString()]}):(Jt=b.leaseTerms)!=null&&Jt.monthlyRentRmb?e.jsxs(e.Fragment,{children:["¥",b.leaseTerms.monthlyRentRmb.toLocaleString()]}):e.jsx("span",{className:"text-slate-400",children:"สอบถาม"})})]}),e.jsxs("div",{className:"bg-white p-2 rounded-lg border border-slate-200 text-center",children:[e.jsx("div",{className:"text-[10px] text-slate-500 font-bold",children:"เงื่อนไขสัญญา"}),e.jsxs("div",{className:"font-extrabold text-xs text-slate-900 font-mono mt-0.5 truncate",children:["สัญญา ",((Zt=b.leaseTerms)==null?void 0:Zt.leasePeriodYears)||3," ปี · ประกัน ",((Xt=b.leaseTerms)==null?void 0:Xt.depositMonths)||3," ด."]})]})]}),e.jsxs("div",{className:"flex flex-wrap items-center gap-1.5 pt-1 text-xs",children:[e.jsxs("span",{className:"px-2 py-0.5 rounded-md bg-white border border-slate-200 text-slate-700 font-semibold flex items-center gap-1",children:[e.jsx(cs,{className:"w-3 h-3 text-amber-500"}),e.jsxs("span",{children:["สเปกไฟ: ",((es=b.spaceSpecs)==null?void 0:es.electricalPower)||"3 เฟส 45 kVA"]})]}),e.jsxs("span",{className:"px-2 py-0.5 rounded-md bg-white border border-slate-200 text-slate-700 font-semibold flex items-center gap-1",children:[e.jsx(xn,{className:"w-3 h-3 text-blue-500"}),e.jsxs("span",{children:["ท่อน้ำดี: ",(ts=b.spaceSpecs)!=null&&ts.hasWaterInflow?"✓ มีในห้อง":"✗ ไม่มี"]})]}),e.jsxs("span",{className:"px-2 py-0.5 rounded-md bg-white border border-slate-200 text-slate-700 font-semibold flex items-center gap-1",children:[e.jsx(bn,{className:"w-3 h-3 text-teal-500"}),e.jsxs("span",{children:["ท่อน้ำทิ้ง: ",(ss=b.spaceSpecs)!=null&&ss.hasDrainage?"✓ มีในห้อง":"✗ ไม่มี"]})]}),e.jsxs("span",{className:"px-2 py-0.5 rounded-md bg-white border border-slate-200 text-slate-700 font-semibold flex items-center gap-1",children:[e.jsx(vn,{className:"w-3 h-3 text-purple-500"}),e.jsxs("span",{children:["ดักไขมัน: ",(ns=b.spaceSpecs)!=null&&ns.hasGreaseTrap?"✓ มีรองรับ":"✗ ต้องติดตั้งเอง"]})]}),((rs=b.spaceSpecs)==null?void 0:rs.riderAccessNotes)&&e.jsxs("span",{className:"px-2 py-0.5 rounded-md bg-white border border-slate-200 text-slate-700 font-semibold flex items-center gap-1",children:[e.jsx(wn,{className:"w-3 h-3 text-emerald-600"}),e.jsxs("span",{children:["ไรเดอร์: ",b.spaceSpecs.riderAccessNotes]})]})]}),b.handoffNotes&&e.jsxs("div",{className:"pt-2 border-t border-sky-200/80 text-xs",children:[e.jsx("span",{className:"font-bold text-sky-900 block mb-0.5",children:"ประเด็นเจรจา / ส่งมอบงาน:"}),e.jsx("p",{className:"text-slate-800 whitespace-pre-wrap",children:b.handoffNotes})]})]}),(O&&(p==null?void 0:p.memo)||!O&&(v==null?void 0:v.tastingNotes))&&e.jsxs("div",{className:`p-3.5 rounded-xl border space-y-1 ${O?"bg-emerald-50/50 border-emerald-200/80":"bg-amber-50/50 border-amber-200/80"}`,children:[e.jsxs("div",{className:"text-[11px] font-bold text-slate-600 flex items-center gap-1.5",children:[e.jsx("i",{className:`fa-solid ${O?"fa-clipboard-check text-emerald-600":"fa-quote-left text-amber-600"} text-[10px]`}),e.jsx("span",{children:O?"บันทึกหน้างาน / รายละเอียดหลัก:":"บันทึกรีวิวรสชาติ & ไอเดียเรฟ:"})]}),e.jsx("p",{className:"text-xs sm:text-[13px] text-slate-900 leading-relaxed whitespace-pre-wrap font-medium",children:O?p==null?void 0:p.memo:v==null?void 0:v.tastingNotes})]}),O&&p&&(p.catalogItems||[]).length>0&&e.jsxs("div",{className:"space-y-2",children:[e.jsx("div",{className:"flex items-center justify-between",children:e.jsxs("span",{className:"text-xs font-bold text-slate-800",children:["รายการอุปกรณ์ & สินค้า (",(p.catalogItems||[]).length," รายการ):"]})}),e.jsx("div",{"data-testid":"supplier-catalog-grid",className:"grid grid-cols-1 min-[380px]:grid-cols-2 gap-3 items-start",children:(p.catalogItems||[]).map((c,N)=>{const D=Vs(c,p.country);return e.jsxs("div",{"data-testid":"detail-item-card",className:"min-w-0 rounded-xl border border-slate-200 bg-white overflow-hidden shadow-xs",children:[c.photo?e.jsx("button",{type:"button","aria-label":`ขยายรูป ${c.name||`รายการที่ ${N+1}`}`,onClick:()=>Rt(c.photo,"catalog"),className:"block w-full h-52 min-[380px]:h-44 sm:h-56 bg-slate-50 border-b border-slate-200 p-2 hover:bg-slate-100 focus-visible:outline focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-emerald-600",children:e.jsx(He,{src:c.photo,alt:c.name||`รายการที่ ${N+1}`,className:"w-full h-full object-contain"})}):e.jsx("div",{className:"h-52 min-[380px]:h-44 sm:h-56 bg-slate-50 border-b border-slate-200 flex items-center justify-center text-slate-400 text-sm",children:"ไม่มีรูป"}),e.jsxs("div",{className:"min-w-0 p-3 space-y-2 break-words",children:[e.jsx("div",{className:"font-bold text-sm text-slate-900 leading-snug",children:c.name||`รายการที่ ${N+1}`}),D&&e.jsxs("div",{className:"text-sm font-mono font-bold text-emerald-700",children:[D.currency==="THB"?"฿":"¥",D.amount.toLocaleString(),D.currency==="CNY"&&e.jsxs("span",{className:"block text-xs font-normal text-slate-500 mt-0.5",children:[" ","(≈",n(D.amount).toLocaleString(),"฿)"]})]}),c.weightKg&&e.jsxs("div",{className:"text-sm text-slate-600",children:["น้ำหนัก: ",e.jsx("span",{className:"font-mono",children:c.weightKg})]}),c.dimensions&&e.jsxs("div",{className:"text-sm text-slate-600",children:["ขนาด: ",e.jsx("span",{className:"font-mono",children:c.dimensions})]}),c.memo&&e.jsx("p",{className:"text-sm text-slate-600 whitespace-pre-wrap leading-relaxed",children:c.memo}),le(c).length>0&&e.jsx("div",{className:"space-y-1 pt-1",children:le(c).map((H,F)=>e.jsxs("div",{className:"min-w-0 flex flex-col gap-2 bg-emerald-50/90 p-2 rounded-lg border border-emerald-200/80",children:[e.jsxs("span",{className:"text-xs font-bold text-emerald-900 min-w-0 flex items-start gap-1",children:[e.jsx(Be,{className:"w-3 h-3 text-emerald-600 shrink-0"}),e.jsx("span",{className:"min-w-0 break-words",children:H.label||`เสียง #${F+1}`}),H.durationSec?`(${H.durationSec}s)`:""]}),H.url&&e.jsx("audio",{controls:!0,preload:"metadata",playsInline:!0,src:H.url,className:"h-8 w-full min-w-0 max-w-full"})]},F))})]})]},c.id||N)})})]}),!O&&v&&(v.drinkItems||[]).length>0&&e.jsxs("div",{className:"space-y-2",children:[e.jsx("div",{className:"flex items-center justify-between",children:e.jsxs("span",{className:"text-xs font-bold text-slate-800",children:["เมนูที่ชิม & ถอดรหัสสูตร (",(v.drinkItems||[]).length," เมนู):"]})}),e.jsx("div",{"data-testid":"store-menu-grid",className:"grid grid-cols-1 min-[380px]:grid-cols-2 gap-3 items-start",children:(v.drinkItems||[]).map((c,N)=>{const D=typeof c.priceRmb=="number",H=typeof c.priceThb=="number";return e.jsxs("div",{"data-testid":"detail-item-card",className:"min-w-0 rounded-xl border border-amber-200/80 bg-white overflow-hidden shadow-xs",children:[c.photo?e.jsx("button",{type:"button","aria-label":`ขยายรูป ${c.name||`แก้วที่ #${N+1}`}`,onClick:()=>Rt(c.photo,"drinks"),className:"block w-full h-52 min-[380px]:h-44 sm:h-56 bg-amber-50/30 border-b border-amber-200/80 p-2 hover:bg-amber-50 focus-visible:outline focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-amber-600",children:e.jsx(He,{src:c.photo,alt:c.name||`แก้วที่ #${N+1}`,className:"w-full h-full object-contain"})}):e.jsx("div",{className:"h-52 min-[380px]:h-44 sm:h-56 bg-amber-50/30 border-b border-amber-200/80 flex items-center justify-center text-slate-400 text-sm",children:"ไม่มีรูป"}),e.jsxs("div",{className:"min-w-0 p-3 space-y-2 break-words",children:[e.jsx("div",{className:"font-bold text-sm text-slate-900 leading-snug",children:c.name||`แก้วที่ #${N+1}`}),(D||H)&&e.jsxs("div",{className:"text-sm font-mono font-bold text-amber-700",children:[D?`¥${c.priceRmb.toLocaleString()}`:`฿${c.priceThb.toLocaleString()}`,D&&e.jsxs("span",{className:"block text-xs font-normal text-slate-500 mt-0.5",children:["(≈",n(c.priceRmb).toLocaleString(),"฿)"]})]}),c.fitMenuTarget&&e.jsxs("div",{className:"text-sm font-semibold text-emerald-700",children:["ต่อยอด: ",c.fitMenuTarget]}),c.cupSize&&e.jsxs("div",{className:"text-sm text-slate-600",children:["ขนาดแก้ว: ",c.cupSize]}),c.gimmickNotes&&e.jsx("p",{className:"text-sm text-slate-600 whitespace-pre-wrap leading-relaxed",children:c.gimmickNotes}),le(c).length>0&&e.jsx("div",{className:"space-y-1 pt-1",children:le(c).map((F,Z)=>e.jsxs("div",{className:"min-w-0 flex flex-col gap-2 bg-amber-50/90 p-2 rounded-lg border border-amber-200/80",children:[e.jsxs("span",{className:"text-xs font-bold text-amber-900 min-w-0 flex items-start gap-1",children:[e.jsx(Be,{className:"w-3 h-3 text-amber-600 shrink-0"}),e.jsx("span",{className:"min-w-0 break-words",children:F.label||`เสียง #${Z+1}`}),F.durationSec?`(${F.durationSec}s)`:""]}),F.url&&e.jsx("audio",{controls:!0,preload:"metadata",playsInline:!0,src:F.url,className:"h-8 w-full min-w-0 max-w-full"})]},Z))})]})]},c.id||N)})})]}),Re.filter(c=>!["catalog","drinks"].includes(c.id)).map(c=>e.jsxs("section",{"aria-label":c.label,className:"space-y-2",children:[e.jsxs("h3",{className:"text-xs font-bold text-slate-800",children:[c.label," (",c.photos.length," รูป)"]}),e.jsx("div",{className:"grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2",children:c.photos.map((N,D)=>e.jsxs("button",{type:"button",onClick:()=>{qe(c.id),C(D)},className:"relative h-44 rounded-xl overflow-hidden border border-slate-200 bg-slate-50 p-1",children:[e.jsx(He,{src:N.url,alt:N.label,className:"w-full h-full object-contain"}),e.jsxs("span",{className:"absolute bottom-1 right-1 bg-black/60 text-white text-[10px] px-2 rounded",children:[D+1,"/",c.photos.length]})]},`${N.url}-${D}`))}),!c.photos.length&&e.jsx("p",{className:"text-xs text-slate-400",children:"ยังไม่มีรูปในหมวดนี้"})]},c.id)),m.videos&&m.videos.length>0&&e.jsxs("div",{className:"space-y-2 pt-1",children:[e.jsxs("span",{className:"text-xs font-bold text-slate-800 flex items-center gap-1.5",children:[e.jsx("i",{className:"fa-solid fa-video text-purple-600"}),e.jsxs("span",{children:["คลิปวิดีโอของรายการนี้ (",m.videos.length," คลิป):"]})]}),e.jsx("div",{className:"grid grid-cols-1 sm:grid-cols-2 gap-3",children:m.videos.map((c,N)=>e.jsx(Mn,{src:c,className:"rounded-2xl border border-slate-200 shadow-sm h-48 sm:h-56",videoClassName:"object-contain",badgeLabel:`คลิปที่ ${N+1}`},N))})]}),m.attachedFiles&&m.attachedFiles.length>0&&e.jsxs("div",{id:"detail-attached-files-section",className:"space-y-2 pt-1 scroll-mt-6",children:[e.jsxs("div",{className:"flex items-center justify-between",children:[e.jsxs("span",{className:"text-xs font-bold text-slate-800 flex items-center gap-1.5",children:[e.jsx(ds,{className:"w-3.5 h-3.5 text-sky-600"}),e.jsxs("span",{children:["เอกสารและไฟล์แนบ (",m.attachedFiles.length," รายการ):"]})]}),e.jsx("span",{className:"text-[10px] text-slate-400",children:"เปิด PDF ในแอป หรือดาวน์โหลดไฟล์ต้นฉบับ"})]}),e.jsx("div",{className:"grid grid-cols-1 sm:grid-cols-2 gap-2",children:m.attachedFiles.map(c=>{const N=Tn(c.name,c.mimeType),D=N.icon;return e.jsxs("div",{className:"bg-white rounded-xl border border-slate-200/90 hover:border-sky-300 hover:shadow-xs p-3 flex flex-col items-stretch sm:flex-row sm:items-center justify-between gap-3 transition-all group",children:[e.jsxs("div",{className:"flex items-center gap-2.5 min-w-0 flex-1",children:[e.jsxs("div",{className:`w-9 h-9 rounded-xl border flex flex-col items-center justify-center shrink-0 shadow-2xs ${N.colorClasses}`,children:[e.jsx(D,{className:"w-4 h-4"}),e.jsx("span",{className:"text-[8px] font-extrabold uppercase leading-none mt-0.5",children:N.label})]}),e.jsxs("div",{className:"min-w-0 flex-1",children:[e.jsx("p",{className:"font-bold text-xs text-slate-800 truncate group-hover:text-sky-700 transition-colors",children:c.name}),e.jsxs("div",{className:"flex items-center gap-1.5 text-[10px] text-slate-500 mt-0.5",children:[e.jsx("span",{className:"font-medium",children:Rn(c.size)}),c.uploadedAt&&e.jsxs(e.Fragment,{children:[e.jsx("span",{children:"•"}),e.jsx("span",{children:new Date(c.uploadedAt).toLocaleDateString("th-TH")})]})]})]})]}),e.jsx(An,{file:c})]},c.id)})})]}),e.jsxs("div",{id:"detail-comments-section",className:"p-4 bg-slate-50 rounded-xl border border-slate-200/80 space-y-3",children:[e.jsxs("div",{className:"flex items-center justify-between",children:[e.jsxs("span",{className:"text-xs font-bold text-slate-800 flex items-center gap-1.5",children:[e.jsx(yn,{className:"w-3.5 h-3.5 text-blue-600"}),e.jsx("span",{children:"ช่องความเห็นทีมงาน & ตอบกลับต่อเนื่อง (Threaded Comments)"})]}),e.jsxs("span",{className:"text-[11px] text-slate-400 font-mono",children:[m.reviewerNotes.length," หัวข้อสนทนา"]})]}),e.jsx("div",{className:"space-y-2.5",children:m.reviewerNotes.length===0?e.jsx("p",{className:"text-xs text-slate-400 py-3 text-center",children:"ยังไม่มีความเห็น สามารถพิมพ์บันทึกหรือตรวจสอบสเปกได้ด้านล่าง"}):m.reviewerNotes.map(c=>{var F,Z,Ie,ee;const N=c.replies||[],D=Le[c.id],H=tt(w,c.authorId,c.author,c.authorAvatar);return e.jsxs("div",{className:"p-3 bg-white rounded-xl border border-slate-200/70 shadow-xs space-y-2",children:[e.jsxs("div",{className:"flex items-start gap-2.5",children:[e.jsx(Xe,{src:H.avatar,alt:`โปรไฟล์ ${H.name}`,className:"w-7 h-7 rounded-full object-cover shrink-0 mt-0.5 ring-1 ring-slate-200"}),e.jsxs("div",{className:"min-w-0 flex-1",children:[e.jsxs("div",{className:"flex items-center justify-between text-[11px] mb-0.5",children:[e.jsx("span",{className:"font-bold text-slate-900",children:H.name}),e.jsx("span",{className:"text-slate-400 font-mono text-[10px]",children:new Date(c.timestamp).toLocaleTimeString("th-TH",{hour:"2-digit",minute:"2-digit"})})]}),e.jsx("p",{className:"text-xs text-slate-700 leading-relaxed",children:c.text}),e.jsx(us,{media:Ct(c)}),(c.voiceUrl||c.audioUrl)&&e.jsxs("div",{className:"mt-1.5 flex items-center gap-2 bg-slate-50 p-2 rounded-xl border border-slate-200/80 max-w-sm",children:[e.jsx(Be,{className:"w-4 h-4 text-emerald-600 shrink-0"}),e.jsx("audio",{controls:!0,src:c.voiceUrl||c.audioUrl,className:"h-7 w-full"})]}),e.jsxs("div",{className:"flex items-center gap-3 mt-1.5 text-[11px] font-bold",children:[U&&e.jsxs("button",{type:"button",onClick:()=>te((G==null?void 0:G.noteId)===c.id&&G.author===c.author?null:{noteId:c.id,author:c.author}),className:"text-blue-600 hover:text-blue-800 flex items-center gap-1",children:[e.jsx(ms,{className:"w-3 h-3"}),e.jsx("span",{children:"ตอบกลับ"})]}),N.length>0&&e.jsx("button",{type:"button",onClick:()=>Ne(q=>({...q,[c.id]:!q[c.id]})),className:"text-slate-500 hover:text-slate-800 flex items-center gap-1",children:D?e.jsxs(e.Fragment,{children:[e.jsx(jn,{className:"w-3 h-3"}),e.jsxs("span",{children:["ดูการตอบกลับ (",N.length,")"]})]}):e.jsxs(e.Fragment,{children:[e.jsx(Nn,{className:"w-3 h-3"}),e.jsxs("span",{children:["ย่อการตอบกลับ (",N.length,")"]})]})})]})]})]}),N.length>0&&!D&&e.jsx("div",{className:"ml-6 pl-3 border-l-2 border-blue-200 space-y-2 pt-1",children:N.map(q=>{const we=tt(w,q.authorId,q.author,q.authorAvatar);return e.jsxs("div",{className:"p-2.5 bg-slate-50 rounded-xl border border-slate-200/60 text-xs space-y-1",children:[e.jsxs("div",{className:"flex items-center justify-between text-[10px]",children:[e.jsxs("div",{className:"flex items-center gap-1.5 font-bold text-slate-800",children:[e.jsx(Xe,{src:we.avatar,alt:`โปรไฟล์ ${we.name}`,className:"w-4 h-4 rounded-full object-cover"}),e.jsx("span",{children:we.name}),q.replyToAuthor&&e.jsxs("span",{className:"text-blue-600 font-normal",children:["▸ ตอบกลับ @",q.replyToAuthor]})]}),e.jsx("span",{className:"text-slate-400 font-mono",children:new Date(q.timestamp).toLocaleTimeString("th-TH",{hour:"2-digit",minute:"2-digit"})})]}),e.jsx("p",{className:"text-slate-700 leading-snug",children:q.text}),e.jsx(us,{media:Ct(q)}),(q.voiceUrl||q.audioUrl)&&e.jsxs("div",{className:"mt-1 flex items-center gap-1.5 bg-white p-1.5 rounded-lg border border-slate-200 max-w-[240px]",children:[e.jsx(Be,{className:"w-3.5 h-3.5 text-blue-600 shrink-0"}),e.jsx("audio",{controls:!0,src:q.voiceUrl||q.audioUrl,className:"h-6 w-full"})]}),e.jsx("div",{children:U&&e.jsxs("button",{type:"button",onClick:()=>te({noteId:c.id,author:q.author}),className:"text-[10px] font-bold text-blue-600 hover:underline inline-flex items-center gap-0.5",children:[e.jsx(ms,{className:"w-2.5 h-2.5"}),e.jsxs("span",{children:["ตอบกลับ @",q.author," ต่อ"]})]})})]},q.id)})}),U&&e.jsx("div",{className:(G==null?void 0:G.noteId)===c.id?"mt-2":"hidden",children:e.jsx(ps,{value:((F=be[c.id])==null?void 0:F.media)||[],onChange:q=>ke(we=>({...we,[c.id]:{...we[c.id],media:q}})),onBusyChange:q=>ie(c.id,q),disabled:Y,recordId:m.id,recordType:m.type,recordTitle:m.id})}),U&&(G==null?void 0:G.noteId)===c.id&&e.jsxs("div",{className:"mt-2 pt-2 border-t border-slate-100 space-y-1.5 animate-in fade-in",children:[((Z=be[c.id])==null?void 0:Z.voiceUrl)&&e.jsx("div",{className:"flex flex-wrap items-center gap-1.5 text-[10px]",children:((Ie=be[c.id])==null?void 0:Ie.voiceUrl)&&e.jsxs("span",{className:"inline-flex items-center gap-1.5 px-2 py-0.5 rounded bg-blue-50 text-blue-800 border border-blue-200",children:[e.jsx(_e,{className:"w-3 h-3"})," เสียงอัดสดพร้อมส่ง",e.jsx("audio",{controls:!0,src:(ee=be[c.id])==null?void 0:ee.voiceUrl,className:"h-6 w-32"}),e.jsx("button",{type:"button",onClick:()=>ke(q=>({...q,[c.id]:{...q[c.id],voiceUrl:void 0}})),children:e.jsx(Je,{className:"w-2.5 h-2.5"})})]})}),e.jsxs("div",{className:"flex gap-1.5 items-center flex-wrap sm:flex-nowrap",children:[e.jsx("input",{type:"text",placeholder:`ตอบกลับ @${G.author} ในฐานะ ${s.alias}...`,disabled:Y,value:je[c.id]||"",onChange:q=>fe({...je,[c.id]:q.target.value}),className:"flex-1 min-w-[140px] bg-slate-50 border border-blue-300 rounded-lg px-2.5 py-1.5 text-xs text-slate-900 focus:outline-none focus:border-blue-500",autoFocus:!0,onKeyDown:q=>{q.key==="Enter"&&(q.preventDefault(),Bt(c.id,G.author))}}),e.jsxs("button",{type:"button",title:se===c.id?"กดเพื่อหยุดอัดเสียงสด":"กดเพื่ออัดเสียงสดในคำตอบกลับ",disabled:Y||ce,onClick:()=>void It(c.id),className:`px-2 py-1.5 rounded-lg border text-[11px] font-bold inline-flex items-center gap-1 transition-all ${se===c.id?"bg-rose-600 text-white border-rose-600 animate-pulse":"bg-white border-slate-200 hover:border-blue-500 hover:bg-blue-50 text-slate-600 hover:text-blue-700"}`,children:[e.jsx(_e,{className:"w-3.5 h-3.5"}),e.jsx("span",{children:se===c.id?`หยุดอัด (${ze}s)`:"อัดเสียงสด"})]}),e.jsx("button",{type:"button",disabled:Y||xe[c.id]||ce||!!se,onClick:()=>Bt(c.id,G.author),className:"px-3 py-1.5 rounded-lg bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold",children:"ส่ง"}),U&&e.jsx("button",{type:"button",onClick:()=>te(null),className:"px-2 py-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-600 text-xs",children:"ยกเลิก"})]})]})]},c.id)})}),e.jsxs("div",{className:"pt-2 border-t border-slate-200/60 space-y-1.5",children:[e.jsx("div",{className:"flex items-center justify-between text-[11px] text-slate-500",children:e.jsxs("span",{className:"font-semibold flex items-center gap-1",children:[e.jsx(cs,{className:"w-3 h-3 text-amber-500"})," ข้อความด่วน (แตะเพื่อพิมพ์ทันที):"]})}),e.jsx("div",{className:"flex items-center gap-1.5 overflow-x-auto no-scrollbar py-0.5",children:L.map(c=>e.jsxs("button",{type:"button",onClick:()=>P(c.text),className:"px-2.5 py-1 rounded-lg bg-white border border-slate-200 hover:border-blue-400 text-[11px] text-slate-700 whitespace-nowrap active:scale-95 transition-all shadow-xs",title:c.text,children:[e.jsx("i",{className:"fa-solid fa-bolt text-amber-500 mr-1 text-[10px]"}),e.jsx("span",{children:c.title})]},c.id))})]}),s.role==="viewer"?null:e.jsxs("form",{onSubmit:sn,className:"space-y-2 pt-1","aria-label":"เขียนความคิดเห็น",children:[e.jsx(ps,{value:ae,onChange:ge,onBusyChange:c=>ie("main",c),disabled:Y,recordId:m.id,recordType:m.type,recordTitle:m.id}),(oe||ce)&&e.jsxs("div",{className:"flex flex-wrap items-center gap-2 px-1",children:[oe&&e.jsxs("div",{className:"flex items-center gap-1.5 px-2 py-1 bg-blue-50 border border-blue-200 rounded-lg text-xs text-blue-800",children:[e.jsx(_e,{className:"w-3.5 h-3.5 text-blue-600"}),e.jsx("span",{children:"เสียงอัดสด:"}),e.jsx("audio",{controls:!0,src:oe,className:"h-6 w-36"}),e.jsx("button",{type:"button",onClick:()=>Me(null),className:"text-slate-400 hover:text-rose-600",children:e.jsx(Je,{className:"w-3 h-3"})})]}),ce&&e.jsxs("div",{className:"flex items-center gap-1.5 text-xs text-blue-600 font-medium",children:[e.jsx($n,{className:"w-3.5 h-3.5 animate-spin"}),e.jsx("span",{children:"กำลังอัปโหลดไฟล์สื่อ..."})]})]}),e.jsxs("div",{className:"flex gap-1.5 items-center flex-wrap sm:flex-nowrap",children:[e.jsx("input",{type:"text",placeholder:`พิมพ์ข้อคิดเห็นใหม่ในฐานะ ${s.alias}...`,disabled:Y,value:R,onChange:c=>P(c.target.value),className:"flex-1 min-w-[140px] h-8 bg-white border border-slate-200 rounded-lg px-2.5 text-xs text-slate-900 focus:outline-none focus:border-blue-500 shadow-2xs"}),e.jsxs("button",{type:"button",title:se==="main"?"กดเพื่อหยุดอัดเสียงสด":"กดเพื่ออัดเสียงสดในคอมเมนต์",disabled:Y||ce,onClick:()=>void It("main"),className:`h-8 px-2.5 rounded-lg border text-[11px] font-bold inline-flex items-center justify-center gap-1 transition-all shrink-0 ${se==="main"?"bg-rose-600 text-white border-rose-600 animate-pulse shadow-xs":"bg-white border-slate-200 hover:border-blue-500 hover:bg-blue-50 text-slate-700 hover:text-blue-700"}`,children:[e.jsx(_e,{className:"w-3.5 h-3.5"}),e.jsx("span",{children:se==="main"?`หยุดอัด (${ze}s)`:"อัดเสียงสด"})]}),e.jsxs("button",{type:"submit",disabled:Y||xe.main||ce||!!se,className:"h-8 px-3 rounded-lg bg-blue-600 hover:bg-blue-700 text-white text-[11px] font-bold shadow-2xs active:scale-95 transition-all inline-flex items-center justify-center gap-1 shrink-0 disabled:opacity-50",children:[e.jsx(kn,{className:"w-3 h-3"}),e.jsx("span",{children:Y?"กำลังส่ง…":"โพสต์"})]})]})]})]}),e.jsx(_n,{item:m,users:w},m.id)]}),e.jsxs("div",{className:"p-3 sm:p-3.5 border-t border-slate-100 bg-white flex items-center justify-between gap-2 select-none",children:[e.jsxs("div",{className:"text-[11px] text-slate-400 font-mono truncate hidden sm:block",children:["ID: ",m.id," · ปรับปรุง:"," ",new Date(m.updatedAt).toLocaleTimeString("th-TH")]}),e.jsxs("div",{className:"flex items-center justify-end gap-1.5 sm:gap-2 w-full sm:w-auto",children:[I&&e.jsxs("button",{type:"button",onClick:At,className:"px-2.5 sm:px-3 py-1.5 text-xs font-bold rounded-xl bg-rose-50 hover:bg-rose-100 text-rose-700 border border-rose-200 flex items-center justify-center gap-1.5 transition-colors whitespace-nowrap active:scale-95 shrink-0",title:"ลบรายการ",children:[e.jsx(ls,{className:"w-3.5 h-3.5 text-rose-600 shrink-0"}),e.jsx("span",{children:"ลบรายการ"})]}),V&&e.jsxs("button",{type:"button",onClick:()=>$(m),className:"px-2.5 sm:px-3.5 py-1.5 text-xs font-bold rounded-xl bg-amber-50 hover:bg-amber-100 text-amber-800 border border-amber-300 flex items-center justify-center gap-1.5 transition-colors whitespace-nowrap active:scale-95 shrink-0",children:[e.jsx(os,{className:"w-3.5 h-3.5 text-amber-600 shrink-0"}),e.jsx("span",{children:"แก้ไขข้อมูล"})]}),e.jsx("button",{onClick:l,className:"px-3.5 sm:px-4 py-1.5 text-xs font-bold rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 transition-colors whitespace-nowrap active:scale-95 shrink-0",children:"ปิด"})]})]})]}),j!==null&&K[j]&&e.jsxs("div",{className:"fixed inset-0 z-[140] bg-black/92 backdrop-blur-md flex flex-col items-center justify-between p-3 sm:p-6 select-none",onClick:()=>C(null),children:[e.jsxs("div",{className:"w-full max-w-4xl flex items-center justify-between text-white z-10",onClick:c=>c.stopPropagation(),children:[e.jsxs("div",{className:"flex items-center gap-2",children:[e.jsxs("span",{className:"px-2.5 py-1 rounded-full bg-white/15 font-mono text-xs font-bold",children:["รูปที่ ",j+1," / ",K.length]}),e.jsx("span",{className:"text-xs sm:text-sm font-semibold text-white/90 truncate max-w-[240px] sm:max-w-md",children:K[j].label})]}),e.jsx("button",{type:"button",onClick:()=>C(null),className:"w-9 h-9 rounded-full bg-white/15 hover:bg-white/25 text-white flex items-center justify-center transition-colors",children:e.jsx(Je,{className:"w-5 h-5"})})]}),e.jsxs("div",{className:"relative flex-1 w-full max-w-5xl flex items-center justify-center my-2",onClick:c=>c.stopPropagation(),children:[K.length>1&&e.jsx("button",{type:"button",onClick:()=>C((j-1+K.length)%K.length),className:"absolute left-1 sm:left-3 z-20 w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-black/60 hover:bg-black/80 border border-white/25 text-white flex items-center justify-center shadow-lg active:scale-95 transition-all",title:"รูปก่อนหน้า (◀)",children:e.jsx(Cn,{className:"w-6 h-6"})}),e.jsx(He,{imageSize:2e3,src:K[j].url,alt:K[j].label,className:"max-w-full max-h-[72vh] object-contain rounded-xl shadow-2xl"}),K.length>1&&e.jsx("button",{type:"button",onClick:()=>C((j+1)%K.length),className:"absolute right-1 sm:right-3 z-20 w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-black/60 hover:bg-black/80 border border-white/25 text-white flex items-center justify-center shadow-lg active:scale-95 transition-all",title:"รูปถัดไป (▶)",children:e.jsx(Sn,{className:"w-6 h-6"})})]}),e.jsxs("div",{className:"flex gap-4 py-2 text-sm text-white underline",onClick:c=>c.stopPropagation(),children:[e.jsx("a",{href:Oe(K[j].url,0),target:"_blank",rel:"noreferrer",children:"ดูเต็มความละเอียด"}),e.jsx("a",{href:Os(K[j].url),target:"_blank",rel:"noreferrer",children:"เปิดไฟล์ต้นฉบับ"})]}),K.length>1&&e.jsx("div",{className:"w-full max-w-3xl flex items-center justify-center gap-2 overflow-x-auto py-1 z-10",onClick:c=>c.stopPropagation(),children:K.map((c,N)=>e.jsx("button",{type:"button",onClick:()=>C(N),className:`relative w-12 h-12 sm:w-14 sm:h-14 rounded-lg overflow-hidden shrink-0 border-2 transition-all ${N===j?"border-emerald-400 scale-105 shadow-md":"border-white/20 opacity-60 hover:opacity-100"}`,children:e.jsx(He,{src:c.url,className:"w-full h-full object-cover"})},N))})]})]})};export{br as DetailModal};
