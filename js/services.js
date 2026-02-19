// ═══════════════════════════════════════════════════════════════════════════
// D.esk AI — Services Page JavaScript
// ═══════════════════════════════════════════════════════════════════════════

/* ── Modal Content ─────────────────────────────────────────────────────── */
const modalData = {
    'courses-modal': {
        title: '📖 Courses & Syllabus',
        sub: 'Anna University affiliated programs at Stella Mary\'s College',
        html: `
      <table class="modal-table">
        <thead><tr><th>Department</th><th>Program</th><th>Duration</th><th>Seats</th></tr></thead>
        <tbody>
          <tr><td>CSE</td><td>B.E. Computer Science</td><td>4 Years</td><td>120</td></tr>
          <tr><td>ECE</td><td>B.E. Electronics & Comm.</td><td>4 Years</td><td>60</td></tr>
          <tr><td>EEE</td><td>B.E. Electrical & Electronics</td><td>4 Years</td><td>60</td></tr>
          <tr><td>MECH</td><td>B.E. Mechanical Engineering</td><td>4 Years</td><td>60</td></tr>
          <tr><td>CIVIL</td><td>B.E. Civil Engineering</td><td>4 Years</td><td>60</td></tr>
          <tr><td>IT</td><td>B.Tech Information Technology</td><td>4 Years</td><td>60</td></tr>
          <tr><td>CSE (AI&ML)</td><td>B.E. CSE (AI & ML)</td><td>4 Years</td><td>60</td></tr>
          <tr><td>CSE</td><td>M.E. Computer Science</td><td>2 Years</td><td>18</td></tr>
        </tbody>
      </table>
      <p style="margin-top:14px;font-size:0.78rem;color:var(--text-muted)">📌 Syllabus PDFs available on the Anna University portal and college website.</p>
    `
    },
    'exams-modal': {
        title: '📝 Exams & Results',
        sub: 'Timetables, hall tickets, and result information',
        html: `
      <ul class="modal-list">
        <li><span>📅</span><div><strong>Internal Assessment 1</strong><br/>Feb 20, 2025 · All departments</div></li>
        <li><span>📅</span><div><strong>Internal Assessment 2</strong><br/>Mar 25, 2025 · All departments</div></li>
        <li><span>📋</span><div><strong>Model Examination</strong><br/>Apr 10–18, 2025 · Detailed timetable on portal</div></li>
        <li><span>🎓</span><div><strong>Semester End Examination</strong><br/>May 5–20, 2025 · Anna University</div></li>
        <li><span>🎫</span><div><strong>Hall Ticket</strong><br/>Available 5 days before exam on college portal</div></li>
        <li><span>📊</span><div><strong>Results</strong><br/>Published on coe1.annauniv.edu within 45 days</div></li>
      </ul>
    `
    },
    'attendance-modal': {
        title: '✅ Attendance Rules',
        sub: 'Policies and regulations for student attendance',
        html: `
      <ul class="modal-list">
        <li><span>📌</span><div><strong>Minimum Requirement: 75%</strong><br/>Students below 75% will be detained from semester exams.</div></li>
        <li><span>🏥</span><div><strong>Medical Leave</strong><br/>Medical certificates must be submitted within 3 days of return. Maximum 10 days per semester.</div></li>
        <li><span>📱</span><div><strong>Attendance Portal</strong><br/>Updated every Monday. Check via student login at college portal.</div></li>
        <li><span>⚠️</span><div><strong>Warning Levels</strong><br/>Below 85%: Yellow warning · Below 75%: Red alert · Below 65%: Detained</div></li>
        <li><span>📝</span><div><strong>OD (On Duty)</strong><br/>For events, competitions, and official college activities. Approved by HOD.</div></li>
      </ul>
    `
    },
    'calendar-modal': {
        title: '📆 Academic Calendar 2024-25',
        sub: 'Important dates and events for the academic year',
        html: `
      <table class="modal-table">
        <thead><tr><th>Event</th><th>Date</th></tr></thead>
        <tbody>
          <tr><td>Semester VII Begins</td><td>Jul 15, 2024</td></tr>
          <tr><td>Internal Assessment 1</td><td>Aug 26–30, 2024</td></tr>
          <tr><td>Pongal Holiday</td><td>Jan 14–16, 2025</td></tr>
          <tr><td>Internal Assessment 2</td><td>Feb 17–21, 2025</td></tr>
          <tr><td>Model Examination</td><td>Mar 10–20, 2025</td></tr>
          <tr><td>Semester End Exam</td><td>Apr 14 – May 5, 2025</td></tr>
          <tr><td>Result Declaration</td><td>Jun 2025</td></tr>
          <tr><td>Next Semester Begins</td><td>Jul 14, 2025</td></tr>
        </tbody>
      </table>
    `
    },
    'admissions-modal': {
        title: '🎓 Admissions Guidance',
        sub: 'Step-by-step admission process for all programs',
        html: `
      <ul class="modal-list">
        <li><span>1️⃣</span><div><strong>UG Admission (B.E./B.Tech)</strong><br/>Through TNEA counselling by Tamil Nadu Engineering Admissions. Based on 12th marks.</div></li>
        <li><span>2️⃣</span><div><strong>PG Admission (M.E./M.Tech)</strong><br/>Through TANCET or GATE scores. Merit-based selection.</div></li>
        <li><span>3️⃣</span><div><strong>Management Quota</strong><br/>Direct admission available. Contact admissions office for details.</div></li>
        <li><span>📄</span><div><strong>Documents Required</strong><br/>10th & 12th marksheets, TC, Community Certificate, Aadhar, Passport photos (4)</div></li>
        <li><span>📞</span><div><strong>Contact Admissions</strong><br/>admissions@stellamarys.edu.in · 0462-XXXXXXX</div></li>
      </ul>
    `
    },
    'docs-modal': {
        title: '📄 Document Assistance',
        sub: 'Request official documents from the college',
        html: `
      <ul class="modal-list">
        <li><span>📋</span><div><strong>Bonafide Certificate</strong><br/>Apply at the college office. Ready in 2–3 working days. Fee: ₹50</div></li>
        <li><span>🎓</span><div><strong>Transfer Certificate (TC)</strong><br/>Submit application 15 days before leaving. No dues clearance required first.</div></li>
        <li><span>📊</span><div><strong>Consolidated Marksheet</strong><br/>Available after final semester results. Apply at exam cell.</div></li>
        <li><span>🏆</span><div><strong>Provisional Certificate</strong><br/>Issued after passing all semesters. Available at exam cell.</div></li>
        <li><span>📝</span><div><strong>Character Certificate</strong><br/>Issued by the Principal's office. 3–5 working days.</div></li>
        <li><span>📞</span><div><strong>Office Hours</strong><br/>Mon–Fri: 9 AM – 4 PM · Sat: 9 AM – 1 PM</div></li>
      </ul>
    `
    },
    'faculty-modal': {
        title: '👨‍🏫 Faculty Directory',
        sub: 'Contact information for department faculty',
        html: `
      <table class="modal-table">
        <thead><tr><th>Name</th><th>Dept</th><th>Role</th></tr></thead>
        <tbody>
          <tr><td>Dr. A. Rajendran</td><td>CSE</td><td>HOD & Professor</td></tr>
          <tr><td>Dr. S. Meena</td><td>CSE</td><td>Assoc. Prof (AI/ML)</td></tr>
          <tr><td>Mr. K. Prakash</td><td>CSE</td><td>Asst. Prof (Web Dev)</td></tr>
          <tr><td>Dr. R. Vijayalakshmi</td><td>ECE</td><td>HOD & Professor</td></tr>
          <tr><td>Dr. M. Suresh</td><td>EEE</td><td>HOD & Professor</td></tr>
          <tr><td>Dr. P. Anand</td><td>MECH</td><td>HOD & Professor</td></tr>
          <tr><td>Dr. K. Selvi</td><td>CIVIL</td><td>HOD & Professor</td></tr>
          <tr><td>Ms. T. Priya</td><td>IT</td><td>HOD & Assoc. Prof</td></tr>
        </tbody>
      </table>
      <p style="margin-top:14px;font-size:0.78rem;color:var(--text-muted)">📧 Faculty emails: firstname.dept@stellamarys.edu.in</p>
    `
    },
    'placement-modal': {
        title: '💼 Placement Information',
        sub: '2024 placement statistics and training programs',
        html: `
      <ul class="modal-list">
        <li><span>📊</span><div><strong>Placement Rate: 95%</strong><br/>Of eligible students placed in 2024 batch</div></li>
        <li><span>💰</span><div><strong>Highest Package: ₹28 LPA</strong><br/>TCS Digital · CSE Department</div></li>
        <li><span>📈</span><div><strong>Average Package: ₹5.2 LPA</strong><br/>Across all departments</div></li>
        <li><span>🏢</span><div><strong>Top Recruiters</strong><br/>TCS, Infosys, Wipro, Cognizant, Zoho, HCL, Capgemini, Accenture</div></li>
        <li><span>🎯</span><div><strong>Training Programs</strong><br/>Aptitude (3rd year), Coding (3rd year), Soft Skills (4th year)</div></li>
        <li><span>📞</span><div><strong>Placement Cell</strong><br/>placement@stellamarys.edu.in · 0462-XXXXXXX</div></li>
      </ul>
    `
    }
};

