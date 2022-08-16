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

FROM nginx:alpine
WORKDIR /usr/share/nginx/html
RUN rm -rf ./*
COPY --from=builder /app/build .
COPY --from=dependencies /app/node_modules ./node_module
ENTRYPOINT ["nginx", "-g", "daemon off;"]