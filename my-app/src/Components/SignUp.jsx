import React, { useState } from "react";
import "./signup.css";
import logo from "../assets/user-logo.jpg";
import RxAvatar from "react-avatar";

export default function Example() {
  const [showPassword, setShowPassword] = useState(false);
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [avatar, setAvatar] = useState(null);

  const togglePasswordVisibility = () => {
    setShowPassword((prevState) => !prevState);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setErrorMessage("Passwords do not match!");
    }
  };

  return (
    <div className="whole-thing">
        <div className="container">
      {/* Burl texture placed here */}
      <div className="burl"></div>

      <div className="logo-container">
        <img alt="Your Company" src={logo} className="logo" />
        <h2 className="title">Create your account</h2>
      </div>

      <div className="form-container">
        <form className="form" onSubmit={handleSubmit}>
          <div className="name">
            <label htmlFor="username" className="label">
              Name
            </label>
            <input id="username" name="username" type="text" required className="input" />
          </div>
          <div className="form-group">
            <label htmlFor="email" className="label">
              Email address
            </label>
            <input id="email" name="email" type="email" required className="input" />
          </div>

          <div className="form-group">
            <label htmlFor="password" className="label">
              Password
            </label>
            <div className="password-container">
              <input
                id="password"
                name="password"
                type={showPassword ? "text" : "password"}
                required
                className="input"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <button
                type="button"
                onClick={togglePasswordVisibility}
                className="toggle-password"
              >
                {showPassword ? (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="h-5 w-5"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M3.98 8.466C4.955 7.364 7.276 5.25 12 5.25c4.723 0 7.045 2.114 8.02 3.216a3.984 3.984 0 01.89 2.284c0 .88-.324 1.696-.89 2.284-.975 1.102-3.297 3.216-8.02 3.216-4.723 0-7.045-2.114-8.02-3.216a3.984 3.984 0 01-.89-2.284c0-.88.324-1.696.89-2.284z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                  </svg>
                ) : (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="h-5 w-5"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M3.98 8.466C4.955 7.364 7.276 5.25 12 5.25c4.723 0 7.045 2.114 8.02 3.216a3.984 3.984 0 01.89 2.284c0 .88-.324 1.696-.89 2.284-.975 1.102-3.297 3.216-8.02 3.216-4.723 0-7.045-2.114-8.02-3.216a3.984 3.984 0 01-.89-2.284c0-.88.324-1.696.89-2.284z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                    <line
                      x1="4.5"
                      y1="4.5"
                      x2="19.5"
                      y2="19.5"
                      stroke="currentColor"
                      strokeWidth="1.5"
                    />
                  </svg>
                )}
              </button>
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="confirm-password" className="label">
              Confirm password
            </label>
            {/* Error Message */}
            {errorMessage && <p className="error-message">{errorMessage}</p>}
            <div className="password-container">
              <input
                id="confirm-password"
                name="confirm-password"
                type={showPassword ? "text" : "password"}
                required
                className="input"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
            </div>
          </div>

          <div className="avatar-upload">
            <label htmlFor="avatar" className="block text-sm font-medium leading-6 text-white">
            </label>
            <div className="mt-2 flex items-center">
              <span className="inline-block h-8 w-8 rounded-full overflow-hidden">
                {avatar ? (
                  <img src={URL.createObjectURL(avatar)} alt="avatar" className="h-full w-full object-cover rounded-full" />
                ) : (
                  <RxAvatar className="h-8 w-8" />
                )}
              </span>
              <label htmlFor="file-input" className="ml-5 flex items-center px-4 py-2 border border-gray-300 rounded-md text-sm text-gray-700 bg-white">
                Upload a file
              </label>
              <input
                type="file"
                name="avatar"
                id="file-input"
                accept=".jpg,.jpeg,.png"
                className="sr-only"
                onChange={(e) => setAvatar(e.target.files[0])}
              />
            </div>
          </div>

          <button type="submit" className="submit-btn">
            Create Account
          </button>
        </form>
      </div>
    </div>
    </div>
    
  );
}
