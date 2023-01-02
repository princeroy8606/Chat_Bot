import React, { useState, useEffect } from "react";
import axios from "axios";
import "./chatBot.scss";
import sendIcon from "../assets/send-chat.png";
import Chat from "./Chat";

const ChatBot = () => {
  const [input, setInput] = useState(" ");
  const [query, setQuery] = useState("");
  const [question, setQuestion] = useState([]);
  const [answer, setAnswer] = useState([]);
  const [store, setStore] = useState([]);
  const [datas, setDatas] = useState([]);

  //API...
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

  //Submitting query
  const handleClick = (e) => {
    e.preventDefault();
    setQuery(input);
  };

  //fetching Data...
  useEffect(() => {
    const handleSubmit = async () => {
      if (query) {
        setQuestion((qry) => [...qry, query]);
        setInput("");
      }
      if (query !== undefined) {
        params.gsrsearch = query;
        try {
          const { data } = await axios.get(endPoint, { params });
          // gatherdata(data.query.pages);
          setStore(data.query.pages);
          console.log(data.query.pages);
          if (data.error) throw new Error(data.error.info);
        } catch (error) {
          console.log(error);
        }
      } else {
        console.log("not submitted");
      }
    };
    handleSubmit();
  }, [query]);

  useEffect(() => {
    const gatherdata = (store) => {
      setAnswer(Object.values(store));
    };
    gatherdata(store);
  }, [store]);

  return (
    <div className="bot-container">
      <div className="message-container">
        <div className="qstin-box">
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
        <form onSubmit={handleClick}>
          <label>
            <input
              value={input}
              name="question"
              placeholder="Ask your douts"
              onChange={(e) => setInput(e.target.value)}
            />
          </label>
        </form>
        <button className="image" onClick={handleClick}>
          <img src={sendIcon} alt="Send" />
        </button>
      </div>
    </div>
  );
};

export default ChatBot;
