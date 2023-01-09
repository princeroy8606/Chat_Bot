import "./App.scss";
import ChatBot from "./components/ChatBot";
import backgrdimg from "./assets/backgrd.png";
import { useState } from "react";
const App = () => {
  const [open, setOpen] = useState(false);
  const [text, setText] = useState(true);

  const handleClick = ()=>{
    setOpen(!open)
    setText(!text)
  }

  return (
    <div className="App-container">
      <div className="image-container">
        <img src={backgrdimg} alt="background" />
      </div>
      <div className="text-container">
        {
          text ? (
            <div className={`text ${text === true ? "active":"inactive"}`}>
          <div>
          <h1>
            Hey , theree...
            Having doubts about programin.?
            No worrys Iam here to help you..
          </h1>
          </div>
        </div>
          ):(
            <></>
          )
        }
        <div
          className="bot-link"
          onClick={handleClick} 
        ></div>
      </div>
      {open ? (
        <div className={`bot-cover ${open === true ? "active" : "inactive"} `}>
          <ChatBot/>
        </div>
      ) : (
        <></>
      )}
    </div>
  );
};
export default App;
