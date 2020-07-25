#!/bin/bash
# ---------------------------------------------------------------------------------------------------
# logRotate.sh
#
# description :
# 基準日を超過したワークスペースのログファイルを退避し、バックアップする。
# ---------------------------------------------------------------------------------------------------
set -e

# 変数
reference_date=7
target_dir=${1:-/Users/akira_pro/opt/www/develop.akira.local/log}
backup_dir=${2:-/Users/$USER/Downloads}
backup_file=${backup_dir}/$(date '+%Y%m%d').tar.gz
temp_dir=/tmp/$(basename ${0%.sh})/$(date '+%Y%m%d')

# ディレクトリが存在しなければ終了（※作成予定のバックアップファイルが存在しても終了）
[ -e ${target_dir} -a -e ${backup_dir} ] && [ -e ${backup_dir}/${bakup_file} ] || exit 1

# ディレクトリ作成
mkdir -p ${temp_dir}

# ログファイル退避
find ${target_dir} -type f -name '*.log' -mtime +${reference_date} -print0 \
    | xargs -0 gmv --target-directory ${temp_dir}

# ログファイル圧縮
cd $(dirname ${temp_dir})
tar zcf ${backup_file} $(basename ${temp_dir})

# 元ファイル削除
rm -rf $(cd $(dirname ${temp_dir}) && pwd)
