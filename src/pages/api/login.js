import { withIronSessionApiRoute } from "iron-session/next"
import cookieConfig from "@/helpers/cookieConfig"

export default withIronSessionApiRoute(async function loginRoute(req, res) {
  try {
    const request = await fetch("http://localhost:8080/auth/login", {
      method: "POST",
      body: new URLSearchParams(req.body).toString(),
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
    })
    const response = await request.json()
    const token = response?.results?.token
    if (token) {
      req.session.token = token
      await req.session.save()
    }
    if (response.success === false) {
      return res.status(400).json(response)
    } else {
      return res.json(response)
    }
  } catch (err) {
    const message = err.response?.data?.message
    if (message) {
    }
  }
}, cookieConfig)
