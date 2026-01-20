const { User } = require('../models');
const jwt = require('jsonwebtoken');

// Ensure the word 'exports' is used so the Router can see it
exports.signup = async (req, res) => {
    try {
        const { name, email, password, address } = req.body;
        const user = await User.create({ name, email, password, address, role: 'user' });
        res.status(201).json({ message: "User created", user });
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ where: { email } });

        if (!user || user.password !== password) {
            return res.status(401).json({ error: "Invalid credentials" });
        }

        const token = jwt.sign({ id: user.id, role: user.role }, process.env.JWT_SECRET);
        res.json({ token, user: { name: user.name, role: user.role } });
    } catch (err) {
        res.status(500).json({ error: "Server error" });
    }
};