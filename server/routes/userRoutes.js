import express from 'express'
import { registerUser, loginUser, userCredit, paymentRazorpay, verifyRazorpay } from '../controllers/userController.js'
import userAuth from '../middlewares/auth.js'

const userRouter = express.Router()

userRouter.post('/register', registerUser)
userRouter.post('/login', loginUser)
userRouter.get('/credit',userAuth,userCredit)
userRouter.post('/pay-razorpay',userAuth,paymentRazorpay)
userRouter.post('/verify-razorpay',userAuth,verifyRazorpay)

export default userRouter
