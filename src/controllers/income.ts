import express from "express";
import {
  createIncome,
  deletIncome,
  getIncomeById,
  getIncomes,
  updateIncomeById,
} from "../models/income";

export const getAllIncomes = async (
  req: express.Request,
  res: express.Response
) => {
  try {
    const users = await getIncomes();
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

    const income = createIncome({
      title,
      amount,
      category,
      description,
      date,
    });

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
