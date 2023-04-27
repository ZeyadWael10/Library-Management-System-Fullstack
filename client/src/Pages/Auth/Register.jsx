import axios from 'axios';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useUserContext } from '../../context/userContext';

const Register = () => {
    const { registerUser } = useUserContext();
    const [user, setUser] = useState({
        name: '',
        email: '',
        password: '',
        age: 0,
        isAdmin: false,
    });

    const navigate = useNavigate();

    // Handle form
    const handleChange = (event) => {
        setUser({
            ...user,
            [event.target.name]: event.target.value,
        });
    };
    const handleSubmit = async (event) => {
        event.preventDefault();

        const data = await registerUser(user);

        if (data.User) {
            navigate('/login');
        }
    };

    return (
        <form className="login-form" onSubmit={handleSubmit}>
            <h2 className="my-4">Register</h2>

            {/* <!-- name input --> */}
            <div className="form-outline mb-3">
                <label className="form-label" htmlFor="name">
                    Name
                </label>
                <input
                    onChange={handleChange}
                    type="text"
                    id="name"
                    name="name"
                    className="form-control"
                />
            </div>

            {/* <!-- Email input --> */}
            <div className="form-outline mb-3">
                <label className="form-label" htmlFor="email">
                    Email address
                </label>
                <input
                    onChange={handleChange}
                    type="email"
                    name="email"
                    id="email"
                    className="form-control"
                />
            </div>

            {/* <!-- Password input --> */}
            <div className="form-outline mb-3">
                <label className="form-label" htmlFor="password">
                    Password
                </label>
                <input
                    onChange={handleChange}
                    type="password"
                    name="password"
                    id="password"
                    className="form-control"
                />
            </div>

            {/* <!-- Password input --> */}
            <div className="form-outline mb-3">
                <label className="form-label" htmlFor="form2Example2">
                    Age
                </label>
                <input
                    onChange={handleChange}
                    type="text"
                    name="age"
                    id="form2Example2"
                    className="form-control"
                />
            </div>

            {/* <!-- Submit button --> */}
            <button className="btn btn-primary btn-block mb-4">Register</button>

            {/* <!-- Register buttons --> */}
            <div className="text-center">
                <p>
                    Already a member? <Link to="/login">Login</Link>
                </p>
            </div>
        </form>
    );
};

export default Register;
