const { Store, Rating, User, sequelize } = require('../models');

// Used by Admin and Normal Users to see store lists
exports.getAllStores = async (req, res) => {
    try {
        const stores = await Store.findAll({
            attributes: [
                'id', 'name', 'email', 'address',
                [sequelize.fn('AVG', sequelize.col('Ratings.rating')), 'averageRating']
            ],
            include: [{ model: Rating, attributes: [] }],
            group: ['Store.id']
        });
        res.json(stores);
    } catch (err) { res.status(500).json({ error: err.message }); }
};

// Store Owner specific dashboard
exports.getOwnerDashboard = async (req, res) => {
    try {
        const store = await Store.findOne({ 
            where: { ownerId: req.user.id },
            include: [{ 
                model: Rating, 
                include: [{ model: User, attributes: ['name', 'email'] }] 
            }]
        });
        res.json(store);
    } catch (err) { res.status(500).json({ error: err.message }); }
};