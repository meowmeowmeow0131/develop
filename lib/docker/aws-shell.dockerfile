# Dockerfile for aws-shell

FROM alpine:3.7

RUN apk add --no-cache \
    tzdata \
    python

# set timezone JST
RUN cp /usr/share/zoneinfo/Asia/Tokyo /etc/localtime \
 && apk del tzdata

# install aws-shell
RUN python -m ensurepip \
 && rm -r /usr/lib/python*/ensurepip \
 && pip install --upgrade pip setuptools \
 && pip install aws-shell \
 && rm -r /root/.cache

ENTRYPOINT ["aws-shell"]
