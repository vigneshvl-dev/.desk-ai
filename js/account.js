// ═══════════════════════════════════════════════════════════════════════════
// D.esk AI — Account / Dashboard JavaScript
// ═══════════════════════════════════════════════════════════════════════════

/* ── State ─────────────────────────────────────────────────────────────── */
let currentUser = null;
let prefs = {};

/* ── Default user (guest) ──────────────────────────────────────────────── */
const DEFAULT_USER = {
    id: 'GUEST', name: 'Guest Student', dept: 'CSE', year: '2nd Year',
    gpa: 8.5, attendance: 87, credits: 45, totalCredits: 120,
    type: 'Day Scholar', email: 'guest@stellamarys.edu.in',
    nextExam: '2025-02-20', phone: ''
};

/* ── Init ──────────────────────────────────────────────────────────────── */
window.addEventListener('DOMContentLoaded', () => {
    currentUser = getUser() || DEFAULT_USER;
    loadPrefs();
    renderProfile();
    renderStats();
    renderAcademics();
    renderSettings();
    updateGreeting();
    updateDate();
});

/* ── Greeting ──────────────────────────────────────────────────────────── */
function updateGreeting() {
    const h = new Date().getHours();
    const greet = h < 12 ? 'Morning' : h < 17 ? 'Afternoon' : 'Evening';
    const el = document.getElementById('greeting-time');
    if (el) el.textContent = greet;
    const nameEl = document.getElementById('welcome-name');
    if (nameEl) nameEl.textContent = currentUser.name.split(' ')[0];
}

function updateDate() {
    const el = document.getElementById('welcome-date');
    if (!el) return;
    const now = new Date();
    el.innerHTML = `
    <div>${now.toLocaleDateString('en-IN', { weekday: 'long' })}</div>
    <div>${now.toLocaleDateString('en-IN', { day: '2-digit', month: 'long', year: 'numeric' })}</div>
  `;
}

/* ── Profile ───────────────────────────────────────────────────────────── */
function renderProfile() {
    const u = currentUser;
    setText('profile-name', u.name);
    setText('profile-id', u.id);
    setText('profile-dept', u.dept);
    setText('profile-type', u.type === 'Hostel Student' ? '🏠 Hostel' : '🌞 Day Scholar');
    const avatar = document.getElementById('user-avatar');
    if (avatar) avatar.textContent = u.name.charAt(0).toUpperCase();
}

/* ── Stats ─────────────────────────────────────────────────────────────── */
function renderStats() {
    const u = currentUser;

    // GPA Gauge
    const gpaEl = document.getElementById('gpa-value');
    const gpaGauge = document.getElementById('gpa-gauge');
    const gpaGrade = document.getElementById('gpa-grade');
    if (gpaEl) gpaEl.textContent = u.gpa.toFixed(1);
    if (gpaGauge) {
        const pct = u.gpa / 10;
        const circumference = 2 * Math.PI * 50; // r=50
        setTimeout(() => {
            gpaGauge.style.strokeDashoffset = circumference * (1 - pct);
        }, 300);
    }
    if (gpaGrade) {
        const grade = u.gpa >= 9 ? 'O (Outstanding)' : u.gpa >= 8 ? 'A+ (Excellent)' : u.gpa >= 7 ? 'A (Good)' : 'B+ (Above Avg)';
        gpaGrade.textContent = grade;
    }

    // Attendance
    setText('att-value', u.attendance + '%');
    animateBar('att-bar', u.attendance);
    const attNote = u.attendance >= 85 ? '✅ Excellent attendance' : u.attendance >= 75 ? '⚠️ Acceptable – aim for 85%+' : '🚨 Below minimum – risk of detention';
    setText('att-note', attNote);

    // Credits
    setText('credits-value', u.credits);
    setText('credits-total', `/${u.totalCredits}`);
    animateBar('credits-bar', (u.credits / u.totalCredits) * 100);
    const pct = Math.round((u.credits / u.totalCredits) * 100);
    setText('credits-note', `${pct}% of degree completed`);

    // Exam countdown
    const examDate = new Date(u.nextExam);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const daysLeft = Math.max(0, Math.ceil((examDate - today) / (1000 * 60 * 60 * 24)));
    setText('exam-days', daysLeft);
    setText('exam-date', examDate.toLocaleDateString('en-IN', { day: '2-digit', month: 'long', year: 'numeric' }));
    const semStart = new Date('2024-07-15');
    const totalDays = Math.ceil((examDate - semStart) / (1000 * 60 * 60 * 24));
    const elapsed = totalDays - daysLeft;
    animateBar('exam-bar', Math.min(100, (elapsed / totalDays) * 100));
}

