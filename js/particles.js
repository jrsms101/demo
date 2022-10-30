function launchParticlesJS(m, q) {
  var u = document.querySelector('#' + m + ' > canvas')
  pJS = {
    canvas: { el: u, w: u.offsetWidth, h: u.offsetHeight },
    particles: {
      color: '#fff',
      shape: 'circle',
      opacity: 1,
      size: 2.5,
      size_random: true,
      nb: 200,
      line_linked: {
        enable_auto: true,
        distance: 100,
        color: '#fff',
        opacity: 1,
        width: 1,
        condensed_mode: { enable: true, rotateX: 65000, rotateY: 65000 }
      },
      anim: { enable: true, speed: 1 },
      array: []
    },
    interactivity: {
      enable: true,
      mouse: { distance: 100 },
      detect_on: 'canvas',
      mode: 'grab',
      line_linked: { opacity: 1 },
      events: { onclick: { enable: true, mode: 'push', nb: 4 } }
    },
    retina_detect: false,
    fn: { vendors: { interactivity: {} } }
  }
  if (q) {
    if (q.particles) {
      var n = q.particles
      if (n.color) {
        pJS.particles.color = n.color
      }
      if (n.shape) {
        pJS.particles.shape = n.shape
      }
      if (n.opacity) {
        pJS.particles.opacity = n.opacity
      }
      if (n.size) {
        pJS.particles.size = n.size
      }
      if (n.size_random == false) {
        pJS.particles.size_random = n.size_random
      }
      if (n.nb) {
        pJS.particles.nb = n.nb
      }
      if (n.line_linked) {
        var v = n.line_linked
        if (v.enable_auto == false) {
          pJS.particles.line_linked.enable_auto = v.enable_auto
        }
        if (v.distance) {
          pJS.particles.line_linked.distance = v.distance
        }
        if (v.color) {
          pJS.particles.line_linked.color = v.color
        }
        if (v.opacity) {
          pJS.particles.line_linked.opacity = v.opacity
        }
        if (v.width) {
          pJS.particles.line_linked.width = v.width
        }
        if (v.condensed_mode) {
          var s = v.condensed_mode
          if (s.enable == false) {
            pJS.particles.line_linked.condensed_mode.enable = s.enable
          }
          if (s.rotateX) {
            pJS.particles.line_linked.condensed_mode.rotateX = s.rotateX
          }
          if (s.rotateY) {
            pJS.particles.line_linked.condensed_mode.rotateY = s.rotateY
          }
        }
      }
      if (n.anim) {
        var w = n.anim
        if (w.enable == false) {
          pJS.particles.anim.enable = w.enable
        }
        if (w.speed) {
          pJS.particles.anim.speed = w.speed
        }
      }
    }
    if (q.interactivity) {
      var o = q.interactivity
      if (o.enable == false) {
        pJS.interactivity.enable = o.enable
      }
      if (o.mouse) {
        if (o.mouse.distance) {
          pJS.interactivity.mouse.distance = o.mouse.distance
        }
      }
      if (o.detect_on) {
        pJS.interactivity.detect_on = o.detect_on
      }
      if (o.mode) {
        pJS.interactivity.mode = o.mode
      }
      if (o.line_linked) {
        if (o.line_linked.opacity) {
          pJS.interactivity.line_linked.opacity = o.line_linked.opacity
        }
      }
      if (o.events) {
        var p = o.events
        if (p.onclick) {
          var t = p.onclick
          if (t.enable == false) {
            pJS.interactivity.events.onclick.enable = false
          }
          if (t.mode != 'push') {
            pJS.interactivity.events.onclick.mode = t.mode
          }
          if (t.nb) {
            pJS.interactivity.events.onclick.nb = t.nb
          }
        }
      }
    }
    pJS.retina_detect = q.retina_detect
  }
  pJS.particles.color_rgb = hexToRgb(pJS.particles.color)
  pJS.particles.line_linked.color_rgb_line = hexToRgb(pJS.particles.line_linked.color)
  if (pJS.retina_detect && window.devicePixelRatio > 1) {
    pJS.retina = true
    pJS.canvas.pxratio = window.devicePixelRatio
    pJS.canvas.w = pJS.canvas.el.offsetWidth * pJS.canvas.pxratio
    pJS.canvas.h = pJS.canvas.el.offsetHeight * pJS.canvas.pxratio
    pJS.particles.anim.speed = pJS.particles.anim.speed * pJS.canvas.pxratio
    pJS.particles.line_linked.distance = pJS.particles.line_linked.distance * pJS.canvas.pxratio
    pJS.particles.line_linked.width = pJS.particles.line_linked.width * pJS.canvas.pxratio
    pJS.interactivity.mouse.distance = pJS.interactivity.mouse.distance * pJS.canvas.pxratio
  }
  pJS.fn.canvasInit = function () {
    pJS.canvas.ctx = pJS.canvas.el.getContext('2d')
  }
  pJS.fn.canvasSize = function () {
    pJS.canvas.el.width = pJS.canvas.w
    pJS.canvas.el.height = pJS.canvas.h
    window.onresize = function () {
      if (pJS) {
        pJS.canvas.w = pJS.canvas.el.offsetWidth
        pJS.canvas.h = pJS.canvas.el.offsetHeight
        if (pJS.retina) {
          pJS.canvas.w *= pJS.canvas.pxratio
          pJS.canvas.h *= pJS.canvas.pxratio
        }
        pJS.canvas.el.width = pJS.canvas.w
        pJS.canvas.el.height = pJS.canvas.h
        pJS.fn.canvasPaint()
        if (!pJS.particles.anim.enable) {
          pJS.fn.particlesRemove()
          pJS.fn.canvasRemove()
          r()
        }
      }
    }
  }
  pJS.fn.canvasPaint = function () {
    pJS.canvas.ctx.fillRect(0, 0, pJS.canvas.w, pJS.canvas.h)
  }
  pJS.fn.canvasRemove = function () {
    pJS.canvas.ctx.clearRect(0, 0, pJS.canvas.w, pJS.canvas.h)
  }
  pJS.fn.particle = function (b, c, a) {
    this.x = a ? a.x : Math.random() * pJS.canvas.w
    this.y = a ? a.y : Math.random() * pJS.canvas.h
    this.radius = (pJS.particles.size_random ? Math.random() : 1) * pJS.particles.size
    if (pJS.retina) {
      this.radius *= pJS.canvas.pxratio
    }
    this.color = b
    this.opacity = c
    this.vx = -0.5 + Math.random()
    this.vy = -0.5 + Math.random()
    this.draw = function () {
      pJS.canvas.ctx.fillStyle =
        'rgba(' + this.color.r + ',' + this.color.g + ',' + this.color.b + ',' + this.opacity + ')'
      pJS.canvas.ctx.beginPath()
      switch (pJS.particles.shape) {
        case 'circle':
          pJS.canvas.ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false)
          break
        case 'edge':
          pJS.canvas.ctx.rect(this.x, this.y, this.radius * 2, this.radius * 2)
          break
        case 'triangle':
          pJS.canvas.ctx.moveTo(this.x, this.y - this.radius)
          pJS.canvas.ctx.lineTo(this.x + this.radius, this.y + this.radius)
          pJS.canvas.ctx.lineTo(this.x - this.radius, this.y + this.radius)
          pJS.canvas.ctx.closePath()
          break
      }
      pJS.canvas.ctx.fill()
    }
  }
  pJS.fn.particlesCreate = function () {
    for (var a = 0; a < pJS.particles.nb; a++) {
      pJS.particles.array.push(new pJS.fn.particle(pJS.particles.color_rgb, pJS.particles.opacity))
    }
  }
  pJS.fn.particlesAnimate = function () {
    for (var b = 0; b < pJS.particles.array.length; b++) {
      var d = pJS.particles.array[b]
      d.x += d.vx * (pJS.particles.anim.speed / 2)
      d.y += d.vy * (pJS.particles.anim.speed / 2)
      if (d.x - d.radius > pJS.canvas.w) {
        d.x = d.radius
      } else {
        if (d.x + d.radius < 0) {
          d.x = pJS.canvas.w + d.radius
        }
      }
      if (d.y - d.radius > pJS.canvas.h) {
        d.y = d.radius
      } else {
        if (d.y + d.radius < 0) {
          d.y = pJS.canvas.h + d.radius
        }
      }
      for (var a = b + 1; a < pJS.particles.array.length; a++) {
        var c = pJS.particles.array[a]
        if (pJS.particles.line_linked.enable_auto) {
          pJS.fn.vendors.distanceParticles(d, c)
        }
        if (pJS.interactivity.enable) {
          switch (pJS.interactivity.mode) {
            case 'grab':
              pJS.fn.vendors.interactivity.grabParticles(d, c)
              break
          }
        }
      }
    }
  }
  pJS.fn.particlesDraw = function () {
    pJS.canvas.ctx.clearRect(0, 0, pJS.canvas.w, pJS.canvas.h)
    pJS.fn.particlesAnimate()
    for (var a = 0; a < pJS.particles.array.length; a++) {
      var b = pJS.particles.array[a]
      b.draw('rgba(' + b.color.r + ',' + b.color.g + ',' + b.color.b + ',' + b.opacity + ')')
    }
  }
  pJS.fn.particlesRemove = function () {
    pJS.particles.array = []
  }
  pJS.fn.vendors.distanceParticles = function (h, f) {
    var c = h.x - f.x,
      b = h.y - f.y,
      g = Math.sqrt(c * c + b * b)
    if (g <= pJS.particles.line_linked.distance) {
      var a = pJS.particles.line_linked.color_rgb_line
      pJS.canvas.ctx.beginPath()
      pJS.canvas.ctx.strokeStyle =
        'rgba(' +
        a.r +
        ',' +
        a.g +
        ',' +
        a.b +
        ',' +
        (pJS.particles.line_linked.opacity - g / pJS.particles.line_linked.distance) +
        ')'
      pJS.canvas.ctx.moveTo(h.x, h.y)
      pJS.canvas.ctx.lineTo(f.x, f.y)
      pJS.canvas.ctx.lineWidth = pJS.particles.line_linked.width
      pJS.canvas.ctx.stroke()
      pJS.canvas.ctx.closePath()
      if (pJS.particles.line_linked.condensed_mode.enable) {
        var c = h.x - f.x,
          b = h.y - f.y,
          e = c / (pJS.particles.line_linked.condensed_mode.rotateX * 1000),
          d = b / (pJS.particles.line_linked.condensed_mode.rotateY * 1000)
        f.vx += e
        f.vy += d
      }
    }
  }
  pJS.fn.vendors.interactivity.listeners = function () {
    if (pJS.interactivity.detect_on == 'window') {
      var a = window
    } else {
      var a = pJS.canvas.el
    }
    a.onmousemove = function (d) {
      if (a == window) {
        var c = d.clientX,
          b = d.clientY
      } else {
        var c = d.offsetX || d.clientX,
          b = d.offsetY || d.clientY
      }
      if (pJS) {
        pJS.interactivity.mouse.pos_x = c
        pJS.interactivity.mouse.pos_y = b
        if (pJS.retina) {
          pJS.interactivity.mouse.pos_x *= pJS.canvas.pxratio
          pJS.interactivity.mouse.pos_y *= pJS.canvas.pxratio
        }
        pJS.interactivity.status = 'mousemove'
      }
    }
    a.onmouseleave = function (b) {
      if (pJS) {
        pJS.interactivity.mouse.pos_x = 0
        pJS.interactivity.mouse.pos_y = 0
        pJS.interactivity.status = 'mouseleave'
      }
    }
    if (pJS.interactivity.events.onclick.enable) {
      switch (pJS.interactivity.events.onclick.mode) {
        case 'push':
          a.onclick = function (c) {
            if (pJS) {
              for (var b = 0; b < pJS.interactivity.events.onclick.nb; b++) {
                pJS.particles.array.push(
                  new pJS.fn.particle(pJS.particles.color_rgb, pJS.particles.opacity, {
                    x: pJS.interactivity.mouse.pos_x,
                    y: pJS.interactivity.mouse.pos_y
                  })
                )
              }
            }
          }
          break
        case 'remove':
          a.onclick = function (b) {
            pJS.particles.array.splice(0, pJS.interactivity.events.onclick.nb)
          }
          break
      }
    }
  }
  pJS.fn.vendors.interactivity.grabParticles = function (f, e) {
    var i = f.x - e.x,
      g = f.y - e.y,
      d = Math.sqrt(i * i + g * g)
    var h = f.x - pJS.interactivity.mouse.pos_x,
      b = f.y - pJS.interactivity.mouse.pos_y,
      c = Math.sqrt(h * h + b * b)
    if (
      d <= pJS.particles.line_linked.distance &&
      c <= pJS.interactivity.mouse.distance &&
      pJS.interactivity.status == 'mousemove'
    ) {
      var a = pJS.particles.line_linked.color_rgb_line
      pJS.canvas.ctx.beginPath()
      pJS.canvas.ctx.strokeStyle =
        'rgba(' +
        a.r +
        ',' +
        a.g +
        ',' +
        a.b +
        ',' +
        (pJS.interactivity.line_linked.opacity - c / pJS.interactivity.mouse.distance) +
        ')'
      pJS.canvas.ctx.moveTo(f.x, f.y)
      pJS.canvas.ctx.lineTo(pJS.interactivity.mouse.pos_x, pJS.interactivity.mouse.pos_y)
      pJS.canvas.ctx.lineWidth = pJS.particles.line_linked.width
      pJS.canvas.ctx.stroke()
      pJS.canvas.ctx.closePath()
    }
  }
  pJS.fn.vendors.destroy = function () {
    cancelAnimationFrame(pJS.fn.requestAnimFrame)
    u.remove()
    delete pJS
  }
  function r() {
    pJS.fn.canvasInit()
    pJS.fn.canvasSize()
    pJS.fn.canvasPaint()
    pJS.fn.particlesCreate()
    pJS.fn.particlesDraw()
  }
  function x() {
    pJS.fn.particlesDraw()
    pJS.fn.requestAnimFrame = requestAnimFrame(x)
  }
  r()
  if (pJS.particles.anim.enable) {
    x()
  }
  if (pJS.interactivity.enable) {
    pJS.fn.vendors.interactivity.listeners()
  }
}

