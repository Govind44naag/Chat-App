import express from 'express'
import {register,login,logout} from '../controllers/userController.js'
const router=express.Router()
import isAuthenticated from '../mddleware/isAuthenticated.js'
import { getOtherUsers } from '../controllers/userController.js'

router.route('/register').post(register)
router.route('/login').post(login)
router.route('/logout').get(logout)
router.route('/').get(isAuthenticated,getOtherUsers)
export default router