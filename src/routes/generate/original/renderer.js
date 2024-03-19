var fs = require('fs')
import { isAbsolute, resolve } from 'path'
import {pump} from 'pump'
import { stderr as log } from 'single-line-log'

import exportMap from './map_mosaic_stream.js'

var argv = { _: [],
  w: '12in',
  width: '12in',
  h: '15in',
  height: '15in',
  d: 288,
  dpi: 288,
  b:
   '-74.20684568826417,40.528628319424,-73.70390910359002,41.004764240546365',
  bbox:
   '-74.20684568826417,40.528628319424,-73.70390910359002,41.004764240546365',
  t:
   'pk.eyJ1IjoicGFuendhcnp5d25pYWthIiwiYSI6ImNsdGcydzFtdTB4aDgyaXJ0cDBmZTl6aHMifQ.j3j7zHRSuFDj2maiwwvgVA',
  token:
   'pk.eyJ1IjoicGFuendhcnp5d25pYWthIiwiYSI6ImNsdGcydzFtdTB4aDgyaXJ0cDBmZTl6aHMifQ.j3j7zHRSuFDj2maiwwvgVA',
  o: 'renders/lewis_12x15.png',
  output: 'renders/lewis_12x15.png',
  debug: true }
// var style = argv._[0]
var style = "mapbox://styles/panzwarzywniaka/cltuc2ilu008901qwh0qvh2vc"
// var style = JSON.parse(fs.readFileSync('styles/default_no_labels.json', 'utf8'));

var format = {}
var width = 40
var last = 0

// var writeStream = argv.output ? fs.createWriteStream(abs(argv.output)) : process.stdout
var writeStream = process.stdout

var mapDiv = document.createElement('div')
document.body.appendChild(mapDiv)

var mapStream = exportMap(style, mapDiv, argv)
  .on('progress', function (percent, total) {
    if ((percent - last) * width < 1) return
    var completeStr = Array(Math.floor(percent * width)).join('=')
    var incompleteStr = Array(Math.ceil((1 - percent) * width)).join(' ')
    var str = 'exporting [' + completeStr + '>' + incompleteStr + '] ' + Math.round(percent * 100) + '%'
    last = percent
    log(str)
  })
  .on('format', function (f) {
    format = f
  })
pump(mapStream, writeStream, done)

function done (err) {
  log.clear()
  log('')
  if (err) {
    process.stderr.write(err.stack + '\n', () => process.exit(1))
  }
  if (argv.output) {
    console.error('Saved %dpx x %dpx map to %s', format.width, format.height, argv.output)
  }
  window.close()
}

function abs (file) {
  return isAbsolute(file)
    ? file
    : resolve(process.cwd(), file)
}
