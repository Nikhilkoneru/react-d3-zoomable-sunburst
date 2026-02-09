import { describe, it, expect } from 'vitest';
import { formatNameTooltip } from '../utils';

describe('utils', () => {
    describe('formatNameTooltip', () => {
        it('formats a node with name and value', () => {
            const node = { data: { name: 'test' }, value: 1234 };
            const result = formatNameTooltip(node);
            expect(result).toBe('test<br> (1,234)');
        });

        it('formats a node with small value', () => {
            const node = { data: { name: 'leaf' }, value: 5 };
            const result = formatNameTooltip(node);
            expect(result).toBe('leaf<br> (5)');
        });

        it('formats a node with large value', () => {
            const node = { data: { name: 'big' }, value: 1234567 };
            const result = formatNameTooltip(node);
            expect(result).toBe('big<br> (1,234,567)');
        });
    });
});
