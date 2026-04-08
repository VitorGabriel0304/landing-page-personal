/* ==============================================
   WHATSAPP
============================================== */
function whatsapp(msg) {
  window.open(`https://wa.me/5514999999999?text=${encodeURIComponent(msg)}`)
}

/* ==============================================
   SCROLL
============================================== */
function scrollToSection(id) {
  document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
}

/* ==============================================
   HEADER SCROLL
============================================== */
const header = document.getElementById('header')
window.addEventListener('scroll', () => {
  header.classList.toggle('scrolled', window.scrollY > 50)
}, { passive: true })

/* ==============================================
   HAMBURGER MENU
============================================== */
const hamburger  = document.getElementById('hamburger')
const nav        = document.getElementById('nav')
const navOverlay = document.getElementById('navOverlay')

function toggleMenu() {
  const isOpen = nav.classList.toggle('open')
  hamburger.classList.toggle('open', isOpen)
  navOverlay.classList.toggle('active', isOpen)
  document.body.style.overflow = isOpen ? 'hidden' : ''
}

function closeMenu() {
  nav.classList.remove('open')
  hamburger.classList.remove('open')
  navOverlay.classList.remove('active')
  document.body.style.overflow = ''
}

/* ==============================================
   SCROLL REVEAL
============================================== */
const revealEls = document.querySelectorAll('[data-reveal]')

function checkReveal() {
  const vh = window.innerHeight
  revealEls.forEach(el => {
    if (el.getBoundingClientRect().top < vh - 60) {
      el.classList.add('visible')
    }
  })
}

window.addEventListener('scroll', checkReveal, { passive: true })
checkReveal()

/* ==============================================
   FAQ ACCORDION
============================================== */
function toggleFaq(el) {
  const isOpen = el.classList.contains('open')
  document.querySelectorAll('.faq-item.open').forEach(i => i.classList.remove('open'))
  if (!isOpen) el.classList.add('open')
}

/* ==============================================
   CANVAS — FUNDO GEOMÉTRICO PROFISSIONAL
   (grid diagonal animado + linhas diagonais suaves)
============================================== */
const canvas = document.getElementById('bgCanvas')
const ctx    = canvas.getContext('2d')

let W, H, lines, dots

function resize() {
  W = canvas.width  = window.innerWidth
  H = canvas.height = window.innerHeight
  buildScene()
}

/* Cor dourada com opacidade */
function gold(a) { return `rgba(201,169,110,${a})` }
function white(a) { return `rgba(245,242,238,${a})` }

/* ---- CONSTRUÇÃO DAS LINHAS ---- */
function buildScene() {
  lines = []
  dots  = []

  const spacing = 80
  const angle   = Math.PI / 6  // 30°
  const cos     = Math.cos(angle)
  const sin     = Math.sin(angle)
  const total   = Math.ceil((W + H) / spacing) + 4

  /* linhas diagonais (duas famílias) */
  for (let i = -4; i < total; i++) {
    const offset = i * spacing

    /* família 1: canto topo-esq → baixo-dir */
    lines.push({
      x1: offset / cos,
      y1: 0,
      x2: (offset - H * sin) / cos,
      y2: H,
      speed:  (Math.random() * 0.15 + 0.04) * (Math.random() < .5 ? 1 : -1),
      phase:  Math.random() * Math.PI * 2,
      bright: Math.random() * 0.025 + 0.006,
      family: 0,
    })

    /* família 2: direção oposta */
    lines.push({
      x1: W - offset / cos,
      y1: 0,
      x2: W - (offset - H * sin) / cos,
      y2: H,
      speed:  (Math.random() * 0.12 + 0.03) * (Math.random() < .5 ? 1 : -1),
      phase:  Math.random() * Math.PI * 2,
      bright: Math.random() * 0.018 + 0.004,
      family: 1,
    })
  }

  /* pontos de cruzamento luminosos */
  for (let i = 0; i < 28; i++) {
    dots.push({
      x:      Math.random() * W,
      y:      Math.random() * H,
      r:      Math.random() * 1.2 + 0.3,
      bright: Math.random() * 0.25 + 0.05,
      speed:  Math.random() * 0.004 + 0.001,
      phase:  Math.random() * Math.PI * 2,
    })
  }
}

/* ---- RENDER ---- */
let t = 0

function draw() {
  ctx.clearRect(0, 0, W, H)

  t += 0.004

  /* linhas */
  lines.forEach(l => {
    const pulse = Math.sin(t * l.speed * 40 + l.phase)
    const alpha = l.bright + l.bright * 0.5 * pulse

    ctx.beginPath()
    ctx.moveTo(l.x1, l.y1)
    ctx.lineTo(l.x2, l.y2)
    ctx.strokeStyle = l.family === 0 ? white(alpha) : gold(alpha * 0.6)
    ctx.lineWidth   = 0.5
    ctx.stroke()
  })

  /* luz diagonal suave (topo-esq) */
  const grd = ctx.createLinearGradient(0, 0, W * 0.5, H * 0.5)
  grd.addColorStop(0, gold(0.04))
  grd.addColorStop(1, gold(0))
  ctx.fillStyle = grd
  ctx.fillRect(0, 0, W, H)

  /* pontos */
  dots.forEach(d => {
    const pulse = 0.5 + 0.5 * Math.sin(t * d.speed * 100 + d.phase)
    const alpha = d.bright * pulse

    ctx.beginPath()
    ctx.arc(d.x, d.y, d.r, 0, Math.PI * 2)
    ctx.fillStyle = gold(alpha)
    ctx.shadowColor = gold(0.5)
    ctx.shadowBlur  = 6
    ctx.fill()
    ctx.shadowBlur  = 0
  })

  requestAnimationFrame(draw)
}

window.addEventListener('resize', resize, { passive: true })
resize()
draw()