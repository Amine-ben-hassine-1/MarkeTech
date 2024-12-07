import React, { useState, useEffect } from 'react';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../firebase';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import Spinner from '../composants/Spinner';
import L from '../composants/L';

const Cart = () => {
  const [loading, setLoading] = useState(true);
  const [cartItems, setCartItems] = useState([]);
  const [errorMessage, setErrorMessage] = useState('');

  // Fetch cart items from localStorage when the component mounts
  useEffect(() => {
    const loadCartItems = () => {
      const savedCartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
      if (savedCartItems.length === 0) {
        setErrorMessage('Votre panier est vide.');
      }
      setCartItems(savedCartItems);
      setLoading(false);
    };

    loadCartItems();
  }, []);

  // Update the item quantity in the cart
  const updateItemQuantity = async (itemId, newQuantity) => {
    if (newQuantity < 1) return;

    try {
      // Fetch available stock from Firebase
      const itemDocRef = doc(db, 'listings', itemId);
      const docSnap = await getDoc(itemDocRef);

      if (docSnap.exists()) {
        const availableStock = docSnap.data().numberOfOffers;
        if (newQuantity > availableStock) {
          toast.error(`Désolé, il n'y a que ${availableStock} articles disponibles.`);
          return;
        }

        const updatedCartItems = cartItems.map((item) =>
          item.id === itemId ? { ...item, quantity: newQuantity } : item
        );
        setCartItems(updatedCartItems);
        localStorage.setItem('cartItems', JSON.stringify(updatedCartItems));
      } else {
        setErrorMessage('Produit non trouvé dans Firebase');
      }
    } catch (error) {
      console.error('Erreur lors de la mise à jour de la quantité:', error);
      setErrorMessage('Erreur lors de la mise à jour.');
    }
  };

  // Remove item from the cart
  const removeFromCart = (itemId) => {
    const updatedCartItems = cartItems.filter((item) => item.id !== itemId);
    setCartItems(updatedCartItems);
    localStorage.setItem('cartItems', JSON.stringify(updatedCartItems));
  };

  // Clear the cart
  const clearCart = () => {
    setCartItems([]);
    localStorage.removeItem('cartItems');
  };

  // Calculate item subtotal
  const calculateItemSubtotal = (price, quantity) => {
    return (parseFloat(price) * quantity).toFixed(2);
  };

  // Calculate total price
  const calculateTotal = () => {
    return cartItems.reduce((total, item) => {
      const itemSubtotal = calculateItemSubtotal(item.price, item.quantity);
      return total + parseFloat(itemSubtotal);
    }, 0).toFixed(2);
  };

  if (loading) {
    return <Spinner />;
  }

  if (cartItems.length === 0) {
    return (
      <div className="alert alert-warning text-center" role="alert">
        {errorMessage}
      </div>
    );
  }

  return (
    <L>
    <div className="container-fluid p-5" style={{ backgroundColor: '#1c1c1c', minHeight: '100vh' }}>
      <h2 className="text-center mb-4 text-uppercase" style={{ color: 'red', letterSpacing: '2px' }}>Votre Panier</h2>

      {errorMessage && <div className="alert alert-danger">{errorMessage}</div>}

      <div className="row g-4">
        {cartItems.map((item) => (
          <div key={item.id} className="col-12 col-md-6 col-lg-4">
            <div className="card border-2" style={{ borderColor: 'red', backgroundColor: '#1c1c1c' }}>
              <Link to={`/Cat/${item.type}/${item.id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                <div className="row g-0 p-3">
                  <div className="col-12 col-md-5">
                  
                  </div>
                  <div className=" d-flex flex-column justify-content-center">
                    <h5 className="card-title fw-bold mb-2" style={{ color: 'white' }}>{item.name}</h5>
                    <p className="mb-1" style={{ color: 'white' }}>Prix: {item.price} €</p>
                    <p className="mb-1" style={{ color: 'white' }}>Quantité: {item.quantity}</p>
                    <p className="mb-1" style={{ color: 'white' }}>Sous-total: €{calculateItemSubtotal(item.price, item.quantity)}</p>
                  </div>
                </div>
              </Link>
              <div className="card-body d-flex justify-content-between align-items-center">
                <div className="d-flex align-items-center">
                  <button className="btn btn-info me-2" onClick={() => updateItemQuantity(item.id, item.quantity + 1)}>+1</button>
                  <button className="btn btn-info" onClick={() => updateItemQuantity(item.id, item.quantity - 1)}>-1</button>
                </div>
                <button className="btn btn-danger" onClick={() => removeFromCart(item.id)}>Supprimer</button>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="d-flex justify-content-between mt-4">
        <button className="btn btn-danger" onClick={clearCart}>Vider le panier</button>
        <div className="text-end">
          <h4 style={{ color: 'white' }}>Total: €{calculateTotal()}</h4>
          <Link to="/checkout" className="btn btn-success mt-3"    style={{
                backgroundColor: 'gray',
                color: 'white',
                border: 'none',
                padding: '10px 20px'}}>Procéder au paiement</Link>
        </div>
      </div>
    </div>   </L>
  );
};

export default Cart;
