import "./chatBot.scss";

const Chat = ({ data }) => {

  return (
    <div className="chat-bot chat" key={data.index}>
      <h6>{data}</h6>
    </div>
  );
};

export default Chat;
