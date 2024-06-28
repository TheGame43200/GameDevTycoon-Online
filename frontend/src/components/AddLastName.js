import React, { useState } from 'react';
import axios from 'axios';

const AddLastName = () => {
    const [lastName, setLastName] = useState('');

    const handleAddLastName = async () => {
        try {
            const response = await axios.post('/api/admin/add-lastname', { lastName });
            alert(response.data.message);
            setLastName('');
        } catch (error) {
            alert('Error adding last name');
        }
    };

    return (
        <div>
            <h2>Add Last Name</h2>
            <input
                type="text"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                placeholder="Enter last name"
            />
            <button onClick={handleAddLastName}>Add Last Name</button>
        </div>
    );
};

export default AddLastName;
