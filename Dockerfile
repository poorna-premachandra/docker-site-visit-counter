FROM node:alpine

WORKDIR /app

#destination 'root' is now changed to '/app'
COPY package.json .

#RUN is executed when building the image
RUN npm install

#COPY is done in 2 steps so any chnages to index.js doesn't force docker to run npm install again when building the image.
#Becasue if the docker detects something is changed while executing commands in Dockerfile one by one, it will not use the cache anymore and executes all the commands again following that one changed line.
COPY . .

#The default command. CMD is executed when spawning a container from the image. There can be only one CMD per Dockerfile.
CMD ["npm", "start"]


