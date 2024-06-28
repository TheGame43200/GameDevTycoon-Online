import React, { useState } from 'react';
import axios from 'axios';

const AddFirstName = () => {
    const [firstName, setFirstName] = useState('');

    const handleAddFirstName = async () => {
        try {
            const response = await axios.post('/api/admin/add-firstname', { firstName });
            alert(response.data.message);
            setFirstName('');
        } catch (error) {
            alert('Error adding first name');
        }
    };

    return (
        <div>
            <h2>Add First Name</h2>
            <input
                type="text"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                placeholder="Enter first name"
            />
            <button onClick={handleAddFirstName}>Add First Name</button>
        </div>
    );
};

export default AddFirstName;
