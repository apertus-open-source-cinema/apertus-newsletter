var pump = require('pump')
var gulp = require('gulp')
var mjml = require('gulp-mjml')
var server = require('gulp-webserver');
var exec = require('child_process').exec;

gulp.task('webserver', ['build'], function () {
  gulp.src('./html/')
  .pipe(server({
      livereload: true,
      directoryListing: {
          enable: true,
          path: 'html'
      },
      open: 'http://localhost:8000/newsletter.html'
}));
});

gulp.task('build', function (cb) {
  //pump([gulp.src('./newsletter.mjml'), mjml(), gulp.dest('./html')], cb);
  exec('mjml -r newsletter.mjml -o html/newsletter.html', function (err, stdout, stderr) {
    console.log(stdout);
    console.log(stderr);
    cb(err);
  });
  gulp.src('./images/**').pipe(gulp.dest('./html/images/'));
});

gulp.task('watch', ['webserver'], function () {
  gulp.watch('./newsletter.mjml', ['build']);
  gulp.watch('./images', ['build'])
});

gulp.task('default', ['watch']);