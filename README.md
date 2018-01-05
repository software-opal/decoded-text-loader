# decoded-text-loader
A webpack loader to convert text of an unknown encoding into a JavaScript UTF-8 string

*Note:* This does not produce an webpack-suitable output. This loader must be chained onto another loader which outputs 
valid JavaScript.

## To install

```
npm install --save-dev decoded-text-loader
```

## To use in webpack

### `webpack.config.js`
```
module.exports = {
  module: {
    loaders: [
      {
        test: /_large\.txt$/,
        loaders: [
          'decoded-text-loader',
          'file-loader',
        ],
      },
      {
        test: /\.txt$/,
        loaders: [
          'decoded-text-loader',
          'raw-loader',
        ],
      },
    ],
  },
};
```

This will automatically convert any `*_large.txt` to use the [`file-loader`](https://webpack.js.org/loaders/file-loader/) 
so they can be loaded dynamically. All other `*.txt` files will be loaded using 
[`raw-loader`](https://webpack.js.org/loaders/raw-loader/) so they can be accessed directly.

## Notes

webpack handles loading the files into a string for this loader to consume; that string is inspected using 
[`jschardet`](https://www.npmjs.com/package/jschardet), and then converted into the detected encoding using
[`text-encoding`](https://www.npmjs.com/package/text-encoding).

