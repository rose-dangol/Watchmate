import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Navbar from '../../component/Navbar/Navbar';
// import './Login.css';

const Login = () => {
  const [mode, setMode] = useState('login');
  const [loginData, setLoginData] = useState({ identifier: '', password: '' });
  const [signupData, setSignupData] = useState({ fullName: '', username: '', email: '', password: '' });

  const handleLoginChange = (e) => {
    setLoginData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSignupChange = (e) => {
    setSignupData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const submitLogin = (e) => {
    e.preventDefault();
    console.log('Login submit', loginData);
    
  };

  const submitSignup = (e) => {
    e.preventDefault();
    console.log('Signup submit', signupData);
    alert(`Signing up ${signupData.fullName} (${signupData.username})`);
  };

  return (
    <>
      <Navbar/>
      <div className="form-container">
        <div className="form-box">
          <div className="form-headings">
            <h2 className="form-headings1">
              {mode === 'login' ? 'Welcome back' : 'Create an account'}
            </h2>
            <div className="form-headings2">
              {mode === 'login'
                ? "Don't have an account?"
                : 'Already have an account?'}
            </div>
          </div>

          <div className="toggle-btns">
            <button
              className={mode === 'login' ? 'toggle-active' : 'toggle-inactive'}
              onClick={() => setMode('login')}
            >
              Login
            </button>
            <button
              className={mode === 'signup' ? 'toggle-active' : 'toggle-inactive'}
              onClick={() => setMode('signup')}
            >
              Signup
            </button>
          </div>

          <motion.div
            key={mode}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.18 }}
          >
            {mode === 'login' ? (
              <form onSubmit={submitLogin}>
                <label>
                  <div className="form-labels">Username</div>
                  <input
                    name="identifier"
                    value={loginData.identifier}
                    onChange={handleLoginChange}
                    required
                    placeholder="username"
                  />
                </label>

                <label>
                  <div className="form-labels">Password</div>
                  <input
                    name="password"
                    value={loginData.password}
                    onChange={handleLoginChange}
                    required
                    type="password"
                    placeholder="password"
                  />
                </label>

                <button type="submit">Login</button>
              </form>
            ) : (
              <form onSubmit={submitSignup}>
                <label>
                  <div className="form-labels">Full name</div>
                  <input
                    name="fullName"
                    value={signupData.fullName}
                    onChange={handleSignupChange}
                    required
                    placeholder="Your Fullname"
                  />
                </label>

                <label>
                  <div className="form-labels">Username</div>
                  <input
                    name="username"
                    value={signupData.username}
                    onChange={handleSignupChange}
                    required
                    placeholder="Your Username"
                  />
                </label>

                <label>
                  <div className="form-labels">Email</div>
                  <input
                    name="email"
                    value={signupData.email}
                    onChange={handleSignupChange}
                    required
                    type="email"
                    placeholder="Your Email"
                  />
                </label>

                <label>
                  <div className="form-labels">Password</div>
                  <input
                    name="password"
                    value={signupData.password}
                    onChange={handleSignupChange}
                    required
                    type="password"
                    placeholder="Choose a password"
                  />
                </label>

                <button type="submit">Create account</button>
              </form>
            )}
          </motion.div>
        </div>
      </div>
    </>
  );
};

export default Login;
