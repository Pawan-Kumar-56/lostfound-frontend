package nitkkr.Backend.controller;

import nitkkr.Backend.dto.ReviewRequest;
import nitkkr.Backend.dto.ReviewResponse;
import nitkkr.Backend.entity.User;
import nitkkr.Backend.service.ReviewService;
import nitkkr.Backend.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

import jakarta.validation.Valid;

@RestController
@RequestMapping("/api/reviews")
@CrossOrigin(origins = "http://localhost:3000")
public class ReviewController {
    
    @Autowired
    private ReviewService reviewService;
    
    @Autowired
    private UserService userService;
    
    @PostMapping
    public ResponseEntity<ReviewResponse> createReview(
            @Valid @RequestBody ReviewRequest request,
            @AuthenticationPrincipal UserDetails userDetails) {
        
        try {
            // Get current user
            User user = userService.findByEmail(userDetails.getUsername());
            
            // Create review
            ReviewResponse response = reviewService.createReview(request, user);
            
            return ResponseEntity.ok(response);
            
        } catch (Exception e) {
            return ResponseEntity.badRequest().build();
        }
    }
    
    @GetMapping
    public ResponseEntity<Page<ReviewResponse>> getAllReviews(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size) {
        
        Pageable pageable = PageRequest.of(page, size);
        Page<ReviewResponse> reviews = reviewService.getAllReviews(pageable);
        
        return ResponseEntity.ok(reviews);
    }
    
    @GetMapping("/user")
    public ResponseEntity<Page<ReviewResponse>> getUserReviews(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size,
            @AuthenticationPrincipal UserDetails userDetails) {
        
        try {
            User user = userService.findByEmail(userDetails.getUsername());
            Pageable pageable = PageRequest.of(page, size);
            Page<ReviewResponse> reviews = reviewService.getReviewsByUser(user.getId(), pageable);
            
            return ResponseEntity.ok(reviews);
            
        } catch (Exception e) {
            return ResponseEntity.badRequest().build();
        }
    }
    
    @GetMapping("/stats")
    public ResponseEntity<?> getReviewStats() {
        return ResponseEntity.ok(java.util.Map.of(
            "averageRating", reviewService.getAverageRating(),
            "totalReviews", reviewService.getTotalReviews()
        ));
    }
}
