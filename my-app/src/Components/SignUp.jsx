import React, { useState } from "react";
import "./signup.css";
import logo from "../assets/image.png";
import Avatar from "react-avatar";

export default function Signup() {
  const [showPassword, setShowPassword] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
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
      return;
    }
    // Handle sign-up logic here
    console.log({ name, email, password, avatar });
  };

  return (
    <div className="whole-thing">
      <div className="container">
        <div className="burl"></div>

        <div className="logo-container">
          <img alt="Your Company" src={logo} className="logo" />
          <h2 className="title">Create your account</h2>
        </div>

        <div className="form-container">
          <form className="form" onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="name" className="label">Name</label>
              <input
                id="name"
                type="text"
                required
                className="input"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div className="form-group">
              <label htmlFor="email" className="label">Email address</label>
              <input
                id="email"
                type="email"
                required
                className="input"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div className="form-group">
              <label htmlFor="password" className="label">Password</label>
              <div className="password-container">
                <input
                  id="password"
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
                  {showPassword ? "🙈" : "👁️"}
                </button>
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="confirm-password" className="label">Confirm Password</label>
              {errorMessage && <p className="error-message">{errorMessage}</p>}
              <input
                id="confirm-password"
                type={showPassword ? "text" : "password"}
                required
                className="input"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
            </div>

            <div className="avatar-upload">
              <label htmlFor="file-input" className="block text-sm font-medium leading-6 text-white">
                Upload Avatar
              </label>
              <div className="mt-2 flex items-center">
                <span className="inline-block h-8 w-8 rounded-full overflow-hidden">
                  {avatar ? (
                    <img src={URL.createObjectURL(avatar)} alt="avatar" className="h-full w-full object-cover rounded-full" />
                  ) : (
                    <Avatar className="h-8 w-8" />
                  )}
                </span>
                <label htmlFor="file-input" className="ml-5 flex items-center px-4 py-2 border border-gray-300 rounded-md text-sm text-gray-700 bg-white cursor-pointer">
                  Choose File
                </label>
                <input
                  type="file"
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