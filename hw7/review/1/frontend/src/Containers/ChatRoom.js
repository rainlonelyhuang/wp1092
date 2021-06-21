import "../App.css";
import { useState, useEffect } from "react"; 
import { Tabs, Input, Tag } from "antd";
import ChatModal from "../Components/ChatModal";
import useChatBox from "../hooks/useChatBox";
import useChat from "../hooks/useChat";
const { TabPane } = Tabs; 
const ChatRoom = ({ me, displayStatus }) => {

	const [messageInput, setMessageInput] = useState("");
	const [modalVisible, setModalVisible] = useState(false);
	const [activeKey, setActiveKey] = useState("");
	const { createChatBox, removeChatBox, chatBoxes, setChatBoxes } = useChatBox( me, activeKey, setActiveKey );
	// const [messages, setMessages] = useState([]);
	const [ render, setRender ] = useState([])
	const [ log, setLog ] = useState([])

	const addChatBox = () => { setModalVisible(true); };

	const getChatLog = ( friend, messages ) => {
		// console.log(chatBoxes)
		const found = chatBoxes.find( i => i.friend === friend )
		if (found !== undefined ) {
			found.chatLog = messages
		}
		setChatBoxes(chatBoxes)
		setRender(chatBoxes)

	}

	const getNewMsg = ( message ) => {
		const {name, to, body} = message

		let found
		if (name === to) found = chatBoxes.find( i => i.friend === message.name && me === message.name )
		else found = chatBoxes.find( i => i.friend === message.name || me === message.name )
		if (found !== undefined ) {
			found.chatLog.push(message)
			message = {name, body}
			setLog(message)
		}
		setChatBoxes(chatBoxes)
		setRender(chatBoxes)

	}

	const { sendMessage } = useChat( getChatLog, getNewMsg );

	useEffect(() => {
		// console.log(render)
	}, [render, log])

	return (
		<>
			<div className="App-title">
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
					{chatBoxes.map(({ friend, key, chatLog }) => {
						return (
						<TabPane 
							tab={friend}
							key={key} 
							closable={true}>
							    { (chatLog.length === 0)? (
						            <p style={{ color: '#ccc' }}> No messages... </p>
						            ) : (
						            chatLog.map(({ name, body }, i) => {
						              let pos = (name === me)? 'right' : 'left';
						              let color = (name === me)? 'green' : 'blue'
						              let move =  (name === me)? 
						              	(<>{body}&ensp;<Tag color='green' >{name}</Tag></>)
						              	 : (<><Tag color='blue' >{name}</Tag>{body}</>)
						              return (
							              <p style={{textAlign: pos}} key={i}>
							                {move}
							              </p>)
						          	})
						        )}
						</TabPane>
						);
					})}
				</Tabs>
				<ChatModal 
					visible={modalVisible} 
					onCreate={({ name }) => {
					    setActiveKey(createChatBox(name, me))
					    sendMessage([ "CHAT", { name:me, to:name } ])
					    setModalVisible(false);
					}}
					onCancel={() => { setModalVisible(false); }}
				/>
			</div> 
			<Input.Search
				value={messageInput} 
				onChange={(e) =>
					setMessageInput(e.target.value)} 
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
						return;
					}
					sendMessage([ 'MESSAGE', { name:me, key:activeKey, body:messageInput } ]); 
					setMessageInput("");
				}}
			></Input.Search> 
		</>
	);

};
export default ChatRoom;
   