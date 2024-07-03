import express from 'express';
import {
  createExpenseController,
  getAllExpensesByCategoryAndUser,
  getAllExpensesByUser,
  getUniqueExpenseCategoriesByUser,
} from '../controllers/expenseController';
import auth from '../middlewares/auth';

const router = express.Router();

router.route('/expenses').post(auth, createExpenseController);

router.route('/expenses').get(auth, getAllExpensesByUser);
router
  .route('/expenses/categories/:userId')
  .get(auth, getUniqueExpenseCategoriesByUser);

router
  .route('/expenses/category/:userId/:category')
  .get(auth, getAllExpensesByCategoryAndUser);

export default router;
