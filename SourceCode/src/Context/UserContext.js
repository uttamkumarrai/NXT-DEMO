import React, { createContext, useState, useEffect } from 'react';

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [userDetails, setUserDetails] = useState({
    isAuthenticated: false,
    branchName: '',
    email: '',
    empid: '',
      empname:'',
      branchid: '',
      user_right: '',
      job_role: '',
      employeeRoleType: '',
      menus: '',
  });

  useEffect(() => {
    const storedUserDetails = localStorage.getItem('userDetails');
    if (storedUserDetails) {
      setUserDetails(JSON.parse(storedUserDetails));
    }
  }, []);

  const login = (details) => {
    const newDetails = {
      isAuthenticated: true,
      branchName: details.branchName,
      email: details.email,
      empid: details.empid,
      empname: details.empname,
      branchid: details.branchid,
      user_right: details.user_right,
      job_role: details.job_role,
      employeeRoleType: details.employeeRoleType,
      menus:details.menus,
    };
    setUserDetails(newDetails);
    localStorage.setItem('userDetails', JSON.stringify(newDetails));
  };

  const logout = () => {
    const newDetails = {
      isAuthenticated: false,
      branchName: '',
      email: '',
      empid: '',
      empname:'',
      branchid: '',
      user_right: '',
      job_role: '',
      employeeRoleType: '',
      menus: '',
    };
    setUserDetails(newDetails);
    localStorage.removeItem('userDetails');
  };

  return (
    <UserContext.Provider value={{ userDetails, login, logout }}>
      {children}
    </UserContext.Provider>
  );
};

export default UserContext;
