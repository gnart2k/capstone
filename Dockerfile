# Stage 1: Build
FROM node:18 AS builder

# Set working directory
WORKDIR /app

# Install pnpm
RUN npm install -g pnpm

# Copy package.json and pnpm-lock.yaml
COPY package.json pnpm-lock.yaml ./

# Install dependencies
RUN pnpm install

# Copy the rest of the application
COPY . .

# Generate Prisma Client
RUN pnpm run prisma:generate

# Build the application
RUN pnpm run build

# Stage 2: Production
FROM node:18-alpine

# Set working directory
WORKDIR /app

# Install pnpm
RUN npm install -g pnpm

# Copy the built application from the builder stage
COPY --from=builder /app ./

# Install only production dependencies
RUN pnpm install --prod

# Expose the ports the app and socket server run on
EXPOSE 3000
EXPOSE 4000

# Command to run the application and socket server
CMD ["sh", "-c", "pnpm start & node server"]

