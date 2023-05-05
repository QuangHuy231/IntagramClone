import React, { useContext, useEffect, useRef, useState } from "react";
import styled from "styled-components";
import Welcome from "../components/Welcome";
import ChatContainer from "../components/ChatContainer";
import Contacts from "../components/Contacts";
import axios from "axios";
import { UserContext } from "../context/userContext";
import { io } from "socket.io-client";

const Messages = () => {
  const { user } = useContext(UserContext);
  const [currentChat, setCurrentChat] = useState(undefined);
  const [contacts, setContacts] = useState([]);
  const socket = useRef();
  useEffect(() => {
    if (user) {
      socket.current = io("http://localhost:5000");
      socket.current.emit("add-user", user.user_id);
    }
  }, [user]);

  useEffect(() => {
    axios.get(`/user/getfriends`).then((res) => {
      setContacts(res.data);
    });
  }, [user.user_id]);
  const handleChatChange = (chat) => {
    setCurrentChat(chat);
  };
  return (
    <Container>
      <div className="container">
        <Contacts contacts={contacts} changeChat={handleChatChange} />
        {currentChat === undefined ? (
          <Welcome />
        ) : (
          <ChatContainer currentChat={currentChat} socket={socket} />
        )}
      </div>
    </Container>
  );
};

const Container = styled.div`
  height: 100vh;
  width: 100vw;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 1rem;
  align-items: center;
  background-color: #131324;
  .container {
    height: 85vh;
    width: 85vw;
    background-color: #00000076;
    display: grid;
    grid-template-columns: 25% 75%;
    @media screen and (min-width: 720px) and (max-width: 1080px) {
      grid-template-columns: 35% 65%;
    }
  }
`;

export default Messages;
