

import { isAuthenticated, isOwner } from "../middlewares/index";
import express from "express";
import { addExpense, deleteExpense, getAllExpenses, getExpense, updateExpense,  } from "../controllers/expense";


export default (router: express.Router) => {
    router.get('/expenses',isAuthenticated,isOwner, getAllExpenses);
    router.get('/expense/:id',isAuthenticated, isOwner,getExpense);
    router.post('/expense',isAuthenticated,addExpense);
    router.delete('/expense/:id',isAuthenticated, isOwner,deleteExpense);
    router.patch('/expense/:id',isAuthenticated, isOwner,updateExpense);
}