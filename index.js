module.exports = function sass ( srcDir, destDir, options, done, err ) {

	if ( !options || !options.src || !options.dest ) {
		throw new Error('gobble-sass requires options.src and options.dest to be set')
	}

	options.file = require( 'path' ).resolve( srcDir, options.src );
	options.success = function ( css ) {
		require( 'gobble' ).file.write( destDir, options.dest, css ).then( done, err );
	}
	options.err = err

	require( 'node-sass' ).render( options );
};
