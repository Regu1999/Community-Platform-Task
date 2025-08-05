import { validationResult } from "express-validator"
import bcryptjs from 'bcryptjs';

import { createJSONToken, isValidPassword } from '../util/auth.js';
import Users from '../model/Users.js';

const { hash } = bcryptjs;

export const signUp = async (req, res, next) => {
  const errorResult = validationResult(req)
  const { name, email, password, bio } = req.body;

  try {
    if (!errorResult.isEmpty()) {
      console.log(errorResult.array());
      const error = new Error("User signup failed due to validation errors.");
      error.status = 422;
      error.info = errorResult.array();
      throw error
    }
    const generatedPwd = await hash(password, 12)
    const createdUser = await Users({ name, email, password: generatedPwd, bio });
    await createdUser.save();
    const getUser = await Users.findOne({ email: email }).select({ name: 1 })
    const refreshToken = createJSONToken({ _id: getUser._id });
    const token = createJSONToken({ _id: getUser._id.toString(), name: getUser.name });
    res.cookie('refreshToken', refreshToken, {
      maxAge: 7 * 24 * 60 * 60 * 1000,
      httpOnly: true,
      sameSite: "None",
      secure: true
    })
    res.status(201).json({ message: 'User created.', token, name: getUser.name });
  } catch (error) {
    next(error);
  }
};

export const login = async (req, res, next) => {
  const errorResult = validationResult(req);
  const { email, password } = req.body;
  let user;
  try {
    if (!errorResult.isEmpty()) {
      const error = new Error("User Login failed due to validation errors.");
      error.status = 422;
      error.info = errorResult.array();
      throw error
    }

    user = await Users.findOne({ email });
    if (!user) {
      const error = new Error("Invalid email or password");
      error.status = 404;
      throw error
    }
    const pwIsValid = await isValidPassword(password, user.password);
    if (!pwIsValid) {
      const error = new Error("Invalid email or password");
      error.status = 422;
      throw error;
    }

    const refreshToken = createJSONToken({ _id: user._id });
    const token = createJSONToken({ _id: user._id, name: user.name });
    res.cookie('refreshToken', refreshToken, {
      maxAge: 7 * 24 * 60 * 60 * 1000,
      httpOnly: true,
      sameSite: "None",
      secure: true
    })
    res.status(200).json({ token, name: user.name });
  } catch (error) {
    next(error)
  }

};

export const autoLogin = async (req, res, next) => {
  const user = req?.user;

  try {
    if (!user) {
      return res.json({ token: false });
    }
    const token = createJSONToken({ _id: user._id, name: user.name });

    res.status(200).json({ token })
  } catch (error) {
    const err = new Error("No Token Found");
    err.status = 401
    next(err);
  }
}

export const getProfile = async (req, res, next) => {
  const user = req.user;
  try {
    if (!user) {
      const error = new Error("Not authondicated Please Login!");
      error.statusCode = 401;
      throw error;
    }
    res.status(200).json(user)

  } catch (error) {
    next(error)
  }

}

export const logout = async (req, res, next) => {
  try {
    res.clearCookie("refreshToken", {
      httpOnly: true,
      sameSite: "None",
      secure: true,
      path: '/'
    })
    res.status(200).json({ message: "You have successfully logged out" })
  } catch (error) {
    next(error)
  }
}