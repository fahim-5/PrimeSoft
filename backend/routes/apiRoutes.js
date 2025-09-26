const express = require('express');
const router = express.Router();
const projectRoutes = require('./projectRoutes');



router.get('/health', (req, res) => {
    res.status(200).json({ 
        message: "API v1 is healthy", 
        timestamp: new Date().toISOString()
    });
});


// === Mount Sub-Routers ===
// router.use('/auth', authRoutes);         // e.g., POST /api/v1/auth/register
// router.use('/users', userRoutes);       // e.g., GET /api/v1/users/profile
router.use('/projects', projectRoutes);   




router.get('/test', (req, res) => {
    res.status(200).json({ 
        data: "API v1 test endpoint reached successfully." 
    });
});

module.exports = router;
