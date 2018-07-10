import React from "react"
import PropTypes from "prop-types"
import axios from 'axios'
import * as endpoint from '../constants/EndPoints'
import * as link from '../constants/Links'

const Sidebar = ({ users }) => {

  return (
    <aside id="sidebar" className="sidebar">
      <button type="button" onClick={(e) => {

        function getCookie(name) {
          var regexp = new RegExp("(?:^" + name + "|;*"+ name + ")=(.*?)(?:;|$)", "g");
          var result = regexp.exec(document.cookie);
          return (result === null) ? null : result[1];
        }

        const csrftoken = getCookie('csrftoken');

        var config = {
          headers: { 'X-CSRFTOKEN': csrftoken }
        };

        axios.post(endpoint.SERVER+endpoint.TO_LOGOUT, {}, config)
        .then((response) => {
            window.localStorage.clear();
            document.location.href=link.LINK_LOGIN;
          },
          (error) => {
            console.log(error.response.status);
          }
        );

      }}>Logout</button>
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
