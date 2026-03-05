import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { itemsAPI, storage } from './services/api';
import './PostItem.css';

const PostItem = () => {
  const navigate = useNavigate();
  
  // Form state
  const [formData, setFormData] = useState({
    itemName: '',
    description: '',
    category: '',
    location: '',
    date: '',
    itemType: 'lost', // lost or found
    contactInfo: '',
    image: null,
    imagePreview: ''
  });

  // Validation errors state
  const [errors, setErrors] = useState({});
  
  // Loading state
  const [loading, setLoading] = useState(false);

  // Categories
  const categories = [
    'Electronics',
    'Documents',
    'Accessories',
    'Clothing',
    'Books',
    'Keys',
    'Wallet/Purse',
    'Bags',
    'Others'
  ];

  // Handle input changes
  const handleChange = (e) => {
    const { name, value, type } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'file' ? e.target.files[0] : value
    }));
    
    // Clear error for this field when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  // Handle image upload
  const handleImageUpload = (e) => {

  const file = e.target.files[0];

  if (!file) return;

  if (!file.type.startsWith("image/")) {
    setErrors(prev => ({
      ...prev,
      image: "Please select a valid image file"
    }));
    return;
  }

  if (file.size > 5 * 1024 * 1024) {
    setErrors(prev => ({
      ...prev,
      image: "Image must be less than 5MB"
    }));
    return;
  }

  const reader = new FileReader();

  reader.onload = (event) => {

    const img = new Image();

    img.onload = () => {

      const canvas = document.createElement("canvas");
      const ctx = canvas.getContext("2d");

      const MAX_WIDTH = 600;

      const scaleSize = MAX_WIDTH / img.width;

      canvas.width = MAX_WIDTH;
      canvas.height = img.height * scaleSize;

      ctx.drawImage(img, 0, 0, canvas.width, canvas.height);

      const compressedBase64 = canvas.toDataURL("image/jpeg", 0.6);

      setFormData(prev => ({
        ...prev,
        image: file,
        imagePreview: compressedBase64
      }));

    };

    img.src = event.target.result;

  };

  reader.readAsDataURL(file);
};
  // Remove image
  const removeImage = () => {
    setFormData(prev => ({
      ...prev,
      image: null,
      imagePreview: ''
    }));
  };

  // Validate form
  const validateForm = () => {
    const newErrors = {};

    if (!formData.itemName.trim()) {
      newErrors.itemName = 'Item name is required';
    }

    if (!formData.description.trim()) {
      newErrors.description = 'Description is required';
    } else if (formData.description.length < 10) {
      newErrors.description = 'Description must be at least 10 characters';
    }

    if (!formData.category) {
      newErrors.category = 'Please select a category';
    }

    if (!formData.location.trim()) {
      newErrors.location = 'Location is required';
    }

    if (!formData.date) {
      newErrors.date = 'Date is required';
    }

    if (!formData.contactInfo.trim()) {
      newErrors.contactInfo = 'Contact information is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setLoading(true);

    try {
      // Get current user data
      const currentUser = storage.getUser();
      
      // Prepare data for backend API
      const itemData = {
        itemName: formData.itemName,
        description: formData.description,
        category: formData.category.toUpperCase(),
        location: formData.location,
        itemDate: formData.date,
        itemType: formData.itemType.toUpperCase(),
        contactInfo: formData.contactInfo,
        imageUrl: formData.imagePreview || null, // Send base64 image if uploaded
        userEmail: currentUser?.email || 'test@example.com', // Send user email
        userFullName: currentUser?.fullName || 'Test User' // Send user full name
      };

      // Debug logging
      console.log('=== POST ITEM DEBUG ===');
      console.log('Current user:', currentUser);
      console.log('Item data being sent:', itemData);
      console.log('Has image:', !!formData.imagePreview);
      console.log('Image length:', formData.imagePreview?.length || 0);

      // Call backend API to create item
      const response = await itemsAPI.create(itemData);
      
      console.log('Item created:', response);
      console.log('Navigating to: /dashboard');
      
      setLoading(false);
      alert('Item posted successfully!');
      navigate('/dashboard'); // Navigate to Dashboard page
    } catch (error) {
      console.error('Failed to post item:', error);
      console.error('Error response:', error.response);
      console.error('Error status:', error.response?.status);
      console.error('Error data:', error.response?.data);
      
      // Handle specific error cases
      if (error.response?.status === 400) {
        const errorMessage = error.response?.data?.message || 'Invalid data provided';
        
        // Check if it's an image-related error
        if (formData.imagePreview && (
          errorMessage.toLowerCase().includes('image') || 
          errorMessage.toLowerCase().includes('size') ||
          errorMessage.toLowerCase().includes('large')
        )) {
          // Try without image
          console.log('Image-related error detected, retrying without image...');
          try {
            const currentUser = storage.getUser();
            const itemDataWithoutImage = {
              itemName: formData.itemName,
              description: formData.description,
              category: formData.category.toUpperCase(),
              location: formData.location,
              itemDate: formData.date,
              itemType: formData.itemType.toUpperCase(),
              contactInfo: formData.contactInfo,
              imageUrl: null, // Send without image
              userEmail: currentUser?.email || 'test@example.com', // Send user email
              userFullName: currentUser?.fullName || 'Test User' // Send user full name
            };
            
            const response = await itemsAPI.create(itemDataWithoutImage);
            console.log('Item created without image:', response);
            
            setLoading(false);
            alert('Item posted successfully! (Note: Image could not be uploaded due to size limitations)');
            navigate('/dashboard');
            return;
          } catch (retryError) {
            console.error('Retry also failed:', retryError);
            alert('Failed to post item: ' + (retryError.response?.data?.message || retryError.message || 'Please try again'));
          }
        } else {
          alert('Failed to post item: ' + errorMessage);
        }
      } else if (error.response?.status === 413) {
        alert('Image is too large. Please choose a smaller image.');
      } else {
        alert('Failed to post item: ' + (error.response?.data?.message || error.message || 'Please try again'));
      }
      
      setLoading(false);
    }
  };

  return (
    <div className="post-item-container">
      <div className="post-item-card">
        <div className="post-item-header">
          <h1>Post Item</h1>
          <p>Report a lost or found item</p>
        </div>

        <form onSubmit={handleSubmit} className="post-item-form">
          {/* Item Type Selection */}
          <div className="form-group">
            <label>Item Type</label>
            <div className="item-type-selector">
              <label className="radio-option">
                <input
                  type="radio"
                  name="itemType"
                  value="lost"
                  checked={formData.itemType === 'lost'}
                  onChange={handleChange}
                />
                <span className="radio-label lost">🔍 Lost Item</span>
              </label>
              <label className="radio-option">
                <input
                  type="radio"
                  name="itemType"
                  value="found"
                  checked={formData.itemType === 'found'}
                  onChange={handleChange}
                />
                <span className="radio-label found">📦 Found Item</span>
              </label>
            </div>
          </div>

          {/* Item Name */}
          <div className="form-group">
            <label htmlFor="itemName">Item Name *</label>
            <input
              type="text"
              id="itemName"
              name="itemName"
              value={formData.itemName}
              onChange={handleChange}
              className={errors.itemName ? 'error' : ''}
              placeholder="e.g., iPhone 13, Black Wallet, etc."
            />
            {errors.itemName && <span className="error-message">{errors.itemName}</span>}
          </div>

          {/* Category */}
          <div className="form-group">
            <label htmlFor="category">Category *</label>
            <select
              id="category"
              name="category"
              value={formData.category}
              onChange={handleChange}
              className={errors.category ? 'error' : ''}
            >
              <option value="">Select a category</option>
              {categories.map(cat => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
            </select>
            {errors.category && <span className="error-message">{errors.category}</span>}
          </div>

          {/* Description */}
          <div className="form-group">
            <label htmlFor="description">Description *</label>
            <textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              className={errors.description ? 'error' : ''}
              placeholder="Provide detailed description of the item..."
              rows="4"
            />
            {errors.description && <span className="error-message">{errors.description}</span>}
          </div>

          {/* Location */}
          <div className="form-group">
            <label htmlFor="location">Location *</label>
            <input
              type="text"
              id="location"
              name="location"
              value={formData.location}
              onChange={handleChange}
              className={errors.location ? 'error' : ''}
              placeholder="e.g., Library, CSE Block, Mess Hall, etc."
            />
            {errors.location && <span className="error-message">{errors.location}</span>}
          </div>

          {/* Date */}
          <div className="form-group">
            <label htmlFor="date">
              {formData.itemType === 'lost' ? 'Date Lost *' : 'Date Found *'}
            </label>
            <input
              type="date"
              id="date"
              name="date"
              value={formData.date}
              onChange={handleChange}
              className={errors.date ? 'error' : ''}
              max={new Date().toISOString().split('T')[0]}
            />
            {errors.date && <span className="error-message">{errors.date}</span>}
          </div>

          {/* Contact Information */}
          <div className="form-group">
            <label htmlFor="contactInfo">Contact Information *</label>
            <input
              type="text"
              id="contactInfo"
              name="contactInfo"
              value={formData.contactInfo}
              onChange={handleChange}
              className={errors.contactInfo ? 'error' : ''}
              placeholder="Phone number or email address"
            />
            {errors.contactInfo && <span className="error-message">{errors.contactInfo}</span>}
          </div>

          {/* Image Upload */}
          <div className="form-group">
            <label>Upload Image (Optional)</label>
            <div className="image-upload-section">
              <input
                type="file"
                id="image"
                name="image"
                accept="image/*"
                onChange={handleImageUpload}
                className="image-input"
              />
              <label htmlFor="image" className="image-upload-btn">
                📷 Choose Image
              </label>
              <span className="image-note">Max size: 5MB</span>
            </div>
            {errors.image && <span className="error-message">{errors.image}</span>}
            
            {/* Image Preview */}
            {formData.imagePreview && (
              <div className="image-preview">
                <img src={formData.imagePreview} alt="Preview" />
                <button
                  type="button"
                  className="remove-image-btn"
                  onClick={removeImage}
                >
                  ❌
                </button>
              </div>
            )}
          </div>

          {/* Submit Button */}
          <div className="form-actions">
            <button
              type="button"
              className="cancel-btn"
              onClick={() => navigate('/dashboard')}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="submit-btn"
              disabled={loading}
            >
              {loading ? 'Posting...' : 'Post Item'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default PostItem;
