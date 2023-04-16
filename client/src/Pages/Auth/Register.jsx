import axios from 'axios';
import { useState } from 'react';
import { Link } from 'react-router-dom';

const Register = () => {
    const [user, setUser] = useState({
        name: '',
        email: '',
        password: '',
        age: 0,
    });

    // Register user
    const registerUser = async (e) => {
        const { data } = await axios.post(
            'http://localhost:3000/api/v1/user/signup',
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

        const data = await registerUser();
    };

    return (
        <form className="login-form" onSubmit={handleSubmit}>
            <h2 className="my-4">Register</h2>

            {/* <!-- name input --> */}
            <div className="form-outline mb-3">
                <label className="form-label" htmlFor="form2Example2">
                    Name
                </label>
                <input
                    onChange={handleChange}
                    type="text"
                    id="form2Example2"
                    name="name"
                    className="form-control"
                />
            </div>

            {/* <!-- Email input --> */}
            <div className="form-outline mb-3">
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
            <div className="form-outline mb-3">
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
