import path from 'path';
import webpack from 'webpack';
import Memoryfs from 'memory-fs';

export default (fixture) => {
  const compiler = webpack({
    context: __dirname,
    entry: `./${fixture}`,
    output: {
      path: path.resolve(__dirname),
      filename: 'bundle.js',
    },
    module: {
      rules: [{
        test: /\.txt$/,
        use: [
          'raw-loader',
          {
            loader: path.resolve(__dirname, '../src/index.js'),
          },
        ],
      }],
    },
  });

  compiler.outputFileSystem = new Memoryfs();

  return new Promise((resolve, reject) => {
    compiler.run((err, stats) => {
      if (err) reject(err);
      resolve(stats);
    });
  });
};
