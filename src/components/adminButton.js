import React, { useState } from 'react';

export default function AdminButton({ title, onClick, customMargin = '0px' }) {
    const [isHover, setIsHover] = useState(false);

    const handleMouseEnter = () => {
        setIsHover(true);
    };

    const handleMouseLeave = () => {
        setIsHover(false);
    };

    return (
        <div
            style={{ marginTop: customMargin }}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            onClick={onClick}
        >
            <button
                className="btn btn-secondary"
                type="button"
                aria-expanded="false"
                style={{
                    width: "200px",
                    border: "2px solid black",
                    color: isHover ? "#4bd2ff" : "#E8DFDC",
                    backgroundColor: "#151819",
                    borderColor: isHover ? "#4bd2ff" : "#2E3234"
                }}
            >
                {title}
            </button>
        </div>
    );
}