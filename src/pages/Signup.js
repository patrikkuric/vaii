import {useState} from "react";

export default function Signup() {
    const [isHover, setIsHover] = useState(false);

    const handleMouseEnter = () => {
        setIsHover(true);
    };

    const handleMouseLeave = () => {
        setIsHover(false);
    };

    const buttonStyle = {
        width: "200px",
        border: "2px solid black",
        color: isHover ? "#4bd2ff" : "#E8DFDC",
        backgroundColor: "#151819",
        borderColor: isHover ? "#4bd2ff" : "#2E3234",
        marginTop: "20px"
    }
    return <>
        <div className="container mt-5">
            <div className="row justify-content-center">
                <div className="col-md-6">
                    <div className="card">
                        <div className="card-header">
                            <ul className="nav nav-tabs card-header-tabs">
                                <li className="nav-item overflow-hidden nav-item-signup">
                                    <a className="nav-link active" id="register-tab" data-bs-toggle="tab" href="#register">Register</a>
                                </li>
                                <li className="nav-item overflow-hidden nav-item-signup mx-2">
                                    <a className="nav-link" id="login-tab" data-bs-toggle="tab" href="#login">Login</a>
                                </li>
                            </ul>
                        </div>

                        <div className="card-body">
                            <div className="tab-content">
                                <div className="tab-pane fade show active" id="register">
                                    <h5 className="card-title overflow-hidden lh-base">Register</h5>
                                    <form>
                                        <label form="username" className="form-label">Username</label>
                                        <input type="username" className="form-control" placeholder="vaii enjoyer" />
                                        <label form="email" className="form-label">Email</label>
                                        <input type="email" className="form-control" placeholder="example@stud.uniza.sk" />
                                        <label form="password" className="form-label">Password</label>
                                        <input type="password" className="form-control" />
                                        <label form="repeat-password" className="form-label">Repeat password</label>
                                        <input type="repeat-password" className="form-control" />

                                        <button type="button" className="btn btn-link"
                                                style={buttonStyle}
                                                onMouseEnter={handleMouseEnter}
                                                onMouseLeave={handleMouseLeave}>Register</button>
                                    </form>
                                </div>

                                <div className="tab-pane fade" id="login">
                                    <h5 className="card-title overflow-hidden lh-base">Login</h5>
                                    <form>
                                        <label form="username" className="form-label">Username</label>
                                        <input type="username" className="form-control" placeholder="vaii enjoyer" />
                                        <label form="password" className="form-label">Password</label>
                                        <input type="password" className="form-control" />

                                        <button type="button" className="btn btn-link"
                                                style={buttonStyle}
                                                onMouseEnter={handleMouseEnter}
                                                onMouseLeave={handleMouseLeave}>Login</button>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </>
}