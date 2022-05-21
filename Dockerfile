FROM node:alpine

ARG NODE_ENV=production
ENV NODE_ENV=$NODE_ENV

WORKDIR /web

COPY package.json yarn.lock ./

#RUN apk --no-cache add yarn --repository=http://dl-cdn.alpinelinux.org/alpine/edge/community && yarn set version berry
#RUN yarn install --immutable --no-cache --production
# RUN yarn set version berry
# RUN yarn set version from sources

RUN yarn install

COPY . .

EXPOSE 4000

CMD node -r esm ./server/bin/www

# COPY README.md package.json gulpfile.js __BUILD_NUMBER ./
# or
# COPY ["__BUILD_NUMBER", "README.md", "gulpfile", "another_file", "./"]

# COPY dir1 dir2 ./
# that actually works like
# COPY dir1/* dir2/* ./

# docker build -t keschat/weathercompanion:latest .
# docker push keschat/weathercompanion:tagname