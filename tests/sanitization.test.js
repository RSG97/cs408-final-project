const {
    sanitizeUsername,
    sanitizeEmail,
    sanitizeText,
    sanitizeComment
} = require('../utils/sanitization');

describe('Sanitization Functions', () => {
    describe('sanitizeUsername', () => {
        test('removes HTML tags', () => {
            const input = '<script>alert("xss")</script>testuser';
            const result = sanitizeUsername(input);
            expect(result).not.toContain('<script>');
            expect(result).toBe('scriptalertxssscripttestuser');
        });

        test('removes special characters', () => {
            const input = 'test@user#123!';
            const result = sanitizeUsername(input);
            expect(result).toBe('testuser123');
        });

        test('trims whitespace', () => {
            const input = '  testuser  ';
            const result = sanitizeUsername(input);
            expect(result).toBe('testuser');
        });

        test('allows underscores and hyphens', () => {
            const input = 'test_user-123';
            const result = sanitizeUsername(input);
            expect(result).toBe('test_user-123');
        });
    });

    describe('sanitizeEmail', () => {
        test('converts to lowercase', () => {
            const input = 'Test@Example.COM';
            const result = sanitizeEmail(input);
            expect(result).toBe('test@example.com');
        });

        test('trims whitespace', () => {
            const input = '  test@example.com  ';
            const result = sanitizeEmail(input);
            expect(result).toBe('test@example.com');
        });

        test('removes HTML tags', () => {
            const input = '<script>test@example.com</script>';
            const result = sanitizeEmail(input);
            expect(result).not.toContain('<script>');
        });
    });

    describe('sanitizeText', () => {
        test('removes HTML tags', () => {
            const input = '<script>alert("xss")</script>Hello World';
            const result = sanitizeText(input);
            expect(result).not.toContain('<script>');
        });

        test('trims whitespace', () => {
            const input = '   Hello World   ';
            const result = sanitizeText(input);
            expect(result).toBe('Hello World');
        });

        test('handles empty string', () => {
            const input = '';
            const result = sanitizeText(input);
            expect(result).toBe('');
        });
    });

    describe('sanitizeComment', () => {
        test('removes HTML tags', () => {
            const input = '<script>alert("xss")</script>This is a comment';
            const result = sanitizeComment(input);
            expect(result).not.toContain('<script>');
        });

        test('trims whitespace', () => {
            const input = '   This is a comment   ';
            const result = sanitizeComment(input);
            expect(result).toBe('This is a comment');
        });
    });
});