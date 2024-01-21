import React from "react";
import {Link} from "react-router-dom";
import ContentPanelItem from "./contentPanelItem";

export default function GameLine({ games, sortFunction, text }) {
    return  (
        <>
            <div className="ms-4">
                <div style={{ color: "white", fontSize: "2rem", fontFamily: "Barlow" }}><strong>{text}</strong></div>
            </div>

            <div className="contentPanelItems d-flex flex-wrap justify-content-center">
                {games
                    .sort(sortFunction)
                    .slice(0, 4)
                    .map((game) => (
                        <div key={game.title}>
                            <Link to={`/games/${game.title}`} className="nav-link" href="#">
                                <ContentPanelItem title={game.title} img={`http://localhost:4000/images/${game.imageUrl}`} />
                            </Link>
                        </div>
                    ))}
            </div>
        </>
    );
}