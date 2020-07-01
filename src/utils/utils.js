function formatNumberTooltip(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
}
function formatNameTooltip(d) {
    const name = d.data.name;
    return `${name}<br> (${formatNumberTooltip(d.value)})`;
}