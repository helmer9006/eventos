FROM node:18-alpine3.15 
# Create app directory 
WORKDIR /app 
# A wildcard is used to ensure both package.json AND package-lock.json are copied 
COPY package*.json ./ 
# Install app dependencies 
RUN npm install 
# Bundle app source 
COPY . . 
# Creates a "dist" folder with the production build 
RUN npx prisma generate
RUN npm run build 
#EXPOSE 4000
# Start the server using the production build 
CMD npx prisma migrate deploy && npm run start