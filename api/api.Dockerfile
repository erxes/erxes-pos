FROM node:12.19-alpine
WORKDIR /erxes-pos-api
RUN chown -R node:node /erxes-pos-api \
 && apk add --no-cache tzdata
COPY --chown=node:node . /erxes-pos-api
USER node
EXPOSE 7300
ENTRYPOINT ["node", "--max_old_space_size=8192", "dist"]
