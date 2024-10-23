import React, { useState, useEffect } from 'react';
import { createUser, getUsers, updateUser, deleteUser } from '../api'; 
import './UserForm.css'; 

const UserForm = () => {
    const [users, setUsers] = useState([]);
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phoneNumber: '',
        role: 'Student',
    });
    const [editingId, setEditingId] = useState(null);
    const [error, setError] = useState(null); 

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null); 
        try {
            if (editingId) {
                await updateUser(editingId, formData);
                alert('User updated successfully');
            } else {
                await createUser(formData);
                alert('User created successfully');
            }
            resetForm();
            fetchUsers(); 
        } catch (err) {
            console.error(err); 
            setError('An error occurred while processing your request.'); 
        }
    };

    const fetchUsers = async () => {
        try {
            const response = await getUsers();
            setUsers(response.data);
        } catch (err) {
            console.error(err);
            setError('Failed to fetch users.'); 
        }
    };

    const handleEdit = (user) => {
        setFormData(user);
        setEditingId(user._id);
    };

    const handleDelete = async (id) => {
        if (window.confirm('Are you sure you want to delete this user?')) {
            try {
                await deleteUser(id);
                alert('User deleted successfully');
                fetchUsers(); 
            } catch (err) {
                console.error(err);
                setError('Failed to delete user.'); 
            }
        }
    };

    const resetForm = () => {
        setEditingId(null);
        setFormData({ name: '', email: '', phoneNumber: '', role: 'Student' });
    };

    useEffect(() => {
        fetchUsers();
    }, []);

    return (
        <div className="user-form-container">
            <h2 className="user-form-title">User Management</h2>
            {error && <div className="error-message">{error}</div>} 
            <form className="user-form" onSubmit={handleSubmit}>
                <input
                    className="user-input"
                    type="text"
                    name="name"
                    value={formData.name}
                    placeholder="Name"
                    onChange={handleChange}
                    required
                />
                <input
                    className="user-input"
                    type="email"
                    name="email"
                    value={formData.email}
                    placeholder="Email"
                    onChange={handleChange}
                    required
                />
                <input
                    className="user-input"
                    type="tel"
                    name="phoneNumber"
                      value={formData.phoneNumber}
                    placeholder="Phone Number"
                    onChange={handleChange}
                    required
                />
                <select
                    className="user-select"
                    name="role"
                    value={formData.role}
                    onChange={handleChange}
                    required
                >
                    <option value="Student">Student</option>
                    <option value="Teacher">Teacher</option>
                    <option value="Institute">Institute</option>
                </select>
                <button className="user-button" type="submit">
                    {editingId ? 'Update User' : 'Edit User'}
                </button>
            </form>
            <ul className="user-list">
                {users.map((user) => (
                    <li className="user-list-item" key={user._id}>
                        {user.name} ({user.email}) - {user.role}
                        <button className="user-edit-button" onClick={() => handleEdit(user)}>Edit</button>
                        <button className="user-delete-button" onClick={() => handleDelete(user._id)}>Delete</button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default UserForm;
