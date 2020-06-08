#!/bin/bash
# ---------------------------------------------------------------------------------------------------
# bootstrap.sh
#
# description :
# ログインスクリプトに workspace への移動やコマンドエイリアスの設定等を追記する。
# ※繰り返し実行可能。
# ---------------------------------------------------------------------------------------------------
target=${2:-/home/vagrant/.bashrc}

# 実行条件:
#   2回目以降の vagrant up では実行しない
#   第1引数に「-f」を指定した場合、手動でも実行可能にする
#   第2引数に任意のファイルを指定した場合、ログインスクリプト以外でも対象にできるようにする
[ -e /etc/bootstrapped -o "$1" = "-f" ] && [ -e ${target} ] || exit 0

# download docker image
while read image; do
    if [ ! "$(docker image ls -q ${image})" ]; then
        docker pull ${image}
    else
        echo "Using ${image}"
    fi
done << 'EOS'
amazon/aws-cli
mcr.microsoft.com/powershell
wingrunr21/alpine-heroku-cli
python
EOS

# build docker image
while read image; do
    if [ ! "$(docker image ls -q ${image})" ]; then
        docker build \
            --tag=${image}:latest \
            --file=$(cd $(dirname $0) && cd .. && pwd)/docker/$(echo ${image} | awk '{print substr($0, index($0, "/"))}' | cut -c 2-).dockerfile \
            --force-rm --no-cache --rm=true . \
            > $(cd $(dirname $0) && cd ../../ && pwd)/dockerbuild.log 2>&1
    else
        echo "Using ${image}"
    fi
done << 'EOS'
develop/aws-shell
EOS

# initialize
sed -i -e "$(grep -n '## CHANGE WORKDIRECTORY ##' ${target} | sed -e 's/:.*//g'),$ d" ${target}

# append cmd
cat << 'EOS' >> ${target}
## CHANGE WORKDIRECTORY ##
if [ /home/vagrant = $(pwd) ]; then
    cd app
fi

## ADD ALIAS CMD ##
alias aws='docker run --rm -ti -v ~/app/.aws:/root/.aws -v ~/app:/app -w /app amazon/aws-cli'
alias awsh='docker run --rm -ti -v ~/app/.aws:/root/.aws -v ~/app:/app -w /app develop/aws-shell'
alias heroku='docker run --rm -ti -v ~/app/.heroku:/root/.heroku -v ~/app:/app -w /app wingrunr21/alpine-heroku-cli'
alias pwsh='docker run --rm -ti -v ~/app:/app -w /app mcr.microsoft.com/powershell pwsh'
alias python='docker run --rm -ti -v ~/app:/app -w /app python python'
## END ##
EOS
