// ═══════════════════════════════════════════════════════════════════════════
// D.esk AI — Login Page JavaScript
// ═══════════════════════════════════════════════════════════════════════════

/* ── Tab Switching ─────────────────────────────────────────────────────── */
function switchTab(tab) {
    const indicator = document.getElementById('tab-indicator');
    const loginForm = document.getElementById('form-login');
    const regForm = document.getElementById('form-register');
    const tabLogin = document.getElementById('tab-login');
    const tabReg = document.getElementById('tab-register');

    if (tab === 'login') {
        indicator.classList.remove('right');
        loginForm.style.display = 'block';
        regForm.style.display = 'none';
        tabLogin.classList.add('active');
        tabReg.classList.remove('active');
    } else {
        indicator.classList.add('right');
        loginForm.style.display = 'none';
        regForm.style.display = 'block';
        tabLogin.classList.remove('active');
        tabReg.classList.add('active');
    }
}

/* ── Password Toggle ───────────────────────────────────────────────────── */
function togglePassword(inputId, btn) {
    const input = document.getElementById(inputId);
    if (input.type === 'password') {
        input.type = 'text';
        btn.textContent = '🙈';
    } else {
        input.type = 'password';
        btn.textContent = '👁️';
    }
}

/* ── Password Strength ─────────────────────────────────────────────────── */
document.getElementById('reg-pass')?.addEventListener('input', function () {
    const bar = document.getElementById('pass-strength');
    const val = this.value;
    bar.className = 'password-strength';
    if (val.length === 0) return;
    if (val.length < 6) bar.classList.add('weak');
    else if (val.length < 10 || !/[A-Z]/.test(val) || !/[0-9]/.test(val)) bar.classList.add('medium');
    else bar.classList.add('strong');
});

/* ── Demo Credentials ──────────────────────────────────────────────────── */
const DEMO_USERS = [
    {
        id: '24CSE001', password: 'demo123',
        name: 'VIGNESH VL', dept: 'CSE', year: '2nd Year',
        gpa: 8.5, attendance: 87, credits: 45, totalCredits: 120,
        type: 'Hostel Student', email: '24cse001@stellamarys.edu.in',
        nextExam: '2025-02-20', phone: '+91 98765 43210'
    },
    {
        id: 'admin', password: 'admin',
        name: 'Demo Student', dept: 'CSE', year: '3rd Year',
        gpa: 9.1, attendance: 92, credits: 78, totalCredits: 120,
        type: 'Day Scholar', email: 'demo@stellamarys.edu.in',
        nextExam: '2025-02-20', phone: '+91 99999 00000'
    }
];

/* ── Login Handler ─────────────────────────────────────────────────────── */
async function handleLogin(e) {
    e.preventDefault();
    const id = document.getElementById('login-id').value.trim();
    const pass = document.getElementById('login-pass').value;
    const btn = document.getElementById('login-btn');
    const text = document.getElementById('login-btn-text');

    btn.disabled = true;
    text.textContent = '⏳ Signing in...';

    await new Promise(r => setTimeout(r, 1200));

    const user = DEMO_USERS.find(u => (u.id === id || u.email === id) && u.password === pass);

    if (user) {
        setUser(user);
        showToast(`Welcome back, ${user.name.split(' ')[0]}! 🎉`, 'success');
        setTimeout(() => { window.location.href = 'home.html'; }, 1000);
    } else {
        showToast('Invalid credentials. Try: 24CSE001 / demo123', 'error', 5000);
        btn.disabled = false;
        text.textContent = '🔑 Sign In';
    }
}

/* ── Register Handler ──────────────────────────────────────────────────── */
async function handleRegister(e) {
    e.preventDefault();
    const btn = document.getElementById('reg-btn');
    const text = document.getElementById('reg-btn-text');

    btn.disabled = true;
    text.textContent = '⏳ Creating account...';

    await new Promise(r => setTimeout(r, 1500));

    const newUser = {
        id: document.getElementById('reg-id').value,
        name: document.getElementById('reg-name').value,
        dept: document.getElementById('reg-dept').value,
        year: document.getElementById('reg-year').value,
        email: document.getElementById('reg-email').value,
        type: document.querySelector('input[name="stype"]:checked')?.value === 'hostel' ? 'Hostel Student' : 'Day Scholar',
        gpa: 0, attendance: 0, credits: 0, totalCredits: 120,
        nextExam: '2025-02-20', phone: ''
    };

    setUser(newUser);
    showToast('Account created successfully! Welcome to D.esk AI! 🎉', 'success', 4000);
    setTimeout(() => { window.location.href = 'home.html'; }, 1500);
}

/* ── Social Login ──────────────────────────────────────────────────────── */
function socialLogin(provider) {
    showToast(`${provider} login coming soon! Use demo credentials for now.`, 'info', 4000);
}

/* ── Forgot Password ───────────────────────────────────────────────────── */
function showForgot() {
    showToast('Password reset link will be sent to your college email. Contact IT support: it@stellamarys.edu.in', 'info', 5000);
}

/* ── Demo hint ─────────────────────────────────────────────────────────── */
setTimeout(() => {
    showToast('💡 Demo: Use ID "24CSE001" and password "demo123"', 'info', 6000);
}, 1500);
