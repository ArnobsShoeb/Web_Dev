import React from 'react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import Carousel from '../components/Carousel'
import { useNavigate } from 'react-router-dom';


export default function Home() {
  const navigate = useNavigate();
  const usertype = localStorage.getItem('usertype');

  React.useEffect(() => {
    if (!localStorage.getItem('token')) {
      navigate('/');
    }
  }, [navigate]);
  
  return (
    <div>
        <div> <Navbar/> </div>
        <div><Carousel/></div>
        <div>
          {usertype === 'seller' ? 
          ( <div>Seller specific content</div>) : ( <div>Buyer specific content</div>)
          }
        </div>
        <div><Footer/></div>
    </div>
  )
}
