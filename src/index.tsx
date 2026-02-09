import { useEffect, useRef, useCallback } from 'react';
import * as d3 from 'd3';
import type { HierarchyRectangularNode } from 'd3';
import { formatNameTooltip } from './utils';

/** Shape of each node in the hierarchical data. */
export interface SunburstDataNode {
    name: string;
    color?: string;
    children?: SunburstDataNode[];
    [key: string]: unknown;
}

/** Extended hierarchy node carrying an optional `fill` used for color derivation. */
interface SunburstNode extends HierarchyRectangularNode<SunburstDataNode> {
    fill?: d3.HSLColor;
    x0s?: number;
    x1s?: number;
}

/** Props accepted by the Sunburst component. */
export interface SunburstProps {
    /** Hierarchical data object with `name`, `children`, and a value field. */
    data: SunburstDataNode | null;
    /** Field name used for size calculations (e.g. `"size"`). */
    value: string;
    /** Width of the SVG element in pixels. */
    width?: number;
    /** Height of the SVG element in pixels. */
    height?: number;
    /** Unique ID for the container element. */
    keyId: string;
    /** Enable or disable the tooltip. */
    tooltip?: boolean;
    /** Tooltip position relative to cursor (`"right"` shifts it right). */
    tooltipPosition?: string;
    /** Custom React element used as the tooltip container. */
    tooltipContent?: React.ReactElement;
    /** Scale type: `"linear"` or `"exponential"` (default: exponential/sqrt). */
    scale?: 'linear' | 'exponential';
    /** Callback invoked when a segment is clicked. */
    onSelect?: (d: HierarchyRectangularNode<SunburstDataNode>) => void;
    /** Custom color function to control fill color of each segment. */
    colorFunc?: (d: HierarchyRectangularNode<SunburstDataNode>) => string;
}

