const express = require('express');
const router = express.Router();
const requireAuth = require('../middleware/authMiddleware');

router.get('/', requireAuth, (req, res) => {
    res.json({
        message: `Welcome to your dashboard, ${req.session.user.username}`
    });
});

module.exports = router;