import React, { useState, useEffect, useCallback } from 'react'
import { Layout, Menu } from 'antd'
import {
  MenuFoldOutlined,
  UserOutlined,
  VideoCameraOutlined,
  UploadOutlined
} from '@ant-design/icons'
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import './Sider.less'
import '@/common/common.css'
import { getUserPermission } from '@/utils/request'
const { SubMenu } = Menu
const { Sider } = Layout
function SiderLayOut(props) {
  const [current, setCurrent] = useState('/layout/home')
  const [openKeys, setOpenItem] = useState([])
  const [permission, setPermission] = useState()
  // 路由跳转
  const routerPush = e => {
    props.history.push(e?.key ?? '/layout/home')
  }
  // menu展开
  const openChange = openKeys => {
    setOpenItem(openKeys)
  }

  // 路由数据持久化
  const routePersist = useCallback(() => {
    let Re = /\/[a-z]+\/[a-z]+/gi
    let Reres = Re.exec(props.location.pathname)[0]
    let openKeys = Reres.split('/').slice(-1)
    return openKeys
  }, [props.location.pathname])

  useEffect(async () => {
    let config = {
      userlistId: props.userinfo.id
    }
    let { data } = await getUserPermission(config)
    setPermission(data[0])
    setCurrent(props.location.pathname)
    setOpenItem(routePersist())
  }, [props.location.pathname])

  return (
    <Sider
      trigger={null}
      collapsible
      collapsed={props.collapsed}
      className='sider scrollclass'
    >
      <div className='logo'>
        {!props.collapsed && <span className='app-title'>博客发布系统</span>}
      </div>
      <Menu
        theme='dark'
        mode='inline'
        selectedKeys={[current]}
        openKeys={openKeys}
        onOpenChange={openChange}
      >
        {
          permission?.datam ? <Menu.Item
            key='/layout/home'
            icon={<UserOutlined />}
            onClick={routerPush}
          >
            数据首页
          </Menu.Item> : ''
        }
        {
          permission?.blogsm ? <SubMenu key='blogs' icon={<UploadOutlined />} title='博客管理'>
            <Menu.Item key='/layout/blogs' onClick={routerPush}>
              博客列表
            </Menu.Item>
            <Menu.Item key='/layout/blogs/createblogs' onClick={routerPush}>
              编写博客
            </Menu.Item>
            <Menu.Item key='/layout/blogs/drafts' onClick={routerPush}>
              草稿箱
            </Menu.Item>
          </SubMenu> : ''
        }
        {
          permission?.userm ? <SubMenu key='user' icon={<UserOutlined />} title='用户管理'>
            <Menu.Item key='/layout/user' onClick={routerPush}>
              用户列表
            </Menu.Item>
            <Menu.Item key='/layout/user/createuser' onClick={routerPush}>
              创建用户
            </Menu.Item>
          </SubMenu> : ''
        }
        {
          permission?.permissionm ? <SubMenu
            key='permission'
            icon={<VideoCameraOutlined />}
            title='权限管理'
          >
            <Menu.Item key='/layout/permission' onClick={routerPush}>
              权限列表
            </Menu.Item>
          </SubMenu> : ''
        }
        {
          permission?.releasem ? <SubMenu key='release' icon={<MenuFoldOutlined />} title='发布管理'>
            <Menu.Item key='/layout/release' onClick={routerPush}>
              已发布列表
            </Menu.Item>
            <Menu.Item key='/layout/release/online' onClick={routerPush}>
              已上线列表
            </Menu.Item>
            <Menu.Item key='/layout/release/offline' onClick={routerPush}>
              已下线列表
            </Menu.Item>
          </SubMenu> : ''
        }
      </Menu>
    </Sider>
  )
}
const mapStateToProps = function (state) {
  return state
}
const mapDispatchToProps = function (dispatch) {
  return {}
}
export default SiderLayOut = connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(SiderLayOut))
