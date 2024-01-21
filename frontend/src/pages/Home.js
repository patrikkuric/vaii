import React, {useEffect, useState} from "react";
import ContentPanelItem from "../components/contentPanelItem";
import Navbar2 from "../Navbar2";
import {Link} from "react-router-dom";
import axios from "axios";

export default function Home() {
    const [games, setGames] = useState([]);

    useEffect(() => {
        axios
            .get("http://localhost:4000/games")
            .then((response) => {
                console.log('API Response:', response.data);
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
                            <img src="/images/ACMirage.jpg" className="d-block w-100 carouselImages" alt="..." />
                        </Link>
                    </div>
                    <div className="carousel-item">
                        <Link className="dropdown-item" to="/games/Baldur's%20Gate%203">
                            <img src="/images/BaldursGate3.jpg" className="d-block w-100 carouselImages" alt="..." />
                        </Link>
                    </div>
                    <div className="carousel-item">
                        <Link className="dropdown-item" to="/games/Starfield">
                            <img src="/images/Starfield.jpg" className="d-block w-100 carouselImages" alt="..." />
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
                <div className="ms-4">
                    <div style={{ color: "white", fontSize: "2rem", fontFamily: "Barlow" }}><strong>Most recent games</strong></div>
                </div>

                <div className="contentPanelItems d-flex flex-wrap justify-content-center">
                    {games
                        .sort((a, b) => new Date(b.releaseDate) - new Date(a.releaseDate))
                        .slice(0, 4)
                        .map((game) => (
                            <div key={game.title}>
                                <Link to={`/games/${game.title}`} className="nav-link" href="#">
                                    <ContentPanelItem title={game.title} img={`http://localhost:4000/images/${game.imageUrl}`} />
                                </Link>
                            </div>
                        ))}
                </div>

                <div className="ms-4">
                    <div style={{ color: "white", fontSize: "2rem", fontFamily: "Barlow" }}><strong>Games for you</strong></div>
                </div>

                <div className="contentPanelItems d-flex flex-wrap justify-content-center">
                    {games
                        .sort(() => Math.random() - 0.5)
                        .slice(0, 4)
                        .map((game) => (
                            <div key={game.title}>
                                <Link to={`/games/${game.title}`} className="nav-link" href="#">
                                    <ContentPanelItem title={game.title} img={`http://localhost:4000/images/${game.imageUrl}`} />
                                </Link>
                            </div>
                        ))}
                </div>
            </div>
        </>
    );
}