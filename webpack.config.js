const path = require("path");

module.exports = {
    mode: "production",
    entry: "./src/main.js",
    output: {
        path: path.resolve(__dirname, "build"),
        filename: "Crybaby.min.js",
    },
    module: {
        rules: [
            {
                test: /\.css$/,
                use: ['style-loader', 'css-loader']
            }
        ]
    }
};