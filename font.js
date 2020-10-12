const ttf2svg = require('ttf2svg')
const request = require('request')
const cheerio = require('cheerio');

// 获取加密价格 + 加密font-base64
const getPriceFont=url=>new Promise(resolve=>{
  request({
    url
  },(err,res,body)=>{
    if(err){
      resolve([err])
      return
    }
    
    // 转成 jq dom 获取加密价格
    const $ = cheerio.load(body).root()
    let priceHtml = $.find('.price').html().split('<b>')[0]
    // console.log(priceHtml)

    // 获取base64 font
    let base64Html = $.find('script').eq(0).html()
    base64Html = base64Html.split('data:application/font-ttf;charset=utf-8;base64,')[1].split(`') format('truetype')`)[0]
    // console.log(base64Html)

    // base64 转 Buffer
    let buf = Buffer.from(base64Html, 'base64')

    // 字体转svg
    var svgContent = ttf2svg(buf);
    // console.log(svgContent)

    // svg转 jq dom
    const $$ = cheerio.load(svgContent)
    let els = $$.root().find('[glyph-name]')

    // 转换0-9 解密映射关系
    let fontMap = new Array(10).fill(0).reduce((pre,cur,index)=>{
      let unicode = els.eq(index+1).attr('glyph-name').replace('uni','&#x')
      pre[unicode] = index
      return pre
    },{})
    // console.log(fontMap)

    // 根据映射 替换字符串 解密价格
    let dePriceHtml = priceHtml.replace(/(\&\#x[0-9a-z][0-9a-z][0-9a-z][0-9a-z])\;/ig,function(){
      // console.log(arguments)
      return fontMap[arguments[1]]
    })
    // console.log(dePriceHtml)
    resolve([null,dePriceHtml])
  })
})


module.exports = getPriceFont

// ;(async function(){

//   let [err,price] = await getPriceFont(`https://dazhou.58.com/ershoufang/43683518377636x.shtml?utm_source=&spm=&cityListName=dazhou&curListName=dazhou&lg=https%3A%2F%2Flegoclick.58.com%2Fjump%3Ftarget%3DszqbmgGCULN8PH98mvqVsvRz0v6fIyu6Uh0fPjnvrjndnH91P10vn1u3sMPCIAd_TyEVm1DdrjRhPAmVmWmkPiYYPywBsHbLPymVPWFhnAFWPhnvrAw-THcYPHELnjmQPHn1PjELTEDQPWmOPjE3PWm3nWEQrHnkTHTKnHTkTHD_nHnKrH0OrEDQPWTzPj0zPW93PW0kTHNOTyQG0LEV0A7zmydLuy-MpZEV0AnKnEDQTEDVnEDKnHnQPHD3rj0vPWNYnj91nW0vrTDvTEDQTHE1P1NYnyE3syFhrAnVPAEzmiY3ujb1sHRBrHu6m1EknWK6nTDQn1DdnH93P1mvP1cdn19vnWEQTHD1nHNQrj9LPWmvP1NkPHEdrHcKTEDKTEDVTEDKpZwY0ZnlszqbmgGCULN8PH98mvqVsvRz0v6fIyu6Uh0fTyndsvOhwBVKwj-gID6i21Ka07ndEy0q5ED1PB3QnHc8Pz3znTDkTHTKTHD_nHnKXLYKnHTkTHDknjTzPH9KrHTzrADdPAcVrjP6riYYmvndsyD1nWDVm1mzPhEznjuhnjFbTEDkTEDKnTDOP1bOsjb3njn_nWDdn1DKnE78IyQ_THD3rHbLuH0dn1D3P1mLn1n&referinfo=FALSE&typecode=203&from=1-list-119&iuType=z_1&PGTID=0d30000c-0264-7bb2-2d03-7528f8516e3f&ClickID=3`)
//   if(err){return console.log(err)}
//   console.log(price)
  
// })();
