import * as webpack from 'webpack';
import * as fs from 'fs';
import * as Path from 'path';

const sourcePath = Path.join(__dirname, 'src');
const buildPath = Path.join(__dirname, 'dist');
const context = __dirname;

const defaultOptions = {
    test: false,
};

export default (options: any = defaultOptions) => {
    const stats: webpack.Options.Stats = {
        version: false,
        maxModules: 0,
        children: false,
        warningsFilter: [
            /Critical dependency/,
            /export .* was not found in/,
            /System.import/,
            /Cannot find SourceMap/,
        ],
    };

    const config: any = {
        mode: 'development',
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
            stats,
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
            return result;
        })()
    };

    return config;
}
