import React, { useState } from 'react';

import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { getAuth, sendPasswordResetEmail } from 'firebase/auth';

const ForgetPassword = () => {
  const [email, setEmail] = useState('');
  const navigate = useNavigate();
  const auth = getAuth();

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    try {
      await sendPasswordResetEmail(auth, email);
      toast.success('Un e-mail de réinitialisation a été envoyé à votre adresse.');
      navigate('/Login');
    } catch (error) {
      toast.error('Une erreur est survenue. Veuillez vérifier l\'adresse e-mail.');
    }
  };

  return (
  
      <div className="container-fluid p-5" style={{ backgroundColor: '#000', minHeight: '100vh' }}>
        <h1 className="text-center mb-5 text-uppercase" style={{ color: 'red', letterSpacing: '2px' }}>Réinitialisation du mot de passe</h1>
        <form onSubmit={onSubmitHandler} className="mx-auto" style={{ maxWidth: '500px' }}>
          <div className="mb-4">
            <label htmlFor="email" className="form-label" style={{ color: 'white' }}>Adresse e-mail</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="form-control"
              id="email"
              required
              style={{
                backgroundColor: '#1c1c1c',
                color: 'white',
                border: '1px solid red',
                padding: '10px',
              }}
            />
          </div>
          <div className="text-center">
            <button
              type="submit"
              className="btn"
              style={{
                backgroundColor: 'red',
                color: 'white',
                border: 'none',
                padding: '10px 20px',
                fontSize: '16px',
                transition: 'background-color 0.3s',
              }}
              onMouseOver={(e) => (e.currentTarget.style.backgroundColor = '#d00000')}
              onMouseOut={(e) => (e.currentTarget.style.backgroundColor = 'red')}
            >
              Envoyer
            </button>
          </div>
          <div className="text-center mt-4">
            <Link to="/Login" style={{ color: 'red', textDecoration: 'none', fontSize: '18px' }}>
              Retour à la connexion
            </Link>
          </div>
        </form>
      </div>
   
  );
};

export default ForgetPassword;
