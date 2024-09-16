#Stage 1 : Build stage(builder)
FROM ubuntu as builder

# Update package list and install curl for fetching NodeSource
RUN apt-get update && apt-get install -y curl 

# Add NodeSource repository for Node.js (latest version)
RUN curl -fsSL https://deb.nodesource.com/setup_20.x | bash -

# Install Node.js and npm
RUN apt-get install -y nodejs

# Verify Node.js and npm are installed correctly
RUN node -v
RUN npm -v

# Create a non-root user "jhaempire"
#RUN useradd -ms /bin/bash jhaempire  

# Set the working directory
WORKDIR /app

#Copy the package-app-json and related files to install dependencies , and set ownership to jhaempire
COPY  package*.json ./

#Install depencdencies including @devdependencies
RUN npm install

#Copy the rest of application and set ownership to jhaempire
COPY  . .

#Stage : 2 Production stage (runner)
FROM ubuntu as runner 

# Install curl and Node.js in the runner stage(tried running all node and curl isntalling commands at once)
RUN apt-get update && apt-get install -y curl \
  && curl -fsSL https://deb.nodesource.com/setup_20.x | bash - \
  && apt-get install -y nodejs

#Create same non-root user in production stage to (not get permission denied error and also to remove confusion and ensure consistency)
#RUN useradd -ms /bin/bash jhaempire

# Set working directory in the production container
WORKDIR /app

#Copy neccesary files and folders from the builder stage with ownership changed to "jhaempire"
COPY  --from=builder /app/node_modules /app/node_modules
COPY  --from=builder /app/public /app/public
COPY  --from=builder /app/src /app/src
COPY  --from=builder /app/.env /app/.env
COPY  --from=builder /app/.prettierrc /app/.prettierrc
COPY  --from=builder /app/.prettierignore /app/.prettierignore
COPY  --from=builder /app/package*.json /app/


#To Run the server
CMD ["node", "src/server.js"]