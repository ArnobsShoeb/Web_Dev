import React from 'react'
import carouselImage1 from '../images/carousel1.jpg'  ;
import carouselImage2 from '../images/carousel2.jpg'  ;
import carouselImage3 from '../images/carousel3.jpg'  ;

export default function Carousel() {
  return (
    <div>
        <div id="carouselExampleIndicators" className="carousel slide courasel-fade" data-ride="carousel" style={{objectFit:'contain !important'}}>
        <ol className="carousel-indicators">
    <li data-target="#carouselExampleIndicators" data-slide-to="0" className="active"></li>
    <li data-target="#carouselExampleIndicators" data-slide-to="1"></li>
    <li data-target="#carouselExampleIndicators" data-slide-to="2"></li>
  </ol>
  <div className="carousel-inner" id='carousel1'>
    <div className='carousel-caption' style={{zIndex:"10"}}>
    <form className="d-flex">
      <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search"/>
      <button className="btn btn-outline-success " type="submit">Search</button>
    </form>
    </div>
    <div className="carousel-item active">
      <img className="d-block w-100" src={carouselImage1} style={{filter:"brightness(30%)"}} alt="First slide" />
    </div>
    <div className="carousel-item">
      <img className="d-block w-100" src={carouselImage2} style={{filter:"brightness(30%)"}} alt="Second slide" />
    </div>
    <div className="carousel-item">
      <img className="d-block w-100" src={carouselImage3} style={{filter:"brightness(30%)"}} alt="Third slide" />
    </div>
  </div>
  <a className="carousel-control-prev" href="#carouselExampleIndicators" role="button" data-slide="prev">
    <span className="carousel-control-prev-icon" aria-hidden="true"></span>
    <span className="sr-only"></span>
  </a>
  <a className="carousel-control-next" href="#carouselExampleIndicators" role="button" data-slide="next">
    <span className="carousel-control-next-icon" aria-hidden="true"></span>
    <span className="sr-only"></span>
  </a>
</div>
    </div>
  )
}
