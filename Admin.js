 
import React, { useEffect, useState } from 'react';
import axios from 'axios';

function Admin() {
    const [messages, setMessages] = useState([]);
    const [users, setUsers] = useState([]);

    useEffect(() => {
        axios.get('/api/admin/messages').then(res => setMessages(res.data));
        axios.get('/api/admin/users').then(res => setUsers(res.data));
    }, []);

    const banUser = async (username) => {
        await axios.post('/api/admin/ban', { username });
        alert('User banned');
    };

    return (
        <div className="container">
            <h2>Admin Panel</h2>
            <h3>All Messages</h3>
            <div className="chat-box">
                {messages.map((msg, index) => <p key={index}><strong>{msg.sender}:</strong> {msg.message}</p>)}
            </div>
            <h3>Users</h3>
            <ul>
                {users.map((user, index) => (
                    <li key={index}>{user.username} <button onClick={() => banUser(user.username)}>Ban</button></li>
                ))}
            </ul>
        </div>
    );
}

export default Admin;
