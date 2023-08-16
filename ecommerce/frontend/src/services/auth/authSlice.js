import { createSlice } from '@reduxjs/toolkit'


const initialState = {
  user: {},
}

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    saveUser: (state, action) => {
      state.user = action.payload
    },
  },
})

export default authSlice.reducer
export const { saveUser } = authSlice.actions

