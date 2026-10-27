import React from 'react';
import { AlertTriangle, Trash2, X } from 'lucide-react';

const DeleteModal = ({ isOpen, expense, onConfirm, onCancel, deleting }) => {
  if (!isOpen || !expense) return null;

  return (
    <div className="modal-backdrop" onClick={onCancel}>
      <div className="modal-container" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close" onClick={onCancel} aria-label="Close modal">
          <X size={18} />
        </button>

        <div className="modal-icon-wrapper">
          <AlertTriangle className="modal-alert-icon" size={32} />
        </div>

        <h3 className="modal-title">Delete Expense?</h3>
        <p className="modal-description">
          Are you sure you want to permanently delete{' '}
          <strong>"{expense.title}"</strong> (${Number(expense.amount).toFixed(2)})?
          This action will immediately remove the record from MongoDB Atlas and cannot be undone.
        </p>

        <div className="modal-actions">
          <button
            type="button"
            className="btn btn-secondary"
            onClick={onCancel}
            disabled={deleting}
          >
            Cancel
          </button>
          <button
            type="button"
            className="btn btn-danger"
            onClick={() => onConfirm(expense._id)}
            disabled={deleting}
          >
            <Trash2 size={16} />
            {deleting ? 'Deleting from DB...' : 'Yes, Delete'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteModal;
