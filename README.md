# gobble-sass

Compile SASS files with gobble.

## Installation

First, you need to have gobble installed - see the [gobble readme](https://github.com/gobblejs/gobble) for details. Then,

```bash
npm i -D gobble-sass
```

## Usage

```js
var gobble = require( 'gobble' );
module.exports = gobble( 'src' ).transform( 'sass', { src: 'scss/main.scss', dest: 'min.css' });
```

## Source code

```js
module.exports = function sass ( srcDir, destDir, options, done ) {
  require( 'node-sass' ).render({
    file: require( 'path' ).join( srcDir, options.src ),
    success: function ( css ) {
      require( 'gobble' ).file.write( destDir, options.dest, css ).then( done, done );
    },
    error: done
  });
};
```


## License

MIT. Copyright 2014 Rich Harris
