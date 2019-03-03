import webpack from 'webpack';
import path from 'path';
export default {
    mode: 'development',
    devtool: 'cheap-source-map',
    entry: {
        common: [ 'webpack/hot/dev-server', 'eventsource-polyfill', 'webpack-hot-middleware/client?reload=true', './src/client/common/js/common.js'],
                 homeApp: [ 'webpack/hot/dev-server', 'eventsource-polyfill', 'webpack-hot-middleware/client?reload=true', './src/client/home/js/homeApp.js' ],
                 mainPageApp: [ 'webpack/hot/dev-server', 'eventsource-polyfill', 'webpack-hot-middleware/client?reload=true', './src/client/home/js/mainPageApp.js' ],
                 notesPageApp: [ 'webpack/hot/dev-server', 'eventsource-polyfill', 'webpack-hot-middleware/client?reload=true', './src/client/home/js/notesPageApp.js' ]
    },
    
    target: 'web',
    output: {
        path: __dirname + '/dist',
        publicPath: '/',
        filename: '[name].js'
    },
    devServer: {
        contentBase: './dist'
    },
    plugins: [
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NoEmitOnErrorsPlugin()
    ],
    module: {
        rules: [
            { test: /\.js$/, include: path.resolve(__dirname, 'src/client'), use: ['babel-loader'] },
            { 
                test: /(\.css)$/, 
                use: [ 'style-loader', 'css-loader' ] 
            }
        ]
    }
};