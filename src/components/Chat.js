import "./chatBot.scss";

const Chat = ({ data }) => {
  return (
    <div className="chat-bot">
      <h6>{data.extract}</h6>
    </div>
  );
};

export default Chat;
