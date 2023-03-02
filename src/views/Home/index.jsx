import React, { useEffect } from 'react'
import { Statistic, Row, Col, Card } from 'antd'
import * as echarts from 'echarts'
import {
  LikeOutlined,
  ArrowUpOutlined,
  ArrowDownOutlined
} from '@ant-design/icons'
const { Countdown } = Statistic
function Home(props) {
  const deadline = Date.now() + 1000 * 60 * 60 * 24 * 2 + 1000 * 30 // Moment is also OK
  const setChartOption = () => {
    // 基于准备好的dom，初始化echarts实例
    var myChart = echarts.init(document.getElementById('main'))
    // 绘制图表
    myChart.setOption({
      title: {
        text: '博客数据'
      },
      tooltip: {},
      xAxis: {
        data: ['衬衫', '羊毛衫', '雪纺衫', '裤子', '高跟鞋', '袜子']
      },
      yAxis: {},
      series: [
        {
          name: '销量',
          type: 'bar',
          data: [5, 20, 36, 10, 10, 20]
        }
      ]
    })
  }
  useEffect(() => {
    setChartOption()
  }, [])
  return (
    <>
      <Row gutter={30}>
        <Col span={8}>
          <Statistic title='Feedback' value={1128} prefix={<LikeOutlined />} />
        </Col>
        <Col span={8}>
          <Statistic title='Unmerged' value={93} suffix='/ 100' />
        </Col>
        <Col span={8}>
          <Countdown
            title='Day Level'
            value={deadline}
            format='D 天 H 时 m 分 s 秒'
          />
        </Col>
      </Row>
      <Row gutter={16} style={{ marginTop: '40px' }}>
        <Col span={12}>
          <Card>
            <Statistic
              title='Active'
              value={11.28}
              precision={2}
              valueStyle={{ color: '#3f8600' }}
              prefix={<ArrowUpOutlined />}
              suffix='%'
            />
          </Card>
        </Col>
        <Col span={12}>
          <Card>
            <Statistic
              title='Idle'
              value={9.3}
              precision={2}
              valueStyle={{ color: '#cf1322' }}
              prefix={<ArrowDownOutlined />}
              suffix='%'
            />
          </Card>
        </Col>
      </Row>
      <Row gutter={16} style={{ marginTop: '40px' }}>
        <div id='main' style={{ width: '65%', height: '400px' }}></div>
      </Row>
    </>
  )
}
export default Home
