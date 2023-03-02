import React from 'react'
import { Form, Input, Select } from 'antd'
const EditUserForm = React.forwardRef((props, ref) => {
  return (
    <Form
      name='edituserform'
      labelCol={{ span: 4 }}
      wrapperCol={{ span: 20 }}
      initialValues={{ region: 0, role: 10 }}
      autoComplete='off'
      ref={ref}
    >
      <Form.Item
        label='用户名'
        name='nickname'
        labelAlign='left'
        rules={[{ required: true, message: '请输入用户名!' }]}
      >
        <Input style={{ width: '300px' }} />
      </Form.Item>

      <Form.Item
        label='地区'
        name='region'
        labelAlign='left'
        rules={[{ required: true, message: '请选择地区!' }]}
      >
        <Select style={{ width: '200px' }}>
          <Select.Option value={0}>亚洲</Select.Option>
          <Select.Option value={1}>非洲</Select.Option>
          <Select.Option value={2}>大洋洲</Select.Option>
          <Select.Option value={3}>北美洲</Select.Option>
          <Select.Option value={4}>欧洲</Select.Option>
          <Select.Option value={5}>北美洲</Select.Option>
          <Select.Option value={6}>南极洲</Select.Option>
        </Select>
      </Form.Item>
      <Form.Item
        label='角色'
        name='role'
        labelAlign='left'
        rules={[{ required: true, message: '请选择权限' }]}
      >
        <Select style={{ width: '200px' }}>
          <Select.Option value={0}>超级管理员</Select.Option>
          <Select.Option value={1}>区域管理员</Select.Option>
          <Select.Option value={2}>发布者</Select.Option>
        </Select>
      </Form.Item>
    </Form>
  )
})
export default EditUserForm
