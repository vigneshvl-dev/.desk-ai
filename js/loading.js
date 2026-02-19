// ═══════════════════════════════════════════════════════════════════════════
// D.esk AI — Loading Screen JavaScript
// ═══════════════════════════════════════════════════════════════════════════

/* ── Progress & Status Simulation ───────────────────────────────────────── */
const statusText = document.querySelector('.status-text');
const dots = document.querySelectorAll('.dot');
const startTime = Date.now();
const LOADING_DURATION = 4000; // 4 seconds

const messages = [
  'INITIALIZING AI CORE...',
  'LOADING CAMPUS DATABASE...',
  'WELCOME TO D.ESK AI...',
  'FETCHING STUDENT RECORDS...',
  'CALIBRATING NEURAL ENGINE...',
  'WELCOME TO D.ESK AI!'
];

let msgIdx = 0;

function runLoading() {
  const elapsedTime = Date.now() - startTime;
  
  // Auto-redirect after 4 seconds
  if (elapsedTime >= LOADING_DURATION) {
    document.body.style.opacity = '0';
    document.body.style.transition = 'opacity 0.8s ease';
    setTimeout(() => {
      window.location.href = 'home.html';
    }, 800);
    return;
  }

  if (msgIdx < messages.length) {
    // Update text
    statusText.textContent = messages[msgIdx++];

    // Simulate dots animation sequence
    dots.forEach((dot, i) => {
      setTimeout(() => {
        dot.style.opacity = '1';
        setTimeout(() => { dot.style.opacity = '0.5'; }, 400);
      }, i * 200);
    });
  }

  const delay = 650; // Faster updates to fit in 4 seconds
  setTimeout(runLoading, delay);
}

// Start loading
window.onload = () => {
  setTimeout(runLoading, 300);
};
