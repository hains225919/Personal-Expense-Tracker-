const Expense = require('../models/Expense');

// @desc    Get all expenses (with optional category filter & sorting)
// @route   GET /api/expenses
// @access  Public
const getExpenses = async (req, res) => {
  try {
    const { category, search } = req.query;
    const query = {};

    if (category && category !== 'All') {
      query.category = category;
    }

    if (search) {
      query.title = { $regex: search, $options: 'i' };
    }

    const expenses = await Expense.find(query).sort({ date: -1, createdAt: -1 });
    res.status(200).json({
      success: true,
      count: expenses.length,
      data: expenses
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server error retrieving expenses',
      error: error.message
    });
  }
};

// @desc    Get single expense by ID
// @route   GET /api/expenses/:id
// @access  Public
const getExpenseById = async (req, res) => {
  try {
    const expense = await Expense.findById(req.params.id);
    if (!expense) {
      return res.status(404).json({
        success: false,
        message: 'Expense not found'
      });
    }
    res.status(200).json({
      success: true,
      data: expense
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server error retrieving expense',
      error: error.message
    });
  }
};

// @desc    Create new expense
// @route   POST /api/expenses
// @access  Public
const createExpense = async (req, res) => {
  try {
    const { title, amount, category, date } = req.body;

    // Strict validation
    if (!title || !title.trim()) {
      return res.status(400).json({
        success: false,
        message: 'Expense title is required'
      });
    }

    if (amount === undefined || amount === null || isNaN(amount) || Number(amount) <= 0) {
      return res.status(400).json({
        success: false,
        message: 'Expense amount must be a positive number greater than 0'
      });
    }

    if (!category) {
      return res.status(400).json({
        success: false,
        message: 'Expense category is required'
      });
    }

    const newExpense = await Expense.create({
      title: title.trim(),
      amount: Number(amount),
      category,
      date: date ? new Date(date) : new Date()
    });

    res.status(201).json({
      success: true,
      message: 'Expense created successfully',
      data: newExpense
    });
  } catch (error) {
    if (error.name === 'ValidationError') {
      const messages = Object.values(error.errors).map(val => val.message);
      return res.status(400).json({
        success: false,
        message: messages.join(', ')
      });
    }
    res.status(500).json({
      success: false,
      message: 'Server error creating expense',
      error: error.message
    });
  }
};

// @desc    Update existing expense
// @route   PUT /api/expenses/:id
// @access  Public
const updateExpense = async (req, res) => {
  try {
    const { title, amount, category, date } = req.body;

    // Validation for update fields
    if (title !== undefined && (!title || !title.trim())) {
      return res.status(400).json({
        success: false,
        message: 'Expense title cannot be empty'
      });
    }

    if (amount !== undefined && (isNaN(amount) || Number(amount) <= 0)) {
      return res.status(400).json({
        success: false,
        message: 'Expense amount must be greater than zero'
      });
    }

    const updatedData = {};
    if (title !== undefined) updatedData.title = title.trim();
    if (amount !== undefined) updatedData.amount = Number(amount);
    if (category !== undefined) updatedData.category = category;
    if (date !== undefined) updatedData.date = new Date(date);

    const expense = await Expense.findByIdAndUpdate(
      req.params.id,
      updatedData,
      { new: true, runValidators: true }
    );

    if (!expense) {
      return res.status(404).json({
        success: false,
        message: 'Expense not found'
      });
    }

    res.status(200).json({
      success: true,
      message: 'Expense updated successfully',
      data: expense
    });
  } catch (error) {
    if (error.name === 'ValidationError') {
      const messages = Object.values(error.errors).map(val => val.message);
      return res.status(400).json({
        success: false,
        message: messages.join(', ')
      });
    }
    res.status(500).json({
      success: false,
      message: 'Server error updating expense',
      error: error.message
    });
  }
};

// @desc    Delete expense
// @route   DELETE /api/expenses/:id
// @access  Public
const deleteExpense = async (req, res) => {
  try {
    const expense = await Expense.findByIdAndDelete(req.params.id);

    if (!expense) {
      return res.status(404).json({
        success: false,
        message: 'Expense not found'
      });
    }

    res.status(200).json({
      success: true,
      message: 'Expense deleted successfully',
      data: expense
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server error deleting expense',
      error: error.message
    });
  }
};

// @desc    Get summary (total spent, category breakdown)
// @route   GET /api/expenses/summary
// @access  Public
const getSummary = async (req, res) => {
  try {
    const expenses = await Expense.find();
    const totalAmount = expenses.reduce((acc, curr) => acc + curr.amount, 0);

    const categoryBreakdown = expenses.reduce((acc, curr) => {
      acc[curr.category] = (acc[curr.category] || 0) + curr.amount;
      return acc;
    }, {});

    res.status(200).json({
      success: true,
      data: {
        totalAmount: Number(totalAmount.toFixed(2)),
        totalCount: expenses.length,
        categoryBreakdown
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server error calculating summary',
      error: error.message
    });
  }
};

module.exports = {
  getExpenses,
  getExpenseById,
  createExpense,
  updateExpense,
  deleteExpense,
  getSummary
};
