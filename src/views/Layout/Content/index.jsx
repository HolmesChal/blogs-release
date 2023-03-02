import React, { useState, useEffect } from 'react'
import { Layout, Breadcrumb } from 'antd'
import './Content.less'
import '@/common/common.css'
import { Route, Switch, HashRouter, BrowserRouter, Link, withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import { flatHandle, pushrouter } from '@/utils/common'
import { getUserPermission } from '@/utils/request'
import { router } from '@/router'
const { Content } = Layout
const Router =
  process.env.NODE_ENV === 'development' ? HashRouter : BrowserRouter
function ContentLayOut(props) {
  const { location } = props
  const [routepath, setrouterPath] = useState()
  const [routerList, setRouterList] = useState([])
  const [permission, setPermission] = useState()
  useEffect(async () => {
    let config = {
      userlistId: props.userinfo.id
    }
    setrouterPath(pushrouter(location.pathname, router))
    setRouterList(flatHandle(router))
    let { data } = await getUserPermission(config)
    setPermission(data[0])
  }, [location.pathname])
  return (
    <Content className='site-layout-background content scrollclass'>
      <Breadcrumb style={{ margin: '10px 0' }}>
        {
          !!routepath ? routepath.map(item => (
            <Breadcrumb.Item key={item.path}>
              <Link to={item.path}>{item.breadcrumbName}</Link>
            </Breadcrumb.Item>
          )) : ''
        }
      </Breadcrumb>
      <Router>
        <Switch>
          {
            routerList ? routerList.map((item, index) => {
              if (permission && permission[item.flag]) {
                return <Route path={item.path} component={item.component} exact key={index} />
              }
            }) : ''
          }

        </Switch>
      </Router>
    </Content>
  )
}
const mapStateToProps = function (state) {
  return state
}
const mapDispatchToProps = function (dispatch) {
  return {}
}
export default ContentLayOut = connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(ContentLayOut))