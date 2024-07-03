import React, { useEffect, useState } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import 'bootstrap/dist/css/bootstrap.min.css';
import backgroundImg from '../images/background.jpg'; // Adjust the path to your image file

export default function UserDetails() {
    const [user, setUser] = useState(null);

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
            })
            .catch(error => {
                console.error('Error fetching user data:', error);
            });
        } else {
            console.error('No email found');
        }
    }, []);

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
                <div className="card" style={{ maxWidth: '600px', width: '90%', backgroundColor: 'rgba(255, 255, 255, 0.1)' }}>
                    <div className="card-body text-light">
                        {user ? (
                            <>
                                <p className="display-6 text-center" style={{ fontFamily: 'Poppins, sans-serif' }}>User Name: {user.firstname} {user.lastname}</p>
                                <p className="lead text-center">Email: {user.email}</p>
                                <p className="text-center">User Type:  {user.usertype}</p>
                                <p className="text-center">Joined on: {new Date(user.date).toLocaleDateString()}</p>
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
