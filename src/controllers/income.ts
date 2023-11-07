import express from "express";
import {
  createIncome,
  deletIncome,
  getIncomeById,
  getIncomes,
  updateIncomeById,
} from "../models/income";
import { createNotification, getIncomeNotifications } from "../models/notification";
import { getUserId } from "../helpers/index";


export const getAllIncomes = async (
  req: express.Request,
  res: express.Response
) => {
  try {
    const currentUserId = getUserId(req);
    const users = await getIncomes(currentUserId);
    return res.status(200).json(users);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export const getIncome = async (
  req: express.Request,
  res: express.Response
) => {
  try {
    const { id } = req.params;
    const user = await getIncomeById(id);

    if (!user) {
      return res.status(400).json({ message: "Income does not exist" });
    }
    return res.status(200).json(user);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export const deleteIncome = async (
  req: express.Request,
  res: express.Response
) => {
  try {
    const { id } = req.params;
    const deletedIncome = await deletIncome(id);

    if (!deletedIncome) {
      return res.status(400).json({ message: "Income does not exist" });
    }
    return res.status(200).json(deletedIncome);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export const addIncome = async (
  req: express.Request,
  res: express.Response
) => {
  try {
    const { title, amount, category, description, date } = req.body;
    if (!title || !category || !description || !date) {
      return res.status(400).json({ message: "All fields are required!" });
    }
    if (amount <= 0 || typeof amount !== "number") {
      return res
        .status(400)
        .json({ message: "Amount must be a positive number!" });
    }

    const currentUserId = getUserId(req);
  

    const income = await createIncome({
      title,
      amount,
      category,
      description,
      date,
      userId: currentUserId,
    });

    if (income != null) {
      await createNotification({
        topic: 'You have added an income of ' + amount,
        income,
        date,
        userId: currentUserId,
      })
    }

    return res
      .status(200)
      .json({ message: "Income Added", income: income })
      .end();
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export const updateIncome = async (
  req: express.Request,
  res: express.Response
) => {
  try {
    const { id } = req.params;
    const { title, amount, category, description, date } = req.body;
    if (!title || !category || !description || !date) {
      return res.status(400).json({ message: "All fields are required!" });
    }
    if (amount <= 0 || typeof amount !== "number") {
      return res
        .status(400)
        .json({ message: "Amount must be a positive number!" });
    }

    const income = await getIncomeById(id);

    const updatedIncome = updateIncomeById(income.id, req.body);
    return res
      .status(200)
      .json({ message: "Income Updated", income: updatedIncome })
      .end();
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export const getAllIncomeNotifications = async (
  req: express.Request,
  res: express.Response
) => {
  try {
    const currentUserId = getUserId(req);
    const incomeNotifications = await getIncomeNotifications(currentUserId);
    return res.status(200).json(incomeNotifications);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};


