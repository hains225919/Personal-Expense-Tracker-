import React from 'react';
import { 
  DollarSign, 
  Utensils, 
  Plane, 
  Receipt, 
  ShoppingBag, 
  MoreHorizontal,
  PieChart,
  Hash
} from 'lucide-react';

const categoryMeta = {
  Food: { icon: Utensils, color: 'cat-food', bg: 'bg-food' },
  Travel: { icon: Plane, color: 'cat-travel', bg: 'bg-travel' },
  Bills: { icon: Receipt, color: 'cat-bills', bg: 'bg-bills' },
  Shopping: { icon: ShoppingBag, color: 'cat-shopping', bg: 'bg-shopping' },
  Other: { icon: MoreHorizontal, color: 'cat-other', bg: 'bg-other' }
};

const formatCurrency = (val) => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2
  }).format(val || 0);
};

const ExpenseSummary = ({ expenses = [], summary = null }) => {
  const totalAmount = summary?.totalAmount !== undefined 
    ? summary.totalAmount 
    : expenses.reduce((sum, item) => sum + (Number(item.amount) || 0), 0);

  const totalCount = expenses.length;

  // Calculate category totals
  const categoryTotals = expenses.reduce((acc, curr) => {
    const cat = curr.category || 'Other';
    acc[cat] = (acc[cat] || 0) + (Number(curr.amount) || 0);
    return acc;
  }, { Food: 0, Travel: 0, Bills: 0, Shopping: 0, Other: 0 });

  return (
    <section className="summary-section">
      <div className="summary-grid">
        {/* Main Hero Card: Total Amount Spent */}
        <div className="card total-card">
          <div className="total-card-header">
            <span className="total-label">Total Amount Spent</span>
            <div className="total-icon-wrapper">
              <DollarSign className="total-icon" />
            </div>
          </div>
          <div className="total-amount-display">
            {formatCurrency(totalAmount)}
          </div>
          <div className="total-card-footer">
            <span className="count-pill">
              <Hash size={13} /> {totalCount} Total {totalCount === 1 ? 'Transaction' : 'Transactions'}
            </span>
            <span className="live-sync-pill">⚡ Auto-calculated</span>
          </div>
        </div>

        {/* Category Breakdown Cards */}
        <div className="card category-breakdown-card">
          <div className="breakdown-header">
            <h3><PieChart size={16} /> Category Breakdown</h3>
            <span className="subtitle">Real-time spend distribution</span>
          </div>
          <div className="category-chips-grid">
            {Object.keys(categoryMeta).map((catName) => {
              const meta = categoryMeta[catName];
              const Icon = meta.icon;
              const catTotal = categoryTotals[catName] || 0;
              const percentage = totalAmount > 0 ? ((catTotal / totalAmount) * 100).toFixed(0) : 0;

              return (
                <div key={catName} className={`category-stat-pill ${meta.color}`}>
                  <div className="stat-pill-top">
                    <span className="cat-icon-badge">
                      <Icon size={14} />
                    </span>
                    <span className="cat-name">{catName}</span>
                    <span className="cat-percent">{percentage}%</span>
                  </div>
                  <div className="stat-pill-amount">
                    {formatCurrency(catTotal)}
                  </div>
                  <div className="progress-bar-bg">
                    <div 
                      className="progress-bar-fill" 
                      style={{ width: `${percentage}%` }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ExpenseSummary;
