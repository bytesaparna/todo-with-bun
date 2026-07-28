# ---- Base ----
FROM oven/bun:1 AS base
WORKDIR /app

# ---- Install dependencies (cached layer) ----
FROM base AS deps
COPY package.json bun.lock ./
RUN bun install --frozen-lockfile --production

# ---- Runtime ----
FROM base AS release
COPY --from=deps /app/node_modules ./node_modules
COPY . .

ENV NODE_ENV=production
EXPOSE 3000

CMD ["bun", "run", "index.ts"]
