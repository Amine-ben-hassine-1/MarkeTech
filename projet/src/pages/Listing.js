import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../firebase';
import Spinner from '../composants/Spinner';
import L from '../composants/L';

const Listing = () => {
  const [loading, setLoading] = useState(true);
  const [listing, setListing] = useState(null);
  const { ListingId } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchListing = async () => {
      try {
        if (!ListingId) {
          console.error('Listing ID is not provided');
          setLoading(false);
          return;
        }

        const docRef = doc(db, 'listings', ListingId);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          setListing(docSnap.data());
        } else {
          console.error('No such listing found in the database');
        }
      } catch (error) {
        console.error('Error fetching listing:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchListing();
  }, [ListingId]);

  const addToCart = (item) => {
    if (listing.numberOfOffers < 1) {
      alert(`Désolé, ${listing.name} n'est plus disponible en stock.`);
      return;
    }

    const existingCartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
    const itemInCart = existingCartItems.find((cartItem) => cartItem.id === item.id);

    if (itemInCart) {
      if (itemInCart.quantity >= listing.numberOfOffers) {
        alert(`Vous avez atteint la quantité maximale disponible pour ${listing.name}.`);
        return;
      }
      itemInCart.quantity += 1;
    } else {
      existingCartItems.push({ ...item, quantity: 1 });
    }

    localStorage.setItem('cartItems', JSON.stringify(existingCartItems));
    navigate('/cart');
  };

  if (loading) {
    return <Spinner />;
  }

  if (!listing) {
    return <div>Listing not found</div>;
  }

  return (
    <L>
      <div className="container-fluid p-5" style={{ backgroundColor: '#000', minHeight: '100vh' }}>
        <h1 className="text-center mb-5 text-uppercase" style={{ color: 'red', letterSpacing: '2px' }}>
          {listing.name}
        </h1>
        <div className="row justify-content-center">
          <div className="col-md-8">
            <div className="card border-2" style={{ borderColor: 'red', backgroundColor: '#1c1c1c' }}>
              <img
              src={listing.imgUrls[0]}
              className="img-fluid rounded-start"
              alt={listing.name}
              style={{ objectFit: 'cover', width: '100%', height: '200px', transition: 'transform 0.3s' }}
              onMouseOver={e => e.currentTarget.style.transform = 'scale(1.05)'}
              onMouseOut={e => e.currentTarget.style.transform = 'scale(1)'}></img>
              <div className="card-body text-center">
                <h5 className="card-title" style={{ color: 'white' }}>Prix : €{listing.price}</h5>
                <p style={{ color: 'white' }}>Condition : {listing.condition}</p>
                <p style={{ color: 'white' }}>Marque : {listing.brand}</p>
                <p style={{ color: 'white' }}>Stock : {listing.numberOfOffers}</p>
                <p style={{ color: 'white' }}>Emplacement : {listing.location}</p>
                {listing.type === 'telephones' && <p style={{ color: 'white' }}>Stockage : {listing.storage}</p>}
                {listing.type === 'TV' && <p style={{ color: 'white' }}>Taille de l'écran : {listing.screenSize} pouces</p>}
                {listing.type === 'Ordinateurs' && <p style={{ color: 'white' }}>Processeur : {listing.processor}</p>}

                <Link
                  className="btn me-3"
                  style={{
                    backgroundColor: 'red',
                    color: 'white',
                    border: 'none',
                    transition: 'background-color 0.3s',
                  }}
                  onMouseOver={(e) => (e.currentTarget.style.backgroundColor = '#d00000')}
                  onMouseOut={(e) => (e.currentTarget.style.backgroundColor = 'red')}
                  to={`/Contact/${listing.userRef}?listingName=${listing.name}`}
                >
                  Ajouter un commentaire
                </Link>
                <button
                  className="btn mt-3"
                  style={{
                    backgroundColor: 'orange',
                    color: 'white',
                    border: 'none',
                    transition: 'background-color 0.3s',
                  }}
                  onMouseOver={(e) => (e.currentTarget.style.backgroundColor = '#d68b00')}
                  onMouseOut={(e) => (e.currentTarget.style.backgroundColor = 'orange')}
                  onClick={() =>
                    addToCart({
                      id: ListingId,
                      name: listing.name,
                      price: listing.price,
                    })
                  }
                >
                  Ajouter au panier
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </L>
  );
};

export default Listing;
