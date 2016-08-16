module.exports = {
    entry: {
        index: "./src/assets/js/index.js"
    },
    output: {
        path: __dirname + "/public/assets/js/",
        filename: '[name].js'
    },
    module: {
        loaders: [
            {
                test: /\.js$/,
                loader: 'babel',
                exclude: 'node_modules',
                query: {
                    presets: ['es2015']
                }
            }
        ]
    }
}