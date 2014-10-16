module.exports = function sass ( inputdir, outputdir, options, callback ) {
	var path = require( 'path' ),
		sander = require( 'sander' );

	if ( !options.src || !options.dest ) {
		throw new Error( 'gobble-sass requires `options.src` and `options.dest` to be set' );
	}

	options.file = path.join( inputdir, options.src );
	options.sourceComments = 'map';
	options.sourceMap = options.dest + '.map';
	options.error = callback;

	options.success = function ( css, map ) {
		// source is relative to sourcemap location
		var base = path.dirname( options.sourceMap );

		// pending https://github.com/sass/node-sass/issues/363...
		map = JSON.parse( map );
		map.sourcesContent = map.sources.map( function ( source ) {
			return sander.readFileSync( base, source ).toString();
		});

		// sourceMappingURL must be relative, otherwise browsers
		css = css.replace( /\/*# sourceMappingURL=([^\s]+)/, '/*# sourceMappingURL=./' + path.basename( options.dest ) + '.map' );

		sander.Promise.all([
			sander.writeFile( outputdir, options.dest + '.map', JSON.stringify( map ) ),
			sander.writeFile( outputdir, options.dest, css )
		]).then( function () { callback(); }, callback );
	};

	require( 'node-sass' ).render( options );
};
