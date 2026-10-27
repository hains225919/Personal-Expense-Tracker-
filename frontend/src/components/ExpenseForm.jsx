import React, { useState, useEffect } from 'react';
import { 
  PlusCircle, 
  CheckCircle2, 
  XCircle, 
  Calendar, 
  Tag, 
  DollarSign, 
  FileText,
  Save,
  RotateCcw
} from 'lucide-react';

const CATEGORIES = ['Food', 'Travel', 'Bills', 'Shopping', 'Other'];

const ExpenseForm = ({ onAddExpense, onUpdateExpense, editingExpense, onCancelEdit }) => {
  const [formData, setFormData] = useState({
    title: '',
    amount: '',
    category: 'Food',
    date: new Date().toISOString().split('T')[0]
  });

  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);

  // When editingExpense changes, pre-fill or reset form
  useEffect(() => {
    if (editingExpense) {
      setFormData({
        title: editingExpense.title || '',
        amount: editingExpense.amount !== undefined ? editingExpense.amount : '',
        category: editingExpense.category || 'Food',
        date: editingExpense.date ? new Date(editingExpense.date).toISOString().split('T')[0] : new Date().toISOString().split('T')[0]
      });
      setErrors({});
    } else {
      setFormData({
        title: '',
        amount: '',
        category: 'Food',
        date: new Date().toISOString().split('T')[0]
      });
      setErrors({});
    }
  }, [editingExpense]);

  const validate = () => {
    const newErrors = {};

    if (!formData.title || !formData.title.trim()) {
      newErrors.title = 'Title is required';
    } else if (formData.title.trim().length < 2) {
      newErrors.title = 'Title must be at least 2 characters';
    }

    if (formData.amount === '' || formData.amount === null || formData.amount === undefined) {
      newErrors.amount = 'Amount is required';
    } else if (isNaN(formData.amount) || Number(formData.amount) <= 0) {
      newErrors.amount = 'Amount must be a positive number greater than 0';
    }

    if (!formData.category) {
      newErrors.category = 'Please select a category';
    }

    if (!formData.date) {
      newErrors.date = 'Date is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value
    }));

    // Clear specific error on change
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: null }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    setSubmitting(true);
    try {
      const payload = {
        title: formData.title.trim(),
        amount: parseFloat(formData.amount),
        category: formData.category,
        date: formData.date
      };

      if (editingExpense) {
        await onUpdateExpense(editingExpense._id, payload);
      } else {
        await onAddExpense(payload);
        // Reset form after successful addition
        setFormData({
          title: '',
          amount: '',
          category: 'Food',
          date: new Date().toISOString().split('T')[0]
        });
      }
    } finally {
      setSubmitting(false);
    }
  };

  const isEditing = Boolean(editingExpense);

  return (
    <div className={`card form-card ${isEditing ? 'editing-active' : ''}`}>
      <div className="form-card-header">
        <div className="header-title-group">
          <div className={`form-header-badge ${isEditing ? 'badge-warning' : 'badge-primary'}`}>
            {isEditing ? <Save size={18} /> : <PlusCircle size={18} />}
          </div>
          <div>
            <h2>{isEditing ? 'Edit Expense Record' : 'Add New Expense'}</h2>
            <p className="form-subtext">
              {isEditing ? 'Modify the details and click Save to update database' : 'Log a new personal transaction to MongoDB Atlas'}
            </p>
          </div>
        </div>

        {isEditing && (
          <button 
            type="button" 
            className="btn btn-secondary btn-sm"
            onClick={onCancelEdit}
            title="Cancel editing"
          >
            <RotateCcw size={14} /> Cancel
          </button>
        )}
      </div>

      <form onSubmit={handleSubmit} noValidate className="expense-form">
        <div className="form-grid">
          {/* Title Field */}
          <div className="form-group">
            <label htmlFor="title">
              <FileText size={14} className="field-icon" /> Expense Title <span className="req">*</span>
            </label>
            <input
              id="title"
              type="text"
              name="title"
              placeholder="e.g. Lunch with friends, Electricity Bill"
              value={formData.title}
              onChange={handleChange}
              className={`form-input ${errors.title ? 'input-error' : ''}`}
            />
            {errors.title && <span className="error-text">{errors.title}</span>}
          </div>

          {/* Amount Field */}
          <div className="form-group">
            <label htmlFor="amount">
              <DollarSign size={14} className="field-icon" /> Amount ($) <span className="req">*</span>
            </label>
            <input
              id="amount"
              type="number"
              step="0.01"
              min="0.01"
              name="amount"
              placeholder="0.00"
              value={formData.amount}
              onChange={handleChange}
              className={`form-input ${errors.amount ? 'input-error' : ''}`}
            />
            {errors.amount && <span className="error-text">{errors.amount}</span>}
          </div>

          {/* Category Field */}
          <div className="form-group">
            <label htmlFor="category">
              <Tag size={14} className="field-icon" /> Category <span className="req">*</span>
            </label>
            <select
              id="category"
              name="category"
              value={formData.category}
              onChange={handleChange}
              className={`form-select ${errors.category ? 'input-error' : ''}`}
            >
              {CATEGORIES.map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
            {errors.category && <span className="error-text">{errors.category}</span>}
          </div>

          {/* Date Field */}
          <div className="form-group">
            <label htmlFor="date">
              <Calendar size={14} className="field-icon" /> Date <span className="req">*</span>
            </label>
            <input
              id="date"
              type="date"
              name="date"
              value={formData.date}
              onChange={handleChange}
              className={`form-input ${errors.date ? 'input-error' : ''}`}
            />
            {errors.date && <span className="error-text">{errors.date}</span>}
          </div>
        </div>

        <div className="form-actions">
          {isEditing && (
            <button
              type="button"
              className="btn btn-outline"
              onClick={onCancelEdit}
              disabled={submitting}
            >
              Cancel Edit
            </button>
          )}

          <button
            type="submit"
            className={`btn ${isEditing ? 'btn-warning' : 'btn-primary'} btn-submit`}
            disabled={submitting}
          >
            {submitting ? (
              <span className="spinner-text">Saving to Database...</span>
            ) : isEditing ? (
              <>
                <Save size={16} /> Save Changes
              </>
            ) : (
              <>
                <PlusCircle size={16} /> Add Expense
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
};

export default ExpenseForm;
