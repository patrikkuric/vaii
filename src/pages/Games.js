import React from "react";
import DropdownComponent from "../components/dropdownComponent";
import ContentPanelItem from "../components/contentPanelItem";

export default function Games() {
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
                        title={"Systems"}
                        items={["PC", "Console", "VR"]}
                        className="col"
                    />
                </div>
            </div>

            <div className="contentPanelItems d-flex flex-wrap justify-content-center">
                <ContentPanelItem title={"Elden Ring"} img={"Elden_Ring"}/>
                <ContentPanelItem title={"Cyberpunk 2077 - Phantom Liberty"} img={"Cyberpunk"}/>
                <ContentPanelItem title={"Lies of P"} img={"Lies_of_P"}/>
                <ContentPanelItem title={"Lords of the Fallen"} img={"Lords of the Fallen"}/>
                <ContentPanelItem title={"Star Wars Jedi: Survivor"} img={"Star_Wars_Jedi_Survivor"}/>
                <ContentPanelItem title={"Borderlands 3"} img={"Borderlands3"}/>
            </div>
        </>
    );
}