import React from 'react'

const Dashboard = React.lazy(() => import('./views/dashboard/Dashboard'))
const DetailDashboard = React.lazy(() => import('./views/dashboard/dashboard/DetailDashboard'))
const History = React.lazy(() => import('./views/history/History'))
const DetailHistory = React.lazy(() => import('./views/history/history/DetailHistory'))
const DetailKonsolidasi = React.lazy(() => import('./views/konsolidasi/DetailKonsolidasi'))
// const DetailTartun = React.lazy(() => import('./views/history/history/DetailTartun'))

const routes = [
  { path: '/', exact: true, name: 'Home', element: Dashboard },
  { path: '/dashboard', name: 'Home', element: Dashboard },
  { path: '/dashboard/detail/:bpr_id', name: 'Detail Dashboard', element: DetailDashboard },
  { path: '/history', name: 'History', element: History },
  { path: '/konsolidasi', name: 'Detail Konsolidasi', element: DetailKonsolidasi },
  {
    path: '/history/detail/:bpr_id/:no_rek/:status',
    name: 'Detail History',
    element: DetailHistory,
  },
]

export default routes
