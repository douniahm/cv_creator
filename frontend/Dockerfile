# stage: 1
#base image
FROM mhart/alpine-node:latest AS builder
#set working directory
WORKDIR /app
#Copy code from app to the conainer
COPY . .
#install formik
RUN npm install formik
#install axios
RUN npm install axios
#build app
RUN yarn run build

# stage: 2 — the production environment
FROM mhart/alpine-node
RUN yarn global add serve
WORKDIR /app
#copy built app from Stage 1
COPY --from=builder /app/build .
EXPOSE 8008
#run
CMD ["serve", "-p", "3000", "-s", "."]