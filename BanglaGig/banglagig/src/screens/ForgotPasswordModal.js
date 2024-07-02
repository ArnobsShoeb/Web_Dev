import React, { useState } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';

function ForgotPasswordModal({ show, handleClose }) {
    const [email, setEmail] = useState('');
    const [otp, setOtp] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [showEmailForm, setShowEmailForm] = useState(true);
    const [showOtpForm, setShowOtpForm] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');

    const handleSendEmail = async () => {
        try {
            const response = await fetch('http://localhost:4000/api/send-reset-mail', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email }),
            });

            const data = await response.json();
            if (data.success) {
                setShowEmailForm(false);
                setShowOtpForm(true);
                alert('OTP has been sent to your email.');
            } else {
                setErrorMessage(data.message); 
            }
        } catch (error) {
            console.error('Error sending OTP:', error);
            setErrorMessage('Failed to send OTP. Please try again later.');
        }
    };

    const handleVerifyOtp = async () => {
        try {
            const response = await fetch('http://localhost:4000/api/verify-otp', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, otp, newPassword }),
            });

            const data = await response.json();
            if (data.message === 'Password reset successful.') {
                alert('Password reset successful.');
                handleClose();
            } else {
                setErrorMessage('Failed to reset password. Please try again.');
            }
        } catch (error) {
            console.error('Error resetting password:', error);
            setErrorMessage('Failed to reset password. Please try again later.');
        }
    };

    const handleSubmitEmail = (e) => {
        e.preventDefault();
        handleSendEmail();
    };

    const handleSubmitOtp = (e) => {
        e.preventDefault();
        handleVerifyOtp();
    };

    return (
        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>{showEmailForm ? 'Forgot Password' : 'Verify OTP'}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                {errorMessage && <p className="text-danger">{errorMessage}</p>}
                {showEmailForm && (
                    <Form onSubmit={handleSubmitEmail}>
                        <Form.Group controlId="formEmail">
                            <Form.Label>Email address</Form.Label>
                            <Form.Control
                                type="email"
                                placeholder="Enter email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </Form.Group>
                        <Button variant="primary" type="submit" className="mt-3">
                            Send OTP
                        </Button>
                    </Form>
                )}
                {showOtpForm && (
                    <Form onSubmit={handleSubmitOtp} className="mt-3">
                        <Form.Group controlId="formOtp">
                            <Form.Label>Enter OTP</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Enter OTP"
                                value={otp}
                                onChange={(e) => setOtp(e.target.value)}
                            />
                        </Form.Group>
                        <Form.Group controlId="formNewPassword">
                            <Form.Label>New Password</Form.Label>
                            <Form.Control
                                type="password"
                                placeholder="Enter new password"
                                value={newPassword}
                                onChange={(e) => setNewPassword(e.target.value)}
                            />
                        </Form.Group>
                        <Button variant="primary" type="submit">
                            Reset Password
                        </Button>
                    </Form>
                )}
            </Modal.Body>
        </Modal>
    );
}

export default ForgotPasswordModal;
