import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import MyButton from "../components/myButton";
import Review from "../components/review";
import useTokenStore from "../token";
import {NotificationManager} from "react-notifications";

const GameDetails = () => {
    const { gameName } = useParams();
    const { username } = useTokenStore();
    const [gameDetails, setGameDetails] = useState(null);
    const [newReview, setNewReview] = useState("");
    const [newRating, setNewRating] = useState(0);
    let [reviews, setReviews] = useState([]);

    useEffect(() => {
        axios
            .get(`http://localhost:4000/games/${gameName}`)
            .then((response) => {
                setGameDetails(response.data);

                axios
                    .get(`http://localhost:4000/reviews/${response.data._id}`)
                    .then((reviewsResponse) => setReviews(reviewsResponse.data))
                    .catch((error) => console.error("Error fetching reviews:", error));
            })
            .catch((error) => console.error("Error fetching game details:", error));

    }, [gameName]);

    const handleReviewChange = (event) => {
        setNewReview(event.target.value);
    };

    const handleRatingChange = (event) => {
        const rating = parseInt(event.target.value, 10);
        setNewRating(isNaN(rating) ? 0 : Math.min(5, Math.max(0, rating)));
    };

    const handleAddReview = async () => {
        try {
            if (!username) {
                return;
            }

            await axios.post(`http://localhost:4000/reviews/add-review`, {
                reviewText: newReview,
                rating: newRating,
                username: username,
                gameTitle: gameDetails.title,
                date: new Date().toISOString(),
            });

            const gameID = gameDetails._id;
            const updatedReviews = await axios.get(`http://localhost:4000/reviews/${gameID}`);
            setReviews(updatedReviews.data);

            setNewReview("");
            setNewRating(0);
        } catch (error) {
            console.error('Unexpected error:', error.message);
        }
    };

    const handleOrder = async () => {
        try {
            if (!username) {
                NotificationManager.error('You need to be logged in for this operation', 'Error');
                return;
            }

            await axios.post(`http://localhost:4000/orders/add-order`, {
                username: username,
                gameID: gameDetails._id,
                orderedAt: new Date().toISOString(),
            });

            NotificationManager.success('Order added successfully!', 'Success');
        } catch (error) {
            NotificationManager.error(error.response.data, 'Error');
        }
    };

    return (
        <div className="container">
            {gameDetails ? (
                <div className="row justify-content-center">
                    <div className="row justify-content-center pt-4 pb-4">
                        <div className="col-md-6">
                            <img
                                src={`http://localhost:4000/images/${gameDetails.imageUrl}`}
                                alt={gameDetails.title}
                                className="img-fluid"
                                style={{ maxHeight: "350px", width: "100%", objectFit: "contain", borderRadius: "30px" }}
                            />
                        </div>

                        <div className="col-md-4 d-flex flex-column justify-content-between" style={{backgroundColor: "#343434", borderRadius: "30px" }}>
                            <div>
                                <h2 className="mt-2" style={{ color: "white", fontSize: "2.5rem", fontFamily: "Barlow", textShadow: "0 0 2px black" }}>
                                    <strong>{gameDetails.title}</strong>
                                </h2>
                            </div>
                            <div className="mb-2">
                                <p className="mb-1" style={{ color: "#a1a1a1" }}>
                                    <strong style={{ color: "white" }}>Price:</strong> {gameDetails.price}€
                                </p>
                                <p className="mb-1" style={{ color: "#a1a1a1" }}>
                                    <strong style={{ color: "white" }}>Genres:</strong> {gameDetails.genres.join(", ")}
                                </p>
                                <p className="mb-1" style={{ color: "#a1a1a1" }}>
                                    <strong style={{ color: "white" }}>Platforms:</strong> {gameDetails.platforms.join(", ")}
                                </p>
                                <p className="mb-1" style={{ color: "#a1a1a1" }}>
                                    <strong style={{ color: "white" }}>Release Date:</strong> {new Date(gameDetails.releaseDate).toLocaleDateString()}
                                </p>
                                <p className="mb-1" style={{ color: "#a1a1a1" }}>
                                    <strong style={{ color: "white" }}>Developer:</strong> {gameDetails.developer}
                                </p>
                                <p className="mb-1" style={{ color: "#a1a1a1" }}>
                                    <strong style={{ color: "white" }}>Publisher:</strong> {gameDetails.publisher}
                                </p>
                            </div>
                            <div className="col-md-12 d-flex justify-content-center flex-wrap">
                                <Link to="/games" className="mb-2 me-md-2">
                                    <MyButton title="Back" />
                                </Link>
                                <MyButton title="Add to cart" onClick={handleOrder} p_colorBorder={"#a6f167"} p_colorText={"#a6f167"} p_colorHover={"#bfff72"} p_colorHoverBg={"#505931"}/>
                            </div>
                        </div>
                    </div>

                    <div className="row mt-5 col-md-9">
                        <div className="mb-2" style={{ color: "white", wordWrap: "break-word", fontSize: "2rem" }}>
                            <strong>Description</strong>
                        </div>
                        <div className="mb-2" style={{ color: "#a1a1a1", wordWrap: "break-word"}}>
                            {gameDetails.description}
                        </div>
                    </div>

                    <div className="row mt-5 col-md-9">
                        <div className="mb-2" style={{ color: "white", wordWrap: "break-word", fontSize: "2rem"}}>
                            <strong>Write a short review</strong>
                        </div>
                        <div className="mb-2" style={{ display: "flex", gap: "10px", }}>
                            <textarea
                                rows="4"
                                cols="40"
                                placeholder="Type your review here... (max 100 characters)"
                                value={newReview}
                                onChange={handleReviewChange}
                                style={{ flex: 1, resize: "none", maxWidth: "100%", borderRadius: "5px" }}
                                maxLength={100}
                            />

                        </div>
                        <div className="d-flex justify-content-between">
                            <div>
                                <label htmlFor="rating" style={{ color: "white" }}>Rating (0 to 5): &nbsp;</label>
                                <input
                                    type="number"
                                    min="0"
                                    max="5"
                                    value={newRating}
                                    onChange={handleRatingChange}
                                    style={{ maxWidth: "40px", appearance: "textfield", borderRadius: "5px" }}
                                />
                            </div>
                            <div className="mt-3">
                                <MyButton onClick={handleAddReview} title="Add Review">
                                    Add Review
                                </MyButton>
                            </div>
                        </div>
                    </div>


                    <div className="row mt-5 col-md-9">
                        <div className="mb-2" style={{ color: "white", wordWrap: "break-word", fontSize: "2rem" }}>
                            <strong>{reviews.length} {reviews.length === 1 ? 'Review' : 'Reviews'}</strong>
                            <br />
                        </div>
                    </div>

                    <div className="container mt-2 col-md-10">
                        <div className="row row-cols-1 row-cols-sm-2 row-cols-md-2 row-cols-lg-2 mb-3 text-center">
                            {reviews.map((review) => (
                                <Review
                                    _id={review._id}
                                    rating={review.rating}
                                    currentUser={review.user.username}
                                    text={review.content}
                                    date={new Date(review.createdAt).toLocaleDateString()}
                                    onDelete = {() => {setReviews(reviews.filter(filterReview => filterReview._id !== review._id))}}
                                    onUpdate={(updatedText) => {
                                        const updatedReviews = [...reviews];
                                        const updatedReviewIndex = updatedReviews.findIndex(r => r._id === review._id);
                                        if (updatedReviewIndex !== -1) {
                                            updatedReviews[updatedReviewIndex].content = updatedText;
                                            setReviews(updatedReviews);
                                        }
                                    }}
                                />
                            ))}
                        </div>
                    </div>
                </div>
            ) : (
                <div
                    style={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        justifyContent: 'center',
                        height: '80vh',
                        color: 'white',
                        fontSize: '2rem',
                        fontWeight: 'bold',
                        marginTop: '5rem'
                    }}
                >
                    Game not found.
                </div>
            )}
        </div>
    );
};

export default GameDetails;
