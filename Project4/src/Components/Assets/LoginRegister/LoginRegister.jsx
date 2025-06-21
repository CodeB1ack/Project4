import React, { useState } from "react";
import "./LoginRegister.css";
import { FaUser, FaLock, FaEnvelope  } from "react-icons/fa";
import axios from 'axios';


const LoginRegister = () => {

    const [action , setAction] = useState("");
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isRegister, setIsRegister] = useState(false); // Toggle between login and register
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(null);


    const registerLink = () => {
        setAction(' active');
    };

    const loginLink = () => {
        setAction(``);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null);
        setSuccess(null);

        try {
            const endpoint = isRegister
                ? 'http://localhost:3306/api/register'
                : 'http://localhost:3306/api/login';

            const response = await axios.post(endpoint, { email, password });

            if (isRegister) {
                setSuccess(response.data.message); // Registration success message
            } else {
                const { token } = response.data;
                localStorage.setItem('authToken', token); // Store token for authentication
                setSuccess('Login successful!');
            }
        } catch (err) {
            setError(err.response?.data?.message || 'Something went wrong.');
        }
    };

    return (
        <div className={`wrapper${action}`}>
            <div className="form-box login">
            {error && <p style={{ color: 'red' }}>{error}</p>}
            {success && <p style={{ color: 'green' }}>{success}</p>}
                <form action="" onSubmit={handleSubmit}>
                    <h1>{isRegister ? 'Register' : 'Login'}</h1>
                    <div className="input-box">
                        <input type="text" placeholder="Username" required/>
                        <FaUser className="icon" />
                    </div>
                    <div className="input-box">
                        <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required/>
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
                        <p>Don't have an account? <a href="#" onClick={registerLink}>Register</a></p>
                    </div>
                </form>
            </div>

            <div className="form-box register">
                <form action="" onSubmit={handleSubmit}>
                    <h1>{isRegister ? 'Login' : 'Register'}</h1>
                    <div className="input-box">
                        <input type="text" placeholder="Username" required/>
                        <FaUser className="icon" />
                    </div>
                    <div className="input-box">
                        <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required/>
                        <FaEnvelope className="icon" />
                    </div>
                    <div className="input-box">
                        <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required/>
                        <FaLock className="icon"/>
                    </div>
                    <div className="remember-forgot">
                        <label>
                            <input type="checkbox" />
                            I agree to the Terms & Conditions
                        </label>
                    </div>
                    <button type="submit" className="btn" >{isRegister ? 'Login' : 'Register'}</button>
                    <div className="register-link"> 
                        <p>Already have an account? <a href="#" onClick={loginLink}>Login</a></p>
                    </div>
                </form>
            </div>
        </div>
    );
}
export default LoginRegister;