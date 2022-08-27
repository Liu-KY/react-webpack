import style from "./style.module.scss";
const {
  ClsHead,
  clsformTool,
  clsGoodsDetails } = style;

import { useNavigate } from 'react-router-dom'
import { useEffect,useState, useMemo } from 'react'
import { useSelector } from 'react-redux'
import { useDebounceEffect } from 'ahooks'
import {
  Table,
  Col,
  Row,
  Input,
  Button,
  notification
} from "antd";
import {
  ReloadOutlined,
  ColumnHeightOutlined,
  SettingOutlined
} from '@ant-design/icons'
import moment from 'moment';


import ProductCategory from "./component/productCategory";
import { goodList, goodDelete } from '@/api/good'

const onChange = (pagination, filters, sorter, extra) => {
  console.log("params", pagination, filters, sorter, extra);
};

export default () => {
  const navigate = useNavigate()
  const [data, setData] = useState([])
  const [total, settotal] = useState(0)
  const [count, setCount] = useState(0)
  const { goodCates } = useSelector(store => store.good)


  //请求数据
  const [params, setParams] = useState({
    page: 1,
    size: 10,
    cate: '',
    name: ''
  })


  //页脚的样式
  const [paramss, setParamss] = useState({
    page: 1,
    size: 10,
  })

  const requestData = () => {
    goodList(params).then((res) => {
      if (res) {
        setData(res.list)
        settotal(res.total)
        //异步数据延迟设置页脚的显示
        setParamss({
          page: params.page,
          size: params.size,
        })
      }
    })
  }

  useDebounceEffect(() => {
    requestData()
  }, [params], { wait: 500, leading: true })

  useEffect(() => {
    requestData()

  }, [count])

  const columns = useMemo(() => {
    return [
      {
        title: "商品名称",
        dataIndex: "name",
        render: (text, record) => {
          return (
            <div className={`clsGoodsDetails ${clsGoodsDetails}`}>
              <img src={`http://localhost:9999${record.img}`} />
              <div>{record.name}</div>
            </div>
          )
        }
      },
      {
        title: "商品分类",
        dataIndex: "cate",
        render: (text) => {
          if (goodCates.length > 0) {
            const [r] = goodCates.filter(ele => ele.cate === text)
            return (
              <div>
                {
                  r ? r.cate_zh : null
                }
              </div>
            )
          }
        }
      },
      {
        title: "价格",
        align: 'center',
        dataIndex: 'price',
        sorter: {
          compare: (a, b) => a.math - b.math,
          multiple: 2,
        },
      },
      {
        title: "是否热销",
        dataIndex: 'hot',
        align: 'center',
        sorter: {
          compare: (a, b) => a.math - b.math,
          multiple: 2,
        },
        render: (text, record) => {
          return (
            <div>
              {record.hot ? '是' : '否'}
            </div>
          )
        }
      },
      {
        title: "添加时间",
        dataIndex: 'create_time',
        align: 'center',
        sorter: {
          compare: (a, b) => a.math - b.math,
          multiple: 2,
        },
        render: (text, record) => {
          return (
            <>
              <div>
                {moment(record.create_time).format('YYYY年MM月DD日')}
              </div>
              <div>
                {moment(record.create_time).format('HH时mm分')}
              </div>
            </>

          )
        }
      },
      {
        title: "操作",
        dataIndex: "english",
        sorter: {
          compare: (a, b) => a.english - b.english,
          multiple: 1,
        },
        align: 'center',
        render: (text, record,) => {
          return (
            <div>
              <Button type='primary' size='small' onClick={() => {
                navigate('/good/edit', { state: { id: record._id } })

              }}>编辑</Button>
              <Button danger size='small' style={{ marginLeft: '10px' }} onClick={() => {
                goodDelete({ ids: `${record._id};` }).then(res => {
                  if (res) {
                    setCount(count=>count+1)
                    notification.open({
                      message: '提示',
                      description:
                        '商品删除成功',
                    });
                  }
                })
              }}>删除</Button>
            </div>
          )
        }
      },
    ];
  }, [goodCates])


  return (
    <>
      <div className={`${ClsHead} ClsHead`}>
        <Row>
          <Col span={2} offset={2}>
            商品名称:
          </Col>
          <Col span={4}>
            <Input placeholder="请输入商品名称" value={params.name} onChange={(ev) => setParams({ ...params, name: ev.target.value })} />
          </Col>
          <Col span={2} offset={2}>
            商品品类:
          </Col>
          <Col span={4}>
            <ProductCategory value="" onChange={(value) => { setParams({ ...params, cate: value }) }} />
          </Col>
        </Row>
      </div>

      <Table
        columns={columns}
        dataSource={data}
        onChange={onChange}
        rowKey='_id'
        title={(ev) => {
          return (
            <Row>
              <Col span={3}>
                <div> 商品列表 </div>
              </Col>
              <Col span={21} style={{}}>
                <div className={`clsformTool ${clsformTool}`}>
                  <Button type="primary" onClick={() => { navigate('/good/add') }}>
                    添加
                  </Button>
                  <ReloadOutlined />
                  <ColumnHeightOutlined />
                  <SettingOutlined />
                </div>
              </Col>
            </Row>
          );
        }}

        pagination={{
          total,
          showTotal: (total, range) => `第${range[0]}~${range[1]}条 / 共 ${total} 条`,
          current: paramss.page,
          pageSize: paramss.size,
          pageSizeOptions: [2, 5, 10],
          showSizeChanger: true,
          onChange: (page, pageSize) => { setParams({ ...params, size: pageSize, page }) }
        }}


        style={{ padding: '0 20px', background: 'white' }}
      />
    </>
  );
};
