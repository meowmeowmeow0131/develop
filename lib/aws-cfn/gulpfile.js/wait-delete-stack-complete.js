/**
 * 
 * 
 */
const path       = require('path');
const dateformat = require('dateformat');
const gulp       = require('gulp');
const minimist   = require('minimist');
const env        = require('node-env-file');
const Runner     = require(path.resolve(__dirname, '..', '..') + '/aws-sam/gulpfile.js/Runner');

gulp.task('wait-delete-stack-complete', (callback) => {

    // 設定読込み
    var config = {
        lib: path.basename(path.resolve(__dirname, '..')),
        action: path.basename(__filename).replace('.js',''),
        argv: minimist(process.argv.slice(2), {
            string: ['stack', 'project'],
            default: {
                stack: 'web-server',
                project: 'demo'
            },
            alias:   {
                stack: 'STACK_NAME',
                project: 'PJ_PREFIX'
            }
        })
    };
    config.workDir = (path.resolve(__dirname, '../') + '/stack/' + config.argv.STACK_NAME)

    // 環境変数設定追加
    env(path.resolve(__dirname, '../') + '/stack/' + config.argv.STACK_NAME + '/.env');

    // 実行設定
    const cmd  = 'eval'
    const args = [
                    'run', '--rm', '-i',
                    '-v', '~/app/.aws:/root/.aws',
                    '-v', (path.resolve(__dirname, '../') + '/stack/' + config.argv.STACK_NAME) + ':/var/opt',
                    '-w', '/var/opt',
                    process.env.AWS_CLI_DOCKER_IMAGE,
                    'cloudformation', 'wait', 'change-set-create-complete',
                    '--change-set-name', 'future-ticket-0001',
                    '--stack-name', (config.argv.PJ_PREFIX + '-' + config.argv.STACK_NAME),
                    '--region', process.env.AWS_REGION
                 ]

    // 実行
    const runner = new Runner(config, cmd, args);
    runner.spawn(callback);
});
