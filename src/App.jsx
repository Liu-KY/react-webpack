import { HashRouter, Routes, Route, Navigate } from 'react-router-dom'
import { Provider } from 'react-redux'
import { store, persistor } from '@/store'
import { ConfigProvider } from 'antd';
import {useSelector} from 'react-redux'

import Layout from '@/Layout'
import { asyncRoutes } from './pages'
import Dashboard from '@/pages/dashboard'
import { PersistGate } from 'redux-persist/integration/react'; //持久化



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
        <Provider store={store}>
          <PersistGate loading={null} persistor={persistor}>

              <Routes>
                <Route path='/' element={<Layout />} >
                  {
                    dynamicRout(asyncRoutes)
                  }
                  <Route index element={<Dashboard />} />
                </Route>
                <Route path='*' element={<Navigate to='/dashboard' />} />
              </Routes>

          </PersistGate >
        </Provider>
      </HashRouter>
    </>
  )
}

export default App
