import { createContext, useState, useEffect } from "react";

const FeedbackContext = createContext();

export const FeedbackProvider = ({ children }) => {
  const [loading, setLoading] = useState(true);
  const [feedback, setFeedback] = useState([]);
  const [feedbackEdit, setFeedbackEdit] = useState({
    item: {},
    edit: false,
  });

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await fetch("/feedback?_sort=id&_order=desc");
      const data = await response.json();
      setFeedback(data);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const addFeedback = async (newFeedback) => {
    const response = await fetch("/feedback", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newFeedback),
    });

    const data = await response.json();
    setFeedback([...feedback, data]);
  };

  const deleteFeedback = async (id) => {
    const sure = window.confirm(
      "Are you sure you want to delete this feedback?"
    );

    if (sure) {
      const response = await fetch(`http://localhost:5001/feedback/${id}`, {
        method: "DELETE",
      });

      if (response.ok) {
        setFeedback(feedback.filter((item) => item.id !== id));
      }
    }
  };

  const editFeedback = (item) => {
    setFeedbackEdit({ item, edit: true });
  };

  const updateFeedback = async (id, newItem) => {
    const response = await fetch(`/feedback/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newItem),
    });

    const data = await response.json();
    if (response.status === 200) {
      const updatedFeedback = [...feedback];
      const index = updatedFeedback.findIndex((item) => item.id === id);
      updatedFeedback[index] = data;
      setFeedback(updatedFeedback);
      setFeedbackEdit({ item: {}, edit: false });
    } else {
      console.error("Error updating feedback:", response.statusText);
    }
  };

  return (
    <FeedbackContext.Provider
      value={{
        feedback,
        feedbackEdit,
        loading,
        deleteFeedback,
        addFeedback,
        editFeedback,
        updateFeedback,
      }}
    >
      {children}
    </FeedbackContext.Provider>
  );
};

export default FeedbackContext;
