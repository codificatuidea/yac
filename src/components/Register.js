import React, {Component} from "react";
import {connect} from "react-redux";
import {Link} from "react-router-dom";
import axios from 'axios';
import Login from './Login';
import * as endpoint from '../constants/EndPoints'

class Register extends Component {

  state = {
    username: "",
    password: "",
    errors: ""
  }

  onSubmit = e => {
    e.preventDefault();
    const user = {
      username: this.state.username,
      password1: this.state.password1,
      password2: this.state.password2
    };

    axios.post(endpoint.SERVER+endpoint.REGISTER, { username:this.state.username, password1:this.state.password1, password2: this.state.password2 })
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
          <legend>Registro</legend>
          <p>
            <label htmlFor="username">Nickname: </label>
            <input
              type="text" id="username"
              onChange={e => this.setState({username: e.target.value})} />
          </p>
          <p>
            <label htmlFor="password1">Contraseña: </label>
            <input
              type="password" id="password1"
              onChange={e => this.setState({password1: e.target.value})} />
          </p>
          <p>
            <label htmlFor="password2">Confirmar contraseña: </label>
            <input
              type="password" id="password2"
              onChange={e => this.setState({password2: e.target.value})} />
          </p>
          <p id="errores">{this.state.errors}</p>
          <p>
            <button type="submit">Registrarme</button>
          </p>

          <p>
            Ya tienes una cuenta? <Link to="/">Inicia sesión</Link>
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

export default connect(mapStateToProps, mapDispatchToProps)(Register);
