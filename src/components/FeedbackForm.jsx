import { useState, useContext, useEffect } from "react";
import Card from "./Card";
import Button from "./Button";
import RatingSelect from "./RatingSelect";
import FeedbackContext from "../context/FeedbackContext";

const FeedbackForm = () => {
  const { addFeedback, feedbackEdit, updateFeedback } =
    useContext(FeedbackContext);
  const [text, setText] = useState("");
  const [rating, setRating] = useState(10);
  const [btnDisabled, setBtnDisabled] = useState(true);
  const [msg, setMsg] = useState(null);
  const [msgColor, setMsgColor] = useState("red");

  useEffect(() => {
    if (feedbackEdit.edit) {
      setText(feedbackEdit.item.text);
      setRating(feedbackEdit.item.rating);
      setBtnDisabled(false);
    } else {
      setText("");
      setRating(10);
      setBtnDisabled(true);
    }

    return () => {
      setText("");
      setRating(10);
      setBtnDisabled(true);
      setMsg(null);
    };
  }, [feedbackEdit]);

  const handleTextChange = (e) => {
    const newText = e.target.value;

    if (newText.trim() === "") {
      setBtnDisabled(true);
      setMsg(null);
    } else if (newText !== "" && newText.trim().length < 10) {
      setBtnDisabled(true);
      setMsg("Please enter a minimum of 10 characters");
      setMsgColor("red");
    } else {
      setBtnDisabled(false);
      setMsg(null);
    }

    setText(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const newFeedback = {
      id: feedbackEdit.item.id
        ? feedbackEdit.item.id
        : JSON.stringify(Date.now()),
      rating: rating,
      text: text,
    };

    if (feedbackEdit.edit) {
      updateFeedback(newFeedback.id, newFeedback);
      setMsg("Feedback updated successfully!");
      setMsgColor("purple");
    } else {
      addFeedback(newFeedback);
      setText("");
      setRating(10);
      setMsg("Feedback submitted successfully!");
      setMsgColor("green");
    }

    setTimeout(() => {
      setMsg(null);
    }, 1500);
  };

  return (
    <Card>
      <form onSubmit={handleSubmit}>
        <h2>How would you rate your service with us?</h2>
        <RatingSelect select={setRating} selected={rating} />
        <div className="input-group">
          <input
            type="text"
            placeholder="Write a review"
            onInput={handleTextChange}
            value={text}
          />
          <Button type="submit" version={"primary"} isDisabled={btnDisabled}>
            Submit
          </Button>
        </div>

        {msg !== null && <p style={{ color: msgColor }}>{msg}</p>}
      </form>
    </Card>
  );
};

export default FeedbackForm;
