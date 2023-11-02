import express from "express";
import { generateToken, random } from "../helpers";
import { authentication } from "../helpers";
import { createUser, getUserByEmail } from "../models/users";

export const login = async (req: express.Request, res: express.Response) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: "Required Fields are missing" });
    }

    const user = await getUserByEmail(email).select(
      "+authentication.salt +authentication.password"
    );

    if (!user) {
      return res.status(404).json({ message: "User doesn't exist" });
    }

    const expectedHash = authentication(user.authentication.salt, password);

    if (user.authentication.password !== expectedHash) {
      return res.status(403).json({ message: "Password doesn't match" });
    }

    const salt = random();
    user.authentication.sessionToken = authentication(
      salt,
      user._id.toString()
    );
    user.authentication.accessToken = generateToken(user._id.toString());
    await user.save();

    res.cookie(process.env.SESSION_COOKIE, user.authentication.sessionToken, {
      domain: "localhost",
      maxAge: 72 * 60 * 60 * 1000,
      path: "/",
     
      httpOnly: true,
    });
    return res.status(200).json({ message: "Success", user: user }).end();
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const register = async (req: express.Request, res: express.Response) => {
  try {
    const { email, password, username } = req.body;
    if (!email || !password || !username) {
      return res.status(400).json({ message: "Required Fields are missing" });
    }

    const existingUser = await getUserByEmail(email);
    if (!existingUser) {
      return res.status(404).json({ message: "User doesn't exist" });
    }
    const salt = random();

    const user = await createUser({
      email,
      username,
      authentication: {
        salt,
        password: authentication(salt, password),
      },
      salt,
    });
    return res.status(200).json(user).end();
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
