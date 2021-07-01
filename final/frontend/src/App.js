import {
    BrowserRouter as Router,
    Switch,
    Route,
} from "react-router-dom";

import Login from './containers/Login';
import Signup from './containers/Signup';
import NewPost from './containers/NewPost';
import Header from './components/Header';
import { useState } from 'react';


import PostList from './containers/PostList';
import Post from './containers/Post';


const LOCALSTORAGE_USER_ID = 'userID';
const LOCALSTORAGE_USER_PASSWD = 'userPasswd';
function App() {
	const [userID, setUserID] = useState(localStorage.getItem(LOCALSTORAGE_USER_ID) || '');
	const [userPasswd, setUserPasswd] = useState(localStorage.getItem(LOCALSTORAGE_USER_PASSWD) || '');
	const saveUser = (ID, passwd) => {
		setUserID(ID);
		setUserPasswd(passwd);
		localStorage.setItem(LOCALSTORAGE_USER_ID, ID);
		localStorage.setItem(LOCALSTORAGE_USER_PASSWD, passwd);
	};
	const removeUser = () => {
		setUserID('');
		setUserPasswd('');
		localStorage.removeItem(LOCALSTORAGE_USER_ID);
		localStorage.removeItem(LOCALSTORAGE_USER_PASSWD);
	};
  return (
    <div className="App">
        <Header userID={userID} removeUser={removeUser}/>
        <Router>
            <Switch>
                <Route path="/login">
                    <Login saveUser={saveUser}/>
                </Route>
				<Route path="/signup">
                    <Signup saveUser={saveUser}/>
                </Route>
				<Route path="/newpost">
					<NewPost />
				</Route>
                <Route exact path="/posts">
                    <PostList/>
                </Route>
                <Route path="/post/:id?">
                    <Post/>
                </Route>
                <Route path="/">
                    <PostList/>
                </Route>
            </Switch>
        </Router>
    </div>
  );
}

export default App;
