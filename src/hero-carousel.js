const slideInterval = 6000;
const pausePreference = 'qaryatin-hero-paused';

export function mountHeroCarousel(root) {
  if (!root) return () => {};

  const document = root.ownerDocument;
  const window = document.defaultView;
  const slides = [...root.querySelectorAll('[data-hero-slide]')];
  const buttons = [...root.querySelectorAll('[data-hero-select]')];
  const images = slides.map(slide => slide.querySelector('img'));
  const toggle = root.querySelector('[data-hero-toggle]');
  const toggleLabel = toggle?.querySelector('[data-hero-toggle-label]');
  const pauseIcon = toggle?.querySelector('[data-hero-pause-icon]');
  const playIcon = toggle?.querySelector('[data-hero-play-icon]');
  const status = root.querySelector('[data-hero-status]');
  if (slides.length < 2 || slides.length !== buttons.length || images.some(image => !image) || !toggleLabel) {
    return () => {};
  }

  const motion = window.matchMedia('(prefers-reduced-motion: reduce)');
  const controller = new AbortController();
  const { signal } = controller;
  const unavailable = new Set();
  const requests = new Map();
  let active = 0;
  let selection = 0;
  let selecting = false;
  let advanceTimer;
  let loadTimer;
  let userPaused = false;
  let keyboardPaused = false;
  let hovered = false;
  let focused = root.contains(document.activeElement);
  let resumedWithFocus = false;

  try {
    userPaused = window.localStorage.getItem(pausePreference) === 'true';
  } catch { /* Storage is optional. */ }

  function prepare(index) {
    if (requests.has(index) && !unavailable.has(index)) return requests.get(index);

    const image = images[index];
    unavailable.delete(index);
    if (image.dataset.srcset) image.srcset = image.dataset.srcset;
    if (image.dataset.src) image.src = image.dataset.src;
    const request = image.decode().then(
      () => true,
      () => {
        unavailable.add(index);
        return false;
      },
    );
    requests.set(index, request);
    return request;
  }

  function canRotate() {
    return !motion.matches && !userPaused && !keyboardPaused && !hovered &&
      !document.hidden && (!focused || resumedWithFocus);
  }

  function nextSlide() {
    for (let step = 1; step < slides.length; step++) {
      const index = (active + step) % slides.length;
      if (!unavailable.has(index)) return index;
    }
    return null;
  }

  function clearTimers() {
    window.clearTimeout(advanceTimer);
    window.clearTimeout(loadTimer);
  }

  function schedule() {
    clearTimers();
    if (selecting || !canRotate()) return;
    const next = nextSlide();
    if (next === null) return;

    // Give the first image priority and load at most one upcoming slide.
    loadTimer = window.setTimeout(() => { void prepare(next); }, 750);
    advanceTimer = window.setTimeout(() => {
      const index = nextSlide();
      if (index !== null && canRotate()) void selectSlide(index);
    }, slideInterval);
  }

  async function selectSlide(index, manual = false) {
    const request = ++selection;
    selecting = true;
    clearTimers();
    const ready = index === active || await prepare(index);
    if (signal.aborted || request !== selection) return;
    selecting = false;
    if (ready && (manual || canRotate())) {
      active = index;
      slides.forEach((slide, slideIndex) => {
        const current = slideIndex === active;
        slide.classList.toggle('is-active', current);
        if (current) {
          slide.removeAttribute('aria-hidden');
          buttons[slideIndex].setAttribute('aria-current', 'true');
        } else {
          slide.setAttribute('aria-hidden', 'true');
          buttons[slideIndex].removeAttribute('aria-current');
        }
      });
      if (manual && status) status.textContent = buttons[active].getAttribute('aria-label') ?? '';
    }
    schedule();
  }

  function update() {
    const paused = userPaused || keyboardPaused;
    toggle.hidden = motion.matches;
    toggleLabel.textContent = paused ? root.dataset.playLabel : root.dataset.pauseLabel;
    if (pauseIcon) pauseIcon.hidden = paused;
    if (playIcon) playIcon.hidden = !paused;
    schedule();
  }

  buttons.forEach((button, index) => {
    button.hidden = false;
    button.addEventListener('click', event => {
      if (event.detail === 0) {
        keyboardPaused = true;
        resumedWithFocus = false;
        update();
      }
      void selectSlide(index, true);
    }, { signal });
  });

  toggle.addEventListener('click', () => {
    userPaused = !(userPaused || keyboardPaused);
    keyboardPaused = false;
    resumedWithFocus = !userPaused;
    try {
      window.localStorage.setItem(pausePreference, String(userPaused));
    } catch { /* The active carousel still keeps its pause state. */ }
    update();
  }, { signal });

  root.addEventListener('focusin', event => {
    focused = true;
    resumedWithFocus = false;
    if (event.target.matches(':focus-visible')) keyboardPaused = true;
    update();
  }, { signal });
  root.addEventListener('focusout', event => {
    if (root.contains(event.relatedTarget)) return;
    focused = false;
    resumedWithFocus = false;
    schedule();
  }, { signal });

  root.addEventListener('pointerenter', event => {
    if (event.pointerType === 'touch') return;
    hovered = true;
    schedule();
  }, { signal });
  root.addEventListener('pointerleave', event => {
    if (event.pointerType === 'touch') return;
    hovered = false;
    schedule();
  }, { signal });

  document.addEventListener('visibilitychange', schedule, { signal });
  motion.addEventListener('change', update, { signal });
  const controls = root.querySelector('[data-hero-controls]');
  if (controls) controls.hidden = false;
  update();

  return () => {
    clearTimers();
    controller.abort();
  };
}
