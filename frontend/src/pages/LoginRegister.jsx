
import React, { useState, useEffect } from "react";
import { useSearchParams, useNavigate  } from "react-router-dom";
import axios from "axios";
import { FaUser, FaLock, FaEnvelope } from "react-icons/fa";

export default function LoginRegister() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [active, setActive] = useState(false);

  // States for login
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");

  // States for register
  const [regName, setRegName] = useState("");
  const [regEmail, setRegEmail] = useState("");
  const [regPassword, setRegPassword] = useState("");

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {

    const mode = searchParams.get("mode");
    setActive(mode === "register");
  }, [searchParams]);

  // Handle Login
  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res = await axios.post("http://localhost:5000/api/auth/login", {
        email: loginEmail,
        password: loginPassword,
      });

      localStorage.setItem("token", res.data.token); // save token
      localStorage.setItem("user", JSON.stringify(res.data.user));

      navigate("/"); 
    } catch (err) {
      setError(err.response?.data?.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  // Handle Register
  const handleRegister = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res = await axios.post("http://localhost:5000/api/auth/register", {
        name: regName,
        email: regEmail,
        password: regPassword,
      });

      localStorage.setItem("token", res.data.token);
      localStorage.setItem("user", JSON.stringify(res.data.user));

      navigate("/profile");
    } catch (err) {
      setError(err.response?.data?.message || "Registration failed");
    } finally {
      setLoading(false);
    }
  };


  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-green-100 via-green-50 to-white">
      <div className="relative w-[850px] max-w-[95%] h-[550px] bg-white rounded-3xl shadow-lg overflow-hidden">
        {/* Login Form */}
        <div className={`absolute top-0 w-1/2 h-full p-10 flex items-center text-center transition-all duration-700 ease-in-out
          ${active ? 'translate-x-[-100%] opacity-0' : 'right-0 opacity-100'}`}>
          <form className="w-full space-y-6" onSubmit={handleLogin}>
            <h1 className="text-4xl font-bold mb-4 text-green-600 tracking-tight">Sign In</h1>
            <p className="text-gray-600 text-sm mb-6">
              Welcome back to Back2Me
            </p>
            {error && <p className="text-red-500">{error}</p>}
            
            <div className="relative">
              <input 
                type="email" 
                placeholder="Email" 
                onChange={(e) => setLoginEmail(e.target.value)}
                className="w-full py-3.5 px-12 bg-green-50/50 rounded-xl text-gray-700 text-sm font-medium
                border border-green-100 focus:border-green-500 focus:outline-none focus:ring-2 focus:ring-green-200
                transition-all duration-200" 
              />
              <FaUser className="absolute right-4 top-1/2 -translate-y-1/2 text-green-400 text-lg" />
            </div>
            
            <div className="relative">
              <input 
                type="password" 
                placeholder="Password" 
                value={loginPassword}
                onChange={(e) => setLoginPassword(e.target.value)}
                className="w-full py-3.5 px-12 bg-green-50/50 rounded-xl text-gray-700 text-sm font-medium
                border border-green-100 focus:border-green-500 focus:outline-none focus:ring-2 focus:ring-green-200
                transition-all duration-200" 
              />
              <FaLock className="absolute right-4 top-1/2 -translate-y-1/2 text-green-400 text-lg" />
            </div>

            <div className="flex justify-between items-center text-sm">
              <label className="flex items-center text-gray-600 cursor-pointer group">
                <input type="checkbox" className="w-4 h-4 rounded border-green-200 text-green-500 
                focus:ring-green-200 focus:ring-offset-0 transition-all duration-200" />
                <span className="ml-2 group-hover:text-green-600 transition-colors">Remember me</span>
              </label>
              <a href="#" className="text-green-600 hover:text-green-700 transition-colors">Forgot Password?</a>
            </div>

            <button disabled={loading} className="w-full py-3.5 rounded-xl bg-green-500 text-white font-semibold text-sm
              hover:bg-green-600 active:scale-[0.99] transition-all duration-200 shadow-lg shadow-green-200">
              {loading ? "Logging in..." : "Log in"}
            </button>
          </form>
        </div>

        {/* Register Form */}
        <div className={`absolute top-0 w-1/2 h-full p-10 flex items-center text-center transition-all duration-700 ease-in-out
          ${active ? 'left-0 opacity-100 visible' : 'right-[-50%] opacity-0 invisible'}`}>
          <form className="w-full space-y-6" onSubmit={handleRegister}>
            <h1 className="text-4xl font-bold mb-4 text-green-600 tracking-tight">Sign Up</h1>
            <p className="text-gray-600 text-sm mb-6">
              Join our lost and found community
            </p>
            {error && <p className="text-red-500">{error}</p>}

            <div className="relative">
              <input 
                type="text" 
                placeholder="Username" 
                value={regName}
                onChange={(e) => setRegName(e.target.value)}
                className="w-full py-3.5 px-12 bg-green-50/50 rounded-xl text-gray-700 text-sm font-medium
                border border-green-100 focus:border-green-500 focus:outline-none focus:ring-2 focus:ring-green-200
                transition-all duration-200" 
              />
              <FaUser className="absolute right-4 top-1/2 -translate-y-1/2 text-green-400 text-lg" />
            </div>

            <div className="relative">
              <input 
                type="email" 
                placeholder="Email" 
                value={regEmail}
                onChange={(e) => setRegEmail(e.target.value)}
                className="w-full py-3.5 px-12 bg-green-50/50 rounded-xl text-gray-700 text-sm font-medium
                border border-green-100 focus:border-green-500 focus:outline-none focus:ring-2 focus:ring-green-200
                transition-all duration-200" 
              />
              <FaEnvelope className="absolute right-4 top-1/2 -translate-y-1/2 text-green-400 text-lg" />
            </div>

            <div className="relative">
              <input 
                type="password" 
                placeholder="Password" 
                value={regPassword}
                onChange={(e) => setRegPassword(e.target.value)}
                className="w-full py-3.5 px-12 bg-green-50/50 rounded-xl text-gray-700 text-sm font-medium
                border border-green-100 focus:border-green-500 focus:outline-none focus:ring-2 focus:ring-green-200
                transition-all duration-200" 
              />
              <FaLock className="absolute right-4 top-1/2 -translate-y-1/2 text-green-400 text-lg" />
            </div>

            <button disabled={loading} className="w-full py-3.5 rounded-xl bg-green-500 text-white font-semibold text-sm
              hover:bg-green-600 active:scale-[0.99] transition-all duration-200 shadow-lg shadow-green-200">
              {loading ? "Registering..." : "Register"}
            </button>
          </form>
        </div>

        {/* Panel Content */}
        {/* Left Panel */}
        <div className={`absolute left-0 w-1/2 h-full flex flex-col justify-center items-center z-[1] 
          text-white text-center p-10 transition-all duration-700 ease-in-out
          ${active ? 'translate-x-[100%] opacity-0 invisible' : 'translate-x-0 opacity-100 visible'}`}>
          <h1 className="text-4xl font-bold mb-6 tracking-tight">New Here?</h1>
          <p className="text-white/95 text-xl mb-4 max-w-[80%] font-medium">
            Create an account to get started
          </p>
          <p className="text-white/80 text-sm mb-8 max-w-[75%] leading-6">
            Create an account to start reporting found items or searching for lost belongings.
          </p>
          <button 
            onClick={() => setActive(true)}
            className="px-10 py-3 border-2 border-white rounded-xl text-sm font-semibold
            hover:bg-white hover:text-green-600 transition-all duration-200"
          >
            Register
          </button>
        </div>

        {/* Right Panel */}
        <div className={`absolute right-0 w-1/2 h-full flex flex-col justify-center items-center z-[1] 
          text-white text-center p-10 transition-all duration-700 ease-in-out
          ${active ? 'translate-x-0 opacity-100 visible' : 'translate-x-[100%] opacity-0 invisible'}`}>
          <h1 className="text-4xl font-bold mb-6 tracking-tight">Welcome Back</h1>
          <p className="text-white/95 text-xl mb-4 max-w-[80%] font-medium">
            Sign in to continue
          </p>
          <p className="text-white/80 text-sm mb-8 max-w-[75%] leading-6">
            Sign in to access your account and connect with our community.
          </p>
          <button 
            onClick={() => setActive(false)}
            className="px-10 py-3 border-2 border-white rounded-xl text-sm font-semibold
            hover:bg-white hover:text-green-600 transition-all duration-200"
          >
            Log in
          </button>
        </div>

        {/* Sliding Background */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <div className={`absolute w-[300%] h-full bg-gradient-to-br from-green-600 via-green-500 to-green-400 
            transition-all duration-[1800ms] ease-[cubic-bezier(0.2,0.8,0.2,1)]
            ${active ? 'left-1/2' : 'left-[-250%]'}`}>
          </div>
        </div>
      </div>
    </div>
  );
}

