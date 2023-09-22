import React, { useState, useEffect } from "react";
import axios from "axios";
import SyntaxHighlighter from "react-syntax-highlighter";
import { docco } from "react-syntax-highlighter/dist/esm/styles/hljs";

function FeedbackForm({ chatId, userId, toggleVisibility, problemId }) {
  const [partnerSolution, setPartnerSolution] = useState("");
  const [partnerId, setPartnerId] = useState(2);
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
  useEffect(() => {
    axios
      .get("/api/chat/partner", {
        params: {
          chatId,
        },
      })
      .then((results) => {
        if (results.data[0].solver_id === userId) {
          setPartnerId(results.data[0].reviewer_id);
        } else {
          setPartnerId(results.data[0].solver_id);
        }
      });
  }, [chatId]);

  useEffect(() => {
    axios
      .get("/api/submissions/partner", {
        params: {
          partnerId,
          problemId,
        },
      })
      .then((results) => setPartnerSolution(results.data[0].code));
  }, [partnerId]);

  return (
    <div className="modal">
      <div className="modal-content">
        <div className="close" />
        <div className="top">
          <h3>Code To Review</h3>
          <h3>Your Review</h3>
        </div>
        <div className="feedback">
          <div className="inner-feedback">
            <SyntaxHighlighter language="javascript" style={docco}>
              {partnerSolution}
            </SyntaxHighlighter>
          </div>
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
