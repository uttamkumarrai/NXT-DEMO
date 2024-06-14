// useGSTValidation.js
import { useState } from 'react';

const useValidations = () => {
  const[gstError,setGstError]=useState('');
  const[panError,setPanError]=useState('');
  const[nameError,setNameError]=useState('');
  const[emailError,setEmailError]=useState('');
  const[mobileError,setMobileError]=useState('');

  const validateGST = (gst) => {
    const gstPattern = /^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[1-9A-Z]{1}[Z]{1}[0-9A-Z]{1}$/;
    const isValid = gstPattern.test(gst);
    setGstError(isValid ? '' : 'Invalid GST format');
    return isValid;
  };

  const validateEmail = (email) => {
    const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    const isValid = emailPattern.test(email);
    setEmailError(isValid ? '' : 'Invalid email format');
    return isValid;
  };

  const validatePAN = (pan) => {
    const panPattern = /^[A-Z]{5}[0-9]{4}[A-Z]{1}$/;
    const isValid = panPattern.test(pan);
    setPanError(isValid ? '' : 'Invalid PAN format');
    return isValid;
  };

  const validateName = (name) => {
    const namePattern = /^[a-zA-Z\s]{3,}$/;
    const isValid = namePattern.test(name);
    setNameError(isValid ? '' : 'Invalid name format');
    return isValid;
  };

  const validateMobile = (mobile) => {
    const mobilePattern = /^[6-9][0-9]{9}$/;
    const isValid = mobilePattern.test(mobile);
    setMobileError(isValid ? '' : 'Invalid mobile number format');
    return isValid;
  };

  

  return {
    
    gstError,
    mobileError,
    nameError,
    emailError,
    panError,
    validateGST,
    validateEmail,
    validatePAN,
    validateName,
    validateMobile,
  };
};

export default useValidations;
