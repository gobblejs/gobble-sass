module.exports = function sass ( srcDir, destDir, options, done, err ) {
	require( 'node-sass' ).render({
		file: require( 'path' ).resolve( srcDir, options.src ),
		success: function ( css ) {
			require( 'gobble' ).file.write( destDir, options.dest, css ).then( done, err );
		},
		error: err
	});
};
