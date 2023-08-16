import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import cartService from './cartService'

const initialState = {
  cart: {
    // user: id
    items:[],
    total:0
  },
}

// Create new cart
export const createCart = createAsyncThunk(
  'carts/create',
  async (cart, thunkAPI) => {
    try {
      // const token = thunkAPI.getState().auth.user.token
      return await cartService.create(cart)
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

// Get user cart
export const getCart = createAsyncThunk(
  'carts/get',
  async (userId, thunkAPI) => {
    try {
      return await cartService.findById(userId)
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

export const updateCart = createAsyncThunk(
  'cart/update',
  async (cart, thunkAPI) => {
    try {
      return await cartService.update(cart)
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

export const deleteCart = createAsyncThunk(
  'cart/delete',
  async (cart, thunkAPI) => {
    try {
      return await cartService.deleteCart(cart)
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
export const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addProduct: (state, action) => {
      console.log(state);
      let product = action.payload
      console.log(product);
      let itemIndex = state.cart.items.findIndex((cartItem)=> cartItem.productId == product._id)
      console.log(itemIndex);
      if (itemIndex > -1) {
        state.cart.items[itemIndex].quantity++ ;
      } else {
        // increase quanitity
        state.cart.items.push({
          quantity: 1,
          productId: product._id,
          price: product.price,
          name: product.name,
          _id: product._id
        })
      }
    },
    // removeProduct:
    // decreaseProdcut
    reset: (state) => initialState,

  },
  extraReducers: (builder) => {
    builder
      // create cart 
      .addCase(createCart.pending, (state) => {
        state.isLoading = true
      })
      .addCase(createCart.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.cart = action.payload
      })
      .addCase(createCart.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
      })
      // get cart
      .addCase(getCart.pending, (state) => {
        state.isLoading = true
      })
      .addCase(getCart.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.cart = action.payload
      })
      .addCase(getCart.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
      })
      // update cart
      .addCase(updateCart.pending, (state) => {
        state.isLoading = true
      })
      .addCase(updateCart.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
      })
      .addCase(updateCart.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
      })
      // delete cart
      .addCase(deleteCart.pending, (state) => {
        state.isLoading = true
      })
      .addCase(deleteCart.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.cart ={}
      })
      .addCase(deleteCart.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
      })
  },
})

export const { reset,addProduct } = cartSlice.actions
export default cartSlice.reducer
// export const { addProduct } = cartSlice.actions

