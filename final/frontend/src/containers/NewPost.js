import { useState, useEffect } from "react";
import { useMutation } from "@apollo/react-hooks";
import { NEW_POST_MUTATION } from "../graphql";
import { getUser } from "./utils"
import './NewPost.css';

import { Editor } from "@tinymce/tinymce-react";

const NewPost = () => {
  const [body, setBody] = useState('');
  const [title, setTitle] = useState('');
  const [postID, setPostID] = useState('');
  const [newPost] = useMutation(NEW_POST_MUTATION, {
	  onCompleted(data){
		  setPostID(data.newPost.id);
	  },
	  onError(error){
		  console.log(error);
		  alert("發文失敗！或許你偷偷換了ID或密碼......");
		  window.location = "/";
	  }
	});
  const [userID, userPasswd] = getUser();
  const handleSubmit = async (event) => {
    // alert("Text was submitted: " + body);
	await newPost({
		variables:{
			title, publisherID: userID, password: userPasswd, body
		}
	});
	// window.location = "/";
  }
  useEffect(() => {
	  if(postID !== ""){
		  // console.log(postID);
		  // console.log("/post/" + postID + "?page=1");
		window.location = "/post/" + postID + "?page=1";
	  }
  }, [postID]);
  
  useEffect(() => {
	  if(!userID){
		  window.location = "/";
	  }
  }, userID);


  return (
	<div className="container">
		<input className="title-input" type="text" placeholder="取個星爆標題吧" onChange={(e) => setTitle(e.target.value)}/>
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
        <button type="submit" onClick={handleSubmit}>發布 </button>
	  </div>
  );
}

export default NewPost;