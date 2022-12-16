

let array = ['abcde', 'efgh', {type:'houjoi'}];

console.log( array );

var key = Object.keys( array );
console.log( key );

// var array2 = [  
//   BigNumber { _hex: '0x01', _isBigNumber: true },
//   '0x2f8F7D0AaCeB1c5fF873864e3A0478403Ed566b2',
//   '0xFE32D1D6ee9408935E0FD4Fdd0eD4896cD5378F9',
//   BigNumber { _hex: '0x04', _isBigNumber: true },
//   true,
//   tokenId: BigNumber { _hex: '0x01', _isBigNumber: true },
//   owner: '0x2f8F7D0AaCeB1c5fF873864e3A0478403Ed566b2',
//   seller: '0xFE32D1D6ee9408935E0FD4Fdd0eD4896cD5378F9',
//   price: BigNumber { _hex: '0x04', _isBigNumber: true },
//   currentlyListed: true
// ];

var array3 = [{"type":"BigNumber","hex":"0x01"},
              "0x2f8F7D0AaCeB1c5fF873864e3A0478403Ed566b2",
              "0xFE32D1D6ee9408935E0FD4Fdd0eD4896cD5378F9",
              {"type":"BigNumber","hex":"0x04"},
              true,
              
              ]

var key = Object.keys( array3 );
console.log( key );