import React from 'react'
import {
    render
} from 'react-dom'
import App from '@/views/App/index'
import {Provider} from 'react-redux'
import store from '@/store/index'
import {HashRouter,BrowserRouter} from 'react-router-dom'
import 'antd/dist/antd.css'
const Router = process.env.NODE_ENV === 'development' ? HashRouter : BrowserRouter
render( 
  <Provider store={store}>
    <Router>
      <App/>
    </Router>
  </Provider>
, document.getElementById('app'))