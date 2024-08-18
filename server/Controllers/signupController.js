const User = require('../Models/users');
const bcrypt = require('bcryptjs');
const saltRounds = 10;
exports.createUser = async (req, res) => {

    console.log("Received data:", req.body);


    try {
        const myPlaintextPassword = req.body.password;
        req.body.password = await bcrypt.hash(myPlaintextPassword, saltRounds);

        const data = {
            name: req.body.name,
            email: req.body.email,
            password: req.body.password
        };

        const checkingForEmail = await User.findOne({ email: data.email });
        if (checkingForEmail) {
            return res.status(409).json({ success: false, message: 'User already exists' });
        } else {
            await User.insertMany([data]);
            return res.json({ success: true, message: 'User created successfully' });
        }
    } catch (err) {
        console.error("Error during signup:", err);
        return res.status(500).json({ success: false, message: 'Internal Server Error' });
    }
};

exports.googleSignup = async (req, res) => {
    console.log('Google Signup Request:', req.body);
    const { email } = req.body;
    console.log('Email:', email);

    try {
        const checkingForEmail = await User.findOne({ email });
        if (checkingForEmail) {
            console.log('User already exists');
            return res.status(409).json({ success: true, message: 'User already exists' });
        } else {
            const data = { email };
            await User.insertMany([data]);
            console.log('User created successfully');
            return res.json({ success: true, message: 'User created successfully' });
        }
    } catch (err) {
        console.error("Error during Google signup:", err);
        return res.status(500).json({ success: false, message: 'Internal Server Error' });
    }
};
