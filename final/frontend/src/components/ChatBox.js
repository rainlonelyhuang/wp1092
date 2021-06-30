import React, { useEffect, useState } from 'react';
import { useQuery, useMutation } from '@apollo/react-hooks';
import { Tag} from 'antd'
import {
  CHATBOX_QUERY,
  CREATE_CHATBOX_MUTATION, CREATE_MESSAGE_MUTATION,
  CHATBOX_SUBSCRIPTION,
} from '../graphql';

const makeName = (name, to) => {
  return [name, to].sort().join('_');
};

// const getChatLog = async (me, friend) => {
//   const { loading, error, data, subscribeToMore } = await useQuery(CHATBOX_QUERY, {variables: {name1: me, name2: friend},});
//   return {data, subscribeToMore};
// };

const ChatBox = ({ me, friend }) => {
  const { loading, error, data, subscribeToMore } = useQuery(CHATBOX_QUERY, {variables: {name1: me, name2: friend},});
  useEffect(() => {
    try {
      subscribeToMore({
        document: CHATBOX_SUBSCRIPTION,
        variables: { name1: me, name2: friend },
        updateQuery: (prev, { subscriptionData }) => {
          if (!subscriptionData.data) return prev;
          const newMessage = subscriptionData.data.message;
          // console.log(prev)
          // console.log(subscriptionData.data)

          // console.log({
          //   ...prev,
          //   chatBox: {...prev.chatBox, messages: [...prev.chatBox.messages, newMessage]},
          // });
          return {
            ...prev,
            chatBox: {...prev.chatBox, messages: [...prev.chatBox.messages, newMessage]},
          };
        },
      });
    } catch (e) {}
  }, [subscribeToMore]);



  if (data) {
  	// console.log(data.chatBox.messages.length);
	return (
		<>
			{data.chatBox.messages.map((msg) => {
				if (msg.sender.name === me) {
					return (<p key={msg.id} className="App-message-self">{msg.body} <Tag color="blue">{msg.sender.name}</Tag></p>);
				} else {
					return (<p key={msg.id} className="App-message"><Tag color="blue">{msg.sender.name}</Tag> {msg.body}</p>);
				}
			
			})}
		</>
	);
  }
  return <p>chatbox</p>
};

export { ChatBox };