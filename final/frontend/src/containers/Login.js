import { useState, useEffect, useRef } from 'react';
import { hashPasswd, verifyPasswd } from "./utils";
import { useQuery } from '@apollo/react-hooks';
import { USER_QUERY } from '../graphql/index'

import "./Login.css";

const Login = ({ saveUserID }) => {
	const [ID, setID] = useState('');
	const [passwd, setPasswd] = useState('');
	const [validID, setValidID] = useState(false);
	const { data } = useQuery(USER_QUERY, {
		variables: {id: ID}
	});
	const login = () => {
		if(validID){
			console.log(verifyPasswd(passwd, data.user.password));
			if(verifyPasswd(passwd, data.user.password)){
				saveUserID(ID);
				window.location = "/";
			}
			else{
				alert("密碼錯誤，請再試一次");
				setPasswd('');
			}
		}
	}
	const passwdInput = useRef(null);
	const showPasswd = (e) => {
		if (e.target.checked){
			passwdInput.current.type = "text";
		}
		else{
			passwdInput.current.type = "password";
		}
	}
	useEffect(() => {
		if(data && ID !== "") setValidID(true);
		else setValidID(false);
	}, [data]);
	return (
		<>
		<div className="container">
			<h1 className="title">使用者登入</h1>
		<div className="card">
			<div><input type="text" className="text-input" placeholder="ID" onChange={(e) => setID(e.target.value)}/></div>
			{validID? null: <div><span style={{color: "red"}}>{ID === ""? "必填": "查無此ID"}</span></div>}
			<div><input type="password" className="text-input" ref={passwdInput} placeholder="密碼" onChange={(e) => setPasswd(e.target.value)}/></div>
			{passwd !== ""? null: <div><span style={{color: "red"}}>必填</span></div>}
			<div><label><input type="checkbox" onChange={showPasswd} />顯示密碼</label></div>
			<button className="btn login-btn" onClick={login} style={validID && passwd !== ""? {}:{background: "#eeeeee"}}>登入</button>
			<button className="btn cancel-btn"onClick={() => window.location = "/"}>取消</button>
		</div>
		</div>
		</>
	);
};

export default Login;