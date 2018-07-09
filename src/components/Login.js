import React, {Component} from "react";
import {connect} from "react-redux";
import { Redirect, Link } from "react-router-dom";
import axios from 'axios';
import * as endpoint from '../constants/EndPoints'

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

    axios.post(endpoint.SERVER+endpoint.LOGIN, user)
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
    axios.get(endpoint.SERVER+endpoint.CURRENT_USER, {})
    .then((response) => {
      console.log(response);
        var userData = {
          id: response.data.pk,
          nickname: response.data.username
        };

        localStorage.setItem("userData", JSON.stringify(userData));
        this.props.history.push('/chat')
      },
      (error) => {
        var status = error.response.status
      }
    );

  }

  render() {
    return (
      <form onSubmit={this.onSubmit}>
        <fieldset>
          <legend>Inicia sesión</legend>
          <p>
            <label htmlFor="username">Nickname: </label>
            <input
              type="text"
              id="username"
              onChange={e => this.setState({username: e.target.value})} />
          </p>
          <p>
            <label htmlFor="password">Contraseña: </label>
            <input
              type="password"
              id="password"
              onChange={e => this.setState({password: e.target.value})} />
          </p>
          <p id="errores">{this.state.errors}</p>
          <p>
            <button type="submit">Iniciar sesión</button>
          </p>

          <p>
            No estas registrado? <Link to="/signup">Regístrate</Link>
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
