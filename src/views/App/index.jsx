import React from 'react'
import './app.less'
import LayOut from '@/views/Layout/index'
import Login from '@/views/Login/index'
import NoFound from '@/views//NoFound'
import { Route, Switch, Redirect } from 'react-router-dom'
export default function App() {
  return (
    <>
      <Switch>
        <Route path='/' component={Login} exact />
        <Route path='/layout' component={LayOut} />
        <Route path='/404' component={NoFound} />
        <Redirect to='/404' />
      </Switch>
      <Route path='/' component={Login} exact />
      {/* <Redirect from='/' to='/layout/blogs/createblogs' exact /> */}
      {/* <Redirect from='/' to='/layout/home' exact /> */}
    </>
  )
}
