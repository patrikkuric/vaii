import React, { useEffect, useState } from "react";
import useTokenStore from "../token";
import axios from "axios";
import MyButton from "../components/myButton";
import Review from "../components/review";
import {Link} from "react-router-dom";
import Order from "../components/order";

export default function Account() {
    const { username, role } = useTokenStore();
    const [activeTab, setActiveTab] = useState("Orders");
    const [userReviews, setUserReviews] = useState([]);
    const [userOrders, setUserOrders] = useState([]);

    useEffect(() => {
        if (username) {
            axios.get(`http://localhost:4000/reviews/user/${username}`)
                .then((response) => setUserReviews(response.data))
                .catch((error) => console.error("Error fetching user's reviews:", error));

            axios.get(`http://localhost:4000/orders/user/${username}`)
                .then((response) => setUserOrders(response.data))
                .catch((error) => console.error("Error fetching user's orders:", error));
        }
    }, [username]);

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

    const renderContent = () => {
        switch (activeTab) {
            case "Orders":
                return renderOrders();
            case "Reviews":
                return renderUserReviews();
            default:
                return null;
        }
    };

    const renderOrders = () => {
        return (
            <div className="container mt-5 col-md-7">
                <div className="row row-cols-1 mb-3 text-center">
                {userOrders.map((order) => (

                    <div>
                        <Link to={`/games/${order.game.title}`} className="nav-link" href="#">
                            <div><strong>{order.game.title}</strong></div>
                        </Link>

                        <Order
                            date={new Date(order.orderedAt).toLocaleDateString()}
                            _id={order._id}
                            price={order.game.price}
                            onDelete = {() => {setUserOrders(userOrders.filter(filterOrder => filterOrder._id !== order._id))}}
                        />
                    </div>
                ))}
                </div>
            </div>
        );
    };

    const renderUserReviews = () => {
        return (
            <div className="container mt-2 col-md-10">
                <div className="row row-cols-1 row-cols-sm-2 row-cols-md-2 row-cols-lg-2 mb-3 text-center">
                    {userReviews.map((review) => (
                        <div>
                        <Link to={`/games/${review.game.title}`} className="nav-link" href="#">
                            <div><strong>{review.game.title}</strong></div>
                        </Link>
                        <Review
                            _id={review._id}
                            rating={review.rating}
                            currentUser={username}
                            text={review.content}
                            date={new Date(review.createdAt).toLocaleDateString()}
                            icons={false}
                        />
                        </div>
                    ))}
                </div>
            </div>
        );
    };

    const handleLogout = () => {
        localStorage.removeItem("token");
        window.location.reload();
    };

    return (
        <>
            <div className="container"
                 style={{
                     marginTop: "60px",
                     display: "flex",
                     flexDirection: "column",
                     alignItems: "center",
                     justifyContent: "center",
                 }}
            >
                <img src="http://localhost:4000/images/default.png" alt="user" style={{width: "200px", height: "200px", marginBottom: "20px"}}/>

                <span style={{ color: "white", fontSize: "2rem", fontFamily: "Barlow"}}><strong>{username}</strong></span>
                <span style={{ color: "#a1a1a1", fontSize: "1.5rem", fontFamily: "Barlow", marginBottom: "20px" }}>{role}</span>
                <div style={{marginBottom: "40px"}}>
                    <MyButton title="Logout" onClick={handleLogout} p_colorBorder={"#9f0926"} p_colorText={"#d2183b"} p_colorHover={"#d2183b"} p_colorHoverBg={"#411620"}/>
                </div>

            </div>

            <div className="container" style={{ marginBottom: "20px" }}>
                <div className="d-flex justify-content-center" style={{ gap: "20px" }}>
                    <MyButton
                        title="Orders"
                        onClick={() => setActiveTab("Orders")}
                        p_colorBorder={"#656565"}
                        p_colorHover={"#d1e093"}
                        p_width={90}
                    />
                    <MyButton
                        title="Reviews"
                        onClick={() => setActiveTab("Reviews")}
                        p_colorBorder={"#656565"}
                        p_colorHover={"#d1e093"}
                        p_width={90}
                    />
                </div>
            </div>

            <div className="container" style={{color: "white"}}>
                {renderContent()}
            </div>
        </>
    );
}