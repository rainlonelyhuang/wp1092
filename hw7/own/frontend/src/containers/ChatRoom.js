import "../App.css";
import { useState, useEffect } from "react";
import { Tabs, Input } from "antd";
import ChatModal from '../components/ChatModal.js';
import useChatBox from '../hooks/useChatBox.js';
import useChat from '../hooks/useChat.js';

const { TabPane } = Tabs;
let activeIndex;
const ChatRoom = ({ me, displayStatus, server }) => {
  const [messageInput, setMessageInput] = 
         useState("");
	const [modalVisible, setModalVisible] = useState(false);
	const addChatBox = () => { setModalVisible(true); };
	const [activeKey, setActiveKey] = useState("");
	const {chatBoxes, setChatBoxes, createChatBox, removeChatBox} = useChatBox();
	const { sendMessage } = useChat();
    server.onmessage = (m) => {
      onEvent(JSON.parse(m.data));
    };
    server.sendEvent = (e) => server.send(JSON.stringify(e));
	const onEvent = (e) => {
        const { type } = e;

        switch (type) {
          case 'CHAT': {
			const index = chatBoxes.findIndex(b => b.key === activeKey);
			let box = chatBoxes[index];
			box.chatLog = e.data.messages;
			let boxes = chatBoxes;
			boxes.splice(index, 1, box);
			setChatBoxes([...boxes]);
			// console.log(chatBoxes);
            break;
          }
          case 'MESSAGE': {
			const index = chatBoxes.findIndex(b => b.key === activeKey);
			let box = chatBoxes[index];
			box.chatLog.push(e.data.message);
			let boxes = chatBoxes;
			boxes.splice(index, 1, box);
			setChatBoxes([...boxes]);
            break;
          }
        }
    };
	useEffect(() => {
		if(activeKey){
			activeIndex = chatBoxes.findIndex(b => b.key === activeKey);
			server.sendEvent({
			  type: 'CHAT',
			  data: { to: chatBoxes[activeIndex].friend, name: me },
			});
		}
    }, [activeKey])

  return (
    <> <div className="App-title">
         <h1>{me}'s Chat Room</h1>
	   </div>
      <div className="App-messages">
        <Tabs
          type="editable-card"
		  activeKey={activeKey}
          onChange={(key) => { setActiveKey(key); }}
          onEdit={(targetKey, action) => {
            if (action === "add") addChatBox();
			else if (action === "remove") setActiveKey(removeChatBox(targetKey, activeKey));
          }}
        >
          {chatBoxes.map((
            { friend, key, chatLog }) => {
           return (
              <TabPane tab={friend} 
                key={key} closable={true}>
				{chatLog.map(({name, body}) => {
					if(name === me){
						return(
							<><div className="from-me">{me}</div>
							<div className="message" style={{left: "99%",transform: "translateX(-100%)"}}>
							  <span>{body}</span>
							</div></>
						);
					}
					else{
						return(
							<>{friend}<div className="message" style={{left:"1%"}}>
							  <span>{body}</span>
							</div></>
						);
					}
				})}
              </TabPane>
          );})}
       </Tabs>
	   <ChatModal
          visible={modalVisible}
          onCreate={({ name }) => {
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
          sendMessage(server, { to: chatBoxes[activeIndex].friend, name: me, key: activeKey, body: msg });
          setMessageInput("");
		}}
      ></Input.Search> 
  </>);
};
export default ChatRoom;