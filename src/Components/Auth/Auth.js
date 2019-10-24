import React, { Component } from "react";
import axios from "axios";
// import swal from "sweetalert2";
import { connect } from "react-redux";
import { updateUser } from "../../ducks/reducer";
import './Auth.css'
import logo from './../../assets/Helo.png'

class Auth extends Component {
  constructor(props) {
    super(props);
    this.state = {
        username: '',
        password: '',

    }
}
handleChange = (e, key) => {
    this.setState({
        [key]: e.target.value
    })
}

register = async () => {
    const {username, password} = this.state
    const profile_pic =`https://robohash.org/${username}`;
    const res = await axios.post('/auth/register', {username, password, profile_pic})
    this.props.updateUser(res.data.user)
    this.props.history.push('/dashboard')
}

login = async () => {
    const {username, password} = this.state
   const res = await axios.post('/auth/login', {username, password})
   this.props.updateUser(res.data.user)
   this.props.history.push('/dashboard')

}


  render() {
    return (
      <div className ='register-page'>

      <div className='register-form'>
     
     <div>  
       <img src ={logo} alt='logo-img' ></img>
        <h1> Helo </h1>
        </div>  

        <div>
        <p> Username: <span>
        <input className ='inputs'
          value={this.state.username}
          onChange={e => this.handleChange(e, "username")}
        ></input> </span> </p>
        <p> Password:  <span>
        <input className ='inputs'
          type='password'
          value={this.state.password}
          onChange={e => this.handleChange(e, "password")}
        ></input> </span> </p>

</div>

        <div>
          <button className ='auth-btns' onClick={this.login}> Login </button>
         <button className ='auth-btns' onClick={this.register}> Register </button>

        </div>
        </div>
      </div>
    );
  }
}

export default connect(
  null,
  { updateUser }
)(Auth);
