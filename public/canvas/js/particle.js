const utils = require('./utils')
const vector = require('./vector')
const { wrapBounds } = require('./helpers')

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
