FROM node:20-alpine as builder
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
ARG ENVIRONMENT
ARG DEV_USERNAME
ARG DEV_PASSWORD
ENV ENVIRONMENT=${ENVIRONMENT}
ENV DEV_USERNAME=${DEV_USERNAME}
ENV DEV_PASSWORD=${DEV_PASSWORD}
RUN npm run build

#Production
FROM node:20-alpine
WORKDIR /app
COPY --from=builder /app/build build/
COPY --from=builder /app/package.json .
COPY --from=builder /app/package-lock.json .
RUN npm ci --production
EXPOSE 5000
CMD ["node", "build"]
