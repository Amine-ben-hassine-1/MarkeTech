import React from 'react';

const NotFound = () => {
  return (
    <div className="container text-center my-5">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="card shadow-lg p-4 bg-light">
            <div className="card-body">
              <h2 className="text-danger display-4">Page non trouvée</h2>
              <p className="lead text-muted">
                La page que vous recherchez n'existe pas. Vérifiez l'URL ou revenez à la page d'accueil.
              </p>
              <a href="/" className="btn btn-primary mt-3">Retour à l'accueil</a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
