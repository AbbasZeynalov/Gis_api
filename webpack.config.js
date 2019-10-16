const path = require('path')

module.exports = {
    entry: './src/server.ts',
    module: {
        rules: [
            {
                test: /\.(tsx|ts)?$/,
                use: 'ts-loader',
                exclude: /node_modules/,
            },
            {
                test: /\.(js)?$/,
                use: 'babel-loader',
                exclude: /node_modules/,
            },
            {
                test: /\.mjs$/,
                include: /node_modules/,
                type: 'javascript/auto'
            }
        ],
    },
    // externals: ['tls', 'net', 'fs'],
    resolve: {
        modules: ['node_modules', 'src'],
        extensions: [ '.tsx', '.ts', '.js','*', '.mjs', '.js', '.vue', '.json', '.gql', '.graphql' ],
        alias: {
            NodeModules: path.resolve(__dirname, 'node_modules'),
            Src: path.resolve(__dirname, 'src')
        }
    },
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, 'build'),
    },
    target: "node",
    // mode: 'development',
    mode: 'production',
    /*optimization: {
        minimizer: [new TerserPlugin({ terserOptions: { mangle: false } })] // mangle false else mysql blow ups with "PROTOCOL_INCORRECT_PACKET_SEQUENCE"
    },*/
    optimization: {
        minimize: false
    },
    // externals: [ nodeExternals() ]

};