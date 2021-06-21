import { gql } from '@apollo/client';
  
export const POSTS_SUBSCRIPTION = gql`
subscription message($chatBoxName:String!){
    message(chatBoxName:$chatBoxName){
      data{
        sender
        body
      }
      mutation
      
    }
  }
`