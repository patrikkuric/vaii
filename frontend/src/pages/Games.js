import React, { useState, useEffect } from "react";
import axios from "axios";
import DropdownComponent from "../components/dropdownComponent";
import ContentPanelItem from "../components/contentPanelItem";
import MyButton from "../components/myButton";
import {Link} from "react-router-dom";
import useTokenStore from "../token";

export default function Games() {
    const { role } = useTokenStore();
    //console.log(role);
    const [games, setGames] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [selectedGenre, setSelectedGenre] = useState(null); 
    const [selectedPlatform, setSelectedPlatform] = useState(null);

    useEffect(() => {
        axios
            .get("http://localhost:4000/games")
            .then((response) => {
                setGames(response.data);
            })
            .catch((error) => console.error('Error fetching games:', error));

    }, []);

    const filteredGames = games.filter(
        (game) => {
            /*
            console.log('genre:', selectedGenre);
            console.log('platforma:', selectedPlatform);
            console.log('search:', searchTerm);
*/
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
        setSearchTerm("");
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
                    <MyButton onClick={() => clearAll() } title="Clear" />
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

            <div className="container contentPanelItems d-flex flex-wrap justify-content-center" style={{maxWidth: "1520px"}}>
                {filteredGames.map((game) => (
                    <div key={game.title}>
                        <Link to={`/games/${game.title}`} className="nav-link" href="#">
                            <ContentPanelItem title={game.title} img={`http://localhost:4000/images/${game.imageUrl}`} />
                        </Link>
                    </div>
                ))}

                {role === "Administrator" && (
                    <div>
                        <Link to={`/admin`} className="nav-link" href="#">
                            <ContentPanelItem title="Add a game" img="http://localhost:4000/images/Add_Game.jpg" />
                        </Link>
                    </div>
                )}
            </div>
        </>
    );
}