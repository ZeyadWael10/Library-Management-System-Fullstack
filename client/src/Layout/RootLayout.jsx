import { Outlet } from 'react-router-dom';
import Navbar from './Navbar';

const RootLayout = () => {
    return (
        <>
            <header className="header_section fixed-top">
                <div className="container">
                    <Navbar />
                </div>
            </header>
            <div className="main-wrapper">
                <Outlet />
            </div>
        </>
    );
};

export default RootLayout;
