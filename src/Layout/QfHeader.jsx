import style from './style.module.scss'
const { clsBreadcrumb, clsBreadcrumbItem, clsHeaderCol5, cexpandbtn, clsDropdownMenu } = style

import { NavLink } from 'react-router-dom'
import { useState, useEffect } from 'react'
import screenfull from 'screenfull';
import { useSelector, useDispatch } from 'react-redux'
import { ChangeSize, ChangeIdn } from '@/store/actionCreator/APPactions'


import useForBreadCrumbs from './useForBreadCrumbs'

import {
    TranslationOutlined,
    FontSizeOutlined,
    FullscreenOutlined,
    FullscreenExitOutlined,
    MenuFoldOutlined,
    MenuUnfoldOutlined,
} from '@ant-design/icons'

import { Breadcrumb, Row, Col, Menu, Dropdown, Tooltip } from 'antd';




const Cexpandbtn = (props) => {
    const { collapsed, scal } = props
    return (
        <div onClick={() => scal()} className={cexpandbtn}>
            {
                collapsed
                    ? <MenuUnfoldOutlined />
                    : <MenuFoldOutlined />
            }
        </div>
    )
}

//全局字体大小
const globalFontSize = [
    {
        key: 'large',
        vaule: 'large'
    },
    {
        key: 'middle',
        vaule: 'middle'
    },
    {
        key: 'small',
        vaule: 'small'
    }
]
//国际化
const internationalization = [
    {
        key: 'zh_CN',
        vaule: '简体中文'
    },
    {
        key: 'en_GB',
        vaule: 'English'
    }
]


export default (props) => {
    const [fullScreen, setFullScreen] = useState(false)
    const { size, idn } = useSelector(store => store.app)
    const dispatch = useDispatch()
    const breadCrumbs = useForBreadCrumbs()

    useEffect(() => {
        screenfull.onchange(() => {
            setFullScreen(screenfull.isFullscreen)
        })
    }, [])

    const screenToSwitch = () => {
        if (screenfull.isEnabled) {
            screenfull.toggle();
        }
    }

    return (
        <Row>
            <Col span={19}>
                <Cexpandbtn {...props} />
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
                        ? <FullscreenExitOutlined onClick={screenToSwitch} />
                        : <FullscreenOutlined onClick={screenToSwitch} />
                }

                <Dropdown
                    overlay={
                        <Menu
                            items={globalFontSize.map(ele => {
                                return (
                                    {
                                        key: ele.key,
                                        label: (
                                            <div
                                                onClick={() => dispatch(ChangeSize(ele.key))}
                                                style={{ color: size == ele.key ? 'red' : '#252525' }}
                                            >
                                                {ele.vaule}
                                            </div>
                                        ),
                                    }
                                )
                            })}
                            className={`clsDropdownMenu ${clsDropdownMenu}`}
                        />
                    }
                    placement="bottomLeft"
                    trigger={['click']}
                >
                    <Tooltip placement="bottom" title='切换字体大小' overlayStyle={{fontSize:'12px'}}>
                        <FontSizeOutlined />
                    </Tooltip>

                </Dropdown>

                <Dropdown overlay={
                    <Menu
                        items={

                            internationalization.map(ele => {
                                return (
                                    {
                                        key: ele.key,
                                        label: (
                                            <div
                                                onClick={() => dispatch(ChangeIdn(ele.key))}
                                                style={{ color: idn == ele.key ? 'red' : '#252525', }}
                                            >
                                                {ele.vaule}
                                            </div>
                                        ),
                                    }
                                )
                            })
                        }
                        className={`clsDropdownMenu ${clsDropdownMenu}`}
                    />
                }
                    placement="bottomLeft"
                    trigger={['click']}
                >
                    <Tooltip placement="bottom" title='切换语言' overlayStyle={{fontSize:'12px'}}>
                        <TranslationOutlined />
                    </Tooltip>

                </Dropdown>


            </Col>
        </Row>
    )
}
