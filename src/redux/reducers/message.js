import { createSlice } from "@reduxjs/toolkit"

const initialState = {
  data: "",
}

const MessageSlice = createSlice({
  name: "message",
  initialState,
  reducers: {
    setMessage: (state, action) => {
      state.data = action.payload
    },
    clearMessage: () => {
      return initialState
    },
  },
})

export const { setMessage, clearMessage } = MessageSlice.actions
export default MessageSlice.reducer
