import "./App.scss";
import ChatBot from "./components/ChatBot";
import backgrdimg from "./assets/backgrd.png";
const App = () => {
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
      </div>
      <ChatBot/>
    </div>
  );
};

export default App;
