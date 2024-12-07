import React, { useState, useEffect } from 'react';
import L from '../composants/L';
import { db } from '../firebase';
import { toast } from 'react-toastify';
import { collection, getDocs, query, where, orderBy, limit, startAfter } from 'firebase/firestore'; // Added missing import
import Spinner from '../composants/Spinner';
import ListingItem from '../composants/ListingItem'; // Updated the import statement for ListingItem

const Offers = () => {   
  const [listings, setListings] = useState([]); // Renamed 'listing' to 'listings' for consistency
  const [loading, setLoading] = useState(true);
  const [lastFetchListing, setLastFetchListing] = useState(null);

  useEffect(() => {
    const fetchListings = async () => { // Renamed 'fetchListing' to 'fetchListings' for consistency
      try {
        const listingsRef = collection(db, 'listings');
        const q = query(
          listingsRef,
          where('offer', '==', true),
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
  }, []);

  const fetchLoadMoreListing = async () => { // Renamed 'fetchListing' to 'fetchListings' for consistency
    if (!lastFetchListing) return; // Added check to prevent fetching if there are no more listings
    try {
      const listingsRef = collection(db, 'listings');
      const q = query(
        listingsRef,
        where('offer', '==', true), // Changed from 'type' to 'offer' to match the first query
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

  return (
    <L>
      <div className="mt-3 container bg-dark text-white"> {/* Added bg-dark and text-white classes */}
        {loading ? (
          <Spinner />
        ) : listings.length > 0 ? (
          <div className="row">
            {listings.map((list) => (
              <div className="col-12 col-md-4 mb-4" key={list.id}> {/* Added Bootstrap grid styling */}
                <ListingItem listing={list} id={list.id} />
              </div>
            ))}
          </div>
        ) : (
          <p className="text-center">There are no current offers.</p>
        )}
      </div>
      <div className="text-center mt-4">
        {lastFetchListing && (
          <button 
            className="btn btn-danger" // Bootstrap red button for Load More
            onClick={fetchLoadMoreListing}
          >
          Voir Plus
          </button>
        )}
      </div>
    </L>
  );
};

export default Offers;