const Sunburst: React.FC<SunburstProps> = ({
    data,
    value,
    width = 480,
    height = 400,
    keyId,
    tooltip: showTooltip,
    tooltipPosition,
    tooltipContent,
    scale,
    onSelect,
    colorFunc,
}) => {
    const svgRef = useRef<SVGSVGElement>(null);
    const dataRef = useRef<string | undefined>(undefined);

    const renderSunburst = useCallback(() => {
        if (!data) return;

        // Clean up previous render within this component's SVG only
        const svgEl = d3.select(svgRef.current);
        svgEl.selectAll('g').remove();

        // Also clean up any previous tooltip
        const container = d3.select(`#${keyId}`);
        container.selectAll('.sunburst-tooltip').remove();

        const gWidth = width;
        const gHeight = height;
        const radius = (Math.min(gWidth, gHeight) / 2) - 10;

        const svg = svgEl
            .append('g')
            .attr('transform', `translate(${gWidth / 2},${gHeight / 2})`);

        const x = d3.scaleLinear().range([0, 2 * Math.PI]);
        const y = scale === 'linear'
            ? d3.scaleLinear().range([0, radius])
            : d3.scaleSqrt().range([0, radius]);

        const partition = d3.partition<SunburstDataNode>();

        const arc = d3.arc<SunburstNode>()
            .startAngle(d => Math.max(0, Math.min(2 * Math.PI, x(d.x0))))
            .endAngle(d => Math.max(0, Math.min(2 * Math.PI, x(d.x1))))
            .innerRadius(d => Math.max(0, y(d.y0)))
            .outerRadius(d => Math.max(0, y(d.y1)));

        const hueDXScale = d3.scaleLinear()
            .domain([0, 1])
            .range([0, 360]);

        const rootData = d3.hierarchy(data);
        let node: SunburstNode = rootData as SunburstNode;
        rootData.sum(d => (d as Record<string, unknown>)[value] as number ?? 0);

        const arcTweenData = (a: SunburstNode, i: number) => {
            const oi = d3.interpolate(
                { x0: a.x0s ?? 0, x1: a.x1s ?? 0 },
                a,
            );

            function tween(t: number): string {
                const b = oi(t) as SunburstNode;
                a.x0s = b.x0;
                a.x1s = b.x1;
                return arc(b) ?? '';
            }

            if (i === 0) {
                const xd = d3.interpolate(x.domain(), [node.x0 ?? 0, node.x1 ?? 0]);
                return (t: number): string => {
                    x.domain(xd(t));
                    return tween(t);
                };
            }
            return tween;
        };

        function arcTweenZoom(d: SunburstNode) {
            const xd = d3.interpolate(x.domain(), [d.x0, d.x1]);
            const yd = d3.interpolate(y.domain(), [d.y0, 1]);
            const yr = d3.interpolate(y.range(), [d.y0 ? 40 : 0, radius]);
            return (nodeData: SunburstNode, i: number) => {
                return i
                    ? () => arc(nodeData) ?? ''
                    : (t: number) => {
                        x.domain(xd(t));
                        y.domain(yd(t)).range(yr(t));
                        return arc(nodeData) ?? '';
                    };
            };
        }

        function handleClick(_event: MouseEvent, d: SunburstNode) {
            node = d;
            if (onSelect) onSelect(d);
            svg.selectAll('path')
                .transition()
                .duration(1000)
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                .attrTween('d', arcTweenZoom(d) as any);
        }

        // Setup tooltip
        const tooltip = container
            .append(tooltipContent ? (tooltipContent.type as string) : 'div')
            .attr('class', 'sunburst-tooltip')
            .style('position', 'absolute')
            .style('z-index', '10')
            .style('opacity', '0');

        if (tooltipContent) {
            Object.keys(tooltipContent.props as Record<string, unknown>).forEach((key) => {
                tooltip.attr(key, String((tooltipContent.props as Record<string, unknown>)[key]));
            });
        }

        // Build paths
        svg.selectAll('path')
            .data(partition(rootData as unknown as d3.HierarchyNode<SunburstDataNode>).descendants() as SunburstNode[])
            .enter()
            .append('path')
            .style('fill', (d: SunburstNode) => {
                if (colorFunc) return colorFunc(d);

                let hue: number;
                const current = d;

                if (current.data.color) {
                    current.fill = d3.hsl(current.data.color);
                    return current.data.color;
                }
                if (current.depth === 0) return '#33cccc';
                if (current.depth <= 1) {
                    hue = hueDXScale(d.x0);
                    current.fill = d3.hsl(hue, 0.5, 0.6);
                    return current.fill.toString();
                }
                current.fill = current.parent ? (current.parent as SunburstNode).fill!.brighter(0.5) as d3.HSLColor : d3.hsl(0, 0.5, 0.6);
                const hsl = d3.hsl(current.fill.toString());
                hue = hueDXScale(current.x0);
                const colorshift = hsl.h + (hue / 4);
                return d3.hsl(colorshift, hsl.s, hsl.l).toString();
            })
            .attr('stroke', '#fff')
            .attr('stroke-width', '1')
            .on('click', handleClick as unknown as (this: SVGPathElement, event: MouseEvent, datum: SunburstNode) => void)
            .on('mouseover', function (this: SVGPathElement, _event: MouseEvent, d: SunburstNode) {
                if (showTooltip) {
                    d3.select(this).style('cursor', 'pointer');
                    tooltip.html(formatNameTooltip(d));
                    tooltip.transition().duration(50).style('opacity', 1);
                }
            })
            .on('mousemove', (event: MouseEvent) => {
                if (showTooltip) {
                    const containerEl = document.getElementById(keyId);
                    if (containerEl) {
                        const rect = containerEl.getBoundingClientRect();
                        const xPos = event.clientX - rect.left;
                        const yPos = event.clientY - rect.top;
                        tooltip
                            .style('top', `${yPos - 50}px`)
                            .style('left', `${tooltipPosition === 'right' ? xPos - 100 : xPos - 50}px`);
                    }
                }
            })
            .on('mouseout', function (this: SVGPathElement) {
                if (showTooltip) {
                    d3.select(this).style('cursor', 'default');
                    tooltip.transition().duration(50).style('opacity', 0);
                }
            });

        // Initial animation
        svg.selectAll<SVGPathElement, SunburstNode>('path')
            .transition()
            .duration(1000)
            .attrTween('d', (d: SunburstNode, i: number) => arcTweenData(d, i));
    }, [data, value, width, height, keyId, showTooltip, tooltipPosition, tooltipContent, scale, onSelect, colorFunc]);

    useEffect(() => {
        const serialized = JSON.stringify(data);
        if (dataRef.current !== serialized) {
            dataRef.current = serialized;
            renderSunburst();
        } else {
            renderSunburst();
        }
    }, [renderSunburst, data]);

    return (
        <div id={keyId} style={{ position: 'relative' }}>
            <svg
                ref={svgRef}
                style={{
                    width: typeof width === 'number' ? width : (parseInt(String(width), 10) || 480),
                    height: typeof height === 'number' ? height : (parseInt(String(height), 10) || 400),
                }}
                id={`${keyId}-svg`}
            />
        </div>
    );
};

export default Sunburst;
