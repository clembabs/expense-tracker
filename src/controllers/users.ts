import express from "express";
import { deleteUserById, getUserById, getUsers } from "../models/users";

export const getAllUsers = async (req: express.Request, res: express.Response) => {
    try {
        const users = await getUsers();
        return res.status(200).json(users);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}

export const getUser = async (req: express.Request, res: express.Response) => {
    try {
        const { id } = req.params;
        const user = await getUserById(id);
       
        if(!user) {
            return res.status(404).json({ message: "User doesn't exist" });
         
        }
        return res.status(200).json(user);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}

export const deleteUser = async (req: express.Request, res: express.Response) => {
    try {
        const { id } = req.params;
        const deletedUser = await deleteUserById(id);
       
        if(!deletedUser) {
            return res.status(404).json({ message: "User doesn't exist" });
        }
        return res.status(200).json(deletedUser);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}

export const updateUser = async (req: express.Request, res: express.Response) => {
    try {
        const { id } = req.params;
        const { username } = req.body;
       
       
        if(!username) {
            return res.status(403).json({ message: "Please add your username" });
         
        }
        const user = await getUserById(id);
        user.username = username;
        await user.save();

        return res.status(200).json(user).end();
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}