// import React, { useState } from "react";
// import "./style.css";
// import { FaUser, FaLock, FaEnvelope } from "react-icons/fa";

// export default function LoginRegister() {
  
//   const [active, setActive] = useState(false);

//   return (
//     <div className={`container ${active ? "active" : ""}`}>
//       {/* Login Form */}
//       <div className="form-box login">
//         <form autoComplete="off">
//           <h1>Log in</h1>
//           <div className="input-box">
//             <input
//               type="text"
//               id="login-username"
//               name="login-username"
//               placeholder="Username"
//               required
//             />
//             <span className="input-icon"><FaUser /></span>
//           </div>
//           <div className="input-box">
//             <input
//               type="password"
//               id="login-password"
//               name="login-password"
//               placeholder="Password"
//               required
//             />
//             <span className="input-icon"><FaLock /></span>
//           </div>
//           <div className="forgot-link">
//             <a href="#">Forgot Password?</a>
//           </div>
//           <button type="submit" className="btn">
//             Log In
//           </button>
//         </form>
//       </div>

//       {/* Register Form */}
//       <div className="form-box register">
//         <form autoComplete="off">
//           <h1>Register</h1>
//           <div className="input-box">
//             <input
//               type="text"
//               id="register-username"
//               name="register-username"
//               placeholder="Username"
//               required
//             />
//             <span className="input-icon"><FaUser /></span>
//           </div>
//           <div className="input-box">
//             <input
//               type="email"
//               id="register-email"
//               name="register-email"
//               placeholder="Email"
//               required
//             />
//             <span className="input-icon"><FaEnvelope /></span>
//           </div>
//           <div className="input-box">
//             <input
//               type="password"
//               id="register-password"
//               name="register-password"
//               placeholder="Password"
//               required
//             />
//             <span className="input-icon"><FaLock /></span>
//           </div>
//           <button type="submit" className="btn">
//             Register
//           </button>
//         </form>
//       </div>

//       {/* Toggle Panels */}
//       <div className="toggle-box">
//         <div className="toggle-panel toggle-left">
//           <h1>Join the Back2Me Community!</h1>
//           <p>Let's make the world a little kinder.</p>
//           <p> Sign up to post found items or reclaim what you've lost. It's quick, secure, and free. </p>
//           <button
//             className="btn register-btn"
//             type="button"
//             onClick={() => setActive(true)}
//           >
//             Register
//           </button>
//         </div>
//         <div className="toggle-panel toggle-right">
//           <h1>Welcome Back!</h1>
//           <p>Ready to reunite something today?</p>
//           <p>Log in to find, report, or help return lost items through <span className="font-semibold">Back2Me</span>.</p>
//           <button
//             className="btn login-btn"
//             type="button"
//             onClick={() => setActive(false)}
//           >
//             Login
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// }
