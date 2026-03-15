import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './Reviews.css';

const Reviews = () => {

const navigate = useNavigate();

const [reviews, setReviews] = useState([]);
const [loading, setLoading] = useState(true);
const [error, setError] = useState(null);

const API_URL = "https://lostfound-backend-2ugd.onrender.com/api/reviews";

useEffect(() => {
fetchReviews();
}, []);

const fetchReviews = async () => {

```
try {

  setLoading(true);

  const response = await fetch(API_URL);

  if (!response.ok) {
    throw new Error("Failed to fetch reviews");
  }

  const data = await response.json();

  setReviews(data);
  setError(null);

} catch (err) {

  console.error("Error fetching reviews:", err);
  setError(err.message);

  const localReviews = JSON.parse(localStorage.getItem("localReviews") || "[]");

  if (localReviews.length > 0) {
    setReviews(localReviews);
  } else {

    setReviews([
      {
        id: 1,
        name: "Rahul Kumar",
        email: "rahul@nitkkr.ac.in",
        rating: 5,
        title: "Amazing Platform!",
        review: "I lost my wallet during the fest and found it within hours thanks to this platform!",
        department: "CSE",
        year: "3rd Year",
        createdAt: "2024-03-10T10:30:00"
      },
      {
        id: 2,
        name: "Priya Sharma",
        email: "priya@nitkkr.ac.in",
        rating: 5,
        title: "Very Helpful",
        review: "Found someone's laptop bag and returned it easily using this platform.",
        department: "ECE",
        year: "2nd Year",
        createdAt: "2024-03-08T14:20:00"
      },
      {
        id: 3,
        name: "Dr. Singh",
        email: "singh@nitkkr.ac.in",
        rating: 5,
        title: "Excellent Service",
        review: "Amazing platform! Very user-friendly and effective for finding lost items.",
        department: "Faculty",
        year: "Professor",
        createdAt: "2024-03-05T09:15:00"
      }
    ]);

  }

} finally {

  setLoading(false);

}
```

};

const handleBackToHome = () => {
navigate('/');
};

const renderStars = (rating) => {

```
return Array.from({ length: 5 }, (_, index) => (
  <span key={index}>
    {index < rating ? "⭐" : "☆"}
  </span>
));
```

};

const formatDate = (dateString) => {

```
try {

  const date = new Date(dateString);

  return date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric"
  });

} catch {

  return "Recent";

}
```

};

if (loading) {

```
return (
  <div className="reviews-wrapper">
    <p>Loading reviews...</p>
  </div>
);
```

}

if (error) {

```
return (
  <div className="reviews-wrapper">
    <h2>Connection Error</h2>
    <p>{error}</p>
    <button onClick={fetchReviews}>Retry</button>
  </div>
);
```

}

return (

```
<div className="reviews-wrapper">

  <header className="reviews-header">

    <h1>All Reviews</h1>

    <button onClick={handleBackToHome}>
      ← Back to Home
    </button>

  </header>

  <main className="reviews-main">

    {reviews.length === 0 ? (

      <p>No Reviews Yet</p>

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
```

);

};

export default Reviews;
