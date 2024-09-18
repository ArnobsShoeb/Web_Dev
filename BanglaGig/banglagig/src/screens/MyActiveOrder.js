import React, { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { Table, Modal, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

export default function MyActiveOrder() {
  const [orders, setOrders] = useState([]);
  const [message, setMessage] = useState('');
  const [selectedOrder, setSelectedOrder] = useState(null); // State to hold selected order details
  const [showModal, setShowModal] = useState(false); // State to control modal visibility
  const navigate = useNavigate();
  const usertype = localStorage.getItem('usertype');
  const userEmail = localStorage.getItem('email'); // Retrieve user's email from localStorage

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
        <h3 className="text-center mb-4">My Active Orders</h3>
        {message && <div className="alert alert-info">{message}</div>}
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>Order ID</th>
              <th>Buyer Email</th>
              <th>Seller Email</th>
              <th>Order Deadline</th>
              <th>Ordered Date</th>
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
                  <td>{order.sellerEmail}</td>
                  <td>{new Date(order.orderDeadline).toLocaleDateString()}</td>
                  <td>{new Date(order.orderedDate).toLocaleDateString()}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5" className="text-center">No active orders found</td>
              </tr>
            )}
          </tbody>
        </Table>
      </div>

      {/* Modal to show order details */}
      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>Order Details</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {selectedOrder ? (
            <div>
              <p><strong>Order ID:</strong> {selectedOrder._id}</p>
              <p><strong>Buyer Email:</strong> {selectedOrder.buyerEmail}</p>
              <p><strong>Seller Email:</strong> {selectedOrder.sellerEmail}</p>
              <p><strong>Order Deadline:</strong> {new Date(selectedOrder.orderDeadline).toLocaleDateString()}</p>
              <p><strong>Ordered Date:</strong> {new Date(selectedOrder.orderedDate).toLocaleDateString()}</p>
              <p><strong>Gig Title:</strong> {selectedOrder.gigInfo ? selectedOrder.gigInfo.title : 'Loading...'}</p>
              <p><strong>Gig Description:</strong> {selectedOrder.gigInfo ? selectedOrder.gigInfo.description : 'Loading...'}</p>
              {/* You can include more details as necessary */}
            </div>
          ) : (
            <p>No order details available</p>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>

      <Footer />
    </div>
  );
}
