const Chat = require('../models/Chat');

module.exports = (io) => {
    io.on('connection', (socket) => {
        socket.on('message', async (data) => {
            const chat = new Chat({ sender: data.sender, message: data.message });
            await chat.save();
            io.emit('message', chat);
        });
    });
};
