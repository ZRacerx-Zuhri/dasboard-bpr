import { configureStore } from '@reduxjs/toolkit'
import UserLogin from '../reducer/Login'

const Store = configureStore({
  reducer: {
    UserLogin,
  },
})

export default Store
