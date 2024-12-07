import React from 'react';

import { Link } from 'react-router-dom';

const ListingItem = ({ listing, id, onDelete, onEdit }) => {
  const renderCategorySpecificDetails = () => {
    switch (listing.type) {
      case 'telephones':
        return <p className="mb-1 text-white">Storage: {listing.storage}</p>;
      case 'TV':
        return <p className="mb-1 text-white">Screen Size: {listing.screenSize} inches</p>;
      case 'Ordinateurs':
        return <p className="mb-1 text-white">Processor: {listing.processor}</p>;
      default:
        return null;
    }
  };

  return (
    <div className="d-flex align-items-center justify-content-center my-3">
      <div className="card shadow-lg" style={{ width: "100%", maxWidth: "800px", borderRadius: "15px", backgroundColor: '#1c1c1c', borderColor: 'red' }}>
        <Link to={`/Cat/${listing.type}/${id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
          <div className="row g-0 p-3">
            <div className="col-12 col-md-5">
              <img
                src={listing.imgUrls[0]}
                className="img-fluid rounded-start"
                alt={listing.name}
                style={{ objectFit: 'cover', width: '100%', height: '200px', transition: 'transform 0.3s' }}
                onMouseOver={e => e.currentTarget.style.transform = 'scale(1.05)'}
                onMouseOut={e => e.currentTarget.style.transform = 'scale(1)'}
              />
            </div>
            <div className="col-12 col-md-7 d-flex flex-column justify-content-center">
              <h5 className="card-title text-white fw-bold mb-2">{listing.name}</h5>
              <p className="mb-1 text-white">Brand: {listing.brand}</p>
              <p className="mb-1 text-white">Condition: {listing.condition}</p>
              <p className="mb-1 text-white">Price: {listing.price} €</p>
              <p className="mb-1 text-white">Location: {listing.location}</p>
              {renderCategorySpecificDetails()}
            </div>
          </div>
        </Link>
        <div className="d-flex justify-content-between mt-4">
  {onEdit && (
    <div>
      <button
        className="btn btn-info me-9" // Button on the left
        onClick={() => onEdit(listing.id, listing.name)}
      >
        Modifier
      </button>
    </div>
  )}
  {onDelete && (
    <div>
      <button
        className="btn btn-danger ms-5" // Button on the right
        onClick={() => onDelete(listing.id, listing.name)}
      >
        Supprimer
      </button>
    </div>
  )}
</div>

</div>



          </div>
    
  
  );
};

export default ListingItem;
