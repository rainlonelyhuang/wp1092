import { useQuery, useMutation } from '@apollo/react-hooks';
import {
  useParams,  useLocation
} from "react-router-dom";
import queryString from "query-string";
import {
  POST_QUERY,
  COMMENT_LIST_QUERY,
} from '../graphql';


import "./Post.css"
const Post = () => {
	let {id} = useParams();
	let {search} = useLocation();
	const parsed = queryString.parse(search);
	const page = parseInt(parsed.page) || 1;


	const { loading, error, data, subscribeToMore } = useQuery(POST_QUERY, {variables: {id: id},});
	console.log("post", data);
	const comment_query = useQuery(COMMENT_LIST_QUERY, {variables: {Page: page, postID: id},});
	console.log("comments", comment_query.data);

	console.log(page);

	if (data && comment_query.data) {
		const comments = comment_query.data.commentList.comments;
		const lastPage = comment_query.data.commentList.pageNum;
		console.log(comments, lastPage);
		const prev = page-1>0? page-1: 1;
		const next = page+1<=lastPage? page+1: lastPage;
		return (
			<>
				<p>{data.post.body}</p>




				
				<div className="list_pager">
					<div className="page_button">
						<a href={`?page=${prev}`} title='上一頁' className='prev'>◄</a>
						<a href={`?page=${next}`} title='下一頁' className='next'>►</a>
						<p className="page_buttonA">
							

							{[page].map((page, index)=>{///buttons
								let first = page -2;
								let last = page + 2;
								while (first < 1) {
									first++;
								}
								while (last > lastPage) {
									last--;
								}
								let buttons = [];
								buttons.push(<a href={`/posts?page=${1}`}>{1}</a>);
								

								if (first - 1 > 1) {
									buttons.push("...");
								}
								if (first !== 1 && first !== page) {
									buttons.push(<a href={`/posts?page=${first}`}>{first}</a>);
								}
								if (page - first > 1) {
									buttons.push(<a href={`/posts?page=${first+1}`}>{first+1}</a>);
								}
								if (page !== first && page !== last) {
									buttons.push(<a href={`/posts?page=${page}`}>{page}</a>);
								}

								if (last - page > 1) {
									buttons.push(<a href={`/posts?page=${last-1}`}>{last-1}</a>);
								}
								if (last !== lastPage && last !== page) {
									buttons.push(<a href={`/posts?page=${last}`}>{last}</a>);
								}
								if (lastPage - last > 1) {
									buttons.push("...");
								}
								if (lastPage !== 1) {
									buttons.push(<a href={`/posts?page=${lastPage}`}>{lastPage}</a>);
								}
								return (
									<>
										{buttons}
									</>

								);
							})}
							
						</p>
					</div>
				</div>
			</>
		);
	}
	return (
		<>
			<p>nothing</p>
		</>
	);
};

export default Post;