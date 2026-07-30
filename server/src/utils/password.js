import bcrypt from 'bcrypt';
import config from '../config/env.js';

const SALT_ROUNDS = parseInt(config.bcrypt?.saltRounds || 10, 10);

export const hashPassword = async (password) => {
  const salt = await bcrypt.genSalt(SALT_ROUNDS);
  return bcrypt.hash(password, salt);
};

export const comparePassword = async (password, hashedPassword) => {
  return bcrypt.compare(password, hashedPassword);
};
