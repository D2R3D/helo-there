import React, { Component } from 'react'

export default class Dashboard extends Component {
    constructor(props) {
        super(props) 
        this.state = {
            posts: [],
            search: '',
            usersposts: true
        }
    }

    handleChange = (e, key) => {
        this.setState({
            [key]: e.target.value
        })
    }


    render() {
        
        return (
            <div>
    
                Dash
            </div>
        )
    }
}
