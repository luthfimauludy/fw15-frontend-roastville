import "@/styles/globals.css"
import { Rubik } from "next/font/google"
import { Provider } from "react-redux"
import { store, persistor } from "../redux/store"
import { PersistGate } from "redux-persist/integration/react"
import ProgressBar from "@/components/top-loading-bar"
const rubik = Rubik({
  weight: "400",
  subsets: ["latin"],
})

export default function App({ Component, pageProps }) {
  return (
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <main className={rubik.className}>
          <ProgressBar />
          <Component {...pageProps} />
        </main>
      </PersistGate>
    </Provider>
  )
}
