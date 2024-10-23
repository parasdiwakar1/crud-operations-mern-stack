import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import Auth from './components/Auth';
import UserForm from './components/UserForm';
import MessageForm from './components/MessageForm';
import './App.css'; 

const App = () => {
    const userId = 'some-user-id'; 

    return (
        <Router>
            <div>
                <nav className="navbar">
                    <ul>
                        <li>
                            <Link to="/">Login</Link>
                        </li>
                        <li>
                            <Link to="/users">User Form</Link>
                        </li>
                        <li>
                            <Link to="/messages">Message Form</Link>
                        </li>
                    </ul>
                </nav>

                <Routes>
                    <Route path="/" element={<Auth />} />
                    <Route path="/users" element={<UserForm />} />
                    <Route path="/messages" element={<MessageForm userId={userId} />} />
                </Routes>
            </div>
        </Router>
    );
};

export default App;
