import { useEffect, useRef, useCallback } from 'react';
import * as d3 from 'd3';
import { formatNameTooltip } from './utils';

const Sunburst = ({
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
    const svgRef = useRef();
    const dataRef = useRef();

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

        const partition = d3.partition();

        const arc = d3.arc()
            .startAngle(d => Math.max(0, Math.min(2 * Math.PI, x(d.x0))))
            .endAngle(d => Math.max(0, Math.min(2 * Math.PI, x(d.x1))))
            .innerRadius(d => Math.max(0, y(d.y0)))
            .outerRadius(d => Math.max(0, y(d.y1)));

        const hueDXScale = d3.scaleLinear()
            .domain([0, 1])
            .range([0, 360]);

        const rootData = d3.hierarchy(data);
        let node = rootData;
        rootData.sum(d => d[value]);

        const arcTweenData = (a, i) => {
            const oi = d3.interpolate(
                { x0: a.x0s || 0, x1: a.x1s || 0 },
                a
            );

            function tween(t) {
                const b = oi(t);
                a.x0s = b.x0;
                a.x1s = b.x1;
                return arc(b);
            }

            if (i === 0) {
                const xd = d3.interpolate(x.domain(), [node.x0, node.x1]);
                return (t) => {
                    x.domain(xd(t));
                    return tween(t);
                };
            }
            return tween;
        };

        function arcTweenZoom(d) {
            const xd = d3.interpolate(x.domain(), [d.x0, d.x1]);
            const yd = d3.interpolate(y.domain(), [d.y0, 1]);
            const yr = d3.interpolate(y.range(), [d.y0 ? 40 : 0, radius]);
            return (nodeData, i) => {
                return i
                    ? () => arc(nodeData)
                    : (t) => {
                        x.domain(xd(t));
                        y.domain(yd(t)).range(yr(t));
                        return arc(nodeData);
                    };
            };
        }

        function handleClick(event, d) {
            node = d;
            if (onSelect) onSelect(d);
            svg.selectAll('path')
                .transition()
                .duration(1000)
                .attrTween('d', arcTweenZoom(d));
        }

        // Setup tooltip
        const tooltip = container
            .append(tooltipContent ? tooltipContent.type : 'div')
            .attr('class', 'sunburst-tooltip')
            .style('position', 'absolute')
            .style('z-index', '10')
            .style('opacity', '0');

        if (tooltipContent) {
            Object.keys(tooltipContent.props).forEach((key) => {
                tooltip.attr(key, tooltipContent.props[key]);
            });
        }

        // Build paths
        svg.selectAll('path')
            .data(partition(rootData).descendants())
            .enter()
            .append('path')
            .style('fill', (d) => {
                if (colorFunc) return colorFunc(d);

                let hue;
                const current = d;

                if (current.data.color) {
                    current.fill = d3.hsl(current.data.color);
                    return current.data.color;
                }
                if (current.depth === 0) return '#33cccc';
                if (current.depth <= 1) {
                    hue = hueDXScale(d.x0);
                    current.fill = d3.hsl(hue, 0.5, 0.6);
                    return current.fill;
                }
                current.fill = current.parent.fill.brighter(0.5);
                const hsl = d3.hsl(current.fill);
                hue = hueDXScale(current.x0);
                const colorshift = hsl.h + (hue / 4);
                return d3.hsl(colorshift, hsl.s, hsl.l);
            })
            .attr('stroke', '#fff')
            .attr('stroke-width', '1')
            .on('click', handleClick)
            .on('mouseover', function (event, d) {
                if (showTooltip) {
                    d3.select(this).style('cursor', 'pointer');
                    tooltip.html(formatNameTooltip(d));
                    tooltip.transition().duration(50).style('opacity', 1);
                }
            })
            .on('mousemove', (event) => {
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
            .on('mouseout', function () {
                if (showTooltip) {
                    d3.select(this).style('cursor', 'default');
                    tooltip.transition().duration(50).style('opacity', 0);
                }
            });

        // Initial animation
        svg.selectAll('path')
            .transition()
            .duration(1000)
            .attrTween('d', (d, i) => arcTweenData(d, i));
    }, [data, value, width, height, keyId, showTooltip, tooltipPosition, tooltipContent, scale, onSelect, colorFunc]);

    useEffect(() => {
        // Use JSON serialization for a simple deep comparison
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
                    width: parseInt(width, 10) || 480,
                    height: parseInt(height, 10) || 400,
                }}
                id={`${keyId}-svg`}
            />
        </div>
    );
};

export default Sunburst;