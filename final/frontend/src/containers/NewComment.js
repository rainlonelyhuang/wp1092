import { useState, useEffect } from "react";
import { useMutation, useQuery } from "@apollo/react-hooks";
import { NEW_COMMENT_MUTATION, POST_QUERY } from "../graphql";
import { useParams } from "react-router-dom";
import { getUser } from "./utils";
import './NewPost.css';

import { Editor } from "@tinymce/tinymce-react";

const NewPost = () => {
	let {postid} = useParams();
  const [body, setBody] = useState('');
  const { loading, error, data, subscribeToMore } = useQuery(POST_QUERY, {variables: {id: postid},
	onError(error){
		console.log(error);
		alert("這則文好像不存在喔！前往首頁發掘優質的貼文吧！");
		window.location = "/";
	}
  });
  const [newComment] = useMutation(NEW_COMMENT_MUTATION, {
	  onCompleted(data){
		  window.location = "/post/" + postid + "?page=1";
	  },
	  onError(error){
		  alert("啊勒勒...好像出錯了QQ");
		  window.location = "/post/" + postid + "?page=1";
	  }
	});
  const [userID, userPasswd] = getUser();
  const handleSubmit = async (event) => {
	await newComment({
		variables:{
			publisherID: userID, body, parentPostID: postid, password: userPasswd
		}
	});
    // alert("Text was submitted: " + body);
	// window.location = "/";
  }
  
  useEffect(() => {
	  if(!userID){
		  alert("請先登入或註冊以取得最佳體驗！")
		  window.location = `/post/${postid}`;
	  }
  }, userID);

  return (
	<div className="container">
		<h1>回覆: {data? data.post.title: ""}</h1>
        <Editor
          apiKey="qagffr3pkuv17a8on1afax661irst1hbr4e6tbv888sz91jc"
          value={body}
          init={{
			  placeholder: "Type here ...",
            height: 470,
			plugins: 'image lists fontsizeselect',
            menubar: false,
			toolbar: 'bold italic fontsizeselect forecolor image | alignleft aligncenter alignright | bullist numlist | subscript superscript'
          }}
          onEditorChange={(content) => setBody(content)}
        />
        <button type="submit" onClick={handleSubmit}>回覆 </button>
	  </div>
  );
}

export default NewPost;