import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { createStore } from 'redux'
import {Route, Switch, BrowserRouter} from 'react-router-dom';

import './index.css'
import Yac from './Yac'
import Login from './components/Login'
import Register from './components/Register'
import registerServiceWorker from './registerServiceWorker'
import reducers from './reducers'
import axios from 'axios';

const store = createStore(
  reducers
)

axios.defaults.withCredentials = true;

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
