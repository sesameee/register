// eslint-disable-next-line @typescript-eslint/no-var-requires
const gulp = require("gulp");

gulp.task("static", function() {
  return gulp.src("immutable/**").pipe(gulp.dest("public"));
});

gulp.task(
  "default",
  gulp.series(["static"], function(cb) {
    const channelId = process.argv[2].replace("--", "");
    gulp
      .src("src/platform/" + channelId + "/**")
      .pipe(gulp.dest("public").on("end", cb));
  })
);
