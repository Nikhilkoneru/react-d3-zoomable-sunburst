"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.formatNameTooltip = formatNameTooltip;
exports.wrap = wrap;
var d3 = _interopRequireWildcard(require("d3"));
function _interopRequireWildcard(e, t) { if ("function" == typeof WeakMap) var r = new WeakMap(), n = new WeakMap(); return (_interopRequireWildcard = function (e, t) { if (!t && e && e.__esModule) return e; var o, i, f = { __proto__: null, default: e }; if (null === e || "object" != typeof e && "function" != typeof e) return f; if (o = t ? n : r) { if (o.has(e)) return o.get(e); o.set(e, f); } for (const t in e) "default" !== t && {}.hasOwnProperty.call(e, t) && ((i = (o = Object.defineProperty) && Object.getOwnPropertyDescriptor(e, t)) && (i.get || i.set) ? o(f, t, i) : f[t] = e[t]); return f; })(e, t); }
function formatNumberTooltip(x) {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}
function formatNameTooltip(d) {
  const name = d.data.name;
  return "".concat(name, "<br> (").concat(formatNumberTooltip(d.value), ")");
}
function wrap() {
  const self = d3.select(this);
  let textLength = self.node().getComputedTextLength();
  let text = self.text();
  while (textLength > 20 && text.length > 0) {
    text = text.slice(0, -1);
    self.text("".concat(text, "..."));
    textLength = self.node().getComputedTextLength();
  }
}