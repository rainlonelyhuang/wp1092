import "../App.css";
import ChatModal from "../Components/ChatModal";
import useChatBox from "../hooks/useChatBox";
// import useChat from "../hooks/useChat";
import { ChatBox } from "../Components/ChatBox";
import { useState } from "react";
import { Tabs, Input } from "antd";
import { useQuery, useMutation } from '@apollo/react-hooks';

import {
  CHATBOX_QUERY,
  CREATE_CHATBOX_MUTATION, CREATE_MESSAGE_MUTATION,
  CHATBOX_SUBSCRIPTION,
} from '../graphql';

const { TabPane } = Tabs;
const ChatRoom = ({ me, displayStatus }) => {
  // const [chatBoxes, setChatBoxes] = useState([
  //   { friend: "Mary", key: "MaryChatbox", 
  //     chatLog: [] },
  //   { friend: "Peter", key: "PeterChatBox", 
  //     chatLog: [] }
  // ]);
  const [messageInput, setMessageInput] = useState("");
  const [activeKey, setActiveKey] = useState("");
  const { chatBoxes, createChatBox, removeChatBox } = useChatBox();
  // const { sendMessage } = useChat();
  const [modalVisible, setModalVisible] = useState(false);


  const addChatBox = () => { setModalVisible(true); };

  const [startChat] = useMutation(CREATE_CHATBOX_MUTATION);
  const [sendMessage] = useMutation(CREATE_MESSAGE_MUTATION);


  return (
    <> <div className="App-title">
         <h1>{me}'s Chat Room</h1> </div>
      <div className="App-messages">
        <Tabs 
          type="editable-card"
          onEdit={(targetKey, action) => {
              if (action === "add") addChatBox();
              else if (action === "remove") setActiveKey(removeChatBox(targetKey, activeKey));
          }}
          activeKey={activeKey}
          onChange={(key) => { setActiveKey(key); }}
        >
          {chatBoxes.map((
            { friend, key}) => {
           return (
              <TabPane tab={friend} 
                key={key} closable={true}>
                <ChatBox me={me} friend={friend}/>
              </TabPane>
          );})}
        </Tabs>
        <ChatModal
          visible={modalVisible}
          onCreate={async ({ name }) => {
            await startChat({
              variables: {
                name1: me,
                name2: name
              },
            });
            setActiveKey(createChatBox(name, me));
            setModalVisible(false);
          }}
          onCancel={() => {
            setModalVisible(false);
          }}
        />

      </div>
      <Input.Search
        value={messageInput}
        onChange={(e) => 
          setMessageInput(e.target.value)}
        enterButton="Send"
        placeholder=
          "Enter message here..."
        onSearch={async (msg) => {
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
          // sendMessage({ key: activeKey, body: msg });
          await sendMessage({ 
            variables: {
              senderName: me,
              chatBoxName: activeKey,
              messageBody: msg
            }
          });
          setMessageInput("");
        }}

      ></Input.Search> 
  </>);
};
export default ChatRoom;
