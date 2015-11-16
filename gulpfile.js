var gulp = require('gulp'),
    livereload = require('gulp-livereload'),
    watch = require('gulp-watch');
gulp.task('watch',function(){
    livereload.listen();
    gulp.watch('site/*.html').on('change',livereload.changed);
    gulp.watch('site/js/*.js').on('change',livereload.changed);
    gulp.watch('site/css/*.css').on('change',livereload.changed);
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
    gulp.src('./bower_components/jstree/dist/jstree.js')
        .pipe(gulp.dest('./site/js/lib'));
});


gulp.task('default',['watch','buildlib']);
