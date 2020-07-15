.DEFAULT_GOAL := help

build: ## 仮想マシンの起動のダウンロード、各種認証ファイルのリストア
	vagrant box add ubuntu/xenial64
	bash /opt/scripts/bin/Maintenance-Homebrew.sh

up: ## 仮想マシンの起動、ログイン
	@echo 'Copyright (c) 2020-2020 AKIRA TAKEUCHI All Rights Reserved.'
	@echo '==> up vagrant box and ssh vagrant box.'
	@echo ''
	vagrant up
	vagrant ssh

stop: ## 仮想マシンの停止
	@echo 'Copyright (c) 2020-2020 AKIRA TAKEUCHI All Rights Reserved.'
	@echo '==> stop vagrant box.'
	@echo ''
	vagrant halt

clean: ## 仮想マシンの起動の初期化
	@echo 'Copyright (c) 2020-2020 AKIRA TAKEUCHI All Rights Reserved.'
	@echo '==> Initialize vagrant box.'
	@echo ''

provision: ## 仮想マシンの自動セットアップ
	@echo 'Copyright (c) 2020-2020 AKIRA TAKEUCHI All Rights Reserved.'
	@echo '==> Provition vagrant box.'
	@echo ''
	vagrant up --provision
	vagrant ssh

.PHONY: help
help:
	@grep -E '^[a-zA-Z_-]+:.*?## .*$$' $(MAKEFILE_LIST) | sort | awk 'BEGIN {FS = ":.*?## "}; {printf "\033[36m%-30s\033[0m %s\n", $$1, $$2}'
