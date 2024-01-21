import React, {useState} from "react";

export default function MyButton({ onClick, title }) {
    const [isHover, setIsHover] = useState(false);

    const handleMouseEnter = () => {
        setIsHover(true);
    };

    const handleMouseLeave = () => {
        setIsHover(false);
    };

    return (
        <div
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
        >
            <button
                className="btn btn-secondary"
                type="button"
                onClick={onClick}
                style={{
                    width: "200px",
                    border: "2px solid black",
                    color: isHover ? "#cb663d" : "#E8DFDC",
                    backgroundColor: "#151819",
                    borderColor: isHover ? "#cb663d" : "#2E3234",
                }}
            >
                {title}
            </button>
        </div>
    );
};