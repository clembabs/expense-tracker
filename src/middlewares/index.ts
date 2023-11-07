import express from "express";
import { get, merge } from "lodash";
import { getUserById, getUserBySessionToken } from "../models/users";
import jwt from "jsonwebtoken";

export const isAuthenticated = async (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) => {
  const authorizationHeader = req.headers["authorization"];
  const accessToken = authorizationHeader && authorizationHeader.split(" ")[1];
  try {
    if (!accessToken) {
      res.status(403);
      throw Error("Access token is invalid or missing");
    }

    const resp = jwt.verify(
      accessToken,
      process.env.JWT_SECRET
    ) as jwt.JwtPayload;
    const user = await getUserById(resp.id);
    if (!user) {
      res.status(403);
      throw Error("Invalid User");
    }
   
    merge(req, { user });
    return next();
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export const isOwner = async (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) => {
  try {
    const { id } = req.params;
  
    const currentUserId = get(req, 'user._id') as string;
    
    if (!currentUserId) {
      res.status(403);
      throw Error("Not Authorized, no token");
    }

   
    if (currentUserId.toString() !== id) {
     
      res.status(403);
      throw Error("Not Authorized");
    }

    next();
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
