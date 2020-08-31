import React, { Component } from 'react';
import './Login.scss';
import CompanyLogo from '../components/CompanyLogo/CompanyLogo';
import CompanyName from '../components/CompanyName/CompanyName';
import Input from '../components/Input/Input';
import LoginButton from '../components/LoginButton/LoginButton';

class Login extends Component {
    constructor(props) {
        super(props);
        
        this.login_states = {
            NODETAILS: {text: 'Please enter your details', color: 'grey'},
            NOEMAIL: {text: 'Please enter your email', color: 'grey'}, 
            NOPASSWORD: {text: 'Please enter your password', color: 'grey'}, 
            BADEMAIL: {text: 'Please enter a valid email', color: 'grey'},
            VALID: {text: 'Login', color: 'orange'}, 
            FAIL: {text: 'Either your email or password is incorrect', color: 'red'},
            SUCCESS: {text: 'Login Successful', color: 'green'}, 
            ADMIN: {text: 'Head to admin panel', color: 'purple'}, 
            LOGGEDIN: {text: 'Already logged in', color: 'purple'}
        }

        this.email = 'dummy@gmail.com';
        this.password = '123';

        this.state = { 
            login_state: this.login_states.NODETAILS, 
        }
    }

    componentDidMount() {
        this.switchState(this.login_states.NODETAILS); 
    }

    switchState = (login_state) => {
        this.setState({
            login_state 
        })
        

    }

    updateInput = (key, value) => {
        this.props.updateInput(key, value, this.validateDetails);
    }

    validateDetails = () => {
        if(this.validateEmail(this.props.email)) {
            if(this.validatePassword(this.props.password)) {
                this.switchState(this.login_states.VALID);
                return true;
            } else {
                this.switchState(this.login_states.NOPASSWORD);
            }
        } else {
            this.switchState(this.login_states.BADEMAIL);
        }
    }

    validateEmail = (email) => {
        const reg = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return reg.test(String(email).toLowerCase());
    }

    validatePassword = (password) => {
        if(!password) {
            return false;
        } else {
            return true;
        }
    }

    isCorrect = (email, password) => {
        if(email == this.email && password == this.password) {
            return true;
        } else {
            return false
        }
    }

    submit = () => {
        if(this.state.login_state != this.login_states.SUCCESS && this.state.login_state != this.login_states.ADMIN) {
            if(this.validateDetails()) {
                if(this.isCorrect(this.props.email, this.props.password)) {
                    this.runLogin();
                } else {
                    this.switchState(this.login_states.FAIL);
                }
            }
        }
    }

    runLogin = () => {
        if(!this.props.loggedin) {
            this.switchState(this.login_states.SUCCESS);
            this.props.updateInput('loggedin', true, () => console.log("Logged in"))
            setTimeout(() => {
                this.openAdmin();
            }, 1000)
        } else {
            this.switchState(this.login_states.LOGGEDIN);
        }
    }

    openAdmin = () => {
        this.props.history.push('/admin');
    }

    handleKeyDown = (e) => {
        if (e.key === 'Enter') {
          this.submit();
        }
    }

    render() {
        return ( 
            <div className='login-container'>
                <div className='login-content-container'>
                    <div className='login-content-logo-container'>
                        <CompanyLogo colors={this.props.colors}/>
                        <CompanyName colors={this.props.colors} />
                    </div>
                    <Input type={'text'} answerKey={'email'} answer={this.props.email} updateInput={this.updateInput} onKeyDown={this.handleKeyDown}/>
                    <Input type={'password'} answerKey={'password'} answer={this.props.password} updateInput={this.updateInput} onKeyDown={this.handleKeyDown}/>
                    <LoginButton onClick={this.submit} login_state={this.state.login_state} />
                </div>
            </div>
        )
    }
}
 
export default Login;