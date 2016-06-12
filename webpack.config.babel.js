/* global __dirname */
import webpack from 'webpack';
import path from 'path';
import del from 'del';
import fs from 'fs';
import SwHtmlWebpackPlugin from './swHtmlWebpackPlugin';
import commandLineArgs from 'command-line-args';
import ExtractTextPlugin from 'extract-text-webpack-plugin';
import CopyPlugin from 'copy-webpack-plugin';
import AssetsPlugin from 'assets-webpack-plugin';

// Here you must add each option/flag you need. Without it even webpack specific flags will throw an exception.
let options = commandLineArgs([
    {
        name: 'watch',
        alias: 'w',
        type: Boolean
    },
    {
        name:  'environment',
        alias: 'e',
        type:  String
    }
]).parse();

let localHelper = {
    isProd(){
        return options.environment === 'prod';
    }
};

let paths = {
    base: {
        root: path.resolve(__dirname, '../../'),
        src: path.resolve(__dirname, '../../src/'),
        vendor: path.resolve(__dirname, '../../node_modules'),
        dest: path.resolve(__dirname, '../../dist'),
        configs: path.resolve(__dirname, '../config')
    }
};

//console.log('ssss: '+__dirname);
//console.log('ss: '+paths.base.src);
//throw new Error();

// common config
let baseConfig = {
    watch:   !!options.watch,
    cache: true
    //devtool: 'source-map' // do not use this one because of necessity to clarify the path for sourcemaps
};

let baseEntryConfig = {
    context: paths.base.src
};

// loaders
let loaders = {
    babel:  {
        test:    /\.js$/,
        exclude: /node_modules/,
        loader:  'babel-loader',
        query:   {
            stage: 0
        }
    },
    html:   {
        test:    /\.html$/,
        exclude: /node_modules/,
        loader:  'html-loader'
    },
    stylus: {
        test:    /\.styl$/,
        exclude: /node_modules/,
        loader:  'style-loader!css-loader!stylus-loader'
    },
    stylusExtract: {
        test:    /\.styl$/,
        exclude: /node_modules/,
        loader:  ExtractTextPlugin.extract('style-loader', 'css-loader!stylus-loader')
    },
    images: {
        dev: {
            test: /\.(jpe?g|png|gif|svg)$/i,
            loaders: [
                'file?hash=sha512&digest=hex&name=image.[hash].[ext]',
                'image-webpack?bypassOnDebug&optimizationLevel=7&interlaced=false'
            ]
        },
        // Using pngquant
        prod: {
            test: /.*\.(gif|png|jpe?g|svg)$/i,
            loaders: [
                'file?hash=sha512&digest=hex&name=image.[hash].[ext]',
                'image-webpack?{progressive:true, optimizationLevel: 7, interlaced: false, pngquant:{quality: "65-90", speed: 4}}'
            ]
        }
    },
    fonts: [
        {
            test: /\.(woff|woff2)(\?v=\d+\.\d+\.\d+)?$/,
            loader: 'url?limit=10000&mimetype=application/font-woff&prefix=fonts&name=font.[hash].[ext]'
        }, {
            test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/,
            loader: 'url?limit=10000&mimetype=application/octet-stream&prefix=fonts&name=font.[hash].[ext]'
        }, {
            test: /\.eot(\?v=\d+\.\d+\.\d+)?$/,
            loader: 'url?limit=10000&mimetype=application/vnd.ms-fontobject&prefix=fonts&name=font.[hash].[ext]'
        }, {
            test: /\.svg(\?v=\d+\.\d+\.\d+)?$/,
            loader: 'url?limit=10000&mimetype=image/svg+xml&prefix=fonts&name=font.[hash].[ext]'
        }
    ]
};

// plugins
let plugins = {
    commonChunks: () => {
        return new webpack.optimize.CommonsChunkPlugin({
            name: 'vendors',
            filename: 'vendors.[chunkhash].js',
            minChunks: (module, count) => {
                return module.resource && module.resource.indexOf('node_modules') !== -1 && count >= 1;
            }
        });
    },
    uglifyJs: () => {
        return new webpack.optimize.UglifyJsPlugin({
            mangle: false,
            compress: {
                warnings: false
            }
        });
    },
    dedupe: () => {
        return new webpack.optimize.DedupePlugin();
    },
    sourceMap: (path) => {
        return new webpack.SourceMapDevToolPlugin({
            filename: '[file].map',
            append: `\n//# sourceMappingURL=${path}[url]`
        })
    },
    ignore: (packages = []) => {
        return new webpack.IgnorePlugin(
            new RegExp(`^(${packages.join('|')})$`)
        );
    },
    assets: () => {
        return new AssetsPlugin({
            filename:    'webpack.assets.json',
            path:        paths.base.dest,
            prettyPrint: true
        });
    }
};

