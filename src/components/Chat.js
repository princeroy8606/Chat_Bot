import './chatBot.scss'

const Chat = ({ data }) => {
console.log(data)

  return (
    <div className="chat-box">
        <h6>{data.extract} happy hallowen</h6>
    </div>
  );

};

export default Chat;
