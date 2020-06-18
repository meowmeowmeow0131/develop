const path       = require('path');
const dateformat = require('dateformat');
const gulp       = require('gulp');
const minimist   = require('minimist');
const env        = require('node-env-file');
const Runner     = require(path.resolve(__dirname, '..', '..') + '/aws-sam/gulpfile.js/Runner');

gulp.task('create-stack', (callback) => {

    // 設定読込み
    var config = {
        lib:    path.basename(path.resolve(__dirname, '..')),
        action: path.basename(__filename).replace('.js',''),
        argv:   minimist(process.argv.slice(2), {
            string:  'stack',
            default: {
                stack: 'tutorial-test-server'
            },
            alias:   {
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
                    process.env.AWS_SAM_DOCKER_IMAGE,
                    'cloudformation', 'create-stack',
                    '--stack-name', config.argv.STACK_NAME,
                    '--parameters', ('ParameterKey="CompanyPrefix"' + ',' + 'ParameterValue="' + process.env.COMPANY_PREFIX + '"'), ('ParameterKey="PJPrefix"' + ',' + 'ParameterValue="' + process.env.PJ_PREFIX + '"'),
                    '--template-body', 'file://template.yaml',
                    '--capabilities', 'CAPABILITY_IAM',
                    '--region', process.env.AWS_REGION
                 ]

    // 実行
    const runner = new Runner(config, cmd, args);
    runner.spawn(callback);
});
