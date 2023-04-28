import axios from "axios";
import { useState } from "react";

const UpdateAccount = () => {
  const [user, setUser] = useState({
    name: "",
    age: 0,
  });

  const token = localStorage.getItem("token");

  const updateUser = async () => {
    const { data } = await axios.put(
      `http://localhost:3000/api/v1/user/update`,
      user,
      {
        headers: {
          Authorization: `LBMS__${token}`,
        },
      }
    );

    console.log(data);
  };

  const handleChange = (event) => {
    setUser({
      ...user,
      [event.target.name]: event.target.value,
    });
  };
  const handleSubmit = async (event) => {
    event.preventDefault();

    // const data = await registerUser(user);

    updateUser();

    // console.log(user);
  };
  return (
    <div className="py-4">
      <h3>Update data </h3>

      <form onSubmit={handleSubmit} className="w-75 mt-4">
        <div className="form-outline mb-2">
          <label className="form-label mb-1" htmlFor="name">
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

        <div className="form-outline mb-3">
          <label className="form-label mb-1" htmlFor="form2Example2">
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
        <button className="btn btn-primary btn-block mt-1">Update</button>
      </form>
    </div>
  );
};

export default UpdateAccount;
