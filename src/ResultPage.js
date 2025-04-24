// ResultPage.js
import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import tropicalLeaves from './assets/tropical-green-leaves-background.jpg';
import './ResultPage.css'; 
import './mediaqueries.css';


function ResultPage() {
  const location = useLocation();
  const { prediction, imagePreview } = location.state || {};
  const navigate = useNavigate();

  if (!prediction) {
    return (
      <div className="bg" style={{ backgroundImage: `url(${tropicalLeaves})` }} role="img" aria-label="Tropical green leaves background">
      <div className="result-page">
        <h1>No Prediction Data Found</h1>
        <p>Please go back and upload an image for prediction.</p>
        <button onClick={() => navigate('/submit')}>Go to Submit Page</button>
      </div>
      </div>
    );
  }

  return (
    <div className="bg" style={{ backgroundImage: `url(${tropicalLeaves})` }} role="img" aria-label="Tropical green leaves background">
    <div className="result-page">
      <h1>Prediction Result</h1>
      <p><strong>Category:</strong> {prediction.category}</p>
      <p><strong>Medicinal Properties:</strong> {prediction.description}</p>
      <div className='image-preview'>
      <img src={imagePreview} alt="Uploaded Plant" />
      </div>
      <button onClick={() => navigate('/submit')}>Upload Another Image</button>
    </div>
    </div>
  );
}

export default ResultPage;