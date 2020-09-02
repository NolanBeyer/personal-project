import React, {Component} from 'react'
import axios from 'axios'
import { connect } from "react-redux";
import { loginUser } from '../../redux/reducer';
import './Auth.css'

class Auth extends Component{
    constructor(){
        super()

        this.state = {
            first_name: '',
            last_name: '',
            email: '',
            password: '',
            newUser: false
        }
    }

    register = () => {
        const {firstName, lastName, email, password} = this.state
        axios.post('/auth/register', {firstName, lastName, email, password}).then((res) => {
            this.props.loginUser(res.data)
            this.props.history.push('/dashboard')
        }).catch((err) =>{
            console.log(err)
            alert('User already exists')
        })
    }

    login = () => {
        const {email, password} = this.state
        axios.post('/auth/login', {email, password}).then((res) => {
            this.props.loginUser(res.data)
            this.props.history.push('/dashboard')
        }).catch(err => {
            console.log(err)
            alert('Incorrect email or password')
        })
    }

    toggle = () => {
        this.setState({newUser: !this.state.newUser})
    }

    changeHandler = (e) => {
        this.setState({[e.target.name]: e.target.value})
    }
    
    render(){
        const {firstName, lastName, email, password} = this.state
        return (
          <div className="container">
              <h1>Login</h1>
                {!this.state.newUser ? (
                  
                  <div id="inputs">
                    <input className="inputs"
                      name="email"
                      type="text"
                      value={email}
                      placeholder="Email"
                      onChange={(e) => this.changeHandler(e)}
                    ></input>
                    <input className="inputs"
                      name="password"
                      type="password"
                      value={password}
                      placeholder="Password"
                      onChange={(e) => this.changeHandler(e)}
                    ></input>
                    <div id="buttons">
                      <button className="buttons" onClick={this.login}>Login</button>
                      <button className="buttons" onClick={this.toggle}>Register</button>
                    </div>
                  </div>
                ) : (
                  <div>
                    <input className="inputs"
                      name="firstName"
                      type="text"
                      value={firstName}
                      placeholder="First Name"
                      onChange={(e) => this.changeHandler(e)}
                    ></input>
                    <input
                    className="inputs"
                    name="lastName"
                    type="text"
                    value={lastName}
                    placeholder="Last Name"
                    onChange={(e) => this.changeHandler(e)}
                    ></input>
                    <input
                      className="inputs"
                      name="email"
                      type="email"
                      value={email}
                      placeholder="Email"
                      onChange={(e) => this.changeHandler(e)}
                    ></input>
                    <input
                     className="inputs"
                      name="password"
                      type="password"
                      value={password}
                      placeholder="Password"
                      onChange={(e) => this.changeHandler(e)}
                    ></input>
                    <div id="buttons">
                      <button className="buttons" onClick={this.register}>Register</button>
                      <button className="buttons" onClick={this.toggle}>Already A User</button>
                    </div>
                  </div>
                )}
              </div>
          );
        }
      }
  
const mapStateToProps = (state) => state;

export default connect(mapStateToProps, { loginUser })(Auth);  
