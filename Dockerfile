FROM node:lts-alpine
WORKDIR /usr/src/app
ARG BETTER_AUTH_URL
ARG BETTER_AUTH_SECRET
ARG MONGODB_URI
ENV BETTER_AUTH_URL=$BETTER_AUTH_URL
ENV BETTER_AUTH_SECRET=$BETTER_AUTH_SECRET
ENV MONGODB_URI=$MONGODB_URI
COPY ["package.json", "package-lock.json*", "npm-shrinkwrap.json*", "./"]
RUN npm install
COPY . .
EXPOSE 3000
RUN chown -R node /usr/src/app
RUN npm run build
USER node
CMD ["npm", "run", "start"]
