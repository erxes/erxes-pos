FROM node:12.19-alpine
WORKDIR /baterdene/
RUN chown -R node:node /baterdene
COPY --chown=node:node . /baterdene


USER node
RUN yarn build
EXPOSE 5300
CMD [ "yarn", "start" ]
