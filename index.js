var path = require( 'path' );
var sander = require( 'sander' );
var _sass = require( 'node-sass' );

module.exports = function sass ( inputdir, outputdir, options, callback ) {
	if ( !options.src || !options.dest ) {
		throw new Error( 'gobble-sass requires `options.src` and `options.dest` to be set' );
	}

	options.file = path.join( inputdir, options.src );

	if ( options.sourceMap !== false ) {
		// by default, generate sourcemaps and include comments
		options.outFile = path.join( outputdir, options.dest );
		options.sourceMap = path.join( outputdir, options.dest + '.map' );
		options.sourceMapRoot = path.dirname( options.outFile );
		options.sourceMapContents = options.sourceMapContents !== false;
	}

	_sass.render( options, function ( err, result ) {
		if ( err ) return callback( err );

		var promises = [ sander.writeFile( outputdir, options.dest, result.css ) ];

		if ( result.map ) {
			promises.push( sander.writeFile( outputdir, options.dest + '.map', result.map ) );
		}

		Promise.all( promises ).then( function () { callback(); }, callback );
	});
};
