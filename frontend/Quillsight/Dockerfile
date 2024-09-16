# Stage 1: Build Stage
FROM ubuntu as builder

# Install Node.js and npm
RUN apt-get update && apt-get install -y curl \
    && curl -fsSL https://deb.nodesource.com/setup_20.x | bash - \
    && apt-get install -y nodejs \
    && apt-get clean

# Set working directory
WORKDIR /app

# Copy package.json and package-lock.json from Quillsight folder
COPY package*.json ./ 

# Install dependencies
RUN npm install

# Copy the rest of the application files from Quillsight folder
COPY . .

# Build the application
RUN npm run build

# Stage 2: Serve Stage
FROM ubuntu

# Install Nginx
RUN apt-get update && apt-get install -y nginx \
    && apt-get clean

# Remove default Nginx website
RUN rm -rf /var/www/html/*

# Copy build output to Nginx public directory
COPY --from=builder /app/dist /var/www/html

# Start Nginx server
CMD ["nginx", "-g", "daemon off;"]
