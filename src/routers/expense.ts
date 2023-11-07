

import { isAuthenticated } from "../middlewares/index";
import express from "express";
import { addExpense, deleteExpense, getAllExpenses, getAllExpensesNotifications, getExpense, updateExpense,  } from "../controllers/expense";


export default (router: express.Router) => {
    router.get('/expenses',isAuthenticated, getAllExpenses);
    router.get('/expense/:id',isAuthenticated,getExpense);
    router.get('/expense/notifications',isAuthenticated,getAllExpensesNotifications);
    router.post('/expense',isAuthenticated,addExpense);
    router.delete('/expense/:id',isAuthenticated,deleteExpense);
    router.patch('/expense/:id',isAuthenticated,updateExpense);
}