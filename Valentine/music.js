// Background music controller
const bgAudio = new Audio('audio/song.mp3');
bgAudio.loop = true;
bgAudio.preload = 'auto';
bgAudio.muted = true; // REQUIRED for autoplay
let audioPlaying = false;
let hasUserInteracted = false;

function updateMusicControl() {
  const el = document.getElementById('musicControl');
  if (!el) return;

  el.textContent = audioPlaying ? '🔊' : '🔈';
  el.classList.toggle('playing', audioPlaying);
}

async function startAudio() {
  try {
    await bgAudio.play();
    audioPlaying = true;
    updateMusicControl();
  } catch (err) {
    console.warn('Autoplay blocked:', err);
  }
}

function unmuteAudio() {
  if (hasUserInteracted) return;
  hasUserInteracted = true;

  bgAudio.muted = false;
  if (!audioPlaying) startAudio();
}

function toggleAudio(e) {
  e?.stopPropagation();

  if (audioPlaying) {
    bgAudio.pause();
    audioPlaying = false;
  } else {
    bgAudio.muted = false;
    startAudio();
  }
  updateMusicControl();
}

document.addEventListener('DOMContentLoaded', () => {
  // Try autoplay immediately (muted)
  startAudio();

  // First user interaction unlocks sound
  const unlockEvents = [
    'click',
    'touchstart',
    'pointerdown',
    'keydown',
    'scroll',
    'mousemove'
  ];

  unlockEvents.forEach(evt =>
    document.addEventListener(evt, unmuteAudio, { once: true })
  );

  // Music control button
  const control = document.getElementById('musicControl');
  if (control) control.addEventListener('click', toggleAudio);
});
