import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const GetEmail = () => {
  const [email, setEmial] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setEmial(e.target.value);
  };

  const sendResetCode = async () => {
    const { data } = await axios.post(
      `http://localhost:3000/api/v1/user/forgetpassword`,
      { email }
    );

    if (data.message === "Password reset email sent") {
      localStorage.setItem("forgetpassword", email);

      return navigate("/forget-password");
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(email);

    sendResetCode();
  };
  return (
    <div className="container py-4">
      <h3>Forget password</h3>

      <p>Please enter your email</p>

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          className="form-control w-75 mt-4 mb-2"
          placeholder="Email"
          onChange={handleChange}
        />

        <button className="btn btn-primary">Continue</button>
      </form>
    </div>
  );
};

export default GetEmail;
