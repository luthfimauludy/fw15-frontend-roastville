import { combineReducers } from "@reduxjs/toolkit"
import message from "./message"

const reducer = combineReducers({
  message,
})

export default reducer
