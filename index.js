module.exports = function sass ( inputdir, outputdir, options, callback ) {
	var path = require( 'path' ),
		sander = require( 'sander' );

	require( 'node-sass' ).render({
		file: path.join( inputdir, options.src ),
		sourceComments: 'map',
		sourceMap: options.dest + '.map',
		success: function ( css, map ) {
			// pending https://github.com/sass/node-sass/issues/363...
			map = JSON.parse( map );
			map.sourcesContent = map.sources.map( function ( source ) {
				return sander.readFileSync( source ).toString();
			});

			sander.Promise.all([
				sander.writeFile( outputdir, options.dest + '.map', JSON.stringify( map ) ),
				sander.writeFile( outputdir, options.dest, css )
			]).then( function () { callback(); }, callback );
		},
		error: callback
	});
};
