/**
 * 作成した任意のスタックのリストを取得するスクリプト
 * 取得する情報はフィルター条件で指定可能だが、条件に設定できるのはステータスのみ、過去90日以外の情報に限る、という制限あり。
 * 削除したスタックも含めて取得可能
 * 
 * @return
 * 過去90日まで遡り、最終ステータスが「CREATE_COMPLETE」のスタックの情報を返却
 * @refarence
 */
const path       = require('path');
const dateformat = require('dateformat');
const gulp       = require('gulp');
const minimist   = require('minimist');
const env        = require('node-env-file');
const Runner     = require(path.resolve(__dirname, '..', '..') + '/aws-sam/gulpfile.js/Runner');

gulp.task('list-stacks', (callback) => {

    // 設定読込み
    var config = {
        lib:    path.basename(path.resolve(__dirname, '..')),
        action: path.basename(__filename).replace('.js',''),
        argv:   minimist(process.argv.slice(2), {
            string:  ['project', 'env', 'template', 'changeset'],
            default: {
                project:   'tutorial',
                env:       'demo',
                template:  'ec2-web-server-template',
                changeset: 'future-ticket-0001'
            },
            alias:   {
                project:   'PJ_PREFIX',
                env:       'ENVIRONMENT',
                template:  'TEMPLATE_NAME',
                changeset: 'CHANGE_SET_NAME'
                
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
                                ${process.env.AWS_CLI_DOCKER_IMAGE} cloudformation list-stacks \
                                    --stack-status-filter CREATE_COMPLETE \
                                    --region ${process.env.AWS_REGION}
                        }
                    `

                 ]

    // 実行
    const runner = new Runner(config, cmd, args);
    runner.spawn(callback);
});
