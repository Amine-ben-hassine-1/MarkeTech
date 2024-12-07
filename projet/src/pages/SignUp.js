import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import { getAuth, createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { BsFillEyeFill } from 'react-icons/bs';
import { db } from '../firebase';
import { doc, setDoc, serverTimestamp } from 'firebase/firestore';
import { toast } from 'react-toastify';
import OAuth from '../composants/OAuth';

const SignUp = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    name: ''
  });
  const navigate = useNavigate();
  const { name, email, password } = formData;

  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.id]: e.target.value
    }));
  };

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    try {
      const auth = getAuth();
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      // Update the user profile
      await updateProfile(auth.currentUser, { displayName: name });

      // Prepare data for Firestore
      const formDataCopy = { ...formData };
      delete formDataCopy.password;
      formDataCopy.timestamp = serverTimestamp();

      // Save user data in Firestore
      try {
        await setDoc(doc(db, 'users', user.uid), formDataCopy);
        toast.success('Signup Successfully!');
        navigate('/');
      } catch (firestoreError) {
        console.error('Error saving user data:', firestoreError);
        toast.error('Failed to save user data. Please try again.');
      }
    } catch (authError) {
      console.error('Error during signup:', authError);
      toast.error('Signup failed. Please check your details and try again.');
    }
  };

  return (
    <div style={{ 
        height: '100vh', 
        backgroundColor: '#000', 
        display: 'flex', 
        justifyContent: 'center', 
        alignItems: 'center' 
      }}>
      <form className="bg-light p-4 rounded" onSubmit={onSubmitHandler} style={{ maxWidth: '400px', width: '100%' }}>
        <h4 className="bg-dark p-2 mt-2 text-light text-center">Sign Up</h4>
        <div className="mb-3">
          <label htmlFor="name" className="form-label text-dark">Entrez votre Nom</label>
          <input
            type="text"
            value={name}
            className="form-control"
            id="name"
            onChange={onChange}
            aria-describedby="nameHelp"
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="email" className="form-label text-dark">Email Address</label>
          <input
            type="email"
            value={email}
            className="form-control"
            id="email"
            onChange={onChange}
            aria-describedby="emailHelp"
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="password" className="form-label text-dark">Mot de passe</label>
          <input
            type={showPassword ? 'text' : 'password'}
            value={password}
            className="form-control"
            id="password"
            onChange={onChange}
            required
          />
        </div>
        <span>
          Show Password
          <BsFillEyeFill
            className="text-danger"
            style={{ cursor: 'pointer' }}
            onClick={() => setShowPassword((prevState) => !prevState)}
          />
        </span>
        <br />
        <button type="submit" className="btn btn-danger mt-3 w-100">S'inscrire</button>
        <div className="mt-3 text-center">
          <h6>Connecter avec Google</h6>
          <OAuth />
          <span>Tu as déjà un compte? </span>
          <Link to="/Login" className="text-decoration-none text-danger">Se Connecter</Link>
        </div>
      </form>
    </div>
  );
};

export default SignUp;
