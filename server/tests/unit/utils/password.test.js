import { hashPassword, comparePassword } from '../../../src/utils/password.js';

describe('Password Utilities', () => {
  const plaintextPassword = 'SuperSecretPassword123!';

  it('should hash a password', async () => {
    const hash = await hashPassword(plaintextPassword);
    expect(hash).toBeDefined();
    expect(hash).not.toBe(plaintextPassword);
    expect(typeof hash).toBe('string');
  });

  it('should compare and match correct password', async () => {
    const hash = await hashPassword(plaintextPassword);
    const isMatch = await comparePassword(plaintextPassword, hash);
    expect(isMatch).toBe(true);
  });

  it('should fail comparison for wrong password', async () => {
    const hash = await hashPassword(plaintextPassword);
    const isMatch = await comparePassword('WrongPassword123!', hash);
    expect(isMatch).toBe(false);
  });
});
