import mongoose from "mongoose";

const notificationSchema = new mongoose.Schema(
  {
    topic: {
      type: String,
      required: true,
      trim: true,
      maxLength: 50,
    },
   
    date: {
      type: Date,
      required: true,
      trim: true,
    },
    income: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Income',
    },
    expense: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Expense',
    },
    userId: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

export const NotificationModel = mongoose.model("Notification", notificationSchema);

export const getIncomeNotifications = (id: string) => NotificationModel.find({userId: id}).populate({
  path: 'income',
  select: '-expense', // Exclude the 'expense' field
  model: 'Income',
});


export const getExpenseNotifications = (id: string) => NotificationModel.find({userId: id}).populate({
  path: 'expense',
  select: '-income', // Exclude the 'income' field
  model: 'Expense',
});

export const createNotification = (values: Record<string, any>) =>
  new NotificationModel(values).save().then((notification) => notification.toObject());