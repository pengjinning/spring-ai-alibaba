# Stage 1: Build the frontend application
FROM node:20-alpine AS builder

WORKDIR /app

# Copy package files
COPY package.json ./
COPY pnpm-workspace.yaml ./
COPY .npmrc ./
COPY packages/main/package.json ./packages/main/
COPY packages/spark-flow/package.json ./packages/spark-flow/
COPY packages/spark-i18n/package.json ./packages/spark-i18n/

# Enable pnpm via corepack
RUN corepack enable && corepack prepare pnpm@9.15.4 --activate

# Install dependencies
RUN pnpm install

# Copy source code
COPY . .

# Build spark-flow first (required dependency)
RUN pnpm --filter @spark-ai/flow build

# Build the main application
RUN pnpm --filter main build

# Stage 2: Serve with nginx
FROM nginx:alpine

# Copy built files from builder stage
COPY --from=builder /app/packages/main/dist /usr/share/nginx/html

# Copy nginx configuration (optional, if you have custom nginx config)
# COPY nginx.conf /etc/nginx/conf.d/default.conf

# Expose port 80
EXPOSE 80

# Start nginx
CMD ["nginx", "-g", "daemon off;"]

