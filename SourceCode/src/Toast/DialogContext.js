import React, { createContext, useContext, useState } from 'react';

// Create a context
const MessageContext = createContext();

// Custom hook to use the MessageContext
export const useMessage = () => useContext(MessageContext);

// Provider component
export const MessageProvider = ({ children }) => {
  const [message, setMessage] = useState('');
  const [isVisible, setIsVisible] = useState(false);

  const showMessage = (msg) => {
    setMessage(msg);
    setIsVisible(true);
  };

  const hideMessage = () => {
    setIsVisible(false);
    setMessage('');
  };

  return (
    <MessageContext.Provider value={{ message, isVisible, showMessage, hideMessage }}>
      {children}
    </MessageContext.Provider>
  );
};
