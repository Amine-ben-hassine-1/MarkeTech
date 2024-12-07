import React from 'react';                                                                                                                                                                                                                                                                                   
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

// ** Pages**
import Home from './pages/Home';
import Offers from './pages/Offers';
import SignUp from './pages/SignUp';
import Login from './pages/Login';
import ForgetPassword from './pages/ForgetPassword';
import Cat from './pages/Cat';
import Profile from './pages/Profile';
import CreateListing from './pages/CreateListing';
import Listing from './pages/Listing';
import Contact from './pages/Contact';
import EditListing from './pages/EditListing';
import NotFound from './pages/NotFound'; // Page 404

// ** Composants**
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import PrivateRoute from './composants/PrivateRoute'; // Pour protéger les routes privées
import Cart from './composants/Cart'; // Composant Panier


import Checkout from './pages/Checkout'; // Assure-toi que le chemin vers Checkout est correct
import DashboardAdmin from './composants/DashboardAdmin';

function App() {
  return (
    <Router>
      {/* Composant global ToastContainer pour les notifications */}
      <ToastContainer />
      
      {/* Définition des routes */}
      <Routes>
        {/* Routes publiques */}
        <Route path="/" element={<Home />} />
        <Route path="/Offers" element={<PrivateRoute />}>
        <Route path="/Offers" element={<Offers />} /></Route>
        <Route path="/Cat/:CatName" element={<PrivateRoute />}>
        <Route path="/Cat/:CatName" element={<Cat />} /></Route>
        <Route path="/CreateListing" element={<CreateListing />} />
        <Route path="/Cat/:CatName/:ListingId" element={<PrivateRoute />}>
        <Route path="/Cat/:CatName/:ListingId" element={<Listing />} />
        </Route>
        <Route path="/Login" element={<Login />} />
        <Route path="/SignUp" element={<SignUp />} />
        <Route path="/ForgetPassword" element={<ForgetPassword />} />
        <Route path="/Contact/:landlordId" element={<Contact />} />

        {/* Routes protégées (privées) */}
        <Route path="/profile" element={<PrivateRoute />}>
          <Route path="/profile" element={<Profile />} />
        </Route>

        <Route path="/editlisting/:listingId" element={<PrivateRoute />}>
          <Route path="/editlisting/:listingId" element={<EditListing />} />
        </Route>
      
        <Route path="/admin/dashboard" element={<PrivateRoute />}>
  <Route index element={<DashboardAdmin />} />
</Route>
       <Route path="/cart" element={<PrivateRoute />}>
        <Route path="/cart" element={<Cart />} /> {/* Panier */}
        </Route>
        <Route path="/checkout" element={<Checkout />} />
        
        {/* Page 404 */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
}

export default App;
