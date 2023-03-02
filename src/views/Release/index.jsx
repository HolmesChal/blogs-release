import React, { useEffect, useState } from 'react'
import TableModel from '@/components/TableModel/index'
import { getBlogsList } from '@/utils/request'
import { connect } from 'react-redux'

function Release(props) {
  let [datalist, setDataList] = useState()
  const handleBlogsList = async () => {
    let config = {
      blogscondition: 1
    }
    let { data } = await getBlogsList(config)
    setDataList(data)
  }
  const partcolumns = [
    {
      title: '序号',
      dataIndex: 'blogsid',
      key: 'blogsid',
      align: 'center',
      render: (text, record, index) => <a>{index + 1}</a>
    },
    {
      title: '发布者',
      dataIndex: 'nickname',
      key: 'nickname',
      align: 'center'
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
      align: 'center'
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
export default Release = connect(mapStateToProps, null)(Release)
