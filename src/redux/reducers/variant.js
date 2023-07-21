import { createSlice } from "@reduxjs/toolkit"

const initialState = {
  data: {
    code: "",
    name: "",
    price: "",
    quantity: "",
  },
}

const variant = createSlice({
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

export const { variantDetail, clearVariant } = variant.actions
export default variant.reducer
