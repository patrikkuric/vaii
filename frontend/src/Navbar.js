import {Link} from "react-router-dom";
import useTokenStore from "./token";
import ContentPanelItem from "./components/contentPanelItem";
import React from "react";

export default function Navbar() {
    const { token  } = useTokenStore();
    const { username  } = useTokenStore();
    const { role  } = useTokenStore();

    return (
        <nav className="navbar sticky-top fixed-top navbar-expand-lg navbar-dark bg-dark navbarOne">
            <div className="mainLogo">
                <Link to="/" className="navbar-brand" href="#">Quasar</Link>
            </div>
            <button className="navbar-toggler"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#navbarSupportedContent"
                    aria-controls="navbarSupportedContent"
                    aria-expanded="false"
                    aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
            </button>

            <div className="collapse navbar-collapse containers" id="navbarSupportedContent">
                <ul className="navbar-nav ms-auto me-3">
                    <li className="nav-item nav-item-mainNavbar games">
                        <Link to="/games" className="nav-link" href="#">Games</Link>
                    </li>
                    {/*
                    <li className="nav-item nav-item-mainNavbar tech">
                        <Link to="/tech" className="nav-link" href="#">Tech</Link>
                    </li>
                    <li className="nav-item nav-item-mainNavbar about">
                        <Link to="/about" className="nav-link" href="#">About</Link>
                    </li>
                    */}
                    {role === "Administrator" && (
                        <li className="nav-item nav-item-mainNavbar admin">
                            <Link to="/admin" className="nav-link" href="#">Admin</Link>
                        </li>
                    )}
                    {username ? (
                        <li className="nav-item nav-item-mainNavbar account">
                            <Link to="/account" className="nav-link" href="#">
                                {username}
                            </Link>
                        </li>
                    ) : (
                        <li className="nav-item nav-item-mainNavbar signup">
                            <Link to="/sign-up" className="nav-link" href="#">
                                SIGN UP
                            </Link>
                        </li>
                    )}
                </ul>
            </div>
        </nav>
    );
}

