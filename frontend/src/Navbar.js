import { Link } from "react-router-dom";
import useTokenStore from "./token";
import React, { useState } from "react";

export default function Navbar() {
    const { username, role } = useTokenStore();
    const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);

    const handleNavbarLinkClick = () => {
        setMobileMenuOpen(false);
    };

    const handleToggleMenu = () => {
        setMobileMenuOpen(!isMobileMenuOpen);
    };

    return (
        <nav className={`navbar sticky-top fixed-top navbar-expand-lg navbar-dark bg-dark navbarOne ${isMobileMenuOpen ? 'navbar-open' : ''}`}>
            <div className="mainLogo">
                <Link to="/" className="navbar-brand" href="#">Quasar</Link>
            </div>
            <button
                className="navbar-toggler"
                type="button"
                onClick={handleToggleMenu}
            >
                <span className="navbar-toggler-icon"></span>
            </button>

            <div className={`collapse navbar-collapse containers ${isMobileMenuOpen ? 'show' : ''}`} id="navbarSupportedContent">
                <ul className="navbar-nav ms-auto me-3">
                    <li className="nav-item nav-item-mainNavbar about">
                        <Link to="/" className="nav-link" onClick={handleNavbarLinkClick}>
                            Home
                        </Link>
                    </li>
                    <li className="nav-item nav-item-mainNavbar games">
                        <Link to="/games" className="nav-link" onClick={handleNavbarLinkClick}>
                            Games
                        </Link>
                    </li>
                    {role === "Administrator" && (
                        <li className="nav-item nav-item-mainNavbar admin">
                            <Link to="/admin" className="nav-link" onClick={handleNavbarLinkClick}>
                                Admin
                            </Link>
                        </li>
                    )}
                    {username ? (
                        <li className="nav-item nav-item-mainNavbar account">
                            <Link to="/account" className="nav-link" onClick={handleNavbarLinkClick}>
                                {username}
                            </Link>
                        </li>
                    ) : (
                        <li className="nav-item nav-item-mainNavbar signup">
                            <Link to="/sign-up" className="nav-link" onClick={handleNavbarLinkClick}>
                                SIGN UP
                            </Link>
                        </li>
                    )}
                </ul>
            </div>
        </nav>
    );
}