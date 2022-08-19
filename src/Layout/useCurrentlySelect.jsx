import { useLocation } from 'react-router-dom'
import { asyncRoutes } from '@/pages'
import { useMemo } from 'react'

export default function useCurrentlySelect() {
    const { pathname } = useLocation()
    return useMemo(() => {

        let resultsOf = [['1001'], []]
        console.log('------')
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
    }, [])

}


