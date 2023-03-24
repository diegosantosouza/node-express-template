import { Router } from 'express'
import adaptRoute from '@/main/adapters/express-route-adapter'
import { idRule, indexRules, storeRules, updateRules, signInRules } from '../validation/user/user-validation'
import { makeUserCreateController } from '../factories/controllers/user/user-create-controller-factory'
import { requestValidator } from '../middlewares/request-validator'
import { makeUserIndexController } from '../factories/controllers/user/user-index-controller-factory'
import { makeUserUpdateController } from '../factories/controllers/user/user-update-controller-factory'
import { makeUserShowController } from '../factories/controllers/user/user-show-controller-factory'
import { makeUserRemoveController } from '../factories/controllers/user/user-remove-controller-factory'
import { makeSignInController } from '../factories/controllers/user/signin-controller-factory'

const userRouter = Router()

userRouter.post('/user', storeRules, requestValidator, adaptRoute(makeUserCreateController()))
userRouter.get('/user', indexRules, requestValidator, adaptRoute(makeUserIndexController()))
userRouter.get('/user/:id', idRule, requestValidator, adaptRoute(makeUserShowController()))
userRouter.put('/user/:id', updateRules, requestValidator, adaptRoute(makeUserUpdateController()))
userRouter.delete('/user/:id', idRule, requestValidator, adaptRoute(makeUserRemoveController()))

userRouter.post('/signin', signInRules, requestValidator, adaptRoute(makeSignInController()))


export default userRouter
