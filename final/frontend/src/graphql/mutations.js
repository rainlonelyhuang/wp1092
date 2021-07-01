import { gql } from '@apollo/client';

export const NEW_USER_MUTATION = gql`
  mutation newUser($id: String, $name: String, $password: String){
    newUser(id: $id, name: $name, password: $password){
		id
		name
		password
	  }
  }
`
export const New_POST_MUTATION = gql`
	mutation newPost($title: String, $publisherID: String, $body: String, $time: String){
	  newPost(title: $title, publisherID: $publisherID, body: $body, time: $time){
		  title
		  body
		  time
		  id
	  }
  }
`;
