const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const ReactServerWebpackPlugin = require("react-server-dom-webpack/plugin");
const rimraf = require("rimraf");

rimraf.sync(path.resolve(__dirname, "../dist"));

module.exports = {
  entry: {
    client: path.resolve(__dirname, "./src/index.client.tsx"),
    server: path.resolve(__dirname, "./server/api.server.ts"),
  },
  devtool: "cheap-module-source-map",
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
        },
      },
      {
        test: /\.tsx?$/,
        use: "ts-loader",
        exclude: /node_modules/,
      },
    ],
  },
  resolve: {
    extensions: [".tsx", ".ts", ".jsx", ".js"],
    fallback: {
      /**
       * https://github.com/webpack/webpack/blob/49890b77aae455b3204c17fdbed78eeb47bc1d98/lib/ModuleNotFoundError.js#L14-L41
       *  assert: "assert/",
       *  buffer: "buffer/",
       *  console: "console-browserify",
       *  constants: "constants-browserify",
       *  crypto: "crypto-browserify",
       *  domain: "domain-browser",
       *  events: "events/",
       *  http: "stream-http",
       *  https: "https-browserify",
       *  os: "os-browserify/browser",
       *  path: "path-browserify",
       *  punycode: "punycode/",
       *  process: "process/browser",
       *  querystring: "querystring-es3",
       *  stream: "stream-browserify",
       *  _stream_duplex: "readable-stream/duplex",
       *  _stream_passthrough: "readable-stream/passthrough",
       *  _stream_readable: "readable-stream/readable",
       *  _stream_transform: "readable-stream/transform",
       *  _stream_writable: "readable-stream/writable",
       *  string_decoder: "string_decoder/",
       *  sys: "util/",
       *  timers: "timers-browserify",
       *  tty: "tty-browserify",
       *  url: "url/",
       *  util: "util/",
       *  vm: "vm-browserify",
       *  zlib: "browserify-zlib",
       */
      async_hooks: false,
      buffer: "buffer/",
      fs: false,
      module: false,
      path: false,
      stream: false,
      string_decoder: false,
      querystring: false,
      "stream-http": false,
      http: false,
      url: false,
      util: false,
      net: false,
      crypto: false,
      zlib: false,
    },
  },
  output: {
    filename: "[name].bundle.js",
    path: path.resolve(__dirname, "dist"),
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.join(__dirname, "public", "index.html"),
    }),
    new ReactServerWebpackPlugin({ isServer: false }),
  ],
};
