import { isAuthenticated, isOwner } from "../middlewares/index";
import express from "express";
import { addIncome, deleteIncome, getAllIncomes, getIncome, updateIncome } from "../controllers/income";

export default (router: express.Router) => {
    router.get('/incomes',isAuthenticated,isOwner, getAllIncomes);
    router.get('/income/:id',isAuthenticated, isOwner,getIncome);
    router.post('/income',isAuthenticated,addIncome);
    router.delete('/income/:id',isAuthenticated, isOwner,deleteIncome);
    router.patch('/income/:id',isAuthenticated, isOwner,updateIncome);
}