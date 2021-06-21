const MessageBar = ({ sender, body, me }) => {
  const bodyDOM = <span className='message'>{body}</span>
  const senderDOM = <span className='message-sender'>{sender}</span>

  return sender === me  ? <div className='message-bar' style={{"textAlign": "right"}}>{bodyDOM}{senderDOM}</div>
                        : <div className='message-bar'>{senderDOM}{bodyDOM}</div>
}

export default MessageBar