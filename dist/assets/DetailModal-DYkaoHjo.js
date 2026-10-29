import{c as Ce,H as bn,z as ie,u as vn,r as W,I as fe,J as De,j as e,F as wn,n as yn,X as we,P as Rt,K as Nn,N as jn,w as Te,f as $n,V as Ue,M as Cn,e as kn,O as St,Q as En,W as Rn,Y as Ae,S as Sn,Z as Tn,C as An,G as In}from"./index-BBASvPXV.js";import{F as Bn,V as Pn}from"./VideoPlayer-8AFKQIVo.js";import{M as Ie}from"./mic-DFz4N5_B.js";import{Z as Ln}from"./zap-CoAdtcST.js";/**
 * @license lucide-react v1.62.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const on={name:"file-down",size:24,node:[["path",{d:"M6 22a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h8a2.4 2.4 0 0 1 1.704.706l3.588 3.588A2.4 2.4 0 0 1 20 8v12a2 2 0 0 1-2 2z",key:"1oefj6"}],["path",{d:"M14 2v5a1 1 0 0 0 1 1h5",key:"wfsgrz"}],["path",{d:"M12 18v-6",key:"17g6i2"}],["path",{d:"m9 15 3 3 3-3",key:"1npd3o"}]]};on.node;const Mn=Ce(on);/**
 * @license lucide-react v1.62.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const an={name:"loader-circle",size:24,node:[["path",{d:"M21 12a9 9 0 1 1-6.219-8.56",key:"13zald"}]],aliases:["loader-2"]};an.node;const Dn=Ce(an);/**
 * @license lucide-react v1.62.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const ln={name:"pause",size:24,node:[["rect",{x:"14",y:"3",width:"5",height:"18",rx:"1",key:"kaeet6"}],["rect",{x:"5",y:"3",width:"5",height:"18",rx:"1",key:"1wsw3u"}]]};ln.node;const ze=Ce(ln);/**
 * @license lucide-react v1.62.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const cn={name:"play",size:24,node:[["path",{d:"M5 5a2 2 0 0 1 3.008-1.728l11.997 6.998a2 2 0 0 1 .003 3.458l-12 7A2 2 0 0 1 5 19z",key:"10ikf1"}]]};cn.node;const qe=Ce(cn);/**
 * @license lucide-react v1.62.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const dn={name:"printer",size:24,node:[["path",{d:"M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2",key:"143wyd"}],["path",{d:"M6 9V3a1 1 0 0 1 1-1h10a1 1 0 0 1 1 1v6",key:"1itne7"}],["rect",{x:"6",y:"14",width:"12",height:"8",rx:"1",key:"1ue0tg"}]]};dn.node;const Un=Ce(dn);var ye={},Fe,Tt;function zn(){return Tt||(Tt=1,Fe=function(){return typeof Promise=="function"&&Promise.prototype&&Promise.prototype.then}),Fe}var _e={},pe={},At;function ge(){if(At)return pe;At=1;let s;const i=[0,26,44,70,100,134,172,196,242,292,346,404,466,532,581,655,733,815,901,991,1085,1156,1258,1364,1474,1588,1706,1828,1921,2051,2185,2323,2465,2611,2761,2876,3034,3196,3362,3532,3706];return pe.getSymbolSize=function(r){if(!r)throw new Error('"version" cannot be null or undefined');if(r<1||r>40)throw new Error('"version" should be in range from 1 to 40');return r*4+17},pe.getSymbolTotalCodewords=function(r){return i[r]},pe.getBCHDigit=function(a){let r=0;for(;a!==0;)r++,a>>>=1;return r},pe.setToSJISFunction=function(r){if(typeof r!="function")throw new Error('"toSJISFunc" is not a valid function.');s=r},pe.isKanjiModeEnabled=function(){return typeof s<"u"},pe.toSJIS=function(r){return s(r)},pe}var He={},It;function dt(){return It||(It=1,(function(s){s.L={bit:1},s.M={bit:0},s.Q={bit:3},s.H={bit:2};function i(a){if(typeof a!="string")throw new Error("Param is not a string");switch(a.toLowerCase()){case"l":case"low":return s.L;case"m":case"medium":return s.M;case"q":case"quartile":return s.Q;case"h":case"high":return s.H;default:throw new Error("Unknown EC Level: "+a)}}s.isValid=function(r){return r&&typeof r.bit<"u"&&r.bit>=0&&r.bit<4},s.from=function(r,t){if(s.isValid(r))return r;try{return i(r)}catch{return t}}})(He)),He}var Ve,Bt;function qn(){if(Bt)return Ve;Bt=1;function s(){this.buffer=[],this.length=0}return s.prototype={get:function(i){const a=Math.floor(i/8);return(this.buffer[a]>>>7-i%8&1)===1},put:function(i,a){for(let r=0;r<a;r++)this.putBit((i>>>a-r-1&1)===1)},getLengthInBits:function(){return this.length},putBit:function(i){const a=Math.floor(this.length/8);this.buffer.length<=a&&this.buffer.push(0),i&&(this.buffer[a]|=128>>>this.length%8),this.length++}},Ve=s,Ve}var Oe,Pt;function Fn(){if(Pt)return Oe;Pt=1;function s(i){if(!i||i<1)throw new Error("BitMatrix size must be defined and greater than 0");this.size=i,this.data=new Uint8Array(i*i),this.reservedBit=new Uint8Array(i*i)}return s.prototype.set=function(i,a,r,t){const n=i*this.size+a;this.data[n]=r,t&&(this.reservedBit[n]=!0)},s.prototype.get=function(i,a){return this.data[i*this.size+a]},s.prototype.xor=function(i,a,r){this.data[i*this.size+a]^=r},s.prototype.isReserved=function(i,a){return this.reservedBit[i*this.size+a]},Oe=s,Oe}var Ke={},Lt;function _n(){return Lt||(Lt=1,(function(s){const i=ge().getSymbolSize;s.getRowColCoords=function(r){if(r===1)return[];const t=Math.floor(r/7)+2,n=i(r),l=n===145?26:Math.ceil((n-13)/(2*t-2))*2,c=[n-7];for(let d=1;d<t-1;d++)c[d]=c[d-1]-l;return c.push(6),c.reverse()},s.getPositions=function(r){const t=[],n=s.getRowColCoords(r),l=n.length;for(let c=0;c<l;c++)for(let d=0;d<l;d++)c===0&&d===0||c===0&&d===l-1||c===l-1&&d===0||t.push([n[c],n[d]]);return t}})(Ke)),Ke}var Qe={},Mt;function Hn(){if(Mt)return Qe;Mt=1;const s=ge().getSymbolSize,i=7;return Qe.getPositions=function(r){const t=s(r);return[[0,0],[t-i,0],[0,t-i]]},Qe}var Ge={},Dt;function Vn(){return Dt||(Dt=1,(function(s){s.Patterns={PATTERN000:0,PATTERN001:1,PATTERN010:2,PATTERN011:3,PATTERN100:4,PATTERN101:5,PATTERN110:6,PATTERN111:7};const i={N1:3,N2:3,N3:40,N4:10};s.isValid=function(t){return t!=null&&t!==""&&!isNaN(t)&&t>=0&&t<=7},s.from=function(t){return s.isValid(t)?parseInt(t,10):void 0},s.getPenaltyN1=function(t){const n=t.size;let l=0,c=0,d=0,x=null,j=null;for(let B=0;B<n;B++){c=d=0,x=j=null;for(let I=0;I<n;I++){let w=t.get(B,I);w===x?c++:(c>=5&&(l+=i.N1+(c-5)),x=w,c=1),w=t.get(I,B),w===j?d++:(d>=5&&(l+=i.N1+(d-5)),j=w,d=1)}c>=5&&(l+=i.N1+(c-5)),d>=5&&(l+=i.N1+(d-5))}return l},s.getPenaltyN2=function(t){const n=t.size;let l=0;for(let c=0;c<n-1;c++)for(let d=0;d<n-1;d++){const x=t.get(c,d)+t.get(c,d+1)+t.get(c+1,d)+t.get(c+1,d+1);(x===4||x===0)&&l++}return l*i.N2},s.getPenaltyN3=function(t){const n=t.size;let l=0,c=0,d=0;for(let x=0;x<n;x++){c=d=0;for(let j=0;j<n;j++)c=c<<1&2047|t.get(x,j),j>=10&&(c===1488||c===93)&&l++,d=d<<1&2047|t.get(j,x),j>=10&&(d===1488||d===93)&&l++}return l*i.N3},s.getPenaltyN4=function(t){let n=0;const l=t.data.length;for(let d=0;d<l;d++)n+=t.data[d];return Math.abs(Math.ceil(n*100/l/5)-10)*i.N4};function a(r,t,n){switch(r){case s.Patterns.PATTERN000:return(t+n)%2===0;case s.Patterns.PATTERN001:return t%2===0;case s.Patterns.PATTERN010:return n%3===0;case s.Patterns.PATTERN011:return(t+n)%3===0;case s.Patterns.PATTERN100:return(Math.floor(t/2)+Math.floor(n/3))%2===0;case s.Patterns.PATTERN101:return t*n%2+t*n%3===0;case s.Patterns.PATTERN110:return(t*n%2+t*n%3)%2===0;case s.Patterns.PATTERN111:return(t*n%3+(t+n)%2)%2===0;default:throw new Error("bad maskPattern:"+r)}}s.applyMask=function(t,n){const l=n.size;for(let c=0;c<l;c++)for(let d=0;d<l;d++)n.isReserved(d,c)||n.xor(d,c,a(t,d,c))},s.getBestMask=function(t,n){const l=Object.keys(s.Patterns).length;let c=0,d=1/0;for(let x=0;x<l;x++){n(x),s.applyMask(x,t);const j=s.getPenaltyN1(t)+s.getPenaltyN2(t)+s.getPenaltyN3(t)+s.getPenaltyN4(t);s.applyMask(x,t),j<d&&(d=j,c=x)}return c}})(Ge)),Ge}var Be={},Ut;function un(){if(Ut)return Be;Ut=1;const s=dt(),i=[1,1,1,1,1,1,1,1,1,1,2,2,1,2,2,4,1,2,4,4,2,4,4,4,2,4,6,5,2,4,6,6,2,5,8,8,4,5,8,8,4,5,8,11,4,8,10,11,4,9,12,16,4,9,16,16,6,10,12,18,6,10,17,16,6,11,16,19,6,13,18,21,7,14,21,25,8,16,20,25,8,17,23,25,9,17,23,34,9,18,25,30,10,20,27,32,12,21,29,35,12,23,34,37,12,25,34,40,13,26,35,42,14,28,38,45,15,29,40,48,16,31,43,51,17,33,45,54,18,35,48,57,19,37,51,60,19,38,53,63,20,40,56,66,21,43,59,70,22,45,62,74,24,47,65,77,25,49,68,81],a=[7,10,13,17,10,16,22,28,15,26,36,44,20,36,52,64,26,48,72,88,36,64,96,112,40,72,108,130,48,88,132,156,60,110,160,192,72,130,192,224,80,150,224,264,96,176,260,308,104,198,288,352,120,216,320,384,132,240,360,432,144,280,408,480,168,308,448,532,180,338,504,588,196,364,546,650,224,416,600,700,224,442,644,750,252,476,690,816,270,504,750,900,300,560,810,960,312,588,870,1050,336,644,952,1110,360,700,1020,1200,390,728,1050,1260,420,784,1140,1350,450,812,1200,1440,480,868,1290,1530,510,924,1350,1620,540,980,1440,1710,570,1036,1530,1800,570,1064,1590,1890,600,1120,1680,1980,630,1204,1770,2100,660,1260,1860,2220,720,1316,1950,2310,750,1372,2040,2430];return Be.getBlocksCount=function(t,n){switch(n){case s.L:return i[(t-1)*4+0];case s.M:return i[(t-1)*4+1];case s.Q:return i[(t-1)*4+2];case s.H:return i[(t-1)*4+3];default:return}},Be.getTotalCodewordsCount=function(t,n){switch(n){case s.L:return a[(t-1)*4+0];case s.M:return a[(t-1)*4+1];case s.Q:return a[(t-1)*4+2];case s.H:return a[(t-1)*4+3];default:return}},Be}var Je={},$e={},zt;function On(){if(zt)return $e;zt=1;const s=new Uint8Array(512),i=new Uint8Array(256);return(function(){let r=1;for(let t=0;t<255;t++)s[t]=r,i[r]=t,r<<=1,r&256&&(r^=285);for(let t=255;t<512;t++)s[t]=s[t-255]})(),$e.log=function(r){if(r<1)throw new Error("log("+r+")");return i[r]},$e.exp=function(r){return s[r]},$e.mul=function(r,t){return r===0||t===0?0:s[i[r]+i[t]]},$e}var qt;function Kn(){return qt||(qt=1,(function(s){const i=On();s.mul=function(r,t){const n=new Uint8Array(r.length+t.length-1);for(let l=0;l<r.length;l++)for(let c=0;c<t.length;c++)n[l+c]^=i.mul(r[l],t[c]);return n},s.mod=function(r,t){let n=new Uint8Array(r);for(;n.length-t.length>=0;){const l=n[0];for(let d=0;d<t.length;d++)n[d]^=i.mul(t[d],l);let c=0;for(;c<n.length&&n[c]===0;)c++;n=n.slice(c)}return n},s.generateECPolynomial=function(r){let t=new Uint8Array([1]);for(let n=0;n<r;n++)t=s.mul(t,new Uint8Array([1,i.exp(n)]));return t}})(Je)),Je}var Ye,Ft;function Qn(){if(Ft)return Ye;Ft=1;const s=Kn();function i(a){this.genPoly=void 0,this.degree=a,this.degree&&this.initialize(this.degree)}return i.prototype.initialize=function(r){this.degree=r,this.genPoly=s.generateECPolynomial(this.degree)},i.prototype.encode=function(r){if(!this.genPoly)throw new Error("Encoder not initialized");const t=new Uint8Array(r.length+this.degree);t.set(r);const n=s.mod(t,this.genPoly),l=this.degree-n.length;if(l>0){const c=new Uint8Array(this.degree);return c.set(n,l),c}return n},Ye=i,Ye}var We={},Ze={},Xe={},_t;function hn(){return _t||(_t=1,Xe.isValid=function(i){return!isNaN(i)&&i>=1&&i<=40}),Xe}var oe={},Ht;function fn(){if(Ht)return oe;Ht=1;const s="[0-9]+",i="[A-Z $%*+\\-./:]+";let a="(?:[u3000-u303F]|[u3040-u309F]|[u30A0-u30FF]|[uFF00-uFFEF]|[u4E00-u9FAF]|[u2605-u2606]|[u2190-u2195]|u203B|[u2010u2015u2018u2019u2025u2026u201Cu201Du2225u2260]|[u0391-u0451]|[u00A7u00A8u00B1u00B4u00D7u00F7])+";a=a.replace(/u/g,"\\u");const r="(?:(?![A-Z0-9 $%*+\\-./:]|"+a+`)(?:.|[\r
]))+`;oe.KANJI=new RegExp(a,"g"),oe.BYTE_KANJI=new RegExp("[^A-Z0-9 $%*+\\-./:]+","g"),oe.BYTE=new RegExp(r,"g"),oe.NUMERIC=new RegExp(s,"g"),oe.ALPHANUMERIC=new RegExp(i,"g");const t=new RegExp("^"+a+"$"),n=new RegExp("^"+s+"$"),l=new RegExp("^[A-Z0-9 $%*+\\-./:]+$");return oe.testKanji=function(d){return t.test(d)},oe.testNumeric=function(d){return n.test(d)},oe.testAlphanumeric=function(d){return l.test(d)},oe}var Vt;function xe(){return Vt||(Vt=1,(function(s){const i=hn(),a=fn();s.NUMERIC={id:"Numeric",bit:1,ccBits:[10,12,14]},s.ALPHANUMERIC={id:"Alphanumeric",bit:2,ccBits:[9,11,13]},s.BYTE={id:"Byte",bit:4,ccBits:[8,16,16]},s.KANJI={id:"Kanji",bit:8,ccBits:[8,10,12]},s.MIXED={bit:-1},s.getCharCountIndicator=function(n,l){if(!n.ccBits)throw new Error("Invalid mode: "+n);if(!i.isValid(l))throw new Error("Invalid version: "+l);return l>=1&&l<10?n.ccBits[0]:l<27?n.ccBits[1]:n.ccBits[2]},s.getBestModeForData=function(n){return a.testNumeric(n)?s.NUMERIC:a.testAlphanumeric(n)?s.ALPHANUMERIC:a.testKanji(n)?s.KANJI:s.BYTE},s.toString=function(n){if(n&&n.id)return n.id;throw new Error("Invalid mode")},s.isValid=function(n){return n&&n.bit&&n.ccBits};function r(t){if(typeof t!="string")throw new Error("Param is not a string");switch(t.toLowerCase()){case"numeric":return s.NUMERIC;case"alphanumeric":return s.ALPHANUMERIC;case"kanji":return s.KANJI;case"byte":return s.BYTE;default:throw new Error("Unknown mode: "+t)}}s.from=function(n,l){if(s.isValid(n))return n;try{return r(n)}catch{return l}}})(Ze)),Ze}var Ot;function Gn(){return Ot||(Ot=1,(function(s){const i=ge(),a=un(),r=dt(),t=xe(),n=hn(),l=7973,c=i.getBCHDigit(l);function d(I,w,M){for(let R=1;R<=40;R++)if(w<=s.getCapacity(R,M,I))return R}function x(I,w){return t.getCharCountIndicator(I,w)+4}function j(I,w){let M=0;return I.forEach(function(R){const V=x(R.mode,w);M+=V+R.getBitsLength()}),M}function B(I,w){for(let M=1;M<=40;M++)if(j(I,M)<=s.getCapacity(M,w,t.MIXED))return M}s.from=function(w,M){return n.isValid(w)?parseInt(w,10):M},s.getCapacity=function(w,M,R){if(!n.isValid(w))throw new Error("Invalid QR Code version");typeof R>"u"&&(R=t.BYTE);const V=i.getSymbolTotalCodewords(w),E=a.getTotalCodewordsCount(w,M),D=(V-E)*8;if(R===t.MIXED)return D;const L=D-x(R,w);switch(R){case t.NUMERIC:return Math.floor(L/10*3);case t.ALPHANUMERIC:return Math.floor(L/11*2);case t.KANJI:return Math.floor(L/13);case t.BYTE:default:return Math.floor(L/8)}},s.getBestVersionForData=function(w,M){let R;const V=r.from(M,r.M);if(Array.isArray(w)){if(w.length>1)return B(w,V);if(w.length===0)return 1;R=w[0]}else R=w;return d(R.mode,R.getLength(),V)},s.getEncodedBits=function(w){if(!n.isValid(w)||w<7)throw new Error("Invalid QR Code version");let M=w<<12;for(;i.getBCHDigit(M)-c>=0;)M^=l<<i.getBCHDigit(M)-c;return w<<12|M}})(We)),We}var et={},Kt;function Jn(){if(Kt)return et;Kt=1;const s=ge(),i=1335,a=21522,r=s.getBCHDigit(i);return et.getEncodedBits=function(n,l){const c=n.bit<<3|l;let d=c<<10;for(;s.getBCHDigit(d)-r>=0;)d^=i<<s.getBCHDigit(d)-r;return(c<<10|d)^a},et}var tt={},nt,Qt;function Yn(){if(Qt)return nt;Qt=1;const s=xe();function i(a){this.mode=s.NUMERIC,this.data=a.toString()}return i.getBitsLength=function(r){return 10*Math.floor(r/3)+(r%3?r%3*3+1:0)},i.prototype.getLength=function(){return this.data.length},i.prototype.getBitsLength=function(){return i.getBitsLength(this.data.length)},i.prototype.write=function(r){let t,n,l;for(t=0;t+3<=this.data.length;t+=3)n=this.data.substr(t,3),l=parseInt(n,10),r.put(l,10);const c=this.data.length-t;c>0&&(n=this.data.substr(t),l=parseInt(n,10),r.put(l,c*3+1))},nt=i,nt}var st,Gt;function Wn(){if(Gt)return st;Gt=1;const s=xe(),i=["0","1","2","3","4","5","6","7","8","9","A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z"," ","$","%","*","+","-",".","/",":"];function a(r){this.mode=s.ALPHANUMERIC,this.data=r}return a.getBitsLength=function(t){return 11*Math.floor(t/2)+6*(t%2)},a.prototype.getLength=function(){return this.data.length},a.prototype.getBitsLength=function(){return a.getBitsLength(this.data.length)},a.prototype.write=function(t){let n;for(n=0;n+2<=this.data.length;n+=2){let l=i.indexOf(this.data[n])*45;l+=i.indexOf(this.data[n+1]),t.put(l,11)}this.data.length%2&&t.put(i.indexOf(this.data[n]),6)},st=a,st}var rt,Jt;function Zn(){if(Jt)return rt;Jt=1;const s=xe();function i(a){this.mode=s.BYTE,typeof a=="string"?this.data=new TextEncoder().encode(a):this.data=new Uint8Array(a)}return i.getBitsLength=function(r){return r*8},i.prototype.getLength=function(){return this.data.length},i.prototype.getBitsLength=function(){return i.getBitsLength(this.data.length)},i.prototype.write=function(a){for(let r=0,t=this.data.length;r<t;r++)a.put(this.data[r],8)},rt=i,rt}var ot,Yt;function Xn(){if(Yt)return ot;Yt=1;const s=xe(),i=ge();function a(r){this.mode=s.KANJI,this.data=r}return a.getBitsLength=function(t){return t*13},a.prototype.getLength=function(){return this.data.length},a.prototype.getBitsLength=function(){return a.getBitsLength(this.data.length)},a.prototype.write=function(r){let t;for(t=0;t<this.data.length;t++){let n=i.toSJIS(this.data[t]);if(n>=33088&&n<=40956)n-=33088;else if(n>=57408&&n<=60351)n-=49472;else throw new Error("Invalid SJIS character: "+this.data[t]+`
Make sure your charset is UTF-8`);n=(n>>>8&255)*192+(n&255),r.put(n,13)}},ot=a,ot}var it={exports:{}},Wt;function es(){return Wt||(Wt=1,(function(s){var i={single_source_shortest_paths:function(a,r,t){var n={},l={};l[r]=0;var c=i.PriorityQueue.make();c.push(r,0);for(var d,x,j,B,I,w,M,R,V;!c.empty();){d=c.pop(),x=d.value,B=d.cost,I=a[x]||{};for(j in I)I.hasOwnProperty(j)&&(w=I[j],M=B+w,R=l[j],V=typeof l[j]>"u",(V||R>M)&&(l[j]=M,c.push(j,M),n[j]=x))}if(typeof t<"u"&&typeof l[t]>"u"){var E=["Could not find a path from ",r," to ",t,"."].join("");throw new Error(E)}return n},extract_shortest_path_from_predecessor_list:function(a,r){for(var t=[],n=r;n;)t.push(n),a[n],n=a[n];return t.reverse(),t},find_path:function(a,r,t){var n=i.single_source_shortest_paths(a,r,t);return i.extract_shortest_path_from_predecessor_list(n,t)},PriorityQueue:{make:function(a){var r=i.PriorityQueue,t={},n;a=a||{};for(n in r)r.hasOwnProperty(n)&&(t[n]=r[n]);return t.queue=[],t.sorter=a.sorter||r.default_sorter,t},default_sorter:function(a,r){return a.cost-r.cost},push:function(a,r){var t={value:a,cost:r};this.queue.push(t),this.queue.sort(this.sorter)},pop:function(){return this.queue.shift()},empty:function(){return this.queue.length===0}}};s.exports=i})(it)),it.exports}var Zt;function ts(){return Zt||(Zt=1,(function(s){const i=xe(),a=Yn(),r=Wn(),t=Zn(),n=Xn(),l=fn(),c=ge(),d=es();function x(E){return unescape(encodeURIComponent(E)).length}function j(E,D,L){const u=[];let q;for(;(q=E.exec(L))!==null;)u.push({data:q[0],index:q.index,mode:D,length:q[0].length});return u}function B(E){const D=j(l.NUMERIC,i.NUMERIC,E),L=j(l.ALPHANUMERIC,i.ALPHANUMERIC,E);let u,q;return c.isKanjiModeEnabled()?(u=j(l.BYTE,i.BYTE,E),q=j(l.KANJI,i.KANJI,E)):(u=j(l.BYTE_KANJI,i.BYTE,E),q=[]),D.concat(L,u,q).sort(function(S,$){return S.index-$.index}).map(function(S){return{data:S.data,mode:S.mode,length:S.length}})}function I(E,D){switch(D){case i.NUMERIC:return a.getBitsLength(E);case i.ALPHANUMERIC:return r.getBitsLength(E);case i.KANJI:return n.getBitsLength(E);case i.BYTE:return t.getBitsLength(E)}}function w(E){return E.reduce(function(D,L){const u=D.length-1>=0?D[D.length-1]:null;return u&&u.mode===L.mode?(D[D.length-1].data+=L.data,D):(D.push(L),D)},[])}function M(E){const D=[];for(let L=0;L<E.length;L++){const u=E[L];switch(u.mode){case i.NUMERIC:D.push([u,{data:u.data,mode:i.ALPHANUMERIC,length:u.length},{data:u.data,mode:i.BYTE,length:u.length}]);break;case i.ALPHANUMERIC:D.push([u,{data:u.data,mode:i.BYTE,length:u.length}]);break;case i.KANJI:D.push([u,{data:u.data,mode:i.BYTE,length:x(u.data)}]);break;case i.BYTE:D.push([{data:u.data,mode:i.BYTE,length:x(u.data)}])}}return D}function R(E,D){const L={},u={start:{}};let q=["start"];for(let g=0;g<E.length;g++){const S=E[g],$=[];for(let N=0;N<S.length;N++){const P=S[N],C=""+g+N;$.push(C),L[C]={node:P,lastCount:0},u[C]={};for(let k=0;k<q.length;k++){const T=q[k];L[T]&&L[T].node.mode===P.mode?(u[T][C]=I(L[T].lastCount+P.length,P.mode)-I(L[T].lastCount,P.mode),L[T].lastCount+=P.length):(L[T]&&(L[T].lastCount=P.length),u[T][C]=I(P.length,P.mode)+4+i.getCharCountIndicator(P.mode,D))}}q=$}for(let g=0;g<q.length;g++)u[q[g]].end=0;return{map:u,table:L}}function V(E,D){let L;const u=i.getBestModeForData(E);if(L=i.from(D,u),L!==i.BYTE&&L.bit<u.bit)throw new Error('"'+E+'" cannot be encoded with mode '+i.toString(L)+`.
 Suggested mode is: `+i.toString(u));switch(L===i.KANJI&&!c.isKanjiModeEnabled()&&(L=i.BYTE),L){case i.NUMERIC:return new a(E);case i.ALPHANUMERIC:return new r(E);case i.KANJI:return new n(E);case i.BYTE:return new t(E)}}s.fromArray=function(D){return D.reduce(function(L,u){return typeof u=="string"?L.push(V(u,null)):u.data&&L.push(V(u.data,u.mode)),L},[])},s.fromString=function(D,L){const u=B(D,c.isKanjiModeEnabled()),q=M(u),g=R(q,L),S=d.find_path(g.map,"start","end"),$=[];for(let N=1;N<S.length-1;N++)$.push(g.table[S[N]].node);return s.fromArray(w($))},s.rawSplit=function(D){return s.fromArray(B(D,c.isKanjiModeEnabled()))}})(tt)),tt}var Xt;function ns(){if(Xt)return _e;Xt=1;const s=ge(),i=dt(),a=qn(),r=Fn(),t=_n(),n=Hn(),l=Vn(),c=un(),d=Qn(),x=Gn(),j=Jn(),B=xe(),I=ts();function w(g,S){const $=g.size,N=n.getPositions(S);for(let P=0;P<N.length;P++){const C=N[P][0],k=N[P][1];for(let T=-1;T<=7;T++)if(!(C+T<=-1||$<=C+T))for(let A=-1;A<=7;A++)k+A<=-1||$<=k+A||(T>=0&&T<=6&&(A===0||A===6)||A>=0&&A<=6&&(T===0||T===6)||T>=2&&T<=4&&A>=2&&A<=4?g.set(C+T,k+A,!0,!0):g.set(C+T,k+A,!1,!0))}}function M(g){const S=g.size;for(let $=8;$<S-8;$++){const N=$%2===0;g.set($,6,N,!0),g.set(6,$,N,!0)}}function R(g,S){const $=t.getPositions(S);for(let N=0;N<$.length;N++){const P=$[N][0],C=$[N][1];for(let k=-2;k<=2;k++)for(let T=-2;T<=2;T++)k===-2||k===2||T===-2||T===2||k===0&&T===0?g.set(P+k,C+T,!0,!0):g.set(P+k,C+T,!1,!0)}}function V(g,S){const $=g.size,N=x.getEncodedBits(S);let P,C,k;for(let T=0;T<18;T++)P=Math.floor(T/3),C=T%3+$-8-3,k=(N>>T&1)===1,g.set(P,C,k,!0),g.set(C,P,k,!0)}function E(g,S,$){const N=g.size,P=j.getEncodedBits(S,$);let C,k;for(C=0;C<15;C++)k=(P>>C&1)===1,C<6?g.set(C,8,k,!0):C<8?g.set(C+1,8,k,!0):g.set(N-15+C,8,k,!0),C<8?g.set(8,N-C-1,k,!0):C<9?g.set(8,15-C-1+1,k,!0):g.set(8,15-C-1,k,!0);g.set(N-8,8,1,!0)}function D(g,S){const $=g.size;let N=-1,P=$-1,C=7,k=0;for(let T=$-1;T>0;T-=2)for(T===6&&T--;;){for(let A=0;A<2;A++)if(!g.isReserved(P,T-A)){let K=!1;k<S.length&&(K=(S[k]>>>C&1)===1),g.set(P,T-A,K),C--,C===-1&&(k++,C=7)}if(P+=N,P<0||$<=P){P-=N,N=-N;break}}}function L(g,S,$){const N=new a;$.forEach(function(A){N.put(A.mode.bit,4),N.put(A.getLength(),B.getCharCountIndicator(A.mode,g)),A.write(N)});const P=s.getSymbolTotalCodewords(g),C=c.getTotalCodewordsCount(g,S),k=(P-C)*8;for(N.getLengthInBits()+4<=k&&N.put(0,4);N.getLengthInBits()%8!==0;)N.putBit(0);const T=(k-N.getLengthInBits())/8;for(let A=0;A<T;A++)N.put(A%2?17:236,8);return u(N,g,S)}function u(g,S,$){const N=s.getSymbolTotalCodewords(S),P=c.getTotalCodewordsCount(S,$),C=N-P,k=c.getBlocksCount(S,$),T=N%k,A=k-T,K=Math.floor(N/k),X=Math.floor(C/k),ce=X+1,me=K-X,Ne=new d(me);let de=0;const ee=new Array(k),ae=new Array(k);let te=0;const ue=new Uint8Array(g.buffer);for(let m=0;m<k;m++){const f=m<A?X:ce;ee[m]=ue.slice(de,de+f),ae[m]=Ne.encode(ee[m]),de+=f,te=Math.max(te,f)}const Z=new Uint8Array(N);let he=0,Q,J;for(Q=0;Q<te;Q++)for(J=0;J<k;J++)Q<ee[J].length&&(Z[he++]=ee[J][Q]);for(Q=0;Q<me;Q++)for(J=0;J<k;J++)Z[he++]=ae[J][Q];return Z}function q(g,S,$,N){let P;if(Array.isArray(g))P=I.fromArray(g);else if(typeof g=="string"){let K=S;if(!K){const X=I.rawSplit(g);K=x.getBestVersionForData(X,$)}P=I.fromString(g,K||40)}else throw new Error("Invalid data");const C=x.getBestVersionForData(P,$);if(!C)throw new Error("The amount of data is too big to be stored in a QR Code");if(!S)S=C;else if(S<C)throw new Error(`
The chosen QR Code version cannot contain this amount of data.
Minimum version required to store current data is: `+C+`.
`);const k=L(S,$,P),T=s.getSymbolSize(S),A=new r(T);return w(A,S),M(A),R(A,S),E(A,$,0),S>=7&&V(A,S),D(A,k),isNaN(N)&&(N=l.getBestMask(A,E.bind(null,A,$))),l.applyMask(N,A),E(A,$,N),{modules:A,version:S,errorCorrectionLevel:$,maskPattern:N,segments:P}}return _e.create=function(S,$){if(typeof S>"u"||S==="")throw new Error("No input text");let N=i.M,P,C;return typeof $<"u"&&(N=i.from($.errorCorrectionLevel,i.M),P=x.from($.version),C=l.from($.maskPattern),$.toSJISFunc&&s.setToSJISFunction($.toSJISFunc)),q(S,P,N,C)},_e}var at={},lt={},en;function pn(){return en||(en=1,(function(s){function i(a){if(typeof a=="number"&&(a=a.toString()),typeof a!="string")throw new Error("Color should be defined as hex string");let r=a.slice().replace("#","").split("");if(r.length<3||r.length===5||r.length>8)throw new Error("Invalid hex color: "+a);(r.length===3||r.length===4)&&(r=Array.prototype.concat.apply([],r.map(function(n){return[n,n]}))),r.length===6&&r.push("F","F");const t=parseInt(r.join(""),16);return{r:t>>24&255,g:t>>16&255,b:t>>8&255,a:t&255,hex:"#"+r.slice(0,6).join("")}}s.getOptions=function(r){r||(r={}),r.color||(r.color={});const t=typeof r.margin>"u"||r.margin===null||r.margin<0?4:r.margin,n=r.width&&r.width>=21?r.width:void 0,l=r.scale||4;return{width:n,scale:n?4:l,margin:t,color:{dark:i(r.color.dark||"#000000ff"),light:i(r.color.light||"#ffffffff")},type:r.type,rendererOpts:r.rendererOpts||{}}},s.getScale=function(r,t){return t.width&&t.width>=r+t.margin*2?t.width/(r+t.margin*2):t.scale},s.getImageWidth=function(r,t){const n=s.getScale(r,t);return Math.floor((r+t.margin*2)*n)},s.qrToImageData=function(r,t,n){const l=t.modules.size,c=t.modules.data,d=s.getScale(l,n),x=Math.floor((l+n.margin*2)*d),j=n.margin*d,B=[n.color.light,n.color.dark];for(let I=0;I<x;I++)for(let w=0;w<x;w++){let M=(I*x+w)*4,R=n.color.light;if(I>=j&&w>=j&&I<x-j&&w<x-j){const V=Math.floor((I-j)/d),E=Math.floor((w-j)/d);R=B[c[V*l+E]?1:0]}r[M++]=R.r,r[M++]=R.g,r[M++]=R.b,r[M]=R.a}}})(lt)),lt}var tn;function ss(){return tn||(tn=1,(function(s){const i=pn();function a(t,n,l){t.clearRect(0,0,n.width,n.height),n.style||(n.style={}),n.height=l,n.width=l,n.style.height=l+"px",n.style.width=l+"px"}function r(){try{return document.createElement("canvas")}catch{throw new Error("You need to specify a canvas element")}}s.render=function(n,l,c){let d=c,x=l;typeof d>"u"&&(!l||!l.getContext)&&(d=l,l=void 0),l||(x=r()),d=i.getOptions(d);const j=i.getImageWidth(n.modules.size,d),B=x.getContext("2d"),I=B.createImageData(j,j);return i.qrToImageData(I.data,n,d),a(B,x,j),B.putImageData(I,0,0),x},s.renderToDataURL=function(n,l,c){let d=c;typeof d>"u"&&(!l||!l.getContext)&&(d=l,l=void 0),d||(d={});const x=s.render(n,l,d),j=d.type||"image/png",B=d.rendererOpts||{};return x.toDataURL(j,B.quality)}})(at)),at}var ct={},nn;function rs(){if(nn)return ct;nn=1;const s=pn();function i(t,n){const l=t.a/255,c=n+'="'+t.hex+'"';return l<1?c+" "+n+'-opacity="'+l.toFixed(2).slice(1)+'"':c}function a(t,n,l){let c=t+n;return typeof l<"u"&&(c+=" "+l),c}function r(t,n,l){let c="",d=0,x=!1,j=0;for(let B=0;B<t.length;B++){const I=Math.floor(B%n),w=Math.floor(B/n);!I&&!x&&(x=!0),t[B]?(j++,B>0&&I>0&&t[B-1]||(c+=x?a("M",I+l,.5+w+l):a("m",d,0),d=0,x=!1),I+1<n&&t[B+1]||(c+=a("h",j),j=0)):d++}return c}return ct.render=function(n,l,c){const d=s.getOptions(l),x=n.modules.size,j=n.modules.data,B=x+d.margin*2,I=d.color.light.a?"<path "+i(d.color.light,"fill")+' d="M0 0h'+B+"v"+B+'H0z"/>':"",w="<path "+i(d.color.dark,"stroke")+' d="'+r(j,x,d.margin)+'"/>',M='viewBox="0 0 '+B+" "+B+'"',V='<svg xmlns="http://www.w3.org/2000/svg" '+(d.width?'width="'+d.width+'" height="'+d.width+'" ':"")+M+' shape-rendering="crispEdges">'+I+w+`</svg>
`;return typeof c=="function"&&c(null,V),V},ct}var sn;function os(){if(sn)return ye;sn=1;const s=zn(),i=ns(),a=ss(),r=rs();function t(n,l,c,d,x){const j=[].slice.call(arguments,1),B=j.length,I=typeof j[B-1]=="function";if(!I&&!s())throw new Error("Callback required as last argument");if(I){if(B<2)throw new Error("Too few arguments provided");B===2?(x=c,c=l,l=d=void 0):B===3&&(l.getContext&&typeof x>"u"?(x=d,d=void 0):(x=d,d=c,c=l,l=void 0))}else{if(B<1)throw new Error("Too few arguments provided");return B===1?(c=l,l=d=void 0):B===2&&!l.getContext&&(d=c,c=l,l=void 0),new Promise(function(w,M){try{const R=i.create(c,d);w(n(R,l,d))}catch(R){M(R)}})}try{const w=i.create(c,d);x(null,n(w,l,d))}catch(w){x(w)}}return ye.create=i.create,ye.toCanvas=t.bind(null,a.render),ye.toDataURL=t.bind(null,a.renderToDataURL),ye.toString=t.bind(null,function(n,l,c){return r.render(n,c)}),ye}var is=os();const as=bn(is);function G(s){return s==null?"":String(s).replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;")}function h(s){if(s==null||s==="")return"";const a=String(s).split(/\r?\n/),r=t=>{if(!t)return"";try{const n=Intl;if(typeof Intl<"u"&&n.Segmenter){const l=new n.Segmenter("th",{granularity:"word"}),c=[];for(const d of l.segment(t)){const x=d.segment;/^\s+$/.test(x)?c.push(" "):c.push(`<span class="w-seg">${G(x)}</span>`)}return c.join("")}}catch{}return G(t)};return a.map(r).join("<br/>")}function ls(s){try{const i=as.create(s,{errorCorrectionLevel:"M"}),a=i.modules.size,r=2,t=a+r*2;let n="";for(let c=0;c<a;c++)for(let d=0;d<a;d++)i.modules.get(c,d)&&(n+=`<rect x="${d+r}" y="${c+r}" width="1" height="1" fill="#0f172a"/>`);const l=`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${t} ${t}" width="200" height="200" shape-rendering="crispEdges"><rect width="100%" height="100%" fill="#ffffff"/>${n}</svg>`;return`data:image/svg+xml;utf8,${encodeURIComponent(l)}`}catch{return""}}function cs(s,i,a){var de,ee,ae,te,ue,Z,he,Q,J;const r=s.type==="supplier",t=r?s:null,n=r?null:s,l=r?t.name:n.storeName,c=r?t.chineseName:n.chineseName,d=r?t.category:n.storeCategory||"เรฟร้านน้ำ",x=r?t.marketOrCity:n.city,j=s.country==="TH"?"ประเทศไทย (TH)":"ประเทศจีน (CN)",B=typeof window<"u"&&window.location.origin&&!window.location.hostname.includes("localhost")&&!window.location.hostname.includes("127.0.0.1")?`${window.location.origin}${window.location.pathname}`:"https://vitcha-sourcing-fxjw.onrender.com/",w=`${B.endsWith("/")?B:`${B}/`}?view=${encodeURIComponent(s.id)}&type=${encodeURIComponent(s.type)}`,M=ls(w),R=[];t?((de=t.photos.storefrontAndAtmosphere)==null||de.forEach((m,f)=>R.push({url:m,label:`ป้ายหน้าร้าน / บรรยากาศ #${f+1}`})),(ee=t.photos.contactCards)==null||ee.forEach((m,f)=>R.push({url:m,label:`นามบัตร / WeChat #${f+1}`})),(ae=t.catalogItems)==null||ae.forEach((m,f)=>{m.photo&&R.push({url:m.photo,label:m.name?`สินค้า: ${m.name}`:`รายการสินค้า #${f+1}`})})):n&&((te=n.photos.storefrontAndAtmosphere)==null||te.forEach((m,f)=>R.push({url:m,label:`หน้าร้าน / บรรยากาศ #${f+1}`})),(ue=n.photos.menuBoard)==null||ue.forEach((m,f)=>R.push({url:m,label:`ป้ายเมนู / ราคา #${f+1}`})),(Z=n.photos.drinkCups)==null||Z.forEach((m,f)=>R.push({url:m,label:`แก้วเครื่องดื่ม #${f+1}`})),(he=n.drinkItems)==null||he.forEach((m,f)=>{m.photo&&R.push({url:m.photo,label:m.name?`เมนูชิม: ${m.name}`:`แก้วชิม #${f+1}`})}));const V=ie(s),E=[];V.forEach((m,f)=>{E.push({label:m.label||`คลิปเสียงหน้างาน #${f+1}`,durationSec:m.durationSec||4,source:"บันทึกเสียงหลักหน้างานจริง"})}),t?(t.catalogItems||[]).forEach((m,f)=>{ie(m).forEach((F,ne)=>{E.push({label:F.label||`คลิปเสียงสินค้า #${ne+1}`,durationSec:F.durationSec||4,source:`สินค้า: ${m.name||`รายการที่ #${f+1}`}`})})}):n&&(n.drinkItems||[]).forEach((m,f)=>{ie(m).forEach((F,ne)=>{E.push({label:F.label||`คลิปเสียงเมนู #${ne+1}`,durationSec:F.durationSec||4,source:`เมนู: ${m.name||`แก้วที่ #${f+1}`}`})})});const D=Array.isArray(s.videos)?s.videos.filter(Boolean):[],L=((Q=R[0])==null?void 0:Q.url)||"./logo.jpg",u=Array.isArray(s.viewedBy)?s.viewedBy:[],q=Array.isArray(s.likes)?s.likes:[],g=Array.isArray(s.reviewerNotes)?s.reviewerNotes:[],S=Array.isArray(s.history)?s.history:[],$=S.length>0?S:[{action:"สร้างบันทึกรายการสำรวจ",user:s.creator.alias,userAvatar:s.creator.avatar,timestamp:s.creator.timestamp}],N=`ฉันจะเป็นหัวแถว-${l.replace(/[^a-zA-Z0-9ก-๙_-]/g,"_")}.pdf`,C={awaiting:"พาร์ท 1: รอรับช่วงต่อ",rfq_sent:"พาร์ท 2: ขอสเปก / ส่ง RFQ",sample_test:"พาร์ท 3: ทดสอบตัวอย่าง Lab / R&D",negotiate:"พาร์ท 4: ต่อรองราคา & MOQ",approved:"พาร์ท 5: ตัวเต็งอนุมัติ",ordered:"พาร์ท 6: สั่งซื้อสำเร็จ"}[s.handoffStage||"awaiting"]||"พาร์ท 1: รอรับช่วงต่อ",k=E.length>0?`<div class="media-grid">
          ${E.map((m,f)=>`
              <div class="voice-card">
                <div class="voice-icon">▶</div>
                <div class="voice-meta">
                  <div class="voice-title">${h(`${f+1}. ${m.label}`)}</div>
                  <div class="voice-sub">${h(`${m.source} · ความยาว ${m.durationSec} วินาที`)}</div>
                  <div class="voice-wave">${h("ılıll|ılıl||ılıll|ılı · สแกน QR เพื่อกดฟังเสียงจริง")}</div>
                </div>
              </div>`).join("")}
        </div>`:`<div class="empty-note">${h("ไม่มีไฟล์เสียงบันทึกในรายการนี้")}</div>`,T=D.length>0?`<div class="video-grid">
          ${D.map((m,f)=>{const F=m.includes("gtv-videos-bucket")?Bn:m;return`
              <div class="video-card">
                <div class="video-thumb-wrap">
                  <img
                    id="video-thumb-img-${f}"
                    class="video-thumb-img"
                    src="${G(L)}"
                    crossorigin="anonymous"
                    data-video-src="${G(F)}"
                  />
                  <div class="video-overlay-top">
                    <span class="video-chip">VIDEO CLIP #${f+1}</span>
                    <span class="video-chip-right">HD PREVIEW</span>
                  </div>
                  <div class="video-play-circle">▶</div>
                  <div class="video-overlay-bottom">
                    <span>${h(`คลิปวิดีโอที่ ${f+1} · สแกน QR Code ด้านบนเพื่อเปิดเล่นวิดีโอ`)}</span>
                  </div>
                </div>
                <div class="video-caption">
                  <div class="video-caption-title">${h(`คลิปวิดีโอหน้างาน #${f+1} (จากทั้งหมด ${D.length} คลิป)`)}</div>
                  <div class="video-caption-sub">${h("เอกสารกระดาษแสดงภาพ Thumbnail ตัวอย่าง — สแกน QR Code เพื่อรับชมวิดีโอเคลื่อนไหวพร้อมเสียง")}</div>
                </div>
              </div>`}).join("")}
        </div>`:`<div class="empty-note">${h("ไม่มีคลิปวิดีโอในรายการนี้")}</div>`;let A="";if(r&&t){const m=(t.catalogItems||[]).map((f,F)=>{const ne=ie(f);return`
        <tr>
          <td style="text-align:center;font-weight:700;">${F+1}</td>
          <td>
            ${f.photo?`<img src="${G(f.photo)}" crossorigin="anonymous" class="table-thumb" />`:'<div class="table-thumb-empty">ไม่มีรูป</div>'}
          </td>
          <td>
            <div class="cell-title">${h(f.name||`รายการที่ #${F+1}`)}</div>
            ${f.memo?`<div class="cell-sub">${h(f.memo)}</div>`:""}
            ${ne.length>0?`<div class="cell-voice-badge">แนบเสียงบันทึก ${ne.length} คลิป</div>`:""}
          </td>
          <td>
            <div class="cell-text">${h(f.dimensions||"-")}</div>
            <div class="cell-sub">${h(f.weightKg?`น้ำหนัก: ${f.weightKg}`:"")}</div>
          </td>
          <td>
            <div class="cell-price-green">
              ${f.priceRmb?`¥${f.priceRmb.toLocaleString()}`:f.priceThb?`฿${f.priceThb.toLocaleString()}`:"-"}
            </div>
            ${f.priceRmb?`<div class="cell-sub">(≈ ฿${i(f.priceRmb).toLocaleString()})</div>`:""}
          </td>
        </tr>`}).join("");A=`
      <div class="section-box">
        <div class="section-title">${h(`กลุ่มที่ 3: รายการสินค้า / อุปกรณ์ / วัตถุดิบ (${(t.catalogItems||[]).length} รายการ)`)}</div>
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
                    <th>${h("รูปภาพ")}</th>
                    <th>${h("ชื่อรายการ & รายละเอียดสเปก")}</th>
                    <th>${h("ขนาด / น้ำหนัก")}</th>
                    <th>${h("ราคาประเมิน")}</th>
                  </tr>
                </thead>
                <tbody>${m}</tbody>
              </table>`:`<div class="empty-note">${h("ไม่มีรายการย่อย")}</div>`}
      </div>
    `}else if(n){const m=(n.drinkItems||[]).map((f,F)=>{const ne=ie(f);return`
        <tr>
          <td style="text-align:center;font-weight:700;">${F+1}</td>
          <td>
            ${f.photo?`<img src="${G(f.photo)}" crossorigin="anonymous" class="table-thumb" />`:'<div class="table-thumb-empty">ไม่มีรูป</div>'}
          </td>
          <td>
            <div class="cell-title">${h(f.name||`แก้วที่ #${F+1}`)}</div>
            ${f.gimmickNotes?`<div class="cell-sub">${h(`กิมมิก: ${f.gimmickNotes}`)}</div>`:""}
            ${ne.length>0?`<div class="cell-voice-badge">แนบเสียงบันทึก ${ne.length} คลิป</div>`:""}
          </td>
          <td>
            <div class="cell-text">${h(f.cupSize||"-")}</div>
          </td>
          <td>
            <div class="cell-text">${h(f.fitMenuTarget||"-")}</div>
          </td>
          <td>
            <div class="cell-price-amber">
              ${f.priceRmb?`¥${f.priceRmb.toLocaleString()}`:f.priceThb?`฿${f.priceThb.toLocaleString()}`:"-"}
            </div>
            ${f.priceRmb?`<div class="cell-sub">(≈ ฿${i(f.priceRmb).toLocaleString()})</div>`:""}
          </td>
        </tr>`}).join("");A=`
      <div class="section-box">
        <div class="section-title">${h(`กลุ่มที่ 3: เมนูที่ชิม & การถอดรหัสสูตร (${(n.drinkItems||[]).length} เมนู)`)}</div>
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
                    <th>${h("รูปแก้ว")}</th>
                    <th>${h("ชื่อเมนู & กิมมิก")}</th>
                    <th>${h("ขนาดแก้ว")}</th>
                    <th>${h("ต่อยอดเมนูของเรา")}</th>
                    <th>${h("ราคาขาย")}</th>
                  </tr>
                </thead>
                <tbody>${m}</tbody>
              </table>`:`<div class="empty-note">${h("ไม่มีเมนูย่อย")}</div>`}
      </div>
    `}const K=R.length>0?`<div class="photo-grid">
          ${R.map((m,f)=>`
              <div class="photo-card">
                <img src="${G(m.url)}" crossorigin="anonymous" />
                <div class="photo-caption">${h(`รูปที่ ${f+1}: ${m.label}`)}</div>
              </div>`).join("")}
        </div>`:`<div class="empty-note">${h("ไม่มีรูปภาพในรายการนี้")}</div>`,X=g.length>0?g.map((m,f)=>`
          <div class="comment-box">
            <div class="comment-header">
              <span class="comment-author">${h(`ความคิดเห็นที่ #${f+1} โดย: ${m.author}`)}</span>
              <span class="comment-time">${G(new Date(m.timestamp).toLocaleString("th-TH"))}</span>
            </div>
            <div class="comment-body">${h(m.text)}</div>
            ${m.photoUrl?`<div style="margin-top:6px;"><img src="${G(m.photoUrl)}" crossorigin="anonymous" style="width:96px;height:96px;object-fit:cover;border-radius:6px;border:1px solid #cbd5e1;" /></div>`:""}
            ${m.voiceUrl?`<div class="cell-voice-badge" style="margin-top:4px;">${h("มีไฟล์เสียงแนบในความคิดเห็นนี้ (สแกน QR เพื่อฟัง)")}</div>`:""}
            ${m.replies&&m.replies.length>0?`<div class="reply-list">
                    ${m.replies.map(F=>`
                        <div class="reply-item">
                          <div class="comment-header">
                            <span class="comment-author">${h(`ตอบกลับโดย: ${F.author}${F.replyToAuthor?` (ถึง @${F.replyToAuthor})`:""}`)}</span>
                            <span class="comment-time">${G(new Date(F.timestamp).toLocaleString("th-TH"))}</span>
                          </div>
                          <div class="comment-body">${h(F.text)}</div>
                          ${F.photoUrl?`<div style="margin-top:6px;"><img src="${G(F.photoUrl)}" crossorigin="anonymous" style="width:80px;height:80px;object-fit:cover;border-radius:6px;border:1px solid #cbd5e1;" /></div>`:""}
                          ${F.voiceUrl?`<div class="cell-voice-badge" style="margin-top:4px;">${h("มีไฟล์เสียงแนบในคำตอบนี้")}</div>`:""}
                        </div>`).join("")}
                  </div>`:""}
          </div>`).join(""):`<div class="empty-note">${h("ยังไม่มีความคิดเห็นในรายการนี้")}</div>`,ce=$.map((m,f)=>{const F=m.action==="handoff"?"อัปเดตสถานะการส่งต่องาน (Handoff)":m.action==="comment"?"เพิ่มความคิดเห็นในรายการ":m.action==="reply"?"ตอบกลับความคิดเห็น":m.action;return`
      <tr>
        <td style="text-align:center;font-weight:700;">${f+1}</td>
        <td><div class="cell-title">${h(m.user)}</div></td>
        <td><div class="cell-text">${h(F)}</div></td>
        <td><div class="cell-sub">${G(new Date(m.timestamp).toLocaleString("th-TH"))}</div></td>
      </tr>`}).join(""),me=u.length>0?`<table class="data-table" style="margin-top:10px;">
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
              <th>${h("ผู้เปิดอ่าน (นามแฝง)")}</th>
              <th>${h("ระดับสิทธิ์")}</th>
              <th>${h("เปิดอ่านล่าสุดเมื่อ")}</th>
              <th style="text-align:center;">${h("จำนวนครั้ง")}</th>
            </tr>
          </thead>
          <tbody>
            ${u.map((m,f)=>`
              <tr>
                <td style="text-align:center;">${f+1}</td>
                <td><div class="cell-title">${h(`${m.alias} (${m.name})`)}</div></td>
                <td><div class="cell-text">${G(m.role.toUpperCase())}</div></td>
                <td><div class="cell-sub">${G(new Date(m.lastViewedAt).toLocaleString("th-TH"))}</div></td>
                <td style="text-align:center;font-weight:700;">${h(`${m.viewCount||1} ครั้ง`)}</td>
              </tr>`).join("")}
          </tbody>
        </table>`:`<div class="empty-note" style="margin-top:8px;">${h("ยังไม่มีประวัติผู้เปิดอ่านเพิ่มเติม")}</div>`,Ne=r?`คะแนนประเมิน ${(t==null?void 0:t.rating)||5}/5 ดาว (${t!=null&&t.isFactory?"โรงงานผลิต":"หน้าร้าน/โชว์รูม"})`:`รสชาติ ${n==null?void 0:n.ratings.taste}/5 · ดีไซน์ ${n==null?void 0:n.ratings.aesthetics}/5 · คุ้มค่า ${n==null?void 0:n.ratings.value}/5 · ความไว ${n==null?void 0:n.ratings.speed}/5`;return`<!DOCTYPE html>
<html lang="th">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=840, initial-scale=0.45, minimum-scale=0.3, maximum-scale=2.0, user-scalable=yes" />
  <title>ฉันจะเป็นหัวแถว - ${G(l)}</title>
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
      height: 145px;
      object-fit: cover;
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
      <strong style="font-size:14px;">รายงานสรุปฉบับสมบูรณ์: ${G(l)}</strong>
      <span id="status-indicator" style="font-size:12px;color:#94a3b8;margin-left:10px;">
        ${a==="pdf"?"กำลังจัดหน้าและสร้างไฟล์ PDF...":"พร้อมพิมพ์รายงาน"}
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
          <div class="badge">${h(`${r?"รายงานซัพพลายเออร์ & โรงงาน":"รายงานเรฟร้านน้ำ & R&D"} · ${j}`)}</div>
          <h1 class="brand-title">${h(l)}</h1>
          <div class="brand-sub">${h(`${c?`${c} · `:""}หมวดหมู่: ${d}`)}</div>

          <!-- At-a-glance Multimedia & Detail Counter Pills -->
          <div class="summary-pills">
            <span class="summary-pill">${h(`รูปภาพ ${R.length} รูป`)}</span>
            <span class="summary-pill">${h(`วอยซ์เสียง ${E.length} คลิป`)}</span>
            <span class="summary-pill">${h(`วิดีโอ ${D.length} คลิป`)}</span>
            <span class="summary-pill">${h(r?`สินค้า ${((t==null?void 0:t.catalogItems)||[]).length} รายการ`:`เมนูชิม ${((n==null?void 0:n.drinkItems)||[]).length} เมนู`)}</span>
            <span class="summary-pill">${h(`คอมเมนต์ ${g.length} หัวข้อ`)}</span>
            <span class="summary-pill">${h(`ประวัติ Log ${$.length} รายการ`)}</span>
          </div>

          <div class="direct-link-bar">
            <div class="info-label" style="color:#0f172a;margin-bottom:2px;">Direct Link (Scan QR / LINE Share):</div>
            <div style="color:#059669;font-family:monospace;font-size:10px;word-break:break-all;">${G(w)}</div>
          </div>
        </div>

        <div class="header-right">
          <div class="meta-box">
            <div class="meta-platform">${h("ฉันจะเป็นหัวแถว")}</div>
            <div>LEAD THE FRONT · VITCHA R&amp;D</div>
            <div style="margin-top:4px;">${h(`รหัส: ${s.id.slice(0,18)}`)}</div>
            <div>${h(`สถานะ: ${C}`)}</div>
            <div>${h(`ออกรายงาน: ${new Date().toLocaleString("th-TH")}`)}</div>
          </div>

          ${M?`<div class="qr-card">
                  <img id="report-qr-img" src="${M}" alt="QR Code" />
                  <div class="qr-label">${h("สแกนเปิดในแอป")}</div>
                  <div class="qr-sub">${h("ฟังเสียง · ดูคลิปจริง")}</div>
                </div>`:""}
        </div>
      </div>

      <!-- Group 1: Overview, Contacts, Location & Handoff -->
      <div class="section-box">
        <div class="section-title">${h("กลุ่มที่ 1: ข้อมูลหลัก พิกัดสถานที่ ช่องทางติดต่อ และการรับช่วงต่อ")}</div>
        <div class="info-grid">
          <div class="info-item">
            <span class="info-label">${h("ชื่อรายการ / ร้านค้า")}</span>
            <span class="info-value">${h(`${l}${c?` (${c})`:""}`)}</span>
          </div>
          <div class="info-item">
            <span class="info-label">${h("หมวดหมู่ & คะแนนประเมิน")}</span>
            <span class="info-value">${h(`${d} · ${Ne}`)}</span>
          </div>
          <div class="info-item">
            <span class="info-label">${h("สถานที่ / ตลาด / เมือง")}</span>
            <span class="info-value">${h(x||((J=s.location)==null?void 0:J.addressText)||"-")}</span>
          </div>
          <div class="info-item">
            <span class="info-label">${h("พิกัด GPS & แผนที่")}</span>
            <span class="info-value">${s.location?`${s.location.lat.toFixed(5)}, ${s.location.lng.toFixed(5)} (${G(s.location.addressText||"พิกัดหน้างาน")})`:"-"}</span>
          </div>
          <div class="info-item">
            <span class="info-label">${h("ช่องทางติดต่อ (WeChat / LINE / โทรศัพท์)")}</span>
            <span class="info-value">${h(`WeChat: ${(r?t==null?void 0:t.wechatId:n==null?void 0:n.wechatId)||"-"} | LINE: ${(r?t==null?void 0:t.lineId:n==null?void 0:n.lineId)||"-"} | โทร: ${(r?t==null?void 0:t.phone:n==null?void 0:n.phone)||"-"}`)}</span>
          </div>
          <div class="info-item">
            <span class="info-label">${h("ผู้ลงพื้นที่สำรวจ & เวลาที่บันทึก")}</span>
            <span class="info-value">${h(`${s.creator.alias}${s.creator.name&&s.creator.name!==s.creator.alias?` (${s.creator.name})`:""} · ${new Date(s.creator.timestamp).toLocaleString("th-TH")}`)}</span>
          </div>
          <div class="info-item">
            <span class="info-label">${h("ผู้รับผิดชอบรับช่วงต่อ & กำหนดติดตาม")}</span>
            <span class="info-value">${h(`${s.assignedTo||"ยังไม่ระบุผู้รับผิดชอบ"} · กำหนดติดตาม: ${s.targetFollowUpDate||"-"}`)}</span>
          </div>
          <div class="info-item">
            <span class="info-label">${h("การมีส่วนร่วมของทีม (Likes & Views)")}</span>
            <span class="info-value">${h(`กดถูกใจ ${q.length} คน · เปิดอ่านแล้ว ${u.length} คน`)}</span>
          </div>
        </div>

        ${(r?t!=null&&t.memo:n!=null&&n.tastingNotes)?`<div class="note-banner">
                <div class="note-banner-title">${h(r?"บันทึกภาพรวมหน้างาน / รายละเอียดสเปกหลัก:":"บันทึกรีวิวรสชาติ & ไอเดียเรฟหน้างาน:")}</div>
                <div class="note-banner-body">${h(r?t==null?void 0:t.memo:n==null?void 0:n.tastingNotes)}</div>
              </div>`:""}

        ${s.handoffNotes?`<div class="handoff-banner">
                <div class="handoff-banner-title">${h("โน้ตการส่งมอบงาน / ผลเจรจาทีมไทย:")}</div>
                <div class="note-banner-body">${h(s.handoffNotes)}</div>
              </div>`:""}
      </div>

      <!-- Group 2: Voice Recordings & Video Clips with Thumbnail Previews -->
      <div class="section-box">
        <div class="section-title">${h(`กลุ่มที่ 2: สื่อมัลติมีเดียหน้างาน — วอยซ์เสียงบันทึก (${E.length} คลิป) & วิดีโอ (${D.length} คลิป)`)}</div>
        <div class="media-subhead">${h(`ไฟล์เสียงบันทึกหน้างานจริง (${E.length} คลิป):`)}</div>
        ${k}
        <div class="media-subhead" style="margin-top:10px;">${h(`คลิปวิดีโอหน้างานพร้อมภาพ Thumbnail พรีวิว (${D.length} คลิป):`)}</div>
        ${T}
      </div>

      <!-- Group 3: Catalog / Drink Items -->
      ${A}

      <!-- Group 4: All Photos of This Item -->
      <div class="section-box">
        <div class="section-title">${h(`กลุ่มที่ 4: แกลเลอรีภาพถ่ายทั้งหมดของรายการนี้ (${R.length} รูป)`)}</div>
        ${K}
      </div>

      <!-- Group 5: All Threaded Comments & Replies -->
      <div class="section-box">
        <div class="section-title">${h(`กลุ่มที่ 5: บันทึกความคิดเห็นและการตอบกลับทั้งหมด (${g.length} หัวข้อสนทนา)`)}</div>
        ${X}
      </div>

      <!-- Group 6: Activity & Handoff Log + Viewer Log -->
      <div class="section-box">
        <div class="section-title">${h(`กลุ่มที่ 6: ประวัติการดำเนินงาน (${$.length} รายการ) & ผู้เปิดอ่าน (${u.length} คน)`)}</div>
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
              <th>${h("ผู้ปฏิบัติงาน")}</th>
              <th>${h("รายการที่ดำเนินการ / ส่งต่องาน")}</th>
              <th>${h("วันและเวลา")}</th>
            </tr>
          </thead>
          <tbody>${ce}</tbody>
        </table>
        ${me}
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

    // Rasterize SVG QR image onto PNG Data URL so html2canvas renders it crisply on all mobile browsers
    function rasterizeQrImage() {
      return new Promise(function(resolve) {
        var qrImg = document.getElementById('report-qr-img');
        if (!qrImg || !qrImg.src) return resolve();
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
              qrImg.src = canvas.toDataURL('image/png');
            }
          } catch (e) {}
          finish();
        };
        temp.onerror = finish;
        temp.src = qrImg.src;
      });
    }

    function triggerDownloadPdf() {
      var statusEl = document.getElementById('status-indicator');
      if (statusEl) statusEl.textContent = 'กำลังสร้างไฟล์ PDF...';
      var element = document.getElementById('report-content');
      if (window.html2pdf && element) {
        window.scrollTo(0, 0);
        var opt = {
          margin: [8, 8, 8, 8],
          filename: ${JSON.stringify(N)},
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
            avoid: ['tr', '.info-item', '.voice-card', '.video-card', '.photo-card', '.comment-box', '.note-banner', '.handoff-banner', '.report-header']
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
      var mode = ${JSON.stringify(a)};
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
</html>`}function rn(s,i,a){const r=cs(s,i,a),t=window.open("","_blank");if(t)t.document.open(),t.document.write(r),t.document.close();else{const n=new Blob([r],{type:"text/html;charset=utf-8"}),l=URL.createObjectURL(n),c=document.createElement("a");c.href=l,c.target="_blank",c.click()}}const ps=({item:s,isOpen:i,onClose:a,onShareToLine:r})=>{var bt,vt,wt,yt,Nt,jt,$t,Ct,kt,Et;const{currentUser:t,convertCnyToThb:n,addReviewerNote:l,addReviewReply:c,updatePipelineStatus:d,toggleLikeItem:x,suppliers:j,drinkStores:B,users:I,quickMessages:w,recordItemView:M,canEditItems:R,canComment:V,openEditItem:E}=vn(),D=s&&s.type==="supplier"?j.find(o=>o.id===s.id):null,L=s&&s.type==="drink_store"?B.find(o=>o.id===s.id):null,u=D||L||s,[q,g]=W.useState(null),[S,$]=W.useState(""),[N,P]=W.useState(!1),[C,k]=W.useState(null),T=fe.useRef(null),A=fe.useRef(null),[K,X]=W.useState(null),[ce,me]=W.useState({}),[Ne,de]=W.useState({}),[ee,ae]=W.useState(null),[te,ue]=W.useState(null),[Z,he]=W.useState(!1),[Q,J]=W.useState({}),m=fe.useRef(null),[f,F]=W.useState(null),[ne,ut]=W.useState(0),be=fe.useRef(null),ve=fe.useRef(null),re=fe.useRef(null),ht=fe.useRef(0),ft=fe.useCallback(()=>{var o;if(re.current&&(clearInterval(re.current),re.current=null),be.current&&be.current.state==="recording"){be.current.stop();return}(o=ve.current)==null||o.getTracks().forEach(p=>p.stop()),ve.current=null,F(null)},[]);W.useEffect(()=>(i&&(s!=null&&s.id)&&M(s.id,s.type),g(null),P(!1),k(null),()=>{var o,p;re.current&&clearInterval(re.current),((o=be.current)==null?void 0:o.state)==="recording"&&be.current.stop(),(p=ve.current)==null||p.getTracks().forEach(b=>b.stop())}),[i,s==null?void 0:s.id]);const _=[];if(u)if(u.type==="supplier"){const o=u;(bt=o.photos.storefrontAndAtmosphere)==null||bt.forEach((p,b)=>_.push({url:p,label:`ป้ายหน้าร้าน/บรรยากาศ #${b+1}`})),(vt=o.photos.contactCards)==null||vt.forEach((p,b)=>_.push({url:p,label:`นามบัตร/WeChat #${b+1}`})),(wt=o.catalogItems)==null||wt.forEach((p,b)=>{p.photo&&_.push({url:p.photo,label:p.name?`สินค้า: ${p.name}`:`รายการสินค้า #${b+1}`})})}else{const o=u;(yt=o.photos.storefrontAndAtmosphere)==null||yt.forEach((p,b)=>_.push({url:p,label:`หน้าร้าน/บรรยากาศ #${b+1}`})),(Nt=o.photos.menuBoard)==null||Nt.forEach((p,b)=>_.push({url:p,label:`เมนูบอร์ด #${b+1}`})),(jt=o.photos.drinkCups)==null||jt.forEach((p,b)=>_.push({url:p,label:`แก้วเครื่องดื่ม #${b+1}`})),($t=o.drinkItems)==null||$t.forEach((p,b)=>{p.photo&&_.push({url:p.photo,label:p.name?`เมนู: ${p.name}`:`เมนูชิม #${b+1}`})})}if(W.useEffect(()=>{if(q===null||_.length===0)return;const o=p=>{p.key==="ArrowRight"?g(b=>b!==null?(b+1)%_.length:null):p.key==="ArrowLeft"?g(b=>b!==null?(b-1+_.length)%_.length:null):p.key==="Escape"&&g(null)};return window.addEventListener("keydown",o),()=>window.removeEventListener("keydown",o)},[q,_.length]),!i||!u)return null;const O=u.type==="supplier",v=O?u:null,y=O?null:u,ke=Array.isArray(u.likes)?u.likes:[],pt=ke.some(o=>o.userId===t.id),mt=o=>{const p=_.findIndex(b=>b.url===o);g(p>=0?p:0)},Pe=async(o,p,b)=>{try{he(!0);const H=await In(o,{recordId:u.id,recordType:u.type,recordTitle:O?v==null?void 0:v.name:y==null?void 0:y.storeName});b?J(z=>({...z,[b]:{...z[b],...p==="photo"?{photoUrl:H}:{voiceUrl:H}}})):p==="photo"?ae(H):ue(H)}catch(H){alert(H.message||"อัปโหลดไฟล์แนบไม่สำเร็จ")}finally{he(!1)}},gt=async o=>{var p,b;if(f===o){ft();return}f&&ft();try{if(!((p=navigator.mediaDevices)!=null&&p.getUserMedia)||typeof MediaRecorder>"u"){alert("เบราว์เซอร์นี้ไม่รองรับการอัดเสียงสด กรุณาเปิดผ่าน HTTPS หรืออนุญาตไมโครโฟน");return}const H=await navigator.mediaDevices.getUserMedia({audio:!0});ve.current=H;const z=["audio/mp4","audio/webm;codecs=opus","audio/webm","audio/ogg"].find(Y=>MediaRecorder.isTypeSupported(Y)),se=new MediaRecorder(H,z?{mimeType:z}:void 0);be.current=se;const le=[];se.ondataavailable=Y=>{Y.data.size>0&&le.push(Y.data)},se.onstop=()=>{var je;re.current&&(clearInterval(re.current),re.current=null),H.getTracks().forEach(Se=>Se.stop()),ve.current=null,F(null);const Y=((je=se.mimeType)==null?void 0:je.split(";")[0])||"audio/webm",U=new Blob(le,{type:Y});if(!U.size)return;const Me=Y.includes("mp4")?"m4a":Y.includes("ogg")?"ogg":"webm",Re=new File([U],`เสียงคอมเมนต์-${Date.now()}.${Me}`,{type:Y});Pe(Re,"audio",o==="main"?void 0:o)},se.onerror=()=>{re.current&&clearInterval(re.current),H.getTracks().forEach(Y=>Y.stop()),F(null),alert("อัดเสียงไม่สำเร็จ กรุณาลองใหม่")},ht.current=Date.now(),ut(0),F(o),se.start(250),re.current=setInterval(()=>{ut(Math.round((Date.now()-ht.current)/1e3))},1e3)}catch{(b=ve.current)==null||b.getTracks().forEach(H=>H.stop()),F(null),alert("ไม่ได้รับสิทธิ์ใช้ไมโครโฟน กรุณากดอนุญาตไมโครโฟนเพื่ออัดเสียงสด")}},mn=async o=>{o.preventDefault();const p=S.trim();!p&&!ee&&!te||!await l(u.id,u.type,p,{photoUrl:ee||void 0,voiceUrl:te||void 0})||($(""),ae(null),ue(null))},xt=async(o,p,b)=>{const H=(ce[o]||"").trim(),z=Q[o];!H&&!(z!=null&&z.photoUrl)&&!(z!=null&&z.voiceUrl)||!await c(u.id,u.type,o,H,p,{photoUrl:z==null?void 0:z.photoUrl,voiceUrl:z==null?void 0:z.voiceUrl,replyToId:b})||(me({...ce,[o]:""}),J(le=>({...le,[o]:{}})),X(null))},gn=o=>{v&&d(v.id,o)},Ee=ie(u),xn=((Ct=Ee[0])==null?void 0:Ct.url)||(O?v==null?void 0:v.voiceNoteUrl:y==null?void 0:y.voiceNoteUrl)||((O?v!=null&&v.voiceDurationSec:y!=null&&y.voiceDurationSec)?De(4):void 0),Le=(o,p)=>{A.current&&(C===o?(A.current.pause(),k(null)):(A.current.src=p||De(4),A.current.play().then(()=>k(o)).catch(()=>{A.current&&(A.current.src=De(4),A.current.play(),k(o))})))};return e.jsxs("div",{className:"fixed inset-0 z-[90] bg-black/45 backdrop-blur-sm flex items-center justify-center p-2 sm:p-4 overflow-y-auto",children:[e.jsxs("div",{className:"bg-white border border-slate-200/90 w-full max-w-3xl rounded-2xl shadow-2xl overflow-hidden my-auto animate-in zoom-in-95 max-h-[94vh] flex flex-col text-slate-900",children:[e.jsxs("div",{className:"p-3.5 sm:p-4 border-b border-slate-100 space-y-2.5 bg-white sticky top-0 z-10",children:[e.jsxs("div",{className:"flex items-start justify-between gap-2.5",children:[e.jsxs("div",{className:"flex items-start gap-2.5 min-w-0 flex-1",children:[e.jsx("span",{className:`p-2 rounded-xl shrink-0 mt-0.5 ${O?"bg-emerald-50 text-emerald-700":"bg-amber-50 text-amber-700"}`,children:O?e.jsx(wn,{className:"w-4 h-4 sm:w-5 sm:h-5 text-emerald-600"}):e.jsx(yn,{className:"w-4 h-4 sm:w-5 sm:h-5 text-amber-600"})}),e.jsxs("div",{className:"min-w-0 flex-1",children:[e.jsx("h2",{className:"font-extrabold text-slate-900 text-sm sm:text-base leading-snug break-words",children:O?v==null?void 0:v.name:y==null?void 0:y.storeName}),e.jsx("p",{className:"text-xs text-slate-400 truncate mt-0.5",children:O?(v==null?void 0:v.chineseName)||(v==null?void 0:v.marketOrCity):(y==null?void 0:y.chineseName)||(y==null?void 0:y.storeCategory)||(y==null?void 0:y.brandConcept)})]})]}),e.jsx("button",{type:"button",onClick:a,className:"w-7 h-7 sm:w-8 sm:h-8 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-600 transition-all active:scale-95 flex items-center justify-center shrink-0",title:"ปิดหน้าต่าง",children:e.jsx(we,{className:"w-4 h-4"})})]}),e.jsxs("div",{className:"flex items-center gap-1.5 flex-wrap pt-2 border-t border-slate-100",children:[R&&e.jsxs("button",{type:"button",onClick:()=>E(u),className:"px-2.5 py-1 rounded-lg bg-amber-50 hover:bg-amber-100 text-amber-800 border border-amber-200/90 text-[11px] font-bold active:scale-95 transition-all inline-flex items-center gap-1",title:"แก้ไขข้อมูลรายการนี้ (Admin / Editor)",children:[e.jsx(Rt,{className:"w-3 h-3 text-amber-600"}),e.jsx("span",{children:"แก้ไข"})]}),e.jsxs("button",{type:"button",onClick:()=>x(u.id,u.type),className:`px-2.5 py-1 rounded-lg border transition-all active:scale-95 inline-flex items-center gap-1 text-[11px] font-bold ${pt?"bg-blue-50 text-blue-700 border-blue-200":"bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100"}`,title:`ถูกใจ (${ke.length})`,children:[e.jsx(Nn,{className:`w-3 h-3 ${pt?"fill-blue-600 text-blue-600":""}`}),e.jsxs("span",{children:["ถูกใจ",ke.length>0?` (${ke.length})`:""]})]}),e.jsxs("button",{type:"button",onClick:()=>r(u),className:"px-2.5 py-1 rounded-lg bg-[#06C755] hover:bg-[#05b34c] text-white text-[11px] font-bold transition-all active:scale-95 inline-flex items-center gap-1",title:"แชร์ลิงก์เข้า LINE",children:[e.jsx(jn,{className:"w-3 h-3"}),e.jsx("span",{children:"แชร์ LINE"})]}),e.jsxs("button",{type:"button",onClick:()=>rn(u,n,"pdf"),className:"px-2.5 py-1 rounded-lg bg-slate-900 hover:bg-slate-800 text-white text-[11px] font-bold transition-all active:scale-95 inline-flex items-center gap-1",title:"ดาวน์โหลดรายงานเป็นไฟล์ PDF",children:[e.jsx(Mn,{className:"w-3 h-3 text-emerald-400"}),e.jsx("span",{children:"ดาวน์โหลด PDF"})]}),e.jsxs("button",{type:"button",onClick:()=>rn(u,n,"print"),className:"px-2.5 py-1 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 text-[11px] font-bold transition-all border border-slate-200/80 active:scale-95 inline-flex items-center gap-1",title:"พิมพ์รายงานฉบับจัดหน้าสวยงาม (Print)",children:[e.jsx(Un,{className:"w-3 h-3 text-slate-600"}),e.jsx("span",{children:"พิมพ์"})]})]})]}),e.jsxs("div",{className:"p-4 sm:p-6 space-y-4 overflow-y-auto flex-1",children:[e.jsxs("div",{className:"flex flex-wrap items-center justify-between gap-2 p-3 bg-slate-50 rounded-xl border border-slate-100 text-xs",children:[e.jsxs("div",{className:"flex items-center gap-2.5",children:[e.jsx(Te,{src:u.creator.avatar,alt:u.creator.alias,className:"w-8 h-8 rounded-full object-cover ring-2 ring-emerald-500/20 shadow-xs"}),e.jsxs("div",{children:[e.jsx("div",{className:"text-slate-800 font-bold flex items-center gap-1.5",children:e.jsxs("span",{children:["ผู้ลงพื้นที่สำรวจ: ",u.creator.alias,u.creator.name&&u.creator.name!==u.creator.alias?` (${u.creator.name})`:""]})}),e.jsxs("div",{className:"text-[11px] text-slate-400 font-mono",children:["บันทึกเมื่อ: ",new Date(u.creator.timestamp).toLocaleString("th-TH")]})]})]}),e.jsxs("div",{className:"flex items-center gap-2 flex-wrap",children:[e.jsx($n,{viewedBy:u.viewedBy,size:"md"}),O&&v&&e.jsxs("div",{className:"flex items-center gap-1.5",children:[e.jsx("span",{className:"text-[11px] text-slate-500",children:"สถานะ:"}),e.jsxs("select",{value:v.status,onChange:o=>gn(o.target.value),className:"bg-white border border-slate-200 text-slate-800 text-xs font-bold rounded-lg px-2.5 py-1 focus:outline-none focus:border-emerald-500",children:[e.jsx("option",{value:"scouted",children:"1. สำรวจแล้ว"}),e.jsx("option",{value:"reviewing",children:"2. เทียบสเปก"}),e.jsx("option",{value:"rfq_sent",children:"3. ส่ง RFQ"}),e.jsx("option",{value:"shortlisted",children:"4. ตัวเต็ง (Shortlist)"}),e.jsx("option",{value:"ordered",children:"5. สั่งซื้อแล้ว (Ordered)"})]})]})]})]}),Ee.length>0&&e.jsxs("div",{className:"p-3 bg-emerald-50/70 border border-emerald-200/80 rounded-xl space-y-2",children:[e.jsxs("div",{className:"text-xs font-bold text-emerald-950 flex items-center justify-between",children:[e.jsxs("span",{className:"flex items-center gap-1.5",children:[e.jsx(Ue,{className:"w-3.5 h-3.5 text-emerald-600"}),e.jsxs("span",{children:["วอยซ์เสียงบันทึกหน้างานจริง (",Ee.length," คลิป)"]})]}),e.jsx("span",{className:"text-[10px] font-mono text-emerald-700",children:"แตะ ▶ เพื่อฟังแต่ละคลิป"})]}),e.jsx("div",{className:"grid grid-cols-1 sm:grid-cols-2 gap-2",children:Ee.map((o,p)=>{const b=C===`main-${o.id||p}`;return e.jsx("div",{className:"p-2 bg-white border border-emerald-200 rounded-xl flex items-center justify-between gap-2 shadow-2xs",children:e.jsxs("div",{className:"flex items-center gap-2.5 min-w-0",children:[e.jsx("button",{type:"button",onClick:()=>Le(`main-${o.id||p}`,o.url),className:"w-8 h-8 rounded-full bg-emerald-600 hover:bg-emerald-700 text-white flex items-center justify-center shadow-xs transition-colors shrink-0",children:b?e.jsx(ze,{className:"w-3.5 h-3.5"}):e.jsx(qe,{className:"w-3.5 h-3.5 ml-0.5"})}),e.jsxs("div",{className:"min-w-0",children:[e.jsx("div",{className:"text-xs font-bold text-slate-900 truncate",children:o.label||`คลิปเสียง #${p+1}`}),e.jsxs("div",{className:"text-[10px] text-emerald-700 font-mono",children:[o.durationSec||4," วินาที ·"," ",b?"กำลังเล่น...":"แตะเพื่อฟัง"]})]})]})},o.id||p)})}),e.jsx("audio",{ref:T,src:xn,onEnded:()=>P(!1),className:"hidden"})]}),e.jsxs("div",{className:"p-3 bg-slate-50 rounded-xl border border-slate-100 space-y-2 text-xs",children:[e.jsx("div",{className:"flex flex-wrap items-center gap-1.5",children:O&&v?e.jsxs(e.Fragment,{children:[e.jsxs("span",{className:"px-2.5 py-1 rounded-lg bg-emerald-600 text-white text-[11px] font-bold inline-flex items-center gap-1",children:[e.jsx("i",{className:"fa-solid fa-industry text-[10px]"}),e.jsx("span",{children:v.category})]}),e.jsx("span",{className:"px-2 py-1 rounded-lg bg-white border border-slate-200 text-slate-700 text-[11px] font-bold",children:v.isFactory?"โรงงานผลิต":"หน้าร้าน / โชว์รูม"}),e.jsxs("span",{className:"px-2 py-1 rounded-lg bg-amber-50 border border-amber-200 text-amber-700 text-[11px] font-mono font-bold inline-flex items-center gap-1",children:[e.jsx("i",{className:"fa-solid fa-star text-[10px] text-amber-500"}),e.jsxs("span",{children:[v.rating||5,"/5"]})]}),(v.quickTags||[]).map((o,p)=>e.jsxs("span",{className:"px-2 py-1 rounded-lg bg-white border border-slate-200 text-slate-700 text-[11px] font-semibold",children:["#",o]},p))]}):y?e.jsxs(e.Fragment,{children:[e.jsxs("span",{className:"px-2.5 py-1 rounded-lg bg-amber-600 text-white text-[11px] font-bold inline-flex items-center gap-1",children:[e.jsx("i",{className:"fa-solid fa-mug-hot text-[10px]"}),e.jsx("span",{children:y.storeCategory||"เรฟร้านน้ำ"})]}),y.ratings&&e.jsxs("span",{className:"px-2 py-1 rounded-lg bg-amber-50 border border-amber-200 text-amber-800 text-[11px] font-mono font-bold inline-flex items-center gap-1",children:[e.jsx("i",{className:"fa-solid fa-star text-[10px] text-amber-500"}),e.jsx("span",{children:((y.ratings.taste+y.ratings.aesthetics+y.ratings.value+y.ratings.speed)/4).toFixed(1)})]})]}):null}),e.jsxs("div",{className:"flex flex-wrap items-center justify-between gap-2 pt-1.5 border-t border-slate-200/60 text-[11px] text-slate-600",children:[e.jsxs("div",{className:"flex flex-wrap items-center gap-2",children:[e.jsxs("span",{className:"inline-flex items-center gap-1 font-semibold text-slate-800",children:[e.jsx(Cn,{className:"w-3.5 h-3.5 text-emerald-600 shrink-0"}),e.jsx("span",{children:O?(v==null?void 0:v.marketOrCity)||(v==null?void 0:v.address)||((kt=v==null?void 0:v.location)==null?void 0:kt.addressText):((Et=y==null?void 0:y.location)==null?void 0:Et.addressText)||(y==null?void 0:y.city)})]}),(O?v==null?void 0:v.wechatId:y==null?void 0:y.wechatId)&&e.jsxs("span",{className:"px-2 py-0.5 rounded bg-white border border-slate-200 font-mono",children:["WeChat: ",O?v==null?void 0:v.wechatId:y==null?void 0:y.wechatId]}),(O?v==null?void 0:v.lineId:y==null?void 0:y.lineId)&&e.jsxs("span",{className:"px-2 py-0.5 rounded bg-white border border-slate-200 font-mono",children:["LINE: ",O?v==null?void 0:v.lineId:y==null?void 0:y.lineId]}),(O?v==null?void 0:v.phone:y==null?void 0:y.phone)&&e.jsxs("span",{className:"px-2 py-0.5 rounded bg-white border border-slate-200 font-mono",children:["โทร: ",O?v==null?void 0:v.phone:y==null?void 0:y.phone]})]}),u.location&&e.jsx("a",{href:`https://www.google.com/maps?q=${u.location.lat},${u.location.lng}`,target:"_blank",rel:"noreferrer",className:"text-[11px] font-bold text-emerald-700 hover:underline shrink-0",children:"เปิด Google Maps ↗"})]})]}),(O&&(v==null?void 0:v.memo)||!O&&(y==null?void 0:y.tastingNotes))&&e.jsxs("div",{className:`p-3.5 rounded-xl border space-y-1 ${O?"bg-emerald-50/50 border-emerald-200/80":"bg-amber-50/50 border-amber-200/80"}`,children:[e.jsxs("div",{className:"text-[11px] font-bold text-slate-600 flex items-center gap-1.5",children:[e.jsx("i",{className:`fa-solid ${O?"fa-clipboard-check text-emerald-600":"fa-quote-left text-amber-600"} text-[10px]`}),e.jsx("span",{children:O?"บันทึกหน้างาน / รายละเอียดหลัก:":"บันทึกรีวิวรสชาติ & ไอเดียเรฟ:"})]}),e.jsx("p",{className:"text-xs sm:text-[13px] text-slate-900 leading-relaxed whitespace-pre-wrap font-medium",children:O?v==null?void 0:v.memo:y==null?void 0:y.tastingNotes})]}),O&&v&&(v.catalogItems||[]).length>0&&e.jsxs("div",{className:"space-y-2",children:[e.jsx("div",{className:"flex items-center justify-between",children:e.jsxs("span",{className:"text-xs font-bold text-slate-800",children:["รายการอุปกรณ์ & สินค้า (",(v.catalogItems||[]).length," รายการ):"]})}),e.jsx("div",{className:"grid grid-cols-1 sm:grid-cols-2 gap-3",children:(v.catalogItems||[]).map((o,p)=>e.jsxs("div",{className:"p-3 rounded-xl border border-slate-200 bg-white flex gap-3 shadow-xs",children:[o.photo?e.jsx("img",{src:o.photo,alt:"",onClick:()=>mt(o.photo),className:"w-16 h-16 rounded-lg object-cover cursor-pointer border border-slate-100 hover:opacity-90"}):e.jsx("div",{className:"w-16 h-16 rounded-lg bg-slate-100 border border-slate-200 flex items-center justify-center text-slate-400 text-xs",children:"ไม่มีรูป"}),e.jsxs("div",{className:"min-w-0 flex-1 space-y-1",children:[e.jsx("div",{className:"font-bold text-xs text-slate-900 truncate",children:o.name||`รายการที่ ${p+1}`}),o.priceRmb&&e.jsxs("div",{className:"text-xs font-mono font-bold text-emerald-700",children:["¥",o.priceRmb," ",e.jsxs("span",{className:"text-[11px] font-normal text-slate-500",children:["(≈",n(o.priceRmb).toLocaleString(),"฿)"]})]}),o.priceThb&&!o.priceRmb&&e.jsxs("div",{className:"text-xs font-mono font-bold text-emerald-700",children:["฿",o.priceThb.toLocaleString()]}),o.weightKg&&e.jsxs("div",{className:"text-[11px] text-slate-500",children:["น้ำหนัก: ",e.jsx("span",{className:"font-mono",children:o.weightKg})]}),o.memo&&e.jsx("p",{className:"text-[11px] text-slate-600 whitespace-pre-wrap leading-relaxed",children:o.memo}),ie(o).length>0&&e.jsx("div",{className:"flex flex-wrap gap-1 pt-1",children:ie(o).map((b,H)=>{const z=`${o.id}-v-${b.id||H}`;return e.jsxs("button",{type:"button",onClick:()=>Le(z,b.url),className:"inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-emerald-50 text-emerald-700 border border-emerald-200 text-[10px] font-bold",children:[C===z?e.jsx(ze,{className:"w-2.5 h-2.5"}):e.jsx(qe,{className:"w-2.5 h-2.5"}),e.jsxs("span",{children:[b.label||`ฟังเสียง #${H+1}`," (",b.durationSec||4,"s)"]})]},z)})})]})]},o.id||p))})]}),!O&&y&&(y.drinkItems||[]).length>0&&e.jsxs("div",{className:"space-y-2",children:[e.jsx("div",{className:"flex items-center justify-between",children:e.jsxs("span",{className:"text-xs font-bold text-slate-800",children:["เมนูที่ชิม & ถอดรหัสสูตร (",(y.drinkItems||[]).length," เมนู):"]})}),e.jsx("div",{className:"grid grid-cols-1 sm:grid-cols-2 gap-3",children:(y.drinkItems||[]).map((o,p)=>e.jsxs("div",{className:"p-3 rounded-xl border border-amber-200/80 bg-amber-50/20 flex gap-3 shadow-xs",children:[o.photo&&e.jsx("img",{src:o.photo,alt:"",onClick:()=>mt(o.photo),className:"w-16 h-16 rounded-lg object-cover cursor-pointer border border-amber-200"}),e.jsxs("div",{className:"min-w-0 flex-1 space-y-1",children:[e.jsx("div",{className:"font-bold text-xs text-slate-900 truncate",children:o.name||`แก้วที่ #${p+1}`}),o.priceRmb&&e.jsxs("div",{className:"text-xs font-mono font-bold text-amber-700",children:["¥",o.priceRmb," ",e.jsxs("span",{className:"text-[11px] font-normal text-slate-500",children:["(≈",n(o.priceRmb),"฿)"]})]}),o.fitMenuTarget&&e.jsxs("div",{className:"text-[11px] font-semibold text-emerald-700",children:["ต่อยอด: ",o.fitMenuTarget]}),o.gimmickNotes&&e.jsx("p",{className:"text-[11px] text-slate-600",children:o.gimmickNotes}),ie(o).length>0&&e.jsx("div",{className:"flex flex-wrap gap-1 pt-1",children:ie(o).map((b,H)=>{const z=`${o.id}-v-${b.id||H}`;return e.jsxs("button",{type:"button",onClick:()=>Le(z,b.url),className:"inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-amber-50 text-amber-800 border border-amber-200 text-[10px] font-bold",children:[C===z?e.jsx(ze,{className:"w-2.5 h-2.5"}):e.jsx(qe,{className:"w-2.5 h-2.5"}),e.jsxs("span",{children:[b.label||`ฟังเสียง #${H+1}`," (",b.durationSec||4,"s)"]})]},z)})})]})]},o.id||p))})]}),e.jsx("audio",{ref:A,onEnded:()=>k(null),className:"hidden"}),e.jsxs("div",{className:"space-y-2",children:[e.jsxs("span",{className:"text-xs font-bold text-slate-800 block",children:["แกลเลอรีรูปภาพทั้งหมด (",_.length," รูป — แตะเพื่อขยายและเลื่อนซ้าย-ขวา):"]}),e.jsx("div",{className:"grid grid-cols-3 sm:grid-cols-4 gap-2",children:_.map((o,p)=>e.jsxs("div",{onClick:()=>g(p),className:"group relative aspect-square rounded-xl overflow-hidden border border-slate-200 cursor-pointer bg-slate-100 shadow-xs",children:[e.jsx("img",{src:o.url,className:"w-full h-full object-cover group-hover:scale-105 transition-transform duration-200"}),e.jsxs("div",{className:"absolute bottom-1 right-1 bg-black/60 text-white text-[9px] font-mono px-1.5 py-0.5 rounded",children:[p+1,"/",_.length]}),e.jsx("div",{className:"absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center text-[10px] text-white p-1 text-center font-medium",children:o.label})]},p))})]}),u.videos&&u.videos.length>0&&e.jsxs("div",{className:"space-y-2 pt-1",children:[e.jsxs("span",{className:"text-xs font-bold text-slate-800 flex items-center gap-1.5",children:[e.jsx("i",{className:"fa-solid fa-video text-purple-600"}),e.jsxs("span",{children:["คลิปวิดีโอของรายการนี้ (",u.videos.length," คลิป):"]})]}),e.jsx("div",{className:"grid grid-cols-1 sm:grid-cols-2 gap-3",children:u.videos.map((o,p)=>e.jsx(Pn,{src:o,className:"rounded-2xl border border-slate-200 shadow-sm h-48 sm:h-56",videoClassName:"object-contain",badgeLabel:`คลิปที่ ${p+1}`},p))})]}),e.jsxs("div",{id:"detail-comments-section",className:"p-4 bg-slate-50 rounded-xl border border-slate-200/80 space-y-3",children:[e.jsxs("div",{className:"flex items-center justify-between",children:[e.jsxs("span",{className:"text-xs font-bold text-slate-800 flex items-center gap-1.5",children:[e.jsx(kn,{className:"w-3.5 h-3.5 text-blue-600"}),e.jsx("span",{children:"ช่องความเห็นทีมงาน & ตอบกลับต่อเนื่อง (Threaded Comments)"})]}),e.jsxs("span",{className:"text-[11px] text-slate-400 font-mono",children:[u.reviewerNotes.length," หัวข้อสนทนา"]})]}),e.jsx("div",{className:"space-y-2.5",children:u.reviewerNotes.length===0?e.jsx("p",{className:"text-xs text-slate-400 py-3 text-center",children:"ยังไม่มีความเห็น สามารถพิมพ์บันทึกหรือตรวจสอบสเปกได้ด้านล่าง"}):u.reviewerNotes.map(o=>{var H,z,se,le,Y;const p=o.replies||[],b=Ne[o.id];return e.jsxs("div",{className:"p-3 bg-white rounded-xl border border-slate-200/70 shadow-xs space-y-2",children:[e.jsxs("div",{className:"flex items-start gap-2.5",children:[e.jsx(Te,{src:o.authorAvatar,className:"w-7 h-7 rounded-full object-cover shrink-0 mt-0.5 ring-1 ring-slate-200"}),e.jsxs("div",{className:"min-w-0 flex-1",children:[e.jsxs("div",{className:"flex items-center justify-between text-[11px] mb-0.5",children:[e.jsx("span",{className:"font-bold text-slate-900",children:o.author}),e.jsx("span",{className:"text-slate-400 font-mono text-[10px]",children:new Date(o.timestamp).toLocaleTimeString("th-TH",{hour:"2-digit",minute:"2-digit"})})]}),e.jsx("p",{className:"text-xs text-slate-700 leading-relaxed",children:o.text}),o.photoUrl&&e.jsx("div",{className:"mt-1.5",children:e.jsx("img",{src:o.photoUrl,alt:"ภาพแนบ",className:"max-h-48 max-w-xs rounded-xl border border-slate-200 object-cover cursor-pointer hover:opacity-95 shadow-2xs",onClick:()=>window.open(o.photoUrl,"_blank")})}),(o.voiceUrl||o.audioUrl)&&e.jsxs("div",{className:"mt-1.5 flex items-center gap-2 bg-slate-50 p-2 rounded-xl border border-slate-200/80 max-w-sm",children:[e.jsx(Ue,{className:"w-4 h-4 text-emerald-600 shrink-0"}),e.jsx("audio",{controls:!0,src:o.voiceUrl||o.audioUrl,className:"h-7 w-full"})]}),e.jsxs("div",{className:"flex items-center gap-3 mt-1.5 text-[11px] font-bold",children:[V&&e.jsxs("button",{type:"button",onClick:()=>X((K==null?void 0:K.noteId)===o.id&&K.author===o.author?null:{noteId:o.id,author:o.author}),className:"text-blue-600 hover:text-blue-800 flex items-center gap-1",children:[e.jsx(St,{className:"w-3 h-3"}),e.jsx("span",{children:"ตอบกลับ"})]}),p.length>0&&e.jsx("button",{type:"button",onClick:()=>de(U=>({...U,[o.id]:!U[o.id]})),className:"text-slate-500 hover:text-slate-800 flex items-center gap-1",children:b?e.jsxs(e.Fragment,{children:[e.jsx(En,{className:"w-3 h-3"}),e.jsxs("span",{children:["ดูการตอบกลับ (",p.length,")"]})]}):e.jsxs(e.Fragment,{children:[e.jsx(Rn,{className:"w-3 h-3"}),e.jsxs("span",{children:["ย่อการตอบกลับ (",p.length,")"]})]})})]})]})]}),p.length>0&&!b&&e.jsx("div",{className:"ml-6 pl-3 border-l-2 border-blue-200 space-y-2 pt-1",children:p.map(U=>e.jsxs("div",{className:"p-2.5 bg-slate-50 rounded-xl border border-slate-200/60 text-xs space-y-1",children:[e.jsxs("div",{className:"flex items-center justify-between text-[10px]",children:[e.jsxs("div",{className:"flex items-center gap-1.5 font-bold text-slate-800",children:[e.jsx(Te,{src:U.authorAvatar,className:"w-4 h-4 rounded-full object-cover"}),e.jsx("span",{children:U.author}),U.replyToAuthor&&e.jsxs("span",{className:"text-blue-600 font-normal",children:["▸ ตอบกลับ @",U.replyToAuthor]})]}),e.jsx("span",{className:"text-slate-400 font-mono",children:new Date(U.timestamp).toLocaleTimeString("th-TH",{hour:"2-digit",minute:"2-digit"})})]}),e.jsx("p",{className:"text-slate-700 leading-snug",children:U.text}),U.photoUrl&&e.jsx("div",{className:"mt-1",children:e.jsx("img",{src:U.photoUrl,alt:"ภาพแนบ",className:"max-h-36 max-w-[200px] rounded-lg border border-slate-200 object-cover cursor-pointer hover:opacity-95 shadow-2xs",onClick:()=>window.open(U.photoUrl,"_blank")})}),(U.voiceUrl||U.audioUrl)&&e.jsxs("div",{className:"mt-1 flex items-center gap-1.5 bg-white p-1.5 rounded-lg border border-slate-200 max-w-[240px]",children:[e.jsx(Ue,{className:"w-3.5 h-3.5 text-blue-600 shrink-0"}),e.jsx("audio",{controls:!0,src:U.voiceUrl||U.audioUrl,className:"h-6 w-full"})]}),e.jsx("div",{children:V&&e.jsxs("button",{type:"button",onClick:()=>X({noteId:o.id,author:U.author}),className:"text-[10px] font-bold text-blue-600 hover:underline inline-flex items-center gap-0.5",children:[e.jsx(St,{className:"w-2.5 h-2.5"}),e.jsxs("span",{children:["ตอบกลับ @",U.author," ต่อ"]})]})})]},U.id))}),V&&(K==null?void 0:K.noteId)===o.id&&e.jsxs("div",{className:"mt-2 pt-2 border-t border-slate-100 space-y-1.5 animate-in fade-in",children:[(((H=Q[o.id])==null?void 0:H.photoUrl)||((z=Q[o.id])==null?void 0:z.voiceUrl))&&e.jsxs("div",{className:"flex flex-wrap items-center gap-1.5 text-[10px]",children:[((se=Q[o.id])==null?void 0:se.photoUrl)&&e.jsxs("span",{className:"inline-flex items-center gap-1 px-1.5 py-0.5 rounded bg-emerald-50 text-emerald-800 border border-emerald-200",children:[e.jsx(Ae,{className:"w-3 h-3"})," ภาพพร้อมแนบ",e.jsx("button",{type:"button",onClick:()=>J(U=>({...U,[o.id]:{...U[o.id],photoUrl:void 0}})),children:e.jsx(we,{className:"w-2.5 h-2.5"})})]}),((le=Q[o.id])==null?void 0:le.voiceUrl)&&e.jsxs("span",{className:"inline-flex items-center gap-1.5 px-2 py-0.5 rounded bg-blue-50 text-blue-800 border border-blue-200",children:[e.jsx(Ie,{className:"w-3 h-3"})," เสียงอัดสดพร้อมส่ง",e.jsx("audio",{controls:!0,src:(Y=Q[o.id])==null?void 0:Y.voiceUrl,className:"h-6 w-32"}),e.jsx("button",{type:"button",onClick:()=>J(U=>({...U,[o.id]:{...U[o.id],voiceUrl:void 0}})),children:e.jsx(we,{className:"w-2.5 h-2.5"})})]})]}),e.jsxs("div",{className:"flex gap-1.5 items-center flex-wrap sm:flex-nowrap",children:[e.jsx("input",{type:"text",placeholder:`ตอบกลับ @${K.author} ในฐานะ ${t.alias}...`,value:ce[o.id]||"",onChange:U=>me({...ce,[o.id]:U.target.value}),className:"flex-1 min-w-[140px] bg-slate-50 border border-blue-300 rounded-lg px-2.5 py-1.5 text-xs text-slate-900 focus:outline-none focus:border-blue-500",autoFocus:!0,onKeyDown:U=>{U.key==="Enter"&&(U.preventDefault(),xt(o.id,K.author))}}),e.jsx("button",{type:"button",title:"แนบรูปภาพในคำตอบกลับ",onClick:()=>{const U=document.createElement("input");U.type="file",U.accept="image/*",U.onchange=Me=>{var je,Se;const Re=(Se=(je=Me.target)==null?void 0:je.files)==null?void 0:Se[0];Re&&Pe(Re,"photo",o.id)},U.click()},className:"p-1.5 rounded-lg border border-slate-200 hover:bg-slate-100 text-slate-500",children:e.jsx(Ae,{className:"w-3.5 h-3.5"})}),e.jsxs("button",{type:"button",title:f===o.id?"กดเพื่อหยุดอัดเสียงสด":"กดเพื่ออัดเสียงสดในคำตอบกลับ",disabled:Z,onClick:()=>void gt(o.id),className:`px-2 py-1.5 rounded-lg border text-[11px] font-bold inline-flex items-center gap-1 transition-all ${f===o.id?"bg-rose-600 text-white border-rose-600 animate-pulse":"bg-white border-slate-200 hover:border-blue-500 hover:bg-blue-50 text-slate-600 hover:text-blue-700"}`,children:[e.jsx(Ie,{className:"w-3.5 h-3.5"}),e.jsx("span",{children:f===o.id?`หยุดอัด (${ne}s)`:"อัดเสียงสด"})]}),e.jsx("button",{type:"button",onClick:()=>xt(o.id,K.author),className:"px-3 py-1.5 rounded-lg bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold",children:"ส่ง"}),V&&e.jsx("button",{type:"button",onClick:()=>X(null),className:"px-2 py-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-600 text-xs",children:"ยกเลิก"})]})]})]},o.id)})}),e.jsxs("div",{className:"pt-2 border-t border-slate-200/60 space-y-1.5",children:[e.jsx("div",{className:"flex items-center justify-between text-[11px] text-slate-500",children:e.jsxs("span",{className:"font-semibold flex items-center gap-1",children:[e.jsx(Ln,{className:"w-3 h-3 text-amber-500"})," ข้อความด่วน (แตะเพื่อพิมพ์ทันที):"]})}),e.jsx("div",{className:"flex items-center gap-1.5 overflow-x-auto no-scrollbar py-0.5",children:w.map(o=>e.jsxs("button",{type:"button",onClick:()=>$(o.text),className:"px-2.5 py-1 rounded-lg bg-white border border-slate-200 hover:border-blue-400 text-[11px] text-slate-700 whitespace-nowrap active:scale-95 transition-all shadow-xs",title:o.text,children:[e.jsx("i",{className:"fa-solid fa-bolt text-amber-500 mr-1 text-[10px]"}),e.jsx("span",{children:o.title})]},o.id))})]}),t.role==="viewer"?null:e.jsxs("form",{onSubmit:mn,className:"space-y-2 pt-1",children:[(ee||te||Z)&&e.jsxs("div",{className:"flex flex-wrap items-center gap-2 px-1",children:[ee&&e.jsxs("div",{className:"flex items-center gap-1.5 px-2 py-1 bg-emerald-50 border border-emerald-200 rounded-lg text-xs text-emerald-800",children:[e.jsx(Ae,{className:"w-3.5 h-3.5 text-emerald-600"}),e.jsx("span",{className:"truncate max-w-[120px]",children:"รูปภาพพร้อมแนบ"}),e.jsx("button",{type:"button",onClick:()=>ae(null),className:"text-slate-400 hover:text-rose-600",children:e.jsx(we,{className:"w-3 h-3"})})]}),te&&e.jsxs("div",{className:"flex items-center gap-1.5 px-2 py-1 bg-blue-50 border border-blue-200 rounded-lg text-xs text-blue-800",children:[e.jsx(Ie,{className:"w-3.5 h-3.5 text-blue-600"}),e.jsx("span",{children:"เสียงอัดสด:"}),e.jsx("audio",{controls:!0,src:te,className:"h-6 w-36"}),e.jsx("button",{type:"button",onClick:()=>ue(null),className:"text-slate-400 hover:text-rose-600",children:e.jsx(we,{className:"w-3 h-3"})})]}),Z&&e.jsxs("div",{className:"flex items-center gap-1.5 text-xs text-blue-600 font-medium",children:[e.jsx(Dn,{className:"w-3.5 h-3.5 animate-spin"}),e.jsx("span",{children:"กำลังอัปโหลดไฟล์สื่อ..."})]})]}),e.jsxs("div",{className:"flex gap-1.5 items-center flex-wrap sm:flex-nowrap",children:[e.jsx("input",{ref:m,type:"file",accept:"image/*",className:"hidden",onChange:o=>{var b;const p=(b=o.target.files)==null?void 0:b[0];p&&Pe(p,"photo"),o.target.value=""}}),e.jsx("input",{type:"text",placeholder:`พิมพ์ข้อคิดเห็นใหม่ในฐานะ ${t.alias}...`,value:S,onChange:o=>$(o.target.value),className:"flex-1 min-w-[140px] h-8 bg-white border border-slate-200 rounded-lg px-2.5 text-xs text-slate-900 focus:outline-none focus:border-blue-500 shadow-2xs"}),e.jsxs("button",{type:"button",title:"แนบรูปภาพ",disabled:Z,onClick:()=>{var o;return(o=m.current)==null?void 0:o.click()},className:"h-8 px-2.5 rounded-lg border border-slate-200 bg-white hover:border-emerald-500 hover:bg-emerald-50 text-slate-600 hover:text-emerald-700 text-[11px] font-bold inline-flex items-center justify-center gap-1 transition-colors shrink-0",children:[e.jsx(Ae,{className:"w-3.5 h-3.5"}),e.jsx("span",{className:"hidden sm:inline",children:"รูปภาพ"})]}),e.jsxs("button",{type:"button",title:f==="main"?"กดเพื่อหยุดอัดเสียงสด":"กดเพื่ออัดเสียงสดในคอมเมนต์",disabled:Z,onClick:()=>void gt("main"),className:`h-8 px-2.5 rounded-lg border text-[11px] font-bold inline-flex items-center justify-center gap-1 transition-all shrink-0 ${f==="main"?"bg-rose-600 text-white border-rose-600 animate-pulse shadow-xs":"bg-white border-slate-200 hover:border-blue-500 hover:bg-blue-50 text-slate-700 hover:text-blue-700"}`,children:[e.jsx(Ie,{className:"w-3.5 h-3.5"}),e.jsx("span",{children:f==="main"?`หยุดอัด (${ne}s)`:"อัดเสียงสด"})]}),e.jsxs("button",{type:"submit",disabled:Z||f==="main",className:"h-8 px-3 rounded-lg bg-blue-600 hover:bg-blue-700 text-white text-[11px] font-bold shadow-2xs active:scale-95 transition-all inline-flex items-center justify-center gap-1 shrink-0 disabled:opacity-50",children:[e.jsx(Sn,{className:"w-3 h-3"}),e.jsx("span",{children:"โพสต์"})]})]})]})]}),e.jsxs("div",{className:"p-3.5 bg-slate-50/90 rounded-xl border border-slate-200/80 space-y-2.5",children:[e.jsxs("div",{className:"flex flex-wrap items-center justify-between gap-2",children:[e.jsxs("span",{className:"text-xs font-bold text-slate-800 flex items-center gap-1.5",children:[e.jsx("i",{className:"fa-solid fa-clock-rotate-left text-emerald-600 text-xs"}),e.jsx("span",{children:"ประวัติการดำเนินงาน & ส่งต่องาน (Activity Log)"})]}),u.handoffStage&&e.jsxs("span",{className:"text-[10px] font-bold px-2 py-0.5 rounded-md bg-emerald-50 text-emerald-800 border border-emerald-200",children:["สถานะส่งต่อ:"," ",{awaiting:"พาร์ท 1: รอรับช่วงต่อ",rfq_sent:"พาร์ท 2: ขอสเปก / ส่ง RFQ",sample_test:"พาร์ท 3: ทดสอบตัวอย่าง Lab/R&D",negotiate:"พาร์ท 4: ต่อรองราคา & MOQ",approved:"พาร์ท 5: ตัวเต็งอนุมัติ",ordered:"พาร์ท 6: สั่งซื้อสำเร็จ"}[u.handoffStage]||u.handoffStage]})]}),(u.assignedTo||u.targetFollowUpDate||u.handoffNotes)&&e.jsxs("div",{className:"p-2.5 bg-white rounded-lg border border-slate-200/80 text-[11px] space-y-1",children:[e.jsxs("div",{className:"flex flex-wrap items-center gap-3 text-slate-700",children:[u.assignedTo&&e.jsxs("span",{className:"font-bold inline-flex items-center gap-1",children:[e.jsx("i",{className:"fa-solid fa-user-check text-emerald-600 text-[10px]"}),e.jsxs("span",{children:["ผู้รับช่วงต่อ: ",u.assignedTo]})]}),u.targetFollowUpDate&&e.jsxs("span",{className:"font-mono text-slate-500",children:["กำหนดติดตาม: ",u.targetFollowUpDate]})]}),u.handoffNotes&&e.jsxs("p",{className:"text-slate-600 whitespace-pre-wrap leading-relaxed",children:["หมายเหตุส่งต่อ: ",u.handoffNotes]})]}),e.jsx("div",{className:"space-y-1.5 max-h-48 overflow-y-auto pr-1",children:(()=>{const o=Array.isArray(u.history)?u.history:[];return(o.length>0?o:[{action:"สร้างบันทึกรายการสำรวจ",user:u.creator.alias,userAvatar:u.creator.avatar,timestamp:u.creator.timestamp}]).map((b,H)=>{const z=I.find(Y=>Y.alias===b.user||Y.name===b.user),se=b.userAvatar||(z==null?void 0:z.avatar)||(b.user===u.creator.alias?u.creator.avatar:"./logo.jpg"),le=b.action==="handoff"?"อัปเดตสถานะการส่งต่องาน (Handoff)":b.action==="comment"?"เพิ่มความคิดเห็นในรายการ":b.action==="reply"?"ตอบกลับความคิดเห็น":b.action;return e.jsxs("div",{className:"flex items-center justify-between gap-2 px-2.5 py-1.5 bg-white rounded-lg border border-slate-200/70 text-[11px]",children:[e.jsxs("div",{className:"flex items-center gap-2 min-w-0",children:[e.jsx(Te,{src:se,alt:b.user,className:"w-5 h-5 rounded-full object-cover border border-slate-200 shrink-0"}),e.jsx("span",{className:"font-bold text-slate-900 shrink-0",children:b.user}),e.jsx("span",{className:"text-slate-600 truncate",children:le})]}),e.jsx("span",{className:"text-[10px] font-mono text-slate-400 shrink-0",children:new Date(b.timestamp).toLocaleString("th-TH",{day:"2-digit",month:"2-digit",year:"2-digit",hour:"2-digit",minute:"2-digit"})})]},`${b.timestamp}-${H}`)})})()})]})]}),e.jsxs("div",{className:"p-3.5 border-t border-slate-100 bg-white flex items-center justify-between",children:[e.jsxs("div",{className:"text-[11px] text-slate-400 font-mono",children:["ID: ",u.id," · ปรับปรุง:"," ",new Date(u.updatedAt).toLocaleTimeString("th-TH")]}),e.jsxs("div",{className:"flex items-center gap-2",children:[R&&e.jsxs("button",{type:"button",onClick:()=>E(u),className:"px-3.5 py-1.5 text-xs font-bold rounded-xl bg-amber-50 hover:bg-amber-100 text-amber-800 border border-amber-300 flex items-center gap-1.5 transition-colors",children:[e.jsx(Rt,{className:"w-3.5 h-3.5 text-amber-600"}),e.jsx("span",{children:"แก้ไขข้อมูลรายการนี้"})]}),e.jsx("button",{onClick:a,className:"px-4 py-1.5 text-xs font-bold rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 transition-colors",children:"ปิดหน้าต่าง"})]})]})]}),q!==null&&_[q]&&e.jsxs("div",{className:"fixed inset-0 z-[140] bg-black/92 backdrop-blur-md flex flex-col items-center justify-between p-3 sm:p-6 select-none",onClick:()=>g(null),children:[e.jsxs("div",{className:"w-full max-w-4xl flex items-center justify-between text-white z-10",onClick:o=>o.stopPropagation(),children:[e.jsxs("div",{className:"flex items-center gap-2",children:[e.jsxs("span",{className:"px-2.5 py-1 rounded-full bg-white/15 font-mono text-xs font-bold",children:["รูปที่ ",q+1," / ",_.length]}),e.jsx("span",{className:"text-xs sm:text-sm font-semibold text-white/90 truncate max-w-[240px] sm:max-w-md",children:_[q].label})]}),e.jsx("button",{type:"button",onClick:()=>g(null),className:"w-9 h-9 rounded-full bg-white/15 hover:bg-white/25 text-white flex items-center justify-center transition-colors",children:e.jsx(we,{className:"w-5 h-5"})})]}),e.jsxs("div",{className:"relative flex-1 w-full max-w-5xl flex items-center justify-center my-2",onClick:o=>o.stopPropagation(),children:[_.length>1&&e.jsx("button",{type:"button",onClick:()=>g((q-1+_.length)%_.length),className:"absolute left-1 sm:left-3 z-20 w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-black/60 hover:bg-black/80 border border-white/25 text-white flex items-center justify-center shadow-lg active:scale-95 transition-all",title:"รูปก่อนหน้า (◀)",children:e.jsx(Tn,{className:"w-6 h-6"})}),e.jsx("img",{src:_[q].url,alt:_[q].label,className:"max-w-full max-h-[72vh] object-contain rounded-xl shadow-2xl"}),_.length>1&&e.jsx("button",{type:"button",onClick:()=>g((q+1)%_.length),className:"absolute right-1 sm:right-3 z-20 w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-black/60 hover:bg-black/80 border border-white/25 text-white flex items-center justify-center shadow-lg active:scale-95 transition-all",title:"รูปถัดไป (▶)",children:e.jsx(An,{className:"w-6 h-6"})})]}),_.length>1&&e.jsx("div",{className:"w-full max-w-3xl flex items-center justify-center gap-2 overflow-x-auto py-1 z-10",onClick:o=>o.stopPropagation(),children:_.map((o,p)=>e.jsx("button",{type:"button",onClick:()=>g(p),className:`relative w-12 h-12 sm:w-14 sm:h-14 rounded-lg overflow-hidden shrink-0 border-2 transition-all ${p===q?"border-emerald-400 scale-105 shadow-md":"border-white/20 opacity-60 hover:opacity-100"}`,children:e.jsx("img",{src:o.url,className:"w-full h-full object-cover"})},p))})]})]})};export{ps as DetailModal};
