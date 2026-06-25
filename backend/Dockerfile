# Step 1: Build stage
FROM node:22-slim AS builder
WORKDIR /app
COPY package*.json ./
RUN npm ci --verbose
COPY . .
# RUN npx prisma generate
RUN npm run build

# Step2: Run stage (keeps the image lightweight and secure)
FROM node:22-slim
WORKDIR /app
ENV NODE_ENV=production
COPY package*.json ./
RUN npm ci --omit=dev
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/prisma.config.ts ./prisma.config.ts
COPY --from=builder /app/prisma ./prisma

EXPOSE 3000

CMD npx prisma generate && npx prisma migrate deploy --config prisma.config.ts && node dist/server.js
