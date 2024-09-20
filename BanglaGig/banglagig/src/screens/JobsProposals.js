import React, { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { Table, Modal, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

export default function Proposals() {
  const [orders, setOrders] = useState([]);
  const [message, setMessage] = useState('');
  const [selectedOrder, setSelectedOrder] = useState(null); // State to hold selected order details
  const [showModal, setShowModal] = useState(false); // State to control modal visibility
  const navigate = useNavigate();
  const usertype = localStorage.getItem('usertype');
  const userEmail = localStorage.getItem('email'); // Retrieve user's email from localStorage
  const [isLoggedIn, setIsLoggedIn] = React.useState(false);
  const [username, setUsername] = React.useState('');
  const [userType, setUserType] = React.useState('');
  useEffect(() => {
    if (!localStorage.getItem('token')) {
      navigate('/');
    }

    const fetchOrders = async () => {
      try {
        const response = await fetch('http://localhost:4000/api/myorders', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ userEmail, usertype }),
        });

        if (response.ok) {
          const data = await response.json();
          setOrders(data.orders);
        } else {
          setMessage('Failed to load orders. Please try again.');
        }
      } catch (error) {
        console.error('Error fetching orders:', error);
        setMessage('Failed to load orders. Please try again.');
      }
    };

    fetchOrders();
  }, [navigate, userEmail, usertype]);

  const handleShowModal = (order) => {
    setSelectedOrder(order); // Set the selected order details
    setShowModal(true); // Show the modal
  };

  const handleCloseModal = () => {
    setShowModal(false); // Hide the modal
    setSelectedOrder(null); // Clear the selected order
  };

  return (
    <div>
      <Navbar />
      <div className="container mt-5">
        <h3 className="text-center mb-4">Jobs & Proposals</h3>
        {message && <div className="alert alert-info">{message}</div>}
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>Order ID</th>
              <th>Buyer Email</th>
              <th>Job Title</th>
              <th>Job Description</th>
              <th>Deadline</th>
            </tr>
          </thead>
          <tbody>
            {orders.length > 0 ? (
              orders.map(order => (
                <tr key={order._id}>
                  <td>
                    <Button variant="link" onClick={() => handleShowModal(order)}>
                      {order._id}
                    </Button>
                  </td>
                  <td>{order.buyerEmail}</td>
                  <td>{order._id}</td>
                  <td>{order.buyerEmail}</td>
                  <td>{new Date(order.orderDeadline).toLocaleDateString()}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5" className="text-center">No active jobs found</td>
              </tr>
            )}
          </tbody>
        </Table>
      </div>

      {/* Modal to show order details */}
      

      <Footer />
    </div>
  );
}
