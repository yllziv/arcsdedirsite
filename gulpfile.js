var gulp = require('gulp'),
    livereload = require('gulp-livereload'),
    watch = require('gulp-watch'),
    sass = require('gulp-sass');

gulp.task('watch',function(){
    livereload.listen();
    gulp.watch('site/*.html').on('change',livereload.changed);
    gulp.watch('site/js/*.js').on('change',livereload.changed);
    gulp.watch('site/css/*').on('change',livereload.changed);
    gulp.watch('./site/css/*.scss', ['sass']);
});

gulp.task('buildlib',function(){
    gulp.src('./bower_components/jquery/dist/jquery.min.js')
        .pipe(gulp.dest('./site/js/lib'));
    gulp.src('./bower_components/bootstrap/dist/js/bootstrap.min.js')
        .pipe(gulp.dest('./site/js/lib'));
    gulp.src('./bower_components/underscore/underscore-min.js')
        .pipe(gulp.dest('./site/js/lib'));
    gulp.src('./bower_components/requirejs/require.js')
        .pipe(gulp.dest('./site/js/lib'));
    gulp.src('./bower_components/bootstrap/dist/css/bootstrap.css')
        .pipe(gulp.dest('./site/css'));
    //gulp.src('./bower_components/jstree/dist/themes/default/style.css')
    //    .pipe(gulp.dest('./site/css'));
    gulp.src('./bower_components/jstree/dist/jstree.js')
        .pipe(gulp.dest('./site/js/lib'));
});

gulp.task('sass', function () {
    gulp.src('./site/css/*.scss')
        .pipe(sass().on('error', sass.logError))
        .pipe(gulp.dest('./site/css'));
});

gulp.task('default',['watch','buildlib','sass']);
