[![Coverage Status](https://coveralls.io/repos/github/diegosantosouza/node-express-template/badge.svg)](https://coveralls.io/github/diegosantosouza/node-express-template)

# ts-node-project-setup

## Run dev

```
yarn install
docker-compose up -d
```

## Endpoint

```
http://localhost:3000
```

## To implement

### - User

- [x] create
- [x] show
- [x] update
- [x] delete
- [x] index
- [x] find by email


# Cobertura de Testes

File                                    | % Stmts | % Branch | % Funcs | % Lines | Uncovered Line #s 
----------------------------------------|---------|----------|---------|---------|-------------------
All files                               |   93.84 |    95.45 |   87.14 |   93.75 |                   
 data/usecases/user                     |     100 |      100 |     100 |     100 |                   
  db-authentication.ts                  |     100 |      100 |     100 |     100 |                   
  db-create-user.ts                     |     100 |      100 |     100 |     100 |                   
  db-index-user.ts                      |     100 |      100 |     100 |     100 | 
  db-remove-user.ts                     |     100 |      100 |     100 |     100 | 
  db-show-user.ts                       |     100 |      100 |     100 |     100 | 
  db-update-user.ts                     |     100 |      100 |     100 |     100 | 
  index.ts                              |     100 |      100 |     100 |     100 | 
  load-account-by-token.ts              |     100 |      100 |     100 |     100 | 
 domain/models                          |     100 |      100 |     100 |     100 | 
  user.ts                               |     100 |      100 |     100 |     100 | 
 infrastructure/cryptography            |     100 |      100 |     100 |     100 | 
  bcrypt-adapter.ts                     |     100 |      100 |     100 |     100 | 
  index.ts                              |     100 |      100 |     100 |     100 | 
  jwt-adapter.ts                        |     100 |      100 |     100 |     100 | 
 infrastructure/db/mongodb              |   79.41 |       75 |   71.42 |   79.41 | 
  mongo-helper.ts                       |   73.07 |       75 |      60 |   73.07 | 20-21,32-33,56-61
  mongo-memory-server-helper.ts         |     100 |      100 |     100 |     100 | 
 infrastructure/db/mongodb/repositories |     100 |      100 |     100 |     100 | 
  user-repository.ts                    |     100 |      100 |     100 |     100 | 
 infrastructure/db/mongodb/schemas      |     100 |      100 |     100 |     100 | 
  user.ts                               |     100 |      100 |     100 |     100 | 
 infrastructure/log                     |    62.5 |      100 |      40 |    62.5 | 
  winston-adapter.ts                    |    62.5 |      100 |      40 |    62.5 | 25-33
 presentation/controllers/healthcheck   |     100 |      100 |     100 |     100 | 
  healthcheck.controller.ts             |     100 |      100 |     100 |     100 | 
 presentation/controllers/user          |     100 |      100 |     100 |     100 | 
  signin.controller.ts                  |     100 |      100 |     100 |     100 | 
  user-create.controller.ts             |     100 |      100 |     100 |     100 | 
  user-index.controller.ts              |     100 |      100 |     100 |     100 | 
  user-remove.controller.ts             |     100 |      100 |     100 |     100 | 
  user-show.controller.ts               |     100 |      100 |     100 |     100 | 
  user-update.controller.ts             |     100 |      100 |     100 |     100 | 
 presentation/errors                    |      76 |      100 |      50 |      76 | 
  access-denied-error.ts                |     100 |      100 |     100 |     100 | 
  email-in-use-error.ts                 |   33.33 |      100 |       0 |   33.33 | 3-4
  index.ts                              |     100 |      100 |     100 |     100 | 
  invalid-param-error.ts                |   33.33 |      100 |       0 |   33.33 | 3-4
  missing-param-error.ts                |   33.33 |      100 |       0 |   33.33 | 3-4
  server-error.ts                       |     100 |      100 |     100 |     100 | 
  unauthorized-error.ts                 |     100 |      100 |     100 |     100 | 
 presentation/helpers                   |   96.15 |      100 |    87.5 |     100 | 
  http-helper.ts                        |      96 |      100 |    87.5 |     100 | 
  index.ts                              |     100 |      100 |     100 |     100 | 
 presentation/middlewares               |     100 |      100 |     100 |     100 | 
  auth-middleware.ts                    |     100 |      100 |     100 |     100 | 
  index.ts                              |     100 |      100 |     100 |     100 | 
