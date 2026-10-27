import React, { useState, useEffect, useCallback } from 'react';
import Navbar from './components/Navbar';
import ExpenseSummary from './components/ExpenseSummary';
import ExpenseForm from './components/ExpenseForm';
import ExpenseList from './components/ExpenseList';
import DeleteModal from './components/DeleteModal';
import Notification from './components/Notification';
import { 
  getExpenses, 
  createExpense, 
  updateExpense, 
  deleteExpense,
  getSummary 
} from './services/api';

function App() {
  const [expenses, setExpenses] = useState([]);
  const [summary, setSummary] = useState(null);
  const [loading, setLoading] = useState(true);
  const [editingExpense, setEditingExpense] = useState(null);
  const [deletingExpense, setDeletingExpense] = useState(null);
  const [isDeleting, setIsDeleting] = useState(false);
  const [notification, setNotification] = useState(null);

  // Filter & Search states
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchTerm, setSearchTerm] = useState('');

  // Fetch all expenses and summary from API
  const loadData = useCallback(async () => {
    try {
      setLoading(true);
      const [expensesRes, summaryRes] = await Promise.all([
        getExpenses(),
        getSummary()
      ]);

      if (expensesRes.success) {
        setExpenses(expensesRes.data || []);
      }
      if (summaryRes.success) {
        setSummary(summaryRes.data || null);
      }
    } catch (err) {
      console.error('Error fetching data:', err);
      setNotification({
        type: 'error',
        message: err.response?.data?.message || 'Could not connect to backend server. Make sure backend is running.'
      });
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadData();
  }, [loadData]);

  // Deep-link / URL query parameter support (useful for bookmarks and automated testing)
  useEffect(() => {
    if (expenses.length > 0) {
      const params = new URLSearchParams(window.location.search);
      const cat = params.get('filter');
      if (cat) setSelectedCategory(cat);

      const search = params.get('search');
      if (search) setSearchTerm(search);

      const editParam = params.get('edit');
      if (editParam === 'first' && expenses[0]) {
        setEditingExpense(expenses[0]);
      } else if (editParam) {
        const item = expenses.find((e) => e._id === editParam);
        if (item) setEditingExpense(item);
      }

      const delParam = params.get('delete');
      if (delParam === 'first' && expenses[0]) {
        setDeletingExpense(expenses[0]);
      } else if (delParam) {
        const item = expenses.find((e) => e._id === delParam);
        if (item) setDeletingExpense(item);
      }
    }
  }, [expenses]);

  // Handler: Add new expense
  const handleAddExpense = async (payload) => {
    try {
      const res = await createExpense(payload);
      if (res.success) {
        setNotification({
          type: 'success',
          message: `Added expense "${payload.title}" successfully!`
        });
        // Auto-refresh data without page reload
        await loadData();
      }
    } catch (err) {
      console.error('Failed to add expense:', err);
      const errMsg = err.response?.data?.message || 'Failed to add expense. Please check your inputs.';
      setNotification({
        type: 'error',
        message: errMsg
      });
      throw err;
    }
  };

  // Handler: Update expense
  const handleUpdateExpense = async (id, payload) => {
    try {
      const res = await updateExpense(id, payload);
      if (res.success) {
        setNotification({
          type: 'success',
          message: `Updated expense "${payload.title}" successfully!`
        });
        setEditingExpense(null);
        // Auto-refresh data without page reload
        await loadData();
      }
    } catch (err) {
      console.error('Failed to update expense:', err);
      const errMsg = err.response?.data?.message || 'Failed to update expense.';
      setNotification({
        type: 'error',
        message: errMsg
      });
      throw err;
    }
  };

  // Handler: Trigger edit mode
  const handleStartEdit = (expense) => {
    setEditingExpense(expense);
    // Smoothly scroll to the form card
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleCancelEdit = () => {
    setEditingExpense(null);
  };

  // Handler: Open delete confirmation modal
  const handleOpenDeleteModal = (expense) => {
    setDeletingExpense(expense);
  };

  const handleCloseDeleteModal = () => {
    setDeletingExpense(null);
  };

  // Handler: Confirm delete
  const handleConfirmDelete = async (id) => {
    try {
      setIsDeleting(true);
      const res = await deleteExpense(id);
      if (res.success) {
        setNotification({
          type: 'success',
          message: `Deleted expense "${deletingExpense.title}" successfully!`
        });
        setDeletingExpense(null);
        // If we were editing this item, clear edit state
        if (editingExpense?._id === id) {
          setEditingExpense(null);
        }
        // Auto-refresh data without page reload
        await loadData();
      }
    } catch (err) {
      console.error('Failed to delete expense:', err);
      setNotification({
        type: 'error',
        message: err.response?.data?.message || 'Failed to delete expense.'
      });
    } finally {
      setIsDeleting(false);
    }
  };

  // Filtered expenses based on category and search
  const filteredExpenses = expenses.filter((item) => {
    const matchesCategory = selectedCategory === 'All' || item.category === selectedCategory;
    const matchesSearch = !searchTerm || item.title.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="app-layout">
      {/* Toast Notification Container */}
      <Notification 
        notification={notification} 
        onClose={() => setNotification(null)} 
      />

      {/* Delete Confirmation Modal */}
      <DeleteModal
        isOpen={Boolean(deletingExpense)}
        expense={deletingExpense}
        onConfirm={handleConfirmDelete}
        onCancel={handleCloseDeleteModal}
        deleting={isDeleting}
      />

      {/* Top Navigation */}
      <Navbar totalExpenses={expenses.length} />

      {/* Main Content Container */}
      <main className="main-content">
        <div className="content-container">
          {/* Top Hero: Summary & Total Amount Spent */}
          <ExpenseSummary 
            expenses={expenses} 
            summary={summary} 
          />

          {/* Form and List Layout */}
          <div className="dashboard-grid">
            {/* Form Section */}
            <div className="form-column">
              <ExpenseForm
                onAddExpense={handleAddExpense}
                onUpdateExpense={handleUpdateExpense}
                editingExpense={editingExpense}
                onCancelEdit={handleCancelEdit}
              />
            </div>

            {/* List & Table Section */}
            <div className="list-column">
              <ExpenseList
                expenses={filteredExpenses}
                loading={loading}
                onEdit={handleStartEdit}
                onOpenDeleteModal={handleOpenDeleteModal}
                selectedCategory={selectedCategory}
                onSelectCategory={setSelectedCategory}
                searchTerm={searchTerm}
                onSearchChange={setSearchTerm}
              />
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="footer">
        <div className="footer-content">
          <p>© 2026 Personal Expense Tracker — MERN Stack Application</p>
          <p className="footer-subtext">Built for ICTAK Full Stack Development Evaluation • Connected to MongoDB Atlas</p>
        </div>
      </footer>
    </div>
  );
}

export default App;
