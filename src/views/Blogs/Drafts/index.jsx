import React, { useEffect, useState } from 'react'
import TableModel from '@/components/TableModel/index'
import { getUserBlogsList } from '@/utils/request'
import { connect } from 'react-redux'
function Drafts(props) {
  let [datalist, setDataList] = useState()
  const handleBlogsList = async () => {
    let awary = [0, 3]
    let { data } = await getUserBlogsList(props.userinfo.id, awary, 'blogscondition')
    setDataList(data)
  }
  const partcolumns = [
    {
      title: '序号',
      dataIndex: 'id',
      key: 'id',
      align: 'center',
      render: (text, record, index) => <a>{index + 1}</a>
    },
    {
      title: '博客标题',
      dataIndex: 'blogstitle',
      key: 'blogstitle',
      align: 'center'
    },
    {
      title: '博客类型',
      dataIndex: 'blogstype',
      key: 'blogstype',
      align: 'center'
    },
    {
      title: '保存时间',
      dataIndex: 'savetime',
      key: 'savetime',
      align: 'center',
      render: (text, record, index) => <span>{text || '暂无'}</span>
    },
    {
      title: '下线时间',
      dataIndex: 'offtime',
      key: 'offtime',
      align: 'center',
      render: (text, record, index) => <span>{text || '暂无'}</span>
    }
  ]
  useEffect(() => {
    handleBlogsList()
  }, [])
  return (
    <>
      {datalist ? (
        <TableModel datalist={datalist} partcolumns={partcolumns} />
      ) : (
        ''
      )}
    </>
  )
}
let mapStateToProps = state => {
  return state
}
export default Drafts = connect(mapStateToProps, null)(Drafts)
