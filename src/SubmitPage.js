// SubmitPage.js
import React, { useState } from 'react';
import tropicalLeaves from './assets/tropical-green-leaves-background.jpg';
import { useNavigate } from 'react-router-dom';
import './SubmitPage.css';
import './mediaqueries.css';

function SubmitPage() {
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile && selectedFile.type.startsWith('image/')) {
      setFile(selectedFile);
      setPreview(URL.createObjectURL(selectedFile));
      setError(null);
    } else {
      setError('Please upload a valid image file.');
      setFile(null);
      setPreview(null);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!file) {
      setError('Please select a file.');
      return;
    }

    setLoading(true);
    setError(null);

    const formData = new FormData();
    formData.append('myfile', file);

    try {
      const response = await fetch('https://identification-of-medicinal-plant-1.onrender.com', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Network response was not ok');
      }

      const result = await response.json();

      // Navigate to the result page with the prediction data
      navigate('/result', { state: { prediction: result, imagePreview: preview} });
    } catch (err) {
      setError(err.message || 'Failed to predict. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg" style={{ backgroundImage: `url(${tropicalLeaves})` }} role="img" aria-label="Tropical green leaves background">
    <div className="container">
      <h1>Medicinal Plant Identifier</h1>
      <p>Select an image of a medicinal plant, and our system will identify it for you!</p>
      <form onSubmit={handleSubmit}>
        <label htmlFor="myfile">Choose plant image:</label>
        <input type="file" id="myfile" name="myfile" onChange={handleFileChange} accept="image/*" />
        <br />
        <input type="submit" value="Predict" disabled={loading} />
        {loading && <div className="spinner"></div>}
        {error && <p className="error">{error}</p>}
      </form>
    </div>
    </div>
  );
}

export default SubmitPage;
