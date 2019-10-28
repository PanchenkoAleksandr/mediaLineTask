let gulp = require("gulp"),
  // less = require("gulp-less"),
  sass = require("gulp-sass"),
  concat = require("gulp-concat"),
  sourcemaps = require("gulp-sourcemaps"),
  autoprefixer = require("gulp-autoprefixer"),
  unCSS = require("gulp-uncss"),
  cleanCSS = require("gulp-clean-css"),
  rename = require("gulp-rename"),
  browserSync = require("browser-sync");

gulp.task("make-min-css", () => {
  return gulp
    .src("./src/scss/**/*.scss") //исходный файл
    .pipe(sourcemaps.init()) //инициализации sourcemap
    .pipe(autoprefixer()) //подключаем вендерные префиксы
    .pipe(sass().on('eror', sass.logError)) //компилируем sass в css
    // .pipe(concat("style.css")) //объединяем css в один файл
    .pipe(cleanCSS({ compatibility: "ie8" })) //минифицируем css
    // .pipe(
    //   unCSS({
    //     html: ["dist/index.html"] //удаляем неиспользуемые CSS стили
    //   })
    // )
    .pipe(rename("style.min.css")) //переименовываем в style.min.css
    .pipe(sourcemaps.write()) //запуск sourcemaps для отображения в браузере
    .pipe(gulp.dest("build/style"));
});

gulp.task("browser-sync-work", () => {
  browserSync.init({
    server: {
      baseDir: "build"
    },
    notify: false
  });
  browserSync.watch("build", browserSync.reload);
});

gulp.task("watch", () => {
  gulp.watch("src/scss/**/*.scss", gulp.series("make-min-css"));
});

gulp.task("default", gulp.parallel(gulp.parallel("watch", "browser-sync-work")));