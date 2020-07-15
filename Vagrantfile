Vagrant.configure('2') do |config|
  config.vm.box = 'ubuntu/xenial64'

  # ゲストマシンのホスト名
  config.vm.hostname = 'develop'

  # ホスト側にフォワーディングして web やデータベースにアクセスできるようにしておく
  config.vm.network :private_network, ip: '192.168.50.10'
  config.vm.network :forwarded_port, host: 4000, guest: 3000
  config.vm.network :forwarded_port, host: 4306, guest: 3306
  
  # ゲストマシンのコンピューティング性能
  config.vm.provider :virtualbox do |vb|
    vb.gui = false
    vb.cpus = 4
    vb.memory = 4096
    vb.customize ['modifyvm', :id, '--natdnsproxy1', 'off']
    vb.customize ['modifyvm', :id, '--natdnshostresolver1', 'off']
    vb.customize ["setextradata", :id, "VBoxInternal/Devices/VMMDev/0/Config/GetHostTimeDisabled", 0]
  end

  # ゲストマシンのストレージサイズ
  config.disksize.size = '30GB'

  # vagrant plugin 設定
  config.mutagen.orchestrate = true

  # 起動時のみフォルダ同期を行う
  config.vm.synced_folder './', '/home/vagrant/app', type: "rsync",
    rsync_auto: true,
    rsync__exclude: ['.git/', 'node_modules/', 'tmp/']

  # ゲストマシンにインストールするパッケージ
  config.vm.provision :docker, run: 'always'
  config.vm.provision :docker_compose

  # 初回の vagrant up のみ実行するスクリプト
  config.vm.provision :shell, :path => "bin/bootstrap.sh"

  # タイムゾーン設定
  config.vm.provision :shell, :inline => "timedatectl set-timezone Asia/Tokyo"
end
