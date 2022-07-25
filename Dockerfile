FROM node:17.1.0-alpine3.12 AS dependencies
WORKDIR /app
COPY package.json ./
RUN yarn install

FROM node:17.1.0-alpine3.12 AS builder

# Env vars
ARG REACT_APP_ENV
ARG REACT_APP_EMPLOYEES_URL

WORKDIR /app
COPY --from=dependencies /app/node_modules ./node_modules
COPY . .
RUN REACT_APP_ENV=${REACT_APP_ENV} \ 
    REACT_APP_EMPLOYEES_URL=${REACT_APP_EMPLOYEES_URL} \
    yarn build 

FROM node:17.1.0-alpine3.12 AS runner
RUN npm install -g serve
WORKDIR /app

COPY --from=builder /app/build ./build
COPY --from=dependencies /app/node_modules ./node_modules
USER node
EXPOSE 3000
CMD [ "serve", "-s", "build", "-l",  "3000" ]