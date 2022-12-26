"use strict";

const path = require( "path" );
require('dotenv').config();

const fs = require( "fs" );
var MP_ABI = require('./MPabi.js');

// 参考【 https://docs.alchemy.com/docs/alchemy-quickstart-guide 】
const { Network, Alchemy } = require("alchemy-sdk");

// 参考【 https://docs.ethers.io/v5/getting-started/ 】
const { ethers } = require("ethers"); // 追記
const { parseEther, formatEther } = require("ethers/lib/utils.js");
const { argv } = require("process");

function main( argc, argv )
{
	console.log( "argc is ..." + argc);
	console.log( "argv is ..." + argv );

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

	// Etherscan :: https://goerli.etherscan.io/address/0x2f8F7D0AaCeB1c5fF873864e3A0478403Ed566b2

	// 参考【 https://docs.alchemy.com/docs/alchemy-quickstart-guide 】
	// 　　【 https://qiita.com/KeisakuHiga/items/7e52f74ed8744dae02e5 】
	const url = 'https://eth-goerli.g.alchemy.com/v2/O2_6ZL9WCZTXWkBQNVvIOJKdsf-OgFcv';
	const ContractAddress = '0x2f8F7D0AaCeB1c5fF873864e3A0478403Ed566b2';
	const Abi = MP_ABI;	
	const apiKey = "O2_6ZL9WCZTXWkBQNVvIOJKdsf-OgFcv";
	const provider = new ethers.providers.AlchemyProvider( "goerli", apiKey);
	
	// The provider also allows signing transactions to
	// send ether and pay to change state within the blockchain.
	// For this, we need the account signer...
	const wallet = new ethers.Wallet( process.env.PRIVATE_KEY, provider );
	const contract = new ethers.Contract( ContractAddress, Abi, wallet );
  
	// ファイル保存先
	// "https://hitomebore.agritech-niigata-univ.club/?svg=0ed3ad0caefda33f042e4e2e0b86645b368d1c45b12373b43ee4e70c1ac5bd80"

	if ( argv[2] == 'getLatestIdToListedToken' ) {
		let latestId = await contract.getLatestIdToListedToken();
		process.stdout.write( latestId.toString() );
	}

	else if ( argv[2] == 'getCurrentToken' ) {
		let currentToken = await contract.getCurrentToken();
		process.stdout.write( currentToken.toString() );
	}
		
	else if ( argv[2] == 'getListedTokenForId' ) {
		// arg[3] の tokenId は文字列で bigNumber 型
		let tokenDetail = await contract.getListedTokenForId( argv[3] );
		process.stdout.write( JSON.stringify( tokenDetail ) );
	}
	
	else if ( argv[2] == 'getAllNFTs' ) {
		let allNFTs = await contract.getAllNFTs();
		process.stdout.write( JSON.stringify( allNFTs ) );
	}
	
	else if ( argv[2] == 'getMyNFTs' ) {
		let myNFTs = await contract.getMyNFTs();
		process.stdout.write( JSON.stringify( myNFTs ) );
	}

	else if ( argv[2] == 'updateListPrice' ) {
		// parseEtherはEtherをweiに変換（戻り値は Bignumber）
		let newListPrice = await contract.updateListPrice( ethers.utils.parseEther( argv[3] ) );
		// let newListPrice = await contract.updateListPrice( ethers.utils.parseEther( "0.0035" ) );
		process.stdout.write( JSON.stringify( newListPrice ) );
	}
  
	else if ( argv[2] == 'getListPrice' ) {
		// listPrice の型は Bignumber
		// 1 ETH = 1 wei x 10^18
		let listPrice = await contract.getListPrice();

		// Bignumber　オブジェクトが返ってくる
		await console.log( listPrice );
		// toString だと単位は wei
		await console.log( 'toString result : ' + listPrice.toString() + ' wei' );
		// formatEtherは wei を Ether に変換（戻り値は String）
		await console.log( 'formatEther result : ' + ethers.utils.formatEther( listPrice ) + ' ether' );

		process.stdout.write( ethers.utils.formatEther( listPrice ) + ' ether' );
	}
		
	else if ( argv[2] == 'createToken' ) {
		// ListPrice 取得
		let listPrice = await contract.getListPrice();
		const result = await contract.createToken(
			argv[3], // tokenURI
			ethers.utils.parseEther ( argv[4] ), // price
			// formatEther で 単位が ether の String にしてから、parseEther で weiにする
			{value: ethers.utils.parseEther( ethers.utils.formatEther( listPrice ) )} // listPlice
			);
		process.stdout.write( JSON.stringify(result) );

		// 引数のお手本
		// console.log( await contract.createToken(
		// 	"https://hitomebore.agritech-niigata-univ.club/?svg=0ed3ad0caefda33f042e4e2e0b86645b368d1c45b12373b43ee4e70c1ac5bd80", 
		// 	ethers.utils.parseEther ( "0.003" ),
		// 	{value: ethers.utils.parseEther( "0.0035" )}
		// 	)
		// );
	}
	
	else if ( argv[2] == 'executeSale' ) {
		let result = await contract.executeSale(
			argv[3], // tokenID
			{value: ethers.utils.parseEther( argv[4] )} // price
		);
		process.stdout.write( JSON.stringify(result) );

		// 引数のお手本
		// console.log( await contract.executeSale(
		//     0x14, {value: ethers.utils.parseEther( "0.003" )} )
		// );
	}

	else {
		process.stdout.write( `There is no command "${argv[2]}"` );
	}
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
