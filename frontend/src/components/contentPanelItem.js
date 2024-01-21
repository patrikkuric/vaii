import React from "react";

export default function ContentPanelItem({ title, img }) {
    return  (
        <div className="contentPanelItem">
            <img src={img} alt="..." style={{ maxWidth: '320px', maxHeight: '180px' }} />
            <figcaption>{title}</figcaption>
        </div>
    );
}