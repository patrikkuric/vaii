import React from "react";
import ContentPanelItem from "../components/contentPanelItem";
import Navbar2 from "../Navbar2";
import {Link} from "react-router-dom";

export default function Home() {
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
                        <Link className="dropdown-item" to="/games">
                            <img src="/images/ACMirage.jpg" className="d-block w-100 carouselImages" alt="..." />
                        </Link>
                    </div>
                    <div className="carousel-item">
                        <Link className="dropdown-item" to="/games">
                            <img src="/images/BaldursGate3.jpg" className="d-block w-100 carouselImages" alt="..." />
                        </Link>
                    </div>
                    <div className="carousel-item">
                        <Link className="dropdown-item" to="/games">
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

            <div className="contentPanelItems d-flex flex-wrap justify-content-center">
                <ContentPanelItem title={"Elden Ring"} img={"Elden_Ring"}/>
                <ContentPanelItem title={"Cyberpunk 2077 - Phantom Liberty"} img={"Cyberpunk"}/>
                <ContentPanelItem title={"Lies of P"} img={"Lies_of_P"}/>
                <ContentPanelItem title={"Lords of the Fallen"} img={"Lords of the Fallen"}/>
                <ContentPanelItem title={"Star Wars Jedi: Survivor"} img={"Star_Wars_Jedi_Survivor"}/>
                <ContentPanelItem title={"Borderlands 3"} img={"Borderlands3"}/>
                <ContentPanelItem title={"Borderlands 3"} img={"Borderlands3"}/>
                <ContentPanelItem title={"Borderlands 3"} img={"Borderlands3"}/>
                <ContentPanelItem title={"Borderlands 3"} img={"Borderlands3"}/>
                <ContentPanelItem title={"Borderlands 3"} img={"Borderlands3"}/>
                <ContentPanelItem title={"Borderlands 3"} img={"Borderlands3"}/>
            </div>
        </>
    );
}