import React, { useState } from "react";
import axios from "axios";
import './chatBot.scss'

function ChatBot() {
  const [query, setQuery] = useState();
  const [answer, setAnswer] = useState([]);

  const handleSubmit = async () => {
    if (query !== undefined) {
      params.gsrsearch = query;
      try {
        const { data } = await axios.get(endPoint, { params });
        gatherdata(data.query.pages);
        if (data.error) throw new Error(data.error.info);
      } catch (error) {
        console.log(error);
      }
    } else {
      console.log("not submitted");
    }
  };

  const gatherdata = (pages) => {
    setAnswer(Object.values(pages));
    console.log(answer);
  };

  const endPoint = "https://en.wikipedia.org/w/api.php?";
  const params = {
    origin: "*",
    format: "json",
    action: "query",
    prop: "extracts",
    exchars: 210,
    exintro: true,
    explaintext: true,
    generator: "search",
    gsrlimit: 1,
  };
  return (
    <div className="bot-container">
      ChatBot
      <form>
        <label htmlFor="query">
          <input
            type="text"
            id="query"
            onChange={(e) => setQuery(e.target.value)}
          />
          <button type="button" onClick={handleSubmit}>
            Submit
          </button>
        </label>
      </form>
      {answer.map((item) => (
        <h1>{item.extract}</h1>
      ))}
    </div>
  );
}

export default ChatBot;
