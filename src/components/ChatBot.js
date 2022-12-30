import React, { useState, useEffect } from "react";
import axios from "axios";
import "./chatBot.scss";
import sendIcon from "../assets/send-chat.png";
import Chat from "./Chat";
function ChatBot() {
  const [query, setQuery] = useState();
  const [answer, setAnswer] = useState([]);
  const [data, setData] = useState([]);
  const [question, setQuestion] = useState([]);

  useEffect(() => {
    localStorage.setItem("dataKey", JSON.stringify(data));
    console.log(data);
  }, [data]);

  const handleSubmit = async () => {
    setQuestion(query);
    if (query !== undefined) {
      params.gsrsearch = query;
      try {
        const { data } = await axios.get(endPoint, { params });
        setAnswer(data.query.pages);
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
    setData(Object.values(pages));
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
      <div className="message-container">
        <div className="ans-box">
        {answer.map((item) => (
          <Chat data={item} />
        ))}
        </div>
        {/* {
          data.map((item)=>(
            <div>{item.extract}</div>
          ))
        } */}
       <div className="qstin-box">
       {

       }
       </div>
      </div>
      <div className="input-container">
        <form>
          <label>
            <input type="text" onChange={(e) => setQuery(e.target.value)} />
          </label>
        </form>
        <div className="image">
          <img src={sendIcon} alt="Send" onClick={handleSubmit} />
        </div>
      </div>
    </div>
  );
}

export default ChatBot;
