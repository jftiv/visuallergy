# Multi-stage build for Go API
FROM golang:1.23-alpine AS builder

WORKDIR /app

# Copy go mod files
COPY go.mod go.sum ./

# Download dependencies
RUN go mod download

# Copy source code
COPY . .

# Build the application
RUN GOOS=linux go build -o main .

# Production stage
FROM alpine:latest

# Install ca-certificates for HTTPS requests
RUN apk --no-cache add ca-certificates

WORKDIR /root/

# Copy the binary and sql files from builder stage
COPY --from=builder /app/main .
COPY --from=builder /app/sql ./sql

# Expose port
EXPOSE 3001

# Run the binary
CMD ["./main"]