FROM node:18-alpine AS base

WORKDIR /app

COPY package*.json ./

RUN npm ci --only=production && npm cache clean --force

FROM base AS development

RUN npm ci

COPY . .

EXPOSE 3000

CMD ["npm", "start"]

FROM base AS build

RUN npm ci

COPY . .

RUN npm run build

FROM nginx:alpine AS production

COPY --from=build /app/build /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
