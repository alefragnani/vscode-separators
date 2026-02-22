import * as assert from 'assert';
import { findPreviousSeparatorLine, findNextSeparatorLine } from '../../navigation';

suite('Navigation Test Suite', () => {

    // ── findPreviousSeparatorLine ────────────────────────────────────────────

    test('returns the nearest separator strictly above the current line', () => {
        const result = findPreviousSeparatorLine([2, 5, 10], 8, 0);
        assert.strictEqual(result, 5);
    });

    test('returns the closest of multiple separators above when unsorted input', () => {
        const result = findPreviousSeparatorLine([10, 2, 5], 8, 0);
        assert.strictEqual(result, 5);
    });

    test('does not return a separator on the same line as the cursor', () => {
        const result = findPreviousSeparatorLine([2, 5, 8], 8, 0);
        assert.strictEqual(result, 5);
    });

    test('returns the fallback line when no separator is above the cursor', () => {
        const result = findPreviousSeparatorLine([10, 15], 5, 0);
        assert.strictEqual(result, 0);
    });

    test('returns the fallback line when separator list is empty', () => {
        const result = findPreviousSeparatorLine([], 5, 0);
        assert.strictEqual(result, 0);
    });

    test('returns a custom fallback when no separator is above', () => {
        const result = findPreviousSeparatorLine([20, 30], 10, 99);
        assert.strictEqual(result, 99);
    });

    test('handles a single separator above the cursor', () => {
        const result = findPreviousSeparatorLine([3], 10, 0);
        assert.strictEqual(result, 3);
    });

    test('handles cursor at line 0 with no separator above', () => {
        const result = findPreviousSeparatorLine([5, 10], 0, 0);
        assert.strictEqual(result, 0);
    });

    // ── findNextSeparatorLine ────────────────────────────────────────────────

    test('returns the nearest separator strictly below the current line', () => {
        const result = findNextSeparatorLine([2, 5, 10], 6, 99);
        assert.strictEqual(result, 10);
    });

    test('returns the closest of multiple separators below when unsorted input', () => {
        const result = findNextSeparatorLine([10, 2, 5], 3, 99);
        assert.strictEqual(result, 5);
    });

    test('does not return a separator on the same line as the cursor', () => {
        const result = findNextSeparatorLine([2, 5, 8], 5, 99);
        assert.strictEqual(result, 8);
    });

    test('returns the fallback line when no separator is below the cursor', () => {
        const result = findNextSeparatorLine([2, 5], 10, 99);
        assert.strictEqual(result, 99);
    });

    test('returns the fallback line when separator list is empty', () => {
        const result = findNextSeparatorLine([], 5, 99);
        assert.strictEqual(result, 99);
    });

    test('returns a custom fallback when no separator is below', () => {
        const result = findNextSeparatorLine([1, 2], 10, 42);
        assert.strictEqual(result, 42);
    });

    test('handles a single separator below the cursor', () => {
        const result = findNextSeparatorLine([15], 10, 99);
        assert.strictEqual(result, 15);
    });

    test('handles cursor at last line with no separator below', () => {
        const result = findNextSeparatorLine([2, 5], 20, 20);
        assert.strictEqual(result, 20);
    });
});
