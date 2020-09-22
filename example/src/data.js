export default {
  "name": "flare",
  "children": [
    {
      "name": "analytics",
      "children": [
        {
          "name": "cluster",
          "children": [
            {"name": "AgglomerativeCluster", "minSize": 12, "size": 3938},
            {"name": "CommunityStructure", "minSize": 122, "size": 3812},
            {"name": "HierarchicalCluster", "minSize": 154, "size": 6714},
            {"name": "MergeEdge", "minSize": 154, "size": 743}
          ]
        },
        {
          "name": "graph",
          "children": [
            {"name": "BetweennessCentrality", "minSize": 11, "size": 3534},
            {"name": "LinkDistance", "minSize": 18, "size": 5731},
            {"name": "MaxFlowMinCut", "minSize": 160, "size": 7840},
            {"name": "ShortestPaths", "minSize": 140, "size": 5914},
            {"name": "SpanningTree", "minSize": 190, "size": 3416}
          ]
        },
        {
          "name": "optimization",
          "children": [
            {"name": "AspectRatioBanker", "minSize": 8, "size": 7074}
          ]
        }
      ]
    },
    {
      "name": "animate",
      "children": [
        {"name": "Easing", "minSize": 200, "size": 17010},
        {"name": "FunctionSequence", "minSize": 250, "size": 5842},
        {
          "name": "interpolate",
          "children": [
            {"name": "ArrayInterpolator", "minSize": 12, "size": 1983},
            {"name": "ColorInterpolator", "minSize": 12, "size": 2047},
            {"name": "DateInterpolator", "minSize": 12, "size": 1375},
            {"name": "Interpolator", "minSize": 12, "size": 8746},
            {"name": "MatrixInterpolator", "minSize": 12, "size": 2202},
            {"name": "NumberInterpolator", "minSize": 12, "size": 1382},
            {"name": "ObjectInterpolator", "minSize": 12, "size": 1629},
            {"name": "PointInterpolator", "minSize": 12, "size": 1675},
            {"name": "RectangleInterpolator", "minSize": 12, "size": 2042}
          ]
        },
        {"name": "ISchedulable", "minSize": 12, "size": 1041},
        {"name": "Parallel", "minSize": 12, "size": 5176},
        {"name": "Pause", "minSize": 12, "size": 449},
        {"name": "Scheduler", "minSize": 12, "size": 5593},
        {"name": "Sequence", "minSize": 12, "size": 5534},
        {"name": "Transition", "minSize": 12, "size": 9201},
        {"name": "Transitioner", "minSize": 12, "size": 19975},
        {"name": "TransitionEvent", "minSize": 12, "size": 1116},
        {"name": "Tween", "minSize": 12, "size": 6006}
      ]
    },
    {
      "name": "data",
      "children": [
        {
          "name": "converters",
          "children": [
            {"name": "Converters", "minSize": 12, "size": 721},
            {"name": "DelimitedTextConverter", "minSize": 12, "size": 4294},
            {"name": "GraphMLConverter", "minSize": 12, "size": 9800},
            {"name": "IDataConverter", "minSize": 12, "size": 1314},
            {"name": "JSONConverter", "minSize": 12, "size": 2220}
          ]
        },
        {"name": "DataField", "minSize": 12, "size": 1759},
        {"name": "DataSchema", "minSize": 12, "size": 2165},
        {"name": "DataSet", "minSize": 12, "size": 586},
        {"name": "DataSource", "minSize": 12, "size": 3331},
        {"name": "DataTable", "minSize": 12, "size": 772},
        {"name": "DataUtil", "minSize": 12, "size": 3322}
      ]
    },
    {
      "name": "display",
      "children": [
        {"name": "DirtySprite", "minSize": 12, "size": 8833},
        {"name": "LineSprite", "minSize": 12, "size": 1732},
        {"name": "RectSprite", "minSize": 12, "size": 3623},
        {"name": "TextSprite", "minSize": 12, "size": 10066}
      ]
    },
    {
      "name": "flex",
      "children": [
        {"name": "FlareVis", "minSize": 12, "size": 4116}
      ]
    },
    {
      "name": "physics",
      "children": [
        {"name": "DragForce", "minSize": 12, "size": 1082},
        {"name": "GravityForce", "minSize": 12, "size": 1336},
        {"name": "IForce", "minSize": 12, "size": 319},
        {"name": "NBodyForce", "minSize": 12, "size": 10498},
        {"name": "Particle", "minSize": 12, "size": 2822},
        {"name": "Simulation", "minSize": 12, "size": 9983},
        {"name": "Spring", "minSize": 12, "size": 2213},
        {"name": "SpringForce", "minSize": 12, "size": 1681}
      ]
    },
    {
      "name": "query",
      "children": [
        {"name": "AggregateExpression", "minSize": 12, "size": 1616},
        {"name": "And", "minSize": 12, "size": 1027},
        {"name": "Arithmetic", "minSize": 12, "size": 3891},
        {"name": "Average", "minSize": 12, "size": 891},
        {"name": "BinaryExpression", "minSize": 12, "size": 2893},
        {"name": "Comparison", "minSize": 12, "size": 5103},
        {"name": "CompositeExpression", "minSize": 12, "size": 3677},
        {"name": "Count", "minSize": 12, "size": 781},
        {"name": "DateUtil", "minSize": 12, "size": 4141},
        {"name": "Distinct", "minSize": 12, "size": 933},
        {"name": "Expression", "minSize": 12, "size": 5130},
        {"name": "ExpressionIterator", "minSize": 12, "size": 3617},
        {"name": "Fn", "minSize": 12, "size": 3240},
        {"name": "If", "minSize": 12, "size": 2732},
        {"name": "IsA", "minSize": 12, "size": 2039},
        {"name": "Literal", "minSize": 12, "size": 1214},
        {"name": "Match", "minSize": 12, "size": 3748},
        {"name": "Maximum", "minSize": 12, "size": 843},
        {
          "name": "methods",
          "children": [
            {"name": "add", "minSize": 12, "size": 593},
            {"name": "and", "minSize": 12, "size": 330},
            {"name": "average", "minSize": 12, "size": 287},
            {"name": "count", "minSize": 12, "size": 277},
            {"name": "distinct", "minSize": 12, "size": 292},
            {"name": "div", "minSize": 12, "size": 595},
            {"name": "eq", "minSize": 12, "size": 594},
            {"name": "fn", "minSize": 12, "size": 460},
            {"name": "gt", "minSize": 12, "size": 603},
            {"name": "gte", "minSize": 12, "size": 625},
            {"name": "iff", "minSize": 12, "size": 748},
            {"name": "isa", "minSize": 12, "size": 461},
            {"name": "lt", "minSize": 12, "size": 597},
            {"name": "lte", "minSize": 12, "size": 619},
            {"name": "max", "minSize": 12, "size": 283},
            {"name": "min", "minSize": 12, "size": 283},
            {"name": "mod", "minSize": 12, "size": 591},
            {"name": "mul", "minSize": 12, "size": 603},
            {"name": "neq", "minSize": 12, "size": 599},
            {"name": "not", "minSize": 12, "size": 386},
            {"name": "or", "minSize": 12, "size": 323},
            {"name": "orderby", "minSize": 12, "size": 307},
            {"name": "range", "minSize": 12, "size": 772},
            {"name": "select", "minSize": 12, "size": 296},
            {"name": "stddev", "minSize": 12, "size": 363},
            {"name": "sub", "minSize": 12, "size": 600},
            {"name": "sum", "minSize": 12, "size": 280},
            {"name": "update", "minSize": 12, "size": 307},
            {"name": "variance", "minSize": 12, "size": 335},
            {"name": "where", "minSize": 12, "size": 299},
            {"name": "xor", "minSize": 12, "size": 354},
            {"name": "_", "minSize": 12, "size": 264}
          ]
        },
        {"name": "Minimum", "minSize": 12, "size": 843},
        {"name": "Not", "minSize": 12, "size": 1554},
        {"name": "Or", "minSize": 12, "size": 970},
        {"name": "Query", "minSize": 12, "size": 13896},
        {"name": "Range", "minSize": 12, "size": 1594},
        {"name": "StringUtil", "minSize": 12, "size": 4130},
        {"name": "Sum", "minSize": 12, "size": 791},
        {"name": "Variable", "minSize": 12, "size": 1124},
        {"name": "Variance", "minSize": 12, "size": 1876},
        {"name": "Xor", "minSize": 12, "size": 1101}
      ]
    },
    {
      "name": "scale",
      "children": [
        {"name": "IScaleMap", "minSize": 12, "size": 2105},
        {"name": "LinearScale", "minSize": 12, "size": 1316},
        {"name": "LogScale", "minSize": 12, "size": 3151},
        {"name": "OrdinalScale", "minSize": 12, "size": 3770},
        {"name": "QuantileScale", "minSize": 12, "size": 2435},
        {"name": "QuantitativeScale", "minSize": 12, "size": 4839},
        {"name": "RootScale", "minSize": 12, "size": 1756},
        {"name": "Scale", "minSize": 12, "size": 4268},
        {"name": "ScaleType", "minSize": 12, "size": 1821},
        {"name": "TimeScale", "minSize": 12, "size": 5833}
      ]
    },
    {
      "name": "util",
      "children": [
        {"name": "Arrays", "minSize": 12, "size": 8258},
        {"name": "Colors", "minSize": 12, "size": 10001},
        {"name": "Dates", "minSize": 12, "size": 8217},
        {"name": "Displays", "minSize": 12, "size": 12555},
        {"name": "Filter", "minSize": 12, "size": 2324},
        {"name": "Geometry", "minSize": 12, "size": 10993},
        {
          "name": "heap",
          "children": [
            {"name": "FibonacciHeap", "minSize": 12, "size": 9354},
            {"name": "HeapNode", "minSize": 12, "size": 1233}
          ]
        },
        {"name": "IEvaluable", "minSize": 12, "size": 335},
        {"name": "IPredicate", "minSize": 12, "size": 383},
        {"name": "IValueProxy", "minSize": 12, "size": 874},
        {
          "name": "math",
          "children": [
            {"name": "DenseMatrix", "minSize": 12, "size": 3165},
            {"name": "IMatrix", "minSize": 12, "size": 2815},
            {"name": "SparseMatrix", "minSize": 12, "size": 3366}
          ]
        },
        {"name": "Maths", "minSize": 12, "size": 17705},
        {"name": "Orientation", "minSize": 12, "size": 1486},
        {
          "name": "palette",
          "children": [
            {"name": "ColorPalette", "minSize": 12, "size": 6367},
            {"name": "Palette", "minSize": 12, "size": 1229},
            {"name": "ShapePalette", "minSize": 12, "size": 2059},
            {"name": "SizePalette", "minSize": 12, "size": 2291}
          ]
        },
        {"name": "Property", "minSize": 12, "size": 5559},
        {"name": "Shapes", "minSize": 12, "size": 19118},
        {"name": "Sort", "minSize": 12, "size": 6887},
        {"name": "Stats", "minSize": 12, "size": 6557},
        {"name": "Strings", "minSize": 12, "size": 22026}
      ]
    },
    {
      "name": "vis",
      "children": [
        {
          "name": "axis",
          "children": [
            {"name": "Axes", "minSize": 12, "size": 1302},
            {"name": "Axis", "minSize": 12, "size": 24593},
            {"name": "AxisGridLine", "minSize": 12, "size": 652},
            {"name": "AxisLabel", "minSize": 12, "size": 636},
            {"name": "CartesianAxes", "minSize": 12, "size": 6703}
          ]
        },
        {
          "name": "controls",
          "children": [
            {"name": "AnchorControl", "minSize": 12, "size": 2138},
            {"name": "ClickControl", "minSize": 12, "size": 3824},
            {"name": "Control", "minSize": 12, "size": 1353},
            {"name": "ControlList", "minSize": 12, "size": 4665},
            {"name": "DragControl", "minSize": 12, "size": 2649},
            {"name": "ExpandControl", "minSize": 12, "size": 2832},
            {"name": "HoverControl", "minSize": 12, "size": 4896},
            {"name": "IControl", "minSize": 12, "size": 763},
            {"name": "PanZoomControl", "minSize": 12, "size": 5222},
            {"name": "SelectionControl", "minSize": 12, "size": 7862},
            {"name": "TooltipControl", "minSize": 12, "size": 8435}
          ]
        },
        {
          "name": "data",
          "children": [
            {"name": "Data", "minSize": 12, "size": 20544},
            {"name": "DataList", "minSize": 12, "size": 19788},
            {"name": "DataSprite", "minSize": 12, "size": 10349},
            {"name": "EdgeSprite", "minSize": 12, "size": 3301},
            {"name": "NodeSprite", "minSize": 12, "size": 19382},
            {
              "name": "render",
              "children": [
                {"name": "ArrowType", "minSize": 12, "size": 698},
                {"name": "EdgeRenderer", "minSize": 12, "size": 5569},
                {"name": "IRenderer", "minSize": 12, "size": 353},
                {"name": "ShapeRenderer", "minSize": 12, "size": 2247}
              ]
            },
            {"name": "ScaleBinding", "minSize": 12, "size": 11275},
            {"name": "Tree", "minSize": 12, "size": 7147},
            {"name": "TreeBuilder", "minSize": 12, "size": 9930}
          ]
        },
        {
          "name": "events",
          "children": [
            {"name": "DataEvent", "minSize": 12, "size": 2313},
            {"name": "SelectionEvent", "minSize": 12, "size": 1880},
            {"name": "TooltipEvent", "minSize": 12, "size": 1701},
            {"name": "VisualizationEvent", "minSize": 12, "size": 1117}
          ]
        },
        {
          "name": "legend",
          "children": [
            {"name": "Legend", "minSize": 12, "size": 20859},
            {"name": "LegendItem", "minSize": 12, "size": 4614},
            {"name": "LegendRange", "minSize": 12, "size": 10530}
          ]
        },
        {
          "name": "operator",
          "children": [
            {
              "name": "distortion",
              "children": [
                {"name": "BifocalDistortion", "minSize": 12, "size": 4461},
                {"name": "Distortion", "minSize": 12, "size": 6314},
                {"name": "FisheyeDistortion", "minSize": 12, "size": 3444}
              ]
            },
            {
              "name": "encoder",
              "children": [
                {"name": "ColorEncoder", "minSize": 12, "size": 3179},
                {"name": "Encoder", "minSize": 12, "size": 4060},
                {"name": "PropertyEncoder", "minSize": 12, "size": 4138},
                {"name": "ShapeEncoder", "minSize": 12, "size": 1690},
                {"name": "SizeEncoder", "minSize": 12, "size": 1830}
              ]
            },
            {
              "name": "filter",
              "children": [
                {"name": "FisheyeTreeFilter", "minSize": 12, "size": 5219},
                {"name": "GraphDistanceFilter", "minSize": 12, "size": 3165},
                {"name": "VisibilityFilter", "minSize": 12, "size": 3509}
              ]
            },
            {"name": "IOperator", "minSize": 12, "size": 1286},
            {
              "name": "label",
              "children": [
                {"name": "Labeler", "minSize": 12, "size": 9956},
                {"name": "RadialLabeler", "minSize": 12, "size": 3899},
                {"name": "StackedAreaLabeler", "minSize": 12, "size": 3202}
              ]
            },
            {
              "name": "layout",
              "children": [
                {"name": "AxisLayout", "minSize": 12, "size": 6725},
                {"name": "BundledEdgeRouter", "minSize": 12, "size": 3727},
                {"name": "CircleLayout", "minSize": 12, "size": 9317},
                {"name": "CirclePackingLayout", "minSize": 12, "size": 12003},
                {"name": "DendrogramLayout", "minSize": 12, "size": 4853},
                {"name": "ForceDirectedLayout", "minSize": 12, "size": 8411},
                {"name": "IcicleTreeLayout", "minSize": 12, "size": 4864},
                {"name": "IndentedTreeLayout", "minSize": 12, "size": 3174},
                {"name": "Layout", "minSize": 12, "size": 7881},
                {"name": "NodeLinkTreeLayout", "minSize": 12, "size": 12870},
                {"name": "PieLayout", "minSize": 12, "size": 2728},
                {"name": "RadialTreeLayout", "minSize": 12, "size": 12348},
                {"name": "RandomLayout", "minSize": 12, "size": 870},
                {"name": "StackedAreaLayout", "minSize": 12, "size": 9121},
                {"name": "TreeMapLayout", "minSize": 12, "size": 9191}
              ]
            },
            {"name": "Operator", "minSize": 12, "size": 2490},
            {"name": "OperatorList", "minSize": 12, "size": 5248},
            {"name": "OperatorSequence", "minSize": 12, "size": 4190},
            {"name": "OperatorSwitch", "minSize": 12, "size": 2581},
            {"name": "SortOperator", "minSize": 12, "size": 2023}
          ]
        },
        {"name": "Visualization", "minSize": 12, "size": 16540}
      ]
    }
  ]
}