import React, { useEffect, useState } from 'react'
import { Typography, Divider, Descriptions, Tag } from 'antd'
import {
  CheckCircleOutlined,
  SyncOutlined,
  ClockCircleOutlined,
  CloseCircleOutlined,
} from '@ant-design/icons'
const { Title, Paragraph, Text, Link } = Typography
function CheckBlogs(props) {
  const [blogsinfo, setBlogsInfo] = useState()
  const { location } = props
  let blogsinfoback
  const regionlist = {
    0: '亚洲',
    1: '非洲',
    2: '大洋洲',
    3: '北美洲',
    4: '欧洲',
    5: '北美洲',
    6: '南极洲'
  }
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

  useEffect(() => {
    if (location.state) {
      //判断当前有参数
      setBlogsInfo(location.state)
      blogsinfoback = JSON.stringify(location.state)
      sessionStorage.setItem('blogsinfo', blogsinfoback) // 存入到sessionStorage中
    } else {
      blogsinfoback = JSON.parse(sessionStorage.getItem('blogsinfo')) // 当state没有参数时，取sessionStorage中的参数
      setBlogsInfo(blogsinfoback)
    }
  }, [location.state])
  useEffect(() => {
    return () => {
      sessionStorage.removeItem('blogsinfo')
    }
  }, [props.match.path])

  return (
    <>
      {blogsinfo ? (
        <>
          <Descriptions title=''>
            <Descriptions.Item label='发布者'>
              {blogsinfo.nickname}
            </Descriptions.Item>
            <Descriptions.Item label='所属区域'>
              {regionlist[blogsinfo.region]}
            </Descriptions.Item>
            <Descriptions.Item label='博客状态'>
              <Tag
                icon={statelist[blogsinfo.blogscondition].icon}
                color={statelist[blogsinfo.blogscondition].color}
              >
                {statelist[blogsinfo.blogscondition].condition}
              </Tag>
            </Descriptions.Item>
            <Descriptions.Item label='保存时间'>
              {blogsinfo.savetime || '暂无'}
            </Descriptions.Item>
            <Descriptions.Item label='发布时间'>
              {blogsinfo.releasetime || '暂无'}
            </Descriptions.Item>
            <Descriptions.Item label='下线时间'>
              {blogsinfo.offtime || '暂无'}
            </Descriptions.Item>
            <Descriptions.Item label='上线时间'>
              {blogsinfo.ontime || '暂无'}
            </Descriptions.Item>
          </Descriptions>
          <Typography>
            <Title style={{ textAlign: 'center', fontSize: '20px' }}>
              {blogsinfo.blogstitle}
            </Title>
            <Paragraph>
              关键字：
              {blogsinfo.blogskeyword.map((item, index) => {
                return (
                  <Text code key={index}>
                    {item}
                  </Text>
                )
              })}
            </Paragraph>
            <Paragraph>
              <blockquote>{blogsinfo.blogsintroduct}</blockquote>
            </Paragraph>
            <Paragraph>
              <div
                dangerouslySetInnerHTML={{ __html: blogsinfo.blogscontent }}
              ></div>
            </Paragraph>
            <Divider />
          </Typography>
        </>
      ) : (
        '暂无数据'
      )}
    </>
  )
}
export default CheckBlogs
