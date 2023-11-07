import { isAuthenticated, isOwner } from "../middlewares/index";
import express from "express";
import { addIncome, deleteIncome, getAllIncomeNotifications, getAllIncomes, getIncome, updateIncome } from "../controllers/income";

export default (router: express.Router) => {
    router.get('/incomes',isAuthenticated, getAllIncomes);
    router.get('/income/:id',isAuthenticated,getIncome);
    router.get('/income/notifications',isAuthenticated,getAllIncomeNotifications);
    router.post('/income',isAuthenticated,addIncome);
    router.delete('/income/:id',isAuthenticated,deleteIncome);
    router.patch('/income/:id',isAuthenticated,updateIncome);
}