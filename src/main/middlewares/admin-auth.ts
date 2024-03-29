import { Roles } from "@/domain/models/user";
import { adaptMiddleware } from "../adapters/express-middleware-adapter";
import { makeAuthMiddleware } from "../factories/middlewares/auth-middleware-factory";

export const adminAuth = adaptMiddleware(makeAuthMiddleware(Roles.ADMIN))
