import React, { useState } from "react";

export default function DropdownComponent({ title, items, onSelect, onClear }) {
    const [isHover, setIsHover] = useState(false);

    const handleMouseEnter = () => {
        setIsHover(true);
    };

    const handleMouseLeave = () => {
        setIsHover(false);
    };

    const handleClearClick = () => {
        onClear();
    };

    return (
        <>
            <div
                className="dropdown overflow-visible"
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
            >
                <button
                    className="btn btn-secondary dropdown-toggle"
                    type="button"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                    style={{
                        width: "200px",
                        border: "2px solid black",
                        color: isHover ? "#4bd2ff" : "#E8DFDC",
                        backgroundColor: "#151819",
                        borderColor: isHover ? "#4bd2ff" : "#2E3234",
                    }}
                >
                    {title}
                </button>
                <ul
                    className="dropdown-menu"
                    style={{
                        width: "200px",
                        backgroundColor: "#E8DFDC",
                    }}
                >
                    <li>
                        <div className="dropdown-item" onClick={handleClearClick} style={{ color: "#969d9d" }}>
                            None
                        </div>
                    </li>
                    {items.map((item) => (
                        <li>
                            <div
                                className="dropdown-item"
                                onClick={() => onSelect(item)}
                            >
                                {item}
                            </div>
                        </li>
                    ))}
                </ul>
            </div>
        </>
    );
}