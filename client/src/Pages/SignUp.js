import React, { useState } from "react";
import { registerUser, loginUser } from "../services/service";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import { AuthState } from "../Context/AuthProvider";

export default function SignUp() {
  const history = useHistory();
  const { setUser } = AuthState();

  const [formData, setFormData] = useState({
    fullname: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSignup = async (e) => {
    e.preventDefault();
    try {
      const response = await registerUser(
        formData.fullname,
        formData.email,
        formData.password
      );
      const userData = await loginUser(formData.email, formData.password);
      localStorage.setItem("userInfo", JSON.stringify(userData));
      setUser(userData);
      history.push("/chat");
    } catch (error) {
      console.error(error);
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
                  <span className="flex-shrink-0 text-3xl font-black lowercase tracking-tight opacity-100">
                    Futurism.
                  </span>
                </a>
              </div>

              <h4 className="mb-2 font-medium text-gray-700 xl:text-xl">
                Welcome to futurism!
              </h4>
              <p className="mb-6 text-gray-500">Please sign-up to register</p>
              <form id="" className="mb-4" onSubmit={handleSignup}>
                <div className="mb-4">
                  <div className="flex justify-start items-start">
                    <label
                      className="mb-2 inline-block text-xs font-medium uppercase text-gray-700"
                      htmlFor="fullname"
                    >
                      Full Name
                    </label>
                  </div>

                  <div className="relative flex w-full flex-wrap items-stretch">
                    <input
                      type="text"
                      id="fullname"
                      className="relative block flex-auto cursor-text appearance-none rounded-md border border-gray-400 bg--100 py-2 px-3 text-sm outline-none focus:border-indigo-500 focus:bg-white focus:text-gray-600 focus:shadow"
                      name="fullname"
                      placeholder="e.g. Abhishek Padhi"
                      value={formData.fullname}
                      onChange={handleChange}
                    />
                  </div>
                </div>

                <div className="mb-4">
                  <div className="flex justify-start items-start">
                    <label
                      className="mb-2 inline-block text-xs font-medium uppercase text-gray-700"
                      htmlFor="email"
                    >
                      Email
                    </label>
                  </div>

                  <div className="relative flex w-full flex-wrap items-stretch">
                    <input
                      type="email"
                      className="block w-full cursor-text appearance-none rounded-md border border-gray-400 bg--100 py-2 px-3 text-sm outline-none focus:border-indigo-500 focus:bg-white focus:text-gray-600 focus:shadow"
                      id="email"
                      name="email"
                      placeholder="eg. abhishekpadhi69@gmail.com"
                      autoFocus=""
                      value={formData.email}
                      onChange={handleChange}
                    />
                  </div>
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
                      value={formData.password}
                      onChange={handleChange}
                    />
                  </div>
                </div>
                <div className="mb-4">
                  <div className="block">
                    <input
                      className="mt-1 mr-2 h-5 w-5 appearance-none rounded border border-gray-300 bg-contain bg-no-repeat align-top text-black shadow checked:bg-indigo-500 focus:border-indigo-500 focus:shadow"
                      type="checkbox"
                      id="remember-me"
                      defaultChecked
                    />
                    <label className="inline-block" htmlFor="remember-me">
                      Remember Me
                    </label>
                  </div>
                </div>
                <div className="mb-4">
                  <button
                    className="grid w-full cursor-pointer select-none rounded-md border border-indigo-500 bg-indigo-500 py-2 px-5 text-center align-middle text-sm text-white shadow hover:border-indigo-600 hover:bg-indigo-600 hover:text-white focus:border-indigo-600 focus:bg-indigo-600 focus:text-white focus:shadow-none"
                    type="submit"
                  >
                    Sign Up
                  </button>
                </div>
              </form>

              <p className="mb-4 text-center">
                Already have an account?
                <a
                  href="/login"
                  className="cursor-pointer text-indigo-500 no-underline hover:text-indigo-500"
                >
                  Login
                </a>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
