import axios from "axios";
import { useState } from "react";

const UpdatePassword = () => {
  const [inputsData, setInputsData] = useState({
    password: "",
    confirmPassword: 0,
  });

  const token = localStorage.getItem("token");

  const newPassword = async () => {
    const { data } = await axios.patch(
      "http://localhost:3000/api/v1/user/updatepassword",
      inputsData,
      {
        headers: {
          Authorization: `LBMS__${token}`,
        },
      }
    );

    console.log(data);
  };

  const handleChange = (event) => {
    setInputsData({
      ...inputsData,
      [event.target.name]: event.target.value,
    });
  };
  const handleSubmit = async (event) => {
    event.preventDefault();

    // const data = await registerUser(user);

    newPassword();

    // console.log(user);
  };
  return (
    <div className="py-4">
      <h3>Update Password </h3>

      <form onSubmit={handleSubmit} className="w-75 mt-4">
        <div className="form-outline mb-2">
          <label className="form-label mb-1" htmlFor="name">
            Password
          </label>
          <input
            onChange={handleChange}
            type="text"
            id="name"
            name="password"
            className="form-control"
          />
        </div>

        <div className="form-outline mb-3">
          <label className="form-label mb-1" htmlFor="form2Example2">
            Confirm password
          </label>
          <input
            onChange={handleChange}
            type="text"
            name="confirmPassword"
            id="form2Example2"
            className="form-control"
          />
        </div>
        <button className="btn btn-primary btn-block mt-1">Update</button>
      </form>
    </div>
  );
};

export default UpdatePassword;
