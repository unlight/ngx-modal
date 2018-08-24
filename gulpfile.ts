import * as fs from 'fs';
import * as Path from 'path';
import gulp = require('gulp');
const readPkgUp = require('read-pkg-up');
import del = require('del');
const { name: pkgName, version, publishConfig } = readPkgUp.sync().pkg;
const g = require('gulp-load-plugins')();
const destPath = Path.join(__dirname, 'dist');

gulp.task('rename_pkg', done => {
    let pkg = JSON.parse(fs.readFileSync(`${destPath}/package.json`, 'utf8'));
    pkg = {
        ...pkg,
        name: pkgName,
        version,
        publishConfig,
        typings: 'src/index.ts',
    };
    fs.writeFileSync(`${destPath}/package.json`, JSON.stringify(pkg, null, 2));
    done();
});

gulp.task('copy_typings', gulp.series(['rename_pkg', () => {
    return gulp.src('src/**/*.ts')
        .pipe(g.ignore.exclude('*.spec.ts'))
        .pipe(gulp.dest(`${destPath}/src`));
}]));

gulp.task('copy_others', () => {
    return gulp.src(['src/*.css', 'README.md', 'LICENSE', '.npmrc', '.npmignore'], { allowEmpty: true })
        .pipe(gulp.dest(destPath));
});

gulp.task('postbuild', gulp.series([
    'copy_typings',
    'copy_others',
    done => {
        del.sync(`${destPath}/**/*.d.ts`);
        del.sync('.ng_build');
        done();
    }],
));
