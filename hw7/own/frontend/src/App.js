import './App.css';
import { useState, useEffect} from 'react';
import SignIn from './containers/SignIn.js';
import ChatRoom from './containers/ChatRoom.js';
import { message } from 'antd';
import useChat from './hooks/useChat';

const LOCALSTORAGE_KEY = "save-me";
const server = new WebSocket('ws://localhost:8080');
const App = () => {
	const savedMe = localStorage.getItem(LOCALSTORAGE_KEY);
	const [signedIn, setSignedIn] = useState(false);
	const [me, setMe] = useState(savedMe || '');
	const { status } = useChat();
	// server.onopen = () => console.log('Server connected.');
	const displayStatus = (payload) => {
    if (payload.msg) {
      const { type, msg } = payload
      const content = {
        content: msg, duration: 0.5 }
      switch (type) {
        case 'success':
          message.success(content)
          break
        case 'error':
        default:
          message.error(content)
          break
  }}}
  useEffect(() => {
    displayStatus(status)}, [status]);
	
	useEffect(() => {
    if (signedIn) {
      localStorage.setItem(LOCALSTORAGE_KEY, me);
    }
  }, [signedIn]);
	return (
		<div className='App'>
			{signedIn? (<ChatRoom me={me} displayStatus={displayStatus} server={server}/>): (<SignIn me={me} setMe={setMe} setSignedIn={setSignedIn} displayStatus={displayStatus} />)}
		</div>
	);
};

export default App;