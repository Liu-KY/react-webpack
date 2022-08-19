import { useLocation } from 'react-router-dom'
import { asyncRoutes } from '@/pages'

export default function useCurrentlySelect() {
    const { pathname } = useLocation()
    let resultsOf = [[], []]
    asyncRoutes.forEach(item1 => {
        if (item1.children) {
            item1.children.forEach(item2 => {
                if (item2.path == pathname) resultsOf = [[item2.key + ''], [item1.key + '']]
            })
        } else {
            if (item1.path == pathname) resultsOf = [[item1.key + ''], []]
        }
    })

    return resultsOf

}


