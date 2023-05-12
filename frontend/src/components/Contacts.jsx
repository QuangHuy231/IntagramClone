import React, { useState, useEffect, useContext } from "react";
import styled from "styled-components";
import logo from "../assets/instagramlogo.png";
import { UserContext } from "../context/userContext";
import { Link } from "react-router-dom";

export default function Contacts({ contacts, changeChat }) {
  const { user } = useContext(UserContext);
  const [currentSelected, setCurrentSelected] = useState(undefined);

  const changeCurrentChat = (index, contact) => {
    setCurrentSelected(index);
    changeChat(contact);
  };
  return (
    <>
      <Container>
        <Link to={`/`} className="brand">
          <img src={logo} alt="logo" />
        </Link>
        <div className="contacts">
          {contacts.map((contact, index) => {
            return (
              <div
                key={contact.user_id}
                className={`contact ${
                  index === currentSelected ? "selected" : ""
                }`}
                onClick={() => changeCurrentChat(index, contact)}
              >
                <div className="avatar relative">
                  <img src={contact.image_avt} alt="" />
                  {contact.status === "active" && (
                    <div className="absolute w-3 h-3 border-2 rounded-full bg-green-500 bottom-0 right-0"></div>
                  )}
                </div>
                <div className="username">
                  <h3>{contact.username}</h3>
                </div>
              </div>
            );
          })}
        </div>
        <div className="current-user">
          <div className="avatar relative">
            <img src={user.image_avt} alt="avatar" />
            {user.status === "active" && (
              <div className="absolute w-3 h-3 border-2 rounded-full bg-green-500 bottom-0 right-0"></div>
            )}
          </div>
          <div className="username">
            <h2>{user.username}</h2>
          </div>
        </div>
      </Container>
    </>
  );
}
const Container = styled.div`
  display: grid;
  grid-template-rows: 10% 75% 15%;
  overflow: hidden;
  background-color: #080420;
  .brand {
    display: flex;
    align-items: center;
    gap: 1rem;
    justify-content: center;
    img {
      height: 2rem;
    }
    h3 {
      color: white;
      text-transform: uppercase;
    }
  }
  .contacts {
    display: flex;
    flex-direction: column;
    align-items: center;
    overflow: auto;
    gap: 0.8rem;
    &::-webkit-scrollbar {
      width: 0.2rem;
      &-thumb {
        background-color: #ffffff39;
        width: 0.1rem;
        border-radius: 1rem;
      }
    }
    .contact {
      background-color: #ffffff34;
      min-height: 5rem;
      cursor: pointer;
      width: 90%;
      border-radius: 1rem;
      padding: 0.4rem;
      display: flex;
      gap: 1rem;
      align-items: center;
      transition: 0.5s ease-in-out;
      .avatar {
        img {
          height: 3rem;
          border-radius: 0.5rem;
        }
      }
      .username {
        h3 {
          color: white;
        }
      }
    }
    .selected {
      background-color: #9a86f3;
    }
  }

  .current-user {
    background-color: #0d0d30;
    border-radius: 1rem;
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 2rem;
    .avatar {
      img {
        height: 4rem;
        max-inline-size: 100%;
        border-radius: 0.5rem;
      }
    }
    .username {
      h2 {
        color: white;
      }
    }
    @media screen and (min-width: 720px) and (max-width: 1080px) {
      gap: 0.5rem;
      .username {
        h2 {
          font-size: 1rem;
        }
      }
    }
  }
`;
