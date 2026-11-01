# Dockerfile for servicio-mensajeria
FROM node:20-alpine AS builder
WORKDIR /app
COPY package.json package-lock.json* ./
RUN npm ci
COPY . .
RUN npx prisma generate && npm run build

FROM node:20-alpine AS runtime
WORKDIR /app
ENV NODE_ENV=production
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package.json ./
COPY --from=builder /app/prisma ./prisma
EXPOSE 3009
HEALTHCHECK --interval=30s --timeout=5s CMD wget -qO- http://localhost:3009/health || exit 1
CMD ["node", "dist/main.js"]
