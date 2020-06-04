#!/bin/bash
# ---------------------------------------------------------------------------------------------------
## Set-defaults.sh
#
# description :
#
# ---------------------------------------------------------------------------------------------------
set -e

# google chrome の自動更新を停止
defaults write com.google.keystone.Agent checkInterval 0

# 全てのファイル拡張子を表示
# 間違っているかも
defaults write NSGlobalDomain AppleShowAllExtensions -bool true

# 不可視ファイルを表示
# 間違っているっぽいため、コメントアウト
#defaults write com.apple.finder AppleShowAllFiles YES

# クイックルックでテキストを選択可能に設定
# 間違っているっぽいため、コメントアウト
#defaults write com.apple.finder QLEnableTextSelection -bool true