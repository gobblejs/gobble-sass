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
module.exports = gobble( 'src/styles' ).transform( 'sass', {
  src: 'main.scss',
  dest: 'main.css'
});
```


## License

MIT. Copyright 2015 Rich Harris
