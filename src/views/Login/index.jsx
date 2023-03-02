import React, { useEffect, useRef, useState} from 'react'
import Particles from 'react-tsparticles'
import { Form, Input, Button, message } from 'antd'
import { connect } from 'react-redux'
import { userLogin } from '@/store/action/userAction'
import style from '@/views/Login/Login.module.less'

import { getUserInfo } from '@/utils/request'
import { checkStatus,readJsonFile} from '@/utils/common'

import json from '@/utils/Background'


function Login(props) {
  const loginRef = useRef('')
  // const [jsonData,setJsonData] = useState()
  const { history } = props
  const Login = async function () {
    let value = await loginRef.current.validateFields()
    let { data, status } = await getUserInfo(value)
    if (checkStatus(status)) {
      // 新写法
      Reflect.deleteProperty(data[0], 'password')
      Reflect.deleteProperty(data[0], 'username')
      setTimeout(() => {
        props?.login(data[0])
        data[0]?.token
          ? history.push('/layout/home')
          : message.error('账号或密码错误~')
        message.success('登录成功')
      }, 0)
      return
    }
    message.error('服务器错误')
  }

  useEffect(async () => {
    // setJsonData(await readJsonFile())
   }, [])
  return (
    <>
      <Particles id='tsparticles' options={json} />
      <div className={style.login} onClick={e => e.stopPropagation()}>
        <div className={style.title}>博客发布系统</div>
        <Form
          name='basic'
          labelCol={{ span: 6 }}
          wrapperCol={{ span: 16 }}
          initialValues={{ username: null, password: null }}
          ref={loginRef}
          autoComplete='off'
        >
          <Form.Item
            label='账号'
            name='username'
            rules={[{ required: true, message: '请输入账号!' }]}
          >
            <Input maxLength='6' />
          </Form.Item>
          <Form.Item
            label='密码'
            name='password'
            rules={[{ required: true, message: '请输入密码!' }]}
          >
            <Input.Password maxLength='6' />
          </Form.Item>
          <Form.Item wrapperCol={{ span: 24 }}>
            <div className={style.submit}>
              <Button type='primary' onClick={Login} htmlType='submit'>
                登录
              </Button>
            </div>
          </Form.Item>
        </Form>
      </div>
    </>
  )
}
const mapStateToProps = function (state) {
  return state
}
const mapDispatchToProps = function (dispatch) {
  return {
    login(data) {
      dispatch(userLogin(data))
    }
  }
}
export default Login = connect(mapStateToProps, mapDispatchToProps)(Login)
