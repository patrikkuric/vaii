import React, { useState, useEffect } from "react";
import axios from "axios";
import DropdownComponent from "../components/dropdownComponent";
import ContentPanelItem from "../components/contentPanelItem";
import {Link} from "react-router-dom";

export default function Games() {
    const [games, setGames] = useState([]);

    useEffect(() => {
        axios.get("http://localhost:4000/games")
            .then(response => {
                console.log('API Response:', response.data);
                setGames(response.data);
            })
            .catch(error => console.error('Error fetching games:', error));
    }, []);

    return (
        <>
            <div style={{
                marginTop: "120px",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                gap: '20px'
            }}>

                <div className="row row-cols-1 row-cols-md-2 text-center">
                    <DropdownComponent
                        title={"Genres"}
                        items={["Action", "Adventure", "Fighting", "FPS", "Platformer", "Racing", "RPG"]}
                        className="col"
                    />
                    <DropdownComponent
                        title={"Platform"}
                        items={["PC", "Console", "VR"]}
                        className="col"
                    />
                </div>
            </div>

            <div className="contentPanelItems d-flex flex-wrap justify-content-center">
                {games.map((game) => (
                    <div>
                        <Link to={`/games/${game.title}`} className="nav-link" href="#">
                            <ContentPanelItem key={game.title} title={game.title} img={game.imageUrl} />
                        </Link>
                    </div>
                ))}
            </div>
        </>
    );
}