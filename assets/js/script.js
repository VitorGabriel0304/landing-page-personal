/* =========================
   WHATSAPP
========================= */
function whatsapp(text){
  let numero = "5514999999999"
  window.open(`https://wa.me/${numero}?text=${encodeURIComponent(text)}`)
}

/* =========================
   SCROLL SUAVE
========================= */
function scrollToSection(id){
  document.getElementById(id).scrollIntoView({ behavior: "smooth" })
}

/* =========================
   MENU HAMBURGER
========================= */
const hamburger   = document.getElementById("hamburger")
const nav         = document.getElementById("nav")
const navOverlay  = document.getElementById("navOverlay")

function toggleMenu(){
  const open = nav.classList.toggle("open")
  hamburger.classList.toggle("open", open)
  navOverlay.classList.toggle("active", open)
  document.body.style.overflow = open ? "hidden" : ""
}

function closeMenu(){
  nav.classList.remove("open")
  hamburger.classList.remove("open")
  navOverlay.classList.remove("active")
  document.body.style.overflow = ""
}

// fecha menu ao clicar em link
document.querySelectorAll(".nav a").forEach(a => {
  a.addEventListener("click", () => {
    closeMenu()
  })
})

/* =========================
   HEADER SCROLL
========================= */
const header = document.getElementById("header")

window.addEventListener("scroll", () => {
  if(window.scrollY > 40){
    header.classList.add("scrolled")
  } else {
    header.classList.remove("scrolled")
  }
})

/* =========================
   REVEAL SUAVE
========================= */
const revealEls = document.querySelectorAll(
  ".card, .metodo-card, .plano, .hero-text, .hero-image, .cta-inner"
)

revealEls.forEach(el => {
  el.style.opacity = "0"
  el.style.transform = "translateY(28px)"
  el.style.transition = "opacity 0.65s ease, transform 0.65s ease"
})

function checkReveal(){
  revealEls.forEach(el => {
    const top = el.getBoundingClientRect().top
    if(top < window.innerHeight - 70){
      el.style.opacity = "1"
      el.style.transform = "translateY(0)"
    }
  })
}

window.addEventListener("scroll", checkReveal)
checkReveal() // roda ao carregar

/* =========================
   PARTÍCULAS
========================= */
const canvas = document.getElementById("particles")
const ctx    = canvas.getContext("2d")

canvas.width  = window.innerWidth
canvas.height = window.innerHeight

let particlesArray = []

class Particle {
  constructor(){
    this.x      = Math.random() * canvas.width
    this.y      = Math.random() * canvas.height
    this.size   = Math.random() * 1.4 + 0.2
    this.speedX = (Math.random() - 0.5) * 0.3
    this.speedY = (Math.random() - 0.5) * 0.3
    this.opacity = Math.random() * 0.6 + 0.2
  }

  update(){
    this.x += this.speedX
    this.y += this.speedY
    if(this.x > canvas.width)  this.x = 0
    if(this.x < 0)             this.x = canvas.width
    if(this.y > canvas.height) this.y = 0
    if(this.y < 0)             this.y = canvas.height
  }

  draw(){
    ctx.globalAlpha = this.opacity
    ctx.fillStyle   = "#a855f7"
    ctx.shadowColor = "#7c3aed"
    ctx.shadowBlur  = 12
    ctx.beginPath()
    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2)
    ctx.fill()
    ctx.shadowBlur  = 0
    ctx.globalAlpha = 1
  }
}

function initParticles(){
  particlesArray = []
  for(let i = 0; i < 90; i++){
    particlesArray.push(new Particle())
  }
}

function animate(){
  ctx.clearRect(0, 0, canvas.width, canvas.height)
  particlesArray.forEach(p => { p.update(); p.draw() })
  requestAnimationFrame(animate)
}

initParticles()
animate()

window.addEventListener("resize", () => {
  canvas.width  = window.innerWidth
  canvas.height = window.innerHeight
  initParticles()
})