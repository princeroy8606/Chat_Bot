import "./chatBot.scss";
import ListItemText from "@mui/material/ListItemText";


const Chat = ({ data, query }) => {
  console.log(ans)
  return (
    <>
    <ListItemText primary={query}/>
    <ListItemText primary={data}/>
    {
      
    }
    {
      ans.length ===0 &&
      <ListItemText primary={ans.extract
      }/>
    }
    </>
  );
};

export default Chat;
