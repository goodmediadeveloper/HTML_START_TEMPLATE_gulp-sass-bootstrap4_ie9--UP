var gulp = require('gulp'),
	gutil = require('gulp-util'),
	sass = require('gulp-sass'),
	concat = require('gulp-concat'),
	uglify = require('gulp-uglify'),
	cleanCss = require('gulp-clean-css'),
	rename = require('gulp-rename'),
	prefixer = require('gulp-autoprefixer'),
	notify = require('gulp-notify'),
	browserSync = require('browser-sync'),
	reload = browserSync.reload,
	rigger = require('gulp-rigger'),
	sourcemaps = require('gulp-sourcemaps'),
	rimraf = require('rimraf'),
	uncss = require('gulp-uncss'),
	uncss = require('gulp-uncss'),
	cssmin = require('gulp-csso'),
	imageMin = require('gulp-imagemin'),
	pngQuant = require('imagemin-pngquant'),
	rsync = require('gulp-rsync');



var path = {
	//папка куда складываются готовые файлы
	dist: {
		html: 'dist/',
		js: 'dist/js/',
		css: 'dist/css/',
		img: 'dist/images/',
		fonts: 'dist/fonts/',
        video: 'dist/video/'

	},
	//папка откуда брать файлы
	app: {
		html: 'app/[^_]*.html',
		js: 'app/js/*.js',
		css: 'app/css/*css',
		style: 'app/sass/*.sass',
		img: 'app/images/**/*.{jpg,jpeg,png,svg}',
		fonts: 'app/fonts/**/*.*',
        video: 'app/video/**/*.*'
	},
	//указываем после измененя каких файлов нужно действовать
	watch: {
		html: 'app/**/*.html',
		js: 'app/js/**/*.js',
		style: 'app/**/*.{media-sass-sass,sass}',
		img: 'app/images/**/*.*',
		video: 'app/video/**/*.*',
		fonts: 'app/fonts/**/*.*'
	},
	clean: './dist'
};

var configServer = {
	server: {
		baseDir: "./dist" //из какой папки показывать
	},
	notify: false,
	host: 'localhost',
	port: 9000,
};

html = () => {
	return gulp.src(path.app.html)
		.pipe(rigger())
		.pipe(gulp.dest(path.dist.html))
		.pipe(reload({
			stream: true
		}));
};

styles = () => {
	return gulp.src(path.app.style)
		// .pipe(sourcemaps.init())
		.pipe(sass({
			outputStyle: 'expanded'
		}).on("error", notify.onError()))
		//comment
		// .pipe(uncss({
		// 	html: ['dist/*.html']
		// }))
		// .pipe(rename({ suffix: '.min', prefix : '' }))
		//comment
		.pipe(prefixer({
			overrideBrowserslist: ['last 15 versions'],
			cascade: false
		}))
		.pipe(cssmin())
		.pipe(rename({
			suffix: '.min'
		}))
		.pipe(cleanCss({
			level: {
				1: {
					specialComments: 0
				}
			}
		})) // Opt., comment out when debugging
		.pipe(sourcemaps.write())
		.pipe(gulp.dest(path.dist.css))
		.pipe(reload({
			stream: true
		}));
};

js = () => {
	return gulp.src([
			'app/libs/jquery/dist/jquery.min.js',
			'app/libs/owl.carousel/dist/owl.carousel.min.js',
			'app/libs/scrollspy/scrollspy.min.js',
			'app/libs/wow/dist/wow.min.js',
       		'app/libs/jquery-lazy/jquery.lazy.min.js',
			path.app.js
		])
		.pipe(rigger())
		.pipe(sourcemaps.init())
		.pipe(concat('scripts.min.js'))
		// .pipe(uglify())
		//.pipe(sourcemaps.write())
		.pipe(gulp.dest(path.dist.js))
		.pipe(reload({
			stream: true
		}));
};

images = () => {
	return gulp.src(path.app.img)
		// .pipe(imageMin({
		// 	progressive: true,
		// 	use: [pngQuant()],
		// 	interlaced: true
		// }))
		.pipe(gulp.dest(path.dist.img))
		.pipe(reload({stream: true}));
};

videos = () => {
	return gulp.src(path.app.video)
		.pipe(gulp.dest(path.dist.video))
		.pipe(reload({stream: true}));
};

fonts = () => {
    return gulp.src(path.app.fonts)
        .pipe(gulp.dest(path.dist.fonts))
};

clean = (cb) => {
	return rimraf(path.clean, cb);
};

webServer = () => {
	return browserSync(configServer);
};

watch = () => {
	gulp.watch(path.watch.html, html);
	gulp.watch(path.watch.style, styles);
	gulp.watch(path.watch.js, js);
	gulp.watch(path.watch.img, images);
	gulp.watch(path.watch.fonts, fonts);
	gulp.watch(path.watch.video, videos);
};

var start = gulp.series(clean, gulp.parallel(webServer, watch, html, styles, js, fonts, images, videos));
gulp.task('default', start);


// gulp.task('rsync', function() {
// 	return gulp.src('app/**')
// 	.pipe(rsync({
// 		root: 'app/',
// 		hostname: 'username@yousite.com',
// 		destination: 'yousite/public_html/',
// 		// include: ['*.htaccess'], // Includes files to deploy
// 		exclude: ['**/Thumbs.db', '**/*.DS_Store'], // Excludes files from deploy
// 		recursive: true,
// 		archive: true,
// 		silent: false,
// 		compress: true
// 	}))
// });
