import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { createStore, applyMiddleware } from 'redux'
import createSagaMiddleware from 'redux-saga'
import {Route, Switch, BrowserRouter} from 'react-router-dom';

import './index.css'
import Yac from './Yac'
import Login from './Login'
import Register from './Register'
import registerServiceWorker from './registerServiceWorker'
import reducers from './reducers'
import handleNewMessage from './sagas'
import setupSocket from './sockets'
import userData from './utils/name'
import axios from 'axios';

const sagaMiddleware = createSagaMiddleware()
const username = userData.nickname;
const userId = userData.id;

const store = createStore(
  reducers,
  applyMiddleware(sagaMiddleware)
)

axios.defaults.withCredentials = true;

const socket = setupSocket(store.dispatch, username, userId)

sagaMiddleware.run(handleNewMessage, { socket, username, userId })

ReactDOM.render(
  <Provider store={store}>
        <BrowserRouter>
          <Switch>
            <Route exact path="/" component={Login} />
            <Route exact path="/signup" component={Register} />
            <Route exact path="/chat" component={Yac} />
          </Switch>
        </BrowserRouter>
      </Provider>,
  document.getElementById('root')
)
registerServiceWorker()
