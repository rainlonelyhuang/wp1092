import "../App.css";
import { useState, useEffect } from "react";
import { Tabs, Input } from "antd";
import ChatModal from '../components/ChatModal.js';
import useChatBox from '../hooks/useChatBox.js';
import useChat from '../hooks/useChat.js';
import { useQuery, useMutation } from '@apollo/react-hooks';
import { CHATBOX_QUERY, CREATE_CHATBOX_MUTATION, CREATE_MESSAGE_MUTATION, MESSAGE_SUBSCRIPTION } from '../graphql/index'

const { TabPane } = Tabs;
let activeIndex;
let unsubscribe;
const ChatRoom = ({ me, displayStatus }) => {
  const [messageInput, setMessageInput] = 
         useState("");
	const [modalVisible, setModalVisible] = useState(false);
	const addChatBox = () => { setModalVisible(true); };
	const [activeKey, setActiveKey] = useState("");
	const {chatBoxes, setChatBoxes, createChatBox, removeChatBox} = useChatBox();
	const { data: chat, subscribeToMore } = useQuery(CHATBOX_QUERY, {
		variables:{name: activeKey}
	});
	const [sendMessage] = 
       useMutation(CREATE_MESSAGE_MUTATION);
	
	const [startChat] = 
       useMutation(CREATE_CHATBOX_MUTATION, {
    onCompleted(data) {
      // console.log(data.createChatBox.messages, activeIndex);
	  let box = chatBoxes[activeIndex];
	  if(box){
		box.chatLog = data.createChatBox.messages;
		let boxes = chatBoxes;
		boxes.splice(activeIndex, 1, box);
		setChatBoxes([...boxes]);
	  }
      }
  });
	useEffect(() => {
	
  }, [activeKey]);
	useEffect(async () => {
		if(activeKey){
			activeIndex = chatBoxes.findIndex(b => b.key === activeKey);
			await startChat({
				variables:{
					name1: chatBoxes[activeIndex].friend,
					name2: me
				}
			});
			if (unsubscribe){
				unsubscribe();
			}
			unsubscribe = subscribeToMore({
			  document: MESSAGE_SUBSCRIPTION,
			  variables: {name: activeKey},
			  updateQuery: (prev, { subscriptionData }) => {
				if (!subscriptionData.data) return prev;
				let box = JSON.parse(JSON.stringify(prev.chatBox));
				box.messages.push(subscriptionData.data.message.data);
				let boxes = chatBoxes;
				boxes[activeIndex].chatLog = box.messages;
				// boxes.splice(activeIndex, 1, box);
				setChatBoxes([...boxes]);
				return {chatBox: box};
			  },
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
          onChange={async (key) => { 
		    setActiveKey(key);
		  }}
          onEdit={async (targetKey, action) => {
            if (action === "add") {
				addChatBox();
			}
			else if (action === "remove") {
				setActiveKey(removeChatBox(targetKey, activeKey));
			}
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
          onCreate={async ({ name }) => {
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
          sendMessage({ variables: {from: me, to: chatBoxes[activeIndex].friend, body: msg }});
          setMessageInput("");
		}}
      ></Input.Search> 
  </>);
};

export default ChatRoom;