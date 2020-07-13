var gulp        = require('gulp');
var requireDir  = require('require-dir');

requireDir('./', { recurse: true });

// テンプレートの検証
gulp.task('default', gulp.series('validate'));

// スタックの作成
gulp.task('default', gulp.series('create-stack', 'list-stacks', 'describe-stack-events'));

// スタックの changeset の作成
gulp.task('create-changeset', gulp.series('create-changeset', 'wait-create-changeset-complete', 'list-changeset'));

// スタックの changeset の実行
gulp.task('execute-changeset', gulp.series('execute-changeset', 'wait-execute-changeset-complete'));

// スタックの changeset の削除
gulp.task('delete-changeset', gulp.series('list-changeset', 'delete-changeset', 'wait-delete-stack-complete'));
