const User = require('../Models/users');
let jwt = require('jsonwebtoken');
let bcrypt = require('bcryptjs');

exports.getUser = async (req, res) => {
    try {
        const data = {
            email: req.body.email,
            password: req.body.password
        };
        const loginUser = await User.findOne({ email: data.email });
        if(!loginUser) {
            res.status(401).send('No user found');
            return;
        }
        else{
            const valid = await bcrypt.compare(data.password, loginUser.password);
            if(valid){
                const token = jwt.sign({ userId: loginUser._id }, process.env.JWT_SECRET, { expiresIn: '1d' });
                // localStorage.setItem('token', token);
                res.json({ success: true, token: token, redirectUrl: process.env.CLIENT_URL2 });
            }
            else{
                res.status(401).json({ success: false, message: 'Invalid Credentials' });
            }
        }
    } catch (err) {
        res.json({ message: err });
    }
}