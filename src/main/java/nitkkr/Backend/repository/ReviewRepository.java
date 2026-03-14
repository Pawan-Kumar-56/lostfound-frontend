package nitkkr.Backend.repository;

import nitkkr.Backend.entity.Review;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ReviewRepository extends JpaRepository<Review, Long> {
    
    // Find reviews by user
    Page<Review> findByUserId(Long userId, Pageable pageable);
    
    // Find all reviews with pagination
    Page<Review> findAllByOrderByCreatedAtDesc(Pageable pageable);
    
    // Find reviews by rating
    Page<Review> findByRatingOrderByCreatedAtDesc(Integer rating, Pageable pageable);
    
    // Count reviews by user
    int countByUserId(Long userId);
    
    // Get average rating
    @Query("SELECT AVG(r.rating) FROM Review r")
    Double getAverageRating();
    
    // Count total reviews
    @Query("SELECT COUNT(r) FROM Review r")
    Long getTotalReviews();
    
    // Find reviews by department
    @Query("SELECT r FROM Review r WHERE r.department = :department ORDER BY r.createdAt DESC")
    List<Review> findByDepartment(@Param("department") String department);
}
