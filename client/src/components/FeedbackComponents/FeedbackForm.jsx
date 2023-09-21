import React, { useState } from "react";
import axios from "axios";

function FeedbackForm({ chatId, userId, chats, toggleVisibility }) {
  const [partnerSolution, setPartnerSolution] = useState("");
  const [pros, setPros] = useState("");
  const [cons, setCons] = useState("");
  const [suggestions, setSuggestions] = useState("");

  const handleSubmit = () => {
    axios
      .post("/api/messages", {
        chatId,
        userId,
        message: `PROS: ${pros} CONS: ${cons} SUGGESTIONS: ${suggestions}`,
      })
      .then(toggleVisibility());
  };
  return (
    <div className="modal">
      <div className="modal-content">
        <div className="close" />
        <div className="top">
          <h4>Code To Review</h4>
          <h4>Your Review</h4>
        </div>
        <div className="feedback">
          <div className="inner-feedback">Code Here</div>
          <div className="inner-feedback">
            <form>
              <label htmlFor="pros">Pros</label>
              <textarea
                id="pros"
                onChange={(e) => setPros(e.target.value)}
                required
              />
              <label htmlFor="cons">Cons</label>
              <textarea
                id="cons"
                onChange={(e) => setCons(e.target.value)}
                required
              />
              <label htmlFor="suggestions">Suggestions</label>
              <textarea
                id="suggestions"
                onChange={(e) => setSuggestions(e.target.value)}
                required
              />
            </form>
          </div>
        </div>
        <div className="bottom">
          <button
            type="button"
            className="form-submit"
            onClick={() => handleSubmit()}
          >
            SUBMIT
          </button>
        </div>
      </div>
    </div>
  );
}

export default FeedbackForm;
