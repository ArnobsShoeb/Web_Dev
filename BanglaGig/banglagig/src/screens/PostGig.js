import React, { useState } from 'react';
import Navbar from '../components/Navbar'; 
import Footer from '../components/Footer';

export default function PostGig() {
  const [gigDetails, setGigDetails] = useState({
    title: '',
    description: '',
    price: '',
  });
  const [message, setMessage] = useState('');

  const email = localStorage.getItem('email'); // Retrieve email from localStorage

  const handleChange = (e) => {
    const { name, value } = e.target;
    setGigDetails({ ...gigDetails, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const gigData = {
      ...gigDetails,
      email: email,  // Add email to the gig data
    };

    try {
      const response = await fetch('http://localhost:4000/api/postgig', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(gigData),  // Send the gig data including email
      });

      const result = await response.json();
      if (response.ok) {
        setMessage(result.message); 
        setGigDetails({
          title: '',
          description: '',
          price: '',
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
      <div className="container mt-5">
        <div className="card mx-auto" style={{ maxWidth: '600px' }}>
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
              <button type="submit" className="btn btn-primary w-100">Submit Gig</button>
            </form>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
