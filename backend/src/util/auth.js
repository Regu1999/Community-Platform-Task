import jwt from 'jsonwebtoken';
import bcryptjs from 'bcryptjs';
import { NotAuthError, NotFoundError } from './errors.js';
const { sign, verify } = jwt
const KEY = process.env.SECRET_KEY;
const { compare } = bcryptjs;
import Users from '../model/Users.js';

export function createJSONToken(user) {
  return sign(user, KEY, { expiresIn: '7d' });
}

export function validateJSONToken(token) {
  return verify(token, KEY);
}

export function isValidPassword(password, storedPassword) {
  return compare(password, storedPassword);
}

async function checkAuthMiddleware(req, res, next) {
  if (req.method === 'OPTIONS') {
    return next();
  }
  if (!req.headers.authorization) {
    console.log('NOT AUTH. AUTH HEADER MISSING.');
    return next(new NotAuthError('Not authenticated.'));
  }

  const authFragments = req.headers.authorization.split(' ');

  if (authFragments.length !== 2) {
    console.log('NOT AUTH. AUTH HEADER INVALID.');
    return next(new NotAuthError('Not authenticated.'));
  }
  const authToken = authFragments[1];
  try {
    const validatedToken = validateJSONToken(authToken);
    const user = await Users.findById(validatedToken._id).select({ password: 0 })
    if (!user) {
      throw new Error("User Not Found")
    }
    req.user = user;
  } catch (error) {
    console.log('NOT AUTH. TOKEN INVALID.');
    return next(new NotAuthError('Not authenticated.'));
  }
  next();
}

export const checkAuth = checkAuthMiddleware;

export async function checkRefreshTokenMiddleware(req, res, next) {

  const refreshToken = req.cookies.refreshToken;
  if (!refreshToken) {
    return next()
  }
  try {
    const validatedToken = validateJSONToken(refreshToken);
    const user = await Users.findById(validatedToken._id).select({ password: 0 });
    if (!user) {
      return next(new NotFoundError('User Not Found'));
    }
    req.user = user;

  } catch (error) {
    console.log('NOT AUTH. TOKEN INVALID.');
    return next(new NotAuthError('Not authenticated.'));
  }

  next()
}