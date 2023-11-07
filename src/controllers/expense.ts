import express from "express";
import {
  createExpense,
  deletExpense,
  getExpenseById,
  getExpenses,
  updateExpenseById,
} from "../models/expense";
import {
  createNotification,
  getExpenseNotifications,
} from "../models/notification";
import { getUserId } from "../helpers/index";

export const getAllExpenses = async (
  req: express.Request,
  res: express.Response
) => {
  try {
    const currentUserId = getUserId(req);
    const users = await getExpenses(currentUserId);
    return res.status(200).json(users);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export const getExpense = async (
  req: express.Request,
  res: express.Response
) => {
  try {
    const { id } = req.params;
    const user = await getExpenseById(id);

    if (!user) {
      return res.status(400).json({ message: "Expense does not exist" });
    }
    return res.status(200).json(user);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export const deleteExpense = async (
  req: express.Request,
  res: express.Response
) => {
  try {
    const { id } = req.params;
    const deletedExpense = await deletExpense(id);

    if (!deletedExpense) {
      return res.status(400).json({ message: "Expense does not exist" });
    }
    return res.status(200).json(deletedExpense);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export const addExpense = async (
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
    const expense =await createExpense({
      title,
      amount,
      category,
      description,
      date,
      userId: currentUserId
    });

    if (expense != null) {
       createNotification({
        topic: "You have added an income of " + amount,
        expense,
        date,
        userId: currentUserId,
      });
    }

    return res
      .status(200)
      .json({ message: "Expense Added", expense: expense })
      .end();
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export const updateExpense = async (
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

    const expense = await getExpenseById(id);

    const updatedExpense = await updateExpenseById(expense.id, req.body);
    return res
      .status(200)
      .json({ message: "Expense Updated", Expense: updatedExpense })
      .end();
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export const getAllExpensesNotifications = async (
  req: express.Request,
  res: express.Response
) => {
  try {
    const currentUserId = getUserId(req);
    const expensesNotifications = await getExpenseNotifications(currentUserId);
    return res.status(200).json(expensesNotifications);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
