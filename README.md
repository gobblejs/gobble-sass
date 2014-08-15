# gobble-sass

Compile SASS files with gobble.

## Installation

First, you need to have gobble installed - see the [gobble readme](https://github.com/gobblejs/gobble) for details. Then,

```bash
npm i -D gobble-sass
```

## Usage

```js
var gobble = require( 'gobble' ),
	sass = require( 'gobble-sass' );

module.exports = gobble( 'src' )
	.transform( sass, { src: 'scss/main.scss', dest: 'min.css' });
```


## License

MIT. Copyright 2014 Rich Harris
