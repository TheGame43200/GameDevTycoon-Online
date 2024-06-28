import React, { useState } from 'react';
import axios from 'axios';

const AddComment = () => {
    const [comment, setComment] = useState('');
    const [rating, setRating] = useState('');

    const handleAddComment = async () => {
        try {
            const response = await axios.post('/api/admin/add-comment', { comment, rating });
            alert(response.data.message);
            setComment('');
            setRating('');
        } catch (error) {
            alert('Error adding comment');
        }
    };

    return (
        <div>
            <h2>Add Comment</h2>
            <textarea
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                placeholder="Enter comment"
            ></textarea>
            <input
                type="number"
                value={rating}
                onChange={(e) => setRating(e.target.value)}
                placeholder="Enter rating (1-10)"
            />
            <button onClick={handleAddComment}>Add Comment</button>
        </div>
    );
};

export default AddComment;
