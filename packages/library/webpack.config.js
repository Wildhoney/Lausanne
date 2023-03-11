import nodeExternals from "webpack-node-externals";

export default {
  mode: "production",
  entry: "./src/index.client.tsx",
  externals: [nodeExternals()],
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: "ts-loader",
        exclude: /node_modules/,
      },
    ],
  },
  resolve: {
    extensions: [".tsx", ".ts", ".js"],
    extensionAlias: {
      ".js": [".ts", ".tsx", ".js"],
    },
  },
  experiments: {
    "outputModule": true
  },
  output: {
    filename: "index.client.js",
    libraryTarget: "module"
  },
};
