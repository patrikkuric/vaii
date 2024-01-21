import React, {useEffect, useState} from "react";
import Navbar2 from "../Navbar2";
import {Link} from "react-router-dom";
import axios from "axios";
import GameLine from "../components/gameLine";

export default function Home() {
    const [games, setGames] = useState([]);

    useEffect(() => {
        axios
            .get("http://localhost:4000/games")
            .then((response) => {
                setGames(response.data);
            })
            .catch((error) => console.error('Error fetching games:', error));

    }, []);

    return (
        <>
            <div id="carouselExampleIndicators" className="carousel slide" data-bs-ride="carousel">
                <div className="carousel-indicators">
                    <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="0" className="active" aria-current="true" aria-label="Slide 1"></button>
                    <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="1" aria-label="Slide 2"></button>
                    <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="2" aria-label="Slide 3"></button>
                </div>
                <div className="carousel-inner">
                    <div className="carousel-item active">
                        <Link className="dropdown-item" to="/games/Assassin's%20Creed%20Mirage">
                            <img src="http://localhost:4000/images/Assassins_Creed_Mirage_Wide.jpg" className="d-block w-100 carouselImages" alt="..." />
                        </Link>
                    </div>
                    <div className="carousel-item">
                        <Link className="dropdown-item" to="/games/Baldur's%20Gate%203">
                            <img src="http://localhost:4000/images/Baldurs_Gate_3_Wide.jpg" className="d-block w-100 carouselImages" alt="..." />
                        </Link>
                    </div>
                    <div className="carousel-item">
                        <Link className="dropdown-item" to="/games/Starfield">
                            <img src="http://localhost:4000/images/Starfield_Wide.jpg" className="d-block w-100 carouselImages" alt="..." />
                        </Link>
                    </div>
                </div>
                <div className="carouselButtons">
                    <button className="carousel-control-prev carousel-button" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="prev">
                        <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                        <span className="visually-hidden">Previous</span>
                    </button>
                    <button className="carousel-control-next carousel-button" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="next">
                        <span className="carousel-control-next-icon" aria-hidden="true"></span>
                        <span className="visually-hidden">Next</span>
                    </button>
                </div>
            </div>
            
            <Navbar2 />

            <div className="container-xl mt-4" style={{maxWidth: "1520px"}}>
                <GameLine text={"Most recent games"} sortFunction={(a, b) => new Date(b.releaseDate) - new Date(a.releaseDate)} games={games}/>
                <GameLine text={"Games for you"} sortFunction={() => Math.random() - 0.5} games={games}/>
            </div>
        </>
    );
}