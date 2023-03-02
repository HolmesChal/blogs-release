import React, { useState, useRef, useEffect } from 'react'
import { Table, Modal, Button, Popover, notification } from 'antd'
import { SmileOutlined } from '@ant-design/icons'
import EditUserForm from '@/components/EditUserForm/index'
import { getUserList, deleteUserList, changeUserList, deletePermissionList } from '@/utils/request'
import { checkStatus } from '@/utils/common'
function User(props) {
  const { history } = props
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
  const actionlist = [
    {
      text: '删除'
    },
    {
      text: '编辑'
    }
  ]

  //  编辑功能——对话框
  const editPopHandle = record => {
    setTimeout(() => {
      setVisible(true)
      formref.current.setFieldsValue(record)
    }, 0)
  }

  //  编辑功能——提交
  const editSubmitHandle = async () => {
    // 修改后的结果
    let editres = formref.current.getFieldValue()
    let { id, region, role, nickname } = editres
    let config = {
      id,
      region,
      role,
      nickname
    }
    setConfirmLoading(true)
    setDatasource(prevState => {
      return prevState.map(item => (item.id == editres.id ? editres : item))
    })
    let { status } = await changeUserList(config)
    if (checkStatus(status)) {
      notification.open({
        message: '編輯成功',
        description: '',
        icon: <SmileOutlined style={{ color: '#108ee9' }} />
      })
    }
    setTimeout(() => {
      setVisible(false)
      setConfirmLoading(false)
    }, 500)
  }

  //  编辑功能——取消
  const editCancelHandle = () => {
    setVisible(false)
  }

  // 删除功能——弹窗
  const delPopHandle = record => {
    let id = record.id
    let resultdata = datasource.map(item => {
      if (item.id == id) {
        item.visible = !item.visible
      }
      return item
    })
    setDatasource([...resultdata])
  }

  // 删除功能——弹窗
  const delHandle = async (record) => {
    let id = record.id
    let resultdata = datasource.filter(item => {
      return item.id !== id
    })
    setDatasource([...resultdata])
    let { status: permstatus } = await deletePermissionList(id)
    let { status: userstatus } = await deleteUserList(id)
    if (checkStatus(userstatus) && checkStatus(permstatus)) {
      notification.open({
        message: '删除成功',
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
      title: '账号',
      dataIndex: 'username',
      key: 'username',
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
      title: '操作',
      dataIndex: 'action',
      key: 'action',
      align: 'center',
      render: (text, record) => {
        return text.map((item, index) => {
          if (actionlist[item].text == '编辑')
            return (
              <Button
                type='primary'
                style={{ margin: '0 5px' }}
                key={index}
                onClick={() => editPopHandle(record)}
              >
                {actionlist[item].text}
              </Button>
            )
          else if (actionlist[item].text == '删除')
            return (
              <Popover
                key={index}
                content={
                  <>
                    <Button
                      style={{ margin: '0 5px' }}
                      danger
                      onClick={() => delHandle(record)}
                    >
                      确定
                    </Button>
                    <Button
                      style={{ margin: '0 5px' }}
                      onClick={() => delPopHandle(record)}
                    >
                      取消
                    </Button>
                  </>
                }
                title='确定删除吗?'
                trigger='click'
                visible={record.visible}
              >
                <Button
                  type='primary'
                  danger
                  style={{ margin: '0 5px' }}
                  key={index}
                  onClick={() => delPopHandle(record)}
                >
                  {actionlist[item].text}
                </Button>
              </Popover>
            )
          else return <div key={index}></div>
        })
      }
    }
  ]

  const formref = useRef(null)
  const [datasource, setDatasource] = useState('')
  const [visible, setVisible] = useState(false)
  const [confirmLoading, setConfirmLoading] = useState(false)
  useEffect(async () => {
    let { data: datalist } = await getUserList()
    setDatasource(datalist)
  }, [])
  return (
    <>
      <Button
        type='primary'
        style={{ margin: '10px 0' }}
        onClick={() => history.push('/layout/user/createuser')}
      >
        添加用户
      </Button>
      {datasource ? <Table columns={columns} dataSource={datasource} /> : ''}
      <Modal
        title='编辑用户'
        visible={visible}
        onCancel={editCancelHandle}
        footer={[
          <Button key='back' onClick={editCancelHandle}>
            取消
          </Button>,
          <Button
            key='submit'
            type='primary'
            loading={confirmLoading}
            onClick={editSubmitHandle}
          >
            提交
          </Button>
        ]}
      >
        <EditUserForm ref={formref} />
      </Modal>
    </>
  )
}
export default User
