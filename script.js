const triggerButtons = document.querySelectorAll('.button[href^="#"]');
const confettiColors = ['#4f46e5', '#0ea5e9', '#f59e0b', '#ef4444', '#22c55e', '#ec4899'];

function launchConfetti() {
  const layer = document.createElement('div');
  layer.className = 'confetti-layer';
  document.body.appendChild(layer);

  const count = 160;
  for (let i = 0; i < count; i += 1) {
    const piece = document.createElement('span');
    piece.className = 'confetti-piece';
    piece.style.left = `${Math.random() * 100}vw`;
    piece.style.backgroundColor = confettiColors[Math.floor(Math.random() * confettiColors.length)];
    piece.style.animationDelay = `${Math.random() * 0.5}s`;
    piece.style.animationDuration = `${2.2 + Math.random() * 1.6}s`;
    piece.style.setProperty('--x-drift', `${(Math.random() * 220 - 110).toFixed(0)}px`);
    piece.style.setProperty('--spin', `${(Math.random() * 720 - 360).toFixed(0)}deg`);
    layer.appendChild(piece);
  }

  window.setTimeout(() => {
    layer.remove();
  }, 4300);
}

function animateDestination(target) {
  target.classList.remove('section-focus');
  window.requestAnimationFrame(() => {
    target.classList.add('section-focus');
  });

  window.setTimeout(() => {
    target.classList.remove('section-focus');
  }, 950);
}

triggerButtons.forEach((button) => {
  button.addEventListener('click', (event) => {
    const targetId = button.getAttribute('href');
    const target = targetId ? document.querySelector(targetId) : null;

    if (!target) {
      return;
    }

    event.preventDefault();
    button.classList.remove('is-clicked');
    window.requestAnimationFrame(() => button.classList.add('is-clicked'));

    launchConfetti();

    target.scrollIntoView({
      behavior: 'smooth',
      block: 'start'
    });

    window.setTimeout(() => {
      animateDestination(target);
    }, 500);
  });
});
