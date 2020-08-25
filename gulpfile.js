let gulp = require('gulp');
let sass = require('gulp-sass');
let watch = require('gulp-watch')
// 定于任务,将sass转化为css
gulp.task('sass', function () {
  return gulp.src('./sass/*.scss').pipe(sass()).pipe(gulp.dest('./css/'))
})

// 定义监听任务
gulp.task('watch-sass', function (done) {
  watch('./sass/*.scss', gulp.parallel('sass'));
  done();
})