/* ── Modal Functions ───────────────────────────────────────────────────── */
function openModal(id) {
    const data = modalData[id];
    if (!data) return;
    const overlay = document.getElementById('modal-overlay');
    const content = document.getElementById('modal-content');
    content.innerHTML = `
    <h2 class="modal-title">${data.title}</h2>
    <p class="modal-sub">${data.sub}</p>
    <div class="divider"></div>
    ${data.html}
  `;
    overlay.classList.add('open');
    document.body.style.overflow = 'hidden';
}

function closeModal() {
    document.getElementById('modal-overlay').classList.remove('open');
    document.body.style.overflow = '';
}

document.addEventListener('keydown', e => { if (e.key === 'Escape') closeModal(); });

/* ── AI Doubt Analyzer ─────────────────────────────────────────────────── */
const doubtResponses = {
    'big o': 'Big O notation describes the upper bound of an algorithm\'s time complexity. O(1) = constant, O(n) = linear, O(n²) = quadratic. Example: Linear search is O(n), Binary search is O(log n).',
    'recursion': 'Recursion is when a function calls itself. It needs a base case to stop. Example: factorial(n) = n × factorial(n-1), with base case factorial(0) = 1.',
    'pointer': 'A pointer stores the memory address of another variable. In C: int *p = &x; — p holds the address of x, *p dereferences to get the value.',
    'sql': 'SQL (Structured Query Language) is used to manage relational databases. Key commands: SELECT (read), INSERT (add), UPDATE (modify), DELETE (remove), JOIN (combine tables).',
    'osi': 'The OSI model has 7 layers: Physical, Data Link, Network, Transport, Session, Presentation, Application. Remember: "Please Do Not Throw Sausage Pizza Away"',
    'default': 'Great question! This topic involves several key concepts. I recommend breaking it down into smaller parts and reviewing your textbook chapter on this subject. Would you like me to explain a specific aspect?'
};

