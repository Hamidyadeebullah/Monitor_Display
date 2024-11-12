# Use the official Nginx image as a parent image
FROM nginxinc/nginx-unprivileged:alpine3.20

# Copy custom nginx configuration file
COPY nginx.conf /etc/nginx/nginx.conf

# Set the working directory to /usr/share/nginx/html (default directory for serving content in Nginx)
WORKDIR /usr/share/nginx/html

# Copy the content (HTML, CSS, JS) from your local directory to the container
COPY . /usr/share/nginx/html

# Expose port 80 to the outside world
EXPOSE 80

# Start Nginx
CMD ["nginx", "-g", "daemon off;"]
