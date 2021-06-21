import "../App.css";
import { useState } from "react";
import { Tabs, Input } from "antd";
import { useMutation } from "@apollo/client";
import { useQuery} from '@apollo/react-hooks'
//import sendMessage from '../hooks/useChat'
import ChatModal from "../Components/ChatModal";
import useChatBox from "../hooks/useChatBox";
import ChatBox from "../Components/ChatBox";

import {CREATE_CHATBOX_MUTATION} from '../graphql'
import {CREATE_MESSAGE_MUTATION} from '../graphql'


const { TabPane } = Tabs;


const ChatRoom = ({ me,displayStatus }) => {
  // const { loading, error, data, subscribeToMore } = 
  //                                            useQuery(QUERY,{
  //                                               variables:  {name:"Mary_Z"} ,
  //                                             });
  // console.log(data)
  const [startChat] = 
       useMutation(CREATE_CHATBOX_MUTATION);
  const [sendMessage] = 
       useMutation(CREATE_MESSAGE_MUTATION);
  const [messageInput, setMessageInput] = useState("");
  const [modalVisible, setModalVisible] = useState(false);
  const [activeKey, setActiveKey] = useState("");
  const { chatBoxes,createChatBox, removeChatBox } = useChatBox(me,activeKey);

  const addChatBox = () => {
    setModalVisible(true);
  };

  

  return (
    <>
      {" "}
      
      <div className="App-title">
        <h1>{me}'s Chat Room</h1>{" "}
      </div>
      <div className="App-messages">
      
        <Tabs
          type="editable-card"
          onEdit={(targetKey, action) => {
            if (action === "add") addChatBox();
            else if (action === "remove") setActiveKey(removeChatBox(targetKey));
          }}
          activeKey={activeKey}
          onChange={(key) => {
            setActiveKey(key);
          }}
        >
          
          {chatBoxes.map(({ friend, key, chatLog }) => {
            return (
              
              <TabPane tab={friend} key={key} closable={true}>
                <p>{friend}'s chatbox.</p>
                  <ChatBox chatname = {key} me={me} />
              </TabPane>
              
            );
          })}
          
        </Tabs>
        
        <ChatModal
          visible={modalVisible}
          onCreate={async ({ name }) => {
            await startChat({
              variables: { 
                name1:me,
                name2:name
               },
            });
            setActiveKey(createChatBox(name))
            
            setModalVisible(false);
          }}
          onCancel={() => {
            setModalVisible(false);
          }}
        />
      </div>
      <Input.Search
        value={messageInput}
        onChange={(e) => setMessageInput(e.target.value)}
        enterButton="Send"
        placeholder="Enter message here..."
        onSearch={(msg) => {
          if (!msg) {
            displayStatus({
              type: "error",
              msg: "Please enter message.",
            });
            return;
          } else if (activeKey === "") {
            displayStatus({
              type: "error",
              msg: "Please add a chatbox first.",
            });
            setMessageInput("");
            return;
          }
          
          sendMessage({ variables: { 
            name1:me,
            name2:activeKey.replace("_","").replace(me,""),
            body:msg
           } });
          //sendMessage({ key: activeKey, body: msg });
          setMessageInput("");
        }}

      ></Input.Search>
    </>
  );
};
export default ChatRoom;
