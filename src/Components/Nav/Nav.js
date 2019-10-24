
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

    // componentDidMount() {
    //     axios.post('/auth/login').then(res =>{
    //         this.props.updateUser(res.data)
    //     })
    // }


  logout(){
    axios.post('/auth/logout') 
      .catch(err => console.log(err))
  }

    render() {
        console.log(this.props)

        return (
          <div className='nav-bar'>

        {this.props.location.pathname !== '/' ? (
            
          
              <div className='nav-box'>
                <div className='nav-button-container'>
                  <Link to= '/dashboard' ><button>Home</button></Link>
                  <Link to= '/new' ><button>New Post</button></Link>              
                  <Link to= '/' ><button onClick={this.logout}>Logout</button></Link>
                </div>
                <div className='nav-profile-info'>
                <img src = {this.props.user.user.profile_pic} alt='profile pic'/>
                  <h3> {this.props.user.user.username} </h3>
                  <h3>User: {this.props.user.user.id}</h3>
                
                </div>

                </div>
       
              
          ) :(null)}
       </div>
        )}
      
}

  function mapStateToProps(state) {
   return state
  };
  
export default withRouter(connect(mapStateToProps, {updateUser, logout})(Nav)); 