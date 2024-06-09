import express from "express"
const router = express.Router()

import {
    login,
    signup,
  } from "../controllers/Auth.js"

// import { auth } from "../middlewares/auth"

router.post("/login", login)

// Route for user signup
router.post("/signup", signup)

export default router