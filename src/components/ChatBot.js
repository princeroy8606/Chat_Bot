import React, { useState } from "react";
import axios from "axios";
import "./chatBot.scss";
import sendIcon from "../assets/send-chat.png";
import Chat from "./Chat";
function ChatBot() {
  const [query, setQuery] = useState("");
  const [question, setQuestion] = useState([]);
  const [answer, setAnswer] = useState([]);
  // const [store, setStore] = useState([]);
  // const [datas, setDatas] = useState([]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (query) {
      setQuestion((qry) => [...qry, query]);
      setQuery("");
    }
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
    // if (answer !== []) {
    //   setStore((ans) => [...ans, answer]);
    // }
  };
  // console.log(datas);

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
      <div className="message-container">
        <div className="qstin-box">
          {/* <h1>{console.log(datas)}</h1> */}

          {question?.map((qst) => (
            <div className="box">
              <h1>{qst}</h1>
            </div>
          ))}
        </div>

        {answer?.map((item) => (
          // <h1>{item.extract}</h1>
          <Chat data={item} />
        ))}
      </div>
      <div className="input-container">
        <form onSubmit={handleSubmit}>
          <label>
            <input
              value={query}
              name="question"
              placeholder="Ask your douts"
              onChange={(e) => setQuery(e.target.value)}
            />
          </label>
        </form>
        <button className="image" onClick={handleSubmit}>
          <img src={sendIcon} alt="Send" />
        </button>
      </div>
    </div>
  );
}

export default ChatBot;
