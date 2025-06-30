import express from 'express'
import { register , login,isAuth, logout} from '../Controllers/userController.js';
import { authUser } from '../Middelware/authUser.js';



 const userRouter = express.Router();




 userRouter.post('/register', register)
 userRouter.post('/login', login)
 userRouter.get('/is-auth' ,authUser, isAuth)
 userRouter.post('/logout' , logout)
 export default userRouter

