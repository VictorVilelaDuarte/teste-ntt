FROM node:18-alpine

RUN apk add --no-cache openssl

WORKDIR /app

COPY backend/package*.json ./

RUN npm install

COPY backend .

RUN npx prisma generate

EXPOSE 3333

CMD ["npm", "run", "dev"]