import React, { useState } from 'react';
import AdminButton from "../components/adminButton";
import axios from "axios";
import {NotificationContainer, NotificationManager} from "react-notifications";
import 'react-notifications/lib/notifications.css';

export default function Admin() {
    const [showCreateForm, setShowCreateForm] = useState(false);
    const [showUpdateForm, setShowUpdateForm] = useState(false);
    const [showDeleteForm, setShowDeleteForm] = useState(false);
    const [isHover, setIsHover] = useState(false);

    const handleMouseEnter = () => {
        setIsHover(true);
    };

    const handleMouseLeave = () => {
        setIsHover(false);
    };

    const handleCreateButtonClick = () => {
        setShowCreateForm(prevState => !prevState);
        setShowUpdateForm(false);
        setShowDeleteForm(false);
    };

    const handleUpdateButtonClick = () => {
        setShowCreateForm(false)
        setShowUpdateForm(prevState => !prevState);
        setShowDeleteForm(false);
    };

    const handleDeleteButtonClick = () => {
        setShowCreateForm(false);
        setShowUpdateForm(false);
        setShowDeleteForm(prevState => !prevState);
    };


    const buttonStyle = {
        width: "200px",
        border: "2px solid black",
        color: isHover ? "#4bd2ff" : "#E8DFDC",
        backgroundColor: "#151819",
        borderColor: isHover ? "#4bd2ff" : "#2E3234",
        marginTop: "20px"
    };

    const handleCreateFormSubmit = async (event) => {
        event.preventDefault();

        const title = event.target.title.value;
        const description = event.target.description.value;
        const genres = Array.from(event.target.genre.options)
            .filter(option => option.selected)
            .map(option => option.value);
        const platforms = Array.from(event.target.platform.options)
            .filter(option => option.selected)
            .map(option => option.value);
        const price = event.target.price.value;
        const releaseDate = event.target.releaseDate.value;
        const developer = event.target.developer.value;
        const publisher = event.target.publisher.value;
        const imageUrl = event.target.imageUrl.value;


        try {
            await axios.post('http://localhost:4000/games/add-game', {
                title,
                description,
                genres,
                platforms,
                price,
                releaseDate,
                developer,
                publisher,
                imageUrl,
            });

        } catch (error) {
            console.error('Unexpected error:', error.message);
        }

        NotificationManager.success('Game has been successfully added to the database.', 'Success');
        handleCreateButtonClick();
    };

    const handleUpdateFormSubmit = async (event) => {
        event.preventDefault();

        const title = event.target.title.value;
        const description = event.target.description.value;
        const genres = Array.from(event.target.genre.options)
            .filter(option => option.selected)
            .map(option => option.value);
        const platforms = Array.from(event.target.platform.options)
            .filter(option => option.selected)
            .map(option => option.value);
        const price = event.target.price.value;
        const releaseDate = event.target.releaseDate.value;
        const developer = event.target.developer.value;
        const publisher = event.target.publisher.value;
        const imageUrl = event.target.imageUrl.value;

        //console.log(title);
        const updateData = {};
        if (title) updateData.title = title;
        if (description) updateData.description = description;
        if (genres) updateData.genres = genres;
        if (platforms) updateData.platforms = platforms;
        if (price) updateData.price = price;
        if (releaseDate) updateData.releaseDate = releaseDate;
        if (developer) updateData.developer = developer;
        if (publisher) updateData.publisher = publisher;
        if (imageUrl) updateData.imageUrl = imageUrl;

        try {
            await axios.put(`http://localhost:4000/games/update-game/${title}`, updateData);
        } catch (error) {
            console.error('Unexpected error:', error.message);
            return;
        }

        NotificationManager.success('Game has been successfully updated.', 'Success');
        handleUpdateButtonClick();
    };

    const handleDeleteFormSubmit = async (event) => {
        event.preventDefault()

        const title = event.target.title.value;

        try {
            await axios.post(`http://localhost:4000/games/delete-game/${title}`, {
                title
            });

        } catch (error) {
            console.error('Unexpected error:', error.message);
            return;
        }

        NotificationManager.success('Game has been successfully deleted.', 'Success');
    }

    return (
        <>
            <div>
                <div style={{
                    marginTop: "120px",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: '20px'
                }}>
                    <div className="row row-cols-1 row-cols-md-3 text-center">
                        <AdminButton
                            title={"Add a game"}
                            onClick={handleCreateButtonClick}
                        />
                        <AdminButton
                            title={"Update a game"}
                            onClick={handleUpdateButtonClick}
                        />
                        <AdminButton
                            title={"Delete a game"}
                            onClick={handleDeleteButtonClick}
                        />
                    </div>
                </div>
            </div>

            {showCreateForm && (
                <div className="container mt-2 d-flex justify-content-center">
                    <div className="row" style={{
                        marginTop: '20px',
                        textAlign: 'center',
                        color: 'white',
                        display: 'grid',
                        gap: '10px',
                        gridTemplateColumns: 'repeat(auto-fill, min(400px)',
                    }}>

                    <form onSubmit={handleCreateFormSubmit} noValidate>
                        <label htmlFor="title" className="form-label">Title</label>
                        <input type="text" className="form-control" name="title" required/>

                        <label htmlFor="description" className="form-label">Description</label>
                        <textarea className="form-control" name="description" required/>
                        {/*
                        <label htmlFor="genre" className="form-label">Genre</label>
                        <input type="text" className="form-control" name="genre" required/>

                        <label htmlFor="platform" className="form-label">Platform</label>
                        <input type="text" className="form-control" name="platform" required/>
*/}
                        <label htmlFor="genre" className="form-label">
                            Genres
                        </label>
                        <select className="form-control" name="genre" multiple required>
                            <option value="Action">Action</option>
                            <option value="Adventure">Adventure</option>
                            <option value="Fighting">Fighting</option>
                            <option value="FPS">FPS</option>
                            <option value="Platformer">Platformer</option>
                            <option value="Racing">Racing</option>
                            <option value="RPG">RPG</option>
                        </select>

                        <label htmlFor="platform" className="form-label">
                            Platforms
                        </label>
                        <select className="form-control" name="platform" multiple required>
                            <option value="PC">PC</option>
                            <option value="Console">Console</option>
                            <option value="VR">VR</option>
                            <option value="Mobile">Mobile</option>
                        </select>

                        <label htmlFor="price" className="form-label">Price (Eur)</label>
                        <input type="number" className="form-control" name="price" min="0" required/>

                        <label htmlFor="releaseDate" className="form-label">Release Date</label>
                        <input type="date" className="form-control" name="releaseDate" required/>

                        <label htmlFor="developer" className="form-label">Developer</label>
                        <input type="text" className="form-control" name="developer" required/>

                        <label htmlFor="publisher" className="form-label">Publisher</label>
                        <input type="text" className="form-control" name="publisher" required/>

                        <label htmlFor="imageUrl" className="form-label">Image URL</label>
                        <input type="text" className="form-control" name="imageUrl" required/>

                        <button type="submit" className="btn btn-link" style={buttonStyle} onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
                            Create
                        </button>
                    </form>
                    </div>
                </div>
            )}

            {showUpdateForm && (
                <div className="container mt-2 d-flex justify-content-center">
                    <div className="row" style={{
                        marginTop: '20px',
                        textAlign: 'center',
                        color: 'white',
                        display: 'grid',
                        gap: '10px',
                        gridTemplateColumns: 'repeat(auto-fill, min(400px)',
                    }}>

                        <form onSubmit={handleUpdateFormSubmit} noValidate>
                            <label htmlFor="title">Which game do you want to update?</label>
                            <input type="text" className="form-control" name="title" required/>

                            <h2 style={{ fontSize: '20px', marginTop: '50px'}}>Fill in all the data you want to update</h2>

                            <label htmlFor="description" className="form-label">Description</label>
                            <textarea className="form-control" name="description"/>

                            <label htmlFor="genre" className="form-label">
                                Genres
                            </label>
                            <select className="form-control" name="genre" multiple required>
                                <option value="Action">Action</option>
                                <option value="Adventure">Adventure</option>
                                <option value="Fighting">Fighting</option>
                                <option value="FPS">FPS</option>
                                <option value="Platformer">Platformer</option>
                                <option value="Racing">Racing</option>
                                <option value="RPG">RPG</option>
                            </select>

                            <label htmlFor="platform" className="form-label">
                                Platforms
                            </label>
                            <select className="form-control" name="platform" multiple required>
                                <option value="PC">PC</option>
                                <option value="Console">Console</option>
                                <option value="VR">VR</option>
                                <option value="Mobile">Mobile</option>
                            </select>

                            <label htmlFor="price" className="form-label">Price (Eur)</label>
                            <input type="number" className="form-control" name="price" min="0"/>

                            <label htmlFor="releaseDate" className="form-label">Release Date</label>
                            <input type="date" className="form-control" name="releaseDate"/>

                            <label htmlFor="developer" className="form-label">Developer</label>
                            <input type="text" className="form-control" name="developer"/>

                            <label htmlFor="publisher" className="form-label">Publisher</label>
                            <input type="text" className="form-control" name="publisher"/>

                            <label htmlFor="imageUrl" className="form-label">Image URL</label>
                            <input type="text" className="form-control" name="imageUrl"/>

                            <button type="submit" className="btn btn-link" style={buttonStyle} onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
                                Update
                            </button>
                        </form>
                    </div>
                </div>
            )}

            {showDeleteForm && (
                <div className="container mt-2 d-flex justify-content-center">
                    <div className="row" style={{
                        marginTop: '20px',
                        textAlign: 'center',
                        color: 'white',
                        display: 'grid',
                        gap: '10px',
                        gridTemplateColumns: 'repeat(auto-fill, min(400px)',
                    }}>

                        <form onSubmit={handleDeleteFormSubmit} noValidate>
                            <label htmlFor="title" className="form-label">Which game do you want to delete?</label>
                            <input type="text" className="form-control" name="title" required/>

                            <button type="submit" className="btn btn-link" style={buttonStyle} onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
                                Delete
                            </button>
                        </form>
                    </div>
                </div>
            )}

            <NotificationContainer />
        </>
    );
}