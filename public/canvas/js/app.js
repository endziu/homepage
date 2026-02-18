const raf = require('./raf')()
const particle = require('./particle')
const vector = require('./vector')
const utils = require('./utils')
const { drawCircle, drawLine, wrapBounds } = require('./helpers')

const canvas = document.getElementById('canvas')
const context = canvas.getContext('2d')

let width = canvas.width = window.innerWidth
let height = canvas.height = window.innerHeight

let numParticles = utils.clamp(parseInt(width / 10 ,10),25, 200)
let maxDist = utils.clamp(parseInt(width / 8, 10),50, 200)

let particles = []

const init = () => {
  window.addEventListener('resize', windowResizeHandler, false)
  window.addEventListener('mousedown', mouseDownHandler, false)
  if (canvas && canvas.getContext) {
    context.globalCompositeOperation = 'destination-over'  
    canvas.oncontextmenu = function (e) {
      e.preventDefault()
    }
    createParticles(numParticles)
    update()
  }
}

const update = () => {
  context.clearRect(0, 0, width, height)
  particles.map(updateAndDraw)
  window.requestAnimationFrame(update)
}

const updateAndDraw = (current_particle, index, arr) => {
  wrapBounds(current_particle, width, height)
  current_particle.update()

  if(!current_particle.mass) {
    drawCircle(context, utils.clamp(parseInt(width / 200),2,15), current_particle)
    particles.forEach((item, i, arr) => {
      if (i > index - 1 && i < arr.length && current_particle.distanceTo(item) < maxDist) {
        const line_width = 5 - (current_particle.distanceTo(item) / maxDist) * 5
        drawLine(context, current_particle, item, line_width)
      }
    })
  } else {
    drawCircle(context, utils.clamp(parseInt(width / 250),2,10), current_particle, 'rgba(255,0,0,1.0)')
  }
  
}

const createParticles = (numParticles) => {
  particles = []
  for (var i = 0; i < numParticles; i++) {
    var p = particle.create(
			utils.randomRange(50, width - 50),
			utils.randomRange(50, height - 50),
			utils.randomRange(0.5, 2.0),
			utils.randomRange(0, 2 * Math.PI)
		)
    p.friction = 0.999
    particles.push(p)
  }
}

const windowResizeHandler = () => {
  width = canvas.width = window.innerWidth
  height = canvas.height = window.innerHeight
  numParticles = utils.clamp(parseInt(width / 10 ,10), 25, 200)
  maxDist = utils.clamp(parseInt(width / 8, 10), 50, 200)
  createParticles(numParticles)
}

function mouseDownHandler (event) {

  var x = event.clientX - canvas.offsetLeft
  var y = event.clientY - canvas.offsetTop
  if (event.button == 0) {
    var m = particle.create(x, y, 0, 0)
    m.mass = 120
    for (var i = 0; i < numParticles; i++) {
      particles[i].addGravitation(m)
    }
    particles.push(m)
  }
  if (event.button == 2) {

  }
}

init()
