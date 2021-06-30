import { gql } from '@apollo/client';

export const NEW_USER_MUTATION = gql`
  mutation newUser($id: String, $name: String, $password: String){
    newUser(id: $id, name: $name, password: $password){
		id
		name
		password
	  }
  }
`;
