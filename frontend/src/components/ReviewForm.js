// frontend/src/components/ReviewForm.js
import React, { useState } from 'react';
import { submitReview } from '../services/apiService';

const ReviewForm = ({ gameId }) => {
    const [review, setReview] = useState('');
    const [rating, setRating] = useState(0);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await submitReview({ game: gameId, comment: review, rating });
            console.log('Review submitted successfully', response);
        } catch (error) {
            console.error('Error submitting review', error);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <div>
                <label>Review:</label>
                <textarea value={review} onChange={(e) => setReview(e.target.value)} />
            </div>
            <div>
                <label>Rating:</label>
                <input type="number" value={rating} onChange={(e) => setRating(Number(e.target.value))} />
            </div>
            <button type="submit">Submit Review</button>
        </form>
    );
};

export default ReviewForm;
