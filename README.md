# react-d3-zoomable-sunburst

[![CI](https://github.com/Nikhilkoneru/react-d3-zoomable-sunburst/actions/workflows/ci.yml/badge.svg)](https://github.com/Nikhilkoneru/react-d3-zoomable-sunburst/actions/workflows/ci.yml)
[![npm version](https://img.shields.io/npm/v/react-d3-zoomable-sunburst.svg)](https://www.npmjs.com/package/react-d3-zoomable-sunburst)
[![license](https://img.shields.io/npm/l/react-d3-zoomable-sunburst.svg)](https://github.com/Nikhilkoneru/react-d3-zoomable-sunburst/blob/main/LICENSE)

A zoomable sunburst chart React component powered by D3.js, written in TypeScript.

## Features

- 🔄 Zoomable — click a segment to zoom in, click the centre to zoom out
- 📝 Written in **TypeScript** with full type definitions
- ⚛️ Built for **React 18+** with hooks
- 📊 Powered by **D3 v7**
- 🎨 Customisable colours via `colorFunc` prop or per-node `color` field
- 💬 Built-in tooltip support
- 📦 Ships ESM and CJS bundles

## Installation

```bash
npm install react-d3-zoomable-sunburst
```

**Peer dependencies:** `react >= 18.0.0` and `react-dom >= 18.0.0`

## Quick Start

```tsx
import Sunburst from 'react-d3-zoomable-sunburst';

const data = {
  name: 'root',
  children: [
    { name: 'child1', size: 100 },
    { name: 'child2', size: 200 },
  ],
};

function App() {
  return (
    <Sunburst
      data={data}
      value="size"
      width={480}
      height={400}
      keyId="my-sunburst"
    />
  );
}
```

## Props

| Prop | Type | Required | Description |
|------|------|----------|-------------|
| `data` | `SunburstDataNode \| null` | Yes | Hierarchical data object with `name`, `children`, and a value field |
| `value` | `string` | Yes | Field name used for size calculations (e.g., `"size"`, `"minSize"`) |
| `keyId` | `string` | Yes | Unique ID for the container element |
| `width` | `number` | No | Width of the SVG element (default: `480`) |
| `height` | `number` | No | Height of the SVG element (default: `400`) |
| `tooltip` | `boolean` | No | Enable or disable the tooltip |
| `tooltipPosition` | `string` | No | Tooltip position relative to cursor. Use `"right"` to shift tooltip to the right |
| `tooltipContent` | `React.ReactElement` | No | Custom React element used as the tooltip container |
| `scale` | `'linear' \| 'exponential'` | No | Scale type (default: exponential/sqrt) |
| `onSelect` | `(d: HierarchyRectangularNode<SunburstDataNode>) => void` | No | Callback invoked when a segment is clicked |
| `colorFunc` | `(d: HierarchyRectangularNode<SunburstDataNode>) => string` | No | Custom color function to control the fill color of each segment |

## TypeScript

The package exports full type definitions. You can import the types directly:

```tsx
import Sunburst from 'react-d3-zoomable-sunburst';
import type { SunburstProps, SunburstDataNode } from 'react-d3-zoomable-sunburst';
```

## Custom Segment Colors

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

### Using `colorFunc`

Pass a `colorFunc` prop to control the fill color of each segment programmatically:

```tsx
<Sunburst
  data={data}
  value="size"
  width={480}
  height={400}
  keyId="sunburst"
  colorFunc={(d) => {
    if (d.depth === 0) return '#ffffff';
    if (d.depth === 1) return '#3498db';
    return '#2ecc71';
  }}
/>
```

## Responsive Sizing

The `width` and `height` props control the SVG dimensions. To make the sunburst fill its parent container, measure the parent and pass its dimensions:

```tsx
function ParentComponent() {
  const containerRef = React.useRef<HTMLDivElement>(null);
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

## Development

```bash
# Install dependencies
npm install

# Run tests
npm test

# Type check
npm run typecheck

# Lint
npm run lint

# Build
npm run build
```

## License

MIT
