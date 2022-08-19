import { useLocation } from 'react-router-dom'
import { asyncRoutes } from '@/pages'
import {useMemo} from 'react'

// const getBread = (route, path) => {
//     let results = []


//     route.forEach(item => {
//         let str2 = item.path.split('/')
//         console.log(path[0],'-----',str2[1])
//         if (path[0] === str2[1]) {
//             results.push(item)
//             if (item.children) {
//                 path.shift()
//                 console.log(route,path)
//                 let arr = getBread(route,item.children)
//                 console.log(arr)
//                 // results.push(...arr)

//             }
//         }

//     })
//     console.log(results)

// }




// export default () => {
//     const { pathname } = useLocation()

//     let results = [asyncRoutes[0]]
//     if (pathname === '/') return results

//     let newRoute = [...asyncRoutes]
//     newRoute.shift()
//     let str = pathname.split('/')
//     str.shift()


//     console.log(str)
//     results = getBread(newRoute, str)
//     console.log(results)

// }

















const getBread = (route, path) => {
    let results = [route[0]]
    if (path === '/') return results

    let newRoute = [...route]
    let str = path.split('/')
    newRoute.shift()
    newRoute.forEach(item => {
        let str2 = item.path.split('/')
        if (str[1] === str2[1]) {
            results.push(item)
            if (item.children) {
                item.children.forEach(el => {
                    if (el.path == path) {
                        results.push(el)
                    }
                })
            }
        }
    })
    return results
}


export default () => {
    const { pathname } = useLocation()

    return useMemo(() => {
        return getBread(asyncRoutes, pathname)
    }, [pathname])
}