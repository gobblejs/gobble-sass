var path = require( 'path' );
var sander = require( 'sander' );
var assert = require( 'assert' );
var transformer = require( '../' );

process.chdir( __dirname );

var SAMPLES = path.resolve( 'samples' );
var OUTPUT = path.resolve( 'output' );

function noop () {};

describe( 'gobble-sass', function () {
	beforeEach( function () {
		sander.rimrafSync( OUTPUT );

		sander.readdirSync( SAMPLES ).forEach( function ( sample ) {
			if ( sample[0] === '.' ) return; // .DS_Store and friends
			sander.mkdirSync( OUTPUT, sample );
		});
	});

	it( 'throws an error if `options.src` is missing', function () {
		assert.throws( function () {
			transformer( 'x', 'y', { dest: 'out.css' }, noop );
		});
	});

	it( 'throws an error if `options.dest` is missing', function () {
		assert.throws( function () {
			transformer( 'x', 'y', { src: 'in.scss' }, noop );
		});
	});

	it( 'throws an error if `options.src` is a non-existent file', function ( done ) {
		transformer( SAMPLES + '/a', OUTPUT + '/a', {
			src: 'nope.scss',
			dest: 'out.css'
		}, function ( err ) {
			assert.ok( !!err );
			done();
		});
	});

	it( 'transpiles CSS', function ( done ) {
		transformer( SAMPLES + '/a', OUTPUT + '/a', {
			src: 'in.scss',
			dest: 'out.css'
		}, function ( err ) {
			if ( err ) return done( err );

			var css = sander.readFileSync( OUTPUT, 'a/out.css' ).toString();
			assert.ok( css );
			done();
		});
	});

	it( 'generates a sourcemap by default', function ( done ) {
		transformer( SAMPLES + '/a', OUTPUT + '/a', {
			src: 'in.scss',
			dest: 'out.css'
		}, function ( err ) {
			if ( err ) return done( err );

			var json = sander.readFileSync( OUTPUT, 'a/out.css.map' ).toString();
			var map = JSON.parse( json );

			assert.deepEqual( map, {
				version: 3,
				file: 'out.css',
				sourceRoot: OUTPUT + '/a',
				sources: [ '../../samples/a/in.scss' ],
				sourcesContent: [ sander.readFileSync( SAMPLES, 'a/in.scss' ).toString() ],
				mappings: 'AAEA,AACC,IADG,CACH,EAAE,CAAC;EACF,KAAK,EAJD,OAAY,GAKhB',
				names: []
			});

			done();
		});
	});

	it( 'omits sourcemap if `options.sourceMap` === false', function ( done ) {
		transformer( SAMPLES + '/a', OUTPUT + '/a', {
			src: 'in.scss',
			dest: 'out.css',
			sourceMap: false
		}, function ( err ) {
			if ( err ) return done( err );

			assert.throws( function () {
				sander.readFileSync( OUTPUT, 'a/out.css.map' );
			});

			done();
		});
	});
});