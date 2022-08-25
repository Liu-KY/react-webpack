import logo1 from '../assets/logo1.webp'
import logo2 from '../assets/logo2.png'
import style from './style.module.scss'
const { logo, logoImg1, logoImg2, CsMenu } = style


import { Menu, Image } from 'antd';


import { asyncRoutes } from '@/pages'
import useCurrentlySelect from './useCurrentlySelect'
import { NavLink } from 'react-router-dom'




function getItem(Routes) {
    if (Routes.hidden) return
    return {
        key: Routes.key,
        icon: Routes.icon || null,
        children: Routes.children ? Routes.children.map(ele => getItem(ele)) : null,
        label: Routes.path && Routes.element ? <NavLink to={Routes.path} >{Routes.label}</NavLink> : Routes.label,
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
    const [selectedKeys, openKeys] = useCurrentlySelect()
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
                className={CsMenu}
            />
        </>
    )
}