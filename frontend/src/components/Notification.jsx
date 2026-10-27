import React, { useEffect } from 'react';
import { CheckCircle2, AlertCircle, X } from 'lucide-react';

const Notification = ({ notification, onClose }) => {
  if (!notification || !notification.message) return null;

  const isSuccess = notification.type === 'success';

  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, 4000);
    return () => clearTimeout(timer);
  }, [notification, onClose]);

  return (
    <div className={`notification-toast ${isSuccess ? 'toast-success' : 'toast-error'}`}>
      <div className="toast-icon">
        {isSuccess ? <CheckCircle2 size={18} /> : <AlertCircle size={18} />}
      </div>
      <div className="toast-content">
        <span className="toast-title">{isSuccess ? 'Success' : 'Error'}</span>
        <span className="toast-message">{notification.message}</span>
      </div>
      <button className="toast-close" onClick={onClose} aria-label="Dismiss">
        <X size={15} />
      </button>
    </div>
  );
};

export default Notification;
