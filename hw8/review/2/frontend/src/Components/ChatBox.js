import { useQuery} from '@apollo/react-hooks'
import {POSTS_SUBSCRIPTION} from '../graphql'
import {QUERYHI} from '../graphql'

import { useEffect } from 'react'

const ChatBox = ({chatname,me})=>{
    const { loading, error, data, subscribeToMore } = 
                                             useQuery(QUERYHI,{
                                                variables: { name:chatname },
                                              });
    //if (error) console.log( `Error! ${error.message}`);
    if (loading) console.log( 'Loading...');                                        
    useEffect(() => {
    try {
    subscribeToMore({
      
      document: POSTS_SUBSCRIPTION,
      variables:{chatBoxName:chatname},
      updateQuery: (prev, { subscriptionData }) => {
        if (!subscriptionData.data) {
          console.log("NO")
          return prev
        }
        
        console.log(prev)
        const newMessage = subscriptionData.data.message.data
        
        return {
          ...prev,
          chatBox:{
          message: [ ...prev.chatBox.messages,newMessage]}
        }
      }
     })}catch(e){}
  }, [subscribeToMore])
  return(
    <div>
      {loading ? (
            <p>Loading...</p>
          ) : error ? (
            <p>Error :(((</p>
          ) : (
            data.chatBox.messages.map(({body,sender}) => {
              if(sender === me){
              return (

              <div style={{textAlign:'right'}}> {`${body} :${sender}`}</div>
             );
            }
          else{
            return (

              <div style={{textAlign:'left'}}> {`${sender}: ${body}`}</div>
             );
          }} 
            )
          )}
    </div>
  )
}

export default ChatBox 