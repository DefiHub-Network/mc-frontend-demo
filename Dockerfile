FROM node:18.20.2 as build-stage
WORKDIR /app
COPY package*.json ./  
COPY ./ .
RUN npm install
RUN npm run build


FROM nginx as production-stage
RUN mkdir /app
COPY --from=build-stage /app/dist /app
COPY nginx.conf /etc/nginx/nginx.conf
