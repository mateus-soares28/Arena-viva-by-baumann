const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
const animationReady = typeof gsap !== 'undefined' && typeof ScrollTrigger !== 'undefined';
const preload = document.querySelector('.preloader');

function setupReveals() {
  if (reducedMotion || !animationReady) return;

  gsap.registerPlugin(ScrollTrigger);

  document.querySelectorAll('.section [data-reveal]').forEach(element => {
    const direction = element.dataset.reveal === 'right' ? 1 : -1;

    gsap.fromTo(element,
      { x: () => direction * Math.min(72, window.innerWidth * 0.1), autoAlpha: 0 },
      {
        x: 0,
        autoAlpha: 1,
        ease: 'none',
        scrollTrigger: {
          trigger: element,
          start: 'top 90%',
          end: 'clamp(top 55%)',
          scrub: true,
          invalidateOnRefresh: true
        }
      }
    );
  });

  gsap.fromTo('.hero__left', { x: -48, autoAlpha: 0 }, {
    x: 0, autoAlpha: 1, duration: 1, ease: 'power2.out'
  });
  gsap.fromTo('.hero__stamp', { x: 48, autoAlpha: 0 }, {
    x: 0, autoAlpha: 1, duration: 1, ease: 'power2.out'
  });

  ScrollTrigger.refresh();
  document.fonts?.ready.then(() => ScrollTrigger.refresh());
  window.addEventListener('load', () => ScrollTrigger.refresh(), { once: true });
}

function finishPreload() {
  if (!preload || preload.dataset.done) return;
  preload.dataset.done = 'true';
  document.body.classList.remove('loading');

  if (reducedMotion || !animationReady) {
    preload.remove();
    return;
  }

  gsap.to(preload, {
    yPercent: -100,
    duration: 0.85,
    ease: 'power3.inOut',
    onComplete: () => {
      preload.remove();
      setupReveals();
    }
  });
}

document.body.classList.add('loading');
const ready = document.readyState === 'complete'
  ? Promise.resolve()
  : new Promise(resolve => window.addEventListener('load', resolve, { once: true }));

Promise.race([ready, new Promise(resolve => setTimeout(resolve, 2600))])
  .then(() => setTimeout(finishPreload, reducedMotion ? 0 : 900));

const menuButton = document.querySelector('.menu-toggle');
const menu = document.querySelector('.nav');

menuButton?.addEventListener('click', () => {
  const open = menu.classList.toggle('is-open');
  menuButton.setAttribute('aria-expanded', String(open));
  menuButton.setAttribute('aria-label', open ? 'Fechar menu' : 'Abrir menu');
});

menu?.querySelectorAll('a').forEach(link => link.addEventListener('click', () => {
  menu.classList.remove('is-open');
  menuButton?.setAttribute('aria-expanded', 'false');
  menuButton?.setAttribute('aria-label', 'Abrir menu');
}));

const header = document.querySelector('.site-header');
const sections = document.querySelectorAll('main > section');
let headerUpdatePending = false;

function updateHeaderTheme() {
  headerUpdatePending = false;
  if (!header) return;

  const headerMidpoint = header.getBoundingClientRect().height / 2;
  const currentSection = [...sections].find(section => {
    const bounds = section.getBoundingClientRect();
    return bounds.top <= headerMidpoint && bounds.bottom > headerMidpoint;
  });

  header.classList.toggle('is-light', !!currentSection &&
    (currentSection.classList.contains('section--light') ||
      currentSection.classList.contains('section--sand')));
}

function queueHeaderThemeUpdate() {
  if (headerUpdatePending) return;
  headerUpdatePending = true;
  requestAnimationFrame(updateHeaderTheme);
}

updateHeaderTheme();
window.addEventListener('scroll', queueHeaderThemeUpdate, { passive: true });
window.addEventListener('resize', queueHeaderThemeUpdate);
