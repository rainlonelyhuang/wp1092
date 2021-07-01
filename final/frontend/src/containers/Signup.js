import { useState, useEffect, useRef } from 'react';
import { hashPasswd, verifyPasswd } from "./utils";
import { useQuery, useMutation } from '@apollo/react-hooks';
import { USER_QUERY, NEW_USER_MUTATION } from '../graphql/index'

import "./Login.css";

const Signup = ({ saveUser }) => {
	const [ID, setID] = useState('');
	const [name, setName] = useState('');
	const [passwd, setPasswd] = useState('');
	const [validID, setValidID] = useState(false);
	const { data } = useQuery(USER_QUERY, {
		variables: {id: ID}
	});
	const [newUser] = useMutation(NEW_USER_MUTATION);
	const signup = async () => {
		if(checkAllValid()){
			let hashed = hashPasswd(passwd);
			await newUser({
				variables: {
					id: ID, name: name, password: hashed
				}
			});
			saveUser(ID, passwd);
			window.location = "/"
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
	const testID = () => {
		return ID.match(/^[A-​Za-z0-9]+/g) && ID.search(/\\|`/g) < 0;
	}
	
	const testLength = () => {
		return ID.length <= 20 && name.length <= 20 && passwd.length <= 20;
	}
	const checkAllValid = () => {
		return validID && name !== "" && passwd !== "" && testLength();
	}
	useEffect(() => {
		if(data || ID === "" || !testID() || ID.length > 20) setValidID(false);
		else setValidID(true);
	}, [data, ID]);
	
	return (
		<>
		<div className="container">
			<h1 className="title">使用者註冊</h1>
		<div className="card">
			<div><input type="text" className="text-input" placeholder="ID(僅能包含英文字母及數字)" onChange={(e) => setID(e.target.value)}/></div>
			{validID? null: <div><span style={{color: "red"}}>{ID === ""? "拜託田一下啦": (testID() ? (ID.length > 20? "啊啊...太長了": "這個ID有主人嘍"): "好像混進了奇怪東西...")}</span></div>}
			<div><input type="text" className="text-input" placeholder="暱稱" onChange={(e) => setName(e.target.value)}/></div>
			{name !== ""? (name.length > 20?  <div><span style={{color: "red"}}>啊啊...太長了</span></div>: null): <div><span style={{color: "red"}}>拜託田一下啦</span></div>}
			<div><input type="password" className="text-input" ref={passwdInput} placeholder="密碼" onChange={(e) => setPasswd(e.target.value)}/></div>
			{passwd !== ""? (passwd.length > 20?  <div><span style={{color: "red"}}>啊啊...太長了</span></div>: null): <div><span style={{color: "red"}}>拜託田一下啦</span></div>}
			<div><label><input type="checkbox" onChange={showPasswd} />讓我看看</label></div>
			<button className="btn login-btn" onClick={signup} style={checkAllValid()? {}:{background: "#eeeeee"}}>註冊</button>
			<button className="btn cancel-btn" onClick={() => window.location = "/"}>取消</button>
		</div>
		</div>
		</>
	);
};

export default Signup;