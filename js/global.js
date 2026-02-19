// ═══════════════════════════════════════════════════════════════════════════
// D.esk AI — Global JavaScript (shared across all pages)
// ═══════════════════════════════════════════════════════════════════════════

/* ── Neural Background Canvas ──────────────────────────────────────────── */
(function initNeuralBg() {
    const canvas = document.getElementById('neural-bg');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let nodes = [], W, H, animId;

    function resize() {
        W = canvas.width = window.innerWidth;
        H = canvas.height = window.innerHeight;
        buildNodes();
    }
    function buildNodes() {
        nodes = [];
        const count = Math.floor((W * H) / 22000);
        for (let i = 0; i < count; i++) {
            nodes.push({
                x: Math.random() * W, y: Math.random() * H,
                vx: (Math.random() - 0.5) * 0.3,
                vy: (Math.random() - 0.5) * 0.3,
                r: Math.random() * 1.5 + 0.5
            });
        }
    }
    function draw() {
        ctx.clearRect(0, 0, W, H);
        nodes.forEach(n => {
            n.x += n.vx; n.y += n.vy;
            if (n.x < 0 || n.x > W) n.vx *= -1;
            if (n.y < 0 || n.y > H) n.vy *= -1;
        });
        for (let i = 0; i < nodes.length; i++) {
            for (let j = i + 1; j < nodes.length; j++) {
                const dx = nodes[i].x - nodes[j].x;
                const dy = nodes[i].y - nodes[j].y;
                const d = Math.sqrt(dx * dx + dy * dy);
                if (d < 120) {
                    ctx.beginPath();
                    ctx.moveTo(nodes[i].x, nodes[i].y);
                    ctx.lineTo(nodes[j].x, nodes[j].y);
                    ctx.strokeStyle = `rgba(186,255,141,${0.12 * (1 - d / 120)})`;
                    ctx.lineWidth = 0.6;
                    ctx.stroke();
                }
            }
        }
        nodes.forEach(n => {
            ctx.beginPath();
            ctx.arc(n.x, n.y, n.r, 0, Math.PI * 2);
            ctx.fillStyle = 'rgba(186,255,141,0.4)';
            ctx.fill();
        });
        animId = requestAnimationFrame(draw);
    }
    window.addEventListener('resize', resize);
    resize(); draw();
})();

/* ── Hamburger Menu ────────────────────────────────────────────────────── */
const hamburger = document.getElementById('hamburger');
const mobileNav = document.getElementById('mobile-nav');
if (hamburger && mobileNav) {
    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('open');
        mobileNav.classList.toggle('open');
    });
}

/* ── Toast Notifications ───────────────────────────────────────────────── */
function showToast(msg, type = 'success', duration = 3000) {
    const container = document.getElementById('toast-container');
    if (!container) return;
    const icons = { success: '✅', error: '❌', info: 'ℹ️', warn: '⚠️' };
    const toast = document.createElement('div');
    toast.className = `toast ${type}`;
    toast.innerHTML = `<span class="toast-icon">${icons[type] || '✅'}</span><span class="toast-msg">${msg}</span>`;
    container.appendChild(toast);
    setTimeout(() => {
        toast.style.animation = 'toastIn 0.3s ease reverse forwards';
        setTimeout(() => toast.remove(), 300);
    }, duration);
}

/* ── Auth State ────────────────────────────────────────────────────────── */
function getUser() {
    try { return JSON.parse(localStorage.getItem('desk_ai_user')); } catch { return null; }
}
function setUser(u) { localStorage.setItem('desk_ai_user', JSON.stringify(u)); }
function logout() {
    localStorage.removeItem('desk_ai_user');
    window.location.href = 'login.html';
}

/* ── Update nav based on auth ──────────────────────────────────────────── */
(function updateNav() {
    const user = getUser();
    const loginBtn = document.getElementById('btn-login');
    const dashBtn = document.getElementById('btn-dashboard');
    if (user) {
        if (loginBtn) loginBtn.style.display = 'none';
        if (dashBtn) { dashBtn.textContent = user.name?.split(' ')[0] || 'Dashboard'; }
    } else {
        if (dashBtn) dashBtn.style.display = 'none';
    }
})();

/* ── Expose globals ────────────────────────────────────────────────────── */
window.showToast = showToast;
window.getUser = getUser;
window.setUser = setUser;
window.logout = logout;
