import React, { useState, useEffect } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { motion } from "framer-motion";
import { FaUser, FaLock, FaEnvelope, FaPhone } from "react-icons/fa";

export default function LoginRegister() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [active, setActive] = useState(false);

  // Login States
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");

  // Register States
  const [regName, setRegName] = useState("");
  const [regEmail, setRegEmail] = useState("");
  const [regPassword, setRegPassword] = useState("");
  const [regPhone, setRegPhone] = useState("");

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const mode = searchParams.get("mode");
    setActive(mode === "register");
  }, [searchParams]);

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const res = await axios.post("http://localhost:5000/api/auth/login", {
        email: loginEmail,
        password: loginPassword,
      });
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("user", JSON.stringify(res.data.user));
      navigate("/");
    } catch (err) {
      setError(err.response?.data?.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const res = await axios.post("http://localhost:5000/api/auth/register", {
        name: regName,
        email: regEmail,
        password: regPassword,
        phone: regPhone,
      });
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("user", JSON.stringify(res.data.user));
      navigate("/");
    } catch (err) {
      setError(err.response?.data?.message || "Registration failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-black relative">
      {/* Background Overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-green-700/40 via-black to-green-900/60" />

      {/* Main Container */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6 }}
        className="relative flex w-[850px] max-w-[95%] h-[550px] bg-black/70 backdrop-blur-lg rounded-3xl shadow-2xl overflow-hidden border border-green-600/30"
      >
        {/* Sliding Overlay */}
        <motion.div
          animate={{ x: active ? "100%" : "0%" }}
          transition={{ duration: 0.8, ease: "easeInOut" }}
          className="absolute top-0 left-0 w-1/2 h-full bg-gradient-to-br from-green-900 via-green-700 to-green-500 opacity-30 z-10 rounded-3xl shadow-lg"
        />

        {/* Left Panel */}
        <div className="relative w-1/2 h-full z-20">
          {/* New Here Panel */}
          <motion.div
            initial={false}
            animate={active ? { x: "-100%", opacity: 0 } : { x: "0%", opacity: 1 }}
            transition={{ duration: 0.8, ease: "easeInOut" }}
            className="absolute inset-0 flex flex-col justify-center items-center text-white text-center p-10"
          >
            <h1 className="text-4xl font-bold mb-6 tracking-tight">New Here?</h1>
            <p className="text-gray-300 mb-8 max-w-[75%] leading-6">
              Create an account to start reporting found items or searching for lost belongings.
            </p>
            <button
              onClick={() => setActive(true)}
              className="px-10 py-3 border-2 border-[#3CB371] rounded-xl text-sm font-semibold hover:bg-[#36a163] hover:text-white transition-all duration-200"
            >
              Register
            </button>
          </motion.div>

          {/* Sign Up Form */}
          <motion.div
            initial={false}
            animate={active ? { x: "0%", opacity: 1 } : { x: "-100%", opacity: 0 }}
            transition={{ duration: 0.8, ease: "easeInOut" }}
            className="absolute inset-0 flex items-center justify-center p-10"
          >
            <form className="w-full space-y-6" onSubmit={handleRegister}>
              <h1 className="text-4xl font-bold mb-4 text-[#3CB371] tracking-tight text-center">Sign Up</h1>
              <p className="text-gray-300 text-sm mb-6 text-center">Join our lost and found community</p>
              {error && <p className="text-[#FFD93D] bg-black/40 px-3 py-1 rounded-md">{error}</p>}

              {/* Username */}
              <div className="relative">
                <input
                  type="text"
                  placeholder="Username"
                  value={regName}
                  onChange={(e) => setRegName(e.target.value)}
                  className="w-full py-3.5 px-12 bg-black/40 text-white rounded-xl border border-green-500/30 focus:border-green-500 focus:ring-2 focus:ring-green-500/50 transition-all duration-200"
                />
                <FaUser className="absolute right-4 top-1/2 -translate-y-1/2 text-green-400 text-lg" />
              </div>

              {/* Email */}
              <div className="relative">
                <input
                  type="email"
                  placeholder="Email"
                  value={regEmail}
                  onChange={(e) => setRegEmail(e.target.value)}
                  className="w-full py-3.5 px-12 bg-black/40 text-white rounded-xl border border-green-500/30 focus:border-green-500 focus:ring-2 focus:ring-green-500/50 transition-all duration-200"
                />
                <FaEnvelope className="absolute right-4 top-1/2 -translate-y-1/2 text-green-400 text-lg" />
              </div>

              {/* Phone */}
              <div className="relative">
                <input
                  type="tel"
                  placeholder="Phone Number"
                  value={regPhone}
                  onChange={(e) => setRegPhone(e.target.value)}
                  className="w-full py-3.5 px-12 bg-black/40 text-white rounded-xl border border-green-500/30 focus:border-green-500 focus:ring-2 focus:ring-green-500/50 transition-all duration-200"
                />
                <FaPhone className="absolute right-4 top-1/2 -translate-y-1/2 text-green-400 text-lg" />
              </div>

              {/* Password */}
              <div className="relative">
                <input
                  type="password"
                  placeholder="Password"
                  value={regPassword}
                  onChange={(e) => setRegPassword(e.target.value)}
                  className="w-full py-3.5 px-12 bg-black/40 text-white rounded-xl border border-green-500/30 focus:border-green-500 focus:ring-2 focus:ring-green-500/50 transition-all duration-200"
                />
                <FaLock className="absolute right-4 top-1/2 -translate-y-1/2 text-green-400 text-lg" />
              </div>

              <button
                disabled={loading}
                className="w-full py-3.5 rounded-xl bg-[#3CB371] text-white font-semibold text-sm hover:bg-[#36a163] active:scale-[0.99] transition-all duration-200 shadow-lg shadow-green-800/40"
              >
                {loading ? "Registering..." : "Register"}
              </button>
            </form>
          </motion.div>
        </div>

        {/* Right Panel */}
        <div className="relative w-1/2 h-full z-20">
          {/* Sign In Form */}
          <motion.div
            initial={false}
            animate={active ? { x: "100%", opacity: 0 } : { x: "0%", opacity: 1 }}
            transition={{ duration: 0.8, ease: "easeInOut" }}
            className="absolute inset-0 flex items-center justify-center p-10"
          >
            <form className="w-full space-y-6" onSubmit={handleLogin}>
              <h1 className="text-4xl font-bold mb-4 text-[#3CB371] tracking-tight text-center">Sign In</h1>
              <p className="text-gray-300 text-sm mb-6 text-center">Welcome back to Back2Me</p>
              {error && <p className="text-[#FFD93D] bg-black/40 px-3 py-1 rounded-md">{error}</p>}

              {/* Email */}
              <div className="relative">
                <input
                  type="email"
                  placeholder="Email"
                  value={loginEmail}
                  onChange={(e) => setLoginEmail(e.target.value)}
                  className="w-full py-3.5 px-12 bg-black/40 text-white rounded-xl border border-green-500/30 focus:border-green-500 focus:ring-2 focus:ring-green-500/50 transition-all duration-200"
                />
                <FaUser className="absolute right-4 top-1/2 -translate-y-1/2 text-green-400 text-lg" />
              </div>

              {/* Password */}
              <div className="relative">
                <input
                  type="password"
                  placeholder="Password"
                  value={loginPassword}
                  onChange={(e) => setLoginPassword(e.target.value)}
                  className="w-full py-3.5 px-12 bg-black/40 text-white rounded-xl border border-green-500/30 focus:border-green-500 focus:ring-2 focus:ring-green-500/50 transition-all duration-200"
                />
                <FaLock className="absolute right-4 top-1/2 -translate-y-1/2 text-green-400 text-lg" />
              </div>

              <div className="flex justify-between items-center text-sm text-gray-300">
                <label className="flex items-center cursor-pointer group">
                  <input type="checkbox" className="w-4 h-4 rounded border-green-400 text-green-500 focus:ring-green-200" />
                  <span className="ml-2 group-hover:text-green-400 transition-colors">Remember me</span>
                </label>
                <a href="#" className="text-green-400 hover:text-green-300 transition-colors">
                  Forgot Password?
                </a>
              </div>

              <button
                disabled={loading}
                className="w-full py-3.5 rounded-xl bg-[#3CB371] text-white font-semibold text-sm hover:bg-[#36a163] active:scale-[0.99] transition-all duration-200 shadow-lg shadow-green-800/40"
              >
                {loading ? "Logging in..." : "Log in"}
              </button>
            </form>
          </motion.div>

          {/* Welcome Back Panel */}
          <motion.div
            initial={false}
            animate={active ? { x: "0%", opacity: 1 } : { x: "100%", opacity: 0 }}
            transition={{ duration: 0.8, ease: "easeInOut" }}
            className="absolute inset-0 flex flex-col justify-center items-center text-white text-center p-10"
          >
            <h1 className="text-4xl font-bold mb-6 tracking-tight">Welcome Back</h1>
            <p className="text-gray-300 mb-8 max-w-[75%] leading-6">
              Sign in to access your account and connect with our community.
            </p>
            <button
              onClick={() => setActive(false)}
              className="px-10 py-3 border-2 border-[#3CB371] rounded-xl text-sm font-semibold hover:bg-[#36a163] hover:text-white transition-all duration-200"
            >
              Log in
            </button>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
}
