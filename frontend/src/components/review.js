import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";
import useTokenStore from "../token";
import axios from "axios";
import { NotificationManager } from "react-notifications";
import "react-notifications/lib/notifications.css";
import { Modal, Button, Form } from "react-bootstrap";

export default function Review({ _id, text, rating, date, currentUser, onUpdate, onDelete }) {
    const { username, role } = useTokenStore();

    const [showModal, setShowModal] = useState(false);
    const [updatedText, setUpdatedText] = useState(text);

    const handleUpdateReview = async (event) => {
        event.preventDefault();

        try {
            await axios.post(`http://localhost:4000/reviews/update-review`, {
                reviewID: _id,
                updatedText: updatedText,
            });

            onUpdate(updatedText);
            NotificationManager.success("Review has been successfully updated.", "Success");
            handleCloseModal();
        } catch (error) {
            NotificationManager.error("Error updating this review", "Error");
        }
    };

    const handleDeleteReview = async (event) => {
        event.preventDefault();

        try {
            await axios.post(`http://localhost:4000/reviews/delete-review`, {
                reviewID: _id,
            });
            onDelete();
            NotificationManager.success("Review has been successfully deleted.", "Success");
        } catch (error) {
            NotificationManager.error("Error deleting this review", "Error");
        }
    };

    const generateStars = () => {
        return (
            <div>
                {[...Array(rating)].map((_, index) => (
                    <FontAwesomeIcon icon={faStar} style={{ color: "#FFD43B" }} key={index} />
                ))}

                {[...Array(5 - rating)].map((_, index) => (
                    <FontAwesomeIcon icon={faStar} key={index} />
                ))}
            </div>
        );
    };

    const handleShowModal = () => setShowModal(true);
    const handleCloseModal = () => setShowModal(false);

    return (
        <div className="col d-flex align-items-stretch">
            <div
                className="container mb-4 rounded-3 shadow-sm flex-fill text-start"
                style={{
                    backgroundColor: "#323232",
                    color: "#a1a1a1",
                    height: "200px",
                    width: "300px",
                }}
            >
                <div className="mt-2">
                    <strong>
                        {currentUser} &nbsp;
                        {role === "Administrator" || currentUser === username ? (
                            <>
                                <i className="fa-solid fa-pencil" onClick={handleShowModal}></i> &nbsp;
                                <i className="fa-solid fa-x" style={{ color: "#ff0000" }} onClick={handleDeleteReview}></i>
                            </>
                        ) : null}
                    </strong>
                </div>
                <div>{generateStars()}</div>
                <div>{date}</div>
                <div className="mt-4">{text}</div>

                <Modal show={showModal} onHide={handleCloseModal}>
                    <Modal.Header closeButton>
                        <Modal.Title>Update Review</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Form>
                            <Form.Group controlId="updateReviewText">
                                <Form.Label>Review Text</Form.Label>
                                <Form.Control
                                    as="textarea"
                                    rows={4}
                                    value={updatedText}
                                    onChange={(e) => setUpdatedText(e.target.value)}
                                />
                            </Form.Group>
                        </Form>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={handleCloseModal}>
                            Close
                        </Button>
                        <Button variant="primary" onClick={handleUpdateReview}>
                            Save Changes
                        </Button>
                    </Modal.Footer>
                </Modal>
            </div>
        </div>
    );
}
