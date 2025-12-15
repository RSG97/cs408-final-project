const {
    validateEmail,
    validatePassword,
    validateUsername,
    validateTitle,
    validateDescription,
    validateComment
} = require('../utils/validation');

describe('Validation Functions', () => {
    describe('validateEmail', () => {
        test('accepts valid email', () => {
            expect(validateEmail('test@example.com')).toBe(true);
        });

        test('rejects invalid email - no @', () => {
            expect(validateEmail('testexample.com')).toBe(false);
        });

        test('rejects invalid email - no domain', () => {
            expect(validateEmail('test@')).toBe(false);
        });

        test('rejects invalid email - no TLD', () => {
            expect(validateEmail('test@example')).toBe(false);
        });
    });

    describe('validatePassword', () => {
        test('accepts valid password', () => {
            const result = validatePassword('password123');
            expect(result.valid).toBe(true);
            expect(result.message).toBe('');
        });

        test('rejects short password', () => {
            const result = validatePassword('short');
            expect(result.valid).toBe(false);
            expect(result.message).toContain('8 characters');
        });
    });

    describe('validateUsername', () => {
        test('accepts valid username', () => {
            const result = validateUsername('testuser');
            expect(result.valid).toBe(true);
        });

        test('rejects too short username', () => {
            const result = validateUsername('ab');
            expect(result.valid).toBe(false);
            expect(result.message).toContain('3 and 20');
        });

        test('rejects too long username', () => {
            const result = validateUsername('a'.repeat(21));
            expect(result.valid).toBe(false);
            expect(result.message).toContain('3 and 20');
        });
    });

    describe('validateTitle', () => {
        test('accepts valid title', () => {
            const result = validateTitle('Valid Title');
            expect(result.valid).toBe(true);
        });

        test('rejects too short title', () => {
            const result = validateTitle('Hi');
            expect(result.valid).toBe(false);
            expect(result.message).toContain('5 characters');
        });

        test('rejects too long title', () => {
            const result = validateTitle('a'.repeat(101));
            expect(result.valid).toBe(false);
            expect(result.message).toContain('100 characters');
        });

        test('accepts title at minimum length', () => {
            const result = validateTitle('12345');
            expect(result.valid).toBe(true);
        });
    });

    describe('validateDescription', () => {
        test('accepts valid description', () => {
            const result = validateDescription('This is a valid description');
            expect(result.valid).toBe(true);
        });

        test('rejects too short description', () => {
            const result = validateDescription('Short');
            expect(result.valid).toBe(false);
            expect(result.message).toContain('10 characters');
        });

        test('rejects too long description', () => {
            const result = validateDescription('a'.repeat(1001));
            expect(result.valid).toBe(false);
            expect(result.message).toContain('1000 characters');
        });
    });

    describe('validateComment', () => {
        test('accepts valid comment', () => {
            const result = validateComment('This is a valid comment');
            expect(result.valid).toBe(true);
        });

        test('rejects empty comment', () => {
            const result = validateComment('');
            expect(result.valid).toBe(false);
            expect(result.message).toContain('cannot be empty');
        });

        test('rejects too long comment', () => {
            const result = validateComment('a'.repeat(501));
            expect(result.valid).toBe(false);
            expect(result.message).toContain('500 characters');
        });
    });
});