# Stage 1: Build stage (builder)
FROM ubuntu as builder

# Update package list and install curl for fetching NodeSource
RUN apt-get update && apt-get install -y curl 

# Add NodeSource repository for Node.js (latest version)
RUN curl -fsSL https://deb.nodesource.com/setup_20.x | bash -

# Install Node.js and npm
RUN apt-get install -y nodejs

# Verify Node.js and npm are installed correctly
RUN node -v && npm -v

# Set the working directory
WORKDIR /app

# Copy the package.json and package-lock.json files
COPY package*.json ./

# Install dependencies including devDependencies
RUN npm install

# Reinstall bcrypt to ensure it's built for this environment
RUN npm uninstall bcrypt && npm install bcrypt

# Copy the rest of the application
COPY . .

# Stage 2: Production stage (runner)
FROM ubuntu as runner 

# Install curl and Node.js in the runner stage
RUN apt-get update && apt-get install -y curl \
  && curl -fsSL https://deb.nodesource.com/setup_20.x | bash - \
  && apt-get install -y nodejs

# Set working directory in the production container
WORKDIR /app

# Copy necessary files and folders from the builder stage
COPY --from=builder /app/node_modules /app/node_modules
COPY --from=builder /app/public /app/public
COPY --from=builder /app/src /app/src
COPY --from=builder /app/.env /app/.env
COPY --from=builder /app/.prettierrc /app/.prettierrc
COPY --from=builder /app/.prettierignore /app/.prettierignore
COPY --from=builder /app/package*.json /app/

# Reinstall bcrypt in the runner stage to ensure it's built for this environment
RUN npm uninstall bcrypt && npm install bcrypt

# To Run the server
CMD ["node", "src/server.js"]