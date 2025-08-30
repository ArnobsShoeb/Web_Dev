import React, { useEffect, useState } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import 'bootstrap/dist/css/bootstrap.min.css';
import backgroundImg from '../images/background.jpg'; // Adjust the path to your image file

export default function Payment() {
    const [user, setUser] = useState(null);
    const [profilePicture, setProfilePicture] = useState(null);
    const [amount, setAmount] = useState("");
    const [recipientEmail, setRecipientEmail] = useState("");
    const [paymentMethod, setPaymentMethod] = useState("bKash");
    const [bank, setBank] = useState("");
    const [phoneNumber, setPhoneNumber] = useState("");
    const [accountNumber, setAccountNumber] = useState("");
    const [topUpAmount, setTopUpAmount] = useState("");
    const [message, setMessage] = useState({ type: '', content: '' });

    const bankOptions = [
        "Dutch-Bangla Bank",
        "BRAC Bank",
        "Islami Bank",
        "Standard Chartered",
        "Eastern Bank",
    ];

    useEffect(() => {
        const email = localStorage.getItem('email');
        if (email) {
            fetchUserData(email);
        } else {
            setMessage({ type: 'error', content: 'No email found in local storage' });
        }
    }, []);

    const fetchUserData = async (email) => {
        try {
            const response = await fetch(`http://localhost:4000/api/fetchuserdata?email=${email}`);
            const data = await response.json();
            if (response.ok) {
                setUser(data);
                setProfilePicture(data.profilePicture ? `http://localhost:4000/${data.profilePicture}` : null);
            } else {
                setMessage({ type: 'error', content: 'Error fetching user data' });
            }
        } catch (error) {
            setMessage({ type: 'error', content: 'Error fetching user data' });
        }
    };

    const handlePayment = async (e) => {
        e.preventDefault();
        if (amount <= 0) {
            setMessage({ type: 'error', content: 'Invalid amount. Please enter a positive value.' });
            return;
        }

        const paymentDetails = {
            senderEmail: user.email,
            recipientEmail,
            amount,
            sendVia: paymentMethod,
            bankName: paymentMethod === 'Bank Transfer' ? bank : null,
            phoneNumber: paymentMethod !== 'Bank Transfer' ? phoneNumber : null,
            accountNumber: paymentMethod === 'Bank Transfer' ? accountNumber : null,
        };

        try {
            const response = await fetch('http://localhost:4000/api/submitpayment', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(paymentDetails),
            });
            const data = await response.json();
            if (response.ok) {
                setMessage({ type: 'success', content: 'Payment successful!' });
                // Optionally reset form fields
                setRecipientEmail('');
                setAmount('');
                setPhoneNumber('');
                setAccountNumber('');
                setBank('');
            } else {
                setMessage({ type: 'error', content: data.message });
            }
        } catch (error) {
            setMessage({ type: 'error', content: 'Error submitting payment' });
        }
    };

    const handleTopUp = async (e) => {
        e.preventDefault();
        if (topUpAmount <= 0) {
            setMessage({ type: 'error', content: 'Invalid top-up amount. Please enter a positive value.' });
            return;
        }

        try {
            const response = await fetch('http://localhost:4000/api/topup', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email: user.email, amount: topUpAmount }),
            });
            const data = await response.json();
            if (response.ok) {
                setUser((prev) => ({ ...prev, balance: data.balance }));
                setMessage({ type: 'success', content: 'Top-up successful!' });
                setTopUpAmount(''); // Clear top-up input field
            } else {
                setMessage({ type: 'error', content: data.message });
            }
        } catch (error) {
            setMessage({ type: 'error', content: 'Error processing top-up' });
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
                    padding: '20px',
                }}
            >
                <div className="card shadow-lg" style={{ maxWidth: '1100px', width: '100%', backgroundColor: 'rgba(255, 255, 255, 0.9)', borderRadius: '20px', padding: '20px' }}>
                    <div className="row g-0">
                        <div className="col-lg-6 d-flex flex-column justify-content-center align-items-center" style={{ padding: '30px', borderRight: '1px solid #ccc' }}>
                            {profilePicture && (
                                <div className="mb-4">
                                    <img
                                        src={profilePicture}
                                        alt="Profile"
                                        className="rounded-circle shadow"
                                        style={{ width: '120px', height: '120px', objectFit: 'cover', border: '5px solid #fff' }}
                                    />
                                </div>
                            )}
                            {user ? (
                                <>
                                    <h2 className="text-center" style={{ fontFamily: 'Poppins, sans-serif', fontWeight: '600', marginBottom: '15px' }}>
                                        {user.firstname} {user.lastname}
                                    </h2>
                                    <p className="lead text-center" style={{ fontSize: '1.1rem' }}>Email: {user.email}</p>
                                    <p className="text-center">User Type: {user.usertype}</p>
                                    <p className="text-center" style={{ fontSize: '1.2rem', fontWeight: '500' }}>Balance: <span style={{ color: '#28a745' }}>${user.balance}</span></p>
                                    <form onSubmit={handleTopUp} className="w-100">
                                        <div className="mb-3">
                                            <label htmlFor="topUpAmount" className="form-label">Top-up Amount</label>
                                            <input
                                                type="number"
                                                className="form-control"
                                                id="topUpAmount"
                                                placeholder="Enter amount"
                                                value={topUpAmount}
                                                onChange={(e) => setTopUpAmount(e.target.value)}
                                                required
                                                style={{ borderRadius: '10px', padding: '10px' }}
                                            />
                                        </div>
                                        <div className="d-grid">
                                            <button type="submit" className="btn btn-success" style={{ borderRadius: '10px', padding: '10px 0', fontSize: '1.1rem', fontWeight: '500' }}>
                                                Top-up Balance
                                            </button>
                                        </div>
                                    </form>
                                </>
                            ) : (
                                <div className="d-flex justify-content-center align-items-center" style={{ height: '200px' }}>
                                    <div className="spinner-border" role="status">
                                        <span className="visually-hidden">Loading...</span>
                                    </div>
                                </div>
                            )}
                        </div>

                        <div className="col-lg-6 d-flex align-items-center" style={{ padding: '30px' }}>
                            <form onSubmit={handlePayment} className="w-100">
                                <h3 className="text-center mb-4" style={{ fontFamily: 'Poppins, sans-serif', fontWeight: '600' }}>Send Payment</h3>

                                {message.content && (
                                    <div className={`alert alert-${message.type === 'error' ? 'danger' : 'success'} text-center`} role="alert">
                                        {message.content}
                                    </div>
                                )}

                                <div className="mb-3">
                                    <label htmlFor="recipientEmail" className="form-label">Recipient Email</label>
                                    <input
                                        type="email"
                                        className="form-control"
                                        id="recipientEmail"
                                        placeholder="Enter recipient's email"
                                        value={recipientEmail}
                                        onChange={(e) => setRecipientEmail(e.target.value)}
                                        required
                                        style={{ borderRadius: '10px', padding: '10px' }}
                                    />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="amount" className="form-label">Amount</label>
                                    <input
                                        type="number"
                                        className="form-control"
                                        id="amount"
                                        placeholder="Enter amount"
                                        value={amount}
                                        onChange={(e) => setAmount(e.target.value)}
                                        required
                                        style={{ borderRadius: '10px', padding: '10px' }}
                                    />
                                </div>

                                <div className="mb-3">
                                    <label htmlFor="paymentMethod" className="form-label">Send via</label>
                                    <select
                                        className="form-control"
                                        id="paymentMethod"
                                        value={paymentMethod}
                                        onChange={(e) => setPaymentMethod(e.target.value)}
                                        style={{ borderRadius: '10px', padding: '10px' }}
                                    >
                                        <option value="bKash">bKash</option>
                                        <option value="Rocket">Rocket</option>
                                        <option value="Bank Transfer">Bank Transfer</option>
                                    </select>
                                </div>

                                {paymentMethod === 'Bank Transfer' && (
                                    <div className="mb-3">
                                        <label htmlFor="bank" className="form-label">Bank Name</label>
                                        <select
                                            className="form-control"
                                            id="bank"
                                            value={bank}
                                            onChange={(e) => setBank(e.target.value)}
                                            required
                                            style={{ borderRadius: '10px', padding: '10px' }}
                                        >
                                            <option value="">Select Bank</option>
                                            {bankOptions.map((bankName) => (
                                                <option key={bankName} value={bankName}>{bankName}</option>
                                            ))}
                                        </select>
                                    </div>
                                )}

                                {paymentMethod === 'Bank Transfer' ? (
                                    <div className="mb-3">
                                        <label htmlFor="accountNumber" className="form-label">Account Number</label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            id="accountNumber"
                                            placeholder="Enter account number"
                                            value={accountNumber}
                                            onChange={(e) => setAccountNumber(e.target.value)}
                                            required
                                            style={{ borderRadius: '10px', padding: '10px' }}
                                        />
                                    </div>
                                ) : (
                                    <div className="mb-3">
                                        <label htmlFor="phoneNumber" className="form-label">Phone Number</label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            id="phoneNumber"
                                            placeholder="Enter phone number"
                                            value={phoneNumber}
                                            onChange={(e) => setPhoneNumber(e.target.value)}
                                            required
                                            style={{ borderRadius: '10px', padding: '10px' }}
                                        />
                                    </div>
                                )}

                                <div className="d-grid">
                                    <button type="submit" className="btn btn-primary" style={{ borderRadius: '10px', padding: '10px 0', fontSize: '1.1rem', fontWeight: '500' }}>
                                        Send Payment
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </>
    );
}
