const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

mongoose.connect('mongodb://localhost:27017/strangerchat', { useNewUrlParser: true, useUnifiedTopology: true });

const User = mongoose.model('User', new mongoose.Schema({ username: String, password: String, isBanned: Boolean }));
const Message = mongoose.model('Message', new mongoose.Schema({ sender: String, message: String }));

app.use(cors());
app.use(bodyParser.json());

const secretKey = 'supersecretkey';

app.post('/register', async (req, res) => {
    const hashedPassword = await bcrypt.hash(req.body.password, 10);
    const user = new User({ username: req.body.username, password: hashedPassword, isBanned: false });
    await user.save();
    res.json({ message: 'User registered' });
});

app.post('/login', async (req, res) => {
    const user = await User.findOne({ username: req.body.username });
    if (user && await bcrypt.compare(req.body.password, user.password)) {
        const token = jwt.sign({ username: user.username }, secretKey);
        res.json({ token });
    } else {
        res.status(401).json({ message: 'Invalid credentials' });
    }
});

io.on('connection', (socket) => {
    socket.on('message', async (msg) => {
        await new Message(msg).save();
        io.emit('message', msg);
    });
});

server.listen(5000, () => console.log('Server running on port 5000'));
