import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { reviewsAPI, storage } from "./services/api";
import "./PostReview.css";

const PostReview = () => {

  const navigate = useNavigate();
  const currentUser = storage.getUser();

  const [formData, setFormData] = useState({
    rating: 5,
    title: "",
    review: ""
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {

    const { name, value } = e.target;

    setFormData(prev => ({
      ...prev,
      [name]: value
    }));

  };

  const handleSubmit = async (e) => {

    e.preventDefault();

    setLoading(true);

    try {

      const reviewData = {
        ...formData,
        name: currentUser?.fullName || currentUser?.name || "Anonymous",
        email: currentUser?.email || "anonymous@email.com",
        department: currentUser?.department || "Student",
        year: currentUser?.year || "NIT KKR"
      };

      await reviewsAPI.create(reviewData);

      alert("Review posted successfully!");

      navigate("/reviews");

    } catch (error) {

      console.error("Post review error:", error);
      alert("Failed to post review");

    } finally {

      setLoading(false);

    }

  };

  const renderStars = (rating) => {
    return Array.from({ length: 5 }, (_, index) => (
      <button
        key={index}
        type="button"
        className={`pr-star ${index < rating ? 'filled' : ''}`}
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
    <div className="post-review-page">
      <div className="pr-wrapper">
        {/* Header */}
        <header className="pr-header">
          <div className="pr-header-content">
            <div className="pr-header-left">
              <h1 className="pr-page-title">Post Review</h1>
              <p className="pr-page-subtitle">Share your experience with the NIT KKR Lost & Found Portal</p>
            </div>
            <button className="pr-back-btn" onClick={() => navigate('/dashboard')}>
              Back to Dashboard
            </button>
          </div>
        </header>

        {/* Main Content */}
        <main className="pr-main">
          <div className="pr-container">
            <div className="pr-form-section">
              <div className="pr-section-header">
                <div className="pr-section-icon">⭐</div>
                <div>
                  <h2 className="pr-section-title">Share Your Feedback</h2>
                  <p className="pr-section-subtitle">Help us improve our services</p>
                  <p className="pr-section-description">Your feedback is valuable to us and helps us enhance the portal experience for everyone.</p>
                </div>
              </div>

              <form onSubmit={handleSubmit} className="pr-review-form">
                <div className="pr-review-details-container">
                  <div className="pr-form-section">
                    <div className="pr-form-section-header">
                      <div className="pr-form-section-icon">📝</div>
                      <h3 className="pr-form-section-title">Review Details</h3>
                    </div>

                    <div className="pr-form-grid-horizontal">
                      <div className="pr-form-group">
                        <label htmlFor="title">Review Title</label>
                        <input
                          type="text"
                          id="title"
                          name="title"
                          value={formData.title}
                          onChange={handleChange}
                          placeholder="Enter a title for your review"
                          required
                        />
                      </div>

                      <div className="pr-form-group">
                        <label>Rating</label>
                        <div className="pr-rating-container">
                          <div className="pr-rating-stars">
                            {renderStars(formData.rating)}
                          </div>
                          <span className="pr-rating-text">{formData.rating} out of 5</span>
                        </div>
                      </div>
                    </div>

                    <div className="pr-form-group full-width">
                      <label htmlFor="review">Your Review</label>
                      <textarea
                        id="review"
                        name="review"
                        value={formData.review}
                        onChange={handleChange}
                        placeholder="Share your detailed experience and suggestions..."
                        rows="6"
                        required
                      />
                    </div>
                  </div>
                </div>

                <div className="pr-form-actions">
                  <button type="submit" className="pr-submit-btn" disabled={loading}>
                    {loading ? "Posting Review..." : "Post Review"}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </main>

        {/* Footer */}
        <footer className="pr-footer">
          <div className="pr-footer-content">
            <p>© 2024 NIT KKR Lost & Found Portal. Your feedback helps us serve better.</p>
          </div>
        </footer>
      </div>
    </div>
  );

};

export default PostReview;
