/**
 * Git リポジトリをクローンする
 * 
 */
const path       = require('path');
const gulp       = require('gulp');
const del        = require('del');
const git        = require('gulp-git');
const minimist   = require('minimist');
const env        = require('node-env-file');

gulp.task('git-clone', (callback) => {

    // 引数
    const argv = minimist(process.argv.slice(2), {
        string: ['repo', 'env'],
        default: {
            repo: 's3-aws-log-data',
            env:  'poc'
        },
        alias: {
            repo: 'REPOSITORY_NAME',
            env:  'ENVIRONMENT'
        }
    });

    // 環境変数
    env('.env');

    // 前回時のリポジトリ削除
    del([
        'tmp/*',
        '!keep'
    ])

    // リポジトリダウンロード
    git.clone('https://github.com/' + process.env.GIT_USER + '/' + argv.REPOSITORY_NAME, {args: process.env.ROOT_DIR + '/tmp'}, function(err) {
    // handle err
    });

    callback();
});
