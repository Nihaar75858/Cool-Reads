import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { CgProfile } from 'react-icons/cg';

const Profile = () => {
    const [email, setEmail] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [error, setError] = useState('');
    const [profilePic, setProfilePic] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchUserData = async () => {
            const user = JSON.parse(localStorage.getItem("user"));

            if (user) {
                try {

                    // Prefill form with existing data
                    setFirstName(user.firstName || '');
                    setLastName(user.lastName || '');
                    setEmail(user.email || '');
                } catch (err) {
                    console.error('Error fetching user data:', err);
                    setError('Unable to fetch user data.');
                }
            }
        };

        fetchUserData();
    }, []);

    const handleRegister = async (e) => {
        e.preventDefault();
        if (password !== confirmPassword) {
            setError('Passwords do not match');
            return;
        }

        try {
            const userId = localStorage.getItem('userId');
            const res = await axios.put(`http://localhost:5000/api/user/update/${userId}`, {
                firstName,
                lastName,
                email,
                password,
            });

            if (res.data.success) {
                alert('Profile updated successfully');
                navigate('/dashboard'); // or wherever appropriate
            } else {
                setError(res.data.message || 'Update failed');
            }
        } catch (err) {
            console.error(err);
            setError('An error occurred while updating the profile');
        }
    };

    const handleProfilePicChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setProfilePic(reader.result);
            };
            reader.readAsDataURL(file);
        }
    };


    return (
        <div className="min-h-screen flex">
            <div className="w-full flex items-center justify-center bg-custombg p-8">
                <div className="w-full max-w-md bg-white p-8 rounded-lg shadow-lg">
                    <h2 className="text-3xl font-bold mb-6 text-center">Edit Profile</h2>
                    <form onSubmit={handleRegister}>
                        <div className="mb-4">
                            <div className="mb-6 flex flex-col items-center">
                                <div className="w-24 h-24 rounded-full overflow-hidden border border-gray-300 bg-gray-200 flex items-center justify-center">
                                    {profilePic ? (
                                        <img src={profilePic} alt="Profile" className="w-full h-full object-cover" />
                                    ) : (
                                        <CgProfile className="text-5xl text-gray-500" />
                                    )}
                                </div>
                                <label className="mt-2 text-blue-600 cursor-pointer hover:underline">
                                    Upload your Photo
                                    <input
                                        type="file"
                                        accept="image/*"
                                        onChange={handleProfilePicChange}
                                        className="hidden"
                                    />
                                </label>
                            </div>
                            <div className="flex space-x-4">
                                <div className="flex flex-col w-1/2">
                                    <label className="text-gray-700 mb-2" htmlFor="firstName">First Name</label>
                                    <input
                                        type="text"
                                        id="firstName"
                                        value={firstName}
                                        onChange={(e) => setFirstName(e.target.value)}
                                        className="px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-400"
                                        required
                                    />
                                </div>

                                <div className="flex flex-col w-1/2">
                                    <label className="text-gray-700 mb-2" htmlFor="lastName">Last Name</label>
                                    <input
                                        type="text"
                                        id="lastName"
                                        value={lastName}
                                        onChange={(e) => setLastName(e.target.value)}
                                        className="px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-400"
                                        required
                                    />
                                </div>
                            </div>
                        </div>

                        <div className="mb-4">
                            <label className="text-gray-700 mb-2" htmlFor="email">Email</label>
                            <input
                                type="email"
                                id="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-400"
                                required
                            />
                        </div>

                        <div className="mb-4">
                            <label className="text-gray-700 mb-2" htmlFor="password">Password</label>
                            <input
                                type={showPassword ? 'text' : 'password'}
                                id="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-400"
                                placeholder="Enter new password"
                            />
                        </div>

                        {error && <div className="mb-4 text-red-500 text-center">{error}</div>}
                        <div className="flex space-x-4">
                            <div className="flex flex-col w-1/2">
                                <button
                                    type="submit"
                                    className="w-full bg-red-600 text-white py-2 rounded-lg hover:bg-red-700 transition duration-300"
                                >
                                    Save Changes
                                </button>
                            </div>

                            <div className="flex flex-col w-1/2">
                                <button
                                    type="button"
                                    onClick={() => navigate('/authordashboard')}
                                    className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition duration-300"
                                >
                                    Cancel
                                </button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Profile;
