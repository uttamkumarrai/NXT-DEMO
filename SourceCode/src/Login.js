// import React, { useState } from 'react';
// import axios from 'axios';
// import { useHistory } from 'react-router-dom';

// const Login = () => {
//   const [username, setUsername] = useState('');
//   const [password, setPassword] = useState('');
//   const history = useHistory();

//   const handleLogin = async (e) => {
//     e.preventDefault();
//     try {
//       const response = await axios.post('/api/login', { username, password });
//       const token = response.data.token;
//       localStorage.setItem('token', token);
//       axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
//       history.push('/dashboard');
//     } catch (error) {
//       console.error('Login failed', error);
//     }
//   };

//   return (
//     <form onSubmit={handleLogin}>
//       <input
//         type="text"
//         placeholder="Username"
//         value={username}
//         onChange={(e) => setUsername(e.target.value)}
//       />
//       <input
//         type="password"
//         placeholder="Password"
//         value={password}
//         onChange={(e) => setPassword(e.target.value)}
//       />
//       <button type="submit">Login</button>
//     </form>
//   );
// };

// export default Login;



// import React, { useState } from "react";
// import "bootstrap/dist/css/bootstrap.min.css";

// function Login() {
//   const [password, setPassword] = useState("");
//   const [email, setEmail] = useState("");
//   const [passwordError, setpasswordError] = useState("");
//   const [emailError, setemailError] = useState("");

//   const [input, setinput]=useState[{
//     email

//   }]

//   const handleValidation = (event) => {
//     let formIsValid = true;

//     if (!email.match(/^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/)) {
//       formIsValid = false;
//       setemailError("Email Not Valid");
//       return false;
//     } else {
//       setemailError("");
//       formIsValid = true;
//     }

//     if (!password.match(/^[a-zA-Z]{8,22}$/)) {
//       formIsValid = false;
//       setpasswordError(
//         "Only Letters and length must best min 8 Chracters and Max 22 Chracters"
//       );
//       return false;
//     } else {
//       setpasswordError("");
//       formIsValid = true;
//     }

//     return formIsValid;
//   };

//   const loginSubmit = (e) => {
//     e.preventDefault();
//    // handleValidation();
//    localStorage.setItem('user', email);
   
//   };

//   return (
//     <div className="App">
//       <div className="container">
//         <div className="row d-flex justify-content-center">
//           <div className="col-md-4">
//             <form id="loginform" onSubmit={loginSubmit}>
//               <div className="form-group">
//                 <label>Email address</label>
//                 <input
//                   type="email"
//                   className="form-control"
//                   id="EmailInput"
//                   name="EmailInput"
//                   aria-describedby="emailHelp"
//                   placeholder="Enter email"
//                   onChange={(event) => setEmail(event.target.value)}
//                 />
//                 <small id="emailHelp" className="text-danger form-text">
//                   {emailError}
//                 </small>
//               </div>
//               <div className="form-group">
//                 <label>Password</label>
//                 <input
//                   type="password"
//                   className="form-control"
//                   id="exampleInputPassword1"
//                   placeholder="Password"
//                   onChange={(event) => setPassword(event.target.value)}
//                 />
//                 <small id="passworderror" className="text-danger form-text">
//                   {passwordError}
//                 </small>
//               </div>
//               <div className="form-group form-check">
//                 <input
//                   type="checkbox"
//                   className="form-check-input"
//                   id="exampleCheck1"
//                 />
//                 <label className="form-check-label">Check me out</label>
//               </div>
//               <button type="submit" className="btn btn-primary">
//                 Submit
//               </button>
//             </form>
//           </div>
         
//         </div>
//       </div>
//     </div>
//   );
// }
// export default Login;

// import React, { useState } from 'react';
// import axios from 'axios';

// const Login = ({ onLogin }) => {
//   const [username, setUsername] = useState('');
//   const [password, setPassword] = useState('');

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       const response = await axios.post('http://localhost:8080/api/login', { username, password });
//       if (response.data) {
//         onLogin();
//       } else {
//         alert('Invalid credentials');
//       }
//     } catch (error) {
//       console.error('There was an error logging in!', error);
//     }
//   };

//   return (
//     <div>
//       <h2>Login</h2>
//       {/* <button onClick={onLogin}>click me to login </button> */}
//       <form onSubmit={handleSubmit}>
//         <div>
//           <label>Username:</label>
//           <input
//             type="text"
//             value={username}
//             onChange={(e) => setUsername(e.target.value)}
//           />
//         </div>
//         <div>
//           <label>Password:</label>
//           <input
//             type="password"
//             value={password}
//             onChange={(e) => setPassword(e.target.value)}
//           />
//         </div>
//         <button type="submit">Login</button>
//       </form>
//     </div>
//   );
// };

// export default Login;



import React, { useState, useContext } from 'react';
import axios from 'axios';
import UserContext from './Context/UserContext';

const Login = () => {
  const [empid, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const { login } = useContext(UserContext);

  const handleSubmit = async (e) => {
    e.preventDefault();
        console.log("user submit ");
        // login({
        //   branchName: username,
        //   email: password,
        // });

        
    try {
      const response = await axios.post('http://localhost:8080/users/login', { empid, password });
     console.log("response "+response);
     console.log("response "+response.data);
      if (response.data) {
        login({
          branchName: response.data.branchName,
          email: response.data.email,
          empid: response.data.empid,
      empname: response.data.empname,
      branchid: response.data.branchid,
      user_right: response.data.user_right,
      job_role: response.data.job_role,
      employeeRoleType: response.data.employeeRoleType,
      menus: response.data.menus,
        });
      } else {
        alert('Invalid credentials');
      }
    } catch (error) {
      console.error('There was an error logging in!', error);
    }
  };

  return (
    <div>
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>empid:</label>
          <input
            type="text"
            value={empid}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div>
          <label>Password:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default Login;

