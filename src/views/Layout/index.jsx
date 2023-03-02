import React from 'react'
import { Layout } from 'antd'
import './LayOut.less'
import Header from '@/views/Layout/Header/index'
import Sider from '@/views/Layout/Sider/index'
import Content from '@/views/Layout/Content/index'
function LayOut() {
  return (
    <Layout>
      <Sider></Sider>
      <Layout className='site-layout'>
        <Header></Header>
        <Content></Content>
      </Layout>
    </Layout>
  )
}
export default LayOut
