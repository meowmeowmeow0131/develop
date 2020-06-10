#!/bin/bash
# ---------------------------------------------------------------------------------------------------
# buildDockerImage.sh
#
# description :
# 
# ---------------------------------------------------------------------------------------------------
set -e

while read image; do
    if [ ! "$(docker image ls -q ${image})" ]; then
        docker build \
            --tag=${image}:latest \
            --file=$(cd $(dirname $0) && cd .. && pwd)/docker/$(echo ${image} | awk '{print substr($0, index($0, "/"))}' | cut -c 2-).dockerfile \
            --force-rm --no-cache --rm=true . \
            > $(cd $(dirname $0) && cd ../../ && pwd)/log/dockerbuild-$(echo ${image} | awk '{print substr($0, index($0, "/"))}' | cut -c 2-)-$(date "+%Y%m%d%H%M%S").log 2>&1
    else
        echo "Using ${image}"
    fi
done << 'EOS'
develop/aws-shell
develop/aws-sam
EOS
