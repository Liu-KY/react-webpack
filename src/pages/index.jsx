import {
    HomeOutlined,
    TaobaoCircleOutlined,
} from '@ant-design/icons';
import { FormattedMessage } from 'react-intl'


import Layout from '@/Layout'
import Login from '@/pages/login'
import Dashboard from '@/pages/dashboard'
import GoodList from '@/pages/good/GoodList'
import GoodForm from '@/pages/good/GoodForm'

// 静态的没有权限的路由
export const constantRoutes = [
    { key: 1, path: '/', element: <Layout />, children: [] },
    { key: 2, path: '/login', element: <Login /> },
    { key: 3, path: '/*', element: <div>404</div> },
]




// 动态的有权限的路由
export const asyncRoutes = [
    {
        key: 1001,
        path: '/dashboard',
        label: <FormattedMessage id='menu.dashboard' />,
        icon: <HomeOutlined />,
        element: <Dashboard />,
        meta: {
            roles: ['admin', 'editor']
        }
    },
    {
        key: 1002,
        label: <FormattedMessage id='menu.good' />,
        path: '/good',
        icon: <TaobaoCircleOutlined />,
        meta: {
            roles: ['editor', 'admin']
        },
        children: [
            {
                key: 100201,
                path: '/good/list',
                label: <FormattedMessage id='menu.good.list' />,
                icon: null,
                element: <GoodList />,
                index: true,
                meta: {
                    roles: ['admin']
                }
            },
            {
                key: 100202,
                path: '/good/add',
                label: <FormattedMessage id='menu.good.add' />,
                icon: null,
                element: <GoodForm />,
                hidden: true,
                meta: {
                    roles: ['admin']
                }

            },
            {
                key: 100203,
                path: '/good/edit',
                label: <FormattedMessage id='menu.good.edit' />,
                icon: null,
                element: <GoodForm />,
                hidden: true,
                meta: {
                    roles: ['admin']
                }
            },
        ]
    },

]