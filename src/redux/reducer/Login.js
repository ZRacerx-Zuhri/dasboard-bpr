import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'

const axiosInstance = axios.create({
  baseURL: 'https://gw-dev-api.medtransdigital.com',
  // baseURL: "http://172.17.221.140:3005",
})

const initialState = {
  data: null,
  fetching: false,
  success: false,
  failed: false,
}

export const login = createAsyncThunk('login/post', async (data, { rejectWithValue }) => {
  try {
    const res = await axiosInstance.post('/mdw/login', data)
    console.log(res.data)
    if (res.data.code !== '000') return rejectWithValue(res.data.message)
    return res.data
  } catch (error) {
    console.log('error Login', error.message)
    return rejectWithValue(error.message)
  }
})

const LoginSlice = createSlice({
  name: 'login',
  initialState,
  reducers: {
    resetLogin: () => initialState,
  },

  extraReducers: {
    [login.pending]: (state, action) => {
      // console.log('action', action.type)
      state.data = null
      state.fetching = true
      state.success = false
      state.failed = false
    },
    [login.fulfilled]: (state, action) => {
      // console.log('action', action.type)
      state.data = action.payload
      state.fetching = false
      state.success = true
      state.failed = false
    },
    [login.rejected]: (state, action) => {
      // console.log('action', action.type)
      state.data = action.payload
      state.fetching = false
      state.success = false
      state.failed = true
    },
  },
})

export const { resetLogin } = LoginSlice.actions

export default LoginSlice.reducer
