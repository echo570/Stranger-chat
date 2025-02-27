const express = require('express');
const User = require('../models/User');
const Chat = require('../models/Chat');

const router = express.Router();

router.get('/users', async (req, res) => {
    try {
        const users = await User.find();
        res.json(users);
    } catch (err) {
        res.status(500).json({ msg: 'Server error' });
    }
});

router.put('/ban/:id', async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        if (!user) return res.status(404).json({ msg: 'User not found' });

        user.isBanned = !user.isBanned;
        await user.save();

        res.json({ msg: 'User status updated', user });
    } catch (err) {
        res.status(500).json({ msg: 'Server error' });
    }
});

router.get('/messages', async (req, res) => {
    try {
        const messages = await Chat.find().sort({ timestamp: -1 });
        res.json(messages);
    } catch (err) {
        res.status(500).json({ msg: 'Server error' });
    }
});

module.exports = router;