// vendors
//let vendors = [
//    'babel-core/polyfill',
//    'jquery',
//    'underscore',
//    'backbone',
//    'browser-bunyan',
//    'bowser',
//    'validate.js',
//    'underi18n',
//    'events',
//    'ga-browser',
//    'selectn'
//];

// resolves
let resolve = {
    alias: {
        moment: 'moment/min/moment.min.js'
    },
    modulesDirectories: [ 'node_modules' ],
};

// config data per entry
let entryPoints = [
    // onPage app (includes utilsIframe.ext inside & buttons as on-demand required subapps)
    {
        module: {
            loaders: [
                loaders.babel,
                loaders.html,
                loaders.stylus,
                localHelper.isProd() ? loaders.images.prod : loaders.images.dev
            ],
        },
        resolve: resolve,
        entry: [
            './bootstrap.js'
        ],
        output: {
            path:       path.join(paths.base.dest, '/'),
            publicPath: '/dist/',
            filename:   'bootstrap.[chunkhash].js'
        },
        plugins: [
            plugins.ignore(['fs', 'path'])
        ]
    },

    // utilsIframe
    {
        module: {
            loaders: [
                loaders.babel,
                loaders.html,
                localHelper.isProd() ? loaders.images.prod : loaders.images.dev
            ],
        },
        resolve: resolve,
        entry: {
            bootstrap: './utilsIframe/int/bootstrap.js',
        },
        output: {
            path: path.join(paths.base.dest, '/utilsIframe'),
            publicPath: '/dist/utilsIframe/',
            filename:   'bootstrap.[chunkhash].js'
        },
        plugins: [
            plugins.ignore(['fs', 'path']),
            plugins.commonChunks(),
            new SwHtmlWebpackPlugin({
                path: path.join(paths.base.dest, 'utilsIframe'),
                inject: 'body',
                title: 'Sizewhiz utils iframe',
                filename: 'main.html'
            })
        ]
    },

    // generic1 app
    {
        entry: {
            bootstrap: './apps/generic1/int/bootstrap.js'
        },
        resolve: resolve,
        module: {
            loaders: [
                         loaders.babel,
                         loaders.html,
                         loaders.stylusExtract,
                         localHelper.isProd() ? loaders.images.prod : loaders.images.dev
                     ].concat(loaders.fonts)
        },
        output: {
            path:       path.join(paths.base.dest, '/apps/generic1'),
            publicPath: '/dist/apps/generic1/',
            filename:   'bootstrap.[chunkhash].js'
        },
        plugins: [
            plugins.ignore(['fs', 'path']),
            plugins.commonChunks(),
            new SwHtmlWebpackPlugin({
                path: path.join(paths.base.dest, 'apps/generic1'),
                inject: 'body',
                title: 'Sizewhiz generic1 application',
                filename: 'main.html'
            }),
            new ExtractTextPlugin('main.css', {
                allChunks: true
            }),
            // copy /assets dir to the root build directory of the app
            new CopyPlugin([{
                from: './apps/generic1/assets', to: './assets'
            }])
        ]
    }
];

// merging result
let mergedConfig = [];

// add apps as entry points to webpack output
entryPoints.forEach((entryPointConfig, i) => {

    //if ( entryPoint.webpackConfig.entry.vendors ) {
    //
    //    vendors.forEach(vendor => {
    //        entryPoint.webpackConfig.entry.vendors.push(vendor);
    //    });
    //
    //}

    entryPointConfig.plugins.push(plugins.sourceMap(entryPointConfig.output.publicPath));

    if (localHelper.isProd()) {
        entryPointConfig.plugins.push(plugins.uglifyJs());
        entryPointConfig.plugins.push(plugins.dedupe());
    }


    mergedConfig.push( Object.assign(entryPointConfig, baseEntryConfig) );
});

// NOTE: mergedConfig is an array!!!
export default Object.assign(mergedConfig, baseConfig);