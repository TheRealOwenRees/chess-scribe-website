# --- Stage 1: Build Stage ---
FROM node:24-alpine AS builder
WORKDIR /app

# 1. Declare the build-time arguments Vite needs
ARG VITE_API_BASE_URL
ARG VITE_MATOMO_URL
ARG VITE_MATOMO_SITE_ID
ARG VITE_MAINTENANCE_MODE
ARG VITE_MAINTENANCE_MODE_MESSAGE

# 2. Assign them to environment variables so Vite detects them
ENV VITE_API_BASE_URL=$VITE_API_BASE_URL
ENV VITE_MATOMO_URL=$VITE_MATOMO_URL
ENV VITE_MATOMO_SITE_ID=$VITE_MATOMO_SITE_ID
ENV VITE_MAINTENANCE_MODE=$VITE_MAINTENANCE_MODE
ENV VITE_MAINTENANCE_MODE_MESSAGE=$VITE_MAINTENANCE_MODE_MESSAGE

COPY package.json pnpm-lock.yaml pnpm-workspace.yaml ./
RUN corepack enable pnpm && pnpm i --frozen-lockfile
COPY . .
RUN pnpm run build

# --- Stage 2: Production Stage ---
FROM node:24-alpine AS runner
WORKDIR /app

ENV NODE_ENV=production
ENV PORT=3000
ENV HOST=0.0.0.0

# Nitro compiles everything needed into the .output directory
COPY --from=builder /app/.output ./.output

EXPOSE 3000

# Run the compiled Nitro server
CMD ["node", ".output/server/index.mjs"]
