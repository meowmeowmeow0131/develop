#!/bin/bash
# ---------------------------------------------------------------------------------------------------
# daily-job.sh
#
# description :
# 日次ジョブを実行する。 
# ---------------------------------------------------------------------------------------------------

# 処理開始
echo "Copyright (c) 2020-2020 AKIRA All Rights Reserved."
echo "==> Start scripting."
echo ""

# ユーザーの各種設定のバックアップ
echo "start task, task: backup user setting"
bash /opt/scripts/bin/Backup-UserSetting.sh

if [ $? = 0 ]; then
    echo "result: OK, task: backup user setting"
    echo ""
else
    echo "result: NG, task: backup user setting"
    echo "confilm log file. path: $HOME/Library/Logs/Homebrew/mackup"
    echo ""
fi

# Homebrew のメンテナンス
echo "start task, task: maintenance homebrew"
bash /opt/scripts/bin/Maintenance-Homebrew.sh

if [ $? = 0 ]; then
    echo "result: OK, task: maintenance homebrew"
    echo ""
else
    echo "result: NG, task: maintenance homebrew"
    echo ""
fi


# default run



echo "all task finished."
echo ""
