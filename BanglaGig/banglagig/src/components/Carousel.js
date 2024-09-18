import React from 'react';
import carouselImage1 from '../images/carousel1.jpg';
import carouselImage2 from '../images/carousel2.jpg';
import carouselImage3 from '../images/carousel3.jpg';

export default function Carousel({ onSearch }) {
  const handleSearchChange = (e) => {
    onSearch(e.target.value);
  };

  return (
    <div style={{ position: 'relative' }}>
      {/* Search Bar */}
      <div style={{
        position: 'absolute',
        top: '20px',
        left: '50%',
        transform: 'translateX(-50%)',
        zIndex: '10',
        width: '60%'
      }}>
        <form style={{ display: 'flex', justifyContent: 'center' }}>
          <input
            style={{
              backgroundColor: 'rgba(255, 255, 255, 0.5)',
              border: 'none',
              color: '#fff',
              padding: '10px',
              fontSize: '1.2rem',
              width: '80%',
              marginRight: '10px'
            }}
            type="search"
            placeholder="Search Gigs"
            aria-label="Search"
            onChange={handleSearchChange}
          />
          <button
            style={{
              backgroundColor: 'transparent',
              border: '2px solid #fff',
              color: '#fff',
              fontSize: '1.2rem',
              padding: '10px',
              cursor: 'pointer',
              transition: 'background-color 0.3s ease'
            }}
            type="button"
            onClick={() => document.getElementById('top-gigs').scrollIntoView({ behavior: 'smooth' })}
          >
            Search
          </button>
        </form>
      </div>

      {/* Carousel */}
      <div id="carouselExampleIndicators" className="carousel slide carousel-fade" data-bs-ride="carousel">
        <ol className="carousel-indicators">
          <li data-bs-target="#carouselExampleIndicators" data-bs-slide-to="0" className="active"></li>
          <li data-bs-target="#carouselExampleIndicators" data-bs-slide-to="1"></li>
          <li data-bs-target="#carouselExampleIndicators" data-bs-slide-to="2"></li>
        </ol>
        <div className="carousel-inner" style={{ height: '80vh' }}>
          <div className="carousel-item active">
            <img
              className="d-block w-100"
              src={carouselImage1}
              alt="First slide"
              style={{
                objectFit: 'cover',
                height: '80vh',
                filter: 'brightness(50%)'
              }}
            />
          </div>
          <div className="carousel-item">
            <img
              className="d-block w-100"
              src={carouselImage2}
              alt="Second slide"
              style={{
                objectFit: 'cover',
                height: '80vh',
                filter: 'brightness(50%)'
              }}
            />
          </div>
          <div className="carousel-item">
            <img
              className="d-block w-100"
              src={carouselImage3}
              alt="Third slide"
              style={{
                objectFit: 'cover',
                height: '80vh',
                filter: 'brightness(50%)'
              }}
            />
          </div>
        </div>
        <a className="carousel-control-prev" href="#carouselExampleIndicators" role="button" data-bs-slide="prev">
          <span className="carousel-control-prev-icon" aria-hidden="true"></span>
          <span className="visually-hidden">Previous</span>
        </a>
        <a className="carousel-control-next" href="#carouselExampleIndicators" role="button" data-bs-slide="next">
          <span className="carousel-control-next-icon" aria-hidden="true"></span>
          <span className="visually-hidden">Next</span>
        </a>
      </div>
    </div>
  );
}
