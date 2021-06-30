import { gql } from '@apollo/client';

export const MESSAGE_SUBSCRIPTION = gql`
  subscription message($name: String!){
    message(name: $name){
			data{
			name
			body
		}
	}
  }
`;
