import React, { Component } from "react";
import axios from "axios";
// import swal from "sweetalert2";
import { connect } from "react-redux";
import { updateUser } from "../../ducks/reducer";
// import Nav from '../Nav/Nav'

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
      <div>

        <p> Username</p>
        <input
          value={this.state.username}
          onChange={e => this.handleChange(e, "username")}
        ></input>
        <p> Password </p>
        <input
          type='password'
          value={this.state.password}
          onChange={e => this.handleChange(e, "password")}
        ></input>
        <div>
          <button onClick={this.login}> login </button>
         <button onClick={this.register}> register </button>
        </div>
      </div>
    );
  }
}

export default connect(
  null,
  { updateUser }
)(Auth);
