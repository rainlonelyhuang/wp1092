import "../App.css";
import { useState } from "react";
import { Tabs, Input } from "antd";
import ChatModal from "../Components/ChatModel"
import useChatBox from "../hooks/useChatBox"
import useChat from "../hooks/useChat"

const { TabPane } = Tabs;
const ChatRoom = ({ me, displayStatus }) => {
  const [messageInput, setMessageInput] = useState("");
  const [modalVisible, setModalVisible] = useState(false);
  const [activeKey, setActiveKey] = useState("");
  const [nowFriend, setNowFriend] = useState("");

  const addChatBox = () => { setModalVisible(true); };

  const { chatBoxes, createChatBox, removeChatBox } = useChatBox();
  const { messages, startChat, sendMessage } = useChat();

  return (
    <><div className="App-title">
          <h1>{me}'s Chat Room</h1> </div>
      <div className="App-messages">
        <Tabs type="editable-card" 
              activeKey={activeKey}
              onChange={(key) => { 
                setActiveKey(key);
                startChat({name:key.split('_')[0], to:key.split('_')[1]});
                if(me === key.split('_')[0]) {
                  setNowFriend(key.split('_')[1]);
                }else{
                  setNowFriend(key.split('_')[0]);
                }
              }}
              onEdit={(targetKey, action) => {
              if (action === "add") addChatBox();
              else if (action === "remove") setActiveKey(removeChatBox(targetKey, activeKey));}}
        >
          {chatBoxes.map((
            { friend, key, chatLog }) => {
              if(key === messages.key){
                return (
                    <TabPane tab={friend} 
                      key={key} closable={true}>
                      <div>
                        {messages.messages.map(({ name, body }, i) =>
                          me===name ? 
                          <p style={{textAlign:'right', float:'right', width: '51%'}}>
                            <span style={{wordBreak:'break-all', borderRadius:'25%', padding:'5px', backgroundColor: '#EEE', color: '#AAA'}} key={i+'body'}>{`${body}`}</span>
                            <span key={i+'name'}>{`${name}`}</span>
                          </p>:
                          <p style={{textAlign:'left', float:'left', width: '51%'}}>
                            <span key={i+'name'}>{`${name}`}</span>
                            <span style={{wordBreak:'break-all', borderRadius:'25%', padding:'5px', backgroundColor: '#EEE', color: '#AAA'}} key={i+'body'}>{`${body}`}</span>
                          </p>
                        )}
                      </div>
                    </TabPane>
                );}else {
                  return (
                    <TabPane tab={friend} 
                      key={key} closable={true}>
                    </TabPane>
                );}})}
        </Tabs>
        <ChatModal
          visible={modalVisible}
          onCreate={({ name }) => {
            setActiveKey(createChatBox(name, me));
            startChat({name:me, to:name});
            setNowFriend(name);
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
                sendMessage({ key:activeKey, body:{name: me, to: nowFriend, body: msg} });
                setMessageInput("");
            }}      
      ></Input.Search> 
    </>);
};
export default ChatRoom;
      