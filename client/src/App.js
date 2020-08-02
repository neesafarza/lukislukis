import React, { useEffect, useState } from "react";
import { CookiesProvider, useCookies } from "react-cookie";
import "./App.css";
import Canvas from "./components/Canvas/Canvas";
import Login from "./components/login/login";
import { Socket } from "socket.io-client";
import io from 'socket.io-client';
import UserList from "./components/UserList/UserList";

const socket = io('http://localhost:4000');

function App() {
  const [name, setName] = useState("");
  const [cookies, setCookie, removeCookie] = useCookies(["name"]);

  useEffect(() => {
    if(cookies.name) {
     setName(cookies.name);
    }
  }, [cookies]);

  useEffect(() => {
    if (name || name !== "") {
      setCookie('name', name)
      socket.emit('enter', name);
    } else {
      socket.emit('leave');
      removeCookie('name');
    }
  }, [name]);

  if (!name === "") {
    return <div className="App"></div>;
  }
  return (
    <CookiesProvider>
      <div className="App">
        {name || name !== "" ? (
          <div>
          <Canvas socket={socket} name={name} setName={setName}/>
          <UserList socket={socket}/>
          </div>
        ) : (
          <Login name={name} setName={setName} />
        )}
      </div>
    </CookiesProvider>
  );
}

export default App;
