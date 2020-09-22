import React, {useEffect, useRef} from 'react';
import {isEqual} from 'lodash/lang';
import * as d3 from 'd3';
import * as utils from './utils';

function usePrevious(value) {
    const ref = useRef();
    useEffect(() => {
        ref.current = value;
    });
    return ref.current;
}
const Sunburst = (props) => {
    const svgRef = useRef()
    const prevProps = usePrevious(props);
    useEffect(() => {
        if (!isEqual(prevProps, props)) {
            renderSunburst();
        }
        // eslint-disable-next-line
    }, [props])

    const arcTweenData = (a, i, node, x, arc) => {  // eslint-disable-line
        const oi = d3.interpolate({x0: (a.x0s ? a.x0s : 0), x1: (a.x1s ? a.x1s : 0)}, a);

        function tween(t) {
            const b = oi(t);
            a.x0s = b.x0;   // eslint-disable-line
            a.x1s = b.x1;   // eslint-disable-line
            return arc(b);
        }

        if (i === 0) {
            const xd = d3.interpolate(x.domain(), [node.x0, node.x1]);
            return function (t) {
                x.domain(xd(t));
                return tween(t);
            };
        } else {  // eslint-disable-line
            return tween;
        }
    }
    const update = (root, firstBuild, svg, partition, hueDXScale, x, y, radius, arc, node) => {  // eslint-disable-line
        if (firstBuild) {
            function arcTweenZoom(d) {
                const xd = d3.interpolate(x.domain(), [d.x0, d.x1]), // eslint-disable-line
                    yd = d3.interpolate(y.domain(), [d.y0, 1]),
                    yr = d3.interpolate(y.range(), [d.y0 ? 40 : 0, radius]);
                return function (data, i) {
                    return i
                        ? () => arc(data)
                        : (t) => {
                            x.domain(xd(t));
                            y.domain(yd(t)).range(yr(t));
                            return arc(data);
                        };
                };
            }

            function click(d) { // eslint-disable-line
                node = d; // eslint-disable-line
                props.onSelect && props.onSelect(d);
                svg.selectAll('path').transition().duration(1000).attrTween('d', arcTweenZoom(d));
            }

            const tooltipContent = props.tooltipContent;
            const tooltip = d3.select(`#${props.keyId}`)
                .append(tooltipContent ? tooltipContent.type : 'div')
                .style('position', 'absolute')
                .style('z-index', '10')
                .style('opacity', '0');
            if (tooltipContent) {
                Object.keys(tooltipContent.props).forEach((key) => {
                    tooltip.attr(key, tooltipContent.props[key]);
                });
            }
            svg.selectAll('path').data(partition(root).descendants()).enter().append('path')
                .style('fill', (d) => {
                    let hue;
                    const current = d;
                    if (current.depth === 0) {
                        return '#33cccc';
                    }
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
                .on('click', d => click(d, node, svg, x, y, radius, arc))
                .on('mouseover', function (d) {
                    if (props.tooltip) {
                        d3.select(this).style('cursor', 'pointer');
                        tooltip.html(() => {
                            const name = utils.formatNameTooltip(d);
                            return name;
                        });
                        return tooltip.transition().duration(50).style('opacity', 1);
                    }
                    return null;
                })
                .on('mousemove', () => {
                    if (props.tooltip) {
                        tooltip
                            .style('top', `${d3.event.pageY - 50}px`)
                            .style('left', `${props.tooltipPosition === 'right' ? d3.event.pageX - 100 : d3.event.pageX - 50}px`);
                    }
                    return null;
                })
                .on('mouseout', function () {
                    if (props.tooltip) {
                        d3.select(this).style('cursor', 'default');
                        tooltip.transition().duration(50).style('opacity', 0);
                    }
                    return null;
                });
        } else {
            svg.selectAll('path').data(partition(root).descendants());
        }
        svg.selectAll('path').transition().duration(1000).attrTween('d', (d, i) => arcTweenData(d, i, node, x, arc));
    }
    const renderSunburst = () => {
        if (props.data) {
            document.querySelectorAll("g").forEach((node) => {
                node.remove()
            })
            const gWidth = props.width
            const gHeight = props.height
            const radius = (Math.min(gWidth, gHeight) / 2) - 10
            const svg = d3.select(svgRef.current).append('g').attr('transform', `translate(${gWidth / 2},${gHeight / 2})`)
            const x = d3.scaleLinear().range([0, 2 * Math.PI])
            const y = props.scale === 'linear' ? d3.scaleLinear().range([0, radius]) : d3.scaleSqrt().range([0, radius])
            const partition = d3.partition()
            const arc = d3.arc()
                .startAngle(d => Math.max(0, Math.min(2 * Math.PI, x(d.x0))))
                .endAngle(d => Math.max(0, Math.min(2 * Math.PI, x(d.x1))))
                .innerRadius(d => Math.max(0, y(d.y0)))
                .outerRadius(d => Math.max(0, y(d.y1)))
            const hueDXScale = d3.scaleLinear()
                .domain([0, 1])
                .range([0, 360])
            const rootData = d3.hierarchy(props.data);
            const firstBuild = true;
            const node = rootData;
            rootData.sum(d => d[props.value]);
            update(rootData, firstBuild, svg, partition, hueDXScale, x, y, radius, arc, node); // GO!
        }
    }

    return (
        <div id={props.keyId} className="text-center">
            <svg ref={svgRef} style={{width: parseInt(props.width, 10) || 480, height: parseInt(props.height, 10) || 400}}
                 id={`${props.keyId}-svg`}/>
        </div>
    );
}
export default Sunburst