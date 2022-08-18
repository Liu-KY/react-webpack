import logo1 from '../assets/logo1.webp'
import logo2 from '../assets/logo2.png'
import style from './style.module.scss'
const { cexpandbtn, logo, logoImg1, logoImg2 } = style

import {
    MenuFoldOutlined,
    MenuUnfoldOutlined,
} from '@ant-design/icons';
import { Menu, Image } from 'antd';

import { asyncRoutes } from '@/pages'
import useCurrentlySelect from './useCurrentlySelect'
import { NavLink } from 'react-router-dom'


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

function getItem(Routes) {
    if (Routes.hidden) return
    return {
        key: Routes.key,
        icon: Routes.icon || null,
        children: Routes.children ? Routes.children.map(ele => getItem(ele)) : null,
        label: Routes.path ? <NavLink to={Routes.path} >{Routes.label}</NavLink> : Routes.label,
        path: Routes.path || null,
    };
}

function handleMenuList(routingList) {
    let result = []
    for (let i = 0; i < routingList.length; i++) {
        result.push(getItem(routingList[i]))
    }
    return result
}

 
export default (props) => {
    const { collapsed } = props
    const [selectedKeys, openKeys]=  useCurrentlySelect()
    console.log(selectedKeys, openKeys)
    return (
        <>
            <div className={logo}>
                <Image src={collapsed ? logo2 : logo1} preview={false} className={collapsed ? logoImg2 : logoImg1} />
            </div>
            <Menu
                defaultOpenKeys={openKeys}
                defaultSelectedKeys={selectedKeys}
                mode="inline"
                theme="dark"
                items={handleMenuList(asyncRoutes)}
            />
            <Cexpandbtn {...props} />
        </>
    )
}