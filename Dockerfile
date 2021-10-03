# Specify A Base Image
FROM node:current

# Specify The Working Directoy Inside The Docker Container
# Otherwise Defaults To Root Directory
WORKDIR /usr/app

# Copy package.json File From simple-server Into Docker Container
# This Allows For Changes To Other Files Without Needing To Reinstall Dependencies
COPY ./package.json ./

# Install Some Dependencies
RUN npm install

# Copy All Files From simple-server Into Docker Container
COPY ./ ./

# Default Command
CMD ["npm", "start"]