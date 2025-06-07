import React from "react";
import "./LoginRegister.css";
import { FaUser, FaLock  } from "react-icons/fa";

const LoginRegister = () => {
    return (
        <div className="wrapper">
            <div className="form-box login">
                <form action="">
                    <h1>Login</h1>
                    <div className="input-box">
                        <input type="text" placeholder="Username" required/>
                        <FaUser className="icon" />
                    </div>
                    <div className="input-box">
                        <input type="password" placeholder="Password" required/>
                        <FaLock className="icon"/>
                    </div>
                    <div className="remember-forgot">
                        <label>
                            <input type="checkbox" />
                            Remember me
                        </label>
                        <a href="#">Forgot Password?</a>
                    </div>
                    <button type="submit" className="btn">Login</button>
                    <div className="register-link"> 
                        <p>Don't have an account?</p> <a href="#">Register</a>
                    </div>
                </form>
            </div>
        </div>
    );
}
export default LoginRegister;