import React, { useState, useEffect } from "react";
import axios from "axios";
import "./chatBot.scss";
import sendIcon from "../assets/send-chat.png";
import Chat from "./Chat";
import Query from "./query";

const ChatBot = () => {
  const [input, setInput] = useState("");
  const [query, setQuery] = useState("");
  const [datas, setDatas] = useState("");
  const [question, setQuestion] = useState([]);
  const [answer, setAnswer] = useState([]);
  const [store, setStore] = useState([]);
  const [final, setFinal] = useState([]);

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

  //extracting text response
  useEffect(() => {
    const gatherdata = (store) => {
      setAnswer(Object.values(store));
      setDatas(answer.map((item) => item.extract));
    };
    gatherdata(store);
  }, [store]);

  //Storing extracted text
  useEffect(() => {
    setFinal((data) => [...data, datas]);
  }, [answer]);

  return (
    <div className="bot-container">
      <div className="message-container">
        {/* <div className="qstin-box"> */}
          {question?.map((qst) => (
            <Query data={qst} />
          ))}
        {/* </div> */}
        {final.length > 4 && final.slice(4).map((item) => <Chat data={item} />)}
        {answer.map((item) => (
          <div className="chat-bot" key={item.index}>
            <h6>{item.extract}</h6>
          </div>
        ))}
      </div>
      <div className="input-container">
        <form onSubmit={handleClick}>
          <label>
            <input
              value={input}
              name="question"
              placeholder=" Ask your douts"
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
