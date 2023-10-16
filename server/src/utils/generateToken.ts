import jwt from 'jsonwebtoken';
import * as dotenv from 'dotenv';
dotenv.config();

export const generateToken = (res: any, id: string) => {
  if (process.env.JWT_SECRET) {
    const token = jwt.sign({ userId: id }, process.env.JWT_SECRET, {
      expiresIn: '30d',
    });

    res.cookie('jwt', token, {
      httpOnly: true,
      secure: true,
      sameSite: 'none',
      maxAge: 30 * 24 * 60 * 60 * 1000,
    });
  }
};
