FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production
COPY . .
ENV PORT=6000
EXPOSE 6000
CMD ["node", "src/server.js"]
