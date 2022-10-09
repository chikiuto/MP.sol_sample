"use strict";

const path = require( "path" );
require('dotenv').config();

const fs = require( "fs" );
var MP_ABI = require('./MPabi.js');


// 参考【 https://docs.ethers.io/v5/getting-started/ 】
const { ethers } = require("ethers"); // 追記

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

	// 参考【 https://docs.alchemy.com/docs/alchemy-quickstart-guide 】
	// 		 【 https://qiita.com/KeisakuHiga/items/7e52f74ed8744dae02e5 】
	const url = 'https://eth-goerli.g.alchemy.com/v2/O2_6ZL9WCZTXWkBQNVvIOJKdsf-OgFcv';
	const ContractAddress = '0x2f8F7D0AaCeB1c5fF873864e3A0478403Ed566b2';
	const Abi = MP_ABI;

	// If you don't specify a //url//, Ethers connects to the default 
	// (i.e. ``http:/\/localhost:8545``)
	const provider = new ethers.providers.JsonRpcProvider(url);

	
	// The provider also allows signing transactions to
	// send ether and pay to change state within the blockchain.
	// For this, we need the account signer...
	const wallet = new ethers.Wallet( process.env.PRIVATE_KEY, provider );
	const signer = wallet.provider.getSigner( wallet.address );
	
	const contract = new ethers.Contract(ContractAddress, Abi, signer);

	// let listPrice = await contract.updateListPrice( ethers.utils.parseEther( "0.001" ) );
	let listPrice = await contract.getListPrice();
	await console.log(listPrice);
	await console.log(listPrice.toString());
	//formatEtherはStringで返す
	await console.log( ethers.utils.formatEther( listPrice ) );
	console.log('- - - - - - - - - - - - - - - - - - - - - - - - - - - -');
	
	// console.log( await contract.createToken("https://www.niigata-u.ac.jp/", 2, {value: ethers.utils.parseEther( "0.001" )}));
	
	console.log('- - - - - - - - - - - - - - - - - - - - - - - - - - - -');

	let AllNFTs = await contract.getAllNFTs();
	console.log(AllNFTs);

	console.log('- - - - - - - - - - - - - - - - - - - - - - - - - - - -');
	
	let myNFTs = await contract.getMyNFTs();
	console.log(myNFTs);
	
	console.log('- - - - - - - - - - - - - - - - - - - - - - - - - - - -');

	// let Sale = await contract.executeSale( 6, {value: ethers.utils.parseEther( "0.001" )} );

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
