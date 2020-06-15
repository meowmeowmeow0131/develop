var gulp        = require('gulp');
var runSequence = require('run-sequence');
var requireDir  = require('require-dir');

requireDir('./gulp/task', { recurse: true });

gulp.task('default', gulp.series('gulp-plumber'));             // 動作確認OK
gulp.task('default', gulp.series('gulp-notify'));              // 動作確認OK
//gulp.task('default', gulp.series('run-sequence'));           // 動作確認NG
gulp.task('default', gulp.series('gulp-rename'));              // 動作確認OK
gulp.task('default', gulp.series('gulp-if-true'));             // 動作確認OK
gulp.task('default', gulp.series('gulp-if-false'));            // 動作確認OK
gulp.task('default', gulp.series('gulp-ignore'));              // 動作確認OK
gulp.task('default', gulp.series('gulp-filter'));              // 動作確認OK
gulp.task('default', gulp.series('child_process-exec'));       // 動作確認OK
gulp.task('default', gulp.series('fs'));                       // 動作確認OK
gulp.task('default', gulp.series('strip-json-comments'));      // 動作確認OK
gulp.task('default', gulp.series('gulp-strip-json-comments')); // 動作確認OK
gulp.task('default', gulp.series('gulp-replace'));             // 動作確認OK
gulp.task('default', gulp.series('gulp-header'));              // 動作確認OK
gulp.task('default', gulp.series('gulp-footer'));              // 動作確認OK
gulp.task('default', gulp.series('gulp-concat'));              // 動作確認OK
gulp.task('default', gulp.series('event-stream'));             // 動作確認OK
gulp.task('default', gulp.series('del'));                      // 動作確認OK
/*gulp.task('default', function(callback) {                    // 動作確認NG
	runSequence(
		'gulp-plumber',
		'gulp-notify',
		'run-sequence',
		'gulp-rename',
		'gulp-if-true',
		'gulp-if-false',
		'gulp-ignore',
		'gulp-filter',
		'child_process-exec',
		'fs',
		'strip-json-comments',
		'gulp-strip-json-comments',
		'gulp-replace',
		'gulp-header',
		'gulp-footer',
		'gulp-concat',
		'event-stream',
		'del',
		// タスク完了を知らせる
		callback
	);
});*/
