import { createSlice } from '@reduxjs/toolkit'


const initialState = {
  categories: [],
}

export const categorySlice = createSlice({
  name: 'category',
  initialState,
  reducers: {
    saveCategories: (state, action) => {
      state.categories = action.payload
    },
  },
})

export default categorySlice.reducer
export const { saveCategories } = categorySlice.actions

