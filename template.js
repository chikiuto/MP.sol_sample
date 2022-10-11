"use strict";

const path = require( "path" );
require('dotenv').config();

const fs = require( "fs" );
var MP_ABI = require('./MPabi.js');

const BigNumber = require( "bignumber.js" );



// 参考【 https://docs.alchemy.com/docs/alchemy-quickstart-guide 】
const { Network, Alchemy } = require("alchemy-sdk");

// 参考【 https://docs.ethers.io/v5/getting-started/ 】
const { ethers } = require("ethers"); // 追記

function main( argc, argv )
{
	console.log(argc);
	console.log(argv);

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
	// const provider = new ethers.providers.JsonRpcProvider(url);
	

	const apiKey = "O2_6ZL9WCZTXWkBQNVvIOJKdsf-OgFcv";
	const provider = new ethers.providers.AlchemyProvider( "goerli", apiKey);
	
	// The provider also allows signing transactions to
	// send ether and pay to change state within the blockchain.
	// For this, we need the account signer...
	const wallet = new ethers.Wallet( process.env.PRIVATE_KEY, provider );

	
	const contract = new ethers.Contract(ContractAddress, Abi, wallet);

	// let listPrice = await contract.updateListPrice( ethers.utils.parseEther( "0.0035" ) );
	// await console.log( listPrice  );
	// await console.log( contract.getListPrice() );

	// await console.log(listPrice.toString());
	//formatEtherはStringで返す
	// await console.log( ethers.utils.formatEther( listPrice ) );
	console.log('- - - - - - - - - - - - - - - - - - - - - - - - - - - -');
	
	// console.log( await contract.createToken(
	// 		"https://hitomebore.agritech-niigata-univ.club/?svg=0ed3ad0caefda33f042e4e2e0b86645b368d1c45b12373b43ee4e70c1ac5bd80", 
	// 		ethers.utils.parseEther ( "0.003" ),
	// 		{value: ethers.utils.parseEther( "0.0035" )}
	// 		)
	// 	);
	
	console.log('- - - - - - - - - - - - - - - - - - - - - - - - - - - -');

	// let AllNFTs = await contract.getAllNFTs();
	// console.log(AllNFTs);

	console.log('- - - - - - - - - - - - - - - - - - - - - - - - - - - -');
	
	// let myNFTs = await contract.getMyNFTs();
	// console.log(myNFTs);
	
	console.log('- - - - - - - - - - - - - - - - - - - - - - - - - - - -');

	// let a = new BigNumber( 0x02 )

	// console.log( await contract.executeSale( 0x13, {value: ethers.utils.parseEther( "0.003" )} ));
	// console.log( await contract.executeSale( 0x12, {value: 2000000000000000	} ));


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
