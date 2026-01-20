const { Rating } = require('../models');

exports.submitRating = async (req, res) => {
    const { storeId, rating } = req.body;
    
    // REMOVE '' FROM THE END OF THIS LINE
    if (rating < 1 || rating > 5) return res.status(400).json({ error: "Rating must be 1-5." });

    try {
        const [userRating, created] = await Rating.upsert({
            userId: req.user.id,
            storeId,
            rating
        });
        res.json({ message: created ? "Rating submitted" : "Rating updated" });
    } catch (err) { 
        res.status(500).json({ error: err.message }); 
    }
};