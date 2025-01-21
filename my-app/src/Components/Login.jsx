import { useState } from "react";
import "./Login.css";

export default function Example() {
    const [showPassword, setShowPassword] = useState(false);

    return (
      <>
        <div className="container">
          <div className="header">
            <img
              alt="Your Company"
              src="https://tailwindui.com/plus/img/logos/mark.svg?color=indigo&shade=600"
              className="logo"
            />
            <h2 className="title">Sign in to your account</h2>
          </div>

          <div className="form-container">
            <form className="form" action="#" method="POST">
              <div className="form-group">
                <label htmlFor="email" className="label">
                  Email address
                </label>
                <div className="input-container">
                  <input
                    id="email"
                    name="email"
                    type="email"
                    required
                    className="input"
                  />
                </div>
              </div>

              <div className="form-group">
                <label htmlFor="password" className="label">
                  Password
                </label>
                <div className="input-container relative">
                  <input
                    id="password"
                    name="password"
                    type={showPassword ? "text" : "password"}
                    required
                    className="input"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="password-toggle"
                  >
                    {showPassword ? (
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                        className="icon"
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
                        className="icon"
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
                        <line x1="4.5" y1="4.5" x2="19.5" y2="19.5" stroke="currentColor" strokeWidth="1.5" />
                      </svg>
                    )}
                  </button>
                </div>
              </div>

              <div className="actions">
                <div className="remember-me">
                  <input
                    id="remember-me"
                    name="remember-me"
                    type="checkbox"
                    className="checkbox"
                  />
                  <label htmlFor="remember-me" className="checkbox-label">
                    Remember me
                  </label>
                </div>

                <div className="forgot-password">
                  <a href="#" className="forgot-link">
                    Forgot password?
                  </a>
                </div>
              </div>

              <div>
                <button type="submit" className="submit-button">
                  Sign in
                </button>
              </div>
            </form>
          </div>
        </div>
      </>
    );
}
