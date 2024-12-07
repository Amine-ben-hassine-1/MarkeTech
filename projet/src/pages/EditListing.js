import React, { useState, useEffect, useRef } from 'react';
import L from '../composants/L';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { useNavigate, useParams } from 'react-router-dom';
import { doc, updateDoc, getDoc, serverTimestamp } from 'firebase/firestore';
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';
import { v4 as uuidv4 } from 'uuid';
import { toast } from 'react-toastify';
import { db } from '../firebase';
import Spinner from '../composants/Spinner';

const EditListing = () => {
  const [loading, setLoading] = useState(false);
  const [listing, setListing] = useState(null);
  const params = useParams();
  const [formData, setFormData] = useState({
    name: '',
    brand: '',
    condition: 'new',
    price: '',
    location: '',
    imgUrls: [],
    type: '',
    userRef: '',
    storage: '',
    screenSize: '',
    processor: '',
    offer: false,
    numberOfOffers: ''
  });
  const [images, setImages] = useState([]);
  const { name, brand, condition, price, location, imgUrls, type, storage, screenSize, processor, offer, numberOfOffers } = formData;

  const auth = getAuth();
  const navigate = useNavigate();
  const isMounted = useRef(true);

  useEffect(() => {
    if (isMounted.current) {
      onAuthStateChanged(auth, (user) => {
        if (user) {
          setFormData((prevState) => ({
            ...prevState,
            userRef: user.uid,
          }));
        } else {
          navigate('/Login');
        }
      });
    }
    return () => {
      isMounted.current = false;
    };
  }, [auth, navigate]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  useEffect(() => {
    setLoading(true);
    const fetchListing = async () => {
      const docRef = doc(db, 'listings', params.listingId);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        const fetchedListing = docSnap.data();
        setListing(fetchedListing);
        setFormData((prevState) => ({
          ...prevState,
          ...fetchedListing,
        }));
        setLoading(false);
      } else {
        navigate('/');
        toast.error('Listing does not exist');
      }
    };
    fetchListing();
  }, [params.listingId, navigate]);

  const handleImageChange = (e) => {
    setImages([...e.target.files]);
  };

  const storeImage = async (image) => {
    return new Promise((resolve, reject) => {
      const storage = getStorage();
      const fileName = `${auth.currentUser.uid}-${uuidv4()}-${image.name}-${uuidv4()}`;
      const storageRef = ref(storage, 'images/' + fileName);

      const uploadTask = uploadBytesResumable(storageRef, image);

      uploadTask.on(
        'state_changed',
        (snapshot) => {
          const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log(`Upload is ${progress}% done`);
        },
        (error) => {
          console.error('Error uploading file:', error);
          reject(error);
        },
        async () => {
          const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
          resolve(downloadURL);
        }
      );
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const uploadedImgUrls = await Promise.all(images.map((image) => storeImage(image)));

      const formDataCopy = {
        ...formData,
        imgUrls: uploadedImgUrls.length > 0 ? uploadedImgUrls : imgUrls,
        timestamp: serverTimestamp(),
      };

      delete formDataCopy.images;

      const docRef = doc(db, "listings", params.listingId);
      await updateDoc(docRef, formDataCopy);
      toast.success("Listing updated!");

      setImages([]);
      navigate(`/Cat/${formDataCopy.type}/${params.listingId}`);
    } catch (error) {
      toast.error("Error updating listing. Please try again.");
      console.error('Error updating listing:', error);
    } finally {
      setLoading(false);
    }
  };

  const renderFormFields = () => {
    switch (type) {
      case 'telephones':
        return (
          <>
            <div className="mb-3">
              <label htmlFor="brand" className="form-label" style={{ color: '#212529' }}>Brand</label>
              <input
                type="text"
                className="form-control"
                id="brand"
                name="brand"
                value={brand}
                onChange={handleChange}
                required
              />
            </div>
            <div className="mb-3">
              <label htmlFor="storage" className="form-label" style={{ color: '#212529' }}>Storage</label>
              <input
                type="text"
                className="form-control"
                id="storage"
                name="storage"
                value={storage}
                onChange={handleChange}
                required
              />
            </div>
          </>
        );
      case 'TV':
        return (
          <>
            <div className="mb-3">
              <label htmlFor="brand" className="form-label" style={{ color: '#212529' }}>Brand</label>
              <input
                type="text"
                className="form-control"
                id="brand"
                name="brand"
                value={brand}
                onChange={handleChange}
                required
              />
            </div>
            <div className="mb-3">
              <label htmlFor="screenSize" className="form-label" style={{ color: '#212529' }}>Screen Size (inches)</label>
              <input
                type="text"
                className="form-control"
                id="screenSize"
                name="screenSize"
                value={screenSize}
                onChange={handleChange}
                required
              />
            </div>
          </>
        );
      case 'Ordinateurs':
        return (
          <>
            <div className="mb-3">
              <label htmlFor="brand" className="form-label" style={{ color: '#212529' }}>Brand</label>
              <input
                type="text"
                className="form-control"
                id="brand"
                name="brand"
                value={brand}
                onChange={handleChange}
                required
              />
            </div>
            <div className="mb-3">
              <label htmlFor="processor" className="form-label" style={{ color: '#212529' }}>Processor</label>
              <input
                type="text"
                className="form-control"
                id="processor"
                name="processor"
                value={processor}
                onChange={handleChange}
                required
              />
            </div>
          </>
        );
      default:
        return null;
    }
  };

  return (
    <L>
      <div className="container-fluid p-5" style={{ backgroundColor: '#000', minHeight: '100vh' }}>
        <h1 className="text-center mb-5 text-uppercase" style={{ color: 'red', letterSpacing: '2px' }}>Edit Listing</h1>
        <form onSubmit={handleSubmit} className="bg-white p-4 rounded" style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
          <div className="mb-3">
            <label htmlFor="type" className="form-label" style={{ color: '#212529' }}>Category</label>
            <select
              className="form-select"
              id="type"
              name="type"
              value={type}
              onChange={handleChange}
              required
            >
            
              <option value="telephones">Telephones</option>
              <option value="TV">TV</option>
              <option value="Ordinateurs">Ordinateurs</option>
            </select>
          </div>
          <div className="mb-3">
            <label htmlFor="name" className="form-label" style={{ color: '#212529' }}>Product Name</label>
            <input
              type="text"
              className="form-control"
              id="name"
              name="name"
              value={name}
              onChange={handleChange}
              required
            />
          </div>
          {renderFormFields()}
          <div className="mb-3">
            <label htmlFor="price" className="form-label" style={{ color: '#212529' }}>Price</label>
            <input
              type="number"
              className="form-control"
              id="price"
              name="price"
              value={price}
              onChange={handleChange}
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="location" className="form-label" style={{ color: '#212529' }}>Location</label>
            <input
              type="text"
              className="form-control"
              id="location"
              name="location"
              value={location}
              onChange={handleChange}
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="condition" className="form-label" style={{ color: '#212529' }}>Condition</label>
            <select
              className="form-select"
              id="condition"
              name="condition"
              value={condition}
              onChange={handleChange}
              required
            >
              <option value="new">New</option>
              <option value="used">Used</option>
            </select>
          </div>
          <div className="mb-3">
            <label htmlFor="offer" className="form-label" style={{ color: '#212529' }}>Offer</label>
            <input
              type="checkbox"
              className="form-check-input"
              id="offer"
              name="offer"
              checked={offer}
              onChange={handleChange}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="images" className="form-label" style={{ color: '#212529' }}>Images</label>
            <input
              type="file"
              className="form-control"
              id="images"
              name="images"
              multiple
              onChange={handleImageChange}
            />
          </div>
          <div className="d-flex justify-content-between mt-auto">
            <button type="submit" className="btn btn-primary">{loading ? <Spinner /> : 'Update Listing'}</button>
          </div>
        </form>
      </div>
    </L>
  );
};

export default EditListing;
