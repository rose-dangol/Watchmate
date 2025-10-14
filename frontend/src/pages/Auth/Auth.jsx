import {React, useState, } from "react";
import Navbar from "../../component/Navbar/Navbar";
import "./Auth.css";
import { registerUser } from "../../services/auth";
import { loginUser } from "../../services/auth";
 import { useNavigate } from 'react-router-dom';

const Auth = () => {
  const [mode, setMode] = useState("login");
  const [registerFormData,setRegisterFormData] = useState({username:"",email:"",password:"",confirm_password:""})
  const [loginFormData,setLoginFormData] = useState({username:"",password:""})
  const navigate = useNavigate();

  const handleChange = (e) => {
    const {name, value} = e.target;
    console.log("name",name);
    console.log("value", value);
    if (mode ==='register'){
      setRegisterFormData((prev)=>{
        const updatedData = {...prev,[name]:value}
        return updatedData
      });
    }
    else{
      setLoginFormData((prev)=>{
        const updatedData = {...prev,[name]:value}
        return updatedData
      });
    }
  };
  const handleRegister= async(e)=>{
    e.preventDefault();
    console.log("register vaingg")
    await registerUser(registerFormData)
  }
  const handleLogin = async(e)=>{
    e.preventDefault();
    console.log(loginFormData)
    console.log("Login hit")
    await loginUser(loginFormData)
    navigate('/browse');

  }
  return (
    <>
      <Navbar />
      <div className="form-container">
        <div className="form-box">
          <div className="form-headings">
            <span className="form-heading1">
              {mode === "login" ? "Welcome Back" : "Create an account"}
            </span>
            <span className="form-heading2">
              {mode === "login"
                ? `Don't have an account?`
                : "Already have an account?"}
            </span>
          </div>

          <div className="toggle-btns">
            <button onClick={() => setMode("login")} className={mode=='login'? 'toggle-active':'toggle-inactive'}>Login</button>
            <button onClick={() => setMode("register")}  className={mode=='register'? 'toggle-active':'toggle-inactive'}>Signup</button>
          </div>
          {mode === "login" ? (
            <form onSubmit={handleLogin}>
              <div className="form-inputs">
                <label>Username</label>
                <input type="text" placeholder="Username" onChange={handleChange} name="username"/>
              </div>
              <div className="form-inputs">
                <label>Password</label>
                <input type="password" placeholder="Password" onChange={handleChange} name="password"/>
              </div>
              <button className={mode}>Login</button>
            </form>
          ) : (
              <form onSubmit={handleRegister}>
                {/* <div className="form-inputs">
                  <label>Fullname</label>
                  <input type="text" placeholder="Username" name='fullname' onChange={handleChange}/>
                </div> */}
                <div className="form-inputs">
                  <label>Username</label>
                  <input type="text" placeholder="Username" name='username' onChange={handleChange}/>
                </div>
                <div className="form-inputs">
                  <label>Email</label>
                  <input type="text" placeholder="Email Address" name='email'onChange={handleChange}/>
                </div>
                <div className="form-inputs">
                  <label>Password</label>
                  <input type="password" placeholder="Pasword" name='password'onChange={handleChange}/>
                </div>
                <div className="form-inputs">
                  <label>Confirm Password</label>
                  <input type="password" placeholder="Confirm Password" name='confirm_password'onChange={handleChange}/>
                </div>
                <button className={mode}>Sign Up</button>
              </form>
             )}
        </div>
      </div>
    </>
  );
};

export default Auth;
