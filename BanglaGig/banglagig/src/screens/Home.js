import React, { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import Carousel from '../components/Carousel';
import { Link, useNavigate } from 'react-router-dom';
import { Modal, Button, Form } from 'react-bootstrap';
import HomeBackground from '../images/HomeBackground.jpg';

export default function Home() {
  const [gigs, setGigs] = useState([]);
  const [filteredGigs, setFilteredGigs] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [message, setMessage] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [showModal, setShowModal] = useState(false);
  const [selectedGig, setSelectedGig] = useState(null);
  const [orderDeadline, setOrderDeadline] = useState('');
  const [orderStatus, setOrderStatus] = useState('');
  const [showSuccessModal, setShowSuccessModal] = useState(false); 
  const [hoveredCardId, setHoveredCardId] = useState(null); 
  const navigate = useNavigate();
  const usertype = localStorage.getItem('usertype');
  const buyerEmail = localStorage.getItem('email'); 

  useEffect(() => {
    if (!localStorage.getItem('token')) {
      navigate('/');
    }

    const fetchGigs = async (page = 1, query = '') => {
      try {
        const response = await fetch(`http://localhost:4000/api/getgigs?page=${page}&search=${query}`);
        if (response.ok) {
          const data = await response.json();
          setGigs(data.gigs);
          setFilteredGigs(data.gigs);
          setTotalPages(data.totalPages);
        } else {
          setMessage('Failed to load gigs. Please try again.');
        }
      } catch (error) {
        console.error('Error fetching gigs:', error);
        setMessage('Failed to load gigs. Please try again.');
      }
    };

    fetchGigs(currentPage, searchTerm);
  }, [currentPage, searchTerm, navigate]);

  const handleSearch = (term) => {
    setSearchTerm(term);
    setFilteredGigs(gigs.filter(gig => gig.title.toLowerCase().includes(term.toLowerCase())));
    setCurrentPage(1);
  };

  const openModal = (gig) => {
    setSelectedGig(gig);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setSelectedGig(null);
    setOrderDeadline('');
    setOrderStatus('');
  };

  const handleOrder = async () => {
    if (selectedGig && usertype === 'Buyer') {
      try {
        const response = await fetch('http://localhost:4000/api/placeorder', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Buyer-Email': buyerEmail, 
          },
          body: JSON.stringify({
            buyerEmail,
            sellerEmail: selectedGig.email, 
            orderDeadline,
            gigId: selectedGig._id,
          }),
        });
        if (response.ok) {
          setOrderStatus('Order placed successfully');
          closeModal();
          setShowSuccessModal(true); 
        } else {
          setOrderStatus('Error placing order');
        }
      } catch (error) {
        console.error('Error placing order:', error);
        setOrderStatus('Error placing order');
      }
    } else {
      setOrderStatus('Only buyers can place orders');
    }
  };

  const goToNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const goToPreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const styles = {
    container: {
      position: 'relative',
      margin: 0, 
      padding: 0, 
      backgroundImage: `url(${HomeBackground})`, 
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      minHeight: '100vh',
      overflow: 'hidden',
    },
    overlay: {
      position: 'absolute',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      backgroundColor: 'rgba(0, 0, 0, 0.5)', 
      zIndex: 1,
    },
    content: {
      position: 'relative',
      zIndex: 2,
      margin: 0, 
      padding: 0, 
    },
    card: {
      transition: 'transform 0.3s ease',
      cursor: 'pointer',
    },
    cardHovered: {
      transform: 'scale(1.10)', 
    },
    cardImg: {
      width: '100%',
      height: '200px',
      objectFit: 'cover',
    },
    imgFluid: {
      width: '100%',
      height: 'auto',
      maxHeight: '400px',
      objectFit: 'cover',
    },
    paginationControls: {
      marginTop: '1rem',
      textAlign: 'center',
      
    },
    buttonGroup: {
      display: 'flex',
      justifyContent: 'center',
      gap: '1rem',
      
    },
    btnPrimary: {
      backgroundColor: '#007bff',
      borderColor: '#007bff',
      color: '#fff',
      borderRadius: '5px',
      padding: '10px 20px',
      fontSize: '1.25rem',
      textDecoration: 'none',
    },
    btnSecondary: {
      backgroundColor: "Green",
      borderColor: '#6c757d',
      color: '#fff',
      borderRadius: '5px',
      padding: '10px 20px',
      fontSize: '1.25rem',
      textDecoration: 'none',
    },
  };

  return (
    <div style={styles.container}>
      <div style={styles.overlay}></div> 
      <div style={styles.content}>
        <Navbar />
        <Carousel onSearch={handleSearch} />

        <div className="mt-4">
          {/* Conditional Button */}
          {usertype === "Seller" && (
            <div className="text-center" style={styles.buttonGroup}>
              <Link className="btn btn-primary" to="/postgig" style={styles.btnPrimary}>
                Post Your Gig
              </Link>
              <Link className="btn btn-secondary" to="/myorders" style={styles.btnSecondary}>
                My Orders
              </Link>
            </div>
          )}
          {usertype === "Buyer" && (
            <div className="text-center mt-4">
              <Link className="btn btn-primary" to="/payment" style={styles.btnPrimary}>
                Go to Payment
              </Link>
            </div>
          )}
        </div>

        <div id="top-gigs" className="container mt-5">
          <h3 className="text-center mb-4">Top Gigs</h3>
          {message && <div className="alert alert-info">{message}</div>}
          <div className="row">
            {filteredGigs.map((gig) => (
              <div
                className="col-md-4 mb-4"
                key={gig._id}
                onMouseEnter={() => setHoveredCardId(gig._id)}
                onMouseLeave={() => setHoveredCardId(null)}
              >
                <div
                  className="card"
                  style={{
                    ...styles.card,
                    ...(hoveredCardId === gig._id ? styles.cardHovered : {}),
                  }}
                  onClick={() => openModal(gig)}
                >
                  <img src={gig.imageUrl} alt={gig.title} style={styles.cardImg} />
                  <div className="card-body">
                    <h5 className="card-title">{gig.title}</h5>
                    <p className="card-text">
                      <strong>Price: </strong>BDT {gig.price}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="pagination-controls mt-4  text-center" style={styles.paginationControls}>
            <button 
              className="btn btn-secondary bg-dark"
              onClick={goToPreviousPage}
              disabled={currentPage === 1}
            >
              Previous
            </button>
            <span className="mx-2 text-white">Page {currentPage} of {totalPages}</span>
            <button
              className="btn btn-secondary bg-dark"
              onClick={goToNextPage}
              disabled={currentPage === totalPages}
            >
              Next
            </button>
          </div>
        </div>

        <Footer />
      </div>

      {/* Order Modal */}
      {selectedGig && (
        <Modal show={showModal} onHide={closeModal}>
          <Modal.Header closeButton>
            <Modal.Title>Order Gig</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <h4>{selectedGig.title}</h4>
            <p><strong>Price:</strong> BDT {selectedGig.price}</p>
            <p><strong>Description:</strong> {selectedGig.description}</p>
            <p><strong>Seller:</strong> {selectedGig.email}</p>
            <Form.Group controlId="orderDeadline">
              <Form.Label>Order Deadline</Form.Label>
              <Form.Control
                type="date"
                value={orderDeadline}
                onChange={(e) => setOrderDeadline(e.target.value)}
              />
            </Form.Group>
            {orderStatus && <div className="alert alert-info mt-2">{orderStatus}</div>}
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={closeModal}>
              Close
            </Button>
            <Button variant="primary" onClick={handleOrder}>
              Order Gig
            </Button>
          </Modal.Footer>
        </Modal>
      )}

      {/* Success Modal */}
      <Modal show={showSuccessModal} onHide={() => setShowSuccessModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Success</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <h4>Congratulations!!</h4>
          <p>Order Successful</p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowSuccessModal(false)}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}
