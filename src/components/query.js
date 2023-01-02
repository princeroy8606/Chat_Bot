import "./chatBot.scss";

const Query = ({ data }) => {
 return(
    <div className="box" key={data}>
    <p>{data}</p>
  </div>
 )
};

export default Query;
