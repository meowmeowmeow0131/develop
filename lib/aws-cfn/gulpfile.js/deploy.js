const path       = require('path');
const gulp       = require('gulp');
const minimist   = require('minimist');
const env        = require('node-env-file');
const Runner     = require(path.resolve(__dirname, '..', '..') + '/aws-sam/gulpfile.js/Runner');

gulp.task('deploy', (callback) => {

    // 設定読込み
    var config = {
        lib:    path.basename(path.resolve(__dirname, '..')),
        action: path.basename(__filename).replace('.js',''),
        argv:   minimist(process.argv.slice(2), {
            string:  ['project', 'stack'],
            default: {
                project: 'demo',
                stack: 'web-server'
            },
            alias:   {
                project: 'PJ_PREFIX',
                stack: 'STACK_NAME'
                
            }
        })
    };
    config.workDir = (path.resolve(__dirname, '../') + '/stack/' + config.argv.STACK_NAME)

    // 環境変数設定追加
    env(path.resolve(__dirname, '../') + '/stack/' + config.argv.STACK_NAME + '/.env');

    // 実行設定
    const cmd  = 'docker'
    const args = [
                    'run', '--rm', '-i',
                    '-v', '~/app/.aws:/root/.aws',
                    '-v', (path.resolve(__dirname, '../') + '/stack/' + config.argv.STACK_NAME) + ':/var/opt',
                    '-w', '/var/opt',
                    process.env.AWS_CLI_DOCKER_IMAGE,
                    'cloudformation', 'delete-change-set',
                    '--template-body', ('file://' + process.env.TEMPLATE_FILE),
                    '--cli-input-json', ('file://' + process.env.PARAMETER_FILE),
                    '--capabilities', process.env.RESOURCE_PERMISSION,
                    '--region', process.env.AWS_REGION
                 ]

    // 実行
    const runner = new Runner(config, cmd, args);
    runner.spawn(callback);
});
