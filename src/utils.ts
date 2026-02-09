import type { HierarchyNode } from 'd3';

interface DataNode {
    name: string;
    [key: string]: unknown;
}

function formatNumberTooltip(x: number): string {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

export function formatNameTooltip(d: HierarchyNode<DataNode>): string {
    const name = d.data.name;
    return `${name}<br> (${formatNumberTooltip(d.value ?? 0)})`;
}
