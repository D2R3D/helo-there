
import React, { Component } from 'react';
import { withRouter, Link } from 'react-router-dom'; 
import { connect } from 'react-redux'; 
import './Nav.css';
import {updateUser, logout} from '../../ducks/reducer'
import axios from 'axios'; 

class Nav extends Component {
    constructor(props) {
        super(props)
        this.logout = this.logout.bind(this)
    }

    componentDidMount() {
        axios.post('/auth/login').then(res =>{
            this.props.updateUser(res.data)
        })
    }


  logout(){
    axios.post('/auth/logout') 
      .catch(err => console.log(err))
  }

    render() {
        console.log(this.props)
        if (this.props.location.pathname !== '/') {
            return (
                <div className="Navbar">
                <div className='nav-button-container'>
                  <Link to= '/dashboard' ><button>Home</button></Link>

                  {/* <div className='nav_profile_pic' style={{ backgroundImage: `url('${this.props.profileic}')` }}></div> */}


                  <Link to= '/new' ><button>New Post</button></Link>              
                  <Link to= '/' ><button onClick={this.logout}>Logout</button></Link>
                </div>
                <div className='nav-profile-info'>
                  <h3> Name: {this.props.username} </h3>
                  <h3>Id: {this.props.id}</h3>
                  <img src = {this.props.profile_pic} alt='profile pic'/>
                </div>
          </div>
              
          )
      
      } else {
          return null
      }
  };
}

function mapStateToProps(state) {
    return state;
  };
export default withRouter(connect(mapStateToProps, {updateUser, logout})(Nav)); 