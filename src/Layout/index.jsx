import React, { useState } from 'react';
import {Outlet} from 'react-router-dom'

import { Layout } from 'antd';
const { Header, Sider, Content } = Layout;

import Qfsider from './Qfsider'

import style from './style.module.scss'
const { layout } = style


export default () => {
    const [collapsed, setCollapsed] = useState(false);
    return (
        <Layout className={layout}>
            <Sider trigger={null} collapsible={collapsed} collapsed={collapsed} >
                <Qfsider collapsed={collapsed}  scal={()=>setCollapsed(!collapsed)}/>
            </Sider>
            <Layout className="site-layout">
                <Header
                    className="site-layout-background"
                    style={{
                        padding: 0,
                    }}
                >
                    
                </Header>
                <Content
                    className="site-layout-background"
                    style={{
                        margin: '24px 16px',
                        padding: 24,
                        minHeight: 280,
                    }}
                >
                    <Outlet />
                </Content>
            </Layout>
        </Layout>
    )
}