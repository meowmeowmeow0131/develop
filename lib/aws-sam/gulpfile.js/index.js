var gulp        = require('gulp');
var requireDir  = require('require-dir');

requireDir('./', { recurse: true });

gulp.task('default', gulp.series('validate'));
