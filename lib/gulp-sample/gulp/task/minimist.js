const gulp       = require('gulp');
const minimist   = require('minimist');

gulp.task('minimist', (callback) => {

    const argv = require('minimist')(process.argv.slice(2), {
        string: ['username','age'],
        default: {
            u: 'mike',
            a: 10
        },
        alias: {
            u: 'username',
            a: 'age'
        }
    });

    console.log(argv)
    console.log('username: ', argv.username)
    console.log('age: ', argv.age)
    callback();
});