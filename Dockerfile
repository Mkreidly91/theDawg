FROM node:lts-alpine

WORKDIR /usr/src/Discord-Bot
COPY ["package.json", "package-lock.json*", "npm-shrinkwrap.json*", "./"]
RUN npm ci && npm cache clean --force
COPY . .
EXPOSE 3000
RUN chown -R node:node ./
USER node
CMD ["npm", "start"]
