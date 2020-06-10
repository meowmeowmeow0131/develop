# Dockerfile for aws-shell

FROM alpine:3.7

RUN apk update && add --no-cache \
        tzdata \
        python \
    # set timezone JST
    && cp /usr/share/zoneinfo/Asia/Tokyo /etc/localtime \
    # install aws-shell
    && python -m ensurepip \
    && rm -r /usr/lib/python*/ensurepip \
    && pip install --upgrade pip setuptools \
    && pip install aws-shell \
    # remove package, cache
    && apk del build-deps \
    && rm -rf /var/cache/apk/* \
    && rm -rf /tmp/*

ENTRYPOINT ["aws-shell"]
