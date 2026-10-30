import{c as Ds,a4 as zs,_ as ce,u as Fs,r as se,N as je,j as e,$ as qs,v as _s,X as Ne,P as Wt,T as Zt,V as Hs,O as Vs,F as Le,l as Os,a5 as $e,i as Ks,K as Qs,Z as Xt,a0 as Gs,R as Js,h as Ys,a6 as Ws,k as Zs,a7 as es,a1 as Xs,a8 as en,Q as Me,f as tn,a9 as sn,d as nn,a2 as rn}from"./index-DVpMCPOc.js";import{F as on,V as an}from"./VideoPlayer-iV9hFHcR.js";import{P as ln}from"./printer-CDrznhcG.js";import{M as Ue}from"./mic-WMjhurDi.js";import{L as cn}from"./loader-circle-BTLYKaTJ.js";/**
 * @license lucide-react v1.62.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Ts={name:"file-down",size:24,node:[["path",{d:"M6 22a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h8a2.4 2.4 0 0 1 1.704.706l3.588 3.588A2.4 2.4 0 0 1 20 8v12a2 2 0 0 1-2 2z",key:"1oefj6"}],["path",{d:"M14 2v5a1 1 0 0 0 1 1h5",key:"wfsgrz"}],["path",{d:"M12 18v-6",key:"17g6i2"}],["path",{d:"m9 15 3 3 3-3",key:"1npd3o"}]]};Ts.node;const dn=Ds(Ts);var ke={},qe,ts;function hn(){return ts||(ts=1,qe=function(){return typeof Promise=="function"&&Promise.prototype&&Promise.prototype.then}),qe}var _e={},ge={},ss;function we(){if(ss)return ge;ss=1;let n;const i=[0,26,44,70,100,134,172,196,242,292,346,404,466,532,581,655,733,815,901,991,1085,1156,1258,1364,1474,1588,1706,1828,1921,2051,2185,2323,2465,2611,2761,2876,3034,3196,3362,3532,3706];return ge.getSymbolSize=function(r){if(!r)throw new Error('"version" cannot be null or undefined');if(r<1||r>40)throw new Error('"version" should be in range from 1 to 40');return r*4+17},ge.getSymbolTotalCodewords=function(r){return i[r]},ge.getBCHDigit=function(l){let r=0;for(;l!==0;)r++,l>>>=1;return r},ge.setToSJISFunction=function(r){if(typeof r!="function")throw new Error('"toSJISFunc" is not a valid function.');n=r},ge.isKanjiModeEnabled=function(){return typeof n<"u"},ge.toSJIS=function(r){return n(r)},ge}var He={},ns;function dt(){return ns||(ns=1,(function(n){n.L={bit:1},n.M={bit:0},n.Q={bit:3},n.H={bit:2};function i(l){if(typeof l!="string")throw new Error("Param is not a string");switch(l.toLowerCase()){case"l":case"low":return n.L;case"m":case"medium":return n.M;case"q":case"quartile":return n.Q;case"h":case"high":return n.H;default:throw new Error("Unknown EC Level: "+l)}}n.isValid=function(r){return r&&typeof r.bit<"u"&&r.bit>=0&&r.bit<4},n.from=function(r,s){if(n.isValid(r))return r;try{return i(r)}catch{return s}}})(He)),He}var Ve,rs;function un(){if(rs)return Ve;rs=1;function n(){this.buffer=[],this.length=0}return n.prototype={get:function(i){const l=Math.floor(i/8);return(this.buffer[l]>>>7-i%8&1)===1},put:function(i,l){for(let r=0;r<l;r++)this.putBit((i>>>l-r-1&1)===1)},getLengthInBits:function(){return this.length},putBit:function(i){const l=Math.floor(this.length/8);this.buffer.length<=l&&this.buffer.push(0),i&&(this.buffer[l]|=128>>>this.length%8),this.length++}},Ve=n,Ve}var Oe,os;function fn(){if(os)return Oe;os=1;function n(i){if(!i||i<1)throw new Error("BitMatrix size must be defined and greater than 0");this.size=i,this.data=new Uint8Array(i*i),this.reservedBit=new Uint8Array(i*i)}return n.prototype.set=function(i,l,r,s){const t=i*this.size+l;this.data[t]=r,s&&(this.reservedBit[t]=!0)},n.prototype.get=function(i,l){return this.data[i*this.size+l]},n.prototype.xor=function(i,l,r){this.data[i*this.size+l]^=r},n.prototype.isReserved=function(i,l){return this.reservedBit[i*this.size+l]},Oe=n,Oe}var Ke={},as;function pn(){return as||(as=1,(function(n){const i=we().getSymbolSize;n.getRowColCoords=function(r){if(r===1)return[];const s=Math.floor(r/7)+2,t=i(r),c=t===145?26:Math.ceil((t-13)/(2*s-2))*2,o=[t-7];for(let d=1;d<s-1;d++)o[d]=o[d-1]-c;return o.push(6),o.reverse()},n.getPositions=function(r){const s=[],t=n.getRowColCoords(r),c=t.length;for(let o=0;o<c;o++)for(let d=0;d<c;d++)o===0&&d===0||o===0&&d===c-1||o===c-1&&d===0||s.push([t[o],t[d]]);return s}})(Ke)),Ke}var Qe={},is;function mn(){if(is)return Qe;is=1;const n=we().getSymbolSize,i=7;return Qe.getPositions=function(r){const s=n(r);return[[0,0],[s-i,0],[0,s-i]]},Qe}var Ge={},ls;function xn(){return ls||(ls=1,(function(n){n.Patterns={PATTERN000:0,PATTERN001:1,PATTERN010:2,PATTERN011:3,PATTERN100:4,PATTERN101:5,PATTERN110:6,PATTERN111:7};const i={N1:3,N2:3,N3:40,N4:10};n.isValid=function(s){return s!=null&&s!==""&&!isNaN(s)&&s>=0&&s<=7},n.from=function(s){return n.isValid(s)?parseInt(s,10):void 0},n.getPenaltyN1=function(s){const t=s.size;let c=0,o=0,d=0,g=null,k=null;for(let P=0;P<t;P++){o=d=0,g=k=null;for(let T=0;T<t;T++){let v=s.get(P,T);v===g?o++:(o>=5&&(c+=i.N1+(o-5)),g=v,o=1),v=s.get(T,P),v===k?d++:(d>=5&&(c+=i.N1+(d-5)),k=v,d=1)}o>=5&&(c+=i.N1+(o-5)),d>=5&&(c+=i.N1+(d-5))}return c},n.getPenaltyN2=function(s){const t=s.size;let c=0;for(let o=0;o<t-1;o++)for(let d=0;d<t-1;d++){const g=s.get(o,d)+s.get(o,d+1)+s.get(o+1,d)+s.get(o+1,d+1);(g===4||g===0)&&c++}return c*i.N2},n.getPenaltyN3=function(s){const t=s.size;let c=0,o=0,d=0;for(let g=0;g<t;g++){o=d=0;for(let k=0;k<t;k++)o=o<<1&2047|s.get(g,k),k>=10&&(o===1488||o===93)&&c++,d=d<<1&2047|s.get(k,g),k>=10&&(d===1488||d===93)&&c++}return c*i.N3},n.getPenaltyN4=function(s){let t=0;const c=s.data.length;for(let d=0;d<c;d++)t+=s.data[d];return Math.abs(Math.ceil(t*100/c/5)-10)*i.N4};function l(r,s,t){switch(r){case n.Patterns.PATTERN000:return(s+t)%2===0;case n.Patterns.PATTERN001:return s%2===0;case n.Patterns.PATTERN010:return t%3===0;case n.Patterns.PATTERN011:return(s+t)%3===0;case n.Patterns.PATTERN100:return(Math.floor(s/2)+Math.floor(t/3))%2===0;case n.Patterns.PATTERN101:return s*t%2+s*t%3===0;case n.Patterns.PATTERN110:return(s*t%2+s*t%3)%2===0;case n.Patterns.PATTERN111:return(s*t%3+(s+t)%2)%2===0;default:throw new Error("bad maskPattern:"+r)}}n.applyMask=function(s,t){const c=t.size;for(let o=0;o<c;o++)for(let d=0;d<c;d++)t.isReserved(d,o)||t.xor(d,o,l(s,d,o))},n.getBestMask=function(s,t){const c=Object.keys(n.Patterns).length;let o=0,d=1/0;for(let g=0;g<c;g++){t(g),n.applyMask(g,s);const k=n.getPenaltyN1(s)+n.getPenaltyN2(s)+n.getPenaltyN3(s)+n.getPenaltyN4(s);n.applyMask(g,s),k<d&&(d=k,o=g)}return o}})(Ge)),Ge}var De={},cs;function As(){if(cs)return De;cs=1;const n=dt(),i=[1,1,1,1,1,1,1,1,1,1,2,2,1,2,2,4,1,2,4,4,2,4,4,4,2,4,6,5,2,4,6,6,2,5,8,8,4,5,8,8,4,5,8,11,4,8,10,11,4,9,12,16,4,9,16,16,6,10,12,18,6,10,17,16,6,11,16,19,6,13,18,21,7,14,21,25,8,16,20,25,8,17,23,25,9,17,23,34,9,18,25,30,10,20,27,32,12,21,29,35,12,23,34,37,12,25,34,40,13,26,35,42,14,28,38,45,15,29,40,48,16,31,43,51,17,33,45,54,18,35,48,57,19,37,51,60,19,38,53,63,20,40,56,66,21,43,59,70,22,45,62,74,24,47,65,77,25,49,68,81],l=[7,10,13,17,10,16,22,28,15,26,36,44,20,36,52,64,26,48,72,88,36,64,96,112,40,72,108,130,48,88,132,156,60,110,160,192,72,130,192,224,80,150,224,264,96,176,260,308,104,198,288,352,120,216,320,384,132,240,360,432,144,280,408,480,168,308,448,532,180,338,504,588,196,364,546,650,224,416,600,700,224,442,644,750,252,476,690,816,270,504,750,900,300,560,810,960,312,588,870,1050,336,644,952,1110,360,700,1020,1200,390,728,1050,1260,420,784,1140,1350,450,812,1200,1440,480,868,1290,1530,510,924,1350,1620,540,980,1440,1710,570,1036,1530,1800,570,1064,1590,1890,600,1120,1680,1980,630,1204,1770,2100,660,1260,1860,2220,720,1316,1950,2310,750,1372,2040,2430];return De.getBlocksCount=function(s,t){switch(t){case n.L:return i[(s-1)*4+0];case n.M:return i[(s-1)*4+1];case n.Q:return i[(s-1)*4+2];case n.H:return i[(s-1)*4+3];default:return}},De.getTotalCodewordsCount=function(s,t){switch(t){case n.L:return l[(s-1)*4+0];case n.M:return l[(s-1)*4+1];case n.Q:return l[(s-1)*4+2];case n.H:return l[(s-1)*4+3];default:return}},De}var Je={},Te={},ds;function gn(){if(ds)return Te;ds=1;const n=new Uint8Array(512),i=new Uint8Array(256);return(function(){let r=1;for(let s=0;s<255;s++)n[s]=r,i[r]=s,r<<=1,r&256&&(r^=285);for(let s=255;s<512;s++)n[s]=n[s-255]})(),Te.log=function(r){if(r<1)throw new Error("log("+r+")");return i[r]},Te.exp=function(r){return n[r]},Te.mul=function(r,s){return r===0||s===0?0:n[i[r]+i[s]]},Te}var hs;function bn(){return hs||(hs=1,(function(n){const i=gn();n.mul=function(r,s){const t=new Uint8Array(r.length+s.length-1);for(let c=0;c<r.length;c++)for(let o=0;o<s.length;o++)t[c+o]^=i.mul(r[c],s[o]);return t},n.mod=function(r,s){let t=new Uint8Array(r);for(;t.length-s.length>=0;){const c=t[0];for(let d=0;d<s.length;d++)t[d]^=i.mul(s[d],c);let o=0;for(;o<t.length&&t[o]===0;)o++;t=t.slice(o)}return t},n.generateECPolynomial=function(r){let s=new Uint8Array([1]);for(let t=0;t<r;t++)s=n.mul(s,new Uint8Array([1,i.exp(t)]));return s}})(Je)),Je}var Ye,us;function vn(){if(us)return Ye;us=1;const n=bn();function i(l){this.genPoly=void 0,this.degree=l,this.degree&&this.initialize(this.degree)}return i.prototype.initialize=function(r){this.degree=r,this.genPoly=n.generateECPolynomial(this.degree)},i.prototype.encode=function(r){if(!this.genPoly)throw new Error("Encoder not initialized");const s=new Uint8Array(r.length+this.degree);s.set(r);const t=n.mod(s,this.genPoly),c=this.degree-t.length;if(c>0){const o=new Uint8Array(this.degree);return o.set(t,c),o}return t},Ye=i,Ye}var We={},Ze={},Xe={},fs;function Is(){return fs||(fs=1,Xe.isValid=function(i){return!isNaN(i)&&i>=1&&i<=40}),Xe}var le={},ps;function Bs(){if(ps)return le;ps=1;const n="[0-9]+",i="[A-Z $%*+\\-./:]+";let l="(?:[u3000-u303F]|[u3040-u309F]|[u30A0-u30FF]|[uFF00-uFFEF]|[u4E00-u9FAF]|[u2605-u2606]|[u2190-u2195]|u203B|[u2010u2015u2018u2019u2025u2026u201Cu201Du2225u2260]|[u0391-u0451]|[u00A7u00A8u00B1u00B4u00D7u00F7])+";l=l.replace(/u/g,"\\u");const r="(?:(?![A-Z0-9 $%*+\\-./:]|"+l+`)(?:.|[\r
]))+`;le.KANJI=new RegExp(l,"g"),le.BYTE_KANJI=new RegExp("[^A-Z0-9 $%*+\\-./:]+","g"),le.BYTE=new RegExp(r,"g"),le.NUMERIC=new RegExp(n,"g"),le.ALPHANUMERIC=new RegExp(i,"g");const s=new RegExp("^"+l+"$"),t=new RegExp("^"+n+"$"),c=new RegExp("^[A-Z0-9 $%*+\\-./:]+$");return le.testKanji=function(d){return s.test(d)},le.testNumeric=function(d){return t.test(d)},le.testAlphanumeric=function(d){return c.test(d)},le}var ms;function ye(){return ms||(ms=1,(function(n){const i=Is(),l=Bs();n.NUMERIC={id:"Numeric",bit:1,ccBits:[10,12,14]},n.ALPHANUMERIC={id:"Alphanumeric",bit:2,ccBits:[9,11,13]},n.BYTE={id:"Byte",bit:4,ccBits:[8,16,16]},n.KANJI={id:"Kanji",bit:8,ccBits:[8,10,12]},n.MIXED={bit:-1},n.getCharCountIndicator=function(t,c){if(!t.ccBits)throw new Error("Invalid mode: "+t);if(!i.isValid(c))throw new Error("Invalid version: "+c);return c>=1&&c<10?t.ccBits[0]:c<27?t.ccBits[1]:t.ccBits[2]},n.getBestModeForData=function(t){return l.testNumeric(t)?n.NUMERIC:l.testAlphanumeric(t)?n.ALPHANUMERIC:l.testKanji(t)?n.KANJI:n.BYTE},n.toString=function(t){if(t&&t.id)return t.id;throw new Error("Invalid mode")},n.isValid=function(t){return t&&t.bit&&t.ccBits};function r(s){if(typeof s!="string")throw new Error("Param is not a string");switch(s.toLowerCase()){case"numeric":return n.NUMERIC;case"alphanumeric":return n.ALPHANUMERIC;case"kanji":return n.KANJI;case"byte":return n.BYTE;default:throw new Error("Unknown mode: "+s)}}n.from=function(t,c){if(n.isValid(t))return t;try{return r(t)}catch{return c}}})(Ze)),Ze}var xs;function wn(){return xs||(xs=1,(function(n){const i=we(),l=As(),r=dt(),s=ye(),t=Is(),c=7973,o=i.getBCHDigit(c);function d(T,v,M){for(let U=1;U<=40;U++)if(v<=n.getCapacity(U,M,T))return U}function g(T,v){return s.getCharCountIndicator(T,v)+4}function k(T,v){let M=0;return T.forEach(function(U){const H=g(U.mode,v);M+=H+U.getBitsLength()}),M}function P(T,v){for(let M=1;M<=40;M++)if(k(T,M)<=n.getCapacity(M,v,s.MIXED))return M}n.from=function(v,M){return t.isValid(v)?parseInt(v,10):M},n.getCapacity=function(v,M,U){if(!t.isValid(v))throw new Error("Invalid QR Code version");typeof U>"u"&&(U=s.BYTE);const H=i.getSymbolTotalCodewords(v),y=l.getTotalCodewordsCount(v,M),D=(H-y)*8;if(U===s.MIXED)return D;const A=D-g(U,v);switch(U){case s.NUMERIC:return Math.floor(A/10*3);case s.ALPHANUMERIC:return Math.floor(A/11*2);case s.KANJI:return Math.floor(A/13);case s.BYTE:default:return Math.floor(A/8)}},n.getBestVersionForData=function(v,M){let U;const H=r.from(M,r.M);if(Array.isArray(v)){if(v.length>1)return P(v,H);if(v.length===0)return 1;U=v[0]}else U=v;return d(U.mode,U.getLength(),H)},n.getEncodedBits=function(v){if(!t.isValid(v)||v<7)throw new Error("Invalid QR Code version");let M=v<<12;for(;i.getBCHDigit(M)-o>=0;)M^=c<<i.getBCHDigit(M)-o;return v<<12|M}})(We)),We}var et={},gs;function yn(){if(gs)return et;gs=1;const n=we(),i=1335,l=21522,r=n.getBCHDigit(i);return et.getEncodedBits=function(t,c){const o=t.bit<<3|c;let d=o<<10;for(;n.getBCHDigit(d)-r>=0;)d^=i<<n.getBCHDigit(d)-r;return(o<<10|d)^l},et}var tt={},st,bs;function jn(){if(bs)return st;bs=1;const n=ye();function i(l){this.mode=n.NUMERIC,this.data=l.toString()}return i.getBitsLength=function(r){return 10*Math.floor(r/3)+(r%3?r%3*3+1:0)},i.prototype.getLength=function(){return this.data.length},i.prototype.getBitsLength=function(){return i.getBitsLength(this.data.length)},i.prototype.write=function(r){let s,t,c;for(s=0;s+3<=this.data.length;s+=3)t=this.data.substr(s,3),c=parseInt(t,10),r.put(c,10);const o=this.data.length-s;o>0&&(t=this.data.substr(s),c=parseInt(t,10),r.put(c,o*3+1))},st=i,st}var nt,vs;function Nn(){if(vs)return nt;vs=1;const n=ye(),i=["0","1","2","3","4","5","6","7","8","9","A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z"," ","$","%","*","+","-",".","/",":"];function l(r){this.mode=n.ALPHANUMERIC,this.data=r}return l.getBitsLength=function(s){return 11*Math.floor(s/2)+6*(s%2)},l.prototype.getLength=function(){return this.data.length},l.prototype.getBitsLength=function(){return l.getBitsLength(this.data.length)},l.prototype.write=function(s){let t;for(t=0;t+2<=this.data.length;t+=2){let c=i.indexOf(this.data[t])*45;c+=i.indexOf(this.data[t+1]),s.put(c,11)}this.data.length%2&&s.put(i.indexOf(this.data[t]),6)},nt=l,nt}var rt,ws;function $n(){if(ws)return rt;ws=1;const n=ye();function i(l){this.mode=n.BYTE,typeof l=="string"?this.data=new TextEncoder().encode(l):this.data=new Uint8Array(l)}return i.getBitsLength=function(r){return r*8},i.prototype.getLength=function(){return this.data.length},i.prototype.getBitsLength=function(){return i.getBitsLength(this.data.length)},i.prototype.write=function(l){for(let r=0,s=this.data.length;r<s;r++)l.put(this.data[r],8)},rt=i,rt}var ot,ys;function kn(){if(ys)return ot;ys=1;const n=ye(),i=we();function l(r){this.mode=n.KANJI,this.data=r}return l.getBitsLength=function(s){return s*13},l.prototype.getLength=function(){return this.data.length},l.prototype.getBitsLength=function(){return l.getBitsLength(this.data.length)},l.prototype.write=function(r){let s;for(s=0;s<this.data.length;s++){let t=i.toSJIS(this.data[s]);if(t>=33088&&t<=40956)t-=33088;else if(t>=57408&&t<=60351)t-=49472;else throw new Error("Invalid SJIS character: "+this.data[s]+`
Make sure your charset is UTF-8`);t=(t>>>8&255)*192+(t&255),r.put(t,13)}},ot=l,ot}var at={exports:{}},js;function Cn(){return js||(js=1,(function(n){var i={single_source_shortest_paths:function(l,r,s){var t={},c={};c[r]=0;var o=i.PriorityQueue.make();o.push(r,0);for(var d,g,k,P,T,v,M,U,H;!o.empty();){d=o.pop(),g=d.value,P=d.cost,T=l[g]||{};for(k in T)T.hasOwnProperty(k)&&(v=T[k],M=P+v,U=c[k],H=typeof c[k]>"u",(H||U>M)&&(c[k]=M,o.push(k,M),t[k]=g))}if(typeof s<"u"&&typeof c[s]>"u"){var y=["Could not find a path from ",r," to ",s,"."].join("");throw new Error(y)}return t},extract_shortest_path_from_predecessor_list:function(l,r){for(var s=[],t=r;t;)s.push(t),l[t],t=l[t];return s.reverse(),s},find_path:function(l,r,s){var t=i.single_source_shortest_paths(l,r,s);return i.extract_shortest_path_from_predecessor_list(t,s)},PriorityQueue:{make:function(l){var r=i.PriorityQueue,s={},t;l=l||{};for(t in r)r.hasOwnProperty(t)&&(s[t]=r[t]);return s.queue=[],s.sorter=l.sorter||r.default_sorter,s},default_sorter:function(l,r){return l.cost-r.cost},push:function(l,r){var s={value:l,cost:r};this.queue.push(s),this.queue.sort(this.sorter)},pop:function(){return this.queue.shift()},empty:function(){return this.queue.length===0}}};n.exports=i})(at)),at.exports}var Ns;function En(){return Ns||(Ns=1,(function(n){const i=ye(),l=jn(),r=Nn(),s=$n(),t=kn(),c=Bs(),o=we(),d=Cn();function g(y){return unescape(encodeURIComponent(y)).length}function k(y,D,A){const I=[];let V;for(;(V=y.exec(A))!==null;)I.push({data:V[0],index:V.index,mode:D,length:V[0].length});return I}function P(y){const D=k(c.NUMERIC,i.NUMERIC,y),A=k(c.ALPHANUMERIC,i.ALPHANUMERIC,y);let I,V;return o.isKanjiModeEnabled()?(I=k(c.BYTE,i.BYTE,y),V=k(c.KANJI,i.KANJI,y)):(I=k(c.BYTE_KANJI,i.BYTE,y),V=[]),D.concat(A,I,V).sort(function(B,R){return B.index-R.index}).map(function(B){return{data:B.data,mode:B.mode,length:B.length}})}function T(y,D){switch(D){case i.NUMERIC:return l.getBitsLength(y);case i.ALPHANUMERIC:return r.getBitsLength(y);case i.KANJI:return t.getBitsLength(y);case i.BYTE:return s.getBitsLength(y)}}function v(y){return y.reduce(function(D,A){const I=D.length-1>=0?D[D.length-1]:null;return I&&I.mode===A.mode?(D[D.length-1].data+=A.data,D):(D.push(A),D)},[])}function M(y){const D=[];for(let A=0;A<y.length;A++){const I=y[A];switch(I.mode){case i.NUMERIC:D.push([I,{data:I.data,mode:i.ALPHANUMERIC,length:I.length},{data:I.data,mode:i.BYTE,length:I.length}]);break;case i.ALPHANUMERIC:D.push([I,{data:I.data,mode:i.BYTE,length:I.length}]);break;case i.KANJI:D.push([I,{data:I.data,mode:i.BYTE,length:g(I.data)}]);break;case i.BYTE:D.push([{data:I.data,mode:i.BYTE,length:g(I.data)}])}}return D}function U(y,D){const A={},I={start:{}};let V=["start"];for(let j=0;j<y.length;j++){const B=y[j],R=[];for(let N=0;N<B.length;N++){const h=B[N],w=""+j+N;R.push(w),A[w]={node:h,lastCount:0},I[w]={};for(let $=0;$<V.length;$++){const S=V[$];A[S]&&A[S].node.mode===h.mode?(I[S][w]=T(A[S].lastCount+h.length,h.mode)-T(A[S].lastCount,h.mode),A[S].lastCount+=h.length):(A[S]&&(A[S].lastCount=h.length),I[S][w]=T(h.length,h.mode)+4+i.getCharCountIndicator(h.mode,D))}}V=R}for(let j=0;j<V.length;j++)I[V[j]].end=0;return{map:I,table:A}}function H(y,D){let A;const I=i.getBestModeForData(y);if(A=i.from(D,I),A!==i.BYTE&&A.bit<I.bit)throw new Error('"'+y+'" cannot be encoded with mode '+i.toString(A)+`.
 Suggested mode is: `+i.toString(I));switch(A===i.KANJI&&!o.isKanjiModeEnabled()&&(A=i.BYTE),A){case i.NUMERIC:return new l(y);case i.ALPHANUMERIC:return new r(y);case i.KANJI:return new t(y);case i.BYTE:return new s(y)}}n.fromArray=function(D){return D.reduce(function(A,I){return typeof I=="string"?A.push(H(I,null)):I.data&&A.push(H(I.data,I.mode)),A},[])},n.fromString=function(D,A){const I=P(D,o.isKanjiModeEnabled()),V=M(I),j=U(V,A),B=d.find_path(j.map,"start","end"),R=[];for(let N=1;N<B.length-1;N++)R.push(j.table[B[N]].node);return n.fromArray(v(R))},n.rawSplit=function(D){return n.fromArray(P(D,o.isKanjiModeEnabled()))}})(tt)),tt}var $s;function Rn(){if($s)return _e;$s=1;const n=we(),i=dt(),l=un(),r=fn(),s=pn(),t=mn(),c=xn(),o=As(),d=vn(),g=wn(),k=yn(),P=ye(),T=En();function v(j,B){const R=j.size,N=t.getPositions(B);for(let h=0;h<N.length;h++){const w=N[h][0],$=N[h][1];for(let S=-1;S<=7;S++)if(!(w+S<=-1||R<=w+S))for(let L=-1;L<=7;L++)$+L<=-1||R<=$+L||(S>=0&&S<=6&&(L===0||L===6)||L>=0&&L<=6&&(S===0||S===6)||S>=2&&S<=4&&L>=2&&L<=4?j.set(w+S,$+L,!0,!0):j.set(w+S,$+L,!1,!0))}}function M(j){const B=j.size;for(let R=8;R<B-8;R++){const N=R%2===0;j.set(R,6,N,!0),j.set(6,R,N,!0)}}function U(j,B){const R=s.getPositions(B);for(let N=0;N<R.length;N++){const h=R[N][0],w=R[N][1];for(let $=-2;$<=2;$++)for(let S=-2;S<=2;S++)$===-2||$===2||S===-2||S===2||$===0&&S===0?j.set(h+$,w+S,!0,!0):j.set(h+$,w+S,!1,!0)}}function H(j,B){const R=j.size,N=g.getEncodedBits(B);let h,w,$;for(let S=0;S<18;S++)h=Math.floor(S/3),w=S%3+R-8-3,$=(N>>S&1)===1,j.set(h,w,$,!0),j.set(w,h,$,!0)}function y(j,B,R){const N=j.size,h=k.getEncodedBits(B,R);let w,$;for(w=0;w<15;w++)$=(h>>w&1)===1,w<6?j.set(w,8,$,!0):w<8?j.set(w+1,8,$,!0):j.set(N-15+w,8,$,!0),w<8?j.set(8,N-w-1,$,!0):w<9?j.set(8,15-w-1+1,$,!0):j.set(8,15-w-1,$,!0);j.set(N-8,8,1,!0)}function D(j,B){const R=j.size;let N=-1,h=R-1,w=7,$=0;for(let S=R-1;S>0;S-=2)for(S===6&&S--;;){for(let L=0;L<2;L++)if(!j.isReserved(h,S-L)){let Q=!1;$<B.length&&(Q=(B[$]>>>w&1)===1),j.set(h,S-L,Q),w--,w===-1&&($++,w=7)}if(h+=N,h<0||R<=h){h-=N,N=-N;break}}}function A(j,B,R){const N=new l;R.forEach(function(L){N.put(L.mode.bit,4),N.put(L.getLength(),P.getCharCountIndicator(L.mode,j)),L.write(N)});const h=n.getSymbolTotalCodewords(j),w=o.getTotalCodewordsCount(j,B),$=(h-w)*8;for(N.getLengthInBits()+4<=$&&N.put(0,4);N.getLengthInBits()%8!==0;)N.putBit(0);const S=($-N.getLengthInBits())/8;for(let L=0;L<S;L++)N.put(L%2?17:236,8);return I(N,j,B)}function I(j,B,R){const N=n.getSymbolTotalCodewords(B),h=o.getTotalCodewordsCount(B,R),w=N-h,$=o.getBlocksCount(B,R),S=N%$,L=$-S,Q=Math.floor(N/$),ee=Math.floor(w/$),fe=ee+1,be=Q-ee,Ce=new d(be);let ve=0;const ie=new Array($),de=new Array($);let ne=0;const pe=new Uint8Array(j.buffer);for(let re=0;re<$;re++){const Z=re<L?ee:fe;ie[re]=pe.slice(ve,ve+Z),de[re]=Ce.encode(ie[re]),ve+=Z,ne=Math.max(ne,Z)}const te=new Uint8Array(N);let me=0,G,Y;for(G=0;G<ne;G++)for(Y=0;Y<$;Y++)G<ie[Y].length&&(te[me++]=ie[Y][G]);for(G=0;G<be;G++)for(Y=0;Y<$;Y++)te[me++]=de[Y][G];return te}function V(j,B,R,N){let h;if(Array.isArray(j))h=T.fromArray(j);else if(typeof j=="string"){let Q=B;if(!Q){const ee=T.rawSplit(j);Q=g.getBestVersionForData(ee,R)}h=T.fromString(j,Q||40)}else throw new Error("Invalid data");const w=g.getBestVersionForData(h,R);if(!w)throw new Error("The amount of data is too big to be stored in a QR Code");if(!B)B=w;else if(B<w)throw new Error(`
The chosen QR Code version cannot contain this amount of data.
Minimum version required to store current data is: `+w+`.
`);const $=A(B,R,h),S=n.getSymbolSize(B),L=new r(S);return v(L,B),M(L),U(L,B),y(L,R,0),B>=7&&H(L,B),D(L,$),isNaN(N)&&(N=c.getBestMask(L,y.bind(null,L,R))),c.applyMask(N,L),y(L,R,N),{modules:L,version:B,errorCorrectionLevel:R,maskPattern:N,segments:h}}return _e.create=function(B,R){if(typeof B>"u"||B==="")throw new Error("No input text");let N=i.M,h,w;return typeof R<"u"&&(N=i.from(R.errorCorrectionLevel,i.M),h=g.from(R.version),w=c.from(R.maskPattern),R.toSJISFunc&&n.setToSJISFunction(R.toSJISFunc)),V(B,h,N,w)},_e}var it={},lt={},ks;function Ps(){return ks||(ks=1,(function(n){function i(l){if(typeof l=="number"&&(l=l.toString()),typeof l!="string")throw new Error("Color should be defined as hex string");let r=l.slice().replace("#","").split("");if(r.length<3||r.length===5||r.length>8)throw new Error("Invalid hex color: "+l);(r.length===3||r.length===4)&&(r=Array.prototype.concat.apply([],r.map(function(t){return[t,t]}))),r.length===6&&r.push("F","F");const s=parseInt(r.join(""),16);return{r:s>>24&255,g:s>>16&255,b:s>>8&255,a:s&255,hex:"#"+r.slice(0,6).join("")}}n.getOptions=function(r){r||(r={}),r.color||(r.color={});const s=typeof r.margin>"u"||r.margin===null||r.margin<0?4:r.margin,t=r.width&&r.width>=21?r.width:void 0,c=r.scale||4;return{width:t,scale:t?4:c,margin:s,color:{dark:i(r.color.dark||"#000000ff"),light:i(r.color.light||"#ffffffff")},type:r.type,rendererOpts:r.rendererOpts||{}}},n.getScale=function(r,s){return s.width&&s.width>=r+s.margin*2?s.width/(r+s.margin*2):s.scale},n.getImageWidth=function(r,s){const t=n.getScale(r,s);return Math.floor((r+s.margin*2)*t)},n.qrToImageData=function(r,s,t){const c=s.modules.size,o=s.modules.data,d=n.getScale(c,t),g=Math.floor((c+t.margin*2)*d),k=t.margin*d,P=[t.color.light,t.color.dark];for(let T=0;T<g;T++)for(let v=0;v<g;v++){let M=(T*g+v)*4,U=t.color.light;if(T>=k&&v>=k&&T<g-k&&v<g-k){const H=Math.floor((T-k)/d),y=Math.floor((v-k)/d);U=P[o[H*c+y]?1:0]}r[M++]=U.r,r[M++]=U.g,r[M++]=U.b,r[M]=U.a}}})(lt)),lt}var Cs;function Sn(){return Cs||(Cs=1,(function(n){const i=Ps();function l(s,t,c){s.clearRect(0,0,t.width,t.height),t.style||(t.style={}),t.height=c,t.width=c,t.style.height=c+"px",t.style.width=c+"px"}function r(){try{return document.createElement("canvas")}catch{throw new Error("You need to specify a canvas element")}}n.render=function(t,c,o){let d=o,g=c;typeof d>"u"&&(!c||!c.getContext)&&(d=c,c=void 0),c||(g=r()),d=i.getOptions(d);const k=i.getImageWidth(t.modules.size,d),P=g.getContext("2d"),T=P.createImageData(k,k);return i.qrToImageData(T.data,t,d),l(P,g,k),P.putImageData(T,0,0),g},n.renderToDataURL=function(t,c,o){let d=o;typeof d>"u"&&(!c||!c.getContext)&&(d=c,c=void 0),d||(d={});const g=n.render(t,c,d),k=d.type||"image/png",P=d.rendererOpts||{};return g.toDataURL(k,P.quality)}})(it)),it}var ct={},Es;function Tn(){if(Es)return ct;Es=1;const n=Ps();function i(s,t){const c=s.a/255,o=t+'="'+s.hex+'"';return c<1?o+" "+t+'-opacity="'+c.toFixed(2).slice(1)+'"':o}function l(s,t,c){let o=s+t;return typeof c<"u"&&(o+=" "+c),o}function r(s,t,c){let o="",d=0,g=!1,k=0;for(let P=0;P<s.length;P++){const T=Math.floor(P%t),v=Math.floor(P/t);!T&&!g&&(g=!0),s[P]?(k++,P>0&&T>0&&s[P-1]||(o+=g?l("M",T+c,.5+v+c):l("m",d,0),d=0,g=!1),T+1<t&&s[P+1]||(o+=l("h",k),k=0)):d++}return o}return ct.render=function(t,c,o){const d=n.getOptions(c),g=t.modules.size,k=t.modules.data,P=g+d.margin*2,T=d.color.light.a?"<path "+i(d.color.light,"fill")+' d="M0 0h'+P+"v"+P+'H0z"/>':"",v="<path "+i(d.color.dark,"stroke")+' d="'+r(k,g,d.margin)+'"/>',M='viewBox="0 0 '+P+" "+P+'"',H='<svg xmlns="http://www.w3.org/2000/svg" '+(d.width?'width="'+d.width+'" height="'+d.width+'" ':"")+M+' shape-rendering="crispEdges">'+T+v+`</svg>
`;return typeof o=="function"&&o(null,H),H},ct}var Rs;function An(){if(Rs)return ke;Rs=1;const n=hn(),i=Rn(),l=Sn(),r=Tn();function s(t,c,o,d,g){const k=[].slice.call(arguments,1),P=k.length,T=typeof k[P-1]=="function";if(!T&&!n())throw new Error("Callback required as last argument");if(T){if(P<2)throw new Error("Too few arguments provided");P===2?(g=o,o=c,c=d=void 0):P===3&&(c.getContext&&typeof g>"u"?(g=d,d=void 0):(g=d,d=o,o=c,c=void 0))}else{if(P<1)throw new Error("Too few arguments provided");return P===1?(o=c,c=d=void 0):P===2&&!c.getContext&&(d=o,o=c,c=void 0),new Promise(function(v,M){try{const U=i.create(o,d);v(t(U,c,d))}catch(U){M(U)}})}try{const v=i.create(o,d);g(null,t(v,c,d))}catch(v){g(v)}}return ke.create=i.create,ke.toCanvas=s.bind(null,l.render),ke.toDataURL=s.bind(null,l.renderToDataURL),ke.toString=s.bind(null,function(t,c,o){return r.render(t,o)}),ke}var In=An();const Bn=zs(In);function J(n){return n==null?"":String(n).replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;")}function u(n){if(n==null||n==="")return"";const l=String(n).split(/\r?\n/),r=s=>{if(!s)return"";try{const t=Intl;if(typeof Intl<"u"&&t.Segmenter){const c=new t.Segmenter("th",{granularity:"word"}),o=[];for(const d of c.segment(s)){const g=d.segment;/^\s+$/.test(g)?o.push(" "):o.push(`<span class="w-seg">${J(g)}</span>`)}return o.join("")}}catch{}return J(s)};return l.map(r).join("<br/>")}function Pn(n){try{const i=Bn.create(n,{errorCorrectionLevel:"M"}),l=i.modules.size,r=2,s=l+r*2;let t="";for(let o=0;o<l;o++)for(let d=0;d<l;d++)i.modules.get(o,d)&&(t+=`<rect x="${d+r}" y="${o+r}" width="1" height="1" fill="#0f172a"/>`);const c=`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${s} ${s}" width="200" height="200" shape-rendering="crispEdges"><rect width="100%" height="100%" fill="#ffffff"/>${t}</svg>`;return`data:image/svg+xml;utf8,${encodeURIComponent(c)}`}catch{return""}}function Ln(n,i,l){var de,ne,pe,te,me,G,Y,re,Z,xe,Ee,Re,he;const r=n.type==="supplier",s=n.type==="location",t=r?n:null,c=s?n:null,o=n.type==="drink_store"?n:null,d=r?t.name:s?c.name:o.storeName,g=r?t.chineseName:s?c.foreignName:o.chineseName,k=r?t.category:s?c.locationType==="mall"?"ห้างสรรพสินค้า":c.locationType:o.storeCategory||"เรฟร้านน้ำ",P=r?t.marketOrCity:s?c.location.addressText||c.zoneOrFloor:o.city,T=n.country==="TH"?"ประเทศไทย (TH)":"ประเทศจีน (CN)",v=typeof window<"u"&&window.location.origin&&!window.location.hostname.includes("localhost")&&!window.location.hostname.includes("127.0.0.1")?`${window.location.origin}${window.location.pathname}`:"https://vitcha-sourcing-fxjw.onrender.com/",U=`${v.endsWith("/")?v:`${v}/`}?view=${encodeURIComponent(n.id)}&type=${encodeURIComponent(n.type)}`,H=Pn(U),y=[];t?((de=t.photos.storefrontAndAtmosphere)==null||de.forEach((m,f)=>y.push({url:m,label:`ป้ายหน้าร้าน / บรรยากาศ #${f+1}`})),(ne=t.photos.contactCards)==null||ne.forEach((m,f)=>y.push({url:m,label:`นามบัตร / WeChat #${f+1}`})),(pe=t.catalogItems)==null||pe.forEach((m,f)=>{m.photo&&y.push({url:m.photo,label:m.name?`สินค้า: ${m.name}`:`รายการสินค้า #${f+1}`})})):c?((te=c.photos.storefrontAndAtmosphere)==null||te.forEach((m,f)=>y.push({url:m,label:`หน้าร้าน / ทางเดิน #${f+1}`})),(me=c.photos.floorPlanAndSpecs)==null||me.forEach((m,f)=>y.push({url:m,label:`ผังห้อง / งานระบบ #${f+1}`})),(G=c.photos.surroundingNeighbors)==null||G.forEach((m,f)=>y.push({url:m,label:`ร้านข้างเคียง #${f+1}`})),(Y=c.photos.contactCards)==null||Y.forEach((m,f)=>y.push({url:m,label:`นามบัตร / เอกสารสัญญา #${f+1}`}))):o&&((re=o.photos.storefrontAndAtmosphere)==null||re.forEach((m,f)=>y.push({url:m,label:`หน้าร้าน / บรรยากาศ #${f+1}`})),(Z=o.photos.menuBoard)==null||Z.forEach((m,f)=>y.push({url:m,label:`ป้ายเมนู / ราคา #${f+1}`})),(xe=o.photos.drinkCups)==null||xe.forEach((m,f)=>y.push({url:m,label:`แก้วเครื่องดื่ม #${f+1}`})),(Ee=o.drinkItems)==null||Ee.forEach((m,f)=>{m.photo&&y.push({url:m.photo,label:m.name?`เมนูชิม: ${m.name}`:`แก้วชิม #${f+1}`})}));const D=ce(n),A=[];D.forEach((m,f)=>{A.push({label:m.label||`คลิปเสียงหน้างาน #${f+1}`,durationSec:m.durationSec||4,source:"บันทึกเสียงหลักหน้างานจริง"})}),t?(t.catalogItems||[]).forEach((m,f)=>{ce(m).forEach((q,oe)=>{A.push({label:q.label||`คลิปเสียงสินค้า #${oe+1}`,durationSec:q.durationSec||4,source:`สินค้า: ${m.name||`รายการที่ #${f+1}`}`})})}):o&&(o.drinkItems||[]).forEach((m,f)=>{ce(m).forEach((q,oe)=>{A.push({label:q.label||`คลิปเสียงเมนู #${oe+1}`,durationSec:q.durationSec||4,source:`เมนู: ${m.name||`แก้วที่ #${f+1}`}`})})});const I=Array.isArray(n.videos)?n.videos.filter(Boolean):[],V=((Re=y[0])==null?void 0:Re.url)||"./logo.jpg",j=Array.isArray(n.viewedBy)?n.viewedBy:[],B=Array.isArray(n.likes)?n.likes:[],R=Array.isArray(n.reviewerNotes)?n.reviewerNotes:[],N=Array.isArray(n.history)?n.history:[],h=N.length>0?N:[{action:"สร้างบันทึกรายการสำรวจ",user:n.creator.alias,userAvatar:n.creator.avatar,timestamp:n.creator.timestamp}],w=`ฉันจะเป็นหัวแถว-${d.replace(/[^a-zA-Z0-9ก-๙_-]/g,"_")}.pdf`,S={awaiting:"พาร์ท 1: รอรับช่วงต่อ",rfq_sent:"พาร์ท 2: ขอสเปก / ส่ง RFQ",sample_test:"พาร์ท 3: ทดสอบตัวอย่าง Lab / R&D",negotiate:"พาร์ท 4: ต่อรองราคา & MOQ",approved:"พาร์ท 5: ตัวเต็งอนุมัติ",ordered:"พาร์ท 6: สั่งซื้อสำเร็จ"}[n.handoffStage||"awaiting"]||"พาร์ท 1: รอรับช่วงต่อ",L=A.length>0?`<div class="media-grid">
          ${A.map((m,f)=>`
              <div class="voice-card">
                <div class="voice-icon">▶</div>
                <div class="voice-meta">
                  <div class="voice-title">${u(`${f+1}. ${m.label}`)}</div>
                  <div class="voice-sub">${u(`${m.source} · ความยาว ${m.durationSec} วินาที`)}</div>
                  <div class="voice-wave">${u("ılıll|ılıl||ılıll|ılı · สแกน QR เพื่อกดฟังเสียงจริง")}</div>
                </div>
              </div>`).join("")}
        </div>`:`<div class="empty-note">${u("ไม่มีไฟล์เสียงบันทึกในรายการนี้")}</div>`,Q=I.length>0?`<div class="video-grid">
          ${I.map((m,f)=>{const q=m.includes("gtv-videos-bucket")?on:m;return`
              <div class="video-card">
                <div class="video-thumb-wrap">
                  <img
                    id="video-thumb-img-${f}"
                    class="video-thumb-img"
                    src="${J(V)}"
                    crossorigin="anonymous"
                    data-video-src="${J(q)}"
                  />
                  <div class="video-overlay-top">
                    <span class="video-chip">VIDEO CLIP #${f+1}</span>
                    <span class="video-chip-right">HD PREVIEW</span>
                  </div>
                  <div class="video-play-circle">▶</div>
                  <div class="video-overlay-bottom">
                    <span>${u(`คลิปวิดีโอที่ ${f+1} · สแกน QR Code ด้านบนเพื่อเปิดเล่นวิดีโอ`)}</span>
                  </div>
                </div>
                <div class="video-caption">
                  <div class="video-caption-title">${u(`คลิปวิดีโอหน้างาน #${f+1} (จากทั้งหมด ${I.length} คลิป)`)}</div>
                  <div class="video-caption-sub">${u("เอกสารกระดาษแสดงภาพ Thumbnail ตัวอย่าง — สแกน QR Code เพื่อรับชมวิดีโอเคลื่อนไหวพร้อมเสียง")}</div>
                </div>
              </div>`}).join("")}
        </div>`:`<div class="empty-note">${u("ไม่มีคลิปวิดีโอในรายการนี้")}</div>`;let ee="";if(r&&t){const m=(t.catalogItems||[]).map((f,q)=>{const oe=ce(f);return`
        <tr>
          <td style="text-align:center;font-weight:700;">${q+1}</td>
          <td>
            ${f.photo?`<img src="${J(f.photo)}" crossorigin="anonymous" class="table-thumb" />`:'<div class="table-thumb-empty">ไม่มีรูป</div>'}
          </td>
          <td>
            <div class="cell-title">${u(f.name||`รายการที่ #${q+1}`)}</div>
            ${f.memo?`<div class="cell-sub">${u(f.memo)}</div>`:""}
            ${oe.length>0?`<div class="cell-voice-badge">แนบเสียงบันทึก ${oe.length} คลิป</div>`:""}
          </td>
          <td>
            <div class="cell-text">${u(f.dimensions||"-")}</div>
            <div class="cell-sub">${u(f.weightKg?`น้ำหนัก: ${f.weightKg}`:"")}</div>
          </td>
          <td>
            <div class="cell-price-green">
              ${f.priceRmb?`¥${f.priceRmb.toLocaleString()}`:f.priceThb?`฿${f.priceThb.toLocaleString()}`:"-"}
            </div>
            ${f.priceRmb?`<div class="cell-sub">(≈ ฿${i(f.priceRmb).toLocaleString()})</div>`:""}
          </td>
        </tr>`}).join("");ee=`
      <div class="section-box">
        <div class="section-title">${u(`กลุ่มที่ 3: รายการสินค้า / อุปกรณ์ / วัตถุดิบ (${(t.catalogItems||[]).length} รายการ)`)}</div>
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
                    <th>${u("รูปภาพ")}</th>
                    <th>${u("ชื่อรายการ & รายละเอียดสเปก")}</th>
                    <th>${u("ขนาด / น้ำหนัก")}</th>
                    <th>${u("ราคาประเมิน")}</th>
                  </tr>
                </thead>
                <tbody>${m}</tbody>
              </table>`:`<div class="empty-note">${u("ไม่มีรายการย่อย")}</div>`}
      </div>
    `}else if(o){const m=(o.drinkItems||[]).map((f,q)=>{const oe=ce(f);return`
        <tr>
          <td style="text-align:center;font-weight:700;">${q+1}</td>
          <td>
            ${f.photo?`<img src="${J(f.photo)}" crossorigin="anonymous" class="table-thumb" />`:'<div class="table-thumb-empty">ไม่มีรูป</div>'}
          </td>
          <td>
            <div class="cell-title">${u(f.name||`แก้วที่ #${q+1}`)}</div>
            ${f.gimmickNotes?`<div class="cell-sub">${u(`กิมมิก: ${f.gimmickNotes}`)}</div>`:""}
            ${oe.length>0?`<div class="cell-voice-badge">แนบเสียงบันทึก ${oe.length} คลิป</div>`:""}
          </td>
          <td>
            <div class="cell-text">${u(f.cupSize||"-")}</div>
          </td>
          <td>
            <div class="cell-text">${u(f.fitMenuTarget||"-")}</div>
          </td>
          <td>
            <div class="cell-price-amber">
              ${f.priceRmb?`¥${f.priceRmb.toLocaleString()}`:f.priceThb?`฿${f.priceThb.toLocaleString()}`:"-"}
            </div>
            ${f.priceRmb?`<div class="cell-sub">(≈ ฿${i(f.priceRmb).toLocaleString()})</div>`:""}
          </td>
        </tr>`}).join("");ee=`
      <div class="section-box">
        <div class="section-title">${u(`กลุ่มที่ 3: เมนูที่ชิม & การถอดรหัสสูตร (${(o.drinkItems||[]).length} เมนู)`)}</div>
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
                    <th>${u("รูปแก้ว")}</th>
                    <th>${u("ชื่อเมนู & กิมมิก")}</th>
                    <th>${u("ขนาดแก้ว")}</th>
                    <th>${u("ต่อยอดเมนูของเรา")}</th>
                    <th>${u("ราคาขาย")}</th>
                  </tr>
                </thead>
                <tbody>${m}</tbody>
              </table>`:`<div class="empty-note">${u("ไม่มีเมนูย่อย")}</div>`}
      </div>
    `}const fe=y.length>0?`<div class="photo-grid">
          ${y.map((m,f)=>`
              <div class="photo-card">
                <img src="${J(m.url)}" crossorigin="anonymous" />
                <div class="photo-caption">${u(`รูปที่ ${f+1}: ${m.label}`)}</div>
              </div>`).join("")}
        </div>`:`<div class="empty-note">${u("ไม่มีรูปภาพในรายการนี้")}</div>`,be=R.length>0?R.map((m,f)=>`
          <div class="comment-box">
            <div class="comment-header">
              <span class="comment-author">${u(`ความคิดเห็นที่ #${f+1} โดย: ${m.author}`)}</span>
              <span class="comment-time">${J(new Date(m.timestamp).toLocaleString("th-TH"))}</span>
            </div>
            <div class="comment-body">${u(m.text)}</div>
            ${m.photoUrl?`<div style="margin-top:6px;"><img src="${J(m.photoUrl)}" crossorigin="anonymous" style="width:96px;height:96px;object-fit:cover;border-radius:6px;border:1px solid #cbd5e1;" /></div>`:""}
            ${m.voiceUrl?`<div class="cell-voice-badge" style="margin-top:4px;">${u("มีไฟล์เสียงแนบในความคิดเห็นนี้ (สแกน QR เพื่อฟัง)")}</div>`:""}
            ${m.replies&&m.replies.length>0?`<div class="reply-list">
                    ${m.replies.map(q=>`
                        <div class="reply-item">
                          <div class="comment-header">
                            <span class="comment-author">${u(`ตอบกลับโดย: ${q.author}${q.replyToAuthor?` (ถึง @${q.replyToAuthor})`:""}`)}</span>
                            <span class="comment-time">${J(new Date(q.timestamp).toLocaleString("th-TH"))}</span>
                          </div>
                          <div class="comment-body">${u(q.text)}</div>
                          ${q.photoUrl?`<div style="margin-top:6px;"><img src="${J(q.photoUrl)}" crossorigin="anonymous" style="width:80px;height:80px;object-fit:cover;border-radius:6px;border:1px solid #cbd5e1;" /></div>`:""}
                          ${q.voiceUrl?`<div class="cell-voice-badge" style="margin-top:4px;">${u("มีไฟล์เสียงแนบในคำตอบนี้")}</div>`:""}
                        </div>`).join("")}
                  </div>`:""}
          </div>`).join(""):`<div class="empty-note">${u("ยังไม่มีความคิดเห็นในรายการนี้")}</div>`,Ce=h.map((m,f)=>{const q=m.action==="handoff"?"อัปเดตสถานะการส่งต่องาน (Handoff)":m.action==="comment"?"เพิ่มความคิดเห็นในรายการ":m.action==="reply"?"ตอบกลับความคิดเห็น":m.action;return`
      <tr>
        <td style="text-align:center;font-weight:700;">${f+1}</td>
        <td><div class="cell-title">${u(m.user)}</div></td>
        <td><div class="cell-text">${u(q)}</div></td>
        <td><div class="cell-sub">${J(new Date(m.timestamp).toLocaleString("th-TH"))}</div></td>
      </tr>`}).join(""),ve=j.length>0?`<table class="data-table" style="margin-top:10px;">
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
              <th>${u("ผู้เปิดอ่าน (นามแฝง)")}</th>
              <th>${u("ระดับสิทธิ์")}</th>
              <th>${u("เปิดอ่านล่าสุดเมื่อ")}</th>
              <th style="text-align:center;">${u("จำนวนครั้ง")}</th>
            </tr>
          </thead>
          <tbody>
            ${j.map((m,f)=>`
              <tr>
                <td style="text-align:center;">${f+1}</td>
                <td><div class="cell-title">${u(`${m.alias} (${m.name})`)}</div></td>
                <td><div class="cell-text">${J(m.role.toUpperCase())}</div></td>
                <td><div class="cell-sub">${J(new Date(m.lastViewedAt).toLocaleString("th-TH"))}</div></td>
                <td style="text-align:center;font-weight:700;">${u(`${m.viewCount||1} ครั้ง`)}</td>
              </tr>`).join("")}
          </tbody>
        </table>`:`<div class="empty-note" style="margin-top:8px;">${u("ยังไม่มีประวัติผู้เปิดอ่านเพิ่มเติม")}</div>`,ie=r?`คะแนนประเมิน ${(t==null?void 0:t.rating)||5}/5 ดาว (${t!=null&&t.isFactory?"โรงงานผลิต":"หน้าร้าน/โชว์รูม"})`:`รสชาติ ${o==null?void 0:o.ratings.taste}/5 · ดีไซน์ ${o==null?void 0:o.ratings.aesthetics}/5 · คุ้มค่า ${o==null?void 0:o.ratings.value}/5 · ความไว ${o==null?void 0:o.ratings.speed}/5`;return`<!DOCTYPE html>
<html lang="th">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=840, initial-scale=0.45, minimum-scale=0.3, maximum-scale=2.0, user-scalable=yes" />
  <title>ฉันจะเป็นหัวแถว - ${J(d)}</title>
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
      <strong style="font-size:14px;">รายงานสรุปฉบับสมบูรณ์: ${J(d)}</strong>
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
          <div class="badge">${u(`${r?"รายงานซัพพลายเออร์ & โรงงาน":"รายงานเรฟร้านน้ำ & R&D"} · ${T}`)}</div>
          <h1 class="brand-title">${u(d)}</h1>
          <div class="brand-sub">${u(`${g?`${g} · `:""}หมวดหมู่: ${k}`)}</div>

          <!-- At-a-glance Multimedia & Detail Counter Pills -->
          <div class="summary-pills">
            <span class="summary-pill">${u(`รูปภาพ ${y.length} รูป`)}</span>
            <span class="summary-pill">${u(`วอยซ์เสียง ${A.length} คลิป`)}</span>
            <span class="summary-pill">${u(`วิดีโอ ${I.length} คลิป`)}</span>
            <span class="summary-pill">${u(r?`สินค้า ${((t==null?void 0:t.catalogItems)||[]).length} รายการ`:`เมนูชิม ${((o==null?void 0:o.drinkItems)||[]).length} เมนู`)}</span>
            <span class="summary-pill">${u(`คอมเมนต์ ${R.length} หัวข้อ`)}</span>
            <span class="summary-pill">${u(`ประวัติ Log ${h.length} รายการ`)}</span>
          </div>

          <div class="direct-link-bar">
            <div class="info-label" style="color:#0f172a;margin-bottom:2px;">Direct Link (Scan QR / LINE Share):</div>
            <div style="color:#059669;font-family:monospace;font-size:10px;word-break:break-all;">${J(U)}</div>
          </div>
        </div>

        <div class="header-right">
          <div class="meta-box">
            <div class="meta-platform">${u("ฉันจะเป็นหัวแถว")}</div>
            <div>LEAD THE FRONT · R&amp;D</div>
            <div style="margin-top:4px;">${u(`รหัส: ${n.id.slice(0,18)}`)}</div>
            <div>${u(`สถานะ: ${S}`)}</div>
            <div>${u(`ออกรายงาน: ${new Date().toLocaleString("th-TH")}`)}</div>
          </div>

          ${H?`<div class="qr-card">
                  <img id="report-qr-img" src="${H}" alt="QR Code" />
                  <div class="qr-label">${u("สแกนเปิดในแอป")}</div>
                  <div class="qr-sub">${u("ฟังเสียง · ดูคลิปจริง")}</div>
                </div>`:""}
        </div>
      </div>

      <!-- Group 1: Overview, Contacts, Location & Handoff -->
      <div class="section-box">
        <div class="section-title">${u("กลุ่มที่ 1: ข้อมูลหลัก พิกัดสถานที่ ช่องทางติดต่อ และการรับช่วงต่อ")}</div>
        <div class="info-grid">
          <div class="info-item">
            <span class="info-label">${u("ชื่อรายการ / ร้านค้า")}</span>
            <span class="info-value">${u(`${d}${g?` (${g})`:""}`)}</span>
          </div>
          <div class="info-item">
            <span class="info-label">${u("หมวดหมู่ & คะแนนประเมิน")}</span>
            <span class="info-value">${u(`${k} · ${ie}`)}</span>
          </div>
          <div class="info-item">
            <span class="info-label">${u("สถานที่ / ตลาด / เมือง")}</span>
            <span class="info-value">${u(P||((he=n.location)==null?void 0:he.addressText)||"-")}</span>
          </div>
          <div class="info-item">
            <span class="info-label">${u("พิกัด GPS & แผนที่")}</span>
            <span class="info-value">${n.location?`${n.location.lat.toFixed(5)}, ${n.location.lng.toFixed(5)} (${J(n.location.addressText||"พิกัดหน้างาน")})`:"-"}</span>
          </div>
          <div class="info-item">
            <span class="info-label">${u("ช่องทางติดต่อ (WeChat / LINE / โทรศัพท์)")}</span>
            <span class="info-value">${u(`WeChat: ${(r?t==null?void 0:t.wechatId:o==null?void 0:o.wechatId)||"-"} | LINE: ${(r?t==null?void 0:t.lineId:o==null?void 0:o.lineId)||"-"} | โทร: ${(r?t==null?void 0:t.phone:o==null?void 0:o.phone)||"-"}`)}</span>
          </div>
          <div class="info-item">
            <span class="info-label">${u("ผู้ลงพื้นที่สำรวจ & เวลาที่บันทึก")}</span>
            <span class="info-value">${u(`${n.creator.alias}${n.creator.name&&n.creator.name!==n.creator.alias?` (${n.creator.name})`:""} · ${new Date(n.creator.timestamp).toLocaleString("th-TH")}`)}</span>
          </div>
          <div class="info-item">
            <span class="info-label">${u("ผู้รับผิดชอบรับช่วงต่อ & กำหนดติดตาม")}</span>
            <span class="info-value">${u(`${n.assignedTo||"ยังไม่ระบุผู้รับผิดชอบ"} · กำหนดติดตาม: ${n.targetFollowUpDate||"-"}`)}</span>
          </div>
          <div class="info-item">
            <span class="info-label">${u("การมีส่วนร่วมของทีม (Likes & Views)")}</span>
            <span class="info-value">${u(`กดถูกใจ ${B.length} คน · เปิดอ่านแล้ว ${j.length} คน`)}</span>
          </div>
        </div>

        ${(r?t!=null&&t.memo:o!=null&&o.tastingNotes)?`<div class="note-banner">
                <div class="note-banner-title">${u(r?"บันทึกภาพรวมหน้างาน / รายละเอียดสเปกหลัก:":"บันทึกรีวิวรสชาติ & ไอเดียเรฟหน้างาน:")}</div>
                <div class="note-banner-body">${u(r?t==null?void 0:t.memo:o==null?void 0:o.tastingNotes)}</div>
              </div>`:""}

        ${n.handoffNotes?`<div class="handoff-banner">
                <div class="handoff-banner-title">${u("โน้ตการส่งมอบงาน / ผลเจรจาทีมไทย:")}</div>
                <div class="note-banner-body">${u(n.handoffNotes)}</div>
              </div>`:""}
      </div>

      <!-- Group 2: Voice Recordings & Video Clips with Thumbnail Previews -->
      <div class="section-box">
        <div class="section-title">${u(`กลุ่มที่ 2: สื่อมัลติมีเดียหน้างาน — วอยซ์เสียงบันทึก (${A.length} คลิป) & วิดีโอ (${I.length} คลิป)`)}</div>
        <div class="media-subhead">${u(`ไฟล์เสียงบันทึกหน้างานจริง (${A.length} คลิป):`)}</div>
        ${L}
        <div class="media-subhead" style="margin-top:10px;">${u(`คลิปวิดีโอหน้างานพร้อมภาพ Thumbnail พรีวิว (${I.length} คลิป):`)}</div>
        ${Q}
      </div>

      <!-- Group 3: Catalog / Drink Items -->
      ${ee}

      <!-- Group 4: All Photos of This Item -->
      <div class="section-box">
        <div class="section-title">${u(`กลุ่มที่ 4: แกลเลอรีภาพถ่ายทั้งหมดของรายการนี้ (${y.length} รูป)`)}</div>
        ${fe}
      </div>

      <!-- Group 5: All Threaded Comments & Replies -->
      <div class="section-box">
        <div class="section-title">${u(`กลุ่มที่ 5: บันทึกความคิดเห็นและการตอบกลับทั้งหมด (${R.length} หัวข้อสนทนา)`)}</div>
        ${be}
      </div>

      <!-- Group 6: Activity & Handoff Log + Viewer Log -->
      <div class="section-box">
        <div class="section-title">${u(`กลุ่มที่ 6: ประวัติการดำเนินงาน (${h.length} รายการ) & ผู้เปิดอ่าน (${j.length} คน)`)}</div>
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
              <th>${u("ผู้ปฏิบัติงาน")}</th>
              <th>${u("รายการที่ดำเนินการ / ส่งต่องาน")}</th>
              <th>${u("วันและเวลา")}</th>
            </tr>
          </thead>
          <tbody>${Ce}</tbody>
        </table>
        ${ve}
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
</html>`}function Ss(n,i,l){const r=Ln(n,i,l),s=window.open("","_blank");if(s)s.document.open(),s.document.write(r),s.document.close();else{const t=new Blob([r],{type:"text/html;charset=utf-8"}),c=URL.createObjectURL(t),o=document.createElement("a");o.href=c,o.target="_blank",o.click()}}const qn=({item:n,isOpen:i,onClose:l,onShareToLine:r})=>{var xt,gt,bt,vt,wt,yt,jt,Nt,$t,kt,Ct,Et,Rt,St,Tt,At,It,Bt,Pt,Lt,Mt,Ut,Dt,zt,Ft,qt,_t,Ht,Vt,Ot,Kt,Qt,Gt,Jt,Yt;const{currentUser:s,convertCnyToThb:t,addReviewerNote:c,addReviewReply:o,updatePipelineStatus:d,toggleLikeItem:g,suppliers:k,drinkStores:P,locations:T,users:v,quickMessages:M,recordItemView:U,canEditItems:H,canDeleteItems:y,deleteSupplier:D,deleteStoreInspo:A,deleteLocation:I,canComment:V,openEditItem:j}=Fs(),B=n&&n.type==="supplier"?k.find(a=>a.id===n.id):null,R=n&&n.type==="drink_store"?P.find(a=>a.id===n.id):null,N=n&&n.type==="location"?T.find(a=>a.id===n.id):null,h=B||R||N||n,[w,$]=se.useState(null),[S,L]=se.useState(""),[Q,ee]=se.useState(null),[fe,be]=se.useState({}),[Ce,ve]=se.useState({}),[ie,de]=se.useState(null),[ne,pe]=se.useState(null),[te,me]=se.useState(!1),[G,Y]=se.useState({}),re=je.useRef(null),[Z,xe]=se.useState(null),[Ee,Re]=se.useState(0),he=je.useRef(null),m=je.useRef(null),f=je.useRef(null),q=je.useRef(0),oe=je.useCallback(()=>{var a;if(f.current&&(clearInterval(f.current),f.current=null),he.current&&he.current.state==="recording"){he.current.stop();return}(a=m.current)==null||a.getTracks().forEach(p=>p.stop()),m.current=null,xe(null)},[]);se.useEffect(()=>(i&&(n!=null&&n.id)&&U(n.id,n.type),$(null),()=>{var a,p;f.current&&clearInterval(f.current),((a=he.current)==null?void 0:a.state)==="recording"&&he.current.stop(),(p=m.current)==null||p.getTracks().forEach(x=>x.stop())}),[i,n==null?void 0:n.id]);const F=[];if(h){if(h.type==="supplier"){const a=h;(xt=a.photos.storefrontAndAtmosphere)==null||xt.forEach((p,x)=>F.push({url:p,label:`ป้ายหน้าร้าน/บรรยากาศ #${x+1}`})),(gt=a.photos.contactCards)==null||gt.forEach((p,x)=>F.push({url:p,label:`นามบัตร/WeChat #${x+1}`})),(bt=a.catalogItems)==null||bt.forEach((p,x)=>{p.photo&&F.push({url:p.photo,label:p.name?`สินค้า: ${p.name}`:`รายการสินค้า #${x+1}`})})}else if(h.type==="drink_store"){const a=h;(vt=a.photos.storefrontAndAtmosphere)==null||vt.forEach((p,x)=>F.push({url:p,label:`หน้าร้าน/บรรยากาศ #${x+1}`})),(wt=a.photos.menuBoard)==null||wt.forEach((p,x)=>F.push({url:p,label:`เมนูบอร์ด #${x+1}`})),(yt=a.photos.drinkCups)==null||yt.forEach((p,x)=>F.push({url:p,label:`แก้วเครื่องดื่ม #${x+1}`})),(jt=a.drinkItems)==null||jt.forEach((p,x)=>{p.photo&&F.push({url:p.photo,label:p.name?`เมนู: ${p.name}`:`เมนูชิม #${x+1}`})})}else if(h.type==="location"){const a=h;(Nt=a.photos.storefrontAndAtmosphere)==null||Nt.forEach((p,x)=>F.push({url:p,label:`หน้าร้าน/ทางเดิน #${x+1}`})),($t=a.photos.floorPlanAndSpecs)==null||$t.forEach((p,x)=>F.push({url:p,label:`ผังห้อง/งานระบบ #${x+1}`})),(kt=a.photos.surroundingNeighbors)==null||kt.forEach((p,x)=>F.push({url:p,label:`ร้านข้างเคียง #${x+1}`})),(Ct=a.photos.contactCards)==null||Ct.forEach((p,x)=>F.push({url:p,label:`นามบัตร/เอกสาร #${x+1}`}))}}if(se.useEffect(()=>{if(w===null||F.length===0)return;const a=p=>{p.key==="ArrowRight"?$(x=>x!==null?(x+1)%F.length:null):p.key==="ArrowLeft"?$(x=>x!==null?(x-1+F.length)%F.length:null):p.key==="Escape"&&$(null)};return window.addEventListener("keydown",a),()=>window.removeEventListener("keydown",a)},[w,F.length]),!i||!h)return null;const K=h.type==="supplier",Ls=h.type==="drink_store",X=h.type==="location",C=K?h:null,E=Ls?h:null,b=X?h:null,Ae=Array.isArray(h.likes)?h.likes:[],ht=Ae.some(a=>a.userId===s.id),ut=a=>{const p=F.findIndex(x=>x.url===a);$(p>=0?p:0)},ft=async()=>{if(!h)return;const a=K?C==null?void 0:C.name:X?b==null?void 0:b.name:E==null?void 0:E.storeName;if(window.confirm(`ยืนยันการลบรายการ "${a||"รายการนี้"}" หรือไม่?`))try{h.type==="supplier"?await D(h.id):h.type==="drink_store"?await A(h.id):h.type==="location"&&await I(h.id),l()}catch{alert("เกิดข้อผิดพลาดในการลบรายการ")}},ze=async(a,p,x)=>{try{me(!0);const _=await rn(a,{recordId:h.id,recordType:h.type,recordTitle:K?C==null?void 0:C.name:X?b==null?void 0:b.name:E==null?void 0:E.storeName});x?Y(O=>({...O,[x]:{...O[x],...p==="photo"?{photoUrl:_}:{voiceUrl:_}}})):p==="photo"?de(_):pe(_)}catch(_){alert(_.message||"อัปโหลดไฟล์แนบไม่สำเร็จ")}finally{me(!1)}},pt=async a=>{var p,x;if(Z===a){oe();return}Z&&oe();try{if(!((p=navigator.mediaDevices)!=null&&p.getUserMedia)||typeof MediaRecorder>"u"){alert("เบราว์เซอร์นี้ไม่รองรับการอัดเสียงสด กรุณาเปิดผ่าน HTTPS หรืออนุญาตไมโครโฟน");return}const _=await navigator.mediaDevices.getUserMedia({audio:!0});m.current=_;const O=["audio/mp4","audio/webm;codecs=opus","audio/webm","audio/ogg"].find(W=>MediaRecorder.isTypeSupported(W)),ae=new MediaRecorder(_,O?{mimeType:O}:void 0);he.current=ae;const ue=[];ae.ondataavailable=W=>{W.data.size>0&&ue.push(W.data)},ae.onstop=()=>{var Se;f.current&&(clearInterval(f.current),f.current=null),_.getTracks().forEach(Pe=>Pe.stop()),m.current=null,xe(null);const W=((Se=ae.mimeType)==null?void 0:Se.split(";")[0])||"audio/webm",z=new Blob(ue,{type:W});if(!z.size)return;const Fe=W.includes("mp4")?"m4a":W.includes("ogg")?"ogg":"webm",Be=new File([z],`เสียงคอมเมนต์-${Date.now()}.${Fe}`,{type:W});ze(Be,"audio",a==="main"?void 0:a)},ae.onerror=()=>{f.current&&clearInterval(f.current),_.getTracks().forEach(W=>W.stop()),xe(null),alert("อัดเสียงไม่สำเร็จ กรุณาลองใหม่")},q.current=Date.now(),Re(0),xe(a),ae.start(250),f.current=setInterval(()=>{Re(Math.round((Date.now()-q.current)/1e3))},1e3)}catch{(x=m.current)==null||x.getTracks().forEach(_=>_.stop()),xe(null),alert("ไม่ได้รับสิทธิ์ใช้ไมโครโฟน กรุณากดอนุญาตไมโครโฟนเพื่ออัดเสียงสด")}},Ms=async a=>{a.preventDefault();const p=S.trim();!p&&!ie&&!ne||!await c(h.id,h.type,p,{photoUrl:ie||void 0,voiceUrl:ne||void 0})||(L(""),de(null),pe(null))},mt=async(a,p,x)=>{const _=(fe[a]||"").trim(),O=G[a];!_&&!(O!=null&&O.photoUrl)&&!(O!=null&&O.voiceUrl)||!await o(h.id,h.type,a,_,p,{photoUrl:O==null?void 0:O.photoUrl,voiceUrl:O==null?void 0:O.voiceUrl,replyToId:x})||(be({...fe,[a]:""}),Y(ue=>({...ue,[a]:{}})),ee(null))},Us=a=>{C&&d(C.id,a)},Ie=ce(h);return(Et=Ie[0])!=null&&Et.url||(K?C==null||C.voiceNoteUrl:E==null||E.voiceNoteUrl),e.jsxs("div",{className:"fixed inset-0 z-[90] bg-black/45 backdrop-blur-sm flex items-center justify-center p-2 sm:p-4 overflow-y-auto",children:[e.jsxs("div",{className:"bg-white border border-slate-200/90 w-full max-w-3xl rounded-2xl shadow-2xl overflow-hidden my-auto animate-in zoom-in-95 max-h-[94vh] flex flex-col text-slate-900",children:[e.jsxs("div",{className:"p-3.5 sm:p-4 border-b border-slate-100 space-y-2.5 bg-white sticky top-0 z-10",children:[e.jsxs("div",{className:"flex items-start justify-between gap-2.5",children:[e.jsxs("div",{className:"flex items-start gap-2.5 min-w-0 flex-1",children:[e.jsx("span",{className:`p-2 rounded-xl shrink-0 mt-0.5 ${K?"bg-emerald-50 text-emerald-700":X?"bg-sky-50 text-sky-700":"bg-amber-50 text-amber-700"}`,children:K?e.jsx(qs,{className:"w-4 h-4 sm:w-5 sm:h-5 text-emerald-600"}):X?e.jsx("i",{"aria-hidden":"true",className:"fa-solid fa-map-location-dot text-base text-sky-600"}):e.jsx(_s,{className:"w-4 h-4 sm:w-5 sm:h-5 text-amber-600"})}),e.jsxs("div",{className:"min-w-0 flex-1",children:[e.jsx("h2",{className:"font-extrabold text-slate-900 text-sm sm:text-base leading-snug break-words",children:K?C==null?void 0:C.name:X?b==null?void 0:b.name:E==null?void 0:E.storeName}),e.jsx("p",{className:"text-xs text-slate-400 truncate mt-0.5",children:K?(C==null?void 0:C.chineseName)||(C==null?void 0:C.marketOrCity):X?(b==null?void 0:b.zoneOrFloor)||(b==null?void 0:b.foreignName):(E==null?void 0:E.chineseName)||(E==null?void 0:E.storeCategory)||(E==null?void 0:E.brandConcept)})]})]}),e.jsx("button",{type:"button",onClick:l,className:"w-7 h-7 sm:w-8 sm:h-8 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-600 transition-all active:scale-95 flex items-center justify-center shrink-0",title:"ปิดหน้าต่าง",children:e.jsx(Ne,{className:"w-4 h-4"})})]}),e.jsxs("div",{className:"flex items-center gap-1.5 overflow-x-auto no-scrollbar pt-2 border-t border-slate-100 select-none",children:[H&&e.jsxs("button",{type:"button",onClick:()=>j(h),className:"h-7 sm:h-8 px-2.5 rounded-xl bg-amber-50 hover:bg-amber-100 text-amber-800 border border-amber-200/90 text-xs font-bold active:scale-95 transition-all inline-flex items-center gap-1 whitespace-nowrap shrink-0",title:"แก้ไขข้อมูลรายการนี้ (Admin / Editor)",children:[e.jsx(Wt,{className:"w-3 h-3 text-amber-600 shrink-0"}),e.jsx("span",{children:"แก้ไข"})]}),y&&e.jsxs("button",{type:"button",onClick:ft,className:"h-7 sm:h-8 px-2.5 rounded-xl bg-rose-50 hover:bg-rose-100 text-rose-700 border border-rose-200 text-xs font-bold active:scale-95 transition-all inline-flex items-center gap-1 whitespace-nowrap shrink-0",title:"ลบรายการ",children:[e.jsx(Zt,{className:"w-3 h-3 text-rose-600 shrink-0"}),e.jsx("span",{children:"ลบรายการ"})]}),e.jsxs("button",{type:"button",onClick:()=>g(h.id,h.type),className:`h-7 sm:h-8 px-2.5 rounded-xl border transition-all active:scale-95 inline-flex items-center gap-1 text-xs font-bold whitespace-nowrap shrink-0 ${ht?"bg-blue-50 text-blue-700 border-blue-200":"bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100"}`,title:`ถูกใจ (${Ae.length})`,children:[e.jsx(Hs,{className:`w-3 h-3 shrink-0 ${ht?"fill-blue-600 text-blue-600":""}`}),e.jsxs("span",{children:["ถูกใจ",Ae.length>0?` (${Ae.length})`:""]})]}),e.jsxs("button",{type:"button",onClick:()=>r(h),className:"h-7 sm:h-8 px-2.5 rounded-xl bg-[#06C755] hover:bg-[#05b34c] text-white text-xs font-bold transition-all active:scale-95 inline-flex items-center gap-1 whitespace-nowrap shrink-0 shadow-2xs",title:"แชร์ลิงก์เข้า LINE",children:[e.jsx(Vs,{className:"w-3 h-3 shrink-0"}),e.jsx("span",{children:"แชร์ LINE"})]}),e.jsxs("button",{type:"button",onClick:()=>Ss(h,t,"pdf"),className:"h-7 sm:h-8 px-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold transition-all active:scale-95 inline-flex items-center gap-1 whitespace-nowrap shrink-0",title:"ดาวน์โหลดรายงานเป็นไฟล์ PDF",children:[e.jsx(dn,{className:"w-3 h-3 text-emerald-400 shrink-0"}),e.jsx("span",{children:"ดาวน์โหลด PDF"})]}),e.jsxs("button",{type:"button",onClick:()=>Ss(h,t,"print"),className:"h-7 sm:h-8 px-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold transition-all border border-slate-200/80 active:scale-95 inline-flex items-center gap-1 whitespace-nowrap shrink-0",title:"พิมพ์รายงานฉบับจัดหน้าสวยงาม (Print)",children:[e.jsx(ln,{className:"w-3 h-3 text-slate-600 shrink-0"}),e.jsx("span",{children:"พิมพ์"})]})]})]}),e.jsxs("div",{className:"p-4 sm:p-6 space-y-4 overflow-y-auto flex-1",children:[e.jsxs("div",{className:"flex flex-wrap items-center justify-between gap-2 p-3 bg-slate-50 rounded-xl border border-slate-100 text-xs",children:[e.jsxs("div",{className:"flex items-center gap-2.5",children:[e.jsx(Le,{src:h.creator.avatar,alt:h.creator.alias,className:"w-8 h-8 rounded-full object-cover ring-2 ring-emerald-500/20 shadow-xs"}),e.jsxs("div",{children:[e.jsx("div",{className:"text-slate-800 font-bold flex items-center gap-1.5",children:e.jsxs("span",{children:["ผู้ลงพื้นที่สำรวจ: ",h.creator.alias,h.creator.name&&h.creator.name!==h.creator.alias?` (${h.creator.name})`:""]})}),e.jsxs("div",{className:"text-[11px] text-slate-400 font-mono",children:["บันทึกเมื่อ: ",new Date(h.creator.timestamp).toLocaleString("th-TH")]})]})]}),e.jsxs("div",{className:"flex items-center gap-2 flex-wrap",children:[e.jsx(Os,{viewedBy:h.viewedBy,size:"md"}),K&&C&&e.jsxs("div",{className:"flex items-center gap-1.5",children:[e.jsx("span",{className:"text-[11px] text-slate-500",children:"สถานะ:"}),e.jsxs("select",{value:C.status,onChange:a=>Us(a.target.value),className:"bg-white border border-slate-200 text-slate-800 text-xs font-bold rounded-lg px-2.5 py-1 focus:outline-none focus:border-emerald-500",children:[e.jsx("option",{value:"scouted",children:"1. สำรวจแล้ว"}),e.jsx("option",{value:"reviewing",children:"2. เทียบสเปก"}),e.jsx("option",{value:"rfq_sent",children:"3. ส่ง RFQ"}),e.jsx("option",{value:"shortlisted",children:"4. ตัวเต็ง (Shortlist)"}),e.jsx("option",{value:"ordered",children:"5. สั่งซื้อแล้ว (Ordered)"})]})]})]})]}),Ie.length>0&&e.jsxs("div",{className:"p-3 bg-emerald-50/70 border border-emerald-200/80 rounded-xl space-y-2",children:[e.jsxs("div",{className:"text-xs font-bold text-emerald-950 flex items-center justify-between",children:[e.jsxs("span",{className:"flex items-center gap-1.5",children:[e.jsx($e,{className:"w-3.5 h-3.5 text-emerald-600"}),e.jsxs("span",{children:["วอยซ์เสียงบันทึกหน้างานจริง (",Ie.length," คลิป)"]})]}),e.jsx("span",{className:"text-[10px] font-mono text-emerald-700",children:"แตะ ▶ เพื่อฟังเสียงบันทึก"})]}),e.jsx("div",{className:"grid grid-cols-1 sm:grid-cols-2 gap-2",children:Ie.map((a,p)=>e.jsxs("div",{className:"p-2.5 bg-white border border-emerald-200 rounded-xl flex flex-col justify-between gap-1.5 shadow-2xs",children:[e.jsxs("div",{className:"flex items-center justify-between gap-2 min-w-0",children:[e.jsxs("div",{className:"text-xs font-bold text-slate-900 truncate flex items-center gap-1.5",children:[e.jsx($e,{className:"w-3.5 h-3.5 text-emerald-600 shrink-0"}),e.jsx("span",{className:"truncate",children:a.label||`คลิปเสียง #${p+1}`})]}),e.jsx("span",{className:"text-[10px] text-emerald-700 font-mono shrink-0",children:a.durationSec?`${a.durationSec} วินาที`:"เสียงบันทึก"})]}),a.url&&e.jsx("audio",{controls:!0,preload:"metadata",playsInline:!0,src:a.url,className:"h-8 w-full rounded-lg"})]},a.id||p))})]}),e.jsxs("div",{className:"p-3 bg-slate-50 rounded-xl border border-slate-100 space-y-2 text-xs",children:[e.jsx("div",{className:"flex flex-wrap items-center gap-1.5",children:K&&C?e.jsxs(e.Fragment,{children:[e.jsxs("span",{className:"px-2.5 py-1 rounded-lg bg-emerald-600 text-white text-[11px] font-bold inline-flex items-center gap-1",children:[e.jsx("i",{className:"fa-solid fa-industry text-[10px]"}),e.jsx("span",{children:C.category})]}),e.jsx("span",{className:"px-2 py-1 rounded-lg bg-white border border-slate-200 text-slate-700 text-[11px] font-bold",children:C.isFactory?"โรงงานผลิต":"หน้าร้าน / โชว์รูม"}),e.jsxs("span",{className:"px-2 py-1 rounded-lg bg-amber-50 border border-amber-200 text-amber-700 text-[11px] font-mono font-bold inline-flex items-center gap-1",children:[e.jsx("i",{className:"fa-solid fa-star text-[10px] text-amber-500"}),e.jsxs("span",{children:[C.rating||5,"/5"]})]}),(C.quickTags||[]).map((a,p)=>e.jsxs("span",{className:"px-2 py-1 rounded-lg bg-white border border-slate-200 text-slate-700 text-[11px] font-semibold",children:["#",a]},p))]}):E?e.jsxs(e.Fragment,{children:[e.jsxs("span",{className:"px-2.5 py-1 rounded-lg bg-amber-600 text-white text-[11px] font-bold inline-flex items-center gap-1",children:[e.jsx("i",{className:"fa-solid fa-mug-hot text-[10px]"}),e.jsx("span",{children:E.storeCategory||"เรฟร้านน้ำ"})]}),E.ratings&&e.jsxs("span",{className:"px-2 py-1 rounded-lg bg-amber-50 border border-amber-200 text-amber-800 text-[11px] font-mono font-bold inline-flex items-center gap-1",children:[e.jsx("i",{className:"fa-solid fa-star text-[10px] text-amber-500"}),e.jsx("span",{children:((E.ratings.taste+E.ratings.aesthetics+E.ratings.value+E.ratings.speed)/4).toFixed(1)})]})]}):X&&b?e.jsxs(e.Fragment,{children:[e.jsxs("span",{className:"px-2.5 py-1 rounded-lg bg-sky-600 text-white text-[11px] font-bold inline-flex items-center gap-1",children:[e.jsx("i",{className:"fa-solid fa-map-location-dot text-[10px]"}),e.jsx("span",{children:b.locationType==="mall"?"ห้างสรรพสินค้า":b.locationType})]}),e.jsxs("span",{className:"px-2 py-1 rounded-lg bg-white border border-slate-200 text-slate-700 text-[11px] font-bold",children:["ผัง ",((Rt=b.spaceSpecs)==null?void 0:Rt.layoutFormat)||"Inline"]}),b.ratings&&e.jsxs("span",{className:"px-2 py-1 rounded-lg bg-amber-50 border border-amber-200 text-amber-800 text-[11px] font-mono font-bold inline-flex items-center gap-1",children:[e.jsx("i",{className:"fa-solid fa-star text-[10px] text-amber-500"}),e.jsx("span",{children:((b.ratings.footTraffic+b.ratings.visibility+b.ratings.accessibility+b.ratings.valueRoi)/4).toFixed(1)})]}),(b.quickTags||[]).map((a,p)=>e.jsxs("span",{className:"px-2 py-1 rounded-lg bg-white border border-slate-200 text-slate-700 text-[11px] font-semibold",children:["#",a]},p))]}):null}),e.jsxs("div",{className:"flex flex-wrap items-center justify-between gap-2 pt-1.5 border-t border-slate-200/60 text-[11px] text-slate-600",children:[e.jsxs("div",{className:"flex flex-wrap items-center gap-2",children:[e.jsxs("span",{className:"inline-flex items-center gap-1 font-semibold text-slate-800",children:[e.jsx(Ks,{className:"w-3.5 h-3.5 text-sky-600 shrink-0"}),e.jsx("span",{children:K?(C==null?void 0:C.marketOrCity)||(C==null?void 0:C.address)||((St=C==null?void 0:C.location)==null?void 0:St.addressText):X?((Tt=b==null?void 0:b.location)==null?void 0:Tt.addressText)||(b==null?void 0:b.zoneOrFloor):((At=E==null?void 0:E.location)==null?void 0:At.addressText)||(E==null?void 0:E.city)})]}),(K?C==null?void 0:C.wechatId:X?(It=b==null?void 0:b.leaseTerms)==null?void 0:It.contactLineWechat:E==null?void 0:E.wechatId)&&e.jsxs("span",{className:"px-2 py-0.5 rounded bg-white border border-slate-200 font-mono",children:["LINE/WeChat: ",K?C==null?void 0:C.wechatId:X?(Bt=b==null?void 0:b.leaseTerms)==null?void 0:Bt.contactLineWechat:E==null?void 0:E.wechatId]}),(K?C==null?void 0:C.phone:X?(Pt=b==null?void 0:b.leaseTerms)==null?void 0:Pt.contactPhone:E==null?void 0:E.phone)&&e.jsxs("span",{className:"px-2 py-0.5 rounded bg-white border border-slate-200 font-mono",children:["โทร: ",K?C==null?void 0:C.phone:X?(Lt=b==null?void 0:b.leaseTerms)==null?void 0:Lt.contactPhone:E==null?void 0:E.phone]}),X&&((Mt=b==null?void 0:b.leaseTerms)==null?void 0:Mt.contactPerson)&&e.jsxs("span",{className:"px-2 py-0.5 rounded bg-white border border-slate-200",children:["ผู้ติดต่อ: ",b.leaseTerms.contactPerson]})]}),(Ut=h.location)!=null&&Ut.lat&&((Dt=h.location)!=null&&Dt.lng)&&(h.location.lat!==0||h.location.lng!==0)?e.jsx("a",{href:`https://www.google.com/maps?q=${h.location.lat},${h.location.lng}`,target:"_blank",rel:"noreferrer",className:"text-[11px] font-bold text-sky-700 hover:underline shrink-0",children:"เปิด Google Maps ↗"}):e.jsx("span",{className:"text-[10px] text-slate-400 font-medium shrink-0",children:"📍 ยังไม่ได้ระบุพิกัด GPS"})]})]}),X&&b&&e.jsxs("div",{className:"p-3.5 rounded-xl border border-sky-200 bg-sky-50/50 space-y-3",children:[e.jsxs("div",{className:"text-[11px] font-bold text-sky-900 flex items-center justify-between",children:[e.jsxs("span",{className:"flex items-center gap-1.5",children:[e.jsx(Qs,{className:"w-3.5 h-3.5 text-sky-600"}),e.jsx("span",{children:"สเปกพื้นที่ & เงื่อนไขสัญญาเช่า (Location Scouting Specs)"})]}),e.jsxs("span",{className:"text-[10px] px-2 py-0.5 rounded-full bg-white text-sky-800 font-mono font-bold border border-sky-200",children:[b.zoneOrFloor," ",b.unitNumber?`(${b.unitNumber})`:""]})]}),e.jsxs("div",{className:"grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs",children:[e.jsxs("div",{className:"bg-white p-2 rounded-lg border border-slate-200 text-center",children:[e.jsx("div",{className:"text-[10px] text-slate-500 font-bold",children:"ขนาดพื้นที่"}),e.jsxs("div",{className:"font-extrabold text-sm text-slate-900 font-mono mt-0.5",children:[((zt=b.spaceSpecs)==null?void 0:zt.usableAreaSqm)||"-"," ",e.jsx("span",{className:"text-[10px] font-normal text-slate-500",children:"ตร.ม."})]})]}),e.jsxs("div",{className:"bg-white p-2 rounded-lg border border-slate-200 text-center",children:[e.jsx("div",{className:"text-[10px] text-slate-500 font-bold",children:"หน้ากว้าง / เพดาน"}),e.jsxs("div",{className:"font-extrabold text-sm text-slate-900 font-mono mt-0.5",children:[((Ft=b.spaceSpecs)==null?void 0:Ft.frontageWidthM)||"-","ม. / ",((qt=b.spaceSpecs)==null?void 0:qt.ceilingHeightM)||"-","ม."]})]}),e.jsxs("div",{className:"bg-white p-2 rounded-lg border border-slate-200 text-center",children:[e.jsx("div",{className:"text-[10px] text-slate-500 font-bold",children:"ค่าเช่ารายเดือน"}),e.jsx("div",{className:"font-extrabold text-sm text-amber-950 font-mono mt-0.5 truncate",children:(_t=b.leaseTerms)!=null&&_t.monthlyRentThb?e.jsxs(e.Fragment,{children:["฿",b.leaseTerms.monthlyRentThb.toLocaleString()]}):(Ht=b.leaseTerms)!=null&&Ht.monthlyRentRmb?e.jsxs(e.Fragment,{children:["¥",b.leaseTerms.monthlyRentRmb.toLocaleString()]}):e.jsx("span",{className:"text-slate-400",children:"สอบถาม"})})]}),e.jsxs("div",{className:"bg-white p-2 rounded-lg border border-slate-200 text-center",children:[e.jsx("div",{className:"text-[10px] text-slate-500 font-bold",children:"เงื่อนไขสัญญา"}),e.jsxs("div",{className:"font-extrabold text-xs text-slate-900 font-mono mt-0.5 truncate",children:["สัญญา ",((Vt=b.leaseTerms)==null?void 0:Vt.leasePeriodYears)||3," ปี · ประกัน ",((Ot=b.leaseTerms)==null?void 0:Ot.depositMonths)||3," ด."]})]})]}),e.jsxs("div",{className:"flex flex-wrap items-center gap-1.5 pt-1 text-xs",children:[e.jsxs("span",{className:"px-2 py-0.5 rounded-md bg-white border border-slate-200 text-slate-700 font-semibold flex items-center gap-1",children:[e.jsx(Xt,{className:"w-3 h-3 text-amber-500"}),e.jsxs("span",{children:["สเปกไฟ: ",((Kt=b.spaceSpecs)==null?void 0:Kt.electricalPower)||"3 เฟส 45 kVA"]})]}),e.jsxs("span",{className:"px-2 py-0.5 rounded-md bg-white border border-slate-200 text-slate-700 font-semibold flex items-center gap-1",children:[e.jsx(Gs,{className:"w-3 h-3 text-blue-500"}),e.jsxs("span",{children:["ท่อน้ำดี: ",(Qt=b.spaceSpecs)!=null&&Qt.hasWaterInflow?"✓ มีในห้อง":"✗ ไม่มี"]})]}),e.jsxs("span",{className:"px-2 py-0.5 rounded-md bg-white border border-slate-200 text-slate-700 font-semibold flex items-center gap-1",children:[e.jsx(Js,{className:"w-3 h-3 text-teal-500"}),e.jsxs("span",{children:["ท่อน้ำทิ้ง: ",(Gt=b.spaceSpecs)!=null&&Gt.hasDrainage?"✓ มีในห้อง":"✗ ไม่มี"]})]}),e.jsxs("span",{className:"px-2 py-0.5 rounded-md bg-white border border-slate-200 text-slate-700 font-semibold flex items-center gap-1",children:[e.jsx(Ys,{className:"w-3 h-3 text-purple-500"}),e.jsxs("span",{children:["ดักไขมัน: ",(Jt=b.spaceSpecs)!=null&&Jt.hasGreaseTrap?"✓ มีรองรับ":"✗ ต้องติดตั้งเอง"]})]}),((Yt=b.spaceSpecs)==null?void 0:Yt.riderAccessNotes)&&e.jsxs("span",{className:"px-2 py-0.5 rounded-md bg-white border border-slate-200 text-slate-700 font-semibold flex items-center gap-1",children:[e.jsx(Ws,{className:"w-3 h-3 text-emerald-600"}),e.jsxs("span",{children:["ไรเดอร์: ",b.spaceSpecs.riderAccessNotes]})]})]}),b.handoffNotes&&e.jsxs("div",{className:"pt-2 border-t border-sky-200/80 text-xs",children:[e.jsx("span",{className:"font-bold text-sky-900 block mb-0.5",children:"ประเด็นเจรจา / ส่งมอบงาน:"}),e.jsx("p",{className:"text-slate-800 whitespace-pre-wrap",children:b.handoffNotes})]})]}),(K&&(C==null?void 0:C.memo)||!K&&(E==null?void 0:E.tastingNotes))&&e.jsxs("div",{className:`p-3.5 rounded-xl border space-y-1 ${K?"bg-emerald-50/50 border-emerald-200/80":"bg-amber-50/50 border-amber-200/80"}`,children:[e.jsxs("div",{className:"text-[11px] font-bold text-slate-600 flex items-center gap-1.5",children:[e.jsx("i",{className:`fa-solid ${K?"fa-clipboard-check text-emerald-600":"fa-quote-left text-amber-600"} text-[10px]`}),e.jsx("span",{children:K?"บันทึกหน้างาน / รายละเอียดหลัก:":"บันทึกรีวิวรสชาติ & ไอเดียเรฟ:"})]}),e.jsx("p",{className:"text-xs sm:text-[13px] text-slate-900 leading-relaxed whitespace-pre-wrap font-medium",children:K?C==null?void 0:C.memo:E==null?void 0:E.tastingNotes})]}),K&&C&&(C.catalogItems||[]).length>0&&e.jsxs("div",{className:"space-y-2",children:[e.jsx("div",{className:"flex items-center justify-between",children:e.jsxs("span",{className:"text-xs font-bold text-slate-800",children:["รายการอุปกรณ์ & สินค้า (",(C.catalogItems||[]).length," รายการ):"]})}),e.jsx("div",{className:"grid grid-cols-1 sm:grid-cols-2 gap-3",children:(C.catalogItems||[]).map((a,p)=>e.jsxs("div",{className:"p-3 rounded-xl border border-slate-200 bg-white flex gap-3 shadow-xs",children:[a.photo?e.jsx("img",{src:a.photo,alt:"",onClick:()=>ut(a.photo),className:"w-16 h-16 rounded-lg object-cover cursor-pointer border border-slate-100 hover:opacity-90"}):e.jsx("div",{className:"w-16 h-16 rounded-lg bg-slate-100 border border-slate-200 flex items-center justify-center text-slate-400 text-xs",children:"ไม่มีรูป"}),e.jsxs("div",{className:"min-w-0 flex-1 space-y-1",children:[e.jsx("div",{className:"font-bold text-xs text-slate-900 truncate",children:a.name||`รายการที่ ${p+1}`}),a.priceRmb&&e.jsxs("div",{className:"text-xs font-mono font-bold text-emerald-700",children:["¥",a.priceRmb," ",e.jsxs("span",{className:"text-[11px] font-normal text-slate-500",children:["(≈",t(a.priceRmb).toLocaleString(),"฿)"]})]}),a.priceThb&&!a.priceRmb&&e.jsxs("div",{className:"text-xs font-mono font-bold text-emerald-700",children:["฿",a.priceThb.toLocaleString()]}),a.weightKg&&e.jsxs("div",{className:"text-[11px] text-slate-500",children:["น้ำหนัก: ",e.jsx("span",{className:"font-mono",children:a.weightKg})]}),a.memo&&e.jsx("p",{className:"text-[11px] text-slate-600 whitespace-pre-wrap leading-relaxed",children:a.memo}),ce(a).length>0&&e.jsx("div",{className:"space-y-1 pt-1",children:ce(a).map((x,_)=>e.jsxs("div",{className:"flex flex-col sm:flex-row sm:items-center gap-1 bg-emerald-50/90 p-1.5 rounded-lg border border-emerald-200/80",children:[e.jsxs("span",{className:"text-[10px] font-bold text-emerald-900 truncate min-w-0 flex items-center gap-1",children:[e.jsx($e,{className:"w-3 h-3 text-emerald-600 shrink-0"}),e.jsx("span",{className:"truncate",children:x.label||`เสียง #${_+1}`}),x.durationSec?`(${x.durationSec}s)`:""]}),x.url&&e.jsx("audio",{controls:!0,preload:"metadata",playsInline:!0,src:x.url,className:"h-6 w-full sm:w-44 shrink-0"})]},_))})]})]},a.id||p))})]}),!K&&E&&(E.drinkItems||[]).length>0&&e.jsxs("div",{className:"space-y-2",children:[e.jsx("div",{className:"flex items-center justify-between",children:e.jsxs("span",{className:"text-xs font-bold text-slate-800",children:["เมนูที่ชิม & ถอดรหัสสูตร (",(E.drinkItems||[]).length," เมนู):"]})}),e.jsx("div",{className:"grid grid-cols-1 sm:grid-cols-2 gap-3",children:(E.drinkItems||[]).map((a,p)=>e.jsxs("div",{className:"p-3 rounded-xl border border-amber-200/80 bg-amber-50/20 flex gap-3 shadow-xs",children:[a.photo&&e.jsx("img",{src:a.photo,alt:"",onClick:()=>ut(a.photo),className:"w-16 h-16 rounded-lg object-cover cursor-pointer border border-amber-200"}),e.jsxs("div",{className:"min-w-0 flex-1 space-y-1",children:[e.jsx("div",{className:"font-bold text-xs text-slate-900 truncate",children:a.name||`แก้วที่ #${p+1}`}),a.priceRmb&&e.jsxs("div",{className:"text-xs font-mono font-bold text-amber-700",children:["¥",a.priceRmb," ",e.jsxs("span",{className:"text-[11px] font-normal text-slate-500",children:["(≈",t(a.priceRmb),"฿)"]})]}),a.fitMenuTarget&&e.jsxs("div",{className:"text-[11px] font-semibold text-emerald-700",children:["ต่อยอด: ",a.fitMenuTarget]}),a.gimmickNotes&&e.jsx("p",{className:"text-[11px] text-slate-600",children:a.gimmickNotes}),ce(a).length>0&&e.jsx("div",{className:"space-y-1 pt-1",children:ce(a).map((x,_)=>e.jsxs("div",{className:"flex flex-col sm:flex-row sm:items-center gap-1 bg-amber-50/90 p-1.5 rounded-lg border border-amber-200/80",children:[e.jsxs("span",{className:"text-[10px] font-bold text-amber-900 truncate min-w-0 flex items-center gap-1",children:[e.jsx($e,{className:"w-3 h-3 text-amber-600 shrink-0"}),e.jsx("span",{className:"truncate",children:x.label||`เสียง #${_+1}`}),x.durationSec?`(${x.durationSec}s)`:""]}),x.url&&e.jsx("audio",{controls:!0,preload:"metadata",playsInline:!0,src:x.url,className:"h-6 w-full sm:w-44 shrink-0"})]},_))})]})]},a.id||p))})]}),e.jsxs("div",{className:"space-y-2",children:[e.jsxs("span",{className:"text-xs font-bold text-slate-800 block",children:["แกลเลอรีรูปภาพทั้งหมด (",F.length," รูป",F.length>0?" — แตะเพื่อขยายและเลื่อนซ้าย-ขวา":"","):"]}),F.length>0?e.jsx("div",{className:"grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2",children:F.map((a,p)=>e.jsxs("div",{onClick:()=>$(p),className:"group relative h-44 sm:h-48 rounded-xl overflow-hidden border border-slate-200 cursor-pointer bg-slate-900/5 shadow-xs flex items-center justify-center p-1",children:[e.jsx("img",{src:a.url,alt:a.label||"",className:"w-full h-full object-contain group-hover:scale-105 transition-transform duration-200"}),e.jsxs("div",{className:"absolute bottom-1 right-1 bg-black/60 text-white text-[9px] font-mono px-1.5 py-0.5 rounded",children:[p+1,"/",F.length]}),e.jsx("div",{className:"absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center text-[10px] text-white p-1 text-center font-medium",children:a.label})]},p))}):e.jsx("div",{className:"p-4 rounded-xl bg-slate-50 border border-dashed border-slate-200 text-center text-xs text-slate-400",children:"ยังไม่มีรูปภาพที่แนบไว้ในรายการนี้"})]}),h.videos&&h.videos.length>0&&e.jsxs("div",{className:"space-y-2 pt-1",children:[e.jsxs("span",{className:"text-xs font-bold text-slate-800 flex items-center gap-1.5",children:[e.jsx("i",{className:"fa-solid fa-video text-purple-600"}),e.jsxs("span",{children:["คลิปวิดีโอของรายการนี้ (",h.videos.length," คลิป):"]})]}),e.jsx("div",{className:"grid grid-cols-1 sm:grid-cols-2 gap-3",children:h.videos.map((a,p)=>e.jsx(an,{src:a,className:"rounded-2xl border border-slate-200 shadow-sm h-48 sm:h-56",videoClassName:"object-contain",badgeLabel:`คลิปที่ ${p+1}`},p))})]}),e.jsxs("div",{id:"detail-comments-section",className:"p-4 bg-slate-50 rounded-xl border border-slate-200/80 space-y-3",children:[e.jsxs("div",{className:"flex items-center justify-between",children:[e.jsxs("span",{className:"text-xs font-bold text-slate-800 flex items-center gap-1.5",children:[e.jsx(Zs,{className:"w-3.5 h-3.5 text-blue-600"}),e.jsx("span",{children:"ช่องความเห็นทีมงาน & ตอบกลับต่อเนื่อง (Threaded Comments)"})]}),e.jsxs("span",{className:"text-[11px] text-slate-400 font-mono",children:[h.reviewerNotes.length," หัวข้อสนทนา"]})]}),e.jsx("div",{className:"space-y-2.5",children:h.reviewerNotes.length===0?e.jsx("p",{className:"text-xs text-slate-400 py-3 text-center",children:"ยังไม่มีความเห็น สามารถพิมพ์บันทึกหรือตรวจสอบสเปกได้ด้านล่าง"}):h.reviewerNotes.map(a=>{var _,O,ae,ue,W;const p=a.replies||[],x=Ce[a.id];return e.jsxs("div",{className:"p-3 bg-white rounded-xl border border-slate-200/70 shadow-xs space-y-2",children:[e.jsxs("div",{className:"flex items-start gap-2.5",children:[e.jsx(Le,{src:a.authorAvatar,className:"w-7 h-7 rounded-full object-cover shrink-0 mt-0.5 ring-1 ring-slate-200"}),e.jsxs("div",{className:"min-w-0 flex-1",children:[e.jsxs("div",{className:"flex items-center justify-between text-[11px] mb-0.5",children:[e.jsx("span",{className:"font-bold text-slate-900",children:a.author}),e.jsx("span",{className:"text-slate-400 font-mono text-[10px]",children:new Date(a.timestamp).toLocaleTimeString("th-TH",{hour:"2-digit",minute:"2-digit"})})]}),e.jsx("p",{className:"text-xs text-slate-700 leading-relaxed",children:a.text}),a.photoUrl&&e.jsx("div",{className:"mt-1.5",children:e.jsx("img",{src:a.photoUrl,alt:"ภาพแนบ",className:"max-h-48 max-w-xs rounded-xl border border-slate-200 object-cover cursor-pointer hover:opacity-95 shadow-2xs",onClick:()=>window.open(a.photoUrl,"_blank")})}),(a.voiceUrl||a.audioUrl)&&e.jsxs("div",{className:"mt-1.5 flex items-center gap-2 bg-slate-50 p-2 rounded-xl border border-slate-200/80 max-w-sm",children:[e.jsx($e,{className:"w-4 h-4 text-emerald-600 shrink-0"}),e.jsx("audio",{controls:!0,src:a.voiceUrl||a.audioUrl,className:"h-7 w-full"})]}),e.jsxs("div",{className:"flex items-center gap-3 mt-1.5 text-[11px] font-bold",children:[V&&e.jsxs("button",{type:"button",onClick:()=>ee((Q==null?void 0:Q.noteId)===a.id&&Q.author===a.author?null:{noteId:a.id,author:a.author}),className:"text-blue-600 hover:text-blue-800 flex items-center gap-1",children:[e.jsx(es,{className:"w-3 h-3"}),e.jsx("span",{children:"ตอบกลับ"})]}),p.length>0&&e.jsx("button",{type:"button",onClick:()=>ve(z=>({...z,[a.id]:!z[a.id]})),className:"text-slate-500 hover:text-slate-800 flex items-center gap-1",children:x?e.jsxs(e.Fragment,{children:[e.jsx(Xs,{className:"w-3 h-3"}),e.jsxs("span",{children:["ดูการตอบกลับ (",p.length,")"]})]}):e.jsxs(e.Fragment,{children:[e.jsx(en,{className:"w-3 h-3"}),e.jsxs("span",{children:["ย่อการตอบกลับ (",p.length,")"]})]})})]})]})]}),p.length>0&&!x&&e.jsx("div",{className:"ml-6 pl-3 border-l-2 border-blue-200 space-y-2 pt-1",children:p.map(z=>e.jsxs("div",{className:"p-2.5 bg-slate-50 rounded-xl border border-slate-200/60 text-xs space-y-1",children:[e.jsxs("div",{className:"flex items-center justify-between text-[10px]",children:[e.jsxs("div",{className:"flex items-center gap-1.5 font-bold text-slate-800",children:[e.jsx(Le,{src:z.authorAvatar,className:"w-4 h-4 rounded-full object-cover"}),e.jsx("span",{children:z.author}),z.replyToAuthor&&e.jsxs("span",{className:"text-blue-600 font-normal",children:["▸ ตอบกลับ @",z.replyToAuthor]})]}),e.jsx("span",{className:"text-slate-400 font-mono",children:new Date(z.timestamp).toLocaleTimeString("th-TH",{hour:"2-digit",minute:"2-digit"})})]}),e.jsx("p",{className:"text-slate-700 leading-snug",children:z.text}),z.photoUrl&&e.jsx("div",{className:"mt-1",children:e.jsx("img",{src:z.photoUrl,alt:"ภาพแนบ",className:"max-h-36 max-w-[200px] rounded-lg border border-slate-200 object-cover cursor-pointer hover:opacity-95 shadow-2xs",onClick:()=>window.open(z.photoUrl,"_blank")})}),(z.voiceUrl||z.audioUrl)&&e.jsxs("div",{className:"mt-1 flex items-center gap-1.5 bg-white p-1.5 rounded-lg border border-slate-200 max-w-[240px]",children:[e.jsx($e,{className:"w-3.5 h-3.5 text-blue-600 shrink-0"}),e.jsx("audio",{controls:!0,src:z.voiceUrl||z.audioUrl,className:"h-6 w-full"})]}),e.jsx("div",{children:V&&e.jsxs("button",{type:"button",onClick:()=>ee({noteId:a.id,author:z.author}),className:"text-[10px] font-bold text-blue-600 hover:underline inline-flex items-center gap-0.5",children:[e.jsx(es,{className:"w-2.5 h-2.5"}),e.jsxs("span",{children:["ตอบกลับ @",z.author," ต่อ"]})]})})]},z.id))}),V&&(Q==null?void 0:Q.noteId)===a.id&&e.jsxs("div",{className:"mt-2 pt-2 border-t border-slate-100 space-y-1.5 animate-in fade-in",children:[(((_=G[a.id])==null?void 0:_.photoUrl)||((O=G[a.id])==null?void 0:O.voiceUrl))&&e.jsxs("div",{className:"flex flex-wrap items-center gap-1.5 text-[10px]",children:[((ae=G[a.id])==null?void 0:ae.photoUrl)&&e.jsxs("span",{className:"inline-flex items-center gap-1 px-1.5 py-0.5 rounded bg-emerald-50 text-emerald-800 border border-emerald-200",children:[e.jsx(Me,{className:"w-3 h-3"})," ภาพพร้อมแนบ",e.jsx("button",{type:"button",onClick:()=>Y(z=>({...z,[a.id]:{...z[a.id],photoUrl:void 0}})),children:e.jsx(Ne,{className:"w-2.5 h-2.5"})})]}),((ue=G[a.id])==null?void 0:ue.voiceUrl)&&e.jsxs("span",{className:"inline-flex items-center gap-1.5 px-2 py-0.5 rounded bg-blue-50 text-blue-800 border border-blue-200",children:[e.jsx(Ue,{className:"w-3 h-3"})," เสียงอัดสดพร้อมส่ง",e.jsx("audio",{controls:!0,src:(W=G[a.id])==null?void 0:W.voiceUrl,className:"h-6 w-32"}),e.jsx("button",{type:"button",onClick:()=>Y(z=>({...z,[a.id]:{...z[a.id],voiceUrl:void 0}})),children:e.jsx(Ne,{className:"w-2.5 h-2.5"})})]})]}),e.jsxs("div",{className:"flex gap-1.5 items-center flex-wrap sm:flex-nowrap",children:[e.jsx("input",{type:"text",placeholder:`ตอบกลับ @${Q.author} ในฐานะ ${s.alias}...`,value:fe[a.id]||"",onChange:z=>be({...fe,[a.id]:z.target.value}),className:"flex-1 min-w-[140px] bg-slate-50 border border-blue-300 rounded-lg px-2.5 py-1.5 text-xs text-slate-900 focus:outline-none focus:border-blue-500",autoFocus:!0,onKeyDown:z=>{z.key==="Enter"&&(z.preventDefault(),mt(a.id,Q.author))}}),e.jsx("button",{type:"button",title:"แนบรูปภาพในคำตอบกลับ",onClick:()=>{const z=document.createElement("input");z.type="file",z.accept="image/*",z.onchange=Fe=>{var Se,Pe;const Be=(Pe=(Se=Fe.target)==null?void 0:Se.files)==null?void 0:Pe[0];Be&&ze(Be,"photo",a.id)},z.click()},className:"p-1.5 rounded-lg border border-slate-200 hover:bg-slate-100 text-slate-500",children:e.jsx(Me,{className:"w-3.5 h-3.5"})}),e.jsxs("button",{type:"button",title:Z===a.id?"กดเพื่อหยุดอัดเสียงสด":"กดเพื่ออัดเสียงสดในคำตอบกลับ",disabled:te,onClick:()=>void pt(a.id),className:`px-2 py-1.5 rounded-lg border text-[11px] font-bold inline-flex items-center gap-1 transition-all ${Z===a.id?"bg-rose-600 text-white border-rose-600 animate-pulse":"bg-white border-slate-200 hover:border-blue-500 hover:bg-blue-50 text-slate-600 hover:text-blue-700"}`,children:[e.jsx(Ue,{className:"w-3.5 h-3.5"}),e.jsx("span",{children:Z===a.id?`หยุดอัด (${Ee}s)`:"อัดเสียงสด"})]}),e.jsx("button",{type:"button",onClick:()=>mt(a.id,Q.author),className:"px-3 py-1.5 rounded-lg bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold",children:"ส่ง"}),V&&e.jsx("button",{type:"button",onClick:()=>ee(null),className:"px-2 py-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-600 text-xs",children:"ยกเลิก"})]})]})]},a.id)})}),e.jsxs("div",{className:"pt-2 border-t border-slate-200/60 space-y-1.5",children:[e.jsx("div",{className:"flex items-center justify-between text-[11px] text-slate-500",children:e.jsxs("span",{className:"font-semibold flex items-center gap-1",children:[e.jsx(Xt,{className:"w-3 h-3 text-amber-500"})," ข้อความด่วน (แตะเพื่อพิมพ์ทันที):"]})}),e.jsx("div",{className:"flex items-center gap-1.5 overflow-x-auto no-scrollbar py-0.5",children:M.map(a=>e.jsxs("button",{type:"button",onClick:()=>L(a.text),className:"px-2.5 py-1 rounded-lg bg-white border border-slate-200 hover:border-blue-400 text-[11px] text-slate-700 whitespace-nowrap active:scale-95 transition-all shadow-xs",title:a.text,children:[e.jsx("i",{className:"fa-solid fa-bolt text-amber-500 mr-1 text-[10px]"}),e.jsx("span",{children:a.title})]},a.id))})]}),s.role==="viewer"?null:e.jsxs("form",{onSubmit:Ms,className:"space-y-2 pt-1",children:[(ie||ne||te)&&e.jsxs("div",{className:"flex flex-wrap items-center gap-2 px-1",children:[ie&&e.jsxs("div",{className:"flex items-center gap-1.5 px-2 py-1 bg-emerald-50 border border-emerald-200 rounded-lg text-xs text-emerald-800",children:[e.jsx(Me,{className:"w-3.5 h-3.5 text-emerald-600"}),e.jsx("span",{className:"truncate max-w-[120px]",children:"รูปภาพพร้อมแนบ"}),e.jsx("button",{type:"button",onClick:()=>de(null),className:"text-slate-400 hover:text-rose-600",children:e.jsx(Ne,{className:"w-3 h-3"})})]}),ne&&e.jsxs("div",{className:"flex items-center gap-1.5 px-2 py-1 bg-blue-50 border border-blue-200 rounded-lg text-xs text-blue-800",children:[e.jsx(Ue,{className:"w-3.5 h-3.5 text-blue-600"}),e.jsx("span",{children:"เสียงอัดสด:"}),e.jsx("audio",{controls:!0,src:ne,className:"h-6 w-36"}),e.jsx("button",{type:"button",onClick:()=>pe(null),className:"text-slate-400 hover:text-rose-600",children:e.jsx(Ne,{className:"w-3 h-3"})})]}),te&&e.jsxs("div",{className:"flex items-center gap-1.5 text-xs text-blue-600 font-medium",children:[e.jsx(cn,{className:"w-3.5 h-3.5 animate-spin"}),e.jsx("span",{children:"กำลังอัปโหลดไฟล์สื่อ..."})]})]}),e.jsxs("div",{className:"flex gap-1.5 items-center flex-wrap sm:flex-nowrap",children:[e.jsx("input",{ref:re,type:"file",accept:"image/*",className:"hidden",onChange:a=>{var x;const p=(x=a.target.files)==null?void 0:x[0];p&&ze(p,"photo"),a.target.value=""}}),e.jsx("input",{type:"text",placeholder:`พิมพ์ข้อคิดเห็นใหม่ในฐานะ ${s.alias}...`,value:S,onChange:a=>L(a.target.value),className:"flex-1 min-w-[140px] h-8 bg-white border border-slate-200 rounded-lg px-2.5 text-xs text-slate-900 focus:outline-none focus:border-blue-500 shadow-2xs"}),e.jsxs("button",{type:"button",title:"แนบรูปภาพ",disabled:te,onClick:()=>{var a;return(a=re.current)==null?void 0:a.click()},className:"h-8 px-2.5 rounded-lg border border-slate-200 bg-white hover:border-emerald-500 hover:bg-emerald-50 text-slate-600 hover:text-emerald-700 text-[11px] font-bold inline-flex items-center justify-center gap-1 transition-colors shrink-0",children:[e.jsx(Me,{className:"w-3.5 h-3.5"}),e.jsx("span",{className:"hidden sm:inline",children:"รูปภาพ"})]}),e.jsxs("button",{type:"button",title:Z==="main"?"กดเพื่อหยุดอัดเสียงสด":"กดเพื่ออัดเสียงสดในคอมเมนต์",disabled:te,onClick:()=>void pt("main"),className:`h-8 px-2.5 rounded-lg border text-[11px] font-bold inline-flex items-center justify-center gap-1 transition-all shrink-0 ${Z==="main"?"bg-rose-600 text-white border-rose-600 animate-pulse shadow-xs":"bg-white border-slate-200 hover:border-blue-500 hover:bg-blue-50 text-slate-700 hover:text-blue-700"}`,children:[e.jsx(Ue,{className:"w-3.5 h-3.5"}),e.jsx("span",{children:Z==="main"?`หยุดอัด (${Ee}s)`:"อัดเสียงสด"})]}),e.jsxs("button",{type:"submit",disabled:te||Z==="main",className:"h-8 px-3 rounded-lg bg-blue-600 hover:bg-blue-700 text-white text-[11px] font-bold shadow-2xs active:scale-95 transition-all inline-flex items-center justify-center gap-1 shrink-0 disabled:opacity-50",children:[e.jsx(tn,{className:"w-3 h-3"}),e.jsx("span",{children:"โพสต์"})]})]})]})]}),e.jsxs("div",{className:"p-3.5 bg-slate-50/90 rounded-xl border border-slate-200/80 space-y-2.5",children:[e.jsxs("div",{className:"flex flex-wrap items-center justify-between gap-2",children:[e.jsxs("span",{className:"text-xs font-bold text-slate-800 flex items-center gap-1.5",children:[e.jsx("i",{className:"fa-solid fa-clock-rotate-left text-emerald-600 text-xs"}),e.jsx("span",{children:"ประวัติการดำเนินงาน & ส่งต่องาน (Activity Log)"})]}),h.handoffStage&&e.jsxs("span",{className:"text-[10px] font-bold px-2 py-0.5 rounded-md bg-emerald-50 text-emerald-800 border border-emerald-200",children:["สถานะส่งต่อ:"," ",{awaiting:"พาร์ท 1: รอรับช่วงต่อ",rfq_sent:"พาร์ท 2: ขอสเปก / ส่ง RFQ",sample_test:"พาร์ท 3: ทดสอบตัวอย่าง Lab/R&D",negotiate:"พาร์ท 4: ต่อรองราคา & MOQ",approved:"พาร์ท 5: ตัวเต็งอนุมัติ",ordered:"พาร์ท 6: สั่งซื้อสำเร็จ"}[h.handoffStage]||h.handoffStage]})]}),(h.assignedTo||h.targetFollowUpDate||h.handoffNotes)&&e.jsxs("div",{className:"p-2.5 bg-white rounded-lg border border-slate-200/80 text-[11px] space-y-1",children:[e.jsxs("div",{className:"flex flex-wrap items-center gap-3 text-slate-700",children:[h.assignedTo&&e.jsxs("span",{className:"font-bold inline-flex items-center gap-1",children:[e.jsx("i",{className:"fa-solid fa-user-check text-emerald-600 text-[10px]"}),e.jsxs("span",{children:["ผู้รับช่วงต่อ: ",h.assignedTo]})]}),h.targetFollowUpDate&&e.jsxs("span",{className:"font-mono text-slate-500",children:["กำหนดติดตาม: ",h.targetFollowUpDate]})]}),h.handoffNotes&&e.jsxs("p",{className:"text-slate-600 whitespace-pre-wrap leading-relaxed",children:["หมายเหตุส่งต่อ: ",h.handoffNotes]})]}),e.jsx("div",{className:"space-y-1.5 max-h-48 overflow-y-auto pr-1",children:(()=>{const a=Array.isArray(h.history)?h.history:[];return(a.length>0?a:[{action:"สร้างบันทึกรายการสำรวจ",user:h.creator.alias,userAvatar:h.creator.avatar,timestamp:h.creator.timestamp}]).map((x,_)=>{const O=v.find(W=>W.alias===x.user||W.name===x.user),ae=x.userAvatar||(O==null?void 0:O.avatar)||(x.user===h.creator.alias?h.creator.avatar:"./logo.jpg"),ue=x.action==="handoff"?"อัปเดตสถานะการส่งต่องาน (Handoff)":x.action==="comment"?"เพิ่มความคิดเห็นในรายการ":x.action==="reply"?"ตอบกลับความคิดเห็น":x.action;return e.jsxs("div",{className:"flex items-center justify-between gap-2 px-2.5 py-1.5 bg-white rounded-lg border border-slate-200/70 text-[11px]",children:[e.jsxs("div",{className:"flex items-center gap-2 min-w-0",children:[e.jsx(Le,{src:ae,alt:x.user,className:"w-5 h-5 rounded-full object-cover border border-slate-200 shrink-0"}),e.jsx("span",{className:"font-bold text-slate-900 shrink-0",children:x.user}),e.jsx("span",{className:"text-slate-600 truncate",children:ue})]}),e.jsx("span",{className:"text-[10px] font-mono text-slate-400 shrink-0",children:new Date(x.timestamp).toLocaleString("th-TH",{day:"2-digit",month:"2-digit",year:"2-digit",hour:"2-digit",minute:"2-digit"})})]},`${x.timestamp}-${_}`)})})()})]})]}),e.jsxs("div",{className:"p-3 sm:p-3.5 border-t border-slate-100 bg-white flex items-center justify-between gap-2 select-none",children:[e.jsxs("div",{className:"text-[11px] text-slate-400 font-mono truncate hidden sm:block",children:["ID: ",h.id," · ปรับปรุง:"," ",new Date(h.updatedAt).toLocaleTimeString("th-TH")]}),e.jsxs("div",{className:"flex items-center justify-end gap-1.5 sm:gap-2 w-full sm:w-auto",children:[y&&e.jsxs("button",{type:"button",onClick:ft,className:"px-2.5 sm:px-3 py-1.5 text-xs font-bold rounded-xl bg-rose-50 hover:bg-rose-100 text-rose-700 border border-rose-200 flex items-center justify-center gap-1.5 transition-colors whitespace-nowrap active:scale-95 shrink-0",title:"ลบรายการ",children:[e.jsx(Zt,{className:"w-3.5 h-3.5 text-rose-600 shrink-0"}),e.jsx("span",{children:"ลบรายการ"})]}),H&&e.jsxs("button",{type:"button",onClick:()=>j(h),className:"px-2.5 sm:px-3.5 py-1.5 text-xs font-bold rounded-xl bg-amber-50 hover:bg-amber-100 text-amber-800 border border-amber-300 flex items-center justify-center gap-1.5 transition-colors whitespace-nowrap active:scale-95 shrink-0",children:[e.jsx(Wt,{className:"w-3.5 h-3.5 text-amber-600 shrink-0"}),e.jsx("span",{children:"แก้ไขข้อมูล"})]}),e.jsx("button",{onClick:l,className:"px-3.5 sm:px-4 py-1.5 text-xs font-bold rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 transition-colors whitespace-nowrap active:scale-95 shrink-0",children:"ปิด"})]})]})]}),w!==null&&F[w]&&e.jsxs("div",{className:"fixed inset-0 z-[140] bg-black/92 backdrop-blur-md flex flex-col items-center justify-between p-3 sm:p-6 select-none",onClick:()=>$(null),children:[e.jsxs("div",{className:"w-full max-w-4xl flex items-center justify-between text-white z-10",onClick:a=>a.stopPropagation(),children:[e.jsxs("div",{className:"flex items-center gap-2",children:[e.jsxs("span",{className:"px-2.5 py-1 rounded-full bg-white/15 font-mono text-xs font-bold",children:["รูปที่ ",w+1," / ",F.length]}),e.jsx("span",{className:"text-xs sm:text-sm font-semibold text-white/90 truncate max-w-[240px] sm:max-w-md",children:F[w].label})]}),e.jsx("button",{type:"button",onClick:()=>$(null),className:"w-9 h-9 rounded-full bg-white/15 hover:bg-white/25 text-white flex items-center justify-center transition-colors",children:e.jsx(Ne,{className:"w-5 h-5"})})]}),e.jsxs("div",{className:"relative flex-1 w-full max-w-5xl flex items-center justify-center my-2",onClick:a=>a.stopPropagation(),children:[F.length>1&&e.jsx("button",{type:"button",onClick:()=>$((w-1+F.length)%F.length),className:"absolute left-1 sm:left-3 z-20 w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-black/60 hover:bg-black/80 border border-white/25 text-white flex items-center justify-center shadow-lg active:scale-95 transition-all",title:"รูปก่อนหน้า (◀)",children:e.jsx(sn,{className:"w-6 h-6"})}),e.jsx("img",{src:F[w].url,alt:F[w].label,className:"max-w-full max-h-[72vh] object-contain rounded-xl shadow-2xl"}),F.length>1&&e.jsx("button",{type:"button",onClick:()=>$((w+1)%F.length),className:"absolute right-1 sm:right-3 z-20 w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-black/60 hover:bg-black/80 border border-white/25 text-white flex items-center justify-center shadow-lg active:scale-95 transition-all",title:"รูปถัดไป (▶)",children:e.jsx(nn,{className:"w-6 h-6"})})]}),F.length>1&&e.jsx("div",{className:"w-full max-w-3xl flex items-center justify-center gap-2 overflow-x-auto py-1 z-10",onClick:a=>a.stopPropagation(),children:F.map((a,p)=>e.jsx("button",{type:"button",onClick:()=>$(p),className:`relative w-12 h-12 sm:w-14 sm:h-14 rounded-lg overflow-hidden shrink-0 border-2 transition-all ${p===w?"border-emerald-400 scale-105 shadow-md":"border-white/20 opacity-60 hover:opacity-100"}`,children:e.jsx("img",{src:a.url,className:"w-full h-full object-cover"})},p))})]})]})};export{qn as DetailModal};
