var gulp        = require('gulp');
var requireDir  = require('require-dir');

requireDir('./task', { recurse: true });

gulp.task('default', gulp.series('validate'));