function animateBar(id, pct) {
    const el = document.getElementById(id);
    if (!el) return;
    setTimeout(() => { el.style.width = Math.min(100, pct) + '%'; }, 400);
}

function setText(id, val) {
    const el = document.getElementById(id);
    if (el) el.textContent = val;
}

/* ── Academics ─────────────────────────────────────────────────────────── */
const SUBJECTS = [
    { name: 'Data Structures', code: 'CS3301', credits: 4, ia1: 38, ia2: 40, grade: 'A+' },
    { name: 'Operating Systems', code: 'CS3302', credits: 3, ia1: 35, ia2: 37, grade: 'A' },
    { name: 'Database Management', code: 'CS3303', credits: 4, ia1: 42, ia2: 44, grade: 'O' },
    { name: 'Computer Networks', code: 'CS3304', credits: 3, ia1: 30, ia2: 33, grade: 'B+' },
    { name: 'Software Engineering', code: 'CS3305', credits: 3, ia1: 36, ia2: 38, grade: 'A' },
    { name: 'Web Technologies', code: 'CS3306', credits: 3, ia1: 44, ia2: 45, grade: 'O' },
];

const GPA_HISTORY = [
    { sem: 'S1', gpa: 7.8 }, { sem: 'S2', gpa: 8.1 },
    { sem: 'S3', gpa: 8.4 }, { sem: 'S4', gpa: 8.5 },
];

function renderAcademics() {
    const tbody = document.getElementById('subject-tbody');
    if (tbody) {
        tbody.innerHTML = SUBJECTS.map(s => `
      <tr>
        <td style="font-weight:600;color:var(--text)">${s.name}</td>
        <td style="font-family:monospace;font-size:0.75rem">${s.code}</td>
        <td>${s.credits}</td>
        <td>${s.ia1}/50</td>
        <td>${s.ia2}/50</td>
        <td><span class="badge ${s.grade === 'O' ? 'badge-green' : s.grade.startsWith('A') ? 'badge-blue' : 'badge-amber'}">${s.grade}</span></td>
      </tr>
    `).join('');
    }

    const histEl = document.getElementById('gpa-history');
    if (histEl) {
        histEl.innerHTML = GPA_HISTORY.map(h => `
      <div class="gpa-bar-wrap">
        <div class="gpa-bar-val">${h.gpa}</div>
        <div class="gpa-bar-outer">
          <div class="gpa-bar-inner" style="height:${(h.gpa / 10) * 90}px"></div>
        </div>
        <div class="gpa-bar-label">${h.sem}</div>
      </div>
    `).join('');
    }
}

/* ── Settings ──────────────────────────────────────────────────────────── */
function renderSettings() {
    const u = currentUser;
    setVal('set-name', u.name);
    setVal('set-id', u.id);
    setVal('set-dept', u.dept);
    setVal('set-email', u.email || '');
    setVal('set-phone', u.phone || '');

    // Load saved prefs
    const saved = JSON.parse(localStorage.getItem('desk_ai_prefs') || '{}');
    if (saved.email !== undefined) document.getElementById('notif-email').checked = saved.email;
    if (saved.sms !== undefined) document.getElementById('notif-sms').checked = saved.sms;
    if (saved.exam !== undefined) document.getElementById('notif-exam').checked = saved.exam;
    if (saved.att !== undefined) document.getElementById('notif-att').checked = saved.att;
    if (saved.result !== undefined) document.getElementById('notif-result').checked = saved.result;
}

function setVal(id, val) {
    const el = document.getElementById(id);
    if (el) el.value = val;
}

function saveProfile() {
    const name = document.getElementById('set-name').value.trim();
    const email = document.getElementById('set-email').value.trim();
    const phone = document.getElementById('set-phone').value.trim();

    if (!name) { showToast('Name cannot be empty', 'error'); return; }

    currentUser.name = name;
    currentUser.email = email;
    currentUser.phone = phone;
    setUser(currentUser);

    // Update UI instantly
    setText('profile-name', name);
    const avatar = document.getElementById('user-avatar');
    if (avatar) avatar.textContent = name.charAt(0).toUpperCase();
    setText('welcome-name', name.split(' ')[0]);

    showToast('Profile updated successfully! ✅', 'success');
}

