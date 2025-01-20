FROM node:22-alpine

WORKDIR /app

COPY . .

# RUN npm install

# RUN npm run build
EXPOSE 3000

CMD ["/bin/sh","-c" ,"npm run generate && npm run build && npm start"]
