FROM maven:3.5.2-jdk-8

COPY . /home/art-biz/backend/

WORKDIR /home/art-biz/backend

CMD ./wait-for-it.sh $DEPENDS_ON --timeout=0 --strict -- echo "${DEPENDS_ON} is up" \
    && mvn spring-boot:run
