import { useState, useEffect } from 'react';
import { hashPasswd, verifyPasswd } from "./utils";
import { useQuery, useMutation } from '@apollo/react-hooks';
import { USER_QUERY, NEW_USER_MUTATION } from '../graphql/index'

import "./Login.css";

const Signup = ({ saveUserID }) => {
	const [ID, setID] = useState('');
	const [name, setName] = useState('');
	const [passwd, setPasswd] = useState('');
	const [validID, setValidID] = useState(false);
	const { data } = useQuery(USER_QUERY, {
		variables: {id: ID}
	});
	const [newUser] = useMutation(NEW_USER_MUTATION);
	const signup = async () => {
		if(validID && name !== "" && passwd !== ""){
			let hashed = hashPasswd(passwd);
			await newUser({
				variables: {
					id: ID, name: name, password: hashed
				}
			});
			saveUserID(ID);
			window.location = "/"
		}
	}
	useEffect(() => {
		if(data || ID === "") setValidID(false);
		else setValidID(true);
	}, [data, ID]);
	return (
		<>
		<div className="container">
			<h1 className="title">使用者註冊</h1>
		<div className="card">
			<div><input type="text" className="text-input" placeholder="ID" onChange={(e) => setID(e.target.value)}/></div>
			{validID? null: <div><span style={{color: "red"}}>{ID === ""? "必填": "ID已使用"}</span></div>}
			<div><input type="text" className="text-input" placeholder="暱稱" onChange={(e) => setName(e.target.value)}/></div>
			{name !== ""? null: <div><span style={{color: "red"}}>必填</span></div>}
			<div><input type="password" className="text-input" placeholder="密碼" onChange={(e) => setPasswd(e.target.value)}/></div>
			{passwd !== ""? null: <div><span style={{color: "red"}}>必填</span></div>}
			<button className="btn login-btn" onClick={signup} style={validID && name !== "" && passwd !== ""? {}:{background: "#eeeeee"}}>註冊</button>
			<button className="btn cancel-btn" onClick={() => window.location = "/"}>取消</button>
		</div>
		</div>
		</>
	);
};

export default Signup;