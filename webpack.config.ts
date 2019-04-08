/// <reference path="node_modules/@types/node/index.d.ts" />
import * as webpack from 'webpack';
import * as fs from 'fs';
import * as Path from 'path';

const sourcePath = Path.join(__dirname, 'src');
const buildPath = Path.join(__dirname, 'dist');
const context = __dirname;

const defaultOptions = {
    test: false,
    aot: false,
};

export = (options: any = defaultOptions) => {
    const config: any = {
        context: context,
        entry: (() => {
            if (options.test) return false;
            return {
                app: './example/main.ts',
            };
        })(),
        output: {
            path: buildPath,
            publicPath: '',
            filename: '[name].js',
        },
        devtool: (() => {
            return 'cheap-source-map';
        })(),
        devServer: {
            overlay: true,
            noInfo: false,
            contentBase: [buildPath],
            port: 8013,
            historyApiFallback: true,
            hot: true,
            inline: true,
            stats: 'normal',
            // stats: { reasons: true, maxModules: 10000 },
        },
        node: {
            // workaround for webpack-dev-server issue
            // https://github.com/webpack/webpack-dev-server/issues/60#issuecomment-103411179
            fs: 'empty',
            net: 'empty',
            // Buffer: false,
        },
        target: 'web',
        resolve: {
            extensions: ['.ts', '.js'],
        },
        module: {
            exprContextCritical: false,
            rules: [
                {
                    parser: { amd: false }
                },
                {
                    test: /\.ts$/,
                    use: (() => {
                        let result: any[] = [
                            {
                                loader: 'awesome-typescript-loader',
                                options: {
                                    useTranspileModule: true,
                                    isolatedModules: true,
                                    transpileOnly: true,
                                }
                            },
                            'angular-router-loader',
                        ];
                        if (options.aot) {
                            result = [{
                                loader: '@ngtools/webpack',
                            }];
                        }
                        return result;
                    })(),
                },
                {
                    test: /\.component\.html$/,
                    use: [
                        { loader: 'raw-loader' }
                    ]
                },
                {
                    test: /index\.ejs$/,
                    use: [
                        { loader: 'ejs-loader' },
                    ]
                },
                {
                    test: /\.component\.css$/,
                    use: [
                        { loader: 'css-to-string-loader' },
                        { loader: 'css-loader', options: { importLoaders: 1 } },
                    ]
                },
                {
                    test: /\.css$/,
                    use: (() => {
                        let result = [
                            { loader: 'style-loader' },
                            { loader: 'css-loader' },
                        ];
                        return result;
                    })(),
                },
                {
                    test: /\.(woff|woff2|eot|ttf|png|svg)$/,
                    use: [
                        { loader: 'file-loader', options: { name: 'i/[name]-[hash:6].[ext]' } }
                    ]
                },
            ],
        },
        plugins: (() => {
            const result: any[] = [
                new webpack.WatchIgnorePlugin([
                    /node_modules/
                ])
            ];
            const HtmlWebpackPlugin = require('html-webpack-plugin');
            result.push(new HtmlWebpackPlugin({
                template: './example/index.ejs',
                minify: false,
                excludeChunks: [],
            }));
            if (options.aot) {
                const { AotPlugin } = require('@ngtools/webpack');
                result.push(new AotPlugin({
                    tsConfigPath: Path.resolve('tsconfig.json'),
                    entryModule: Path.resolve('example/app.module#AppModule'),
                }));
            }
            return result;
        })()
    };

    return config;
}

