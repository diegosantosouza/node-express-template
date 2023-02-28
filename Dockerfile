FROM node:18-alpine as builder
WORKDIR /app
COPY . .
RUN yarn install
RUN yarn run build

FROM node:18-alpine
ENV NODE_ENV=production
WORKDIR /app
COPY --from=builder app/dist /app/dist
COPY --from=builder app/package*.json /app/
RUN yarn install --frozen-lockfile
EXPOSE 3000