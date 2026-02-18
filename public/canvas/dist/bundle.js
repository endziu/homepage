/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 5);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports) {

const drawCircle = (ctx, r, p, color) => {
  ctx.fillStyle = color || 'rgba(255,255,255,0.5)'
  ctx.beginPath()
  ctx.arc(p.position.getX(), p.position.getY(), r, 0, Math.PI * 2, false)
  ctx.fill()
}

const drawLine = (context, p1, p2, line_width) => {
  context.lineWidth = line_width
  context.beginPath()
  context.moveTo(p1.position.getX(), p1.position.getY())
  context.lineTo(p2.position.getX(), p2.position.getY())
  context.strokeStyle = 'rgba(255,255,255,0.25)'
  context.stroke()
}

const wrapBounds = (p, width, height) => {
  if (p.position.getX() < 0) p.position.setX(width)
  if (p.position.getX() > width) p.position.setX(0)
  if (p.position.getY() < 0) p.position.setY(height)
  if (p.position.getY() > height) p.position.setY(0)
}

module.exports = {
  drawCircle,
  drawLine,
  wrapBounds
}

/***/ }),
/* 1 */
/***/ (function(module, exports) {

module.exports = {
  norm: function (value, min, max) {
    return (value - min) / (max - min)
  },

  lerp: function (norm, min, max) {
    return (max - min) * norm + min
  },

  map: function (value, sourceMin, sourceMax, destMin, destMax) {
    return utils.lerp(utils.norm(value, sourceMin, sourceMax), destMin, destMax)
  },

  clamp: function (value, min, max) {
    return Math.min(Math.max(value, Math.min(min, max)), Math.max(min, max))
  },

  distance: function (p0, p1) {
    var dx = p1.x - p0.x,
      dy = p1.y - p0.y
    return Math.sqrt(dx * dx + dy * dy)
  },

  distanceXY: function (x0, y0, x1, y1) {
    var dx = x1 - x0,
      dy = y1 - y0
    return Math.sqrt(dx * dx + dy * dy)
  },

  circleCollision: function (c0, c1) {
    return utils.distance(c0, c1) <= c0.radius + c1.radius
  },

  circlePointCollision: function (x, y, circle) {
    return utils.distanceXY(x, y, circle.x, circle.y) < circle.radius
  },

  pointInRect: function (x, y, rect) {
    return utils.inRange(x, rect.x, rect.x + rect.width) &&
		       utils.inRange(y, rect.y, rect.y + rect.height)
  },

  inRange: function (value, min, max) {
    return value >= Math.min(min, max) && value <= Math.max(min, max)
  },

  rangeIntersect: function (min0, max0, min1, max1) {
    return Math.max(min0, max0) >= Math.min(min1, max1) &&
			   Math.min(min0, max0) <= Math.max(min1, max1)
  },

  rectIntersect: function (r0, r1) {
    return utils.rangeIntersect(r0.x, r0.x + r0.width, r1.x, r1.x + r1.width) &&
			   utils.rangeIntersect(r0.y, r0.y + r0.height, r1.y, r1.y + r1.height)
  },

  degreesToRads: function (degrees) {
    return degrees / 180 * Math.PI
  },

  radsToDegrees: function (radians) {
    return radians * 180 / Math.PI
  },

  randomRange: function (min, max) {
    return min + Math.random() * (max - min)
  },

  randomInt: function (min, max) {
    return Math.floor(min + Math.random() * (max - min + 1))
  },

  roundToPlaces: function (value, places) {
    var mult = Math.pow(10, places)
    return Math.round(value * mult) / mult
  },

  roundNearest: function (value, nearest) {
    return Math.round(value / nearest) * nearest
  },

  quadraticBezier: function (p0, p1, p2, t, pFinal) {
    pFinal = pFinal || {}
    pFinal.x = Math.pow(1 - t, 2) * p0.x +
				   (1 - t) * 2 * t * p1.x +
				   t * t * p2.x
    pFinal.y = Math.pow(1 - t, 2) * p0.y +
				   (1 - t) * 2 * t * p1.y +
				   t * t * p2.y
    return pFinal
  },

  cubicBezier: function (p0, p1, p2, p3, t, pFinal) {
    pFinal = pFinal || {}
    pFinal.x = Math.pow(1 - t, 3) * p0.x +
				   Math.pow(1 - t, 2) * 3 * t * p1.x +
				   (1 - t) * 3 * t * t * p2.x +
				   t * t * t * p3.x
    pFinal.y = Math.pow(1 - t, 3) * p0.y +
				   Math.pow(1 - t, 2) * 3 * t * p1.y +
				   (1 - t) * 3 * t * t * p2.y +
				   t * t * t * p3.y
    return pFinal
  },

  multicurve: function (points, context) {
    var p0, p1, midx, midy

    context.moveTo(points[0].x, points[0].y)

    for (var i = 1; i < points.length - 2; i += 1) {
      p0 = points[i]
      p1 = points[i + 1]
      midx = (p0.x + p1.x) / 2
      midy = (p0.y + p1.y) / 2
      context.quadraticCurveTo(p0.x, p0.y, midx, midy)
    }
    p0 = points[points.length - 2]
    p1 = points[points.length - 1]
    context.quadraticCurveTo(p0.x, p0.y, p1.x, p1.y)
  }

}


/***/ }),
/* 2 */
/***/ (function(module, exports) {

module.exports = {
  _x: 1,
  _y: 0,

  create: function (x, y) {
    var obj = Object.create(this)
    obj.setX(x)
    obj.setY(y)
    return obj
  },

  setX: function (value) {
    this._x = value
  },

  getX: function () {
    return this._x
  },

  setY: function (value) {
    this._y = value
  },

  getY: function () {
    return this._y
  },

  setAngle: function (angle) {
    var length = this.getLength()
    this._x = Math.cos(angle) * length
    this._y = Math.sin(angle) * length
  },

  getAngle: function () {
    return Math.atan2(this._y, this._x)
  },

  setLength: function (length) {
    var angle = this.getAngle()
    this._x = Math.cos(angle) * length
    this._y = Math.sin(angle) * length
  },

  getLength: function () {
    return Math.sqrt(this._x * this._x + this._y * this._y)
  },

  add: function (v2) {
    return vector.create(this._x + v2.getX(), this._y + v2.getY())
  },

  subtract: function (v2) {
    return vector.create(this._x - v2.getX(), this._y - v2.getY())
  },

  multiply: function (val) {
    return vector.create(this._x * val, this._y * val)
  },

  divide: function (val) {
    return vector.create(this._x / val, this._y / val)
  },

  addTo: function (v2) {
    this._x += v2.getX()
    this._y += v2.getY()
  },

  subtractFrom: function (v2) {
    this._x -= v2.getX()
    this._y -= v2.getY()
  },

  multiplyBy: function (val) {
    this._x *= val
    this._y *= val
  },

  divideBy: function (val) {
    this._x /= val
    this._y /= val
  }
}


/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

const utils = __webpack_require__(1)
const vector = __webpack_require__(2)
const { wrapBounds } = __webpack_require__(0)

module.exports = {
  position: vector.create(0,0),
  velolcity: vector.create(0,0),
  friction: 1,
  mass: null,
  gravitations: null,

  create: function (x, y, speed, direction, grav) {
    var obj = Object.create(this)
		obj.position = vector.create(x, y)
		obj.velocity = vector.create(0, 0)
		obj.velocity.setLength(speed)
		obj.velocity.setAngle(direction)
    obj.gravitations = []
    return obj
  },

  distanceTo: function (p2) {
		var dx = p2.position.getX() - this.position.getX(),
			  dy = p2.position.getY() - this.position.getY()
    return Math.sqrt(dx * dx + dy * dy)
  },

  gravitateTo: function (p2) {
    var dx = p2.position.getX() - this.position.getX(),
      dy = p2.position.getY() - this.position.getY(),
      distSQ = dx * dx + dy * dy,
      dist = utils.clamp(Math.sqrt(distSQ), 50, 250),
      force = p2.mass / distSQ,
      ax = dx / dist * force,
      ay = dy / dist * force,
      acc = vector.create(ax,ay)

    this.velocity.addTo(acc)
  },

  addGravitation: function (p) {
    this.removeGravitation(p)
    this.gravitations.push(p)
  },

  removeGravitation: function (p) {
    for (var i = 0; i < this.gravitations.length; i += 1) {
      if (p === this.gravitations[i]) {
        this.gravitations.splice(i, 1)
        return
      }
    }
  },

  handleGravitations: function () {
    for (var i = 0; i < this.gravitations.length; i += 1) {
      this.gravitateTo(this.gravitations[i])
    }
  },

  update: function () {
    this.handleGravitations()
		this.velocity.multiplyBy(this.friction)
		this.position.addTo(this.velocity)
  }
}


/***/ }),
/* 4 */
/***/ (function(module, exports) {

module.exports = function () {
  var lastTime = 0
  var vendors = ['ms', 'moz', 'webkit', 'o']
  for (var x = 0; x < vendors.length && !window.requestAnimationFrame; ++x) {
    window.requestAnimationFrame = window[vendors[x] + 'RequestAnimationFrame']
    window.cancelAnimationFrame = window[vendors[x] + 'CancelAnimationFrame'] || window[vendors[x] + 'CancelRequestAnimationFrame']
  }
  if (!window.requestAnimationFrame) {
    window.requestAnimationFrame = function (callback, element) {
      var currTime = new Date().getTime()
      var timeToCall = Math.max(0, 16 - (currTime - lastTime))
      var id = window.setTimeout(function () { callback(currTime + timeToCall) }, timeToCall)
      lastTime = currTime + timeToCall
      return id
    }
  }
  if (!window.cancelAnimationFrame) {
    window.cancelAnimationFrame = function (id) {
      clearTimeout(id)
    }
  }
}


/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

const raf = __webpack_require__(4)()
const particle = __webpack_require__(3)
const vector = __webpack_require__(2)
const utils = __webpack_require__(1)
const { drawCircle, drawLine, wrapBounds } = __webpack_require__(0)

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


/***/ })
/******/ ]);