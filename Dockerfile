FROM node

WORKDIR /usr/src/app

COPY package.json .
COPY package-lock.json .

RUN npm install --silent

COPY . .

CMD [ "npm", "run", "dev" ]

