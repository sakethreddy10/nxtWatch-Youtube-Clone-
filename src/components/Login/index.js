import {Component} from 'react'

import Cookies from 'js-cookie'

import {Redirect} from 'react-router-dom'

import './index.css'

class Login extends Component {
  state = {
    username: '',
    password: '',
    showPassword: false,
    showSubmitError: false,
    errorMsg: '',
  }

  onSubmitSuccess = jwtToken => {
    const {history} = this.props
    Cookies.set('jwt_token', jwtToken, {
      expires: 30,
    })
    history.replace('/')
  }

  onSubmitFailure = errorMsg => {
    this.setState({showSubmitError: true, errorMsg})
  }

  onSubmit = async event => {
    event.preventDefault()
    const url = 'https://apis.ccbp.in/login'
    const {username, password} = this.state
    const userDetails = {username, password}
    const options = {
      method: 'POST',
      body: JSON.stringify(userDetails),
    }
    const response = await fetch(url, options)
    const data = await response.json()
    if (response.ok === true) {
      this.onSubmitSuccess(data.jwt_token)
    } else {
      this.onSubmitFailure(data.error_msg)
    }
  }

  onChangeUserName = event => {
    this.setState({username: event.target.value})
  }

  onChangePassword = event => {
    this.setState({password: event.target.value})
  }

  onToggle = event => {
    this.setState({showPassword: event.target.checked})
  }

  render() {
    const {
      username,
      password,
      showPassword,
      showSubmitError,
      errorMsg,
    } = this.state
    const jwtToken = Cookies.get('jwt_token')
    if (jwtToken !== undefined) {
      return <Redirect to="/" />
    }
    return (
      <div className="container-element">
        <div className="card-element">
          <h1 className="lh">Login</h1>
          <form className="form-element" onSubmit={this.onSubmit}>
            <label htmlFor="username" className="h">
              Username
            </label>
            <input
              type="text"
              className="input-element"
              id="username"
              onChange={this.onChangeUserName}
              value={username}
            />
            <label htmlFor="password" className="h">
              Password
            </label>
            <input
              type={showPassword ? 'text' : 'password'}
              className="input-element"
              id="password"
              onChange={this.onChangePassword}
              value={password}
            />
            <div className="z">
              <input
                type="checkbox"
                id="abc"
                className="c"
                onChange={this.onToggle}
              />
              <label htmlFor="abc" className="s">
                ShowPassword
              </label>
            </div>
            <button type="submit" className="b">
              Login
            </button>
            {showSubmitError && <p className="p">{errorMsg}</p>}
          </form>
        </div>
      </div>
    )
  }
}

export default Login
