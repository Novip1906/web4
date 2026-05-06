FROM node:20-alpine

WORKDIR /app

COPY package.json package-lock.json* ./
RUN npm install

COPY index.html main.js ./
COPY components ./components
COPY pages ./pages
COPY modules ./modules

EXPOSE 5500
CMD ["npm", "start"]
