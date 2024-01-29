import { Router } from 'express'
import adaptRoute from '@/main/adapters/express-route-adapter'
import { makeUserCreateController } from '../factories/controllers/user/user-create-controller-factory'
import { makeUserIndexController } from '../factories/controllers/user/user-index-controller-factory'
import { makeUserUpdateController } from '../factories/controllers/user/user-update-controller-factory'
import { makeUserShowController } from '../factories/controllers/user/user-show-controller-factory'
import { makeUserRemoveController } from '../factories/controllers/user/user-remove-controller-factory'
import { makeSignInController } from '../factories/controllers/user/signin-controller-factory'
import { adminAuth } from '../middlewares/admin-auth'
import { auth } from '../middlewares/auth'

const userRouter = Router()

userRouter.post('/user', adaptRoute(makeUserCreateController()))
userRouter.get('/user', adaptRoute(makeUserIndexController()))
userRouter.get('/user/:id', adaptRoute(makeUserShowController()))
userRouter.put('/user/:id', auth, adaptRoute(makeUserUpdateController()))
userRouter.delete('/user/:id', adminAuth, adaptRoute(makeUserRemoveController()))

userRouter.post('/signin', adaptRoute(makeSignInController()))


export default userRouter
