import React, { useEffect, useState } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import 'bootstrap/dist/css/bootstrap.min.css';
import '@fontsource/roboto'; // Import a font like Roboto from fontsource (or choose any font you prefer)
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
                    minHeight: '100vh',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    position: 'relative',
                }}
            >
                <div className="card" style={{ maxWidth: '900px', width: '90%', backgroundColor: 'rgba(255, 255, 255, 0.2)', position: 'relative', transform: 'scale(1.5)' }}>
                    <div className="card-body text-light" style={{ paddingTop: '7.5rem', backgroundColor: 'rgba(128, 128, 128, 0.4)' }}> {/* Gray background with 0.4 transparency */}
                        {profilePicture && (
                            <div className="d-flex justify-content-center" style={{ position: 'absolute', top: '-4.5rem', width: '100%' }}>
                                <img
                                    src={profilePicture}
                                    alt="Profile"
                                    className="rounded-circle"
                                    style={{ width: '150px', height: '150px', objectFit: 'cover', border: '5px solid white' }}
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
                                <p className="display-6 text-center colorful-name" style={styles.text}>User Name: {user.firstname} {user.lastname}</p>
                                <p className="lead text-center" style={styles.text}>Email: {user.email}</p>
                                <p className="text-center" style={styles.text}>User Type: {user.usertype}</p>
                                <p className="text-center" style={styles.text}>Joined on: {new Date(user.date).toLocaleDateString()}</p>
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
                {user && (
                    <div style={styles.balanceBox}>
                        <p style={styles.balanceText}>Balance: ${user.balance}</p>
                    </div>
                )}
            </div>
            <Footer />
        </>
    );
}

const styles = {
    balanceBox: {
        position: 'absolute',
        top: '20px',
        right: '20px',
        backgroundColor: '#FFC107', // Dark yellow background
        color: '#fff', // White text
        padding: '10px 20px',
        borderRadius: '5px',
        boxShadow: '0 4px 8px rgba(2,0,0,0.4)',
    },
    balanceText: {
        margin: 0,
        fontSize: '1.2rem',
        fontWeight: 'bold',
    },
    text: {
        fontFamily: 'Roboto, sans-serif', // Applying the Roboto font
    }
};
