/// <reference path="node_modules/@types/node/index.d.ts" />
import { Config } from 'karma';
import { Configuration } from 'webpack';
import webpackConfig = require('./webpack.config');

export = (config: any) => {

    const karma: Config = config;

    karma.set({
        files: [
            { pattern: 'spec.module.js' },
        ],
        preprocessors: {
            '**/spec.module.js': ['webpack', 'sourcemap']
        },
        browsers: ['Nightmare'],
        frameworks: [
            'jasmine',
        ],
        reporters: ['progress'],
        mime: {
            'text/x-typescript': ['ts', 'tsx'],
        },
        nightmareOptions: {
            width: 800,
            height: 600,
            show: false,
            devTools: false
        },
        webpack: webpackConfig({ hmr: false, test: true }),
        webpackMiddleware: {
            stats: 'minimal'
        }
    });

};
