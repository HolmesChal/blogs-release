import React, { useState, useRef, useEffect } from 'react'
import { Form, Input, Button, Select, message } from 'antd'
import { randomWord } from '@/utils/common'
import { addUserInfo, getUserList, addPermissionList } from '@/utils/request'
import { checkStatus } from '@/utils/common'
function CreateUser() {
  const userRef = useRef('')
  const [userlistlength, setUserListLength] = useState()
  const createUser = async () => {
    let value = await userRef.current.validateFields()
    let { password, checkpassword } = value
    let randomtoken = randomWord()
    if (password != checkpassword) {
      message.warning('密码和验证密码不一致，请重新输入。')
      userRef.current.resetFields()
      return
    }
    Reflect.deleteProperty(value, 'checkpassword')
    let userconfig = {
      ...value,
      token: randomtoken,
      action: [0, 1],
      key: userlistlength + 1,
      visible: false
    }
    let permconfig
    let { role } = value
    if (role == 0 || role == 1) {
      permconfig = {
        userlistId: userlistlength + 1,
        blogsm: true,
        permissionm: true,
        releasem: true,
        userm: true,
        datam: true
      }
    }
    else {
      permconfig = {
        userlistId: userlistlength + 1,
        blogsm: true,
        permissionm: false,
        releasem: false,
        userm: false,
        datam: true
      }
    }
    let { status: permstatus } = await addPermissionList(permconfig)
    let { status: userstatus } = await addUserInfo(userconfig)
    if (checkStatus(userstatus) && checkStatus(permstatus)) {
      message.success('创建用户成功')
    }
  }
  useEffect(async () => {
    let { data: userlist } = await getUserList()
    setUserListLength(userlist.length)
  }, [])
  return (
    <>
      <Form
        labelCol={{
          span: 10
        }}
        wrapperCol={{
          span: 14
        }}
        name='createuserform'
        layout='horizontal'
        initialValues={{ region: 0, role: 0 }}
        ref={userRef}
      >
        <Form.Item
          label='账号'
          name='username'
          rules={[{ required: true, message: '请输入账号。' }]}
        >
          <Input style={{ width: '300px' }} />
        </Form.Item>
        <Form.Item
          label='用户名'
          name='nickname'
          rules={[{ required: true, message: '请输入用户名。' }]}
        >
          <Input style={{ width: '300px' }} />
        </Form.Item>
        <Form.Item
          label='密码'
          name='password'
          rules={[{ required: true, message: '请输入密码。' }]}
        >
          <Input.Password maxLength='6' style={{ width: '250px' }} />
        </Form.Item>
        <Form.Item
          label='验证密码'
          name='checkpassword'
          rules={[{ required: true, message: '请再次输入密码。' }]}
        >
          <Input.Password maxLength='6' style={{ width: '250px' }} />
        </Form.Item>
        <Form.Item label='区域' name='region'>
          <Select style={{ width: '250px' }}>
            <Select.Option value={0}>亚洲</Select.Option>
            <Select.Option value={1}>非洲</Select.Option>
            <Select.Option value={2}>大洋洲</Select.Option>
            <Select.Option value={3}>北美洲</Select.Option>
            <Select.Option value={4}>欧洲</Select.Option>
            <Select.Option value={5}>北美洲</Select.Option>
            <Select.Option value={6}>南极洲</Select.Option>
          </Select>
        </Form.Item>
        <Form.Item label='角色' name='role'>
          <Select style={{ width: '250px' }}>
            <Select.Option value={0}>超级管理员</Select.Option>
            <Select.Option value={1}>区域管理员</Select.Option>
            <Select.Option value={2}>发布者</Select.Option>
          </Select>
        </Form.Item>
        <Form.Item wrapperCol={{ offset: 10, span: 14 }}>
          <Button type='primary' htmlType='submit' onClick={createUser}>
            创建用户
          </Button>
        </Form.Item>
      </Form>
    </>
  )
}
export default CreateUser
