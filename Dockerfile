FROM node:lts AS builder

WORKDIR /app
ADD . /app/

# COPY package*.json ./
# COPY .env ./
RUN npm install
RUN npm run build

FROM node:lts-alpine

WORKDIR /app
ENV NODE_ENV production

COPY --from=builder /app ./

# ENV HOST 0.0.0.0
# EXPOSE 8000
CMD ["npm", "run", "start:prod"]
