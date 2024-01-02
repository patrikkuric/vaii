import React, {useEffect, useState} from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const GameDetails = () => {
    const { gameName } = useParams();
    const [gameDetails, setGameDetails] = useState(null);

    useEffect(() => {
        axios.get(`http://localhost:4000/games/${gameName}`)
            .then(response => setGameDetails(response.data))
            .catch(error => console.error('Error fetching game details:', error));
    }, [gameName]);

    return (
        <div>
            {gameDetails ? (
                <>
                    <h2>Game Details for {gameDetails.title}</h2>
                    <p>Description: {gameDetails.description}</p>
                    <p>Genre: {gameDetails.genre}</p>
                    <p>Price: {gameDetails.price}</p>
                </>
            ) : (
                <p>Game not found.</p>
            )}
        </div>
    );
};

export default GameDetails;