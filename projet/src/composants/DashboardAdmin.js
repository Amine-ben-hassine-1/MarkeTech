import React, { useState, useEffect } from 'react';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import L from '../composants/L';

const DashboardAdmin = () => {
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    const auth = getAuth();

    onAuthStateChanged(auth, (user) => {
      if (user && user.email === 'admin@admin.com') {
        setIsAdmin(true);
      } else {
        setIsAdmin(false);
      }
    });
  }, []);

  return (
    <L>
    <div className="container-fluid p-5" style={{ backgroundColor: '#000', minHeight: '100vh' }}>
    
      {isAdmin ? (
        <div>
          <iframe
            title="marketplace1"
            width="100%"  // Full width of the container
            height="900"  // Adjust height to make it larger
            src="https://app.powerbi.com/reportEmbed?reportId=ed483af2-db96-42e5-842f-0b3a740a161b&autoAuth=true&ctid=604f1a96-cbe8-43f8-abbf-f8eaf5d85730"
            frameBorder="0"
            allowFullScreen
          ></iframe>
        </div>
      ) : (
        <div className="text-center" style={{ color: 'white' }}>
          <h2 style={{ color: 'white' }}>Accès refusé</h2>
          <p style={{ color: 'gray' }}>Vous devez être administrateur pour accéder à cette page.</p>
        </div>
      )}
    </div> </L>
  );
};

export default DashboardAdmin;
