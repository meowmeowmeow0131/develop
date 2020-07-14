var gulp        = require('gulp');
var requireDir  = require('require-dir');

requireDir('./', { recurse: true });

// テンプレートの検証
gulp.task('default', gulp.series('validate'));

// スタックの作成
gulp.task('create-stack', gulp.series('create-stack', 'wait-create-stack-complete'));

// スタックの削除
gulp.task('delete-stack', gulp.series('list-stacks', 'delete-stack', 'wait-delete-stack-complete'));

// スタックの changeset の作成
gulp.task('create-changeset', gulp.series('create-changeset', 'wait-create-changeset-complete', 'list-changeset'));

// スタックの changeset の実行
gulp.task('execute-changeset', gulp.series('execute-changeset', 'describe-changeset'));

// スタックの changeset の削除
gulp.task('delete-changeset', gulp.series('list-changeset', 'delete-changeset', 'wait-delete-stack-complete'));
