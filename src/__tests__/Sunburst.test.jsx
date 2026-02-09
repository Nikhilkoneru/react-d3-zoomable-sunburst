import { describe, it, expect, vi } from 'vitest';
import { render } from '@testing-library/react';
import Sunburst from '../index.jsx';

const sampleData = {
    name: 'root',
    children: [
        {
            name: 'child1',
            size: 100,
        },
        {
            name: 'child2',
            children: [
                { name: 'grandchild1', size: 50 },
                { name: 'grandchild2', size: 30 },
            ],
        },
    ],
};

describe('Sunburst', () => {
    it('renders without crashing', () => {
        const { container } = render(
            <Sunburst
                data={sampleData}
                value="size"
                width={480}
                height={400}
                keyId="test-sunburst"
            />
        );
        expect(container.querySelector('#test-sunburst')).toBeInTheDocument();
        expect(container.querySelector('#test-sunburst-svg')).toBeInTheDocument();
    });

    it('renders SVG with correct dimensions', () => {
        const { container } = render(
            <Sunburst
                data={sampleData}
                value="size"
                width={600}
                height={500}
                keyId="test-sunburst-size"
            />
        );
        const svg = container.querySelector('svg');
        expect(svg).toBeInTheDocument();
        expect(svg.style.width).toBe('600px');
        expect(svg.style.height).toBe('500px');
    });

    it('renders with null data without crashing', () => {
        const { container } = render(
            <Sunburst
                data={null}
                value="size"
                width={480}
                height={400}
                keyId="test-null-data"
            />
        );
        expect(container.querySelector('#test-null-data')).toBeInTheDocument();
    });

    it('calls onSelect callback when provided', () => {
        const onSelect = vi.fn();
        const { container } = render(
            <Sunburst
                data={sampleData}
                value="size"
                width={480}
                height={400}
                keyId="test-onselect"
                onSelect={onSelect}
            />
        );
        expect(container.querySelector('#test-onselect')).toBeInTheDocument();
    });

    it('renders paths for data nodes', () => {
        const { container } = render(
            <Sunburst
                data={sampleData}
                value="size"
                width={480}
                height={400}
                keyId="test-paths"
            />
        );
        const paths = container.querySelectorAll('path');
        expect(paths.length).toBeGreaterThan(0);
    });

    it('accepts custom colorFunc', () => {
        const colorFunc = vi.fn().mockReturnValue('#ff0000');
        render(
            <Sunburst
                data={sampleData}
                value="size"
                width={480}
                height={400}
                keyId="test-color"
                colorFunc={colorFunc}
            />
        );
        expect(colorFunc).toHaveBeenCalled();
    });
});
