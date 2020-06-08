# Dockerfile for aws-shell

FROM alpine:3.5

RUN apk update && apk add --no-cache \
     tzdata \
     python \
  && cp /usr/share/zoneinfo/Asia/Tokyo /etc/localtime \
  && python -m ensurepip \
  && rm -r /usr/lib/python*/ensurepip \
  && pip install --upgrade pip setuptools \
  && pip install aws-shell \
  && apk del tzdata \
  && rm -r /root/.cache \
  && rm -rf /var/cache/apk/*

ENTRYPOINT ["aws-shell"]
