import "@/styles/globals.css"
import { Rubik } from "next/font/google"
import { Provider } from "react-redux"
import store from "../redux/store"

const rubik = Rubik({
  weight: "400",
  subsets: ["latin"],
})

export default function App({ Component, pageProps }) {
  return (
    <Provider store={store}>
      <main className={rubik.className}>
        <Component {...pageProps} />
      </main>
    </Provider>
  )
}
