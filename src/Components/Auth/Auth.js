import React, {Component} from 'react';
import axios from 'axios';

class Auth extends Component {
    constructor(){
        super();
        this.state = {
            username: '',
            password: ''
        }
    }

    handleLogin = () => {
        const {username, password} = this.state
        axios.post('/auth/login', {username, password})
            .then((res) => {
                this.props.history.push('/dashboard');
            })
            .catch((err) => {
                console.log(err);
            });
    }

    handleRegister = () => {
        const {username, password} = this.state
        axios.post('/auth/register', {username, password})
            .then((res) => {
                this.props.history.push('/dashboard');
            })
            .catch((err) => {
                console.log(err);
            });
    }

    handleInput = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    render(){
        return(
            <div>
                <div>
                    <p>Username:</p>
                    <input type='text' name='username' value={this.state.username} onChange={this.handleInput} />
                </div>
                <div>
                    <p>Password:</p>
                    <input type='password' name='password' value={this.state.password} onChange={this.handleInput} />
                </div>
                <div>
                    <button onClick={this.handleLogin}>Login</button>
                    <button onClick={this.handleRegister}>Register</button>
                </div>
            </div>
        )
    }
}

export default Auth;