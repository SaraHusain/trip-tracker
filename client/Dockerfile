FROM node:18-alpine AS builder
WORKDIR /app

# copy package files and install deps (speeds rebuilds)
COPY package*.json ./
RUN npm install --silent

# copy source and build; pass build args for CRA
COPY . .
ARG REACT_APP_API_URL
ARG REACT_APP_PHOTO_URL
ENV REACT_APP_API_URL=$REACT_APP_API_URL
ENV REACT_APP_PHOTO_URL=$REACT_APP_PHOTO_URL

RUN npm run build

# serve with nginx
FROM nginx:stable-alpine AS web
COPY --from=builder /app/build /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
