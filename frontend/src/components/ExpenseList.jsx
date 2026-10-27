import React, { useState } from 'react';
import { 
  Edit3, 
  Trash2, 
  Search, 
  Filter, 
  Utensils, 
  Plane, 
  Receipt, 
  ShoppingBag, 
  MoreHorizontal,
  Calendar,
  Layers,
  Inbox
} from 'lucide-react';

const categoryMeta = {
  Food: { icon: Utensils, badgeClass: 'badge-food' },
  Travel: { icon: Plane, badgeClass: 'badge-travel' },
  Bills: { icon: Receipt, badgeClass: 'badge-bills' },
  Shopping: { icon: ShoppingBag, badgeClass: 'badge-shopping' },
  Other: { icon: MoreHorizontal, badgeClass: 'badge-other' }
};

const formatDate = (dateString) => {
  if (!dateString) return '-';
  const d = new Date(dateString);
  return d.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  });
};

const formatCurrency = (val) => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2
  }).format(val || 0);
};

const ExpenseList = ({ 
  expenses = [], 
  loading = false, 
  onEdit, 
  onOpenDeleteModal,
  selectedCategory,
  onSelectCategory,
  searchTerm,
  onSearchChange
}) => {
  const categories = ['All', 'Food', 'Travel', 'Bills', 'Shopping', 'Other'];

  return (
    <div className="card list-card">
      {/* List Header with Search & Filter */}
      <div className="list-card-header">
        <div className="header-title-group">
          <div className="form-header-badge badge-info">
            <Layers size={18} />
          </div>
          <div>
            <h2>Expense Directory</h2>
            <p className="form-subtext">Manage, filter, edit and delete recorded transactions</p>
          </div>
        </div>

        {/* Search & Category Filter Controls */}
        <div className="list-controls">
          <div className="search-box">
            <Search size={15} className="search-icon" />
            <input
              type="text"
              placeholder="Search expenses by title..."
              value={searchTerm}
              onChange={(e) => onSearchChange(e.target.value)}
              className="search-input"
            />
          </div>
        </div>
      </div>

      {/* Category Pills Bar */}
      <div className="category-filter-bar">
        {categories.map((cat) => (
          <button
            key={cat}
            type="button"
            className={`filter-pill ${selectedCategory === cat ? 'active' : ''}`}
            onClick={() => onSelectCategory(cat)}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Content Area */}
      {loading ? (
        <div className="loading-state">
          <div className="spinner"></div>
          <p>Syncing expenses with MongoDB Atlas...</p>
        </div>
      ) : expenses.length === 0 ? (
        <div className="empty-state">
          <div className="empty-icon-wrapper">
            <Inbox size={42} className="empty-icon" />
          </div>
          <h3>No Expenses Found</h3>
          <p>
            {searchTerm || selectedCategory !== 'All'
              ? 'No transactions matched your search or category filter. Try clearing filters.'
              : 'Your expense list is empty. Use the form above to add your first expense!'}
          </p>
        </div>
      ) : (
        <>
          {/* Desktop Table View */}
          <div className="table-responsive desktop-view">
            <table className="expense-table">
              <thead>
                <tr>
                  <th>Title</th>
                  <th>Category</th>
                  <th>Date</th>
                  <th>Amount</th>
                  <th className="text-right">Actions</th>
                </tr>
              </thead>
              <tbody>
                {expenses.map((expense) => {
                  const meta = categoryMeta[expense.category] || categoryMeta.Other;
                  const Icon = meta.icon;

                  return (
                    <tr key={expense._id} className="expense-row">
                      <td className="expense-title-cell">
                        <span className="title-text">{expense.title}</span>
                      </td>
                      <td>
                        <span className={`category-badge ${meta.badgeClass}`}>
                          <Icon size={13} />
                          {expense.category}
                        </span>
                      </td>
                      <td className="date-cell">
                        <span className="date-text">
                          <Calendar size={13} className="inline-icon" />
                          {formatDate(expense.date)}
                        </span>
                      </td>
                      <td className="amount-cell">
                        <span className="amount-text">{formatCurrency(expense.amount)}</span>
                      </td>
                      <td className="actions-cell text-right">
                        <button
                          type="button"
                          className="btn-action btn-edit"
                          onClick={() => onEdit(expense)}
                          title="Edit this expense"
                        >
                          <Edit3 size={15} /> Edit
                        </button>
                        <button
                          type="button"
                          className="btn-action btn-delete"
                          onClick={() => onOpenDeleteModal(expense)}
                          title="Delete this expense"
                        >
                          <Trash2 size={15} /> Delete
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          {/* Mobile Card View */}
          <div className="mobile-view mobile-cards-stack">
            {expenses.map((expense) => {
              const meta = categoryMeta[expense.category] || categoryMeta.Other;
              const Icon = meta.icon;

              return (
                <div key={expense._id} className="mobile-expense-card">
                  <div className="mobile-card-top">
                    <div>
                      <h4 className="mobile-title">{expense.title}</h4>
                      <span className="mobile-date">
                        <Calendar size={12} /> {formatDate(expense.date)}
                      </span>
                    </div>
                    <span className="mobile-amount">
                      {formatCurrency(expense.amount)}
                    </span>
                  </div>

                  <div className="mobile-card-bottom">
                    <span className={`category-badge ${meta.badgeClass}`}>
                      <Icon size={12} />
                      {expense.category}
                    </span>

                    <div className="mobile-actions">
                      <button
                        type="button"
                        className="btn-action btn-edit btn-sm"
                        onClick={() => onEdit(expense)}
                      >
                        <Edit3 size={13} /> Edit
                      </button>
                      <button
                        type="button"
                        className="btn-action btn-delete btn-sm"
                        onClick={() => onOpenDeleteModal(expense)}
                      >
                        <Trash2 size={13} /> Delete
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </>
      )}
    </div>
  );
};

export default ExpenseList;
