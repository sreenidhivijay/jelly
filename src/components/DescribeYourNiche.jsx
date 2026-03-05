import React, { useState } from 'react';

function DescribeYourNiche({ userId, onNext }) {
  const [formData, setFormData] = useState({
    description: '',
    nationality: '',
    address: '',
    instagram: '',
    tiktok: '',
    youtube: '',
    portfolio: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // In a real app, save formData for userId here
    console.log('Saving niche details for user', userId, formData);
    if (onNext) {
      onNext();
    }
  };

  return (
    <div className="describe-your-niche-section">
      <h2>Describe Your Niche</h2>
      <p>Tell us a bit more about yourself and the content you create.</p>
      
      <form onSubmit={handleSubmit} className="niche-form">
        <div className="form-group">
          <label htmlFor="description">Niche Description</label>
          <textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            placeholder="e.g., Lifestyle, Tech Review, Beauty..."
            required
          />
        </div>

        <div className="form-row">
          <div className="form-group">
            <label htmlFor="nationality">Nationality</label>
            <input type="text" id="nationality" name="nationality" value={formData.nationality} onChange={handleChange} required />
          </div>
          <div className="form-group">
            <label htmlFor="address">Address</label>
            <input type="text" id="address" name="address" value={formData.address} onChange={handleChange} required />
          </div>
        </div>

        <h3>Social Media Links</h3>
        <div className="form-group"><label>Instagram</label><input type="url" name="instagram" value={formData.instagram} onChange={handleChange} /></div>
        <div className="form-group"><label>TikTok</label><input type="url" name="tiktok" value={formData.tiktok} onChange={handleChange} /></div>
        <div className="form-group"><label>YouTube</label><input type="url" name="youtube" value={formData.youtube} onChange={handleChange} /></div>
        <div className="form-group"><label>Portfolio / Website</label><input type="url" name="portfolio" value={formData.portfolio} onChange={handleChange} /></div>

        <button type="submit" className="submit-btn">Next</button>
      </form>
    </div>
  );
}

export default DescribeYourNiche;