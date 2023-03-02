import React, { useState, useEffect } from 'react'
import { Table, Switch, notification } from 'antd'
import { getPermissionList, changePermissionList } from '@/utils/request'
import { CloseOutlined, CheckOutlined, SmileOutlined } from '@ant-design/icons'
import { checkStatus } from '@/utils/common'
function Permission(props) {
  const regionlist = {
    0: '亚洲',
    1: '非洲',
    2: '大洋洲',
    3: '北美洲',
    4: '欧洲',
    5: '北美洲',
    6: '南极洲'
  }
  const rolelist = {
    0: '超级管理员',
    1: '区域经理',
    2: '发布者'
  }
  const [datasource, setDatasource] = useState()
  //   权限功能
  const changePermission = async (record, flag) => {
    let id = record.id
    let config = {
      [flag]: !record[flag]
    }
    let resultdata = datasource.map(item => {
      if (item.id == id) {
        item[flag] = !item[flag]
      }
      return item
    })
    setDatasource([...resultdata])
    let { status } = await changePermissionList(id, config)
    if (checkStatus(status)) {
      notification.open({
        message: '修改成功',
        description: '',
        icon: <SmileOutlined style={{ color: '#108ee9' }} />
      })
    }
  }
  const columns = [
    {
      title: '序号',
      dataIndex: 'userid',
      key: 'userid',
      align: 'center',
      render: (text, record, index) => <a>{index + 1}</a>
    },
    {
      title: '用户名',
      dataIndex: 'nickname',
      key: 'nickname',
      align: 'center'
    },
    {
      title: '区域',
      dataIndex: 'region',
      key: 'region',
      align: 'center',
      render: (text, record, index) => <span>{regionlist[text]}</span>
    },
    {
      title: '角色',
      dataIndex: 'role',
      key: 'role',
      align: 'center',
      render: (text, record, index) => <span>{rolelist[text]}</span>
    },
    {
      title: '数据首页',
      dataIndex: 'datam',
      key: 'datam',
      align: 'center',
      render: (text, record, index) => {
        return (
          <>
            <Switch
              checkedChildren={<CheckOutlined />}
              unCheckedChildren={<CloseOutlined />}
              defaultChecked={text}
              onChange={() => changePermission(record, 'datam')}
            />
          </>
        )
      }
    },
    {
      title: '用户管理',
      dataIndex: 'userm',
      key: 'userm',
      align: 'center',
      render: (text, record, index) => {
        return (
          <>
            <Switch
              checkedChildren={<CheckOutlined />}
              unCheckedChildren={<CloseOutlined />}
              defaultChecked={text}
              onChange={() => changePermission(record, 'userm')}
            />
          </>
        )
      }
    },
    {
      title: '博客管理',
      dataIndex: 'blogsm',
      key: 'blogsm',
      align: 'center',
      render: (text, record, index) => {
        return (
          <>
            <Switch
              checkedChildren={<CheckOutlined />}
              unCheckedChildren={<CloseOutlined />}
              defaultChecked={text}
              onChange={() => changePermission(record, 'blogsm')}
            />
          </>
        )
      }
    },
    {
      title: '权限管理',
      dataIndex: 'permissionm',
      key: 'permissionm',
      align: 'center',
      render: (text, record, index) => {
        return (
          <>
            <Switch
              checkedChildren={<CheckOutlined />}
              unCheckedChildren={<CloseOutlined />}
              defaultChecked={text}
              onChange={() => changePermission(record, 'permissionm')}
            />
          </>
        )
      }
    },
    {
      title: '发布管理',
      dataIndex: 'releasem',
      key: 'releasem',
      align: 'center',
      render: (text, record, index) => {
        return (
          <>
            <Switch
              checkedChildren={<CheckOutlined />}
              unCheckedChildren={<CloseOutlined />}
              defaultChecked={text}
              onChange={() => changePermission(record, 'releasem')}
            />
          </>
        )
      }
    }
  ]
  useEffect(async () => {
    let { data: PermissionList } = await getPermissionList()
    let result = PermissionList.map(item => {
      return {
        ...item,
        ...item.permissionlists[0]
      }
    })
    setDatasource(result)
  }, [])
  return (
    <>{datasource ? <Table columns={columns} dataSource={datasource} /> : ''}</>
  )
}
export default Permission
