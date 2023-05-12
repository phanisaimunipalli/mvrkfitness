import React, { Component } from 'react'
import AuthService from '../services/auth.service'
import { Navigate } from 'react-router-dom'

export default class Home extends Component {
  constructor(props) {
    super(props)

    this.state = {
      redirect: null,
    }
  }

  componentDidMount() {
    const currentUser = AuthService.getCurrentUser()
    if (!currentUser) {
      this.setState({ redirect: '/login' })
      return
    } else {
      console.log('currentUser', currentUser.roles[0] === 'ROLE_ADMIN')
      if (currentUser.roles[0] === 'ROLE_ADMIN') {
        this.setState({ redirect: '/admin' })
      } else {
        this.setState({ redirect: '/user' })
        return
      }
    }
  }

  render() {
    if (this.state.redirect) {
      return <Navigate to={this.state.redirect} />
    }
  }
}
