import React, { useState } from 'react';
import Navbar from '../components/Navbar'; 
import Footer from '../components/Footer';
import backgroundImage from '../images/PostGigBackground.jpg';  // Import the image

export default function PostGig() {
  const [gigDetails, setGigDetails] = useState({
    title: '',
    description: '',
    price: '',
    image: null,  // State for the file
  });
  const [message, setMessage] = useState('');

  const email = localStorage.getItem('email'); // Retrieve email from localStorage

  const handleChange = (e) => {
    const { name, value } = e.target;
    setGigDetails({ ...gigDetails, [name]: value });
  };

  const handleFileChange = (e) => {
    setGigDetails({ ...gigDetails, image: e.target.files[0] });  // Set file
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('title', gigDetails.title);
    formData.append('description', gigDetails.description);
    formData.append('price', gigDetails.price);
    formData.append('email', email);
    if (gigDetails.image) {
      formData.append('image', gigDetails.image);  // Append image file
    }

    try {
      const response = await fetch('http://localhost:4000/api/postgig', {
        method: 'POST',
        body: formData,  // Send form data including image
      });

      const result = await response.json();
      if (response.ok) {
        setMessage(result.message); 
        setGigDetails({
          title: '',
          description: '',
          price: '',
          image: null,
        });
      } else {
        setMessage('Failed to post gig. Please try again.');
      }
    } catch (error) {
      console.error('Error submitting gig:', error);
      setMessage('Failed to post gig. Please try again.');
    }
  };

  return (
    <div>
      <Navbar />
      <div
        style={{
          backgroundImage: `url(${backgroundImage})`,  // Set background image
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          minHeight: '100vh',
          paddingTop: '5rem',
          paddingBottom: '5rem'
        }}
      >
        <div className="container mt-5">
          <div
            className="card mx-auto"
            style={{
              maxWidth: '600px',
              backgroundColor: 'rgba(255, 255, 255, 0.5)',  // Use rgba for transparency
              border: '1px solid rgba(255, 255, 255, 0.2)',  // Optional border for contrast
              backdropFilter: 'blur(10px)',  // Optional blur effect
            }}
          >
            <div className="card-body">
              <h3 className="text-center mb-4">Create a New Gig</h3>
              {message && <div className="alert alert-info">{message}</div>}
              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label htmlFor="title" className="form-label">Gig Title</label>
                  <input
                    type="text"
                    className="form-control"
                    id="title"
                    name="title"
                    value={gigDetails.title}
                    onChange={handleChange}
                    placeholder="Enter gig title"
                    required
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="description" className="form-label">Gig Description</label>
                  <textarea
                    className="form-control"
                    id="description"
                    name="description"
                    value={gigDetails.description}
                    onChange={handleChange}
                    rows="4"
                    placeholder="Enter gig description"
                    required
                  ></textarea>
                </div>
                <div className="mb-3">
                  <label htmlFor="price" className="form-label">Gig Price (in BDT)</label>
                  <input
                    type="number"
                    className="form-control"
                    id="price"
                    name="price"
                    value={gigDetails.price}
                    onChange={handleChange}
                    placeholder="Enter price"
                    required
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="image" className="form-label">Upload Image</label>
                  <input
                    type="file"
                    className="form-control"
                    id="image"
                    name="image"
                    onChange={handleFileChange}
                  />
                </div>
                <button type="submit" className="btn btn-primary w-100">Submit Gig</button>
              </form>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
