import React, { Component } from 'react';
import io from "socket.io-client";
import './index.css';


class trivia extends Component {
    constructor(props) {
        super(props);

        this.state = {
            messages: [],
            users: [],
            input: '',
            isTyping: ''
        }
        this.socket = io('/trivia');
        this.socket.on('connect', () => {
            this.socket.emit('signin', {username: this.props.username});
            this.socket.on('userlist', this.updateUsers);
        })
    }

    setStatus = (message) => {
        debugger
        this.setState({ status: message });
    }

    updateUsers = (userList) => {
        this.setState({ users: userList })
    }

    userList = () => {
        let _this = this;
        let userElements = [];
        debugger
        this.state.users.forEach(user => {
            let userElement =
                <div>
                    <span className='trivia-userlist-username' key={user.userId}>{user.username}</span>
                </div>
            userElements.push(userElement);
        })
        return (userElements);
    }

    onKeyPress = (e) => {
        if (e.charCode === 13) {
            this.sendMessage(e);
        }
    }

    onChange = (e) => {
        this.setState({ input: e.target.value })
    }

    componentDidUpdate() {
    }

    componentWillUnmount() {
        this.socket.disconnect();
    }

    render() {
        return (
            <div className='trivia'>
                <div className='trivia-content'>
                    <div className='trivia-userlist'>
                        <div className='trivia-userlist-title'>Active Users</div>
                        {this.userList()}
                    </div>
                    <div className='trivia-question'>
                    </div>
                </div>
                <div className='trivia-input'>
                    <input className='trivia-input-text' onKeyPress={this.onKeyPress} onChange={this.onChange} value={this.state.input} />
                    <button className='trivia-input-send' onClick={this.sendMessage}>Send</button>
                    <div className='trivia-clear'></div>
                </div>
            </div>
        )
    }
}

export default trivia;
