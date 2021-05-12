import React, {useState, useEffect} from 'react';
import { Avatar, IconButton } from '@material-ui/core';
import SearchOutlined from '@material-ui/icons/SearchOutlined';
import AttachFileIcon from '@material-ui/icons/AttachFile';
import "./Chat.css";

import MoreVertIcon from '@material-ui/icons/MoreVert';
import InsertEmoticonIncon from '@material-ui/icons/InsertEmoticon';
import MicIcon from '@material-ui/icons/Mic';

import ChatMessage from "./ChatMessage.js";
import { useParams } from "react-router-dom";
import db  from "../firebase";
import { useStateValue } from "./StateProvider";
import firebase from "firebase";



function Chat(props) {


    const [input, setInput] =  useState("");
    const [roomName, setRoomName] = useState("");
    const {roomId} = useParams();
    const [messages, setMessages] = useState([]);
    const [{ user }, dispatch] = useStateValue();


    

    useEffect(() => {
        if (roomId) {
            db.collection("rooms")
            .doc(roomId)
            .onSnapshot((ss) => setRoomName(ss.data().name));

            db.collection("rooms")
              .doc(roomId)
              .collection("message")
              .orderBy("timestamp", "asc")
              .onSnapshot((ss) => setMessages(ss.docs.map((doc) => doc.data())));
            
        }
    }, roomName);

    function sendMessage(e) {
        e.preventDefault();
        db.collection("rooms").doc(roomId).collection("messages")
        .add({
            message: input,
            name: user.displayName,
            timestamp: firebase.firestore.FieldValue.serverTimestamp(),
        });
        setInput("");
    }

    const handdleOnChange = (e) => {
        setInput(e.target.value);
    };

    return(

        <div className="chat">
            <div className="chat__header">
                <Avatar src={`https://avatars.dicebear.com/api/gridy/${roomId}.svg`} />
                <div className="chat__headerInfo">
                    <h3>{roomName}</h3>
                    <p>
                        {
                            "Last seen"+
                             new Date(
                                 messages[messages.lengtt - 1]?.timestamp?.toDate()
                             ).toUTCString()
                        }
                    </p>
                </div>
                <div className="chat__headerButtons">
                    <IconButton>
                        <SearchOutlined />
                    </IconButton>
                    <IconButton>
                        <AttachFileIcon/>
                    </IconButton>
                    <IconButton>
                        <MoreVertIcon/>
                    </IconButton>
                </div>
            </div>
            <div className="chat__body">
                {messages.map((message) => (
                    <ChatMessage 
                        name={message.name} 
                        message={message.message} 
                        timestamp={new Date(message.timestamp?.toDate()).toUTCString()}
                        isSender={message.name == user?.displayName}                   
                    />                    
                    
                ))}
            </div>
            <div className="chat__footer">
                <IconButton>
                    <InsertEmoticonIncon />
                </IconButton>
                <form>
                    <input value={input}
                           onChange={handdleOnChange} 
                           type="text" 
                           placeholder=" Type a message" 
                    />
                    <button type="submit" onClick={sendMessage}>Send message</button>
                </form>
                <IconButton>
                    <MicIcon />
                </IconButton>

            </div>
        </div>
    );}

export default Chat;