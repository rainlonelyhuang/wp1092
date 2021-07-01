import { useQuery, useMutation } from '@apollo/react-hooks';
import { NavLink, useLocation} from "react-router-dom";
import queryString from "query-string";

import {
  POST_LIST_QUERY,
} from '../graphql';

import "./PostList.css"

const PostList = () => {
	// const page=0;
	let {search} = useLocation();
	const parsed = queryString.parse(search);
	const page = parseInt(parsed.page) || 1;
	// posts
	const { loading, error, data, subscribeToMore } = useQuery(POST_LIST_QUERY, {variables: {Page: page},});
	let posts = [{Id: page + 1}, {Id: page + 2}, {Id: page + 3}];
	// lastPage
	if (!page) {
		return (<h1>No post.</h1>)
	}
	let lastPage = 10;
	console.log(data);
	if (data) {
		posts = data.postList.posts;
		lastPage = data.postList.pageNum;
		console.log(data.postList.pageNum);
		const prev = page-1>0? page-1: 1;
		const next = page+1<=lastPage? page+1: lastPage;
	
		return (
			<>
				<div className="list_wrap">
					<table className="post_list">
						<thead>
					        <tr className="list_head">
					            <th></th>
					            <th></th>
					            <th>推噓/作者</th>
					            <th>最新回覆時間</th>
					        </tr>
					    </thead>
					    <tbody>
					    	{posts.map((post) => {
					    		// console.log(post)
					    		return (<tr className="list_item">
								            <td className="list_commentNum">{post.comments.length}</td>
								            <td className="list_main">
								            	<NavLink to={`/post/${post.id}?page=1`}>
								            		<div className="list_img">
								            			縮圖
								            		</div>
								            		<div className="list_text">
								            			<p className="list_title">{post.title}</p>
								            			<p className="list_brief">{post.body.substring(0, 10)}</p>
								            		</div>
								            	</NavLink>
								        	</td>
								            <td className="list_count">
								            	<p className="list_count_number">
								            		<span title={`推: ${post.like.count}`}>{post.like.count}</span>
								            		/
								            		<span title={`噓: ${post.unlike.count}`}>{post.unlike.count}</span>
								            	</p>
								            	<p className="list_count_user">{post.publisher.id}</p>
								            </td>
								            <td className="list_time">
								            	<p className="list_time_number">
								            		<span title={`最新回覆時間: ${post.time}`}>{post.time}</span>
								            	</p>
								            	<p className="list_time_user">{post.publisher.id}</p>
								            </td>
								        </tr>

					    		);
					    	})}
					    </tbody>
					</table>
				</div>

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
	return (<></>);
};

export default PostList;