import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import productsService from './productsService'

const initialState = {
  products: [],
  product:{},
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: '',
}

// Create new product
export const createProduct = createAsyncThunk(
  'products/create',
  async (product, thunkAPI) => {
    try {
      // const token = thunkAPI.getState().auth.user.token
      return await productsService.create(product)
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString()
      return thunkAPI.rejectWithValue(message)
    }
  }
)

// Get user products
export const getproducts = createAsyncThunk(
  'products/getAll',
  async ({filter,search}, thunkAPI) => {
    try {
      console.log({filter,search});
      // const token = thunkAPI.getState().auth.user.token
        return await productsService.index({filter,search})
     
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString()
      return thunkAPI.rejectWithValue(message)
    }
  }
)

// Get user product by id
export const getproductById = createAsyncThunk(
  'products/getById',
  async ({id}, thunkAPI) => {
    try {
        return await productsService.findById({id})
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString()
      return thunkAPI.rejectWithValue(message)
    }
  }
)
export const productsSlice = createSlice({
  name: 'product',
  initialState,
  reducers: {
    reset: (state) => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(createProduct.pending, (state) => {
        state.isLoading = true
      })
      .addCase(createProduct.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.products.push(action.payload)
      })
      .addCase(createProduct.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
      })
      .addCase(getproducts.pending, (state) => {
        state.isLoading = true
      })
      .addCase(getproducts.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.products = action.payload
      })
      .addCase(getproducts.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
      })
      .addCase(getproductById.pending, (state) => {
        state.isLoading = true
      })
      .addCase(getproductById.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.product = action.payload
      })
      .addCase(getproductById.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
      })
  },
})

export const { reset } = productsSlice.actions
export default productsSlice.reducer
