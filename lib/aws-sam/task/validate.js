const path     = require('path');
const assert   = require('assert');
const gulp     = require('gulp');
const log4js   = require('log4js');
const exec     = require('child_process');
const minimist = require('minimist');
const env      = require('node-env-file');
const config   = require('./app.js')

// ロガー設定
log4js.configure(config.log4js);
const logger   = log4js.getLogger('default');

// 引数設定
const cliArgs = minimist(process.argv.slice(2), {
	string: 'app',
	default: {
		app: 'tutorial-python-app'
	}
});

// 環境変数設定
env(path.resolve(__dirname, '../') + '/app/' + cliArgs.app + '/.env');

// 実行設定
const cmd     = 'docker'
const args    = [
					'run', '--rm', '-i',
					'-v', '/var/run/docker.sock:/var/run/docker.sock',
					'-v', '~/app/.aws:/root/.aws',
					'-v', (path.resolve(__dirname, '../') + '/app/' + cliArgs.app) + ':/var/opt',
					'-w', '/var/opt',
					'-p', '"3000:3000"',
					'-e', 'AWS_ACCESS_KEY_ID=' + process.env.AWS_ACCESS_KEY_ID,
					'-e', 'AWS_SECRET_ACCESS_KEY=' + process.env.AWS_SECRET_ACCESS_KEY,
					'-e', 'AWS_DEFAULT_REGION=' + process.env.AWS_DEFAULT_REGION,
					process.env.AWS_SAM_DOCKER_IMAGE,
					'validate'
				]
const options = {
	cwd:        (path.resolve(__dirname, '../') + '/app/' + cliArgs.app),
	env:        process.env,
	encoding:   'utf8',
	shell:      true,
	timeout:    10000,
	maxBuffer:  '1024 * 1024',
	killSignal: 'SIGTERM'
};

gulp.task('validate', (callback) => {

	// 情報出力
	logger.info('app: ' + cliArgs.app);

	var proc = exec.spawn(cmd, args, options);

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
			logger.info('debug info writed: ' + config.log4js.appenders.SystemLogAppender.filename);
			logger.debug('debug info is cmd, args, options.');
			logger.debug('cmd: ' + cmd);
			logger.debug('args: ' + args);
			logger.debug('options: \n' + JSON.stringify(options,undefined,2));
		}
		callback();
	});
});
