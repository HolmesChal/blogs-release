import React, { useEffect, useState } from 'react'
import TableModel from '@/components/TableModel/index'
import { getUserBlogsList, getBlogsList } from '@/utils/request'
import { connect } from 'react-redux'
function Blogs(props) {
  let [datalist, setDataList] = useState()
  const handleBlogsList = async () => {
    let awary = [0, 1, 2, 3]
    let config = {
      userlistId: props.userinfo.id
    }
    if (props.userinfo.role == 2) {
      let { data } = await getUserBlogsList(props.userinfo.id, awary, 'blogscondition')
      setDataList(data)
      return
    }
    let { data } = await getBlogsList(config)
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
export default Blogs = connect(mapStateToProps, null)(Blogs)
