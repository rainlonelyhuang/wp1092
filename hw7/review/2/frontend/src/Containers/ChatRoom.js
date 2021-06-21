import "../App.css";
import { useState, useEffect } from "react";
import { Tabs, Input, Tag } from "antd";
import ChatModal   from "../Components/ChatModal.js"
import useChatBox from "../hooks/useChatBox.js";
import useChat from "../hooks/useChat.js";


const { TabPane } = Tabs;
const ChatRoom = ({me, displayStatus, server}) => {

  const [messageInput, setMessageInput] = useState("");
  const [modalVisible, setModalVisible] = useState(false);
  const [activeKey, setActiveKey] = useState("");
  const [activeFriend, setActiveFriend] = useState("");

  const { chatBoxes, createChatBox, removeChatBox } =  useChatBox();

   
  
  const { status, messages, sendMessage, startChat } = useChat(server);

  const [username, setUsername] = useState('');
  const [body, setBody] = useState('')

  const addChatBox = () => {setModalVisible(true)};

  function isOpen(server) { console.log(server.readyState === server.OPEN);
    return server.readyState === server.OPEN }

  const handleChange = (key) => {
    setActiveKey(key);
    // Find friend's name from key ....
    const words = key.split('_');
    if(words[0] === me) setActiveFriend(words[1]);
    else setActiveFriend(words[0]);

    //startChat(me, activeFriend);
  }
  isOpen(server);

   useEffect( ()=>{
    if(activeFriend !== "") startChat(me, activeFriend);
   }, [activeFriend])
  // useEffect( () => {
  //   const server = new WebSocket('ws://localhost:8080');
  //   server.onopen = () => console.log('Server connected.');}, []);
  return (
    <>
      <div className="App-title">
        <h1>{me}'s Chat Room</h1> 
      </div>
      <div className="App-messages">
        <Tabs 
          type="editable-card"
          activeKey={activeKey}
          onChange={handleChange}
          onEdit={(targetKey, action) => {
              if( action == "add") addChatBox();
              else if( action == "remove") {
                let newKey = removeChatBox(targetKey, activeKey) 
                handleChange(newKey);
              }
          }}
        >
          {chatBoxes.map(({ friend, key, chatLog }) =>{
            return (
              <TabPane tab={friend} key={key} closable={true}>
                <p> {friend}'s chatbox.</p>
              </TabPane>
            );
          })}
        </Tabs>
        
        
        {
        messages.length === 0 ? (<p style={{ color: '#ccc'}}> No messages ... </p>) :
          (messages.map(({ name, body}, i) => (name === me) ? 
            <p className="App-message App-message-me" key={i}> 
              {body} <Tag color="#2db7f5">{name}</Tag>                
            </p>    :  
            <p className="App-message" key={i}> 
              <Tag color="blue">{name}</Tag> {body} 
            </p>    

          
        ))}
    

      </div>
      <ChatModal
        visible={modalVisible}
        onCreate={({ name }) => {
          setActiveFriend(name);
          //startChat(me, activeFriend);
          setActiveKey(createChatBox(name, me));
          setModalVisible(false);
        }}
        onCancel={() => {
          setModalVisible(false);
        }}
      />
      <Input.Search
        value={messageInput}
        onChange={(e) => setMessageInput(e.target.value)}
        placeholder="Enter message here...."
        enterButton="Send"
        size="large"
        onSearch={(msg) => { 
          if(!msg){
            displayStatus({
              type: "error",
              msg: "Please enter message.",
            });
            return;
          } else if(activeKey === ""){
            displayStatus({
              type: "error",
              msg: "Please add a chatbox first.",
            });
            setMessageInput("");
            return;
          }
          sendMessage({ key: activeKey, me: me, friend: activeFriend, body: msg });
          setMessageInput(""); 
        }}
      ></Input.Search>
    </>
  );
};

export default ChatRoom;