window.requestAnimFrame = (function () {
  return (
    window.requestAnimationFrame ||
    window.webkitRequestAnimationFrame ||
    window.mozRequestAnimationFrame ||
    window.oRequestAnimationFrame ||
    window.msRequestAnimationFrame ||
    function (b) {
      window.setTimeout(b, 1000 / 60)
    }
  )
})()
window.cancelRequestAnimFrame = (function () {
  return (
    window.cancelAnimationFrame ||
    window.webkitCancelRequestAnimationFrame ||
    window.mozCancelRequestAnimationFrame ||
    window.oCancelRequestAnimationFrame ||
    window.msCancelRequestAnimationFrame ||
    clearTimeout
  )
})()
function hexToRgb(f) {
  var e = /^#?([a-f\d])([a-f\d])([a-f\d])$/i
  f = f.replace(e, function (b, g, c, a) {
    return g + g + c + c + a + a
  })
  var d = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(f)
  return d ? { r: parseInt(d[1], 16), g: parseInt(d[2], 16), b: parseInt(d[3], 16) } : null
}
window.particlesJS = function (h, g) {
  if (typeof h != 'string') {
    g = h
    h = 'particles-js'
  }
  if (!h) {
    h = 'particles-js'
  }
  var f = document.createElement('canvas')
  f.style.width = '100%'
  f.style.height = '100%'
  var e = document.getElementById(h).appendChild(f)
  if (e != null) {
    launchParticlesJS(h, g)
  }
}
particlesJS('particles-js', {
  particles: {
    color: '#fff',
    shape: 'circle',
    opacity: 1,
    size: 4,
    size_random: true,
    nb: 150,
    line_linked: {
      enable_auto: true,
      distance: 100,
      color: '#fff',
      opacity: 1,
      width: 1,
      condensed_mode: { enable: false, rotateX: 600, rotateY: 600 }
    },
    anim: { enable: true, speed: 1 }
  },
  interactivity: {
    enable: true,
    mouse: { distance: 250 },
    detect_on: 'canvas',
    mode: 'grab',
    line_linked: { opacity: 0.5 },
    events: { onclick: { enable: true, mode: 'push', nb: 4 } }
  },
  retina_detect: true
})
