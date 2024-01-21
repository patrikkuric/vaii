import React from "react";
import axios from "axios";
import {NotificationManager} from "react-notifications";

export default function Order({ onDelete, gameTitle, date, price, _id }) {

    const handleDeleteOrder = async (event) => {
        event.preventDefault();

        try {
            await axios.post(`http://localhost:4000/orders/delete-order`, {
                id: _id,
            });

            onDelete();
            NotificationManager.success("Order has been successfully withdrawn.", "Success");
        } catch (error) {
            NotificationManager.error("Error withdrawing this order", "Error");
        }
    };

    return (
        <div className="col d-flex align-items-stretch">
            <div
                className="container mb-4 rounded-3 shadow-sm flex-fill text-start"
                style={{
                    backgroundColor: "#323232",
                    color: "#a1a1a1",
                    height: "100px",
                    width: "300px",
                    display: "flex",
                    justifyContent: "space-between"
                }}
            >
                <div>
                    <div style={{color: "#efe411", fontSize: "40px"}}>{price}€</div>
                    <div className="mt-2" >{date}</div>
                </div>
                <i className="fa-solid fa-x mt-2" style={{ color: "#ff0000", fontSize: "30px" }} onClick={handleDeleteOrder}></i>
            </div>
        </div>
    );
}