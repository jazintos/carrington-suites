import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

export const hashPassword = async (password: string) => {
  return await bcrypt.hash(password, 10);
};

export const comparePassword = async (input: string, hash: string) => {
  return await bcrypt.compare(input, hash);
};

export const generateToken = (id: string) => {
  return jwt.sign(
    { id },
    process.env.JWT_SECRET!,
    { expiresIn: '7d' }
  );
};