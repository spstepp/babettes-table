/* Etsy sale display. Shows the sale price on marked prices until the sale ends.
   Sale: 30% off Vols. 2, 3, 9, 11, 14, 15 on Etsy, through Nov 25, 2026 (Mountain time).
   Before and after the sale, and with scripts off, pages show the normal $9.95. */
(function () {
  var END = new Date('2026-11-26T00:00:00-07:00'); // end of Nov 25, Mountain Standard Time
  if (Date.now() >= END.getTime()) return;
  var els = document.querySelectorAll('[data-sale-vol]');
  if (!els.length) return;
  var st = document.createElement('style');
  st.textContent = '.sale-now{font-weight:700;color:#6E221A}.sale-was{text-decoration:line-through}' +
    '.sale-sr{position:absolute;width:1px;height:1px;overflow:hidden;clip:rect(0 0 0 0);white-space:nowrap}';
  document.head.appendChild(st);
  function span(cls, text) { var s = document.createElement('span'); s.className = cls; s.textContent = text; return s; }
  for (var i = 0; i < els.length; i++) {
    var el = els[i];
    var w = document.createTreeWalker(el, NodeFilter.SHOW_TEXT), node, hit = null;
    while ((node = w.nextNode())) { if (node.nodeValue.indexOf('$9.95') > -1) { hit = node; break; } }
    if (!hit) continue;
    var parts = hit.nodeValue.split('$9.95'), p = hit.parentNode, f = document.createDocumentFragment();
    f.appendChild(document.createTextNode(parts[0]));
    f.appendChild(span('sale-sr', 'Regular price '));
    f.appendChild(span('sale-was', '$9.95'));
    f.appendChild(document.createTextNode(' '));
    f.appendChild(span('sale-sr', 'Sale price '));
    f.appendChild(span('sale-now', '$6.96'));
    if (el.hasAttribute('data-sale-note')) f.appendChild(document.createTextNode(' (30% off on Etsy through Nov 25)'));
    f.appendChild(document.createTextNode(parts.slice(1).join('$9.95')));
    p.replaceChild(f, hit);
  }
})();
