export const reportFooterLabel = (type: string, title: string) => `ฉันจะเป็นหัวแถว | ${type} : ${title}`.replace(/\s+/g, ' ').trim();

/** Native print/PDF: reserve space and let the print engine count actual pages. */
export function reportFooterCss(label: string): string {
  const content = JSON.stringify(label).replace(/</g, '\\3c ').replace(/>/g, '\\3e ');
  const style = 'font-family: "Sarabun", Tahoma, sans-serif; font-size: 8pt; line-height: 1.3; color: #64748b; vertical-align: middle; border-top: 0.2mm solid #cbd5e1;';
  return `@page {
    margin-bottom: 16mm;
    @bottom-left { content: ${content}; width: 87%; text-align: left; ${style} }
    @bottom-right { content: counter(page) " / " counter(pages); width: 13%; text-align: right; ${style} }
  }`;
}

/** Canvas preserves Thai shaping; page numbers remain searchable PDF text. */
export function reportPdfFooterScript(label: string): string {
  return `function addReportFooters(pdf) {
    var label = ${JSON.stringify(label).replace(/</g, '\\u003c')};
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
  }`;
}
