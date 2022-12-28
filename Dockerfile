FROM node:16-alpine3.16 AS builder
WORKDIR /app
COPY package.json .
COPY yarn.lock .
RUN yarn install
COPY . .
RUN yarn build 

FROM nginx:alpine
EXPOSE 80
RUN rm -rf /etc/nginx/conf.d
COPY conf /etc/nginx

WORKDIR /usr/share/nginx/html
RUN rm -rf ./*

COPY --from=builder /app/build .
COPY bin .
COPY .env .
RUN chmod +x env.sh

CMD ["/bin/sh", "-c", "/usr/share/nginx/html/env.sh && nginx -g \"daemon off;\""]