import React, { useState, useEffect } from 'react';
import { useParams, useSearchParams } from 'react-router-dom';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../firebase';
import L from '../composants/L';
import { toast } from "react-toastify";

const Contact = () => {
  const [message, setMessage] = useState('');
  const [landlord, setLandlord] = useState(null); // Initialize as null
  const [searchParams] = useSearchParams();
  const params = useParams();

  useEffect(() => {
    const getLandlord = async () => {
      // Reference to the landlord document in Firestore
      const docRef = doc(db, 'users', params.landlordId);
      const docSnap = await getDoc(docRef);
      
      // Check if the document exists and update state
      if (docSnap.exists()) {
        setLandlord(docSnap.data());
      } else {
        toast.error('No landlord found.');
      }
    };

    getLandlord();
  }, [params.landlordId]);

  return (
    <L>
      <div className="container-fluid p-5" style={{ backgroundColor: '#000', minHeight: '100vh' }}>
        <h1 className="text-center mb-5 text-uppercase" style={{ color: 'red', letterSpacing: '2px' }}>Contact</h1>
        <div className="row justify-content-center">
          <div className="col-md-6">
            {landlord && (
              <div className="card border-2" style={{ borderColor: 'red', backgroundColor: '#1c1c1c' }}>
                <div className="card-body">
               
                  <h4 className="text-center text-white">Nom: {landlord?.name}</h4>
                  <form>
                    <div className="form-floating">
                      <textarea
                        className="form-control"
                        placeholder="Leave a comment here"
                        id="message"
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        style={{ height: '200px' }}
                      />
                      <label htmlFor="floatingTextarea">Commentaire </label>
                    </div>
                    <div className="d-flex justify-content-center mt-4">
                      <a href={`mailto:${landlord.email}?subject=${searchParams.get('listingName')}&body=${message}`}>
                        <button type="button" className="btn" style={{ backgroundColor: 'red', color: 'white', border: 'none' }}>
                         Envoyer un Message 
                        </button>
                      </a>
                    </div>
                  </form>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </L>
  );
};

export default Contact;
