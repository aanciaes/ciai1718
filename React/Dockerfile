FROM node:latest

COPY . /home/art-biz/frontend

WORKDIR /home/art-biz/frontend

RUN npm install

CMD ./wait-for-it.sh $DEPENDS_ON --timeout=0 --strict -- echo "${DEPENDS_ON} is up" \
    && npm start