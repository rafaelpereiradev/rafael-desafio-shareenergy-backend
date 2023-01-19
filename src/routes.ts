import { Router } from 'express'
import APIController from './controllers/api/api.controller'
import CustomerController from './controllers/customer/customer.controller'
import UserController from './controllers/user/user.controller'
import AuthController from './controllers/auth/auth.controller.ts'
import { authMiddleware } from './middlewares/global.middleware'

const router = Router()

//http-cat routes
router.post('/http-cat', authMiddleware, APIController.httpCat)

//random-dog routes
router.get('/random-dog', authMiddleware, APIController.randomDog)

//random-user routes
router.get('/random-user', authMiddleware, APIController.randomUser)

//customer routes
router.get('/customer/all', authMiddleware, CustomerController.getAll)
router.post('/customer/new', authMiddleware, CustomerController.create)
router.put('/customer/edit/:id', authMiddleware, CustomerController.update)
router.delete('/customer/delete/:id', authMiddleware, CustomerController.delete)

//user e auth routes
router.post('/user/new', UserController.create)
router.post('/auth', AuthController.login)


export default router