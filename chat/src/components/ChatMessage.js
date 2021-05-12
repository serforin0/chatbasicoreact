import React from 'react';
import "./ChatMessage.css"


function ChatMessage(props) {

    return (
    
        //{props.isReceiver ? 'chatMessage__message' 'chatMessage_receiver' : 'chatMessage__message'}
            <div className="chatMessage">
                <p className={
                    props.isSender 
                    ? "chatMessage__message chatMessage__receiver"
                    : "chatMessage__message"}>
                    <span className="chatMessage__name">
                        {props.name}
                    </span>
                    {props.message}
                    <span className="chatMessage__timestamp">{props.timestamp}</span>
                </p>
            </div>
    );      
    
}

export default ChatMessage;