import mongoose from "mongoose";

const ExpenseSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
      maxLength: 50,
    },
    amount: {
      type: Number,
      required: true,
      maxLength: 20,
      trim: true,
    },
    type: {
      type: String,
      default: "expense",
    },
    date: {
      type: Date,
      required: true,
      trim: true,
    },
    category: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      required: true,
      maxLength: 20,
      trim: true,
    },
  },
  { timestamps: true }
);

export const ExpenseModel = mongoose.model("Expense", ExpenseSchema);

export const getExpenses = () => ExpenseModel.find();
export const getExpenseById = (id: string) => ExpenseModel.findById(id);
export const createExpense = (values: Record<string, any>) =>
  new ExpenseModel(values).save().then((Expense) => Expense.toObject());
export const deletExpense = (id: string) =>
  ExpenseModel.findOneAndDelete({ _id: id });
export const updateExpenseById = (id: string, values: Record<string, any>) =>
  ExpenseModel.findByIdAndUpdate(id, values);
