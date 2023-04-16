import axios from 'axios';
import jwt_decode from 'jwt-decode';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Login = () => {
    const navigate = useNavigate();
    const [user, setUser] = useState({
        email: '',
        password: '',
    });

    // Register user
    const loginUser = async (e) => {
        const { data } = await axios.post(
            'http://localhost:3000/api/v1/user/login',
            user
        );
        return data;
    };

    // Handle form
    const handleChange = (event) => {
        setUser({
            ...user,
            [event.target.name]: event.target.value,
        });
    };
    const handleSubmit = async (event) => {
        event.preventDefault();

        const { message, Token } = await loginUser();

        if (message === 'Login Success') {
            localStorage.setItem('token', Token);
            const decoded = jwt_decode(Token);

            localStorage.setItem('user', JSON.stringify(decoded));
        }
    };
    return (
        <form className="login-form" onSubmit={handleSubmit}>
            <h2 className="my-4">Login</h2>
            {/* <!-- Email input --> */}
            <div className="form-outline mb-4">
                <label className="form-label" htmlFor="form2Example1">
                    Email address
                </label>
                <input
                    onChange={handleChange}
                    type="email"
                    name="email"
                    id="form2Example1"
                    className="form-control"
                />
            </div>

            {/* <!-- Password input --> */}
            <div className="form-outline mb-4">
                <label className="form-label" htmlFor="form2Example2">
                    Password
                </label>
                <input
                    onChange={handleChange}
                    type="password"
                    name="password"
                    id="form2Example2"
                    className="form-control"
                />
            </div>

            {/* <!-- Submit button --> */}
            <button className="btn btn-primary btn-block mb-4">Login</button>

            {/* <!-- Register buttons --> */}
            <div className="text-center">
                <p>
                    Not a member? <Link to="/register">Register</Link>
                </p>
            </div>
        </form>
    );
};

export default Login;
