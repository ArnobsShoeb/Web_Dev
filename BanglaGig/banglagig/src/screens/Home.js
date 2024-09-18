import React, { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import Carousel from '../components/Carousel';
import { Link, useNavigate } from 'react-router-dom';
import { Modal, Button } from 'react-bootstrap'; // Import Modal and Button from react-bootstrap

export default function Home() {
  const [gigs, setGigs] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [message, setMessage] = useState('');
  const [currentPage, setCurrentPage] = useState(1);  // Track the current page
  const [totalPages, setTotalPages] = useState(1);    // Total number of pages
  const [showModal, setShowModal] = useState(false);  // Modal state
  const [selectedGig, setSelectedGig] = useState(null); // Selected gig for modal
  const navigate = useNavigate();
  const usertype = localStorage.getItem('usertype');

  useEffect(() => {
    if (!localStorage.getItem('token')) {
      navigate('/');
    }

    // Fetch gigs from the backend
    const fetchGigs = async (page = 1, query = '') => {
      try {
        const response = await fetch(`http://localhost:4000/api/getgigs?page=${page}&search=${query}`);
        if (response.ok) {
          const data = await response.json();
          setGigs(data.gigs);
          setTotalPages(data.totalPages); // Set the total pages from the response
        } else {
          setMessage('Failed to load gigs. Please try again.');
        }
      } catch (error) {
        console.error('Error fetching gigs:', error);
        setMessage('Failed to load gigs. Please try again.');
      }
    };

    fetchGigs(currentPage, searchTerm); // Fetch gigs initially or when page/searchTerm changes
  }, [currentPage, searchTerm, navigate]);

  // Handle search input change
  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
    setCurrentPage(1); // Reset to first page when search term changes
  };

  // Open modal for selected gig
  const openModal = (gig) => {
    setSelectedGig(gig);
    setShowModal(true);
  };

  // Close modal
  const closeModal = () => {
    setShowModal(false);
    setSelectedGig(null);
  };

  // Handle order button click
  const handleOrder = () => {
    if (selectedGig) {
      // Redirect to order page or handle order logic
      console.log('Order placed for:', selectedGig.title);
      closeModal();
    }
  };

  // Go to the next page
  const goToNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  // Go to the previous page
  const goToPreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  return (
    <div>
      <Navbar />
      <Carousel />

      {/* Search bar */}
      <div className="container mt-4">
        <div className="input-group mb-3">
          <input
            type="text"
            className="form-control"
            placeholder="Search gigs..."
            value={searchTerm}
            onChange={handleSearch}
          />
        </div>
      </div>
      <div>
        {/* Conditional Button */}
        {usertype === "Seller" && (
          <div className="text-center mt-4">
            <Link className="btn btn-primary btn-lg" to="http://localhost:3000/postgig">
              Post Your Gig
            </Link>
          </div>
        )}
        {usertype === "Buyer" && (
          <div className="text-center mt-4">
            <Link className="btn btn-primary btn-lg" to="http://localhost:3000/payment">
              Go to Payment
            </Link>
          </div>
        )}
      </div>

      {/* Display gigs */}
      <div className="container mt-5">
        <h3 className="text-center mb-4">Top Gigs</h3>
        {message && <div className="alert alert-info">{message}</div>}
        <div className="row">
          {gigs.map((gig) => (
            <div className="col-md-4 mb-4" key={gig._id}>
              <div className="card" onClick={() => openModal(gig)} style={{ cursor: 'pointer' }}>
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

        {/* Pagination Controls */}
        <div className="pagination-controls mt-4 text-center">
          <button
            className="btn btn-secondary"
            onClick={goToPreviousPage}
            disabled={currentPage === 1}
          >
            Previous
          </button>
          <span className="mx-2">Page {currentPage} of {totalPages}</span>
          <button
            className="btn btn-secondary"
            onClick={goToNextPage}
            disabled={currentPage === totalPages}
          >
            Next
          </button>
        </div>
      </div>

      <Footer />

      {/* Modal for Gig Details */}
      {selectedGig && (
        <Modal show={showModal} onHide={closeModal}>
          <Modal.Header closeButton>
            <Modal.Title>{selectedGig.title}</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <p><strong>Price:</strong> BDT {selectedGig.price}</p>
            <p><strong>Description:</strong> {selectedGig.description}</p>
            <p><strong>Seller:</strong> {selectedGig.email}</p> {/* Ensure seller email is returned in the API */}
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
    </div>
  );
}
