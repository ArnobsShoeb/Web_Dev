import React, { useState, useEffect } from 'react';
import axios from 'axios';

const PaymentHistory = () => {
    const [payments, setPayments] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    const fetchPaymentHistory = async () => {
        try {
            const response = await axios.get('http://localhost:3000/paymenthistory', {
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            setPayments(response.data);
            setLoading(false);
        } catch (err) {
            setError('Failed to fetch payment history');
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchPaymentHistory();
    }, []);

    if (loading) return <p>Loading...</p>;
    if (error) return <p>{error}</p>;

    return (
        <div>
            <h2>Payment History</h2>
            {payments.length === 0 ? (
                <p>No payments found</p>
            ) : (
                <table>
                    <thead>
                        <tr>
                            <th>Sender</th>
                            <th>Recipient</th>
                            <th>Amount</th>
                            <th>Send Via</th>
                            <th>Date</th>
                        </tr>
                    </thead>
                    <tbody>
                        {payments.map((payment) => (
                            <tr key={payment._id}>
                                <td>{payment.senderEmail}</td>
                                <td>{payment.recipientEmail}</td>
                                <td>{payment.amount}</td>
                                <td>{payment.sendVia}</td>
                                <td>{new Date(payment.date).toLocaleDateString()}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </div>
    );
};

export default PaymentHistory;
