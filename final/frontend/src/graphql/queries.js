import { gql } from '@apollo/client';

export const USER_QUERY = gql`
    query user($id: String){
        user(id: $id){
			id
			name
			password
		}
    }
`;

export const POST_QUERY = gql`
    query post($id: ID){
        post(id: $id){
			id
	        title
	        publisher {
	          id
	          name
	        }
	        body
	        like {
	          count
	          id
	          users {
	          	id
	          }
	        }
	        unlike {
	          count
	          id
	          users {
	          	id
	          }
	        }
	        comments {
	        	time
	        }
	        time
		}
    }
`;

export const POST_LIST_QUERY = gql`
    query postList(
        $Page: Int
    ) {
        postList(
            Page: $Page
        ) {
		    posts {
		    	id
		        title
		        publisher {
		          id
		        }
		        body
		        like {
		          count
		          id
		        }
		        unlike {
		          count
		          id
		        }
		        comments {
		        	time
		        }
		        time
		    }
		    pageNum
        }
    }
`;

export const COMMENT_LIST_QUERY = gql`
    query commentList(
        $Page: Int
        $postID: ID
    ) {
        commentList(
            Page: $Page
            postID: $postID
        ) {
		    comments {
		    	
		        publisher {
		          id
		          name
		        }
		        body
		        like {
		          count
		          id
		          users {
		          	id
		          }
		        }
		        unlike {
		          count
		          id
		          users {
		          	id
		          }
		        }
		        time
		    }
		    pageNum
        }
    }
`;