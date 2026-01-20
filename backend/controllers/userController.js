const { User, Store, Rating } = require('../models');
const { Op } = require('sequelize');

exports.getAdminStats = async (req, res) => {
    try {
        const userCount = await User.count();
        const storeCount = await Store.count();
        const ratingCount = await Rating.count();
        res.json({ totalUsers: userCount, totalStores: storeCount, totalRatings: ratingCount });
    } catch (err) { res.status(500).json({ error: err.message }); }
};

exports.getUsers = async (req, res) => {
    const { name, email, role } = req.query;
    try {
        const users = await User.findAll({
            where: {
                ...(name && { name: { [Op.like]: `%${name}%` } }),
                ...(email && { email: { [Op.like]: `%${email}%` } }),
                ...(role && { role })
            },
            attributes: { exclude: ['password'] }
        });
        res.json(users);
    } catch (err) { res.status(500).json({ error: err.message }); }
};