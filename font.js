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
    // 获取base64 font
    let priceHtml = ''
    let base64Html = ''
    try{
      const $ = cheerio.load(body).root()
      priceHtml = $.find('.price').html().split('<b>')[0]
      // console.log(priceHtml)
      base64Html = $.find('script').eq(0).html()
      base64Html = base64Html.split('data:application/font-ttf;charset=utf-8;base64,')[1].split(`') format('truetype')`)[0]
      // console.log(base64Html)
    }catch(e){
      resolve([e])
    }

    // base64 转 Buffer
    let buf = null
    try{
      buf = Buffer.from(base64Html, 'base64')
    }catch(e){
      resolve([e])
    }

    // 字体转svg
    let svgContent = ''
    try{
      svgContent = ttf2svg(buf);
      // console.log(svgContent)
    }catch(e){
      resolve([e])
    }
    

    // svg转 jq dom
    // 转换0-9 解密映射关系 fontMap
    let fontMap = {}
    try{
      const $ = cheerio.load(svgContent)
      let els = $.root().find('[glyph-name]')
      fontMap = new Array(10).fill(0).reduce((pre,cur,index)=>{
        let unicode = els.eq(index+1).attr('glyph-name').replace('uni','&#x')
        pre[unicode] = index
        return pre
      },{})
      // console.log(fontMap)
    }catch(e){
      resolve([e])
    }
    

    // 根据映射 替换字符串 解密价格
    try{
      let dePriceHtml = priceHtml.replace(/(\&\#x[0-9a-z][0-9a-z][0-9a-z][0-9a-z])\;/ig,function(){
        // console.log(arguments)
        return fontMap[arguments[1]]
      })
      // console.log(dePriceHtml)
      resolve([null,dePriceHtml])
    }catch(e){
      resolve([e])
    }
  })
})


module.exports = getPriceFont

