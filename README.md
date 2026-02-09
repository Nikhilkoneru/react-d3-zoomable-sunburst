# react-d3-zoomable-sunburst
react-d3-zoomable-sunburst component has few awesome features over https://www.npmjs.com/package/react-zoomable-sunburst-d3-v4. 
1) Now component rerenders when there is a change in the props.
2) We can also change the value which we need to use for calculations by passing value as a prop.
3) Sunburst component is developed using a functional component and hooks. 

### Installation

```bash
npm i react-d3-zoomable-sunburst
```

### Custom Segment Colors

You can define a `color` property on any node in the data to control the color of that segment:

```json
{
  "name": "analytics",
  "color": "#ff0000",
  "children": [
    { "name": "cluster", "color": "#00ff00", "size": 3938 },
    { "name": "graph", "size": 3534 }
  ]
}
```

When a `color` is specified, that value is used directly. Child nodes without a `color` will derive their color from the parent as usual.

### Example

1) git clone https://github.com/Nikhilkoneru/react-d3-zoomable-sunburst
2) cd example
3) npm run start
