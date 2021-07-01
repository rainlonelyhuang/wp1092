import { useQuery, useMutation } from '@apollo/react-hooks';
import React, { useState } from 'react';
import {
  useParams,  useLocation, NavLink
} from "react-router-dom";
import queryString from "query-string";
import {
  POST_QUERY,
  COMMENT_LIST_QUERY,
  LIKE_MUTATION
} from '../graphql';
import default_user_image from '../images/default-user-image.png';

import "./Post.css"

const LOCALSTORAGE_USER_ID = 'userID';



const Post = () => {
	const userID = localStorage.getItem(LOCALSTORAGE_USER_ID);
	let {id} = useParams();
	let {search} = useLocation();
	const parsed = queryString.parse(search);
	const page = parseInt(parsed.page) || 1;


	const { loading, error, data, subscribeToMore } = useQuery(POST_QUERY, {variables: {id: id},});
	// console.log("post", data);
	const comment_query = useQuery(COMMENT_LIST_QUERY, {variables: {Page: page, postID: id},});
	// console.log("comments", comment_query.data);


	const [changeLike] = useMutation(LIKE_MUTATION, {
	  onCompleted(data){
		  // console.log("count",data.doLike.count);
	  },onError(error){
		alert("請先登入或註冊以取得最佳體驗！");
		}
	});

	const on_like = async (userID, pointID) => {
		await changeLike({variables: {userID: userID, pointID: pointID},});
	}

	if (data && comment_query.data) {
		const post = data.post;
		const comments = comment_query.data.commentList.comments;
		let lastPage = comment_query.data.commentList.pageNum;
		if (lastPage <= 0) {
			lastPage = 1;
		}
		// console.log(comments, lastPage);
		const prev = page-1>0? page-1: 1;
		const next = page+1<=lastPage? page+1: lastPage;
		
		let canLike = true, canUnlike = true, like_class= "", unlike_class = "";
		// console.log(post)
		let foundLike = post.like.users? post.like.users.find(e => e.id === userID): "";
		console.log('post like users', post.like.users);
		let foundUnlike = post.unlike.users? post.unlike.users.find(e => e.id === userID): "";
		if (foundLike) {
			canUnlike = false;
			like_class=" pressed_like";
		}
		if (foundUnlike) {
			canLike = false;
			unlike_class=" pressed_unlike";
		}
		
		return (
			<>
				<div id="main_post">
					<div className="header">
						<h1 className="post_title">{post.title}</h1>
						<p className='author'><img className="user-image" src={default_user_image} />樓主 <span className="username" style={{marginLeft: "4px"}}>{post.publisher.name}</span> <span className="userID">{post.publisher.id}</span> </p>
						<p className="edit_time">{post.time}</p>
					</div>

					<div className="text_body" dangerouslySetInnerHTML={{__html: post.body}} />
					<p className="count">
					<button className={"like_count"+like_class} onClick={() => on_like(userID, post.like.id)} disabled={!canLike}>推: {post.like.count}</button>
					<button className={"unlike_count"+unlike_class} onClick={() =>  on_like(userID, post.unlike.id)} disabled={!canUnlike} >噓: {post.unlike.count}</button>
					<a className="comment-button" href={`/newcomment/${id}`} >回覆</a> </p>
				</div>

				<div id="comment_list">
					{comments.map((comment, index) => {
						let num = (parseInt(page, 10) - 1) * 20 + index + 2;
						
						canLike = true; canUnlike = true; like_class= ""; unlike_class = "";
						foundLike = comment.like.users? comment.like.users.find(e => e.id === userID): "";
						foundUnlike = comment.unlike.users? comment.unlike.users.find(e => e.id === userID): "";
						if (foundLike) {
							canUnlike = false;
							like_class=" pressed_like";
						}
						if (foundUnlike) {
							canLike = false;
							unlike_class=" pressed_unlike";
						}
						return (
							<div className="comment_section">
								<div className="header">
								<p className='author'>{num + "樓"}<span className="username" style={{marginLeft: "10px"}}>{comment.publisher.name}</span> <span className="userID">{comment.publisher.id}</span> </p>
									<p className="edit_time" >{comment.time}</p>
								</div>
								<div className="text_body" dangerouslySetInnerHTML={{__html: comment.body}} />
								<p className="count">
								<button className={"like_count"+like_class} onClick={() => on_like(userID, comment.like.id)} disabled={!canLike}>推: {comment.like.count}</button>
								<button className={"unlike_count"+unlike_class} onClick={() =>  on_like(userID, comment.unlike.id)} disabled={!canUnlike} >噓: {comment.unlike.count}</button>
								</p>

							</div>
						);
					})}

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
								buttons.push(<a href={`/post/${id}?page=${1}`}>{1}</a>);
								

								if (first - 1 > 1) {
									buttons.push("...");
								}
								if (first !== 1 && first !== page) {
									buttons.push(<a href={`/post/${id}?page=${first}`}>{first}</a>);
								}
								if (page - first > 1) {
									buttons.push(<a href={`/post/${id}?page=${first+1}`}>{first+1}</a>);
								}
								if (page !== first && page !== last) {
									buttons.push(<a href={`/post/${id}?page=${page}`}>{page}</a>);
								}

								if (last - page > 1) {
									buttons.push(<a href={`/post/${id}?page=${last-1}`}>{last-1}</a>);
								}
								if (last !== lastPage && last !== page) {
									buttons.push(<a href={`/post/${id}?page=${last}`}>{last}</a>);
								}
								if (lastPage - last > 1) {
									buttons.push("...");
								}
								if (lastPage !== 1) {
									buttons.push(<a href={`/post/${id}?page=${lastPage}`}>{lastPage}</a>);
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