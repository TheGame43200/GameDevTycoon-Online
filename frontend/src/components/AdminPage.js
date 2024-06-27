import React, { useState } from 'react';
import axios from 'axios';

const AdminPage = () => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [commentText, setCommentText] = useState('');
  const [rating, setRating] = useState('');

  const handleAddName = async () => {
    try {
      await axios.post('http://192.168.1.61:5000/api/admin/add-name', { firstName, lastName });
      alert('Name added successfully');
    } catch (error) {
      console.error(error);
      alert('Failed to add name');
    }
  };

  const handleAddComment = async () => {
    try {
      await axios.post('http://192.168.1.61:5000/api/admin/add-comment', { text: commentText, rating });
      alert('Comment added successfully');
    } catch (error) {
      console.error(error);
      alert('Failed to add comment');
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
          value={commentText} 
          onChange={(e) => setCommentText(e.target.value)} 
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
