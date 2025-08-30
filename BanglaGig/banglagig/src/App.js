import './App.css';
import Home from './screens/Home';
import Login from './screens/Login';
import Signup from './screens/Signup';
import UserDetails from './screens/Userdetails';
import Payment from './screens/Payment';
import PostGig from './screens/PostGig';
import MyGigs from './screens/MyGigs';
import MyActiveOrder from './screens/MyActiveOrder';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import 'bootstrap/dist/js/bootstrap.bundle.min'; // Use this instead of importing JS twice
import PaymentHistory from './screens/PaymentHistory';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/userdetails" element={<UserDetails />} />
        <Route path="/payment" element={<Payment />} />
        <Route path="/postgig" element={<PostGig />} />
        <Route path="/mygigs" element={<MyGigs />} />
        <Route path="/myorders" element={<MyActiveOrder />} />
        <Route path="/paymenthistory" element={<PaymentHistory />} />
      </Routes>
    </Router>
  );
}

export default App;
