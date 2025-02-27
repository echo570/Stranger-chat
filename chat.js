const express = require('express');
const Chat = require('../models/Chat');
const router = express.Router();

router.get('/', async (req, res) => {
    try {
        const chats = await Chat.find().sort({ timestamp: 1 });
        res.json(chats);
    } catch (err) {
        res.status(500).json({ msg: 'Server error' });
    }
});

module.exports = router;
