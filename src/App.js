import "./App.scss";
import ChatBot from "./components/ChatBot";
import backgrdimg from "./assets/backgrd.png";
import { useState } from "react";
const App = () => {

  const [open,setOpen] = useState(false)
  console.log(open)
  return (
    <div className="App-container">
      <div className="image-container">
        <img src={backgrdimg} alt="background" />
      </div>
      <div className="text-container">
        <h1>
          Hey , theree...
          <br />
          Having doubts about programin.?
          <br />
          No worrys Iam here to help you..
        </h1>
        <div className="bot-link" onClick={()=>{setOpen(!open)}}>
        </div>
      </div>
      <div className={`bot-cover ${open === true ? 'active' : 'inactive'}`}>
        hallooo
      <ChatBot />
      </div>
      
    </div>
  );
};

export default App;
