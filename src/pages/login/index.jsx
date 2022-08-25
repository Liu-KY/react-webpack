import style from './style.module.scss'
const { clsLoginBox, clsLogin } = style
import { login } from '@/store/actionCreator/UserActions'

import { Button, Checkbox, Form, Input } from 'antd';
import { useDispatch} from 'react-redux'

export default () => {

  const dispatch = useDispatch()

  const onFinish = (values) => {
    dispatch(login(values))
  };

  return (
    <div className={`clsLoginBox ${clsLoginBox}`}>
      <div className={`clsLogin ${clsLogin}`}>
        <Form
          name="basic"
          labelCol={{
            span: 4,
          }}
          wrapperCol={{
            span: 16,
          }}
          initialValues={{
            remember: true,
          }}
          validateTrigger='onBlur'
          onFinish={onFinish}
        >
          <Form.Item
            label="用户名"
            name="username"
            rules={[
              {
                required: true,
                message: '用户名为必填',
              },
              {
                pattern: /^\w{4,8}$/,
                message: '最少四位最多八位',
              },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="密码"
            name="password"
            rules={[
              {
                required: true,
                message: '密码为必填',
              },
            ]}
          >
            <Input.Password />
          </Form.Item>

          <Form.Item
            name="remember"
            valuePropName="checked"
            wrapperCol={{
              offset: 4,
              span: 16,
            }}
          >
            <Checkbox>记住密码</Checkbox>
          </Form.Item>

          <Form.Item
            wrapperCol={{
              offset: 4,
              span: 16,
            }}
          >
            <Button type="primary" htmlType="submit" block>
              登录
            </Button>
          </Form.Item>



        </Form>
      </div>
    </div>
  )
}
