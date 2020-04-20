FROM node:10-alpine AS builder

RUN apk add --no-cache alpine-sdk python2 git
RUN adduser -D builder

USER builder
RUN mkdir /home/builder/build
WORKDIR /home/builder/build

COPY ./package-lock.json ./package.json ./
RUN npm ci


FROM node:10-alpine

RUN apk add --no-cache curl
RUN adduser -D lisk

COPY ./ /home/lisk/lisk-service/core/
COPY --from=builder /home/builder/build/node_modules/ /home/lisk/lisk-service/core/node_modules/

USER lisk
WORKDIR /home/lisk/lisk-service/core
CMD ["node", "app.js"]
EXPOSE 9904