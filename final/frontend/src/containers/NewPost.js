import React from "react";
import { useMutation } from "@apollo/react-hooks";

import "./NewPost.css";

import { Editor } from "@tinymce/tinymce-react";

class NewPost extends React.Component {
  constructor(props) {
    super(props);
    this.state = { content: "" };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(content, editor) {
    this.setState({ content });
  }

  handleSubmit(event) {
    alert("Text was submitted: " + this.state.content);
	
	// window.location = "/";
    event.preventDefault();
  }

  render() {
	  console.log(this.state.content);
    return (
	<div className="container">
      <form onSubmit={this.handleSubmit}>
		<input className="title-input" type="text" placeholder="取個星爆標題吧"/>
        <Editor
          apiKey="qagffr3pkuv17a8on1afax661irst1hbr4e6tbv888sz91jc"
          value={this.state.content}
          init={{
			  placeholder: "Type here ...",
            height: 470,
			plugins: 'image lists fontsizeselect',
            menubar: false,
			toolbar: 'bold italic fontsizeselect forecolor image | alignleft aligncenter alignright | bullist numlist | subscript superscript'
          }}
          onEditorChange={this.handleChange}
        />
        <input type="submit" value="Submit" />
      </form>
	  </div>
    );
  }
}

export default NewPost;