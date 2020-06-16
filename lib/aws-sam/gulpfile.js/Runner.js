module.exports = class Runner {

    constructor(config, cmd, args) {
        this.config = config
        this.cmd    = cmd
        this.args   = args
        this.log4js = {
            appenders: {
                Dummy: {
                    type: 'console',
                    layout: {
                        type: 'messagePassThrough'
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
                    filename: '/home/vagrant/app/log/aws-sam-' + this.config.argv.STACK_NAME + '-' + this.config.action + '.log',
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
                    level: 'all'
                }
            }
        }
    }

    // method
    spawn(callback) {
        const path     = require('path');
        const log4js   = require('log4js');
        const exec     = require('child_process');

        // 実行設定
        const options = {
            cwd:        (path.resolve(__dirname, '../') + '/stack/' + this.config.argv.STACK_NAME),
            env:        process.env,
            encoding:   'utf8',
            shell:      true,
            timeout:    2000,
            maxBuffer:  '1024 * 1024',
            killSignal: 'SIGTERM'
        };

        // ロガー設定
        log4js.configure(this.log4js);
        const logger = log4js.getLogger('default');

        // 情報出力
        logger.info('stack name: ' + this.config.argv.STACK_NAME);

        // 実行
        var proc = exec.spawn(this.cmd, this.args, options);

        // 標準出力イベント
        proc.stdout.on('data', (data) => {
            logger.info(data.toString());
        });

        // 標準エラー出力イベント
        proc.stderr.on('data', (data) => {
            logger.error(data.toString());
        });

        // クローズイベント
        proc.on('close', (code) => {
            // 終了コードを出力
            logger.info('process exited with code: ' + code);
            // 終了コードが「0」でなければ、デバッグ情報をログに書き出す
            if (code == 0) {
                logger.info('\ntask is sucessful.');
            } else {
                logger.info('\ntask is failed.');
                logger.info('debug info writed: ' + this.log4js.appenders.SystemLogAppender.filename);
                logger.debug('############ debug info is cmd, args, options. ############');
                logger.debug('cmd: ' + this.cmd);
                logger.debug('args: ' + this.args);
                logger.debug('options: \n' + JSON.stringify(options,undefined,2));
            }
            // タスク完了を知らせる
            callback();
        });
    }
}
