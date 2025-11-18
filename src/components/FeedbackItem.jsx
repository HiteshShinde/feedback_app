import { useContext } from "react";
import Card from "./Card";
import FeedbackContext from "../context/FeedbackContext";
import { FaTimes, FaEdit } from "react-icons/fa";

const FeedbackItem = ({ item, animate }) => {
  const { deleteFeedback, editFeedback } = useContext(FeedbackContext);

  return (
    <Card reverse={false} animate={animate}>
      <div className="num-display">{item.rating}</div>
      <div className="text-display">{item.text}</div>
      <button className="close" onClick={() => deleteFeedback(item.id)}>
        <FaTimes color="red" />
      </button>
      <button className="edit" onClick={() => editFeedback(item)}>
        <FaEdit color="purple" />
      </button>
    </Card>
  );
};

export default FeedbackItem;
