import { gql } from '@apollo/client';


export const STATS_COUNT_QUERY = gql`
    query statsCount(
        $locationKeywords: [String!]!
        $severity: Int
    ) {
        statsCount(
            locationKeywords: $locationKeywords,
            severity: $severity,
        )
    }
`;

export const POST_LIST_QUERY = gql`
    query postList(
        $Page: Int
    ) {
        postList(
            Page: $Page,
        ) {
		    posts {
		        title
		        publisher {
		          id
		        }
		        body
		        like {
		          count
		        }
		        unlike {
		          count
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
