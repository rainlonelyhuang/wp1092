import React, { Component } from "react";
import Header from "../components/Header";

class TodoApp extends Component {
    constructor(props)
    {
        super(props);
        this.state = {
            content: [],
            id: [],
            check: [],
            showContent: "All",
            count: 0,
        };
        this.pushContent = this.pushContent.bind(this);
        this.popContent = this.popContent.bind(this);
        this.dealCheck = this.dealCheck.bind(this);
        this.dealFooterButtons = this.dealFooterButtons.bind(this);
    }

    //在input field輸入完，按enter要push content
    pushContent(evt){
        if(evt.key == "Enter"){
            if(evt.target.value != "")
            {  
                this.setState(state => {
                    state.content.push(evt.target.value);
                    evt.target.value = "";
                    if(state.count == 0){
                        state.id.push("1");
                    }else{
                        let last_id = state.id[state.id.length-1];
                        state.id.push(String(+last_id+1));
                    }
                    state.check.push(false);
                    state.count++;
                    return {content: state.content, id: state.id, check: state.check, count: state.count};
                })
            }
        }
    }

    //在li內按x，要pop content
    popContent(evt){
        let pop_id = evt.target.parentElement.children[0]?.children[0]?.id;
        if(evt.target.tagName == "IMG")
        {
            this.setState(state => {
                let arr_index = state.id.indexOf(pop_id);
                state.content.splice(arr_index, 1);
                state.id.splice(arr_index, 1);
                if(!state.check[arr_index])state.count--;
                state.check.splice(arr_index, 1);
                return {content: state.content, id: state.id, check: state.check, count: state.count};
            });
        }
    }

    //被checked，要decrease count；被unchecked，要increase count
    dealCheck(evt){
        if(evt.target.type == "checkbox"){
            this.setState(state => {
                let arr_index = state.id.indexOf(evt.target.id);
                if(state.check[arr_index])
                {
                    state.check[arr_index] = false;
                    state.count++;
                }else{
                    state.check[arr_index] = true;
                    state.count--;
                }
                    return {check: state.check, count: state.count};
                });
        }
    }

    //按Active，會留下未完成的；按Completed，會留下完成的；按All，會留下全部
    dealFooterButtons(evt){
        this.setState(state => {
            switch(evt.target.innerText){
                case "All":
                    state.showContent = "All";
                    break;
                case "Active":
                    state.showContent = "Active";
                    break;
                case "Completed":
                    state.showContent = "Completed";
                    break;
                case "Clear completed":
                    state.showContent = "All";
                    state.content = state.content.filter((item, index) => state.check[index]==false);
                    state.id = state.id.filter((item, index) => state.check[index]==false);
                    state.check = state.check.filter(item => item==false);
                    break;
            }
            return {content: state.content, id: state.id, check: state.check, showContent: state.showContent};
        });
    }

    render() {
        return (
            <div>
                <Header text="todos" />
                <section className="todo-app__main">
                    <input placeholder="What needs to be done?"  onKeyPress={this.pushContent} className="todo-app__input"/>
                    <div onChange={this.dealCheck} onClick={this.popContent}>
                        <List Content={this.state.content} Id={this.state.id} Check={this.state.check} ShowContent={this.state.showContent}/>
                    </div>
                    <div onClick={this.dealFooterButtons}>
                        <Footer Count={this.state.count} All_item_number={this.state.content.length} Display={!!this.state.content.length}/>
                    </div>
                </section>
            </div>
        );
    }
}

function List (props){

    return(
        <ul className="todo-app__list" id="todo-list">
            {props.Content.map((value, idx) => <List_Content Value={value} Index={props.Id[idx]} isChecked={props.Check[idx]} ShowContent={props.ShowContent}/>)}
        </ul>
    );
}

function List_Content (props){

    let returnJSX = (
        <li className="todo-app__item">
            <div className="todo-app__checkbox">
                <input type="checkbox" checked={props.isChecked} id={props.Index}/>
                <label for={props.Index}/>
            </div>
            <h1 style={props.isChecked ? {textDecoration: "line-through", opacity: 0.5} : {}} className="todo-app__item-detail">
                {props.Value}
            </h1>
            <img src="./img/x.png" className="todo-app__item-x"/>
        </li>
    );
    
    switch(props.ShowContent){
        case "All":
            return returnJSX;
        case "Active":
            if(props.isChecked)return null;
            else return returnJSX;
        case "Completed":
            if(props.isChecked)return returnJSX;
            else return null;
    }
}

function Footer (props){
    if(props.Display)
    {
        return(
            <footer className="todo-app__footer" id="todo-footer">
                <div className="todo-app__total">{String(props.Count)+"left"}</div>
                <ul className="todo-app__view-buttons">
                    <li>
                        <button>All</button>
                    </li>
                    <li>
                        <button>Active</button>
                    </li>
                    <li>
                        <button>Completed</button>
                    </li>
                </ul>
                <div className="todo-app__clean">
                    <button style={(props.All_item_number-props.Count) ? {}: {visibility: "hidden"}}>Clear completed</button>
                </div>
            </footer>
        );
    }else return null;
}

export default TodoApp;
