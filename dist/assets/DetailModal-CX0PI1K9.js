import{c as Te,W as Gs,I as de,u as Js,r as ee,Y as ve,_ as _e,j as e,J as Ys,v as Ws,X as $e,P as ns,$ as Zs,a0 as Xs,F as Le,l as en,a1 as Ve,i as tn,N as sn,Z as rs,O as nn,R as rn,h as on,a2 as an,k as ln,a3 as os,a4 as cn,a5 as dn,a6 as Me,f as un,a7 as hn,d as fn,V as pn}from"./index-C7esHXqs.js";import{F as mn,V as gn}from"./VideoPlayer-CcoPB0DN.js";import{M as De}from"./mic-r9FhE0T8.js";/**
 * @license lucide-react v1.62.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Ls={name:"file-down",size:24,node:[["path",{d:"M6 22a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h8a2.4 2.4 0 0 1 1.704.706l3.588 3.588A2.4 2.4 0 0 1 20 8v12a2 2 0 0 1-2 2z",key:"1oefj6"}],["path",{d:"M14 2v5a1 1 0 0 0 1 1h5",key:"wfsgrz"}],["path",{d:"M12 18v-6",key:"17g6i2"}],["path",{d:"m9 15 3 3 3-3",key:"1npd3o"}]]};Ls.node;const xn=Te(Ls);/**
 * @license lucide-react v1.62.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Ms={name:"loader-circle",size:24,node:[["path",{d:"M21 12a9 9 0 1 1-6.219-8.56",key:"13zald"}]],aliases:["loader-2"]};Ms.node;const bn=Te(Ms);/**
 * @license lucide-react v1.62.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Ds={name:"pause",size:24,node:[["rect",{x:"14",y:"3",width:"5",height:"18",rx:"1",key:"kaeet6"}],["rect",{x:"5",y:"3",width:"5",height:"18",rx:"1",key:"1wsw3u"}]]};Ds.node;const He=Te(Ds);/**
 * @license lucide-react v1.62.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Us={name:"play",size:24,node:[["path",{d:"M5 5a2 2 0 0 1 3.008-1.728l11.997 6.998a2 2 0 0 1 .003 3.458l-12 7A2 2 0 0 1 5 19z",key:"10ikf1"}]]};Us.node;const Oe=Te(Us);/**
 * @license lucide-react v1.62.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const zs={name:"printer",size:24,node:[["path",{d:"M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2",key:"143wyd"}],["path",{d:"M6 9V3a1 1 0 0 1 1-1h10a1 1 0 0 1 1 1v6",key:"1itne7"}],["rect",{x:"6",y:"14",width:"12",height:"8",rx:"1",key:"1ue0tg"}]]};zs.node;const vn=Te(zs);var ke={},Ke,as;function wn(){return as||(as=1,Ke=function(){return typeof Promise=="function"&&Promise.prototype&&Promise.prototype.then}),Ke}var Qe={},we={},is;function je(){if(is)return we;is=1;let n;const i=[0,26,44,70,100,134,172,196,242,292,346,404,466,532,581,655,733,815,901,991,1085,1156,1258,1364,1474,1588,1706,1828,1921,2051,2185,2323,2465,2611,2761,2876,3034,3196,3362,3532,3706];return we.getSymbolSize=function(r){if(!r)throw new Error('"version" cannot be null or undefined');if(r<1||r>40)throw new Error('"version" should be in range from 1 to 40');return r*4+17},we.getSymbolTotalCodewords=function(r){return i[r]},we.getBCHDigit=function(l){let r=0;for(;l!==0;)r++,l>>>=1;return r},we.setToSJISFunction=function(r){if(typeof r!="function")throw new Error('"toSJISFunc" is not a valid function.');n=r},we.isKanjiModeEnabled=function(){return typeof n<"u"},we.toSJIS=function(r){return n(r)},we}var Ge={},ls;function mt(){return ls||(ls=1,(function(n){n.L={bit:1},n.M={bit:0},n.Q={bit:3},n.H={bit:2};function i(l){if(typeof l!="string")throw new Error("Param is not a string");switch(l.toLowerCase()){case"l":case"low":return n.L;case"m":case"medium":return n.M;case"q":case"quartile":return n.Q;case"h":case"high":return n.H;default:throw new Error("Unknown EC Level: "+l)}}n.isValid=function(r){return r&&typeof r.bit<"u"&&r.bit>=0&&r.bit<4},n.from=function(r,s){if(n.isValid(r))return r;try{return i(r)}catch{return s}}})(Ge)),Ge}var Je,cs;function yn(){if(cs)return Je;cs=1;function n(){this.buffer=[],this.length=0}return n.prototype={get:function(i){const l=Math.floor(i/8);return(this.buffer[l]>>>7-i%8&1)===1},put:function(i,l){for(let r=0;r<l;r++)this.putBit((i>>>l-r-1&1)===1)},getLengthInBits:function(){return this.length},putBit:function(i){const l=Math.floor(this.length/8);this.buffer.length<=l&&this.buffer.push(0),i&&(this.buffer[l]|=128>>>this.length%8),this.length++}},Je=n,Je}var Ye,ds;function jn(){if(ds)return Ye;ds=1;function n(i){if(!i||i<1)throw new Error("BitMatrix size must be defined and greater than 0");this.size=i,this.data=new Uint8Array(i*i),this.reservedBit=new Uint8Array(i*i)}return n.prototype.set=function(i,l,r,s){const t=i*this.size+l;this.data[t]=r,s&&(this.reservedBit[t]=!0)},n.prototype.get=function(i,l){return this.data[i*this.size+l]},n.prototype.xor=function(i,l,r){this.data[i*this.size+l]^=r},n.prototype.isReserved=function(i,l){return this.reservedBit[i*this.size+l]},Ye=n,Ye}var We={},us;function Nn(){return us||(us=1,(function(n){const i=je().getSymbolSize;n.getRowColCoords=function(r){if(r===1)return[];const s=Math.floor(r/7)+2,t=i(r),c=t===145?26:Math.ceil((t-13)/(2*s-2))*2,o=[t-7];for(let u=1;u<s-1;u++)o[u]=o[u-1]-c;return o.push(6),o.reverse()},n.getPositions=function(r){const s=[],t=n.getRowColCoords(r),c=t.length;for(let o=0;o<c;o++)for(let u=0;u<c;u++)o===0&&u===0||o===0&&u===c-1||o===c-1&&u===0||s.push([t[o],t[u]]);return s}})(We)),We}var Ze={},hs;function $n(){if(hs)return Ze;hs=1;const n=je().getSymbolSize,i=7;return Ze.getPositions=function(r){const s=n(r);return[[0,0],[s-i,0],[0,s-i]]},Ze}var Xe={},fs;function kn(){return fs||(fs=1,(function(n){n.Patterns={PATTERN000:0,PATTERN001:1,PATTERN010:2,PATTERN011:3,PATTERN100:4,PATTERN101:5,PATTERN110:6,PATTERN111:7};const i={N1:3,N2:3,N3:40,N4:10};n.isValid=function(s){return s!=null&&s!==""&&!isNaN(s)&&s>=0&&s<=7},n.from=function(s){return n.isValid(s)?parseInt(s,10):void 0},n.getPenaltyN1=function(s){const t=s.size;let c=0,o=0,u=0,x=null,$=null;for(let P=0;P<t;P++){o=u=0,x=$=null;for(let R=0;R<t;R++){let y=s.get(P,R);y===x?o++:(o>=5&&(c+=i.N1+(o-5)),x=y,o=1),y=s.get(R,P),y===$?u++:(u>=5&&(c+=i.N1+(u-5)),$=y,u=1)}o>=5&&(c+=i.N1+(o-5)),u>=5&&(c+=i.N1+(u-5))}return c},n.getPenaltyN2=function(s){const t=s.size;let c=0;for(let o=0;o<t-1;o++)for(let u=0;u<t-1;u++){const x=s.get(o,u)+s.get(o,u+1)+s.get(o+1,u)+s.get(o+1,u+1);(x===4||x===0)&&c++}return c*i.N2},n.getPenaltyN3=function(s){const t=s.size;let c=0,o=0,u=0;for(let x=0;x<t;x++){o=u=0;for(let $=0;$<t;$++)o=o<<1&2047|s.get(x,$),$>=10&&(o===1488||o===93)&&c++,u=u<<1&2047|s.get($,x),$>=10&&(u===1488||u===93)&&c++}return c*i.N3},n.getPenaltyN4=function(s){let t=0;const c=s.data.length;for(let u=0;u<c;u++)t+=s.data[u];return Math.abs(Math.ceil(t*100/c/5)-10)*i.N4};function l(r,s,t){switch(r){case n.Patterns.PATTERN000:return(s+t)%2===0;case n.Patterns.PATTERN001:return s%2===0;case n.Patterns.PATTERN010:return t%3===0;case n.Patterns.PATTERN011:return(s+t)%3===0;case n.Patterns.PATTERN100:return(Math.floor(s/2)+Math.floor(t/3))%2===0;case n.Patterns.PATTERN101:return s*t%2+s*t%3===0;case n.Patterns.PATTERN110:return(s*t%2+s*t%3)%2===0;case n.Patterns.PATTERN111:return(s*t%3+(s+t)%2)%2===0;default:throw new Error("bad maskPattern:"+r)}}n.applyMask=function(s,t){const c=t.size;for(let o=0;o<c;o++)for(let u=0;u<c;u++)t.isReserved(u,o)||t.xor(u,o,l(s,u,o))},n.getBestMask=function(s,t){const c=Object.keys(n.Patterns).length;let o=0,u=1/0;for(let x=0;x<c;x++){t(x),n.applyMask(x,s);const $=n.getPenaltyN1(s)+n.getPenaltyN2(s)+n.getPenaltyN3(s)+n.getPenaltyN4(s);n.applyMask(x,s),$<u&&(u=$,o=x)}return o}})(Xe)),Xe}var Ue={},ps;function Fs(){if(ps)return Ue;ps=1;const n=mt(),i=[1,1,1,1,1,1,1,1,1,1,2,2,1,2,2,4,1,2,4,4,2,4,4,4,2,4,6,5,2,4,6,6,2,5,8,8,4,5,8,8,4,5,8,11,4,8,10,11,4,9,12,16,4,9,16,16,6,10,12,18,6,10,17,16,6,11,16,19,6,13,18,21,7,14,21,25,8,16,20,25,8,17,23,25,9,17,23,34,9,18,25,30,10,20,27,32,12,21,29,35,12,23,34,37,12,25,34,40,13,26,35,42,14,28,38,45,15,29,40,48,16,31,43,51,17,33,45,54,18,35,48,57,19,37,51,60,19,38,53,63,20,40,56,66,21,43,59,70,22,45,62,74,24,47,65,77,25,49,68,81],l=[7,10,13,17,10,16,22,28,15,26,36,44,20,36,52,64,26,48,72,88,36,64,96,112,40,72,108,130,48,88,132,156,60,110,160,192,72,130,192,224,80,150,224,264,96,176,260,308,104,198,288,352,120,216,320,384,132,240,360,432,144,280,408,480,168,308,448,532,180,338,504,588,196,364,546,650,224,416,600,700,224,442,644,750,252,476,690,816,270,504,750,900,300,560,810,960,312,588,870,1050,336,644,952,1110,360,700,1020,1200,390,728,1050,1260,420,784,1140,1350,450,812,1200,1440,480,868,1290,1530,510,924,1350,1620,540,980,1440,1710,570,1036,1530,1800,570,1064,1590,1890,600,1120,1680,1980,630,1204,1770,2100,660,1260,1860,2220,720,1316,1950,2310,750,1372,2040,2430];return Ue.getBlocksCount=function(s,t){switch(t){case n.L:return i[(s-1)*4+0];case n.M:return i[(s-1)*4+1];case n.Q:return i[(s-1)*4+2];case n.H:return i[(s-1)*4+3];default:return}},Ue.getTotalCodewordsCount=function(s,t){switch(t){case n.L:return l[(s-1)*4+0];case n.M:return l[(s-1)*4+1];case n.Q:return l[(s-1)*4+2];case n.H:return l[(s-1)*4+3];default:return}},Ue}var et={},Se={},ms;function Cn(){if(ms)return Se;ms=1;const n=new Uint8Array(512),i=new Uint8Array(256);return(function(){let r=1;for(let s=0;s<255;s++)n[s]=r,i[r]=s,r<<=1,r&256&&(r^=285);for(let s=255;s<512;s++)n[s]=n[s-255]})(),Se.log=function(r){if(r<1)throw new Error("log("+r+")");return i[r]},Se.exp=function(r){return n[r]},Se.mul=function(r,s){return r===0||s===0?0:n[i[r]+i[s]]},Se}var gs;function En(){return gs||(gs=1,(function(n){const i=Cn();n.mul=function(r,s){const t=new Uint8Array(r.length+s.length-1);for(let c=0;c<r.length;c++)for(let o=0;o<s.length;o++)t[c+o]^=i.mul(r[c],s[o]);return t},n.mod=function(r,s){let t=new Uint8Array(r);for(;t.length-s.length>=0;){const c=t[0];for(let u=0;u<s.length;u++)t[u]^=i.mul(s[u],c);let o=0;for(;o<t.length&&t[o]===0;)o++;t=t.slice(o)}return t},n.generateECPolynomial=function(r){let s=new Uint8Array([1]);for(let t=0;t<r;t++)s=n.mul(s,new Uint8Array([1,i.exp(t)]));return s}})(et)),et}var tt,xs;function Rn(){if(xs)return tt;xs=1;const n=En();function i(l){this.genPoly=void 0,this.degree=l,this.degree&&this.initialize(this.degree)}return i.prototype.initialize=function(r){this.degree=r,this.genPoly=n.generateECPolynomial(this.degree)},i.prototype.encode=function(r){if(!this.genPoly)throw new Error("Encoder not initialized");const s=new Uint8Array(r.length+this.degree);s.set(r);const t=n.mod(s,this.genPoly),c=this.degree-t.length;if(c>0){const o=new Uint8Array(this.degree);return o.set(t,c),o}return t},tt=i,tt}var st={},nt={},rt={},bs;function qs(){return bs||(bs=1,rt.isValid=function(i){return!isNaN(i)&&i>=1&&i<=40}),rt}var ce={},vs;function _s(){if(vs)return ce;vs=1;const n="[0-9]+",i="[A-Z $%*+\\-./:]+";let l="(?:[u3000-u303F]|[u3040-u309F]|[u30A0-u30FF]|[uFF00-uFFEF]|[u4E00-u9FAF]|[u2605-u2606]|[u2190-u2195]|u203B|[u2010u2015u2018u2019u2025u2026u201Cu201Du2225u2260]|[u0391-u0451]|[u00A7u00A8u00B1u00B4u00D7u00F7])+";l=l.replace(/u/g,"\\u");const r="(?:(?![A-Z0-9 $%*+\\-./:]|"+l+`)(?:.|[\r
]))+`;ce.KANJI=new RegExp(l,"g"),ce.BYTE_KANJI=new RegExp("[^A-Z0-9 $%*+\\-./:]+","g"),ce.BYTE=new RegExp(r,"g"),ce.NUMERIC=new RegExp(n,"g"),ce.ALPHANUMERIC=new RegExp(i,"g");const s=new RegExp("^"+l+"$"),t=new RegExp("^"+n+"$"),c=new RegExp("^[A-Z0-9 $%*+\\-./:]+$");return ce.testKanji=function(u){return s.test(u)},ce.testNumeric=function(u){return t.test(u)},ce.testAlphanumeric=function(u){return c.test(u)},ce}var ws;function Ne(){return ws||(ws=1,(function(n){const i=qs(),l=_s();n.NUMERIC={id:"Numeric",bit:1,ccBits:[10,12,14]},n.ALPHANUMERIC={id:"Alphanumeric",bit:2,ccBits:[9,11,13]},n.BYTE={id:"Byte",bit:4,ccBits:[8,16,16]},n.KANJI={id:"Kanji",bit:8,ccBits:[8,10,12]},n.MIXED={bit:-1},n.getCharCountIndicator=function(t,c){if(!t.ccBits)throw new Error("Invalid mode: "+t);if(!i.isValid(c))throw new Error("Invalid version: "+c);return c>=1&&c<10?t.ccBits[0]:c<27?t.ccBits[1]:t.ccBits[2]},n.getBestModeForData=function(t){return l.testNumeric(t)?n.NUMERIC:l.testAlphanumeric(t)?n.ALPHANUMERIC:l.testKanji(t)?n.KANJI:n.BYTE},n.toString=function(t){if(t&&t.id)return t.id;throw new Error("Invalid mode")},n.isValid=function(t){return t&&t.bit&&t.ccBits};function r(s){if(typeof s!="string")throw new Error("Param is not a string");switch(s.toLowerCase()){case"numeric":return n.NUMERIC;case"alphanumeric":return n.ALPHANUMERIC;case"kanji":return n.KANJI;case"byte":return n.BYTE;default:throw new Error("Unknown mode: "+s)}}n.from=function(t,c){if(n.isValid(t))return t;try{return r(t)}catch{return c}}})(nt)),nt}var ys;function Sn(){return ys||(ys=1,(function(n){const i=je(),l=Fs(),r=mt(),s=Ne(),t=qs(),c=7973,o=i.getBCHDigit(c);function u(R,y,M){for(let D=1;D<=40;D++)if(y<=n.getCapacity(D,M,R))return D}function x(R,y){return s.getCharCountIndicator(R,y)+4}function $(R,y){let M=0;return R.forEach(function(D){const H=x(D.mode,y);M+=H+D.getBitsLength()}),M}function P(R,y){for(let M=1;M<=40;M++)if($(R,M)<=n.getCapacity(M,y,s.MIXED))return M}n.from=function(y,M){return t.isValid(y)?parseInt(y,10):M},n.getCapacity=function(y,M,D){if(!t.isValid(y))throw new Error("Invalid QR Code version");typeof D>"u"&&(D=s.BYTE);const H=i.getSymbolTotalCodewords(y),w=l.getTotalCodewordsCount(y,M),U=(H-w)*8;if(D===s.MIXED)return U;const S=U-x(D,y);switch(D){case s.NUMERIC:return Math.floor(S/10*3);case s.ALPHANUMERIC:return Math.floor(S/11*2);case s.KANJI:return Math.floor(S/13);case s.BYTE:default:return Math.floor(S/8)}},n.getBestVersionForData=function(y,M){let D;const H=r.from(M,r.M);if(Array.isArray(y)){if(y.length>1)return P(y,H);if(y.length===0)return 1;D=y[0]}else D=y;return u(D.mode,D.getLength(),H)},n.getEncodedBits=function(y){if(!t.isValid(y)||y<7)throw new Error("Invalid QR Code version");let M=y<<12;for(;i.getBCHDigit(M)-o>=0;)M^=c<<i.getBCHDigit(M)-o;return y<<12|M}})(st)),st}var ot={},js;function Tn(){if(js)return ot;js=1;const n=je(),i=1335,l=21522,r=n.getBCHDigit(i);return ot.getEncodedBits=function(t,c){const o=t.bit<<3|c;let u=o<<10;for(;n.getBCHDigit(u)-r>=0;)u^=i<<n.getBCHDigit(u)-r;return(o<<10|u)^l},ot}var at={},it,Ns;function An(){if(Ns)return it;Ns=1;const n=Ne();function i(l){this.mode=n.NUMERIC,this.data=l.toString()}return i.getBitsLength=function(r){return 10*Math.floor(r/3)+(r%3?r%3*3+1:0)},i.prototype.getLength=function(){return this.data.length},i.prototype.getBitsLength=function(){return i.getBitsLength(this.data.length)},i.prototype.write=function(r){let s,t,c;for(s=0;s+3<=this.data.length;s+=3)t=this.data.substr(s,3),c=parseInt(t,10),r.put(c,10);const o=this.data.length-s;o>0&&(t=this.data.substr(s),c=parseInt(t,10),r.put(c,o*3+1))},it=i,it}var lt,$s;function In(){if($s)return lt;$s=1;const n=Ne(),i=["0","1","2","3","4","5","6","7","8","9","A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z"," ","$","%","*","+","-",".","/",":"];function l(r){this.mode=n.ALPHANUMERIC,this.data=r}return l.getBitsLength=function(s){return 11*Math.floor(s/2)+6*(s%2)},l.prototype.getLength=function(){return this.data.length},l.prototype.getBitsLength=function(){return l.getBitsLength(this.data.length)},l.prototype.write=function(s){let t;for(t=0;t+2<=this.data.length;t+=2){let c=i.indexOf(this.data[t])*45;c+=i.indexOf(this.data[t+1]),s.put(c,11)}this.data.length%2&&s.put(i.indexOf(this.data[t]),6)},lt=l,lt}var ct,ks;function Bn(){if(ks)return ct;ks=1;const n=Ne();function i(l){this.mode=n.BYTE,typeof l=="string"?this.data=new TextEncoder().encode(l):this.data=new Uint8Array(l)}return i.getBitsLength=function(r){return r*8},i.prototype.getLength=function(){return this.data.length},i.prototype.getBitsLength=function(){return i.getBitsLength(this.data.length)},i.prototype.write=function(l){for(let r=0,s=this.data.length;r<s;r++)l.put(this.data[r],8)},ct=i,ct}var dt,Cs;function Pn(){if(Cs)return dt;Cs=1;const n=Ne(),i=je();function l(r){this.mode=n.KANJI,this.data=r}return l.getBitsLength=function(s){return s*13},l.prototype.getLength=function(){return this.data.length},l.prototype.getBitsLength=function(){return l.getBitsLength(this.data.length)},l.prototype.write=function(r){let s;for(s=0;s<this.data.length;s++){let t=i.toSJIS(this.data[s]);if(t>=33088&&t<=40956)t-=33088;else if(t>=57408&&t<=60351)t-=49472;else throw new Error("Invalid SJIS character: "+this.data[s]+`
Make sure your charset is UTF-8`);t=(t>>>8&255)*192+(t&255),r.put(t,13)}},dt=l,dt}var ut={exports:{}},Es;function Ln(){return Es||(Es=1,(function(n){var i={single_source_shortest_paths:function(l,r,s){var t={},c={};c[r]=0;var o=i.PriorityQueue.make();o.push(r,0);for(var u,x,$,P,R,y,M,D,H;!o.empty();){u=o.pop(),x=u.value,P=u.cost,R=l[x]||{};for($ in R)R.hasOwnProperty($)&&(y=R[$],M=P+y,D=c[$],H=typeof c[$]>"u",(H||D>M)&&(c[$]=M,o.push($,M),t[$]=x))}if(typeof s<"u"&&typeof c[s]>"u"){var w=["Could not find a path from ",r," to ",s,"."].join("");throw new Error(w)}return t},extract_shortest_path_from_predecessor_list:function(l,r){for(var s=[],t=r;t;)s.push(t),l[t],t=l[t];return s.reverse(),s},find_path:function(l,r,s){var t=i.single_source_shortest_paths(l,r,s);return i.extract_shortest_path_from_predecessor_list(t,s)},PriorityQueue:{make:function(l){var r=i.PriorityQueue,s={},t;l=l||{};for(t in r)r.hasOwnProperty(t)&&(s[t]=r[t]);return s.queue=[],s.sorter=l.sorter||r.default_sorter,s},default_sorter:function(l,r){return l.cost-r.cost},push:function(l,r){var s={value:l,cost:r};this.queue.push(s),this.queue.sort(this.sorter)},pop:function(){return this.queue.shift()},empty:function(){return this.queue.length===0}}};n.exports=i})(ut)),ut.exports}var Rs;function Mn(){return Rs||(Rs=1,(function(n){const i=Ne(),l=An(),r=In(),s=Bn(),t=Pn(),c=_s(),o=je(),u=Ln();function x(w){return unescape(encodeURIComponent(w)).length}function $(w,U,S){const T=[];let K;for(;(K=w.exec(S))!==null;)T.push({data:K[0],index:K.index,mode:U,length:K[0].length});return T}function P(w){const U=$(c.NUMERIC,i.NUMERIC,w),S=$(c.ALPHANUMERIC,i.ALPHANUMERIC,w);let T,K;return o.isKanjiModeEnabled()?(T=$(c.BYTE,i.BYTE,w),K=$(c.KANJI,i.KANJI,w)):(T=$(c.BYTE_KANJI,i.BYTE,w),K=[]),U.concat(S,T,K).sort(function(N,b){return N.index-b.index}).map(function(N){return{data:N.data,mode:N.mode,length:N.length}})}function R(w,U){switch(U){case i.NUMERIC:return l.getBitsLength(w);case i.ALPHANUMERIC:return r.getBitsLength(w);case i.KANJI:return t.getBitsLength(w);case i.BYTE:return s.getBitsLength(w)}}function y(w){return w.reduce(function(U,S){const T=U.length-1>=0?U[U.length-1]:null;return T&&T.mode===S.mode?(U[U.length-1].data+=S.data,U):(U.push(S),U)},[])}function M(w){const U=[];for(let S=0;S<w.length;S++){const T=w[S];switch(T.mode){case i.NUMERIC:U.push([T,{data:T.data,mode:i.ALPHANUMERIC,length:T.length},{data:T.data,mode:i.BYTE,length:T.length}]);break;case i.ALPHANUMERIC:U.push([T,{data:T.data,mode:i.BYTE,length:T.length}]);break;case i.KANJI:U.push([T,{data:T.data,mode:i.BYTE,length:x(T.data)}]);break;case i.BYTE:U.push([{data:T.data,mode:i.BYTE,length:x(T.data)}])}}return U}function D(w,U){const S={},T={start:{}};let K=["start"];for(let d=0;d<w.length;d++){const N=w[d],b=[];for(let j=0;j<N.length;j++){const A=N[j],I=""+d+j;b.push(I),S[I]={node:A,lastCount:0},T[I]={};for(let B=0;B<K.length;B++){const C=K[B];S[C]&&S[C].node.mode===A.mode?(T[C][I]=R(S[C].lastCount+A.length,A.mode)-R(S[C].lastCount,A.mode),S[C].lastCount+=A.length):(S[C]&&(S[C].lastCount=A.length),T[C][I]=R(A.length,A.mode)+4+i.getCharCountIndicator(A.mode,U))}}K=b}for(let d=0;d<K.length;d++)T[K[d]].end=0;return{map:T,table:S}}function H(w,U){let S;const T=i.getBestModeForData(w);if(S=i.from(U,T),S!==i.BYTE&&S.bit<T.bit)throw new Error('"'+w+'" cannot be encoded with mode '+i.toString(S)+`.
 Suggested mode is: `+i.toString(T));switch(S===i.KANJI&&!o.isKanjiModeEnabled()&&(S=i.BYTE),S){case i.NUMERIC:return new l(w);case i.ALPHANUMERIC:return new r(w);case i.KANJI:return new t(w);case i.BYTE:return new s(w)}}n.fromArray=function(U){return U.reduce(function(S,T){return typeof T=="string"?S.push(H(T,null)):T.data&&S.push(H(T.data,T.mode)),S},[])},n.fromString=function(U,S){const T=P(U,o.isKanjiModeEnabled()),K=M(T),d=D(K,S),N=u.find_path(d.map,"start","end"),b=[];for(let j=1;j<N.length-1;j++)b.push(d.table[N[j]].node);return n.fromArray(y(b))},n.rawSplit=function(U){return n.fromArray(P(U,o.isKanjiModeEnabled()))}})(at)),at}var Ss;function Dn(){if(Ss)return Qe;Ss=1;const n=je(),i=mt(),l=yn(),r=jn(),s=Nn(),t=$n(),c=kn(),o=Fs(),u=Rn(),x=Sn(),$=Tn(),P=Ne(),R=Mn();function y(d,N){const b=d.size,j=t.getPositions(N);for(let A=0;A<j.length;A++){const I=j[A][0],B=j[A][1];for(let C=-1;C<=7;C++)if(!(I+C<=-1||b<=I+C))for(let L=-1;L<=7;L++)B+L<=-1||b<=B+L||(C>=0&&C<=6&&(L===0||L===6)||L>=0&&L<=6&&(C===0||C===6)||C>=2&&C<=4&&L>=2&&L<=4?d.set(I+C,B+L,!0,!0):d.set(I+C,B+L,!1,!0))}}function M(d){const N=d.size;for(let b=8;b<N-8;b++){const j=b%2===0;d.set(b,6,j,!0),d.set(6,b,j,!0)}}function D(d,N){const b=s.getPositions(N);for(let j=0;j<b.length;j++){const A=b[j][0],I=b[j][1];for(let B=-2;B<=2;B++)for(let C=-2;C<=2;C++)B===-2||B===2||C===-2||C===2||B===0&&C===0?d.set(A+B,I+C,!0,!0):d.set(A+B,I+C,!1,!0)}}function H(d,N){const b=d.size,j=x.getEncodedBits(N);let A,I,B;for(let C=0;C<18;C++)A=Math.floor(C/3),I=C%3+b-8-3,B=(j>>C&1)===1,d.set(A,I,B,!0),d.set(I,A,B,!0)}function w(d,N,b){const j=d.size,A=$.getEncodedBits(N,b);let I,B;for(I=0;I<15;I++)B=(A>>I&1)===1,I<6?d.set(I,8,B,!0):I<8?d.set(I+1,8,B,!0):d.set(j-15+I,8,B,!0),I<8?d.set(8,j-I-1,B,!0):I<9?d.set(8,15-I-1+1,B,!0):d.set(8,15-I-1,B,!0);d.set(j-8,8,1,!0)}function U(d,N){const b=d.size;let j=-1,A=b-1,I=7,B=0;for(let C=b-1;C>0;C-=2)for(C===6&&C--;;){for(let L=0;L<2;L++)if(!d.isReserved(A,C-L)){let ne=!1;B<N.length&&(ne=(N[B]>>>I&1)===1),d.set(A,C-L,ne),I--,I===-1&&(B++,I=7)}if(A+=j,A<0||b<=A){A-=j,j=-j;break}}}function S(d,N,b){const j=new l;b.forEach(function(L){j.put(L.mode.bit,4),j.put(L.getLength(),P.getCharCountIndicator(L.mode,d)),L.write(j)});const A=n.getSymbolTotalCodewords(d),I=o.getTotalCodewordsCount(d,N),B=(A-I)*8;for(j.getLengthInBits()+4<=B&&j.put(0,4);j.getLengthInBits()%8!==0;)j.putBit(0);const C=(B-j.getLengthInBits())/8;for(let L=0;L<C;L++)j.put(L%2?17:236,8);return T(j,d,N)}function T(d,N,b){const j=n.getSymbolTotalCodewords(N),A=o.getTotalCodewordsCount(N,b),I=j-A,B=o.getBlocksCount(N,b),C=j%B,L=B-C,ne=Math.floor(j/B),J=Math.floor(I/B),te=J+1,ue=ne-J,pe=new u(ue);let me=0;const ge=new Array(B),ye=new Array(B);let ie=0;const xe=new Uint8Array(d.buffer);for(let Z=0;Z<B;Z++){const le=Z<L?J:te;ge[Z]=xe.slice(me,me+le),ye[Z]=pe.encode(ge[Z]),me+=le,ie=Math.max(ie,le)}const re=new Uint8Array(j);let he=0,G,X;for(G=0;G<ie;G++)for(X=0;X<B;X++)G<ge[X].length&&(re[he++]=ge[X][G]);for(G=0;G<ue;G++)for(X=0;X<B;X++)re[he++]=ye[X][G];return re}function K(d,N,b,j){let A;if(Array.isArray(d))A=R.fromArray(d);else if(typeof d=="string"){let ne=N;if(!ne){const J=R.rawSplit(d);ne=x.getBestVersionForData(J,b)}A=R.fromString(d,ne||40)}else throw new Error("Invalid data");const I=x.getBestVersionForData(A,b);if(!I)throw new Error("The amount of data is too big to be stored in a QR Code");if(!N)N=I;else if(N<I)throw new Error(`
The chosen QR Code version cannot contain this amount of data.
Minimum version required to store current data is: `+I+`.
`);const B=S(N,b,A),C=n.getSymbolSize(N),L=new r(C);return y(L,N),M(L),D(L,N),w(L,b,0),N>=7&&H(L,N),U(L,B),isNaN(j)&&(j=c.getBestMask(L,w.bind(null,L,b))),c.applyMask(j,L),w(L,b,j),{modules:L,version:N,errorCorrectionLevel:b,maskPattern:j,segments:A}}return Qe.create=function(N,b){if(typeof N>"u"||N==="")throw new Error("No input text");let j=i.M,A,I;return typeof b<"u"&&(j=i.from(b.errorCorrectionLevel,i.M),A=x.from(b.version),I=c.from(b.maskPattern),b.toSJISFunc&&n.setToSJISFunction(b.toSJISFunc)),K(N,A,j,I)},Qe}var ht={},ft={},Ts;function Vs(){return Ts||(Ts=1,(function(n){function i(l){if(typeof l=="number"&&(l=l.toString()),typeof l!="string")throw new Error("Color should be defined as hex string");let r=l.slice().replace("#","").split("");if(r.length<3||r.length===5||r.length>8)throw new Error("Invalid hex color: "+l);(r.length===3||r.length===4)&&(r=Array.prototype.concat.apply([],r.map(function(t){return[t,t]}))),r.length===6&&r.push("F","F");const s=parseInt(r.join(""),16);return{r:s>>24&255,g:s>>16&255,b:s>>8&255,a:s&255,hex:"#"+r.slice(0,6).join("")}}n.getOptions=function(r){r||(r={}),r.color||(r.color={});const s=typeof r.margin>"u"||r.margin===null||r.margin<0?4:r.margin,t=r.width&&r.width>=21?r.width:void 0,c=r.scale||4;return{width:t,scale:t?4:c,margin:s,color:{dark:i(r.color.dark||"#000000ff"),light:i(r.color.light||"#ffffffff")},type:r.type,rendererOpts:r.rendererOpts||{}}},n.getScale=function(r,s){return s.width&&s.width>=r+s.margin*2?s.width/(r+s.margin*2):s.scale},n.getImageWidth=function(r,s){const t=n.getScale(r,s);return Math.floor((r+s.margin*2)*t)},n.qrToImageData=function(r,s,t){const c=s.modules.size,o=s.modules.data,u=n.getScale(c,t),x=Math.floor((c+t.margin*2)*u),$=t.margin*u,P=[t.color.light,t.color.dark];for(let R=0;R<x;R++)for(let y=0;y<x;y++){let M=(R*x+y)*4,D=t.color.light;if(R>=$&&y>=$&&R<x-$&&y<x-$){const H=Math.floor((R-$)/u),w=Math.floor((y-$)/u);D=P[o[H*c+w]?1:0]}r[M++]=D.r,r[M++]=D.g,r[M++]=D.b,r[M]=D.a}}})(ft)),ft}var As;function Un(){return As||(As=1,(function(n){const i=Vs();function l(s,t,c){s.clearRect(0,0,t.width,t.height),t.style||(t.style={}),t.height=c,t.width=c,t.style.height=c+"px",t.style.width=c+"px"}function r(){try{return document.createElement("canvas")}catch{throw new Error("You need to specify a canvas element")}}n.render=function(t,c,o){let u=o,x=c;typeof u>"u"&&(!c||!c.getContext)&&(u=c,c=void 0),c||(x=r()),u=i.getOptions(u);const $=i.getImageWidth(t.modules.size,u),P=x.getContext("2d"),R=P.createImageData($,$);return i.qrToImageData(R.data,t,u),l(P,x,$),P.putImageData(R,0,0),x},n.renderToDataURL=function(t,c,o){let u=o;typeof u>"u"&&(!c||!c.getContext)&&(u=c,c=void 0),u||(u={});const x=n.render(t,c,u),$=u.type||"image/png",P=u.rendererOpts||{};return x.toDataURL($,P.quality)}})(ht)),ht}var pt={},Is;function zn(){if(Is)return pt;Is=1;const n=Vs();function i(s,t){const c=s.a/255,o=t+'="'+s.hex+'"';return c<1?o+" "+t+'-opacity="'+c.toFixed(2).slice(1)+'"':o}function l(s,t,c){let o=s+t;return typeof c<"u"&&(o+=" "+c),o}function r(s,t,c){let o="",u=0,x=!1,$=0;for(let P=0;P<s.length;P++){const R=Math.floor(P%t),y=Math.floor(P/t);!R&&!x&&(x=!0),s[P]?($++,P>0&&R>0&&s[P-1]||(o+=x?l("M",R+c,.5+y+c):l("m",u,0),u=0,x=!1),R+1<t&&s[P+1]||(o+=l("h",$),$=0)):u++}return o}return pt.render=function(t,c,o){const u=n.getOptions(c),x=t.modules.size,$=t.modules.data,P=x+u.margin*2,R=u.color.light.a?"<path "+i(u.color.light,"fill")+' d="M0 0h'+P+"v"+P+'H0z"/>':"",y="<path "+i(u.color.dark,"stroke")+' d="'+r($,x,u.margin)+'"/>',M='viewBox="0 0 '+P+" "+P+'"',H='<svg xmlns="http://www.w3.org/2000/svg" '+(u.width?'width="'+u.width+'" height="'+u.width+'" ':"")+M+' shape-rendering="crispEdges">'+R+y+`</svg>
`;return typeof o=="function"&&o(null,H),H},pt}var Bs;function Fn(){if(Bs)return ke;Bs=1;const n=wn(),i=Dn(),l=Un(),r=zn();function s(t,c,o,u,x){const $=[].slice.call(arguments,1),P=$.length,R=typeof $[P-1]=="function";if(!R&&!n())throw new Error("Callback required as last argument");if(R){if(P<2)throw new Error("Too few arguments provided");P===2?(x=o,o=c,c=u=void 0):P===3&&(c.getContext&&typeof x>"u"?(x=u,u=void 0):(x=u,u=o,o=c,c=void 0))}else{if(P<1)throw new Error("Too few arguments provided");return P===1?(o=c,c=u=void 0):P===2&&!c.getContext&&(u=o,o=c,c=void 0),new Promise(function(y,M){try{const D=i.create(o,u);y(t(D,c,u))}catch(D){M(D)}})}try{const y=i.create(o,u);x(null,t(y,c,u))}catch(y){x(y)}}return ke.create=i.create,ke.toCanvas=s.bind(null,l.render),ke.toDataURL=s.bind(null,l.renderToDataURL),ke.toString=s.bind(null,function(t,c,o){return r.render(t,o)}),ke}var qn=Fn();const _n=Gs(qn);function Y(n){return n==null?"":String(n).replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;")}function h(n){if(n==null||n==="")return"";const l=String(n).split(/\r?\n/),r=s=>{if(!s)return"";try{const t=Intl;if(typeof Intl<"u"&&t.Segmenter){const c=new t.Segmenter("th",{granularity:"word"}),o=[];for(const u of c.segment(s)){const x=u.segment;/^\s+$/.test(x)?o.push(" "):o.push(`<span class="w-seg">${Y(x)}</span>`)}return o.join("")}}catch{}return Y(s)};return l.map(r).join("<br/>")}function Vn(n){try{const i=_n.create(n,{errorCorrectionLevel:"M"}),l=i.modules.size,r=2,s=l+r*2;let t="";for(let o=0;o<l;o++)for(let u=0;u<l;u++)i.modules.get(o,u)&&(t+=`<rect x="${u+r}" y="${o+r}" width="1" height="1" fill="#0f172a"/>`);const c=`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${s} ${s}" width="200" height="200" shape-rendering="crispEdges"><rect width="100%" height="100%" fill="#ffffff"/>${t}</svg>`;return`data:image/svg+xml;utf8,${encodeURIComponent(c)}`}catch{return""}}function Hn(n,i,l){var ye,ie,xe,re,he,G,X,Z,le,Ce,oe,be,Ee;const r=n.type==="supplier",s=n.type==="location",t=r?n:null,c=s?n:null,o=n.type==="drink_store"?n:null,u=r?t.name:s?c.name:o.storeName,x=r?t.chineseName:s?c.foreignName:o.chineseName,$=r?t.category:s?c.locationType==="mall"?"ห้างสรรพสินค้า":c.locationType:o.storeCategory||"เรฟร้านน้ำ",P=r?t.marketOrCity:s?c.location.addressText||c.zoneOrFloor:o.city,R=n.country==="TH"?"ประเทศไทย (TH)":"ประเทศจีน (CN)",y=typeof window<"u"&&window.location.origin&&!window.location.hostname.includes("localhost")&&!window.location.hostname.includes("127.0.0.1")?`${window.location.origin}${window.location.pathname}`:"https://vitcha-sourcing-fxjw.onrender.com/",D=`${y.endsWith("/")?y:`${y}/`}?view=${encodeURIComponent(n.id)}&type=${encodeURIComponent(n.type)}`,H=Vn(D),w=[];t?((ye=t.photos.storefrontAndAtmosphere)==null||ye.forEach((m,p)=>w.push({url:m,label:`ป้ายหน้าร้าน / บรรยากาศ #${p+1}`})),(ie=t.photos.contactCards)==null||ie.forEach((m,p)=>w.push({url:m,label:`นามบัตร / WeChat #${p+1}`})),(xe=t.catalogItems)==null||xe.forEach((m,p)=>{m.photo&&w.push({url:m.photo,label:m.name?`สินค้า: ${m.name}`:`รายการสินค้า #${p+1}`})})):c?((re=c.photos.storefrontAndAtmosphere)==null||re.forEach((m,p)=>w.push({url:m,label:`หน้าร้าน / ทางเดิน #${p+1}`})),(he=c.photos.floorPlanAndSpecs)==null||he.forEach((m,p)=>w.push({url:m,label:`ผังห้อง / งานระบบ #${p+1}`})),(G=c.photos.surroundingNeighbors)==null||G.forEach((m,p)=>w.push({url:m,label:`ร้านข้างเคียง #${p+1}`})),(X=c.photos.contactCards)==null||X.forEach((m,p)=>w.push({url:m,label:`นามบัตร / เอกสารสัญญา #${p+1}`}))):o&&((Z=o.photos.storefrontAndAtmosphere)==null||Z.forEach((m,p)=>w.push({url:m,label:`หน้าร้าน / บรรยากาศ #${p+1}`})),(le=o.photos.menuBoard)==null||le.forEach((m,p)=>w.push({url:m,label:`ป้ายเมนู / ราคา #${p+1}`})),(Ce=o.photos.drinkCups)==null||Ce.forEach((m,p)=>w.push({url:m,label:`แก้วเครื่องดื่ม #${p+1}`})),(oe=o.drinkItems)==null||oe.forEach((m,p)=>{m.photo&&w.push({url:m.photo,label:m.name?`เมนูชิม: ${m.name}`:`แก้วชิม #${p+1}`})}));const U=de(n),S=[];U.forEach((m,p)=>{S.push({label:m.label||`คลิปเสียงหน้างาน #${p+1}`,durationSec:m.durationSec||4,source:"บันทึกเสียงหลักหน้างานจริง"})}),t?(t.catalogItems||[]).forEach((m,p)=>{de(m).forEach((_,Q)=>{S.push({label:_.label||`คลิปเสียงสินค้า #${Q+1}`,durationSec:_.durationSec||4,source:`สินค้า: ${m.name||`รายการที่ #${p+1}`}`})})}):o&&(o.drinkItems||[]).forEach((m,p)=>{de(m).forEach((_,Q)=>{S.push({label:_.label||`คลิปเสียงเมนู #${Q+1}`,durationSec:_.durationSec||4,source:`เมนู: ${m.name||`แก้วที่ #${p+1}`}`})})});const T=Array.isArray(n.videos)?n.videos.filter(Boolean):[],K=((be=w[0])==null?void 0:be.url)||"./logo.jpg",d=Array.isArray(n.viewedBy)?n.viewedBy:[],N=Array.isArray(n.likes)?n.likes:[],b=Array.isArray(n.reviewerNotes)?n.reviewerNotes:[],j=Array.isArray(n.history)?n.history:[],A=j.length>0?j:[{action:"สร้างบันทึกรายการสำรวจ",user:n.creator.alias,userAvatar:n.creator.avatar,timestamp:n.creator.timestamp}],I=`ฉันจะเป็นหัวแถว-${u.replace(/[^a-zA-Z0-9ก-๙_-]/g,"_")}.pdf`,C={awaiting:"พาร์ท 1: รอรับช่วงต่อ",rfq_sent:"พาร์ท 2: ขอสเปก / ส่ง RFQ",sample_test:"พาร์ท 3: ทดสอบตัวอย่าง Lab / R&D",negotiate:"พาร์ท 4: ต่อรองราคา & MOQ",approved:"พาร์ท 5: ตัวเต็งอนุมัติ",ordered:"พาร์ท 6: สั่งซื้อสำเร็จ"}[n.handoffStage||"awaiting"]||"พาร์ท 1: รอรับช่วงต่อ",L=S.length>0?`<div class="media-grid">
          ${S.map((m,p)=>`
              <div class="voice-card">
                <div class="voice-icon">▶</div>
                <div class="voice-meta">
                  <div class="voice-title">${h(`${p+1}. ${m.label}`)}</div>
                  <div class="voice-sub">${h(`${m.source} · ความยาว ${m.durationSec} วินาที`)}</div>
                  <div class="voice-wave">${h("ılıll|ılıl||ılıll|ılı · สแกน QR เพื่อกดฟังเสียงจริง")}</div>
                </div>
              </div>`).join("")}
        </div>`:`<div class="empty-note">${h("ไม่มีไฟล์เสียงบันทึกในรายการนี้")}</div>`,ne=T.length>0?`<div class="video-grid">
          ${T.map((m,p)=>{const _=m.includes("gtv-videos-bucket")?mn:m;return`
              <div class="video-card">
                <div class="video-thumb-wrap">
                  <img
                    id="video-thumb-img-${p}"
                    class="video-thumb-img"
                    src="${Y(K)}"
                    crossorigin="anonymous"
                    data-video-src="${Y(_)}"
                  />
                  <div class="video-overlay-top">
                    <span class="video-chip">VIDEO CLIP #${p+1}</span>
                    <span class="video-chip-right">HD PREVIEW</span>
                  </div>
                  <div class="video-play-circle">▶</div>
                  <div class="video-overlay-bottom">
                    <span>${h(`คลิปวิดีโอที่ ${p+1} · สแกน QR Code ด้านบนเพื่อเปิดเล่นวิดีโอ`)}</span>
                  </div>
                </div>
                <div class="video-caption">
                  <div class="video-caption-title">${h(`คลิปวิดีโอหน้างาน #${p+1} (จากทั้งหมด ${T.length} คลิป)`)}</div>
                  <div class="video-caption-sub">${h("เอกสารกระดาษแสดงภาพ Thumbnail ตัวอย่าง — สแกน QR Code เพื่อรับชมวิดีโอเคลื่อนไหวพร้อมเสียง")}</div>
                </div>
              </div>`}).join("")}
        </div>`:`<div class="empty-note">${h("ไม่มีคลิปวิดีโอในรายการนี้")}</div>`;let J="";if(r&&t){const m=(t.catalogItems||[]).map((p,_)=>{const Q=de(p);return`
        <tr>
          <td style="text-align:center;font-weight:700;">${_+1}</td>
          <td>
            ${p.photo?`<img src="${Y(p.photo)}" crossorigin="anonymous" class="table-thumb" />`:'<div class="table-thumb-empty">ไม่มีรูป</div>'}
          </td>
          <td>
            <div class="cell-title">${h(p.name||`รายการที่ #${_+1}`)}</div>
            ${p.memo?`<div class="cell-sub">${h(p.memo)}</div>`:""}
            ${Q.length>0?`<div class="cell-voice-badge">แนบเสียงบันทึก ${Q.length} คลิป</div>`:""}
          </td>
          <td>
            <div class="cell-text">${h(p.dimensions||"-")}</div>
            <div class="cell-sub">${h(p.weightKg?`น้ำหนัก: ${p.weightKg}`:"")}</div>
          </td>
          <td>
            <div class="cell-price-green">
              ${p.priceRmb?`¥${p.priceRmb.toLocaleString()}`:p.priceThb?`฿${p.priceThb.toLocaleString()}`:"-"}
            </div>
            ${p.priceRmb?`<div class="cell-sub">(≈ ฿${i(p.priceRmb).toLocaleString()})</div>`:""}
          </td>
        </tr>`}).join("");J=`
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
    `}else if(o){const m=(o.drinkItems||[]).map((p,_)=>{const Q=de(p);return`
        <tr>
          <td style="text-align:center;font-weight:700;">${_+1}</td>
          <td>
            ${p.photo?`<img src="${Y(p.photo)}" crossorigin="anonymous" class="table-thumb" />`:'<div class="table-thumb-empty">ไม่มีรูป</div>'}
          </td>
          <td>
            <div class="cell-title">${h(p.name||`แก้วที่ #${_+1}`)}</div>
            ${p.gimmickNotes?`<div class="cell-sub">${h(`กิมมิก: ${p.gimmickNotes}`)}</div>`:""}
            ${Q.length>0?`<div class="cell-voice-badge">แนบเสียงบันทึก ${Q.length} คลิป</div>`:""}
          </td>
          <td>
            <div class="cell-text">${h(p.cupSize||"-")}</div>
          </td>
          <td>
            <div class="cell-text">${h(p.fitMenuTarget||"-")}</div>
          </td>
          <td>
            <div class="cell-price-amber">
              ${p.priceRmb?`¥${p.priceRmb.toLocaleString()}`:p.priceThb?`฿${p.priceThb.toLocaleString()}`:"-"}
            </div>
            ${p.priceRmb?`<div class="cell-sub">(≈ ฿${i(p.priceRmb).toLocaleString()})</div>`:""}
          </td>
        </tr>`}).join("");J=`
      <div class="section-box">
        <div class="section-title">${h(`กลุ่มที่ 3: เมนูที่ชิม & การถอดรหัสสูตร (${(o.drinkItems||[]).length} เมนู)`)}</div>
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
    `}const te=w.length>0?`<div class="photo-grid">
          ${w.map((m,p)=>`
              <div class="photo-card">
                <img src="${Y(m.url)}" crossorigin="anonymous" />
                <div class="photo-caption">${h(`รูปที่ ${p+1}: ${m.label}`)}</div>
              </div>`).join("")}
        </div>`:`<div class="empty-note">${h("ไม่มีรูปภาพในรายการนี้")}</div>`,ue=b.length>0?b.map((m,p)=>`
          <div class="comment-box">
            <div class="comment-header">
              <span class="comment-author">${h(`ความคิดเห็นที่ #${p+1} โดย: ${m.author}`)}</span>
              <span class="comment-time">${Y(new Date(m.timestamp).toLocaleString("th-TH"))}</span>
            </div>
            <div class="comment-body">${h(m.text)}</div>
            ${m.photoUrl?`<div style="margin-top:6px;"><img src="${Y(m.photoUrl)}" crossorigin="anonymous" style="width:96px;height:96px;object-fit:cover;border-radius:6px;border:1px solid #cbd5e1;" /></div>`:""}
            ${m.voiceUrl?`<div class="cell-voice-badge" style="margin-top:4px;">${h("มีไฟล์เสียงแนบในความคิดเห็นนี้ (สแกน QR เพื่อฟัง)")}</div>`:""}
            ${m.replies&&m.replies.length>0?`<div class="reply-list">
                    ${m.replies.map(_=>`
                        <div class="reply-item">
                          <div class="comment-header">
                            <span class="comment-author">${h(`ตอบกลับโดย: ${_.author}${_.replyToAuthor?` (ถึง @${_.replyToAuthor})`:""}`)}</span>
                            <span class="comment-time">${Y(new Date(_.timestamp).toLocaleString("th-TH"))}</span>
                          </div>
                          <div class="comment-body">${h(_.text)}</div>
                          ${_.photoUrl?`<div style="margin-top:6px;"><img src="${Y(_.photoUrl)}" crossorigin="anonymous" style="width:80px;height:80px;object-fit:cover;border-radius:6px;border:1px solid #cbd5e1;" /></div>`:""}
                          ${_.voiceUrl?`<div class="cell-voice-badge" style="margin-top:4px;">${h("มีไฟล์เสียงแนบในคำตอบนี้")}</div>`:""}
                        </div>`).join("")}
                  </div>`:""}
          </div>`).join(""):`<div class="empty-note">${h("ยังไม่มีความคิดเห็นในรายการนี้")}</div>`,pe=A.map((m,p)=>{const _=m.action==="handoff"?"อัปเดตสถานะการส่งต่องาน (Handoff)":m.action==="comment"?"เพิ่มความคิดเห็นในรายการ":m.action==="reply"?"ตอบกลับความคิดเห็น":m.action;return`
      <tr>
        <td style="text-align:center;font-weight:700;">${p+1}</td>
        <td><div class="cell-title">${h(m.user)}</div></td>
        <td><div class="cell-text">${h(_)}</div></td>
        <td><div class="cell-sub">${Y(new Date(m.timestamp).toLocaleString("th-TH"))}</div></td>
      </tr>`}).join(""),me=d.length>0?`<table class="data-table" style="margin-top:10px;">
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
            ${d.map((m,p)=>`
              <tr>
                <td style="text-align:center;">${p+1}</td>
                <td><div class="cell-title">${h(`${m.alias} (${m.name})`)}</div></td>
                <td><div class="cell-text">${Y(m.role.toUpperCase())}</div></td>
                <td><div class="cell-sub">${Y(new Date(m.lastViewedAt).toLocaleString("th-TH"))}</div></td>
                <td style="text-align:center;font-weight:700;">${h(`${m.viewCount||1} ครั้ง`)}</td>
              </tr>`).join("")}
          </tbody>
        </table>`:`<div class="empty-note" style="margin-top:8px;">${h("ยังไม่มีประวัติผู้เปิดอ่านเพิ่มเติม")}</div>`,ge=r?`คะแนนประเมิน ${(t==null?void 0:t.rating)||5}/5 ดาว (${t!=null&&t.isFactory?"โรงงานผลิต":"หน้าร้าน/โชว์รูม"})`:`รสชาติ ${o==null?void 0:o.ratings.taste}/5 · ดีไซน์ ${o==null?void 0:o.ratings.aesthetics}/5 · คุ้มค่า ${o==null?void 0:o.ratings.value}/5 · ความไว ${o==null?void 0:o.ratings.speed}/5`;return`<!DOCTYPE html>
<html lang="th">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=840, initial-scale=0.45, minimum-scale=0.3, maximum-scale=2.0, user-scalable=yes" />
  <title>ฉันจะเป็นหัวแถว - ${Y(u)}</title>
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
      <strong style="font-size:14px;">รายงานสรุปฉบับสมบูรณ์: ${Y(u)}</strong>
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
          <div class="badge">${h(`${r?"รายงานซัพพลายเออร์ & โรงงาน":"รายงานเรฟร้านน้ำ & R&D"} · ${R}`)}</div>
          <h1 class="brand-title">${h(u)}</h1>
          <div class="brand-sub">${h(`${x?`${x} · `:""}หมวดหมู่: ${$}`)}</div>

          <!-- At-a-glance Multimedia & Detail Counter Pills -->
          <div class="summary-pills">
            <span class="summary-pill">${h(`รูปภาพ ${w.length} รูป`)}</span>
            <span class="summary-pill">${h(`วอยซ์เสียง ${S.length} คลิป`)}</span>
            <span class="summary-pill">${h(`วิดีโอ ${T.length} คลิป`)}</span>
            <span class="summary-pill">${h(r?`สินค้า ${((t==null?void 0:t.catalogItems)||[]).length} รายการ`:`เมนูชิม ${((o==null?void 0:o.drinkItems)||[]).length} เมนู`)}</span>
            <span class="summary-pill">${h(`คอมเมนต์ ${b.length} หัวข้อ`)}</span>
            <span class="summary-pill">${h(`ประวัติ Log ${A.length} รายการ`)}</span>
          </div>

          <div class="direct-link-bar">
            <div class="info-label" style="color:#0f172a;margin-bottom:2px;">Direct Link (Scan QR / LINE Share):</div>
            <div style="color:#059669;font-family:monospace;font-size:10px;word-break:break-all;">${Y(D)}</div>
          </div>
        </div>

        <div class="header-right">
          <div class="meta-box">
            <div class="meta-platform">${h("ฉันจะเป็นหัวแถว")}</div>
            <div>LEAD THE FRONT · VITCHA R&amp;D</div>
            <div style="margin-top:4px;">${h(`รหัส: ${n.id.slice(0,18)}`)}</div>
            <div>${h(`สถานะ: ${C}`)}</div>
            <div>${h(`ออกรายงาน: ${new Date().toLocaleString("th-TH")}`)}</div>
          </div>

          ${H?`<div class="qr-card">
                  <img id="report-qr-img" src="${H}" alt="QR Code" />
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
            <span class="info-value">${h(`${u}${x?` (${x})`:""}`)}</span>
          </div>
          <div class="info-item">
            <span class="info-label">${h("หมวดหมู่ & คะแนนประเมิน")}</span>
            <span class="info-value">${h(`${$} · ${ge}`)}</span>
          </div>
          <div class="info-item">
            <span class="info-label">${h("สถานที่ / ตลาด / เมือง")}</span>
            <span class="info-value">${h(P||((Ee=n.location)==null?void 0:Ee.addressText)||"-")}</span>
          </div>
          <div class="info-item">
            <span class="info-label">${h("พิกัด GPS & แผนที่")}</span>
            <span class="info-value">${n.location?`${n.location.lat.toFixed(5)}, ${n.location.lng.toFixed(5)} (${Y(n.location.addressText||"พิกัดหน้างาน")})`:"-"}</span>
          </div>
          <div class="info-item">
            <span class="info-label">${h("ช่องทางติดต่อ (WeChat / LINE / โทรศัพท์)")}</span>
            <span class="info-value">${h(`WeChat: ${(r?t==null?void 0:t.wechatId:o==null?void 0:o.wechatId)||"-"} | LINE: ${(r?t==null?void 0:t.lineId:o==null?void 0:o.lineId)||"-"} | โทร: ${(r?t==null?void 0:t.phone:o==null?void 0:o.phone)||"-"}`)}</span>
          </div>
          <div class="info-item">
            <span class="info-label">${h("ผู้ลงพื้นที่สำรวจ & เวลาที่บันทึก")}</span>
            <span class="info-value">${h(`${n.creator.alias}${n.creator.name&&n.creator.name!==n.creator.alias?` (${n.creator.name})`:""} · ${new Date(n.creator.timestamp).toLocaleString("th-TH")}`)}</span>
          </div>
          <div class="info-item">
            <span class="info-label">${h("ผู้รับผิดชอบรับช่วงต่อ & กำหนดติดตาม")}</span>
            <span class="info-value">${h(`${n.assignedTo||"ยังไม่ระบุผู้รับผิดชอบ"} · กำหนดติดตาม: ${n.targetFollowUpDate||"-"}`)}</span>
          </div>
          <div class="info-item">
            <span class="info-label">${h("การมีส่วนร่วมของทีม (Likes & Views)")}</span>
            <span class="info-value">${h(`กดถูกใจ ${N.length} คน · เปิดอ่านแล้ว ${d.length} คน`)}</span>
          </div>
        </div>

        ${(r?t!=null&&t.memo:o!=null&&o.tastingNotes)?`<div class="note-banner">
                <div class="note-banner-title">${h(r?"บันทึกภาพรวมหน้างาน / รายละเอียดสเปกหลัก:":"บันทึกรีวิวรสชาติ & ไอเดียเรฟหน้างาน:")}</div>
                <div class="note-banner-body">${h(r?t==null?void 0:t.memo:o==null?void 0:o.tastingNotes)}</div>
              </div>`:""}

        ${n.handoffNotes?`<div class="handoff-banner">
                <div class="handoff-banner-title">${h("โน้ตการส่งมอบงาน / ผลเจรจาทีมไทย:")}</div>
                <div class="note-banner-body">${h(n.handoffNotes)}</div>
              </div>`:""}
      </div>

      <!-- Group 2: Voice Recordings & Video Clips with Thumbnail Previews -->
      <div class="section-box">
        <div class="section-title">${h(`กลุ่มที่ 2: สื่อมัลติมีเดียหน้างาน — วอยซ์เสียงบันทึก (${S.length} คลิป) & วิดีโอ (${T.length} คลิป)`)}</div>
        <div class="media-subhead">${h(`ไฟล์เสียงบันทึกหน้างานจริง (${S.length} คลิป):`)}</div>
        ${L}
        <div class="media-subhead" style="margin-top:10px;">${h(`คลิปวิดีโอหน้างานพร้อมภาพ Thumbnail พรีวิว (${T.length} คลิป):`)}</div>
        ${ne}
      </div>

      <!-- Group 3: Catalog / Drink Items -->
      ${J}

      <!-- Group 4: All Photos of This Item -->
      <div class="section-box">
        <div class="section-title">${h(`กลุ่มที่ 4: แกลเลอรีภาพถ่ายทั้งหมดของรายการนี้ (${w.length} รูป)`)}</div>
        ${te}
      </div>

      <!-- Group 5: All Threaded Comments & Replies -->
      <div class="section-box">
        <div class="section-title">${h(`กลุ่มที่ 5: บันทึกความคิดเห็นและการตอบกลับทั้งหมด (${b.length} หัวข้อสนทนา)`)}</div>
        ${ue}
      </div>

      <!-- Group 6: Activity & Handoff Log + Viewer Log -->
      <div class="section-box">
        <div class="section-title">${h(`กลุ่มที่ 6: ประวัติการดำเนินงาน (${A.length} รายการ) & ผู้เปิดอ่าน (${d.length} คน)`)}</div>
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
          <tbody>${pe}</tbody>
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
          filename: ${JSON.stringify(I)},
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
</html>`}function Ps(n,i,l){const r=Hn(n,i,l),s=window.open("","_blank");if(s)s.document.open(),s.document.write(r),s.document.close();else{const t=new Blob([r],{type:"text/html;charset=utf-8"}),c=URL.createObjectURL(t),o=document.createElement("a");o.href=c,o.target="_blank",o.click()}}const Gn=({item:n,isOpen:i,onClose:l,onShareToLine:r})=>{var jt,Nt,$t,kt,Ct,Et,Rt,St,Tt,At,It,Bt,Pt,Lt,Mt,Dt,Ut,zt,Ft,qt,_t,Vt,Ht,Ot,Kt,Qt,Gt,Jt,Yt,Wt,Zt,Xt,es,ts,ss;const{currentUser:s,convertCnyToThb:t,addReviewerNote:c,addReviewReply:o,updatePipelineStatus:u,toggleLikeItem:x,suppliers:$,drinkStores:P,locations:R,users:y,quickMessages:M,recordItemView:D,canEditItems:H,canComment:w,openEditItem:U}=Js(),S=n&&n.type==="supplier"?$.find(a=>a.id===n.id):null,T=n&&n.type==="drink_store"?P.find(a=>a.id===n.id):null,K=n&&n.type==="location"?R.find(a=>a.id===n.id):null,d=S||T||K||n,[N,b]=ee.useState(null),[j,A]=ee.useState(""),[I,B]=ee.useState(!1),[C,L]=ee.useState(null),ne=ve.useRef(null),J=ve.useRef(null),[te,ue]=ee.useState(null),[pe,me]=ee.useState({}),[ge,ye]=ee.useState({}),[ie,xe]=ee.useState(null),[re,he]=ee.useState(null),[G,X]=ee.useState(!1),[Z,le]=ee.useState({}),Ce=ve.useRef(null),[oe,be]=ee.useState(null),[Ee,m]=ee.useState(0),p=ve.useRef(null),_=ve.useRef(null),Q=ve.useRef(null),gt=ve.useRef(0),xt=ve.useCallback(()=>{var a;if(Q.current&&(clearInterval(Q.current),Q.current=null),p.current&&p.current.state==="recording"){p.current.stop();return}(a=_.current)==null||a.getTracks().forEach(f=>f.stop()),_.current=null,be(null)},[]);ee.useEffect(()=>(i&&(n!=null&&n.id)&&D(n.id,n.type),b(null),B(!1),L(null),()=>{var a,f;Q.current&&clearInterval(Q.current),((a=p.current)==null?void 0:a.state)==="recording"&&p.current.stop(),(f=_.current)==null||f.getTracks().forEach(g=>g.stop())}),[i,n==null?void 0:n.id]);const q=[];if(d){if(d.type==="supplier"){const a=d;(jt=a.photos.storefrontAndAtmosphere)==null||jt.forEach((f,g)=>q.push({url:f,label:`ป้ายหน้าร้าน/บรรยากาศ #${g+1}`})),(Nt=a.photos.contactCards)==null||Nt.forEach((f,g)=>q.push({url:f,label:`นามบัตร/WeChat #${g+1}`})),($t=a.catalogItems)==null||$t.forEach((f,g)=>{f.photo&&q.push({url:f.photo,label:f.name?`สินค้า: ${f.name}`:`รายการสินค้า #${g+1}`})})}else if(d.type==="drink_store"){const a=d;(kt=a.photos.storefrontAndAtmosphere)==null||kt.forEach((f,g)=>q.push({url:f,label:`หน้าร้าน/บรรยากาศ #${g+1}`})),(Ct=a.photos.menuBoard)==null||Ct.forEach((f,g)=>q.push({url:f,label:`เมนูบอร์ด #${g+1}`})),(Et=a.photos.drinkCups)==null||Et.forEach((f,g)=>q.push({url:f,label:`แก้วเครื่องดื่ม #${g+1}`})),(Rt=a.drinkItems)==null||Rt.forEach((f,g)=>{f.photo&&q.push({url:f.photo,label:f.name?`เมนู: ${f.name}`:`เมนูชิม #${g+1}`})})}else if(d.type==="location"){const a=d;(St=a.photos.storefrontAndAtmosphere)==null||St.forEach((f,g)=>q.push({url:f,label:`หน้าร้าน/ทางเดิน #${g+1}`})),(Tt=a.photos.floorPlanAndSpecs)==null||Tt.forEach((f,g)=>q.push({url:f,label:`ผังห้อง/งานระบบ #${g+1}`})),(At=a.photos.surroundingNeighbors)==null||At.forEach((f,g)=>q.push({url:f,label:`ร้านข้างเคียง #${g+1}`})),(It=a.photos.contactCards)==null||It.forEach((f,g)=>q.push({url:f,label:`นามบัตร/เอกสาร #${g+1}`}))}}if(ee.useEffect(()=>{if(N===null||q.length===0)return;const a=f=>{f.key==="ArrowRight"?b(g=>g!==null?(g+1)%q.length:null):f.key==="ArrowLeft"?b(g=>g!==null?(g-1+q.length)%q.length:null):f.key==="Escape"&&b(null)};return window.addEventListener("keydown",a),()=>window.removeEventListener("keydown",a)},[N,q.length]),!i||!d)return null;const O=d.type==="supplier",Hs=d.type==="drink_store",se=d.type==="location",k=O?d:null,E=Hs?d:null,v=se?d:null,Ae=Array.isArray(d.likes)?d.likes:[],bt=Ae.some(a=>a.userId===s.id),vt=a=>{const f=q.findIndex(g=>g.url===a);b(f>=0?f:0)},ze=async(a,f,g)=>{try{X(!0);const V=await pn(a,{recordId:d.id,recordType:d.type,recordTitle:O?k==null?void 0:k.name:se?v==null?void 0:v.name:E==null?void 0:E.storeName});g?le(F=>({...F,[g]:{...F[g],...f==="photo"?{photoUrl:V}:{voiceUrl:V}}})):f==="photo"?xe(V):he(V)}catch(V){alert(V.message||"อัปโหลดไฟล์แนบไม่สำเร็จ")}finally{X(!1)}},wt=async a=>{var f,g;if(oe===a){xt();return}oe&&xt();try{if(!((f=navigator.mediaDevices)!=null&&f.getUserMedia)||typeof MediaRecorder>"u"){alert("เบราว์เซอร์นี้ไม่รองรับการอัดเสียงสด กรุณาเปิดผ่าน HTTPS หรืออนุญาตไมโครโฟน");return}const V=await navigator.mediaDevices.getUserMedia({audio:!0});_.current=V;const F=["audio/mp4","audio/webm;codecs=opus","audio/webm","audio/ogg"].find(W=>MediaRecorder.isTypeSupported(W)),ae=new MediaRecorder(V,F?{mimeType:F}:void 0);p.current=ae;const fe=[];ae.ondataavailable=W=>{W.data.size>0&&fe.push(W.data)},ae.onstop=()=>{var Re;Q.current&&(clearInterval(Q.current),Q.current=null),V.getTracks().forEach(Pe=>Pe.stop()),_.current=null,be(null);const W=((Re=ae.mimeType)==null?void 0:Re.split(";")[0])||"audio/webm",z=new Blob(fe,{type:W});if(!z.size)return;const qe=W.includes("mp4")?"m4a":W.includes("ogg")?"ogg":"webm",Be=new File([z],`เสียงคอมเมนต์-${Date.now()}.${qe}`,{type:W});ze(Be,"audio",a==="main"?void 0:a)},ae.onerror=()=>{Q.current&&clearInterval(Q.current),V.getTracks().forEach(W=>W.stop()),be(null),alert("อัดเสียงไม่สำเร็จ กรุณาลองใหม่")},gt.current=Date.now(),m(0),be(a),ae.start(250),Q.current=setInterval(()=>{m(Math.round((Date.now()-gt.current)/1e3))},1e3)}catch{(g=_.current)==null||g.getTracks().forEach(V=>V.stop()),be(null),alert("ไม่ได้รับสิทธิ์ใช้ไมโครโฟน กรุณากดอนุญาตไมโครโฟนเพื่ออัดเสียงสด")}},Os=async a=>{a.preventDefault();const f=j.trim();!f&&!ie&&!re||!await c(d.id,d.type,f,{photoUrl:ie||void 0,voiceUrl:re||void 0})||(A(""),xe(null),he(null))},yt=async(a,f,g)=>{const V=(pe[a]||"").trim(),F=Z[a];!V&&!(F!=null&&F.photoUrl)&&!(F!=null&&F.voiceUrl)||!await o(d.id,d.type,a,V,f,{photoUrl:F==null?void 0:F.photoUrl,voiceUrl:F==null?void 0:F.voiceUrl,replyToId:g})||(me({...pe,[a]:""}),le(fe=>({...fe,[a]:{}})),ue(null))},Ks=a=>{k&&u(k.id,a)},Ie=de(d),Qs=((Bt=Ie[0])==null?void 0:Bt.url)||(O?k==null?void 0:k.voiceNoteUrl:E==null?void 0:E.voiceNoteUrl)||((O?k!=null&&k.voiceDurationSec:E!=null&&E.voiceDurationSec)?_e(4):void 0),Fe=(a,f)=>{J.current&&(C===a?(J.current.pause(),L(null)):(J.current.src=f||_e(4),J.current.play().then(()=>L(a)).catch(()=>{J.current&&(J.current.src=_e(4),J.current.play(),L(a))})))};return e.jsxs("div",{className:"fixed inset-0 z-[90] bg-black/45 backdrop-blur-sm flex items-center justify-center p-2 sm:p-4 overflow-y-auto",children:[e.jsxs("div",{className:"bg-white border border-slate-200/90 w-full max-w-3xl rounded-2xl shadow-2xl overflow-hidden my-auto animate-in zoom-in-95 max-h-[94vh] flex flex-col text-slate-900",children:[e.jsxs("div",{className:"p-3.5 sm:p-4 border-b border-slate-100 space-y-2.5 bg-white sticky top-0 z-10",children:[e.jsxs("div",{className:"flex items-start justify-between gap-2.5",children:[e.jsxs("div",{className:"flex items-start gap-2.5 min-w-0 flex-1",children:[e.jsx("span",{className:`p-2 rounded-xl shrink-0 mt-0.5 ${O?"bg-emerald-50 text-emerald-700":se?"bg-sky-50 text-sky-700":"bg-amber-50 text-amber-700"}`,children:O?e.jsx(Ys,{className:"w-4 h-4 sm:w-5 sm:h-5 text-emerald-600"}):se?e.jsx("i",{"aria-hidden":"true",className:"fa-solid fa-map-location-dot text-base text-sky-600"}):e.jsx(Ws,{className:"w-4 h-4 sm:w-5 sm:h-5 text-amber-600"})}),e.jsxs("div",{className:"min-w-0 flex-1",children:[e.jsx("h2",{className:"font-extrabold text-slate-900 text-sm sm:text-base leading-snug break-words",children:O?k==null?void 0:k.name:se?v==null?void 0:v.name:E==null?void 0:E.storeName}),e.jsx("p",{className:"text-xs text-slate-400 truncate mt-0.5",children:O?(k==null?void 0:k.chineseName)||(k==null?void 0:k.marketOrCity):se?(v==null?void 0:v.zoneOrFloor)||(v==null?void 0:v.foreignName):(E==null?void 0:E.chineseName)||(E==null?void 0:E.storeCategory)||(E==null?void 0:E.brandConcept)})]})]}),e.jsx("button",{type:"button",onClick:l,className:"w-7 h-7 sm:w-8 sm:h-8 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-600 transition-all active:scale-95 flex items-center justify-center shrink-0",title:"ปิดหน้าต่าง",children:e.jsx($e,{className:"w-4 h-4"})})]}),e.jsxs("div",{className:"flex items-center gap-1.5 flex-wrap pt-2 border-t border-slate-100",children:[H&&e.jsxs("button",{type:"button",onClick:()=>U(d),className:"px-2.5 py-1 rounded-lg bg-amber-50 hover:bg-amber-100 text-amber-800 border border-amber-200/90 text-[11px] font-bold active:scale-95 transition-all inline-flex items-center gap-1",title:"แก้ไขข้อมูลรายการนี้ (Admin / Editor)",children:[e.jsx(ns,{className:"w-3 h-3 text-amber-600"}),e.jsx("span",{children:"แก้ไข"})]}),e.jsxs("button",{type:"button",onClick:()=>x(d.id,d.type),className:`px-2.5 py-1 rounded-lg border transition-all active:scale-95 inline-flex items-center gap-1 text-[11px] font-bold ${bt?"bg-blue-50 text-blue-700 border-blue-200":"bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100"}`,title:`ถูกใจ (${Ae.length})`,children:[e.jsx(Zs,{className:`w-3 h-3 ${bt?"fill-blue-600 text-blue-600":""}`}),e.jsxs("span",{children:["ถูกใจ",Ae.length>0?` (${Ae.length})`:""]})]}),e.jsxs("button",{type:"button",onClick:()=>r(d),className:"px-2.5 py-1 rounded-lg bg-[#06C755] hover:bg-[#05b34c] text-white text-[11px] font-bold transition-all active:scale-95 inline-flex items-center gap-1",title:"แชร์ลิงก์เข้า LINE",children:[e.jsx(Xs,{className:"w-3 h-3"}),e.jsx("span",{children:"แชร์ LINE"})]}),e.jsxs("button",{type:"button",onClick:()=>Ps(d,t,"pdf"),className:"px-2.5 py-1 rounded-lg bg-slate-900 hover:bg-slate-800 text-white text-[11px] font-bold transition-all active:scale-95 inline-flex items-center gap-1",title:"ดาวน์โหลดรายงานเป็นไฟล์ PDF",children:[e.jsx(xn,{className:"w-3 h-3 text-emerald-400"}),e.jsx("span",{children:"ดาวน์โหลด PDF"})]}),e.jsxs("button",{type:"button",onClick:()=>Ps(d,t,"print"),className:"px-2.5 py-1 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 text-[11px] font-bold transition-all border border-slate-200/80 active:scale-95 inline-flex items-center gap-1",title:"พิมพ์รายงานฉบับจัดหน้าสวยงาม (Print)",children:[e.jsx(vn,{className:"w-3 h-3 text-slate-600"}),e.jsx("span",{children:"พิมพ์"})]})]})]}),e.jsxs("div",{className:"p-4 sm:p-6 space-y-4 overflow-y-auto flex-1",children:[e.jsxs("div",{className:"flex flex-wrap items-center justify-between gap-2 p-3 bg-slate-50 rounded-xl border border-slate-100 text-xs",children:[e.jsxs("div",{className:"flex items-center gap-2.5",children:[e.jsx(Le,{src:d.creator.avatar,alt:d.creator.alias,className:"w-8 h-8 rounded-full object-cover ring-2 ring-emerald-500/20 shadow-xs"}),e.jsxs("div",{children:[e.jsx("div",{className:"text-slate-800 font-bold flex items-center gap-1.5",children:e.jsxs("span",{children:["ผู้ลงพื้นที่สำรวจ: ",d.creator.alias,d.creator.name&&d.creator.name!==d.creator.alias?` (${d.creator.name})`:""]})}),e.jsxs("div",{className:"text-[11px] text-slate-400 font-mono",children:["บันทึกเมื่อ: ",new Date(d.creator.timestamp).toLocaleString("th-TH")]})]})]}),e.jsxs("div",{className:"flex items-center gap-2 flex-wrap",children:[e.jsx(en,{viewedBy:d.viewedBy,size:"md"}),O&&k&&e.jsxs("div",{className:"flex items-center gap-1.5",children:[e.jsx("span",{className:"text-[11px] text-slate-500",children:"สถานะ:"}),e.jsxs("select",{value:k.status,onChange:a=>Ks(a.target.value),className:"bg-white border border-slate-200 text-slate-800 text-xs font-bold rounded-lg px-2.5 py-1 focus:outline-none focus:border-emerald-500",children:[e.jsx("option",{value:"scouted",children:"1. สำรวจแล้ว"}),e.jsx("option",{value:"reviewing",children:"2. เทียบสเปก"}),e.jsx("option",{value:"rfq_sent",children:"3. ส่ง RFQ"}),e.jsx("option",{value:"shortlisted",children:"4. ตัวเต็ง (Shortlist)"}),e.jsx("option",{value:"ordered",children:"5. สั่งซื้อแล้ว (Ordered)"})]})]})]})]}),Ie.length>0&&e.jsxs("div",{className:"p-3 bg-emerald-50/70 border border-emerald-200/80 rounded-xl space-y-2",children:[e.jsxs("div",{className:"text-xs font-bold text-emerald-950 flex items-center justify-between",children:[e.jsxs("span",{className:"flex items-center gap-1.5",children:[e.jsx(Ve,{className:"w-3.5 h-3.5 text-emerald-600"}),e.jsxs("span",{children:["วอยซ์เสียงบันทึกหน้างานจริง (",Ie.length," คลิป)"]})]}),e.jsx("span",{className:"text-[10px] font-mono text-emerald-700",children:"แตะ ▶ เพื่อฟังแต่ละคลิป"})]}),e.jsx("div",{className:"grid grid-cols-1 sm:grid-cols-2 gap-2",children:Ie.map((a,f)=>{const g=C===`main-${a.id||f}`;return e.jsx("div",{className:"p-2 bg-white border border-emerald-200 rounded-xl flex items-center justify-between gap-2 shadow-2xs",children:e.jsxs("div",{className:"flex items-center gap-2.5 min-w-0",children:[e.jsx("button",{type:"button",onClick:()=>Fe(`main-${a.id||f}`,a.url),className:"w-8 h-8 rounded-full bg-emerald-600 hover:bg-emerald-700 text-white flex items-center justify-center shadow-xs transition-colors shrink-0",children:g?e.jsx(He,{className:"w-3.5 h-3.5"}):e.jsx(Oe,{className:"w-3.5 h-3.5 ml-0.5"})}),e.jsxs("div",{className:"min-w-0",children:[e.jsx("div",{className:"text-xs font-bold text-slate-900 truncate",children:a.label||`คลิปเสียง #${f+1}`}),e.jsxs("div",{className:"text-[10px] text-emerald-700 font-mono",children:[a.durationSec||4," วินาที ·"," ",g?"กำลังเล่น...":"แตะเพื่อฟัง"]})]})]})},a.id||f)})}),e.jsx("audio",{ref:ne,src:Qs,onEnded:()=>B(!1),className:"hidden"})]}),e.jsxs("div",{className:"p-3 bg-slate-50 rounded-xl border border-slate-100 space-y-2 text-xs",children:[e.jsx("div",{className:"flex flex-wrap items-center gap-1.5",children:O&&k?e.jsxs(e.Fragment,{children:[e.jsxs("span",{className:"px-2.5 py-1 rounded-lg bg-emerald-600 text-white text-[11px] font-bold inline-flex items-center gap-1",children:[e.jsx("i",{className:"fa-solid fa-industry text-[10px]"}),e.jsx("span",{children:k.category})]}),e.jsx("span",{className:"px-2 py-1 rounded-lg bg-white border border-slate-200 text-slate-700 text-[11px] font-bold",children:k.isFactory?"โรงงานผลิต":"หน้าร้าน / โชว์รูม"}),e.jsxs("span",{className:"px-2 py-1 rounded-lg bg-amber-50 border border-amber-200 text-amber-700 text-[11px] font-mono font-bold inline-flex items-center gap-1",children:[e.jsx("i",{className:"fa-solid fa-star text-[10px] text-amber-500"}),e.jsxs("span",{children:[k.rating||5,"/5"]})]}),(k.quickTags||[]).map((a,f)=>e.jsxs("span",{className:"px-2 py-1 rounded-lg bg-white border border-slate-200 text-slate-700 text-[11px] font-semibold",children:["#",a]},f))]}):E?e.jsxs(e.Fragment,{children:[e.jsxs("span",{className:"px-2.5 py-1 rounded-lg bg-amber-600 text-white text-[11px] font-bold inline-flex items-center gap-1",children:[e.jsx("i",{className:"fa-solid fa-mug-hot text-[10px]"}),e.jsx("span",{children:E.storeCategory||"เรฟร้านน้ำ"})]}),E.ratings&&e.jsxs("span",{className:"px-2 py-1 rounded-lg bg-amber-50 border border-amber-200 text-amber-800 text-[11px] font-mono font-bold inline-flex items-center gap-1",children:[e.jsx("i",{className:"fa-solid fa-star text-[10px] text-amber-500"}),e.jsx("span",{children:((E.ratings.taste+E.ratings.aesthetics+E.ratings.value+E.ratings.speed)/4).toFixed(1)})]})]}):se&&v?e.jsxs(e.Fragment,{children:[e.jsxs("span",{className:"px-2.5 py-1 rounded-lg bg-sky-600 text-white text-[11px] font-bold inline-flex items-center gap-1",children:[e.jsx("i",{className:"fa-solid fa-map-location-dot text-[10px]"}),e.jsx("span",{children:v.locationType==="mall"?"ห้างสรรพสินค้า":v.locationType})]}),e.jsxs("span",{className:"px-2 py-1 rounded-lg bg-white border border-slate-200 text-slate-700 text-[11px] font-bold",children:["ผัง ",((Pt=v.spaceSpecs)==null?void 0:Pt.layoutFormat)||"Inline"]}),v.ratings&&e.jsxs("span",{className:"px-2 py-1 rounded-lg bg-amber-50 border border-amber-200 text-amber-800 text-[11px] font-mono font-bold inline-flex items-center gap-1",children:[e.jsx("i",{className:"fa-solid fa-star text-[10px] text-amber-500"}),e.jsx("span",{children:((v.ratings.footTraffic+v.ratings.visibility+v.ratings.accessibility+v.ratings.valueRoi)/4).toFixed(1)})]}),(v.quickTags||[]).map((a,f)=>e.jsxs("span",{className:"px-2 py-1 rounded-lg bg-white border border-slate-200 text-slate-700 text-[11px] font-semibold",children:["#",a]},f))]}):null}),e.jsxs("div",{className:"flex flex-wrap items-center justify-between gap-2 pt-1.5 border-t border-slate-200/60 text-[11px] text-slate-600",children:[e.jsxs("div",{className:"flex flex-wrap items-center gap-2",children:[e.jsxs("span",{className:"inline-flex items-center gap-1 font-semibold text-slate-800",children:[e.jsx(tn,{className:"w-3.5 h-3.5 text-sky-600 shrink-0"}),e.jsx("span",{children:O?(k==null?void 0:k.marketOrCity)||(k==null?void 0:k.address)||((Lt=k==null?void 0:k.location)==null?void 0:Lt.addressText):se?((Mt=v==null?void 0:v.location)==null?void 0:Mt.addressText)||(v==null?void 0:v.zoneOrFloor):((Dt=E==null?void 0:E.location)==null?void 0:Dt.addressText)||(E==null?void 0:E.city)})]}),(O?k==null?void 0:k.wechatId:se?(Ut=v==null?void 0:v.leaseTerms)==null?void 0:Ut.contactLineWechat:E==null?void 0:E.wechatId)&&e.jsxs("span",{className:"px-2 py-0.5 rounded bg-white border border-slate-200 font-mono",children:["LINE/WeChat: ",O?k==null?void 0:k.wechatId:se?(zt=v==null?void 0:v.leaseTerms)==null?void 0:zt.contactLineWechat:E==null?void 0:E.wechatId]}),(O?k==null?void 0:k.phone:se?(Ft=v==null?void 0:v.leaseTerms)==null?void 0:Ft.contactPhone:E==null?void 0:E.phone)&&e.jsxs("span",{className:"px-2 py-0.5 rounded bg-white border border-slate-200 font-mono",children:["โทร: ",O?k==null?void 0:k.phone:se?(qt=v==null?void 0:v.leaseTerms)==null?void 0:qt.contactPhone:E==null?void 0:E.phone]}),se&&((_t=v==null?void 0:v.leaseTerms)==null?void 0:_t.contactPerson)&&e.jsxs("span",{className:"px-2 py-0.5 rounded bg-white border border-slate-200",children:["ผู้ติดต่อ: ",v.leaseTerms.contactPerson]})]}),(Vt=d.location)!=null&&Vt.lat&&((Ht=d.location)!=null&&Ht.lng)&&(d.location.lat!==0||d.location.lng!==0)?e.jsx("a",{href:`https://www.google.com/maps?q=${d.location.lat},${d.location.lng}`,target:"_blank",rel:"noreferrer",className:"text-[11px] font-bold text-sky-700 hover:underline shrink-0",children:"เปิด Google Maps ↗"}):e.jsx("span",{className:"text-[10px] text-slate-400 font-medium shrink-0",children:"📍 ยังไม่ได้ระบุพิกัด GPS"})]})]}),se&&v&&e.jsxs("div",{className:"p-3.5 rounded-xl border border-sky-200 bg-sky-50/50 space-y-3",children:[e.jsxs("div",{className:"text-[11px] font-bold text-sky-900 flex items-center justify-between",children:[e.jsxs("span",{className:"flex items-center gap-1.5",children:[e.jsx(sn,{className:"w-3.5 h-3.5 text-sky-600"}),e.jsx("span",{children:"สเปกพื้นที่ & เงื่อนไขสัญญาเช่า (Location Scouting Specs)"})]}),e.jsxs("span",{className:"text-[10px] px-2 py-0.5 rounded-full bg-white text-sky-800 font-mono font-bold border border-sky-200",children:[v.zoneOrFloor," ",v.unitNumber?`(${v.unitNumber})`:""]})]}),e.jsxs("div",{className:"grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs",children:[e.jsxs("div",{className:"bg-white p-2 rounded-lg border border-slate-200 text-center",children:[e.jsx("div",{className:"text-[10px] text-slate-500 font-bold",children:"ขนาดพื้นที่"}),e.jsxs("div",{className:"font-extrabold text-sm text-slate-900 font-mono mt-0.5",children:[((Ot=v.spaceSpecs)==null?void 0:Ot.usableAreaSqm)||"-"," ",e.jsx("span",{className:"text-[10px] font-normal text-slate-500",children:"ตร.ม."})]})]}),e.jsxs("div",{className:"bg-white p-2 rounded-lg border border-slate-200 text-center",children:[e.jsx("div",{className:"text-[10px] text-slate-500 font-bold",children:"หน้ากว้าง / เพดาน"}),e.jsxs("div",{className:"font-extrabold text-sm text-slate-900 font-mono mt-0.5",children:[((Kt=v.spaceSpecs)==null?void 0:Kt.frontageWidthM)||"-","ม. / ",((Qt=v.spaceSpecs)==null?void 0:Qt.ceilingHeightM)||"-","ม."]})]}),e.jsxs("div",{className:"bg-white p-2 rounded-lg border border-slate-200 text-center",children:[e.jsx("div",{className:"text-[10px] text-slate-500 font-bold",children:"ค่าเช่ารายเดือน"}),e.jsx("div",{className:"font-extrabold text-sm text-amber-950 font-mono mt-0.5 truncate",children:(Gt=v.leaseTerms)!=null&&Gt.monthlyRentThb?e.jsxs(e.Fragment,{children:["฿",v.leaseTerms.monthlyRentThb.toLocaleString()]}):(Jt=v.leaseTerms)!=null&&Jt.monthlyRentRmb?e.jsxs(e.Fragment,{children:["¥",v.leaseTerms.monthlyRentRmb.toLocaleString()]}):e.jsx("span",{className:"text-slate-400",children:"สอบถาม"})})]}),e.jsxs("div",{className:"bg-white p-2 rounded-lg border border-slate-200 text-center",children:[e.jsx("div",{className:"text-[10px] text-slate-500 font-bold",children:"เงื่อนไขสัญญา"}),e.jsxs("div",{className:"font-extrabold text-xs text-slate-900 font-mono mt-0.5 truncate",children:["สัญญา ",((Yt=v.leaseTerms)==null?void 0:Yt.leasePeriodYears)||3," ปี · ประกัน ",((Wt=v.leaseTerms)==null?void 0:Wt.depositMonths)||3," ด."]})]})]}),e.jsxs("div",{className:"flex flex-wrap items-center gap-1.5 pt-1 text-xs",children:[e.jsxs("span",{className:"px-2 py-0.5 rounded-md bg-white border border-slate-200 text-slate-700 font-semibold flex items-center gap-1",children:[e.jsx(rs,{className:"w-3 h-3 text-amber-500"}),e.jsxs("span",{children:["สเปกไฟ: ",((Zt=v.spaceSpecs)==null?void 0:Zt.electricalPower)||"3 เฟส 45 kVA"]})]}),e.jsxs("span",{className:"px-2 py-0.5 rounded-md bg-white border border-slate-200 text-slate-700 font-semibold flex items-center gap-1",children:[e.jsx(nn,{className:"w-3 h-3 text-blue-500"}),e.jsxs("span",{children:["ท่อน้ำดี: ",(Xt=v.spaceSpecs)!=null&&Xt.hasWaterInflow?"✓ มีในห้อง":"✗ ไม่มี"]})]}),e.jsxs("span",{className:"px-2 py-0.5 rounded-md bg-white border border-slate-200 text-slate-700 font-semibold flex items-center gap-1",children:[e.jsx(rn,{className:"w-3 h-3 text-teal-500"}),e.jsxs("span",{children:["ท่อน้ำทิ้ง: ",(es=v.spaceSpecs)!=null&&es.hasDrainage?"✓ มีในห้อง":"✗ ไม่มี"]})]}),e.jsxs("span",{className:"px-2 py-0.5 rounded-md bg-white border border-slate-200 text-slate-700 font-semibold flex items-center gap-1",children:[e.jsx(on,{className:"w-3 h-3 text-purple-500"}),e.jsxs("span",{children:["ดักไขมัน: ",(ts=v.spaceSpecs)!=null&&ts.hasGreaseTrap?"✓ มีรองรับ":"✗ ต้องติดตั้งเอง"]})]}),((ss=v.spaceSpecs)==null?void 0:ss.riderAccessNotes)&&e.jsxs("span",{className:"px-2 py-0.5 rounded-md bg-white border border-slate-200 text-slate-700 font-semibold flex items-center gap-1",children:[e.jsx(an,{className:"w-3 h-3 text-emerald-600"}),e.jsxs("span",{children:["ไรเดอร์: ",v.spaceSpecs.riderAccessNotes]})]})]}),v.handoffNotes&&e.jsxs("div",{className:"pt-2 border-t border-sky-200/80 text-xs",children:[e.jsx("span",{className:"font-bold text-sky-900 block mb-0.5",children:"ประเด็นเจรจา / ส่งมอบงาน:"}),e.jsx("p",{className:"text-slate-800 whitespace-pre-wrap",children:v.handoffNotes})]})]}),(O&&(k==null?void 0:k.memo)||!O&&(E==null?void 0:E.tastingNotes))&&e.jsxs("div",{className:`p-3.5 rounded-xl border space-y-1 ${O?"bg-emerald-50/50 border-emerald-200/80":"bg-amber-50/50 border-amber-200/80"}`,children:[e.jsxs("div",{className:"text-[11px] font-bold text-slate-600 flex items-center gap-1.5",children:[e.jsx("i",{className:`fa-solid ${O?"fa-clipboard-check text-emerald-600":"fa-quote-left text-amber-600"} text-[10px]`}),e.jsx("span",{children:O?"บันทึกหน้างาน / รายละเอียดหลัก:":"บันทึกรีวิวรสชาติ & ไอเดียเรฟ:"})]}),e.jsx("p",{className:"text-xs sm:text-[13px] text-slate-900 leading-relaxed whitespace-pre-wrap font-medium",children:O?k==null?void 0:k.memo:E==null?void 0:E.tastingNotes})]}),O&&k&&(k.catalogItems||[]).length>0&&e.jsxs("div",{className:"space-y-2",children:[e.jsx("div",{className:"flex items-center justify-between",children:e.jsxs("span",{className:"text-xs font-bold text-slate-800",children:["รายการอุปกรณ์ & สินค้า (",(k.catalogItems||[]).length," รายการ):"]})}),e.jsx("div",{className:"grid grid-cols-1 sm:grid-cols-2 gap-3",children:(k.catalogItems||[]).map((a,f)=>e.jsxs("div",{className:"p-3 rounded-xl border border-slate-200 bg-white flex gap-3 shadow-xs",children:[a.photo?e.jsx("img",{src:a.photo,alt:"",onClick:()=>vt(a.photo),className:"w-16 h-16 rounded-lg object-cover cursor-pointer border border-slate-100 hover:opacity-90"}):e.jsx("div",{className:"w-16 h-16 rounded-lg bg-slate-100 border border-slate-200 flex items-center justify-center text-slate-400 text-xs",children:"ไม่มีรูป"}),e.jsxs("div",{className:"min-w-0 flex-1 space-y-1",children:[e.jsx("div",{className:"font-bold text-xs text-slate-900 truncate",children:a.name||`รายการที่ ${f+1}`}),a.priceRmb&&e.jsxs("div",{className:"text-xs font-mono font-bold text-emerald-700",children:["¥",a.priceRmb," ",e.jsxs("span",{className:"text-[11px] font-normal text-slate-500",children:["(≈",t(a.priceRmb).toLocaleString(),"฿)"]})]}),a.priceThb&&!a.priceRmb&&e.jsxs("div",{className:"text-xs font-mono font-bold text-emerald-700",children:["฿",a.priceThb.toLocaleString()]}),a.weightKg&&e.jsxs("div",{className:"text-[11px] text-slate-500",children:["น้ำหนัก: ",e.jsx("span",{className:"font-mono",children:a.weightKg})]}),a.memo&&e.jsx("p",{className:"text-[11px] text-slate-600 whitespace-pre-wrap leading-relaxed",children:a.memo}),de(a).length>0&&e.jsx("div",{className:"flex flex-wrap gap-1 pt-1",children:de(a).map((g,V)=>{const F=`${a.id}-v-${g.id||V}`;return e.jsxs("button",{type:"button",onClick:()=>Fe(F,g.url),className:"inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-emerald-50 text-emerald-700 border border-emerald-200 text-[10px] font-bold",children:[C===F?e.jsx(He,{className:"w-2.5 h-2.5"}):e.jsx(Oe,{className:"w-2.5 h-2.5"}),e.jsxs("span",{children:[g.label||`ฟังเสียง #${V+1}`," (",g.durationSec||4,"s)"]})]},F)})})]})]},a.id||f))})]}),!O&&E&&(E.drinkItems||[]).length>0&&e.jsxs("div",{className:"space-y-2",children:[e.jsx("div",{className:"flex items-center justify-between",children:e.jsxs("span",{className:"text-xs font-bold text-slate-800",children:["เมนูที่ชิม & ถอดรหัสสูตร (",(E.drinkItems||[]).length," เมนู):"]})}),e.jsx("div",{className:"grid grid-cols-1 sm:grid-cols-2 gap-3",children:(E.drinkItems||[]).map((a,f)=>e.jsxs("div",{className:"p-3 rounded-xl border border-amber-200/80 bg-amber-50/20 flex gap-3 shadow-xs",children:[a.photo&&e.jsx("img",{src:a.photo,alt:"",onClick:()=>vt(a.photo),className:"w-16 h-16 rounded-lg object-cover cursor-pointer border border-amber-200"}),e.jsxs("div",{className:"min-w-0 flex-1 space-y-1",children:[e.jsx("div",{className:"font-bold text-xs text-slate-900 truncate",children:a.name||`แก้วที่ #${f+1}`}),a.priceRmb&&e.jsxs("div",{className:"text-xs font-mono font-bold text-amber-700",children:["¥",a.priceRmb," ",e.jsxs("span",{className:"text-[11px] font-normal text-slate-500",children:["(≈",t(a.priceRmb),"฿)"]})]}),a.fitMenuTarget&&e.jsxs("div",{className:"text-[11px] font-semibold text-emerald-700",children:["ต่อยอด: ",a.fitMenuTarget]}),a.gimmickNotes&&e.jsx("p",{className:"text-[11px] text-slate-600",children:a.gimmickNotes}),de(a).length>0&&e.jsx("div",{className:"flex flex-wrap gap-1 pt-1",children:de(a).map((g,V)=>{const F=`${a.id}-v-${g.id||V}`;return e.jsxs("button",{type:"button",onClick:()=>Fe(F,g.url),className:"inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-amber-50 text-amber-800 border border-amber-200 text-[10px] font-bold",children:[C===F?e.jsx(He,{className:"w-2.5 h-2.5"}):e.jsx(Oe,{className:"w-2.5 h-2.5"}),e.jsxs("span",{children:[g.label||`ฟังเสียง #${V+1}`," (",g.durationSec||4,"s)"]})]},F)})})]})]},a.id||f))})]}),e.jsx("audio",{ref:J,onEnded:()=>L(null),className:"hidden"}),e.jsxs("div",{className:"space-y-2",children:[e.jsxs("span",{className:"text-xs font-bold text-slate-800 block",children:["แกลเลอรีรูปภาพทั้งหมด (",q.length," รูป — แตะเพื่อขยายและเลื่อนซ้าย-ขวา):"]}),e.jsx("div",{className:"grid grid-cols-3 sm:grid-cols-4 gap-2",children:q.map((a,f)=>e.jsxs("div",{onClick:()=>b(f),className:"group relative aspect-square rounded-xl overflow-hidden border border-slate-200 cursor-pointer bg-slate-100 shadow-xs",children:[e.jsx("img",{src:a.url,className:"w-full h-full object-cover group-hover:scale-105 transition-transform duration-200"}),e.jsxs("div",{className:"absolute bottom-1 right-1 bg-black/60 text-white text-[9px] font-mono px-1.5 py-0.5 rounded",children:[f+1,"/",q.length]}),e.jsx("div",{className:"absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center text-[10px] text-white p-1 text-center font-medium",children:a.label})]},f))})]}),d.videos&&d.videos.length>0&&e.jsxs("div",{className:"space-y-2 pt-1",children:[e.jsxs("span",{className:"text-xs font-bold text-slate-800 flex items-center gap-1.5",children:[e.jsx("i",{className:"fa-solid fa-video text-purple-600"}),e.jsxs("span",{children:["คลิปวิดีโอของรายการนี้ (",d.videos.length," คลิป):"]})]}),e.jsx("div",{className:"grid grid-cols-1 sm:grid-cols-2 gap-3",children:d.videos.map((a,f)=>e.jsx(gn,{src:a,className:"rounded-2xl border border-slate-200 shadow-sm h-48 sm:h-56",videoClassName:"object-contain",badgeLabel:`คลิปที่ ${f+1}`},f))})]}),e.jsxs("div",{id:"detail-comments-section",className:"p-4 bg-slate-50 rounded-xl border border-slate-200/80 space-y-3",children:[e.jsxs("div",{className:"flex items-center justify-between",children:[e.jsxs("span",{className:"text-xs font-bold text-slate-800 flex items-center gap-1.5",children:[e.jsx(ln,{className:"w-3.5 h-3.5 text-blue-600"}),e.jsx("span",{children:"ช่องความเห็นทีมงาน & ตอบกลับต่อเนื่อง (Threaded Comments)"})]}),e.jsxs("span",{className:"text-[11px] text-slate-400 font-mono",children:[d.reviewerNotes.length," หัวข้อสนทนา"]})]}),e.jsx("div",{className:"space-y-2.5",children:d.reviewerNotes.length===0?e.jsx("p",{className:"text-xs text-slate-400 py-3 text-center",children:"ยังไม่มีความเห็น สามารถพิมพ์บันทึกหรือตรวจสอบสเปกได้ด้านล่าง"}):d.reviewerNotes.map(a=>{var V,F,ae,fe,W;const f=a.replies||[],g=ge[a.id];return e.jsxs("div",{className:"p-3 bg-white rounded-xl border border-slate-200/70 shadow-xs space-y-2",children:[e.jsxs("div",{className:"flex items-start gap-2.5",children:[e.jsx(Le,{src:a.authorAvatar,className:"w-7 h-7 rounded-full object-cover shrink-0 mt-0.5 ring-1 ring-slate-200"}),e.jsxs("div",{className:"min-w-0 flex-1",children:[e.jsxs("div",{className:"flex items-center justify-between text-[11px] mb-0.5",children:[e.jsx("span",{className:"font-bold text-slate-900",children:a.author}),e.jsx("span",{className:"text-slate-400 font-mono text-[10px]",children:new Date(a.timestamp).toLocaleTimeString("th-TH",{hour:"2-digit",minute:"2-digit"})})]}),e.jsx("p",{className:"text-xs text-slate-700 leading-relaxed",children:a.text}),a.photoUrl&&e.jsx("div",{className:"mt-1.5",children:e.jsx("img",{src:a.photoUrl,alt:"ภาพแนบ",className:"max-h-48 max-w-xs rounded-xl border border-slate-200 object-cover cursor-pointer hover:opacity-95 shadow-2xs",onClick:()=>window.open(a.photoUrl,"_blank")})}),(a.voiceUrl||a.audioUrl)&&e.jsxs("div",{className:"mt-1.5 flex items-center gap-2 bg-slate-50 p-2 rounded-xl border border-slate-200/80 max-w-sm",children:[e.jsx(Ve,{className:"w-4 h-4 text-emerald-600 shrink-0"}),e.jsx("audio",{controls:!0,src:a.voiceUrl||a.audioUrl,className:"h-7 w-full"})]}),e.jsxs("div",{className:"flex items-center gap-3 mt-1.5 text-[11px] font-bold",children:[w&&e.jsxs("button",{type:"button",onClick:()=>ue((te==null?void 0:te.noteId)===a.id&&te.author===a.author?null:{noteId:a.id,author:a.author}),className:"text-blue-600 hover:text-blue-800 flex items-center gap-1",children:[e.jsx(os,{className:"w-3 h-3"}),e.jsx("span",{children:"ตอบกลับ"})]}),f.length>0&&e.jsx("button",{type:"button",onClick:()=>ye(z=>({...z,[a.id]:!z[a.id]})),className:"text-slate-500 hover:text-slate-800 flex items-center gap-1",children:g?e.jsxs(e.Fragment,{children:[e.jsx(cn,{className:"w-3 h-3"}),e.jsxs("span",{children:["ดูการตอบกลับ (",f.length,")"]})]}):e.jsxs(e.Fragment,{children:[e.jsx(dn,{className:"w-3 h-3"}),e.jsxs("span",{children:["ย่อการตอบกลับ (",f.length,")"]})]})})]})]})]}),f.length>0&&!g&&e.jsx("div",{className:"ml-6 pl-3 border-l-2 border-blue-200 space-y-2 pt-1",children:f.map(z=>e.jsxs("div",{className:"p-2.5 bg-slate-50 rounded-xl border border-slate-200/60 text-xs space-y-1",children:[e.jsxs("div",{className:"flex items-center justify-between text-[10px]",children:[e.jsxs("div",{className:"flex items-center gap-1.5 font-bold text-slate-800",children:[e.jsx(Le,{src:z.authorAvatar,className:"w-4 h-4 rounded-full object-cover"}),e.jsx("span",{children:z.author}),z.replyToAuthor&&e.jsxs("span",{className:"text-blue-600 font-normal",children:["▸ ตอบกลับ @",z.replyToAuthor]})]}),e.jsx("span",{className:"text-slate-400 font-mono",children:new Date(z.timestamp).toLocaleTimeString("th-TH",{hour:"2-digit",minute:"2-digit"})})]}),e.jsx("p",{className:"text-slate-700 leading-snug",children:z.text}),z.photoUrl&&e.jsx("div",{className:"mt-1",children:e.jsx("img",{src:z.photoUrl,alt:"ภาพแนบ",className:"max-h-36 max-w-[200px] rounded-lg border border-slate-200 object-cover cursor-pointer hover:opacity-95 shadow-2xs",onClick:()=>window.open(z.photoUrl,"_blank")})}),(z.voiceUrl||z.audioUrl)&&e.jsxs("div",{className:"mt-1 flex items-center gap-1.5 bg-white p-1.5 rounded-lg border border-slate-200 max-w-[240px]",children:[e.jsx(Ve,{className:"w-3.5 h-3.5 text-blue-600 shrink-0"}),e.jsx("audio",{controls:!0,src:z.voiceUrl||z.audioUrl,className:"h-6 w-full"})]}),e.jsx("div",{children:w&&e.jsxs("button",{type:"button",onClick:()=>ue({noteId:a.id,author:z.author}),className:"text-[10px] font-bold text-blue-600 hover:underline inline-flex items-center gap-0.5",children:[e.jsx(os,{className:"w-2.5 h-2.5"}),e.jsxs("span",{children:["ตอบกลับ @",z.author," ต่อ"]})]})})]},z.id))}),w&&(te==null?void 0:te.noteId)===a.id&&e.jsxs("div",{className:"mt-2 pt-2 border-t border-slate-100 space-y-1.5 animate-in fade-in",children:[(((V=Z[a.id])==null?void 0:V.photoUrl)||((F=Z[a.id])==null?void 0:F.voiceUrl))&&e.jsxs("div",{className:"flex flex-wrap items-center gap-1.5 text-[10px]",children:[((ae=Z[a.id])==null?void 0:ae.photoUrl)&&e.jsxs("span",{className:"inline-flex items-center gap-1 px-1.5 py-0.5 rounded bg-emerald-50 text-emerald-800 border border-emerald-200",children:[e.jsx(Me,{className:"w-3 h-3"})," ภาพพร้อมแนบ",e.jsx("button",{type:"button",onClick:()=>le(z=>({...z,[a.id]:{...z[a.id],photoUrl:void 0}})),children:e.jsx($e,{className:"w-2.5 h-2.5"})})]}),((fe=Z[a.id])==null?void 0:fe.voiceUrl)&&e.jsxs("span",{className:"inline-flex items-center gap-1.5 px-2 py-0.5 rounded bg-blue-50 text-blue-800 border border-blue-200",children:[e.jsx(De,{className:"w-3 h-3"})," เสียงอัดสดพร้อมส่ง",e.jsx("audio",{controls:!0,src:(W=Z[a.id])==null?void 0:W.voiceUrl,className:"h-6 w-32"}),e.jsx("button",{type:"button",onClick:()=>le(z=>({...z,[a.id]:{...z[a.id],voiceUrl:void 0}})),children:e.jsx($e,{className:"w-2.5 h-2.5"})})]})]}),e.jsxs("div",{className:"flex gap-1.5 items-center flex-wrap sm:flex-nowrap",children:[e.jsx("input",{type:"text",placeholder:`ตอบกลับ @${te.author} ในฐานะ ${s.alias}...`,value:pe[a.id]||"",onChange:z=>me({...pe,[a.id]:z.target.value}),className:"flex-1 min-w-[140px] bg-slate-50 border border-blue-300 rounded-lg px-2.5 py-1.5 text-xs text-slate-900 focus:outline-none focus:border-blue-500",autoFocus:!0,onKeyDown:z=>{z.key==="Enter"&&(z.preventDefault(),yt(a.id,te.author))}}),e.jsx("button",{type:"button",title:"แนบรูปภาพในคำตอบกลับ",onClick:()=>{const z=document.createElement("input");z.type="file",z.accept="image/*",z.onchange=qe=>{var Re,Pe;const Be=(Pe=(Re=qe.target)==null?void 0:Re.files)==null?void 0:Pe[0];Be&&ze(Be,"photo",a.id)},z.click()},className:"p-1.5 rounded-lg border border-slate-200 hover:bg-slate-100 text-slate-500",children:e.jsx(Me,{className:"w-3.5 h-3.5"})}),e.jsxs("button",{type:"button",title:oe===a.id?"กดเพื่อหยุดอัดเสียงสด":"กดเพื่ออัดเสียงสดในคำตอบกลับ",disabled:G,onClick:()=>void wt(a.id),className:`px-2 py-1.5 rounded-lg border text-[11px] font-bold inline-flex items-center gap-1 transition-all ${oe===a.id?"bg-rose-600 text-white border-rose-600 animate-pulse":"bg-white border-slate-200 hover:border-blue-500 hover:bg-blue-50 text-slate-600 hover:text-blue-700"}`,children:[e.jsx(De,{className:"w-3.5 h-3.5"}),e.jsx("span",{children:oe===a.id?`หยุดอัด (${Ee}s)`:"อัดเสียงสด"})]}),e.jsx("button",{type:"button",onClick:()=>yt(a.id,te.author),className:"px-3 py-1.5 rounded-lg bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold",children:"ส่ง"}),w&&e.jsx("button",{type:"button",onClick:()=>ue(null),className:"px-2 py-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-600 text-xs",children:"ยกเลิก"})]})]})]},a.id)})}),e.jsxs("div",{className:"pt-2 border-t border-slate-200/60 space-y-1.5",children:[e.jsx("div",{className:"flex items-center justify-between text-[11px] text-slate-500",children:e.jsxs("span",{className:"font-semibold flex items-center gap-1",children:[e.jsx(rs,{className:"w-3 h-3 text-amber-500"})," ข้อความด่วน (แตะเพื่อพิมพ์ทันที):"]})}),e.jsx("div",{className:"flex items-center gap-1.5 overflow-x-auto no-scrollbar py-0.5",children:M.map(a=>e.jsxs("button",{type:"button",onClick:()=>A(a.text),className:"px-2.5 py-1 rounded-lg bg-white border border-slate-200 hover:border-blue-400 text-[11px] text-slate-700 whitespace-nowrap active:scale-95 transition-all shadow-xs",title:a.text,children:[e.jsx("i",{className:"fa-solid fa-bolt text-amber-500 mr-1 text-[10px]"}),e.jsx("span",{children:a.title})]},a.id))})]}),s.role==="viewer"?null:e.jsxs("form",{onSubmit:Os,className:"space-y-2 pt-1",children:[(ie||re||G)&&e.jsxs("div",{className:"flex flex-wrap items-center gap-2 px-1",children:[ie&&e.jsxs("div",{className:"flex items-center gap-1.5 px-2 py-1 bg-emerald-50 border border-emerald-200 rounded-lg text-xs text-emerald-800",children:[e.jsx(Me,{className:"w-3.5 h-3.5 text-emerald-600"}),e.jsx("span",{className:"truncate max-w-[120px]",children:"รูปภาพพร้อมแนบ"}),e.jsx("button",{type:"button",onClick:()=>xe(null),className:"text-slate-400 hover:text-rose-600",children:e.jsx($e,{className:"w-3 h-3"})})]}),re&&e.jsxs("div",{className:"flex items-center gap-1.5 px-2 py-1 bg-blue-50 border border-blue-200 rounded-lg text-xs text-blue-800",children:[e.jsx(De,{className:"w-3.5 h-3.5 text-blue-600"}),e.jsx("span",{children:"เสียงอัดสด:"}),e.jsx("audio",{controls:!0,src:re,className:"h-6 w-36"}),e.jsx("button",{type:"button",onClick:()=>he(null),className:"text-slate-400 hover:text-rose-600",children:e.jsx($e,{className:"w-3 h-3"})})]}),G&&e.jsxs("div",{className:"flex items-center gap-1.5 text-xs text-blue-600 font-medium",children:[e.jsx(bn,{className:"w-3.5 h-3.5 animate-spin"}),e.jsx("span",{children:"กำลังอัปโหลดไฟล์สื่อ..."})]})]}),e.jsxs("div",{className:"flex gap-1.5 items-center flex-wrap sm:flex-nowrap",children:[e.jsx("input",{ref:Ce,type:"file",accept:"image/*",className:"hidden",onChange:a=>{var g;const f=(g=a.target.files)==null?void 0:g[0];f&&ze(f,"photo"),a.target.value=""}}),e.jsx("input",{type:"text",placeholder:`พิมพ์ข้อคิดเห็นใหม่ในฐานะ ${s.alias}...`,value:j,onChange:a=>A(a.target.value),className:"flex-1 min-w-[140px] h-8 bg-white border border-slate-200 rounded-lg px-2.5 text-xs text-slate-900 focus:outline-none focus:border-blue-500 shadow-2xs"}),e.jsxs("button",{type:"button",title:"แนบรูปภาพ",disabled:G,onClick:()=>{var a;return(a=Ce.current)==null?void 0:a.click()},className:"h-8 px-2.5 rounded-lg border border-slate-200 bg-white hover:border-emerald-500 hover:bg-emerald-50 text-slate-600 hover:text-emerald-700 text-[11px] font-bold inline-flex items-center justify-center gap-1 transition-colors shrink-0",children:[e.jsx(Me,{className:"w-3.5 h-3.5"}),e.jsx("span",{className:"hidden sm:inline",children:"รูปภาพ"})]}),e.jsxs("button",{type:"button",title:oe==="main"?"กดเพื่อหยุดอัดเสียงสด":"กดเพื่ออัดเสียงสดในคอมเมนต์",disabled:G,onClick:()=>void wt("main"),className:`h-8 px-2.5 rounded-lg border text-[11px] font-bold inline-flex items-center justify-center gap-1 transition-all shrink-0 ${oe==="main"?"bg-rose-600 text-white border-rose-600 animate-pulse shadow-xs":"bg-white border-slate-200 hover:border-blue-500 hover:bg-blue-50 text-slate-700 hover:text-blue-700"}`,children:[e.jsx(De,{className:"w-3.5 h-3.5"}),e.jsx("span",{children:oe==="main"?`หยุดอัด (${Ee}s)`:"อัดเสียงสด"})]}),e.jsxs("button",{type:"submit",disabled:G||oe==="main",className:"h-8 px-3 rounded-lg bg-blue-600 hover:bg-blue-700 text-white text-[11px] font-bold shadow-2xs active:scale-95 transition-all inline-flex items-center justify-center gap-1 shrink-0 disabled:opacity-50",children:[e.jsx(un,{className:"w-3 h-3"}),e.jsx("span",{children:"โพสต์"})]})]})]})]}),e.jsxs("div",{className:"p-3.5 bg-slate-50/90 rounded-xl border border-slate-200/80 space-y-2.5",children:[e.jsxs("div",{className:"flex flex-wrap items-center justify-between gap-2",children:[e.jsxs("span",{className:"text-xs font-bold text-slate-800 flex items-center gap-1.5",children:[e.jsx("i",{className:"fa-solid fa-clock-rotate-left text-emerald-600 text-xs"}),e.jsx("span",{children:"ประวัติการดำเนินงาน & ส่งต่องาน (Activity Log)"})]}),d.handoffStage&&e.jsxs("span",{className:"text-[10px] font-bold px-2 py-0.5 rounded-md bg-emerald-50 text-emerald-800 border border-emerald-200",children:["สถานะส่งต่อ:"," ",{awaiting:"พาร์ท 1: รอรับช่วงต่อ",rfq_sent:"พาร์ท 2: ขอสเปก / ส่ง RFQ",sample_test:"พาร์ท 3: ทดสอบตัวอย่าง Lab/R&D",negotiate:"พาร์ท 4: ต่อรองราคา & MOQ",approved:"พาร์ท 5: ตัวเต็งอนุมัติ",ordered:"พาร์ท 6: สั่งซื้อสำเร็จ"}[d.handoffStage]||d.handoffStage]})]}),(d.assignedTo||d.targetFollowUpDate||d.handoffNotes)&&e.jsxs("div",{className:"p-2.5 bg-white rounded-lg border border-slate-200/80 text-[11px] space-y-1",children:[e.jsxs("div",{className:"flex flex-wrap items-center gap-3 text-slate-700",children:[d.assignedTo&&e.jsxs("span",{className:"font-bold inline-flex items-center gap-1",children:[e.jsx("i",{className:"fa-solid fa-user-check text-emerald-600 text-[10px]"}),e.jsxs("span",{children:["ผู้รับช่วงต่อ: ",d.assignedTo]})]}),d.targetFollowUpDate&&e.jsxs("span",{className:"font-mono text-slate-500",children:["กำหนดติดตาม: ",d.targetFollowUpDate]})]}),d.handoffNotes&&e.jsxs("p",{className:"text-slate-600 whitespace-pre-wrap leading-relaxed",children:["หมายเหตุส่งต่อ: ",d.handoffNotes]})]}),e.jsx("div",{className:"space-y-1.5 max-h-48 overflow-y-auto pr-1",children:(()=>{const a=Array.isArray(d.history)?d.history:[];return(a.length>0?a:[{action:"สร้างบันทึกรายการสำรวจ",user:d.creator.alias,userAvatar:d.creator.avatar,timestamp:d.creator.timestamp}]).map((g,V)=>{const F=y.find(W=>W.alias===g.user||W.name===g.user),ae=g.userAvatar||(F==null?void 0:F.avatar)||(g.user===d.creator.alias?d.creator.avatar:"./logo.jpg"),fe=g.action==="handoff"?"อัปเดตสถานะการส่งต่องาน (Handoff)":g.action==="comment"?"เพิ่มความคิดเห็นในรายการ":g.action==="reply"?"ตอบกลับความคิดเห็น":g.action;return e.jsxs("div",{className:"flex items-center justify-between gap-2 px-2.5 py-1.5 bg-white rounded-lg border border-slate-200/70 text-[11px]",children:[e.jsxs("div",{className:"flex items-center gap-2 min-w-0",children:[e.jsx(Le,{src:ae,alt:g.user,className:"w-5 h-5 rounded-full object-cover border border-slate-200 shrink-0"}),e.jsx("span",{className:"font-bold text-slate-900 shrink-0",children:g.user}),e.jsx("span",{className:"text-slate-600 truncate",children:fe})]}),e.jsx("span",{className:"text-[10px] font-mono text-slate-400 shrink-0",children:new Date(g.timestamp).toLocaleString("th-TH",{day:"2-digit",month:"2-digit",year:"2-digit",hour:"2-digit",minute:"2-digit"})})]},`${g.timestamp}-${V}`)})})()})]})]}),e.jsxs("div",{className:"p-3.5 border-t border-slate-100 bg-white flex items-center justify-between",children:[e.jsxs("div",{className:"text-[11px] text-slate-400 font-mono",children:["ID: ",d.id," · ปรับปรุง:"," ",new Date(d.updatedAt).toLocaleTimeString("th-TH")]}),e.jsxs("div",{className:"flex items-center gap-2",children:[H&&e.jsxs("button",{type:"button",onClick:()=>U(d),className:"px-3.5 py-1.5 text-xs font-bold rounded-xl bg-amber-50 hover:bg-amber-100 text-amber-800 border border-amber-300 flex items-center gap-1.5 transition-colors",children:[e.jsx(ns,{className:"w-3.5 h-3.5 text-amber-600"}),e.jsx("span",{children:"แก้ไขข้อมูลรายการนี้"})]}),e.jsx("button",{onClick:l,className:"px-4 py-1.5 text-xs font-bold rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 transition-colors",children:"ปิดหน้าต่าง"})]})]})]}),N!==null&&q[N]&&e.jsxs("div",{className:"fixed inset-0 z-[140] bg-black/92 backdrop-blur-md flex flex-col items-center justify-between p-3 sm:p-6 select-none",onClick:()=>b(null),children:[e.jsxs("div",{className:"w-full max-w-4xl flex items-center justify-between text-white z-10",onClick:a=>a.stopPropagation(),children:[e.jsxs("div",{className:"flex items-center gap-2",children:[e.jsxs("span",{className:"px-2.5 py-1 rounded-full bg-white/15 font-mono text-xs font-bold",children:["รูปที่ ",N+1," / ",q.length]}),e.jsx("span",{className:"text-xs sm:text-sm font-semibold text-white/90 truncate max-w-[240px] sm:max-w-md",children:q[N].label})]}),e.jsx("button",{type:"button",onClick:()=>b(null),className:"w-9 h-9 rounded-full bg-white/15 hover:bg-white/25 text-white flex items-center justify-center transition-colors",children:e.jsx($e,{className:"w-5 h-5"})})]}),e.jsxs("div",{className:"relative flex-1 w-full max-w-5xl flex items-center justify-center my-2",onClick:a=>a.stopPropagation(),children:[q.length>1&&e.jsx("button",{type:"button",onClick:()=>b((N-1+q.length)%q.length),className:"absolute left-1 sm:left-3 z-20 w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-black/60 hover:bg-black/80 border border-white/25 text-white flex items-center justify-center shadow-lg active:scale-95 transition-all",title:"รูปก่อนหน้า (◀)",children:e.jsx(hn,{className:"w-6 h-6"})}),e.jsx("img",{src:q[N].url,alt:q[N].label,className:"max-w-full max-h-[72vh] object-contain rounded-xl shadow-2xl"}),q.length>1&&e.jsx("button",{type:"button",onClick:()=>b((N+1)%q.length),className:"absolute right-1 sm:right-3 z-20 w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-black/60 hover:bg-black/80 border border-white/25 text-white flex items-center justify-center shadow-lg active:scale-95 transition-all",title:"รูปถัดไป (▶)",children:e.jsx(fn,{className:"w-6 h-6"})})]}),q.length>1&&e.jsx("div",{className:"w-full max-w-3xl flex items-center justify-center gap-2 overflow-x-auto py-1 z-10",onClick:a=>a.stopPropagation(),children:q.map((a,f)=>e.jsx("button",{type:"button",onClick:()=>b(f),className:`relative w-12 h-12 sm:w-14 sm:h-14 rounded-lg overflow-hidden shrink-0 border-2 transition-all ${f===N?"border-emerald-400 scale-105 shadow-md":"border-white/20 opacity-60 hover:opacity-100"}`,children:e.jsx("img",{src:a.url,className:"w-full h-full object-cover"})},f))})]})]})};export{Gn as DetailModal};
