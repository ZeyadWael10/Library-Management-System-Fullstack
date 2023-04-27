import { NavLink, useNavigate } from 'react-router-dom';
import { useUserContext } from '../context/userContext';

const Navbar = () => {
    const { isLoggedIn, logout } = useUserContext();
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();

        navigate('/login');
    };

    return (
        <>
            <nav className="navbar navbar-expand-lg custom_nav-container">
                <NavLink className="navbar-brand" to="">
                    <span> Bostorek </span>
                </NavLink>

                <button
                    className="navbar-toggler"
                    type="button"
                    data-toggle="collapse"
                    data-target="#navbarSupportedContent"
                    aria-controls="navbarSupportedContent"
                    aria-expanded="false"
                    aria-label="Toggle navigation"
                >
                    <span className=""> </span>
                </button>

                <div
                    className="collapse navbar-collapse"
                    id="navbarSupportedContent"
                >
                    <ul className="navbar-nav">
                        {isLoggedIn ? (
                            <>
                                <li className="nav-item">
                                    <NavLink className="nav-link" to="">
                                        Home
                                    </NavLink>
                                </li>
                                <li className="nav-item">
                                    <NavLink className="nav-link" to="products">
                                        Books
                                    </NavLink>
                                </li>
                                <li className="nav-item">
                                    <NavLink className="nav-link" to="profile">
                                        Profile
                                    </NavLink>
                                </li>
                                <li className="nav-item">
                                    <a
                                        className="nav-link text-danger"
                                        style={{ cursor: 'pointer' }}
                                        onClick={handleLogout}
                                    >
                                        Logout
                                    </a>
                                </li>
                            </>
                        ) : (
                            <>
                                <li className="nav-item">
                                    <NavLink className="nav-link" to="login">
                                        Login
                                    </NavLink>
                                </li>
                                <li className="nav-item">
                                    <NavLink className="nav-link" to="register">
                                        Register
                                    </NavLink>
                                </li>
                            </>
                        )}
                    </ul>
                </div>
            </nav>
        </>
    );
};

export default Navbar;
