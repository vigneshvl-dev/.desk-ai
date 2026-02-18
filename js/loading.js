// ═══════════════════════════════════════════════════════════════════════════
// D.esk AI — Loading Screen JavaScript
// ═══════════════════════════════════════════════════════════════════════════

/* ── Progress & Status Simulation ───────────────────────────────────────── */
const statusText = document.querySelector('.status-text');
const enterBtn = document.getElementById('enter-campus');
const dots = document.querySelectorAll('.dot');

const messages = [
  'INITIALIZING AI CORE...',
  'LOADING CAMPUS DATABASE...',
  'CONNECTING TO STELLA MARY\'S...',
  'FETCHING STUDENT RECORDS...',
  'CALIBRATING NEURAL ENGINE...',
  'WELCOME TO D.ESK AI!'
];

let msgIdx = 0;

function runLoading() {
  if (msgIdx >= messages.length) {
    // Show enter button
    if (enterBtn) {
      enterBtn.style.display = 'inline-block';
      statusText.style.display = 'none';
      document.querySelector('.dots').style.display = 'none';
    }
    return;
  }

  // Update text
  statusText.textContent = messages[msgIdx++];

  // Simulate dots animation sequence
  dots.forEach((dot, i) => {
    setTimeout(() => {
      dot.style.opacity = '1';
      setTimeout(() => { dot.style.opacity = '0.5'; }, 400);
    }, i * 200);
  });

  const delay = msgIdx === messages.length ? 1000 : 1200 + Math.random() * 800;
  setTimeout(runLoading, delay);
}

// Start loading
window.onload = () => {
  setTimeout(runLoading, 1000);
};

// Enter function
if (enterBtn) {
  enterBtn.onclick = () => {
    document.body.style.opacity = '0';
    document.body.style.transition = 'opacity 0.8s ease';
    setTimeout(() => {
      window.location.href = 'home.html';
    }, 800);
  };
}

// Keyboard support
document.addEventListener('keydown', (e) => {
  if (e.key === 'Enter' && enterBtn.style.display !== 'none') {
    enterBtn.click();
  }
});
