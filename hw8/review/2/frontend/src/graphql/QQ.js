import { gql } from '@apollo/client';

export const QUERYHI = gql`
query chatBox($name:String!){
        chatBox(name:$name){
            users
            messages{
              sender
              body
            }
            name
            id
      
        }
    }
`