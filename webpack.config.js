const WebpackNotifierPlugin = require('webpack-notifier');

module.exports = {
    entry: {
        'js_lib/SmoothScrollMove': './index.js',
    },
    output: {
        path: __dirname,
        filename: '[name].js',
        library: 'SmoothScrollMove',
    },
    /**
     * loaders 對應使用規則
     */
     module: {
         rules: [
             {
                 test: /\.js$/,
                 exclude: /node_modules/,
                 use: [
                     {
                         loader: 'babel-loader',
                         options: {
                             presets: [
                                 "@babel/preset-env",
                                 "@babel/preset-react",
                             ],
                             plugins: [
                                 "@babel/plugin-proposal-class-properties",
                                 "@babel/transform-runtime"
                             ]
                         },
                     },
                 ],
             },
            {
                test: /\.(scss|sass)$/,
                use: ['style-loader', 'css-loader', 'sass-loader']
            },
         ],
     },
    plugins: [
        new WebpackNotifierPlugin(),
    ],
};