function savePrefs() {
    const prefs = {
        email: document.getElementById('notif-email')?.checked,
        sms: document.getElementById('notif-sms')?.checked,
        exam: document.getElementById('notif-exam')?.checked,
        att: document.getElementById('notif-att')?.checked,
        result: document.getElementById('notif-result')?.checked,
    };
    localStorage.setItem('desk_ai_prefs', JSON.stringify(prefs));
}

function loadPrefs() {
    prefs = JSON.parse(localStorage.getItem('desk_ai_prefs') || '{}');
}

function saveSettings() {
    savePrefs();
    showToast('Settings saved successfully! ✅', 'success');
}

function changePassword() {
    const cur = document.getElementById('cur-pass').value;
    const nw = document.getElementById('new-pass').value;
    const conf = document.getElementById('conf-pass').value;

    if (!cur || !nw || !conf) { showToast('Please fill all password fields', 'warn'); return; }
    if (nw !== conf) { showToast('New passwords do not match', 'error'); return; }
    if (nw.length < 8) { showToast('Password must be at least 8 characters', 'warn'); return; }

    showToast('Password changed successfully! 🔑', 'success');
    document.getElementById('cur-pass').value = '';
    document.getElementById('new-pass').value = '';
    document.getElementById('conf-pass').value = '';
}

function confirmLogout() {
    if (confirm('Sign out of all devices?')) logout();
}

/* ── Section Navigation ────────────────────────────────────────────────── */
function showSection(name, el) {
    // Hide all sections
    document.querySelectorAll('.dash-section').forEach(s => s.style.display = 'none');
    // Show target
    const target = document.getElementById(`section-${name}`);
    if (target) target.style.display = 'block';
    // Update sidebar links
    document.querySelectorAll('.sidebar-link').forEach(l => l.classList.remove('active'));
    if (el) el.classList.add('active');
}

/* ── AI Tools (Dashboard) ──────────────────────────────────────────────── */
const doubtResponses = {
    'big o': 'Big O notation describes algorithm complexity. O(1)=constant, O(n)=linear, O(n²)=quadratic. Binary search is O(log n).',
    'recursion': 'Recursion is a function calling itself. Always needs a base case. Example: factorial(n) = n × factorial(n-1).',
    'pointer': 'A pointer stores a memory address. In C: int *p = &x; — p holds address of x, *p gets the value.',
    'sql': 'SQL manages relational databases. Key commands: SELECT, INSERT, UPDATE, DELETE, JOIN.',
    'osi': 'OSI model: Physical, Data Link, Network, Transport, Session, Presentation, Application (7 layers).',
    'default': 'Great question! Break it into smaller parts and review your textbook. Would you like a specific aspect explained?'
};

async function dashAnalyzeDoubt() {
    const input = document.getElementById('dash-doubt').value.trim();
    const result = document.getElementById('dash-doubt-result');
    if (!input) { showToast('Enter your doubt first', 'warn'); return; }
    result.style.display = 'block';
    result.innerHTML = '<span style="color:var(--green)">🔍 Analyzing...</span>';
    await new Promise(r => setTimeout(r, 1000));
    const key = Object.keys(doubtResponses).find(k => input.toLowerCase().includes(k));
    result.innerHTML = `<strong style="color:var(--green)">💡 Answer:</strong><br/>${doubtResponses[key || 'default']}`;
    showToast('Doubt analyzed!', 'success');
}

async function dashGeneratePlan() {
    const subjects = document.getElementById('dash-subjects').value.trim();
    const date = document.getElementById('dash-exam-date').value;
    const result = document.getElementById('dash-plan-result');
    if (!subjects || !date) { showToast('Fill subjects and exam date', 'warn'); return; }
    result.style.display = 'block';
    result.innerHTML = '<span style="color:var(--green)">📅 Generating plan...</span>';
    await new Promise(r => setTimeout(r, 1200));
    const subList = subjects.split(',').map(s => s.trim()).filter(Boolean);
    const examDate = new Date(date);
    const today = new Date();
    const daysLeft = Math.max(1, Math.ceil((examDate - today) / (1000 * 60 * 60 * 24)));
    const daysPerSub = Math.max(1, Math.floor(daysLeft / subList.length));
    let html = `<strong style="color:var(--green)">📅 ${daysLeft} days left</strong><br/>`;
    subList.forEach((sub, i) => {
        const start = new Date(today);
        start.setDate(today.getDate() + i * daysPerSub);
        html += `<div style="padding:4px 0;border-bottom:1px solid var(--glass-border)"><strong>${sub}</strong> — ${start.toLocaleDateString('en-IN')}</div>`;
    });
    result.innerHTML = html;
    showToast('Study plan generated!', 'success');
}
