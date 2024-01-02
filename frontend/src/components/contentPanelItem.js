import {Link} from "react-router-dom";
import React from "react";

export default function ContentPanelItem({ title, img }) {
    return  (
        <div className="contentPanelItem">
            <img src={`/images/${img}.jpg`} alt="..." />
            <figcaption>{title}</figcaption>
        </div>
    );
}