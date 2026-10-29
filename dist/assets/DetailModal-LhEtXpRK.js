import{c as $e,H as bn,z as ie,u as vn,r as W,I as fe,J as De,j as e,F as wn,n as yn,X as we,P as Rt,K as Nn,N as jn,w as Te,f as Cn,V as Ue,M as $n,e as kn,O as St,Q as En,W as Rn,Y as Ae,S as Sn,Z as Tn,C as An,G as In}from"./index-2XTeJSeR.js";import{F as Bn,V as Pn}from"./VideoPlayer-DrNm6pIq.js";import{M as Ie}from"./mic-UzkhMZK2.js";import{Z as Ln}from"./zap-CWlM5dOt.js";/**
 * @license lucide-react v1.62.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const on={name:"file-down",size:24,node:[["path",{d:"M6 22a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h8a2.4 2.4 0 0 1 1.704.706l3.588 3.588A2.4 2.4 0 0 1 20 8v12a2 2 0 0 1-2 2z",key:"1oefj6"}],["path",{d:"M14 2v5a1 1 0 0 0 1 1h5",key:"wfsgrz"}],["path",{d:"M12 18v-6",key:"17g6i2"}],["path",{d:"m9 15 3 3 3-3",key:"1npd3o"}]]};on.node;const Mn=$e(on);/**
 * @license lucide-react v1.62.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const an={name:"loader-circle",size:24,node:[["path",{d:"M21 12a9 9 0 1 1-6.219-8.56",key:"13zald"}]],aliases:["loader-2"]};an.node;const Dn=$e(an);/**
 * @license lucide-react v1.62.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const ln={name:"pause",size:24,node:[["rect",{x:"14",y:"3",width:"5",height:"18",rx:"1",key:"kaeet6"}],["rect",{x:"5",y:"3",width:"5",height:"18",rx:"1",key:"1wsw3u"}]]};ln.node;const ze=$e(ln);/**
 * @license lucide-react v1.62.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const cn={name:"play",size:24,node:[["path",{d:"M5 5a2 2 0 0 1 3.008-1.728l11.997 6.998a2 2 0 0 1 .003 3.458l-12 7A2 2 0 0 1 5 19z",key:"10ikf1"}]]};cn.node;const qe=$e(cn);/**
 * @license lucide-react v1.62.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const dn={name:"printer",size:24,node:[["path",{d:"M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2",key:"143wyd"}],["path",{d:"M6 9V3a1 1 0 0 1 1-1h10a1 1 0 0 1 1 1v6",key:"1itne7"}],["rect",{x:"6",y:"14",width:"12",height:"8",rx:"1",key:"1ue0tg"}]]};dn.node;const Un=$e(dn);var ye={},Fe,Tt;function zn(){return Tt||(Tt=1,Fe=function(){return typeof Promise=="function"&&Promise.prototype&&Promise.prototype.then}),Fe}var _e={},me={},At;function ge(){if(At)return me;At=1;let s;const i=[0,26,44,70,100,134,172,196,242,292,346,404,466,532,581,655,733,815,901,991,1085,1156,1258,1364,1474,1588,1706,1828,1921,2051,2185,2323,2465,2611,2761,2876,3034,3196,3362,3532,3706];return me.getSymbolSize=function(r){if(!r)throw new Error('"version" cannot be null or undefined');if(r<1||r>40)throw new Error('"version" should be in range from 1 to 40');return r*4+17},me.getSymbolTotalCodewords=function(r){return i[r]},me.getBCHDigit=function(a){let r=0;for(;a!==0;)r++,a>>>=1;return r},me.setToSJISFunction=function(r){if(typeof r!="function")throw new Error('"toSJISFunc" is not a valid function.');s=r},me.isKanjiModeEnabled=function(){return typeof s<"u"},me.toSJIS=function(r){return s(r)},me}var He={},It;function dt(){return It||(It=1,(function(s){s.L={bit:1},s.M={bit:0},s.Q={bit:3},s.H={bit:2};function i(a){if(typeof a!="string")throw new Error("Param is not a string");switch(a.toLowerCase()){case"l":case"low":return s.L;case"m":case"medium":return s.M;case"q":case"quartile":return s.Q;case"h":case"high":return s.H;default:throw new Error("Unknown EC Level: "+a)}}s.isValid=function(r){return r&&typeof r.bit<"u"&&r.bit>=0&&r.bit<4},s.from=function(r,t){if(s.isValid(r))return r;try{return i(r)}catch{return t}}})(He)),He}var Ve,Bt;function qn(){if(Bt)return Ve;Bt=1;function s(){this.buffer=[],this.length=0}return s.prototype={get:function(i){const a=Math.floor(i/8);return(this.buffer[a]>>>7-i%8&1)===1},put:function(i,a){for(let r=0;r<a;r++)this.putBit((i>>>a-r-1&1)===1)},getLengthInBits:function(){return this.length},putBit:function(i){const a=Math.floor(this.length/8);this.buffer.length<=a&&this.buffer.push(0),i&&(this.buffer[a]|=128>>>this.length%8),this.length++}},Ve=s,Ve}var Oe,Pt;function Fn(){if(Pt)return Oe;Pt=1;function s(i){if(!i||i<1)throw new Error("BitMatrix size must be defined and greater than 0");this.size=i,this.data=new Uint8Array(i*i),this.reservedBit=new Uint8Array(i*i)}return s.prototype.set=function(i,a,r,t){const n=i*this.size+a;this.data[n]=r,t&&(this.reservedBit[n]=!0)},s.prototype.get=function(i,a){return this.data[i*this.size+a]},s.prototype.xor=function(i,a,r){this.data[i*this.size+a]^=r},s.prototype.isReserved=function(i,a){return this.reservedBit[i*this.size+a]},Oe=s,Oe}var Ke={},Lt;function _n(){return Lt||(Lt=1,(function(s){const i=ge().getSymbolSize;s.getRowColCoords=function(r){if(r===1)return[];const t=Math.floor(r/7)+2,n=i(r),l=n===145?26:Math.ceil((n-13)/(2*t-2))*2,c=[n-7];for(let d=1;d<t-1;d++)c[d]=c[d-1]-l;return c.push(6),c.reverse()},s.getPositions=function(r){const t=[],n=s.getRowColCoords(r),l=n.length;for(let c=0;c<l;c++)for(let d=0;d<l;d++)c===0&&d===0||c===0&&d===l-1||c===l-1&&d===0||t.push([n[c],n[d]]);return t}})(Ke)),Ke}var Qe={},Mt;function Hn(){if(Mt)return Qe;Mt=1;const s=ge().getSymbolSize,i=7;return Qe.getPositions=function(r){const t=s(r);return[[0,0],[t-i,0],[0,t-i]]},Qe}var Ge={},Dt;function Vn(){return Dt||(Dt=1,(function(s){s.Patterns={PATTERN000:0,PATTERN001:1,PATTERN010:2,PATTERN011:3,PATTERN100:4,PATTERN101:5,PATTERN110:6,PATTERN111:7};const i={N1:3,N2:3,N3:40,N4:10};s.isValid=function(t){return t!=null&&t!==""&&!isNaN(t)&&t>=0&&t<=7},s.from=function(t){return s.isValid(t)?parseInt(t,10):void 0},s.getPenaltyN1=function(t){const n=t.size;let l=0,c=0,d=0,g=null,N=null;for(let I=0;I<n;I++){c=d=0,g=N=null;for(let A=0;A<n;A++){let v=t.get(I,A);v===g?c++:(c>=5&&(l+=i.N1+(c-5)),g=v,c=1),v=t.get(A,I),v===N?d++:(d>=5&&(l+=i.N1+(d-5)),N=v,d=1)}c>=5&&(l+=i.N1+(c-5)),d>=5&&(l+=i.N1+(d-5))}return l},s.getPenaltyN2=function(t){const n=t.size;let l=0;for(let c=0;c<n-1;c++)for(let d=0;d<n-1;d++){const g=t.get(c,d)+t.get(c,d+1)+t.get(c+1,d)+t.get(c+1,d+1);(g===4||g===0)&&l++}return l*i.N2},s.getPenaltyN3=function(t){const n=t.size;let l=0,c=0,d=0;for(let g=0;g<n;g++){c=d=0;for(let N=0;N<n;N++)c=c<<1&2047|t.get(g,N),N>=10&&(c===1488||c===93)&&l++,d=d<<1&2047|t.get(N,g),N>=10&&(d===1488||d===93)&&l++}return l*i.N3},s.getPenaltyN4=function(t){let n=0;const l=t.data.length;for(let d=0;d<l;d++)n+=t.data[d];return Math.abs(Math.ceil(n*100/l/5)-10)*i.N4};function a(r,t,n){switch(r){case s.Patterns.PATTERN000:return(t+n)%2===0;case s.Patterns.PATTERN001:return t%2===0;case s.Patterns.PATTERN010:return n%3===0;case s.Patterns.PATTERN011:return(t+n)%3===0;case s.Patterns.PATTERN100:return(Math.floor(t/2)+Math.floor(n/3))%2===0;case s.Patterns.PATTERN101:return t*n%2+t*n%3===0;case s.Patterns.PATTERN110:return(t*n%2+t*n%3)%2===0;case s.Patterns.PATTERN111:return(t*n%3+(t+n)%2)%2===0;default:throw new Error("bad maskPattern:"+r)}}s.applyMask=function(t,n){const l=n.size;for(let c=0;c<l;c++)for(let d=0;d<l;d++)n.isReserved(d,c)||n.xor(d,c,a(t,d,c))},s.getBestMask=function(t,n){const l=Object.keys(s.Patterns).length;let c=0,d=1/0;for(let g=0;g<l;g++){n(g),s.applyMask(g,t);const N=s.getPenaltyN1(t)+s.getPenaltyN2(t)+s.getPenaltyN3(t)+s.getPenaltyN4(t);s.applyMask(g,t),N<d&&(d=N,c=g)}return c}})(Ge)),Ge}var Be={},Ut;function un(){if(Ut)return Be;Ut=1;const s=dt(),i=[1,1,1,1,1,1,1,1,1,1,2,2,1,2,2,4,1,2,4,4,2,4,4,4,2,4,6,5,2,4,6,6,2,5,8,8,4,5,8,8,4,5,8,11,4,8,10,11,4,9,12,16,4,9,16,16,6,10,12,18,6,10,17,16,6,11,16,19,6,13,18,21,7,14,21,25,8,16,20,25,8,17,23,25,9,17,23,34,9,18,25,30,10,20,27,32,12,21,29,35,12,23,34,37,12,25,34,40,13,26,35,42,14,28,38,45,15,29,40,48,16,31,43,51,17,33,45,54,18,35,48,57,19,37,51,60,19,38,53,63,20,40,56,66,21,43,59,70,22,45,62,74,24,47,65,77,25,49,68,81],a=[7,10,13,17,10,16,22,28,15,26,36,44,20,36,52,64,26,48,72,88,36,64,96,112,40,72,108,130,48,88,132,156,60,110,160,192,72,130,192,224,80,150,224,264,96,176,260,308,104,198,288,352,120,216,320,384,132,240,360,432,144,280,408,480,168,308,448,532,180,338,504,588,196,364,546,650,224,416,600,700,224,442,644,750,252,476,690,816,270,504,750,900,300,560,810,960,312,588,870,1050,336,644,952,1110,360,700,1020,1200,390,728,1050,1260,420,784,1140,1350,450,812,1200,1440,480,868,1290,1530,510,924,1350,1620,540,980,1440,1710,570,1036,1530,1800,570,1064,1590,1890,600,1120,1680,1980,630,1204,1770,2100,660,1260,1860,2220,720,1316,1950,2310,750,1372,2040,2430];return Be.getBlocksCount=function(t,n){switch(n){case s.L:return i[(t-1)*4+0];case s.M:return i[(t-1)*4+1];case s.Q:return i[(t-1)*4+2];case s.H:return i[(t-1)*4+3];default:return}},Be.getTotalCodewordsCount=function(t,n){switch(n){case s.L:return a[(t-1)*4+0];case s.M:return a[(t-1)*4+1];case s.Q:return a[(t-1)*4+2];case s.H:return a[(t-1)*4+3];default:return}},Be}var Je={},Ce={},zt;function On(){if(zt)return Ce;zt=1;const s=new Uint8Array(512),i=new Uint8Array(256);return(function(){let r=1;for(let t=0;t<255;t++)s[t]=r,i[r]=t,r<<=1,r&256&&(r^=285);for(let t=255;t<512;t++)s[t]=s[t-255]})(),Ce.log=function(r){if(r<1)throw new Error("log("+r+")");return i[r]},Ce.exp=function(r){return s[r]},Ce.mul=function(r,t){return r===0||t===0?0:s[i[r]+i[t]]},Ce}var qt;function Kn(){return qt||(qt=1,(function(s){const i=On();s.mul=function(r,t){const n=new Uint8Array(r.length+t.length-1);for(let l=0;l<r.length;l++)for(let c=0;c<t.length;c++)n[l+c]^=i.mul(r[l],t[c]);return n},s.mod=function(r,t){let n=new Uint8Array(r);for(;n.length-t.length>=0;){const l=n[0];for(let d=0;d<t.length;d++)n[d]^=i.mul(t[d],l);let c=0;for(;c<n.length&&n[c]===0;)c++;n=n.slice(c)}return n},s.generateECPolynomial=function(r){let t=new Uint8Array([1]);for(let n=0;n<r;n++)t=s.mul(t,new Uint8Array([1,i.exp(n)]));return t}})(Je)),Je}var Ye,Ft;function Qn(){if(Ft)return Ye;Ft=1;const s=Kn();function i(a){this.genPoly=void 0,this.degree=a,this.degree&&this.initialize(this.degree)}return i.prototype.initialize=function(r){this.degree=r,this.genPoly=s.generateECPolynomial(this.degree)},i.prototype.encode=function(r){if(!this.genPoly)throw new Error("Encoder not initialized");const t=new Uint8Array(r.length+this.degree);t.set(r);const n=s.mod(t,this.genPoly),l=this.degree-n.length;if(l>0){const c=new Uint8Array(this.degree);return c.set(n,l),c}return n},Ye=i,Ye}var We={},Ze={},Xe={},_t;function hn(){return _t||(_t=1,Xe.isValid=function(i){return!isNaN(i)&&i>=1&&i<=40}),Xe}var oe={},Ht;function fn(){if(Ht)return oe;Ht=1;const s="[0-9]+",i="[A-Z $%*+\\-./:]+";let a="(?:[u3000-u303F]|[u3040-u309F]|[u30A0-u30FF]|[uFF00-uFFEF]|[u4E00-u9FAF]|[u2605-u2606]|[u2190-u2195]|u203B|[u2010u2015u2018u2019u2025u2026u201Cu201Du2225u2260]|[u0391-u0451]|[u00A7u00A8u00B1u00B4u00D7u00F7])+";a=a.replace(/u/g,"\\u");const r="(?:(?![A-Z0-9 $%*+\\-./:]|"+a+`)(?:.|[\r
]))+`;oe.KANJI=new RegExp(a,"g"),oe.BYTE_KANJI=new RegExp("[^A-Z0-9 $%*+\\-./:]+","g"),oe.BYTE=new RegExp(r,"g"),oe.NUMERIC=new RegExp(s,"g"),oe.ALPHANUMERIC=new RegExp(i,"g");const t=new RegExp("^"+a+"$"),n=new RegExp("^"+s+"$"),l=new RegExp("^[A-Z0-9 $%*+\\-./:]+$");return oe.testKanji=function(d){return t.test(d)},oe.testNumeric=function(d){return n.test(d)},oe.testAlphanumeric=function(d){return l.test(d)},oe}var Vt;function xe(){return Vt||(Vt=1,(function(s){const i=hn(),a=fn();s.NUMERIC={id:"Numeric",bit:1,ccBits:[10,12,14]},s.ALPHANUMERIC={id:"Alphanumeric",bit:2,ccBits:[9,11,13]},s.BYTE={id:"Byte",bit:4,ccBits:[8,16,16]},s.KANJI={id:"Kanji",bit:8,ccBits:[8,10,12]},s.MIXED={bit:-1},s.getCharCountIndicator=function(n,l){if(!n.ccBits)throw new Error("Invalid mode: "+n);if(!i.isValid(l))throw new Error("Invalid version: "+l);return l>=1&&l<10?n.ccBits[0]:l<27?n.ccBits[1]:n.ccBits[2]},s.getBestModeForData=function(n){return a.testNumeric(n)?s.NUMERIC:a.testAlphanumeric(n)?s.ALPHANUMERIC:a.testKanji(n)?s.KANJI:s.BYTE},s.toString=function(n){if(n&&n.id)return n.id;throw new Error("Invalid mode")},s.isValid=function(n){return n&&n.bit&&n.ccBits};function r(t){if(typeof t!="string")throw new Error("Param is not a string");switch(t.toLowerCase()){case"numeric":return s.NUMERIC;case"alphanumeric":return s.ALPHANUMERIC;case"kanji":return s.KANJI;case"byte":return s.BYTE;default:throw new Error("Unknown mode: "+t)}}s.from=function(n,l){if(s.isValid(n))return n;try{return r(n)}catch{return l}}})(Ze)),Ze}var Ot;function Gn(){return Ot||(Ot=1,(function(s){const i=ge(),a=un(),r=dt(),t=xe(),n=hn(),l=7973,c=i.getBCHDigit(l);function d(A,v,L){for(let E=1;E<=40;E++)if(v<=s.getCapacity(E,L,A))return E}function g(A,v){return t.getCharCountIndicator(A,v)+4}function N(A,v){let L=0;return A.forEach(function(E){const V=g(E.mode,v);L+=V+E.getBitsLength()}),L}function I(A,v){for(let L=1;L<=40;L++)if(N(A,L)<=s.getCapacity(L,v,t.MIXED))return L}s.from=function(v,L){return n.isValid(v)?parseInt(v,10):L},s.getCapacity=function(v,L,E){if(!n.isValid(v))throw new Error("Invalid QR Code version");typeof E>"u"&&(E=t.BYTE);const V=i.getSymbolTotalCodewords(v),k=a.getTotalCodewordsCount(v,L),M=(V-k)*8;if(E===t.MIXED)return M;const P=M-g(E,v);switch(E){case t.NUMERIC:return Math.floor(P/10*3);case t.ALPHANUMERIC:return Math.floor(P/11*2);case t.KANJI:return Math.floor(P/13);case t.BYTE:default:return Math.floor(P/8)}},s.getBestVersionForData=function(v,L){let E;const V=r.from(L,r.M);if(Array.isArray(v)){if(v.length>1)return I(v,V);if(v.length===0)return 1;E=v[0]}else E=v;return d(E.mode,E.getLength(),V)},s.getEncodedBits=function(v){if(!n.isValid(v)||v<7)throw new Error("Invalid QR Code version");let L=v<<12;for(;i.getBCHDigit(L)-c>=0;)L^=l<<i.getBCHDigit(L)-c;return v<<12|L}})(We)),We}var et={},Kt;function Jn(){if(Kt)return et;Kt=1;const s=ge(),i=1335,a=21522,r=s.getBCHDigit(i);return et.getEncodedBits=function(n,l){const c=n.bit<<3|l;let d=c<<10;for(;s.getBCHDigit(d)-r>=0;)d^=i<<s.getBCHDigit(d)-r;return(c<<10|d)^a},et}var tt={},nt,Qt;function Yn(){if(Qt)return nt;Qt=1;const s=xe();function i(a){this.mode=s.NUMERIC,this.data=a.toString()}return i.getBitsLength=function(r){return 10*Math.floor(r/3)+(r%3?r%3*3+1:0)},i.prototype.getLength=function(){return this.data.length},i.prototype.getBitsLength=function(){return i.getBitsLength(this.data.length)},i.prototype.write=function(r){let t,n,l;for(t=0;t+3<=this.data.length;t+=3)n=this.data.substr(t,3),l=parseInt(n,10),r.put(l,10);const c=this.data.length-t;c>0&&(n=this.data.substr(t),l=parseInt(n,10),r.put(l,c*3+1))},nt=i,nt}var st,Gt;function Wn(){if(Gt)return st;Gt=1;const s=xe(),i=["0","1","2","3","4","5","6","7","8","9","A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z"," ","$","%","*","+","-",".","/",":"];function a(r){this.mode=s.ALPHANUMERIC,this.data=r}return a.getBitsLength=function(t){return 11*Math.floor(t/2)+6*(t%2)},a.prototype.getLength=function(){return this.data.length},a.prototype.getBitsLength=function(){return a.getBitsLength(this.data.length)},a.prototype.write=function(t){let n;for(n=0;n+2<=this.data.length;n+=2){let l=i.indexOf(this.data[n])*45;l+=i.indexOf(this.data[n+1]),t.put(l,11)}this.data.length%2&&t.put(i.indexOf(this.data[n]),6)},st=a,st}var rt,Jt;function Zn(){if(Jt)return rt;Jt=1;const s=xe();function i(a){this.mode=s.BYTE,typeof a=="string"?this.data=new TextEncoder().encode(a):this.data=new Uint8Array(a)}return i.getBitsLength=function(r){return r*8},i.prototype.getLength=function(){return this.data.length},i.prototype.getBitsLength=function(){return i.getBitsLength(this.data.length)},i.prototype.write=function(a){for(let r=0,t=this.data.length;r<t;r++)a.put(this.data[r],8)},rt=i,rt}var ot,Yt;function Xn(){if(Yt)return ot;Yt=1;const s=xe(),i=ge();function a(r){this.mode=s.KANJI,this.data=r}return a.getBitsLength=function(t){return t*13},a.prototype.getLength=function(){return this.data.length},a.prototype.getBitsLength=function(){return a.getBitsLength(this.data.length)},a.prototype.write=function(r){let t;for(t=0;t<this.data.length;t++){let n=i.toSJIS(this.data[t]);if(n>=33088&&n<=40956)n-=33088;else if(n>=57408&&n<=60351)n-=49472;else throw new Error("Invalid SJIS character: "+this.data[t]+`
Make sure your charset is UTF-8`);n=(n>>>8&255)*192+(n&255),r.put(n,13)}},ot=a,ot}var it={exports:{}},Wt;function es(){return Wt||(Wt=1,(function(s){var i={single_source_shortest_paths:function(a,r,t){var n={},l={};l[r]=0;var c=i.PriorityQueue.make();c.push(r,0);for(var d,g,N,I,A,v,L,E,V;!c.empty();){d=c.pop(),g=d.value,I=d.cost,A=a[g]||{};for(N in A)A.hasOwnProperty(N)&&(v=A[N],L=I+v,E=l[N],V=typeof l[N]>"u",(V||E>L)&&(l[N]=L,c.push(N,L),n[N]=g))}if(typeof t<"u"&&typeof l[t]>"u"){var k=["Could not find a path from ",r," to ",t,"."].join("");throw new Error(k)}return n},extract_shortest_path_from_predecessor_list:function(a,r){for(var t=[],n=r;n;)t.push(n),a[n],n=a[n];return t.reverse(),t},find_path:function(a,r,t){var n=i.single_source_shortest_paths(a,r,t);return i.extract_shortest_path_from_predecessor_list(n,t)},PriorityQueue:{make:function(a){var r=i.PriorityQueue,t={},n;a=a||{};for(n in r)r.hasOwnProperty(n)&&(t[n]=r[n]);return t.queue=[],t.sorter=a.sorter||r.default_sorter,t},default_sorter:function(a,r){return a.cost-r.cost},push:function(a,r){var t={value:a,cost:r};this.queue.push(t),this.queue.sort(this.sorter)},pop:function(){return this.queue.shift()},empty:function(){return this.queue.length===0}}};s.exports=i})(it)),it.exports}var Zt;function ts(){return Zt||(Zt=1,(function(s){const i=xe(),a=Yn(),r=Wn(),t=Zn(),n=Xn(),l=fn(),c=ge(),d=es();function g(k){return unescape(encodeURIComponent(k)).length}function N(k,M,P){const u=[];let z;for(;(z=k.exec(P))!==null;)u.push({data:z[0],index:z.index,mode:M,length:z[0].length});return u}function I(k){const M=N(l.NUMERIC,i.NUMERIC,k),P=N(l.ALPHANUMERIC,i.ALPHANUMERIC,k);let u,z;return c.isKanjiModeEnabled()?(u=N(l.BYTE,i.BYTE,k),z=N(l.KANJI,i.KANJI,k)):(u=N(l.BYTE_KANJI,i.BYTE,k),z=[]),M.concat(P,u,z).sort(function(R,j){return R.index-j.index}).map(function(R){return{data:R.data,mode:R.mode,length:R.length}})}function A(k,M){switch(M){case i.NUMERIC:return a.getBitsLength(k);case i.ALPHANUMERIC:return r.getBitsLength(k);case i.KANJI:return n.getBitsLength(k);case i.BYTE:return t.getBitsLength(k)}}function v(k){return k.reduce(function(M,P){const u=M.length-1>=0?M[M.length-1]:null;return u&&u.mode===P.mode?(M[M.length-1].data+=P.data,M):(M.push(P),M)},[])}function L(k){const M=[];for(let P=0;P<k.length;P++){const u=k[P];switch(u.mode){case i.NUMERIC:M.push([u,{data:u.data,mode:i.ALPHANUMERIC,length:u.length},{data:u.data,mode:i.BYTE,length:u.length}]);break;case i.ALPHANUMERIC:M.push([u,{data:u.data,mode:i.BYTE,length:u.length}]);break;case i.KANJI:M.push([u,{data:u.data,mode:i.BYTE,length:g(u.data)}]);break;case i.BYTE:M.push([{data:u.data,mode:i.BYTE,length:g(u.data)}])}}return M}function E(k,M){const P={},u={start:{}};let z=["start"];for(let p=0;p<k.length;p++){const R=k[p],j=[];for(let y=0;y<R.length;y++){const B=R[y],C=""+p+y;j.push(C),P[C]={node:B,lastCount:0},u[C]={};for(let $=0;$<z.length;$++){const S=z[$];P[S]&&P[S].node.mode===B.mode?(u[S][C]=A(P[S].lastCount+B.length,B.mode)-A(P[S].lastCount,B.mode),P[S].lastCount+=B.length):(P[S]&&(P[S].lastCount=B.length),u[S][C]=A(B.length,B.mode)+4+i.getCharCountIndicator(B.mode,M))}}z=j}for(let p=0;p<z.length;p++)u[z[p]].end=0;return{map:u,table:P}}function V(k,M){let P;const u=i.getBestModeForData(k);if(P=i.from(M,u),P!==i.BYTE&&P.bit<u.bit)throw new Error('"'+k+'" cannot be encoded with mode '+i.toString(P)+`.
 Suggested mode is: `+i.toString(u));switch(P===i.KANJI&&!c.isKanjiModeEnabled()&&(P=i.BYTE),P){case i.NUMERIC:return new a(k);case i.ALPHANUMERIC:return new r(k);case i.KANJI:return new n(k);case i.BYTE:return new t(k)}}s.fromArray=function(M){return M.reduce(function(P,u){return typeof u=="string"?P.push(V(u,null)):u.data&&P.push(V(u.data,u.mode)),P},[])},s.fromString=function(M,P){const u=I(M,c.isKanjiModeEnabled()),z=L(u),p=E(z,P),R=d.find_path(p.map,"start","end"),j=[];for(let y=1;y<R.length-1;y++)j.push(p.table[R[y]].node);return s.fromArray(v(j))},s.rawSplit=function(M){return s.fromArray(I(M,c.isKanjiModeEnabled()))}})(tt)),tt}var Xt;function ns(){if(Xt)return _e;Xt=1;const s=ge(),i=dt(),a=qn(),r=Fn(),t=_n(),n=Hn(),l=Vn(),c=un(),d=Qn(),g=Gn(),N=Jn(),I=xe(),A=ts();function v(p,R){const j=p.size,y=n.getPositions(R);for(let B=0;B<y.length;B++){const C=y[B][0],$=y[B][1];for(let S=-1;S<=7;S++)if(!(C+S<=-1||j<=C+S))for(let T=-1;T<=7;T++)$+T<=-1||j<=$+T||(S>=0&&S<=6&&(T===0||T===6)||T>=0&&T<=6&&(S===0||S===6)||S>=2&&S<=4&&T>=2&&T<=4?p.set(C+S,$+T,!0,!0):p.set(C+S,$+T,!1,!0))}}function L(p){const R=p.size;for(let j=8;j<R-8;j++){const y=j%2===0;p.set(j,6,y,!0),p.set(6,j,y,!0)}}function E(p,R){const j=t.getPositions(R);for(let y=0;y<j.length;y++){const B=j[y][0],C=j[y][1];for(let $=-2;$<=2;$++)for(let S=-2;S<=2;S++)$===-2||$===2||S===-2||S===2||$===0&&S===0?p.set(B+$,C+S,!0,!0):p.set(B+$,C+S,!1,!0)}}function V(p,R){const j=p.size,y=g.getEncodedBits(R);let B,C,$;for(let S=0;S<18;S++)B=Math.floor(S/3),C=S%3+j-8-3,$=(y>>S&1)===1,p.set(B,C,$,!0),p.set(C,B,$,!0)}function k(p,R,j){const y=p.size,B=N.getEncodedBits(R,j);let C,$;for(C=0;C<15;C++)$=(B>>C&1)===1,C<6?p.set(C,8,$,!0):C<8?p.set(C+1,8,$,!0):p.set(y-15+C,8,$,!0),C<8?p.set(8,y-C-1,$,!0):C<9?p.set(8,15-C-1+1,$,!0):p.set(8,15-C-1,$,!0);p.set(y-8,8,1,!0)}function M(p,R){const j=p.size;let y=-1,B=j-1,C=7,$=0;for(let S=j-1;S>0;S-=2)for(S===6&&S--;;){for(let T=0;T<2;T++)if(!p.isReserved(B,S-T)){let K=!1;$<R.length&&(K=(R[$]>>>C&1)===1),p.set(B,S-T,K),C--,C===-1&&($++,C=7)}if(B+=y,B<0||j<=B){B-=y,y=-y;break}}}function P(p,R,j){const y=new a;j.forEach(function(T){y.put(T.mode.bit,4),y.put(T.getLength(),I.getCharCountIndicator(T.mode,p)),T.write(y)});const B=s.getSymbolTotalCodewords(p),C=c.getTotalCodewordsCount(p,R),$=(B-C)*8;for(y.getLengthInBits()+4<=$&&y.put(0,4);y.getLengthInBits()%8!==0;)y.putBit(0);const S=($-y.getLengthInBits())/8;for(let T=0;T<S;T++)y.put(T%2?17:236,8);return u(y,p,R)}function u(p,R,j){const y=s.getSymbolTotalCodewords(R),B=c.getTotalCodewordsCount(R,j),C=y-B,$=c.getBlocksCount(R,j),S=y%$,T=$-S,K=Math.floor(y/$),X=Math.floor(C/$),ce=X+1,pe=K-X,Ne=new d(pe);let de=0;const ee=new Array($),ae=new Array($);let te=0;const ue=new Uint8Array(p.buffer);for(let m=0;m<$;m++){const h=m<T?X:ce;ee[m]=ue.slice(de,de+h),ae[m]=Ne.encode(ee[m]),de+=h,te=Math.max(te,h)}const Z=new Uint8Array(y);let he=0,G,J;for(G=0;G<te;G++)for(J=0;J<$;J++)G<ee[J].length&&(Z[he++]=ee[J][G]);for(G=0;G<pe;G++)for(J=0;J<$;J++)Z[he++]=ae[J][G];return Z}function z(p,R,j,y){let B;if(Array.isArray(p))B=A.fromArray(p);else if(typeof p=="string"){let K=R;if(!K){const X=A.rawSplit(p);K=g.getBestVersionForData(X,j)}B=A.fromString(p,K||40)}else throw new Error("Invalid data");const C=g.getBestVersionForData(B,j);if(!C)throw new Error("The amount of data is too big to be stored in a QR Code");if(!R)R=C;else if(R<C)throw new Error(`
The chosen QR Code version cannot contain this amount of data.
Minimum version required to store current data is: `+C+`.
`);const $=P(R,j,B),S=s.getSymbolSize(R),T=new r(S);return v(T,R),L(T),E(T,R),k(T,j,0),R>=7&&V(T,R),M(T,$),isNaN(y)&&(y=l.getBestMask(T,k.bind(null,T,j))),l.applyMask(y,T),k(T,j,y),{modules:T,version:R,errorCorrectionLevel:j,maskPattern:y,segments:B}}return _e.create=function(R,j){if(typeof R>"u"||R==="")throw new Error("No input text");let y=i.M,B,C;return typeof j<"u"&&(y=i.from(j.errorCorrectionLevel,i.M),B=g.from(j.version),C=l.from(j.maskPattern),j.toSJISFunc&&s.setToSJISFunction(j.toSJISFunc)),z(R,B,y,C)},_e}var at={},lt={},en;function mn(){return en||(en=1,(function(s){function i(a){if(typeof a=="number"&&(a=a.toString()),typeof a!="string")throw new Error("Color should be defined as hex string");let r=a.slice().replace("#","").split("");if(r.length<3||r.length===5||r.length>8)throw new Error("Invalid hex color: "+a);(r.length===3||r.length===4)&&(r=Array.prototype.concat.apply([],r.map(function(n){return[n,n]}))),r.length===6&&r.push("F","F");const t=parseInt(r.join(""),16);return{r:t>>24&255,g:t>>16&255,b:t>>8&255,a:t&255,hex:"#"+r.slice(0,6).join("")}}s.getOptions=function(r){r||(r={}),r.color||(r.color={});const t=typeof r.margin>"u"||r.margin===null||r.margin<0?4:r.margin,n=r.width&&r.width>=21?r.width:void 0,l=r.scale||4;return{width:n,scale:n?4:l,margin:t,color:{dark:i(r.color.dark||"#000000ff"),light:i(r.color.light||"#ffffffff")},type:r.type,rendererOpts:r.rendererOpts||{}}},s.getScale=function(r,t){return t.width&&t.width>=r+t.margin*2?t.width/(r+t.margin*2):t.scale},s.getImageWidth=function(r,t){const n=s.getScale(r,t);return Math.floor((r+t.margin*2)*n)},s.qrToImageData=function(r,t,n){const l=t.modules.size,c=t.modules.data,d=s.getScale(l,n),g=Math.floor((l+n.margin*2)*d),N=n.margin*d,I=[n.color.light,n.color.dark];for(let A=0;A<g;A++)for(let v=0;v<g;v++){let L=(A*g+v)*4,E=n.color.light;if(A>=N&&v>=N&&A<g-N&&v<g-N){const V=Math.floor((A-N)/d),k=Math.floor((v-N)/d);E=I[c[V*l+k]?1:0]}r[L++]=E.r,r[L++]=E.g,r[L++]=E.b,r[L]=E.a}}})(lt)),lt}var tn;function ss(){return tn||(tn=1,(function(s){const i=mn();function a(t,n,l){t.clearRect(0,0,n.width,n.height),n.style||(n.style={}),n.height=l,n.width=l,n.style.height=l+"px",n.style.width=l+"px"}function r(){try{return document.createElement("canvas")}catch{throw new Error("You need to specify a canvas element")}}s.render=function(n,l,c){let d=c,g=l;typeof d>"u"&&(!l||!l.getContext)&&(d=l,l=void 0),l||(g=r()),d=i.getOptions(d);const N=i.getImageWidth(n.modules.size,d),I=g.getContext("2d"),A=I.createImageData(N,N);return i.qrToImageData(A.data,n,d),a(I,g,N),I.putImageData(A,0,0),g},s.renderToDataURL=function(n,l,c){let d=c;typeof d>"u"&&(!l||!l.getContext)&&(d=l,l=void 0),d||(d={});const g=s.render(n,l,d),N=d.type||"image/png",I=d.rendererOpts||{};return g.toDataURL(N,I.quality)}})(at)),at}var ct={},nn;function rs(){if(nn)return ct;nn=1;const s=mn();function i(t,n){const l=t.a/255,c=n+'="'+t.hex+'"';return l<1?c+" "+n+'-opacity="'+l.toFixed(2).slice(1)+'"':c}function a(t,n,l){let c=t+n;return typeof l<"u"&&(c+=" "+l),c}function r(t,n,l){let c="",d=0,g=!1,N=0;for(let I=0;I<t.length;I++){const A=Math.floor(I%n),v=Math.floor(I/n);!A&&!g&&(g=!0),t[I]?(N++,I>0&&A>0&&t[I-1]||(c+=g?a("M",A+l,.5+v+l):a("m",d,0),d=0,g=!1),A+1<n&&t[I+1]||(c+=a("h",N),N=0)):d++}return c}return ct.render=function(n,l,c){const d=s.getOptions(l),g=n.modules.size,N=n.modules.data,I=g+d.margin*2,A=d.color.light.a?"<path "+i(d.color.light,"fill")+' d="M0 0h'+I+"v"+I+'H0z"/>':"",v="<path "+i(d.color.dark,"stroke")+' d="'+r(N,g,d.margin)+'"/>',L='viewBox="0 0 '+I+" "+I+'"',V='<svg xmlns="http://www.w3.org/2000/svg" '+(d.width?'width="'+d.width+'" height="'+d.width+'" ':"")+L+' shape-rendering="crispEdges">'+A+v+`</svg>
`;return typeof c=="function"&&c(null,V),V},ct}var sn;function os(){if(sn)return ye;sn=1;const s=zn(),i=ns(),a=ss(),r=rs();function t(n,l,c,d,g){const N=[].slice.call(arguments,1),I=N.length,A=typeof N[I-1]=="function";if(!A&&!s())throw new Error("Callback required as last argument");if(A){if(I<2)throw new Error("Too few arguments provided");I===2?(g=c,c=l,l=d=void 0):I===3&&(l.getContext&&typeof g>"u"?(g=d,d=void 0):(g=d,d=c,c=l,l=void 0))}else{if(I<1)throw new Error("Too few arguments provided");return I===1?(c=l,l=d=void 0):I===2&&!l.getContext&&(d=c,c=l,l=void 0),new Promise(function(v,L){try{const E=i.create(c,d);v(n(E,l,d))}catch(E){L(E)}})}try{const v=i.create(c,d);g(null,n(v,l,d))}catch(v){g(v)}}return ye.create=i.create,ye.toCanvas=t.bind(null,a.render),ye.toDataURL=t.bind(null,a.renderToDataURL),ye.toString=t.bind(null,function(n,l,c){return r.render(n,c)}),ye}var is=os();const as=bn(is);function Q(s){return s==null?"":String(s).replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;")}function q(s){if(s==null||s==="")return"";const a=String(s).split(/\r?\n/),r=t=>{if(!t)return"";try{const n=Intl;if(typeof Intl<"u"&&n.Segmenter){const l=new n.Segmenter("th",{granularity:"word"}),c=[];for(const d of l.segment(t)){const g=d.segment;/^\s+$/.test(g)?c.push(" "):c.push(`<span class="w-seg">${Q(g)}</span>`)}return c.join("")}}catch{}return Q(t)};return a.map(r).join("<br/>")}function ls(s){try{const i=as.create(s,{errorCorrectionLevel:"M"}),a=i.modules.size,r=2,t=a+r*2;let n="";for(let c=0;c<a;c++)for(let d=0;d<a;d++)i.modules.get(c,d)&&(n+=`<rect x="${d+r}" y="${c+r}" width="1" height="1" fill="#0f172a"/>`);const l=`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${t} ${t}" width="200" height="200" shape-rendering="crispEdges"><rect width="100%" height="100%" fill="#ffffff"/>${n}</svg>`;return`data:image/svg+xml;utf8,${encodeURIComponent(l)}`}catch{return""}}function cs(s,i,a){var de,ee,ae,te,ue,Z,he,G,J;const r=s.type==="supplier",t=r?s:null,n=r?null:s,l=r?t.name:n.storeName,c=r?t.chineseName:n.chineseName,d=r?t.category:n.storeCategory||"เรฟร้านน้ำ",g=r?t.marketOrCity:n.city,N=s.country==="TH"?"ประเทศไทย (TH)":"ประเทศจีน (CN)",I=typeof window<"u"&&window.location.origin&&!window.location.hostname.includes("localhost")&&!window.location.hostname.includes("127.0.0.1")?`${window.location.origin}${window.location.pathname}`:"https://vitcha-sourcing-fxjw.onrender.com/",v=`${I.endsWith("/")?I:`${I}/`}?view=${encodeURIComponent(s.id)}&type=${encodeURIComponent(s.type)}`,L=ls(v),E=[];t?((de=t.photos.storefrontAndAtmosphere)==null||de.forEach((m,h)=>E.push({url:m,label:`ป้ายหน้าร้าน / บรรยากาศ #${h+1}`})),(ee=t.photos.contactCards)==null||ee.forEach((m,h)=>E.push({url:m,label:`นามบัตร / WeChat #${h+1}`})),(ae=t.catalogItems)==null||ae.forEach((m,h)=>{m.photo&&E.push({url:m.photo,label:m.name?`สินค้า: ${m.name}`:`รายการสินค้า #${h+1}`})})):n&&((te=n.photos.storefrontAndAtmosphere)==null||te.forEach((m,h)=>E.push({url:m,label:`หน้าร้าน / บรรยากาศ #${h+1}`})),(ue=n.photos.menuBoard)==null||ue.forEach((m,h)=>E.push({url:m,label:`ป้ายเมนู / ราคา #${h+1}`})),(Z=n.photos.drinkCups)==null||Z.forEach((m,h)=>E.push({url:m,label:`แก้วเครื่องดื่ม #${h+1}`})),(he=n.drinkItems)==null||he.forEach((m,h)=>{m.photo&&E.push({url:m.photo,label:m.name?`เมนูชิม: ${m.name}`:`แก้วชิม #${h+1}`})}));const V=ie(s),k=[];V.forEach((m,h)=>{k.push({label:m.label||`คลิปเสียงหน้างาน #${h+1}`,durationSec:m.durationSec||4,source:"บันทึกเสียงหลักหน้างานจริง"})}),t?(t.catalogItems||[]).forEach((m,h)=>{ie(m).forEach((F,ne)=>{k.push({label:F.label||`คลิปเสียงสินค้า #${ne+1}`,durationSec:F.durationSec||4,source:`สินค้า: ${m.name||`รายการที่ #${h+1}`}`})})}):n&&(n.drinkItems||[]).forEach((m,h)=>{ie(m).forEach((F,ne)=>{k.push({label:F.label||`คลิปเสียงเมนู #${ne+1}`,durationSec:F.durationSec||4,source:`เมนู: ${m.name||`แก้วที่ #${h+1}`}`})})});const M=Array.isArray(s.videos)?s.videos.filter(Boolean):[],P=((G=E[0])==null?void 0:G.url)||"./logo.jpg",u=Array.isArray(s.viewedBy)?s.viewedBy:[],z=Array.isArray(s.likes)?s.likes:[],p=Array.isArray(s.reviewerNotes)?s.reviewerNotes:[],R=Array.isArray(s.history)?s.history:[],j=R.length>0?R:[{action:"สร้างบันทึกรายการสำรวจ",user:s.creator.alias,userAvatar:s.creator.avatar,timestamp:s.creator.timestamp}],y=`ฉันจะเป็นหัวแถว-${l.replace(/[^a-zA-Z0-9ก-๙_-]/g,"_")}.pdf`,C={awaiting:"พาร์ท 1: รอรับช่วงต่อ",rfq_sent:"พาร์ท 2: ขอสเปก / ส่ง RFQ",sample_test:"พาร์ท 3: ทดสอบตัวอย่าง Lab / R&D",negotiate:"พาร์ท 4: ต่อรองราคา & MOQ",approved:"พาร์ท 5: ตัวเต็งอนุมัติ",ordered:"พาร์ท 6: สั่งซื้อสำเร็จ"}[s.handoffStage||"awaiting"]||"พาร์ท 1: รอรับช่วงต่อ",$=k.length>0?`<div class="media-grid">
          ${k.map((m,h)=>`
              <div class="voice-card">
                <div class="voice-icon">▶</div>
                <div class="voice-meta">
                  <div class="voice-title">${q(`${h+1}. ${m.label}`)}</div>
                  <div class="voice-sub">${q(`${m.source} · ความยาว ${m.durationSec} วินาที`)}</div>
                  <div class="voice-wave">ılıll|ılıl||ılıll|ılı · สแกน QR เพื่อกดฟังเสียงจริง</div>
                </div>
              </div>`).join("")}
        </div>`:'<div class="empty-note">ไม่มีไฟล์เสียงบันทึกในรายการนี้</div>',S=M.length>0?`<div class="video-grid">
          ${M.map((m,h)=>{const F=m.includes("gtv-videos-bucket")?Bn:m;return`
              <div class="video-card">
                <div class="video-thumb-wrap">
                  <img
                    id="video-thumb-img-${h}"
                    class="video-thumb-img"
                    src="${Q(P)}"
                    crossorigin="anonymous"
                    data-video-src="${Q(F)}"
                  />
                  <div class="video-overlay-top">
                    <span class="video-chip">VIDEO CLIP #${h+1}</span>
                    <span class="video-chip-right">HD PREVIEW</span>
                  </div>
                  <div class="video-play-circle">▶</div>
                  <div class="video-overlay-bottom">
                    <span>คลิปวิดีโอที่ ${h+1} · สแกน QR Code ด้านบนเพื่อเปิดเล่นวิดีโอ</span>
                  </div>
                </div>
                <div class="video-caption">
                  <div class="video-caption-title">${q(`คลิปวิดีโอหน้างาน #${h+1} (จากทั้งหมด ${M.length} คลิป)`)}</div>
                  <div class="video-caption-sub">${q("เอกสารกระดาษแสดงภาพ Thumbnail ตัวอย่าง — สแกน QR Code เพื่อรับชมวิดีโอเคลื่อนไหวพร้อมเสียง")}</div>
                </div>
              </div>`}).join("")}
        </div>`:'<div class="empty-note">ไม่มีคลิปวิดีโอในรายการนี้</div>';let T="";if(r&&t){const m=(t.catalogItems||[]).map((h,F)=>{const ne=ie(h);return`
        <tr>
          <td style="text-align:center;font-weight:700;">${F+1}</td>
          <td>
            ${h.photo?`<img src="${Q(h.photo)}" crossorigin="anonymous" class="table-thumb" />`:'<div class="table-thumb-empty">ไม่มีรูป</div>'}
          </td>
          <td>
            <div class="cell-title">${q(h.name||`รายการที่ #${F+1}`)}</div>
            ${h.memo?`<div class="cell-sub">${q(h.memo)}</div>`:""}
            ${ne.length>0?`<div class="cell-voice-badge">แนบเสียงบันทึก ${ne.length} คลิป</div>`:""}
          </td>
          <td>
            <div class="cell-text">${q(h.dimensions||"-")}</div>
            <div class="cell-sub">${q(h.weightKg?`น้ำหนัก: ${h.weightKg}`:"")}</div>
          </td>
          <td>
            <div class="cell-price-green">
              ${h.priceRmb?`¥${h.priceRmb.toLocaleString()}`:h.priceThb?`฿${h.priceThb.toLocaleString()}`:"-"}
            </div>
            ${h.priceRmb?`<div class="cell-sub">(≈ ฿${i(h.priceRmb).toLocaleString()})</div>`:""}
          </td>
        </tr>`}).join("");T=`
      <div class="section-box">
        <div class="section-title">กลุ่มที่ 3: รายการสินค้า / อุปกรณ์ / วัตถุดิบ (${(t.catalogItems||[]).length} รายการ)</div>
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
                    <th>รูปภาพ</th>
                    <th>ชื่อรายการ & รายละเอียดสเปก</th>
                    <th>ขนาด / น้ำหนัก</th>
                    <th>ราคาประเมิน</th>
                  </tr>
                </thead>
                <tbody>${m}</tbody>
              </table>`:'<div class="empty-note">ไม่มีรายการย่อย</div>'}
      </div>
    `}else if(n){const m=(n.drinkItems||[]).map((h,F)=>{const ne=ie(h);return`
        <tr>
          <td style="text-align:center;font-weight:700;">${F+1}</td>
          <td>
            ${h.photo?`<img src="${Q(h.photo)}" crossorigin="anonymous" class="table-thumb" />`:'<div class="table-thumb-empty">ไม่มีรูป</div>'}
          </td>
          <td>
            <div class="cell-title">${q(h.name||`แก้วที่ #${F+1}`)}</div>
            ${h.gimmickNotes?`<div class="cell-sub">${q(`กิมมิก: ${h.gimmickNotes}`)}</div>`:""}
            ${ne.length>0?`<div class="cell-voice-badge">แนบเสียงบันทึก ${ne.length} คลิป</div>`:""}
          </td>
          <td>
            <div class="cell-text">${q(h.cupSize||"-")}</div>
          </td>
          <td>
            <div class="cell-text">${q(h.fitMenuTarget||"-")}</div>
          </td>
          <td>
            <div class="cell-price-amber">
              ${h.priceRmb?`¥${h.priceRmb.toLocaleString()}`:h.priceThb?`฿${h.priceThb.toLocaleString()}`:"-"}
            </div>
            ${h.priceRmb?`<div class="cell-sub">(≈ ฿${i(h.priceRmb).toLocaleString()})</div>`:""}
          </td>
        </tr>`}).join("");T=`
      <div class="section-box">
        <div class="section-title">กลุ่มที่ 3: เมนูที่ชิม & การถอดรหัสสูตร (${(n.drinkItems||[]).length} เมนู)</div>
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
                    <th>รูปแก้ว</th>
                    <th>ชื่อเมนู & กิมมิก</th>
                    <th>ขนาดแก้ว</th>
                    <th>ต่อยอดเมนูของเรา</th>
                    <th>ราคาขาย</th>
                  </tr>
                </thead>
                <tbody>${m}</tbody>
              </table>`:'<div class="empty-note">ไม่มีเมนูย่อย</div>'}
      </div>
    `}const K=E.length>0?`<div class="photo-grid">
          ${E.map((m,h)=>`
              <div class="photo-card">
                <img src="${Q(m.url)}" crossorigin="anonymous" />
                <div class="photo-caption">${q(`รูปที่ ${h+1}: ${m.label}`)}</div>
              </div>`).join("")}
        </div>`:'<div class="empty-note">ไม่มีรูปภาพในรายการนี้</div>',X=p.length>0?p.map((m,h)=>`
          <div class="comment-box">
            <div class="comment-header">
              <span class="comment-author">${q(`ความคิดเห็นที่ #${h+1} โดย: ${m.author}`)}</span>
              <span class="comment-time">${Q(new Date(m.timestamp).toLocaleString("th-TH"))}</span>
            </div>
            <div class="comment-body">${q(m.text)}</div>
            ${m.photoUrl?`<div style="margin-top:6px;"><img src="${Q(m.photoUrl)}" crossorigin="anonymous" style="width:96px;height:96px;object-fit:cover;border-radius:6px;border:1px solid #cbd5e1;" /></div>`:""}
            ${m.voiceUrl?'<div class="cell-voice-badge" style="margin-top:4px;">มีไฟล์เสียงแนบในความคิดเห็นนี้ (สแกน QR เพื่อฟัง)</div>':""}
            ${m.replies&&m.replies.length>0?`<div class="reply-list">
                    ${m.replies.map(F=>`
                        <div class="reply-item">
                          <div class="comment-header">
                            <span class="comment-author">${q(`ตอบกลับโดย: ${F.author}${F.replyToAuthor?` (ถึง @${F.replyToAuthor})`:""}`)}</span>
                            <span class="comment-time">${Q(new Date(F.timestamp).toLocaleString("th-TH"))}</span>
                          </div>
                          <div class="comment-body">${q(F.text)}</div>
                          ${F.photoUrl?`<div style="margin-top:6px;"><img src="${Q(F.photoUrl)}" crossorigin="anonymous" style="width:80px;height:80px;object-fit:cover;border-radius:6px;border:1px solid #cbd5e1;" /></div>`:""}
                          ${F.voiceUrl?'<div class="cell-voice-badge" style="margin-top:4px;">มีไฟล์เสียงแนบในคำตอบนี้</div>':""}
                        </div>`).join("")}
                  </div>`:""}
          </div>`).join(""):'<div class="empty-note">ยังไม่มีความคิดเห็นในรายการนี้</div>',ce=j.map((m,h)=>{const F=m.action==="handoff"?"อัปเดตสถานะการส่งต่องาน (Handoff)":m.action==="comment"?"เพิ่มความคิดเห็นในรายการ":m.action==="reply"?"ตอบกลับความคิดเห็น":m.action;return`
      <tr>
        <td style="text-align:center;font-weight:700;">${h+1}</td>
        <td><div class="cell-title">${q(m.user)}</div></td>
        <td><div class="cell-text">${q(F)}</div></td>
        <td><div class="cell-sub">${Q(new Date(m.timestamp).toLocaleString("th-TH"))}</div></td>
      </tr>`}).join(""),pe=u.length>0?`<table class="data-table" style="margin-top:10px;">
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
              <th>ผู้เปิดอ่าน (นามแฝง)</th>
              <th>ระดับสิทธิ์</th>
              <th>เปิดอ่านล่าสุดเมื่อ</th>
              <th style="text-align:center;">จำนวนครั้ง</th>
            </tr>
          </thead>
          <tbody>
            ${u.map((m,h)=>`
              <tr>
                <td style="text-align:center;">${h+1}</td>
                <td><div class="cell-title">${q(`${m.alias} (${m.name})`)}</div></td>
                <td><div class="cell-text">${Q(m.role.toUpperCase())}</div></td>
                <td><div class="cell-sub">${Q(new Date(m.lastViewedAt).toLocaleString("th-TH"))}</div></td>
                <td style="text-align:center;font-weight:700;">${m.viewCount||1} ครั้ง</td>
              </tr>`).join("")}
          </tbody>
        </table>`:'<div class="empty-note" style="margin-top:8px;">ยังไม่มีประวัติผู้เปิดอ่านเพิ่มเติม</div>',Ne=r?`คะแนนประเมิน ${(t==null?void 0:t.rating)||5}/5 ดาว (${t!=null&&t.isFactory?"โรงงานผลิต":"หน้าร้าน/โชว์รูม"})`:`รสชาติ ${n==null?void 0:n.ratings.taste}/5 · ดีไซน์ ${n==null?void 0:n.ratings.aesthetics}/5 · คุ้มค่า ${n==null?void 0:n.ratings.value}/5 · ความไว ${n==null?void 0:n.ratings.speed}/5`;return`<!DOCTYPE html>
<html lang="th">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=840, initial-scale=0.45, minimum-scale=0.3, maximum-scale=2.0, user-scalable=yes" />
  <title>ฉันจะเป็นหัวแถว - ${Q(l)}</title>
  <link rel="preconnect" href="https://fonts.googleapis.com" />
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
  <link href="https://fonts.googleapis.com/css2?family=Sarabun:wght@400;500;600;700;800&display=swap" rel="stylesheet" />
  <script src="https://cdnjs.cloudflare.com/ajax/libs/html2pdf.js/0.10.1/html2pdf.bundle.min.js"><\/script>
  <style>
    * {
      box-sizing: border-box;
      letter-spacing: 0px !important;
      font-kerning: none !important;
      font-variant-ligatures: none !important;
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
      left: 0 !important;
      top: 0 !important;
    }
    .html2pdf__container {
      margin: 0 !important;
      left: 0 !important;
      right: auto !important;
      top: 0 !important;
      width: 748px !important;
    }
    .sheet-outer {
      width: 100%;
      overflow-x: auto;
      padding: 12px 0 32px 0;
    }
    .page-sheet {
      width: 748px;
      min-width: 748px;
      max-width: 748px;
      margin: 0;
      background: #ffffff;
      padding: 16px 22px;
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
      <strong style="font-size:14px;">รายงานสรุปฉบับสมบูรณ์: ${Q(l)}</strong>
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
          <div class="badge">${r?"รายงานซัพพลายเออร์ & โรงงาน":"รายงานเรฟร้านน้ำ & R&D"} · ${N}</div>
          <h1 class="brand-title">${q(l)}</h1>
          <div class="brand-sub">${q(`${c?`${c} · `:""}หมวดหมู่: ${d}`)}</div>

          <!-- At-a-glance Multimedia & Detail Counter Pills -->
          <div class="summary-pills">
            <span class="summary-pill">รูปภาพ ${E.length} รูป</span>
            <span class="summary-pill">วอยซ์เสียง ${k.length} คลิป</span>
            <span class="summary-pill">วิดีโอ ${M.length} คลิป</span>
            <span class="summary-pill">${r?`สินค้า ${((t==null?void 0:t.catalogItems)||[]).length} รายการ`:`เมนูชิม ${((n==null?void 0:n.drinkItems)||[]).length} เมนู`}</span>
            <span class="summary-pill">คอมเมนต์ ${p.length} หัวข้อ</span>
            <span class="summary-pill">ประวัติ Log ${j.length} รายการ</span>
          </div>

          <div class="direct-link-bar">
            <div class="info-label" style="color:#0f172a;margin-bottom:2px;">Direct Link (Scan QR / LINE Share):</div>
            <div style="color:#059669;font-family:monospace;font-size:10px;word-break:break-all;">${Q(v)}</div>
          </div>
        </div>

        <div class="header-right">
          <div class="meta-box">
            <div class="meta-platform">ฉันจะเป็นหัวแถว</div>
            <div>LEAD THE FRONT · VITCHA R&amp;D</div>
            <div style="margin-top:4px;">รหัส: ${Q(s.id.slice(0,18))}</div>
            <div>สถานะ: <strong>${Q(C)}</strong></div>
            <div>ออกรายงาน: ${Q(new Date().toLocaleString("th-TH"))}</div>
          </div>

          ${L?`<div class="qr-card">
                  <img id="report-qr-img" src="${L}" alt="QR Code" />
                  <div class="qr-label">สแกนเปิดในแอป</div>
                  <div class="qr-sub">ฟังเสียง · ดูคลิปจริง</div>
                </div>`:""}
        </div>
      </div>

      <!-- Group 1: Overview, Contacts, Location & Handoff -->
      <div class="section-box">
        <div class="section-title">กลุ่มที่ 1: ข้อมูลหลัก พิกัดสถานที่ ช่องทางติดต่อ และการรับช่วงต่อ</div>
        <div class="info-grid">
          <div class="info-item">
            <span class="info-label">ชื่อรายการ / ร้านค้า</span>
            <span class="info-value">${q(`${l}${c?` (${c})`:""}`)}</span>
          </div>
          <div class="info-item">
            <span class="info-label">หมวดหมู่ & คะแนนประเมิน</span>
            <span class="info-value">${q(`${d} · ${Ne}`)}</span>
          </div>
          <div class="info-item">
            <span class="info-label">สถานที่ / ตลาด / เมือง</span>
            <span class="info-value">${q(g||((J=s.location)==null?void 0:J.addressText)||"-")}</span>
          </div>
          <div class="info-item">
            <span class="info-label">พิกัด GPS & แผนที่</span>
            <span class="info-value">${s.location?`${s.location.lat.toFixed(5)}, ${s.location.lng.toFixed(5)} (${Q(s.location.addressText||"พิกัดหน้างาน")})`:"-"}</span>
          </div>
          <div class="info-item">
            <span class="info-label">ช่องทางติดต่อ (WeChat / LINE / โทรศัพท์)</span>
            <span class="info-value">${q(`WeChat: ${(r?t==null?void 0:t.wechatId:n==null?void 0:n.wechatId)||"-"} | LINE: ${(r?t==null?void 0:t.lineId:n==null?void 0:n.lineId)||"-"} | โทร: ${(r?t==null?void 0:t.phone:n==null?void 0:n.phone)||"-"}`)}</span>
          </div>
          <div class="info-item">
            <span class="info-label">ผู้ลงพื้นที่สำรวจ & เวลาที่บันทึก</span>
            <span class="info-value">${q(`${s.creator.alias}${s.creator.name&&s.creator.name!==s.creator.alias?` (${s.creator.name})`:""} · ${new Date(s.creator.timestamp).toLocaleString("th-TH")}`)}</span>
          </div>
          <div class="info-item">
            <span class="info-label">ผู้รับผิดชอบรับช่วงต่อ & กำหนดติดตาม</span>
            <span class="info-value">${q(`${s.assignedTo||"ยังไม่ระบุผู้รับผิดชอบ"} · กำหนดติดตาม: ${s.targetFollowUpDate||"-"}`)}</span>
          </div>
          <div class="info-item">
            <span class="info-label">การมีส่วนร่วมของทีม (Likes & Views)</span>
            <span class="info-value">${q(`กดถูกใจ ${z.length} คน · เปิดอ่านแล้ว ${u.length} คน`)}</span>
          </div>
        </div>

        ${(r?t!=null&&t.memo:n!=null&&n.tastingNotes)?`<div class="note-banner">
                <div class="note-banner-title">${r?"บันทึกภาพรวมหน้างาน / รายละเอียดสเปกหลัก:":"บันทึกรีวิวรสชาติ & ไอเดียเรฟหน้างาน:"}</div>
                <div class="note-banner-body">${q(r?t==null?void 0:t.memo:n==null?void 0:n.tastingNotes)}</div>
              </div>`:""}

        ${s.handoffNotes?`<div class="handoff-banner">
                <div class="handoff-banner-title">โน้ตการส่งมอบงาน / ผลเจรจาทีมไทย:</div>
                <div class="note-banner-body">${q(s.handoffNotes)}</div>
              </div>`:""}
      </div>

      <!-- Group 2: Voice Recordings & Video Clips with Thumbnail Previews -->
      <div class="section-box">
        <div class="section-title">กลุ่มที่ 2: สื่อมัลติมีเดียหน้างาน — วอยซ์เสียงบันทึก (${k.length} คลิป) & วิดีโอ (${M.length} คลิป)</div>
        <div class="media-subhead">ไฟล์เสียงบันทึกหน้างานจริง (${k.length} คลิป):</div>
        ${$}
        <div class="media-subhead" style="margin-top:10px;">คลิปวิดีโอหน้างานพร้อมภาพ Thumbnail พรีวิว (${M.length} คลิป):</div>
        ${S}
      </div>

      <!-- Group 3: Catalog / Drink Items -->
      ${T}

      <!-- Group 4: All Photos of This Item -->
      <div class="section-box">
        <div class="section-title">กลุ่มที่ 4: แกลเลอรีภาพถ่ายทั้งหมดของรายการนี้ (${E.length} รูป)</div>
        ${K}
      </div>

      <!-- Group 5: All Threaded Comments & Replies -->
      <div class="section-box">
        <div class="section-title">กลุ่มที่ 5: บันทึกความคิดเห็นและการตอบกลับทั้งหมด (${p.length} หัวข้อสนทนา)</div>
        ${X}
      </div>

      <!-- Group 6: Activity & Handoff Log + Viewer Log -->
      <div class="section-box">
        <div class="section-title">กลุ่มที่ 6: ประวัติการดำเนินงาน & ส่งต่องาน (Activity Log ${j.length} รายการ) และผู้เปิดอ่าน (${u.length} คน)</div>
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
              <th>ผู้ปฏิบัติงาน</th>
              <th>รายการที่ดำเนินการ / ส่งต่องาน</th>
              <th>วันและเวลา</th>
            </tr>
          </thead>
          <tbody>${ce}</tbody>
        </table>
        ${pe}
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
          margin: [6, 6, 6, 6],
          filename: ${JSON.stringify(y)},
          image: { type: 'jpeg', quality: 0.96 },
          html2canvas: {
            scale: 2,
            useCORS: true,
            allowTaint: false,
            x: 0,
            y: 0,
            scrollX: 0,
            scrollY: 0,
            windowWidth: 748,
            width: 748
          },
          jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' },
          pagebreak: {
            mode: ['css', 'legacy'],
            avoid: ['tr', '.info-item', '.voice-card', '.video-card', '.photo-card', '.comment-box', '.note-banner', '.handoff-banner', '.report-header']
          }
        };
        window.html2pdf().set(opt).from(element).save().then(function() {
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
</html>`}function rn(s,i,a){const r=cs(s,i,a),t=window.open("","_blank");if(t)t.document.open(),t.document.write(r),t.document.close();else{const n=new Blob([r],{type:"text/html;charset=utf-8"}),l=URL.createObjectURL(n),c=document.createElement("a");c.href=l,c.target="_blank",c.click()}}const ms=({item:s,isOpen:i,onClose:a,onShareToLine:r})=>{var bt,vt,wt,yt,Nt,jt,Ct,$t,kt,Et;const{currentUser:t,convertCnyToThb:n,addReviewerNote:l,addReviewReply:c,updatePipelineStatus:d,toggleLikeItem:g,suppliers:N,drinkStores:I,users:A,quickMessages:v,recordItemView:L,canEditItems:E,canComment:V,openEditItem:k}=vn(),M=s&&s.type==="supplier"?N.find(o=>o.id===s.id):null,P=s&&s.type==="drink_store"?I.find(o=>o.id===s.id):null,u=M||P||s,[z,p]=W.useState(null),[R,j]=W.useState(""),[y,B]=W.useState(!1),[C,$]=W.useState(null),S=fe.useRef(null),T=fe.useRef(null),[K,X]=W.useState(null),[ce,pe]=W.useState({}),[Ne,de]=W.useState({}),[ee,ae]=W.useState(null),[te,ue]=W.useState(null),[Z,he]=W.useState(!1),[G,J]=W.useState({}),m=fe.useRef(null),[h,F]=W.useState(null),[ne,ut]=W.useState(0),be=fe.useRef(null),ve=fe.useRef(null),re=fe.useRef(null),ht=fe.useRef(0),ft=fe.useCallback(()=>{var o;if(re.current&&(clearInterval(re.current),re.current=null),be.current&&be.current.state==="recording"){be.current.stop();return}(o=ve.current)==null||o.getTracks().forEach(f=>f.stop()),ve.current=null,F(null)},[]);W.useEffect(()=>(i&&(s!=null&&s.id)&&L(s.id,s.type),p(null),B(!1),$(null),()=>{var o,f;re.current&&clearInterval(re.current),((o=be.current)==null?void 0:o.state)==="recording"&&be.current.stop(),(f=ve.current)==null||f.getTracks().forEach(x=>x.stop())}),[i,s==null?void 0:s.id]);const _=[];if(u)if(u.type==="supplier"){const o=u;(bt=o.photos.storefrontAndAtmosphere)==null||bt.forEach((f,x)=>_.push({url:f,label:`ป้ายหน้าร้าน/บรรยากาศ #${x+1}`})),(vt=o.photos.contactCards)==null||vt.forEach((f,x)=>_.push({url:f,label:`นามบัตร/WeChat #${x+1}`})),(wt=o.catalogItems)==null||wt.forEach((f,x)=>{f.photo&&_.push({url:f.photo,label:f.name?`สินค้า: ${f.name}`:`รายการสินค้า #${x+1}`})})}else{const o=u;(yt=o.photos.storefrontAndAtmosphere)==null||yt.forEach((f,x)=>_.push({url:f,label:`หน้าร้าน/บรรยากาศ #${x+1}`})),(Nt=o.photos.menuBoard)==null||Nt.forEach((f,x)=>_.push({url:f,label:`เมนูบอร์ด #${x+1}`})),(jt=o.photos.drinkCups)==null||jt.forEach((f,x)=>_.push({url:f,label:`แก้วเครื่องดื่ม #${x+1}`})),(Ct=o.drinkItems)==null||Ct.forEach((f,x)=>{f.photo&&_.push({url:f.photo,label:f.name?`เมนู: ${f.name}`:`เมนูชิม #${x+1}`})})}if(W.useEffect(()=>{if(z===null||_.length===0)return;const o=f=>{f.key==="ArrowRight"?p(x=>x!==null?(x+1)%_.length:null):f.key==="ArrowLeft"?p(x=>x!==null?(x-1+_.length)%_.length:null):f.key==="Escape"&&p(null)};return window.addEventListener("keydown",o),()=>window.removeEventListener("keydown",o)},[z,_.length]),!i||!u)return null;const O=u.type==="supplier",b=O?u:null,w=O?null:u,ke=Array.isArray(u.likes)?u.likes:[],mt=ke.some(o=>o.userId===t.id),pt=o=>{const f=_.findIndex(x=>x.url===o);p(f>=0?f:0)},Pe=async(o,f,x)=>{try{he(!0);const H=await In(o,{recordId:u.id,recordType:u.type,recordTitle:O?b==null?void 0:b.name:w==null?void 0:w.storeName});x?J(U=>({...U,[x]:{...U[x],...f==="photo"?{photoUrl:H}:{voiceUrl:H}}})):f==="photo"?ae(H):ue(H)}catch(H){alert(H.message||"อัปโหลดไฟล์แนบไม่สำเร็จ")}finally{he(!1)}},gt=async o=>{var f,x;if(h===o){ft();return}h&&ft();try{if(!((f=navigator.mediaDevices)!=null&&f.getUserMedia)||typeof MediaRecorder>"u"){alert("เบราว์เซอร์นี้ไม่รองรับการอัดเสียงสด กรุณาเปิดผ่าน HTTPS หรืออนุญาตไมโครโฟน");return}const H=await navigator.mediaDevices.getUserMedia({audio:!0});ve.current=H;const U=["audio/mp4","audio/webm;codecs=opus","audio/webm","audio/ogg"].find(Y=>MediaRecorder.isTypeSupported(Y)),se=new MediaRecorder(H,U?{mimeType:U}:void 0);be.current=se;const le=[];se.ondataavailable=Y=>{Y.data.size>0&&le.push(Y.data)},se.onstop=()=>{var je;re.current&&(clearInterval(re.current),re.current=null),H.getTracks().forEach(Se=>Se.stop()),ve.current=null,F(null);const Y=((je=se.mimeType)==null?void 0:je.split(";")[0])||"audio/webm",D=new Blob(le,{type:Y});if(!D.size)return;const Me=Y.includes("mp4")?"m4a":Y.includes("ogg")?"ogg":"webm",Re=new File([D],`เสียงคอมเมนต์-${Date.now()}.${Me}`,{type:Y});Pe(Re,"audio",o==="main"?void 0:o)},se.onerror=()=>{re.current&&clearInterval(re.current),H.getTracks().forEach(Y=>Y.stop()),F(null),alert("อัดเสียงไม่สำเร็จ กรุณาลองใหม่")},ht.current=Date.now(),ut(0),F(o),se.start(250),re.current=setInterval(()=>{ut(Math.round((Date.now()-ht.current)/1e3))},1e3)}catch{(x=ve.current)==null||x.getTracks().forEach(H=>H.stop()),F(null),alert("ไม่ได้รับสิทธิ์ใช้ไมโครโฟน กรุณากดอนุญาตไมโครโฟนเพื่ออัดเสียงสด")}},pn=async o=>{o.preventDefault();const f=R.trim();!f&&!ee&&!te||!await l(u.id,u.type,f,{photoUrl:ee||void 0,voiceUrl:te||void 0})||(j(""),ae(null),ue(null))},xt=async(o,f,x)=>{const H=(ce[o]||"").trim(),U=G[o];!H&&!(U!=null&&U.photoUrl)&&!(U!=null&&U.voiceUrl)||!await c(u.id,u.type,o,H,f,{photoUrl:U==null?void 0:U.photoUrl,voiceUrl:U==null?void 0:U.voiceUrl,replyToId:x})||(pe({...ce,[o]:""}),J(le=>({...le,[o]:{}})),X(null))},gn=o=>{b&&d(b.id,o)},Ee=ie(u),xn=(($t=Ee[0])==null?void 0:$t.url)||(O?b==null?void 0:b.voiceNoteUrl:w==null?void 0:w.voiceNoteUrl)||((O?b!=null&&b.voiceDurationSec:w!=null&&w.voiceDurationSec)?De(4):void 0),Le=(o,f)=>{T.current&&(C===o?(T.current.pause(),$(null)):(T.current.src=f||De(4),T.current.play().then(()=>$(o)).catch(()=>{T.current&&(T.current.src=De(4),T.current.play(),$(o))})))};return e.jsxs("div",{className:"fixed inset-0 z-[90] bg-black/45 backdrop-blur-sm flex items-center justify-center p-2 sm:p-4 overflow-y-auto",children:[e.jsxs("div",{className:"bg-white border border-slate-200/90 w-full max-w-3xl rounded-2xl shadow-2xl overflow-hidden my-auto animate-in zoom-in-95 max-h-[94vh] flex flex-col text-slate-900",children:[e.jsxs("div",{className:"p-3.5 sm:p-4 border-b border-slate-100 space-y-2.5 bg-white sticky top-0 z-10",children:[e.jsxs("div",{className:"flex items-start justify-between gap-2.5",children:[e.jsxs("div",{className:"flex items-start gap-2.5 min-w-0 flex-1",children:[e.jsx("span",{className:`p-2 rounded-xl shrink-0 mt-0.5 ${O?"bg-emerald-50 text-emerald-700":"bg-amber-50 text-amber-700"}`,children:O?e.jsx(wn,{className:"w-4 h-4 sm:w-5 sm:h-5 text-emerald-600"}):e.jsx(yn,{className:"w-4 h-4 sm:w-5 sm:h-5 text-amber-600"})}),e.jsxs("div",{className:"min-w-0 flex-1",children:[e.jsx("h2",{className:"font-extrabold text-slate-900 text-sm sm:text-base leading-snug break-words",children:O?b==null?void 0:b.name:w==null?void 0:w.storeName}),e.jsx("p",{className:"text-xs text-slate-400 truncate mt-0.5",children:O?(b==null?void 0:b.chineseName)||(b==null?void 0:b.marketOrCity):(w==null?void 0:w.chineseName)||(w==null?void 0:w.storeCategory)||(w==null?void 0:w.brandConcept)})]})]}),e.jsx("button",{type:"button",onClick:a,className:"w-7 h-7 sm:w-8 sm:h-8 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-600 transition-all active:scale-95 flex items-center justify-center shrink-0",title:"ปิดหน้าต่าง",children:e.jsx(we,{className:"w-4 h-4"})})]}),e.jsxs("div",{className:"flex items-center gap-1.5 flex-wrap pt-2 border-t border-slate-100",children:[E&&e.jsxs("button",{type:"button",onClick:()=>k(u),className:"px-2.5 py-1 rounded-lg bg-amber-50 hover:bg-amber-100 text-amber-800 border border-amber-200/90 text-[11px] font-bold active:scale-95 transition-all inline-flex items-center gap-1",title:"แก้ไขข้อมูลรายการนี้ (Admin / Editor)",children:[e.jsx(Rt,{className:"w-3 h-3 text-amber-600"}),e.jsx("span",{children:"แก้ไข"})]}),e.jsxs("button",{type:"button",onClick:()=>g(u.id,u.type),className:`px-2.5 py-1 rounded-lg border transition-all active:scale-95 inline-flex items-center gap-1 text-[11px] font-bold ${mt?"bg-blue-50 text-blue-700 border-blue-200":"bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100"}`,title:`ถูกใจ (${ke.length})`,children:[e.jsx(Nn,{className:`w-3 h-3 ${mt?"fill-blue-600 text-blue-600":""}`}),e.jsxs("span",{children:["ถูกใจ",ke.length>0?` (${ke.length})`:""]})]}),e.jsxs("button",{type:"button",onClick:()=>r(u),className:"px-2.5 py-1 rounded-lg bg-[#06C755] hover:bg-[#05b34c] text-white text-[11px] font-bold transition-all active:scale-95 inline-flex items-center gap-1",title:"แชร์ลิงก์เข้า LINE",children:[e.jsx(jn,{className:"w-3 h-3"}),e.jsx("span",{children:"แชร์ LINE"})]}),e.jsxs("button",{type:"button",onClick:()=>rn(u,n,"pdf"),className:"px-2.5 py-1 rounded-lg bg-slate-900 hover:bg-slate-800 text-white text-[11px] font-bold transition-all active:scale-95 inline-flex items-center gap-1",title:"ดาวน์โหลดรายงานเป็นไฟล์ PDF",children:[e.jsx(Mn,{className:"w-3 h-3 text-emerald-400"}),e.jsx("span",{children:"ดาวน์โหลด PDF"})]}),e.jsxs("button",{type:"button",onClick:()=>rn(u,n,"print"),className:"px-2.5 py-1 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 text-[11px] font-bold transition-all border border-slate-200/80 active:scale-95 inline-flex items-center gap-1",title:"พิมพ์รายงานฉบับจัดหน้าสวยงาม (Print)",children:[e.jsx(Un,{className:"w-3 h-3 text-slate-600"}),e.jsx("span",{children:"พิมพ์"})]})]})]}),e.jsxs("div",{className:"p-4 sm:p-6 space-y-4 overflow-y-auto flex-1",children:[e.jsxs("div",{className:"flex flex-wrap items-center justify-between gap-2 p-3 bg-slate-50 rounded-xl border border-slate-100 text-xs",children:[e.jsxs("div",{className:"flex items-center gap-2.5",children:[e.jsx(Te,{src:u.creator.avatar,alt:u.creator.alias,className:"w-8 h-8 rounded-full object-cover ring-2 ring-emerald-500/20 shadow-xs"}),e.jsxs("div",{children:[e.jsx("div",{className:"text-slate-800 font-bold flex items-center gap-1.5",children:e.jsxs("span",{children:["ผู้ลงพื้นที่สำรวจ: ",u.creator.alias,u.creator.name&&u.creator.name!==u.creator.alias?` (${u.creator.name})`:""]})}),e.jsxs("div",{className:"text-[11px] text-slate-400 font-mono",children:["บันทึกเมื่อ: ",new Date(u.creator.timestamp).toLocaleString("th-TH")]})]})]}),e.jsxs("div",{className:"flex items-center gap-2 flex-wrap",children:[e.jsx(Cn,{viewedBy:u.viewedBy,size:"md"}),O&&b&&e.jsxs("div",{className:"flex items-center gap-1.5",children:[e.jsx("span",{className:"text-[11px] text-slate-500",children:"สถานะ:"}),e.jsxs("select",{value:b.status,onChange:o=>gn(o.target.value),className:"bg-white border border-slate-200 text-slate-800 text-xs font-bold rounded-lg px-2.5 py-1 focus:outline-none focus:border-emerald-500",children:[e.jsx("option",{value:"scouted",children:"1. สำรวจแล้ว"}),e.jsx("option",{value:"reviewing",children:"2. เทียบสเปก"}),e.jsx("option",{value:"rfq_sent",children:"3. ส่ง RFQ"}),e.jsx("option",{value:"shortlisted",children:"4. ตัวเต็ง (Shortlist)"}),e.jsx("option",{value:"ordered",children:"5. สั่งซื้อแล้ว (Ordered)"})]})]})]})]}),Ee.length>0&&e.jsxs("div",{className:"p-3 bg-emerald-50/70 border border-emerald-200/80 rounded-xl space-y-2",children:[e.jsxs("div",{className:"text-xs font-bold text-emerald-950 flex items-center justify-between",children:[e.jsxs("span",{className:"flex items-center gap-1.5",children:[e.jsx(Ue,{className:"w-3.5 h-3.5 text-emerald-600"}),e.jsxs("span",{children:["วอยซ์เสียงบันทึกหน้างานจริง (",Ee.length," คลิป)"]})]}),e.jsx("span",{className:"text-[10px] font-mono text-emerald-700",children:"แตะ ▶ เพื่อฟังแต่ละคลิป"})]}),e.jsx("div",{className:"grid grid-cols-1 sm:grid-cols-2 gap-2",children:Ee.map((o,f)=>{const x=C===`main-${o.id||f}`;return e.jsx("div",{className:"p-2 bg-white border border-emerald-200 rounded-xl flex items-center justify-between gap-2 shadow-2xs",children:e.jsxs("div",{className:"flex items-center gap-2.5 min-w-0",children:[e.jsx("button",{type:"button",onClick:()=>Le(`main-${o.id||f}`,o.url),className:"w-8 h-8 rounded-full bg-emerald-600 hover:bg-emerald-700 text-white flex items-center justify-center shadow-xs transition-colors shrink-0",children:x?e.jsx(ze,{className:"w-3.5 h-3.5"}):e.jsx(qe,{className:"w-3.5 h-3.5 ml-0.5"})}),e.jsxs("div",{className:"min-w-0",children:[e.jsx("div",{className:"text-xs font-bold text-slate-900 truncate",children:o.label||`คลิปเสียง #${f+1}`}),e.jsxs("div",{className:"text-[10px] text-emerald-700 font-mono",children:[o.durationSec||4," วินาที ·"," ",x?"กำลังเล่น...":"แตะเพื่อฟัง"]})]})]})},o.id||f)})}),e.jsx("audio",{ref:S,src:xn,onEnded:()=>B(!1),className:"hidden"})]}),e.jsxs("div",{className:"p-3 bg-slate-50 rounded-xl border border-slate-100 space-y-2 text-xs",children:[e.jsx("div",{className:"flex flex-wrap items-center gap-1.5",children:O&&b?e.jsxs(e.Fragment,{children:[e.jsxs("span",{className:"px-2.5 py-1 rounded-lg bg-emerald-600 text-white text-[11px] font-bold inline-flex items-center gap-1",children:[e.jsx("i",{className:"fa-solid fa-industry text-[10px]"}),e.jsx("span",{children:b.category})]}),e.jsx("span",{className:"px-2 py-1 rounded-lg bg-white border border-slate-200 text-slate-700 text-[11px] font-bold",children:b.isFactory?"โรงงานผลิต":"หน้าร้าน / โชว์รูม"}),e.jsxs("span",{className:"px-2 py-1 rounded-lg bg-amber-50 border border-amber-200 text-amber-700 text-[11px] font-mono font-bold inline-flex items-center gap-1",children:[e.jsx("i",{className:"fa-solid fa-star text-[10px] text-amber-500"}),e.jsxs("span",{children:[b.rating||5,"/5"]})]}),(b.quickTags||[]).map((o,f)=>e.jsxs("span",{className:"px-2 py-1 rounded-lg bg-white border border-slate-200 text-slate-700 text-[11px] font-semibold",children:["#",o]},f))]}):w?e.jsxs(e.Fragment,{children:[e.jsxs("span",{className:"px-2.5 py-1 rounded-lg bg-amber-600 text-white text-[11px] font-bold inline-flex items-center gap-1",children:[e.jsx("i",{className:"fa-solid fa-mug-hot text-[10px]"}),e.jsx("span",{children:w.storeCategory||"เรฟร้านน้ำ"})]}),w.ratings&&e.jsxs("span",{className:"px-2 py-1 rounded-lg bg-amber-50 border border-amber-200 text-amber-800 text-[11px] font-mono font-bold inline-flex items-center gap-1",children:[e.jsx("i",{className:"fa-solid fa-star text-[10px] text-amber-500"}),e.jsx("span",{children:((w.ratings.taste+w.ratings.aesthetics+w.ratings.value+w.ratings.speed)/4).toFixed(1)})]})]}):null}),e.jsxs("div",{className:"flex flex-wrap items-center justify-between gap-2 pt-1.5 border-t border-slate-200/60 text-[11px] text-slate-600",children:[e.jsxs("div",{className:"flex flex-wrap items-center gap-2",children:[e.jsxs("span",{className:"inline-flex items-center gap-1 font-semibold text-slate-800",children:[e.jsx($n,{className:"w-3.5 h-3.5 text-emerald-600 shrink-0"}),e.jsx("span",{children:O?(b==null?void 0:b.marketOrCity)||(b==null?void 0:b.address)||((kt=b==null?void 0:b.location)==null?void 0:kt.addressText):((Et=w==null?void 0:w.location)==null?void 0:Et.addressText)||(w==null?void 0:w.city)})]}),(O?b==null?void 0:b.wechatId:w==null?void 0:w.wechatId)&&e.jsxs("span",{className:"px-2 py-0.5 rounded bg-white border border-slate-200 font-mono",children:["WeChat: ",O?b==null?void 0:b.wechatId:w==null?void 0:w.wechatId]}),(O?b==null?void 0:b.lineId:w==null?void 0:w.lineId)&&e.jsxs("span",{className:"px-2 py-0.5 rounded bg-white border border-slate-200 font-mono",children:["LINE: ",O?b==null?void 0:b.lineId:w==null?void 0:w.lineId]}),(O?b==null?void 0:b.phone:w==null?void 0:w.phone)&&e.jsxs("span",{className:"px-2 py-0.5 rounded bg-white border border-slate-200 font-mono",children:["โทร: ",O?b==null?void 0:b.phone:w==null?void 0:w.phone]})]}),u.location&&e.jsx("a",{href:`https://www.google.com/maps?q=${u.location.lat},${u.location.lng}`,target:"_blank",rel:"noreferrer",className:"text-[11px] font-bold text-emerald-700 hover:underline shrink-0",children:"เปิด Google Maps ↗"})]})]}),(O&&(b==null?void 0:b.memo)||!O&&(w==null?void 0:w.tastingNotes))&&e.jsxs("div",{className:`p-3.5 rounded-xl border space-y-1 ${O?"bg-emerald-50/50 border-emerald-200/80":"bg-amber-50/50 border-amber-200/80"}`,children:[e.jsxs("div",{className:"text-[11px] font-bold text-slate-600 flex items-center gap-1.5",children:[e.jsx("i",{className:`fa-solid ${O?"fa-clipboard-check text-emerald-600":"fa-quote-left text-amber-600"} text-[10px]`}),e.jsx("span",{children:O?"บันทึกหน้างาน / รายละเอียดหลัก:":"บันทึกรีวิวรสชาติ & ไอเดียเรฟ:"})]}),e.jsx("p",{className:"text-xs sm:text-[13px] text-slate-900 leading-relaxed whitespace-pre-wrap font-medium",children:O?b==null?void 0:b.memo:w==null?void 0:w.tastingNotes})]}),O&&b&&(b.catalogItems||[]).length>0&&e.jsxs("div",{className:"space-y-2",children:[e.jsx("div",{className:"flex items-center justify-between",children:e.jsxs("span",{className:"text-xs font-bold text-slate-800",children:["รายการอุปกรณ์ & สินค้า (",(b.catalogItems||[]).length," รายการ):"]})}),e.jsx("div",{className:"grid grid-cols-1 sm:grid-cols-2 gap-3",children:(b.catalogItems||[]).map((o,f)=>e.jsxs("div",{className:"p-3 rounded-xl border border-slate-200 bg-white flex gap-3 shadow-xs",children:[o.photo?e.jsx("img",{src:o.photo,alt:"",onClick:()=>pt(o.photo),className:"w-16 h-16 rounded-lg object-cover cursor-pointer border border-slate-100 hover:opacity-90"}):e.jsx("div",{className:"w-16 h-16 rounded-lg bg-slate-100 border border-slate-200 flex items-center justify-center text-slate-400 text-xs",children:"ไม่มีรูป"}),e.jsxs("div",{className:"min-w-0 flex-1 space-y-1",children:[e.jsx("div",{className:"font-bold text-xs text-slate-900 truncate",children:o.name||`รายการที่ ${f+1}`}),o.priceRmb&&e.jsxs("div",{className:"text-xs font-mono font-bold text-emerald-700",children:["¥",o.priceRmb," ",e.jsxs("span",{className:"text-[11px] font-normal text-slate-500",children:["(≈",n(o.priceRmb).toLocaleString(),"฿)"]})]}),o.priceThb&&!o.priceRmb&&e.jsxs("div",{className:"text-xs font-mono font-bold text-emerald-700",children:["฿",o.priceThb.toLocaleString()]}),o.weightKg&&e.jsxs("div",{className:"text-[11px] text-slate-500",children:["น้ำหนัก: ",e.jsx("span",{className:"font-mono",children:o.weightKg})]}),o.memo&&e.jsx("p",{className:"text-[11px] text-slate-600 whitespace-pre-wrap leading-relaxed",children:o.memo}),ie(o).length>0&&e.jsx("div",{className:"flex flex-wrap gap-1 pt-1",children:ie(o).map((x,H)=>{const U=`${o.id}-v-${x.id||H}`;return e.jsxs("button",{type:"button",onClick:()=>Le(U,x.url),className:"inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-emerald-50 text-emerald-700 border border-emerald-200 text-[10px] font-bold",children:[C===U?e.jsx(ze,{className:"w-2.5 h-2.5"}):e.jsx(qe,{className:"w-2.5 h-2.5"}),e.jsxs("span",{children:[x.label||`ฟังเสียง #${H+1}`," (",x.durationSec||4,"s)"]})]},U)})})]})]},o.id||f))})]}),!O&&w&&(w.drinkItems||[]).length>0&&e.jsxs("div",{className:"space-y-2",children:[e.jsx("div",{className:"flex items-center justify-between",children:e.jsxs("span",{className:"text-xs font-bold text-slate-800",children:["เมนูที่ชิม & ถอดรหัสสูตร (",(w.drinkItems||[]).length," เมนู):"]})}),e.jsx("div",{className:"grid grid-cols-1 sm:grid-cols-2 gap-3",children:(w.drinkItems||[]).map((o,f)=>e.jsxs("div",{className:"p-3 rounded-xl border border-amber-200/80 bg-amber-50/20 flex gap-3 shadow-xs",children:[o.photo&&e.jsx("img",{src:o.photo,alt:"",onClick:()=>pt(o.photo),className:"w-16 h-16 rounded-lg object-cover cursor-pointer border border-amber-200"}),e.jsxs("div",{className:"min-w-0 flex-1 space-y-1",children:[e.jsx("div",{className:"font-bold text-xs text-slate-900 truncate",children:o.name||`แก้วที่ #${f+1}`}),o.priceRmb&&e.jsxs("div",{className:"text-xs font-mono font-bold text-amber-700",children:["¥",o.priceRmb," ",e.jsxs("span",{className:"text-[11px] font-normal text-slate-500",children:["(≈",n(o.priceRmb),"฿)"]})]}),o.fitMenuTarget&&e.jsxs("div",{className:"text-[11px] font-semibold text-emerald-700",children:["ต่อยอด: ",o.fitMenuTarget]}),o.gimmickNotes&&e.jsx("p",{className:"text-[11px] text-slate-600",children:o.gimmickNotes}),ie(o).length>0&&e.jsx("div",{className:"flex flex-wrap gap-1 pt-1",children:ie(o).map((x,H)=>{const U=`${o.id}-v-${x.id||H}`;return e.jsxs("button",{type:"button",onClick:()=>Le(U,x.url),className:"inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-amber-50 text-amber-800 border border-amber-200 text-[10px] font-bold",children:[C===U?e.jsx(ze,{className:"w-2.5 h-2.5"}):e.jsx(qe,{className:"w-2.5 h-2.5"}),e.jsxs("span",{children:[x.label||`ฟังเสียง #${H+1}`," (",x.durationSec||4,"s)"]})]},U)})})]})]},o.id||f))})]}),e.jsx("audio",{ref:T,onEnded:()=>$(null),className:"hidden"}),e.jsxs("div",{className:"space-y-2",children:[e.jsxs("span",{className:"text-xs font-bold text-slate-800 block",children:["แกลเลอรีรูปภาพทั้งหมด (",_.length," รูป — แตะเพื่อขยายและเลื่อนซ้าย-ขวา):"]}),e.jsx("div",{className:"grid grid-cols-3 sm:grid-cols-4 gap-2",children:_.map((o,f)=>e.jsxs("div",{onClick:()=>p(f),className:"group relative aspect-square rounded-xl overflow-hidden border border-slate-200 cursor-pointer bg-slate-100 shadow-xs",children:[e.jsx("img",{src:o.url,className:"w-full h-full object-cover group-hover:scale-105 transition-transform duration-200"}),e.jsxs("div",{className:"absolute bottom-1 right-1 bg-black/60 text-white text-[9px] font-mono px-1.5 py-0.5 rounded",children:[f+1,"/",_.length]}),e.jsx("div",{className:"absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center text-[10px] text-white p-1 text-center font-medium",children:o.label})]},f))})]}),u.videos&&u.videos.length>0&&e.jsxs("div",{className:"space-y-2 pt-1",children:[e.jsxs("span",{className:"text-xs font-bold text-slate-800 flex items-center gap-1.5",children:[e.jsx("i",{className:"fa-solid fa-video text-purple-600"}),e.jsxs("span",{children:["คลิปวิดีโอของรายการนี้ (",u.videos.length," คลิป):"]})]}),e.jsx("div",{className:"grid grid-cols-1 sm:grid-cols-2 gap-3",children:u.videos.map((o,f)=>e.jsx(Pn,{src:o,className:"rounded-2xl border border-slate-200 shadow-sm h-48 sm:h-56",videoClassName:"object-contain",badgeLabel:`คลิปที่ ${f+1}`},f))})]}),e.jsxs("div",{id:"detail-comments-section",className:"p-4 bg-slate-50 rounded-xl border border-slate-200/80 space-y-3",children:[e.jsxs("div",{className:"flex items-center justify-between",children:[e.jsxs("span",{className:"text-xs font-bold text-slate-800 flex items-center gap-1.5",children:[e.jsx(kn,{className:"w-3.5 h-3.5 text-blue-600"}),e.jsx("span",{children:"ช่องความเห็นทีมงาน & ตอบกลับต่อเนื่อง (Threaded Comments)"})]}),e.jsxs("span",{className:"text-[11px] text-slate-400 font-mono",children:[u.reviewerNotes.length," หัวข้อสนทนา"]})]}),e.jsx("div",{className:"space-y-2.5",children:u.reviewerNotes.length===0?e.jsx("p",{className:"text-xs text-slate-400 py-3 text-center",children:"ยังไม่มีความเห็น สามารถพิมพ์บันทึกหรือตรวจสอบสเปกได้ด้านล่าง"}):u.reviewerNotes.map(o=>{var H,U,se,le,Y;const f=o.replies||[],x=Ne[o.id];return e.jsxs("div",{className:"p-3 bg-white rounded-xl border border-slate-200/70 shadow-xs space-y-2",children:[e.jsxs("div",{className:"flex items-start gap-2.5",children:[e.jsx(Te,{src:o.authorAvatar,className:"w-7 h-7 rounded-full object-cover shrink-0 mt-0.5 ring-1 ring-slate-200"}),e.jsxs("div",{className:"min-w-0 flex-1",children:[e.jsxs("div",{className:"flex items-center justify-between text-[11px] mb-0.5",children:[e.jsx("span",{className:"font-bold text-slate-900",children:o.author}),e.jsx("span",{className:"text-slate-400 font-mono text-[10px]",children:new Date(o.timestamp).toLocaleTimeString("th-TH",{hour:"2-digit",minute:"2-digit"})})]}),e.jsx("p",{className:"text-xs text-slate-700 leading-relaxed",children:o.text}),o.photoUrl&&e.jsx("div",{className:"mt-1.5",children:e.jsx("img",{src:o.photoUrl,alt:"ภาพแนบ",className:"max-h-48 max-w-xs rounded-xl border border-slate-200 object-cover cursor-pointer hover:opacity-95 shadow-2xs",onClick:()=>window.open(o.photoUrl,"_blank")})}),(o.voiceUrl||o.audioUrl)&&e.jsxs("div",{className:"mt-1.5 flex items-center gap-2 bg-slate-50 p-2 rounded-xl border border-slate-200/80 max-w-sm",children:[e.jsx(Ue,{className:"w-4 h-4 text-emerald-600 shrink-0"}),e.jsx("audio",{controls:!0,src:o.voiceUrl||o.audioUrl,className:"h-7 w-full"})]}),e.jsxs("div",{className:"flex items-center gap-3 mt-1.5 text-[11px] font-bold",children:[V&&e.jsxs("button",{type:"button",onClick:()=>X((K==null?void 0:K.noteId)===o.id&&K.author===o.author?null:{noteId:o.id,author:o.author}),className:"text-blue-600 hover:text-blue-800 flex items-center gap-1",children:[e.jsx(St,{className:"w-3 h-3"}),e.jsx("span",{children:"ตอบกลับ"})]}),f.length>0&&e.jsx("button",{type:"button",onClick:()=>de(D=>({...D,[o.id]:!D[o.id]})),className:"text-slate-500 hover:text-slate-800 flex items-center gap-1",children:x?e.jsxs(e.Fragment,{children:[e.jsx(En,{className:"w-3 h-3"}),e.jsxs("span",{children:["ดูการตอบกลับ (",f.length,")"]})]}):e.jsxs(e.Fragment,{children:[e.jsx(Rn,{className:"w-3 h-3"}),e.jsxs("span",{children:["ย่อการตอบกลับ (",f.length,")"]})]})})]})]})]}),f.length>0&&!x&&e.jsx("div",{className:"ml-6 pl-3 border-l-2 border-blue-200 space-y-2 pt-1",children:f.map(D=>e.jsxs("div",{className:"p-2.5 bg-slate-50 rounded-xl border border-slate-200/60 text-xs space-y-1",children:[e.jsxs("div",{className:"flex items-center justify-between text-[10px]",children:[e.jsxs("div",{className:"flex items-center gap-1.5 font-bold text-slate-800",children:[e.jsx(Te,{src:D.authorAvatar,className:"w-4 h-4 rounded-full object-cover"}),e.jsx("span",{children:D.author}),D.replyToAuthor&&e.jsxs("span",{className:"text-blue-600 font-normal",children:["▸ ตอบกลับ @",D.replyToAuthor]})]}),e.jsx("span",{className:"text-slate-400 font-mono",children:new Date(D.timestamp).toLocaleTimeString("th-TH",{hour:"2-digit",minute:"2-digit"})})]}),e.jsx("p",{className:"text-slate-700 leading-snug",children:D.text}),D.photoUrl&&e.jsx("div",{className:"mt-1",children:e.jsx("img",{src:D.photoUrl,alt:"ภาพแนบ",className:"max-h-36 max-w-[200px] rounded-lg border border-slate-200 object-cover cursor-pointer hover:opacity-95 shadow-2xs",onClick:()=>window.open(D.photoUrl,"_blank")})}),(D.voiceUrl||D.audioUrl)&&e.jsxs("div",{className:"mt-1 flex items-center gap-1.5 bg-white p-1.5 rounded-lg border border-slate-200 max-w-[240px]",children:[e.jsx(Ue,{className:"w-3.5 h-3.5 text-blue-600 shrink-0"}),e.jsx("audio",{controls:!0,src:D.voiceUrl||D.audioUrl,className:"h-6 w-full"})]}),e.jsx("div",{children:V&&e.jsxs("button",{type:"button",onClick:()=>X({noteId:o.id,author:D.author}),className:"text-[10px] font-bold text-blue-600 hover:underline inline-flex items-center gap-0.5",children:[e.jsx(St,{className:"w-2.5 h-2.5"}),e.jsxs("span",{children:["ตอบกลับ @",D.author," ต่อ"]})]})})]},D.id))}),V&&(K==null?void 0:K.noteId)===o.id&&e.jsxs("div",{className:"mt-2 pt-2 border-t border-slate-100 space-y-1.5 animate-in fade-in",children:[(((H=G[o.id])==null?void 0:H.photoUrl)||((U=G[o.id])==null?void 0:U.voiceUrl))&&e.jsxs("div",{className:"flex flex-wrap items-center gap-1.5 text-[10px]",children:[((se=G[o.id])==null?void 0:se.photoUrl)&&e.jsxs("span",{className:"inline-flex items-center gap-1 px-1.5 py-0.5 rounded bg-emerald-50 text-emerald-800 border border-emerald-200",children:[e.jsx(Ae,{className:"w-3 h-3"})," ภาพพร้อมแนบ",e.jsx("button",{type:"button",onClick:()=>J(D=>({...D,[o.id]:{...D[o.id],photoUrl:void 0}})),children:e.jsx(we,{className:"w-2.5 h-2.5"})})]}),((le=G[o.id])==null?void 0:le.voiceUrl)&&e.jsxs("span",{className:"inline-flex items-center gap-1.5 px-2 py-0.5 rounded bg-blue-50 text-blue-800 border border-blue-200",children:[e.jsx(Ie,{className:"w-3 h-3"})," เสียงอัดสดพร้อมส่ง",e.jsx("audio",{controls:!0,src:(Y=G[o.id])==null?void 0:Y.voiceUrl,className:"h-6 w-32"}),e.jsx("button",{type:"button",onClick:()=>J(D=>({...D,[o.id]:{...D[o.id],voiceUrl:void 0}})),children:e.jsx(we,{className:"w-2.5 h-2.5"})})]})]}),e.jsxs("div",{className:"flex gap-1.5 items-center flex-wrap sm:flex-nowrap",children:[e.jsx("input",{type:"text",placeholder:`ตอบกลับ @${K.author} ในฐานะ ${t.alias}...`,value:ce[o.id]||"",onChange:D=>pe({...ce,[o.id]:D.target.value}),className:"flex-1 min-w-[140px] bg-slate-50 border border-blue-300 rounded-lg px-2.5 py-1.5 text-xs text-slate-900 focus:outline-none focus:border-blue-500",autoFocus:!0,onKeyDown:D=>{D.key==="Enter"&&(D.preventDefault(),xt(o.id,K.author))}}),e.jsx("button",{type:"button",title:"แนบรูปภาพในคำตอบกลับ",onClick:()=>{const D=document.createElement("input");D.type="file",D.accept="image/*",D.onchange=Me=>{var je,Se;const Re=(Se=(je=Me.target)==null?void 0:je.files)==null?void 0:Se[0];Re&&Pe(Re,"photo",o.id)},D.click()},className:"p-1.5 rounded-lg border border-slate-200 hover:bg-slate-100 text-slate-500",children:e.jsx(Ae,{className:"w-3.5 h-3.5"})}),e.jsxs("button",{type:"button",title:h===o.id?"กดเพื่อหยุดอัดเสียงสด":"กดเพื่ออัดเสียงสดในคำตอบกลับ",disabled:Z,onClick:()=>void gt(o.id),className:`px-2 py-1.5 rounded-lg border text-[11px] font-bold inline-flex items-center gap-1 transition-all ${h===o.id?"bg-rose-600 text-white border-rose-600 animate-pulse":"bg-white border-slate-200 hover:border-blue-500 hover:bg-blue-50 text-slate-600 hover:text-blue-700"}`,children:[e.jsx(Ie,{className:"w-3.5 h-3.5"}),e.jsx("span",{children:h===o.id?`หยุดอัด (${ne}s)`:"อัดเสียงสด"})]}),e.jsx("button",{type:"button",onClick:()=>xt(o.id,K.author),className:"px-3 py-1.5 rounded-lg bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold",children:"ส่ง"}),V&&e.jsx("button",{type:"button",onClick:()=>X(null),className:"px-2 py-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-600 text-xs",children:"ยกเลิก"})]})]})]},o.id)})}),e.jsxs("div",{className:"pt-2 border-t border-slate-200/60 space-y-1.5",children:[e.jsx("div",{className:"flex items-center justify-between text-[11px] text-slate-500",children:e.jsxs("span",{className:"font-semibold flex items-center gap-1",children:[e.jsx(Ln,{className:"w-3 h-3 text-amber-500"})," ข้อความด่วน (แตะเพื่อพิมพ์ทันที):"]})}),e.jsx("div",{className:"flex items-center gap-1.5 overflow-x-auto no-scrollbar py-0.5",children:v.map(o=>e.jsxs("button",{type:"button",onClick:()=>j(o.text),className:"px-2.5 py-1 rounded-lg bg-white border border-slate-200 hover:border-blue-400 text-[11px] text-slate-700 whitespace-nowrap active:scale-95 transition-all shadow-xs",title:o.text,children:[e.jsx("i",{className:"fa-solid fa-bolt text-amber-500 mr-1 text-[10px]"}),e.jsx("span",{children:o.title})]},o.id))})]}),t.role==="viewer"?null:e.jsxs("form",{onSubmit:pn,className:"space-y-2 pt-1",children:[(ee||te||Z)&&e.jsxs("div",{className:"flex flex-wrap items-center gap-2 px-1",children:[ee&&e.jsxs("div",{className:"flex items-center gap-1.5 px-2 py-1 bg-emerald-50 border border-emerald-200 rounded-lg text-xs text-emerald-800",children:[e.jsx(Ae,{className:"w-3.5 h-3.5 text-emerald-600"}),e.jsx("span",{className:"truncate max-w-[120px]",children:"รูปภาพพร้อมแนบ"}),e.jsx("button",{type:"button",onClick:()=>ae(null),className:"text-slate-400 hover:text-rose-600",children:e.jsx(we,{className:"w-3 h-3"})})]}),te&&e.jsxs("div",{className:"flex items-center gap-1.5 px-2 py-1 bg-blue-50 border border-blue-200 rounded-lg text-xs text-blue-800",children:[e.jsx(Ie,{className:"w-3.5 h-3.5 text-blue-600"}),e.jsx("span",{children:"เสียงอัดสด:"}),e.jsx("audio",{controls:!0,src:te,className:"h-6 w-36"}),e.jsx("button",{type:"button",onClick:()=>ue(null),className:"text-slate-400 hover:text-rose-600",children:e.jsx(we,{className:"w-3 h-3"})})]}),Z&&e.jsxs("div",{className:"flex items-center gap-1.5 text-xs text-blue-600 font-medium",children:[e.jsx(Dn,{className:"w-3.5 h-3.5 animate-spin"}),e.jsx("span",{children:"กำลังอัปโหลดไฟล์สื่อ..."})]})]}),e.jsxs("div",{className:"flex gap-1.5 items-center flex-wrap sm:flex-nowrap",children:[e.jsx("input",{ref:m,type:"file",accept:"image/*",className:"hidden",onChange:o=>{var x;const f=(x=o.target.files)==null?void 0:x[0];f&&Pe(f,"photo"),o.target.value=""}}),e.jsx("input",{type:"text",placeholder:`พิมพ์ข้อคิดเห็นใหม่ในฐานะ ${t.alias}...`,value:R,onChange:o=>j(o.target.value),className:"flex-1 min-w-[140px] h-8 bg-white border border-slate-200 rounded-lg px-2.5 text-xs text-slate-900 focus:outline-none focus:border-blue-500 shadow-2xs"}),e.jsxs("button",{type:"button",title:"แนบรูปภาพ",disabled:Z,onClick:()=>{var o;return(o=m.current)==null?void 0:o.click()},className:"h-8 px-2.5 rounded-lg border border-slate-200 bg-white hover:border-emerald-500 hover:bg-emerald-50 text-slate-600 hover:text-emerald-700 text-[11px] font-bold inline-flex items-center justify-center gap-1 transition-colors shrink-0",children:[e.jsx(Ae,{className:"w-3.5 h-3.5"}),e.jsx("span",{className:"hidden sm:inline",children:"รูปภาพ"})]}),e.jsxs("button",{type:"button",title:h==="main"?"กดเพื่อหยุดอัดเสียงสด":"กดเพื่ออัดเสียงสดในคอมเมนต์",disabled:Z,onClick:()=>void gt("main"),className:`h-8 px-2.5 rounded-lg border text-[11px] font-bold inline-flex items-center justify-center gap-1 transition-all shrink-0 ${h==="main"?"bg-rose-600 text-white border-rose-600 animate-pulse shadow-xs":"bg-white border-slate-200 hover:border-blue-500 hover:bg-blue-50 text-slate-700 hover:text-blue-700"}`,children:[e.jsx(Ie,{className:"w-3.5 h-3.5"}),e.jsx("span",{children:h==="main"?`หยุดอัด (${ne}s)`:"อัดเสียงสด"})]}),e.jsxs("button",{type:"submit",disabled:Z||h==="main",className:"h-8 px-3 rounded-lg bg-blue-600 hover:bg-blue-700 text-white text-[11px] font-bold shadow-2xs active:scale-95 transition-all inline-flex items-center justify-center gap-1 shrink-0 disabled:opacity-50",children:[e.jsx(Sn,{className:"w-3 h-3"}),e.jsx("span",{children:"โพสต์"})]})]})]})]}),e.jsxs("div",{className:"p-3.5 bg-slate-50/90 rounded-xl border border-slate-200/80 space-y-2.5",children:[e.jsxs("div",{className:"flex flex-wrap items-center justify-between gap-2",children:[e.jsxs("span",{className:"text-xs font-bold text-slate-800 flex items-center gap-1.5",children:[e.jsx("i",{className:"fa-solid fa-clock-rotate-left text-emerald-600 text-xs"}),e.jsx("span",{children:"ประวัติการดำเนินงาน & ส่งต่องาน (Activity Log)"})]}),u.handoffStage&&e.jsxs("span",{className:"text-[10px] font-bold px-2 py-0.5 rounded-md bg-emerald-50 text-emerald-800 border border-emerald-200",children:["สถานะส่งต่อ:"," ",{awaiting:"พาร์ท 1: รอรับช่วงต่อ",rfq_sent:"พาร์ท 2: ขอสเปก / ส่ง RFQ",sample_test:"พาร์ท 3: ทดสอบตัวอย่าง Lab/R&D",negotiate:"พาร์ท 4: ต่อรองราคา & MOQ",approved:"พาร์ท 5: ตัวเต็งอนุมัติ",ordered:"พาร์ท 6: สั่งซื้อสำเร็จ"}[u.handoffStage]||u.handoffStage]})]}),(u.assignedTo||u.targetFollowUpDate||u.handoffNotes)&&e.jsxs("div",{className:"p-2.5 bg-white rounded-lg border border-slate-200/80 text-[11px] space-y-1",children:[e.jsxs("div",{className:"flex flex-wrap items-center gap-3 text-slate-700",children:[u.assignedTo&&e.jsxs("span",{className:"font-bold inline-flex items-center gap-1",children:[e.jsx("i",{className:"fa-solid fa-user-check text-emerald-600 text-[10px]"}),e.jsxs("span",{children:["ผู้รับช่วงต่อ: ",u.assignedTo]})]}),u.targetFollowUpDate&&e.jsxs("span",{className:"font-mono text-slate-500",children:["กำหนดติดตาม: ",u.targetFollowUpDate]})]}),u.handoffNotes&&e.jsxs("p",{className:"text-slate-600 whitespace-pre-wrap leading-relaxed",children:["หมายเหตุส่งต่อ: ",u.handoffNotes]})]}),e.jsx("div",{className:"space-y-1.5 max-h-48 overflow-y-auto pr-1",children:(()=>{const o=Array.isArray(u.history)?u.history:[];return(o.length>0?o:[{action:"สร้างบันทึกรายการสำรวจ",user:u.creator.alias,userAvatar:u.creator.avatar,timestamp:u.creator.timestamp}]).map((x,H)=>{const U=A.find(Y=>Y.alias===x.user||Y.name===x.user),se=x.userAvatar||(U==null?void 0:U.avatar)||(x.user===u.creator.alias?u.creator.avatar:"./logo.jpg"),le=x.action==="handoff"?"อัปเดตสถานะการส่งต่องาน (Handoff)":x.action==="comment"?"เพิ่มความคิดเห็นในรายการ":x.action==="reply"?"ตอบกลับความคิดเห็น":x.action;return e.jsxs("div",{className:"flex items-center justify-between gap-2 px-2.5 py-1.5 bg-white rounded-lg border border-slate-200/70 text-[11px]",children:[e.jsxs("div",{className:"flex items-center gap-2 min-w-0",children:[e.jsx(Te,{src:se,alt:x.user,className:"w-5 h-5 rounded-full object-cover border border-slate-200 shrink-0"}),e.jsx("span",{className:"font-bold text-slate-900 shrink-0",children:x.user}),e.jsx("span",{className:"text-slate-600 truncate",children:le})]}),e.jsx("span",{className:"text-[10px] font-mono text-slate-400 shrink-0",children:new Date(x.timestamp).toLocaleString("th-TH",{day:"2-digit",month:"2-digit",year:"2-digit",hour:"2-digit",minute:"2-digit"})})]},`${x.timestamp}-${H}`)})})()})]})]}),e.jsxs("div",{className:"p-3.5 border-t border-slate-100 bg-white flex items-center justify-between",children:[e.jsxs("div",{className:"text-[11px] text-slate-400 font-mono",children:["ID: ",u.id," · ปรับปรุง:"," ",new Date(u.updatedAt).toLocaleTimeString("th-TH")]}),e.jsxs("div",{className:"flex items-center gap-2",children:[E&&e.jsxs("button",{type:"button",onClick:()=>k(u),className:"px-3.5 py-1.5 text-xs font-bold rounded-xl bg-amber-50 hover:bg-amber-100 text-amber-800 border border-amber-300 flex items-center gap-1.5 transition-colors",children:[e.jsx(Rt,{className:"w-3.5 h-3.5 text-amber-600"}),e.jsx("span",{children:"แก้ไขข้อมูลรายการนี้"})]}),e.jsx("button",{onClick:a,className:"px-4 py-1.5 text-xs font-bold rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 transition-colors",children:"ปิดหน้าต่าง"})]})]})]}),z!==null&&_[z]&&e.jsxs("div",{className:"fixed inset-0 z-[140] bg-black/92 backdrop-blur-md flex flex-col items-center justify-between p-3 sm:p-6 select-none",onClick:()=>p(null),children:[e.jsxs("div",{className:"w-full max-w-4xl flex items-center justify-between text-white z-10",onClick:o=>o.stopPropagation(),children:[e.jsxs("div",{className:"flex items-center gap-2",children:[e.jsxs("span",{className:"px-2.5 py-1 rounded-full bg-white/15 font-mono text-xs font-bold",children:["รูปที่ ",z+1," / ",_.length]}),e.jsx("span",{className:"text-xs sm:text-sm font-semibold text-white/90 truncate max-w-[240px] sm:max-w-md",children:_[z].label})]}),e.jsx("button",{type:"button",onClick:()=>p(null),className:"w-9 h-9 rounded-full bg-white/15 hover:bg-white/25 text-white flex items-center justify-center transition-colors",children:e.jsx(we,{className:"w-5 h-5"})})]}),e.jsxs("div",{className:"relative flex-1 w-full max-w-5xl flex items-center justify-center my-2",onClick:o=>o.stopPropagation(),children:[_.length>1&&e.jsx("button",{type:"button",onClick:()=>p((z-1+_.length)%_.length),className:"absolute left-1 sm:left-3 z-20 w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-black/60 hover:bg-black/80 border border-white/25 text-white flex items-center justify-center shadow-lg active:scale-95 transition-all",title:"รูปก่อนหน้า (◀)",children:e.jsx(Tn,{className:"w-6 h-6"})}),e.jsx("img",{src:_[z].url,alt:_[z].label,className:"max-w-full max-h-[72vh] object-contain rounded-xl shadow-2xl"}),_.length>1&&e.jsx("button",{type:"button",onClick:()=>p((z+1)%_.length),className:"absolute right-1 sm:right-3 z-20 w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-black/60 hover:bg-black/80 border border-white/25 text-white flex items-center justify-center shadow-lg active:scale-95 transition-all",title:"รูปถัดไป (▶)",children:e.jsx(An,{className:"w-6 h-6"})})]}),_.length>1&&e.jsx("div",{className:"w-full max-w-3xl flex items-center justify-center gap-2 overflow-x-auto py-1 z-10",onClick:o=>o.stopPropagation(),children:_.map((o,f)=>e.jsx("button",{type:"button",onClick:()=>p(f),className:`relative w-12 h-12 sm:w-14 sm:h-14 rounded-lg overflow-hidden shrink-0 border-2 transition-all ${f===z?"border-emerald-400 scale-105 shadow-md":"border-white/20 opacity-60 hover:opacity-100"}`,children:e.jsx("img",{src:o.url,className:"w-full h-full object-cover"})},f))})]})]})};export{ms as DetailModal};
