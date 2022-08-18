import Layout from '@/Layout'
import { HashRouter, Routes, Route,Navigate } from 'react-router-dom'
import { asyncRoutes } from './pages'


function dynamicRout(routes) {
  let results = []
  routes.forEach(ele => {
    if (ele.children && ele.path) {
      results.push(
        <Route path={ele.path} element={ele.element} key={ele.key}>
          {
            dynamicRout(ele.children)
          }
        </Route>
      )
    } else if (ele.path && ele.element) {
      results.push(<Route path={ele.path} element={ele.element} key={ele.key} />)
    }
  })
  return results
}

// 根组件
function App() {

  return (
    <>
      <HashRouter>
        <Routes>
          <Route path='/' element={<Layout />} >
            {
              dynamicRout(asyncRoutes)
            }
          </Route>
          <Route path='*' element={<Navigate to='/dashboard' />}/>
        </Routes>
      </HashRouter>
    </>
  )
}

export default App
