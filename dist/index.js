"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _react = _interopRequireWildcard(require("react"));
var _lang = require("lodash/lang");
var d3 = _interopRequireWildcard(require("d3"));
var utils = _interopRequireWildcard(require("./utils"));
function _interopRequireWildcard(e, t) { if ("function" == typeof WeakMap) var r = new WeakMap(), n = new WeakMap(); return (_interopRequireWildcard = function (e, t) { if (!t && e && e.__esModule) return e; var o, i, f = { __proto__: null, default: e }; if (null === e || "object" != typeof e && "function" != typeof e) return f; if (o = t ? n : r) { if (o.has(e)) return o.get(e); o.set(e, f); } for (const t in e) "default" !== t && {}.hasOwnProperty.call(e, t) && ((i = (o = Object.defineProperty) && Object.getOwnPropertyDescriptor(e, t)) && (i.get || i.set) ? o(f, t, i) : f[t] = e[t]); return f; })(e, t); }
function usePrevious(value) {
  const ref = (0, _react.useRef)();
  (0, _react.useEffect)(() => {
    ref.current = value;
  });
  return ref.current;
}
const Sunburst = props => {
  const svgRef = (0, _react.useRef)();
  const containerRef = (0, _react.useRef)();
  const [containerSize, setContainerSize] = (0, _react.useState)(null);
  const prevProps = usePrevious(props);
  const prevContainerSize = usePrevious(containerSize);
  (0, _react.useEffect)(() => {
    if (!(0, _lang.isEqual)(prevProps, props) || !(0, _lang.isEqual)(prevContainerSize, containerSize)) {
      renderSunburst();
    }
    // eslint-disable-next-line
  }, [props, containerSize]);
  (0, _react.useEffect)(() => {
    if (!containerRef.current) return;
    const observer = new ResizeObserver(entries => {
      for (const entry of entries) {
        const {
          width,
          height
        } = entry.contentRect;
        if (width > 0 && height > 0) {
          setContainerSize({
            width,
            height
          });
        }
      }
    });
    observer.observe(containerRef.current);
    return () => observer.disconnect();
  }, []);
  const arcTweenData = (a, i, node, x, arc) => {
    // eslint-disable-line
    const oi = d3.interpolate({
      x0: a.x0s ? a.x0s : 0,
      x1: a.x1s ? a.x1s : 0
    }, a);
    function tween(t) {
      const b = oi(t);
      a.x0s = b.x0; // eslint-disable-line
      a.x1s = b.x1; // eslint-disable-line
      return arc(b);
    }
    if (i === 0) {
      const xd = d3.interpolate(x.domain(), [node.x0, node.x1]);
      return function (t) {
        x.domain(xd(t));
        return tween(t);
      };
    } else {
      // eslint-disable-line
      return tween;
    }
  };
  const update = (root, firstBuild, svg, partition, hueDXScale, x, y, radius, arc, node) => {
    // eslint-disable-line
    if (firstBuild) {
      function arcTweenZoom(d) {
        const xd = d3.interpolate(x.domain(), [d.x0, d.x1]),
          // eslint-disable-line
          yd = d3.interpolate(y.domain(), [d.y0, 1]),
          yr = d3.interpolate(y.range(), [d.y0 ? 40 : 0, radius]);
        return function (data, i) {
          return i ? () => arc(data) : t => {
            x.domain(xd(t));
            y.domain(yd(t)).range(yr(t));
            return arc(data);
          };
        };
      }
      function click(d) {
        // eslint-disable-line
        node = d; // eslint-disable-line
        props.onSelect && props.onSelect(d);
        svg.selectAll('path').transition().duration(1000).attrTween('d', arcTweenZoom(d));
      }
      const tooltipContent = props.tooltipContent;
      const tooltip = d3.select("#".concat(props.keyId)).append(tooltipContent ? tooltipContent.type : 'div').style('position', 'absolute').style('z-index', '10').style('opacity', '0');
      if (tooltipContent) {
        Object.keys(tooltipContent.props).forEach(key => {
          tooltip.attr(key, tooltipContent.props[key]);
        });
      }
      svg.selectAll('path').data(partition(root).descendants()).enter().append('path').style('fill', d => {
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
        const colorshift = hsl.h + hue / 4;
        return d3.hsl(colorshift, hsl.s, hsl.l);
      }).attr('stroke', '#fff').attr('stroke-width', '1').on('click', d => click(d, node, svg, x, y, radius, arc)).on('mouseover', function (d) {
        if (props.tooltip) {
          d3.select(this).style('cursor', 'pointer');
          tooltip.html(() => {
            const name = utils.formatNameTooltip(d);
            return name;
          });
          return tooltip.transition().duration(50).style('opacity', 1);
        }
        return null;
      }).on('mousemove', () => {
        if (props.tooltip) {
          tooltip.style('top', "".concat(d3.event.pageY - 50, "px")).style('left', "".concat(props.tooltipPosition === 'right' ? d3.event.pageX - 100 : d3.event.pageX - 50, "px"));
        }
        return null;
      }).on('mouseout', function () {
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
  };
  const renderSunburst = () => {
    if (props.data) {
      document.querySelectorAll("g").forEach(node => {
        node.remove();
      });
      const gWidth = containerSize ? containerSize.width : props.width;
      const gHeight = containerSize ? containerSize.height : props.height;
      const radius = Math.min(gWidth, gHeight) / 2 - 10;
      const svg = d3.select(svgRef.current).append('g').attr('transform', "translate(".concat(gWidth / 2, ",").concat(gHeight / 2, ")"));
      const x = d3.scaleLinear().range([0, 2 * Math.PI]);
      const y = props.scale === 'linear' ? d3.scaleLinear().range([0, radius]) : d3.scaleSqrt().range([0, radius]);
      const partition = d3.partition();
      const arc = d3.arc().startAngle(d => Math.max(0, Math.min(2 * Math.PI, x(d.x0)))).endAngle(d => Math.max(0, Math.min(2 * Math.PI, x(d.x1)))).innerRadius(d => Math.max(0, y(d.y0))).outerRadius(d => Math.max(0, y(d.y1)));
      const hueDXScale = d3.scaleLinear().domain([0, 1]).range([0, 360]);
      const rootData = d3.hierarchy(props.data);
      const firstBuild = true;
      const node = rootData;
      rootData.sum(d => d[props.value]);
      update(rootData, firstBuild, svg, partition, hueDXScale, x, y, radius, arc, node); // GO!
    }
  };
  const svgWidth = containerSize ? containerSize.width : parseInt(props.width, 10) || 480;
  const svgHeight = containerSize ? containerSize.height : parseInt(props.height, 10) || 400;
  return /*#__PURE__*/_react.default.createElement("div", {
    id: props.keyId,
    ref: containerRef,
    className: "text-center",
    style: {
      width: '100%',
      height: '100%'
    }
  }, /*#__PURE__*/_react.default.createElement("svg", {
    ref: svgRef,
    style: {
      width: svgWidth,
      height: svgHeight
    },
    id: "".concat(props.keyId, "-svg")
  }));
};
var _default = exports.default = Sunburst;