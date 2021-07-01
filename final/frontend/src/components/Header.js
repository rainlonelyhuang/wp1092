import "./Header.css";

export default function Header(props) {
    const onHomeClick = () => {
        window.location = "/";
    }
    const onLoginClick = () => {
        window.location = "/login";
    }
	const onSignupClick = () => {
		window.location = "/signup";
	}
	const onLogoutClick = () => {
		props.removeUser();
		window.location = "/";
	}
	const onPostClick = () => {
		window.location = "/newpost";
	}
    return (
        <div className="Header">
            <div onClick={onHomeClick} className="slogan">
                艾恩葛朗特
            </div>
            <div className="control">
				{ props.userID === ""? null: <div className= "button" onClick={onPostClick}> 發文 </div>}
                { props.userID === ""? <div className= "button" onClick={onLoginClick}> 登入 </div>: null }
                { props.userID === ""? <div className= "button" onClick={onSignupClick}> 註冊 </div>: null }
                { props.userID === ""? null: <div className= "button" onClick={onLogoutClick}> 登出 </div> }
				{ props.userID === ""? null: <div>hi, 星爆的 {props.userID}</div>}
            </div>
        </div>
    );
};