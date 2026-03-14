package nitkkr.Backend.service;

import nitkkr.Backend.entity.Review;
import nitkkr.Backend.entity.User;
import nitkkr.Backend.repository.ReviewRepository;
import nitkkr.Backend.dto.ReviewRequest;
import nitkkr.Backend.dto.ReviewResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

@Service
public class ReviewService {
    
    @Autowired
    private ReviewRepository reviewRepository;
    
    public ReviewResponse createReview(ReviewRequest request, User user) {
        Review review = new Review(
            request.getName(),
            request.getEmail(),
            request.getRating(),
            request.getTitle(),
            request.getReview(),
            request.getDepartment(),
            request.getYear(),
            user
        );
        
        Review savedReview = reviewRepository.save(review);
        return convertToResponse(savedReview);
    }
    
    public Page<ReviewResponse> getAllReviews(Pageable pageable) {
        return reviewRepository.findAllByOrderByCreatedAtDesc(pageable)
                .map(this::convertToResponse);
    }
    
    public Page<ReviewResponse> getReviewsByUser(Long userId, Pageable pageable) {
        return reviewRepository.findByUserId(userId, pageable)
                .map(this::convertToResponse);
    }
    
    public double getAverageRating() {
        Double avg = reviewRepository.getAverageRating();
        return avg != null ? avg : 0.0;
    }
    
    public long getTotalReviews() {
        Long total = reviewRepository.getTotalReviews();
        return total != null ? total : 0L;
    }
    
    private ReviewResponse convertToResponse(Review review) {
        ReviewResponse response = new ReviewResponse();
        response.setId(review.getId());
        response.setName(review.getName());
        response.setEmail(review.getEmail());
        response.setRating(review.getRating());
        response.setTitle(review.getTitle());
        response.setReview(review.getReview());
        response.setDepartment(review.getDepartment());
        response.setYear(review.getYear());
        response.setCreatedAt(review.getCreatedAt());
        
        if (review.getUser() != null) {
            response.setUserId(review.getUser().getId());
            response.setUserName(review.getUser().getFullName());
        }
        
        return response;
    }
}
