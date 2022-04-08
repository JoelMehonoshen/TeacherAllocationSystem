# Teacher Allocation System Dockerfile
# Tested on nodejs 15.14

FROM node:15.14-slim
ENV NODE_ENV=production
WORKDIR /app
COPY tas/ ./
RUN npm install --production
RUN npm i -g @adonisjs/cli
EXPOSE 3000
CMD [ "adonis", "serve" ]
