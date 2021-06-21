import { useState } from "react";

const server = new WebSocket('ws://localhost:8080');
server.onopen = () => console.log('Server connected.');

const sendData = (data) => { server.send(JSON.stringify(data)); }

const useChat = () => {
  const [ messages, setMessages ] = useState({}); // { type, msg }
  const [ key, setKey ] = useState('');

  server.onmessage = (m) => {
    const { type, data } = JSON.parse(m.data);
    switch (type) {
      case 'CHAT': {
        setMessages({key:key, messages: data.messages});
        //messages = data.messages;
        break;
      }
      case 'MESSAGE': {
        setMessages({key:key, messages:[...messages.messages, data.message]});
        //messages = [...messages, data.messages];
        break;
      }
      default:
        break;
    }
  };

  const sendMessage = (payload) => {
    const {key, body} = payload;
    setKey(key);
    sendData({
      type: 'MESSAGE',
      data: body
    });
  }; // { key, msg }

  const startChat = (payload) => {
    const key = payload.name <= payload.to ?
            `${payload.name}_${payload.to}` : `${payload.to}_${payload.name}`;
    setKey(key);
    sendData({
      type: 'CHAT',
      data: payload
    });
  };

  return { messages, startChat, sendMessage };
};

export default useChat;
