import style from './style.module.scss'
const { clsglobalSettings,qfContent } = style

import { Outlet } from 'react-router-dom'
import { SettingOutlined, SlackSquareFilled } from '@ant-design/icons';
import { Drawer, Row, Col, Dropdown } from 'antd';
import { useState } from 'react'
import { ChromePicker } from 'react-color';
import { useDispatch, useSelector } from 'react-redux'

import {ChangeColor} from '@/store/actionCreator/APPactions'

export default () => {
    const [visible, setVisible] = useState(false);
    // const [background, setBackground] = useState('#333');
    const {color}= useSelector(store => store.app)
    const dispatch = useDispatch()

    const handleChangeComplete = (ev) => {

        dispatch(ChangeColor(ev))
    }

    return (
        <div style={{height:'100%'}}  className={qfContent}>
            <Outlet />
            <SettingOutlined
                className={`clsglobalSettings ${clsglobalSettings}`}
                onClick={() => setVisible(true)}
                style={{color:'var(--ant-primary-color)' }}
            />
            <Drawer
                visible={visible}
                onClose={() => setVisible(false)}
            >
                <Row>
                    <Col span={20} style={{color:'var(--ant-primary-color)'}}>主题色</Col>
                    <Col span={4}>
                        <Dropdown
                            overlay={
                                <ChromePicker
                                    color={color.rgb}
                                    onChangeComplete={handleChangeComplete}
                                />
                            }
                            placement="topRight"
                            trigger={['click']}
                        >
                            <SlackSquareFilled  style={{ fontSize: '20px',color:'var(--ant-primary-color)' }} />
                        </Dropdown>

                    </Col>
                </Row>

            </Drawer>
        </div>
    )
}