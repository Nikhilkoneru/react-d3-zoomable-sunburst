"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireWildcard(require("react"));

var _lang = require("lodash/lang");

var d3 = _interopRequireWildcard(require("d3"));

var utils = _interopRequireWildcard(require("./utils/utils.js"));

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function usePrevious(value) {
  var ref = (0, _react.useRef)();
  (0, _react.useEffect)(function () {
    ref.current = value;
  });
  return ref.current;
}
/**
 * Sunburst Chart React Stateless Component with the following allowable Props *
 * data => JSON Array - Typically same for every Sunburst Chart *
 * scale => String - Options: linear | exponential - Linear renders each arc with same radii, Exponential reduces gradually by SquareRoot *
 * onSelect => Function - Called on Arc Click for re-rendering the chart and passing back to User as props *
 * tooltip => Boolean - Display Tooltip or not *
 * tooltipContent => HTMLNode - Customized Node for Tooltip rendering *
 * keyId => String - Unique Id for Chart SVG *
 * width => Integer - Width of the Chart Container *
 * height => Integer - Height of the Chart Container *
 * value => Value to use to build this Chart *
 */


var Sunburst = function Sunburst(props) {
  var svgRef = (0, _react.useRef)();
  var prevProps = usePrevious(props);
  (0, _react.useEffect)(function () {
    if (!(0, _lang.isEqual)(prevProps, props)) {
      renderSunburst();
    }
  }, [props]);

  var arcTweenData = function arcTweenData(a, i, node, x, arc) {
    // eslint-disable-line
    var oi = d3.interpolate({
      x0: a.x0s ? a.x0s : 0,
      x1: a.x1s ? a.x1s : 0
    }, a);

    function tween(t) {
      var b = oi(t);
      a.x0s = b.x0; // eslint-disable-line

      a.x1s = b.x1; // eslint-disable-line

      return arc(b);
    }

    if (i === 0) {
      var xd = d3.interpolate(x.domain(), [node.x0, node.x1]);
      return function (t) {
        x.domain(xd(t));
        return tween(t);
      };
    } else {
      // eslint-disable-line
      return tween;
    }
  };

  var update = function update(root, firstBuild, svg, partition, hueDXScale, x, y, radius, arc, node) {
    // eslint-disable-line
    if (firstBuild) {
      function arcTweenZoom(d) {
        var xd = d3.interpolate(x.domain(), [d.x0, d.x1]),
            // eslint-disable-line
        yd = d3.interpolate(y.domain(), [d.y0, 1]),
            yr = d3.interpolate(y.range(), [d.y0 ? 40 : 0, radius]);
        return function (data, i) {
          return i ? function () {
            return arc(data);
          } : function (t) {
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

      var tooltipContent = props.tooltipContent;
      var tooltip = d3.select("#".concat(props.keyId)).append(tooltipContent ? tooltipContent.type : 'div').style('position', 'absolute').style('z-index', '10').style('opacity', '0');

      if (tooltipContent) {
        Object.keys(tooltipContent.props).forEach(function (key) {
          tooltip.attr(key, tooltipContent.props[key]);
        });
      }

      svg.selectAll('path').data(partition(root).descendants()).enter().append('path').style('fill', function (d) {
        var hue;
        var current = d;

        if (current.depth === 0) {
          return '#33cccc';
        }

        if (current.depth <= 1) {
          hue = hueDXScale(d.x0);
          current.fill = d3.hsl(hue, 0.5, 0.6);
          return current.fill;
        }

        current.fill = current.parent.fill.brighter(0.5);
        var hsl = d3.hsl(current.fill);
        hue = hueDXScale(current.x0);
        var colorshift = hsl.h + hue / 4;
        return d3.hsl(colorshift, hsl.s, hsl.l);
      }).attr('stroke', '#fff').attr('stroke-width', '1').on('click', function (d) {
        return click(d, node, svg, x, y, radius, arc);
      }).on('mouseover', function (d) {
        if (props.tooltip) {
          d3.select(this).style('cursor', 'pointer');
          tooltip.html(function () {
            var name = utils.formatNameTooltip(d);
            return name;
          });
          return tooltip.transition().duration(50).style('opacity', 1);
        }

        return null;
      }).on('mousemove', function () {
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

    svg.selectAll('path').transition().duration(1000).attrTween('d', function (d, i) {
      return arcTweenData(d, i, node, x, arc);
    });
  };

  var renderSunburst = function renderSunburst() {
    if (props.data) {
      document.querySelectorAll("g").forEach(function (node) {
        node.remove();
      });
      var gWidth = props.width;
      var gHeight = props.height;
      var radius = Math.min(gWidth, gHeight) / 2 - 10;
      var svg = d3.select(svgRef.current).append('g').attr('transform', "translate(".concat(gWidth / 2, ",").concat(gHeight / 2, ")"));
      var x = d3.scaleLinear().range([0, 2 * Math.PI]);
      var y = props.scale === 'linear' ? d3.scaleLinear().range([0, radius]) : d3.scaleSqrt().range([0, radius]);
      var partition = d3.partition();
      var arc = d3.arc().startAngle(function (d) {
        return Math.max(0, Math.min(2 * Math.PI, x(d.x0)));
      }).endAngle(function (d) {
        return Math.max(0, Math.min(2 * Math.PI, x(d.x1)));
      }).innerRadius(function (d) {
        return Math.max(0, y(d.y0));
      }).outerRadius(function (d) {
        return Math.max(0, y(d.y1));
      });
      var hueDXScale = d3.scaleLinear().domain([0, 1]).range([0, 360]);
      var rootData = d3.hierarchy(props.data);
      var firstBuild = true;
      var node = rootData;
      rootData.sum(function (d) {
        return d[props.value];
      });
      update(rootData, firstBuild, svg, partition, hueDXScale, x, y, radius, arc, node); // GO!
    }
  };

  return /*#__PURE__*/_react.default.createElement("div", {
    id: props.keyId,
    className: "text-center"
  }, /*#__PURE__*/_react.default.createElement("svg", {
    ref: svgRef,
    style: {
      width: parseInt(props.width, 10) || 480,
      height: parseInt(props.height, 10) || 400
    },
    id: "".concat(props.keyId, "-svg")
  }));
};

var _default = Sunburst;
exports.default = _default;