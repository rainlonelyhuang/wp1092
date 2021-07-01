import {
    BrowserRouter as Router,
    Switch,
    Route,
} from "react-router-dom";

import Login from './containers/Login';
import Signup from './containers/Signup';
import Header from './components/Header';
import { useState } from 'react';

import PostList from './containers/PostList';
import Post from './containers/Post';

const LOCALSTORAGE_KEY = 'userID';
function App() {
	const [userID, setUserID] = useState(localStorage.getItem(LOCALSTORAGE_KEY) || '');
	const saveUserID = (ID) => {
		setUserID(ID);
		localStorage.setItem(LOCALSTORAGE_KEY, ID);
	};
	const removeUserID = () => {
		setUserID('');
		localStorage.removeItem(LOCALSTORAGE_KEY);
	};
  return (
    <div className="App">
        <Header userID={userID} removeUserID={removeUserID}/>
        <Router>
            <Switch>
                <Route path="/login">
                    <Login saveUserID={saveUserID}/>
                </Route>
				<Route path="/signup">
                    <Signup saveUserID={saveUserID}/>
                </Route>
                <Route exact path="/posts">
                    <PostList/>
                </Route>
                <Route path="/post/:id?">
                    <Post/>
                </Route>
                <Route path="/">
                    null
                </Route>
            </Switch>
        </Router>
    </div>
  );
}

export default App;
