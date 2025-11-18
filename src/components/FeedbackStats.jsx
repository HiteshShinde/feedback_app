import { useContext } from "react";
import FeedbackContext from "../context/FeedbackContext";

const FeedbackStats = () => {
  const { feedback } = useContext(FeedbackContext);

  //   Calculate average ratings
  const totalRatings = feedback.reduce((sum, item) => sum + item.rating, 0);
  const averageRating = totalRatings / feedback.length;

  // Round the average rating to two decimal places
  const avg = averageRating.toFixed(1).replace(/[.,]0$/, "");

  return (
    <div className="feedback-stats">
      <h3>{feedback.length} Reviews</h3>
      <h3>Average Rating: {isNaN(avg) ? 0 : avg}</h3>
    </div>
  );
};

export default FeedbackStats;
