FROM node
 EXPOSE 3000
#  RUN apk add --update nodejs
 RUN mkdir /opt/www
 COPY . /opt/www
 WORKDIR /opt/www
 RUN npm install
 RUN npm run build-dev
 ENTRYPOINT [ "node","/opt/www/bin/www" ]