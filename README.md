# react-d3-zoomable-sunburst
react-d3-zoomable-sunburst component has few awesome features over https://www.npmjs.com/package/react-zoomable-sunburst-d3-v4. 
1) Now component rerenders when there is a change in the props.
2) We can also change the value which we need to use for calculations by passing value as a prop.
3) Sunburst component is developed using a functional component and hooks. 

### Installation

```bash
npm i react-d3-zoomable-sunburst
```
### Example

1) git clone https://github.com/Nikhilkoneru/react-d3-zoomable-sunburst
2) cd example
3) npm run start

### Labels

You can display labels directly on the sunburst arcs by passing a `labelFunc` prop. Labels are only shown on arcs large enough to fit text.

```jsx
<Sunburst
    data={data}
    value="size"
    width={600}
    height={600}
    keyId="sunburst"
    labelFunc={(d) => d.data.name}
    labelSize="11px"
/>
```

| Prop | Type | Description |
|------|------|-------------|
| `labelFunc` | `function` | A function receiving a D3 hierarchy node and returning the label string. When provided, labels are rendered on the arcs. |
| `labelSize` | `string` | Font size for labels (default: `'10px'`). |
