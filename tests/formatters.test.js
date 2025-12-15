const {
    formatDate,
    getCategoryDisplay,
    getStatusDisplay
} = require('../utils/formatters');

describe('Formatter Functions', () => {
    describe('formatDate', () => {
        test('formats ISO date correctly', () => {
            const isoDate = '2024-12-01T10:30:00Z';
            const result = formatDate(isoDate);
            expect(result).toContain('Dec');
            expect(result).toContain('2024');
        });
    });

    describe('getCategoryDisplay', () => {
        test('returns correct display text for bug', () => {
            expect(getCategoryDisplay('bug')).toBe('Bug');
        });

        test('returns correct display text for feature', () => {
            expect(getCategoryDisplay('feature')).toBe('Feature Request');
        });

        test('returns correct display text for enhancement', () => {
            expect(getCategoryDisplay('enhancement')).toBe('Enhancement');
        });

        test('returns correct display text for ui-ux', () => {
            expect(getCategoryDisplay('ui-ux')).toBe('UI/UX');
        });

        test('returns input for unknown category', () => {
            expect(getCategoryDisplay('unknown')).toBe('unknown');
        });
    });

    describe('getStatusDisplay', () => {
        test('returns correct display text for planned', () => {
            expect(getStatusDisplay('planned')).toBe('Planned');
        });

        test('returns correct display text for in-progress', () => {
            expect(getStatusDisplay('in-progress')).toBe('In Progress');
        });

        test('returns correct display text for completed', () => {
            expect(getStatusDisplay('completed')).toBe('Completed');
        });

        test('returns correct display text for under-review', () => {
            expect(getStatusDisplay('under-review')).toBe('Under Review');
        });

        test('returns input for unknown status', () => {
            expect(getStatusDisplay('unknown')).toBe('unknown');
        });
    });
});