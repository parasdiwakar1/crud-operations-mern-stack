import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './MessageForm.css';

function MessageForm() {
    const [messages, setMessages] = useState([]);
    const [newMessage, setNewMessage] = useState('');
    const [username, setUsername] = useState('');
    const [editMessageId, setEditMessageId] = useState(null);
    const [editMessage, setEditMessage] = useState('');

    useEffect(() => {
        fetchMessages();
    }, []);

    const fetchMessages = async () => {
        const response = await axios.get('http://localhost:5000/api/messages');
        setMessages(response.data);
    };

    const createMessage = async () => {
        if (newMessage.trim() && username.trim()) {
            await axios.post('http://localhost:5000/api/messages', {
                username: username,
                message: newMessage
            });
            setNewMessage('');
            setUsername('');
            fetchMessages();
        }
    };

    const deleteMessage = async (id) => {
        await axios.delete(`http://localhost:5000/api/messages/${id}`);
        fetchMessages();
    };

    const updateMessage = async () => {
        await axios.put(`http://localhost:5000/api/messages/${editMessageId}`, { message: editMessage });
        setEditMessageId(null);
        setEditMessage('');
        fetchMessages();
    };

    return (
        <div className="message-app">
            <h1>Message Board</h1>
            <div className="message-create">
                <input
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    placeholder="Enter your name"
                />
                <input
                    type="text"
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    placeholder="Write a new message..."
                />
                <button onClick={createMessage}>Send</button>
            </div>

            <div className="message-list">
                {messages.map((msg) => (
                    <div key={msg._id} className="message-item">
                        <h3>{msg.username}</h3>
                        {editMessageId === msg._id ? (
                            <>
                                <input
                                    type="text"
                                    value={editMessage}
                                    onChange={(e) => setEditMessage(e.target.value)}
                                />
                                <button onClick={updateMessage}>Update</button>
                            </>
                        ) : (
                            <>
                                <p>{msg.message}</p>
                                <button onClick={() => {
                                    setEditMessageId(msg._id);
                                    setEditMessage(msg.message);
                                }}>Edit</button>
                                <button onClick={() => deleteMessage(msg._id)}>Delete</button>
                            </>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
}

export default MessageForm;
