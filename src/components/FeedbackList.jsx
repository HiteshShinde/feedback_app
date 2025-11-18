import { useContext } from "react";
import FeedbackItem from "./FeedbackItem";
import FeedbackContext from "../context/FeedbackContext";
import Spinner from "./Spinner";

const FeedbackList = () => {
  const { feedback, loading } = useContext(FeedbackContext);

  if (loading) return <Spinner />;

  if (!loading && (!feedback || feedback.length === 0))
    return <p>No Feedback found!</p>;

  return (
    <div className="feedback-list">
      {feedback.map((item) => (
        <FeedbackItem key={item.id} item={item} animate={true} />
      ))}
    </div>
  );
};

export default FeedbackList;
