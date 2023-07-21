import { combineReducers } from "@reduxjs/toolkit"
import { persistReducer } from "redux-persist"
import storage from "redux-persist/lib/storage"

import message from "./message"
import productReducer from "./product"
import profileReducer from "./profile"
import variant from "./variant"

const productConf = {
  key: "product",
  storage,
}
const profileConfig = {
  key: "profile",
  storage,
}
const reducer = combineReducers({
  message,
  variant,
  product: persistReducer(productConf, productReducer),
  profile: persistReducer(profileConfig, profileReducer),
})

export default reducer
