var gulp        = require('gulp');
var runSequence = require('run-sequence');

gulp.task('run-sequence', function(callback) {
	runSequence(
		gulp.series(
			'first',
			gulp.parallel(
				'second-1',
				'second-2',
				'second-3'
			),
			'third',
		)
	);
	// タスク完了を知らせる
	callback();
});

gulp.task('first', function(callback) {
	setTimeout(function(){
		console.log('first 3 second done.');
		callback();
	}, 3000);
});
gulp.task('second-1', function(callback) {
	setTimeout(function(){
		console.log('second-1 1.5 second done.');
		callback();
	}, 1500);
});
gulp.task('second-2', function(callback) {
	setTimeout(function(){
		console.log('2 second done.');
		callback();
	}, 3000);
});
gulp.task('second-3', function(callback) {
	setTimeout(function(){
		console.log('second-3 5 second done.');
		callback();
	}, 5000);
});
gulp.task('third', function(callback) {
	setTimeout(function(){
		console.log('third 2 second done.');
		callback();
	}, 2000);
});