FROM node
ADD . /rest-api
WORKDIR /rest-api
RUN npm ci || npm i
RUN npm run build
ENTRYPOINT npm run start:prod
