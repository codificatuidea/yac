import React, {Component} from "react";
import {connect} from "react-redux";
import { Link } from "react-router-dom";
import axios from 'axios';
import * as endpoint from '../constants/EndPoints'
import * as link from '../constants/Links'

class Login extends Component {

  state = {
    username: "",
    password: "",
    errors: ""
  }

  onSubmit = e => {
    e.preventDefault();
    const user = {
      username: this.state.username,
      password: this.state.password
    };

    axios.post(endpoint.SERVER+endpoint.TO_LOGIN, user)
      .then((res => {
        this.currentUser();
      }),
      (error) => {
        var errorsString = "";
        for(let a in error.response.data) {
          if (error.response.data[a]) {
            errorsString += " --- "+a+": "+error.response.data[a];
          }
        }
        this.setState({ errors: errorsString });
      });
  }

  currentUser() {
    axios.get(endpoint.SERVER+endpoint.TO_CURRENT_USER, {})
    .then((response) => {
      console.log(response);
        var userData = {
          id: response.data.pk,
          nickname: response.data.username
        };

        localStorage.setItem("userData", JSON.stringify(userData));
        this.props.history.push(link.LINK_CHAT)
      },
      (error) => {
        console.log(error.response.status);
      }
    );

  }

  render() {
    return (
      <form onSubmit={this.onSubmit}>
        <fieldset class="m10">
          <legend>Login</legend>
          <p>
            <label htmlFor="username">Nickname: </label>
            <input
              type="text"
              id="username"
              onChange={e => this.setState({username: e.target.value})} />
          </p>
          <p>
            <label htmlFor="password">Password: </label>
            <input
              type="password"
              id="password"
              onChange={e => this.setState({password: e.target.value})} />
          </p>
          <p id="errores">{this.state.errors}</p>
          <p>
            <button type="submit">Login</button>
          </p>

          <p>
          You are not yet registered? <Link to="/signup">Sign up</Link>
          </p>
        </fieldset>
      </form>
    )
  }
}

const mapStateToProps = state => {
  return {};
}

const mapDispatchToProps = dispatch => {
  return {};
}

export default connect(mapStateToProps, mapDispatchToProps)(Login);
