import express from "express";
import {
  createExpense,
  deletExpense,
  getExpenseById,
  getExpenses,
  updateExpenseById,
} from "../models/expense";

export const getAllExpenses = async (
  req: express.Request,
  res: express.Response
) => {
  try {
    const users = await getExpenses();
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

    const Expense = createExpense({
      title,
      amount,
      category,
      description,
      date,
    });

    return res
      .status(200)
      .json({ message: "Expense Added", Expense: Expense })
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

    const updatedExpense = updateExpenseById(expense.id, req.body);
    return res
      .status(200)
      .json({ message: "Expense Updated", Expense: updatedExpense })
      .end();
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
