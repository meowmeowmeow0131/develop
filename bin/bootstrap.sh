#!/bin/bash
# ---------------------------------------------------------------------------------------------------
# bootstrap.sh
#
# description :
# ログインスクリプトに workspace への移動やコマンドエイリアスの設定等を追記する。
# ※繰り返し実行可能。
# ---------------------------------------------------------------------------------------------------

target="/home/vagrant/.bashrc"

# 2回目以降の vagrant up では実行しない
#[ -e /etc/bootstrapped ] || exit 0

# 対象が存在しなければ実行しない
[ -e ${target} ] || exit 0

# 以前の追記内容が存在していた場合は初期化
if grep '## ADD FIRST CMD ##' ${target} &> /dev/null; then
    sed -i -e "$(grep -n '## ADD FIRST CMD ##' ${target} | sed -e 's/:.*//g'),$ d" ${target}
fi

# 指定したコマンドを追記
cat << 'EOS' >> ${target}
## ADD FIRST CMD ##
if [ /home/vagrant = $(pwd) ]; then
    cd app
fi

## ADD ALIAS CMD ##
alias aws='docker run --rm -ti -v ~/app/.aws:/root/.aws -v ~/app:/aws amazon/aws-cli'
alias heroku='docker run --rm -ti -v ~/app/.heroku:/root/.heroku -v ~/app:/heroku wingrunr21/alpine-heroku-cli'
alias pwsh='docker run --rm -ti mcr.microsoft.com/powershell pwsh'

## END ##
EOS

# ログインスクリプト再読み込み
. ~/.bashrc
