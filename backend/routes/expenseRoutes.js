const express = require('express');
const router = express.Router();
const {
  getExpenses,
  getExpenseById,
  createExpense,
  updateExpense,
  deleteExpense,
  getSummary
} = require('../controllers/expenseController');

router.route('/')
  .get(getExpenses)
  .post(createExpense);

router.route('/summary')
  .get(getSummary);

router.route('/:id')
  .get(getExpenseById)
  .put(updateExpense)
  .delete(deleteExpense);

module.exports = router;
