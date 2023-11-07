import mongoose from "mongoose";

const IncomeSchema = new mongoose.Schema(
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
      default: "income",
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
    userId: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

export const IncomeModel = mongoose.model("Income", IncomeSchema);

export const getIncomes = (id: string) => IncomeModel.find({userId:id });
export const getIncomeById = (id: string) => IncomeModel.findById(id);
export const createIncome = (values: Record<string, any>) =>
  new IncomeModel(values).save().then((income) => income.toObject());
export const deletIncome = (id: string) =>
  IncomeModel.findOneAndDelete({ _id: id });
export const updateIncomeById = (id: string, values: Record<string, any>) =>
  IncomeModel.findByIdAndUpdate(id, values);
