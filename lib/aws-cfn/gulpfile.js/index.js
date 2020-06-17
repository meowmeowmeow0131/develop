var gulp        = require('gulp');
var requireDir  = require('require-dir');

requireDir('./', { recurse: true });

gulp.task('default', gulp.series('validate'));
gulp.task('default', gulp.series('create-changeset'));
gulp.task('default', gulp.series('list-changeset'));
gulp.task('default', gulp.series('execute-changeset'));
gulp.task('default', gulp.series('delete-changeset'));
