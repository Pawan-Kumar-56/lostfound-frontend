import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { reviewsAPI, storage } from "./services/api";
import './PostReview.css';

const PostReview = () => {

  const navigate = useNavigate();
  const currentUser = storage.getUser();

  const [formData, setFormData] = useState({
    rating: 5,
    title: '',
    review: ''
  });

  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData(prev => ({
      ...prev,
      [name]: value
    }));

    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const validateForm = () => {

    const newErrors = {};

    if (!formData.title.trim()) {
      newErrors.title = "Review title required";
    }

    if (formData.review.trim().length < 10) {
      newErrors.review = "Review must be at least 10 characters";
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {

    e.preventDefault();

    if (!validateForm()) return;

    setLoading(true);

    try {

      const reviewData = {
        ...formData,
        name: currentUser?.name || "Anonymous",
        email: currentUser?.email || "anonymous@email.com",
        department: currentUser?.department || "NIT KKR",
        year: currentUser?.year || "Student"
      };

      await reviewsAPI.create(reviewData);

      alert("Review posted successfully!");

      navigate("/reviews");

    } catch (error) {

      console.error("Review error:", error);

      alert("Failed to post review. Please try again.");

    } finally {

      setLoading(false);

    }
  };

  const renderStars = (rating) => {

    return Array.from({ length: 5 }, (_, index) => (

      <button
        key={index}
        type="button"
        className={`star ${index < rating ? 'filled' : ''}`}
        onClick={() =>
          setFormData(prev => ({
            ...prev,
            rating: index + 1
          }))
        }
      >
        {index < rating ? "⭐" : "☆"}
      </button>

    ));
  };

  return (

    <div className="post-review-wrapper">

      <h1>Post Review</h1>

      <form onSubmit={handleSubmit}>

        <div className="form-group">

          <label>Review Title</label>

          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
          />

          {errors.title && <p className="error">{errors.title}</p>}

        </div>

        <div className="form-group">

          <label>Rating</label>

          <div className="rating-stars">
            {renderStars(formData.rating)}
          </div>

        </div>

        <div className="form-group">

          <label>Your Review</label>

          <textarea
            name="review"
            value={formData.review}
            onChange={handleChange}
          />

          {errors.review && <p className="error">{errors.review}</p>}

        </div>

        <button
          type="submit"
          disabled={loading}
        >
          {loading ? "Posting..." : "Post Review"}
        </button>

      </form>

    </div>
  );
};

export default PostReview;