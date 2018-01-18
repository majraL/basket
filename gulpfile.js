// /**********************************************************************************************************************
//   1. DEPENDENCIES
// **********************************************************************************************************************/

var gulp = require("gulp"),
  sass = require("gulp-sass"),
  autoprefixer = require("gulp-autoprefixer"),
  plumber = require("gulp-plumber"),
  minifyCSS = require("gulp-cssnano"),
  browserSync = require("browser-sync"),
  nunjucks = require("gulp-nunjucks-render");

// /**********************************************************************************************************************
//   2. SASS
// **********************************************************************************************************************/

gulp.task("sass", function() {
  console.log("Compiling SCSS to CSS");
  return gulp
    .src("src/scss/*.scss")
    .pipe(plumber())
    .pipe(sass())
    .pipe(autoprefixer())
    .pipe(minifyCSS())
    .pipe(gulp.dest("app/css"));
});

// /**********************************************************************************************************************
//   4. NUNJUCKS
// **********************************************************************************************************************/
gulp.task("nunjucks", function() {
  return gulp
    .src("src/html/**/*.html")
    .pipe(
      nunjucks({
        path: ["src/html/"]
      })
    )
    .pipe(gulp.dest("app"));
});

// /**********************************************************************************************************************
//   5. BROWSER SYNC
// **********************************************************************************************************************/

gulp.task("browser-sync", function() {
  browserSync.init(["app/css/*.css", "app/index.html"], {
    server: {
      baseDir: "./app/"
    }
  });
});

// /**********************************************************************************************************************
//   6. GULP TASK
// **********************************************************************************************************************/

gulp.task("default", function() {
  gulp.run(["sass", "nunjucks", "browser-sync"]);

  gulp.watch("src/scss/**/*.scss", function() {
    gulp.run("sass");
  });

  gulp.watch("src/html/**/*.html", function() {
    gulp.run("nunjucks");
  });
});
