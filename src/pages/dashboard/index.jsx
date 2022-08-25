import style from './style.module.scss'
const { clsSmallChart } = style

import LineChart from './echarts/lineChart'
import RaddarChart from './echarts/RaddarChart'
import BizCharts from './echarts/BizCharts'
import Labelline from './echarts/Labelline'

import { Row, Col } from 'antd'



export default () => {


  return (
    <div >

      <Row style={{ background: 'white', padding: '20px', boxSizing: 'border-box' }}>
        <Col span={24}>
          <LineChart />
        </Col>
      </Row>

      <Row className={`clsSmallChart ${clsSmallChart}`} justify='space-between'>
        <Col span={7}>
          <RaddarChart />
        </Col>

        <Col span={7}>
          <BizCharts />
        </Col>

        <Col span={7}>
          <Labelline />
        </Col>

      </Row>
    </div>


  )
}
