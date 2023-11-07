import crypto from 'crypto';
import jwt from 'jsonwebtoken';
import { get } from "lodash";
import express from "express";


export const random = () => crypto.randomBytes(128).toString('base64');
export const authentication = (salt: string, password: string) => {
    return crypto.createHmac('sha256', [salt, password].join('/')).update(process.env.CRYPTO_SECRET).digest('hex');
}

export const generateToken = (id: string) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });
  };

  export const getUserId = (req: express.Request,) => {
    return get(req, 'user._id') as string;
  };