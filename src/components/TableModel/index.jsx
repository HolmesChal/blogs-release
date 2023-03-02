import React, { useState, useEffect, useRef } from 'react'
import { Table, Button, Popover, Tag, notification } from 'antd'
import {
  CheckCircleOutlined,
  SyncOutlined,
  ClockCircleOutlined,
  CloseCircleOutlined,
  SmileOutlined
} from '@ant-design/icons'
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import { deleteBlogslist, changeBlogslist, getBlogsInfo } from '@/utils/request'
import { getNowTime, checkStatus } from '@/utils/common'
function TableModel(props) {
  const [datasource, setDatasource] = useState([])
  const [columnsdatasource, setColumnsDatasource] = useState(columns)
  const { history } = props
  let ref = useRef()
  const statelist = [
    {
      condition: '待发布',
      color: 'default',
      icon: <ClockCircleOutlined />
    },
    {
      condition: '审核中',
      color: 'processing',
      icon: <SyncOutlined spin />
    },
    {
      condition: '已上线',
      color: 'success',
      icon: <CheckCircleOutlined />
    },
    {
      condition: '已下线',
      color: 'error',
      icon: <CloseCircleOutlined />
    }
  ]

  // 删除功能——删除单项
  const delHandle = async (record) => {
    let id = record.id
    setDatasource(datasource => {
      return datasource.filter(item => {
        return item.id !== id
      })
    })
    let { status } = await deleteBlogslist(id)
    if (checkStatus(status)) {
      notification.open({
        message: '删除成功',
        description: '',
        icon: <SmileOutlined style={{ color: '#108ee9' }} />
      })
    }
  }

  // 删除功能——展现弹窗
  const showPop = record => {
    let blogsid = record.id
    setDatasource(datasource => {
      return datasource.map(item => {
        if (item.id == blogsid) {
          item.visible = !item.visible
        }
        return item
      })
    })
  }

  // 审批功能
  const examHandle = async (record) => {
    let id = record.id
    let config = {
      blogscondition: 2,
      blogsaction: 2,
      ontime: getNowTime(),
      offtime: null
    }
    // 方法一: 使用useRef进行保存
    // let datasource = ref.current
    // let deldatasourcce = datasource.map(item => {
    //   if (item.blogsid == blogsid && item.blogscondition == 1) {
    //     item.blogscondition = 2
    //   }
    //   return item
    // })
    // setDatasource([...deldatasourcce])
    // 方法二:使用老的值进行修改并返回
    setDatasource(datasource => {
      return datasource.map(item => {
        if (item.id == id && item.blogscondition == 1) {
          item.blogscondition = 2
        }
        return item
      })
    })
    let { status } = await changeBlogslist(id, config)
    if (checkStatus(status)) {
      notification.open({
        message: '审批成功',
        description: '',
        icon: <SmileOutlined style={{ color: '#108ee9' }} />
      })
    }
  }

  // 驳回功能
  const rejectHandle = async (record) => {
    let id = record.id
    let config = {
      blogscondition: 0,
      blogsaction: 0
    }
    setDatasource(datasource => {
      return datasource.map(item => {
        if (item.id == id && item.blogscondition == 1) {
          item.blogscondition = 0
        }
        return item
      })
    })
    let { status } = await changeBlogslist(id, config)
    if (checkStatus(status)) {
      notification.open({
        message: '驳回成功',
        description: '',
        icon: <SmileOutlined style={{ color: '#108ee9' }} />
      })
    }
  }

  // 下线功能
  const offlineHandle = async (record) => {
    let id = record.id
    let config = {
      blogscondition: 3,
      blogsaction: 3,
      offtime: getNowTime(),
      ontime: null
    }
    setDatasource(datasource => {
      return datasource.map(item => {
        if (item.id == id && item.blogscondition == 2) {
          item.blogscondition = 3
        }
        return item
      })
    })
    let { status } = await changeBlogslist(id, config)
    if (checkStatus(status)) {
      notification.open({
        message: '下线成功',
        description: '',
        icon: <SmileOutlined style={{ color: '#108ee9' }} />
      })
    }
  }

  // 发布功能
  const releaseHandle = async (record) => {
    let id = record.id
    let config = {
      blogscondition: 1,
      releasetime: getNowTime()
    }
    if (props.userinfo.role == 2) {
      config.blogsaction = 4
    }
    else {
      config.blogsaction = 1
    }
    console.log('config', config)
    setDatasource(datasource => {
      return datasource.map(item => {
        if (
          item.id == id &&
          (item.blogscondition == 0 || item.blogscondition == 3)
        ) {
          item.blogscondition = 1
        }
        return item
      })
    })
    let { status } = await changeBlogslist(id, config)
    if (checkStatus(status)) {
      notification.open({
        message: '发布成功',
        description: '',
        icon: <SmileOutlined style={{ color: '#108ee9' }} />
      })
    }
  }

  // 查看功能
  const checkHandle = async ({ id }) => {
    let { data, status } = await getBlogsInfo(id)
    checkStatus(status) && history.push({ pathname: '/layout/blogs/checkblogs', state: data })
  }

  // 编辑功能
  const editHandle = async (record) => {
    history.push({ pathname: '/layout/blogs/createblogs', state: record, query: { editflag: true } })
  }

  const actiontype = {
    // 待发布
    0: [0, 1, 5, 6],
    // 审核中
    1: [0, 3, 4, 5],
    // 已上线
    2: [0, 2, 5],
    // 已下线
    3: [0, 1, 5, 6],
    // 审核中(用户)
    4: [0, 3, 4, 5]
  }
  const actionUsertype = {
    // 待发布
    0: [0, 1, 5, 6],
    // 审核中
    1: [0, 3, 4, 5],
    // 已上线
    2: [0, 2, 5],
    // 已下线
    3: [0, 1, 5, 6],
    // 审核中(用户)
    4: [0, 5]
  }
  const actionControl = {
    0: actiontype,
    1: actiontype,
    2: actionUsertype
  }

  let actionlist = [
    {
      action: '删除',
      handle: (e, record) => delHandle(record),
      color: '',
      flag: false,
      type: 'primary'
    },
    {
      action: '发布',
      handle: (e, record) => releaseHandle(record),
      color: '#6d9eeb',
      flag: false,
      type: 'primary'
    },
    {
      action: '下线',
      handle: (e, record) => offlineHandle(record),
      color: '',
      flag: true,
      type: ''
    },
    {
      action: '驳回',
      handle: (e, record) => rejectHandle(record),
      flag: true,
      type: ''
    },
    {
      action: '审批',
      handle: (e, record) => examHandle(record),
      color: '#6d9eeb',
      flag: false,
      type: 'primary'
    },
    {
      action: '查看',
      handle: (e, record) => checkHandle(record),
      color: '',
      flag: false,
      type: ''
    },
    {
      action: '编辑',
      handle: (e, record) => editHandle(record),
      color: '',
      flag: false,
      type: 'primary'
    }
  ]

  let columns = [
    {
      title: '博客状态',
      dataIndex: 'blogscondition',
      key: 'blogscondition',
      align: 'center',
      render: (text, index) => {
        return (
          <Tag icon={statelist[text].icon} color={statelist[text].color}>
            {statelist[text].condition}
          </Tag>
        )
      }
    },
    {
      title: '操作',
      dataIndex: 'blogsaction',
      key: 'blogsaction',
      align: 'center',
      render: (text, record) => {
        return actionControl[props.userinfo.id][text].map((item, index) => {
          if (item == 0)
            return (
              <Popover
                key={index}
                content={
                  <>
                    <Button
                      style={{ margin: '0 5px' }}
                      danger
                      onClick={e => actionlist[item].handle(e, record)}
                    >
                      确定
                    </Button>
                    <Button
                      style={{ margin: '0 5px' }}
                      onClick={() => showPop(record)}
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
                  style={{
                    margin: '0 5px'
                  }}
                  key={index}
                  onClick={() => showPop(record)}
                >
                  {actionlist[item].action}
                </Button>
              </Popover>
            )
          else
            return (
              <Button
                type={actionlist[item].type}
                danger={actionlist[item].flag}
                style={{
                  margin: '0 5px',
                  backgroundColor: actionlist[item].color
                }
                }
                key={index}
                onClick={e => actionlist[item].handle(e, record)
                }
              >
                {actionlist[item].action}
              </Button >
            )
        })
      }
    }
  ]
  useEffect(() => {
    ref.current = datasource
  }, [datasource, columnsdatasource])
  useEffect(async () => {
    columns.unshift(...props.partcolumns)
    setColumnsDatasource(columns)
    setDatasource([...props.datalist])
  }, [])

  return (
    <div>
      <Table
        columns={columnsdatasource}
        dataSource={datasource}
        key={Math.random()}
      />
    </div>
  )
}
let mapStateToProps = state => {
  return state
}
export default TableModel = connect(
  mapStateToProps,
  null
)(withRouter(TableModel))
