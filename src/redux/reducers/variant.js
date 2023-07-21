import { createSlice } from "@reduxjs/toolkit"

const initialState = {
  data: {
    code: "",
    name: "",
    price: "",
    quantity: "",
  },
}

const product = createSlice({
  name: "variant",
  initialState,
  reducers: {
    variantDetail: (state, action) => {
      state.data = action.payload
    },
    clearVariant: () => {
      return initialState
    },
  },
})

export const { productDetail, clearProduct } = product.actions
export default product.reducer
