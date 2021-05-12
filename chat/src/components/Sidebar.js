import React, {useState, useEffect} from "react";
import "./Sidebar.css";
import { Avatar, IconButton } from "@material-ui/core";
import DonutLargeIcon from "@material-ui/icons/DonutLarge";
import ChatIcon from "@material-ui/icons/Chat";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import SearchOutlined from "@material-ui/icons/SearchOutlined";
import SidebarChat from "./SidebarChat";
import { Link } from "react-router-dom";
import db from "../firebase";

function Sidebar() {

    const [rooms, setRoooms] = useState([]);

    useEffect(() => {
        const listener = db.collection("rooms").onSnapshot(
            (ss) => {
                setRoooms(
                    ss.docs.map((doc) => ({
                        id: doc.id,
                        data: doc.data(),
                    }))
                );
        });
        return () => {
            listener();
        }
    }, []);
    return (
        <div className="sidebar">
            <div className="sidebar__header">
                <Avatar />
                <div className="sidebar__header__icons">
                <IconButton>
                    <DonutLargeIcon fontSize="small" />
                </IconButton>
                <IconButton>
                    <ChatIcon fontSize="small" />
                </IconButton>
                <IconButton>                
                    <MoreVertIcon fontSize="small" />
                </IconButton>
                </div>
            </div>
            <div className="sidebar__search">
            <div className="sidebar__search__container">
                <SearchOutlined />
                <input placeholder="Search or sstart new chart"
                type="text" />
            </div>
            </div>
            <div className="sidebar__chats">
                <SidebarChat newChat={true} />
                {
                    rooms.map((room) => (
                        <SidebarChat room={room.data.name}
                        message=" A message"
                        key={room.id} 
                        roomId={room.id} />
                    ))
                }
                
                

            </div>
        </div>
    )

}

export default Sidebar;