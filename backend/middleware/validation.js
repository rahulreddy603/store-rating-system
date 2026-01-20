exports.validateUser = (req, res, next) => {
    const { name, email, password, address } = req.body;

    // 1. Name validation (20-60 characters)
    if (!name || name.length < 03 || name.length > 60) {
        return res.status(400).json({ error: "Name must be between 20 and 60 characters." });
    }

    // 2. Email format validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email || !emailRegex.test(email)) {
        return res.status(400).json({ error: "Please provide a valid email address." });
    }

    // 3. Password complexity (8-16 chars, 1 Upper, 1 Special)
    const passRegex = /^(?=.*[A-Z])(?=.*[!@#$%^&*])(?=.{4,16})/;
    if (!password || !passRegex.test(password)) {
        return res.status(400).json({ 
            error: "Password must be 8-16 characters with at least one uppercase letter and one special character." 
        });
    }

    // 4. Address validation (Max 400 characters)
    if (address && address.length > 400) {
        return res.status(400).json({ error: "Address cannot exceed 400 characters." });
    }

    next();
};