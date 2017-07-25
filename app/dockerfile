FROM node:6.11.1

#RUN apt-get update -qq && apt-get install -y build-essential libpq-dev libkrb5-dev && rm -rf /var/lib/apt/lists/*

RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

RUN rm /etc/localtime && \
    ln -s /usr/share/zoneinfo/Australia/Sydney/etc/localtime

COPY package.json /usr/src/app/
RUN npm install

COPY . /usr/src/app

EXPOSE 3000
CMD [ "npm", "start" ]
