# Stage 1: deps
FROM node:18-alpine AS deps
WORKDIR /app
COPY package*.json ./
RUN npm install --silent

# Stage 2: build
FROM node:18-alpine AS builder
WORKDIR /app
COPY package*.json tsconfig.json ./
COPY --from=deps /app/node_modules ./node_modules
COPY src ./src
RUN npm run build

# Stage 3: runtime
FROM node:18-alpine AS runtime
WORKDIR /app
ENV NODE_ENV=production

COPY --from=deps /app/node_modules ./node_modules
COPY --from=builder /app/dist ./dist
RUN mkdir -p /app/uploads

EXPOSE 5000
CMD ["node", "dist/index.js"]