async function analyzeDoubt() {
    const input = document.getElementById('doubt-input').value.trim();
    const result = document.getElementById('doubt-result');
    if (!input) { showToast('Please enter your doubt first', 'warn'); return; }

    result.style.display = 'block';
    result.innerHTML = '<div style="color:var(--green)">🔍 Analyzing your doubt...</div>';

    await new Promise(r => setTimeout(r, 1200));

    const key = Object.keys(doubtResponses).find(k => input.toLowerCase().includes(k));
    const response = doubtResponses[key || 'default'];

    result.innerHTML = `
    <div style="color:var(--green);font-weight:600;margin-bottom:8px">💡 AI Analysis:</div>
    <p style="color:var(--text-dim);line-height:1.7">${response}</p>
    <div style="margin-top:10px;padding-top:10px;border-top:1px solid var(--glass-border);font-size:0.75rem;color:var(--text-muted)">
      ⚡ Powered by D.esk AI · For detailed explanation, visit your subject faculty
    </div>
  `;
    showToast('Doubt analyzed successfully!', 'success');
}

/* ── AI Study Planner ──────────────────────────────────────────────────── */
async function generatePlan() {
    const subjects = document.getElementById('planner-subjects').value.trim();
    const date = document.getElementById('planner-date').value;
    const result = document.getElementById('planner-result');

    if (!subjects || !date) { showToast('Please fill in subjects and exam date', 'warn'); return; }

    result.style.display = 'block';
    result.innerHTML = '<div style="color:var(--green)">📅 Generating your study plan...</div>';

    await new Promise(r => setTimeout(r, 1500));

    const subList = subjects.split(',').map(s => s.trim()).filter(Boolean);
    const examDate = new Date(date);
    const today = new Date();
    const daysLeft = Math.max(1, Math.ceil((examDate - today) / (1000 * 60 * 60 * 24)));
    const daysPerSub = Math.max(1, Math.floor(daysLeft / subList.length));

    let planHTML = `<div style="color:var(--green);font-weight:600;margin-bottom:10px">📅 Your Study Plan (${daysLeft} days left)</div>`;
    subList.forEach((sub, i) => {
        const start = new Date(today);
        start.setDate(today.getDate() + i * daysPerSub);
        const end = new Date(start);
        end.setDate(start.getDate() + daysPerSub - 1);
        planHTML += `
      <div style="display:flex;justify-content:space-between;align-items:center;padding:8px 0;border-bottom:1px solid var(--glass-border)">
        <span style="font-weight:600;color:var(--text)">${sub}</span>
        <span style="font-size:0.78rem;color:var(--text-muted)">${start.toLocaleDateString('en-IN')} – ${end.toLocaleDateString('en-IN')}</span>
      </div>
    `;
    });
    planHTML += `<div style="margin-top:10px;font-size:0.75rem;color:var(--text-muted)">💡 Tip: Revise each subject 2 days before the exam</div>`;
    result.innerHTML = planHTML;
    showToast('Study plan generated!', 'success');
}

/* ── Notify Me ─────────────────────────────────────────────────────────── */
function notifyMe() {
    showToast('You\'ll be notified when Learning Style Detection launches! 🚀', 'success', 4000);
}
