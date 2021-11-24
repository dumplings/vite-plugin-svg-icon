const fs = require('fs')
const path = require('path')
const svgo = require('svgo')
const xml2js = require('xml2js')

const parser = new xml2js.Parser()
const builder = new xml2js.Builder({ headless: true })

/**
 * extract the content from svg, and translate to string which wrapped by symbol tag.
 * @param {string} rootPath - root directory of svg files
 * @param {string} filename - svg file name
 * @param {string=} prefix - prefix of svg id, default is `d-icon`
 * @returns {Promise<string>}
 */
const translateSvg2Symbol = async (rootPath, filename, prefix = 'd-icon') => {
  const filepath = path.join(rootPath, filename)
  const rawData = fs.readFileSync(filepath).toString()
  const clearData = svgo.optimize(rawData, { multipass: true }).data
  const xmlData = await parser.parseStringPromise(clearData)
  const keys = Object.keys(xmlData.svg).filter(key => key !== '$')
  const symbol = {
    $: {
      id: `${prefix}-${filename.replace(path.extname(filename), '')}`,
      viewBox: xmlData.svg.$.viewBox
    }
  }
  for (const key of keys) {
    symbol[key] = xmlData.svg[key]
  }
  return builder.buildObject({ symbol })
}

/**
 * @param {string} rootPath - root directory of svg files
 * @param {string=} prefix - prefix of svg id, default is `d-icon`
 */
const main = (rootPath, prefix) => ({
  name: 'vite-plugin-svg-icon',
  async transformIndexHtml (html) {
    let svgText = '<svg xmlns="http://www.w3.org/2000/svg" id="__YS_ICONS__" style="display:none">'
    const files = fs.readdirSync(rootPath)
    for (const file of files) {
      svgText += await translateSvg2Symbol(rootPath, file, prefix)
    }
    svgText += '</svg>'
    // 默认body上无任何属性
    const startTag = html.match(/<body[^>]*>/)?.[0] || '<body>'
    return html.replace(startTag, `${startTag}${svgText}`)
  }
})

export default main
