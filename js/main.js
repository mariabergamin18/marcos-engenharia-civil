import { gsap } from 'https://cdn.jsdelivr.net/npm/gsap@3.12.7/+esm';

const reduced = matchMedia('(prefers-reduced-motion: reduce)').matches;
const heroLines = document.querySelectorAll('.hero-copy .line span');
const heroKicker = document.querySelector('.hero-kicker');
const heroSubline = document.querySelector('.hero-subline');
const heroAccent = document.querySelector('.hero-copy .accent');

if (!reduced) {
  const intro = gsap.timeline({ defaults: { ease: 'power3.out' } });
  intro.fromTo(heroKicker, { autoAlpha: 0, y: 12 }, { autoAlpha: 1, y: 0, duration: 0.8 }, 0.12)
    .to(heroLines, { y: 0, duration: 1.05, stagger: 0.14, ease: 'power4.out' }, 0.26)
    .fromTo(heroSubline, { autoAlpha: 0, y: 14 }, { autoAlpha: 1, y: 0, duration: 0.9 }, 0.62)
    .to(heroAccent, { '--accent-scale': 1, duration: 0.9 }, 0.72);
} else {
  heroLines.forEach((element) => { element.style.transform = 'none'; });
  [heroKicker, heroSubline].forEach((element) => {
    if (element) { element.style.opacity = '1'; element.style.transform = 'none'; }
  });
}

const revealElements = document.querySelectorAll('.reveal');
const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (!entry.isIntersecting) return;
    if (reduced) entry.target.classList.add('in');
    else gsap.to(entry.target, { autoAlpha: 1, y: 0, duration: 0.8, ease: 'power3.out' });
    observer.unobserve(entry.target);
  });
}, { threshold: 0.14, rootMargin: '0px 0px -4%' });
revealElements.forEach((element) => observer.observe(element));

let lastY = 0;
const header = document.getElementById('header');
const hero = document.getElementById('inicio');
const heroCopy = document.getElementById('heroCopy');

addEventListener('scroll', () => {
  const y = scrollY;
  if (y > 120) header.classList.toggle('is-hidden', y > lastY && y - lastY > 2);
  else header.classList.remove('is-hidden');
  lastY = y;
  if (!reduced && y < innerHeight * 1.15) {
    const progress = Math.min(1, y / Math.max(1, hero.offsetHeight));
    hero.style.setProperty('--hero-media-y', `${y * 0.055}px`);
    hero.style.setProperty('--hero-media-scale', `${1.025 + progress * 0.025}`);
    gsap.set(heroCopy, { y: y * 0.075, opacity: Math.max(0.18, 1 - progress * 1.28) });
  }
}, { passive: true });

// Os serviços empilham pelo position: sticky do CSS, sem disputar transforms com GSAP.

document.querySelectorAll('a[href^="#"]').forEach((link) => link.addEventListener('click', (event) => {
  const id = link.getAttribute('href');
  if (id === '#') return;
  const target = document.querySelector(id);
  if (target) {
    event.preventDefault();
    target.scrollIntoView({ behavior: reduced ? 'auto' : 'smooth' });
  }
}));

const projectCards = [...document.querySelectorAll('.project-card')];
function expandProject(selected) {
  projectCards.forEach((card) => {
    const active = card === selected;
    card.classList.toggle('is-active', active);
    card.setAttribute('aria-pressed', String(active));
  });
}
projectCards.forEach((card) => {
  card.addEventListener('pointerenter', (event) => {
    if (event.pointerType === 'mouse') expandProject(card);
  });
  card.addEventListener('focus', () => expandProject(card));
  card.addEventListener('click', () => expandProject(card));
});
