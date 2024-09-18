import React, { useEffect, useState } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import 'bootstrap/dist/css/bootstrap.min.css';
import backgroundImg from '../images/background.jpg'; // Adjust the path to your image file

export default function UserDetails() {
    const [user, setUser] = useState(null);
    const [profilePicture, setProfilePicture] = useState(null);
    const [uploadStatus, setUploadStatus] = useState('');
    const [isProfilePicUploaded, setIsProfilePicUploaded] = useState(false);

    useEffect(() => {
        const email = localStorage.getItem('email');

        if (email) {
            fetch(`http://localhost:4000/api/fetchuserdata?email=${email}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                }
            })
            .then(response => {
                if (!response.ok) {
                    throw new Error(`Network response was not ok: ${response.statusText}`);
                }
                return response.json();
            })
            .then(data => {
                console.log('User data fetched:', data);
                setUser(data);
                setIsProfilePicUploaded(!!data.profilePicture);
                if (data.profilePicture) {
                    setProfilePicture(`http://localhost:4000/${data.profilePicture}`);
                }
            })
            .catch(error => {
                console.error('Error fetching user data:', error);
            });
        } else {
            console.error('No email found');
        }
    }, []);

    const handleProfilePictureChange = async (e) => {
        if (e.target.files && e.target.files[0]) {
            const formData = new FormData();
            formData.append('profilePicture', e.target.files[0]);
            formData.append('email', user.email);

            try {
                const response = await fetch('http://localhost:4000/api/setpropic', {
                    method: 'POST',
                    body: formData
                });
                const data = await response.json();
                if (response.ok) {
                    setProfilePicture(`http://localhost:4000/${data.user.profilePicture}`);
                    setUploadStatus('Profile picture updated successfully');
                } else {
                    console.error('Error uploading profile picture:', data.message);
                    setUploadStatus('Error uploading profile picture');
                }
            } catch (error) {
                console.error('Error uploading profile picture:', error);
                setUploadStatus('Error uploading profile picture');
            }
        }
    };

    return (
        <>
            <Navbar />
            <div
                className="container-fluid d-flex justify-content-center align-items-center"
                style={{
                    backgroundImage: `url(${backgroundImg})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    minHeight: '100vh', // Cover the entire viewport height
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                }}
            >
                <div className="card" style={{ maxWidth: '600px', width: '90%', backgroundColor: 'rgba(255, 255, 255, 0.1)', position: 'relative' }}>
                    <div className="card-body text-light" style={{ paddingTop: '5rem' }}>
                        {profilePicture && (
                            <div className="d-flex justify-content-center" style={{ position: 'absolute', top: '-3rem', width: '100%' }}>
                                <img
                                    src={profilePicture}
                                    alt="Profile"
                                    className="rounded-circle"
                                    style={{ width: '100px', height: '100px', objectFit: 'cover', border: '5px solid white' }}
                                />
                            </div>
                        )}
                        <div className="d-flex justify-content-center mb-3">
                            <input
                                type="file"
                                onChange={handleProfilePictureChange}
                                style={{ display: 'none' }}
                                id="profilePictureInput"
                            />
                            <label htmlFor="profilePictureInput" className="btn btn-primary">
                                {isProfilePicUploaded ? 'Change Profile Pic' : 'Upload Profile Pic'}
                            </label>
                        </div>
                        {uploadStatus && (
                            <div className="alert alert-info text-center">
                                {uploadStatus}
                            </div>
                        )}
                        {user ? (
                            <>
                                <p className="display-6 text-center" style={{ fontFamily: 'Poppins, sans-serif' }}>User Name: {user.firstname} {user.lastname}</p>
                                <p className="lead text-center">Email: {user.email}</p>
                                <p className="text-center">User Type: {user.usertype}</p>
                                <p className="text-center">User Balance: {user.balance}</p>
                                <p className="text-center">Joined on: {new Date(user.date).toLocaleDateString()}</p>
                                {user.usertype === 'buyer' && (
                                    <div className="text-center mt-3">
                                        <a href="/payment" className="btn btn-success">Go to Payment</a>
                                    </div>
                                )}
                            </>
                        ) : (
                            <div className="d-flex justify-content-center align-items-center" style={{ height: '200px' }}>
                                <div className="spinner-border" role="status">
                                    <span className="visually-hidden">Loading...</span>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
            <Footer />
        </>
    );
}
