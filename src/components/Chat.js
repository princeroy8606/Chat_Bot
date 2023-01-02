import "./chatBot.scss";

const Chat = ({ data }) => {
  return (
    <ul className="chat-bot chat" key={data.index}>
      <li>{data}</li>
    </ul>
  );
};

export default Chat;
