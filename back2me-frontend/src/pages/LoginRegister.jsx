import React, { useState, useEffect } from "react";
import { FaUser, FaLock } from "react-icons/fa";
import { MdAlternateEmail } from "react-icons/md";
import { useLocation } from "react-router-dom";

const LoginRegister = () => {
  const [isRegistering, setIsRegistering] = useState(false);

  const location = useLocation();

  useEffect(() => {
  const params = new URLSearchParams(location.search);
  const mode = params.get("mode");
  if (mode === "register") {
    setIsRegistering(true);
  } else {
    setIsRegistering(false);
  }
}, [location.search]);

  return (
    <>
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="relative w-full max-w-4xl h-[550px] rounded-3xl shadow-2xl overflow-hidden flex">

        {/* Left Side */}
        <div className="w-1/2 relative overflow-hidden">
          <div
            className="absolute top-0 left-0 h-full w-[200%] flex transition-transform duration-700 ease-in-out"
            style={{
              transform: isRegistering ? "translateX(-50%)" : "translateX(0)",
            }}
          >
        {/* Welcome for Login */}
        <div className="w-1/2 bg-green-600 text-white flex flex-col justify-center items-center p-10 text-center space-y-4 rounded-r-3xl shadow-lg">
        <h2 className="text-4xl font-extrabold tracking-wide">Welcome Back!</h2>
        <p className="text-lg font-medium">Ready to reunite something today?</p>
        <p className="text-sm opacity-90 max-w-sm">
            Log in to find, report, or help return lost items through <span className="font-semibold">Back2Me</span>.
        </p>
        <button
            onClick={() => setIsRegistering(true)}
            className="mt-4 border-2 border-white px-6 py-2 rounded-full text-white font-semibold hover:bg-white hover:text-green-600 transition duration-300 cursor-pointer"
        >
            Register
        </button>
        </div>


            {/* Register Form */}
            <div className="w-1/2 bg-white text-gray-800 flex flex-col justify-center items-center p-10">
              <form className="w-full max-w-sm">
                <h1 className="text-3xl font-bold text-green-600 mb-8 text-center">Register</h1>
                <div className="relative mb-6">
                  <input
                    type="text"
                    placeholder="Username"
                    required
                    className="w-full p-3 pl-5 pr-10 bg-gray-100 rounded-md text-sm outline-none"
                  />
                  <FaUser className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                </div>
                <div className="relative mb-6">
                  <input
                    type="email"
                    placeholder="Email"
                    required
                    className="w-full p-3 pl-5 pr-10 bg-gray-100 rounded-md text-sm outline-none"
                  />
                  <MdAlternateEmail className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                </div>
                <div className="relative mb-6">
                  <input
                    type="password"
                    placeholder="Password"
                    required
                    className="w-full p-3 pl-5 pr-10 bg-gray-100 rounded-md text-sm outline-none"
                  />
                  <FaLock className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                </div>
                <button
                  type="submit"
                  className="w-full bg-green-600 text-white font-semibold py-3 rounded-md hover:bg-green-700 transition cursor-pointer"
                >
                  Register
                </button>
              </form>
            </div>
          </div>
        </div>

        {/* Right Side */}
        <div className="w-1/2 relative overflow-hidden">
          <div
            className="absolute top-0 left-0 h-full w-[200%] flex transition-transform duration-700 ease-in-out"
            style={{
              transform: isRegistering ? "translateX(-50%)" : "translateX(0)",
            }}
          >
            {/* Login Form */}
            <div className="w-1/2 bg-white text-gray-800 flex flex-col justify-center items-center p-10">
              <form className="w-full max-w-sm">
                <h1 className="text-3xl font-bold text-green-600 mb-8 text-center">Log in</h1>
                <div className="relative mb-6">
                  <input
                    type="text"
                    placeholder="Username"
                    required
                    className="w-full p-3 pl-5 pr-10 bg-gray-100 rounded-md text-sm outline-none"
                  />
                  <FaUser className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                </div>
                <div className="relative mb-4">
                  <input
                    type="password"
                    placeholder="Password"
                    required
                    className="w-full p-3 pl-5 pr-10 bg-gray-100 rounded-md text-sm outline-none"
                  />
                  <FaLock className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                </div>
                <div className="text-right text-sm mb-6">
                  <a href="#" className="text-green-600 hover:underline">
                    Forgot Password?
                  </a>
                </div>
                <button
                  type="submit"
                  className="w-full bg-green-600 text-white font-semibold py-3 rounded-md hover:bg-green-700 transition cursor-pointer"
                >
                  Log In
                </button>
              </form>
            </div>

            {/* Welcome for Register */}
            <div className="w-1/2 bg-green-600 text-white flex flex-col justify-center items-center p-10 text-center space-y-4 rounded-l-3xl shadow-lg">
            <h2 className="text-4xl font-extrabold tracking-wide">Join the Back2Me Community!</h2>
            <p className="text-lg font-medium">Let's make the world a little kinder.</p>
            <p className="text-sm opacity-90 max-w-sm">
                Sign up to post found items or reclaim what you've lost. It's quick, secure, and free.
            </p>
            <button
                onClick={() => setIsRegistering(false)}
                className="mt-4 border-2 border-white px-6 py-2 rounded-full text-white font-semibold hover:bg-white hover:text-green-600 transition duration-300 cursor-pointer"
            >
                Login
            </button>
            </div>


          </div>
        </div>

      </div>
    </div>
    </>
  );
};

export default LoginRegister;
