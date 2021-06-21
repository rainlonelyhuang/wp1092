import { useState } from "react"

const useChatBox = (server) => {
  const [chatBoxes, setChatBoxes] = useState([])
  const makeKey = (name1, name2) => [name1, name2].sort().join('_')

  server.onmessage = (m) => {
    onEvent(JSON.parse(m.data));
  };
  server.sendEvent = (e) => server.send(JSON.stringify(e));

  const onEvent = (e) => {
    const { type } = e
    let newChatBoxes = []
    switch (type) {
      case 'CHAT':
        const { sender, receiver } = e.data
        const chatLog = e.data.messages
        newChatBoxes = [...chatBoxes]
        newChatBoxes.push({ friend: receiver, key: makeKey( sender, receiver ), chatLog })
        setChatBoxes(newChatBoxes)
        break
      case 'MESSAGE':
        const { key, message } = e.data
        newChatBoxes = [...chatBoxes]
        for (let i = 0; i < newChatBoxes.length; i++) {
          console.log(newChatBoxes[i].key)
          if (newChatBoxes[i].key === key) {
            newChatBoxes[i].chatLog.push(message)
            break
          }
        }
        setChatBoxes(newChatBoxes)
        break
      default:
        throw new Error(`Unexpected type: ${type}`)
    }
  }


  const createChatBox = (friend, me) => {
    //const newKey = (me <= friend) ? `${me}_${friend}` : `${friend}_${me}`
    const newKey = makeKey(me, friend)
    if (chatBoxes.some(({ key }) => key === newKey)) {
      throw new Error(friend + "'s chat box has already opened.")
    }
    server.sendEvent({
      type: 'CHAT',
      data: { to: friend, name: me }
    })

    return newKey
  }
  const removeChatBox = (targetKey, activeKey) => {
    let newActiveKey = activeKey
    let lastIndex
    chatBoxes.forEach(({ key }, i) => {
      if (key === targetKey) lastIndex = (i - 1 >= 0) ? i - 1 : 0
    })
    const newChatBoxes = chatBoxes.filter((chatBox) => chatBox.key !== targetKey)
    if (newChatBoxes.length > 0) {
      if (newActiveKey === targetKey) {
        newActiveKey = newChatBoxes[lastIndex].key
      }
    } else {
      newActiveKey = ""
    }
    setChatBoxes(newChatBoxes)
    return newActiveKey
  }

  const sendMessage = (payload) => {
    const { sender, key, body } = payload
    const participants = key.split("_")
    if (participants.length !== 2){
      throw new Error(`incorrect participants number. (expected: 2, actual: ${participants.length}`)
    }
    const receiver = sender === participants[0] ? participants[1] : participants[0]
    server.sendEvent({
      type: 'MESSAGE',
      data: {
        name: sender,
        to: receiver,
        body: body
      }
    })
  }
  return { chatBoxes, createChatBox, removeChatBox, sendMessage }
}

export default useChatBox