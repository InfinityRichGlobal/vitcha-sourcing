import{c as r}from"./index-TEmfQYJf.js";/**
 * @license lucide-react v1.62.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const n={name:"printer",size:24,node:[["path",{d:"M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2",key:"143wyd"}],["path",{d:"M6 9V3a1 1 0 0 1 1-1h10a1 1 0 0 1 1 1v6",key:"1itne7"}],["rect",{x:"6",y:"14",width:"12",height:"8",rx:"1",key:"1ue0tg"}]]};n.node;const l=r(n),o=(e,t)=>`ฉันจะเป็นหัวแถว | ${e} : ${t}`.replace(/\s+/g," ").trim();function s(e){const t=JSON.stringify(e).replace(/</g,"\\3c ").replace(/>/g,"\\3e "),a='font-family: "Sarabun", Tahoma, sans-serif; font-size: 8pt; line-height: 1.3; color: #64748b; vertical-align: middle; border-top: 0.2mm solid #cbd5e1;';return`@page {
    margin-bottom: 16mm;
    @bottom-left { content: ${t}; width: 87%; text-align: left; ${a} }
    @bottom-right { content: counter(page) " / " counter(pages); width: 13%; text-align: right; ${a} }
  }`}function g(e){return`function addReportFooters(pdf) {
    var label = ${JSON.stringify(e).replace(/</g,"\\u003c")};
    var canvas = document.createElement('canvas'); canvas.width = 2000; canvas.height = 90;
    var ctx = canvas.getContext('2d');
    var letters = typeof Intl.Segmenter === 'function' ? Array.from(new Intl.Segmenter('th', {granularity:'grapheme'}).segment(label), function(part){return part.segment;}) : Array.from(label);
    var lines = [], size = 32;
    do {
      ctx.font = size + 'px "Sarabun", Tahoma, sans-serif'; lines = [''];
      letters.forEach(function(letter) {
        var last = lines.length - 1;
        if (ctx.measureText(lines[last] + letter).width > canvas.width - 4) lines.push(letter);
        else lines[last] += letter;
      });
      if (lines.length <= 2) break; size -= 2;
    } while (size > 8);
    ctx.fillStyle = '#64748b';
    lines.forEach(function(line, index) { ctx.fillText(line, 0, lines.length === 1 ? 54 : 34 + index * 38); });
    var labelImage = canvas.toDataURL('image/png');
    var total = pdf.internal.getNumberOfPages();
    for (var page = 1; page <= total; page++) {
      pdf.setPage(page);
      var width = pdf.internal.pageSize.getWidth(), height = pdf.internal.pageSize.getHeight();
      pdf.setDrawColor(203, 213, 225); pdf.setLineWidth(0.2); pdf.line(8, height - 13, width - 8, height - 13);
      pdf.addImage(labelImage, 'PNG', 8, height - 11.5, width - 38, 7.74, 'report-footer-label', 'FAST');
      pdf.setFont('helvetica', 'normal'); pdf.setFontSize(8); pdf.setTextColor(100, 116, 139);
      pdf.text(page + ' / ' + total, width - 8, height - 7.1, {align:'right'});
    }
  }`}export{l as P,o as a,g as b,s as r};
