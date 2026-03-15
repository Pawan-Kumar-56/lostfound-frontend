import React, { useEffect, useState } from "react";
import { reviewsAPI } from "./services/api";
import { useNavigate } from "react-router-dom";
import "./Reviews.css";

const Reviews = () => {

  const navigate = useNavigate();

  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);

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

      <header>

        <h1>All Reviews</h1>

        <button onClick={() => navigate("/")}>
          Back to Home
        </button>

      </header>

      <main>

        {reviews.length === 0 ? (

          <p>No reviews yet</p>

        ) : (

          reviews.map(review => (

            <div key={review.id} className="review-card">

              <h3>{review.name}</h3>

              <div>
                {renderStars(review.rating)}
              </div>

              <h4>{review.title}</h4>

              <p>{review.review}</p>

              <small>
                {review.department} • {review.year}
              </small>

              <br/>

              <small>
                {formatDate(review.createdAt)}
              </small>

            </div>

          ))

        )}

      </main>

    </div>

  );

};

export default Reviews;