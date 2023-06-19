import { createSlice } from "@reduxjs/toolkit"

const initialState = {
  data: "",
}

const product = createSlice({
  name: "product",
  initialState,
  reducers: {
    productDetail: (state, action) => {
      state.data = action.payload
    },
    clearProduct: () => {
      return initialState
    },
  },
})

export const { productDetail, clearProduct } = product.actions
export default product.reducer
