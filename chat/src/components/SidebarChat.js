import React, {useState, useEffect}  from "react";
import { Avatar } from "@material-ui/core";
import  "./SidebarChat.css";
import db from "../firebase";
import { Link } from "react-router-dom";

function SidebarChat(props) {

    const [messages, SetMessages] = useState("");

    const unsubscribe = useEffect(() => {
        if(props.roomId)
           db.collection("rooms")
           .doc(props.roomId)
           .collection("messages")
           .orderBy("timestamp", "asc")
           .onSnapshot((ss) => SetMessages(ss.docs.map((doc) => doc.data())));

     return () => {
            unsubscribe();
        };
    }, [props.roomId]);


    function createChat(){
        const roomName = prompt("introducas el  nomvre del nuevo chat");
        if(!roomName) return;
        db.collection("rooms").add({
            name: roomName,
        });
    }
    
    return !props.newChat ? (
        <Link to={`/rooms/${props.roomId}`}>
            <div className="sidebarChat">
                <Avatar src={`https://avatars.dicebear.com/api/gridy/${props.roomId}.svg`} />
                <div className="sidebarChat__info">
                    <h2>{props.room}</h2>
                    <p>{messages && messages[messages.length - 1]?.
                       message}</p>                
                </div>
            </div>
        </Link>
    ) : (
        <div className="sidebarChat"
         onClick={createChat}>
            <h2>add new chat</h2>
        </div>
    )
}


export default SidebarChat;