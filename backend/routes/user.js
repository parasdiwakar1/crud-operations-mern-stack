const express = require('express');
const User = require('../models/User');
const router = express.Router();


router.post('/', async (req, res) => {
    const { name, email, phoneNumber, role, password } = req.body; 

    
    if (!name || !email || !phoneNumber || !role || !password) {
        return res.status(400).json({ message: 'All fields are required.' });
    }

    const user = new User({ name, email, phoneNumber, role, password });
    
    try {
        await user.save();
        res.status(201).json(user);
    } catch (error) {
        console.error('Error creating user:', error); 
        res.status(500).json({ message: 'Error creating user', error: error.message });
    }
});


router.get('/', async (req, res) => {
    try {
        const users = await User.find();
        res.json(users);
    } catch (error) {
        console.error('Error retrieving users:', error); 
        res.status(500).json({ message: 'Error retrieving users', error: error.message });
    }
});


router.put('/:id', async (req, res) => {
    const { name, email, phoneNumber, role, password } = req.body; 

   
    if (!name && !email && !phoneNumber && !role && !password) {
        return res.status(400).json({ message: 'At least one field is required for update.' });
    }

    try {
        const user = await User.findByIdAndUpdate(
            req.params.id,
            { name, email, phoneNumber, role, password }, 
            { new: true }
        );

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        res.json(user);
    } catch (error) {
        console.error('Error updating user:', error); 
        res.status(500).json({ message: 'Error updating user', error: error.message });
    }
});

router.delete('/:id', async (req, res) => {
    try {
        const user = await User.findByIdAndDelete(req.params.id);

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        res.json({ message: 'User deleted' });
    } catch (error) {
        console.error('Error deleting user:', error); 
        res.status(500).json({ message: 'Error deleting user', error: error.message });
    }
});

module.exports = router;
