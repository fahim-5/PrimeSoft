
const express = require('express');
const router = express.Router();



router.get('/:id', (req, res) => {
    const projectId = req.params.id;
    res.status(200).json({ message: `Get project ID: ${projectId} endpoint called.` });
});

module.exports = router;