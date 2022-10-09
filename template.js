"use strict";

const path = require( "path" );
const fs = require( "fs" );

function main( argc, argv )
{
	const params = {
		root: path.dirname( __dirname ),
	};

	Execute( params )
		.then( () => {
			process.exit(0);
		})
		.catch( e => {
			console.error( e );
			process.exit(1);
		});
}


async function Execute( params )
{
	// ここに処理を実装
	// 異常終了時: throw new Error( "Message" );




}


//==============================================================
if( require.main === module )
{
	// 0: /path/to/node
	// 1: /path/to/this_script.js
	// 2-: specified command-line arguments
	main( process.argv.length, process.argv );
	// 非同期処理の終了までプログラムは終了しない
}
//==============================================================
// End_of_Script
