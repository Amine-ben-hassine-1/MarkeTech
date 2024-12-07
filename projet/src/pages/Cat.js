import React, { useState, useEffect } from 'react';
import L from '../composants/L';
import { useParams } from 'react-router-dom';
import { db } from '../firebase';
import { toast } from 'react-toastify';
import { collection, getDocs, query, where, orderBy, limit, startAfter } from 'firebase/firestore';
import Spinner from '../composants/Spinner';
import ListingItem from '../composants/ListingItem'; // Updated the import statement for ListingItem

const Cat = () => {
  const [listings, setListings] = useState([]); 
  const [lastFetchListing, setLastFetchListing] = useState(null);
  const [loading, setLoading] = useState(true);
  const params = useParams();

  useEffect(() => {
    const fetchListings = async () => { // Renamed 'fetchListing' to 'fetchListings' for consistency
      try {
        const listingsRef = collection(db, 'listings');
        const q = query(
          listingsRef,
          where('type', '==', params.CatName),
          orderBy('timestamp', 'desc'),
          limit(1)
        );
        const querySnap = await getDocs(q);
        const lastVisible = querySnap.docs[querySnap.docs.length - 1];
        setLastFetchListing(lastVisible);
        const Listings = [];

        querySnap.forEach((doc) => {
          Listings.push({ id: doc.id, ...doc.data() });
        });

        setListings(Listings);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching listings:', error); // Updated the error message for clarity
        toast.error('Unable to fetch data');
        setLoading(false);
      }
    };

    fetchListings();
  }, [params.CatName]);

  // load more
  const fetchLoadMoreListing = async () => { // Renamed 'fetchListing' to 'fetchListings' for consistency
    try {
      const listingsRef = collection(db, 'listings');
      const q = query(
        listingsRef,
        where('type', '==', params.CatName),
        orderBy('timestamp', 'desc'),
        startAfter(lastFetchListing),
        limit(10)
      );
      const querySnap = await getDocs(q);
      const lastVisible = querySnap.docs[querySnap.docs.length - 1];
      setLastFetchListing(lastVisible);
      const Listings = [];

      querySnap.forEach((doc) => {
        Listings.push({ id: doc.id, ...doc.data() });
      });

      setListings(prevState => [...prevState, ...Listings]); // Fixed typo: listings -> Listings
      setLoading(false);
    } catch (error) {
      console.error('Error fetching listings:', error); // Updated the error message for clarity
      toast.error('Unable to fetch data');
      setLoading(false);
    }
  }; // Closing bracket for fetchLoadMoreListing was missing

  return ( // Moved return statement to the correct position
    <L>
      <div className="mt-3 container-fluid">
        <h1>{params.CatName === '' ? '' : '          Liste Des Produits'}</h1> {/* Improved text for better clarity */}
        {loading ? (
          <Spinner />
        ) : listings.length > 0 ? (
          <div>
            {listings.map((list) => (
              <ListingItem listing={list} id={list.id} key={list.id} /> 
            ))}
          </div>
        ) : (
          <p>No listings for {params.CatName}</p>
        )}
      </div>
      <div>
        {lastFetchListing && (
          <button className='btn btn-primary text-center' // Corrected the button class name from 'btn-primay' to 'btn-primary'
            onClick={fetchLoadMoreListing}
            style={{ backgroundColor: 'red', color: 'white' }} 
          >
          Voir Plus
          </button>
        )}
      </div>
    </L>
  );
};

export default Cat;
