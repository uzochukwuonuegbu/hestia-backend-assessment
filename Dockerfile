FROM node:17

RUN apt-get update

# Install NodeJS and Python
RUN apt install -y npm
RUN apt-get install -y libzmq3-dev python3-pip
RUN apt-get clean && rm -rf /var/lib/apt/lists/*

# Install global dependencies for python env
RUN pip3 install --upgrade pip && pip3 --no-cache-dir install hestia_earth.utils && pip3 --no-cache-dir install pandas

# Create work directory
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

COPY package*.json /usr/src/app/

# Install app dependencies
RUN npm install

# Copy app source to work directory
COPY . /usr/src/app

RUN apt-get update && apt-get upgrade -y && apt-get autoremove -y

CMD ["npm", "run", "start"]