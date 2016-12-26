var webpack = require('webpack');
var path = require('path');
var WebpackNotifierPlugin = require('webpack-notifier');
var BUILD_DIR = path.resolve(__dirname, 'public/js');
var APP_DIR = path.resolve(__dirname, 'resources/assets/scripts');

var config = {
    cache: true,
    devtool: 'eval',
    //devtool: 'cheap-module-source-map',
    entry: {
        popup: [
            APP_DIR + '/popup/index.js',
        ],

        app: [
            APP_DIR +'/vendor/lib/jquery.js',
            APP_DIR +'/vendor/bootstrap.js',
            APP_DIR +'/vendor/select2.js',
            //APP_DIR +'/vendor/dataTables.min.js',
            APP_DIR +'/vendor/backbone/underscore.js',
            APP_DIR +'/script.js'
        ],
        contract_view: [
            APP_DIR + '/contract/annotator/annotator.plugin.event.js',
            APP_DIR + '/contract/annotator/annotator.plugin.viewer.js',
            APP_DIR + '/contract/annotator/pdf-annotator.js',
            APP_DIR + '/contract/index.js'
        ],

        clipping: [
            APP_DIR + '/contract/clip/main.js'
        ]
    },
    output: {
        path: BUILD_DIR,
        filename: '[name].js'
    },
    module: {
        loaders: [
            {
                test: require.resolve("jquery"),
                loader: "expose?$!expose?jQuery"
            },
            {
                test: /[\.js?$|\.jsx?$]/,
                include: APP_DIR,
                exclude: /node_modules/,
                loader: 'babel',
                query: {
                    cacheDirectory: true, //important for performance
                    plugins: ["transform-regenerator"],
                    presets: ["react", "es2015", "stage-0"]
                }
            }
        ]
    },
    resolve: {
        extensions: ['', '.js', '.jsx']
    },
    plugins: [
        new webpack.optimize.OccurenceOrderPlugin(),
        new webpack.optimize.DedupePlugin(),
        new webpack.optimize.UglifyJsPlugin({
            compress: {warnings: false},
            minimize: true,
            output: {
                comments: false
            }
        }),
        new WebpackNotifierPlugin({title: 'Webpack'}),
        new webpack.NoErrorsPlugin(),
        new webpack.DefinePlugin({
            'process.env': {
                'NODE_ENV': JSON.stringify('production')
            }
        }),

        new webpack.ProvidePlugin({
            $: "jquery",
            jQuery: "jquery"
        })
    ]
};

module.exports = config;