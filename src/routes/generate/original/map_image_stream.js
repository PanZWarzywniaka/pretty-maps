var createFBO = require('gl-fbo')
var createGlPixelStream = require('gl-pixel-stream')
var pumpify = require('pumpify')
var bboxPolygon = require('@turf/bbox-polygon').default
var calcViewport = require('./viewport')
var limit = require('./limit_stream')

// module.exports = mapImageStream

const tileBboxLayer = {
  'id': 'tile-bbox',
  'type': 'line',
  'source': 'bbox',
  'filter': ['==', '$id', 0],
  'layout': {
    'line-join': 'miter'
  },
  'paint': {
    'line-color': 'rgb(255, 255, 0)',
    'line-width': 4
  }
}

const origBboxLayer = {
  'id': 'orig-bbox',
  'type': 'line',
  'source': 'bbox',
  'filter': ['==', '$id', 1],
  'layout': {
    'line-join': 'miter'
  },
  'paint': {
    'line-color': 'rgb(255, 0, 0)',
    'line-opacity': 0.8,
    'line-width': 8,
    'line-dasharray': [1.5, 1.5]
  }
}

/**
 * Returns a stream of raw image data from a specific map area
 * @param {mapboxgl.Map} map  A mapbox-gl-js map instance (already rendered to the DOM)
 * @param {Array(2)} dim  Dimensions of the map in display pixels `[x, y]`
 * @param {Array(4)} bbox Bbox of area to include in the map in decimal degrees `[W, S, E, N]`
 * @return {ReadableStream} ReadableStream of raw pixel data from the rendered map
 */
export function mapImageStream (map, dim, bbox, origBbox, debug) {
  if (debug) {
    const geojson = {
      type: 'FeatureCollection',
      features: [
        bboxPolygon(bbox, { id: 0 }),
        bboxPolygon(origBbox, { id: 1 })
      ]
    }
    try {
      map.addSource('bbox', { type: 'geojson', data: geojson })
    } catch (e) {
      map.getSource('bbox').setData(geojson)
    }

    if (!map.getLayer('orig-bbox')) {
      map.addLayer(origBboxLayer).addLayer(tileBboxLayer)
    }
  }

  if (map.__mmie_processing) throw Error('map instance is currently processing')
  map.__mmie_processing = true
  var inprogress = false
  var gl = map.painter.context.gl
  // Dimensions in absolute pixels (vs. display pixels)
  var pixelDim = dim.map(function (d) { return d * window.devicePixelRatio })

  if (sizeTooBig(gl, pixelDim)) throw Error('map size is too big')

  var stream = pumpify()

  var mapDiv = map.getContainer()
  mapDiv.style.width = dim[0] + 'px'
  mapDiv.style.height = dim[1] + 'px'
  map.resize()._update()
  var viewport = calcViewport.fitDim(map, dim, bbox)
  var fbo = createFBO(gl, pixelDim, { stencil: true })
  fbo.bind()

  map.once('moveend', function () {
    onMapRenderComplete(map, streamCanvas)
  })

  map.jumpTo({
    center: viewport.center,
    zoom: viewport.zoom,
    bearing: 0,
    pitch: 0
  })

  return stream

  function onMapRenderComplete (map, fn) {
    process.nextTick(() => {
      if (inprogress) return
      if (map.areTilesLoaded() && map.isStyleLoaded() && map.loaded()) {
        var timeout = setTimeout(fn, 2000)
        map.once('render', () => {
          clearTimeout(timeout)
          onMapRenderComplete(map, fn)
        })
      } else {
        map.once('render', () => onMapRenderComplete(map, fn))
      }
    })
  }

  function streamCanvas () {
    if (!inprogress) inprogress = true
    var glStream = createGlPixelStream(gl, fbo.handle, fbo.shape, { flipY: true })
    glStream.on('end', () => {
      gl.bindFramebuffer(gl.FRAMEBUFFER, null)
      inprogress = false
      map.__mmie_processing = false
      fbo.dispose()
      map.remove()
    })
    var format = stream.format = { width: pixelDim[0], height: pixelDim[1], colorSpace: 'rgba' }
    stream.emit('format', format)
    stream.setPipeline(glStream, limit(format))
  }
}

function sizeTooBig (gl, dim) {
  var maxDim = gl.getParameter(gl.MAX_RENDERBUFFER_SIZE) / 2
  return dim.filter(function (d) { return d > maxDim }).length
}
