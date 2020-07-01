"use strict";

function formatNumberTooltip(x) {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
}

function formatNameTooltip(d) {
  var name = d.data.name;
  return "".concat(name, "<br> (").concat(formatNumberTooltip(d.value), ")");
}