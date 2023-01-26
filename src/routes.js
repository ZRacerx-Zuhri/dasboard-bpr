import React from 'react'

const Dashboard = React.lazy(() => import('./views/dashboard/Dashboard'))
const DetailDashboard = React.lazy(() => import('./views/dashboard/dashboard/DetailDashboard'))
const History = React.lazy(() => import('./views/history/History'))
const DetailHistory = React.lazy(() => import('./views/history/history/DetailHistory'))
// const DetailTartun = React.lazy(() => import('./views/history/history/DetailTartun'))

const routes = [
  { path: '/', exact: true, name: 'Home', element: Dashboard },
  { path: '/dashboard', name: 'Home', element: Dashboard },
  { path: '/dashboard/detail/:bpr_id', name: 'Detail Dashboard', element: DetailDashboard },
  { path: '/history', name: 'History', element: History },
  { path: '/history/detail/:bpr_id/:no_rek', name: 'Detail History', element: DetailHistory },
]

export default routes
