# Stage 1: Install dependencies
FROM oven/bun:1.1.30 AS deps
WORKDIR /app

# Копируем манифест Bun
COPY package.json bun.lock ./
RUN bun install

# Stage 2: Build the project
FROM oven/bun:1.1.30 AS builder
WORKDIR /app

ARG NODE_ENV
ENV VITE_NODE_ENV=$NODE_ENV

ARG API_URL
ENV VITE_API_URL=$API_URL

COPY . .
COPY --from=deps /app/node_modules ./node_modules

RUN bun run build

# Stage 3: Extract dist
FROM alpine:3.18 AS extractor
WORKDIR /dist
COPY --from=builder /app/dist ./
