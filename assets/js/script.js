/* ════════════════════════════════
   UTIL
════════════════════════════════ */
function whatsapp(msg) {
  window.open(`https://wa.me/5514999999999?text=${encodeURIComponent(msg)}`)
}
function scrollTo(id) {
  document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
}

/* ════════════════════════════════
   HEADER SCROLL
════════════════════════════════ */
const header = document.getElementById('header')
window.addEventListener('scroll', () => {
  header.classList.toggle('scrolled', window.scrollY > 60)
}, { passive: true })

/* ════════════════════════════════
   HAMBURGER
════════════════════════════════ */
const burger   = document.getElementById('burger')
const nav      = document.getElementById('nav')
const navShade = document.getElementById('navShade')

function toggleMenu() {
  const open = nav.classList.toggle('open')
  burger.classList.toggle('open', open)
  navShade.classList.toggle('on', open)
  document.body.style.overflow = open ? 'hidden' : ''
}
function closeMenu() {
  nav.classList.remove('open')
  burger.classList.remove('open')
  navShade.classList.remove('on')
  document.body.style.overflow = ''
}

/* ════════════════════════════════
   SCROLL REVEAL
════════════════════════════════ */
const revealEls = document.querySelectorAll('[data-reveal]')

const revealObs = new IntersectionObserver((entries) => {
  entries.forEach((e, i) => {
    if (e.isIntersecting) {
      // stagger por índice dentro do grupo
      const siblings = [...e.target.parentElement.querySelectorAll('[data-reveal]')]
      const idx = siblings.indexOf(e.target)
      setTimeout(() => e.target.classList.add('vis'), idx * 90)
      revealObs.unobserve(e.target)
    }
  })
}, { threshold: 0.12 })

revealEls.forEach(el => revealObs.observe(el))

/* ════════════════════════════════
   COUNTER ANIMADO
════════════════════════════════ */
function animateCounter(el) {
  const target = parseInt(el.dataset.count)
  const duration = 1400
  const start = performance.now()

  function step(now) {
    const p = Math.min((now - start) / duration, 1)
    // ease out
    const val = Math.round(target * (1 - Math.pow(1 - p, 3)))
    el.textContent = val
    if (p < 1) requestAnimationFrame(step)
  }
  requestAnimationFrame(step)
}

const counterObs = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      animateCounter(e.target)
      counterObs.unobserve(e.target)
    }
  })
}, { threshold: 0.5 })

document.querySelectorAll('[data-count]').forEach(el => counterObs.observe(el))

/* ════════════════════════════════
   FAQ ACCORDION
════════════════════════════════ */
function toggleFaq(el) {
  const wasOpen = el.classList.contains('open')
  document.querySelectorAll('.faq-item.open').forEach(i => i.classList.remove('open'))
  if (!wasOpen) el.classList.add('open')
}

/* ════════════════════════════════
   ACTIVE NAV LINK
════════════════════════════════ */
const sections = document.querySelectorAll('section[id], .hero[id]')
const navLinks = document.querySelectorAll('nav a')

const sectionObs = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      navLinks.forEach(a => {
        a.style.color = a.getAttribute('href') === `#${e.target.id}`
          ? 'var(--gold)'
          : ''
      })
    }
  })
}, { threshold: 0.4 })

sections.forEach(s => sectionObs.observe(s))