import React, { useState } from 'react';
import { addName, addComment } from '../apiService';

const AdminPage = () => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [comment, setComment] = useState('');
  const [rating, setRating] = useState(0);

  const handleAddName = async () => {
    try {
      await addName(firstName, lastName);
      setFirstName('');
      setLastName('');
    } catch (error) {
      console.error('Error adding name:', error);
    }
  };

  const handleAddComment = async () => {
    try {
      await addComment(comment, rating);
      setComment('');
      setRating(0);
    } catch (error) {
      console.error('Error adding comment:', error);
    }
  };

  return (
    <div>
      <h2>Admin Page</h2>
      <div>
        <h3>Add Name</h3>
        <input
          type="text"
          placeholder="First Name"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
        />
        <input
          type="text"
          placeholder="Last Name"
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
        />
        <button onClick={handleAddName}>Add Name</button>
      </div>
      <div>
        <h3>Add Comment</h3>
        <input
          type="text"
          placeholder="Comment"
          value={comment}
          onChange={(e) => setComment(e.target.value)}
        />
        <input
          type="number"
          placeholder="Rating"
          value={rating}
          onChange={(e) => setRating(e.target.value)}
        />
        <button onClick={handleAddComment}>Add Comment</button>
      </div>
    </div>
  );
};

export default AdminPage;
