import "../App.css";
import { Input } from "antd";
import { useState } from "react";
import { UserOutlined } from "@ant-design/icons";

const SignIn = ({ me, setMe, setSignedIn, displayStatus }) => (
  <>
    <div className="App-title"><h1>My Chat Room</h1></div>
    <Input.Search
      prefix={<UserOutlined />} // 產生人頭的圖案
      value={me}
      onChange={(e) => setMe(e.target.value)}
      placeholder="Enter your name"
      enterButton="Sign In"
      size="large"
      style={{width: 300, margin: 50}}
      onSearch={(name) => { 
        if(!name){
          displayStatus({
            type:"error",
            msg: "Missing user name",
          });
        }
        else setSignedIn(true); }}
    ></Input.Search>
  </>
  );

export default SignIn;