module.exports = class Runner {

    constructor(config, cmd, args) {
        // タスク設定、引数設定
        this.config = config

        // 実行コマンド
        this.cmd    = cmd

        // 実行コマンドの引数
        this.args   = args

        // 実行コマンドの設定
        this.options = {
            cwd:         this.config.workDir,
            env:         process.env,
            encoding:    'utf8',
            shell:       true,
            timeout:     2000,
            maxBuffer:   '1024 * 1024',
            killSignal:  'SIGTERM'
        }
        // ロガー設定
        this.log4js = {
            appenders: {
                Dummy: {
                    type: 'console',
                    layout: {
                        type: 'pattern',
                        pattern: '%[%m%]'
                    }
                },
                ConsoleLogAppender: {
                    type: 'logLevelFilter',
                    appender: 'Dummy',
                    level: 'info',
                },
                SystemLogAppender: {
                    type: 'dateFile',
                    layout: {
                        type: 'messagePassThrough',
                    },
                    filename: '/home/vagrant/app/log/' + this.config.lib + '-' + this.config.argv.TEMPLATE_NAME + '.log',
                    pattern: '-yyyy-MM-dd',
                    encoding: 'utf-8',
                    daysToKeep: '',
                    keepFileExt: 'true'
                }
            },
            categories: {
                default: {
                    appenders: [
                        'ConsoleLogAppender',
                        'SystemLogAppender'
                    ],
                    level: 'all',
                    enableCallStack: true // 行間が崩れるらしいため、「false」の方が良いかも？
                }
            }
        }

        // 開始メッセージ
        this.startMsg = [
            ('stack name: ' + this.config.stackName)
        ]
    }

    // method
    spawn(callback) {
        const log4js   = require('log4js');
        const exec     = require('child_process');

        // ロガー設定
        log4js.configure(this.log4js);
        const logger = log4js.getLogger('default');

        // 情報出力
        this.startMsg.forEach(msg => logger.info(msg));

        // コマンド実行
        var proc = exec.spawn(this.cmd, this.args, this.options);

        // 標準出力イベント
        proc.stdout.on('data', (data) => {
            logger.info(data.toString());
        });

        // 標準エラー出力イベント
        proc.stderr.on('data', (data) => {
            logger.warn(data.toString());
        });

        // クローズイベント
        proc.on('close', (code) => {
            // 終了コードを出力
            logger.info('process exited with code: ' + code);
            // 終了コードが「0」でなければ、デバッグ情報をログに書き出す
            if (code == 0) {
                logger.info('task is sucessful.');
            } else {
                logger.error('task is failed.');
                logger.error('debug info is writed: ' + this.log4js.appenders.SystemLogAppender.filename);
                logger.debug('############ debug info is cmd, args, options. ############');
                logger.debug('cmd: ' + this.cmd);
                logger.debug('args: ' + this.args);
                logger.debug('options: \n' + JSON.stringify(this.options,undefined,2));
            }
            // タスク完了を知らせる
            callback();
        });
    }
}
