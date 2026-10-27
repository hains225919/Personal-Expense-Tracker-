const mongoose = require('mongoose');

const expenseSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, 'Please provide an expense title'],
      trim: true,
      minlength: [2, 'Title must be at least 2 characters long'],
      maxlength: [100, 'Title cannot exceed 100 characters']
    },
    amount: {
      type: Number,
      required: [true, 'Please provide an expense amount'],
      min: [0.01, 'Amount must be greater than zero']
    },
    category: {
      type: String,
      required: [true, 'Please select an expense category'],
      enum: {
        values: ['Food', 'Travel', 'Bills', 'Shopping', 'Other'],
        message: '{VALUE} is not a valid category'
      },
      default: 'Other'
    },
    date: {
      type: Date,
      required: [true, 'Please provide a valid date'],
      default: Date.now
    }
  },
  {
    timestamps: true,
    versionKey: false
  }
);

// Index on date descending for fast list retrieval
expenseSchema.index({ date: -1 });

module.exports = mongoose.model('Expense', expenseSchema);
