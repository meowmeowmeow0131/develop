#!/bin/bash
# ---------------------------------------------------------------------------------------------------
# buildDockerImage.sh
#
# description :
# 
# ---------------------------------------------------------------------------------------------------

set -e

image=develop/aws-shell

if [ ! "$(docker image ls -q ${image})" ]; then
    docker build \
    --tag=${image}:latest \
    --file=$(cd $(dirname $0) && cd .. && pwd)/docker/$(echo ${image} | awk '{print substr($0, index($0, "/"))}' | cut -c 2-).dockerfile \
    --force-rm --no-cache --rm=true . \
    > $(cd $(dirname $0) && cd ../../ && pwd)/dockerbuild.log 2>&1
else
    echo "Using ${image}"
fi
