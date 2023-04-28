import { NavLink, Outlet } from "react-router-dom";

const ProfileLayout = () => {
  return (
    <div className="container">
      <div className="d-flex ">
        <nav className="me-5 mt-3">
          <ul className="nav profile flex-column">
            <li className="nav-item ">
              <NavLink
                to="/profile"
                end
                className="nav-link rounded-0 py-2 px-5 mb-1"
              >
                Profile
              </NavLink>
            </li>
            <li className="nav-item my-0">
              <NavLink
                to="/profile/update-account"
                className="nav-link  py-2 px-5 rounded-0"
              >
                Update Account
              </NavLink>
            </li>
            <li className="nav-item my-0">
              <NavLink
                to="/profile/new-password"
                className="nav-link rounded-0 py-2 px-5"
              >
                Update Password
              </NavLink>
            </li>
          </ul>
        </nav>

        <div className="layout flex-grow-1">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default ProfileLayout;
