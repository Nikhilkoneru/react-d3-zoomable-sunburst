import * as d3 from "d3";

function formatNumberTooltip(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}
export function formatNameTooltip(d) {
    const name = d.data.name;
    return `${name}<br> (${formatNumberTooltip(d.value)})`;
}
export function wrap() {
    const self = d3.select(this);
    let textLength = self.node().getComputedTextLength();
    let text = self.text();
    while (textLength > 20 && text.length > 0) {
        text = text.slice(0, -1);
        self.text(`${text}...`);
        textLength = self.node().getComputedTextLength();
    }
}