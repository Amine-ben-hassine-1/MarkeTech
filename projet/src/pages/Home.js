import React from 'react';
import L from '../composants/L';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const navigate = useNavigate();
  const img1 = 'https://img.20mn.fr/dO1_eaf7QzKnwVOZqau72ik/722x460_amazon-remise-sur-l-ordinateur-portable-mac-book-air-2022-13-6-pouces-apple';
  const img2 = 'https://phonestoretn.tn/1390-home_default/iphone-15-256go-rose-apple.jpg';
  const img3 = 'https://darty-staging.dotit-corp.com//media/image/5d/9a/e58c4fc0736bb94a8ddd5ee17b5e.webp';

  return (
    <L>
      <div className="container-fluid p-5" style={{ backgroundColor: '#000', minHeight: '100vh' }}>
        <h1 className="text-center mb-5 text-uppercase" style={{ color: 'red', letterSpacing: '2px' }}>Catégories</h1>
        <div className="row g-4 justify-content-center">
          <div className="col-md-4">
            <div className="card border-2" style={{ borderColor: 'red', backgroundColor: '#1c1c1c' }}>
              <img
                src={img1}
                className="card-img-top"
                alt="Ordinateurs"
                style={{ height: '200px', objectFit: 'cover', transition: 'transform 0.3s' }}
                onMouseOver={e => e.currentTarget.style.transform = 'scale(1.05)'}
                onMouseOut={e => e.currentTarget.style.transform = 'scale(1)'}
              />
              <div className="card-body text-center">
                <h5 className="card-title" style={{ color: 'white' }}>Ordinateurs</h5>
                <button
                  className="btn mt-2"
                  style={{
                    backgroundColor: 'red',
                    color: 'white',
                    border: 'none',
                    transition: 'background-color 0.3s'
                  }}
                  onMouseOver={e => e.currentTarget.style.backgroundColor = '#d00000'}
                  onMouseOut={e => e.currentTarget.style.backgroundColor = 'red'}
                  onClick={() => navigate('/Cat/Ordinateurs')}
                >
                  Voir Plus
                </button>
              </div>
            </div>
          </div>
          <div className="col-md-4">
            <div className="card border-2" style={{ borderColor: 'red', backgroundColor: '#1c1c1c' }}>
              <img
                src={img2}
                className="card-img-top"
                alt="Téléphones"
                style={{ height: '200px', objectFit: 'cover', transition: 'transform 0.3s' }}
                onMouseOver={e => e.currentTarget.style.transform = 'scale(1.05)'}
                onMouseOut={e => e.currentTarget.style.transform = 'scale(1)'}
              />
              <div className="card-body text-center">
                <h5 className="card-title" style={{ color: 'white' }}>Téléphones</h5>
                <button
                  className="btn mt-2"
                  style={{
                    backgroundColor: 'red',
                    color: 'white',
                    border: 'none',
                    transition: 'background-color 0.3s'
                  }}
                  onMouseOver={e => e.currentTarget.style.backgroundColor = '#d00000'}
                  onMouseOut={e => e.currentTarget.style.backgroundColor = 'red'}
                  onClick={() => navigate('/Cat/telephones')}
                >
                  Voir Plus
                </button>
              </div>
            </div>
          </div>
          <div className="col-md-4">
            <div className="card border-2" style={{ borderColor: 'red', backgroundColor: '#1c1c1c' }}>
              <img
                src={img3}
                className="card-img-top"
                alt="TV"
                style={{ height: '200px', objectFit: 'cover', transition: 'transform 0.3s' }}
                onMouseOver={e => e.currentTarget.style.transform = 'scale(1.05)'}
                onMouseOut={e => e.currentTarget.style.transform = 'scale(1)'}
              />
              <div className="card-body text-center">
                <h5 className="card-title" style={{ color: 'white' }}>TV</h5>
                <button
                  className="btn mt-2"
                  style={{
                    backgroundColor: 'red',
                    color: 'white',
                    border: 'none',
                    transition: 'background-color 0.3s'
                  }}
                  onMouseOver={e => e.currentTarget.style.backgroundColor = '#d00000'}
                  onMouseOut={e => e.currentTarget.style.backgroundColor = 'red'}
                  onClick={() => navigate('/Cat/TV')}
                >
                  Voir Plus
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </L>
  );
};

export default Home;
