import { useEffect } from "react";
import "../styles/styles.css";

const Message=({message,setMessage})=>{

    useEffect(() => {
        setTimeout(() => {
          setMessage("")
        }, 3000);
      }, [message,setMessage]);
    return<h2>{message}</h2>
}
export default Message;
