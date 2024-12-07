import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import { BsFillEyeFill } from 'react-icons/bs';
import { toast } from 'react-toastify';
import OAuth from '../composants/OAuth';

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const navigate = useNavigate();
  const { email, password } = formData;

  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.id]: e.target.value,
    }));
  };

  const loginHandler = async (e) => {
    e.preventDefault();
    try {
      const auth = getAuth();
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      if (userCredential.user) {
        toast.success('Connexion réussie');
        navigate('/');
      }
    } catch (error) {
      console.error('Échec de la connexion:', error);
      toast.error('Email ou mot de passe invalide');
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
        <form 
          className="bg-light p-4 rounded" 
          onSubmit={loginHandler} 
          style={{ maxWidth: '400px', width: '100%', border: '2px solid red' }}>

          <h4 className="bg-dark p-2 mt-2 text-light text-center">Connexion</h4>

          <div className="mb-3">
            <label htmlFor="email" className="form-label text-dark">Adresse e-mail</label>
            <input
              type="email"
              value={email}
              onChange={onChange}
              className="form-control"
              id="email"
              aria-describedby="emailHelp"
              required
            />
          </div>

          <div className="mb-3">
            <label htmlFor="password" className="form-label text-dark">Mot de passe</label>
            <input
              type={showPassword ? 'text' : 'password'}
              value={password}
              onChange={onChange}
              className="form-control"
              id="password"
              required
            />
          </div>

          <span>
            Montrer le mot de passe
            <BsFillEyeFill
              className="text-danger"
              style={{ cursor: 'pointer' }}
              onClick={() => setShowPassword((prevState) => !prevState)}
            />
          </span>
          <br />

          <Link to='/ForgetPassword' className="text-decoration-none text-danger mt-2">Mot de passe oublié</Link>
          <br />

          <button type="submit" className="btn btn-danger mt-3 w-100">Se connecter</button>

          <div className="mt-3 text-center">
            <h6>Connecter avec Google</h6>
            <OAuth />
            <span>Nouveau utilisateur? </span>
            <Link to="/SignUp" className="text-decoration-none text-danger">S'inscrire</Link>
          </div>
        </form>
      </div>
    
  );
};

export default Login;
