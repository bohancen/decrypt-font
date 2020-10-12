const getPriceFont = require('./font')

;(async function(){

  let [err,price] = await getPriceFont(`https://dazhou.58.com/ershoufang/43683518377636x.shtml?utm_source=&spm=&cityListName=dazhou&curListName=dazhou&lg=https%3A%2F%2Flegoclick.58.com%2Fjump%3Ftarget%3DszqbmgGCULN8PH98mvqVsvRz0v6fIyu6Uh0fPjnvrjndnH91P10vn1u3sMPCIAd_TyEVm1DdrjRhPAmVmWmkPiYYPywBsHbLPymVPWFhnAFWPhnvrAw-THcYPHELnjmQPHn1PjELTEDQPWmOPjE3PWm3nWEQrHnkTHTKnHTkTHD_nHnKrH0OrEDQPWTzPj0zPW93PW0kTHNOTyQG0LEV0A7zmydLuy-MpZEV0AnKnEDQTEDVnEDKnHnQPHD3rj0vPWNYnj91nW0vrTDvTEDQTHE1P1NYnyE3syFhrAnVPAEzmiY3ujb1sHRBrHu6m1EknWK6nTDQn1DdnH93P1mvP1cdn19vnWEQTHD1nHNQrj9LPWmvP1NkPHEdrHcKTEDKTEDVTEDKpZwY0ZnlszqbmgGCULN8PH98mvqVsvRz0v6fIyu6Uh0fTyndsvOhwBVKwj-gID6i21Ka07ndEy0q5ED1PB3QnHc8Pz3znTDkTHTKTHD_nHnKXLYKnHTkTHDknjTzPH9KrHTzrADdPAcVrjP6riYYmvndsyD1nWDVm1mzPhEznjuhnjFbTEDkTEDKnTDOP1bOsjb3njn_nWDdn1DKnE78IyQ_THD3rHbLuH0dn1D3P1mLn1n&referinfo=FALSE&typecode=203&from=1-list-119&iuType=z_1&PGTID=0d30000c-0264-7bb2-2d03-7528f8516e3f&ClickID=3`)
  if(err){return console.log(err)}
  console.log('价格:' + price)
  
})();