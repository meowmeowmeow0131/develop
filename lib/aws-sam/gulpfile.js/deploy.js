/**
 * するスクリプト
 * 
 * @return
 * @refarence
 */
const path     = require('path');
const gulp     = require('gulp');
const minimist = require('minimist');
const env      = require('node-env-file');
const Runner   = require('./Runner');

gulp.task('deploy', (callback) => {

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
    const cmd     = 'docker'
    const args    = [
                        'run', '--rm', '-i',
                        '-v', '/var/run/docker.sock:/var/run/docker.sock',
                        '-v', '~/app/.aws:/root/.aws',
                        '-v', (path.resolve(__dirname, '../') + '/stack/' + config.argv.STACK_NAME) + ':/var/opt',
                        '-w', '/var/opt',
                        '-p', '"3000:3000"',
                        '-e', 'AWS_ACCESS_KEY_ID=' + process.env.AWS_ACCESS_KEY_ID,
                        '-e', 'AWS_SECRET_ACCESS_KEY=' + process.env.AWS_SECRET_ACCESS_KEY,
                        '-e', 'AWS_DEFAULT_REGION=' + process.env.AWS_REGION,
                        process.env.AWS_SAM_DOCKER_IMAGE,
                        'deploy',
                        '--template-file', 'packaged.yaml',
                        '--stack-name', config.argv.STACK_NAME,
                        '--capabilities', process.env.RESOURCE_PERMISSION
                    ]

    // 実行
    const runner = new Runner(config, cmd, args);
    runner.spawn(callback);
});
