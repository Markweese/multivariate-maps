FROM node:alpine

# set /app as working directory on the VM
WORKDIR "/app"

# copy package.json
COPY package.json .

# install deps
RUN npm install

# copy over everything else
COPY . .

# run webpack and prod scripts
CMD ["npm", "run", "prod"]
