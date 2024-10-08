import './App.css';
import Home from './screens/Home';
import Login from './screens/Login';
import Signup from './screens/Signup';
import UserDetails from './screens/Userdetails';
import Payment from './screens/Payment';
import PostGig from './screens/PostGig';
import MyGigs from './screens/MyGigs';
import Proposals from './screens/JobsProposals';
import MyActiveOrder from './screens/MyActiveOrder';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import 'bootstrap/dist/js/bootstrap.bundle.min'; // Use this instead of importing JS twice

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
        <Route path="/proposals" element={<Proposals />} />
        <Route path="/myorders" element={<MyActiveOrder />} />
      </Routes>
    </Router>
  );
}

export default App;
