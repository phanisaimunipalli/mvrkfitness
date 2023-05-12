import React, { Component } from 'react'

import UserService from '../services/user.service'
import EventBus from '../common/EventBus'
import AuthService from '../services/auth.service'
import { Navigate } from 'react-router-dom'
import { MembersListView } from './members-list.component'
import Register from './register.component'
import AddClass from './classForm'

export default class BoardAdmin extends Component {
  constructor(props) {
    super(props)

    this.handler = this.handler.bind(this)

    this.state = {
      redirect: null,
      content: '',
      members: [],
      showAddMemberForm: false,
      showAddClassForm: false,
    }
    this.handleAddMemberClick = this.handleAddMemberClick.bind(this)
    this.handleAddClassClick = this.handleAddClassClick.bind(this)
  }

  handler() {
    this.fetchData()
  }

  handleAddMemberClick() {
    this.setState({ showAddMemberForm: true })
  }
  handleAddClassClick() {
    this.setState({ showAddClassForm: true })
  }

  fetchData() {
    UserService.getAdminBoard().then(
      (response) => {
        this.setState({
          // store file in order of their update time.
          members: response.data,
        })
      },
      (error) => {
        this.setState({
          content:
            (error.response &&
              error.response.data &&
              error.response.data.message) ||
            error.message ||
            error.toString(),
        })

        if (error.response && error.response.status === 401) {
          EventBus.dispatch('logout')
        }
      },
    )
  }

  componentDidMount() {
    const currentUser = AuthService.getCurrentUser()
    if (!currentUser) {
      this.setState({ redirect: '/home' })
      return
    }
    this.fetchData()
  }

  render() {
    if (this.state.redirect) {
      return <Navigate to={this.state.redirect} />
    }

    return (
      <div className="container">
        <header className="jumbotron content_border">
          <div>
            <h2 className="inline_text">Admin Board!</h2>
            <h3>{this.state.content}</h3>
          </div>
        </header>
        <div>
          <div className="headBtn">Member Management</div>
          <div className="text-center">
            <button onClick={this.handleAddMemberClick}>
              Add Member
              {this.state.showAddMemberForm && <Register />}
            </button>
          </div>
          <div className="text-center">
            <button onClick={this.handleAddClassClick}>
              Add Class
              {this.state.showAddClassForm && <AddClass />}
            </button>
          </div>
          <MembersListView
            members={this.state.members}
            handler={this.handler}
          />
        </div>
      </div>
    )
  }
}
