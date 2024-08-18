const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const User = require('../Models/users');

exports.getCurrentUser = async (req, res) => {
    const token = req.headers.authorization.split(' ')[1];

    if (!token) {
        return res.status(401).send('No token provided');
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const user = await User.findById(decoded.userId);

        if (!user) {
            return res.status(404).send('User not found');
        }

        res.send({
            success: true,
            message: 'You are authorized to go to the protected route!',
            data: user
        });
    } catch (err) {
        console.error('Error verifying token:', err);
        res.status(500).send('Failed to authenticate token');
    }
}

exports.updateUser = async (req, res) => {
    const token = req.headers.authorization.split(' ')[1];

    if (!token) {
        return res.status(401).send('No token provided');
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const user = await User.findById(decoded.userId);

        if (!user) {
            return res.status(404).send('User not found');
        }

        const { name, email } = req.body;

        if (!name || !email) {
            return res.status(400).send('All fields are required');
        }

        user.name = name;
        user.email = email;

        await user.save();

        res.send({
            success: true,
            message: 'User updated successfully'
        });
    } catch (err) {
        console.error('Error updating user:', err);
        res.status(500).send('Failed to update user');
    }
}