import React, { useEffect, useRef } from 'react';
import {useMessage} from './DialogContext'
import './Dialog.css';

const Message = () => {
    const { message, isVisible, hideMessage } = useMessage();
    const dialogRef = useRef(null);
  
    useEffect(() => {
      if (isVisible) {
        if (dialogRef.current) {
          dialogRef.current.showModal();
        }
      } else {
        if (dialogRef.current) {
          dialogRef.current.close();
        }
      }
    }, [isVisible]);
  
    if (!message) return null; // Render nothing if there's no message
  
    return (
      <dialog ref={dialogRef} className="message-overlay">
        <div className="message-box">
          <p>{message}</p>
          <button onClick={hideMessage}>OK</button>
        </div>
      </dialog>
    );
  };
  
  export default Message;
