import React, { Component } from 'react';
import './Yac.css';
import { Sidebar } from "./containers/Sidebar"
import { Provider } from 'react-redux'
import { MessagesList } from "./containers/MessagesList"
import { AddMessage } from "./containers/AddMessage"
import { createStore, applyMiddleware } from 'redux'
import createSagaMiddleware from 'redux-saga'
import handleNewMessage from './sagas'
import setupSocket from './sockets'
import reducers from './reducers'
import * as link from './constants/Links'

class Yac extends Component {

  render() {
    if (!window.localStorage['userData']) {
      document.location.href=link.LINK_LOGIN;
    }

    const userData = JSON.parse(window.localStorage['userData']);
    const sagaMiddleware = createSagaMiddleware()
    const username = userData.nickname;
    const userId = userData.id;

    const store = createStore(
      reducers,
      applyMiddleware(sagaMiddleware)
    )

    const socket = setupSocket(store.dispatch, username, userId)

    sagaMiddleware.run(handleNewMessage, { socket, username, userId })


    return (
      <Provider store={store}>
      <div id="container">
        <Sidebar />
        <section id="main">
          <MessagesList />
          <AddMessage />
        </section>
      </div>
      </Provider>
    );
  }
}

export default Yac;
