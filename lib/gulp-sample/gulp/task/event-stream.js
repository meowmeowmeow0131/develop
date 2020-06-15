var gulp  = require('gulp');
var merge = require('event-stream').merge;

gulp.task('event-stream', function(callback) {
	merge(
		gulp
			.src('src/js/*.js')
			.pipe(gulp.dest('dest/js/')),

		gulp
			.src('src/css/*.css')
			.pipe(gulp.dest('dest/css/'))
	);
	callback();
});