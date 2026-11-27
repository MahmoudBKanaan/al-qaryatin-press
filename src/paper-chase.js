import { drawPaperBox, drawPaperRunner } from './paper-chase-art.js';

const duration = 4400;
const autoplayDelay = 1250;
const turn = Math.PI * 2;

export function createPaperChaseRoute(random = Math.random) {
  return {
    direction: random() < 0.5 ? 1 : -1,
    entry: 0.55 + random() * 0.29,
    exit: 0.55 + random() * 0.29,
    bend: (random() - 0.5) * 0.10,
    reach: 0.40 + random() * 0.20,
  };
}

export function paperChaseFrame(route, width, height, progress) {
  const top = Math.min(80, height * 0.24);
  const stageHeight = height - top;
  const scale = Math.min(1.08, Math.max(0.56, width / 560), stageHeight / 370);
  const clearance = 76 * scale;
  const reaction = Math.exp(-(((progress - route.reach) / 0.115) ** 2));
  const gap = (146 - 30 * reaction + 7 * Math.sin(progress * turn - 0.5)) * scale;
  // A quick start, a close call at mid-screen, and a sprint off the opposite edge.
  const advance = progress + 0.045 * Math.sin(progress * turn);
  const lead = advance * (width + clearance * 2 + 154 * scale) - clearance;

  function position(distance) {
    const across = Math.max(0, Math.min(1, distance / width));
    return {
      x: route.direction === 1 ? distance : width - distance,
      y: top + stageHeight * (route.entry + (route.exit - route.entry) * across +
        route.bend * Math.sin(across * Math.PI)),
    };
  }

  return {
    box: position(lead),
    runner: position(lead - gap),
    reaction,
    phase: progress * (duration / 1000) * turn * (2 + Math.min(width, 1500) / 1600),
    scale,
  };
}

export function mountPaperChase(root, { autoplay, onPlay }) {
  const canvas = root.querySelector('[data-paper-chase-canvas]');
  const toggle = root.querySelector('[data-paper-chase-toggle]');
  const context = canvas?.getContext('2d');
  if (!context || !toggle) return () => {};

  const document = root.ownerDocument;
  const window = document.defaultView;
  const motion = window.matchMedia('(prefers-reduced-motion: reduce)');
  const controller = new AbortController();
  const { signal } = controller;
  const label = toggle.querySelector('[data-paper-chase-label]');
  const playIcon = toggle.querySelector('[data-paper-chase-play]');
  const stopIcon = toggle.querySelector('[data-paper-chase-stop]');
  let timer;
  let frame;
  let started;
  let route;
  let width;
  let height;

  function updateButton(playing) {
    label.textContent = playing ? toggle.dataset.stopLabel : toggle.dataset.playLabel;
    playIcon.hidden = playing;
    stopIcon.hidden = !playing;
  }

  function stop() {
    window.clearTimeout(timer);
    window.cancelAnimationFrame(frame);
    frame = undefined;
    canvas.hidden = true;
    canvas.width = 0;
    canvas.height = 0;
    updateButton(false);
  }

  function fit() {
    ({ width, height } = canvas.getBoundingClientRect());
    const density = Math.min(window.devicePixelRatio || 1, 2);
    canvas.width = Math.round(width * density);
    canvas.height = Math.round(height * density);
    if (width && height) context.setTransform(canvas.width / width, 0, 0, canvas.height / height, 0, 0);
  }

  function drawAt(painter, point, phase, reaction, scale) {
    context.save();
    context.translate(point.x, point.y);
    context.scale(route.direction * scale, scale);
    painter(context, phase, reaction);
    context.restore();
  }

  function draw(time) {
    started ??= time;
    const progress = (time - started) / duration;
    if (progress >= 1 || !width || !height) {
      stop();
      return;
    }
    const { box, runner, phase, reaction, scale } = paperChaseFrame(route, width, height, progress);
    context.clearRect(0, 0, width, height);
    drawAt(drawPaperRunner, runner, phase, reaction, scale);
    drawAt(drawPaperBox, box, phase * 0.9, reaction, scale);
    frame = window.requestAnimationFrame(draw);
  }

  function play() {
    window.clearTimeout(timer);
    if (document.hidden) return;
    route = createPaperChaseRoute();
    started = undefined;
    canvas.hidden = false;
    fit();
    updateButton(true);
    onPlay();
    frame = window.requestAnimationFrame(draw);
  }

  toggle.hidden = false;
  toggle.addEventListener('click', () => {
    if (frame === undefined) play();
    else stop();
  }, { signal });
  window.addEventListener('resize', () => { if (frame !== undefined) fit(); }, { signal });
  window.addEventListener('pagehide', stop, { signal });
  document.addEventListener('visibilitychange', () => { if (document.hidden) stop(); }, { signal });
  motion.addEventListener('change', () => { if (motion.matches) stop(); }, { signal });

  if (autoplay && !motion.matches && !document.hidden) timer = window.setTimeout(play, autoplayDelay);

  return () => {
    controller.abort();
    stop();
  };
}
