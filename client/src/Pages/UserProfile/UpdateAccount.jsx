import axios from "axios";
import { useState } from "react";
import { successNotification } from "../../tostify";
import { useUserContext } from "../../context/userContext";

const UpdateAccount = () => {
  const [user, setUser] = useState({
    name: "",
    age: "",
  });
  const { saveUserToLocalStorage } = useUserContext();

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
    if (data.message === "Account Updated Successfully") {
      successNotification(data.message);
      saveUserToLocalStorage(data.Updateddata);
      const resetInputs = {
        name: "",
        age: "",
      };
      setUser(resetInputs);
    }
  };

  const handleChange = (event) => {
    setUser({
      ...user,
      [event.target.name]: event.target.value,
    });
  };
  const handleSubmit = async (event) => {
    event.preventDefault();

    updateUser();
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
            value={user.name}
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
            value={user.age}
          />
        </div>
        <button className="btn btn-primary btn-block mt-1">Update</button>
      </form>
    </div>
  );
};

export default UpdateAccount;
