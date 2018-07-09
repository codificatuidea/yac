import React from "react"
import PropTypes, { instanceOf } from "prop-types"
import axios from 'axios'
import { Redirect } from "react-router-dom";
import * as endpoint from '../constants/EndPoints'

const Sidebar = ({ users }) => {

  return (
    <aside id="sidebar" className="sidebar">
      <button type="button" onClick={(e) => {

        function getCookie(name) {
          var regexp = new RegExp("(?:^" + name + "|;\s*"+ name + ")=(.*?)(?:;|$)", "g");
          var result = regexp.exec(document.cookie);
          return (result === null) ? null : result[1];
        }

        const csrftoken = getCookie('csrftoken');

        var config = {
          headers: { 'X-CSRFTOKEN': csrftoken }
        };

        axios.post(endpoint.SERVER+endpoint.LOGOUT, {}, config)
        .then((response) => {
            window.localStorage.clear();
            document.location.href='/';
          },
          (error) => {
            var status = error.response.status
          }
        );

      }}>Cerrar sesión</button>
      <ul>
        {users.map(user => (
          <li key={user.id}>{user.name}</li>
        ))}
      </ul>
    </aside>
)}

Sidebar.propTypes = {
  users: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired,
    }).isRequired
  ).isRequired
}

export default Sidebar
