const getPriceFont = require('./font')

;(async function(){

  let [err,price] = await getPriceFont(`https://dazhou.58.com/ershoufang/43683518377636x.shtml`)
  if(err){return console.log(err)}
  console.log('价格:' + price)
  
})();