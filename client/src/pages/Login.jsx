import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "./axiosConfig";
import { AuthContext } from "../context/authContext.jsx";
const Login =() => {

    const [inputs, setInputs] = useState({
        username: "",
        password: "",
    });

    const [err, setError] = useState(null);
    const navigate =useNavigate();
    const {login} = useContext(AuthContext);
    const handleChange = (e) => {
        setInputs((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    };


    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await login(inputs);
            navigate("/");
        } catch (err) {
            setError(err.response.data);
        }
    };

    return (
        <div className="auth">
            <h1>Login</h1>
            <form>
                <input required type="text" placeholder="username" name="username" onChange={handleChange} autoComplete="username"/>
                <input required type="password" placeholder="password" name="password" onChange={handleChange} autoComplete="username"/>
                <button onClick={handleSubmit}>Login</button>
                {err&&<p>{err}</p>}
                <span>
                    Don't have an account? <Link to="/register">Register</Link>
                </span>
            </form>
        </div>
    )
}

export default Login