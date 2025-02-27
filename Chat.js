 
import React, { useState, useEffect } from 'react';
import io from 'socket.io-client';
import axios from 'axios';

const socket = io();

function Chat() {
    const [message, setMessage] = useState('');
    const [messages, setMessages] = useState([]);

    useEffect(() => {
        socket.on('receiveMessage', (data) => {
            setMessages((prev) => [...prev, data]);
        });
    }, []);

    const sendMessage = async () => {
        socket.emit('sendMessage', { sender: 'User', message });
        await axios.post('/api/chat/send', { sender: 'User', message });
        setMessage('');
    };

    return (
        <div className="container">
            <h2>Chat Room</h2>
            <div className="chat-box">
                {messages.map((msg, index) => <p key={index}><strong>{msg.sender}:</strong> {msg.message}</p>)}
            </div>
            <input type="text" value={message} onChange={(e) => setMessage(e.target.value)} />
            <button onClick={sendMessage}>Send</button>
        </div>
    );
}

export default Chat;
