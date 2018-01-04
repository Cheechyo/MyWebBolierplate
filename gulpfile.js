var gulp = require('gulp');
var uglify = require('gulp-uglify');
var concat = require('gulp-concat');
var watch = require('gulp-watch');
var cleanCSS = require('gulp-clean-css');
var connect = require('gulp-connect');

//js 프로젝트 소스파일
var jsfiles = ['src/js/config.js', 'src/js/pages/**/*.js', 'src/js/main.js'];

gulp.task('concat:js', function() {
  return gulp.src(jsfiles)
    .pipe(concat('app.js'))
    .pipe(gulp.dest('dist/'));
});

gulp.task('copy:html', function() {
  return gulp.src('src/index.html')
    .pipe(connect.reload())
    .pipe(gulp.dest('dist/'));
});

gulp.task('copy:lib', function() {
  return gulp.src('src/lib/**/*')
    .pipe(gulp.dest('dist/lib'));
});

// static files
var statics = [ 
  'src/img/**/*'          // 사이트 이미지
//, 'src/favicon.ico'       // 파비콘
, 'src/humans.txt'        // 해당 사이트 및 애플리케이션 제작자들의 기술적 자문을 구하기 위한 연락처와 같은 정보 기술
, 'src/robots.txt'        // 검색 엔진 크롤러가 액세스하지 않기를 바라는 구역을 설정
// , 'src/browserconfig.xml' // IE 타일 아이콘 설정
// , 'src/tile-wide.png'     // IE 타일 아이콘
// , 'src/tile.png'          // IE 타일 아이콘
// , 'src/site.webmanifest'
// , 'src/icon.png'
];

gulp.task('copy:static', function() {
  return gulp.src(statics)
    .pipe(gulp.dest('dist'));
});

gulp.task('minify:js', function() {
  return gulp.src('dist/app.js')
    .pipe(uglify())
    .pipe(gulp.dest('dist'));
});

gulp.task('minify:css', function() {
  return gulp.src('src/css/*.css')
    .pipe(gulp.dest('dist'));
});

gulp.task('watch', function() {
  gulp.watch('src/**/*', ['build']);
});

gulp.task('connect', function() {
  connect.server({
    root: 'dist',
    livereload: true,
    port: 3001
  });
});


gulp.task('copy', ['copy:html', 'copy:lib', 'copy:static']);
gulp.task('build', ['concat:js', 'copy', 'minify:css']);
gulp.task('server', ['connect'])
gulp.task('default', ['build', 'watch', 'server']);
