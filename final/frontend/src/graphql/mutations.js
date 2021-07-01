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
export const NEW_POST_MUTATION = gql`
	mutation newPost($title: String, $publisherID: String, $password: String, $body: String){
	  newPost(title: $title, publisherID: $publisherID, password: $password, body: $body){
		  title
		  body
		  time
		  id
	  }
  }
`;

export const LIKE_MUTATION = gql`
	mutation doLike($userID: String, $pointID: ID){
	  doLike(userID: $userID, pointID: $pointID){
		  id
		  count
		  users {
          	id
          }
	  }
  }
`;
