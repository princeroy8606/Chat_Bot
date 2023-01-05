import "./chatBot.scss";
import ListItemText from "@mui/material/ListItemText";


const Chat = ({query}) => {
  return (
    <>
      <ListItemText primary={query} />
    </>
  );
};

export default Chat;
