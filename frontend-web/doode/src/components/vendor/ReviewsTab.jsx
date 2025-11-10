import React from 'react';
import { Star } from 'lucide-react';

const ReviewsTab = ({ vendor }) => {
  return (
    <div className="bg-white rounded-lg shadow-sm p-6">
      <h2 className="text-2xl font-bold text-gray-900 mb-6">
        Customer Reviews
      </h2>
      
      <RatingSummary vendor={vendor} />
      <ReviewsList vendor={vendor} />
    </div>
  );
};

const RatingSummary = ({ vendor }) => (
  <div className="bg-gray-50 rounded-lg p-6 mb-8">
    <div className="flex items-center justify-between">
      <AverageRating 
        rating={vendor.averageRating} 
        totalRatings={vendor.totalRatings} 
      />
      <RatingDistribution vendor={vendor} />
    </div>
  </div>
);

const AverageRating = ({ rating, totalRatings }) => (
  <div className="text-center">
    <div className="text-4xl font-bold text-gray-900 mb-2">
      {(rating || 0).toFixed(1)}
    </div>
    <StarRating rating={rating || 0} size="h-5 w-5" />
    <div className="text-sm text-gray-600 mt-2">
      Based on {totalRatings || 0} reviews
    </div>
  </div>
);

const StarRating = ({ rating, size = "h-4 w-4" }) => (
  <div className="flex items-center justify-center space-x-1 mb-2">
    {[1, 2, 3, 4, 5].map((star) => (
      <Star
        key={star}
        className={`${size} ${
          star <= Math.floor(rating)
            ? 'text-yellow-400 fill-current'
            : 'text-gray-300'
        }`}
      />
    ))}
  </div>
);

const RatingDistribution = ({ vendor }) => (
  <div className="flex-1 max-w-xs">
    {[5, 4, 3, 2, 1].map((rating) => (
      <RatingBar 
        key={rating}
        rating={rating}
        percentage={vendor.ratingDistribution?.[rating] || 0}
      />
    ))}
  </div>
);

const RatingBar = ({ rating, percentage }) => (
  <div className="flex items-center space-x-2 mb-2">
    <span className="text-sm text-gray-600 w-4">{rating}</span>
    <Star className="h-4 w-4 text-yellow-400 fill-current" />
    <div className="flex-1 bg-gray-200 rounded-full h-2">
      <div 
        className="bg-yellow-400 h-2 rounded-full"
        style={{ width: `${percentage * 100}%` }}
      ></div>
    </div>
  </div>
);

const ReviewsList = ({ vendor }) => {
  const reviews = vendor.reviews || {};
  
  if (Object.keys(reviews).length === 0) {
    return <EmptyReviewsState />;
  }

  return (
    <div className="space-y-6">
      {Object.entries(reviews).map(([userId, review]) => (
        <ReviewItem 
          key={userId} 
          userId={userId} 
          review={review} 
        />
      ))}
    </div>
  );
};

const ReviewItem = ({ userId, review }) => (
  <div className="border-b border-gray-200 pb-6 last:border-b-0">
    <div className="flex items-start justify-between mb-3">
      <div>
        <h4 className="font-semibold text-gray-900">Anonymous Customer</h4>
        <StarRating rating={4} size="h-4 w-4" />
      </div>
      <span className="text-sm text-gray-500">2 weeks ago</span>
    </div>
    <p className="text-gray-600">{review}</p>
  </div>
);

const EmptyReviewsState = () => (
  <div className="text-center py-12">
    <Star className="h-12 w-12 text-gray-400 mx-auto mb-4" />
    <h3 className="text-lg font-medium text-gray-900 mb-2">No reviews yet</h3>
    <p className="text-gray-500">Be the first to review this vendor</p>
  </div>
);

export default ReviewsTab;