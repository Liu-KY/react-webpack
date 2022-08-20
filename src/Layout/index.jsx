import React, { useState, useEffect } from 'react';
import { Layout, ConfigProvider } from 'antd';
const { Header, Sider, Content } = Layout;
import { useSelector } from 'react-redux'
import { IntlProvider } from 'react-intl'

import 'antd/dist/antd.variable.min.css';
import zhCN from 'antd/es/locale/zh_CN';
import enGB from 'antd/es/locale/en_GB';
import MyenGB from '@/locales/en_GB';
import MyzhCN from '@/locales/zh_CN';


import Qfsider from './Qfsider'
import QfHeader from './QfHeader'
import QfContent from './QfContent'



import style from './style.module.scss'
const { layout } = style
const language = { en_GB: enGB, zh_CN: zhCN }
const Mylanguage = { en_GB: MyenGB, zh_CN: MyzhCN }

export default () => {
    const [collapsed, setCollapsed] = useState(false);
    const { size, idn, color } = useSelector(store => store.app)

    useEffect(
        () => {
            ConfigProvider.config({
                theme: {
                    primaryColor: color.hex,
                },
            })
        }, [color]
    )


    return (
        <ConfigProvider componentSize={size} locale={language[idn]}>
            <IntlProvider messages={Mylanguage[idn]} locale={idn.split('_')[0]}>
                <Layout className={layout}>
                    <Sider trigger={null} collapsible={collapsed} collapsed={collapsed} >
                        <Qfsider />
                    </Sider>

                    <Layout className="site-layout">

                        <Header
                            className="site-layout-background"
                            style={{
                                padding: 0,
                                background: '#ffffff',
                            }}
                        >
                            <QfHeader collapsed={collapsed} scal={() => setCollapsed(!collapsed)} />
                        </Header>

                        <Content
                            className="site-layout-background"
                            style={{
                                margin: '24px 16px',
                                padding: 24,
                                minHeight: 280,
                            }}
                        >
                            <QfContent />
                        </Content>

                    </Layout>
                </Layout>
            </IntlProvider>
        </ConfigProvider>
    )
}