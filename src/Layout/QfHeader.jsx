import style from './style.module.scss'
const { clsBreadcrumb, clsBreadcrumbItem, clsHeaderCol5 } = style
import { NavLink } from 'react-router-dom'

import {
    TranslationOutlined,
    FontSizeOutlined,
    FullscreenOutlined,
    FullscreenExitOutlined
} from '@ant-design/icons'
import { Breadcrumb, Row, Col } from 'antd';
import screenfull from 'screenfull';
import useForBreadCrumbs from './useForBreadCrumbs'
import { useState } from 'react'


export default () => {
    const breadCrumbs = useForBreadCrumbs()
    const [fullScreen, setFullScreen] = useState(true)
    return (
        <Row>
            <Col span={19}>
                <Breadcrumb className={clsBreadcrumb}>
                    {
                        breadCrumbs.map(ele => {
                            return (
                                <Breadcrumb.Item key={ele.key} className={clsBreadcrumbItem}>
                                    {
                                        ele.path && ele.element
                                            ? <NavLink to={ele.path}> {ele.label}</NavLink>
                                            : ele.label
                                    }
                                </Breadcrumb.Item>
                            )
                        })
                    }
                </Breadcrumb>
            </Col>
            <Col span={5} className={clsHeaderCol5}>
                {
                    fullScreen
                        ? <FullscreenOutlined onClick={
                            () => {
                                if (screenfull.isEnabled) {
                                    screenfull.toggle();
                                    setFullScreen(screenfull.isFullscreen)
                                }
                            }
                        } />
                        : <FullscreenExitOutlined onClick={
                            () => {
                                if (screenfull.isEnabled) {
                                    screenfull.toggle();
                                    setFullScreen(screenfull.isFullscreen)
                                }
                            }
                        } />


                }
                <FontSizeOutlined />
                <TranslationOutlined />

            </Col>
        </Row>
    )
}
