'use strict';

var gulp         = require('gulp');
var $            = require('gulp-load-plugins')();
var less         = require('gulp-less');
var path         = require('path');
var browserify   = require('browserify');
var source       = require('vinyl-source-stream');


var bOpts = {
  default: {
    outfile: 'bundle.js',
    debug: !gulp.env.production,
    require: [],
    exclude: []
  }
};

// gulp.task('less', function () {
//   gulp.src('./app/less/style.less')
//     .pipe(less({
//       paths: [ path.join(__dirname, 'less', 'includes') ]
//     }))
//     .on('error', function( err ) {
//       console.log(err.toString());
//       this.emit( 'end' );
//     })
//     .pipe(gulp.dest('./app/dist/css'));
// });

gulp.task('connect', function () {
    var connect = require('connect');
    var app = connect()
        .use(require('connect-livereload')({ port: 35729 }))
        .use(connect.static('game'))
        .use(connect.static('.tmp'))
        .use(connect.directory('game'));

    require('http').createServer(app)
        .listen(9000)
        .on('listening', function () {
            console.log('Started connect web server on http://localhost:9000');
        });
});

gulp.task('serve', ['connect'], function () {
    require('opn')('http://localhost:9000');
});

gulp.task('browserify', function() {
  var b = browserify({ entries: './src/index.js' });

  return b.bundle()
      .on('error', function (err) {
        console.log(err.toString());
        this.emit( 'end' );
      })
      .pipe( source( './src/index.js' ))
      .pipe( $.rename( 'game.js' ))
      .pipe( gulp.dest( './game/' ));

});

gulp.task('watch', ['connect', 'browserify', 'serve'], function () {
    var server = $.livereload();

    // watch for changes

    gulp.watch([
        'app/dist/css/*.css'
    ]).on('change', function (file) {
        server.changed(file.path);
    });

    //gulp.watch('app/less/**/*.less', ['less']);

    gulp.watch('app/js/**/*.js', ['browserify']);
});

