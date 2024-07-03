import React, { useEffect, useState } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import 'bootstrap/dist/css/bootstrap.min.css';

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
            <div className="container d-flex justify-content-center align-items-center min-vh-100">
                <div className="card bg-primary text-white p-4 rounded">
                    {user ? (
                        <>
                            <h1 className="display-4">{user.firstname} {user.lastname}</h1>
                            <p className="lead">Email: {user.email}</p>
                            <p>User Type: {user.usertype}</p>
                            <p>Joined on: {new Date(user.date).toLocaleDateString()}</p>
                        </>
                    ) : (
                        <p>Loading...</p>
                    )}
                </div>
            </div>
            <Footer />
        </>
    );
}
