import { useNavigate } from 'react-router-dom'
import {
  PageHeader,
  Button,
  Form,
  Input,
  InputNumber,
  Switch,
  message
} from 'antd';

import ProductCategory from "./component/productCategory";
import ImageUpload from './component/imageUpload'
import { goodUpdate } from '@/api/good'

export default () => {
  const navigate = useNavigate()
  const onFinish = (ev) => {
    console.log(ev)
    goodUpdate(ev).then(res => {
      console.log(res)
      if (res) {
        // message.success(`商品${id ? '编辑' : '上传'}成功`);
        message.success(`商品上传成功`,3,()=>navigate(-1));

      }
    })
  }
  
  const [form] = Form.useForm()

  return (
    <div>
      <PageHeader
        className="site-page-header"
        onBack={() => navigate(-1)}
        title="商品新增"
        style={{ background: 'white' }}
      />


      <div>
        <Form
          form={form}
          name="register"
          labelCol={{ span: 4 }}
          wrapperCol={{ span: 12 }}
          scrollToFirstError
          onFinish={onFinish}
          style={{
            background: 'white',
            marginTop: '20px',
            padding: '20px'
          }}
          initialValues={{
            'hot': false,
          }}
        >

          <Form.Item
            name="name"
            label="商品名称"
            rules={[
              { required: true, message: '商品名称是必须属性' },
              { pattern: /[\u4e00-\u9fa5]{4,6}/, message: '商品名称要求4~6个中文字符' }
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            name="desc"
            label="商品描述"
            rules={[
              { required: true, message: '商品描述是必须属性' },
              { min: 10, max: 30, message: '商品描述要求10~30字' }
            ]}
          >
            <Input.TextArea />
          </Form.Item>


          <Form.Item
            name="cate"
            label="商品品类"
            rules={[
              { required: true, message: '商品描述是必须属性' }
            ]}
          >
            <ProductCategory hidden={['热门推荐']} />
          </Form.Item>


          <Form.Item
            name="price"
            label="商品价格"
            rules={[
              { required: true, message: '商品价格是必须属性' },
              {
                validator: (rule, value) => {
                  // do something
                  const val = Number(value)
                  if (val > 0.5) {
                    // 验证成功
                    return Promise.resolve()
                  } else {
                    // 验证失败
                    return Promise.reject(new Error('商品价格不能小于0.5元'))
                  }
                }
              }
            ]}
          >
            <InputNumber />
          </Form.Item>


          <Form.Item
            name="hot"
            label="是否热销"
            valuePropName='checked'
          >
            <Switch />
          </Form.Item>


          <Form.Item
            name="img"
            label="商品图片"
            rules={[
              { required: true, message: '商品图片是必须属性' }
            ]}
          >
            <ImageUpload />
          </Form.Item>


          <Form.Item
            wrapperCol={{ offset: 4 }}
          >
            <Button type="primary" htmlType="submit">
              提交
            </Button>
          </Form.Item>



        </Form>

      </div>
    </div>
  )
}
