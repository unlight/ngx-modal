import webpackConfig from './webpack.config';

export default (config: any) => {

    const webpackOptions = { hmr: false, test: true, coverage: false };

    config.set({
        client: {
            captureConsole: true,
        },
        files: [
            { pattern: 'spec.module.js' },
        ],
        preprocessors: {
            '**/spec.module.js': ['webpack', 'sourcemap'],
        },
        browsers: ['ChromeCustom'],
        customLaunchers: {
            ChromeCustom: {
                base: 'ChromeHeadless',
                flags: [
                    '--no-sandbox',
                    '--headless',
                    '--disable-gpu',
                    '--remote-debugging-port=9222',
                ],
            },
        },
        frameworks: [
            'jasmine',
        ],
        reporters: ['progress'],
        mime: {
            'text/x-typescript': ['ts', 'tsx'],
        },
        webpackMiddleware: {
            stats: 'errors-only',
        },
    });

    if (process.argv.indexOf('--coverage') !== -1) {
        webpackOptions.coverage = true;
        config.set({
            reporters: ['progress', 'coverage', 'remap-coverage'],
            coverageReporter: {
                type: 'in-memory'
            },
            remapCoverageReporter: {
                text: null,
            },
        });
    }

    config.set({
        webpack: webpackConfig(webpackOptions),
    });

};
