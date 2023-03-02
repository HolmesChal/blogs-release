import React, { useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import { Layout, Menu, Dropdown, message, Button } from 'antd'
import {
  MenuUnfoldOutlined,
  MenuFoldOutlined,
  DownOutlined
} from '@ant-design/icons'
const { Header } = Layout
import { connect } from 'react-redux'
import { userLogout, changeCollapsed } from '@/store/action/userAction'
import style from '@/views/Layout/Header/Header.module.less'
function HeaderLayOut (props) {
  const history = useHistory()
  const logoutHandle = () => {
    props.logout()
    history.push('/')
  }
  useEffect(() => {
    if (!props?.userinfo?.token) {
      history.push('/')
    }
  })

  const menu = (
    <Menu onClick={logoutHandle}>
      <Menu.Item key='1' danger>
        <span className={style.logout}>退出登录</span>
      </Menu.Item>
    </Menu>
  )
  return (
    <Header className='site-layout-background' style={{ padding: '0 16px' }}>
      <div className={style.header}>
        <div>
          {props.collapsed ? (
            <MenuUnfoldOutlined onClick={() => props.toggleCollapsed()} />
          ) : (
            <MenuFoldOutlined onClick={() => props.toggleCollapsed()} />
          )}
        </div>
        <Dropdown Dropdown overlay={menu}>
          <div className={style.user} onClick={e => e.preventDefault()}>
            <span className={style.usertext}>
              欢迎,{props?.userinfo?.nickname}
            </span>
            <DownOutlined />
          </div>
        </Dropdown>
      </div>
    </Header>
  )
}

const mapStateToProps = function (state) {
  return state
}
const mapDispatchToProps = function (dispatch) {
  return {
    logout () {
      dispatch(userLogout())
    },
    toggleCollapsed () {
      dispatch(changeCollapsed())
    }
  }
}
export default HeaderLayOut = connect(
  mapStateToProps,
  mapDispatchToProps
)(HeaderLayOut)
