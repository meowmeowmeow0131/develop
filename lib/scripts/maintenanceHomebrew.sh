#!/bin/bash
# ---------------------------------------------------------------------------------------------------
# Maintenance-Homebrew.sh
#
# description :
# Homebrew のメンテナンスを行う。 
# ---------------------------------------------------------------------------------------------------
set -e

# Homebrew 診断
brew doctor

# Homebrew アップデート、インストール済みパッケージのアップデート
brew upgrade

# Homebrew インストールするアプリケーションの更新
brew bundle --file $(cd $(dirname $0) && cd ../../ && pwd)/conf/Brewfile --no-lock 
