/**
 * テンプレートの検証を行うスクリプト
 * 
 * @return
 * @refarence
 */
const path     = require('path');
const gulp     = require('gulp');
const minimist = require('minimist');
const env      = require('node-env-file');
const Runner   = require(path.resolve(__dirname, '..', '..') + '/aws-sam/gulpfile.js/Runner');

gulp.task('validate', (callback) => {

    // 設定読込み
    var config = {
        lib:    path.basename(path.resolve(__dirname, '..')),
        action: path.basename(__filename).replace('.js',''),
        argv:   minimist(process.argv.slice(2), {
            string:  ['project', 'env', 'template'],
            default: {
                project:  'tutorial',
                env:      'demo',
                template: 'ec2-web-server-template'
            },
            alias:   {
                project:  'PJ_PREFIX',
                env:      'ENVIRONMENT',
                template: 'TEMPLATE_NAME'
                
            }
        })
    };
    config.workDir = (path.resolve(__dirname, '../') + '/template/' + config.argv.TEMPLATE_NAME);
    config.stackName = [config.argv.PJ_PREFIX,config.argv.ENVIRONMENT,config.argv.TEMPLATE_NAME].join('-');

    // 環境変数設定追加
    env(path.resolve(__dirname, '../') + '/template/' + config.argv.TEMPLATE_NAME + '/.env');

    // 実行設定
    const cmd  = 'eval'
    const args = [
                    `
                        {
                            docker run --rm -i \
                                -v ~/app/.aws:/root/.aws \
                                -v ${config.workDir}:/var/opt \
                                -w /var/opt \
                                ${process.env.AWS_CLI_DOCKER_IMAGE} cloudformation validate-template \
                                    --template-body file://${process.env.TEMPLATE_FILE} \
                                    --region ${process.env.AWS_REGION}
                        }
                    `
                 ]

    // 実行
    const runner = new Runner(config, cmd, args);
    runner.spawn(callback);
});
