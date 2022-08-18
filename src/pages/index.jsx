
import {
    HomeOutlined,
    TaobaoCircleOutlined,
} from '@ant-design/icons';

import Dashboard from '@/pages/dashboard'
import StudyRedux from '@/pages/redux'
import GoodList from '@/pages/good/GoodList'
import GoodForm from '@/pages/good/GoodForm'


// 静态的没有权限的路由
export const constantRoutes = [

]

// 动态的有权限的路由
export const asyncRoutes = [
    {
        key: 1001,
        path: '/dashboard',
        label: '首页',
        icon: <HomeOutlined />,
        element: <Dashboard />
    },
    {
        key: 1002,
        label: '商品管理',
        path: '/good',
        icon: <TaobaoCircleOutlined />,
        children: [
            {
                key: 100201,
                path: '/good/list',
                label: '商品列表',
                icon: null,
                element: <GoodList />
            },
            {
                key: 100202,
                path: '/good/add',
                label: '商品新增',
                icon: null,
                element: <GoodForm />
            },
            {
                key: 100203,
                path: '/good/edit',
                label: '商品编辑',
                icon: null,
                element: <GoodForm />,
                hidden: true, 
            }
        ]
    }
]