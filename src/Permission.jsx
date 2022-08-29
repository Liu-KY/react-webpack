import { useEffect, useMemo } from 'react'
import { useRoutes, useNavigate, useLocation } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'

import { getInfo, generateRoutes } from '@/store/actionCreator/UserActions'

import { constantRoutes, asyncRoutes } from '@/pages'



// import Layout from '@/Layout'
// import Login from '@/pages/login'
// import { asyncRoutes } from './pages'
// import Dashboard from '@/pages/dashboard'

const whiteList = ['/login']  // 白名单
export default () => {
    // console.log('-------------------------------------------------开始')

    const navigate = useNavigate()
    const dispatch = useDispatch()
    const { pathname } = useLocation()

    const { token, roles, accessRoutes } = useSelector(stort => stort.user)

    //获取token
    useEffect(() => {
        // console.log('------token')

        if (token) {
            dispatch(getInfo(token))
        } else {
            navigate('/login')
        }

    }, [token])

    //获取用户信息
    useEffect(() => {
        // console.log('------roles')

        if (roles && roles.length !== 0) {
            dispatch(generateRoutes(asyncRoutes, roles))

        }

    }, [roles])

    //跳转首页
    useEffect(() => {
        // console.log('变化了------accessRoutes')

        if (token && accessRoutes && pathname === '/login') {
            navigate('/')
        }

    }, [accessRoutes])

    //路由守卫
    useEffect(() => {
        if (!token && !whiteList.includes(pathname)) {
            navigate('/login')
        }

        if (token && accessRoutes && pathname === '/login') {
            navigate('/')
        }
        if (token && pathname === '/') {
            navigate('/dashboard', { replace: true })
        }
    }, [pathname])

    const routes = useMemo(() => {
        const results = [...constantRoutes]
        results[0].children = accessRoutes
        console.log(results)
        return results
    }, [accessRoutes])

    let element = useRoutes(routes);
    // console.log('-------------------------------------------------结束')

    return element;
}