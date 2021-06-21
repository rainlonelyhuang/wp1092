const client = new WebSocket('ws://localhost:8080')

const useChat = ( getChatLog, getNewMsg ) => {

	const sendMessage = async (payload) => {
		// console.log(payload)
		await client.send(JSON.stringify(payload));
	};

	client.onmessage = async (byteString) => {
		const { type, data } = JSON.parse(byteString.data)

		switch (type){
			case 'CHAT': {

				const { friend, messages } = data
				getChatLog( friend, messages )

				break;

			}
			case 'MESSAGE': {
				const { message } = data
				getNewMsg( message )

				break;

			}
		}

	}

	return { sendMessage };
};

export default useChat;