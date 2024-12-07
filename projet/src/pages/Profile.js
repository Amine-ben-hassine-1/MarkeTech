import React, { useState, useEffect } from 'react';
import L from '../composants/L';
import { getAuth, updateProfile } from 'firebase/auth';
import { useNavigate, Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import { IoCheckmarkDoneCircleSharp } from 'react-icons/io5';
import { FaEdit } from 'react-icons/fa';
import { doc, updateDoc, collection, getDocs, query, where, orderBy, deleteDoc } from 'firebase/firestore';
import { db } from '../firebase';
import { FaArrowAltCircleRight } from 'react-icons/fa';
import ListingItem from '../composants/ListingItem';


const Profile = () => {
  const auth = getAuth();
  const navigate = useNavigate();
  const [isEditing, setIsEditing] = useState(false);
  const [listings, setListings] = useState([]);
  const [formData, setFormData] = useState({
    name: auth.currentUser?.displayName || '',
    email: auth.currentUser?.email || ''
  });

  const { name, email } = formData;

  // Fetch user's listings on mount
  useEffect(() => {
    const fetchUserListings = async () => {
      if (auth.currentUser) {
        const listingRef = collection(db, 'listings');
        const q = query(
          listingRef,
          where('userRef', '==', auth.currentUser.uid),
          orderBy('timestamp', 'desc')
        );
        const querySnap = await getDocs(q);
        const fetchedListings = querySnap.docs.map(doc => ({
          id: doc.id,
          data: doc.data()
        }));
        setListings(fetchedListings);
      }
    };
    fetchUserListings();
  }, [auth.currentUser]);

  const handleSubmit = async () => {
    try {
      if (auth.currentUser.displayName !== name) {
        await updateProfile(auth.currentUser, { displayName: name });
      }
      const userRef = doc(db, 'users', auth.currentUser.uid);
      await updateDoc(userRef, { name });
      toast.success('Utilisateur mis à jour');
    } catch (error) {
      console.error(error);
      toast.error('Une erreur est survenue');
    }
  };

  const handleLogout = () => {
    auth.signOut();
    toast.success('Déconnexion réussie');
    
  };

  const handleChange = (e) => {
    setFormData(prevState => ({
      ...prevState,
      [e.target.id]: e.target.value
    }));
  };

  const handleDelete = async (listingId) => {
    if (window.confirm('Êtes-vous sûr de vouloir supprimer cette annonce ?')) {
      try {
        await deleteDoc(doc(db, 'listings', listingId));
        setListings(prevListings => prevListings.filter(listing => listing.id !== listingId));
        toast.success('Annonce supprimée avec succès');
      } catch (error) {
        console.error('Erreur lors de la suppression de l\'annonce:', error);
        toast.error('Impossible de supprimer l\'annonce');
      }
    }
  };

  const handleEdit = (listingId) => {
    navigate(`/EditListing/${listingId}`);
  };

  return (
    <L>
      <div className="container-fluid p-5" style={{ backgroundColor: '#000', minHeight: '100vh' }}>
        <h1 className="text-center mb-5 text-uppercase" style={{ color: 'red', letterSpacing: '2px' }}>Profil</h1>

        {/* Section Profil et Déconnexion */}
        <div className="text-center text-white mb-5">
          <p>Nom : {auth.currentUser?.displayName || 'Aucun nom défini'}</p>

          <div className="d-flex justify-content-between mb-3">
            {/* Bouton Se déconnecter */}
            <button className="btn btn-danger w-48" onClick={handleLogout}>
              Se déconnecter
            </button>

            {/* Bouton Vendre un produit */}
            <Link
              to="/CreateListing"
              className="btn btn-primary w-48 d-flex justify-content-between align-items-center"
            >
              <FaArrowAltCircleRight color='white' /> Vendre un produit
            </Link>
          </div>
        </div>

        {/* Détails utilisateur et modification */}
        <div className="card shadow-lg" style={{ width: '100%', maxWidth: '450px', margin: '0 auto', backgroundColor: '#1c1c1c', borderColor: 'red' }}>
          <div className="card-header d-flex justify-content-between align-items-center">
            <h5 className="m-0" style={{ color: 'white' }}>Détails de l'utilisateur</h5>
            <span
              style={{ cursor: 'pointer', color: 'red' }}
              onClick={() => {
                if (isEditing) {
                  handleSubmit();
                }
                setIsEditing(prevState => !prevState);
              }}
            >
              {isEditing ? (
                <IoCheckmarkDoneCircleSharp color="green" />
              ) : (
                <FaEdit color="red" />
              )}
            </span>
          </div>
          <form className="p-3">
            <div className="mb-3">
              <label htmlFor="name" className="form-label" style={{ color: 'white' }}>Nom</label>
              <input
                type="text"
                className="form-control"
                id="name"
                value={name}
                onChange={handleChange}
                disabled={!isEditing}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="email" className="form-label" style={{ color: 'white' }}>Adresse email</label>
              <input
                type="email"
                className="form-control"
                id="email"
                value={email}
                onChange={handleChange}
                disabled={!isEditing}
              />
            </div>
          </form>
        </div>

        {/* Section Annonces utilisateur */}
        <div className="container mt-4">
          {listings.length > 0 ? (
            <>
              <h6 style={{ color: 'white' }}>Vos Annonces</h6>
              <div>
                {listings.map(listing => (
                  <ListingItem
                    key={listing.id}
                    listing={listing.data}
                    id={listing.id}
                    onDelete={() => handleDelete(listing.id)}
                    onEdit={() => handleEdit(listing.id)}
                  />
                ))}
              </div>
            </>
          ) : (
            <p style={{ color: 'white' }}>Vous n'avez pas encore d'annonces.</p>
          )}
        </div>
      </div>
    </L>
  );
};

export default Profile;
