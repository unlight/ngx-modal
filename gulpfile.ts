///  <reference path="node_modules/@types/node/index.d.ts" />
import * as fs from 'fs';
import * as Path from 'path';
const gulp = require('gulp');
const readPkgUp = require('read-pkg-up');
import del = require('del');
const { name: pkgName, version } = readPkgUp.sync().pkg;
const g = require('gulp-load-plugins')();
const destPath = Path.join(__dirname, 'package');

gulp.task('rename_pkg', done => {
    let pkg = JSON.parse(fs.readFileSync(`${destPath}/package.json`, 'utf8'));
    pkg = { ...pkg, name: pkgName, version, typings: 'src/index.ts' };
    fs.writeFileSync(`${destPath}/package.json`, JSON.stringify(pkg, null, 2));
    done();
});

gulp.task('copy_typings', ['rename_pkg'], () => {
    return gulp.src('src/**/*.ts')
        .pipe(g.ignore.exclude('*.spec.ts'))
        .pipe(gulp.dest(`${destPath}/src`));
});

gulp.task('copy_others', () => {
    return gulp.src(['src/*.css', 'README.md', 'LICENSE'])
        .pipe(gulp.dest(destPath));
});

gulp.task('postbuild', ['copy_typings', 'copy_others'], done => {
    del.sync(`${destPath}/**/*.d.ts`);
    del.sync('.ng_build');
    done();
});

// function sourceLint() {
//     return g.eslint();
// }

// function specLint() {
//     return g.eslint({
//         rules: {
//             'lodash/import-scope': 0,
//             'prefer-const': 0,
//             'import/no-duplicates': 0,
//         }
//     });
// }

// gulp.task('eslint', () => {
//     return gulp.src('src/**/*.ts', { since: g.memoryCache.lastMtime('ts') })
//         .pipe(g.memoryCache('ts'))
//         .pipe(g.ignore.exclude('*.d.ts'))
//         .pipe(g.if('*.spec.ts', specLint(), sourceLint()))
//         .pipe(g.eslint.format());
// });

// gulp.task('eslint:watch', (done) => {
//     let w = gulp.watch('src/**/*.ts', { ignoreInitial: false }, gulp.series('eslint'));
//     w.on('change', g.memoryCache.update('ts'));
//     process.on('SIGINT', () => {
//         w.close();
//         done();
//     });
// });

// gulp.task('server:prestart', done => {
//     const version = readPkgUp.sync().pkg.version;
//     const libsInfoFile = Path.resolve('node_modules', '.vendor-libs.build.json');
//     const libs = `${buildPath}/libs.json`;
//     if (fs.existsSync(libs) && fs.existsSync(libsInfoFile)) {
//         const libsInfo = require(libsInfoFile);
//         if (version === (libsInfo && libsInfo.version)) {
//             return done();
//         }
//     }
//     const proc = spawn('npm', ['run', 'build:vendor-libs'], { stdio: 'inherit' });
//     proc.once('exit', () => {
//         fs.writeFileSync(libsInfoFile, JSON.stringify({ version }));
//         done();
//     });
// });

// gulp.task('check:build:prod', () => {
//     const globby = require('globby');
//     return globby(`${buildPath}/app*.js`).then(paths => {
//         if (paths.length === 0) {
//             return Promise.reject('build:prod task did not produce app javascript file.');
//         }
//     });
// });

// gulp.task('test:int', () => {
//     const express = require('express');
//     const app: Application = express();
//     app.use(express.static(buildPath));
//     const server = app.listen(2345);
//     const nightmare = require('nightmare')({});
//     return nightmare
//         .wait(1000)
//         .goto('http://localhost:2345')
//         .wait('a[ng-reflect-router-link=welcome]')
//         .click('a[ng-reflect-router-link=welcome]')
//         .evaluate(() => {
//             let h = document.querySelector('h3');
//             return h && h.innerText;
//         })
//         .end()
//         .then(result => {
//             assert.equal(result, 'Welcome');
//             server.close();
//         })
//         .catch(err => Promise.reject(String(err)));
// });

// gulp.task('stryker:source', (done) => {
//     gulp.src('src/**/!(*.ts)', { base: 'src' })
//         .pipe(gulp.dest(`${buildPath}/source`))
//         .on('end', () => {
//             const proc = spawn('npm', [...'run tsc -- --target ES6'.split(' '), `--outDir`, `${buildPath}/source`], { stdio: 'inherit' });
//             proc.once('exit', done);
//         });
// });

// gulp.task('killzombie', () => {
//     if (process.platform === 'win32') {
//         const fkill = require('fkill');
//         return fkill('electron.exe', { force: true });
//     } else {
//         return Promise.resolve();
//     }
// });

// gulp.task('build:ngx-modal', (done) => {
//     const projectPath = `${__dirname}/src/modules/@epam/ngx-modal`;
//     const proc = spawn('npm', [...'run tsc --'.split(' '),
//         '--declaration',
//         `--project`, projectPath,
//         `--outDir`, `${projectPath}/lib`,
//     ], { stdio: 'inherit' });
//     proc.once('exit', done);
// });
