# Dockerfile for aws-sam

FROM python:3.7-alpine

RUN apk update && apk add --no-cache --virtual build-deps \
        build-base \
        gcc \
        tzdata \
    && apk add git \
    # set timezone JST
    && cp /usr/share/zoneinfo/Asia/Tokyo /etc/localtime \
    # install aws-sam
    && pip install aws-sam-cli \
    # remove package, cache
    && apk del build-deps \
    && rm -rf /var/cache/apk/* \
    && rm -rf /tmp/*

EXPOSE 3000
ENTRYPOINT ["/usr/local/bin/sam"]
