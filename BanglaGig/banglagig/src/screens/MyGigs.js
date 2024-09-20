import React, { useState, useEffect } from 'react';
import backgroundImage from '../images/MyGigBackground.jpg';

export default function MyGigs() {
  const [gigs, setGigs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const email = localStorage.getItem('email');

  useEffect(() => {
    const fetchGigs = async () => {
      try {
        const response = await fetch(`http://localhost:4000/api/mygigs?email=${email}`);
        const data = await response.json();
        if (response.ok) {
          setGigs(data);
        } else {
          setError(data.message || 'Failed to fetch gigs');
        }
      } catch (err) {
        setError('An error occurred while fetching gigs');
      } finally {
        setLoading(false);
      }
    };

    fetchGigs();
  }, [email]);

  const handleDelete = async (gigId) => {
    try {
      const response = await fetch(`http://localhost:4000/api/deletegig/${gigId}`, {
        method: 'DELETE',
      });
      if (response.ok) {
        setGigs(gigs.filter(gig => gig._id !== gigId));
      } else {
        const data = await response.json();
        setError(data.message || 'Failed to delete gig');
      }
    } catch (err) {
      setError('An error occurred while deleting the gig');
    }
  };

  return (
    <div style={{ ...styles.container, backgroundImage: `url(${backgroundImage})` }}>
      <h1 style={styles.heading}>My Gigs</h1>
      {loading && <p style={styles.loading}>Loading...</p>}
      {error && <p style={styles.error}>{error}</p>}
      {gigs.length === 0 ? (
        <p style={styles.noGigs}>No gigs posted yet.</p>
      ) : (
        <div style={styles.listGroup}>
          {gigs.map(gig => (
            <div key={gig._id} style={styles.listGroupItem}>
              <h5 style={styles.title}>{gig.title}</h5>
              <p style={styles.description}>{gig.description}</p>
              <p style={styles.price}><strong>Price:</strong> ${gig.price}</p>
              <p style={styles.orderCount}><strong>Orders:</strong> {gig.orderCount}</p>
              <p style={styles.date}><strong>Posted On:</strong> {new Date(gig.createdAt).toLocaleDateString()}</p>
              <button 
                onClick={() => handleDelete(gig._id)}
                style={styles.deleteButton}
              >
                Delete Gig
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

const styles = {
  container: {
    padding: '30px',
    backgroundColor: '#f4f7f6',
    minHeight: '100vh',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
  },
  heading: {
    marginBottom: '20px',
    fontSize: '2rem',
    color: '#000',
    textAlign: 'center',
    fontWeight: '700',
  },
  loading: {
    textAlign: 'center',
    color: '#6c757d',
    fontSize: '1.2rem',
  },
  error: {
    textAlign: 'center',
    color: '#dc3545',
    fontSize: '1.2rem',
  },
  noGigs: {
    textAlign: 'center',
    color: '#6c757d',
    fontSize: '1.2rem',
  },
  listGroup: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  listGroupItem: {
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    borderRadius: '8px',
    boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
    margin: '10px 0',
    padding: '20px',
    width: '100%',
    maxWidth: '700px',
    textAlign: 'left',
    border: '1px solid #dee2e6',
  },
  title: {
    fontSize: '1.6rem',
    fontWeight: '600',
    color: '#000',
    marginBottom: '10px',
  },
  description: {
    fontSize: '1rem',
    color: '#111',
    marginBottom: '15px',
  },
  price: {
    fontSize: '1rem',
    color: '#333',
    marginBottom: '10px',
  },
  orderCount: {
    fontSize: '1rem',
    color: '#333',
    marginBottom: '10px',
  },
  date: {
    fontSize: '1rem',
    color: '#666',
    marginBottom: '10px',
  },
  deleteButton: {
    backgroundColor: '#dc3545',
    color: '#fff',
    border: 'none',
    borderRadius: '4px',
    padding: '10px 20px',
    cursor: 'pointer',
    fontSize: '1rem',
    fontWeight: '600',
    marginTop: '10px',
  },
};
