import { createSlice } from "@reduxjs/toolkit"

const initialState = {
  data: {
    id: "",
    name: "",
    picture: "",
    description: "",
    variant: [],
  },
}

const product = createSlice({
  name: "product",
  initialState,
  reducers: {
    productDetail: (state, action) => {
      state.data = action.payload
    },
    variantDetail: (state, action) => {
      state.data.variant = action.payload
    },
    addSelectedQty: (state, action) => {
      state.data.variant.selectedQty = action.payload
    },
    clearProduct: () => {
      return initialState
    },
  },
})

export const { productDetail, variantDetail, addSelectedQty, clearProduct } =
  product.actions
export default product.reducer
