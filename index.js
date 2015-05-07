var path = require( 'path' );
var sander = require( 'sander' );

module.exports = function sass ( inputdir, outputdir, options, callback ) {
	if ( !options.src || !options.dest ) {
		throw new Error( 'gobble-sass requires `options.src` and `options.dest` to be set' );
	}

	options.file = path.join( inputdir, options.src );

	if ( options.sourceMap !== false ) {
		// by default, generate sourcemaps and include comments
		options.outFile = path.join( inputdir, options.dest );
		options.sourceMap = path.join( inputdir, options.dest + '.map' );
		options.sourceMapContents = options.sourceMapContents !== false;
	}

	options.error = callback;

	options.success = function ( result ) {
		var promises = [
			sander.writeFile( outputdir, options.dest, result.css )
		];

		if ( result.map ) {
			promises.push( sander.writeFile( outputdir, options.dest + '.map', result.map ) );
		}

		sander.Promise.all( promises ).then( function () { callback(); }, callback );
	};

	require( 'node-sass' ).render( options );
};
