import { useState } from "react";  
const useChat = () => {
  const [status, setStatus] = useState({}); // { type, msg }
  const sendMessage = (server, data) => {
    server.sendEvent({
	  type: 'MESSAGE',
	  data
	});
  }; // { key, msg }
  return { status, sendMessage };
};
export default useChat;