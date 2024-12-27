import React from 'react';
import '../Loader.css'; // Importing CSS for styling

const Loader: React.FC = () => {
  return (
    <div className="loader-container">
      <div className="loader">
        <div className="cake">
          <div className="layer layer1"></div>
          <div className="layer layer2"></div>
          <div className="layer layer3"></div>
          <div className="cherry"></div>
        </div>
      </div>
      <p className="loading-text">Loading delicious cakes...</p>
    </div>
  );
};

export default Loader;