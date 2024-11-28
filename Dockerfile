FROM node:18-slim as builder
WORKDIR /app

# Install build dependencies
RUN apt-get update && \
    apt-get install -y python3 make g++ && \
    rm -rf /var/lib/apt/lists/*

COPY package*.json ./
RUN npm ci --quiet && \
    npm install @rollup/rollup-linux-x64-gnu

COPY . .

ARG ENVIRONMENT
ARG DEV_USERNAME
ARG DEV_PASSWORD

ENV ENVIRONMENT=${ENVIRONMENT}
ENV DEV_USERNAME=${DEV_USERNAME}
ENV DEV_PASSWORD=${DEV_PASSWORD}

RUN npm run build

FROM node:18-slim
WORKDIR /app

COPY --from=builder /app/build ./build
COPY --from=builder /app/package*.json ./

RUN npm ci --quiet --only=production

ENV PORT=5000
ENV HOST=0.0.0.0
ENV NODE_ENV=production

EXPOSE 5000
CMD ["node", "build"]
