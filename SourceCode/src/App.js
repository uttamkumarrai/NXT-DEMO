import './App.css';
import Header from './Headar/Header';
import MiniDrawer from './Slider-Menu/muiSlider';

import ErrorBoundary from './RuntimeError';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import { MessageProvider } from './Toast/DialogContext';
import Message from './Toast/Dialog';

import { ToastProvider } from './Toast/toast';
function App() {
  
  return (
    <div className="App">
 
  {/* <Testing /> */}
  <ErrorBoundary>
 <ToastProvider>
 <MessageProvider>
     <BrowserRouter>
      <Header /> 
      <MiniDrawer />
     

    </BrowserRouter> 
    <Message /> {/* Include the Message component */}
    </MessageProvider>
    </ToastProvider>
    </ErrorBoundary>


 

  
    

    </div>
  );
}

export default App;





// import './App.css';
// import Header from './Headar/Header';
// import MiniDrawer from './Slider-Menu/muiSlider';
// import AddBranchList from './tmsComponents/MASTERS/BranchList';
// import Testing from './Testing';
// import ErrorBoundary from './RuntimeError';
// import { BrowserRouter as Router, Route, Switch, Redirect, Routes, Navigate } from 'react-router-dom';

// import { ToastProvider } from './Toast/toast';
// import { useContext, useState } from 'react';
// import ProtectedRoute from './PrivateRoute/PrivateComponent';
// import UserContext from './Context/UserContext';
// import Login from './Login';
// import Home from './Dashboard/Home';
// function App() {
//   const { userDetails } = useContext(UserContext);


//   // const [isAuthenticated, setIsAuthenticated] = useState(false);
  

//   // const handleLogin = () => {
//   //   console.log("this is authh ");
//   //   setIsAuthenticated(true);
//   // };
  
//   return (
//     <div className="App">
 
//   {/* <Testing /> */}
//   {/* <ErrorBoundary>
//  <ToastProvider>
//      <BrowserRouter>
//       <Header /> 
//       <MiniDrawer />

//     </BrowserRouter> 
//     </ToastProvider>
//     </ErrorBoundary> */}

// <Router>
//       <div>
//         {/* {isAuthenticated && <Header />}
//         {isAuthenticated && <MiniDrawer />} */}
        
// <ErrorBoundary>
// <ToastProvider>
  
  
//          {userDetails.isAuthenticated && <Header />}
//          {userDetails.isAuthenticated && <MiniDrawer />}
         
//           </ToastProvider>

//          </ErrorBoundary>
//         <div>
//           <Routes>
//             <Route path="/login"  element={userDetails.isAuthenticated  ? <Navigate to="/" /> : <Login  />}/>
//             {/* <Route  path="/" element={userDetails.isAuthenticated  ? <Home /> : <Navigate to="/login" />} /> */}
          
//             <Route 
//               path="/*" 
//               element={
//                 <ProtectedRoute>

//                   <Home />
//                 </ProtectedRoute>
//               } 
//             />
          
          
//           </Routes>
//         </div>
//       </div>
//     </Router>
//     </div>
//   );
// }

// export default App;

