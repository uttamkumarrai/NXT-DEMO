import React, { createContext, useContext } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// Create a context for toast notifications
const ToastContext = createContext();

// Custom hook to use toast context
export const useToast = () => useContext(ToastContext);

// Toast provider component
export const ToastProvider = ({ children }) => {
  // Function to show a toast notification
  const showToast = (message, type, options) => {
    if (type === 'success') {
      toast.success(message, {
        position: options?.position || "bottom-center",
        autoClose: options?.autoClose || 3000,
        hideProgressBar: options?.hideProgressBar !== undefined ? options.hideProgressBar : false,
        closeOnClick: options?.closeOnClick !== undefined ? options.closeOnClick : true,
        pauseOnHover: options?.pauseOnHover !== undefined ? options.pauseOnHover : true,
        draggable: options?.draggable !== undefined ? options.draggable : true,
        progress: options?.progress !== undefined ? options.progress : undefined,
      });
    } else if (type === 'confirm') {
      const isConfirmed = window.confirm(message);
      if (isConfirmed) {
        options?.onConfirm?.();
      } else {
        options?.onCancel?.();
      }
    }
  };

  // Expose the showToast function globally
  window.showToast = showToast;

  return (
    <ToastContext.Provider value={{ showToast }}>
      <ToastContainer />
      {children}
    </ToastContext.Provider>
  );
};
