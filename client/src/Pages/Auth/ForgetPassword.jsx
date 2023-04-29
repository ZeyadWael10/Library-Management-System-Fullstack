import axios from "axios";
import { useState } from "react";

const ForgetPassword = () => {
  const [resetPassword, setResetPassword] = useState({
    password: "",
    resetCode: "",
    email: localStorage.getItem("forgetpassword"),
  });

  const sendResetPassword = async () => {
    const { data } = await axios.post(
      `http://localhost:3000/api/v1/user/resetpassword`,
      { ...resetPassword }
    );

    console.log(data);
    console.log(resetPassword);
  };

  const handleChange = (event) => {
    setResetPassword({
      ...resetPassword,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(resetPassword);
    sendResetPassword();
  };

  return (
    <div className="container py-4">
      <h3>Forget password</h3>

      <p>
        Please check your email for a message with your code. Your code is 6
        numbers long.
      </p>

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          className="form-control w-75 mt-4 mb-2"
          placeholder="enter your code here..."
          onChange={handleChange}
          name="resetCode"
          value={resetPassword.resetCode}
        />
        <input
          type="text"
          className="form-control w-75 my-2 "
          placeholder="new password ..."
          name="password"
          onChange={handleChange}
          value={resetPassword.password}
          disabled={resetPassword.resetCode.length !== 6}
        />

        <button className="btn btn-primary">Reset Password</button>
      </form>
    </div>
  );
};

export default ForgetPassword;
