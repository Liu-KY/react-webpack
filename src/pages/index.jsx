
import {
    HomeOutlined,
    TaobaoCircleOutlined,
} from '@ant-design/icons';

import Dashboard from '@/pages/dashboard'
import StudyRedux from '@/pages/redux'
import GoodList from '@/pages/good/GoodList'
import GoodForm from '@/pages/good/GoodForm'
import {FormattedMessage} from 'react-intl'

// 静态的没有权限的路由
export const constantRoutes = [

]

// 动态的有权限的路由
export const asyncRoutes = [
    {
        key: 1001,
        path: '/dashboard',
        label:  <FormattedMessage id='menu.dashboard'/>,
        icon: <HomeOutlined />,
        element: <Dashboard />
    },
    {
        key: 1002,
        label: <FormattedMessage id='menu.good'/>,
        path: '/good',
        icon: <TaobaoCircleOutlined />,
        children: [
            {
                key: 100201,
                path: '/good/list',
                label: <FormattedMessage id='menu.good.list'/>,
                icon: null,
                element: <GoodList />
            },
            {
                key: 100202,
                path: '/good/add',
                label: <FormattedMessage id='menu.good.add'/>,
                icon: null,
                element: <GoodForm />
            },
            {
                key: 100203,
                path: '/good/edit',
                label:  <FormattedMessage id='menu.good.edit'/>,
                icon: null,
                element: <GoodForm />,
                hidden: true, 
            }
        ]
    }
]