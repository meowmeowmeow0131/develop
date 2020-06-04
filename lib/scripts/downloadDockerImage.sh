#!/bin/bash
# ---------------------------------------------------------------------------------------------------
# bootstrap.sh
#
# description :
# ログインスクリプトに workspace への移動やコマンドエイリアスの設定等を追記する。
# ※繰り返し実行可能。
# ---------------------------------------------------------------------------------------------------

set -e

while read image; do
    if [ ! "$(docker image ls -q ${image})" ]; then
        docker pull ${image}
    else
        echo "Using ${image}"
    fi
done < $(cd $(dirname $0) && cd ../../ && pwd)/conf/docker.txt
