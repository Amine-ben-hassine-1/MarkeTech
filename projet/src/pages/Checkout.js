import React, { useState, useEffect } from 'react';
import { getAuth } from 'firebase/auth';
import Spinner from '../composants/Spinner';
import { toast } from 'react-toastify';
import { doc, collection, runTransaction, getDoc } from 'firebase/firestore';
import { db } from '../firebase';

const Checkout = () => {
  const [loading, setLoading] = useState(true);
  const [cartItems, setCartItems] = useState([]);
  const [address, setAddress] = useState('');
  const auth = getAuth();

  // Load cart items
  useEffect(() => {
    const savedCartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
    setCartItems(savedCartItems);
    setLoading(false);
  }, []);

  const calculateTotal = () =>
    cartItems.reduce((total, item) => total + parseFloat(item.price) * item.quantity, 0).toFixed(2);

  const handlePlaceOrder = async () => {
    const user = auth.currentUser;

    if (!address || !user) {
      toast.error('Adresse ou connexion manquante.');
      return;
    }

    try {
      await runTransaction(db, async (transaction) => {
        const orderRef = doc(collection(db, 'orders'));
        const orderData = {
          userId: user.uid,
          items: cartItems,
          total: calculateTotal(),
          address,
          status: 'Pending',
          createdAt: new Date().toISOString(),
        };

        // Update stock and create order
        for (const item of cartItems) {
          const itemRef = doc(db, 'listings', item.id);
          const listingDoc = await transaction.get(itemRef);

          if (!listingDoc.exists()) throw new Error('Produit introuvable!');
          if (listingDoc.data().numberOfOffers < item.quantity)
            throw new Error("Stock insuffisant pour ${item.name}");

          transaction.update(itemRef, {
            numberOfOffers: listingDoc.data().numberOfOffers - item.quantity,
          });
        }

        transaction.set(orderRef, orderData);
      });

      // Trigger backend email API
      const orderResponse = await fetch('http://localhost:5000/api/send-email', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          userEmail: user.email,
        }),
      });      

      if (orderResponse.ok) {
        localStorage.removeItem('cartItems');
        setCartItems([]);
        toast.success('Commande réussie et emails envoyés!');
      } else {
        toast.error('Erreur lors de l\'envoi des emails.');
      }
    } catch (error) {
      toast.error("Erreur : ${error.message}");
    }
  };

  if (loading) return <Spinner />;

  if (!cartItems.length) return <div>Votre panier est vide.</div>;

  return (
    <div>
      <h1>Page de Paiement</h1>
      <div>
        <h4>Adresse de livraison</h4>
        <textarea value={address} onChange={(e) => setAddress(e.target.value)} placeholder="Adresse" />
      </div>
      <div>
        <h4>Récapitulatif de la commande</h4>
        {cartItems.map((item) => (
          <div key={item.id}>
            {item.name} - {item.quantity} x €{item.price}
          </div>
        ))}
        <div>Total: €{calculateTotal()}</div>
      </div>
      <button onClick={handlePlaceOrder}>Passer commande</button>
    </div>
  );
};

export default Checkout;