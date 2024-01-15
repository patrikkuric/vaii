import React, { useState, useEffect } from "react";
import axios from "axios";
import DropdownComponent from "../components/dropdownComponent";
import ContentPanelItem from "../components/contentPanelItem";
import ButtonClear from "../components/buttonClear";
import {Link} from "react-router-dom";
import useTokenStore from "../token";

export default function Games() {
    const { username } = useTokenStore();
    const { role } = useTokenStore();
    //console.log(role);
    const [games, setGames] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [selectedGenre, setSelectedGenre] = useState(null);  // Changed from selectedGenres
    const [selectedPlatform, setSelectedPlatform] = useState(null);  // Changed from selectedPlatforms

    useEffect(() => {
        axios
            .get("http://localhost:4000/games")
            .then((response) => {
                console.log('API Response:', response.data);
                setGames(response.data);
            })
            .catch((error) => console.error('Error fetching games:', error));

    }, []);

    const filteredGames = games.filter(
        (game) => {
            console.log('Selected Genre:', selectedGenre);
            console.log('Selected Platform:', selectedPlatform);
            console.log('Search Term:', searchTerm);

            return (
                (!selectedGenre || game.genres.includes(selectedGenre)) &&
                (!selectedPlatform || game.platforms.includes(selectedPlatform)) &&
                game.title.toLowerCase().includes(searchTerm.toLowerCase())
            );
        }
    );

    const clearAll = () => {
        setSelectedGenre(null);
        setSelectedPlatform(null);
    }
    return (
        <>
            <div
                style={{
                    marginTop: "120px",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: "20px",
                    marginBottom: "20px"
                }}
            >
                <div className="row row-cols-1 row-cols-md-4 text-center">
                    <DropdownComponent
                        title={"Genres"}
                        items={["Action", "Adventure", "Fighting", "FPS", "Platformer", "Racing", "RPG"]}
                        selectedValue={selectedGenre}
                        onSelect={(selectedValue) => setSelectedGenre(selectedValue)}
                        onClear={() => setSelectedGenre(null)}
                    />
                    <DropdownComponent
                        title={"Platform"}
                        items={["PC", "Console", "VR", "Mobile"]}
                        selectedValue={selectedPlatform}
                        onSelect={(selectedValue) => setSelectedPlatform(selectedValue)}
                        onClear={() => setSelectedPlatform(null)}
                    />
                    <ButtonClear onClear={() => clearAll() } />
                    <div className="col-md-2">
                        <input
                            type="text"
                            placeholder="Search..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            style={{
                                border: "2px solid black",
                                backgroundColor: "#151819",
                                color: "#E8DFDC",
                                borderColor: "#2E3234",
                                marginBottom: "10px",
                                padding: "5px"
                            }}
                        />
                    </div>
                </div>
            </div>
            <div className="contentPanelItems d-flex flex-wrap justify-content-center">
                {filteredGames.map((game) => (
                    <div key={game.title}>
                        <Link to={`/games/${game.title}`} className="nav-link" href="#">
                            <ContentPanelItem title={game.title} img={game.imageUrl} />
                        </Link>
                    </div>
                ))}

                {role === "Administrator" && (
                    <div>
                        <Link to={`/admin`} className="nav-link" href="#">
                            <ContentPanelItem title="Add a game" img="Add_Game" />
                        </Link>
                    </div>
                )}
            </div>
        </>
    );
}