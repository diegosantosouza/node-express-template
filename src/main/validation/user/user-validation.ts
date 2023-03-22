import { Gender, Roles } from "@/domain/models/user";
import { body, param, query } from "express-validator";

const userRoles = Object.values(Roles)
const userGender = Object.values(Gender)
export const idRule = [param('id').isString()]

export const storeRules = [
  body('firstName')
    .isString(),
  body('lastName')
    .isString(),
  body('birthDate')
    .optional()
    .isISO8601()
    .bail()
    .matches(RegExp('^\\d{4}-\\d{2}-\\d{2}$')),
  body('email')
    .isEmail()
    .normalizeEmail(),
  body('password')
    .isLength({ min: 6, max: 100 }),
  body('roles')
    .isArray(),
  body('roles.*')
    .isIn(userRoles),
  body('gender')
    .optional()
    .isIn(userGender),
]

export const indexRules = [
  query('email')
    .optional()
    .isEmail()
    .normalizeEmail(),
  query('roles')
    .optional()
    .isIn(userRoles),
  query('gender')
    .optional()
    .isIn(userGender),
  query('page')
    .optional()
    .isNumeric(),
  query('limit')
    .optional()
    .isNumeric(),
]

export const updateRules = [
  body('firstName')
    .optional()
    .isString(),
  body('lastName')
    .optional()
    .isString(),
  body('birthDate')
    .optional()
    .isISO8601()
    .bail()
    .matches(RegExp('^\\d{4}-\\d{2}-\\d{2}$')),
  body('email')
    .optional()
    .isEmail()
    .normalizeEmail(),
  body('password')
    .optional()
    .isLength({ min: 6, max: 100 }),
  body('roles')
    .optional()
    .isArray(),
  body('roles.*')
    .optional()
    .isIn(userRoles),
  body('gender')
    .optional()
    .isIn(userGender),
].concat(idRule)
