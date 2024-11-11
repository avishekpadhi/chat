import React, { useState } from "react";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import { AuthState } from "../Context/AuthProvider";
import { loginUser } from "../services/service";

export default function Login() {
  const history = useHistory();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const { setUser } = AuthState();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    try {
      const userData = await loginUser(email, password);
      localStorage.setItem("userInfo", JSON.stringify(userData));
      setUser(userData);
      history.push("/chat");
    } catch (err) {
      setError("Invalid email or password");
    }
  };

  return (
    <div className="">
      <div className="flex min-h-screen w-screen w-full items-center justify-center text-gray-600 bg-gray-50">
        <div className="relative">
          <div className="relative flex flex-col sm:w-[30rem] rounded-lg border-gray-400 bg-white shadow-lg px-4">
            <div className="flex-auto p-6">
              <div className="mb-10 flex flex-shrink-0 flex-grow-0 items-center justify-center overflow-hidden">
                <a
                  href="#"
                  className="flex cursor-pointer items-center gap-2 text-indigo-500 no-underline hover:text-indigo-500"
                >
                  <span className="flex-shrink-0 text-3xl font-black  tracking-tight opacity-100">
                    Pulse.
                  </span>
                </a>
              </div>

              <h4 className="mb-2 font-medium text-gray-700 xl:text-xl">
                Welcome to pulse!
              </h4>
              <p className="mb-6 text-gray-500">
                Please sign-in to access your account
              </p>

              {error && <p className="mb-4 text-red-500">{error}</p>}

              <form id="" className="mb-4" onSubmit={handleLogin}>
                <div className="mb-4">
                  <label
                    htmlFor="email"
                    className="mb-2 inline-block text-xs font-medium uppercase text-gray-700"
                  >
                    Email or Username
                  </label>
                  <input
                    type="text"
                    className="block w-full cursor-text appearance-none rounded-md border border-gray-400 bg--100 py-2 px-3 text-sm outline-none focus:border-indigo-500 focus:bg-white focus:text-gray-600 focus:shadow"
                    id="email"
                    name="email-username"
                    placeholder="Enter your email or username"
                    autoFocus=""
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
                <div className="mb-4">
                  <div className="flex justify-between">
                    <label
                      className="mb-2 inline-block text-xs font-medium uppercase text-gray-700"
                      htmlFor="password"
                    >
                      Password
                    </label>
                    <a
                      href="auth-forgot-password-basic.html"
                      className="cursor-pointer text-indigo-500 no-underline hover:text-indigo-500"
                    >
                      <small>Forgot Password?</small>
                    </a>
                  </div>
                  <div className="relative flex w-full flex-wrap items-stretch">
                    <input
                      type="password"
                      id="password"
                      className="relative block flex-auto cursor-text appearance-none rounded-md border border-gray-400 bg--100 py-2 px-3 text-sm outline-none focus:border-indigo-500 focus:bg-white focus:text-gray-600 focus:shadow"
                      name="password"
                      placeholder="············"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                    />
                  </div>
                </div>

                <div className="mb-4">
                  <button
                    className="grid w-full cursor-pointer select-none rounded-md border border-indigo-500 bg-indigo-500 py-2 px-5 text-center align-middle text-sm text-white shadow hover:border-indigo-600 hover:bg-indigo-600 hover:text-white focus:border-indigo-600 focus:bg-indigo-600 focus:text-white focus:shadow-none"
                    type="submit"
                  >
                    Login
                  </button>
                </div>
              </form>

              <p className="mb-4 text-center">
                New on Pulse?
                <a
                  href="/signup"
                  className="cursor-pointer text-indigo-500 no-underline hover:text-indigo-500"
                >
                  Create an account
                </a>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
