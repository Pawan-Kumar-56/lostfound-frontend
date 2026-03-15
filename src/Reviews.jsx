import React, { useEffect, useState } from "react";
import { reviewsAPI } from "./services/api";
import { storage } from "./services/api";
import { useNavigate } from "react-router-dom";
import "./Reviews.css";

const Reviews = () => {

  const navigate = useNavigate();

  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);

  // Get actual user data from storage
  const userData = storage.getUser();
  const currentUserName = userData?.fullName || "User";

  useEffect(() => {

    fetchReviews();

  }, []);

  const fetchReviews = async () => {

    try {

      const data = await reviewsAPI.getAll();

      setReviews(data);

    } catch (error) {

      console.error("Error loading reviews:", error);

    } finally {

      setLoading(false);

    }

  };

  const renderStars = (rating) => {

    return Array.from({ length: 5 }, (_, index) => (

      <span key={index}>
        {index < rating ? "⭐" : "☆"}
      </span>

    ));

  };

  const formatDate = (dateString) => {

    const date = new Date(dateString);

    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric"
    });

  };

  if (loading) {

    return (
      <div className="reviews-wrapper">
        <p>Loading reviews...</p>
      </div>
    );

  }

  return (

    <div className="reviews-wrapper">

      {/* Header Section */}
      <section className="reviews-hero-section">
        <div className="hero-content">
          <div className="hero-text">
            <h1 className="reviews-title">What People Say</h1>
            <p className="reviews-subtitle">Real stories from our NIT KKR community</p>
            <button onClick={() => navigate("/")} className="back-to-home-btn">
              ← Back to Home
            </button>
          </div>
        </div>
      </section>

      {/* Reviews Grid Section */}
      <section className="reviews-section">
        <div className="reviews-container">
          {reviews.length === 0 ? (
            <div className="no-reviews">
              <div className="no-reviews-icon">📝</div>
              <h3>No Reviews Yet</h3>
              <p>Be the first to share your experience with the NIT KKR Lost & Found Portal!</p>
              <button onClick={() => navigate('/postreview')} className="post-review-btn">
                Post a Review
              </button>
            </div>
          ) : (
            <div className="reviews-grid">
              {reviews.map(review => (
                <div key={review.id} className="review-card">
                  <div className="review-content">
                    <p className="review-text">
                      "{review.review}"
                    </p>
                    <div className="review-author">
                      <div className="author-avatar">👨‍🎓</div>
                      <div className="author-info">
                        <div className="author-name">{review.name}</div>
                        <div className="author-role">{review.department} • {review.year}</div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

    </div>

  );

};

export default Reviews;