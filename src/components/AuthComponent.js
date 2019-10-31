import React, {Component} from 'react';
import {connect} from 'react-redux';
import {setUser} from '../ducks/reducer';
import {Redirect} from 'react-router-dom';
import axios from 'axios';

class AuthComponent extends Component {
    constructor(props){
        super(props)
        this.state = {
            username: '',
            password: '',
            email: '',
            register: true
        }
        this.register = this.register.bind(this);
        this.login = this.login.bind(this);
    }

    async register(){
        const {username, password, email} = this.state;
        const registeredUser = await axios.post('/auth/register', {username, password, email});
        this.props.setUser(registeredUser.data);
    }

    async login(){
        const {password, email} = this.state;
        const loggedInUser = await axios.post('/auth/login', {password, email});
        this.props.setUser(loggedInUser.data);
    }

    render(){
        const {username, password, email, register} = this.state;
        return this.props.user ?
            (<Redirect to='profile' />)
            : (<div className='auth-container'>
                <form onSubmit={(e) => {
                    e.preventDefault();
                    if(register){
                        this.register();
                    } else {
                        this.login();
                    }
                }}>
                    {register && (
                        <div>
                            <label>Username</label>
                            <input type='username' value={username} onChange={(e) => this.setState({
                                username: e.target.value
                            })} />
                        </div>
                    )}
                    <div>
                        <label>Password</label>
                        <input type='password' value={password} onChange={(e) => this.setState({
                            password: e.target.value
                        })} />
                    </div>
                    <div>
                        <label>Email</label>
                        <input type='email' value={email} onChange={(e) => this.setState({
                            email: e.target.value
                        })} />
                    </div>
                    <button>Submit</button>
                </form>
                {!register && <button onClick={() => this.setState({register: true})}>Go to Register</button>}
                {register && <button onClick={() => this.setState({register: false})}>Go to Login</button>}
            </div>
        )
    }
};

function mapReduxSateToProps(reduxState){
    return reduxState;
};

const mapDispatchToProps = {
    setUser
};

const enhancedComponent = connect(
    mapReduxSateToProps,
    mapDispatchToProps
    );

export default enhancedComponent(AuthComponent);