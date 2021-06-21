import "../App.css"
import { useState } from "react"
import { Tabs, Input } from "antd"
import ChatModal from "../Components/ChatModal";
import useChatBox from "../hooks/useChatBox";
import MessageBar from "./MessageBar"

const { TabPane } = Tabs

const ChatRoom = ({ me, displayStatus, server }) => {
  const [messageInput, setMessageInput] = useState("")
  const [modalVisibie, setModalVisible] = useState(false)
  const [activeKey, setActiveKey] = useState("")

  const { chatBoxes, createChatBox, removeChatBox, sendMessage } = useChatBox(server)
  //const { sendMessage } = useChat()

  const addChatBox = () => { setModalVisible(true) }

  return (
    <>
      <div className="App-title">
        <h1>{me}'s Chat Room</h1>
      </div>
      <div className="App-messages">
        <Tabs type="editable-card"
              activeKey={activeKey}
              onChange={(key) => { setActiveKey(key) }}
              onEdit={ (targetKey, action) => {
                if (action === "add") addChatBox()
                else if (action === "remove") setActiveKey(removeChatBox(targetKey, activeKey))
              } }
        >
          {chatBoxes.map(
            ({friend, key, chatLog}) => (
              <TabPane tab={friend} key={key} closable={true}>
                {chatLog.map(log => <MessageBar sender={log.name} body={log.body} me={me}/>)}
              </TabPane>
            )
          )}
        </Tabs>
        <ChatModal
          visible={modalVisibie}
          onCreate={({ name }) => {
            setActiveKey(createChatBox(name, me))
            setModalVisible(false)
          }}
          onCancel={() => {
            setModalVisible(false)
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
              msg: "Please enter message."
            })
          } else if (activeKey === "") {
            displayStatus({
              type: "error",
              msg: "Please add a chatbox first."
            })
          } else {
            sendMessage({ sender: me, key: activeKey, body: msg })
            setMessageInput("")
          }
        }}
      />
    </>
  )
}

export default ChatRoom