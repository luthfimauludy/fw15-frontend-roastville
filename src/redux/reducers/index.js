import { combineReducers } from "@reduxjs/toolkit"
import { persistReducer } from "redux-persist"
import storage from "redux-persist/lib/storage"
import message from "./message"
import productReducer from "./product"


const productConf = {
  key: "productData",
  storage,
}


const reducer = combineReducers({
  message,
  product: persistReducer(productConf, productReducer),
})

export default reducer

