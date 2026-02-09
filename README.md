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

### Props

| Prop | Type | Required | Description |
|------|------|----------|-------------|
| `data` | Object | Yes | Hierarchical data object with `name`, `children`, and a value field |
| `value` | String | Yes | Field name used for size calculations (e.g., `"size"`, `"minSize"`) |
| `width` | Number | Yes | Width of the SVG element. Set this to match your parent container width |
| `height` | Number | Yes | Height of the SVG element. Set this to match your parent container height |
| `keyId` | String | Yes | Unique ID for the container element |
| `tooltip` | Boolean | No | Enable or disable the tooltip |
| `tooltipPosition` | String | No | Tooltip position relative to cursor. Use `"right"` to shift tooltip to the right |
| `tooltipContent` | React Element | No | Custom React element used as the tooltip container |
| `scale` | String | No | Scale type: `"linear"` or `"exponential"` (default: exponential/sqrt) |
| `onSelect` | Function | No | Callback function invoked when a segment is clicked, receives the node data |
| `colorFunc` | Function | No | Custom color function `(d) => color` to control the fill color of each segment. Receives a d3 hierarchy node |

### Customizing Colors

Pass a `colorFunc` prop to control the fill color of each segment:

```jsx
<Sunburst
  data={data}
  value="size"
  width={480}
  height={400}
  keyId="sunburst"
  colorFunc={(d) => {
    // d is a d3 hierarchy node with properties like d.depth, d.data.name, d.value
    if (d.depth === 0) return '#ffffff';
    if (d.depth === 1) return '#3498db';
    return '#2ecc71';
  }}
/>
```

### Setting Width and Height from a Parent Component

The `width` and `height` props control the SVG dimensions. To make the sunburst fill its parent container, measure the parent and pass its dimensions:

```jsx
function ParentComponent() {
  const containerRef = React.useRef();
  const [dimensions, setDimensions] = React.useState({ width: 480, height: 400 });

  React.useEffect(() => {
    if (containerRef.current) {
      setDimensions({
        width: containerRef.current.clientWidth,
        height: containerRef.current.clientHeight,
      });
    }
  }, []);

  return (
    <div ref={containerRef} style={{ width: '100%', height: '100vh' }}>
      <Sunburst
        data={data}
        value="size"
        width={dimensions.width}
        height={dimensions.height}
        keyId="sunburst"
      />
    </div>
  );
}
```
