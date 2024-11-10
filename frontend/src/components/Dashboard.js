// src/components/Dashboard.js
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Toast } from 'react-bootstrap'; // Import Toast for displaying messages

function Dashboard() {
    const navigate = useNavigate();
    const [users, setUsers] = useState([]);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const [showErrorToast, setShowErrorToast] = useState(false);
    const [showSuccessToast, setShowSuccessToast] = useState(false);

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const token = localStorage.getItem('token');
                const response = await axios.get('mern-stack-registration-login-forget-password-api.vercel.app/api/alluser', {
                    headers: { Authorization: `Bearer ${token}` },
                });
                setUsers(response.data);
                setSuccess('Users fetched successfully');
                setShowSuccessToast(true);
            } catch (error) {
                console.error('Error fetching users:', error);
                setError('Failed to fetch users');
                setShowErrorToast(true);
                if (error.response && error.response.status === 401) {
                    navigate('/login');
                }
            }
        };

        fetchUsers();
    }, [navigate]);

    const handleLogout = () => {
        localStorage.removeItem('token');
        navigate('/login');
    };

    return (
        <div className="col-md-8 offset-md-2">
            <h2>Dashboard</h2>
            <p>Welcome! You are logged in.</p>
            <button onClick={handleLogout} className="btn btn-danger mb-4">Logout</button>

            <h3>All Users</h3>

            {/* Table for displaying users */}
            <table className="table table-bordered">
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {users.map((user) => (
                        <tr key={user._id}>
                            <td>{user.name}</td>
                            <td>{user.email}</td>
                            <td>
                                <a className="btn btn-primary me-2">Edit</a>
                                <a className="btn btn-danger">Delete</a>
                            </td>
                        </tr>
                    ))}
                </tbody>

            </table>

            {/* Success Toast */}
            {showSuccessToast && (
                <Toast
                    style={{
                        position: 'absolute',
                        top: '10px',
                        right: '10px',
                        zIndex: 10,
                    }}
                    onClose={() => setShowSuccessToast(false)}
                    delay={3000}
                    autohide
                >
                    <Toast.Body>{success}</Toast.Body>
                </Toast>
            )}

            {/* Error Toast */}
            {showErrorToast && (
                <Toast
                    style={{
                        position: 'absolute',
                        top: '10px',
                        right: '10px',
                        zIndex: 10,
                    }}
                    onClose={() => setShowErrorToast(false)}
                    delay={3000}
                    autohide
                >
                    <Toast.Body>{error}</Toast.Body>
                </Toast>
            )}
        </div>
    );
}

export default Dashboard;
