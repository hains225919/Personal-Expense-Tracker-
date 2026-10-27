import React from 'react';
import { Wallet, TrendingDown, ShieldCheck } from 'lucide-react';

const Navbar = ({ totalExpenses = 0 }) => {
  return (
    <header className="navbar">
      <div className="navbar-container">
        <div className="brand">
          <div className="brand-icon">
            <Wallet className="icon-main" />
          </div>
          <div className="brand-text">
            <h1>ExpenseTracker<span className="brand-dot">.</span></h1>
            <p className="brand-tagline">Personal Finance Management</p>
          </div>
        </div>

        <div className="navbar-actions">
          <div className="badge live-badge">
            <span className="pulse-dot"></span>
            MongoDB Atlas Connected
          </div>
          <div className="badge total-badge">
            <TrendingDown size={14} className="icon-down" />
            <span>{totalExpenses} {totalExpenses === 1 ? 'Record' : 'Records'}</span>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
