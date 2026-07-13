# --- Stage 1: Build Stage ---
FROM node:24-alpine AS builder
WORKDIR /app

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
