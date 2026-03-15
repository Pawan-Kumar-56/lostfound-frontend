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

        <label>Title</label>

        <input
          type="text"
          name="title"
          value={formData.title}
          onChange={handleChange}
          required
        />

        <label>Rating</label>

        <div>
          {renderStars(formData.rating)}
        </div>

        <label>Review</label>

        <textarea
          name="review"
          value={formData.review}
          onChange={handleChange}
          required
        />

        <button type="submit" disabled={loading}>
          {loading ? "Posting..." : "Post Review"}
        </button>

      </form>

    </div>

  );

};

export default PostReview;
