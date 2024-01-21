import MyButton from "../components/myButton";
import React from "react";
import useTokenStore from "../token";

export default function Account() {
    const { username } = useTokenStore();

    if (!username) {
        return (
            <div
                style={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    height: '80vh',
                    color: 'white',
                    fontSize: '2rem',
                    fontWeight: 'bold',
                    marginTop: '5rem'
                }}
            >
                You are not logged in.
            </div>
        );
    }

    const handleLogout = () => {
        localStorage.removeItem("token");
        window.location.reload();
    };

    return (
        <div>
            <MyButton title="Logout" onClick={handleLogout} />
        </div>
    );
}