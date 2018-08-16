import { Config } from 'karma';
import { Configuration } from 'webpack';
import webpackConfig = require('./webpack.config');

process.env.CHROME_BIN = require('puppeteer').executablePath();

export = (config: any) => {

    const karma: Config = config;

    karma.set({
        files: [
            { pattern: 'spec.module.js' },
        ],
        preprocessors: {
            '**/spec.module.js': ['webpack', 'sourcemap']
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
        webpack: webpackConfig({ hmr: false, test: true }),
        webpackMiddleware: {
            stats: 'minimal'
        }
    });

};
