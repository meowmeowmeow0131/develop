#!/bin/bash
# ---------------------------------------------------------------------------------------------------
# maintenanceHomebrew.sh
#
# description :
# Homebrew のメンテナンスを行う。 
# ---------------------------------------------------------------------------------------------------
set -e

# Command Line Tools インストール
if [ ! -x $(which xcode-select) ]; then
    xcode-select --install
fi

# Homebrew インストール
if [ ! -x $(which brew) ]; then
    /usr/bin/ruby -e "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/master/install)"
fi

# Homebrew 診断
brew doctor

# Homebrew アップデート、インストール済みパッケージのアップデート
brew upgrade

# Homebrew インストールするアプリケーションの更新
brew bundle --file $(cd $(dirname $0) && cd ../../ && pwd)/conf/Brewfile --no-lock 

# 古いバージョンのアプリを削除
brew cleanup
