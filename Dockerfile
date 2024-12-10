# syntax=docker.io/docker/dockerfile:1

# Base image setup
FROM node:18-alpine AS base

# Install necessary system dependencies
RUN apk add --no-cache libc6-compat bash python3 make g++ git

# Enable Corepack and prepare Yarn version 3.6.1
RUN corepack enable && corepack prepare yarn@3.6.1 --activate

# Set working directory
WORKDIR /app

# Dependencies installation stage
FROM base AS deps

# Copy package management files and Yarn 3 workspace files
COPY package.json yarn.lock .yarnrc.yml ./
COPY .yarn ./.yarn

# Install dependencies with Yarn 3
RUN yarn install --immutable || { \
    echo "Yarn install failed!"; \
    exit 1; \
}

# Debugging: Ensure /app structure after yarn install
RUN echo "Contents of /app:" && ls -l /app && echo "Contents of /app/.yarn:" && ls -l /app/.yarn

# Build stage
FROM base AS builder
WORKDIR /app

# Copy node_modules and dependencies from deps stage
COPY --from=deps /app /app

# Copy the application source code
COPY . .

# Build the application
RUN yarn build || { \
    echo "Build failed!"; \
    exit 1; \
}

# Runner stage (production-ready image)
FROM base AS runner

# Set working directory
WORKDIR /app

# Environment variables for production
ENV NODE_ENV=production
ENV PORT=3000
ENV HOSTNAME="0.0.0.0"

# Create a non-root user for security
RUN addgroup --system --gid 1001 nodejs && \
    adduser --system --uid 1001 nextjs

# Copy public files and build artifacts
COPY --from=builder /app/public ./public
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

# Switch to the non-root user
USER nextjs

# Expose the application port
EXPOSE 3000

# Set the command to run the application
CMD ["node", "server.js"]