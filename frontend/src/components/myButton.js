import React, {useState} from "react";

export default function MyButton({ onClick, title, p_colorBorder, p_colorHover, p_colorText, p_colorBg, p_colorHoverBg, p_width }) {
    const [isHover, setIsHover] = useState(false);
    const colorHover = p_colorHover ? p_colorHover : "#cb663d";
    const colorBorder = p_colorBorder ? p_colorBorder : "#2E3234";
    const colorText = p_colorText ? p_colorText : "#E8DFDC";
    const colorBg = p_colorBg ? p_colorBg : "#151819";
    const colorHoverBg = p_colorHoverBg ? p_colorHoverBg : "#151819";
    const width = p_width ? p_width : "200px";

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
                    width: width,
                    border: "2px solid black",
                    color: isHover ? colorHover : colorText,
                    backgroundColor: isHover ? colorHoverBg : colorBg,
                    borderColor: isHover ? colorHover : colorBorder,
                }}
            >
                {title}
            </button>
        </div>
    );
};